import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type Swap = {
    $$type: 'Swap';
    buy: boolean;
    price: bigint;
    amount_in: bigint;
    amount_out: bigint;
}

export function storeSwap(src: Swap) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.buy);
        b_0.storeInt(src.price, 257);
        b_0.storeCoins(src.amount_in);
        b_0.storeCoins(src.amount_out);
    };
}

export function loadSwap(slice: Slice) {
    let sc_0 = slice;
    let _buy = sc_0.loadBit();
    let _price = sc_0.loadIntBig(257);
    let _amount_in = sc_0.loadCoins();
    let _amount_out = sc_0.loadCoins();
    return { $$type: 'Swap' as const, buy: _buy, price: _price, amount_in: _amount_in, amount_out: _amount_out };
}

function loadTupleSwap(source: TupleReader) {
    let _buy = source.readBoolean();
    let _price = source.readBigNumber();
    let _amount_in = source.readBigNumber();
    let _amount_out = source.readBigNumber();
    return { $$type: 'Swap' as const, buy: _buy, price: _price, amount_in: _amount_in, amount_out: _amount_out };
}

function storeTupleSwap(source: Swap) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.buy);
    builder.writeNumber(source.price);
    builder.writeNumber(source.amount_in);
    builder.writeNumber(source.amount_out);
    return builder.build();
}

function dictValueParserSwap(): DictionaryValue<Swap> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSwap(src)).endCell());
        },
        parse: (src) => {
            return loadSwap(src.loadRef().beginParse());
        }
    }
}

export type JettonData = {
    $$type: 'JettonData';
    total_supply: bigint;
    mintable: boolean;
    owner: Address;
    content: Cell;
    wallet_code: Cell;
}

export function storeJettonData(src: JettonData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.total_supply, 257);
        b_0.storeBit(src.mintable);
        b_0.storeAddress(src.owner);
        b_0.storeRef(src.content);
        b_0.storeRef(src.wallet_code);
    };
}

export function loadJettonData(slice: Slice) {
    let sc_0 = slice;
    let _total_supply = sc_0.loadIntBig(257);
    let _mintable = sc_0.loadBit();
    let _owner = sc_0.loadAddress();
    let _content = sc_0.loadRef();
    let _wallet_code = sc_0.loadRef();
    return { $$type: 'JettonData' as const, total_supply: _total_supply, mintable: _mintable, owner: _owner, content: _content, wallet_code: _wallet_code };
}

function loadTupleJettonData(source: TupleReader) {
    let _total_supply = source.readBigNumber();
    let _mintable = source.readBoolean();
    let _owner = source.readAddress();
    let _content = source.readCell();
    let _wallet_code = source.readCell();
    return { $$type: 'JettonData' as const, total_supply: _total_supply, mintable: _mintable, owner: _owner, content: _content, wallet_code: _wallet_code };
}

function storeTupleJettonData(source: JettonData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.total_supply);
    builder.writeBoolean(source.mintable);
    builder.writeAddress(source.owner);
    builder.writeCell(source.content);
    builder.writeCell(source.wallet_code);
    return builder.build();
}

function dictValueParserJettonData(): DictionaryValue<JettonData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonData(src)).endCell());
        },
        parse: (src) => {
            return loadJettonData(src.loadRef().beginParse());
        }
    }
}

export type JettonWalletData = {
    $$type: 'JettonWalletData';
    balance: bigint;
    owner: Address;
    master: Address;
    code: Cell;
}

export function storeJettonWalletData(src: JettonWalletData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.balance, 257);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.master);
        b_0.storeRef(src.code);
    };
}

export function loadJettonWalletData(slice: Slice) {
    let sc_0 = slice;
    let _balance = sc_0.loadIntBig(257);
    let _owner = sc_0.loadAddress();
    let _master = sc_0.loadAddress();
    let _code = sc_0.loadRef();
    return { $$type: 'JettonWalletData' as const, balance: _balance, owner: _owner, master: _master, code: _code };
}

function loadTupleJettonWalletData(source: TupleReader) {
    let _balance = source.readBigNumber();
    let _owner = source.readAddress();
    let _master = source.readAddress();
    let _code = source.readCell();
    return { $$type: 'JettonWalletData' as const, balance: _balance, owner: _owner, master: _master, code: _code };
}

function storeTupleJettonWalletData(source: JettonWalletData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.balance);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.master);
    builder.writeCell(source.code);
    return builder.build();
}

