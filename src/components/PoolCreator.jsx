import React, { useState } from 'react';
import { Plus, Calendar, Users, Coins } from 'lucide-react';

const PoolCreator = ({ onCreate }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('0.05');
  const [maxPlayers, setMaxPlayers] = useState('10');
  const [endAt, setEndAt] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price || !maxPlayers || !endAt) return;
    const p = parseFloat(price);
    const m = parseInt(maxPlayers, 10);
    if (isNaN(p) || isNaN(m) || p <= 0 || m < 2) return;
    const endsAt = new Date(endAt).toISOString();
    onCreate({ name, ticketPrice: p, maxPlayers: m, endsAt });
    setName('');
    setPrice('0.05');
    setMaxPlayers('10');
    setEndAt('');
  };

  return (
    <div className="bg-white/80 backdrop-blur rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-9 w-9 rounded-lg bg-indigo-600/10 text-indigo-600 grid place-items-center">
          <Plus className="h-5 w-5" />
        </div>
        <h2 className="text-lg font-semibold text-slate-900">Create a Lottery Pool</h2>
      </div>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Pool name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Friday Night Mega Pot"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Ticket price (ETH)</label>
          <div className="relative">
            <Coins className="h-4 w-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="number"
              min="0.0001"
              step="0.0001"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full rounded-lg border border-slate-300 pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Max players</label>
          <div className="relative">
            <Users className="h-4 w-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="number"
              min="2"
              step="1"
              value={maxPlayers}
              onChange={(e) => setMaxPlayers(e.target.value)}
              className="w-full rounded-lg border border-slate-300 pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Ends at</label>
          <div className="relative">
            <Calendar className="h-4 w-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="datetime-local"
              value={endAt}
              onChange={(e) => setEndAt(e.target.value)}
              className="w-full rounded-lg border border-slate-300 pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
        <div className="md:col-span-4 flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 text-white px-4 py-2 font-medium shadow hover:bg-indigo-500 active:scale-[.98]"
          >
            <Plus className="h-4 w-4" /> Create Pool
          </button>
        </div>
      </form>
    </div>
  );
};

export default PoolCreator;
