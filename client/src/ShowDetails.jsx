import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ShowsDetails() {
  const { state } = useLocation();
  let [shows, setShows] = useState([]);

  async function getMovies() {
    try {
      let res = await axios.get(
        `https://movie-nest-three.vercel.app/admin-api/get-shows-by-theatre/${state.movieId}`
      );
      console.log(res);
      setShows(res.data.payload);
    } catch (error) {
      console.error("Error fetching shows:", error);
    }
  }

  useEffect(() => {
    getMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-3 w-4/5 mx-auto">
      <h1 className="text-center text-4xl mb-6">SHOWS FOR {state.title}</h1>
      {shows.length === 0 ? (
        <p className="text-center text-xl text-gray-400">
          No shows available for this movie.
        </p>
      ) : (
        <div>
          {shows.map((show, ind) => (
            <div key={ind}>
              <p>{show.theatreId}</p>
              {shows.map((sh) => {
                if (sh.theatreId === show.theatreId)
                  return <p key={ind}>{sh.time}</p>;
                return null;
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
