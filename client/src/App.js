import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';

import MainPage from './pages/main/MainPage.js'

const routes = [
  { path: '/', Component: MainPage },
]

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          {routes.map(({ path, Component }) => (
            <Route key={path} path={path} exact>
              <Component />
            </Route>
          ))}
        </Switch>
      </Router>
    );
  }
}

export default App;