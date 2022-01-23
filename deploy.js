// deploy code will go here
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
  'hockey thought swarm brain practice husband camp salmon puppy egg exclude panic',
  'https://rinkeby.infura.io/v3/1d23e5a112ac46c0b2be43bfe1e35fd9'
);

const web3 = new Web3(provider);

const deploy = async () => {
  const INITIAL_STRING = 'Hi there';
  const accounts = await web3.eth.getAccounts();
  console.log('Attempting to deploy from account', accounts[0]);
  const result = await new web3
                .eth
                .Contract(JSON.parse(interface))// We pass our ABI here and parse it to JSON see: https://web3js.readthedocs.io/en/v1.7.0/web3-eth-contract.html#eth-contract
                .deploy({ data: bytecode, arguments: [INITIAL_STRING] })
                .send({ from: accounts[0], gas: '1000000' });

  console.log('Contract deployed to: ', result.options.address);
  provider.engine.stop();
};

deploy();
