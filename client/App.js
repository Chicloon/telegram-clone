import 'semantic-ui-css/semantic.min.css';
import React from 'react';
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
    const { exp } = decode(refreshToken);
    if (Date.now() / 1000 > exp) {
      console.log('token expired');
      return false;
    }
  } catch (err) {
    console.log('wrong token');
    return false;
  }
  console.log('token valid');
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

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={SignUp} />
          <MainLayout>
            <PrivateRoute path="/channels" exact component={ChatList} />
            <PrivateRoute path="/channels/:channelId" exact component={RightColumn} />
          </MainLayout>
        </Switch>
      </Router>
    );
  }
}

export default App;
