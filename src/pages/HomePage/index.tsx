import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiActivity, FiBell, FiBookOpen, FiClock, FiDroplet, FiHeart, FiPlus, FiSun } from 'react-icons/fi';
import AppShell from '../AppShell';
import { mockApi, type DashboardCard, type QuickAction, type Reminder } from '../../mockApi';
import { useDemoUi } from '../../components/DemoUi';

export default function HomePage() {
  const { openDialog } = useDemoUi();
  const navigate = useNavigate();
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

  const openRoutineDialog = (defaultType = 'Amamentação') => {
    openDialog({
      title: 'Novo registro',
      description: 'Anote um momento da rotina de hoje. Os dados ficam apenas nesta demonstração.',
      submitLabel: 'Salvar registro',
      fields: [
        {
          name: 'type',
          label: 'Tipo de registro',
          type: 'select',
          value: defaultType,
          options: ['Amamentação', 'Mamadeira', 'Fralda', 'Sono', 'Humor']
        },
        { name: 'time', label: 'Horário', type: 'time', required: true },
        { name: 'notes', label: 'Observações', type: 'textarea', placeholder: 'Como foi esse momento?' }
      ],
      onSubmit: (values) => {
        mockApi.addRoutineEntry({
          id: `demo-${Date.now()}`,
          time: values.time,
          title: values.type,
          description: values.notes || 'Adicionado agora no modo demonstração.',
          tag: values.type
        });
        navigate('/app/routines');
        return 'Registro adicionado à rotina.';
      }
    });
  };

  const openQuickAction = (action: QuickAction) => {
    if (action.id === 'reminder') {
      openDialog({
        title: action.label,
        description: 'Crie um lembrete de teste para a rotina da família.',
        submitLabel: 'Criar lembrete',
        fields: [
          { name: 'title', label: 'O que lembrar?', type: 'text', value: 'Ordenha', required: true },
          { name: 'time', label: 'Horário', type: 'time', required: true }
        ],
        onSubmit: (values) => {
          mockApi.addNotification({
            id: `demo-${Date.now()}`,
            title: values.title,
            time: values.time,
            type: 'Manual',
            active: true
          });
          navigate('/app/notifications');
          return 'Lembrete adicionado.';
        }
      });
      return;
    }

    openRoutineDialog(action.id === 'sleep' ? 'Sono' : 'Amamentação');
  };

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
          onClick={() => openRoutineDialog()}
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
              const content = (
                <>
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-rose-500 shadow-sm">
                    <Icon />
                  </div>
                  <span className="text-sm font-medium text-slate-700">{label}</span>
                </>
              );

              if (id === 'education') {
                return (
                  <Link
                    key={id}
                    to={href}
                    className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-left hover:border-rose-200 hover:bg-rose-50"
                  >
                    {content}
                  </Link>
                );
              }

              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => openQuickAction({ id, label, href })}
                  className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-left hover:border-rose-200 hover:bg-rose-50"
                >
                  {content}
                </button>
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
