import { useEffect, useState } from 'react'
import { Address, OpenedContract, Sender, beginCell, toNano } from '@ton/core'
import { useTonConnectUI, useTonAddress } from '@tonconnect/ui-react'
import { PumpfunJettonFactory, storeTokenCallback, storeTokenSellCallback } from '../tact_PumpfunJettonFactory'
import { PumpfunJettonPool } from '../tact_PumpfunJettonPool'
import { PumpfunJettonWallet } from '../tact_PumpfunJettonWallet'
import { useInit } from './useInit'
// import { MainContract } from '../contracts/ContractWrapper';
import { useTonClient } from './useTonClient'
import { useConnection } from './useConnection'
import { buildOnchainMetadata } from './utils'

export function useCreateContract() {
    const client = useTonClient()
    const connection = useConnection()

    const mainContract = useInit<OpenedContract<PumpfunJettonFactory> | void>(async () => {
        if (!client) return
        const contractWrapper = PumpfunJettonFactory.fromAddress(Address.parse('kQBQnIG6X5-zX7UsbitsrafGN00ao8BIynfT7AcWxY-fE1Ph'))
        return client.open(contractWrapper) as OpenedContract<PumpfunJettonFactory>
    }, [client])

    return mainContract
        ? {
              async createToken({
                  name,
                  description,
                  image,
                  symbol,
                  initialBuy,
              }: {
                  name: string
                  description: string
                  image: string
                  symbol: string
                  initialBuy: number
              }) {
                  const content = buildOnchainMetadata({
                      name,
                      description,
                      image,
                      symbol,
                  })
                  const initialBuyNano = toNano(initialBuy)
                  const initialBuyPlusFees = toNano(initialBuy + 1.5)
                  await mainContract.send(
                      connection.sender,
                      {
                          value: initialBuyPlusFees,
                          bounce: true,
                      },
                      {
                          $$type: 'CreateToken',
                          jetton_content: content,
                          query_id: 123n,
                          fee_account: Address.parse('kQCP8NoFzQqBMW8egYZdmaY5kmlI8tpKao2GzQSJhey8M34U'),
                          initial_buy: initialBuyNano,
                      },
                  )
              },
          }
        : null
}

export function useBuyContract() {
    const tonAddress = useTonAddress()
    const client = useTonClient()
    const connection = useConnection()

    const pool = 'kQD8bfY8cX0l3B9j6ghIVQPjteT1138M2iF18SwRLk5vk0_I'
    const jettonPoolContract = useInit<OpenedContract<PumpfunJettonPool> | void>(async () => {
        if (!client) return
        const contractWrapper = PumpfunJettonPool.fromAddress(Address.parse(pool))
        return client.open(contractWrapper) as OpenedContract<PumpfunJettonPool>
    }, [client])

    return jettonPoolContract
        ? {
              async buy(amountIn: number, referral: Address) {
                  await jettonPoolContract.send(
                      connection.sender,
                      {
                          value: toNano(amountIn + 1.5),
                      },
                      {
                          $$type: 'Buy',
                          query_id: 1234n,
                          amount_in: toNano(amountIn),
                          // referral: Address.parse('kQCP8NoFzQqBMW8egYZdmaY5kmlI8tpKao2GzQSJhey8M34U'),
                          referral,
                      },
                  )
              },
          }
        : null
}

export function useSellContract() {
    const tonAddress = useTonAddress()
    const client = useTonClient()
    const connection = useConnection()

    const pool = 'kQD8bfY8cX0l3B9j6ghIVQPjteT1138M2iF18SwRLk5vk0_I'

    const jettonMaster = '0QAihQ2T62Ua8W584aePUBJ4_iOlRGPpQYQ9kSfVbqidSjnS'
    const jettonWalletContract = useInit<OpenedContract<PumpfunJettonWallet> | void>(async () => {
        if (!client || !tonAddress) return
        const contractWrapper = await PumpfunJettonWallet.fromInit(Address.parse(tonAddress), Address.parse(jettonMaster))
        return client.open(contractWrapper) as OpenedContract<PumpfunJettonWallet>
    }, [client, tonAddress])

    return jettonWalletContract
        ? {
              sell(amount: number) {
                  const amountNano = toNano(amount)
                  void jettonWalletContract.send(
                      connection.sender,
                      {
                          value: toNano(amount + 1.5),
                      },
                      {
                          $$type: 'TokenTransfer',
                          query_id: 456n,
                          amount: amountNano,
                          sender: Address.parse(pool),
                          forward_ton_amount: toNano(0.2),
                          response_destination: Address.parse(tonAddress),
                          forward_payload: beginCell()
                              .store(
                                  storeTokenCallback({
                                      $$type: 'TokenCallback',
                                      callback_type: 1n,
                                      body: beginCell()
                                          .store(
                                              storeTokenSellCallback({
                                                  $$type: 'TokenSellCallback',
                                                  amount: amountNano,
                                                  seller: Address.parse(tonAddress),
                                              }),
                                          )
                                          .endCell(),
                                  }),
                              )
                              .endCell(),
                          custom_payload: null,
                      },
                  )
              },
          }
        : null
}
