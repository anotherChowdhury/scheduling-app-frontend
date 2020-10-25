import Axios from 'axios';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import './Login.scss';

function Login() {
  const [data, setData] = useState({
    email: '',
    password: '',
    error: false,
  });

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // eslint-disable-next-line consistent-return
  const onSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    console.log(email, password);

    const response = await Axios.post('https://afternoon-sea-95120.herokuapp.com/owner/login', {
      email,
      password,
    });
    if (response.request.status === 200) {
      localStorage.setItem('token', response.data.token);
      setData({ redirect: true });
    } else {
      setData({ ...data, error: true });
    }
  };

  if (data.redirect) return <Redirect to="/admin" />;
  return (
    <div className="login">
      <form className="login-form" onSubmit={onSubmit}>
        {data.error ? <p className="warning">Wrong Credentials </p> : ''}
        <input type="email" name="email" placeholder="Email" onChange={onChange} value={data.email} required />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={onChange}
          value={data.password}
          required
        />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default Login;
