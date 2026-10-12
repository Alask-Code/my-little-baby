import React, { useEffect, useState } from 'react';
import { FiFilter, FiHeart, FiMoon, FiPlus, FiThermometer, FiWind } from 'react-icons/fi';
import AppShell from '../AppShell';
import { mockApi, type RoutineEntry } from '../../mockApi';

const routineSummary = [
  { label: 'Amamentação', value: '3 registros', detail: 'Última às 08:10', icon: FiHeart },
  { label: 'Mamadeira', value: '1 registro', detail: '180 ml consumidos', icon: FiWind },
  { label: 'Ordenha', value: '2 sessões', detail: 'Total 180 ml', icon: FiThermometer },
  { label: 'Sono', value: '3 ciclos', detail: '3h 40m total', icon: FiMoon }
];

export default function RoutinesPage() {
  const [entries, setEntries] = useState<RoutineEntry[]>([]);

  useEffect(() => {
    let active = true;

    mockApi.getRoutineEntries().then((items) => {
      if (active) setEntries(items);
    });

    return () => {
      active = false;
    };
  }, []);

  return (
    <AppShell
      title="Rotina diária"
      subtitle="Registros e observações da rotina da família."
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
      <section className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600">
            <FiFilter />
            Hoje
          </div>
          <div className="flex flex-wrap gap-2 text-xs text-slate-600">
            {['Amamentação', 'Mamadeira', 'Ordenha', 'Fralda', 'Sono', 'Humor'].map((tag) => (
              <span key={tag} className="rounded-full border border-slate-200 bg-white px-2.5 py-1.5">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {routineSummary.map(({ label, value, detail, icon: Icon }) => (
          <article key={label} className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-50 text-rose-500">
              <Icon />
            </div>
            <div className="mt-4 text-sm text-slate-500">{label}</div>
            <div className="mt-2 text-2xl font-semibold text-slate-900">{value}</div>
            <div className="mt-1 text-xs text-slate-500">{detail}</div>
          </article>
        ))}
      </section>

      <section className="mt-6 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 text-xs uppercase tracking-[0.2em] text-rose-500">Últimos registros</div>
        <div className="space-y-4">
          {entries.map(({ time, title, description, tag }) => (
            <div key={`${time}-${title}`} className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex w-16 shrink-0 flex-col items-center text-center">
                <div className="text-sm font-medium text-slate-900">{time}</div>
                <div className="mt-1 h-8 w-px bg-slate-200" />
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between gap-4">
                  <div className="text-lg font-medium text-slate-900">{title}</div>
                  <span className="rounded-full bg-rose-100 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-rose-600">
                    {tag}
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-500">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
