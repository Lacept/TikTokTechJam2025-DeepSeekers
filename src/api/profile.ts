// src/api/profile.ts

/**
 * Auto-detecting API base that works in both foreground (window) and
 * background (no window/location) contexts. You can override via:
 *  - URL:   ?apiHost=192.168.10.114
 *  - Local: localStorage.setItem('apiHost','192.168.10.114')
 */

let __API_BASE_INTERNAL: string | null = null;

export function setApiBase(hostname: string, protocol: string = 'http:') {
  const proto = protocol.endsWith(':') ? protocol : `${protocol}:`;
  __API_BASE_INTERNAL = `${proto}//${hostname}:5000`;
  try {
    (globalThis as any).__API_BASE__ = __API_BASE_INTERNAL;
  } catch {}
}

function readQueryParam(name: string): string | null {
  try {
    if (typeof window === 'undefined' || !window.location?.search) return null;
    const sp = new URLSearchParams(window.location.search);
    const v = sp.get(name);
    return v && v.trim() ? v.trim() : null;
  } catch {
    return null;
  }
}

function readLocalStorage(key: string): string | null {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return null;
    const v = window.localStorage.getItem(key);
    return v && v.trim() ? v.trim() : null;
  } catch {
    return null;
  }
}

function deriveFromLocation(): { hostname: string; protocol: string } | null {
  try {
    const gb: any = globalThis as any;
    const loc = gb?.location;
    if (!loc) return null;
    const hostname = loc.hostname || '127.0.0.1';
    const protocol = loc.protocol || 'http:';
    return { hostname, protocol };
  } catch {
    return null;
  }
}

function currentApiBase(): string {
  if (__API_BASE_INTERNAL) return __API_BASE_INTERNAL;

  try {
    const gb: any = globalThis as any;
    if (gb.__API_BASE__) return gb.__API_BASE__;
  } catch {}

  const qHost = readQueryParam('apiHost');
  if (qHost) {
    const base = `http://${qHost}:5000`;
    __API_BASE_INTERNAL = base;
    try {
      (globalThis as any).__API_BASE__ = base;
    } catch {}
    return base;
  }

  const lsHost = readLocalStorage('apiHost');
  if (lsHost) {
    const base = `http://${lsHost}:5000`;
    __API_BASE_INTERNAL = base;
    try {
      (globalThis as any).__API_BASE__ = base;
    } catch {}
    return base;
  }

  const loc = deriveFromLocation();
  if (loc) {
    const base = `${loc.protocol}//${loc.hostname}:5000`;
    __API_BASE_INTERNAL = base;
    try {
      (globalThis as any).__API_BASE__ = base;
    } catch {}
    return base;
  }

  return 'http://127.0.0.1:5000';
}

export function __getApiBase() {
  return currentApiBase();
}

/* ======================= Types ======================= */
export type Creator = {
  creator_id: number;
  name: string;
  following: number;
  followers: number;
  likes: number;
};

export type Video = {
  video_id: number;
  creator_id: number;
  title: string;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  watch_completion: number;
  engagement_rate: number;
  engagement_diversity: number;
  rewatch: number;
  nlp_quality: number;
  compliance: number;
  rev_prop: number;
  proj_earnings: number;
  quality_score: number;
  created_at: string;
};

export type Thumb = {
  video_id: number;
  content_type: string;
  data_uri: string;
};

/* ======================= Calls ======================= */

export async function listCreators(): Promise<Creator[]> {
  const API_BASE = currentApiBase();
  const r = await fetch(`${API_BASE}/list-creators`);
  if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
  return r.json();
}

export async function getCreatorByName(name: string): Promise<Creator> {
  const API_BASE = currentApiBase();
  const r = await fetch(
    `${API_BASE}/get-creator-by-name?name=${encodeURIComponent(name)}`,
  );
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}

export async function getAllVideosData(creatorId: number): Promise<Video[]> {
  const API_BASE = currentApiBase();
  const r = await fetch(
    `${API_BASE}/get-all-videos-data?creator_id=${creatorId}`,
  );
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}

export async function getAllVideoThumbs(creatorId: number): Promise<Thumb[]> {
  const API_BASE = currentApiBase();
  const r = await fetch(
    `${API_BASE}/get-all-videos-thumbnails?creator_id=${creatorId}`,
  );
  if (!r.ok) throw new Error(await r.text());
  const j = await r.json();
  return j.ok ? (j.images as Thumb[]) : [];
}

// Optional (only if implemented in Flask)
export async function getProfile(
  name: string,
): Promise<{ creator: Creator; videos: Video[]; thumbnails: Thumb[] }> {
  const API_BASE = currentApiBase();
  const r = await fetch(
    `${API_BASE}/get-profile?name=${encodeURIComponent(name)}`,
  );
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}
