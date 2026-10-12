import React, { useEffect, useState } from 'react';
import { FiCamera, FiCheck, FiGift, FiHeart, FiPlus } from 'react-icons/fi';
import AppShell from '../AppShell';
import { mockApi, type Milestone } from '../../mockApi';

const gallery = ['👶', '🍼', '🌞', '🎈'];
const accentClasses: Record<string, string> = {
  rose: 'bg-rose-100 text-rose-500',
  amber: 'bg-amber-100 text-amber-500',
  sky: 'bg-sky-100 text-sky-500',
  emerald: 'bg-emerald-100 text-emerald-500'
};

export default function DevelopmentPage() {
  const [milestones, setMilestones] = useState<Milestone[]>([]);

  useEffect(() => {
    let active = true;

    mockApi.getMilestones().then((items) => {
      if (active) setMilestones(items);
    });

    return () => {
      active = false;
    };
  }, []);

  return (
    <AppShell
      title="Desenvolvimento"
      subtitle="Marcos, conquistas e memórias do crescimento."
      actions={
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full bg-rose-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-rose-200 hover:bg-rose-600"
        >
          <FiPlus />
          Novo marco
        </button>
      }
    >
      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-rose-500">Marcos</div>
              <h2 className="mt-2 text-xl font-semibold text-slate-900">Conquistas recentes</h2>
            </div>
            <div className="rounded-full bg-rose-50 px-3 py-1 text-xs font-medium text-rose-600">4 ativos</div>
          </div>

          <div className="space-y-4">
            {milestones.map(({ id, title, category, age, status, accent }) => (
              <div key={id} className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                    accentClasses[accent] ?? 'bg-emerald-100 text-emerald-500'
                  }`}
                >
                  <FiGift />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-base font-medium text-slate-900">{title}</div>
                      <div className="text-xs text-slate-500">
                        {category} · {age}
                      </div>
                    </div>
                    <div className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-emerald-600">
                      {status}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-rose-500">Galeria</div>
              <h2 className="mt-2 text-xl font-semibold text-slate-900">Memórias</h2>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-500">
              <FiCamera />
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            {gallery.map((emoji) => (
              <div
                key={emoji}
                className="flex h-28 items-center justify-center rounded-3xl bg-linear-to-br from-rose-50 to-amber-50 text-4xl shadow-inner ring-1 ring-slate-100"
              >
                {emoji}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-rose-500">Linha do tempo</div>
            <h2 className="mt-2 text-xl font-semibold text-slate-900">Acompanhar evolução</h2>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-600">
            <FiCheck />
            Atualizado hoje
          </div>
        </div>

        <div className="mt-5 space-y-4">
          {[
            'Sorriso espontâneo ao ouvir a voz da mãe — 12/03',
            'Primeira experiência com apoio para sentar — 08/02',
            'Observou o papai e começou a imitar sons — 01/02'
          ].map((entry) => (
            <div key={entry} className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-rose-100 text-rose-500">
                <FiHeart />
              </div>
              <div className="text-sm text-slate-600">{entry}</div>
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
