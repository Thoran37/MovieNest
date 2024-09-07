import { useEffect, useState } from "react";
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
import { IoMdAddCircleOutline } from "react-icons/io";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Shows() {
  let [movies, setMovies] = useState([]);
  let navigate = useNavigate();

  async function getMovies() {
    let res = await axios.get("http://localhost:4000/admin-api/get-movies");
    setMovies(res.data.payload);
  }

  async function gotoShow(id) {
    navigate(`/admin/shows/${id}`);
  }

  async function addShows(movie) {
    navigate(`/admin/add-shows/${movie.movieId}`, { state: movie });
  }

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="p-3 w-4/5 mx-auto">
      <h1 className="text-center text-4xl mb-6">SHOWS</h1>
      <Table className="border table-fixed">
        <TableCaption>A list of the running movies.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>Movie Name</TableHead>
            <TableHead>No.of Theatres</TableHead>
            <TableHead>No.of Shows</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {movies.map((movie, index) => (
            <TableRow key={index}>
              <TableCell>
                <img src={movie.img} />
              </TableCell>
              <TableCell className="font-bold">{movie.title}</TableCell>
              <TableCell>{movie.movieId}</TableCell>
              <TableCell>{movie.movieId}</TableCell>
              <TableCell className="text-right space-y-3">
                <Button onClick={() => gotoShow(movie.movieId)}>
                  Check Shows
                  <GrLinkNext className="ms-2" />
                </Button>
                <Button onClick={() => addShows(movie)}>
                  Add Shows
                  <IoMdAddCircleOutline className="ms-2 text-2xl" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
