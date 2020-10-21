import Axios from 'axios';
import React, { useState } from 'react';

function Reschedule({
  appointment: { id, event, name, start, date, booked, yetToConfirm, appointmentRescheduled, setReschedule },
}) {
  // console.log(id, event, date, start, booked, yetToConfirm);

  const [slots, setSlots] = useState([]);
  const [error, setError] = useState('');
  const [selectedDate, setDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const catchDate = async (e) => {
    e.persist();
    console.log(e.target.value);
    try {
      const response = await Axios.get(`/api/event/${event}/availability?date=${e.target.value}`);
      let times = response.data.slots;
      times = Object.keys(times);
      times = times.filter((key) => response.data.slots[key] > 0);
      setError('');
      setSlots(times);
      setDate(e.target.value);
      setSelectedSlot('');
    } catch (err) {
      console.log(err.data);
      setSlots([]);
      setDate('');
      setError(err.response.data.message);
    }
  };

  const onChange = (e) => {
    console.log(e.target.value);
    setSelectedSlot(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.put(
        `/api/appointment/reschedule/one/${id}`,
        {
          date: selectedDate,
          time: selectedSlot,
        },
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        }
      );
      console.log(response.data);
      appointmentRescheduled(id, response.data.rescheduledAppointment);
      setReschedule(false);
    } catch (err) {
      console.log(err);
      console.log(err.respone);
      setSlots([]);
      setDate('');
      setError(err.response.data.message);
    }
  };
  return (
    <div className="reschedule">
      {error ? <p>{error}</p> : ''}
      <p>{name}</p>
      <p>Current Date - {date}</p>
      <p>Current Time - {start}</p>
      {booked && booked.length > 0
        ? booked.map((booking, idx) => (
            <span key={`booking${idx + 1}`}>
              {booking.clientName} {booking.clientEmail} - Confrimed -{' '}
            </span>
          ))
        : ''}
      {yetToConfirm && yetToConfirm.length > 0
        ? yetToConfirm.map((booking, idx) => (
            <span key={`unconfirmedBooking${idx + 1}`}>
              {booking.clientName} {booking.clientEmail} - Not Confrimed{' '}
            </span>
          ))
        : ''}

      <form onSubmit={handleSubmit} className="reschedule-form">
        <input type="date" id="date" name="date" onChange={catchDate} required />
        {slots.length > 0 ? (
          <>
            <label htmlFor="slots">
              Slots:{' '}
              <select
                name="slots"
                id="slots"
                placeholder="Select time"
                onChange={onChange}
                value={selectedSlot}
                required
              >
                {slots.map((slot, idx) => (
                  <option key={`options${idx + 1}`} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </label>
            <button type="submit">Reschedule Appoitment</button>
          </>
        ) : (
          ''
        )}
      </form>
    </div>
  );
}

export default Reschedule;
