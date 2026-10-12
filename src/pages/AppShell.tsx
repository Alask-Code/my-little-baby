import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  FiActivity,
  FiBarChart2,
  FiBell,
  FiBookOpen,
  FiGrid,
  FiHeart,
  FiHome,
  FiSettings,
  FiShield,
  FiUsers
} from 'react-icons/fi';
import { mockApi, type BabyProfile } from '../mockApi';

const navigation = [
  { to: '/app/', label: 'Resumo', icon: FiHome },
  { to: '/app/routines', label: 'Rotina', icon: FiActivity },
  { to: '/app/development', label: 'Desenvolvimento', icon: FiHeart },
  { to: '/app/reports', label: 'Relatórios', icon: FiBarChart2 },
  { to: '/app/notifications', label: 'Lembretes', icon: FiBell },
  { to: '/app/alimentary-introduction', label: 'Introdução alimentar', icon: FiBookOpen },
  { to: '/app/parent-linking', label: 'Família', icon: FiUsers },
  { to: '/app/settings', label: 'Configurações', icon: FiSettings },
  { to: '/app/privacy-policy', label: 'Privacidade', icon: FiShield }
];

const mobileNavigation = navigation.slice(0, 4);
const moreNavigation = navigation.slice(4);

type AppShellProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
};

export default function AppShell({ title, subtitle, children, actions }: AppShellProps) {
  const { pathname } = useLocation();
  const [profile, setProfile] = useState<BabyProfile>({
    name: 'Maria Cecilia',
    birthDate: '2026-03-11',
    ageLabel: '7 meses · 1 dia',
    role: 'Responsável principal'
  });
  const [moreOpen, setMoreOpen] = useState(false);
  const morePageActive = moreNavigation.some(({ to }) => pathname === to || pathname.startsWith(`${to}/`));

  useEffect(() => {
    let active = true;

    mockApi.getBabyProfile().then((nextProfile) => {
      if (active) setProfile(nextProfile);
    });

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="app-shell">
      <div className="app-layout">
        <aside className="app-sidebar">
          <NavLink className="app-brand" to="/app/">
            <span aria-hidden="true" className="app-brand-mark">
              ml
            </span>
            <span>
              <strong>My Little Baby</strong>
              <small>Um dia de cada vez</small>
            </span>
          </NavLink>

          <div className="baby-profile">
            <span aria-hidden="true" className="baby-avatar">
              👶
            </span>
            <span>
              <strong>{profile.name}</strong>
              <small>{profile.ageLabel}</small>
            </span>
            <span aria-label="Perfil selecionado" className="profile-dot" />
          </div>

          <span className="nav-caption">MENU</span>
          <nav aria-label="Navegação principal" className="app-navigation">
            {navigation.map(({ to, label, icon: Icon }) => (
              <NavLink
                end={to === '/app/'}
                key={to}
                to={to}
                className={({ isActive }) => `app-nav-link${isActive ? ' is-active' : ''}`}
              >
                <Icon aria-hidden="true" />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="sidebar-note">
            <span aria-hidden="true">🌿</span>
            <div>
              <strong>Sem pressa.</strong>
              <p>Cada família encontra seu próprio ritmo.</p>
            </div>
          </div>
        </aside>

        <main className="app-main">
          <header className="app-header">
            <div className="app-heading">
              <span className="demo-eyebrow">SEU ESPAÇO DE CUIDADO</span>
              <h1>{title}</h1>
              {subtitle ? <p>{subtitle}</p> : null}
              <div className="baby-context">
                <span aria-hidden="true">👶</span>
                <span>
                  <strong>{profile.name}</strong>
                  <small>{profile.ageLabel}</small>
                </span>
              </div>
            </div>
            <div className="header-tools">
              {actions}
              <div className="account-chip">
                <span className="account-avatar">M</span>
                <span>
                  <strong>Maria</strong>
                  <small>{profile.role}</small>
                </span>
              </div>
            </div>
          </header>

          <div className="demo-mode-note">
            <span className="demo-badge">PRÉVIA LOCAL</span>
            <span>
              Dados de exemplo. Não use informações reais: não há autenticação, armazenamento seguro nem sincronização.
              Alterações desaparecem ao recarregar.
            </span>
          </div>

          <div className="page-content">{children}</div>
          <footer className="app-footer">Um espaço tranquilo para acompanhar cada pequena conquista.</footer>
        </main>
      </div>

      <nav aria-label="Navegação móvel" className="mobile-navigation">
        {mobileNavigation.map(({ to, label, icon: Icon }) => (
          <NavLink
            end={to === '/app/'}
            key={to}
            to={to}
            className={({ isActive }) => `mobile-nav-link${isActive ? ' is-active' : ''}`}
          >
            <Icon aria-hidden="true" />
            <span>{label}</span>
          </NavLink>
        ))}
        <button
          aria-expanded={moreOpen}
          aria-label="Mais páginas"
          className={`mobile-nav-link${moreOpen || morePageActive ? ' is-active' : ''}`}
          onClick={() => setMoreOpen(!moreOpen)}
          type="button"
        >
          <FiGrid aria-hidden="true" />
          <span>Mais</span>
        </button>
      </nav>

      {moreOpen ? (
        <div className="mobile-more-menu">
          {moreNavigation.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              onClick={() => setMoreOpen(false)}
              to={to}
              className={({ isActive }) => `mobile-more-link${isActive ? ' is-active' : ''}`}
            >
              <Icon aria-hidden="true" />
              {label}
            </NavLink>
          ))}
        </div>
      ) : null}
    </div>
  );
}