function dictValueParserJettonWalletData(): DictionaryValue<JettonWalletData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonWalletData(src)).endCell());
        },
        parse: (src) => {
            return loadJettonWalletData(src.loadRef().beginParse());
        }
    }
}

export type TokenTransfer = {
    $$type: 'TokenTransfer';
    query_id: bigint;
    amount: bigint;
    sender: Address;
    response_destination: Address | null;
    custom_payload: Cell | null;
    forward_ton_amount: bigint;
    forward_payload: Cell | null;
}

export function storeTokenTransfer(src: TokenTransfer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(260734629, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.sender);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.forward_ton_amount);
        if (src.forward_payload !== null && src.forward_payload !== undefined) { b_0.storeBit(true).storeRef(src.forward_payload); } else { b_0.storeBit(false); }
    };
}

export function loadTokenTransfer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 260734629) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _sender = sc_0.loadAddress();
    let _response_destination = sc_0.loadMaybeAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'TokenTransfer' as const, query_id: _query_id, amount: _amount, sender: _sender, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleTokenTransfer(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _sender = source.readAddress();
    let _response_destination = source.readAddressOpt();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCellOpt();
    return { $$type: 'TokenTransfer' as const, query_id: _query_id, amount: _amount, sender: _sender, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleTokenTransfer(source: TokenTransfer) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.sender);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeCell(source.forward_payload);
    return builder.build();
}

function dictValueParserTokenTransfer(): DictionaryValue<TokenTransfer> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadTokenTransfer(src.loadRef().beginParse());
        }
    }
}

export type TokenTransferInternal = {
    $$type: 'TokenTransferInternal';
    query_id: bigint;
    amount: bigint;
    from: Address;
    response_destination: Address | null;
    forward_ton_amount: bigint;
    forward_payload: Cell | null;
}

export function storeTokenTransferInternal(src: TokenTransferInternal) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(395134233, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.from);
        b_0.storeAddress(src.response_destination);
        b_0.storeCoins(src.forward_ton_amount);
        if (src.forward_payload !== null && src.forward_payload !== undefined) { b_0.storeBit(true).storeRef(src.forward_payload); } else { b_0.storeBit(false); }
    };
}

export function loadTokenTransferInternal(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 395134233) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _from = sc_0.loadAddress();
    let _response_destination = sc_0.loadMaybeAddress();
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'TokenTransferInternal' as const, query_id: _query_id, amount: _amount, from: _from, response_destination: _response_destination, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleTokenTransferInternal(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    let _response_destination = source.readAddressOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCellOpt();
    return { $$type: 'TokenTransferInternal' as const, query_id: _query_id, amount: _amount, from: _from, response_destination: _response_destination, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleTokenTransferInternal(source: TokenTransferInternal) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.from);
    builder.writeAddress(source.response_destination);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeCell(source.forward_payload);
    return builder.build();
}

function dictValueParserTokenTransferInternal(): DictionaryValue<TokenTransferInternal> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenTransferInternal(src)).endCell());
        },
        parse: (src) => {
            return loadTokenTransferInternal(src.loadRef().beginParse());
        }
    }
}

export type TokenNotification = {
    $$type: 'TokenNotification';
    query_id: bigint;
    amount: bigint;
    from: Address;
    forward_payload: Cell;
}

export function storeTokenNotification(src: TokenNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1935855772, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.from);
        b_0.storeRef(src.forward_payload);
    };
}

export function loadTokenNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1935855772) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _from = sc_0.loadAddress();
    let _forward_payload = sc_0.loadRef();
    return { $$type: 'TokenNotification' as const, query_id: _query_id, amount: _amount, from: _from, forward_payload: _forward_payload };
}

function loadTupleTokenNotification(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    let _forward_payload = source.readCell();
    return { $$type: 'TokenNotification' as const, query_id: _query_id, amount: _amount, from: _from, forward_payload: _forward_payload };
}

function storeTupleTokenNotification(source: TokenNotification) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.from);
    builder.writeCell(source.forward_payload);
    return builder.build();
}

function dictValueParserTokenNotification(): DictionaryValue<TokenNotification> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenNotification(src)).endCell());
        },
        parse: (src) => {
            return loadTokenNotification(src.loadRef().beginParse());
        }
    }
}

