import React from 'react'
import { motion } from 'framer-motion'
import { Send, Twitter, Globe } from 'lucide-react'
import WalletButtons from '../WalletButtons'
import TradingHistoryChart from '../TokenChart'
import FuturisticGridBackground from '../Background'

// Reusable Button component
const Button = ({ children, variant = 'primary', className = '', ...props }) => {
    const baseClasses = 'px-4 py-2 rounded font-semibold'
    const variantClasses = {
        primary: 'bg-blue-500 text-white',
        secondary: 'bg-gray-600 text-white',
    }

    return (
        <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
            {children}
        </button>
    )
}

// Event Ticker component
const EventTicker = () => {
    const events = [
        { type: 'BUY', amount: '0.00099', token: '$RIDER', color: 'bg-green-600' },
        { type: 'SELL', amount: '0.01448', token: '$TrumpMogShot', color: 'bg-red-600' },
        // ... add more events
    ]

    return (
        <motion.div
            className="flex overflow-x-auto space-x-2 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {events.map((event, index) => (
                <div key={index} className={`flex-shrink-0 p-2 rounded ${event.color}`}>
                    <p className="text-sm">{event.type} EVENT</p>
                    <p className="text-xs">{event.amount} ETH</p>
                    <p className="text-xs">{event.token}</p>
                </div>
            ))}
        </motion.div>
    )
}

// Header component
const Header = () => (
    <motion.header
        className="flex justify-between items-center mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
    >
        <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">
                Back to home
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
                [TELEGRAM]
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
                [X/TWITTER]
            </a>
        </div>
        {/* <div className="flex space-x-2">
            <Button variant="secondary">Select Network</Button>
            <Button>Connect Wallet</Button>
        </div> */}
        <WalletButtons />
    </motion.header>
)

// Token Info component
const TokenInfo = () => (
    <motion.div
        className="bg-gray-800 p-4 rounded-lg mb-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
    >
        <div className="flex items-center space-x-4 mb-4">
            <img src="/api/placeholder/100/100" alt="Token" className="w-16 h-16 rounded-full" />
            <div>
                <h2 className="text-xl font-bold">THIS IS A CHASE</h2>
                <p className="text-blue-400">$CHASE</p>
                <p className="text-lg">$11,820</p>
            </div>
        </div>
        <div className="flex space-x-2 mb-4">
            <Button variant="secondary">
                <Send size={16} />
            </Button>
            <Button variant="secondary">
                <Twitter size={16} />
            </Button>
            <Button variant="secondary">
                <Globe size={16} />
            </Button>
        </div>
        <p className="text-sm text-gray-400">Total Supply: 1000000000000</p>
    </motion.div>
)

// Progress Bars component
const ProgressBars = () => (
    <motion.div
        className="bg-gray-800 p-4 rounded-lg mb-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
    >
        <h3 className="font-semibold mb-2">Launch Progress</h3>
        <p className="text-sm text-gray-400 mb-2">At 100% all liquidity will deploy on Uniswap</p>
        <div className="w-full bg-gray-600 rounded-full h-2.5 mb-4">
            <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '58%' }} />
        </div>
        <h3 className="font-semibold mb-2">Most Toned Progress</h3>
        <p className="text-sm text-gray-400 mb-2">This token became Most Toned on 5/1/2024, 8:09:47 AM.</p>
        <div className="w-full bg-gray-600 rounded-full h-2.5 mb-4">
            <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '100%' }} />
        </div>
        <Button className="w-full">Switch to trade</Button>
    </motion.div>
)

// Token Holders component
const TokenHolders = () => (
    <motion.div
        className="bg-gray-800 p-4 rounded-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
    >
        <h3 className="font-semibold mb-4">TOP 20 TOKEN HOLDERS</h3>
        <div className="space-y-2">
            {[
                { address: '(Remaining)', percentage: '41.57%' },
                { address: '0x9d461...(Dev)', percentage: '9.91%' },
                // ... add more holders
            ].map((holder, index) => (
                <div key={index} className="flex justify-between">
                    <span className="text-gray-400">{holder.address}</span>
                    <span>{holder.percentage}</span>
                </div>
            ))}
        </div>
    </motion.div>
)

// Main Dashboard component
const TokenPage = () => {
    return (
        <div className="text-white min-h-screen p-4">
            <EventTicker />
            <Header />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                    <TokenInfo />
                    {/* Placeholder for the chart */}
                    <div className="bg-gray-800 p-4 rounded-lg">
                        <TradingHistoryChart />
                    </div>
                </div>
                <div>
                    <ProgressBars />
                    <TokenHolders />
                </div>
            </div>
            <FuturisticGridBackground />
        </div>
    )
}

export default TokenPage
