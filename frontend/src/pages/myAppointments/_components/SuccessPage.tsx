import React from 'react';
import { CheckCircle, Home, CalendarCheck } from 'lucide-react';

const SuccessPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-8">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-2xl p-8 sm:p-12 text-center border border-green-100">
        
        {/* Success Icon */}
        <div className="mb-6 flex justify-center">
          <CheckCircle className="w-16 h-16 text-green-500 animate-pulse-once" />
        </div>

        {/* Title */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Payment Successful!
        </h1>
        
        {/* Description */}
        <p className="text-xl text-gray-600 mb-8">
          Your appointment has been successfully booked. A confirmation email has been sent to your inbox.
        </p>

        {/* Appointment Summary (Example Data) */}
        <div className="bg-green-50 p-4 rounded-xl mb-10 border border-green-200">
          <div className="flex justify-between text-lg font-medium text-gray-700">
            <span>Appointment ID:</span>
            <span className="text-green-600">#TRD193822</span>
          </div>
          <div className="flex justify-between text-lg font-medium text-gray-700 mt-2 border-t border-green-200 pt-2">
            <span>Amount Paid:</span>
            <span className="text-green-600 font-bold">$450.00</span>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => window.location.href = "/my-appointments"}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.01]"
            aria-label="Go to My Appointments page"
          >
            <CalendarCheck className="w-5 h-5" />
            View My Appointments
          </button>
          
          <button
            onClick={() => window.location.href = "/"}
            className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all duration-300 border border-gray-300"
            aria-label="Go back to Home page"
          >
            <Home className="w-5 h-5" />
            Return to Home
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default SuccessPage;