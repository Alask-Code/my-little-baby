import React, { useEffect, useState } from 'react';
import AppShell from '../AppShell';
import { mockApi, type PrivacySection } from '../../mockApi';

export default function PrivacyPolicyPage() {
  const [sections, setSections] = useState<PrivacySection[]>([]);

  useEffect(() => {
    let active = true;

    mockApi.getPrivacySections().then((items) => {
      if (active) setSections(items);
    });

    return () => {
      active = false;
    };
  }, []);

  return (
    <AppShell
      title="Privacidade e termos"
      subtitle="Políticas, segurança e controles de acesso para o cuidado do bebê."
    >
      <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
        <div className="space-y-4">
          {sections.map(({ id, title, text }) => (
            <article key={id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-lg font-medium text-slate-900">{title}</div>
              <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
            </article>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
