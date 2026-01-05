'use client'

import SpreadCard from "@/components/spread/card"
import { getSpreads } from "@/data/spreads"
import { useEffect, useState } from "react"

export default function SpreadPage() {
    const [spreads, getAllSpreads] = useState([])

    useEffect(() => {
        getSpreads().then(data => {
            getAllSpreads(data)
        })
    }, [])

    return (
        <>
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="flex min-h-screen w-full max-w-3xl flex-col items-center py-32 px-16 bg-white dark:bg-black ">
                <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50 p-4">My Spreads</h1>
                <div>
                    {spreads.map((item) => {
                        return <SpreadCard key={item.id} spread={item} />
                    })}
                </div>
            </main>
        </div>
        </>
    )
}