'use client'
import { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'
import Sectic from '../../public/Sectic.svg'
import Mintic from '../../public/Mintic.svg'
const Clock = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    const RotateRef = useRef(null)
    const Sechac = useRef(null)
    const Minhac = useRef(null)


    useEffect(() => {
        const timerId = setInterval(() => {
            setCurrentTime(new Date());
        }, 5);

        return () => {
            clearInterval(timerId);
        };

    }, []);
    useGSAP(() => {
        gsap.from(
            Sechac.current,
            {
                rotate: currentTime.getSeconds() * (6)
            })
        gsap.from(Minhac.current, {
            rotate: currentTime.getMinutes() * (6)

        })
    })
    useGSAP(() => {
        gsap.to(
            Sechac.current,
            {
                rotate: currentTime.getSeconds() * (6),
                duration:1,
                delay:0,
                ease:"none"
            })
        gsap.to(Minhac.current, 
            {
            rotate: currentTime.getMinutes() * (6),
            duration:1
        })
    }, [currentTime])
    return (
        <div className='text-8xl font-bold relative text-[#e1e1e1] w-full h-full flex justify-center items-center'>
            <div
                ref={RotateRef}

                className='h-full w-full flex absolute '>
                <Image src={Sectic} fill ref={Sechac} loading="eager" alt='Seconds' />
                <Image src={Mintic} fill ref={Minhac} loading="eager" alt='Min' />
            </div>
            <pre className=''>{`${currentTime.getHours().toString().padStart(2, '0')}:${currentTime.getMinutes().toString().padStart(2, '0')}`}</pre>

            <pre className='fixed top-0 text-2xl' > {`${currentTime.toDateString()}`}</pre>
        </div>
    )
}

export default Clock