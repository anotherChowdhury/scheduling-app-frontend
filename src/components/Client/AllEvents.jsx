/* eslint-disable arrow-body-style */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import Event from './Events';
import './AllEvents.scss';

function AllEvents({ match }) {
  const { admin } = match.params;

  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function getData() {
      try {
        const response = await Axios.get(`/api/event/${admin}/all`);
        console.log(response.data.events);
        setLoading(false);
        setEvents(response.data.events);
      } catch (err) {
        console.log(err.response);
        setLoading(false);
        setEvents(err.response.data.events);
        setError(err.response.message);
      }
    }

    getData();
  }, []);

  if (loading) return <h1> LOADING </h1>;
  if (error) return <h1>{error}</h1>;

  return (
    <div>
      <h1>Client will see all events by an admin here</h1>
      {events.map((event) => (
        <Event event={event} admin={admin} />
      ))}
    </div>
  );
}

export default AllEvents;
