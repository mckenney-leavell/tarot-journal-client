// import Link from 'next/link'

export default function SpreadCard({ spread }) {
    return (
        <a href={`/spreads/${spread.id}`} className="bg-gray-900 border border-gray-700 block w-full p-6 rounded-lg shadow-xs hover:bg-gray-800 self-start">
            <h5 className="mb-3 text-2xl font-semibold tracking-tight text-zinc-300 leading-8">{spread.title}</h5>
            <p className="text-zinc-500">{spread.created_date}</p>
        </a>
    )
}