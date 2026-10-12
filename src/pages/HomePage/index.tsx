import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiActivity, FiBell, FiBookOpen, FiClock, FiDroplet, FiHeart, FiPlus, FiSun } from 'react-icons/fi';
import AppShell from '../AppShell';
import { mockApi, type DashboardCard, type QuickAction, type Reminder } from '../../mockApi';

export default function HomePage() {
  const [summaryCards, setSummaryCards] = useState<DashboardCard[]>([]);
  const [quickActions, setQuickActions] = useState<QuickAction[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);

  useEffect(() => {
    let active = true;

    Promise.all([mockApi.getDashboardCards(), mockApi.getQuickActions(), mockApi.getReminders()]).then(
      ([cards, actions, items]) => {
        if (!active) return;
        setSummaryCards(cards);
        setQuickActions(actions);
        setReminders(items);
      }
    );

    return () => {
      active = false;
    };
  }, []);

  const toneClasses: Record<string, string> = {
    rose: 'bg-rose-100 text-rose-500',
    amber: 'bg-amber-100 text-amber-500',
    sky: 'bg-sky-100 text-sky-500',
    emerald: 'bg-emerald-100 text-emerald-500'
  };

  const toneIcons: Record<string, typeof FiClock> = {
    rose: FiHeart,
    amber: FiBell,
    sky: FiActivity,
    emerald: FiClock
  };

  const quickActionIcons: Record<string, typeof FiBookOpen> = {
    feeding: FiHeart,
    reminder: FiDroplet,
    sleep: FiSun
  };

  return (
    <AppShell
      title="Resumo do dia"
      subtitle="Tudo o que importa para a rotina da família esta manhã."
      actions={
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full bg-rose-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-rose-200 hover:bg-rose-600"
        >
          <FiPlus />
          Novo registro
        </button>
      }
    >
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map(({ label, value, detail, tone }) => {
          const Icon = toneIcons[tone] ?? FiClock;

          return (
            <article key={label} className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
              <div
                className={`mb-4 flex h-11 w-11 items-center justify-center rounded-2xl ${
                  toneClasses[tone] ?? toneClasses.emerald
                }`}
              >
                <Icon />
              </div>
              <div className="text-sm text-slate-500">{label}</div>
              <div className="mt-2 text-2xl font-semibold text-slate-900">{value}</div>
              <div className="mt-1 text-xs text-slate-500">{detail}</div>
            </article>
          );
        })}
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-rose-500">Atalhos rápidos</div>
              <h2 className="mt-2 text-xl font-semibold text-slate-900">Registrar hoje</h2>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {quickActions.map(({ id, label, href }) => {
              const Icon = quickActionIcons[id] ?? FiBookOpen;

              return (
                <Link
                  key={id}
                  to={href}
                  className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-left  hover:border-rose-200 hover:bg-rose-50"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-rose-500 shadow-sm">
                    <Icon />
                  </div>
                  <span className="text-sm font-medium text-slate-700">{label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-xs uppercase tracking-[0.2em] text-rose-500">Lembretes</div>
          <h2 className="mt-2 text-xl font-semibold text-slate-900">Próximos</h2>

          <div className="mt-5 space-y-4">
            {reminders.map(({ id, title, time, description }) => (
              <div key={id} className="flex items-start gap-3 rounded-2xl bg-slate-50 p-3">
                <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-xl bg-rose-100 text-rose-500">
                  <FiBell />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <div className="font-medium text-slate-800">{title}</div>
                    <div className="text-xs font-medium text-rose-500">{time}</div>
                  </div>
                  <div className="mt-1 text-sm text-slate-500">{description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </AppShell>
  );
}
