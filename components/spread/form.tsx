import { getCards } from "@/data/cards"
import { updateSpread } from "@/data/spreads"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"


export default function SpreadForm({ handleCardSelection, saveSpread, spread, interpretationEl, titleEl }) {
    const [cards, setCards] = useState([])
    const [count, setCount] = useState(1)
    const [spreadCards, setSpreadCards] = useState([])
    const searchParams = useSearchParams()
    const id = searchParams.get('id')
    // const titleEl = useRef(null)   
    // const interpretationEl = useRef(null) 
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
        <form className="max-w-sm mx-auto space-y-4">
            <div>
                <label htmlFor="visitors" className="block mb-2.5 text-sm font-medium text-heading text-zinc-300">Title</label>
                <input type="text" id="visitors" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-2.5 py-2 shadow-xs placeholder:text-body text-zinc-300" placeholder="Add your title" ref={titleEl} required />
            </div>
            {!spread ? 
            <div>
                {Array.from({ length: count }).map((each, index) => {
                return <div key={index}>
                            <label htmlFor="countries" className="block mb-2.5 text-sm font-medium text-heading text-zinc-300">Choose a Card</label>
                                <select 
                                    id="countries" 
                                    className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-zinc-300 text-zinc-300 text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body" 
                                    onChange={(e) => handleCardSelection(index, e.target.value)}
                                    required
                                >
                                    <option defaultValue={undefined}>Select</option>
                                    {cards.map(card => {
                                        return (<option key={card.id} value={card.id}>{card.name}</option>)
                                    })}
                                </select>
                        </div>
                })}
                <button onClick={addDropdown} className="flex justify-self-center bg-zinc-500 hover:bg-zinc-600 text-zinc-300 px-8 py-2 rounded-md m-4 text-zinc-300">Add Card</button>
            </div> : 
            spreadCards.map(card => {
                return (
                    <div key={card.id}>
                        <div >
                            <label htmlFor="visitors" className="block mb-2.5 text-sm font-medium text-heading text-zinc-300"/>
                            <input type="text" id="visitors" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-2.5 py-2 shadow-xs placeholder:text-body text-zinc-300" placeholder="Add your title" defaultValue={card.card?.name} readOnly />
                        </div>
                    </div>)
            })
            }
            <div> 
                <label htmlFor="message" className="block mb-2.5 text-sm font-medium text-heading text-zinc-300">Interpretation</label>
                <textarea id="message" rows={4} className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full p-3.5 shadow-xs placeholder:text-body text-zinc-300" placeholder="Write your thoughts here..." ref={interpretationEl} />
            </div>
            <button type="button" onClick={saveSpread} className="flex justify-self-center bg-zinc-500 hover:bg-zinc-600 text-zinc-300 px-8 py-2 rounded-md m-4">Save</button>
        </form>
    )
}