// Utility to fetch World Bank data for a given indicator and country
export async function fetchWorldBankData({ indicator = 'NY.GDP.MKTP.CD', country = 'US', start = 2012, end = 2022 }) {
  const url = `https://api.worldbank.org/v2/country/${country}/indicator/${indicator}?date=${start}:${end}&format=json`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch World Bank data');
  const data = await res.json();
  if (!Array.isArray(data) || !Array.isArray(data[1])) return [];
  return data[1]
    .filter(d => d.value !== null)
    .map(d => ({ year: d.date, value: d.value }))
    .reverse(); // chronological order
}
