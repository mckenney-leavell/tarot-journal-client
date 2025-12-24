'use client'

import SpreadForm from "@/components/spread/form";

    const saveSpread = () => {
        const spread = {
            title: title.value,
            
        }
    }


export default function NewSpread() {
    return (
        <div className="min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="m-auto min-h-screen max-w-3xl flex-col items-center py-32 px-16 bg-white dark:bg-black ">
                <h1 className="justify-self-center max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50 p-4">New Spread</h1>
                <SpreadForm />
                <button className="flex justify-self-center bg-zinc-400 hover:bg-zinc-500 text-slate px-8 py-2 rounded-md m-4">Save</button>
            </main>
        </div>
    )
}