/* eslint-disable no-param-reassign */
/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable comma-dangle */
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import AddEvent from './AddEvent';
import Appointment from './Appointment';
import './Dashboard.scss';
import Event from './Event';
import Unavailable from './Unavailable';

function Dashboard() {
  const [data, setData] = useState({
    allAppointments: [],
    appointmentsFortheDay: [],
    unavailableDates: {},
    unavailableSlots: {},
    events: [],
    loading: true,
    showToday: false,
    showAll: false,
    showForm: false,
    showEvents: false,
    showUnavailable: false,
    signOut: false,
    id: '',
  });

  useEffect(() => {
    async function getData() {
      const response = await Axios.get('https://afternoon-sea-95120.herokuapp.com/owner/dashboard', {
        headers: { Authorization: localStorage.getItem('token') },
      });
      if (response.data.message) {
        console.log(response.data.message);
        setData({ ...data, loading: false });
      } else {
        setData({
          ...data,
          allAppointments: response.data.all,
          appointmentsForTheDay: response.data.today,
          events: response.data.events,
          loading: false,
          id: response.data.id,
          unavailableDates: response.data.unavailableDates,
          unavailableSlots: response.data.unavailableSlots,
        });
      }
    }
    getData();
  }, []);

  const showToday = () =>
    setData({
      ...data,
      showToday: !data.showToday,
      showAll: false,
      showEvents: false,
      showForm: false,
      showUnavailable: false,
    });

  const showAll = () =>
    setData({
      ...data,
      showToday: false,
      showAll: !data.showAll,
      showEvents: false,
      showForm: false,
      showUnavailable: false,
    });

  const showForm = () => {
    setData({
      ...data,
      showForm: !data.showForm,
      showToday: false,
      showAll: false,
      showEvents: false,
      showUnavailable: false,
    });
  };
  const showEvents = () =>
    setData({
      ...data,
      showToday: false,
      showAll: false,
      showEvents: !data.showEvents,
      showForm: false,
      showUnavailable: false,
    });

  const showUnavailability = () =>
    setData({
      ...data,
      showToday: false,
      showAll: false,
      showEvents: false,
      showForm: false,
      showUnavailable: !data.showUnavailable,
    });
  if (data.loading) return <div>Loading</div>;

  const deleteAppointment = async (id, date, email) => {
    try {
      console.log(email);
      let emailValue = '';
      if (email) emailValue = `?email=${email}`;
      await Axios.delete(`https://afternoon-sea-95120.herokuapp.com/appointment/${id}${emailValue}`);
      let currentDate = new Date();
      currentDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
      if (!email) {
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
            appointmentsForTheDay: appointmentsForTheDay,
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
      } else if (currentDate == date) {
        const appointmentsForTheDay = [];
        const allAppointments = data.allAppointments.map((appointment) => {
          if (appointment.id == id) {
            appointment.booked = appointment.booked.filter((booking) => booking.clientEmail !== emailValue);
            appointment.yetToConfirm = appointment.yetToConfirm.filter((booking) => booking.clientEmail !== emailValue);
          }
          if (appointment.date == currentDate) appointmentsForTheDay.push(appointment);
          return appointment;
        });

        setData({ ...data, allAppointments, appointmentsForTheDay });
      } else {
        const allAppointments = data.allAppointments.map((appointment) => {
          console.log(emailValue);
          if (appointment.id == id) {
            console.log(appointment);
            appointment.booked = appointment.booked.filter((booking) => booking.clientEmail !== email);
            appointment.yetToConfirm = appointment.yetToConfirm.filter((booking) => booking.clientEmail !== email);
          }
          console.log(appointment);
          return appointment;
        });

        setData({ ...data, allAppointments });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteEvent = async (id) => {
    try {
      await Axios.delete(`https://afternoon-sea-95120.herokuapp.com/event/${id}`);
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

  const signOut = () => {
    localStorage.removeItem('token');
    setData({ ...data, signOut: true });
  };
  const eventEdited = (event) => {
    const { events } = data;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < events.length; i++) {
      if (events[i].id == event.id) {
        console.log(event);
        events[i] = event;
        break;
      }
    }
    setData({ ...data, events: events });
  };

  const unavailabilityAdded = (unavailableDates, unavailableSlots) => {
    console.log(unavailableDates);
    console.log(unavailableSlots);
    setData({ ...data, unavailableSlots: unavailableSlots, unavailableDates: unavailableDates });
  };

  if (data.signOut) return <Redirect to="/login" />;

  return (
    <div className="dashboard-container">
      <div className="sidebar">
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
        <button onClick={showUnavailability} type="button">
          Show All Unavailability
        </button>
        <button onClick={signOut} type="button">
          Log Out
        </button>
      </div>

      <div className="content">
        <h1>Welcome to Admin Panel</h1>
        <div className="stat">
          <div className="box">
            <p>All Appointments - {data.allAppointments.length}</p>
          </div>
          <div className="box">
            <p>Todays Appointments - {data.appointmentsFortheDay.length}</p>
          </div>
          {data.id ? (
            <div className="box">
              {' '}
              <Link to={`/${data.id}/all`}>Click here to book appointment </Link>{' '}
            </div>
          ) : (
            ''
          )}
        </div>

        {data.showForm ? <AddEvent toggle={showForm} add={addEvent} /> : ''}
        {data.showEvents
          ? data.events.map((event, idx) => (
              <Event key={`event${idx + 1}`} event={event} delete={deleteEvent} edit={eventEdited} />
            ))
          : ''}

        {data.showAll
          ? data.allAppointments.map((appointment) => (
              <Appointment
                key={Math.random().toString(36)}
                appointment={appointment}
                delete={deleteAppointment}
                reschedule={appointmentRescheduled}
              />
            ))
          : ''}

        {data.showToday
          ? data.appointmentsFortheDay.map((appointment) => (
              <Appointment
                key={Math.random().toString(36)}
                appointment={appointment}
                delete={deleteAppointment}
                reschedule={appointmentRescheduled}
              />
            ))
          : ''}

        {data.showUnavailable ? (
          <Unavailable
            key={Math.random().toString(36).slice(2, -1)}
            dates={data.unavailableDates}
            slots={data.unavailableSlots}
            update={unavailabilityAdded}
          />
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default Dashboard;
