import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import './Register.scss';
function Register() {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    warning: false,
    error: false,
    redirect: false,
  });

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const checkPassword = (e) => {
    if (e.target.value && e.target.value !== data.password) {
      setData({ ...data, warning: true });
    } else {
      setData({ ...data, warning: false });
    }
  };

  // eslint-disable-next-line consistent-return
  const onSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = data;
    console.log({ name, email, password });
    try {
      const response = await axios.post('/api/owner/signup', {
        name,
        email,
        password,
      });
      console.log(response.status);
      console.log(typeof response.status);
      if (response.status === 201) setData({ ...data, redirect: true });
    } catch (err) {
      console.log(err);
      console.log(err.response);
      setData({ ...data, error: err.response.data.message });
    }
  };

  if (data.redirect) return <Redirect to="/login" />;

  return (
    <div className="signup">
      <form className="signup-form" onSubmit={onSubmit}>
        {data.warning ? <p className="warning">Passwords don't match</p> : ''}
        {data.error ? <p className="warning">{data.error}</p> : ''}

        <input
          type="text"
          placeholder="Name"
          name="name"
          required
          onChange={onChange}
          value={data.name}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={onChange}
          value={data.email}
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={data.password}
          onChange={onChange}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirm-password"
          required
          onChange={checkPassword}
        />
        <button type="submit" disabled={data.warning}>
          Register
        </button>
        <p>
          Already Registered ?<Link to="/login"> Login </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
