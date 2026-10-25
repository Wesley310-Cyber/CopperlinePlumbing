import business from '../data/business.json';

export const biz = business;
export const demo = business.demoMode;

export const telHref = `tel:${business.phone.e164}`;
export const gasTelHref = `tel:${business.gasUtility.e164}`;

export const money = (n: number) => `$${n.toLocaleString('en-US')}`;
export const priceRange = (r: { low: number; high: number }) => `${money(r.low)}–${money(r.high)}`;

const now = new Date();
export const yearsInBusiness = now.getFullYear() - business.foundedYear;
export const currentYear = now.getFullYear();

/** The on-call strip renders only when both the name and the arrival window are filled in. */
export const onCallReady = Boolean(business.onCall.name?.trim() && business.onCall.arrivalWindow?.trim());

export const zones = business.pricing.zones;
export const cities = business.serviceArea.cities;
/** The cities in Zone 1, used for the plain-text lists. */
export const homeCities = cities.filter((c) => c.zone === 1).map((c) => c.name);

export const owner = business.owners[0];
export const leadTech = business.owners[1];
export const cityLine = `${business.address.city}, ${business.address.state}`;
