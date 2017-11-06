import 'semantic-ui-css/semantic.min.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import ChatList from './layouts/ChatList';
import Login from './layouts/Login';
import SignUp from './layouts/SignUp';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/signup" exact component={SignUp} />
          <MainLayout>
            <Route path="/chatlist" component={ChatList} />
          </MainLayout>
        </Switch>
      </Router>
    );
  }
}

export default App;