export type TokenBurn = {
    $$type: 'TokenBurn';
    query_id: bigint;
    amount: bigint;
    response_destination: Address | null;
    custom_payload: Cell | null;
}

export function storeTokenBurn(src: TokenBurn) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1499400124, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
    };
}

export function loadTokenBurn(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1499400124) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _response_destination = sc_0.loadMaybeAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'TokenBurn' as const, query_id: _query_id, amount: _amount, response_destination: _response_destination, custom_payload: _custom_payload };
}

function loadTupleTokenBurn(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _response_destination = source.readAddressOpt();
    let _custom_payload = source.readCellOpt();
    return { $$type: 'TokenBurn' as const, query_id: _query_id, amount: _amount, response_destination: _response_destination, custom_payload: _custom_payload };
}

function storeTupleTokenBurn(source: TokenBurn) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    return builder.build();
}

function dictValueParserTokenBurn(): DictionaryValue<TokenBurn> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenBurn(src)).endCell());
        },
        parse: (src) => {
            return loadTokenBurn(src.loadRef().beginParse());
        }
    }
}

export type TokenBurnNotification = {
    $$type: 'TokenBurnNotification';
    query_id: bigint;
    amount: bigint;
    sender: Address;
    response_destination: Address | null;
}

export function storeTokenBurnNotification(src: TokenBurnNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2078119902, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.sender);
        b_0.storeAddress(src.response_destination);
    };
}

export function loadTokenBurnNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2078119902) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _sender = sc_0.loadAddress();
    let _response_destination = sc_0.loadMaybeAddress();
    return { $$type: 'TokenBurnNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, response_destination: _response_destination };
}

function loadTupleTokenBurnNotification(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _sender = source.readAddress();
    let _response_destination = source.readAddressOpt();
    return { $$type: 'TokenBurnNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, response_destination: _response_destination };
}

function storeTupleTokenBurnNotification(source: TokenBurnNotification) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.sender);
    builder.writeAddress(source.response_destination);
    return builder.build();
}

function dictValueParserTokenBurnNotification(): DictionaryValue<TokenBurnNotification> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenBurnNotification(src)).endCell());
        },
        parse: (src) => {
            return loadTokenBurnNotification(src.loadRef().beginParse());
        }
    }
}

export type TokenExcesses = {
    $$type: 'TokenExcesses';
    query_id: bigint;
}

export function storeTokenExcesses(src: TokenExcesses) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3576854235, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadTokenExcesses(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3576854235) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'TokenExcesses' as const, query_id: _query_id };
}

function loadTupleTokenExcesses(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'TokenExcesses' as const, query_id: _query_id };
}

function storeTupleTokenExcesses(source: TokenExcesses) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserTokenExcesses(): DictionaryValue<TokenExcesses> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenExcesses(src)).endCell());
        },
        parse: (src) => {
            return loadTokenExcesses(src.loadRef().beginParse());
        }
    }
}

export type TokenUpdateContent = {
    $$type: 'TokenUpdateContent';
    content: Cell;
}

export function storeTokenUpdateContent(src: TokenUpdateContent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2937889386, 32);
        b_0.storeRef(src.content);
    };
}

export function loadTokenUpdateContent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2937889386) { throw Error('Invalid prefix'); }
    let _content = sc_0.loadRef();
    return { $$type: 'TokenUpdateContent' as const, content: _content };
}

function loadTupleTokenUpdateContent(source: TupleReader) {
    let _content = source.readCell();
    return { $$type: 'TokenUpdateContent' as const, content: _content };
}

function storeTupleTokenUpdateContent(source: TokenUpdateContent) {
    let builder = new TupleBuilder();
    builder.writeCell(source.content);
    return builder.build();
}

function dictValueParserTokenUpdateContent(): DictionaryValue<TokenUpdateContent> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenUpdateContent(src)).endCell());
        },
        parse: (src) => {
            return loadTokenUpdateContent(src.loadRef().beginParse());
        }
    }
}

export type Mint = {
    $$type: 'Mint';
    query_id: bigint;
    amount: bigint;
    receiver: Address;
    excess_destination: Address;
    forward_ton_amount: bigint;
    forward_payload: Cell;
}

export function storeMint(src: Mint) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2041056010, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.receiver);
        b_0.storeAddress(src.excess_destination);
        b_0.storeCoins(src.forward_ton_amount);
        b_0.storeRef(src.forward_payload);
    };
}

