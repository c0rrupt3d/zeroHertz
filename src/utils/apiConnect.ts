const FALLBACK_RADIO_URL = "https://de1.api.radio-browser.info";
let mainRadioUrl: Promise<string> | undefined;

async function request<T = any>(url: URL, config?: RequestInit) {
  const response = await fetch(url, config);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json() as Promise<T>;
}

async function fetchRandomRadioApiUrl() {
  const baseUrls = await fetchRadioBrowserUrls();
  return baseUrls[Math.floor(Math.random() * baseUrls.length)];
}

async function fetchRadioBrowserUrls() {
  const serverInfo = await request<any[]>(
    new URL("/json/servers", FALLBACK_RADIO_URL)
  );
  return serverInfo.map((server) => `https://${server.name}`);
}

async function getRadioApiUrl() {
  if (mainRadioUrl === undefined) {
    mainRadioUrl = fetchRandomRadioApiUrl();
  }

  try {
    return await mainRadioUrl;
  } catch {
    mainRadioUrl = undefined;
    return FALLBACK_RADIO_URL;
  }
}

async function fetchRadioApi<T = any>(path: string, config?: RequestInit) {
  return request<T>(new URL(path, await getRadioApiUrl()), config);
}

export function findStations(options: {
  searchEntries: Record<string, any>;
  signal: AbortSignal;
}) {
  const { searchEntries, signal } = options;
  return fetchRadioApi<SearchResult[]>("/json/stations/search", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(searchEntries),
    signal,
  });
}

export function fetchCountries() {
  return fetchRadioApi("/json/countries");
}

export function fetchLanguages() {
  return fetchRadioApi("/json/languages");
}

export function fetchPlayableUrl(options: { id: string; signal: AbortSignal }) {
  const { id, signal } = options;
  return fetchRadioApi(`/json/url/${id}`, { signal });
}

export function fetchStationDetails(options: {
  id: string;
  signal: AbortSignal;
}) {
  const { id, signal } = options;
  return fetchRadioApi(`/json/stations/byuuid/${id}`, { signal });
}
