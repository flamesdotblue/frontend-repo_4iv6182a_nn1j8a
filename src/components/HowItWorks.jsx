import React from 'react';
import { Shield, Users, Coins, Award } from 'lucide-react';

const Step = ({ icon: Icon, title, desc }) => (
  <div className="p-5 rounded-2xl bg-white/70 backdrop-blur border border-slate-200">
    <div className="h-10 w-10 rounded-lg bg-indigo-600/10 text-indigo-600 grid place-items-center">
      <Icon className="h-5 w-5" />
    </div>
    <h4 className="mt-3 text-slate-900 font-semibold">{title}</h4>
    <p className="mt-1 text-sm text-slate-600">{desc}</p>
  </div>
);

const HowItWorks = () => {
  return (
    <section className="relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="mx-auto max-w-7xl h-full opacity-60" style={{background:"radial-gradient(600px 200px at 50% 0%, rgba(99,102,241,.15), transparent 60%)"}} />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">How it works</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Step icon={Shield} title="Trustless by design" desc="Each pool defines rules up-front. Our demo simulates draws locally—wire up your smart contracts when ready." />
          <Step icon={Users} title="Create or join" desc="Spin up your own pool or hop into public ones. Ticket price, size and end time are all configurable." />
          <Step icon={Coins} title="Grow the pot" desc="Every ticket increases the prize. Bigger pools, bigger wins." />
          <Step icon={Award} title="Fair draw" desc="When the pool ends, run a verifiable draw to select the winner and distribute the pot." />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
