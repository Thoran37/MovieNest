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

function Shows() {
  let [shows, setShows] = useState([]);

  async function getShows() {
    let res = await axios.get("http://localhost:4000/user-api/get-Shows");
    setShows(res.data.payload);
  }

  useEffect(() => {
    getShows();
  }, []);

  return (
    <div className="p-3 font-radio">
      <h1 className="text-center text-4xl mb-6">Shows</h1>
      {shows.map((movie) => (
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

export default Shows;
