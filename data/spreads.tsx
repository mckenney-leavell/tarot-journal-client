import { fetchWithResponse, fetchWithoutResponse } from "./fetcher"

export function getSpreads() {
    const token = localStorage.getItem('token')
    return fetchWithResponse('spreads', {
        headers: {
            Authorization: `Token ${token}`
        }
    })
}

export function getSpreadById(id) {
    const token = localStorage.getItem('token')
    return fetchWithResponse(`spreads/${id}`, {
        headers: {
            Authorization: `Token ${token}`
        }
    })
}

export function deleteSpread(id) {
    const token = localStorage.getItem('token')
    return fetchWithoutResponse(`spreads/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Token ${token}`
        }
    })
}

export async function createSpread(spread) {
    const token = localStorage.getItem('token')
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
    const token = localStorage.getItem('token')
    return fetchWithResponse(`spreads/${spreadId}`, {
        method: "PUT",
        headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(spread)
    })
}
