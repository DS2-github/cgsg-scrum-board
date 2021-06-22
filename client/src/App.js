import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import mainPage from './pages/main/mainPage'

const routes = [
    { path: '/', Component: mainPage },
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