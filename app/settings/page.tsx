export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-[900px] px-6 pb-24 pt-24">
      <p className="mono text-[10.5px] uppercase tracking-[0.22em] text-[color:var(--color-muted)]">Atlas / Settings</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Preferences</h1>
      <p className="mt-2 max-w-xl text-[14px] text-[color:var(--color-muted)]">Small controls. Nothing spectacular. That is on purpose.</p>

      <div className="mt-10 grid gap-6">
        <Section title="Appearance">
          <Row label="Theme">
            <div className="flex gap-2">
              <span className="chip chip-sky">Dark</span>
              <span className="chip">Light</span>
              <span className="chip">System</span>
            </div>
          </Row>
        </Section>

        <Section title="Investigation">
          <Row label="Default language">
            <span className="chip">JavaScript</span>
          </Row>
          <Row label="Default framework">
            <span className="chip">Next.js</span>
          </Row>
          <Row label="Auto-save investigations">
            <span className="chip chip-gold">On</span>
          </Row>
        </Section>

        <Section title="History">
          <Row label="Clear history">
            <button className="btn-ghost">Clear</button>
          </Row>
          <Row label="Export history">
            <button className="btn-ghost">Export</button>
          </Row>
        </Section>

        <Section title="AI">
          <Row label="AI enabled">
            <span className="chip">Off</span>
          </Row>
          <Row label="Provider status">
            <span className="mono text-[11px] text-[color:var(--color-muted)]">Not connected</span>
          </Row>
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="atlas-surface p-6">
      <p className="mono text-[10.5px] uppercase tracking-[0.18em] text-[color:var(--color-muted)]">{title}</p>
      <div className="mt-4 divide-y divide-[color:var(--color-border)]">
        {children}
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 py-3">
      <p className="text-[14px]">{label}</p>
      <div>{children}</div>
    </div>
  );
}
