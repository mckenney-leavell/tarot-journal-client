import { fetchWithResponse } from "./fetcher"

// checks if you're in a browser since Next.js tries to load from the server before the token is received    
const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';

export async function createSpreadCard(spreadCard: object) {
    const response = await fetchWithResponse('spreadcards', {
        method: 'POST',
        headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(spreadCard)
    })
    return response
}