export function loadMint(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2041056010) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _receiver = sc_0.loadAddress();
    let _excess_destination = sc_0.loadAddress();
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0.loadRef();
    return { $$type: 'Mint' as const, query_id: _query_id, amount: _amount, receiver: _receiver, excess_destination: _excess_destination, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleMint(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _receiver = source.readAddress();
    let _excess_destination = source.readAddress();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell();
    return { $$type: 'Mint' as const, query_id: _query_id, amount: _amount, receiver: _receiver, excess_destination: _excess_destination, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleMint(source: Mint) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.receiver);
    builder.writeAddress(source.excess_destination);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeCell(source.forward_payload);
    return builder.build();
}

function dictValueParserMint(): DictionaryValue<Mint> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMint(src)).endCell());
        },
        parse: (src) => {
            return loadMint(src.loadRef().beginParse());
        }
    }
}

export type TokenCallback = {
    $$type: 'TokenCallback';
    callback_type: bigint;
    body: Cell;
}

export function storeTokenCallback(src: TokenCallback) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.callback_type, 8);
        b_0.storeRef(src.body);
    };
}

export function loadTokenCallback(slice: Slice) {
    let sc_0 = slice;
    let _callback_type = sc_0.loadUintBig(8);
    let _body = sc_0.loadRef();
    return { $$type: 'TokenCallback' as const, callback_type: _callback_type, body: _body };
}

function loadTupleTokenCallback(source: TupleReader) {
    let _callback_type = source.readBigNumber();
    let _body = source.readCell();
    return { $$type: 'TokenCallback' as const, callback_type: _callback_type, body: _body };
}

function storeTupleTokenCallback(source: TokenCallback) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.callback_type);
    builder.writeCell(source.body);
    return builder.build();
}

function dictValueParserTokenCallback(): DictionaryValue<TokenCallback> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenCallback(src)).endCell());
        },
        parse: (src) => {
            return loadTokenCallback(src.loadRef().beginParse());
        }
    }
}

export type TokenMintCallback = {
    $$type: 'TokenMintCallback';
    amount: bigint;
    initial_buy_amount: bigint;
    dev_address: Address;
}

export function storeTokenMintCallback(src: TokenMintCallback) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeCoins(src.amount);
        b_0.storeCoins(src.initial_buy_amount);
        b_0.storeAddress(src.dev_address);
    };
}

export function loadTokenMintCallback(slice: Slice) {
    let sc_0 = slice;
    let _amount = sc_0.loadCoins();
    let _initial_buy_amount = sc_0.loadCoins();
    let _dev_address = sc_0.loadAddress();
    return { $$type: 'TokenMintCallback' as const, amount: _amount, initial_buy_amount: _initial_buy_amount, dev_address: _dev_address };
}

function loadTupleTokenMintCallback(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _initial_buy_amount = source.readBigNumber();
    let _dev_address = source.readAddress();
    return { $$type: 'TokenMintCallback' as const, amount: _amount, initial_buy_amount: _initial_buy_amount, dev_address: _dev_address };
}

function storeTupleTokenMintCallback(source: TokenMintCallback) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeNumber(source.initial_buy_amount);
    builder.writeAddress(source.dev_address);
    return builder.build();
}

function dictValueParserTokenMintCallback(): DictionaryValue<TokenMintCallback> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenMintCallback(src)).endCell());
        },
        parse: (src) => {
            return loadTokenMintCallback(src.loadRef().beginParse());
        }
    }
}

export type TokenSellCallback = {
    $$type: 'TokenSellCallback';
    amount: bigint;
    seller: Address;
}

export function storeTokenSellCallback(src: TokenSellCallback) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.seller);
    };
}

export function loadTokenSellCallback(slice: Slice) {
    let sc_0 = slice;
    let _amount = sc_0.loadCoins();
    let _seller = sc_0.loadAddress();
    return { $$type: 'TokenSellCallback' as const, amount: _amount, seller: _seller };
}

function loadTupleTokenSellCallback(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _seller = source.readAddress();
    return { $$type: 'TokenSellCallback' as const, amount: _amount, seller: _seller };
}

function storeTupleTokenSellCallback(source: TokenSellCallback) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeAddress(source.seller);
    return builder.build();
}

function dictValueParserTokenSellCallback(): DictionaryValue<TokenSellCallback> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenSellCallback(src)).endCell());
        },
        parse: (src) => {
            return loadTokenSellCallback(src.loadRef().beginParse());
        }
    }
}

