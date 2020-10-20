import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

function Event({ event: { id, name, price, duration, schedule }, admin }) {
  const [book, setBook] = useState(false);

  const onClick = () => setBook(true);

  // eslint-disable-next-line curly
  if (book)
    // eslint-disable-next-line nonblock-statement-body-position
    return (
      <Redirect
        to={{
          pathname: '/event/book',
          state: { id: id, name: name, price: price, duration: duration, schedule: schedule, admin: admin },
        }}
      />
    );
  return (
    <div className="event" key={id}>
      <p>Name: {name}</p>
      <p>Price: {price}</p>
      <p>Duration - {duration}</p>
      <p>Schedule</p>
      {Object.keys(schedule).map((day) => (
        <p key={day}>
          {day} -{' '}
          {schedule[day].map((slot, idx) => (
            <span key={idx}>
              {slot.start} - {slot.end}
            </span>
          ))}
        </p>
      ))}
      <button type="button" onClick={onClick}>
        Book an appointment
      </button>
    </div>
  );
}

export default Event;
