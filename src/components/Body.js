import React from "react";
import { Login } from "./Login";
import { Browse } from "./Browse";
import { createBrowserRouter } from "reat-router-dom";
import { RouterProvider } from "react-router-dom";

export const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/Browse",
      element: <Browse />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};
