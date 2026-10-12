import React, { useEffect, useState } from 'react';
import { FiBookOpen, FiCheck, FiShield } from 'react-icons/fi';
import AppShell from '../AppShell';
import { mockApi, type EducationalModule } from '../../mockApi';
import { useDemoUi } from '../../components/DemoUi';

const checklist = [
  'Supervisão durante a refeição',
  'Texturas adequadas à fase de desenvolvimento',
  'Evitar salgados e açúcar excessivo',
  'Hidratação adequada e higiene das mãos'
];

export default function AlimentaryIntroductionPage() {
  const { openDialog } = useDemoUi();
  const [modules, setModules] = useState<EducationalModule[]>([]);

  useEffect(() => {
    let active = true;

    mockApi.getEducationalModules().then((items) => {
      if (active) setModules(items);
    });

    return () => {
      active = false;
    };
  }, []);

  return (
    <AppShell title="Introdução alimentar" subtitle="Conteúdo educativo para apoiar a rotina de alimentação do bebê.">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {modules.map(({ id, title, text, badge }) => (
          <article key={id} className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-50 text-rose-500">
                <FiBookOpen />
              </div>
              <span className="rounded-full bg-amber-100 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-amber-600">
                {badge}
              </span>
            </div>
            <div className="mt-4 text-lg font-medium text-slate-900">{title}</div>
            <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
            <button
              className="demo-button demo-button-secondary mt-4"
              onClick={() =>
                openDialog({
                  title,
                  description: text,
                  submitLabel: 'Entendi',
                  fields: []
                })
              }
              type="button"
            >
              Ler resumo
            </button>
          </article>
        ))}
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 text-rose-500">
            <FiShield />
            <div className="text-xs uppercase tracking-[0.2em]">Guia de segurança</div>
          </div>
          <h2 className="mt-2 text-xl font-semibold text-slate-900">Checklist de atenção</h2>

          <div className="mt-5 space-y-3">
            {checklist.map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3 text-sm text-slate-600">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <FiCheck />
                </div>
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-xs uppercase tracking-[0.2em] text-rose-500">Fonte</div>
          <h2 className="mt-2 text-xl font-semibold text-slate-900">Orientação reforçada</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            O material educacional do My Little Baby busca informar de forma clara e responsável, sem substituir a
            avaliação individual de profissionais de saúde e nutrição.
          </p>
        </div>
      </section>
    </AppShell>
  );
}
