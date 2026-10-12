import React, { useEffect, useState } from 'react';
import { FiCheck, FiLink2, FiPlus, FiUsers } from 'react-icons/fi';
import AppShell from '../AppShell';
import { mockApi, type Caregiver } from '../../mockApi';

export default function ParentLinkingPage() {
  const [caregivers, setCaregivers] = useState<Caregiver[]>([]);

  useEffect(() => {
    let active = true;

    mockApi.getCaregivers().then((items) => {
      if (active) setCaregivers(items);
    });

    return () => {
      active = false;
    };
  }, []);

  return (
    <AppShell
      title="Pessoas autorizadas"
      subtitle="Compartilhe a rotina com responsáveis e cuidadores de forma segura."
      actions={
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full bg-rose-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-rose-200  hover:bg-rose-600"
        >
          <FiPlus />
          Convidar
        </button>
      }
    >
      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 text-rose-500">
            <FiUsers />
            <div className="text-xs uppercase tracking-[0.2em]">Acesso</div>
          </div>
          <h2 className="mt-2 text-xl font-semibold text-slate-900">Cuidadores vinculados</h2>

          <div className="mt-5 space-y-4">
            {caregivers.map(({ id, name, role, status, accent }) => {
              let statusClassName = 'bg-rose-100 text-rose-600';

              if (accent === 'emerald') {
                statusClassName = 'bg-emerald-100 text-emerald-600';
              } else if (accent === 'amber') {
                statusClassName = 'bg-amber-100 text-amber-600';
              }

              return (
                <div
                  key={id}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-linear-to-br from-amber-200 to-rose-200 text-sm font-medium text-slate-800">
                      {name.slice(0, 1)}
                    </div>
                    <div>
                      <div className="font-medium text-slate-900">{name}</div>
                      <div className="text-xs text-slate-500">{role}</div>
                    </div>
                  </div>

                  <div
                    className={`rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] ${statusClassName}`}
                  >
                    {status}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 text-rose-500">
            <FiLink2 />
            <div className="text-xs uppercase tracking-[0.2em]">Convite</div>
          </div>
          <h2 className="mt-2 text-xl font-semibold text-slate-900">Gerenciar compartilhamento</h2>

          <div className="mt-5 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4">
            <div className="text-sm text-slate-600">Link de convite</div>
            <div className="mt-2 break-all rounded-xl bg-white p-3 text-xs text-slate-500">
              https://mylittlebaby.app/invite/luna-family
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {[
              'Pode registrar rotina e lembretes',
              'Pode visualizar fotos e marcos',
              'Não pode excluir registros ou alterar permissões'
            ].map((text) => (
              <div key={text} className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3 text-sm text-slate-600">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <FiCheck />
                </div>
                {text}
              </div>
            ))}
          </div>
        </div>
      </section>
    </AppShell>
  );
}
