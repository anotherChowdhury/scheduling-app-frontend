import Axios from 'axios';
import React, { useState } from 'react';

function Unavailable({ dates, slots, update: unavailabilityAdded }) {
  const [data, setData] = useState({
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    showForm: false,
  });

  const onClick = () => setData({ ...data, showForm: true });
  const onChange = (e) => {
    console.log(e.target.value);
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    const response = await Axios.post(
      'https://afternoon-sea-95120.herokuapp.com/owner/unavailable',
      {
        startDate: data.startDate,
        endDate: data.endDate,
        startTime: data.startTime,
        endTime: data.endTime,
      },
      { headers: { Authorization: localStorage.getItem('token') } }
    );

    unavailabilityAdded(response.data.unavailableDates, response.data.unavailableSlots)();
    setData({ startDate: '', endDate: '', startTime: '', endTime: '', showForm: false });
  };
  return (
    <div className="unavailable-container">
      {data.showForm ? (
        ''
      ) : (
        <button onClick={onClick} type="button">
          Add Vacation/Unavailability
        </button>
      )}
      {data.showForm ? (
        <form className="unavailable-form" onSubmit={handleSubmit}>
          <label htmlFor="startDate">
            {' '}
            From:
            <input type="date" name="startDate" id="startDate" onChange={onChange} required />
          </label>
          <label htmlFor="startTime">
            {' '}
            at:
            <input
              type="text"
              name="startTime"
              id="startTime"
              placeholder="9:30 AM"
              onChange={onChange}
              value={data.startTime}
            />
          </label>
          <label htmlFor="endDate">
            {' '}
            To:
            <input type="date" name="endDate" id="endDate" placeholder="9:30 AM" onChange={onChange} required />
          </label>
          <label htmlFor="endTime">
            {' '}
            at:
            <input
              type="text"
              name="endTime"
              id="endTime"
              placeholder="4:30 AM"
              onChange={onChange}
              value={data.endTime}
            />
          </label>
          <button type="submit">Make Unavailable</button>
        </form>
      ) : (
        ''
      )}
      <div className="dates">
        {dates && Object.keys(dates).length > 0 ? (
          Object.keys(dates).map((year) => (
            <p key={Math.random().toString(36).slice(2, -1)}>
              {year} -
              {Object.keys(dates[year]).map((month) => (
                <span key={Math.random().toString(36).slice(2, -1)}>
                  {month} -{'  '}
                  {dates[year][month].map((day) => (
                    <span key={Math.random().toString(36).slice(2, -1)}>
                      {day}
                      {'  '}
                    </span>
                  ))}
                </span>
              ))}
              <br />
            </p>
          ))
        ) : (
          <p>NO UNAVAILABLE DATES</p>
        )}
      </div>
      <div className="slots">
        {slots && Object.keys(slots).length > 0 ? (
          Object.keys(slots).map((date) => (
            <p key={date}>
              {date}
              {'  '}
              {slots[date].map((slot) => (
                <span key={`${slot.start}-${slot.end}`}>
                  {' '}
                  {slot.start}-{slot.end}{' '}
                </span>
              ))}
              <br />
            </p>
          ))
        ) : (
          <p>NO UNAVAILABLE SLOT</p>
        )}
      </div>
    </div>
  );
}

export default Unavailable;
