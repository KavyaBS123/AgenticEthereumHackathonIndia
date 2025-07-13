# Agentic Ethereum Hackathon India

# 🛠 Agentic CrowdFunding Platform -CodeBlues

Welcome to our submission for the Agentic Ethereum Hackathon by Reskilll & Geodework! This repository includes our project code, documentation, and related assets.

---

## 📌 Problem Statement

We addressed the challenge: **"Decentralized Crowdfunding with Donor Experience Management"**  
Traditional crowdfunding platforms lack transparency, have high fees, and don't provide meaningful engagement for donors. Donors often feel disconnected from the projects they support, leading to reduced participation and trust issues in the crowdfunding ecosystem.

---

## 💡 Our Solution

**Project Name: Agentic CrowdFunding Platform **  
A decentralized crowdfunding platform that leverages blockchain technology to create transparent, engaging, and rewarding donation experiences. We built a full-stack application that combines smart contracts for transparent fund management with a modern web interface that gamifies the donation process through an XP (Experience Points) system.

**Key Features:**
- 🎯 **Transparent Fund Management** - All transactions recorded on Ethereum blockchain
- 🏆 **Donor XP System** - Gamified experience points for donor engagement
- 📊 **Real-time Leaderboards** - Competitive element to encourage participation
- 🔄 **Web3 Integration** - Seamless blockchain interactions
- 📱 **Progressive Web App** - Mobile-first, installable experience
- 🤖 **AI-Powered Insights** - Intelligent project recommendations

---

## 🧱 Tech Stack

- 🖥 **Frontend**: React 18, TypeScript, Tailwind CSS, Radix UI
- ⚙ **Backend**: Express.js, Node.js, TypeScript
- 🧠 **AI**: OpenAI API (for intelligent features)
- 🔗 **Blockchain**: Ethereum, Solidity, Ethers.js, Viem
- 🔍 **DB/Storage**: PostgreSQL (Neon serverless), Drizzle ORM
- 🚀 **Hosting**: Vite, esbuild, Service Workers (PWA)
- 🎨 **UI/UX**: Framer Motion, Lucide React, Wouter
- 🔐 **Authentication**: Passport.js, Express Sessions
- 📡 **Real-time**: WebSocket, Socket.io
- 🕷️ **Data Collection**: Cheerio (web scraping)

---

## 📽 Demo

- 🎥 **Video Link**: [YouTube/Drive Link - To be added]  

- 📱 **PWA Demo**: Installable web app with offline capabilities

---

## 📂 Repository Structure

```bash
.
├── client/             # React frontend application
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Page components
│   │   ├── hooks/      # Custom React hooks
│   │   ├── context/    # React context providers
│   │   └── lib/        # Utility libraries
│   └── public/         # Static assets
├── server/             # Express.js backend
│   ├── api/            # API endpoints
│   ├── services/       # Business logic services
│   ├── lib/            # Database and utilities
│   └── scripts/        # Utility scripts
├── contracts/          # Solidity smart contracts
│   └── DonorXP.sol     # Donor experience contract
├── shared/             # Shared types and schemas
│   ├── types.ts        # TypeScript interfaces
│   └── schema.ts       # Data schemas
├── assets/             # Project assets and media
├── docs/               # Architecture diagrams, notes
├── README.md           # This file
├── package.json        # Dependencies and scripts
├── vite.config.ts      # Vite configuration
├── tailwind.config.ts  # Tailwind CSS configuration
└── drizzle.config.ts   # Database ORM configuration
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Ethereum wallet (MetaMask)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd s-editcrowd
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5001

---

## 🔧 Smart Contract Features

### DonorXP.sol
- **XP Minting**: Automatic experience points for donations
- **Level System**: Progressive donor levels based on XP
- **Rewards**: Unlockable rewards and badges
- **Transparency**: All transactions publicly verifiable

---

## 🎯 Key Innovations

1. **Gamified Donation Experience**
   - XP system encourages repeat donations
   - Leaderboards create competitive engagement
   - Achievement badges for milestone donations

2. **Blockchain Transparency**
   - All funds tracked on Ethereum
   - Smart contracts ensure fund allocation
   - Immutable donation history

3. **Modern Web3 UX**
   - Seamless wallet integration
   - Gasless transactions where possible
   - Mobile-first responsive design

4. **AI-Enhanced Features**
   - Intelligent project recommendations
   - Automated content analysis
   - Personalized donor experience

---

## 🏆 Impact & Benefits

- **For Donors**: Transparent, engaging, and rewarding donation experience
- **For Projects**: Lower fees, broader reach, and increased trust
- **For Ecosystem**: Decentralized, transparent, and community-driven funding

---

## 🔮 Future Roadmap

- [ ] Multi-chain support (Polygon, BSC)
- [ ] Advanced AI recommendations
- [ ] Mobile app development
- [ ] Social media integration
- [ ] Advanced analytics dashboard
- [ ] DAO governance for platform decisions

---

## 👥 Team

- **Frontend Developer**: [ J Suhas]
- **Backend Developer**: [Kavya] 
- **Smart Contract Developer**: [Kavya]
- **UI/UX Designer**: [ J Suhas]

---

## 📄 License

This project is licensed under the MIT License.

---

## 🤝 Contributing

We welcome contributions! Please read our contributing guidelines and submit pull requests.

---

**Built with ❤️ for the Agentic Ethereum Hackathon by Reskilll & Geodework**
