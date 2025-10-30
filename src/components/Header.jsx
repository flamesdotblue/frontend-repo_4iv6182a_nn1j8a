import React from 'react';
import { Rocket, Wallet, Sparkles } from 'lucide-react';

const Header = ({ onFakeConnect, connectedAddress }) => {
  return (
    <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/70 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 grid place-items-center shadow-lg">
              <Rocket className="h-5 w-5 text-white" />
            </div>
            <div className="flex items-baseline gap-2">
              <h1 className="text-xl font-semibold tracking-tight text-slate-900">ChainLuck</h1>
              <span className="hidden sm:inline-flex items-center gap-1 text-xs font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded-full">
                <Sparkles className="h-3 w-3 text-amber-500" />
                Web3 Lottery
              </span>
            </div>
          </div>

          <button
            onClick={onFakeConnect}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium shadow-sm hover:shadow transition active:scale-[.98]"
          >
            <Wallet className="h-4 w-4 text-slate-700" />
            {connectedAddress ? (
              <span className="font-mono text-slate-800">
                {connectedAddress.slice(0, 6)}...{connectedAddress.slice(-4)}
              </span>
            ) : (
              <span>Connect Wallet</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
