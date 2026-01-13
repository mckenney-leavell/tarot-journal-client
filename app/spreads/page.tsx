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
        <div className="flex min-h-screen items-center justify-center– bg-(--clr-surface-tonal-a10)">
            <main className="flex min-h-screen w-full  flex-col items-center py-32 px-16">
                <h1 className="text-3xl text-(--clr-light-a0) font-bold leading-10 tracking-tight p-4">My Readings</h1>
                <div className="flex flex-col lg:w-1/2 sm:w-3/4 items-center space-y-5">
                    {spreads.map((item) => {
                        return <SpreadCard key={item.id} spread={item} />
                    })}
                </div>
            </main>
        </div>
        </>
    )
}