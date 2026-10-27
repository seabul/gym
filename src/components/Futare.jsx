import React from 'react';


const Futare = () => {
    return (
        <footer className="border-t border-white/5 bg-[#090a0c] px-6 py-7 text-white font-sans">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-6">
        
        <a href="/logo.png" className="flex items-center gap-2.5 group">
          <span className="relative flex h-3 w-3 items-center justify-center">
            <span className="absolute left-0 h-2 w-2 rotate-45 rounded-[1px] bg-[#ccff00] group-hover:scale-110 transition-transform"></span>
            <span className="absolute right-0 h-2 w-2 rotate-45 rounded-[1px] bg-[#ccff00] group-hover:scale-110 transition-transform"></span>
          </span>
          <span className="text-xs font-black uppercase tracking-wider text-gray-200">
            FITLOG
          </span>
        </a>

     
        <p className="text-right text-[10px] font-medium text-zinc-500 tracking-wide font-mono">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
    );
};

export default Futare;