export type CreateToken = {
    $$type: 'CreateToken';
    query_id: bigint;
    jetton_content: Cell;
    initial_buy: bigint;
    fee_account: Address;
}

export function storeCreateToken(src: CreateToken) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3389258714, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeRef(src.jetton_content);
        b_0.storeCoins(src.initial_buy);
        b_0.storeAddress(src.fee_account);
    };
}

export function loadCreateToken(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3389258714) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _jetton_content = sc_0.loadRef();
    let _initial_buy = sc_0.loadCoins();
    let _fee_account = sc_0.loadAddress();
    return { $$type: 'CreateToken' as const, query_id: _query_id, jetton_content: _jetton_content, initial_buy: _initial_buy, fee_account: _fee_account };
}

function loadTupleCreateToken(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _jetton_content = source.readCell();
    let _initial_buy = source.readBigNumber();
    let _fee_account = source.readAddress();
    return { $$type: 'CreateToken' as const, query_id: _query_id, jetton_content: _jetton_content, initial_buy: _initial_buy, fee_account: _fee_account };
}

function storeTupleCreateToken(source: CreateToken) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeCell(source.jetton_content);
    builder.writeNumber(source.initial_buy);
    builder.writeAddress(source.fee_account);
    return builder.build();
}

function dictValueParserCreateToken(): DictionaryValue<CreateToken> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCreateToken(src)).endCell());
        },
        parse: (src) => {
            return loadCreateToken(src.loadRef().beginParse());
        }
    }
}

export type CreatePool = {
    $$type: 'CreatePool';
    query_id: bigint;
    jetton_content: Cell;
    initial_buy: bigint;
    fee_account: Address;
    dev_account: Address;
}

export function storeCreatePool(src: CreatePool) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2926568272, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeRef(src.jetton_content);
        b_0.storeCoins(src.initial_buy);
        b_0.storeAddress(src.fee_account);
        b_0.storeAddress(src.dev_account);
    };
}

export function loadCreatePool(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2926568272) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _jetton_content = sc_0.loadRef();
    let _initial_buy = sc_0.loadCoins();
    let _fee_account = sc_0.loadAddress();
    let _dev_account = sc_0.loadAddress();
    return { $$type: 'CreatePool' as const, query_id: _query_id, jetton_content: _jetton_content, initial_buy: _initial_buy, fee_account: _fee_account, dev_account: _dev_account };
}

function loadTupleCreatePool(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _jetton_content = source.readCell();
    let _initial_buy = source.readBigNumber();
    let _fee_account = source.readAddress();
    let _dev_account = source.readAddress();
    return { $$type: 'CreatePool' as const, query_id: _query_id, jetton_content: _jetton_content, initial_buy: _initial_buy, fee_account: _fee_account, dev_account: _dev_account };
}

function storeTupleCreatePool(source: CreatePool) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeCell(source.jetton_content);
    builder.writeNumber(source.initial_buy);
    builder.writeAddress(source.fee_account);
    builder.writeAddress(source.dev_account);
    return builder.build();
}

function dictValueParserCreatePool(): DictionaryValue<CreatePool> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCreatePool(src)).endCell());
        },
        parse: (src) => {
            return loadCreatePool(src.loadRef().beginParse());
        }
    }
}

export type Buy = {
    $$type: 'Buy';
    query_id: bigint;
    amount_in: bigint;
    referral: Address;
}

export function storeBuy(src: Buy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(536816770, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount_in);
        b_0.storeAddress(src.referral);
    };
}

export function loadBuy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 536816770) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount_in = sc_0.loadCoins();
    let _referral = sc_0.loadAddress();
    return { $$type: 'Buy' as const, query_id: _query_id, amount_in: _amount_in, referral: _referral };
}

function loadTupleBuy(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount_in = source.readBigNumber();
    let _referral = source.readAddress();
    return { $$type: 'Buy' as const, query_id: _query_id, amount_in: _amount_in, referral: _referral };
}

function storeTupleBuy(source: Buy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount_in);
    builder.writeAddress(source.referral);
    return builder.build();
}

function dictValueParserBuy(): DictionaryValue<Buy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBuy(src)).endCell());
        },
        parse: (src) => {
            return loadBuy(src.loadRef().beginParse());
        }
    }
}

