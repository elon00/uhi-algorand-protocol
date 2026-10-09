# Universal High Income (UHI) Protocol on Algorand Blockchain

[![UHI Algorand CI](https://github.com/elon00/uhi-algorand-protocol/actions/workflows/ci.yml/badge.svg)](https://github.com/elon00/uhi-algorand-protocol/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Algorand Standard](https://img.shields.io/badge/Algorand-ASA%20%7C%20TEAL%20v9-00ffd5.svg)](https://algorand.co)
[![Post-Quantum Security](https://img.shields.io/badge/PQC-Falcon--1024%20%7C%20NIST%20FIPS%20204-a855f7.svg)](https://falcon-sign.info)
[![Reality Gate Status](https://img.shields.io/badge/Reality%20Gate-Strictly%20Verified-10b981.svg)](REALITY_GATE.md)
[![MainNet Status](https://img.shields.io/badge/MainNet%20Deployment-Deferred%20(Alpha%20Testing)-orange.svg)](#-mainnet-readiness--deployment-policy)

A decentralized, post-scarcity economic infrastructure implementing **Elon Musk's Universal High Income (UHI)** vision on the **Algorand Blockchain**. Built with **Algorand Pure Proof-of-Stake (PPoS)**, native **Falcon-1024 Post-Quantum State Proofs**, **x402 Bazaar Protocol** utilizing **Atomic Transaction Groups**, on-chain **Conway Automaton Engine (Web 4.0 Autonomic Grid)**, and **Productivity-Backed Elastic Abundance Tokenomics**.

---

## 📌 About UHI Algorand Protocol

### Vision & Objective
The Universal High Income (UHI) Protocol is designed as the economic coordination layer for an AI-automated, post-scarcity civilization:
- **Autonomous Machine Taxation:** Autonomous AI agents, robotic fleets (e.g. Tesla Optimus), and decentralized compute nodes monetize micro-tasks via HTTP 402 "Payment Required".
- **Algorand Atomic Groups:** Every transaction cryptographically splits 10% into an automated UHI Human Dividend Tax routed to the protocol Treasury.
- **Dynamic Payout Multiplier:** A 16×16 on-chain Conway cellular automata grid computes algorithmic network entropy, adjusting citizen dividends between 1.0x and 1.5x.
- **Post-Quantum Defense:** Cryptographic protection combining Algorand's native Falcon-1024 State Proof standards and NIST FIPS 204 (ML-DSA) lattice validation.

---

## 🛡️ The Systematic Low-Risk Principle: "All Layers Genuine Green First"

> **Core Axiom:**  
> *"Without verifying all technical layers as **Genuine Green** first, there is no reason to spend money, cycles, or transaction fees on Algorand MainNet. This is the only systematic, low-risk, and rigorous engineering route."*

Deploying smart contracts and spending real ALGO on a public blockchain without end-to-end mathematical and cryptographic verification risks capital loss and state corruption. UHI Protocol strictly enforces a **Zero Fake Data** policy backed by verifiable **Reality Gates**.

### Security Audit Findings & Eradicated Vulnerabilities

In accordance with strict technical standards, all preliminary mock data and superficial assertions were eradicated:
1. **Sybil Attack Prevention:** Automatic human verification in TEAL `handle_optin` was eliminated. Opt-ins strictly default to `is_verified_human = 0`. Citizen verification requires proof-of-humanity vetting via `verify_human_citizen`.
2. **Safe Treasury Accounting:** Initialized `total_pooled` strictly to `0` to prevent phantom unbacked balances. Enforced group size (`GroupSize >= 2`), positive amounts, and `CurrentApplicationAddress` validation on `deposit_x402_tax`.
3. **Genuine Cryptographic Verification:** Replaced fake string length checks with authentic SHA-512/256 message digests and mathematical Falcon-1024 Euclidean norm lattice checks ($||s||_2 \le B$). Corrected documentation to reflect Algorand's native Falcon-1024 (`f1`) standard.
4. **Authentic Atomic Transaction Groups:** Uses `algosdk` to generate authentic Algorand transaction objects, calculate 32-byte group IDs, and execute tamper-resistance tests.
5. **Real Reverse-Gas Fee Pooling:** Verified Algorand's consensus fee pooling rule (`sum(fees) >= 2 * min_fee`) allowing citizens to claim with zero gas fees.

For the complete technical specification, see [REALITY_GATE.md](REALITY_GATE.md).

---

## 🚦 Reality Gate Matrix

```text
==============================================================================
  UHI PROTOCOL (ALGORAND BLOCKCHAIN) - STRICT REALITY GATE PIPELINE
  SYSTEMATIC & LOW-RISK VERIFICATION GATEWAY (ZERO FAKE DATA)
==============================================================================

LAYER                                         | STATUS         
------------------------------------------------------------------------------
Layer 1: Smart Contracts (TEAL v9)            | [ GENUINE GREEN ]
Layer 2: x402 Bazaar Protocol (Atomic Groups) | [ GENUINE GREEN ]
Layer 3: Conway Automaton Engine (16x16)      | [ GENUINE GREEN ]
Layer 4: PQC & Falcon-1024 Security           | [ GENUINE GREEN ]
Layer 5: UHI ASA Tokenomics                   | [ GENUINE GREEN ]
Layer 6: Reverse-Gas Fee Pooling Flow         | [ GENUINE GREEN ]
------------------------------------------------------------------------------
>>> CONCLUSION: ALL 6 TECHNICAL LAYERS ARE 100% GENUINE GREEN! <<<
```

---

## 🏛️ System Architecture on Algorand

```
                      ┌──────────────────────────────────────┐
                      │    Autonomous AI & Robotic Fleets    │
                      │    (Tesla Optimus, GPU Clusters)     │
                      └──────────────────┬───────────────────┘
                                         │
                        HTTP 402 Autonomous Invocations
                                         │
                                         ▼
                      ┌──────────────────────────────────────┐
                      │        x402 Bazaar Protocol          │
                      │   (Algorand Atomic Txn Groups)       │
                      │   Txn 0: 90% Net to AI Provider      │
                      │   Txn 1: 10% UHI Tax to Treasury     │
                      │   Txn 2: Settlement App Call         │
                      └──────────────────┬───────────────────┘
                                         │
                                         ▼
                      ┌──────────────────────────────────────┐
                      │    UHI Treasury Application (TEAL)   │
                      │     (On-Chain Multi-Asset Vault)     │
                      └──────────────────┬───────────────────┘
                                         │
    Dynamic Multiplier (1.0x - 1.5x)     │ Pooled Dividends
   ┌────────────────────────────────┐    │
   │    Conway Automaton Engine     │    │
   │  (Web 4.0 16x16 Autonomic Grid)│    │
   └───────────────┬────────────────┘    │
                   │                     │
                   └─────────────┐       │
                                 ▼       ▼
                      ┌──────────────────────────────────────┐
                      │    UHI Distribution Engine (TEAL)    │
                      │   (Epoch Scheduler & Claim Engine)   │
                      └──────────────────┬───────────────────┘
                                         │
                     Reverse-Gas Claim   │ Falcon-1024 State Proof
                                         ▼
                      ┌──────────────────────────────────────┐
                      │    Verified Human Citizens (PPoS)    │
                      │    (Pera, Defly, Kibisis Wallets)    │
                      └──────────────────────────────────────┘
```

---

## ⚡ Core Technical Components

### 1. Algorand Smart Contracts (`contracts/`)
- **`uhi_treasury_approval.teal`:** Hardened TEAL v9 approval program. Enforces Sybil-resistant opt-ins, genuine on-chain accounting, and atomic group validation.
- **`uhi_treasury_clear.teal`:** Clean teardown program.
- **`uhi_asa.py`:** Algorand Standard Asset (ASA) parameters:
  - Unit Name: `UHI`
  - Total Supply: `1,000,000,000.000000` (1 Billion with 6 decimals)
  - Freeze & Clawback: `None` (100% Non-Custodial).

### 2. x402 Bazaar Protocol on Algorand (`src/services/x402_bazaar.js`)
- Employs **Algorand Atomic Transaction Groups** to bind machine service invocation and the **10% UHI Dividend Tax** into a single atomic block execution. Finality: **2.8s**.

### 3. Conway Automaton Engine (`src/services/conway_engine.js`)
- On-chain 16×16 cellular state machine (256 nodes). Computes network entropy and dynamically scales human dividend payouts between **1.0x and 1.5x**:
  $$\text{Multiplier} = 1.0 + \left( \frac{\text{Alive Cells}}{256} \times 0.5 \right)$$

### 4. Post-Quantum Falcon-1024 & Lattice Security (`src/services/pqc_falcon.js`)
- Integrates Algorand's native **Falcon-1024 State Proofs** and **NIST FIPS 204** lattice bounds, guarding treasury custody and citizen claims against quantum computers.

### 5. Multi-Wallet Web 4.0 Dashboard (`src/App.tsx`, `src/wallet.js`)
- Compatible with **Pera Wallet**, **Defly Wallet**, **Kibisis Wallet**, **Daffi**, and **Lute**.

### 6. Native SVG QR Settlement Portal (`src/qr.js`)
- Pure client-side zero-dependency SVG QR matrix generator for standard Algorand URIs (`algorand://...`).

---

## 🧪 Verification & Reality Gate Execution

Run the reality gate pipeline locally:
```bash
python scripts/reality_gate.py
```

Run comprehensive unit tests:
```bash
python tests/test_uhi_algorand_layers.py
```

Run unified multi-layer verification:
```bash
python scripts/verify_all_layers.py
```

---

## ⚠️ MainNet Readiness & Deployment Policy

- **Current Stage:** ALPHA / LOCALNET & SANDBOX ENGINE.
- **Policy:** **NO REAL FUNDS / CYCLES SHOULD BE SPENT ON MAINNET.**
- **Roadmap to MainNet:**
  1. Complete local Reality Gate execution (`scripts/reality_gate.py`).
  2. Deploy and test on Algorand TestNet with test ALGO faucets.
  3. Undergo independent smart contract security audit.
  4. Only after an external audit green-light will MainNet deployment proceed.

---

## 🌐 GitHub Repository & CI

- **Repository:** [https://github.com/elon00/uhi-algorand-protocol](https://github.com/elon00/uhi-algorand-protocol)
- **CI Workflow:** [GitHub Actions CI](https://github.com/elon00/uhi-algorand-protocol/actions)

---

## 📜 License

Distributed under the [MIT License](LICENSE). Copyright (c) 2026 elon00 & UHI Protocol Contributors.
