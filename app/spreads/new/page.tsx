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
        <div className="min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-gray-950">
            <main className="m-auto min-h-screen max-w-3xl flex-col items-center py-32 px-16 bg-white dark:bg-gray-950 ">
                <h1 className="justify-self-center text-center max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50 p-4">Add a New Spread</h1>
                <SpreadForm titleEl={titleEl} interpretationEl={interpretationEl} handleCardSelection={handleCardSelection} saveSpread={saveSpread} />
            </main>
        </div>
    )
}