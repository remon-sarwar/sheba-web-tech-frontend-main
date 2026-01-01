"use client";

import React, { useState } from "react";

export default function AccountExtendedMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white rounded-lg shadow-md p-6">
      {/* Toggle Button */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Menu</h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          {isOpen ? "Close" : "Open"}
        </button>
      </div>

      {/* Extended Section */}
      {isOpen && (
        <div className="mt-6 border-t pt-4 space-y-3">
          <a
            href="#orders"
            className="block px-4 py-2 rounded hover:bg-gray-100 text-gray-700"
          >
            📦 Order History
          </a>
          <a
            href="#tickets"
            className="block px-4 py-2 rounded hover:bg-gray-100 text-gray-700"
          >
            🎫 Tickets History
          </a>
          <a
            href="#products"
            className="block px-4 py-2 rounded hover:bg-gray-100 text-gray-700"
          >
            🛠 Product Details
          </a>
          <a
            href="#user"
            className="block px-4 py-2 rounded hover:bg-gray-100 text-gray-700"
          >
            👤 User Details
          </a>
          <a
            href="#others"
            className="block px-4 py-2 rounded hover:bg-gray-100 text-gray-700"
          >
            ➕ Others
          </a>
        </div>
      )}
    </div>
  );
}
