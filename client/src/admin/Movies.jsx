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

function Movies() {
  let [movies, setMovies] = useState([]);

  async function getMovies() {
    let res = await axios.get("http://localhost:4000/user-api/get-movies");
    setMovies(res.data.payload);
  }

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="p-3">
      {/* {movies.map((movie) => ( */}
      <Card>
        <CardHeader>
          <CardTitle>dfdsf</CardTitle>
          <CardDescription>adfdf</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
      {/* ))} */}
    </div>
  );
}

export default Movies;
