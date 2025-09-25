const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-gray-50/75 backdrop-blur-sm fixed top-0 left-0 z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500 shadow-xl"></div>

      <span className="ml-4 text-xl font-semibold text-gray-700">
        Loading...
      </span>
    </div>
  );
};

export default Loading;
