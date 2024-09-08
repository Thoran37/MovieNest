import { useOutletContext, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ShowsDetails() {
  const { state } = useLocation();
  let [shows, setShows] = useState([]);

  async function getMovies() {
    try {
      let res = await axios.get(
        `http://localhost:4000/user-api/get-shows/${state.movieId}`
      );
      console.log(res);
      setShows(res.data.payload);
    } catch (error) {
      console.error("Error fetching shows:", error);
    }
  }

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="p-3 w-4/5 mx-auto">
      <h1 className="text-center text-4xl mb-6">SHOWS FOR {state.title}</h1>
      {shows.length === 0 ? (
        <p className="text-center text-xl text-gray-400">
          No shows available for this movie.
        </p>
      ) : (
        <table className="border table-fixed">
          <caption>A list of the running shows.</caption>
          <thead>
            <tr>
              <th></th>
              <th>Movie Name</th>
              <th>No. of Theatres</th>
              <th>No. of Shows</th>
            </tr>
          </thead>
          <tbody>
            {shows.map((movie, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={movie.img}
                    alt={movie.title}
                    className="max-w-xs max-h-32"
                  />
                </td>
                <td className="font-bold">{movie.title}</td>
                <td>{movie.theatreCount}</td>
                <td>{movie.showCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
