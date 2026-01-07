import { getCards } from "@/data/cards"
import { updateSpread } from "@/data/spreads"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { Input, Select, Textarea } from "../form-elements"


export default function SpreadForm({ handleCardSelection, saveSpread, spread, interpretationEl, titleEl }) {
    const [cards, setCards] = useState([])
    const [count, setCount] = useState(1)
    const [spreadCards, setSpreadCards] = useState([])
    const searchParams = useSearchParams()
    const id = searchParams.get('id')
    const router = useRouter() 

    useEffect(() => {
        getCards().then(data => {
            return setCards(data)
        })
    }, [])

    useEffect(() => {
        if (spread) {
            const spreadCardsData = spread?.spread_cards
            setCount(spreadCardsData?.length || 1)
            setSpreadCards(spreadCardsData || [])
        }
    }, [spread])

    const addDropdown = e => {
        e.preventDefault()
        setCount(count + 1)
    }

    return (
        <form className="space-y-4 bg-gray-900 shadow-md rounded-lg border border-gray-700 px-8 pt-6 pb-8 mb-4">
            <div>
                <Input 
                    type="text" 
                    id="visitors" 
                    refEl={titleEl} 
                    placeholder="Add your title"
                    label="Title"
                    required 
                />
            </div>
            {!spread ? 
                <div className="w-full space-y-4">
                    {Array.from({ length: count }).map((each, index) => {
                    return (
                    <Select id={index} key={index} options={cards} title="Select" label="Choose a card" onChangeFunc={(e) => handleCardSelection(index, e.target.value)} />
                    )
                    })}
                    <button onClick={addDropdown} className="flex justify-self-center bg-zinc-500 hover:bg-zinc-600 text-zinc-300 px-8 py-2 rounded-md m-4 text-zinc-300">Add Card</button>
                </div> : 
                <div className="space-y-2">
                    <p>Cards:</p>
                    <div>
                        {spreadCards.map(card => {
                            return (
                                <p key={card.card.id} className="font-bold">{card.card.name}</p>
                            )
                        })}
                    </div>
                </div>
            }

            <Textarea id="message" label="Interpretation" refEl={interpretationEl} placeholder="Write your thoughts here..." />

            <button type="button" onClick={saveSpread} className="flex justify-self-center bg-zinc-500 hover:bg-zinc-600 text-zinc-300 px-8 py-2 rounded-md mt-4">Save</button>
        </form>
    )
}