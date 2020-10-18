import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.scss';
import Admin from './components/Admin/Admin';
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
        <Route path="/admin">
          <Admin />
        </Route>
      </Switch>
    </Router>
  );
}
export default App;
