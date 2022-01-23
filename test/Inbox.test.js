// contract test code will go here
const assert = require('assert');
const ganache = require('ganache-cli');
//uppercase: Every time that we use web3 is required a constructor so this should an object to require instances of the library
const Web3 = require('web3');
//Web3 instance to set the ganache network provider
const web3 = new Web3(ganache.provider());
//get the interface and bytecode from the compile.js file
const { interface, bytecode } = require('../compile');

let accounts;
//This object are going to represent what exists in the blockchain after we deploy the contract. give you the option to use in JS your contract
let inbox;
const INITIAL_STRING = 'Hi there';

beforeEach(async () => {
  // Get a list of all accounts, everytime that I use await I have to use Async context
  accounts = await web3.eth.getAccounts();
  //Use one of this accounts to deploy the contract
  //deploy constructor are going to receive the bytecode and the parameters to initialize using the constructor of Inobox contract
  inbox = await new web3
                .eth
                .Contract(JSON.parse(interface))// We pass our ABI here and parse it to JSON see: https://web3js.readthedocs.io/en/v1.7.0/web3-eth-contract.html#eth-contract
                .deploy({ data: bytecode, arguments: [INITIAL_STRING] })
                .send({ from: accounts[0], gas: '1000000' });//https://web3js.readthedocs.io/en/v1.7.0/web3-eth-contract.html#contract-send
});

describe("Inbox", () => {
  it("deploys a contract", () => {
    assert.ok(inbox.options.address);
  });

  it("has a default message", async () => {
    const message = await inbox.methods
                                  .message()
                                  .call(); //how are we going to invoke the message method ... this doesn't modify anything in the contract
    assert.equal(message, INITIAL_STRING);
  });

  it("can change the message", async () => {
    const transactionHash = await inbox.methods
                              .setMessage('bye there')
                              .send({ from: accounts[0] }); //send the transaction... Who is paying the fee for this transaction? https://web3js.readthedocs.io/en/v1.7.0/web3-eth-contract.html#contract-send
    console.log(transactionHash);
    const message = await inbox.methods
                                  .message()
                                  .call();
    assert.equal(message, 'bye there');
  });
});
