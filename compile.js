// compile code will go here

//standard node module. here to avoid installation from the terminal
//Using this module we can guarantee that this is cross platform
const path = require('path');
//standard node module. here to avoid installation from the terminal
const fs = require('fs');

//Requerid compiler for solidity
const solc = require('solc');

// Generate the generic path to point our °.sol file where __dinername is the node constand to specify the work dir
const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
//Read the contents from the file in the inbox path
const source = fs.readFileSync(inboxPath, 'utf8');

//return only the definition of the contract Inbox with 2 properties -> Interface(ABI js) and bytecode
module.exports = solc.compile(source, 1).contracts[':Inbox'];
