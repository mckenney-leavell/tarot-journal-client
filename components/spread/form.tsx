import { getCards } from "@/data/cards"
import { usePathname, useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useEffect,  useState } from "react"
import { Input, Select, Textarea } from "../form-elements"
import Link from "next/link"
import Image from "next/image"
import { Chat } from "../chat"


export default function SpreadForm({ handleCardSelection, saveSpread, spread, interpretationEl, titleEl, toggleFieldMsg }) {
    const [cards, setCards] = useState([])
    const [count, setCount] = useState(1)
    const [spreadCards, setSpreadCards] = useState([])
    const searchParams = useSearchParams()
    const id = searchParams.get('id')
    const router = useRouter() 
    const pathname = usePathname()

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
        <form className="space-y-4 bg-(--clr-surface-tonal-a20) shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 text-(--clr-light-a0) border border-(--clr-surface-tonal-a30)">
            <div>
                <Input 
                    type="text" 
                    id="visitors" 
                    refEl={titleEl} 
                    placeholder="Add your title"
                    label="Title *"
                    required 
                />
            </div>
            {!spread ? 
                <div className="w-full space-y-4">
                    {Array.from({ length: count }).map((each, index) => {
                    return (
                    <Select id={index} key={index} options={cards} title="Select" label="Choose a card *" onChangeFunc={(e) => handleCardSelection(index, e.target.value)} />
                    )
                    })}
                    <button onClick={addDropdown} className="flex bg-(--clr-surface-tonal-a30) hover:bg-(--clr-surface-tonal-a50) active:bg-(--clr-surface-tonal-a50) border border-(--clr-surface-tonal-a30)  justify-self-center px-6 py-2 rounded-full m-4 active:bg-(--clr-surface-tonal-a30) text-(--clr-light-a0) text-lg fa-solid fa-plus">
                        Add Card
                    </button>
                </div> : 
                <div className="space-y-2">
                    <div className="flex flex-wrap gap-3 justify-center">
                        {spreadCards.map(card => {
                            return (
                                <Link href={`/cards/${card.card.id}`} key={card.card.id}>
                                    <Image src={card.card.url} alt={card.name} width={150} height={150} className=" transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl" priority={true} />
                                </Link>
                            )
                        })}
                    </div>
                </div>
            }

            <Textarea id="message" label="Interpretation" refEl={interpretationEl} placeholder="Write your thoughts here..." />
            
            <p><i>*  = required field</i></p>

            {toggleFieldMsg === true ? <p className="text-(--clr-danger-a20)"><i>* Please add all required fields</i></p> : ""}

            {pathname === `/spreads/${spread?.id}/edit` ? <Chat spread={spread} cards={spreadCards} title={titleEl} /> : ""}

            <button type="button" onClick={saveSpread} className="flex justify-self-center px-6 py-2 rounded-full mt-4 bg-(--clr-surface-tonal-a30) hover:bg-(--clr-primary-a50) text-(--clr-light-a0) hover:text-(--clr-surface-tonal-a10) text-lg">Save</button>

        </form>
    )
}