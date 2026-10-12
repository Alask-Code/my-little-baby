import type { ComponentType } from 'react';
import HomePage from './HomePage';
import PublicPage from './PublicPage';
import AlimentaryIntroductionPage from './AlimentaryIntroductionPage';
import Auth from './AuthPage';
import DevelopmentPage from './DevelopmentPage';
import NotificationsPage from './NotificationsPage';
import ParentLinkingPage from './ParentLinkingPage';
import PreConfigPage from './PreConfigPage';
import PrivacyPolicyPage from './PrivacyPolicyPage';
import ReportsPage from './ReportsPage';
import RoutinesPage from './RoutinesPage';
import SettingsPage from './SettingsPage';

const routes: {
  path: string;
  Component: ComponentType;
}[] = [
  { path: '/', Component: PublicPage },
  { path: 'app/register', Component: Auth.RegisterPage },
  { path: 'app/login', Component: Auth.LoginPage },
  { path: 'app/preconfig', Component: PreConfigPage },
  { path: 'app/', Component: HomePage },
  { path: 'app/routines', Component: RoutinesPage },
  { path: 'app/development', Component: DevelopmentPage },
  { path: 'app/alimentary-introduction', Component: AlimentaryIntroductionPage },
  { path: 'app/reports', Component: ReportsPage },
  { path: 'app/notifications', Component: NotificationsPage },
  { path: 'app/settings', Component: SettingsPage },
  { path: 'app/parent-linking', Component: ParentLinkingPage },
  { path: 'app/privacy-policy', Component: PrivacyPolicyPage }
];
export default routes;
