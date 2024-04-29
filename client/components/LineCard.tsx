"use client";
import { useState } from 'react'
import MachineCard from './MachineCard';

import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";


export default function LineCard(machines:any) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="w-full h-auto flex flex-col bg-neutral-50 border border-zinc-300 border-opacity-60">
            <div className='  flex-row inline-flex w-auto select-none text-stone-900 items-center justify-between
             px-3' onClick={() => setIsOpen(!isOpen)} >
                <div className='flex flex-row items-center gap-x-3'>
            <div className='w-5 h-5 bg-green-300  rounded-full border-2 border-green-600' />
            <p>Line1 </p></div> 
            <div
                className="text-3xl px-4 py-2 select-none text-stone-900 focus:outline-none"
                
            >

                {!isOpen ? <FaAngleLeft/> : <FaAngleDown/>}
            </div></div>

            {isOpen && (
                <div className=" p-4  gap-x-2  bg-neutral-50 border border-zinc-300 border-opacity-60">
                   
                {machines.machines.map((machine) => (
                    <MachineCard key={machine.name} name={machine.name} status={machine.status} />
                ))}
                   </div>
           
            )}
        </div>
    )
}