import React, { useEffect, useState } from 'react';
import { FiBarChart2, FiDownload } from 'react-icons/fi';
import AppShell from '../AppShell';
import { mockApi, type ReportStat } from '../../mockApi';
import { useDemoUi } from '../../components/DemoUi';

export default function ReportsPage() {
  const { notify } = useDemoUi();
  const [stats, setStats] = useState<ReportStat[]>([]);

  useEffect(() => {
    let active = true;

    mockApi.getReportStats().then((items) => {
      if (active) setStats(items);
    });

    return () => {
      active = false;
    };
  }, []);

  const exportReport = async () => {
    const escapeCell = (value: string) => {
      const spreadsheetSafeValue = /^[\s]*[=+\-@]/.test(value) ? `'${value}` : value;
      return `"${spreadsheetSafeValue.replace(/"/g, '""')}"`;
    };
    const entries = await mockApi.getRoutineEntries();
    const csv = [
      ['Data', 'Horário', 'Categoria', 'Registro', 'Observações'],
      ...entries.map(({ date, time, tag, title, description }) => [date, time, tag, title, description])
    ]
      .map((row) => row.map(escapeCell).join(','))
      .join('\n');
    const file = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'registros-my-little-baby-demo.csv';
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    notify('Registros da demonstração exportados em CSV.');
  };

  const maximumCount = Math.max(...stats.map(({ value }) => Number(value)), 1);

  return (
    <AppShell
      title="Relatórios"
      subtitle="Contagens derivadas dos registros desta demonstração; não representam tendências ou referências clínicas."
      actions={
        <button
          type="button"
          onClick={exportReport}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-rose-200 hover:text-rose-600"
        >
          <FiDownload />
          Exportar
        </button>
      }
    >
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ id, label, value, detail }) => (
          <article key={id} className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-sm text-slate-500">{label}</div>
            <div className="mt-2 text-2xl font-semibold text-slate-900">{value}</div>
            <div className="mt-1 text-xs text-slate-500">{detail}</div>
          </article>
        ))}
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-xs uppercase tracking-[0.2em] text-rose-500">Atividade registrada</div>
          <h2 className="mt-2 text-xl font-semibold text-slate-900">Registros por categoria</h2>

          <div className="mt-6 flex min-h-56 items-end gap-3">
            {stats.map(({ id, label, value }) => (
              <div key={id} className="flex min-w-0 flex-1 flex-col items-center gap-3">
                <div
                  aria-label={`${label}: ${value} registros`}
                  className="flex h-40 w-full items-end justify-center rounded-t-[18px] bg-linear-to-t from-rose-500 to-pink-300"
                  style={{ height: `${Math.max(8, (Number(value) / maximumCount) * 100)}%` }}
                />
                <div className="max-w-full truncate text-xs text-slate-500">{label}</div>
              </div>
            ))}
            {stats.length === 0 ? <p className="w-full text-sm text-slate-500">Nenhum registro disponível.</p> : null}
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 text-rose-500">
            <FiBarChart2 />
            <div className="text-xs uppercase tracking-[0.2em]">Sobre os dados</div>
          </div>
          <h2 className="mt-2 text-xl font-semibold text-slate-900">Contagens, sem inferências</h2>
          <p className="mt-5 text-sm leading-6 text-slate-600">
            As quantidades mostram apenas itens presentes na lista da prévia, incluindo exemplos iniciais e registros
            adicionados nesta sessão. Não estimamos volumes, duração, padrões ou necessidades do bebê.
          </p>
        </div>
      </section>
    </AppShell>
  );
}
