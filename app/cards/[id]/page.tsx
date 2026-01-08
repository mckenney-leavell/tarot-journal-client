'use client'

import { getCardById } from "@/data/cards"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function CardDetails() {
    const params = useParams<{ tag: string }>()
    const [card, setCard] = useState([])
    const router = useRouter()
    
    useEffect(() => {
        getCardById(params.id).then(data => setCard(data))
    }, [params])

    return (
        <>
            <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-gray-950">
                <main className="flex h-full min-h-screen w-full flex-col items-center py-30 px-10 bg-white dark:bg-gray-950">
                    <div className="flex flex-col h-1/2 mx-auto justify-center space-y-3">
                        <figure className="h-1/2 self-center">
                            <Image src={card ? card.url : " "} alt={card ? card.url : "card"} width={300} height={300} />
                        </figure>  
                        <div className="space-y-5"> 
                            <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-300 text-center">{card.name}</h1>
                            <h3 className="text-white text-center">Upright: {card.meaning_upright}</h3>
                            <h3 className="text-white text-center">Reverse: {card.meaning_reverse}</h3>
                        </div>
                        <button className="bg-zinc-400 hover:bg-zinc-500 text-slate px-8 py-2 rounded-md max-w-25 my-4 self-center" onClick={() => router.back()}>Back</button>
                    </div>
                </main>
            </div>
        </>
    )
}