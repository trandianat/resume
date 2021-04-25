import React from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import Resume from 'components/Resume';
import Projects from 'components/Projects';
import './App.scss';

const App = () => (
  <div className="app">
    <BrowserRouter>
      <div className="header">
        <div className="introduction">
          <h1>Diana Tran</h1>
          <h2>Software Engineer</h2>
        </div>
        <div className="navigation">
          <Link to="/">Resume</Link>
          <Link to="/projects">Projects</Link>
        </div>
      </div>
      <Switch>
        <Route exact path="/">
          <Resume />
        </Route>
        <Route path="/projects">
          <Projects />
        </Route>
      </Switch>
    </BrowserRouter>
  </div>
);

export default App;
