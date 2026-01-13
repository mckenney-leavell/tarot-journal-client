'use client'

import SpreadForm from "@/components/spread/form"
import { getSpreadById, updateSpread } from "@/data/spreads";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

export default function EditSpread({ params }) {
    const paramString = React.use(params)
    const id = paramString.id
    const [spread, setSpread] = useState({})
    const [toggleRequiredFieldMsg, setToggleRequiredFieldMsg] = useState(false)
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
        if (titleEl.current.value === " " || titleEl.current.value === "") {
            setToggleRequiredFieldMsg(true)
            return console.log("No title added")
        } else {
            updateSpread(id, {
                title: titleEl.current.value,
                interpretation: interpretationEl.current.value
            })
            .then(router.push('/spreads'))
        }
    }


    return (
        <>
            <div className="min-h-screen items-center justify-center bg-(--clr-surface-tonal-a10)">
                <main className="m-auto min-h-screen max-w-3xl flex-col items-center py-32 px-16">
                    <h1 className="justify-self-center max-w-xs text-3xl font-bold leading-10 tracking-tight p-4 text-(--clr-light-a0)">Edit Spread</h1>
                    <SpreadForm saveSpread={saveSpread} titleEl={titleEl} interpretationEl={interpretationEl} spread={spread} toggleFieldMsg={toggleRequiredFieldMsg} />
                </main>
            </div>
        </>
    )
}