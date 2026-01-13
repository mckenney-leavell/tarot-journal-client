'use client'

import SpreadForm from "@/components/spread/form";
import { createSpreadCard } from "@/data/spreadcards";
import { createSpread, updateSpread } from "@/data/spreads";
import { useSearchParams, useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function NewSpread() {
    const [selectedCards, setSelectedCards] = useState([])
    const searchParams = useSearchParams()
    const id = searchParams.get('id')
    const titleEl = useRef(null)   
    const interpretationEl = useRef(null) 
    const router = useRouter() 

    const saveSpreadCards = spreadId => {
        // const spreadId = parseInt(id)
        return selectedCards.forEach(card => {createSpreadCard({
                card_id: card,
                spread_id: spreadId
            })
        })
    }

    const saveSpread = () => {
        createSpread({
            title: titleEl.current.value,
            interpretation: interpretationEl.current.value
        })
        .then(spread => 
            saveSpreadCards(spread.id))
        .then(router.push("/spreads"))
    }

    const handleCardSelection = (index, cardId) => {
        const updateCards = [...selectedCards]
        if (cardId != "Select") {
            const selectionId = parseInt(cardId)
            updateCards[index] = selectionId
            setSelectedCards(updateCards)
        } else {
            updateCards.splice(index, 1)
            setSelectedCards(updateCards)
        }
    }

    return (
        <div className="min-h-screen items-center justify-center bg-(--clr-surface-tonal-a10)">
            <main className="m-auto min-h-screen max-w-3xl flex-col items-center py-32 px-16">
                <h1 className="justify-self-center text-(--clr-light-a0) text-center text-3xl font-bold leading-10 tracking-tight  p-4">Record Your Reading</h1>
                <SpreadForm titleEl={titleEl} interpretationEl={interpretationEl} handleCardSelection={handleCardSelection} saveSpread={saveSpread} />
            </main>
        </div>
    )
}