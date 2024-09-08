import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Homepage() {
  const [movies, setMovies] = useState([]);
  let navigate = useNavigate();

  async function getMovies() {
    try {
      let res = await axios.get("http://localhost:4000/admin-api/get-movies");
      setMovies(res.data.payload);
    } catch (error) {
      console.error("Failed to fetch movies:", error);
    }
  }

  function gotoView(obj) {
    navigate(`/movie/${obj.movieId}`, { state: obj });
  }

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-900 text-gray-100">
        {/* Carousel Section */}
        <section className="relative w-full">
          <Carousel opts={{ align: "start" }} className="w-full">
            <CarouselContent>
              {movies.map((movie) => (
                <CarouselItem
                  key={movie.movieId}
                  className="relative flex-shrink-0 w-full h-[480px]"
                >
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent p-4 flex items-center justify-center">
                    <div className="text-center text-white p-6 bg-black bg-opacity-60 rounded-lg shadow-lg max-w-md">
                      <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
                      <p className="text-lg font-semibold">
                      <p className="text-lg font-semibold">
                        {movie.genre.join(" • ")}
                      </p>
                       • {movie.time}
                      </p>
                      <p className="mt-4 text-sm">{movie.desc}</p>
                      <button
                        className="mt-6 bg-blue-600 hover:bg-blue-700 transition duration-300 ease-in-out text-white font-bold py-2 px-6 rounded-lg shadow-lg"
                        onClick={() => gotoView(movie)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 transition duration-300 ease-in-out text-white p-2 rounded-full">
              &#9664;
            </CarouselPrevious>

            <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 transition duration-300 ease-in-out text-white p-2 rounded-full">
              &#9654;
            </CarouselNext>
          </Carousel>
        </section>

        {/* Card Grid Section */}
        <section className="p-8">
          <h2 className="text-3xl font-bold text-center mb-8">
            Popular Movies
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <Card
                key={movie.movieId}
                className="bg-gray-800 text-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 h-full flex flex-col"
              >
                <CardHeader className="p-0">
                  <img
                    src={movie.img}
                    alt={movie.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                </CardHeader>
                <CardContent className="p-4 flex-1">
                  <CardTitle className="text-xl font-bold">
                    {movie.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-400">
                  <p className="text-md font-semibold text-gray-400">
                    {movie.genre.join(" • ")}
                  </p>
                  <p>
                    {movie.time}
                  </p>
                  </CardDescription>
                  <p className="mt-4 text-sm">{movie.desc}</p>
                </CardContent>
                <CardFooter className="p-4">
                  <button
                    className="bg-blue-600 hover:bg-blue-700 transition duration-300 ease-in-out text-white font-bold py-2 px-4 rounded-lg shadow-lg w-full"
                    onClick={() => gotoView(movie)}
                  >
                    View Details
                  </button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
