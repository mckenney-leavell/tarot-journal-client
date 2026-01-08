'use client'
import { getCards } from "@/data/cards"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Cards() {
    const [cards, setCards] = useState([])
    const [filteredCards, setFilteredCards] = useState([])
    const [activeId, setActiveId] = useState(0)

    const filterButtons = [
        { name: "All" },
        { name: "Major Arcana" },
        { name: "Cups" },
        { name: "Pentacles" },
        { name: "Swords" },
        { name: "Wands" }
    ];

    useEffect(() => {
        getCards()
        .then(data => {
            setCards(data)
            setFilteredCards(data)
        })
    }, [])

    const filterCategories = (i: number) => {
        setActiveId(i)
        if (i === 0) {
            return setFilteredCards(cards)
        } else if (i === 1) {
            const majorArcana = cards.filter(card => card.major_arcana === true)
            return setFilteredCards(majorArcana)
        } else if (i === 2) {
            const cupsCards = cards.filter(card => card.element?.id === 1)
            return setFilteredCards(cupsCards)
        } else if (i === 3) {
            const swordsCards = cards.filter(card => card.element?.id === 2)
            return setFilteredCards(swordsCards)
        } else if (i === 4) {
            const pentaclesCards = cards.filter(card => card.element?.id === 3) 
            return setFilteredCards(pentaclesCards)
        } else {
            const wandsCards = cards.filter(card => card.element?.id === 4) 
            return setFilteredCards(wandsCards)
        }
    }

    return (
         <>
            <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-gray-950">
                <main className="flex min-h-screen w-full max-w-3xl flex-col items-center py-32 px-10 bg-white dark:bg-gray-950">
                    <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-300 p-4">Tarot Card Meanings</h1>
                    <div className="flex flex-row gap-2 m-3">
                        {filterButtons.map((filterBtn, index) => {
                            return <button key={index} onClick={() => filterCategories(index)} className={activeId === index ? "border-1 border-zinc-500 bg-zinc-500 text-slate px-4 py-1.5 mb-3 rounded-full text-zinc-300" : "bg-zinc-800 border-1 border-gray-700 hover:border-zinc-500 hover:bg-zinc-500 text-slate px-4 py-1.5 mb-3 rounded-full text-zinc-300"}>{filterBtn.name}</button>
                        })}
                    </div>
                    <div className="grid grid-cols-6 gap-4">
                        {filteredCards.map(card => {
                            return (
                                <Link href={`/cards/${card.id}`} key={card.id}>
                                    <Image src={card.url} alt={card.name} width={500} height={500} className="transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl" />
                                </Link>
                            )
                        })}
                    </div>
                </main>    
            </div>
        </>
    )
}