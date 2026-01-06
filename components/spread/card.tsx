// import Link from 'next/link'

export default function SpreadCard({ spread }) {
    return (
        <a href={`/spreads/${spread.id}`} className="bg-neutral-primary-soft block max-w-sm p-6 border border-zinc-600 rounded-base shadow-xs hover:bg-neutral-secondary-medium">
            <h5 className="mb-3 text-2xl font-semibold tracking-tight text-zinc-300 leading-8">{spread.title}</h5>
            <p className="text-zinc-300">{spread.created_date}</p>
        </a>
    )
}