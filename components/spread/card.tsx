import { FaAsterisk } from "react-icons/fa"

export default function SpreadCard({ spread }) {
    return (     
        <a href={`/spreads/${spread.id}`} className="group bg-(--clr-surface-tonal-a20) border border-(--clr-surface-tonal-a30) flex flex-row w-full p-6 rounded-full hover:bg-(--clr-primary-a30) self-start pl-10">
            <FaAsterisk className="flex-none text-(--clr-primary-a10) group-hover:text-(--clr-surface-tonal-a20) size-7 my-auto" />
            <div className="ml-5">
                <h5 className="mb-3 text-2xl font-semibold tracking-tight text-(--clr-light-a0) leading-8 group-hover:text-(--clr-surface-tonal-a20)">{spread.title}</h5>
                <p className="text-(--clr-surface-tonal-a50) group-hover:text-(--clr-surface-tonal-a20)">{spread.created_date}</p>
            </div>
        </a>
    )
}