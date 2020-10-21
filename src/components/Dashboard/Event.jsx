import React, { useState } from 'react';
import EditEvent from './EditEvent';

const Event = ({
  event: { id, name, price, duration, schedule, capacity },
  delete: deleteEvent,
  edit: eventEdited,
}) => {
  console.log(schedule);
  const [edit, setEdit] = useState(false);

  if (edit) {
    const scheduleString = { ...schedule };
    Object.keys(scheduleString).forEach((key) => {
      let slotString = '';
      scheduleString[key].forEach((slot) => {
        slotString += `${slot.start}-${slot.end},`;
      });
      // eslint-disable-next-line no-param-reassign
      slotString = slotString.slice(0, -1);
      // eslint-disable-next-line no-param-reassign
      scheduleString[key] = slotString;
    });

    // eslint-disable-next-line nonblock-statement-body-position
    return (
      <EditEvent
        event={{
          id: id,
          name: name,
          price: price,
          duration: duration,
          schedule: scheduleString,
          capacity: capacity,
          eventEdited: eventEdited,
          setEdit: setEdit,
        }}
      />
    );
  }
  return (
    <div className="event" key={id}>
      <p>Name: {name}</p>
      <p>Price: {price}</p>
      <p>Duration - {duration}</p>
      <p>Capacity - {capacity}</p>
      <p>Schedule</p>
      {Object.keys(schedule).map((day) => (
        <p key={day}>
          {day} -{' '}
          {schedule[day].map((slot, idx) => (
            <span key={`slot${idx + 1}`}>
              {slot.start} - {slot.end}
            </span>
          ))}
        </p>
      ))}
      <button type="button" onClick={() => deleteEvent(id)}>
        Delete Event{' '}
      </button>
      <button type="button" onClick={() => setEdit(true)}>
        Edit Event{' '}
      </button>
    </div>
  );
};

export default Event;
