import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="mx-auto flex max-w-full items-center border-b border-rose-400 justify-between px-6 py-4 sm:px-4 lg:px-8">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-rose-200 to-rose-400 text-lg font-semibold text-white shadow-md">
          ML
        </div>
        <div>
          <div className="text-lg font-semibold text-slate-900">My Little Baby</div>
          <div className="text-xs text-slate-500">Acompanhamento infantil</div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Link
          to="/app/login"
          className="px-4 py-2 text-sm font-medium border border-transparent rounded-full hover:border-rose-400 hover:text-rose-400"
        >
          Entrar
        </Link>
        <Link
          to="/app/register"
          className="rounded-full bg-rose-200 hover:bg-rose-400 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-rose-200"
        >
          Criar conta
        </Link>
      </div>
    </header>
  );
}
