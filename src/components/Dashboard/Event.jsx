import React from 'react';

const Event = ({
  event: { id, name, price, duration, schedule },
  delete: deleteEvent,
}) => (
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
    <button type="button" onClick={() => deleteEvent(id)}>
      Delete Event{' '}
    </button>
  </div>
);

export default Event;
