import React from 'react';
import Image from 'next/image';


const Body = () => {
    
    return (
        <div className="w-full px-4 sm:px-6 md:px-8 py-4 sm:py-6">
            <section className="bg-[#12141c] text-white py-12 sm:py-16 px-6 sm:px-10 md:px-16 lg:px-24 rounded-2xl sm:rounded-3xl max-w-7xl mx-auto border border-[#1e2230] shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 overflow-hidden">
                
              
                <div className="flex-1 space-y-4 sm:space-y-6 max-w-xl w-full text-center lg:text-left">
                    <p className="text-[#ccff00] text-xs font-bold tracking-widest uppercase">
                        WORKOUT LIBRARY
                    </p>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] uppercase">
                        TRAIN WITH INTENT. LOG EVERY SET.
                    </h1>

                    <p className="text-zinc-400 text-xs sm:text-sm md:text-base leading-relaxed max-w-lg mx-auto lg:mx-0">
                        FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.
                    </p>

                    <div className="pt-2">
                        <button className="w-full sm:w-auto bg-[#ccff00] hover:bg-[#b3e600] text-black font-bold text-xs sm:text-sm tracking-wide px-7 py-3.5 rounded-lg transition shadow-lg shadow-[#ccff00]/10">
                            BROWSE WORKOUTS
                        </button>
                    </div>
                </div>

              
                <div className="flex-1 flex justify-center lg:justify-end w-full">
                    <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md h-[260px] sm:h-[320px] md:h-[380px] flex items-center justify-center">
                        <Image 
                            src="/banner.png" 
                            alt="banner" 
                            fill 
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                            className="object-contain drop-shadow-2xl"
                            priority 
                        />
                    </div>
                </div>

            </section>
        </div>
    );
};

export default Body;