import { type ReactNode } from 'react';

export function Field({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-2">{children}</div>;
}

export function FieldLabel({ htmlFor, children }: { htmlFor: string; children: ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="text-[var(--type-body-sm)] font-medium text-[var(--color-text-primary)]">
      {children}
    </label>
  );
}

export function FieldHint({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="text-[var(--type-body-sm)] text-[var(--color-text-muted)]">
      {children}
    </p>
  );
}

export function FieldError({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="text-[var(--type-body-sm)] text-[var(--color-danger-fg)]" role="alert">
      {children}
    </p>
  );
}

export function FieldGroup({ children }: { children: ReactNode }) {
  return <div className="space-y-4">{children}</div>;
}

export function ValidationSummary({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-[var(--radius-md)] border border-[var(--color-danger-fg)] bg-[var(--color-danger-bg)] px-4 py-3 text-[var(--type-body-sm)] text-[var(--color-danger-fg)]">
      {children}
    </div>
  );
}
