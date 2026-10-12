import React, { useEffect, useState } from 'react';
import { FiBell, FiCheck, FiClock, FiPlus } from 'react-icons/fi';
import AppShell from '../AppShell';
import { mockApi, type NotificationItem } from '../../mockApi';
import { useDemoUi } from '../../components/DemoUi';

export default function NotificationsPage() {
  const { openDialog } = useDemoUi();
  const [reminders, setReminders] = useState<NotificationItem[]>([]);
  const [preferences, setPreferences] = useState([true, true, false, false]);

  useEffect(() => {
    let active = true;

    mockApi.getNotificationItems().then((items) => {
      if (active) setReminders(items);
    });

    return () => {
      active = false;
    };
  }, []);

  const addReminder = () => {
    openDialog({
      title: 'Criar lembrete',
      description: 'Adicione um lembrete de teste para a rotina da família.',
      submitLabel: 'Criar lembrete',
      fields: [
        { name: 'title', label: 'O que lembrar?', type: 'text', placeholder: 'Ex.: hora da fruta', required: true },
        { name: 'time', label: 'Horário', type: 'time', required: true },
        { name: 'type', label: 'Repetição', type: 'select', options: ['Agendada', 'Diária', 'Semanal'] }
      ],
      onSubmit: (values) => {
        const reminder = {
          id: `demo-${Date.now()}`,
          title: values.title,
          time: values.time,
          type: values.type,
          active: true
        };
        mockApi.addNotification(reminder);
        setReminders((current) => [reminder, ...current]);
        return 'Lembrete criado nesta sessão.';
      }
    });
  };

  return (
    <AppShell
      title="Lembretes e notificações"
      subtitle="Ajustes para manter a rotina organizada sem sobrecarregar."
      actions={
        <button
          type="button"
          onClick={addReminder}
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
                  <button
                    aria-checked={active}
                    aria-label={`${active ? 'Desativar' : 'Ativar'} lembrete ${title}`}
                    className="demo-toggle"
                    onClick={() => {
                      mockApi.toggleNotification(id);
                      setReminders((current) =>
                        current.map((reminder) =>
                          reminder.id === id ? { ...reminder, active: !reminder.active } : reminder
                        )
                      );
                    }}
                    role="switch"
                    type="button"
                  >
                    <span />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-xs uppercase tracking-[0.2em] text-rose-500">Configuração</div>
          <h2 className="mt-2 text-xl font-semibold text-slate-900">Preferências</h2>
          <p className="mt-2 text-sm text-slate-500">
            Os controles abaixo alteram apenas a prévia; notificações do navegador ou por e-mail não são enviadas.
          </p>

          <div className="mt-5 space-y-4">
            {[
              'Notificações push',
              'Lembretes visuais',
              'Avisos de sono no horário de descanso',
              'Relatórios diários por e-mail'
            ].map((item, index) => (
              <div
                key={item}
                className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 p-3 text-sm text-slate-600"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-full ${
                      preferences[index] ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    <FiCheck />
                  </div>
                  {item}
                </div>
                <button
                  aria-checked={preferences[index]}
                  aria-label={`${preferences[index] ? 'Desativar' : 'Ativar'} ${item.toLowerCase()}`}
                  className="demo-toggle"
                  onClick={() =>
                    setPreferences((current) =>
                      current.map((enabled, itemIndex) => (itemIndex === index ? !enabled : enabled))
                    )
                  }
                  role="switch"
                  type="button"
                >
                  <span />
                </button>
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
