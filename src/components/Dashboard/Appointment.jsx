import React, { useState } from 'react';
import Reschedule from './Reschedule';

function Appointment({
  appointment: { id, event, date, start, booked, yetToConfirm },
  delete: deleteAppointment,
  reschedule: appointmentRescheduled,
}) {
  const [reschedule, setReschedule] = useState(false);

  if (reschedule == true) {
    return (
      <Reschedule
        appointment={{
          id: id,
          date: date,
          event: event,
          start: start,
          booked: booked,
          yetToConfirm: yetToConfirm,
          appointmentRescheduled: appointmentRescheduled,
          setReschedule: setReschedule,
        }}
      />
    );
  }
  return (
    <div className="appointment">
      <p>
        {date} - {start} -{' '}
        {booked.length
          ? booked.map((booking, idx) => (
              <span key={`booking${idx + 1}`} className="appointment-booking">
                {booking.clientName} {booking.clientEmail} - Confrimed -{' '}
                <button type="button" onClick={() => deleteAppointment(id, date, booking.clientEmail)}>
                  Delete Appointment for this client
                </button>
              </span>
            ))
          : ''}
        {yetToConfirm.length
          ? yetToConfirm.map((booking, idx) => (
              <span key={`unConfirmedB  ooking${idx + 1}`} className="appointment-booking">
                {booking.clientName} {booking.clientEmail} - Not Confrimed{' '}
                <button type="button" onClick={() => deleteAppointment(id, date, booking.clientEmail)}>
                  Delete Appointment for this client
                </button>
              </span>
            ))
          : ''}
      </p>

      <button type="button" onClick={() => deleteAppointment(id, date)}>
        Delete Appointment With All Booking
      </button>
      <button type="button" onClick={() => setReschedule(true)}>
        Reschedule Appointment
      </button>
    </div>
  );
}

export default Appointment;
