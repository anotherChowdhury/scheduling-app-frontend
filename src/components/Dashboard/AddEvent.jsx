/* eslint-disable guard-for-in */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import Axios from 'axios';

// eslint-disable-next-line no-unused-vars
function AddEvent({ toggle: showForm, add: addEvent }) {
  const [data, setData] = useState({
    name: '',
    price: '',
    duration: '',
    capacity: '',
    timeSlotLength: '',
    schedule: {},
    SUN: true,
    MON: true,
    TUE: true,
    WED: true,
    THU: true,
    FRI: true,
    SAT: true,
  });

  const onChange = (e) => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const onClicked = (e) => {
    console.log(data[e.target.name]);
    if (data.schedule[e.target.name]) {
      const { schedule } = data;
      delete schedule[e.target.name];
      console.log(schedule);
      setData({ ...data, schedule: schedule, [e.target.name]: true });
      console.log(schedule);
    } else {
      setData({ ...data, [e.target.name]: !data[e.target.name] });
    }
  };
  const addToSchedule = (e) => {
    // eslint-disable-next-line prefer-destructuring
    const schedule = data.schedule;
    // eslint-disable-next-line no-cond-assign
    if (schedule[e.target.name] == '') delete schedule[e.target.name];
    else schedule[e.target.name] = e.target.value;
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

    console.log(schedule);
    try {
      const response = await Axios.post(
        '/api/event/new',
        {
          name: data.name,
          price: data.price,
          duration: data.duration,
          capacity: data.capacity,
          schedule: schedule,
          timeSlotLength: data.timeSlotLength || data.duration,
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
        <div className="flex">
          <div className="left">
            <div className="form-element">
              <input type="text" placeholder="Name" name="name" value={data.name} onChange={onChange} required />
            </div>
            <div className="form-element">
              <input type="number" placeholder="Price" name="price" value={data.price} onChange={onChange} required />
            </div>
            <div className="form-element">
              <input
                type="number"
                placeholder="Duration in minutes"
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
              <input
                type="number"
                placeholder="Time Slot Length in minutes"
                name="timeSlotLength"
                value={data.timeSlotLength}
                onChange={onChange}
              />
            </div>
            <button
              type="submit"
              // eslint-disable-next-line no-unneeded-ternary
              disabled={Object.keys(data.schedule).length > 0 ? false : true}
            >
              Add Event
            </button>
          </div>
          <div className="right">
            <div className="form-element">
              <div className="day">
                <input type="checkbox" name="SUN" id="SUN" onClick={onClicked} />
                <label htmlFor="SUN"> Sunday </label>
                <input
                  type="text"
                  name="SUN"
                  disabled={data.SUN}
                  placeholder="8:00AM-1PM,2:30PM-5:30PM"
                  value={data.schedule.SUN || ''}
                  onChange={addToSchedule}
                  required={data.SUN}
                />
              </div>
              <div className="day">
                <input type="checkbox" name="MON" id="MON" onClick={onClicked} />

                <label htmlFor="MON"> Monday </label>
                <input
                  type="text"
                  name="MON"
                  disabled={data.MON}
                  placeholder="8:00AM-1PM,2:30PM-5:30PM"
                  value={data.schedule.MON || ''}
                  onChange={addToSchedule}
                  required={data.MON}
                />
              </div>

              <div className="day">
                <input type="checkbox" name="TUE" id="TUE" onClick={onClicked} />

                <label htmlFor="TUE"> Tuesday </label>
                <input
                  type="text"
                  name="TUE"
                  disabled={data.TUE}
                  placeholder="8:00AM-1PM,2:30PM-5:30PM"
                  value={data.schedule.TUE || ''}
                  onChange={addToSchedule}
                  required={data.TUE}
                />
              </div>
              <div className="day">
                <input type="checkbox" name="WED" id="WED" onClick={onClicked} />

                <label htmlFor="WED"> Wednesday </label>
                <input
                  type="text"
                  name="WED"
                  disabled={data.WED}
                  placeholder="8:00AM-1PM,2:30PM-5:30PM"
                  value={data.schedule.WED || ''}
                  onChange={addToSchedule}
                  required={data.WED}
                />
              </div>

              <div className="day">
                <input type="checkbox" name="THU" id="THU" onClick={onClicked} />

                <label htmlFor="THU"> Thursday </label>
                <input
                  type="text"
                  name="THU"
                  disabled={data.THU}
                  placeholder="8:00AM-1PM,2:30PM-5:30PM"
                  value={data.schedule.THU || ''}
                  onChange={addToSchedule}
                  required={data.THU}
                />
              </div>

              <div className="day">
                <input type="checkbox" name="FRI" id="FRI" onClick={onClicked} />

                <label htmlFor="FRI"> Friday </label>
                <input
                  type="text"
                  name="FRI"
                  disabled={data.FRI}
                  placeholder="8:00AM-1PM,2:30PM-5:30PM"
                  value={data.schedule.FRI || ''}
                  onChange={addToSchedule}
                  required={data.FRI}
                />
              </div>

              <div className="day">
                <input type="checkbox" name="SAT" id="SAT" onClick={onClicked} />

                <label htmlFor="SAT"> Saturday </label>
                <input
                  type="text"
                  name="SAT"
                  disabled={data.SAT}
                  placeholder="8:00AM-1PM,2:30PM-5:30PM"
                  value={data.schedule.SAT || ''}
                  onChange={addToSchedule}
                  required={data.SAT}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddEvent;
