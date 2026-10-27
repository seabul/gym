"use client";
import React, { createContext, useContext, useState } from 'react';

const Context = React.createContext();

const FitContext = createContext();

export function FitDetailsProvider({ children }) {
    const [addPlan, setAddPlan] = useState([]);
    const [saved, setSaved] = useState([]);
    const value = {
        addPlan,
        setAddPlan,
        saved,
        setSaved,
    };

    return (
        <FitContext.Provider value={value}>
            {children}
        </FitContext.Provider>
    );
}
export function useFitDetails() {
    const context = useContext(FitContext);
    if (!context) {
        throw new Error("useFitDetails must be used within a FitDetailsProvider");
    }
    return context;
}
