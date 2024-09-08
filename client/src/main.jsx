import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ShowTimes from "./admin/ShowTimes.jsx";
import { Provider } from "react-redux";
import { Store } from "./redux/Store.js";
import MainPage from "./user/seatsLayout/BookingPage.jsx";
import TheaterList from "./user/seatsLayout/TheaterList.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={Store}>
      <App />
      {/* <MainPage></MainPage> */}
      {/* <TheaterList></TheaterList> */}
    </Provider>
  </React.StrictMode>
);
