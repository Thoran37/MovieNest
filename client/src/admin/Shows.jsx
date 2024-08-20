import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { GrLinkNext } from "react-icons/gr";

export default function Shows() {
  let [movies, setMovies] = useState([]);

  async function getMovies() {
    let res = await axios.get("http://localhost:4000/admin-api/get-movies");
    setMovies(res.data.payload);
  }
  async function gotoShow(id) {
    console.log(id);
  }
  useEffect(() => {
    getMovies();
  }, []);

  return (
    <Table className="bg-red-200 table-auto m-5 w-4/5 mx-auto">
      <TableCaption>A list of the running movies.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Movie Name</TableHead>
          <TableHead>No.of Theatres</TableHead>
          <TableHead>No.of Shows</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {movies.map((movie) => (
          <TableRow>
            <TableCell className="font-medium">{movie.name}</TableCell>
            <TableCell>{movie.movieId}</TableCell>
            <TableCell>{movie.movieId}</TableCell>
            <TableCell className="text-right">
              <Button onClick={() => gotoShow(movie.movieId)}>
                Check Shows
                <GrLinkNext className="ms-2" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
  x;
}
