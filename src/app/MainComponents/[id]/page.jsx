import React, { Suspense } from 'react';
import DetailsPageButton from '@/components/DetailsPageButton';

async function ExerciseContent({ params }) {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`);

    if (!res.ok) {
        throw new Error(`Failed to load exercise ${id}`);
    }

    const data = await res.json();

    return (
        <div className="min-h-screen bg-[#0e0f12] px-4 py-8 text-white">
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-7 md:grid-cols-2 lg:gap-10">

                {/* Image */}
                <div className="overflow-hidden rounded-xl">
                    <img
                        src={data.image}
                        alt={data.name}
                        className="h-[350px] w-full object-cover sm:h-[450px] md:h-[550px]"
                    />
                </div>

                {/* Details */}
                <div>
                    <h1 className="text-2xl font-black uppercase tracking-tight">
                        {data.name}
                    </h1>

                    <p className="mt-2 text-xs leading-relaxed text-gray-400">
                        {data.description}
                    </p>

                    {/* Muscle Groups */}
                    <div className="mt-4 flex flex-wrap gap-2">
                        {data.muscleGroups?.map((muscle) => (
                            <span
                                key={muscle}
                                className="rounded-full bg-lime-400 px-3 py-1 text-[10px] font-bold text-black"
                            >
                                {muscle}
                            </span>
                        ))}
                    </div>

                    {/* Info Card */}
                    <div className="mt-4 overflow-hidden rounded-xl border border-white/5 bg-[#171a22]">
                        {[
                            ["Equipment", data.equipment],
                            ["Difficulty", data.difficulty],
                            ["Sets", data.sets],
                            ["Reps", data.reps],
                            ["Duration", `${data.duration} min`],
                            ["Calories", `${data.caloriesBurned} kcal`],
                            ["Rating", data.rating],
                        ].map(([label, value]) => (
                            <div
                                key={label}
                                className="flex items-center justify-between border-b border-white/5 px-4 py-3 last:border-0"
                            >
                                <span className="text-[10px] uppercase tracking-wider text-gray-400">
                                    {label}
                                </span>
                                <span className="text-xs">{value}</span>
                            </div>
                        ))}
                    </div>

                    {/* Instructions */}
                    <h2 className="mt-5 text-sm font-extrabold uppercase">
                        Instructions
                    </h2>

                    <ol className="mt-3 list-decimal space-y-2 pl-4 text-xs leading-relaxed text-gray-400">
                        {data.instructions?.map((instruction, index) => (
                            <li key={index}>{instruction}</li>
                        ))}
                    </ol>
                    
                    <div className="mt-6 flex flex-wrap gap-3">
                          
                        <DetailsPageButton workout={data} />
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

const Page = ({ params }) => {
    return (
        <Suspense fallback={<div className="p-8 text-white min-h-screen bg-[#0e0f12]">Loading...</div>}>
            <ExerciseContent params={params} />
        </Suspense>
    );
};

export default Page;