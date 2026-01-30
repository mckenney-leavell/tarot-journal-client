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
        { name: "Swords" },
        { name: "Pentacles" },
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
            <div className="flex min-h-screen items-center justify-center bg-(--clr-surface-tonal-a10)">
                <main className="flex h-full min-h-screen w-full flex-col items-center py-30 px-10">
                    <h1 className="text-3xl font-bold leading-10 tracking-tight text-(--clr-light-a0) text-center p-4">Tarot Card Meanings</h1>
                    <div className="flex flex-wrap justify-center gap-2 m-3">
                        {filterButtons.map((filterBtn, index) => {
                            return <button key={index} onClick={() => filterCategories(index)} className={activeId === index ? "bg-(--clr-primary-a10) px-5 py-2 mb-3 rounded-full text-(--clr-dark-a0)" : "bg-(--clr-surface-tonal-a0) hover:border-zinc-500 hover:bg-(--clr-surface-tonal-a20) text-(--clr-light-a0) px-5 py-2 mb-3 rounded-full"}>{filterBtn.name}</button>
                        })}
                    </div>

                    <div className="grid grid-cols-2 justify-center lg:grid-cols-6 md:grid-cols-4 gap-4 lg:w-3/4">
                        {filteredCards.map(card => {
                            return (
                                <Link href={`/cards/${card.id}`} key={card.id}>
                                    <Image src={card.url} alt={card.name} width={500} height={500} priority={true} className=" transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl" />
                                </Link>
                            )
                        })}
                    </div>
                </main>    
            </div>
        </>
    )
}