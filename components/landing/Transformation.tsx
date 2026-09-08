const stages = [
  { key: "ERROR",   title: "Symptom appears",    body: <p className="mono text-[13px]"><span className="text-[color:var(--color-danger)]">TypeError</span>  Cannot read properties of undefined</p> },
  { key: "TRACE",   title: "Follow the signal",  body: <p className="mono text-[13px]">data.users <span className="text-[color:var(--color-muted)]">?</span> undefined</p> },
  { key: "CAUSE",   title: "Identify the source",body: <p className="mono text-[13px]"><span className="text-[color:var(--color-gold)]">ROOT CAUSE</span>  ASYNC DATA ? NOT READY</p> },
  { key: "FIX",     title: "Apply the fix",      body: <pre className="mono text-[12px] leading-relaxed">{`const users = data?.users ?? [];\nreturn users.map(...);`}</pre> },
  { key: "LEARN",   title: "Absorb the concept", body: <p className="mono text-[13px]">Asynchronous data flow</p> },
];

export default function Transformation() {
  return (
    <section className="relative hairline-t bg-[color:var(--color-surface)] px-6 py-28">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-14 max-w-2xl">
          <p className="mono text-[10.5px] uppercase tracking-[0.22em] text-[color:var(--color-muted)]">
            The transformation
          </p>
          <h2 className="mt-4 text-[32px] font-semibold leading-[1.08] tracking-[-0.02em] sm:text-[46px]">
            Watch an error become understandable.
          </h2>
        </div>

        <ol className="grid grid-cols-5 gap-3">
          {stages.map((s, i) => (
            <li key={s.key} className="atlas-panel p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <span className="mono text-[10.5px] tracking-[0.18em] text-[color:var(--color-muted)]">{String(i + 1).padStart(2, "0")}</span>
                <span className={"chip " + (i === 2 ? "chip-gold" : i === 3 ? "chip-sky" : "")}>{s.key}</span>
              </div>
              <p className="mt-4 text-[13px] font-medium">{s.title}</p>
              <div className="mt-3 atlas-inset p-3">{s.body}</div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
