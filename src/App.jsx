/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.scss';
import AllEvents from './components/Client/AllEvents';
import BookAppointment from './components/Client/BookAppointment';
import Dashboard from './components/Dashboard/Dashboard';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
// import PrivateRoute from './components/PrivateRoute';
import Register from './components/Register/Register';
function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact>
          <Register />
        </Route>
        <Route path="/register" exact>
          <Register />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/admin" exact>
          <Dashboard />
        </Route>
        <Route exact path="/:admin/all" component={AllEvents} />
        <Route exact path="/event/book" render={(props) => <BookAppointment {...props} />} />
      </Switch>
    </Router>
  );
}
export default App;
