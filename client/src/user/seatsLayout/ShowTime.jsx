import React, { useState, useEffect } from 'react';
import './ShowTime.css';

const ShowTime = ({ timings, selectedTime, onSelectTime }) => {
  const [currentSelection, setCurrentSelection] = useState('');

  useEffect(() => {
    if (timings.length > 0) {
      // Set the first showtime as selected by default
      setCurrentSelection(timings[0]);
    }
  }, [timings]);

  useEffect(() => {
    if (currentSelection) {
      onSelectTime(currentSelection);
    }
  }, [currentSelection, onSelectTime]);

  return (
    <div className="timings-container">
      {timings.map((time, index) => (
        <button
          key={index}
          onClick={() => setCurrentSelection(time)}
          className={`timing-box ${currentSelection === time ? 'selected' : ''}`}
          style={{
            borderColor: currentSelection === time ? '#ff4c4c' : '#ddd',
            color: currentSelection === time ? '#ff4c4c' : '#000'
          }}
        >
          {time}
        </button>
      ))}
    </div>
  );
};

export default ShowTime;
