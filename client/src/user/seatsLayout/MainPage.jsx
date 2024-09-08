import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import MovieBar from './MovieBar';
import ShowTime from './ShowTime';
import SeatLayout from './SeatLayout';
import './MainPage.css';

const MainPage = () => {
  const location = useLocation();
  const { state } = location; // Get state from location
  const [movie, setMovie] = useState({});
  const [timings, setTimings] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [seats, setSeats] = useState([]);
  console.log(state)
  useEffect(() => {
    if (state && state.movie) {
      setMovie(state.movie);
    }

    const randomTimings = ["04:15 PM", "04:40 PM", "07:55 PM", "11:10 PM"];
    const randomSeats = [
      Array(10).fill().map((_, i) => ({ number: i + 1, status: 'available' })),
      Array(10).fill().map((_, i) => ({ number: i + 11, status: 'available' })),
    ];

    setTimings(randomTimings);
    setSeats(randomSeats);
  }, [state]);

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
      <MovieBar movieName={movie.title} theatreName={movie.theatre} />
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
