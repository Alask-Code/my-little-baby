import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowRight, FiCheck, FiHeart, FiMoon, FiUser } from 'react-icons/fi';
import { useDemoUi } from '../../components/DemoUi';
import { mockApi } from '../../mockApi';

const steps = [
  { label: 'Perfil do bebê', description: 'Nome, data de nascimento e foto', icon: FiUser },
  { label: 'Rotina inicial', description: 'Preferências de lembretes e unidades', icon: FiMoon },
  { label: 'Primeiros cuidados', description: 'Dicas de alimentação e sono', icon: FiHeart }
];

export default function PreConfigPage() {
  const { openDialog } = useDemoUi();
  const navigate = useNavigate();

  const saveProfile = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get('babyName') ?? '').trim();

    openDialog({
      title: `Tudo pronto${name ? ` para ${name}` : ''}?`,
      description: 'Este perfil de exemplo ficará disponível apenas nesta demonstração local.',
      submitLabel: 'Abrir painel',
      fields: [],
      onSubmit: () => {
        mockApi.updateBabyName(name);
        navigate('/app/');
        return 'Perfil de demonstração configurado; os dados continuam apenas na memória local.';
      }
    });
  };

  return (
    <div className="setup-page min-h-screen bg-linear-to-br from-rose-50 via-white to-amber-50 px-4 py-10 text-slate-800">
      <div className="mx-auto max-w-5xl rounded-4xl border border-rose-100 bg-white p-6 shadow-[0_30px_80px_rgba(15,23,42,0.08)] sm:p-8">
        <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-rose-500">Configuração inicial</div>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">Vamos preparar o perfil da família</h1>
          </div>
          <Link to="/app/login" className="text-sm font-medium text-rose-500 hover:text-rose-600">
            Voltar ao login
          </Link>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="space-y-4">
            {steps.map(({ label, description, icon: Icon }, index) => (
              <div
                key={label}
                className={`rounded-3xl border p-4 ${
                  index === 0 ? 'border-rose-200 bg-rose-50' : 'border-slate-200 bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                      index === 0 ? 'bg-rose-500 text-white' : 'bg-white text-slate-600'
                    }`}
                  >
                    <Icon />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-800">{label}</div>
                    <div className="text-xs text-slate-500">{description}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <form className="space-y-5 rounded-[28px] border border-slate-200 bg-slate-50 p-5" onSubmit={saveProfile}>
            <div>
              <label htmlFor="babyName" className="mb-2 block text-sm font-medium text-slate-700">
                Nome do bebê
                <input
                  id="babyName"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm placeholder:text-slate-400"
                  placeholder="Ex.: Luna"
                  name="babyName"
                  required
                />
              </label>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="birthDate" className="mb-2 block text-sm font-medium text-slate-700">
                  Data de nascimento
                  <input
                    id="birthDate"
                    name="birthDate"
                    type="date"
                    required
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
                  />
                </label>
              </div>
              <div>
                <label htmlFor="babySex" className="mb-2 block text-sm font-medium text-slate-700">
                  Sexo (opcional)
                  <select
                    id="babySex"
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
                  >
                    <option>Não informar</option>
                    <option>Feminino</option>
                    <option>Masculino</option>
                    <option>Outros</option>
                  </select>
                </label>
              </div>
            </div>

            <div>
              <label htmlFor="babyNotes" className="mb-2 block text-sm font-medium text-slate-700">
                Observações
                <textarea
                  id="babyNotes"
                  rows={4}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm placeholder:text-slate-400"
                  placeholder="Ex.: gosta de dormir com a música baixa e leva mais tempo para adormecer."
                />
              </label>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="volumeUnit" className="mb-2 block text-sm font-medium text-slate-700">
                  Unidade para volume
                  <select
                    id="volumeUnit"
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
                  >
                    <option>ml</option>
                    <option>oz</option>
                  </select>
                </label>
              </div>
              <div>
                <label htmlFor="notifications" className="mb-2 block text-sm font-medium text-slate-700">
                  Notificações
                  <select
                    id="notifications"
                    name="notifications"
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
                  >
                    <option>Ativar lembretes</option>
                    <option>Somente lembretes essenciais</option>
                    <option>Desativar</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl bg-rose-50 p-3 text-sm text-rose-700">
              <FiCheck />
              Você pode ajustar estes dados no painel de configurações após o cadastro.
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-rose-500 px-5 py-3 text-sm font-medium text-white shadow-lg shadow-rose-200 hover:bg-rose-600"
              >
                Salvar perfil
                <FiArrowRight />
              </button>
              <Link
                to="/app/login"
                className="inline-flex items-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700  hover:border-rose-200 hover:text-rose-600"
              >
                Cancelar
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
