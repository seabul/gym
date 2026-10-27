"use client";
import React from 'react';
import { Toaster } from 'react-hot-toast';
import Futare from './Futare';
import Navbar from './Navbar';
import { FitDetailsProvider } from '@/context/FitContext';

const ClientLayout = ({ children }) => {
    return (

        <FitDetailsProvider>
            <div>
                <Navbar />
                <main>
                    {children}
                </main>
                <Futare />
                <Toaster />

            </div>
        </FitDetailsProvider>
    );
};

export default ClientLayout;