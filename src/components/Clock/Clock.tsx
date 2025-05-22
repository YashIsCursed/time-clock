'use client'
import { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'
import Sectic from '../../../public/Sectic.svg'
import Houtic from '../../../public/Houtic.svg'
import Mintic from '../../../public/Mintic.svg'
import Today from './Today'
const Clock = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    const RotateRef = useRef(null)
    const Sechac = useRef(null)
    const Minhac = useRef(null)
    const Houhac = useRef(null)


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
        gsap.from(Houhac.current, {
            rotate: Math.floor(currentTime.getHours() / 2) * (30)
        })
    })
    useGSAP(() => {
        gsap.to(
            Sechac.current,
            {
                rotate: currentTime.getSeconds() * (6),
                duration: 1,
                ease: "none"
            })
        gsap.to(Minhac.current,
            {
                rotate: currentTime.getMinutes() * (6),
                duration: 1,
                ease: "none"

            })
        gsap.from(Houhac.current, {
            rotate: Math.floor(currentTime.getHours()) * (30),
            duration: 1,
            ease: "none"

        })
    }, [currentTime])
    return (
        <div className='text-8xl  font-bold relative text-[#e1e1e1] w-full h-full flex justify-center items-center'>
            <div
                ref={RotateRef}

                className='h-full w-full flex justify-center items-center absolute'>
                <div className='select-none h-full absolute w-full'>
                    <Image src={Sectic} fill ref={Sechac} loading="eager" className="drop-shadow-white/10 drop-shadow-lg" alt='Seconds' />
                </div>
                <div className='select-none h-[90%] absolute w-[90%]'>
                    <Image src={Mintic} fill ref={Minhac} loading="eager" className="drop-shadow-white/10 drop-shadow-lg" alt='Min' />
                </div>
                <div className='select-none h-[80%] absolute w-[80%]'>
                    <Image src={Houtic} fill ref={Houhac} loading="eager" className="drop-shadow-white/10 drop-shadow-lg" alt='Min' />
                </div>
                <div className='h-[40%] left-8 flex flex-col justify-center items-center text-4xl absolute w-[20%]'>
                    <Today Date={currentTime}/>
                </div>
            </div>
            <pre className=''>{`${currentTime.getHours().toString().padStart(2, '0')}:${currentTime.getMinutes().toString().padStart(2, '0')}`}</pre>

            <pre className='fixed top-0 text-2xl' > {`${currentTime.toLocaleDateString()}`}</pre>
        </div>
    )
}

export default Clock