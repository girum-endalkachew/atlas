const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

function write(file, content) {
  const full = path.join(process.cwd(), file);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  // pure UTF-8, no BOM
  fs.writeFileSync(full, content, { encoding: "utf8" });
  console.log("Wrote", file);
}

const stub = (name) => `export default function ${name}Page() {
  return (
    <div className="mx-auto max-w-[1200px] px-6 py-28">
      <p className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-white/40">
        ${name.toUpperCase()}
      </p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        ${name}
      </h1>
      <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/55">
        This screen is next. The landing experience is live.
      </p>
    </div>
  );
}
`;

// Fix any leftover corrupted route stubs (UTF-8)
write("app/learn/page.tsx", stub("Learn"));
write("app/history/page.tsx", stub("History"));
write("app/settings/page.tsx", stub("Settings"));
write("app/atlas/page.tsx", stub("Atlas"));
write("app/investigate/page.tsx", stub("Investigate"));

// Also re-assert landing page/layout/css are clean UTF-8 if needed
// (only rewrite if they look like binary/UTF-16)
function looksBroken(file) {
  try {
    const buf = fs.readFileSync(file);
    // UTF-16 LE BOM or lots of null bytes = broken
    if (buf[0] === 0xff && buf[1] === 0xfe) return true;
    if (buf[0] === 0xfe && buf[1] === 0xff) return true;
    let nulls = 0;
    for (let i = 0; i < Math.min(buf.length, 200); i++) if (buf[i] === 0) nulls++;
    if (nulls > 20) return true;
    buf.toString("utf8");
    return false;
  } catch {
    return true;
  }
}

const critical = [
  "app/page.tsx",
  "app/layout.tsx",
  "app/globals.css",
  "components/landing/Hero.tsx",
  "components/layout/Navbar.tsx",
  "components/layout/Footer.tsx",
];
for (const f of critical) {
  if (fs.existsSync(f) && looksBroken(f)) {
    console.log("WARNING: still broken:", f, "- re-run last full rebuild if landing is blank");
  } else if (fs.existsSync(f)) {
    // rewrite through utf8 to strip any BOM
    const t = fs.readFileSync(f, "utf8").replace(/^\uFEFF/, "");
    fs.writeFileSync(f, t, "utf8");
    console.log("Normalized", f);
  }
}

console.log("\\nUTF-8 route stubs fixed.");

try {
  execSync("git add .", { stdio: "inherit" });
  try {
    execSync('git commit -m "fix: rewrite route stubs as clean UTF-8 (learn/history/settings/atlas/investigate)"', { stdio: "inherit" });
  } catch (e) {
    console.log("(nothing new to commit or commit failed ? continuing)");
  }
  execSync("git push", { stdio: "inherit" });
  console.log("\\nGit push complete.");
} catch (e) {
  console.error("Git step issue:", e.message);
}
