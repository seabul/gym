import React, { Suspense } from 'react';
import Link from 'next/link';

const WorkoutGrid = async () => {
    const res = await fetch('https://api.abcz.workers.dev/api/fitlog');
    const data = await res.json();

    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mx-auto container max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            {data.map((item) => (
                <Link key={item.id} href={`/MainComponents/${item.id}`}>
                    <div className="overflow-hidden rounded-2xl border border-white/5 bg-[#15161b] text-white shadow-lg transition hover:-translate-y-1 cursor-pointer">

                        <img
                            src={item.image}
                            alt={item.name}
                            className="h-36 w-full object-cover"
                        />

                        <div className="p-4">
                            <div className="mb-3 flex flex-wrap gap-2">
                                {item.muscleGroups.map((muscle, index) => (
                                    <span
                                        key={index}
                                        className="rounded-full bg-lime-400 px-2.5 py-1 text-[10px] font-bold uppercase text-black"
                                    >
                                        {muscle}
                                    </span>
                                ))}
                            </div>

                            <h2 className="text-sm font-extrabold uppercase">
                                {item.name}
                            </h2>

                            <p className="mt-1 text-xs text-gray-400">
                                {item.equipment}
                            </p>

                            <div className="my-3 border-t border-white/10" />

                            <div className="flex items-center justify-between text-xs text-gray-400">
                                <span>◷ {item.duration} min</span>
                                <span>🔥 {item.caloriesBurned} kcal</span>
                                <span>⭐ {item.rating}</span>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

const DataFetch = () => {
    return (
        <Suspense fallback={<div className="px-8 py-12 text-center text-sm text-zinc-400">Loading workouts...</div>}>
            <WorkoutGrid />
        </Suspense>
    );
};

export default DataFetch;