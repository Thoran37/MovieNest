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
import ViewDetails from "./ViewDetails.jsx";
import Admin from "./admin/Admin.jsx"
import AddShows from "./admin/AddShows.jsx"
import ShowsDetails from "./ShowsDetails.jsx";

export default function App() {
  let router = createBrowserRouter([
    {
      path: "",
      element: <Homepage />,
      errorElement: <ErrorPage />,
    },
    {
      path: "movie/:_id",
      element: <ViewDetails />,
      children: [
        {
          path: "shows",
          element: <ShowsDetails />
        }
      ]
    },
    {
      path: "admin",
      element: <AdminDashboard />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "",
          element: <Admin />,
        },
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
          element: <Dashboard />,
        },
        {
          path: "shows",
          element: <Shows />,
        },
        {
          path: "add-shows/:movieId",
          element: <AddShows />,
        },
        {
          path: "shows/:movieId",
          element: <EachShow />,
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
