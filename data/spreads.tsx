import { fetchWithResponse, fetchWithoutResponse } from "./fetcher"

// checks if you're in a browser since Next.js tries to load from the server before the token is received    
const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';

export function getSpreads() {
    return fetchWithResponse('spreads', {
        headers: {
            Authorization: `Token ${token}`
        }
    })
}

export function getSpreadById(id) {
    return fetchWithResponse(`spreads/${id}`, {
        headers: {
            Authorization: `Token ${token}`
        }
    })
}

export function deleteSpread(id) {
    return fetchWithoutResponse(`spreads/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Token ${token}`
        }
    })
}
