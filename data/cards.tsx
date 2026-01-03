import { fetchWithResponse } from "./fetcher"

// checks if you're in a browser since Next.js tries to load from the server before the token is received    
const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';

export function getCards() {
    return fetchWithResponse('cards', {
        headers: {
            Authorization: `Token ${token}`
        }
    })
}