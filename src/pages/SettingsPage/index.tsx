import React from 'react';
import { FiBell, FiLock, FiMonitor, FiMoon, FiShield, FiSun, FiUser } from 'react-icons/fi';
import AppShell from '../AppShell';
import { useDemoUi } from '../../components/DemoUi';
import { useTheme } from '../../components/ThemeProvider';
import { mockApi } from '../../mockApi';

const settingsSections = [
  { title: 'Perfil do bebê', description: 'Atualize dados pessoais, preferências e fotografia.', icon: FiUser },
  { title: 'Privacidade', description: 'Controle quem vê fotos e registros compartilhados.', icon: FiShield },
  { title: 'Notificações', description: 'Ajuste lembretes, recorrência e canais de avisos.', icon: FiBell },
  { title: 'Segurança', description: 'Senha, sessão e gestão de acesso.', icon: FiLock }
];

export default function SettingsPage() {
  const { openDialog } = useDemoUi();
  const { mode, palette, setMode, setPalette } = useTheme();
  const [preferences, setPreferences] = React.useState<Record<string, string>>({});

  const editSection = (title: string, description: string) => {
    const sectionFields = {
      'Perfil do bebê': [
        { name: 'value', label: 'Nome do bebê', type: 'text' as const, placeholder: 'Nome do bebê', required: true }
      ],
      Privacidade: [
        {
          name: 'value',
          label: 'Visibilidade do perfil',
          type: 'select' as const,
          options: ['Somente responsáveis', 'Família e cuidadores', 'Privado']
        }
      ],
      Notificações: [
        {
          name: 'value',
          label: 'Preferência de lembretes',
          type: 'select' as const,
          options: ['Todos os lembretes', 'Somente os essenciais', 'Desativados']
        }
      ],
      Segurança: []
    };

    openDialog({
      title: `Editar ${title.toLowerCase()}`,
      description: `${description} As alterações ficam apenas nesta sessão de demonstração.`,
      submitLabel: title === 'Segurança' ? 'Entendi' : 'Salvar preferência',
      fields: sectionFields[title as keyof typeof sectionFields],
      onSubmit: (values) => {
        if (title === 'Segurança') {
          return 'A autenticação está fora do escopo desta demonstração local.';
        }
        if (title === 'Perfil do bebê') {
          mockApi.updateBabyName(values.value.trim());
        }
        setPreferences((current) => ({ ...current, [title]: values.value }));
        return `${title} atualizado nesta sessão.`;
      }
    });
  };

  return (
    <AppShell title="Configurações" subtitle="Gerencie a conta, os perfis e as preferências da família.">
      <section
        aria-labelledby="appearance-title"
        className="mb-6 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm"
      >
        <div>
          <h2 className="text-lg font-medium text-slate-900" id="appearance-title">
            Aparência
          </h2>
          <p className="mt-1 text-sm text-slate-500">Escolha o modo de exibição e a cor de destaque.</p>
        </div>

        <fieldset className="mt-5">
          <legend className="mb-3 text-sm font-medium text-slate-700">Tema</legend>
          <div className="grid gap-3 sm:grid-cols-3">
            {(
              [
                { value: 'system', label: 'Sistema', icon: FiMonitor },
                { value: 'light', label: 'Claro', icon: FiSun },
                { value: 'dark', label: 'Escuro', icon: FiMoon }
              ] as const
            ).map(({ value, label, icon: Icon }) => (
              <button
                aria-pressed={mode === value}
                className={`theme-choice${mode === value ? ' is-selected' : ''}`}
                key={value}
                onClick={() => setMode(value)}
                type="button"
              >
                <Icon aria-hidden="true" />
                {label}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="mt-5">
          <legend className="mb-3 text-sm font-medium text-slate-700">Cor de destaque</legend>
          <div className="flex flex-wrap gap-3">
            {(
              [
                { value: 'rose', label: 'Rosa' },
                { value: 'sage', label: 'Sálvia' },
                { value: 'lavender', label: 'Lavanda' }
              ] as const
            ).map(({ value, label }) => (
              <button
                aria-pressed={palette === value}
                className={`palette-choice palette-choice-${value}${palette === value ? ' is-selected' : ''}`}
                key={value}
                onClick={() => setPalette(value)}
                type="button"
              >
                <span aria-hidden="true" />
                {label}
              </button>
            ))}
          </div>
        </fieldset>
        <p className="mt-4 text-xs text-slate-500">Sua aparência fica salva neste dispositivo.</p>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        {settingsSections.map(({ title, description, icon: Icon }) => (
          <article key={title} className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-500">
                <Icon />
              </div>
              <div>
                <div className="text-lg font-medium text-slate-900">{title}</div>
                <div className="text-sm text-slate-500">{description}</div>
              </div>
            </div>

            <div className="mt-5 space-y-3 text-sm text-slate-600">
              <div className="rounded-2xl bg-slate-50 p-3">
                {preferences[title] ? `Alteração nesta sessão: ${preferences[title]}` : description}
              </div>
              <button
                className="demo-button demo-button-secondary"
                onClick={() => editSection(title, description)}
                type="button"
              >
                Editar
              </button>
            </div>
          </article>
        ))}
      </section>
    </AppShell>
  );
}
