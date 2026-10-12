import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PublicPage from './PublicPage';
import Auth from './AuthPage';
import PreConfigPage from './PreConfigPage';
import HomePage from './HomePage';
import RoutinesPage from './RoutinesPage';
import DevelopmentPage from './DevelopmentPage';
import AlimentaryIntroductionPage from './AlimentaryIntroductionPage';
import ReportsPage from './ReportsPage';
import NotificationsPage from './NotificationsPage';
import SettingsPage from './SettingsPage';
import ParentLinkingPage from './ParentLinkingPage';
import PrivacyPolicyPage from './PrivacyPolicyPage';

export default function App() {
  return (
    <Router useTransitions basename="/my-little-baby">
      <Routes>
        <Route path="/" Component={PublicPage} index />
        <Route path="app/register" Component={Auth.RegisterPage} />
        <Route path="app/login" Component={Auth.LoginPage} />
        <Route path="app/preconfig" Component={PreConfigPage} />
        <Route path="app/" Component={HomePage} />
        <Route path="app/routines" Component={RoutinesPage} />
        <Route path="app/development" Component={DevelopmentPage} />
        <Route path="app/alimentary-introduction" Component={AlimentaryIntroductionPage} />
        <Route path="app/reports" Component={ReportsPage} />
        <Route path="app/notifications" Component={NotificationsPage} />
        <Route path="app/settings" Component={SettingsPage} />
        <Route path="app/parent-linking" Component={ParentLinkingPage} />
        <Route path="app/privacy-policy" Component={PrivacyPolicyPage} />
      </Routes>
    </Router>
  );
}