export type Sell = {
    $$type: 'Sell';
    amount_in: bigint;
}

export function storeSell(src: Sell) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeCoins(src.amount_in);
    };
}

export function loadSell(slice: Slice) {
    let sc_0 = slice;
    let _amount_in = sc_0.loadCoins();
    return { $$type: 'Sell' as const, amount_in: _amount_in };
}

function loadTupleSell(source: TupleReader) {
    let _amount_in = source.readBigNumber();
    return { $$type: 'Sell' as const, amount_in: _amount_in };
}

function storeTupleSell(source: Sell) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount_in);
    return builder.build();
}

function dictValueParserSell(): DictionaryValue<Sell> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSell(src)).endCell());
        },
        parse: (src) => {
            return loadSell(src.loadRef().beginParse());
        }
    }
}

export type TokenSellNotification = {
    $$type: 'TokenSellNotification';
    query_id: bigint;
    amount_in: bigint;
    sender: Address;
}

export function storeTokenSellNotification(src: TokenSellNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3753014471, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount_in);
        b_0.storeAddress(src.sender);
    };
}

export function loadTokenSellNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3753014471) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount_in = sc_0.loadCoins();
    let _sender = sc_0.loadAddress();
    return { $$type: 'TokenSellNotification' as const, query_id: _query_id, amount_in: _amount_in, sender: _sender };
}

function loadTupleTokenSellNotification(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount_in = source.readBigNumber();
    let _sender = source.readAddress();
    return { $$type: 'TokenSellNotification' as const, query_id: _query_id, amount_in: _amount_in, sender: _sender };
}

function storeTupleTokenSellNotification(source: TokenSellNotification) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount_in);
    builder.writeAddress(source.sender);
    return builder.build();
}

function dictValueParserTokenSellNotification(): DictionaryValue<TokenSellNotification> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenSellNotification(src)).endCell());
        },
        parse: (src) => {
            return loadTokenSellNotification(src.loadRef().beginParse());
        }
    }
}

export type ProvideWalletAddress = {
    $$type: 'ProvideWalletAddress';
    query_id: bigint;
    owner_address: Address;
    include_address: boolean;
}

export function storeProvideWalletAddress(src: ProvideWalletAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(745978227, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.owner_address);
        b_0.storeBit(src.include_address);
    };
}

export function loadProvideWalletAddress(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 745978227) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _owner_address = sc_0.loadAddress();
    let _include_address = sc_0.loadBit();
    return { $$type: 'ProvideWalletAddress' as const, query_id: _query_id, owner_address: _owner_address, include_address: _include_address };
}

function loadTupleProvideWalletAddress(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _owner_address = source.readAddress();
    let _include_address = source.readBoolean();
    return { $$type: 'ProvideWalletAddress' as const, query_id: _query_id, owner_address: _owner_address, include_address: _include_address };
}

function storeTupleProvideWalletAddress(source: ProvideWalletAddress) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.owner_address);
    builder.writeBoolean(source.include_address);
    return builder.build();
}

function dictValueParserProvideWalletAddress(): DictionaryValue<ProvideWalletAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeProvideWalletAddress(src)).endCell());
        },
        parse: (src) => {
            return loadProvideWalletAddress(src.loadRef().beginParse());
        }
    }
}

export type TakeWalletAddress = {
    $$type: 'TakeWalletAddress';
    query_id: bigint;
    wallet_address: Address;
    owner_address: Cell;
}

export function storeTakeWalletAddress(src: TakeWalletAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3513996288, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.wallet_address);
        b_0.storeBuilder(src.owner_address.asBuilder());
    };
}

export function loadTakeWalletAddress(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3513996288) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _wallet_address = sc_0.loadAddress();
    let _owner_address = sc_0.asCell();
    return { $$type: 'TakeWalletAddress' as const, query_id: _query_id, wallet_address: _wallet_address, owner_address: _owner_address };
}

function loadTupleTakeWalletAddress(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _wallet_address = source.readAddress();
    let _owner_address = source.readCell();
    return { $$type: 'TakeWalletAddress' as const, query_id: _query_id, wallet_address: _wallet_address, owner_address: _owner_address };
}

function storeTupleTakeWalletAddress(source: TakeWalletAddress) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.wallet_address);
    builder.writeSlice(source.owner_address);
    return builder.build();
}

