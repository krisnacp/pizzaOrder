const API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY;
const BASE_URL_GEOCODE = 'https://api.geoapify.com/v1/geocode/reverse';

export async function getAddress({ latitude, longitude }) {
    // ?lat=${lat}&lon=${lng}&apiKey=${API_KEY}

    const res = await fetch(
        `${BASE_URL_GEOCODE}?lat=${latitude}&lon=${longitude}&apiKey=${API_KEY}`,
    );
    if (!res.ok) throw Error('Failed getting address');

    const data = await res.json();
    return data;
}
