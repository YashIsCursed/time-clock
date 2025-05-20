'use client'
import { useEffect, useRef, useState } from "react";

export default function Stopwatch() {
    const [Watch, SetWatch] = useState(new Date())
    const [Dif, SetDif] = useState(0)
    const
        Href = useRef(null),
        Mref = useRef(null),
        Sref = useRef(null)

    useEffect(() => {

        if (Watch === null) {
            StartWatch()
        }

        const timerId = setInterval(() => {
            SetDif(new Date().getTime() - Watch.getTime())
        }, 5)
        return () => {
            clearInterval(timerId)
        }

    })

    function StartWatch() {
        SetWatch(new Date())
    }

    return (
        <div className="w-full h-full flex ">
            <div className="h-full flex-3 justify-center items-center flex flex-col gap-8">
                <div className='text-7xl  font-bold relative text-[#e1e1e1] w-max h-max flex justify-evenly items-center gap-4'>
                    <p ref={Href}>{(Math.floor(Dif / (1000 * 360)) % 24).toString().padStart(2, "0")}</p>
                    <p ref={Mref}>{(Math.floor(Dif / (1000 * 60)) % 60).toString().padStart(2, "0")}</p>
                    <p ref={Sref}>{(Math.floor((Dif / 1000)) % 60).toString().padStart(2, "0")}</p>
                </div>

                <div className="flex flex-row gap-4">
                    <button className="p-4 bg-[#fff2] rounded-3xl text-2xl border-white/50 ">Start:Stop</button>
                    <button className="p-4 bg-[#fff2] rounded-3xl text-2xl border-white/50 border-4">Reset:Flag</button>
                </div>
            </div>
            <div className="flex-1">
                List
            </div>
        </div>
    );
}