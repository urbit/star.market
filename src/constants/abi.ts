export const DUST_ABI: any = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "initialSupply",
        "type": "uint256"
      },
      {
        "internalType": "address[]",
        "name": "defaultOperators",
        "type": "address[]"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "tokenHolder",
        "type": "address"
      }
    ],
    "name": "AuthorizedOperator",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      },
      {
        "indexed": false,
        "internalType": "bytes",
        "name": "operatorData",
        "type": "bytes"
      }
    ],
    "name": "Burned",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      },
      {
        "indexed": false,
        "internalType": "bytes",
        "name": "operatorData",
        "type": "bytes"
      }
    ],
    "name": "Minted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "tokenHolder",
        "type": "address"
      }
    ],
    "name": "RevokedOperator",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      },
      {
        "indexed": false,
        "internalType": "bytes",
        "name": "operatorData",
        "type": "bytes"
      }
    ],
    "name": "Sent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "holder",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      }
    ],
    "name": "authorizeOperator",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "tokenHolder",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "burn",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "defaultOperators",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "granularity",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "tokenHolder",
        "type": "address"
      }
    ],
    "name": "isOperatorFor",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "mint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "operatorData",
        "type": "bytes"
      }
    ],
    "name": "operatorBurn",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "operatorData",
        "type": "bytes"
      }
    ],
    "name": "operatorSend",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "ownerBurn",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      }
    ],
    "name": "revokeOperator",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "send",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "holder",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

