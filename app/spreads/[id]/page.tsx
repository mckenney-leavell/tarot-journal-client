'use client'

import { deleteSpread, getSpreadById } from "@/data/spreads"
import { refresh } from "next/cache"
import { useParams } from "next/navigation"
import { use, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function SpreadDetails({ params }: { params: { id: string }}) {
    const { id } = use(params)
    const [spread, setSpread] = useState({})
    const [cards, getCards] = useState([])
    const router = useRouter()

    useEffect(() => {
        getSpreadById(id).then((data: object) => {
            if (data) {
                setSpread(data)
            }
        })
    }, [id])

    useEffect(() => {
        if (spread.spread_cards) {
            getCards(spread.spread_cards)
        }
    }, [spread])

    const deleteCurrentSpread = id => {
        deleteSpread(id).then(router.push('/spreads'))
    }

    return (
        <>
            <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-gray-950">
                <main className="flex min-h-screen w-full max-w-3xl flex-col items-center py-32 px-10 bg-white dark:bg-gray-950 ">
                    <div className="bg-gray-900 border border-gray-700 rounded-lg lg:p-12 sm:p-6 w-full space-y-4">
                        <div className="text-center space-y-4">
                            <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-300 p-4">{spread.title}</h1>
                            <p className="italic text-zinc-300">{spread.created_date}</p>
                            
                                {cards.length > 0 ? <div className="p-4">
                                            <p className="font-bold text-zinc-300">Cards:</p>
                                            {cards.map(card => {
                                                return (
                                                    <p className="text-zinc-300" key={card.id}>{card.card.name}</p>
                                            )})}
                                        </div> : " "}
                            <div className="p-4">
                                <p className="font-bold text-zinc-300">Interpretation:</p>
                                <p className="text-zinc-300">{spread.interpretation}</p>
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-center my-3">
                            <button onClick={() => router.push(`/spreads/${id}/edit`)} className="bg-zinc-500 hover:bg-zinc-600 text-slate px-8 py-2 rounded-md mx-4 my-2 text-zinc-300">Edit</button>
                            <button onClick={() => deleteCurrentSpread(spread.id)} className="bg-zinc-800 border-1 border-gray-700 hover:border-zinc-500 hover:bg-zinc-500 text-slate px-8 py-2 rounded-md mx-4 my-2 text-zinc-300">Delete</button>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}