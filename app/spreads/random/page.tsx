'use client'

import { getCardById } from "@/data/cards"
import { createSpreadCard } from "@/data/spreadcards"
import { createSpread } from "@/data/spreads"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SpreadGenerator() {
    const [cardId, setCardId] = useState(undefined)
    const [card, setCard] = useState({})
    const [cardUrl, setCardUrl] = useState("")
    const router = useRouter()
     
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

    function saveDailySpread() {
        const date = new Date().toISOString().slice(0, 10)
        createSpread({
            title: `Daily Reading for ${date}`,
            interpretation: ""
        }).then(spread => {
            console.log("Saved spread:", spread)
            createSpreadCard({
                card_id: card?.id,
                spread_id: spread.id
            })
        }
        )
        .then(router.push("/spreads"))
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-(--clr-surface-tonal-a10)">
            <main className="flex min-h-screen w-full max-w-3xl flex-col items-center py-32 px-10">
                <div className="space-y-5">
                    <h1 className="text-3xl font-bold leading-10 tracking-tight text-(--clr-light-a0) text-center">Single Card Tarot Reading</h1>
                    
                    {!cardUrl ?
                        <div className="flex flex-col h-1/2 mx-auto justify-center space-y-3">
                            <h2 className="text-xl leading-10 tracking-tight text-(--clr-light-a0) text-center">Click the card to get your reading for the day</h2>
                            <figure className="h-1/2 self-center cursor-pointer" onClick={getRandomCard}>
                                <Image src="/images/RWSa-X-RL.png" alt={"tarot-card-back"} width={250} height={250} loading="eager" className="transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl" priority={true} />
                            </figure>
                        </div> :
                        <div className="flex flex-col h-1/2 mx-auto justify-center space-y-3">
                            <h2 className="text-xl font-semibold leading-10 tracking-tight text-(--clr-primary-a20) text-center">You got {card.name}!</h2>                            
                            <figure className="h-1/2 self-center">
                                <Image src={card?.url} alt={card?.name} width={250} height={250} priority={true} />
                            </figure>
                            <h2 className="text-2xl text-(--clr-light-a0) text-center font-semibold">{card.name} Card Meaning</h2>
                            <p className="text-xl text-(--clr-light-a0) text-center">Upright: {card.meaning_upright}</p>
                            <p className="text-xl text-(--clr-light-a0) text-center">Reverse: {card.meaning_reverse}</p>
                            <button type="button" onClick={saveDailySpread} className="px-6 py-2 rounded-full mt-4 w-20 self-center bg-(--clr-primary-a10) hover:bg-(--clr-primary-a40) text-(--clr-surface-a0) hover:text-(--clr-surface-tonal-a10) text-lg">Save</button>
                        </div>}
                    </div>
            </main>
        </div>
    )
}