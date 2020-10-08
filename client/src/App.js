import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import LandingPage from './components/views/LandingPage/LandingPage'
import SignupPage from './components/views/SignupPage/SignupPage'
import SigninPage from './components/views/SigninPage/SigninPage'
import './App.css';
import Auth from './hoc/auth'

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path='/' component={Auth(LandingPage, null)} />
          <Route exact path='/signin' component={Auth(SigninPage, false)} />
          <Route exact path='/signup' component={Auth(SignupPage, false)} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
