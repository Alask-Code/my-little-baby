import React from 'react';
import { FiBell, FiLock, FiShield, FiUser } from 'react-icons/fi';
import AppShell from '../AppShell';

const settingsSections = [
  { title: 'Perfil do bebê', description: 'Atualize dados pessoais, preferências e fotografia.', icon: FiUser },
  { title: 'Privacidade', description: 'Controle quem vê fotos e registros compartilhados.', icon: FiShield },
  { title: 'Notificações', description: 'Ajuste lembretes, recorrência e canais de avisos.', icon: FiBell },
  { title: 'Segurança', description: 'Senha, sessão e gestão de acesso.', icon: FiLock }
];

export default function SettingsPage() {
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
              <div className="rounded-2xl bg-slate-50 p-3">Nome: Luna</div>
              <div className="rounded-2xl bg-slate-50 p-3">Nascimento: 14/02/2024</div>
              <div className="rounded-2xl bg-slate-50 p-3">Notificações: ativadas</div>
            </div>
          </article>
        ))}
      </section>
    </AppShell>
  );
}
