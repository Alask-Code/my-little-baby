import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import routes from './routes';

export default function App() {
  return (
    <>
      <Router useTransitions>
        <Routes>
          {routes.map((route) => (
            <Route path={route.path} Component={route.Component} />
          ))}
        </Routes>
      </Router>
      <Router useTransitions basename="/my-little-baby">
        <Routes>
          {routes.map((route) => (
            <Route path={route.path} Component={route.Component} />
          ))}
        </Routes>
      </Router>
    </>
  );
}
