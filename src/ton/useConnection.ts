import { useTonConnectUI } from '@tonconnect/ui-react'
import { Sender, SenderArguments } from '@ton/core'

export function useConnection(): { sender: Sender; connected: boolean } {
    const [TonConnectUI] = useTonConnectUI()

    return {
        sender: {
            async send(args: SenderArguments) {
                await TonConnectUI.sendTransaction({
                    messages: [
                        {
                            address: args.to.toString(),
                            amount: args.value.toString(),
                            payload: args.body?.toBoc().toString('base64'),
                        },
                    ],
                    validUntil: Date.now() + 6 * 60 * 1000,
                })
            },
        },
        connected: TonConnectUI.connected,
    }
}
