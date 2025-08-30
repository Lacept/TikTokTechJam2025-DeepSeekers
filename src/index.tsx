// src/index.tsx
// src/index.tsx (VERY TOP, before other imports that might fetch)
// 1) do this BEFORE anything else that might import the API file
import { setApiBase } from "./api/profile.js";

(() => {
  try {
    const loc = window.location;
    const overrideFromQuery = new URLSearchParams(loc.search).get("apiHost")?.trim();
    const overrideFromLS = window.localStorage?.getItem("apiHost")?.trim();
    const rawHost =
      overrideFromQuery ||
      overrideFromLS ||
      loc.hostname ||
      "127.0.0.1";

    // Lynx preview often uses a 100.x.x.x host that is NOT your backend.
    // In that case, prefer localhost so calls hit your dev Flask correctly.
    const host = rawHost.startsWith("100.") ? "127.0.0.1" : rawHost;

    setApiBase(host, loc.protocol);
    console.log("[Bootstrap] API_BASE =", (globalThis as any).__API_BASE__);
  } catch {
    // No window (background) — api/profile.ts will resolve lazily.
  }
})();


import { root } from '@lynx-js/react';
import { App } from './App.js';

// This tells Lynx to start the application by rendering the App component.
root.render(<App />);
