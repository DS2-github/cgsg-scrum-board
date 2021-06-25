import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import mainPage from './pages/main/main-page'
import SignIn from './pages/sign-in-up/sign-in'
import SignUp from './pages/sign-in-up/sign-up'

const routes = [
    { path: '/', Component: mainPage },
    { path: '/signIn', Component: SignUp },
    { path: '/signUp', Component: SignIn },
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
