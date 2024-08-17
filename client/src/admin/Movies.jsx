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

function Movies() {
  let [movies, setMovies] = useState([]);

  async function getMovies() {
    let res = await axios.get("http://localhost:4000/admin-api/get-movies");
    setMovies(res.data.payload);
  }

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="p-3 font-radio">
      <Button className="absolute right-0 mr-6">
        <Link to="add-movie">Add New</Link>
      </Button>
      <h1 className="text-center text-4xl mb-6">MOVIES</h1>
      {movies.map((movie) => (
        <Card className="m-3">
          <CardHeader>
            <CardTitle>{movie.title}</CardTitle>
            <CardDescription>{movie.desc}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter className="border-t-2">
            <p>Added on {movie.release}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default Movies;
