import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MdDelete, MdEditSquare } from "react-icons/md";

function Movies() {
  let [movies, setMovies] = useState([]);

  async function getMovies() {
    let res = await axios.get("http://localhost:4000/admin-api/get-movies");
    setMovies(res.data.payload);
  }

  useEffect(() => {
    getMovies();
  }, []);

  async function edit() {
    let res = await axios.put("http://localhost:4000/admin-api/update-movie");
    console.log(res.data.message);
    getMovies();
  }

  async function deletefunc(id) {
    let res = await axios.delete(
      `http://localhost:4000/admin-api/remove-movie/${id}`
    );
    console.log(res.data.message);
    getMovies();
  }

  return (
    <div className="p-3 font-radio">
      <Button className="absolute right-0 mr-6">
        <Link to="add-movie">Add New</Link>
      </Button>
      <h1 className="text-center text-4xl mb-6">MOVIES</h1>
      {movies.map((movie) => (
        <Card className="m-3" key={movie.movieId}>
          <CardHeader>
            <CardTitle>
              {movie.title}
              <MdDelete
                onClick={() => deletefunc(movie.movieId)}
                className="cursor-pointer inline ms-5 text-red-600"
              />
              <MdEditSquare
                onClick={edit}
                className="cursor-pointer inline ms-5 text-blue-500"
              />
            </CardTitle>
            <CardDescription>{movie.desc}</CardDescription>
          </CardHeader>
          <CardFooter className="border-t-2 p-3">
            <p>Added on {movie.release}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default Movies;
