/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-confusing-arrow */
/* eslint-disable function-paren-newline */
/* eslint-disable nonblock-statement-body-position */
/* eslint-disable react/destructuring-assignment */
import Axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './BookAppointment.scss';

function BookAppointment(props) {
  const { id, name, price, duration, admin, schedule } = props.location.state;
  const [slots, setSlots] = useState({});
  const [error, setError] = useState('');
  const [confirm, setConfirm] = useState(false);
  // const [slotsWithID, setSlotsWithId] = useState(false);

  const [data, setData] = useState({
    date: '',
    time: '',
    name: '',
    email: '',
  });
  console.log(data.time);
  const onChange = (e) => setData({ ...data, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(data.time);
      const timeSlot = slots[data.time];
      let postData = {};
      if (timeSlot.id) {
        postData = { ...data, id: timeSlot.id, event: id };
      } else {
        postData = { ...data, event: id };
      }

      await Axios.post('https://afternoon-sea-95120.herokuapp.com/appointment/new', postData);
      setConfirm(true);
    } catch (err) {
      console.log(err.response);
      setError(err.response.data.message);
    }
  };
  const catchDate = async (e) => {
    e.persist();
    console.log(e.target.value);
    try {
      const response = await Axios.get(
        `https://afternoon-sea-95120.herokuapp.com/event/${id}/availability?date=${e.target.value}`
      );
      //const available = keys.filter((key) => response.data.slots[key].capacity > 0);
      setError('');
      console.log(Object.keys(response.data.slots));
      setSlots(response.data.slots);
      setData({ ...data, date: e.target.value, time: '' });
    } catch (err) {
      console.log(err.response);
      setError(err.response.data.message);
      setData({ ...data, date: '', time: '' });
      setSlots([]);
    }
  };

  // eslint-disable-next-line curly
  if (confirm)
    return (
      <div>
        <h1>Appointment Confirmed!! You'll receive an email shortly</h1>
        <Link to={`/${admin}/all`}>Check Other Services by {name}</Link>
      </div>
    );

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="booking-form">
        <p>Name - {name}</p>
        <p>Price - {price}</p>
        <p>Duration - {duration}</p>
        {Object.keys(schedule).map((day) => (
          <p key={day}>
            {day} -{' '}
            {schedule[day].map((slot, idx) => (
              <span key={`option${idx + 1}`}>
                {slot.start} - {slot.end}
                {'  '}
              </span>
            ))}
          </p>
        ))}
        <p>Book Appointment</p>
        {error ? <p>{error}</p> : ''}
        <label htmlFor="date">
          {' '}
          Select Date:
          <input type="date" name="date" id="date" onChange={catchDate} required />
        </label>
        {slots && Object.keys(slots).length > 0 ? (
          <>
            <label htmlFor="slots">
              Slots:
              <select name="time" id="time" placeholder="Select time" onChange={onChange} value={data.time} required>
                {Object.keys(slots).map((slot, idx) =>
                  slots[slot].capacity > 0 ? (
                    <option key={`option${idx + 1}`} value={slot}>
                      {slot} - {slots[slot].capacity}
                    </option>
                  ) : (
                    ''
                  )
                )}
              </select>
            </label>

            <input type="text" name="name" placeholder="Name" onChange={onChange} value={data.name} required />
            <input type="email" name="email" placeholder="Email" onChange={onChange} value={data.email} required />
            <button type="submit">Book Appoitment</button>
          </>
        ) : (
          ''
        )}
      </form>
    </div>
  );
}

export default BookAppointment;
