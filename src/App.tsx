import { SendTransactionRequest, TonConnectButton, TonConnectUIProvider, useTonAddress, useTonConnectUI, useTonWallet } from '@tonconnect/ui-react'
import { useEffect } from 'react'

export default function App() {
    return (
        <TonConnectUIProvider manifestUrl={`${location.origin}/tonconnect-manifest.json`}>
            <View />
        </TonConnectUIProvider>
    )
}

function View() {
    const userFriendlyAddress = useTonAddress()
    const rawAddress = useTonAddress(false)
    const wallet = useTonWallet()
    const [tonConnectUI, setOptions] = useTonConnectUI()
    // useIsConnectionRestored()

    const myTransaction: SendTransactionRequest = {
        validUntil: Math.floor(Date.now() / 1000) + 60, // 60 sec
        messages: [
            {
                address: 'EQBBJBB3HagsujBqVfqeDUPJ0kXjgTPLWPFFffuNXNiJL0aA',
                amount: '20000000',
                // stateInit: "base64bocblahblahblah==" // just for instance. Replace with your transaction initState or remove
            },
            {
                address: 'EQDmnxDMhId6v1Ofg_h5KR5coWlFG6e86Ro3pc7Tq4CA0-Jn',
                amount: '60000000',
                // payload: "base64bocblahblahblah==" // just for instance. Replace with your transaction payload or remove
            },
        ],
    }

    return (
        <div>
            <button onClick={async () => tonConnectUI.sendTransaction(myTransaction)}>Send transaction</button>
            <Header />
            <span>User-friendly address: {userFriendlyAddress}</span>
            <span>Raw address: {rawAddress}</span>
        </div>
    )
}

function Header() {
    return (
        <header>
            <span>My App with React UI</span>
            <TonConnectButton />
        </header>
    )
}
