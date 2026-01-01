"use client";

export default function FailedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold text-red-600">❌ Payment Failed</h1>
      <p className="mt-4 text-gray-700">
        Your payment could not be processed. Please try again or contact support.
      </p>
    </div>
  );
}