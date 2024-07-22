import { motion } from 'framer-motion'
import { ChevronLeft, Globe, MessageSquare, Twitter } from 'lucide-react'
import { twMerge } from 'tailwind-merge'
import FuturisticGridBackground from '../Background'
import TradingHistoryChart from '../TokenChart'
import { GlobalStyles } from './GlobalStyles'

const Button = ({ children, variant = 'primary', className = '', ...props }) => (
    <button
        className={`w-full enabled:hover:brightness-[1.15] enabled:active:brightness-[1.3] transition-all disabled:opacity-30 disabled:cursor-not-allowed truncate min-h-[50px] rounded-[10px] font-semibold text-[17px] leading-[20px] ${
            variant === 'primary' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-white'
        } ${className}`}
        type="button"
        {...props}
    >
        {children}
    </button>
)

const Input = ({ ...props }) => (
    <input
        className="h-[60px] w-full pl-4 pr-[96px] border-2 border-gray-700 rounded-[12px] text-[28px] leading-[40px] font-semibold placeholder:text-gray-500 bg-gray-800 text-white"
        {...props}
    />
)

const TokenInfo = ({ label, value }) => (
    <div className="flex justify-between items-center py-2">
        <span className="text-gray-400">{label}</span>
        <span className="text-white font-semibold">{value}</span>
    </div>
)

const Transaction = ({ type, amount, user, time }) => (
    <div className="flex items-center justify-between py-2">
        <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-700 rounded-full mr-2" />
            <div>
                <p className="text-white">{user}</p>
                <p className={`text-sm ${type === 'Buy' ? 'text-green-500' : 'text-red-500'}`}>
                    {type} {time} ago
                </p>
            </div>
        </div>
        <p className="text-white font-semibold">{amount} TON</p>
    </div>
)

const CommunityNote = ({ user, content, time, likes, dislikes }) => (
    <div className="bg-gray-800 rounded-lg p-4 mb-4">
        <div className="flex items-center mb-2">
            <div className="w-8 h-8 bg-gray-700 rounded-full mr-2" />
            <span className="text-white font-semibold">{user}</span>
            <span className="text-gray-400 text-sm ml-2">{time} ago</span>
        </div>
        <p className="text-white mb-2">{content}</p>
        <div className="flex items-center text-gray-400">
            <span className="mr-2">👍 {likes}</span>
            <span>👎 {dislikes}</span>
        </div>
    </div>
)

const ChartContainer = () => {
    return (
        <motion.div
            className={twMerge(`bg-gray-800 p-4 rounded-lg mb-4 bg-opacity-60 backdrop-blur w-full h-[400px]`)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            // be the last
            transition={{ duration: 0.5, delay: 0.4 }}
            // on transition end
        >
            <TradingHistoryChart />
        </motion.div>
    )
}

const TokenPageInner = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-white min-h-screen p-4 pt-0 md:p-8 bg-gradient-to-b from-transparent to-10% to-gray-900 bg-opacity-70"
        >
            <header className="flex items-center mb-6">
                <ChevronLeft className="mr-4" />
                <h1 className="text-2xl font-bold">Dark Pepe • DPEPE</h1>
                <div className="ml-auto flex space-x-2">
                    <Globe size={24} />
                    <MessageSquare size={24} />
                    <Twitter size={24} />
                </div>
            </header>

            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <div className="bg-gray-800 p-4 rounded-lg mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <h2 className="text-xl font-semibold">MARKET CAP</h2>
                                <p className="text-2xl font-bold">$17,903.75</p>
                            </div>
                            <div className="bg-blue-500 text-white px-2 py-1 rounded">PROGRESS 64%</div>
                        </div>
                        <div className="bg-gray-700 rounded mb-4">
                            {/* Placeholder for chart */}
                            <ChartContainer />
                        </div>
                        <p className="text-right text-gray-400">Price to be listed on DeDust: 0.00003295</p>
                    </div>

                    <div className="bg-gray-800 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold mb-2">LATEST TRANSACTIONS</h3>
                        <Transaction type="Sell" amount="33.50" user="93ak-9" time="2m" />
                        <Transaction type="Sell" amount="1.46" user="@CobraRoost" time="2m" />
                        <Transaction type="Buy" amount="3.00" user="@bravazsol" time="2m" />
                    </div>
                </div>

                <div>
                    <div className="flex mb-4">
                        <Button className="flex-1 mr-2">Buy</Button>
                        <Button variant="secondary" className="flex-1 ml-2">
                            Sell
                        </Button>
                    </div>
                    <div className="mb-4">
                        <Input placeholder="0 TON" />
                    </div>
                    <div className="grid grid-cols-4 gap-2 mb-4">
                        <Button variant="secondary">3 TON</Button>
                        <Button variant="secondary">10 TON</Button>
                        <Button variant="secondary">50 TON</Button>
                        <Button variant="secondary">100 TON</Button>
                    </div>
                    <Button className="mb-6">Connect wallet</Button>
                    <div className="bg-gray-800 p-4 rounded-lg mb-6">
                        <TokenInfo label="Price" value="$0.00001904" />
                        <TokenInfo label="Max Supply" value="1,000,000,000" />
                        <TokenInfo label="Available to buy" value="101,847,281" />
                        <TokenInfo label="Liquidity collected" value="643.36/1000 TON" />
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold mb-2">Community notes</h3>
                        <CommunityNote user="@dufyak" content="good dev, 2 tokens on dedust" time="4h" likes={65} dislikes={5} />
                        <Button variant="secondary">View all</Button>
                    </div>
                </div>
            </div>
            {/* <FuturisticGridBackground /> */}
        </motion.div>
    )
}

const pageCss = /* css */ `
body {
    background: transparent;
}
`

const TokenPageNew = () => {
    return (
        <div>
            <GlobalStyles css={pageCss} />
            <TokenPageInner />
        </div>
    )
}

export default TokenPageNew
