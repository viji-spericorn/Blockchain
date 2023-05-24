export const NETWORK_CONFIGS = {
  ETHEREUM: {
    SEPOLIA: {
      CHAIN_ID: 11155111,
      CHAIN_NAME: 'SEPOLIA',
      RPC: 'https://sepolia.infura.io/v3/4e290f51163e4584ae9b6ba2e4e21a21',
      BLOCKCHAIN_EXPLORER: 'https://sepolia.etherscan.io/',
      SINGLE_SWAP_CONTRACT_ADDRESS:
        '0xE35F60C3C2feB93f7574Fc0B55bF41c5DDC2559B',
      MULTI_SWAP_CONTRACT_ADDRESS: '0x8c140202C873139F03C6d8CAbB7ce82Fb9D1eE00',
      WETH: '0xf531b8f309be94191af87605cfbf600d71c2cfe0',
      USDC: '0x8267cf9254734c6eb452a7bb9aaf97b392258b21',
      DAI: '',
    },
    GOERLI: {
      CHAIN_ID: 5,
      CHAIN_NAME: 'GOERLI',
      RPC: 'https://goerli.infura.io/v3/4e290f51163e4584ae9b6ba2e4e21a21',
      BLOCKCHAIN_EXPLORER: 'https://goerli.etherscan.io',
      SINGLE_SWAP_CONTRACT_ADDRESS:
        '0xB10C9cd418C3b08064f1Be294D7A2515994031F6',
      MULTI_SWAP_CONTRACT_ADDRESS: '0x0B9A07899De8d2e7556C6CBD66791aD4FE5B58C1',
      WETH: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
      USDC: '0x07865c6E87B9F70255377e024ace6630C1Eaa37F', // 0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6
      DAI: '0x65a5ba240CBd7fD75700836b683ba95EBb2F32bd',
    },
  },
  POLYGON: {
    MUMBAI: {
      CHAIN_ID: 80001,
      CHAIN_NAME: 'MUMBAI',
      RPC: 'https://rpc-mumbai.maticvigil.com/v1/cbf5debc2152e335a3a82bbf1d6b54db557427ab',
      BLOCKCHAIN_EXPLORER: 'https://mumbai.polygonscan.com',
      SINGLE_SWAP_CONTRACT_ADDRESS:
        '0x19e2c4e30Bf86A5b69144D6a469ad33b6Af7ab5D',
      // '0x3074D145d56CeF2b795EDd210cfaE972Af9A9e5c', // 0xE592427A0AEce92De3Edee1F18E0157C05861564 - uniswap
      MULTI_SWAP_CONTRACT_ADDRESS: '0xE592427A0AEce92De3Edee1F18E0157C05861564', // '0x622BcD4c2f2e6B5432Ac7e7f7739f97Db9C192a5' dynamic and fee corrected, // '0xa5a30D77f7a9a37de5FF68a5435640Cde6563816',
      WETH: '0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa',
      USDC: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      DAI: '0x001B3B4d0F3714Ca98ba10F6042DaEbF0B1B7b6F',
      WMATIC: '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889',
      LINK: '0x326C977E6efc84E512bB9C30f76E30c160eD06FB',
    },
  },
};