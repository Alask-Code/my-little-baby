import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { FiCheck, FiX } from 'react-icons/fi';

export type DemoField = {
  name: string;
  label: string;
  type: 'text' | 'email' | 'time' | 'date' | 'number' | 'textarea' | 'select';
  placeholder?: string;
  value?: string;
  required?: boolean;
  options?: string[];
};

export type DemoDialogOptions = {
  title: string;
  description: string;
  submitLabel: string;
  fields: DemoField[];
  onSubmit?: (values: Record<string, string>) => string | void;
};

type DemoUiContextValue = {
  openDialog: (options: DemoDialogOptions) => void;
  notify: (message: string) => void;
};

const DemoUiContext = createContext<DemoUiContextValue | null>(null);

function DialogField({ field }: { field: DemoField }) {
  if (field.type === 'textarea') {
    return (
      <textarea
        defaultValue={field.value}
        id={`demo-field-${field.name}`}
        name={field.name}
        placeholder={field.placeholder}
        required={field.required}
        rows={3}
      />
    );
  }

  if (field.type === 'select') {
    return (
      <select defaultValue={field.value} id={`demo-field-${field.name}`} name={field.name} required={field.required}>
        {(field.options ?? []).map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }

  return (
    <input
      defaultValue={field.value}
      id={`demo-field-${field.name}`}
      name={field.name}
      placeholder={field.placeholder}
      required={field.required}
      type={field.type}
    />
  );
}

export function useDemoUi() {
  const context = useContext(DemoUiContext);

  if (!context) {
    throw new Error('useDemoUi must be used inside AppShell.');
  }

  return context;
}

export function DemoUiProvider({ children }: { children: React.ReactNode }) {
  const [dialog, setDialog] = useState<DemoDialogOptions | null>(null);
  const [notice, setNotice] = useState('');
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dialogElement = useRef<HTMLElement | null>(null);

  const notify = useCallback((message: string) => {
    setNotice(message);
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(() => setNotice(''), 3200);
  }, []);
  const contextValue = useMemo(() => ({ openDialog: setDialog, notify }), [notify]);

  useEffect(() => {
    if (!dialog) return undefined;

    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusableElements = () =>
      dialogElement.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
    focusableElements()?.[0]?.focus();

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setDialog(null);
      if (event.key !== 'Tab') return;

      const elements = focusableElements();
      if (!elements?.length) return;
      const firstElement = elements[0];
      const lastElement = elements[elements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      document.body.style.overflow = previousOverflow;
      if (previousFocus?.isConnected) previousFocus.focus();
    };
  }, [dialog]);

  useEffect(
    () => () => {
      if (timeout.current) clearTimeout(timeout.current);
    },
    []
  );

  const submitDialog = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!dialog) return;

    const values: Record<string, string> = {};
    new FormData(event.currentTarget).forEach((value, key) => {
      values[key] = String(value);
    });

    const message = dialog.onSubmit?.(values);
    notify(message ?? `${dialog.submitLabel} concluído no modo demonstração.`);
    setDialog(null);
  };

  return (
    <DemoUiContext.Provider value={contextValue}>
      {children}
      {dialog ? (
        <div className="demo-modal-backdrop">
          <section
            aria-labelledby="demo-dialog-title"
            aria-modal="true"
            className="demo-modal"
            ref={dialogElement}
            role="dialog"
          >
            <div className="demo-modal-heading">
              <div>
                <span className="demo-eyebrow">Modo demonstração</span>
                <h2 id="demo-dialog-title">{dialog.title}</h2>
                <p>{dialog.description}</p>
              </div>
              <button
                aria-label="Fechar janela"
                className="demo-icon-button"
                onClick={() => setDialog(null)}
                type="button"
              >
                <FiX />
              </button>
            </div>

            <form className="demo-modal-form" onSubmit={submitDialog}>
              {dialog.fields.map((field) => (
                <label className="demo-field" htmlFor={`demo-field-${field.name}`} key={field.name}>
                  <span>{field.label}</span>
                  <DialogField field={field} />
                </label>
              ))}
              <div className="demo-modal-actions">
                <button className="demo-button demo-button-secondary" onClick={() => setDialog(null)} type="button">
                  Cancelar
                </button>
                <button className="demo-button demo-button-primary" type="submit">
                  <FiCheck />
                  {dialog.submitLabel}
                </button>
              </div>
            </form>
          </section>
        </div>
      ) : null}
      <div aria-live="polite" className={`demo-toast ${notice ? 'is-visible' : ''}`} role="status">
        <FiCheck />
        <span>{notice}</span>
      </div>
    </DemoUiContext.Provider>
  );
}
