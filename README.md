# Multichain Wallet Checker

A lightweight multichain portfolio checker for EVM wallets.

Analyze up to 30 wallet addresses and view their combined token portfolio across multiple networks.

## Features

- Scan up to 30 EVM wallet addresses
- Aggregate balances across all wallets
- Native token balances
- ERC-20 token balances
- USD portfolio valuation
- Token + network aggregation
- Wallet-level token breakdown
- Network portfolio breakdown
- Hide positions worth less than $2
- Copy wallet addresses from the token drawer
- Dark / light theme
- Read-only — no wallet connection required

## Supported Networks

Current portfolio integration includes multiple EVM networks such as:

- Ethereum
- Base
- Arbitrum
- Optimism
- Polygon
- BNB Chain
- Celo
- Ink
- Scroll
- Berachain
- Unichain
- Sonic
- Sei
- Cronos
- opBNB

Network support can be expanded over time.

## How It Works

The frontend sends public wallet addresses to a serverless API route.

```text
Browser
   ↓
Vercel API Proxy
   ↓
Alchemy Portfolio API
   ↓
Token balances + metadata + USD prices
   ↓
Portfolio aggregation
