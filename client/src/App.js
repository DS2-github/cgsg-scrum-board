import React, { Component, useContext, useEffect } from 'react';
import { Redirect, BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Context } from './index'

import mainPage from './pages/main/main-page'
import SignIn from './pages/sign-in-up/sign-in'
import SignUp from './pages/sign-in-up/sign-up'

const routes = [
    { path: '/', Component: mainPage },
    { path: '/signUp', Component: SignUp },
    { path: '/signIn', Component: SignIn },
]

function App(props) {
    const session = useContext(Context);

    return (
        <Router>
            {session.isLoggedIn ? <Redirect to='/' /> : <Redirect to='/signUp' />}
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

export default App;
