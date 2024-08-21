import { Outlet } from "react-router-dom";

export default function EachShow() {

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
      });
    }
    return dates;
  }
  const dates = getNext7Days();

  return (
    <div className="w-full">
      <div className="text-center bg-slate-500 grid grid-cols-10 py-1 divide-x">
        {dates.map((date, index) => (
          <div onClick={} className="flex flex-col cursor-pointer" key={index}>
            <span className="day">{date.day}</span>
            <span className="month">{date.month}</span>
          </div>
        ))}
      </div>
      <Outlet />
    </div>
  );
}
