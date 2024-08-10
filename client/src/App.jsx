import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminDashboard from "./admin/AdminDashboard.jsx";
import ErrorPage from "./ErrorPage.jsx";
import Dashboard from "./Dashboard.jsx";
import Movies from "./admin/Movies.jsx";

export default function App() {
  let router = createBrowserRouter([
    {
      path: "",
      element: <Dashboard />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "movie/:title",
          element: <Dashboard />,
          children: [
            {
              path: "shows",
              element: <Dashboard />,
              children: [
                {
                  path: "showId",
                  element: <Dashboard />,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      path: "admin",
      element: <AdminDashboard />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "movies",
          element: <Movies />,
        },
        {
          path: "bookings",
          element: <Dashboard />,
        },
        {
          path: "theatres",
          element: <Dashboard />,
        },
        {
          path: "shows",
          element: <Dashboard />,
        },
        {
          path: "users",
          element: <Dashboard />,
        },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
