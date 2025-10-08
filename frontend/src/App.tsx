import { RouterProvider } from "react-router";
import { router } from "./routes/global-routes";
import React, { Suspense } from "react";
import { Toaster } from 'react-hot-toast';

const App = () => {
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