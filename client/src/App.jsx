import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import ErrorPage from "./ErrorPage.jsx";
import Dashboard from "./Dashboard.jsx";
import Movies from "./admin/Movies.jsx";
import AddMovieForm from "./admin/AddMovieForm.jsx";
import Users from "./admin/Users.jsx";
import Shows from "./admin/Shows.jsx";
import EachShow from "./admin/EachShow.jsx";
import Homepage from "./Homepage.jsx";
import ViewDetails from "./ViewDetails.jsx";
import AddShows from "./admin/AddShows.jsx";
import BookingPage from "./user/seatsLayout/BookingPage.jsx";
import TheaterList from "./user/seatsLayout/TheaterList.jsx";
import ShowsDetails from "./ShowDetails.jsx";
import Theatres from "./admin/Theatres.jsx";
import AddTheatre from "./admin/AddTheatre.jsx";
import AdminSkeleton from "./admin/AdminSkeleton.jsx";
import AdminDashboard from "./admin/AdminDashboard.jsx";
import PaymentGateway from "./PaymentGateway.jsx";
import LastPage from "./LastPage.jsx";

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
      errorElement: <ErrorPage />,
    },
    {
      path: "movie/:id/shows",
      element: <ShowsDetails />,
    },
    {
      path: "movie/:id/shows/:showId",
      element: <BookingPage />,
    },
    {
      path: "theatrelist",
      element: <TheaterList />,
    },
    {
      path: "booking-page",
      element: <BookingPage />,
    },
    {
      path: "payment",
      element: <PaymentGateway />,
    },
    {
      path: "payment/over",
      element: <LastPage />,
    },
    {
      path: "admin",
      element: <AdminSkeleton />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "",
          element: <AdminDashboard />,
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
          path: "theatres",
          element: <Outlet />,
          children: [
            {
              path: "",
              element: <Theatres />,
            },
            {
              path: "add-theatre",
              element: <AddTheatre />,
            },
          ],
        },
        {
          path: "bookings",
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
