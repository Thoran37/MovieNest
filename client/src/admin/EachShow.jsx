import axios from "axios";
import { useState } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";

export default function EachShow() {
  const { movieId } = useParams();
  let [shows, setShows] = useState([]);

  function ISOtoUTC(iso) {
    let date = new Date(iso).getUTCDate();
    let month = new Date(iso).getUTCMonth();
    let year = new Date(iso).getUTCFullYear();
    return `${year}-${month + 1}-${date}`;
  }

  function getNext7Days() {
    const today = new Date();
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const day = date.getDate();
      const month = months[date.getMonth()];
      dates.push({
        day: day.toString(),
        month: month,
        date: date,
      });
    }
    return dates;
  }
  const dates = getNext7Days();

  async function getShows(_date) {
    const obj = { id: movieId, date: _date };
    let res = await axios.post(
      "http://localhost:4000/admin-api/get-shows",
      obj
    );
    console.log(_date);
    console.log(res.data);
    setShows(res.data.payload);
  }
  return (
    <div className="w-full">
      <div className="text-center bg-slate-500 grid grid-cols-7 py-1 divide-x">
        {dates.map((date, index) => (
          <div
            onClick={() => getShows(date.date)}
            className="flex flex-col cursor-pointer"
            key={index}
          >
            <span className="day">{date.day}</span>
            <span className="month">{date.month}</span>
          </div>
        ))}
      </div>
      <Outlet />
    </div>
  );
}
