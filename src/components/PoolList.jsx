import React from 'react';
import { Users, Coins, Award, Clock } from 'lucide-react';

const formatEth = (v) => `${v.toFixed(4)} ETH`;

const StatusBadge = ({ status }) => {
  const styles = {
    open: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
    closed: 'bg-rose-50 text-rose-700 ring-rose-600/20',
    drawing: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  };
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ring-1 ${styles[status] || styles.open}`}>
      {status === 'open' && 'Open'}
      {status === 'drawing' && 'Drawing'}
      {status === 'closed' && 'Closed'}
    </span>
  );
};

const PoolList = ({ pools, onJoin, onDraw }) => {
  if (!pools.length) {
    return (
      <div className="text-center text-slate-600 py-10">No pools yet. Be the first to create one!</div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {pools.map((pool) => {
        const playersLeft = pool.maxPlayers - pool.players.length;
        const isClosed = pool.status !== 'open';
        const pot = pool.ticketPrice * pool.players.length;
        const endsIn = new Date(pool.endsAt).getTime() - Date.now();
        const endsLabel = endsIn > 0 ? `${Math.max(1, Math.floor(endsIn / 1000 / 60))}m left` : 'Ended';
        return (
          <div key={pool.id} className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur shadow-sm overflow-hidden">
            <div className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-base font-semibold text-slate-900">{pool.name}</h3>
                  <div className="mt-1 flex items-center gap-2">
                    <StatusBadge status={pool.status} />
                    <div className="inline-flex items-center gap-1 text-xs text-slate-600">
                      <Clock className="h-3.5 w-3.5" /> {endsLabel}
                    </div>
                  </div>
                </div>
                {pool.winner && (
                  <div className="text-right">
                    <div className="text-xs text-slate-500">Winner</div>
                    <div className="font-mono text-sm text-emerald-700">{pool.winner.slice(0,6)}...{pool.winner.slice(-4)}</div>
                  </div>
                )}
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-slate-50 p-3">
                  <div className="text-xs text-slate-500 flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" /> Players
                  </div>
                  <div className="mt-1 text-sm font-semibold text-slate-900">{pool.players.length} / {pool.maxPlayers}</div>
                </div>
                <div className="rounded-lg bg-slate-50 p-3">
                  <div className="text-xs text-slate-500 flex items-center gap-1">
                    <Coins className="h-3.5 w-3.5" /> Pot
                  </div>
                  <div className="mt-1 text-sm font-semibold text-slate-900">{formatEth(pot)}</div>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <div className="text-xs text-slate-600">Ticket: {formatEth(pool.ticketPrice)}</div>
                <div className="flex gap-2">
                  <button
                    disabled={isClosed}
                    onClick={() => onJoin(pool.id)}
                    className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium shadow-sm active:scale-[.98] ${isClosed ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-500'}`}
                  >
                    Join
                  </button>
                  <button
                    onClick={() => onDraw(pool.id)}
                    disabled={pool.players.length === 0 || pool.status !== 'open'}
                    className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium shadow-sm active:scale-[.98] ${pool.players.length === 0 || pool.status !== 'open' ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-amber-500 text-white hover:bg-amber-400'}`}
                  >
                    <Award className="h-4 w-4" /> Draw
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PoolList;
