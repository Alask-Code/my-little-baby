import React from 'react';
import { FiBell, FiLock, FiShield, FiUser } from 'react-icons/fi';
import AppShell from '../AppShell';
import { useDemoUi } from '../../components/DemoUi';

const settingsSections = [
  { title: 'Perfil do bebê', description: 'Atualize dados pessoais, preferências e fotografia.', icon: FiUser },
  { title: 'Privacidade', description: 'Controle quem vê fotos e registros compartilhados.', icon: FiShield },
  { title: 'Notificações', description: 'Ajuste lembretes, recorrência e canais de avisos.', icon: FiBell },
  { title: 'Segurança', description: 'Senha, sessão e gestão de acesso.', icon: FiLock }
];

export default function SettingsPage() {
  const { openDialog } = useDemoUi();
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
        setPreferences((current) => ({ ...current, [title]: values.value }));
        return `${title} atualizado nesta sessão.`;
      }
    });
  };

  return (
    <AppShell title="Configurações" subtitle="Gerencie a conta, os perfis e as preferências da família.">
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
