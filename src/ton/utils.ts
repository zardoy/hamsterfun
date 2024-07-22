import { createHash } from 'crypto'
import { Dictionary, beginCell, Cell } from '@ton/core'

const ONCHAIN_CONTENT_PREFIX = 0x00
const SNAKE_PREFIX = 0x00
const CELL_MAX_SIZE_BYTES = Math.floor((1023 - 8) / 8)

const sha256 = (str: string) => {
    return createHash('sha256').update(str).digest()
}

const toKey = (key: string) => {
    return BigInt(`0x${sha256(key).toString('hex')}`)
}

export function buildOnchainMetadata(data: { name: string; description: string; image: string; symbol: string }): Cell {
    const dict = Dictionary.empty(Dictionary.Keys.BigUint(256), Dictionary.Values.Cell())

    // Store the on-chain metadata in the dictionary
    for (const [key, value] of Object.entries(data)) {
        dict.set(toKey(key), makeSnakeCell(Buffer.from(value, 'utf8')))
    }

    return beginCell().storeInt(ONCHAIN_CONTENT_PREFIX, 8).storeDict(dict).endCell()
}

export function makeSnakeCell(data: Buffer) {
    // Create a cell that package the data
    const chunks = bufferToChunks(data, CELL_MAX_SIZE_BYTES)

    const b = chunks.reduceRight((curCell, chunk, index) => {
        if (index === 0) {
            curCell.storeInt(SNAKE_PREFIX, 8)
        }

        curCell.storeBuffer(chunk)
        if (index > 0) {
            const cell = curCell.endCell()
            return beginCell().storeRef(cell)
        }

        return curCell
    }, beginCell())
    return b.endCell()
}

function bufferToChunks(buff: Buffer, chunkSize: number) {
    const chunks: Buffer[] = []
    while (buff.byteLength > 0) {
        chunks.push(buff.slice(0, chunkSize))
        buff = buff.slice(chunkSize)
    }

    return chunks
}
