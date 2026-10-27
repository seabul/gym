"use client";

import Link from 'next/link';
import React, { useMemo, useState } from 'react';
import { Check, Clock3, Flame, Star, X } from 'lucide-react';
import { useFitDetails } from '@/context/FitContext';

const MyPlan = () => {
    const [activeTab, setActiveTab] = useState("today");
    const [sortBy, setSortBy] = useState("Duration");
    const [completedIds, setCompletedIds] = useState([]);
    const { addPlan, setAddPlan, saved, setSaved } = useFitDetails();

    const currentList = activeTab === "today" ? addPlan : saved;

    const sortedList = useMemo(() => [...currentList].sort((a, b) => {
        const durationA = Number(a.duration) || 0;
        const durationB = Number(b.duration) || 0;

        if (sortBy === "Low to high") {
            return durationA - durationB;
        } else if (sortBy === "High to low") {
            return durationB - durationA;
        }
        return 0;
    }), [currentList, sortBy]);

    const totalMinutes = currentList.reduce(
        (total, item) => total + (Number(item.duration) || 0),
        0
    );
    const totalCalories = currentList.reduce(
        (total, item) => total + (Number(item.caloriesBurned) || 0),
        0
    );

    const removeItem = (itemId) => {
        if (activeTab === "today") {
            setAddPlan((items) => items.filter((item) => item.id !== itemId));
        } else {
            setSaved((items) => items.filter((item) => item.id !== itemId));
        }
    };

    const addSavedItemToPlan = (workout) => {
        setAddPlan((items) => (
            items.some((item) => item.id === workout.id) ? items : [...items, workout]
        ));
    };

    const toggleCompleted = (itemId) => {
        setCompletedIds((ids) => (
            ids.includes(itemId)
                ? ids.filter((id) => id !== itemId)
                : [...ids, itemId]
        ));
    };

    const renderTabContent = () => {
        if (sortedList.length === 0) {
            return (
                <div className="bg-[#14171f] border-2 border-dashed border-zinc-800/80 rounded-2xl p-12 md:p-20 flex flex-col items-center justify-center text-center space-y-4 shadow-inner">
                    <div className="space-y-1">
                        <h3 className="text-lg md:text-xl font-bold tracking-wider uppercase text-zinc-100">
                            NOTHING HERE YET
                        </h3>
                        <p className="text-xs md:text-sm text-zinc-400">
                            {activeTab === "today"
                                ? "Browse the library and add a lift to get today moving."
                                : "Save workouts from the library to find them here later."}
                        </p>
                    </div>
                    <Link
                        href="/"
                        className="bg-lime-400 hover:bg-lime-300 text-black text-xs md:text-sm font-bold px-6 py-3 rounded-full shadow-[0_0_20px_rgba(163,230,53,0.3)] transition transform hover:scale-105"
                    >
                        Go to workouts
                    </Link>
                </div>
            );
        }

        return (
            <div className="grid grid-cols-1 gap-4">
                {sortedList.map((item, index) => (
                    <div 
                        key={item.id ?? `${item.name}-${index}`}
                        className={`bg-[#14171f] border border-zinc-800/80 rounded-2xl p-4 md:p-5 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between shadow-md transition ${
                            completedIds.includes(item.id) ? "opacity-70" : "hover:border-zinc-700"
                        }`}
                    >
                        <div className="flex min-w-0 items-center gap-4">
                            <img
                                src={item.image}
                                alt={item.name || "Workout"}
                                className="h-20 w-28 shrink-0 rounded-xl object-cover sm:h-[88px] sm:w-40"
                            />
                            <div className="min-w-0 space-y-1">
                                <Link
                                    href={`/MainComponents/${item.id}`}
                                    className={`inline-block text-base font-black uppercase tracking-wide transition hover:text-lime-400 ${
                                        completedIds.includes(item.id) ? "text-zinc-400 line-through" : "text-white"
                                    }`}
                                >
                                    {item.name || `Workout Lift ${index + 1}`}
                                </Link>
                                <p className="truncate text-xs text-zinc-400">
                                    {item.equipment || item.description || "Custom added exercise routine."}
                                </p>
                                <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-zinc-300">
                                    <span className="flex items-center gap-1">
                                        <Clock3 size={14} className="text-lime-400" />
                                        {item.duration || 15} min
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Flame size={14} className="fill-lime-400 text-lime-400" />
                                        {item.caloriesBurned || 0} kcal
                                    </span>
                                    {item.rating ? (
                                        <span className="flex items-center gap-1">
                                            <Star size={14} className="fill-lime-400 text-lime-400" />
                                            {item.rating}
                                        </span>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-end gap-3">
                            <Link
                                href={`/MainComponents/${item.id}`}
                                className="rounded-full border border-zinc-700 px-4 py-2.5 text-xs font-medium text-zinc-200 transition hover:border-lime-400 hover:text-lime-400"
                            >
                                View Details
                            </Link>
                            {activeTab === "saved" ? (
                                <button
                                    type="button"
                                    onClick={() => addSavedItemToPlan(item)}
                                    disabled={addPlan.some((planItem) => planItem.id === item.id)}
                                    className="rounded-lg border border-lime-400/60 px-3 py-2 text-xs font-semibold text-lime-400 transition hover:bg-lime-400 hover:text-black disabled:cursor-not-allowed disabled:border-zinc-700 disabled:text-zinc-500 disabled:hover:bg-transparent disabled:hover:text-zinc-500"
                                >
                                    {addPlan.some((planItem) => planItem.id === item.id) ? "In plan" : "Add to plan"}
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => toggleCompleted(item.id)}
                                    className={`flex items-center gap-1.5 rounded-full px-4 py-2.5 text-xs font-bold transition ${
                                        completedIds.includes(item.id)
                                            ? "bg-zinc-700 text-zinc-200"
                                            : "bg-lime-400 text-black hover:bg-lime-300"
                                    }`}
                                >
                                    <Check size={14} strokeWidth={3} />
                                    {completedIds.includes(item.id) ? "Done" : "Mark as Done"}
                                </button>
                            )}
                            <button
                                type="button"
                                onClick={() => removeItem(item.id)}
                                aria-label={`Remove ${item.name || "workout"}`}
                                className="rounded-full p-2 text-zinc-500 transition hover:bg-red-400/10 hover:text-red-400"
                            >
                                <X size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-[#111318] text-white font-sans p-6 md:p-10 flex flex-col justify-between">
            <div className="max-w-5xl mx-auto w-full space-y-6">

                <div className="space-y-1">
                    <h1 className="text-2xl md:text-3xl font-extrabold tracking-wider uppercase">MY PLAN</h1>
                    <p className="text-sm text-zinc-400">Cap of five lifts for today. Finish them, then load more.</p>
                </div>

                <div className="bg-[#181b22] border border-zinc-800/60 rounded-2xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 shadow-lg">
                    <div className="flex flex-col border-r border-zinc-800/70 md:pl-7">
                        <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Exercises</span>
                        <span className="text-3xl md:text-4xl font-black text-lime-400 mt-1">{currentList.length}</span>
                    </div>
                    <div className="flex flex-col border-r border-zinc-800/70 md:pl-7">
                        <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Minutes</span>
                        <span className="text-3xl md:text-4xl font-black text-white mt-1">{totalMinutes}</span>
                    </div>
                    <div className="flex flex-col md:pl-7">
                        <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Calories</span>
                        <span className="text-3xl md:text-4xl font-black text-white mt-1">{totalCalories}</span>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
                    {/* Tabs */}
                    <div className="bg-[#181b22] p-1 rounded-xl border border-zinc-800/60 flex items-center space-x-1">
                        <button
                            onClick={() => setActiveTab("today")}
                            className={`px-4 py-2 text-xs font-semibold rounded-lg transition ${
                                activeTab === "today" 
                                    ? 'bg-[#222632] text-white shadow-sm border border-zinc-700/50' 
                                    : 'text-zinc-400 hover:text-white'
                            }`}
                        >
                            Today&apos;s Plan
                        </button>
                        <button
                            onClick={() => setActiveTab("saved")}
                            className={`px-4 py-2 text-xs font-semibold rounded-lg transition ${
                                activeTab === "saved" 
                                    ? 'bg-[#222632] text-white shadow-sm border border-zinc-700/50' 
                                    : 'text-zinc-400 hover:text-white'
                            }`}
                        >
                            Saved
                        </button>
                    </div>

                   
                    <label className="flex items-center gap-2 text-xs text-zinc-400">
                        <span className="sr-only">Sort workouts</span>
                        <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)} 
                            className="select select-ghost bg-[#181b22] border border-zinc-800/60 text-xs font-medium text-zinc-200 rounded-xl"
                        >
                            <option value="Duration">Duration</option>
                            <option value="Low to high">Low to high</option>
                            <option value="High to low">High to low</option>
                        </select>
                    </label>
                </div>

              
                {renderTabContent()}

            </div>
        </div>
    );
};

export default MyPlan;