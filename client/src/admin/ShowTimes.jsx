import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";

const ShowTimes = () => {
  let [shows, setShows] = useState([]);
  async function getShows() {
    const obj = { id: 1, date: "2024-08-31" };
    let res = await axios.post(
      "https://movie-nest-three.vercel.app/admin-api/get-shows",
      obj
    );
    setShows(res.data.payload);
    console.log(shows);
  }
  useEffect(() => {
    getShows();
    TheatreShows();
  }, []);

  const TheatreShows = () => {
    // Group the shows by theatreId
    const groupedShows = shows.reduce((acc, show) => {
      if (!acc[show.theatreId]) {
        acc[show.theatreId] = [];
      }
      acc[show.theatreId].push(show);
      console.log(acc);
      return acc;
    }, {});
  };
  // const shows = [
  //   { time: "10:00 AM", seats: 50, theatre: "Theatre 1" },
  //   { time: "12:00 PM", seats: 30, theatre: "Theatre 2" },
  //   { time: "02:00 PM", seats: 20, theatre: "Theatre 3" },
  // ];

  return (
    <div className="grid grid-cols-3 gap-4 m-2">
      {shows.map((show, index) => (
        <Card key={index} className="p-4">
          <CardContent>
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-semibold">{show.time}</span>
              <Badge
                className={
                  show.isFastFilling ? "bg-orange-500" : "bg-green-500"
                }
              >
                {show.isFastFilling ? "Fast Filling" : "Available"}
              </Badge>
            </div>
            <div className="text-center mb-2">
              <span className="text-sm text-gray-600">{show.theatre}</span>
            </div>
            <div className="text-center mb-2">
              <span className="text-sm text-gray-600">{show.seats} seats</span>
            </div>
            <div className="text-center">
              <Button variant="outline" className="text-xs">
                Book Now
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ShowTimes;
