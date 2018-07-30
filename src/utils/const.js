export const REDUX_STEP = {
    READY: 'ready',
    FULFILLED: 'fulfilled',
    REJECTED: 'rejected',
}

export const INITIAL_ARRAY_STATE = {
    loading: false,
    page: 1,
    count: 20,
    data: [],
    listSize: 0,
    totalSize: 0,
    error: '',    
}

export const INITIAL_OBJECT_STATE = {
    loading: false,
    data: {},
    error: '',    
}

export const INITIAL_STATE = {
    'ARR': INITIAL_ARRAY_STATE,
    'OBJ': INITIAL_OBJECT_STATE
}

export const CONTRACT_STATUS = {
    "0": 'Pending', 
    "1": 'Success', 
    "2": 'Reject',
}

export const SERVER_TX_TYPE = {
    "0": "Icx Transfer",
    "1": "Token Transfer",
    "2": "Contract Call",
    "3": "Contract Install",
    "4": "Contract Update",
}

export const IRC_VERSION = {
    "1": "IRC1",
    "3": "IRC3"
}

export const SORT_TYPE = [2, 10, 20, 40, 80, 160]

export const CONTRACT_TABS = ['Transactions', 'Token Transfers', 'Code', 'Read Contract', 'Events']
export const WALLET_TABS = ['Transactions', 'Token Transfers']
export const BLOCK_TABS = ['Transactions']
export const TOKEN_TABS = ['Token Transfers', 'Token Holders', 'Read Contract']
export const TRANSACTION_TABS = ['Events']

export const POPUP_TYPE = {
    QR: 'qr',
    DETAIL: 'detail'
}

export const SEARCH_TYPE = {
    CONTRACTS: 'contracts',
    TOKENS: 'tokens'
}

export const SEARCH_TYPE_DATA = {
    [SEARCH_TYPE.CONTRACTS]: {
        list: 'contracts',
        getList: 'contractList',
        tableClassName: 'table-typeA contract',
        contentsClassName: 'contents',
        noBoxText: 'No Contract',
        placeholder: "Search for contract name / address / symbol",
        title: 'Contracts',
    },
    [SEARCH_TYPE.TOKENS]: {
        list: 'tokens',
        getList: 'tokenList',
        tableClassName: 'table-typeI',
        contentsClassName: 'contents tokens',
        noBoxText: 'No Token',      
        placeholder: "Search for any ICX token name / address / symbol",
        title: 'Tokens',
    },
}

export const TX_TYPE = {
    BLOCKS: 'blocks',
    ADDRESSES: 'addresses',
    CONTRACT_TX: 'contracttx',
    CONTRACT_TOKEN_TX: 'contracttokentx',
    CONTRACT_EVENTS: 'contractevents',
    ADDRESS_TX: 'addresstx',
    ADDRESS_TOKEN_TX: 'addresstokentx',
    TRANSACTIONS: 'transactions',
    TOKEN_TRANSFERS: 'tokentransfers',
    BLOCK_TX: 'blocktx',
    TOKEN_TX: 'tokentx',
    TOKEN_HOLDERS: 'tokenholders',
    TRANSACTION_EVENTS: 'transactionevents',
}

export const TX_TYPE_DATA = {
    [TX_TYPE.BLOCKS]: {
		tx: 'blocks',
		getTxList: 'blockList',
        className: 'table-typeE',
        noBoxText: 'No Block',
    },
	[TX_TYPE.ADDRESSES]: {
		tx: 'addresses',
		getTxList: 'addressList',
        className: 'table-typeA',
        noBoxText: 'No Address',
    },
    [TX_TYPE.CONTRACT_TX]: {
		tx: 'contractTx',
		getTxList: 'contractTxList',
        className: 'table-typeF',
        noBoxText: 'No Transaction',
    },
    [TX_TYPE.CONTRACT_TOKEN_TX]: {
		tx: 'contractTokenTx',
		getTxList: 'contractTokenTxList',
        className: 'table-typeC token tap2',
        noBoxText: 'No Transaction'
    },
    [TX_TYPE.CONTRACT_EVENTS]: {
		tx: 'contractEvents',
		getTxList: 'contractEventLogList',
        className: 'table-typeH',
        noBoxText: 'No Event'
    },
	[TX_TYPE.ADDRESS_TX]: {
		tx: 'walletTx',
		getTxList: 'addressTxList',
        className: 'table-typeC',
        noBoxText: 'No Transaction',
    },
	[TX_TYPE.ADDRESS_TOKEN_TX]: {
		tx: 'walletTokenTx',
		getTxList: 'addressTokenTxList',
        className: 'table-typeC token',
        noBoxText: 'No Transaction',
    },
    [TX_TYPE.TRANSACTIONS]: {
		tx: 'recentTx',
		getTxList: 'transactionRecentTx',
        className: 'table-typeJ',
        noBoxText: 'No Transaction',
    },
    [TX_TYPE.TOKEN_TRANSFERS]: {
		tx: 'recentTokenTx',
		getTxList: 'tokenTxList',
		className: 'table-typeN',
        noBoxText: 'No Transaction',
	},
    [TX_TYPE.BLOCK_TX]: {
		tx: 'blockTx',
		getTxList: 'blockTxList',
		className: 'table-typeD',
        noBoxText: 'No Transaction',
	},
    [TX_TYPE.TOKEN_TX]: {
		tx: 'tokenTransfers',
		getTxList: 'tokenTransfersList',
		className: 'table-typeF',
        noBoxText: 'No Transaction',
	},
    [TX_TYPE.TOKEN_HOLDERS]: {
		tx: 'tokenHolders',
		getTxList: 'tokenHoldersList',
		className: 'table-typeM',
        noBoxText: 'No Holders',
    },
    [TX_TYPE.TRANSACTION_EVENTS]: {
		tx: 'transactionEvents',
		getTxList: 'transactionEventLogList',
		className: 'table-typeH log',
        noBoxText: 'No Event',
    }
}