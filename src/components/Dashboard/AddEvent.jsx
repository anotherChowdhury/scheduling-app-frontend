/* eslint-disable guard-for-in */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import Axios from 'axios';

function AddEvent({ toggle: showForm, add: addEvent }) {
  const [data, setData] = useState({
    name: '',
    price: '',
    duration: '',
    capacity: '',
    schedule: {},
    SUN: true,
    MON: true,
    TUE: true,
    WED: true,
    THU: true,
    FRI: true,
    SAT: true,
  });

  const onChange = (e) => setData({ ...data, [e.target.name]: e.target.value });
  const onChecked = (e) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    setData({ ...data, [e.target.name]: !data[e.target.name] });

  const addToSchedule = (e) => {
    // eslint-disable-next-line prefer-destructuring
    const schedule = data.schedule;
    schedule[e.target.name] = e.target.value;
    setData({ ...data, schedule: schedule });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const schedule = {};
    // eslint-disable-next-line no-restricted-syntax
    Object.keys(data.schedule).forEach((key) => {
      let slots = data.schedule[key].split(',');
      slots = slots.map((slot) => slot.split('-'));
      slots = slots.map((slot) => ({ start: slot[0], end: slot[1] }));

      schedule[key] = slots;
    });

    console.log(data.name, data.price, data.duration, data.capacity, schedule);
    try {
      const response = await Axios.post(
        '/api/event/new',
        {
          name: data.name,
          price: data.price,
          duration: data.duration,
          capacity: data.capacity,
          schedule: schedule,
        },
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        }
      );
      console.log(response.data);
      addEvent(response.data);
      showForm();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="add-event">
      <form className="add-event-form" onSubmit={handleSubmit}>
        <div className="form-element">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={data.name}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-element">
          <input
            type="number"
            placeholder="Price"
            name="price"
            value={data.price}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-element">
          <input
            type="number"
            placeholder="Duration"
            name="duration"
            value={data.duration}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-element">
          <input
            type="number"
            placeholder="Capacity"
            name="capacity"
            value={data.capacity}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-element">
          <div className="day">
            <input type="checkbox" name="SUN" id="SUN" onChange={onChecked} />
            <label htmlFor="SUN"> Sunday </label>
            <input
              type="text"
              name="SUN"
              disabled={data.SUN}
              placeholder="8:00AM-1PM,2:30PM-5:30PM"
              value={data.schedule.SUN}
              onChange={addToSchedule}
            />
          </div>
          <div className="day">
            <input type="checkbox" name="MON" id="MON" onChange={onChecked} />

            <label htmlFor="MON"> Monday </label>
            <input
              type="text"
              name="MON"
              disabled={data.MON}
              placeholder="8:00AM-1PM,2:30PM-5:30PM"
              value={data.schedule.MON}
              onChange={addToSchedule}
            />
          </div>

          <div className="day">
            <input type="checkbox" name="TUE" id="TUE" onChange={onChecked} />

            <label htmlFor="TUE"> Tuesday </label>
            <input
              type="text"
              name="TUE"
              disabled={data.TUE}
              placeholder="8:00AM-1PM,2:30PM-5:30PM"
              value={data.schedule.TUE}
              onChange={addToSchedule}
            />
          </div>
          <div className="day">
            <input type="checkbox" name="WED" id="WED" onChange={onChecked} />

            <label htmlFor="WED"> Wednesday </label>
            <input
              type="text"
              name="WED"
              disabled={data.WED}
              placeholder="8:00AM-1PM,2:30PM-5:30PM"
              value={data.schedule.WED}
              onChange={addToSchedule}
            />
          </div>

          <div className="day">
            <input type="checkbox" name="THU" id="THU" onChange={onChecked} />

            <label htmlFor="THU"> Thursday </label>
            <input
              type="text"
              name="THU"
              disabled={data.THU}
              placeholder="8:00AM-1PM,2:30PM-5:30PM"
              value={data.schedule.THU}
              onChange={addToSchedule}
            />
          </div>

          <div className="day">
            <input type="checkbox" name="FRI" id="FRI" onChange={onChecked} />

            <label htmlFor="FRI"> Friday </label>
            <input
              type="text"
              name="FRI"
              disabled={data.FRI}
              placeholder="8:00AM-1PM,2:30PM-5:30PM"
              value={data.schedule.FRI}
              onChange={addToSchedule}
            />
          </div>

          <div className="day">
            <input type="checkbox" name="SAT" id="SAT" onChange={onChecked} />

            <label htmlFor="SAT"> Saturday </label>
            <input
              type="text"
              name="SAT"
              disabled={data.SAT}
              placeholder="8:00AM-1PM,2:30PM-5:30PM"
              value={data.schedule.SAT}
              onChange={addToSchedule}
            />
          </div>
        </div>
        <button
          type="submit"
          // eslint-disable-next-line no-unneeded-ternary
          disabled={Object.keys(data.schedule).length > 0 ? false : true}
        >
          Add Event
        </button>
      </form>
    </div>
  );
}

export default AddEvent;
