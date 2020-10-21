/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable comma-dangle */
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import AddEvent from './AddEvent';
import Appointment from './Appointment';
import './Dashboard.scss';
import Event from './Event';

function Dashboard() {
  const [data, setData] = useState({
    allAppointments: [],
    appointmentsFortheDay: [],
    events: [],
    loading: true,
    showToday: false,
    showAll: false,
    showForm: false,
    showEvents: false,
  });

  useEffect(() => {
    async function getData() {
      const response = await Axios.get('/api/owner/dashboard', {
        headers: { Authorization: localStorage.getItem('token') },
      });
      console.log(response.data.events);
      setData({
        ...data,
        allAppointments: response.data.all,
        appointmentsFortheDay: response.data.today,
        events: response.data.events,
        loading: false,
      });
    }
    getData();
  }, []);

  const showToday = () =>
    setData({ ...data, showToday: !data.showToday, showAll: false, showEvents: false, showForm: false });

  const showAll = () =>
    setData({ ...data, showToday: false, showAll: !data.showAll, showEvents: false, showForm: false });

  const showForm = () => {
    setData({ ...data, showForm: !data.showForm, showToday: false, showAll: false, showEvents: false });
  };
  const showEvents = () =>
    setData({ ...data, showToday: false, showAll: false, showEvents: !data.showEvents, showForm: false });

  if (data.loading) return <div>Loading</div>;

  const deleteAppointment = async (id, date, email) => {
    try {
      let emailValue = '';
      if (email) emailValue = `?email=${email}`;
      await Axios.delete(`/api/appointment/${id}${emailValue}`);
      let currentDate = new Date();
      currentDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
      if (currentDate == date) {
        const appointmentsForTheDay = [];
        const allAppointments = data.allAppointments.filter((appointment) => {
          if (appointment.date == date && appointment.id !== id) {
            appointmentsForTheDay.push(appointment);
          }

          return appointment.id !== id;
        });

        console.log(appointmentsForTheDay);

        setData({
          ...data,
          appointmentsFortheDay: appointmentsForTheDay,
          allAppointments: allAppointments,
        });
      } else {
        const allAppointments = data.allAppointments.filter(
          // eslint-disable-next-line comma-dangle
          (appointment) => appointment.id !== id
        );

        setData({
          ...data,
          allAppointments: allAppointments,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteEvent = async (id) => {
    try {
      await Axios.delete(`/api/event/${id}`);
      const events = data.events.filter((event) => event.id !== id);
      const allAppointments = data.allAppointments.filter((appointment) => appointment.event !== id);

      const appointmentsForTheDay = data.appointmentsFortheDay.filter((appointment) => appointment.event !== id);
      setData({
        ...data,
        events: events,
        allAppointments: allAppointments,
        appointmentsFortheDay: appointmentsForTheDay,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const addEvent = (event) => {
    const { events } = data;
    events.push(event);
    setData({ ...data, events: events });
  };

  const appointmentRescheduled = (oldId, rescheduledAppointment) => {
    let { allAppointments } = data;
    const appointmentsForTheDay = [];
    let currentDate = new Date();
    currentDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
    allAppointments = allAppointments.filter((appointment) => {
      if (appointment.id !== oldId && appointment.date == currentDate) appointmentsForTheDay.push(appointment);
      return appointment.id !== oldId;
    });

    if (currentDate == rescheduledAppointment.date) {
      appointmentsForTheDay.push(rescheduledAppointment);
    }
    allAppointments.push(rescheduledAppointment);
    setData({
      ...data,
      allAppointments: allAppointments,
      appointmentsForTheDay: appointmentsForTheDay,
    });
  };

  const eventEdited = (event) => {
    const { events } = data;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < events.length; i++) {
      console.log(events[i]);
      if (events[i].id == event.id) events[i] = event;
      break;
    }
    console.log(events);
    setData({ ...data, events: events });
  };
  return (
    <div>
      <h1>Welcome to Admin Panel</h1>
      <p>All Appointments - {data.allAppointments.length}</p>
      <p>Todays Appointments - {data.appointmentsFortheDay.length}</p>
      <button type="button" onClick={showForm}>
        {' '}
        Add Event{' '}
      </button>
      <button onClick={showAll} type="button">
        All Appointments
      </button>
      <button onClick={showToday} type="button">
        Today's Appointments
      </button>
      <button onClick={showEvents} type="button">
        Show All Events
      </button>

      {data.showForm ? <AddEvent toggle={showForm} add={addEvent} /> : ''}
      {data.showEvents
        ? data.events.map((event, idx) => (
            <Event key={`event${idx + 1}`} event={event} delete={deleteEvent} edit={eventEdited} />
          ))
        : ''}

      {data.showAll
        ? data.allAppointments.map((appointment) => (
            <Appointment
              key={appointment.id}
              appointment={appointment}
              delete={deleteAppointment}
              reschedule={appointmentRescheduled}
            />
          ))
        : ''}

      {data.showToday
        ? data.appointmentsFortheDay.map((appointment) => (
            <Appointment
              key={appointment.id}
              appointment={appointment}
              delete={deleteAppointment}
              reschedule={appointmentRescheduled}
            />
          ))
        : ''}
    </div>
  );
}

export default Dashboard;
