'use client'

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

export default function SpreadPage() {
    const { data: session } = useSession({
        required: true, 
        onUnauthenticated() {
            redirect('/api/auth/signin?callbackUrl=/client')
        },
    })

    return (
        <h1>{session?.user?.name} Spreads</h1>
    )
}