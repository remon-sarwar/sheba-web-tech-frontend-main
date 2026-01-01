"use client";

import React from "react";

export default function UserDetailsPage() {
  const user = {
    fullName: "John Doe",
    email: "john@example.com",
    phone: "+880 1234-567890",
    address: "123, Dhaka, Bangladesh",
    company: "Example Hosting Ltd.",
    domain: "example.com",
    hostingPlan: "Business Pro (1 Year)",
    registrationDate: "2025-02-15",
    profilePic: "https://via.placeholder.com/150", // Placeholder image
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-[1in]">
      <div className="w-full">
        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-8">
          <img
            src={user.profilePic}
            alt="User"
            className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-md"
          />
          <h1 className="text-3xl font-extrabold text-gray-900 mt-4">
            {user.fullName}
          </h1>
        </div>

        {/* Personal Information */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-3 border-b-2 border-gray-300 pb-1">
            Personal Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-800 font-semibold">
            <p>📧 Email: <span className="font-bold">{user.email}</span></p>
            <p>📞 Phone: <span className="font-bold">{user.phone}</span></p>
            <p>🏠 Address: <span className="font-bold">{user.address}</span></p>
          </div>
        </div>

        {/* Hosting & Domain Information */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-3 border-b-2 border-gray-300 pb-1">
            Hosting & Domain
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-800 font-semibold">
            <p>🏢 Company: <span className="font-bold">{user.company}</span></p>
            <p>🌐 Domain: <span className="font-bold">{user.domain}</span></p>
            <p>📦 Hosting Plan: <span className="font-bold">{user.hostingPlan}</span></p>
            <p>📅 Registration Date: <span className="font-bold">{user.registrationDate}</span></p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mt-6">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold shadow-md hover:bg-blue-700">
            Edit Details
          </button>
          <button className="bg-red-500 text-white px-6 py-2 rounded-lg font-bold shadow-md hover:bg-red-600">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
