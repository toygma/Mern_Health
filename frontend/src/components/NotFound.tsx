import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 p-6">
      <h1 className="text-9xl font-extrabold text-indigo-600 tracking-widest mb-4">
        404
      </h1>

      <div className="bg-orange-500 px-4 py-1 text-sm rounded rotate-12 absolute top-1/4">
        Page Not Found
      </div>

      <p className="text-2xl font-semibold text-gray-800 mt-10 mb-4 tracking-wide">
        Sorry, we couldn't find what you were looking for!
      </p>
      <p className="text-gray-600 text-lg text-center max-w-lg">
        It looks like this page has either moved or never existed. Don't worry,
        we can get you back to the homepage.
      </p>

      <Link
        to="/"
        className="mt-8 px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105 flex items-center"
      >
        <ArrowLeftIcon className="w-5 h-5 mr-2" />
        Return to Home Page
      </Link>
    </div>
  );
};

export default NotFound;
