import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DemoUiProvider } from '../components/DemoUi';
import { ThemeProvider } from '../components/ThemeProvider';
import routes from './routes';

export default function App() {
  return (
    <ThemeProvider>
      <DemoUiProvider>
        <BrowserRouter basename={import.meta.env.BASE_URL} useTransitions>
          <Routes>
            {routes.map((route) => (
              <Route key={route.path} path={route.path} Component={route.Component} />
            ))}
          </Routes>
        </BrowserRouter>
      </DemoUiProvider>
    </ThemeProvider>
  );
}
