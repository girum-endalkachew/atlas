import { ErrorAnalysisResult } from "@/types/error";

export const PRESET_ERRORS: ErrorAnalysisResult[] = [
  {
    id: "preset-typeerror-map",
    timestamp: Date.now(),
    errorType: "TypeError",
    title: "Cannot read properties of undefined (reading 'map')",
    message: "Cannot read properties of undefined (reading 'map')",
    language: "JavaScript",
    framework: "React",
    codeContext: {
      code: "const users = data.users;\nreturn users.map(user => (\n  <UserCard key={user.id} name={user.name} />\n));",
      lineHighlight: 2,
    },
    anatomy: [
      {
        step: "ERROR",
        label: "Cannot read properties",
        detail: "Property 'map' accessed on an undefined value.",
        color: "#FF5C5C",
      },
      {
        step: "TRIGGER",
        label: ".map() expects Array",
        detail: "Array.prototype.map was invoked expecting an iterable array.",
        color: "#C8F56A",
      },
      {
        step: "BAD_ASSUMPTION",
        label: "Data is ready",
        detail: "Assumed data.users is populated immediately on initial render.",
        color: "#A99BFF",
      },
      {
        step: "ROOT_CAUSE",
        label: "Async payload delay",
        detail: "Component renders before the API fetch completes, or data key mismatch.",
        color: "#FF5C5C",
      },
      {
        step: "FAILURE",
        label: "TypeError thrown",
        detail: "Execution stops because undefined has no prototype methods.",
        color: "#4969FF",
      },
      {
        step: "FIX",
        label: "Optional chaining & default",
        detail: "Use data?.users?.map() or default value (users || []).",
        color: "#C8F56A",
      },
      {
        step: "PREVENTION",
        label: "Loading state & types",
        detail: "Guard rendering with isLoading check or explicit TypeScript interfaces.",
        color: "#A99BFF",
      },
    ],
    whatHappened:
      "You called .map() on a variable that evaluated to undefined instead of an Array.",
    whyItHappened:
      "In asynchronous React data fetching, components render at least once before data arrives. During that first render, data.users is undefined.",
    likelyCause: "data.users === undefined",
    fixes: [
      {
        title: "Optional Chaining (Recommended)",
        code: "return data?.users?.map((user) => (\n  <UserCard key={user.id} name={user.name} />\n));",
        explanation: "Optional chaining (?.) safely evaluates to undefined instead of throwing when the property doesn't exist.",
        isRecommended: true,
      },
      {
        title: "Default Fallback Array",
        code: "const users = data?.users ?? [];\nreturn users.map((user) => (\n  <UserCard key={user.id} name={user.name} />\n));",
        explanation: "Nullish coalescing (??) guarantees users is always an array, safely rendering empty state during loading.",
      },
      {
        title: "Conditional Loading Guard",
        code: "if (!data) return <LoadingSpinner />;\nreturn data.users.map((user) => (\n  <UserCard key={user.id} name={user.name} />\n));",
        explanation: "Prevents the return block from rendering until data is completely resolved.",
      },
    ],
    howToPrevent: [
      "Always initialize state arrays with an empty array `useState([])`.",
      "Use TypeScript strict null checks (`strictNullChecks: true`).",
      "Implement loading skeletons or suspense boundaries for async data.",
    ],
    learningConcept: {
      title: "Asynchronous JavaScript & React Render Lifecycle",
      description: "Understanding how components render before and after async side effects complete.",
      relatedTopics: ["Promises", "async/await", "Optional Chaining", "React Loading States"],
    },
  },
  {
    id: "preset-hydration-error",
    timestamp: Date.now(),
    errorType: "HydrationError",
    title: "Text content does not match server-rendered HTML",
    message: "Hydration failed because the initial UI does not match what was rendered on the server.",
    language: "TypeScript",
    framework: "Next.js",
    codeContext: {
      code: "export default function Header() {\n  return <div>{new Date().toLocaleTimeString()}</div>;\n}",
      lineHighlight: 2,
    },
    anatomy: [
      {
        step: "ERROR",
        label: "Hydration mismatch",
        detail: "Client DOM output differed from Server HTML output.",
        color: "#FF5C5C",
      },
      {
        step: "TRIGGER",
        label: "Date / Window / Random call",
        detail: "Dynamic evaluation evaluated differently on Server vs Client.",
        color: "#C8F56A",
      },
      {
        step: "BAD_ASSUMPTION",
        label: "Identical timing",
        detail: "Assumed server build time and client render time match.",
        color: "#A99BFF",
      },
      {
        step: "ROOT_CAUSE",
        label: "Impure render side-effect",
        detail: "Reading client-only APIs during SSR pass.",
        color: "#FF5C5C",
      },
      {
        step: "FAILURE",
        label: "React discards subtree",
        detail: "React re-renders DOM tree on client, causing visual flicker.",
        color: "#4969FF",
      },
      {
        step: "FIX",
        label: "useEffect mounting flag",
        detail: "Defer client-only rendering until after useEffect mounts.",
        color: "#C8F56A",
      },
      {
        step: "PREVENTION",
        label: "Suppress or dynamic import",
        detail: "Use suppressHydrationWarning or dynamic({ ssr: false }).",
        color: "#A99BFF",
      },
    ],
    whatHappened:
      "Next.js rendered HTML on the server, but when React hydrated it in the browser, the generated HTML didn't match.",
    whyItHappened:
      "APIs like Date.now(), localStorage, navigator, or window exist only on the client side or produce different values between server build time and client load time.",
    likelyCause: "Rendering dynamic time/window data directly in SSR output",
    fixes: [
      {
        title: "Mounting State Guard (Recommended)",
        code: "const [mounted, setMounted] = useState(false);\nuseEffect(() => setMounted(true), []);\n\nif (!mounted) return null;\nreturn <div>{new Date().toLocaleTimeString()}</div>;",
        explanation: "Ensures the time renders only after client hydration is complete.",
        isRecommended: true,
      },
      {
        title: "Dynamic Client-Only Import",
        code: "import dynamic from 'next/dynamic';\nconst Clock = dynamic(() => import('./Clock'), { ssr: false });",
        explanation: "Tells Next.js to skip Server-Side Rendering completely for this component.",
      },
    ],
    howToPrevent: [
      "Never read `localStorage`, `window`, or `navigator` in root render scope.",
      "Isolate browser-only components behind client-side guards.",
    ],
    learningConcept: {
      title: "React Hydration & SSR Architecture",
      description: "How Server Components serialize HTML and match client React Fiber trees.",
      relatedTopics: ["Next.js App Router", "Server Components", "Client Hydration"],
    },
  },
];
