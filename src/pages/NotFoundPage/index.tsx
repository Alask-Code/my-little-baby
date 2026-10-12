import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-rose-50 px-4 text-center text-slate-800">
      <h1 className="text-3xl font-semibold">Página não encontrada</h1>
      <p className="max-w-md text-sm text-slate-600">O endereço não corresponde a uma página desta demonstração.</p>
      <Link className="rounded-full bg-rose-500 px-5 py-3 text-sm font-medium text-white" to="/">
        Voltar ao início
      </Link>
    </main>
  );
}
