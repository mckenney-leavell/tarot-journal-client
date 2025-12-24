import { getCards } from "@/data/cards"
import { useEffect, useState } from "react"


export default function SpreadForm() {
    const [cards, setCards] = useState([])
    const [count, setCount] = useState(1)

    useEffect(() => {
        getCards().then(data => {
            return setCards(data)
        })
    }, [])

    const addDropdown = e => {
        e.preventDefault()
        setCount(count + 1)
    }
    

    return (
        <form className="max-w-sm mx-auto space-y-4">
            <div>
                <label htmlFor="visitors" className="block mb-2.5 text-sm font-medium text-heading">Title</label>
                <input type="text" id="visitors" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-2.5 py-2 shadow-xs placeholder:text-body" placeholder="" required />
            </div>
            {Array.from({ length: count }).map(each => {
            // This whole block runs 'count' times
            return <div key={each}>
                        <label htmlFor="countries" className="block mb-2.5 text-sm font-medium text-heading">Select an option</label>
                            <select id="countries" className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body" required>
                                <option selected>Choose a card</option>
                                {cards.map(card => {
                                    return (<option key={card.id} value={card.id}>{card.name}</option>)
                                })}
                            </select>
                    </div>
            })}
            <button onClick={addDropdown} className="bg-zinc-400 hover:bg-zinc-500 text-slate px-8 py-2 rounded-md m-4">Add</button>
            <div>
                <label for="message" className="block mb-2.5 text-sm font-medium text-heading">Interpretation</label>
                <textarea id="message" rows="4" class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full p-3.5 shadow-xs placeholder:text-body" placeholder="Write your thoughts here..."></textarea>
            </div>
        </form>
    )
}