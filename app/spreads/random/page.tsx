'use client'

import { getCardById } from "@/data/cards"
import { getSpreadById } from "@/data/spreads"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function SpreadGenerator() {
    const [cardId, setCardId] = useState(undefined)
    const [card, setCard] = useState({})
    const [cardUrl, setCardUrl] = useState("")
     
    function randomNum(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    function getCardId() {
        const id = randomNum(0, 78)
        return getCardById(id)
    }

    function getRandomCard() {
        getCardId().then(card => setCard(card))
        return setCardUrl(card?.url)
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-(--clr-surface-tonal-a10)">
            <main className="flex min-h-screen w-full max-w-3xl flex-col items-center py-32 px-10">
                <div className="space-y-5">
                    <h1 className="text-3xl font-bold leading-10 tracking-tight text-(--clr-light-a0) text-center">One Card Tarot Reading</h1>
                    
                    {!cardUrl ?
                        <div className="flex flex-col h-1/2 mx-auto justify-center space-y-3">
                            <h2 className="text-xl leading-10 tracking-tight text-(--clr-light-a0) text-center">Click the card to get your reading for the day</h2>
                            <figure className="h-1/2 self-center cursor-pointer" onClick={getRandomCard}>
                                <Image src="/images/RWSa-X-RL.png" alt={"tarot-card-back"} width={250} height={250} className="transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl" />
                            </figure>
                        </div> :
                        <div className="flex flex-col h-1/2 mx-auto justify-center space-y-3">
                            <h2 className="text-xl font-semibold leading-10 tracking-tight text-(--clr-light-a0) text-center">You got {card.name}!</h2>                            
                            <figure className="h-1/2 self-center">
                                <Image src={card?.url} alt={card?.name} width={250} height={250} />
                            </figure>
                            <h2 className="text-2xl text-(--clr-light-a0) text-center font-semibold">{card.name} Card Meaning</h2>
                            <p className="text-xl text-(--clr-light-a0) text-center">Upright: {card.meaning_upright}</p>
                            <p className="text-xl text-(--clr-light-a0) text-center">Reverse: {card.meaning_reverse}</p>
                        </div>}
                    </div>
            </main>
        </div>
    )
}