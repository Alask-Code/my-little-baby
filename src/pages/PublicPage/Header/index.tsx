import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="landing-header">
      <div className="landing-brand">
        <div className="flex size-12 border border-rose-400 items-center justify-center rounded-2xl bg-linear-to-br from-rose-200 to-rose-400 text-lg font-semibold text-white shadow-md">
          MlB
        </div>
        <div>
          <div className="text-lg font-semibold text-slate-900">My Little Baby</div>
          <div className="text-xs text-slate-500">Acompanhamento infantil</div>
        </div>
      </div>

      <div className="landing-actions">
        <Link to="/app/login" className="text-rose-400 px-4 py-2">
          Entrar
        </Link>
        <Link to="/app/register" className="rounded-full bg-rose-400 px-4 py-2 text-white shadow-lg shadow-rose-200">
          Criar conta
        </Link>
      </div>
    </header>
  );
}
