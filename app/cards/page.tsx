'use client'
import { getCards } from "@/data/cards"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Cards() {
    const [cards, setCards] = useState([])

    useEffect(() => {
        getCards().then(data => setCards(data))
    }, [])

    return (
         <>
            <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-gray-950">
                <main className="flex min-h-screen w-full max-w-3xl flex-col items-center py-32 px-10 bg-white dark:bg-gray-950">
                    <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-300 p-4">All Cards</h1>
                    <div className="grid grid-cols-6 gap-4">
                        {cards.map(card => {
                            return (
                                <Link href={`/cards/${card.id}`} key={card.id} >
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