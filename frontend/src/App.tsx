import { RouterProvider } from "react-router";
import { router } from "./routes/global-routes";
import React, { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { useGetUserQuery } from "./redux/api/user-api";
import Loading from "./components/Loading";

const App = () => {
  const { isLoading } = useGetUserQuery();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <React.Fragment>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <RouterProvider router={router} />
        </Suspense>
      </div>
      <Toaster position="top-center" />
    </React.Fragment>
  );
};

export default App;
