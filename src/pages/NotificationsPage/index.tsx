import React, { useEffect, useState } from 'react';
import { FiBell, FiCheck, FiClock, FiPlus } from 'react-icons/fi';
import AppShell from '../AppShell';
import { mockApi, type NotificationItem } from '../../mockApi';

export default function NotificationsPage() {
  const [reminders, setReminders] = useState<NotificationItem[]>([]);

  useEffect(() => {
    let active = true;

    mockApi.getNotificationItems().then((items) => {
      if (active) setReminders(items);
    });

    return () => {
      active = false;
    };
  }, []);

  return (
    <AppShell
      title="Lembretes e notificações"
      subtitle="Ajustes para manter a rotina organizada sem sobrecarregar."
      actions={
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full bg-rose-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-rose-200  hover:bg-rose-600"
        >
          <FiPlus />
          Novo lembrete
        </button>
      }
    >
      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 text-xs uppercase tracking-[0.2em] text-rose-500">Programados</div>
          <div className="space-y-3">
            {reminders.map(({ id, title, time, type, active }) => (
              <div
                key={id}
                className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-100 text-rose-500">
                    <FiBell />
                  </div>
                  <div>
                    <div className="font-medium text-slate-900">{title}</div>
                    <div className="text-xs text-slate-500">{type}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-sm text-slate-500">{time}</div>
                  <div
                    className={`inline-flex h-6 w-11 items-center rounded-full p-1 ${
                      active ? 'bg-emerald-500' : 'bg-slate-300'
                    }`}
                  >
                    <div className={`h-4 w-4 rounded-full bg-white  ${active ? 'translate-x-5' : ''}`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-xs uppercase tracking-[0.2em] text-rose-500">Configuração</div>
          <h2 className="mt-2 text-xl font-semibold text-slate-900">Preferências</h2>

          <div className="mt-5 space-y-4">
            {[
              'Notificações push habilitadas',
              'Lembretes visuais na tela',
              'Avisos de sono em horário de descanso',
              'Relatórios diários por e-mail'
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3 text-sm text-slate-600">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <FiCheck />
                </div>
                {item}
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center gap-3 rounded-2xl border border-dashed border-slate-200 bg-white p-4 text-sm text-slate-500">
            <FiClock />
            Falta pouco para a próxima revisão de rotina.
          </div>
        </div>
      </section>
    </AppShell>
  );
}
