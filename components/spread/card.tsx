// import Link from 'next/link'

export default function SpreadCard({ spread }) {
    return (
        <a href="#" className="bg-neutral-primary-soft block max-w-sm p-6 border border-default rounded-base shadow-xs hover:bg-neutral-secondary-medium">
            <h5 className="mb-3 text-2xl font-semibold tracking-tight text-heading leading-8">{spread.title}</h5>
            <p className="text-body">{spread.created_date}</p>
        </a>
    )
}