import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowRight, FiLock, FiMail, FiUser } from 'react-icons/fi';
import { useDemoUi } from '../../components/DemoUi';

type AuthMode = 'login' | 'register';

function AuthCard({ mode }: { mode: AuthMode }) {
  const [isRegister, setIsRegister] = useState(mode === 'register');
  const { openDialog, notify } = useDemoUi();
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    if (isRegister && form.get('password') !== form.get('passwordConfirmation')) {
      notify('As senhas não coincidem. Confira os campos e tente novamente.');
      return;
    }

    openDialog({
      title: isRegister ? 'Cadastro de demonstração' : 'Acesso de demonstração',
      description: 'Esta prévia não cria conta nem envia dados. Você pode continuar sem autenticação real.',
      submitLabel: isRegister ? 'Continuar configuração' : 'Entrar na prévia',
      fields: [],
      onSubmit: () => {
        navigate(isRegister ? '/app/preconfig' : '/app/');
        return isRegister ? 'Vamos preparar o perfil do bebê.' : 'Bem-vinda à prévia da família.';
      }
    });
  };

  return (
    <div className="auth-page min-h-screen bg-linear-to-br from-rose-50 via-white to-amber-50 px-4 py-10 text-slate-800">
      <div className="auth-card mx-auto max-w-5xl overflow-hidden rounded-4xl border border-rose-100 bg-white shadow-[0_30px_90px_rgba(15,23,42,0.08)]">
        <div className="grid md:grid-cols-2">
          <div className="auth-intro bg-linear-to-br from-rose-500 via-pink-500 to-amber-400 p-10 text-white">
            <div>
              <div className="text-sm uppercase tracking-[0.2em] text-rose-100">My Little Baby</div>
              <h1 className="mt-6 text-4xl font-semibold">Acompanhe a rotina do seu bebê com calma e confiança.</h1>
            </div>

            <div className="rounded-3xl bg-white/10 p-5 backdrop-blur-sm">
              <div className="text-sm text-rose-50">Hoje em destaque</div>
              <div className="mt-3 text-3xl font-semibold">Luna · 7 meses</div>
              <div className="mt-3 text-sm text-rose-50/90">Última mamada às 08:10 · Sono registrado há 2h</div>
            </div>
          </div>

          <div className="p-6 sm:p-10">
            <div className="flex justify-between rounded-full bg-slate-100 p-1">
              <button
                type="button"
                aria-pressed={!isRegister}
                onClick={() => setIsRegister(false)}
                className={`flex-1 rounded-full px-4 py-2 text-sm font-medium ${
                  !isRegister ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
                }`}
              >
                Entrar
              </button>
              <button
                type="button"
                aria-pressed={isRegister}
                onClick={() => setIsRegister(true)}
                className={`flex-1 rounded-full px-4 py-2 text-sm font-medium ${
                  isRegister ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
                }`}
              >
                Criar conta
              </button>
            </div>

            <div className="mt-8">
              <div className="text-xs uppercase tracking-[0.2em] text-rose-500">
                {isRegister ? 'Cadastro' : 'Acesso'}
              </div>
              <h2 className="mt-3 text-3xl font-semibold text-slate-900">
                {isRegister ? 'Comece a acompanhar sua família' : 'Bem-vindo de volta'}
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                {isRegister
                  ? 'Crie sua conta para registrar o crescimento e a rotina do seu bebê.'
                  : 'Entre para revisar o dia, os lembretes e os últimos registros.'}
              </p>
            </div>

            <p className="mt-4 rounded-xl bg-amber-50 p-3 text-xs leading-5 text-amber-900">
              Acesso apenas demonstrativo: não existe conta nem autenticação. Use dados fictícios; não informe sua senha
              real.
            </p>

            <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
              {isRegister ? (
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <FiUser className="text-slate-400" />
                  <input
                    aria-label="Nome completo"
                    className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400"
                    name="name"
                    placeholder="Nome completo"
                    required
                  />
                </div>
              ) : null}

              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <FiMail className="text-slate-400" />
                <input
                  aria-label="E-mail"
                  className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400"
                  placeholder="E-mail"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                />
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <FiLock className="text-slate-400" />
                <input
                  aria-label="Senha"
                  className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400"
                  placeholder="Senha"
                  name="password"
                  type="password"
                  autoComplete={isRegister ? 'new-password' : 'current-password'}
                  minLength={6}
                  required
                />
              </div>

              {isRegister ? (
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <FiLock className="text-slate-400" />
                  <input
                    aria-label="Confirmar senha"
                    className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400"
                    placeholder="Confirmar senha"
                    name="passwordConfirmation"
                    type="password"
                    autoComplete="new-password"
                    minLength={6}
                    required
                  />
                </div>
              ) : null}

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-rose-500 px-4 py-3 text-sm font-medium text-white shadow-lg shadow-rose-200 hover:bg-rose-600"
              >
                {isRegister ? 'Criar conta' : 'Entrar'}
                <FiArrowRight />
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-slate-500">
              {isRegister ? 'Já tem conta?' : 'Ainda não tem conta?'}{' '}
              <button
                type="button"
                onClick={() => setIsRegister(!isRegister)}
                className="font-medium text-rose-500 hover:text-rose-600"
              >
                {isRegister ? 'Fazer login' : 'Criar conta'}
              </button>
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
              <div className="flex items-center justify-between gap-3">
                <span>Precisa configurar o bebê primeiro?</span>
                <Link to="/app/preconfig" className="font-medium text-rose-500 hover:text-rose-600">
                  Configurar
                </Link>
              </div>

              <Link className="auth-home-link" to="/">
                Voltar para a página inicial
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Auth = {
  LoginPage: () => <AuthCard mode="login" />,
  RegisterPage: () => <AuthCard mode="register" />
};

export default Auth;
