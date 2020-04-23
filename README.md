# Tokesim-Chain 


<!-- about the project -->
## About The Project

[Tokesim](https://tokesim.org) is an Agent Based Modeling tool that makes it easy to test token economic models. Tokesim-chain is it's blockchain running cousin. Tokesim-chain is a service that uses [Open-RPC](https://open-rpc.org) to describe a JSON-RPC api that starts Tokesim simulation. The purpose is for tokesim-chain to 
be a harness for controlling various blockchain nodes.

Tokesim-Chain Features
- Open-RPC interface 
- A description for running simulations against chains
- Out of the box integraion with ganache as a backing chain for Ethereum Smart Conract integrations

<!-- getting started with the project -->
## Getting Started
### Prerequisites
- node `v10.15.3` or later
- npm `v6.4.1` or later
- python `3.7` or later but not 3.8 ;) 

### Installation
Clone/ download the project, and install dependencies. For development
```bash
git clone https://github.com/tokesim/tokesim-chain.git && cd tokesim-chain
npm install
npm run build
npm run start
# in a new terminal window
tokesim-chain --port 5554
```
or 
```bash
npm install -g @tokesim/tokesim-chain
# in a new terminal window
tokesim-chain --port 3004
```

### Contributing

How to contribute, build and release are outlined in [CONTRIBUTING.md](CONTRIBUTING.md), [BUILDING.md](BUILDING.md) and [RELEASING.md](RELEASING.md) respectively. Commits in this repository follow the [CONVENTIONAL_COMMITS.md](CONVENTIONAL_COMMITS.md) specification.
