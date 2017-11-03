import 'semantic-ui-css/semantic.min.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';

import ChatList from './layouts/ChatList';

class App extends Component {
  render() {
    return (
      <Router>
        <MainLayout>
          <Switch>
            <Route path="/chatlist" exact component={ChatList} />
          </Switch>
        </MainLayout>
      </Router>
    );
  }
}

export default App;
