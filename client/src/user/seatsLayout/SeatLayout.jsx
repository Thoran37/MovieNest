import React, { useState, useEffect } from 'react';
import './SeatLayout.css';

const SeatLayout = ({ onSelectSeat, showTime, movieName, theatre }) => {
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    const generateSeatLayout = () => {
      const rows = [];
      const totalRows = 15;
      const columnsPerRow = 20;
      const categories = {
        classic: { startRow: 0, endRow: 9, price: 295 },
        balcony: { startRow: 10, endRow: 13, price: 350 },
        recliner: { startRow: 14, endRow: 14, price: 450 }
      };

      for (let i = 0; i < totalRows; i++) {
        let category;
        if (i <= categories.classic.endRow) category = 'classic';
        else if (i <= categories.balcony.endRow) category = 'balcony';
        else category = 'recliner';

        const row = Array(columnsPerRow).fill().map((_, j) => ({
          number: j + 1,
          status: 'available',
          category,
          price: categories[category].price
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
    seat.status = seat.status === 'available' ? 'selected' : 'available';
    setSeats(updatedSeats);

    const seatData = {
      row: rowIndex,
      column: seat.number,
      showTime,
      movieName,
      theatre
    };
    console.log(seatData);
    onSelectSeat(rowIndex, seatIndex);
  };

  return (
    <div className="seat-layout">
      {seats.map((row, rowIndex) => (
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
      ))}
      <div className="seat-legend">
        <div className="legend-item">
          <div className="seat available"></div>
          <span>Available</span>
        </div>
        <div className="legend-item">
          <div className="seat selected"></div>
          <span>Selected</span>
        </div>
        <div className="legend-item">
          <div className="seat sold"></div>
          <span>Sold</span>
        </div>
      </div>
    </div>
  );
};

export default SeatLayout;
