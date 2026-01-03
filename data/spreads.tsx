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

export async function createSpread(spread) {
    const response = await fetchWithResponse('spreads', {
        method: 'POST',
        headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(spread)
    })
    return response
}

export function updateSpread(spreadId, spread) {
    return fetchWithResponse(`spreads/${spreadId}`, {
        method: "PUT",
        headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(spread)
    })
}
