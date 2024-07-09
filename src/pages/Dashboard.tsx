import React from 'react'
import { Link } from 'react-router-dom'
import WalletButtons from '../WalletButtons'
// import { twMerge } from 'tailwind-merge'

function Dashboard() {
    return (
        <div className="bg-gray-900 text-white min-h-screen p-4">
            {/* Top ticker */}
            <Events />

            {/* Header */}
            <header className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-full" />
                    <span>Ton.fun</span>
                </div>
                {/* <Button className="bg-blue-500 text-white px-4 py-2 rounded">Connect Wallet</Button> */}
                <WalletButtons />
            </header>

            {/* Main content */}
            <MainDashboard />
        </div>
    )
}

function MainDashboard() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Create a Token */}
            <div className="bg-gray-800 p-4 rounded">
                <h2 className="text-xl font-bold mb-4">CREATE A TOKEN</h2>
                <p className="text-sm mb-4">Deploy with thousands in liquidity for just 0.00169 TON</p>
                <input className="w-full bg-gray-700 p-2 rounded mb-2" placeholder="Token Name" />
                <input className="w-full bg-gray-700 p-2 rounded mb-2" placeholder="$ Token Symbol" />
                <Button className="w-full bg-gray-700 p-2 rounded mb-2 text-left">Choose File</Button>
                <Button className="w-full bg-blue-500 p-2 rounded">CREATE TOKEN</Button>
            </div>

            {/* Base Race */}
            <RaceToken />

            {/* Most Based Token */}
            <MostToken />
        </div>
    )
}

function RaceToken() {
    return (
        <div className="bg-gray-800 p-4 rounded">
            <h2 className="text-xl font-bold mb-4">TON RACE 🚀</h2>
            <p className="text-sm mb-4">The top 3 tokens are in a race to launch!</p>
            <div className="bg-gray-700 p-4 rounded mb-4">
                <div className="flex justify-between items-center">
                    <span>$CHASE</span>
                    <span>$11,820</span>
                </div>
                <div className="w-full bg-gray-600 h-2 rounded mt-2">
                    <div className="bg-green-500 h-2 rounded" style={{ width: '58%' }} />
                </div>
            </div>
            <p className="text-center">Race Ends In: 0:30:08</p>
        </div>
    )
}

function MostToken() {
    return (
        <div className="bg-gray-800 p-4 rounded">
            <h2 className="text-xl font-bold mb-4">MOST TONED TOKEN</h2>
            <p className="text-sm mb-4">The current Most Toned Token. Achieved at 5/28/2024, 7:12:46 PM</p>
            <Link className="flex items-center space-x-4" to="/token/1">
                <div className="w-16 h-16 bg-blue-500 rounded-full" />
                <div>
                    <p className="font-bold">Based Apu Apustaja</p>
                    <p>$BAPU</p>
                    <p>$2,756</p>
                </div>
            </Link>
        </div>
    )
}

function Button({ ...props }: React.ComponentProps<'button'>) {
    return <button className="bg-blue-500 text-white px-4 py-2 rounded" type="button" {...props} />
}

function Events() {
    return (
        <div className="flex overflow-x-auto mb-4 space-x-2">
            {['BUY EVENT', 'SELL EVENT'].map((event, index) => (
                <div key={index} className={`flex-shrink-0 p-2 rounded ${event === 'BUY EVENT' ? 'bg-green-600' : 'bg-red-600'}`}>
                    <p className="text-sm">{event}</p>
                    <p className="text-xs">0.00099 ETH</p>
                    <p className="text-xs">$RIDER</p>
                </div>
            ))}
        </div>
    )
}

export default Dashboard
