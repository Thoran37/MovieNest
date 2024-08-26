import React, { useState, useEffect } from 'react';
import MovieBar from './MovieBar';
import ShowTime from './ShowTime';
import SeatLayout from './SeatLayout';
import './MainPage.css'

const MainPage = () => {
  const [movie, setMovie] = useState({});
  const [timings, setTimings] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    const randomMovie = {
      name: "Stree 2: Sarkate Ka Aatank",
      theatre: "PVR: Nexus Mall Kukatpally, Hyderabad"
    };

    const randomTimings = ["04:15 PM", "04:40 PM", "07:55 PM", "11:10 PM"];

    const randomSeats = [
      Array(10).fill().map((_, i) => ({ number: i + 1, status: 'available' })),
      Array(10).fill().map((_, i) => ({ number: i + 11, status: 'available' })),
    ];

    setMovie(randomMovie);
    setTimings(randomTimings);
    setSeats(randomSeats);
  }, []);

  const handleSelectTime = (time) => {
    setSelectedTime(time);
  };

  const handleSelectSeat = (rowIndex, seatIndex) => {
    const updatedSeats = [...seats];
    if (updatedSeats[rowIndex][seatIndex].status !== 'sold') {
      updatedSeats[rowIndex][seatIndex].status = updatedSeats[rowIndex][seatIndex].status === 'selected' ? 'available' : 'selected';
    }
    setSeats(updatedSeats);
  };

  return (
    <div>
      <MovieBar movieName={movie.name} theatreName={movie.theatre} />
      <ShowTime timings={timings} selectedTime={selectedTime} onSelectTime={handleSelectTime} />
      <SeatLayout
        seats={seats}
        onSelectSeat={handleSelectSeat}
        showTime={selectedTime}
        movieName={movie.name}
        theatre={movie.theatre}
      />
    </div>
  );
};

export default MainPage;
