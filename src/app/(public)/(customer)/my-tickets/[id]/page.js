"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { sendget, sendPost } from "@/endpoints/AllCalls";

export default function TicketDetailPage() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchTicketChats = async () => {
    try {
      const data =await sendget(`/api/ticket/chats/${id}`,localStorage.getItem('token'));
      
      setChats(data);
    } catch (err) {
      console.error("Error fetching chats:", err);
    }
  };

  const fetchTicket = async () => {
    try {
      const data =await sendget("/api/ticket/my",localStorage.getItem('token'));
      
      const found = data.find((t) => String(t.id) === String(id));
      setTicket(found || null);
    } catch (err) {
      console.error("Error fetching ticket:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTicket();
    fetchTicketChats();
    const interval = setInterval(fetchTicketChats, 10_000); // refresh chats every 10 sec
    return () => clearInterval(interval);
  }, [id]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    try {
      sendPost("/api/ticket/sendmsg",{ ticketId: Number(id), message },localStorage.getItem('token'),true);
      setMessage("");
      fetchTicketChats();
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  if (loading) return <p className="p-8">Loading...</p>;
  if (!ticket) return <p className="p-8 text-red-600">Ticket not found.</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold text-blue-700 mb-4">{ticket.title}</h1>
      <p className="text-gray-700 mb-2">{ticket.description}</p>
      <p className="text-sm text-gray-500 mb-6">Status: {ticket.status}</p>

      {/* Chat Section */}
      <div className="bg-white rounded-lg shadow p-4 mb-6 max-h-[400px] overflow-y-auto">
        {chats.length === 0 ? (
          <p className="text-gray-500">No messages yet.</p>
        ) : (
          chats.map((chat, idx) => (
            <div
              key={idx}
              className={`mb-3 ${
                chat.senderId=='me' ? "text-right" : "text-left"
              }`}
            >
              <div
                className={`inline-block px-3 py-2 rounded-lg ${
                  chat.senderId
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {chat.message}
              </div>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(chat.sentAt).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Message Form */}
      <form onSubmit={handleSendMessage} className="flex space-x-2">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
        >
          Send
        </button>
      </form>
    </div>
  );
}
