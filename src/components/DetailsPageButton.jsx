"use client";

import React from 'react';
import { useFitDetails } from '@/context/FitContext';

const DetailsPageButton = ({ workout }) => {
    const { addPlan, setAddPlan, saved, setSaved } = useFitDetails();
    
   
    const alredyInAddPlan = addPlan.some(item => item.id === workout.id);  
    const alredyInSaved = saved.some(item => item.id === workout.id); 

    const handleAddPlan = () => {
        if (!alredyInAddPlan) {
            setAddPlan([...addPlan, workout]);
        }
    };

    const handleSaveForLater = () => {
        if (!alredyInSaved) {
            setSaved([...saved, workout]);
        }
    };
    
    return (
        <div className="flex items-center gap-4">
            {/* Add to my plan button */}
            <button 
                onClick={handleAddPlan} 
                className={`rounded-lg border px-4 py-3 text-xs transition ${
                    alredyInAddPlan 
                        ? 'border-lime-400 text-lime-400 bg-lime-400/10 cursor-not-allowed' 
                        : 'border-gray-700 text-gray-300 hover:border-lime-400 hover:text-lime-400'
                }`}
            >
                ♧ &nbsp; {alredyInAddPlan ? "Added to Plan" : "Add to my plan"}
            </button>

         
            <button 
                onClick={handleSaveForLater} 
                className={`rounded-lg border px-4 py-3 text-xs transition ${
                    alredyInSaved 
                        ? 'border-lime-400 text-lime-400 bg-lime-400/10 cursor-not-allowed' 
                        : 'border-gray-700 text-gray-300 hover:border-lime-400 hover:text-lime-400'
                }`}
            >
                ♧ &nbsp; {alredyInSaved ? "Saved" : "Save for later"}
            </button>
        </div>
    );
};

export default DetailsPageButton;