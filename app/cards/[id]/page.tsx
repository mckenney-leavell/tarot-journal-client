'use client'

import { getCardById } from "@/data/cards"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { FaCaretLeft } from "react-icons/fa"

export default function CardDetails() {
    const params = useParams<{ tag: string }>()
    const [card, setCard] = useState([])
    const router = useRouter()
    
    useEffect(() => {
        getCardById(params.id).then(data => setCard(data))
    }, [params])

    return (
        <>
            <div className="flex min-h-screen items-center justify-center bg-(--clr-surface-tonal-a10)">
                <main className="flex h-full min-h-screen w-full flex-col items-center py-30 px-10">
                    <div className="flex flex-col h-1/2 mx-auto justify-center space-y-3">
                        <figure className="h-1/2 self-center">
                            <Image src={card ? card.url : " "} alt={card ? card.url : "card"} width={300} height={300} />
                        </figure>  
                        <div className="space-y-5"> 
                            <h1 className="text-3xl font-bold leading-10 tracking-tight text-(--clr-primary-a20) text-center">{card.name}</h1>
                            <h3 className="text-xl text-(--clr-light-a0) text-center">Upright: {card.meaning_upright}</h3>
                            <h3 className="text-xl text-(--clr-light-a0) text-center">Reverse: {card.meaning_reverse}</h3>
                        </div>
                        <button className="flex flex-row bg-(--clr-surface-tonal-a30) hover:bg-(--clr-surface-tonal-a50) text-(--clr-light-a0) text-lg px-6 py-2 rounded-full my-4 self-center" onClick={() => router.back()}>
                            <FaCaretLeft className="my-auto pr-3" />
                            <p>Go Back</p>
                        </button>
                    </div>
                </main>
            </div>
        </>
    )
}