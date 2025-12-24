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
            <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
                <main className="flex min-h-screen w-full max-w-3xl flex-col items-center py-32 px-16 bg-white dark:bg-black ">
                    <div className="text-center">
                        <h1 className=" text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50 p-4">{spread.title}</h1>
                        <p className="italic">{spread.created_date}</p>
                        
                            {cards.length > 0 ? <div className="p-4">
                                        <p className="font-bold">Cards:</p>
                                        {cards.map(card => {
                                            return (
                                                <p key={card.id}>{card.card.name}</p>
                                        )})}
                                    </div> : " "}
                        <div className="p-4">
                            <p className="font-bold">Interpretation:</p>
                            <p>{spread.interpretation}</p>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button className="bg-zinc-400 hover:bg-zinc-500 text-slate px-8 py-2 rounded-md m-4">Edit</button>
                        <button onClick={() => deleteCurrentSpread(spread.id)} className="bg-zinc-900 border-1 border-zinc-400 hover:border-zinc-500 hover:bg-zinc-500 text-slate px-8 py-2 rounded-md m-4">Delete</button>
                    </div>
                </main>
            </div>
        </>
    )
}