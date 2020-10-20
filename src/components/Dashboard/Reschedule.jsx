import Axios from 'axios';
import React, { useState } from 'react';

function Reschedule({ id, event, name, start, date, booked, yetToConfirm, appointmentRescheduled, setReschedule }) {
  const [slots, setSlots] = useState([]);
  const [error, setError] = useState('');
  const [selectedDate, setDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const catchDate = async (e) => {
    console.log(e.target.value);
    try {
      const response = await Axios.get(`/api/event/${event}/availability?date=${e.target.value}`);

      let times = response.data.slots;
      times = Object.keys(times);
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

  const onChange = (e) => setSelectedSlot(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const response = Axios.put(
        `/api/reschedule/one/${id}`,
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

      appointmentRescheduled(id, response.data.appointment);
      setReschedule(false);
    } catch (err) {
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
      {booked.length > 0
        ? booked.map((booking) => (
            <span>
              {booking.clientName} {booking.clientEmail} - Confrimed -{' '}
            </span>
          ))
        : ''}
      {yetToConfirm.length > 0
        ? yetToConfirm.map((booking) => (
            <span>
              {booking.clientName} {booking.clientEmail} - Not Confrimed{' '}
            </span>
          ))
        : ''}

      <form onSubmit={handleSubmit}>
        <input type="date" id="date" name="date" onChange={catchDate} value={selectedDate} />
        {slots.length > 0 ? (
          <>
            <label htmlFor="slots">
              Slots:
              <select name="slots" id="slots" placeholder="Select time" onChange={onChange} value={selectedSlot}>
                {slots.map((slot) => (
                  <option value={slot}>{slot}</option>
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
