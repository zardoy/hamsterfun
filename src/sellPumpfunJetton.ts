import { Address, beginCell, toNano } from '@ton/core';
import { NetworkProvider } from '@ton/blueprint';
import {
    PumpfunJettonFactory,
    storeTokenCallback,
    storeTokenSellCallback
} from '../build/PumpfunJettonFactory/tact_PumpfunJettonFactory';
import { jettonContentToCell } from '../tests/utils';
import { buildOnchainMetadata } from './jetton-helpers';
import { PumpfunJettonPool } from '../build/PumpfunJettonFactory/tact_PumpfunJettonPool';
import { PumpfunJettonWallet } from '../build/PumpfunJettonFactory/tact_PumpfunJettonWallet';

export async function run(provider: NetworkProvider) {

    const wallet = provider.open(
        PumpfunJettonWallet.fromAddress(Address.parse("kQB4kE-NTcSzFWHgTgI-yPaIdADiQh6GPtdcTZ1Dl-TvYQh3"))
    );

    await wallet.send(
        provider.sender(),
        {
            value: toNano('0.4')
        },
        {
            $$type: 'TokenTransfer',
            query_id: 456n,
            amount: toNano(15000n),
            sender: Address.parse("kQDNmKeRMs4YoK0FhXBqlXq2GYi9BxtSZ0aN3-76jdve-PbN"),
            forward_ton_amount: toNano('0.2'),
            response_destination: provider.sender().address!!,
            forward_payload: beginCell().store(storeTokenCallback({
                $$type: 'TokenCallback',
                callback_type: 1n,
                body: beginCell().store(storeTokenSellCallback({
                    $$type: 'TokenSellCallback',
                    amount: toNano(15000n),
                    seller: provider.sender().address!!
                })).endCell()
            })).endCell(),
            custom_payload: null

        }
    );
}