export const ECLIPTIC_ABI: any = [
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint32"
      },
      {
        "name": "",
        "type": "uint32"
      }
    ],
    "name": "escapeRequestsIndexes",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_whose",
        "type": "address"
      }
    ],
    "name": "getOwnedPoints",
    "outputs": [
      {
        "name": "ownedPoints",
        "type": "uint32[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "address"
      },
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "votingFor",
    "outputs": [
      {
        "name": "",
        "type": "uint32"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint32"
      }
    ],
    "name": "rights",
    "outputs": [
      {
        "name": "owner",
        "type": "address"
      },
      {
        "name": "managementProxy",
        "type": "address"
      },
      {
        "name": "spawnProxy",
        "type": "address"
      },
      {
        "name": "votingProxy",
        "type": "address"
      },
      {
        "name": "transferProxy",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "address"
      },
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "transferringFor",
    "outputs": [
      {
        "name": "",
        "type": "uint32"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_point",
        "type": "uint32"
      },
      {
        "name": "_sponsor",
        "type": "uint32"
      }
    ],
    "name": "isSponsor",
    "outputs": [
      {
        "name": "result",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_point",
        "type": "uint32"
      }
    ],
    "name": "getManagementProxy",
    "outputs": [
      {
        "name": "manager",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_point",
        "type": "uint32"
      }
    ],
    "name": "getContinuityNumber",
    "outputs": [
      {
        "name": "continuityNumber",
        "type": "uint32"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint32"
      },
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "sponsoring",
    "outputs": [
      {
        "name": "",
        "type": "uint32"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_whose",
        "type": "address"
      }
    ],
    "name": "getOwnedPointCount",
    "outputs": [
      {
        "name": "count",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_point",
        "type": "uint32"
      }
    ],
    "name": "doEscape",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_whose",
        "type": "address"
      },
      {
        "name": "_index",
        "type": "uint256"
      }
    ],
    "name": "getOwnedPointAtIndex",
    "outputs": [
      {
        "name": "point",
        "type": "uint32"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_point",
        "type": "uint32"
      }
    ],
    "name": "getTransferProxy",
    "outputs": [
      {
        "name": "transferProxy",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_point",
        "type": "uint32"
      },
      {
        "name": "_proxy",
        "type": "address"
      }
    ],
    "name": "isSpawnProxy",
    "outputs": [
      {
        "name": "result",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "address"
      },
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "pointsOwnedBy",
    "outputs": [
      {
        "name": "",
        "type": "uint32"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "address"
      },
      {
        "name": "",
        "type": "address"
      }
    ],
    "name": "operators",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_point",
        "type": "uint32"
      }
    ],
    "name": "getSpawnCount",
    "outputs": [
      {
        "name": "spawnCount",
        "type": "uint32"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_point",
        "type": "uint32"
      },
      {
        "name": "_proxy",
        "type": "address"
      }
    ],
    "name": "setSpawnProxy",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_point",
        "type": "uint32"
      },
      {
        "name": "_proxy",
        "type": "address"
      }
    ],
    "name": "setTransferProxy",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint32"
      },
      {
        "name": "",
        "type": "uint32"
      }
    ],
    "name": "sponsoringIndexes",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_point",
        "type": "uint32"
      },
      {
        "name": "_proxy",
        "type": "address"
      }
    ],
    "name": "isTransferProxy",
    "outputs": [
      {
        "name": "result",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_point",
        "type": "uint32"
      }
    ],
    "name": "getVotingProxy",
    "outputs": [
      {
        "name": "voter",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_point",
        "type": "uint32"
      },
      {
        "name": "_proxy",
        "type": "address"
      }
    ],
    "name": "isManagementProxy",
    "outputs": [
      {
        "name": "result",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "address"
      },
      {
        "name": "",
        "type": "uint32"
      }
    ],
    "name": "votingForIndexes",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_point",
        "type": "uint32"
      }
    ],
    "name": "isLive",
    "outputs": [
      {
        "name": "result",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_sponsor",
        "type": "uint32"
      }
    ],
    "name": "getEscapeRequests",
    "outputs": [
      {
        "name": "requests",
        "type": "uint32[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_point",
        "type": "uint32"
      }
    ],
    "name": "getSponsor",
    "outputs": [
      {
        "name": "sponsor",
        "type": "uint32"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_sponsor",
        "type": "uint32"
      }
    ],
    "name": "getEscapeRequestsCount",
    "outputs": [
      {
        "name": "count",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "address"
      },
      {
        "name": "",
        "type": "uint32"
      }
    ],
    "name": "pointOwnerIndexes",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_proxy",
        "type": "address"
      }
    ],
    "name": "getManagerFor",
    "outputs": [
      {
        "name": "mfor",
        "type": "uint32[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "address"
      },
      {
        "name": "",
        "type": "uint32"
      }
    ],
    "name": "managerForIndexes",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "address"
      },
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "managerFor",
    "outputs": [
      {
        "name": "",
        "type": "uint32"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_point",
        "type": "uint32"
      }
    ],
    "name": "isActive",
    "outputs": [
      {
        "name": "equals",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_point",
        "type": "uint32"
      }
    ],
    "name": "getOwner",
    "outputs": [
      {
        "name": "owner",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint32"
      }
    ],
    "name": "points",
    "outputs": [
      {
        "name": "encryptionKey",
        "type": "bytes32"
      },
      {
        "name": "authenticationKey",
        "type": "bytes32"
      },
      {
        "name": "hasSponsor",
        "type": "bool"
      },
      {
        "name": "active",
        "type": "bool"
      },
      {
        "name": "escapeRequested",
        "type": "bool"
      },
      {
        "name": "sponsor",
        "type": "uint32"
      },
      {
        "name": "escapeRequestedTo",
        "type": "uint32"
      },
      {
        "name": "cryptoSuiteVersion",
        "type": "uint32"
      },
      {
        "name": "keyRevisionNumber",
        "type": "uint32"
      },
      {
        "name": "continuityNumber",
        "type": "uint32"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_proxy",
        "type": "address"
      }
    ],
    "name": "getSpawningForCount",
    "outputs": [
      {
        "name": "count",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_point",
        "type": "uint32"
      }
    ],
    "name": "hasBeenLinked",
    "outputs": [
      {
        "name": "result",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_point",
        "type": "uint32"
      },
      {
        "name": "_who",
        "type": "address"
      }
    ],
    "name": "canTransfer",
    "outputs": [
      {
        "name": "result",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "address"
      },
      {
        "name": "",
        "type": "uint32"
      }
    ],
    "name": "spawningForIndexes",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_point",
        "type": "uint32"
      }
    ],
    "name": "hasSponsor",
    "outputs": [
      {
        "name": "has",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_point",
        "type": "uint32"
      }
    ],
    "name": "activatePoint",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_point",
        "type": "uint32"
      }
    ],
    "name": "getSpawned",
    "outputs": [
      {
        "name": "spawned",
        "type": "uint32[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_point",
        "type": "uint32"
      },
      {
        "name": "_proxy",
        "type": "address"
      }
    ],
    "name": "setManagementProxy",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_point",
        "type": "uint32"
      },
      {
        "name": "_who",
        "type": "address"
      }
    ],
    "name": "canSpawnAs",
    "outputs": [
      {
        "name": "result",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_point",
        "type": "uint32"
      }
    ],
    "name": "getKeyRevisionNumber",
    "outputs": [
      {
        "name": "revision",
        "type": "uint32"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_point",
        "type": "uint32"
      },
      {
        "name": "_who",
        "type": "address"
      }
    ],
    "name": "canManage",
    "outputs": [
      {
        "name": "result",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_proxy",
        "type": "address"
      }
    ],
    "name": "getTransferringFor",
    "outputs": [
      {
        "name": "tfor",
        "type": "uint32[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_point",
        "type": "uint32"
      }
    ],
    "name": "getPointSize",
    "outputs": [
      {
        "name": "_size",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_sponsor",
        "type": "uint32"
      }
    ],
    "name": "getSponsoringCount",
    "outputs": [
      {
        "name": "count",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_proxy",
        "type": "address"
      }
    ],
    "name": "getSpawningFor",
    "outputs": [
      {
        "name": "sfor",
        "type": "uint32[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_point",
        "type": "uint32"
      }
    ],
    "name": "isEscaping",
    "outputs": [
      {
        "name": "escaping",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint32"
      },
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "escapeRequests",
    "outputs": [
      {
        "name": "",
        "type": "uint32"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_point",
        "type": "uint32"
      },
      {
        "name": "_proxy",
        "type": "address"
      }
    ],
    "name": "setVotingProxy",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_sponsor",
        "type": "uint32"
      }
    ],
    "name": "getSponsoring",
    "outputs": [
      {
        "name": "sponsees",
        "type": "uint32[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_point",
        "type": "uint32"
      },
      {
        "name": "_sponsor",
        "type": "uint32"
      }
    ],
    "name": "setEscapeRequest",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_owner",
        "type": "address"
      },
      {
        "name": "_operator",
        "type": "address"
      }
    ],
    "name": "isOperator",
    "outputs": [
      {
        "name": "result",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_point",
        "type": "uint32"
      },
      {
        "name": "_who",
        "type": "address"
      }
    ],
    "name": "canVoteAs",
    "outputs": [
      {
        "name": "result",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_primary",
        "type": "string"
      },
      {
        "name": "_secondary",
        "type": "string"
      },
      {
        "name": "_tertiary",
        "type": "string"
      }
    ],
    "name": "setDnsDomains",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_point",
        "type": "uint32"
      }
    ],
    "name": "loseSponsor",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_owner",
        "type": "address"
      },
      {
        "name": "_operator",
        "type": "address"
      },
      {
        "name": "_approved",
        "type": "bool"
      }
    ],
    "name": "setOperator",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_point",
        "type": "uint32"
      }
    ],
    "name": "registerSpawned",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_point",
        "type": "uint32"
      }
    ],
    "name": "getKeys",
    "outputs": [
      {
        "name": "crypt",
        "type": "bytes32"
      },
      {
        "name": "auth",
        "type": "bytes32"
      },
      {
        "name": "suite",
        "type": "uint32"
      },
      {
        "name": "revision",
        "type": "uint32"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_point",
        "type": "uint32"
      }
    ],
    "name": "cancelEscape",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_point",
        "type": "uint32"
      },
      {
        "name": "_address",
        "type": "address"
      }
    ],
    "name": "isOwner",
    "outputs": [
      {
        "name": "result",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_proxy",
        "type": "address"
      }
    ],
    "name": "getManagerForCount",
    "outputs": [
      {
        "name": "count",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "address"
      },
      {
        "name": "",
        "type": "uint32"
      }
    ],
    "name": "transferringForIndexes",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_proxy",
        "type": "address"
      }
    ],
    "name": "getVotingFor",
    "outputs": [
      {
        "name": "vfor",
        "type": "uint32[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "address"
      },
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "spawningFor",
    "outputs": [
      {
        "name": "",
        "type": "uint32"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_point",
        "type": "uint32"
      },
      {
        "name": "_owner",
        "type": "address"
      }
    ],
    "name": "setOwner",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_proxy",
        "type": "address"
      }
    ],
    "name": "getTransferringForCount",
    "outputs": [
      {
        "name": "count",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_point",
        "type": "uint32"
      },
      {
        "name": "_proxy",
        "type": "address"
      }
    ],
    "name": "isVotingProxy",
    "outputs": [
      {
        "name": "result",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_point",
        "type": "uint32"
      }
    ],
    "name": "getPrefix",
    "outputs": [
      {
        "name": "prefix",
        "type": "uint16"
      }
    ],
    "payable": false,
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "dnsDomains",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_point",
        "type": "uint32"
      }
    ],
    "name": "incrementContinuityNumber",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_point",
        "type": "uint32"
      }
    ],
    "name": "getSpawnProxy",
    "outputs": [
      {
        "name": "spawnProxy",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_point",
        "type": "uint32"
      }
    ],
    "name": "getEscapeRequest",
    "outputs": [
      {
        "name": "escape",
        "type": "uint32"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_point",
        "type": "uint32"
      },
      {
        "name": "_encryptionKey",
        "type": "bytes32"
      },
      {
        "name": "_authenticationKey",
        "type": "bytes32"
      },
      {
        "name": "_cryptoSuiteVersion",
        "type": "uint32"
      }
    ],
    "name": "setKeys",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_proxy",
        "type": "address"
      }
    ],
    "name": "getVotingForCount",
    "outputs": [
      {
        "name": "count",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_point",
        "type": "uint32"
      },
      {
        "name": "_sponsor",
        "type": "uint32"
      }
    ],
    "name": "isRequestingEscapeTo",
    "outputs": [
      {
        "name": "equals",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "point",
        "type": "uint32"
      },
      {
        "indexed": true,
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "OwnerChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "point",
        "type": "uint32"
      }
    ],
    "name": "Activated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "prefix",
        "type": "uint32"
      },
      {
        "indexed": true,
        "name": "child",
        "type": "uint32"
      }
    ],
    "name": "Spawned",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "point",
        "type": "uint32"
      },
      {
        "indexed": true,
        "name": "sponsor",
        "type": "uint32"
      }
    ],
    "name": "EscapeRequested",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "point",
        "type": "uint32"
      },
      {
        "indexed": true,
        "name": "sponsor",
        "type": "uint32"
      }
    ],
    "name": "EscapeCanceled",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "point",
        "type": "uint32"
      },
      {
        "indexed": true,
        "name": "sponsor",
        "type": "uint32"
      }
    ],
    "name": "EscapeAccepted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "point",
        "type": "uint32"
      },
      {
        "indexed": true,
        "name": "sponsor",
        "type": "uint32"
      }
    ],
    "name": "LostSponsor",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "point",
        "type": "uint32"
      },
      {
        "indexed": false,
        "name": "encryptionKey",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "name": "authenticationKey",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "name": "cryptoSuiteVersion",
        "type": "uint32"
      },
      {
        "indexed": false,
        "name": "keyRevisionNumber",
        "type": "uint32"
      }
    ],
    "name": "ChangedKeys",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "point",
        "type": "uint32"
      },
      {
        "indexed": false,
        "name": "number",
        "type": "uint32"
      }
    ],
    "name": "BrokeContinuity",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "point",
        "type": "uint32"
      },
      {
        "indexed": true,
        "name": "spawnProxy",
        "type": "address"
      }
    ],
    "name": "ChangedSpawnProxy",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "point",
        "type": "uint32"
      },
      {
        "indexed": true,
        "name": "transferProxy",
        "type": "address"
      }
    ],
    "name": "ChangedTransferProxy",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "point",
        "type": "uint32"
      },
      {
        "indexed": true,
        "name": "managementProxy",
        "type": "address"
      }
    ],
    "name": "ChangedManagementProxy",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "point",
        "type": "uint32"
      },
      {
        "indexed": true,
        "name": "votingProxy",
        "type": "address"
      }
    ],
    "name": "ChangedVotingProxy",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "primary",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "secondary",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "tertiary",
        "type": "string"
      }
    ],
    "name": "ChangedDns",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "previousOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipRenounced",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  }
]

export const TREASURY_ABI: any = [
  {
    "inputs": [
      {
        "internalType": "contract IAzimuth",
        "name": "_azimuth",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint32",
        "name": "prefix",
        "type": "uint32"
      },
      {
        "indexed": true,
        "internalType": "uint32",
        "name": "star",
        "type": "uint32"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      }
    ],
    "name": "Deposit",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint32",
        "name": "prefix",
        "type": "uint32"
      },
      {
        "indexed": true,
        "internalType": "uint32",
        "name": "star",
        "type": "uint32"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      }
    ],
    "name": "Redeem",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint16",
        "name": "",
        "type": "uint16"
      }
    ],
    "name": "assetIndexes",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "assets",
    "outputs": [
      {
        "internalType": "uint16",
        "name": "",
        "type": "uint16"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "azimuth",
    "outputs": [
      {
        "internalType": "contract IAzimuth",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint16",
        "name": "_star",
        "type": "uint16"
      }
    ],
    "name": "deposit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllAssets",
    "outputs": [
      {
        "internalType": "uint16[]",
        "name": "allAssets",
        "type": "uint16[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAssetCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "count",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "oneStar",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "redeem",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "startoken",
    "outputs": [
      {
        "internalType": "contract StarToken",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
