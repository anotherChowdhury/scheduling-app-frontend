import React, { useState } from 'react';
import Reschedule from './Reschedule';

function Appointment({
  appointment: { id, event, date, start, booked, yetToConfirm },
  delete: { deleteAppointment },
  reschedule: { appointmentRescheduled },
}) {
  const [reschedule, setReschedule] = useState(false);

  if (reschedule) {
    return (
      <Reschedule appointment={(id, date, event, start, booked, yetToConfirm, appointmentRescheduled, setReschedule)} />
    );
  }
  return (
    <div>
      <p>
        {date} - {start} -{' '}
        {booked.length
          ? booked.map((booking) => (
              <span>
                {booking.clientName} {booking.clientEmail} - Confrimed -{' '}
                <button type="button" onClick={() => deleteAppointment(id, booking.clientEmail)}>
                  deleteAppointment
                </button>
              </span>
            ))
          : ''}
        {yetToConfirm.length
          ? yetToConfirm.map((booking) => (
              <span>
                {booking.clientName} {booking.clientEmail} - Not Confrimed{' '}
                <button type="button" onClick={() => deleteAppointment(id, booking.clientEmail)}>
                  deleteAppointment
                </button>
              </span>
            ))
          : ''}
      </p>

      <button type="button" onClick={() => deleteAppointment(id)}>
        deleteAppointment Appointment With All Booking
      </button>
      <button type="button" onClick={setReschedule(true)}>
        Reschedule Appointment
      </button>
    </div>
  );
}

export default Appointment;
