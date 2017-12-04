import 'semantic-ui-css/semantic.min.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import decode from 'jwt-decode';

import MainLayout from './layouts/MainLayout';
import Login from './layouts/Login';
import SignUp from './layouts/SignUp';
import RightColumn from './layouts/RightColumn';

import ChatList from './layouts/ChatList';

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');
  try {
    decode(token);
    decode(refreshToken);
  } catch (err) {
    return false;
  }

  return true;
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      (isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
          }}
        />
      ))
    }
  />
);

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={SignUp} />
          <MainLayout>
            <PrivateRoute path="/" exact component={ChatList} />
            <PrivateRoute path="/:channelId" exact component={RightColumn} />
          </MainLayout>
        </Switch>
      </Router>
    );
  }
}

export default App;
