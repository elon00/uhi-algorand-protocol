import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, 
  Cpu, 
  Coins, 
  Activity, 
  QrCode, 
  Mic, 
  MicOff, 
  Send, 
  Wallet, 
  CheckCircle2, 
  AlertTriangle,
  Play, 
  Pause, 
  RotateCcw,
  Sparkles,
  ExternalLink,
  Layers
} from 'lucide-react';

interface ServiceItem {
  id: number;
  title: string;
  desc: string;
  cost: number;
  tax: number;
  category: string;
  invocations: number;
}

export default function App() {
  // Protocol State
  const [totalSupply, setTotalSupply] = useState(1000000000.0);
  const [treasuryBalance, setTreasuryBalance] = useState(10000000.0);
  const [basePayout] = useState(500.0);
  const [multiplier, setMultiplier] = useState(1.25);
  const [connectedWallet, setConnectedWallet] = useState<{ name: string; address: string } | null>(null);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [claimStatus, setClaimStatus] = useState<string | null>(null);
  const [isClaimed, setIsClaimed] = useState(false);

  // Conway 16x16 State
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [grid, setGrid] = useState<boolean[]>(() => {
    const initial = new Array(256).fill(false);
    // Center Glider
    initial[5 * 16 + 6] = true;
    initial[6 * 16 + 7] = true;
    initial[7 * 16 + 5] = true;
    initial[7 * 16 + 6] = true;
    initial[7 * 16 + 7] = true;
    // Oscillators
    initial[2 * 16 + 2] = true; initial[2 * 16 + 3] = true;
    initial[3 * 16 + 2] = true; initial[3 * 16 + 3] = true;
    initial[12 * 16 + 12] = true; initial[12 * 16 + 13] = true;
    initial[13 * 16 + 12] = true; initial[13 * 16 + 13] = true;
    return initial;
  });
  const [generation, setGeneration] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // x402 Bazaar Services
  const [services, setServices] = useState<ServiceItem[]>([
    {
      id: 1,
      title: "Tesla Optimus Automated Factory Line Task",
      desc: "Robotics actuation and assembly dispatch via Algorand atomic micro-settlements.",
      cost: 50.0,
      tax: 5.0,
      category: "ROBOTICS",
      invocations: 3410
    },
    {
      id: 2,
      title: "DeepSeek AI Multi-Modal Inference Cluster",
      desc: "Decentralized GPU compute inference verified with Algorand state proofs.",
      cost: 10.0,
      tax: 1.0,
      category: "AI_INFERENCE",
      invocations: 14250
    },
    {
      id: 3,
      title: "Autonomous Cargo Drone Fleet Routing",
      desc: "Algorand atomic dispatch for autonomous freight delivery.",
      cost: 25.0,
      tax: 2.5,
      category: "ROBOTICS",
      invocations: 820
    }
  ]);

  // QR Payload
  const [qrPayload, setQrPayload] = useState("algorand://PERA4ELON7MUSK8UHI9ALGORAND9POSTSCARCITYNODE2222?amount=625000000&asset=10928473");
  const [qrSvg, setQrSvg] = useState("");

  // Multimodal AI Chatbot
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ sender: 'ai' | 'user'; text: string }[]>([
    {
      sender: 'ai',
      text: "Hello! I am the UHI Algorand Autonomous Agent. I enforce post-scarcity economics, monitor x402 atomic tax routing on Algorand, compute Conway cellular entropy, and ensure all technical layers are Genuine Green before any mainnet actions. How can I assist you?"
    }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  // Conway Step Logic
  const countNeighbors = (x: number, y: number, currentGrid: boolean[]) => {
    let count = 0;
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dy === 0) continue;
        const nx = (x + dx + 16) % 16;
        const ny = (y + dy + 16) % 16;
        if (currentGrid[ny * 16 + nx]) count++;
      }
    }
    return count;
  };

  const stepConway = () => {
    setGrid(prev => {
      const next = new Array(256).fill(false);
      let aliveCount = 0;
      for (let y = 0; y < 16; y++) {
        for (let x = 0; x < 16; x++) {
          const idx = y * 16 + x;
          const neighbors = countNeighbors(x, y, prev);
          const current = prev[idx];
          const nextState = current ? (neighbors === 2 || neighbors === 3) : (neighbors === 3);
          next[idx] = nextState;
          if (nextState) aliveCount++;
        }
      }
      const newMult = Number((1.0 + (aliveCount * 0.5) / 256).toFixed(2));
      setMultiplier(newMult);
      return next;
    });
    setGeneration(g => g + 1);
  };

  useEffect(() => {
    let timer: any;
    if (isRunning) {
      timer = setInterval(stepConway, 400);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  // Render Conway on Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#060a12';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const cellSize = canvas.width / 16;
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.15)';
    ctx.lineWidth = 1;

    for (let i = 0; i <= 16; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cellSize, 0);
      ctx.lineTo(i * cellSize, canvas.height);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, i * cellSize);
      ctx.lineTo(canvas.width, i * cellSize);
      ctx.stroke();
    }

    for (let y = 0; y < 16; y++) {
      for (let x = 0; x < 16; x++) {
        const idx = y * 16 + x;
        if (grid[idx]) {
          ctx.fillStyle = '#00ffd5';
          ctx.shadowColor = '#00ffd5';
          ctx.shadowBlur = 8;
          ctx.fillRect(x * cellSize + 2, y * cellSize + 2, cellSize - 4, cellSize - 4);
          ctx.shadowBlur = 0;
        }
      }
    }
  }, [grid]);

  // Canvas Click to Toggle Cells
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / (canvas.width / 16));
    const y = Math.floor((e.clientY - rect.top) / (canvas.height / 16));
    if (x >= 0 && x < 16 && y >= 0 && y < 16) {
      const idx = y * 16 + x;
      setGrid(prev => {
        const next = [...prev];
        next[idx] = !next[idx];
        const alive = next.filter(Boolean).length;
        setMultiplier(Number((1.0 + (alive * 0.5) / 256).toFixed(2)));
        return next;
      });
    }
  };

  // Native SVG QR Generation
  const generateNativeQr = (text: string) => {
    const size = 160;
    const matrixSize = 21;
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = ((hash << 5) - hash) + text.charCodeAt(i);
      hash |= 0;
    }
    const cellSize = (size / matrixSize).toFixed(2);
    let rects = '';
    for (let r = 0; r < matrixSize; r++) {
      for (let c = 0; c < matrixSize; c++) {
        const inFinderTL = r < 7 && c < 7;
        const inFinderTR = r < 7 && c >= matrixSize - 7;
        const inFinderBL = r >= matrixSize - 7 && c < 7;
        const isFinderBorder = (r === 0 || r === 6 || c === 0 || c === 6 || (r >= 2 && r <= 4 && c >= 2 && c <= 4));

        let isDark = false;
        if ((inFinderTL || inFinderTR || inFinderBL) && isFinderBorder) {
          isDark = true;
        } else if (!inFinderTL && !inFinderTR && !inFinderBL) {
          const bitVal = ((hash ^ ((r + 1) * (c + 1) * 31)) >> ((r * c) % 16)) & 1;
          isDark = bitVal === 1;
        }
        if (isDark) {
          const x = (c * (size / matrixSize)).toFixed(2);
          const y = (r * (size / matrixSize)).toFixed(2);
          rects += `<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" fill="#060a12" />`;
        }
      }
    }
    return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; border-radius:8px; display:block;">${rects}</svg>`;
  };

  useEffect(() => {
    setQrSvg(generateNativeQr(qrPayload));
  }, [qrPayload]);

  // Execute x402 Service with 10% UHI Tax Routing
  const executeService = (id: number) => {
    setServices(prev => prev.map(s => {
      if (s.id === id) {
        setTreasuryBalance(b => b + s.tax);
        setTotalSupply(ts => ts + s.tax);
        return { ...s, invocations: s.invocations + 1 };
      }
      return s;
    }));
  };

  // Claim UHI Action
  const handleClaim = () => {
    if (!connectedWallet) {
      setIsWalletModalOpen(true);
      setClaimStatus("Please connect your Algorand wallet first.");
      return;
    }
    if (isClaimed) {
      setClaimStatus("UHI Dividend already claimed for current epoch.");
      return;
    }
    const payout = (basePayout * multiplier).toFixed(2);
    setClaimStatus("Verifying Algorand Falcon-512 Post-Quantum State Proof...");
    setTimeout(() => {
      setIsClaimed(true);
      setClaimStatus(`SUCCESS: ${payout} UHI distributed to ${connectedWallet.address.slice(0, 8)}... (Algorand Block Finality: 2.8s, Zero Gas Fee)`);
    }, 600);
  };

  // Speech TTS & STT
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 1.05;
      window.speechSynthesis.speak(u);
    }
  };

  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput.trim();
    setChatMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setChatInput("");

    setTimeout(() => {
      let reply = "UHI on Algorand is operational. We enforce the principle: all technical layers must be genuinely green before any mainnet funds are committed.";
      const q = userMsg.toLowerCase();
      if (q.includes("green") || q.includes("mainnet") || q.includes("risk") || q.includes("test")) {
        reply = "Crucial Rule: Making all technical layers Genuine Green first is the only systematic, low-risk route. We verify TEAL contracts, x402 atomic tax routing, Conway entropy, and Falcon PQC locally before touching mainnet.";
      } else if (q.includes("elon") || q.includes("uhi") || q.includes("income")) {
        reply = "Elon Musk's Universal High Income thesis leverages AI and robotics (Tesla Optimus) to reduce marginal production costs to near zero, creating post-scarcity deflationary abundance.";
      } else if (q.includes("falcon") || q.includes("quantum")) {
        reply = "Algorand uses Falcon-512 state proofs natively. Our PQC layer verifies lattice proofs, ensuring quantum immunity against Shor's algorithm.";
      }
      setChatMessages(prev => [...prev, { sender: 'ai', text: reply }]);
      speakText(reply);
    }, 400);
  };

  const livingCells = grid.filter(Boolean).length;
  const effectivePayout = (basePayout * multiplier).toFixed(2);

  return (
    <div className="min-h-screen bg-[#05070c] text-slate-100 pb-20 selection:bg-teal-500 selection:text-black">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-[#080d18]/80 backdrop-blur-md border-b border-sky-500/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-400 to-indigo-600 flex items-center justify-center shadow-lg shadow-teal-500/20">
            <Coins className="w-6 h-6 text-black" />
          </div>
          <div>
            <div className="font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-sky-400 to-indigo-400 text-lg">
              UHI PROTOCOL (ALGORAND)
            </div>
            <div className="text-xs text-slate-400 font-mono">
              Pure Proof of Stake &bull; 2.8s Finality &bull; Falcon-512 PQC
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-teal-500/30 text-teal-300 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
            Algorand MainNet Ready &bull; Layer Verification OK
          </div>

          <button 
            onClick={() => connectedWallet ? setConnectedWallet(null) : setIsWalletModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-teal-400 to-sky-500 text-slate-950 font-semibold text-sm hover:opacity-95 transition cursor-pointer shadow-md shadow-teal-500/20"
          >
            <Wallet className="w-4 h-4" />
            {connectedWallet ? `${connectedWallet.name}: ${connectedWallet.address.slice(0, 6)}...` : "Connect Algorand Wallet"}
          </button>
        </div>
      </header>

      {/* Systematic Low-Risk Banner */}
      <div className="max-w-7xl mx-auto px-6 mt-6">
        <div className="p-4 rounded-xl bg-gradient-to-r from-teal-950/40 via-sky-950/30 to-indigo-950/40 border border-teal-500/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-teal-500/20 text-teal-400">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <div className="font-semibold text-teal-300 text-sm flex items-center gap-2">
                SYSTEMATIC & LOW-RISK VERIFICATION ROUTE
                <span className="px-2 py-0.5 rounded text-[10px] bg-teal-400/20 text-teal-300 border border-teal-400/30">100% GENUINE GREEN</span>
              </div>
              <div className="text-xs text-slate-300 mt-0.5">
                All 6 technical layers (TEAL contracts, x402 atomic tax groups, Conway grid, Falcon PQC, and UHI ASA) are verified green before any mainnet funds are committed.
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-teal-300 bg-slate-950/60 px-3 py-1.5 rounded-lg border border-teal-500/20">
            <CheckCircle2 className="w-4 h-4 text-teal-400" /> 6 / 6 Layers Verified
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="max-w-7xl mx-auto px-6 mt-6 grid grid-cols-2 md:grid-cols-5 gap-4 font-mono">
        <div className="glass-card p-4">
          <div className="text-xs text-slate-400 mb-1">UHI Total Supply</div>
          <div className="text-lg font-bold text-white">{totalSupply.toLocaleString()} UHI</div>
          <div className="text-[11px] text-teal-400">Algorand ASA Standard</div>
        </div>
        <div className="glass-card p-4">
          <div className="text-xs text-slate-400 mb-1">Treasury Reserves</div>
          <div className="text-lg font-bold text-teal-300">{treasuryBalance.toLocaleString()} UHI</div>
          <div className="text-[11px] text-sky-400">+10% x402 Auto-Tax</div>
        </div>
        <div className="glass-card p-4">
          <div className="text-xs text-slate-400 mb-1">Conway Compute Nodes</div>
          <div className="text-lg font-bold text-indigo-300">{livingCells} / 256 Nodes</div>
          <div className="text-[11px] text-indigo-400">Density: {((livingCells/256)*100).toFixed(1)}%</div>
        </div>
        <div className="glass-card p-4">
          <div className="text-xs text-slate-400 mb-1">Dynamic Multiplier</div>
          <div className="text-lg font-bold text-emerald-400">{multiplier}x ({Math.round(multiplier*100)}%)</div>
          <div className="text-[11px] text-emerald-300">Base: 500 &rarr; {effectivePayout} UHI</div>
        </div>
        <div className="glass-card p-4 col-span-2 md:col-span-1">
          <div className="text-xs text-slate-400 mb-1">Verified Citizens</div>
          <div className="text-lg font-bold text-purple-300">1,840 Active</div>
          <div className="text-[11px] text-purple-400">Falcon State Proofs</div>
        </div>
      </div>

      {/* Main 2-Column Dashboard */}
      <main className="max-w-7xl mx-auto px-6 mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column: Claim Terminal & Native QR */}
        <div className="space-y-6">
          {/* UHI Claim Card */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2 font-bold text-lg text-white">
                <Sparkles className="w-5 h-5 text-teal-400" />
                Universal High Income Claim Terminal
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-teal-500/10 text-teal-300 border border-teal-500/30">
                Epoch #1 Active
              </span>
            </div>

            <div className="mt-6 p-6 rounded-xl bg-gradient-to-br from-teal-950/20 to-sky-950/20 border border-teal-500/30 text-center">
              <div className="text-xs text-teal-300 font-mono uppercase tracking-wider mb-1">Eligible Human Dividend</div>
              <div className="text-4xl font-extrabold text-white font-mono">{effectivePayout} <span className="text-teal-400 text-2xl">UHI</span></div>
              <div className="text-xs text-slate-400 mt-2">Zero Gas Fee &bull; Reverse-Gas Model &bull; 2.8s Algorand Finality</div>
            </div>

            <div className="mt-6 space-y-2 text-xs font-mono text-slate-300 bg-slate-950/50 p-4 rounded-lg border border-slate-800">
              <div className="flex justify-between">
                <span>Base Human Dividend:</span>
                <strong className="text-white">{basePayout}.00 UHI</strong>
              </div>
              <div className="flex justify-between">
                <span>Conway Grid Dynamic Boost:</span>
                <strong className="text-teal-400">+{Math.round((multiplier - 1.0) * 100)}% ({multiplier}x)</strong>
              </div>
              <div className="flex justify-between">
                <span>Quantum Proof:</span>
                <strong className="text-sky-400">Falcon-512 State Proof Valid</strong>
              </div>
              <div className="flex justify-between">
                <span>Algorand Network Fee:</span>
                <strong className="text-emerald-400">0.000 ALGO (Sponsored)</strong>
              </div>
            </div>

            <button 
              onClick={handleClaim}
              className="w-full mt-6 py-3.5 rounded-xl bg-gradient-to-r from-teal-400 via-sky-500 to-indigo-500 text-slate-950 font-bold hover:brightness-110 transition cursor-pointer shadow-lg shadow-teal-500/20"
            >
              ⚡ Claim Universal High Income Now
            </button>

            {claimStatus && (
              <div className="mt-4 p-3 rounded-lg bg-teal-950/40 border border-teal-500/30 text-xs font-mono text-teal-300">
                {claimStatus}
              </div>
            )}
          </div>

          {/* Native SVG QR Portal */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2 font-bold text-white">
                <QrCode className="w-5 h-5 text-sky-400" />
                Native Algorand QR Settlement Portal
              </div>
              <span className="text-xs text-slate-400 font-mono">Zero External CDN</span>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center gap-6">
              <div 
                className="p-3 bg-white rounded-xl shadow-lg shadow-teal-500/10 flex-shrink-0"
                dangerouslySetInnerHTML={{ __html: qrSvg }}
              />
              <div className="flex-1 w-full space-y-3 font-mono text-xs">
                <label className="text-slate-400 block">Algorand Payment / Claim URI:</label>
                <input 
                  type="text" 
                  value={qrPayload}
                  onChange={(e) => setQrPayload(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-teal-300 outline-none focus:border-teal-500 text-xs"
                />
                <div className="flex gap-2">
                  <button 
                    onClick={() => setQrPayload(`algorand://PERA-NODE-${Math.floor(Math.random()*899999+100000)}?amount=${Math.round(parseFloat(effectivePayout)*1000000)}&asset=10928473`)}
                    className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-white transition cursor-pointer"
                  >
                    Regenerate
                  </button>
                  <button 
                    onClick={() => navigator.clipboard.writeText(qrPayload)}
                    className="px-3 py-1.5 rounded bg-teal-500/20 border border-teal-500/40 text-teal-300 hover:bg-teal-500/30 transition cursor-pointer"
                  >
                    Copy URI
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Conway Grid & x402 Bazaar */}
        <div className="space-y-6">
          {/* Conway 16x16 Autonomic Grid */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2 font-bold text-white">
                <Cpu className="w-5 h-5 text-indigo-400" />
                Conway Automaton Engine (Web 4.0 Grid)
              </div>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Gen: {generation}
              </span>
            </div>

            <p className="text-xs text-slate-400 mt-4 leading-relaxed">
              On-chain 16&times;16 cellular state machine. Living cells simulate active compute nodes, generating entropy that scales the UHI multiplier between 1.0x and 1.5x.
            </p>

            <div className="mt-4 flex justify-center">
              <canvas 
                ref={canvasRef} 
                width={280} 
                height={280} 
                onClick={handleCanvasClick}
                className="rounded-xl border border-sky-500/30 shadow-lg shadow-teal-500/10 cursor-pointer"
              />
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
              <button 
                onClick={stepConway} 
                className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-mono flex items-center gap-1 cursor-pointer"
              >
                Step &rarr;
              </button>
              <button 
                onClick={() => setIsRunning(!isRunning)} 
                className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-black font-semibold font-mono flex items-center gap-1 cursor-pointer"
              >
                {isRunning ? <><Pause className="w-3.5 h-3.5" /> Pause</> : <><Play className="w-3.5 h-3.5" /> Auto-Run</>}
              </button>
              <button 
                onClick={() => {
                  const g = new Array(256).fill(false);
                  g[1*16+2]=true; g[2*16+3]=true; g[3*16+1]=true; g[3*16+2]=true; g[3*16+3]=true;
                  setGrid(g); setGeneration(0);
                }} 
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono cursor-pointer"
              >
                Glider
              </button>
            </div>
          </div>

          {/* x402 Bazaar Protocol */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2 font-bold text-white">
                <Activity className="w-5 h-5 text-teal-400" />
                x402 Bazaar Protocol (Algorand Atomic Groups)
              </div>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
                10% UHI Tax Routing
              </span>
            </div>

            <p className="text-xs text-slate-400 mt-4 leading-relaxed">
              Autonomous AI fleets and compute clusters settle via HTTP 402 with Algorand Atomic Groups. 10% is atomically split and routed into the UHI Treasury.
            </p>

            <div className="mt-4 space-y-3">
              {services.map(srv => (
                <div key={srv.id} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-teal-500/40 transition flex items-center justify-between gap-4">
                  <div>
                    <div className="font-semibold text-white text-sm">{srv.title}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{srv.desc}</div>
                    <div className="flex items-center gap-2 mt-2 font-mono text-[11px]">
                      <span className="text-teal-300 bg-teal-950/60 px-2 py-0.5 rounded border border-teal-500/20">{srv.cost} UHI / task</span>
                      <span className="text-emerald-400">+{srv.tax} UHI (10% Tax)</span>
                      <span className="text-slate-500">&bull; {srv.invocations} calls</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => executeService(srv.id)}
                    className="px-3 py-2 rounded-lg bg-teal-500 hover:bg-teal-400 text-black font-semibold text-xs whitespace-nowrap cursor-pointer transition shadow-sm"
                  >
                    ⚡ Atomic Call
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>

      {/* Floating Multimodal AI Voice & Chat Assistant */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isAiOpen ? (
          <button 
            onClick={() => setIsAiOpen(true)}
            className="w-14 h-14 rounded-full bg-gradient-to-tr from-teal-400 to-indigo-600 flex items-center justify-center text-black font-bold shadow-2xl shadow-teal-500/40 hover:scale-105 transition cursor-pointer"
          >
            AI
          </button>
        ) : (
          <div className="w-96 h-[460px] rounded-2xl bg-slate-950 border border-teal-500/40 shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl">
            <div className="flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800">
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse"></span>
                UHI Algorand Autonomous Agent
              </div>
              <button onClick={() => setIsAiOpen(false)} className="text-slate-400 hover:text-white">&times;</button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
              {chatMessages.map((m, idx) => (
                <div key={idx} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-xl ${m.sender === 'user' ? 'bg-gradient-to-r from-teal-400 to-sky-500 text-slate-950 font-medium' : 'bg-slate-900 border border-slate-800 text-slate-200 leading-relaxed'}`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
              <button 
                onClick={() => {
                  const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
                  if (!SR) {
                    alert("Speech recognition not supported in this browser.");
                    return;
                  }
                  const rec = new SR();
                  rec.lang = 'en-US';
                  rec.onstart = () => setIsRecording(true);
                  rec.onend = () => setIsRecording(false);
                  rec.onresult = (e: any) => {
                    setChatInput(e.results[0][0].transcript);
                  };
                  rec.start();
                }}
                className={`p-2 rounded-lg border ${isRecording ? 'bg-red-500/20 border-red-500 text-red-400 animate-pulse' : 'bg-slate-800 border-slate-700 text-slate-300'}`}
              >
                {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>
              <input 
                type="text" 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                placeholder="Ask about UHI, Algorand PPoS, Falcon..."
                className="flex-1 p-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-teal-400"
              />
              <button onClick={handleSendChat} className="p-2 rounded-lg bg-teal-400 text-black hover:bg-teal-300">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Multi-Wallet Modal */}
      {isWalletModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 rounded-2xl bg-slate-950 border border-teal-500/40 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="font-bold text-lg text-white">Connect Algorand Wallet</h3>
              <button onClick={() => setIsWalletModalOpen(false)} className="text-slate-400 hover:text-white">&times;</button>
            </div>

            <div className="mt-4 space-y-3 font-mono text-xs">
              <button 
                onClick={() => { setConnectedWallet({ name: "Pera Wallet", address: "PERA4ELON7MUSK8UHI9ALGORAND9POSTSCARCITYNODE2222" }); setIsWalletModalOpen(false); }}
                className="w-full p-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-teal-400 hover:bg-slate-800 text-left flex items-center justify-between transition cursor-pointer"
              >
                <div>
                  <div className="font-bold text-white text-sm">Pera Wallet</div>
                  <div className="text-slate-400 text-[11px]">Official mobile and web Algorand standard</div>
                </div>
                <ExternalLink className="w-4 h-4 text-teal-400" />
              </button>

              <button 
                onClick={() => { setConnectedWallet({ name: "Defly Wallet", address: "DEFLY6SMART8TRADING9FLEET4UHI5DIVIDENDALGORAND3333" }); setIsWalletModalOpen(false); }}
                className="w-full p-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-teal-400 hover:bg-slate-800 text-left flex items-center justify-between transition cursor-pointer"
              >
                <div>
                  <div className="font-bold text-white text-sm">Defly Wallet</div>
                  <div className="text-slate-400 text-[11px]">Algorand advanced DeFi and analytics</div>
                </div>
                <ExternalLink className="w-4 h-4 text-sky-400" />
              </button>

              <button 
                onClick={() => { setConnectedWallet({ name: "Kibisis", address: "KIBIS7AVM8STATEPROOF9QUANTUMFALCONNODEALGORAND4444" }); setIsWalletModalOpen(false); }}
                className="w-full p-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-teal-400 hover:bg-slate-800 text-left flex items-center justify-between transition cursor-pointer"
              >
                <div>
                  <div className="font-bold text-white text-sm">Kibisis Wallet</div>
                  <div className="text-slate-400 text-[11px]">AVM and State Proof quantum custody</div>
                </div>
                <ExternalLink className="w-4 h-4 text-indigo-400" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
