"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useFitDetails } from '@/context/FitContext';


export default function Navbar() {
    const { addPlan, saved } = useFitDetails();
   
    return (
        <nav className="flex items-center justify-between bg-black px-6 py-4 text-white">
            <div className="flex items-center gap-3">
                <Image src="/logo.png" alt="banana" width={32} height={32} />
                <span className="font-bold tracking-wider text-lg">FITLOG</span>
            </div>

            <ul className="flex items-center gap-8 text-sm font-medium">
                <li>
                    <Link href="/"  >
                        <button className="rounded-full bg-zinc-900 px-4 py-1.5 text-lime-400 hover:bg-zinc-800 transition">
                            Workouts
                        </button>
                    </Link>
                </li>
                <li>
                    <Link href="/MyPlan"  >
                        My Plan
                    </Link>
                </li>
            </ul>

           
          
            <Link href="/MyPlan" className="flex items-center gap-4">
            <div className="flex items-center gap-4 text-sm">
                
                <button className="btn">
                    <span>Plan </span>
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-lime-400 font-bold text-black">
                        {addPlan.length}
                    </span>
                </button>
                
                    <button className="flex items-center gap-2 text-zinc-300 hover:text-white">
                        <span>Saved</span>
                        <span className="flex h-6 w-6 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 font-bold text-zinc-400">
                            {saved.length}
                        </span>
                    </button>
                
            </div>
            </Link>
        </nav>
    );
}