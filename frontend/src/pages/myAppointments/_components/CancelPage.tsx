import { CalendarCheck, CheckCircle, Home } from "lucide-react";
import { Link } from "react-router";

const CancelPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-8">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-2xl p-8 sm:p-12 text-center border border-green-100">
        {/* Success Icon */}
        <div className="mb-6 flex justify-center">
          <CheckCircle className="w-16 h-16 text-green-500 animate-pulse-once" />
        </div>

        {/* Title */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Payment Failed!
        </h1>

        {/* Description */}
        <p className="text-xl text-gray-600 mb-8">
          Your transaction has failed.
        </p>
        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to={"/my-appointments"}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.01]"
            aria-label="Go to My Appointments page"
          >
            <CalendarCheck className="w-5 h-5" />
            View My Appointments
          </Link>

          <Link
            to={"/"}
            className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all duration-300 border border-gray-300"
            aria-label="Go back to Home page"
          >
            <Home className="w-5 h-5" />
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CancelPage;
