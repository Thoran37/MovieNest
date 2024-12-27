import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function EachShow() {
  const { movieId } = useParams();
  const [shows, setShows] = useState([]);

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
  const [selectedDate, setSelectedDate] = useState(dates[0]);

  async function getShows(date) {
    let _date = date.date;
    const obj = { id: movieId, date: _date };
    let res = await axios.post(
      "http://movie-nest-three.vercel.app/admin-api/get-shows",
      obj
    );
    setShows(res.data.payload);
    setSelectedDate(date);
  }

  function groupShows() {
    shows.reduce((acc, show) => {
      if (!acc[show.theatreId]) acc[show.theatreId] = [];
      acc[show.theatreId].push(show);
      console.log(acc);
      return acc;
    }, {});
  }
  groupShows();

  return (
    <div className="w-full">
      <div className="text-center bg-slate-500 grid grid-cols-7 py-1 divide-x">
        {dates.map((date, index) => (
          <div
            onClick={() => getShows(date)}
            className={`flex flex-col cursor-pointer ${
              selectedDate.day === date.day
                ? "border-b-blue-100 border-b-8"
                : ""
            }`}
            key={index}
          >
            <span className="day">{date.day}</span>
            <span className="month">{date.month}</span>
          </div>
        ))}
      </div>
      <div>
        <div className="grid grid-cols-3 gap-4 m-2">
          {shows.map((show, index) => (
            <div key={index} className="bg-slate-500 p-4">
              <div className="text-center">
                <span className="text-lg">{show.time}</span>
              </div>
              <div className="text-center">
                <span>{show.seats} seats</span>
              </div>
              <div className="text-center">
                <span>{show.theatre}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
