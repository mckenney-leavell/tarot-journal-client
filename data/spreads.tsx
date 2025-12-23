import { fetchWithResponse } from "./fetcher"

export function getSpreads() {
    // checks if you're in a browser since Next.js tries to load from the server before the token is received
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';

    return fetchWithResponse('spreads', {
        headers: {
            Authorization: `Token ${token}`
        }
    })
}