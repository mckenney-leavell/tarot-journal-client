'use client'

import SpreadForm from "@/components/spread/form"
import { getSpreadById, updateSpread } from "@/data/spreads";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

export default function EditSpread({ params }) {
    const paramString = React.use(params)
    const id = paramString.id
    const [spread, setSpread] = useState({})
    const titleEl = useRef()
    const interpretationEl = useRef()
    const router = useRouter() 

    useEffect(() => {
        if (id) {
            getSpreadById(id).then(spreadObj => {
                    setSpread(spreadObj)
                }
            )
        }
    }, [id])

    useEffect(() => {
        titleEl.current.value = spread.title
        interpretationEl.current.value = spread.interpretation
    }, [titleEl, interpretationEl, spread])

    const saveSpread = () => {
        updateSpread(id, {
            title: titleEl.current.value,
            interpretation: interpretationEl.current.value
        })
        .then(router.push('/spreads'))
    }


    return (
        <>
            <div className="min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
                <main className="m-auto min-h-screen max-w-3xl flex-col items-center py-32 px-16 bg-white dark:bg-black ">
                    <h1 className="justify-self-center max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50 p-4">Edit Spread</h1>
                    <SpreadForm saveSpread={saveSpread} titleEl={titleEl} interpretationEl={interpretationEl} spread={spread} />
                </main>
            </div>
        </>
    )
}