import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  FiActivity,
  FiBell,
  FiBookOpen,
  FiBarChart2,
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
  { to: '/app/parent-linking', label: 'Pais & cuidadores', icon: FiUsers },
  { to: '/app/settings', label: 'Configurações', icon: FiSettings },
  { to: '/app/privacy-policy', label: 'Privacidade', icon: FiShield }
];

type AppShellProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
};

export default function AppShell({ title, subtitle, children, actions }: AppShellProps) {
  const [profile, setProfile] = useState<BabyProfile>({
    name: 'Luna',
    ageLabel: '7 meses · 1 dia',
    role: 'Responsável principal'
  });

  useEffect(() => {
    let active = true;

    mockApi.getBabyProfile().then((nextProfile) => {
      if (active) {
        setProfile(nextProfile);
      }
    });

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-rose-50 via-white to-amber-50 text-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex gap-6">
          <aside className="hidden w-72 shrink-0 flex-col rounded-[28px] border border-rose-100 bg-white/80 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.08)] backdrop-blur lg:flex">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-rose-400 to-pink-500 text-lg font-semibold text-white shadow-md">
                ML
              </div>
              <div>
                <div className="text-lg font-semibold text-slate-900">My Little Baby</div>
                <div className="text-xs text-slate-500">Acompanhamento diário</div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-linear-to-r from-rose-50 to-amber-50 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-200 text-xl">👶</div>
                <div>
                  <div className="font-medium text-slate-900">{profile.name}</div>
                  <div className="text-xs text-slate-500">{profile.ageLabel}</div>
                </div>
              </div>
            </div>

            <nav className="mt-6 space-y-2">
              {navigation.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-2xl px-3 py-3 text-sm ${
                      isActive
                        ? 'bg-rose-500 text-white shadow-lg shadow-rose-200'
                        : 'text-slate-600 hover:bg-rose-50 hover:text-slate-900'
                    }`
                  }
                >
                  <Icon className="text-base" />
                  {label}
                </NavLink>
              ))}
            </nav>

            <div className="mt-auto rounded-2xl border border-dashed border-rose-200 bg-rose-50 p-4">
              <div className="text-xs font-medium uppercase tracking-[0.14em] text-rose-500">Hoje</div>
              <div className="mt-2 text-sm text-slate-700">Próxima soneca estimada em 1h40</div>
            </div>
          </aside>

          <main className="flex-1">
            <header className="mb-6 flex flex-col gap-4 rounded-[28px] border border-rose-100 bg-white/80 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.06)] backdrop-blur sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-xs font-medium uppercase tracking-[0.2em] text-rose-500">Painel da família</div>
                <h1 className="mt-2 text-2xl font-semibold text-slate-900">{title}</h1>
                {subtitle ? <p className="mt-1 text-sm text-slate-500">{subtitle}</p> : null}
              </div>

              <div className="flex items-center gap-3">
                {actions}
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br from-amber-300 to-rose-400 text-sm font-semibold text-white">
                    M
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-slate-800">Maria</div>
                    <div className="text-[11px] text-slate-500">{profile.role}</div>
                  </div>
                </div>
              </div>
            </header>

            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
