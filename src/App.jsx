import React, { useMemo, useState } from 'react';
import Header from './components/Header';
import PoolCreator from './components/PoolCreator';
import PoolList from './components/PoolList';
import HowItWorks from './components/HowItWorks';

const randomAddress = () => {
  const chars = 'abcdef0123456789';
  let out = '0x';
  for (let i = 0; i < 40; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
};

const App = () => {
  const [address, setAddress] = useState('');
  const [pools, setPools] = useState(() => {
    const now = Date.now();
    return [
      {
        id: `${now}-1`,
        name: 'Genesis Pool',
        ticketPrice: 0.01,
        maxPlayers: 8,
        endsAt: new Date(now + 1000 * 60 * 20).toISOString(),
        players: [randomAddress(), randomAddress()],
        status: 'open',
        winner: null,
      },
      {
        id: `${now}-2`,
        name: 'Friday Mega Pot',
        ticketPrice: 0.05,
        maxPlayers: 20,
        endsAt: new Date(now + 1000 * 60 * 45).toISOString(),
        players: [randomAddress()],
        status: 'open',
        winner: null,
      },
    ];
  });

  const totalValueLocked = useMemo(
    () => pools.reduce((sum, p) => sum + p.players.length * p.ticketPrice, 0),
    [pools]
  );

  const handleConnect = () => {
    // Demo-only wallet connect simulation
    setAddress((prev) => (prev ? prev : randomAddress()));
  };

  const createPool = ({ name, ticketPrice, maxPlayers, endsAt }) => {
    setPools((prev) => [
      {
        id: `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
        name,
        ticketPrice,
        maxPlayers,
        endsAt,
        players: [],
        status: 'open',
        winner: null,
      },
      ...prev,
    ]);
  };

  const joinPool = (id) => {
    setPools((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        if (p.status !== 'open') return p;
        if (p.players.length >= p.maxPlayers) return p;
        const entrant = address || randomAddress();
        if (p.players.includes(entrant)) return p; // prevent double-join in demo
        const updated = { ...p, players: [...p.players, entrant] };
        return updated;
      })
    );
  };

  const drawWinner = (id) => {
    setPools((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        if (p.players.length === 0 || p.status !== 'open') return p;
        const winner = p.players[Math.floor(Math.random() * p.players.length)];
        return { ...p, status: 'closed', winner };
      })
    );
  };

  // Auto-close pools that reached max players or passed end time
  React.useEffect(() => {
    const i = setInterval(() => {
      const now = Date.now();
      setPools((prev) =>
        prev.map((p) => {
          const ended = new Date(p.endsAt).getTime() <= now;
          const full = p.players.length >= p.maxPlayers;
          if (p.status === 'open' && (ended || full)) {
            const winner = p.players.length
              ? p.players[Math.floor(Math.random() * p.players.length)]
              : null;
            return { ...p, status: 'closed', winner };
          }
          return p;
        })
      );
    }, 1000 * 15);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 text-slate-800">
      <Header onFakeConnect={handleConnect} connectedAddress={address} />

      <main className="relative pb-24">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="mx-auto max-w-7xl h-full opacity-70" style={{background:"radial-gradient(700px 250px at 50% -20%, rgba(99,102,241,.18), transparent 60%)"}} />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
                  Create and join lottery pools on-chain
                </h2>
                <p className="mt-4 text-lg text-slate-600">
                  Spin up instant pools, set ticket price and size, and let provable randomness pick a winner. This demo simulates flows—you can wire contracts later.
                </p>
                <div className="mt-6 inline-flex items-center gap-3">
                  <div className="rounded-xl bg-white border border-slate-200 px-4 py-3 shadow-sm">
                    <div className="text-xs text-slate-500">Total value locked</div>
                    <div className="text-xl font-semibold">{totalValueLocked.toFixed(4)} ETH</div>
                  </div>
                  <div className="rounded-xl bg-white border border-slate-200 px-4 py-3 shadow-sm">
                    <div className="text-xs text-slate-500">Active pools</div>
                    <div className="text-xl font-semibold">{pools.filter(p => p.status==='open').length}</div>
                  </div>
                </div>
              </div>
              <div className="lg:justify-self-end w-full">
                <PoolCreator onCreate={createPool} />
              </div>
            </div>
          </div>
        </section>

        <section className="mt-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Open Pools</h3>
              <div className="text-sm text-slate-600">Connected: {address ? `${address.slice(0,6)}...${address.slice(-4)}` : 'Guest'}</div>
            </div>
            <PoolList pools={pools} onJoin={joinPool} onDraw={drawWinner} />
          </div>
        </section>

        <div className="mt-12">
          <HowItWorks />
        </div>
      </main>

      <footer className="border-t border-slate-200 py-6 text-center text-sm text-slate-600">
        Built for demo purposes. Replace the simulated logic with your smart contracts and backend when ready.
      </footer>
    </div>
  );
};

export default App;
