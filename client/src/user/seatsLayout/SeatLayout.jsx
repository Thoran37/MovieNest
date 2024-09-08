import React, { useState, useEffect } from "react";
import "./SeatLayout.css";

const SeatLayout = ({ onSelectSeat, showTime, movieName, theatre }) => {
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    const generateSeatLayout = () => {
      const rows = [];
      const totalRows = 15;
      const columnsPerRow = 20;
      const categories = {
        classic: { startRow: 0, endRow: 9, price: 295 },
        balcony: { startRow: 10, endRow: 13, price: 350 },
        recliner: { startRow: 14, endRow: 14, price: 450 },
      };

      for (let i = 0; i < totalRows; i++) {
        let category;
        if (i <= categories.classic.endRow) category = "classic";
        else if (i <= categories.balcony.endRow) category = "balcony";
        else category = "recliner";

        const row = Array(columnsPerRow)
          .fill()
          .map((_, j) => ({
            number: j + 1,
            status: "available",
            category,
            price: categories[category].price,
          }));
        rows.push(row);
      }

      return rows;
    };

    setSeats(generateSeatLayout());
  }, []);

  const handleSeatClick = (rowIndex, seatIndex) => {
    const updatedSeats = [...seats];
    const seat = updatedSeats[rowIndex][seatIndex];

    if (seat.status === "available") {
      seat.status = "selected";
      setSelectedSeats([
        ...selectedSeats,
        { row: rowIndex, seat: seat.number, price: seat.price },
      ]);
    } else if (seat.status === "selected") {
      seat.status = "available";
      setSelectedSeats(
        selectedSeats.filter(
          (s) => !(s.row === rowIndex && s.seat === seat.number)
        )
      );
    }

    setSeats(updatedSeats);
    onSelectSeat(rowIndex, seatIndex);
  };

  const totalAmount = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
  const seatNames = selectedSeats
    .map((s) => `${String.fromCharCode(65 + s.row)}${s.seat}`)
    .join(", ");

  const confirmBooking = () => {
    console.log("Booking Confirmed", selectedSeats);
    // Add your booking logic here
  };

  const renderRow = (row, rowIndex) => (
    <div key={rowIndex} className="seat-row">
      <span className="row-label">{String.fromCharCode(65 + rowIndex)}</span>
      {row.map((seat, seatIndex) => (
        <div
          key={seatIndex}
          className={`seat ${seat.status} ${seat.category}`}
          onClick={() => handleSeatClick(rowIndex, seatIndex)}
        >
          {seat.number}
        </div>
      ))}
    </div>
  );

  return (
    <div className="seat-layout">
      <div className="seat-category-container">
        <div className="seat-category">
          <span>Classic Seats - ₹295</span>
        </div>
        {seats.slice(0, 10).map((row, index) => renderRow(row, index))}

        <div className="seat-category">
          <span>Balcony Seats - ₹350</span>
        </div>
        {seats.slice(10, 14).map((row, index) => renderRow(row, index + 10))}

        <div className="seat-category">
          <span>Recliner Seats - ₹450</span>
        </div>
        {seats.slice(14).map((row, index) => renderRow(row, index + 14))}
      </div>

      <div className="selected-seat-card">
        <h3>Selected Seats Information</h3>
        <p>Total Seats Selected: {selectedSeats.length}</p>
        <p>Total Amount: ₹{totalAmount}</p>
        <p>Selected Seats: {seatNames}</p>
      </div>

      <button className="confirm-booking-button" onClick={confirmBooking}>
        Confirm Booking
      </button>
    </div>
  );
};

export default SeatLayout;