function dictValueParserTakeWalletAddress(): DictionaryValue<TakeWalletAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTakeWalletAddress(src)).endCell());
        },
        parse: (src) => {
            return loadTakeWalletAddress(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2174598809, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2174598809) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwnerOk = {
    $$type: 'ChangeOwnerOk';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(846932810, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwnerOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 846932810) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwnerOk(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

 type PumpfunJettonPool_init_args = {
    $$type: 'PumpfunJettonPool_init_args';
    owner: Address;
    fee_account: Address;
    jetton_content: Cell;
}

function initPumpfunJettonPool_init_args(src: PumpfunJettonPool_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.fee_account);
        b_0.storeRef(src.jetton_content);
    };
}

async function PumpfunJettonPool_init(owner: Address, fee_account: Address, jetton_content: Cell) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initPumpfunJettonPool_init_args({ $$type: 'PumpfunJettonPool_init_args', owner, fee_account, jetton_content })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const PumpfunJettonPool_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack underflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    3688: { message: `Not mintable` },
    4429: { message: `Invalid sender` },
    9483: { message: `Invalid state` },
    14534: { message: `Not owner` },
    16059: { message: `Invalid value` },
    18668: { message: `Can't Mint Anymore` },
    23951: { message: `Insufficient gas` },
    42708: { message: `Invalid sender!` },
    43422: { message: `Invalid value - Burn` },
    62972: { message: `Invalid balance` },
}

const PumpfunJettonPool_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Swap","header":null,"fields":[{"name":"buy","type":{"kind":"simple","type":"bool","optional":false}},{"name":"price","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"amount_in","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"amount_out","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"JettonData","header":null,"fields":[{"name":"total_supply","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mintable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"wallet_code","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"JettonWalletData","header":null,"fields":[{"name":"balance","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"master","type":{"kind":"simple","type":"address","optional":false}},{"name":"code","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"TokenTransfer","header":260734629,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":true}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"TokenTransferInternal","header":395134233,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"TokenNotification","header":1935855772,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_payload","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"TokenBurn","header":1499400124,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":true}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"TokenBurnNotification","header":2078119902,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"TokenExcesses","header":3576854235,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"TokenUpdateContent","header":2937889386,"fields":[{"name":"content","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Mint","header":2041056010,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"receiver","type":{"kind":"simple","type":"address","optional":false}},{"name":"excess_destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"TokenCallback","header":null,"fields":[{"name":"callback_type","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"body","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"TokenMintCallback","header":null,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"initial_buy_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"dev_address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"TokenSellCallback","header":null,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"seller","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"CreateToken","header":3389258714,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"jetton_content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"initial_buy","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"fee_account","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"CreatePool","header":2926568272,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"jetton_content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"initial_buy","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"fee_account","type":{"kind":"simple","type":"address","optional":false}},{"name":"dev_account","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Buy","header":536816770,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount_in","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"referral","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Sell","header":null,"fields":[{"name":"amount_in","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"TokenSellNotification","header":3753014471,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount_in","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ProvideWalletAddress","header":745978227,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"owner_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"include_address","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"TakeWalletAddress","header":3513996288,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"wallet_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"owner_address","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
]

const PumpfunJettonPool_getters: ABIGetter[] = [
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

const PumpfunJettonPool_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"TokenNotification"}},
    {"receiver":"internal","message":{"kind":"typed","type":"CreatePool"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Buy"}},
]

export class PumpfunJettonPool implements Contract {
    
    static async init(owner: Address, fee_account: Address, jetton_content: Cell) {
        return await PumpfunJettonPool_init(owner, fee_account, jetton_content);
    }
    
    static async fromInit(owner: Address, fee_account: Address, jetton_content: Cell) {
        const init = await PumpfunJettonPool_init(owner, fee_account, jetton_content);
        const address = contractAddress(0, init);
        return new PumpfunJettonPool(address, init);
    }
    
    static fromAddress(address: Address) {
        return new PumpfunJettonPool(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  PumpfunJettonPool_types,
        getters: PumpfunJettonPool_getters,
        receivers: PumpfunJettonPool_receivers,
        errors: PumpfunJettonPool_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: TokenNotification | CreatePool | Buy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'TokenNotification') {
            body = beginCell().store(storeTokenNotification(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CreatePool') {
            body = beginCell().store(storeCreatePool(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Buy') {
            body = beginCell().store(storeBuy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
}