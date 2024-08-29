import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import AdminDashboard from "./admin/AdminDashboard.jsx";
import ErrorPage from "./ErrorPage.jsx";
import Dashboard from "./Dashboard.jsx";
import Movies from "./admin/Movies.jsx";
import AddMovieForm from "./admin/AddMovieForm.jsx";
import Users from "./admin/Users.jsx";
import Shows from "./admin/Shows.jsx";
import EachShow from "./admin/EachShow.jsx";
import Homepage from "./Homepage.jsx";
import MovieDetails from "./MovieDetails.jsx";

export default function App() {
  let router = createBrowserRouter([
    {
      path: "",
      element: <Homepage />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "movie/:title",
          element: <MovieDetails />,
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
          element: <Outlet />,
          children: [
            {
              path: "",
              element: <Movies />,
            },
            {
              path: "add-movie",
              element: <AddMovieForm />,
            },
          ],
        },
        {
          path: "bookings",
          element: <Dashboard />,
        },
        {
          path: "theatres",
          element: <EachShow />,
        },
        {
          path: "shows",
          element: <Shows />,
        },
        {
          path: "users",
          element: <Users />,
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
