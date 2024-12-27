import axios from "axios";
import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Cell,
  CartesianGrid,
} from "recharts";

// Sample data (replace with your arrays)
// const userRegionData = [
//   { name: "Region A", value: 400 },
//   { name: "Region B", value: 300 },
//   { name: "Region C", value: 300 },
//   { name: "Region D", value: 200 },
// ];
// const moviesByGenre = [
//   { genre: "Action", count: 20 },
//   { genre: "Drama", count: 30 },
//   { genre: "Comedy", count: 15 },
//   { genre: "Sci-Fi", count: 10 },
// ];
const bookingsData = [
  { date: "2024-09-01", bookings: 2400 },
  { date: "2024-09-02", bookings: 1398 },
  { date: "2024-09-03", bookings: 9800 },
  { date: "2024-09-04", bookings: 3908 },
  { date: "2024-09-05", bookings: 4800 },
];
const theatreData = [
  { theatre: "Theatre 1", capacity: 120 },
  { theatre: "Theatre 2", capacity: 150 },
  { theatre: "Theatre 3", capacity: 110 },
  { theatre: "Theatre 4", capacity: 160 },
];
const showTimingsData = [
  { time: "10:00 AM", shows: 4 },
  { time: "12:00 PM", shows: 8 },
  { time: "03:00 PM", shows: 6 },
  { time: "06:00 PM", shows: 10 },
  { time: "09:00 PM", shows: 12 },
];

export default function AdminDashboard() {
  let [movies, setMovies] = useState([]);
  let [shows, setShows] = useState([]);
  let [users, setUsers] = useState([]);
  let [theatres, setTheatres] = useState([]);
  // let [bookings, setBookings] = useState([]);

  async function getAllArrays() {
    let res1 = await axios.get(
      "http://movie-nest-three.vercel.app/admin-api/get-movies"
    );
    setMovies(res1.data.payload);
    let res2 = await axios.get(
      "http://movie-nest-three.vercel.app/admin-api/get-shows"
    );
    setShows(res2.data.payload);
    let res3 = await axios.get(
      "http://movie-nest-three.vercel.app/admin-api/get-users"
    );
    setUsers(res3.data.payload);
    let res4 = await axios.get(
      "http://movie-nest-three.vercel.app/admin-api/get-theatres"
    );
    setTheatres(res4.data.payload);
  }

  function getGenreCount() {
    const genreCount = {};

    movies.forEach((movie) => {
      if (movie.genre === "") movie.genre = "Others";
      if (genreCount[movie.genre]) genreCount[movie.genre]++;
      else genreCount[movie.genre] = 1;
    });

    const genreCountArray = Object.keys(genreCount).map((genre) => ({
      genre: genre,
      count: genreCount[genre],
    }));

    return genreCountArray;
  }

  const data = [
    { name: "Movies", value: movies.length },
    { name: "Shows", value: shows.length },
    { name: "Users", value: users.length },
    { name: "Theatres", value: theatres.length },
  ];

  useEffect(() => {
    getAllArrays();
  }, []);
  let genreCounts = getGenreCount();

  return (
    <div className="w-screen container m-5">
      <h2 className="text-center text-3xl">Dashboard Insights</h2>
      <div className="grid grid-cols-2">
        {/* Pie Chart */}
        <PieChart width={400} height={400}>
          <Pie data={data} dataKey="value" cx="50%" cy="50%" label>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={["#FFBB28", "#FF8042", "#0088FE", "#00C49F"][index % 4]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>

        <div>
          <p className="text-center text-xl">Movies by Genre</p>
          <BarChart
            width={500}
            height={300}
            data={genreCounts}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="genre" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </div>

        {/* Area Chart */}
        <AreaChart width={400} height={300} data={bookingsData}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="bookings"
            stroke="#8884d8"
            fill="#8884d8"
          />
        </AreaChart>

        {/* Radar Chart */}
        <RadarChart
          cx={200}
          cy={200}
          outerRadius={150}
          width={400}
          height={400}
          data={theatreData}
        >
          <PolarGrid />
          <PolarAngleAxis dataKey="theatre" />
          <PolarRadiusAxis />
          <Radar
            name="Capacity"
            dataKey="capacity"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
          <Tooltip />
        </RadarChart>

        {/* Line Chart */}
        <LineChart width={400} height={300} data={showTimingsData}>
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="shows" stroke="#8884d8" />
        </LineChart>
      </div>
    </div>
  );
}
