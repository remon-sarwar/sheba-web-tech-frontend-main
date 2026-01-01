"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { sendget, sendPost } from "@/endpoints/AllCalls";

export default function TicketListPage() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [newTicket, setNewTicket] = useState({ title: "", description: "", status: "open" });

  const fetchTickets = async () => {
    try {
      const data = await sendget("/api/ticket/my",localStorage.getItem('token'));
      setTickets(data);
    } catch (err) {
      console.error("Error fetching tickets:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTicket = async (e) => {
    e.preventDefault();
    setCreating(true);
    try {
      await sendPost("/api/ticket/create", newTicket,localStorage.getItem('token'),true);
      setNewTicket({ title: "", description: "", status: "open" });
      fetchTickets();
    } catch (err) {
      console.error("Error creating ticket:", err);
    } finally {
      setCreating(false);
    }
  };

  useEffect(() => {
    fetchTickets();
    const interval = setInterval(fetchTickets, 60_000); // refresh every 1 min
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">My Tickets</h1>

      {/* Create Ticket Form */}
      <form
        onSubmit={handleCreateTicket}
        className="bg-white shadow rounded-lg p-6 mb-8"
      >
        <h2 className="text-xl font-semibold mb-4">Create New Ticket</h2>
        <input
          type="text"
          placeholder="Title"
          value={newTicket.title}
          onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-3 focus:ring-2 focus:ring-blue-400 outline-none"
          required
        />
        <textarea
          placeholder="Description"
          value={newTicket.description}
          onChange={(e) =>
            setNewTicket({ ...newTicket, description: e.target.value })
          }
          className="w-full border border-gray-300 rounded px-3 py-2 mb-3 focus:ring-2 focus:ring-blue-400 outline-none"
          required
        />
        <button
          type="submit"
          disabled={creating}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition disabled:opacity-50"
        >
          {creating ? "Creating..." : "Create Ticket"}
        </button>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : tickets.length === 0 ? (
        <p className="text-gray-500">No tickets found.</p>
      ) : (
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <Link
              key={ticket.id}
              href={`/my-tickets/${ticket.id}`}
              className="block bg-white rounded-lg p-4 shadow hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold">{ticket.title}</h2>
              <p className="text-gray-600">{ticket.description}</p>
              <p className="mt-2 text-sm text-gray-500">
                Status:{" "}
                <span
                  className={`font-medium ${
                    ticket.status === "open"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {ticket.status}
                </span>
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
