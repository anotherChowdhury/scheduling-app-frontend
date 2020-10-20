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
  });

  useEffect(() => {
    async function getData() {
      const response = await Axios.get('/api/owner/dashboard', {
        headers: { Authorization: localStorage.getItem('token') },
      });

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

  const showToday = () => setData({ ...data, showToday: true, showAll: false });
  const showAll = () => setData({ ...data, showToday: false, showAll: true });
  const showForm = () => {
    console.log(data.showForm);
    setData({ ...data, showForm: !data.showForm });
    console.log(data.showForm);
  };

  if (data.loading) return <div>Loading</div>;

  const deleteAppointment = async (id, date, email) => {
    try {
      let emailValue = '';
      if (email) emailValue = `?email=${email}`;
      await Axios.delete(`/api/appointment/${id}${emailValue}`);
      if (new Date() == new Date(date)) {
        let appointmentsForTheDay;
        const allAppointments = data.allAppointments.filter((appointment) => {
          if (appointment.date == date && appointment.id !== id) {
            appointmentsForTheDay.push(appointment);
          }

          return appointment.id !== id;
        });

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
      const allAppointments = data.allAppointments.filter(
        (appointment) => appointment.event !== id
      );

      const appointmentsForTheDay = data.appointmentsFortheDay.filter(
        (appointment) => appointment.event !== id
      );
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

    if (new Date() == new Date(rescheduledAppointment.date)) {
      allAppointments = allAppointments.filter((appointment) => {
        if (
          // eslint-disable-next-line operator-linebreak
          appointment.date == rescheduledAppointment &&
          rescheduledAppointment.id !== oldId
        ) {
          appointmentsForTheDay.push(appointment);
        }

        return appointment.id !== oldId;
      });

      setData({
        ...data,
        allAppointments: allAppointments,
        appointmentsForTheDay: appointmentsForTheDay,
      });
    }
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
        All Appoiyntments
      </button>
      <button onClick={showToday} type="button">
        Today's Appointments
      </button>

      {data.showForm ? <AddEvent toggle={showForm} add={addEvent} /> : ''}
      {data.events.map((event, idx) => (
        <Event key={`event${idx + 1}`} event={event} delete={deleteEvent} />
      ))}

      {data.showAll
        ? data.allAppointments.map((appointment) => (
            <Appointment
              appointment={appointment}
              delete={deleteAppointment}
              reschedule={appointmentRescheduled}
            />
          ))
        : ''}

      {data.showToday
        ? data.appointmentsFortheDay.map((appointment) => (
            <Appointment
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
