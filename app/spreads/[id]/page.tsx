'use client'

import { deleteSpread, getSpreadById } from "@/data/spreads"
import { refresh } from "next/cache"
import { useParams } from "next/navigation"
import { use, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

export default function SpreadDetails({ params }: { params: { id: string }}) {
    const { id } = use(params)
    const [spread, setSpread] = useState({})
    const [cards, getCards] = useState([])
    const [toggleDeleteConfirm, setToggleDeleteConfirm] = useState(false)
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
            <div className="flex min-h-screen items-center justify-center bg-(--clr-surface-tonal-a10)">
                <main className="flex min-h-screen w-full max-w-3xl flex-col items-center py-32 px-10">
                    <div className="bg-(--clr-surface-tonal-a20) rounded-lg lg:p-12 sm:p-6 w-full space-y-4 border border-(--clr-surface-tonal-a30)">
                        <div className="text-center space-y-4 text-(--clr-light-a0)">
                            <h1 className="text-3xl font-bold leading-10 tracking-tight pt-4">{spread.title}</h1>
                            <p className="italic text-(--clr-surface-tonal-a50)">{spread.created_date}</p>
                                {cards.length > 0 ? <div className="flex flex-wrap gap-3 justify-center">
                                        {cards.map(card => {
                                            return (
                                                <Link key={card.card?.id} href={`/cards/${card.card.id}`} >
                                                    <Image src={card.card?.url} alt={card.card.name} width={150} height={150} />
                                                </Link>
                                            )
                                        })}
                                    </div>
                                : " "} 
                            {!spread.interpretation ? "" :       
                                <div className="p-4">
                                    <p className="text-xl">Interpretation:</p>
                                    <p className="text-l">{spread.interpretation}</p>
                                </div>
                            }
                            {!spread.ai_interpretation ? "" :       
                                <div className="p-4">
                                    <p className="text-(--clr-primary-a30) text-xl">Your Personalized Interpretation:</p>
                                    <p className="text-l">{spread.ai_interpretation}</p>
                                </div>
                            }
                        </div>
                        <div className="flex flex-wrap justify-center my-3">
                            <button onClick={() => router.push(`/spreads/${id}/edit`)} className="bg-(--clr-primary-a10) hover:bg-(--clr-primary-a40) text-(--clr-dark-a0) px-8 py-2 rounded-full mx-4 my-2">Edit</button>
                            <button onClick={() => setToggleDeleteConfirm(true)} className="bg-(--clr-surface-tonal-a40) text-(--clr-light-a0) hover:bg-(--clr-surface-tonal-a50) px-8 py-2 rounded-full mx-4 my-2">Delete</button>
                        </div>
                        {toggleDeleteConfirm === false ? "" : 
                            <div className="flex flex-col items-center">
                                <p className="text-xl text-(--clr-light-a0)">Are you sure you want to delete?</p>
                                <div>
                                    <button onClick={() => deleteCurrentSpread(spread.id)} className="bg-(--clr-danger-a10) text-(--clr-light-a0) hover:bg-(--clr-danger-a20) px-8 py-2 rounded-full mx-2 my-2">Confirm Delete</button>
                                    <button onClick={() => setToggleDeleteConfirm(false)} className="bg-(--clr-surface-tonal-a40) text-(--clr-light-a0) hover:bg-(--clr-surface-tonal-a50) px-8 py-2 rounded-full mx-4 my-2">Cancel</button>
                                </div>
                            </div>
                        }
                    </div>
                </main>
            </div>
        </>
    )
}