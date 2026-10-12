import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiBell, FiBookOpen, FiCalendar, FiHeart, FiShield, FiStar, FiUser } from 'react-icons/fi';
import { mockApi, type PublicHighlight } from '../../mockApi';
import Header from './Header';
import TagText from './Header/TagText';

const trustItems = [
  'Registro de rotina infantil em poucos cliques',
  'Acesso compartilhado com pais e cuidadores',
  'Privacidade e controle de permissões por perfil'
];

export default function PublicPage() {
  const [highlights, setHighlights] = useState<PublicHighlight[]>([]);

  useEffect(() => {
    let active = true;

    mockApi.getPublicHighlights().then((nextHighlights) => {
      if (active) {
        setHighlights(nextHighlights);
      }
    });

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-rose-50 to-rose-100 text-slate-800">
      <Header />

      <main className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <section className="grid items-center gap-10 py-12 lg:grid-cols-[1.2fr_0.8fr] lg:py-20">
          <div>
            <TagText Icon={FiStar} label="Cuidar com Clareza" compact />
            <h1 className="mt-6 max-w-xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              O diário da rotina do seu bebê em um só lugar.
            </h1>

            <p className="mt-5 max-w-lg text-lg text-slate-600">
              Registre alimentação, sono, trocas de fralda, marcos e lembretes com uma experiência simples, acolhedora e
              feita para famílias.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/app/register"
                className="inline-flex items-center gap-2 rounded-full bg-linear-to-br from-rose-200 to-rose-400 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-rose-200"
              >
                Começar agora
                <FiArrowRight />
              </Link>
              <Link
                to="/app/login"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-700"
              >
                Já tenho conta
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-600">
              {trustItems.map((item) => (
                <TagText Icon={FiShield} label={item} />
              ))}
            </div>
          </div>

          <div className="rounded-4xl border border-rose-300 p-5 shadow-[0_30px_80px_rgba(251,113,133,0.12)]">
            <div className="rounded-3xl bg-linear-to-br from-rose-100 to-rose-200 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-[0.18em] text-rose-500">Hoje</div>
                  <div className="mt-2 text-3xl font-semibold text-slate-900">8h 40m</div>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500 text-xl text-white">
                  👶
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
                      <FiHeart />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-800">Última mamada</div>
                      <div className="text-xs text-slate-500">08:10 · 30 min</div>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-emerald-600">OK</div>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                      <FiBell />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-800">Próximo lembrete</div>
                      <div className="text-xs text-slate-500">Ordenha às 14:30</div>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-amber-600">Em 2h</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-5 py-6 md:grid-cols-3">
          {highlights.map(({ id, title, text }) => {
            const getHighlightIcon = (highlightId: string) => {
              switch (highlightId) {
                case 'routine':
                  return FiUser;
                case 'timeline':
                  return FiCalendar;
                default:
                  return FiBookOpen;
              }
            };

            const Icon = getHighlightIcon(id);

            return (
              <article key={id} className="rounded-[28px] border border-rose-400 bg-white p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-xl text-rose-500">
                  <Icon />
                </div>
                <h2 className="mt-5 text-xl font-semibold text-slate-900">{title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
              </article>
            );
          })}
        </section>
      </main>
    </div>
  );
}
