import React, { useEffect, useState } from 'react';
import { FiBarChart2, FiDownload, FiTrendingUp } from 'react-icons/fi';
import AppShell from '../AppShell';
import { mockApi, type ReportStat } from '../../mockApi';

const chart = [
  { day: 'Seg', value: 62 },
  { day: 'Ter', value: 78 },
  { day: 'Qua', value: 54 },
  { day: 'Qui', value: 84 },
  { day: 'Sex', value: 68 },
  { day: 'Sáb', value: 72 },
  { day: 'Dom', value: 88 }
];

export default function ReportsPage() {
  const [stats, setStats] = useState<ReportStat[]>([]);

  useEffect(() => {
    let active = true;

    mockApi.getReportStats().then((items) => {
      if (active) setStats(items);
    });

    return () => {
      active = false;
    };
  }, []);

  return (
    <AppShell
      title="Relatórios"
      subtitle="Resumo de rotina, sono e alimentação ao longo da semana."
      actions={
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-rose-200 hover:text-rose-600"
        >
          <FiDownload />
          Exportar
        </button>
      }
    >
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ id, label, value, detail }) => (
          <article key={id} className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-sm text-slate-500">{label}</div>
            <div className="mt-2 text-2xl font-semibold text-slate-900">{value}</div>
            <div className="mt-1 text-xs text-slate-500">{detail}</div>
          </article>
        ))}
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-rose-500">Atividade</div>
              <h2 className="mt-2 text-xl font-semibold text-slate-900">Resumo da semana</h2>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-600">
              <FiTrendingUp />
              +8% vs. semana anterior
            </div>
          </div>

          <div className="mt-6 flex h-56 items-end gap-3">
            {chart.map(({ day, value }) => (
              <div key={day} className="flex flex-1 flex-col items-center gap-3">
                <div
                  className="flex h-40 w-full items-end justify-center rounded-t-[18px] bg-linear-to-t from-rose-500 to-pink-300"
                  style={{ height: `${value}%` }}
                />
                <div className="text-xs text-slate-500">{day}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 text-rose-500">
            <FiBarChart2 />
            <div className="text-xs uppercase tracking-[0.2em]">Insight</div>
          </div>
          <h2 className="mt-2 text-xl font-semibold text-slate-900">Padrões da semana</h2>
          <div className="mt-5 space-y-4">
            {[
              { label: 'Sono mais longo', value: 'Quintas e domingos', progress: '82%' },
              { label: 'Mamadas em maior volume', value: 'Manhã e tarde', progress: '74%' },
              { label: 'Trocas durante descanso', value: '3 registros por noite', progress: '60%' }
            ].map(({ label, value, progress }) => (
              <div key={label}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-700">{label}</span>
                  <span className="text-slate-500">{value}</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-linear-to-r from-rose-400 to-pink-500"
                    style={{ width: progress }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </AppShell>
  );
}
