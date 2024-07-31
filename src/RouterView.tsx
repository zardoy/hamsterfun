import { useTonConnectUI, TonConnect } from '@tonconnect/ui-react'
import { motion } from 'framer-motion'
import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { useBuyContract, useCreateContract, useSellContract } from './ton/useContractWrappers'
import { Portal } from './pages/TokenPage'
import Loader, { showLoader } from './pages/Loader'

export default () => {
    const [tonConnectUI, setOptions] = useTonConnectUI()
    // todo remove
    const buyContract = useBuyContract()
    const sellContract = useSellContract()
    const createContract = useCreateContract()

    useEffect(() => {
        globalThis.buy = buyContract?.buy
        globalThis.sell = sellContract?.sell
        globalThis.create = createContract?.createToken

        globalThis.showLoader = showLoader
    }, [buyContract, sellContract, createContract])

    return (
        <div>
            <EventTicker />
            <Outlet />
            <Portal>
                <Loader />
            </Portal>
        </div>
    )
}

const tonConnect = new TonConnect()

// Event Ticker component
const EventTicker = () => {
    const events = [
        { type: 'BUY', amount: '0.00099', token: '$RIDER', color: 'bg-green-600' },
        { type: 'SELL', amount: '0.01448', token: '$TrumpMogShot', color: 'bg-red-600' },
        // ... add more events
    ]

    return (
        <motion.div
            className="flex overflow-x-auto space-x-4 mb-4 p-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {events.map((event, index) => (
                <div key={index} className={`flex-shrink-0 p-2 rounded-lg ${event.color}`}>
                    <p className="text-sm font-bold">{event.amount} ETH</p>
                    <p className="text-xs mt-[1px]">{event.token}</p>
                    <p className="text-xs mt-[2px]">{event.type} EVENT</p>
                </div>
            ))}
        </motion.div>
    )
}
