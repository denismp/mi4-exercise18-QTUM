# mi4-exercise18-QTUM
Deploy a Contract in Qtum

Exercises: Deploy a Contract in Qtum
Goal
In this exercise, you will deploy a simple Smart Contract in Qtum’s Regtest mode.
To deploy a contract, you will need the contract's bytecode and ABI, generated using solc. 
Finally, you’ll invoke its methods in JavaScript using qweb3.js.
Prerequisites
Throughout the project, we will use:
•	Solidity		v0.6.4 (solc)
•	Qtum		v0.19.0.1 (https://github.com/qtumproject/qtum/releases/tag/mainnet-ignition-v0.19.0)
•	QWeb3		v1.2.2
•	NodeJS		v13.5.0
•	NPM		v6.13.4

1.	Generate Bytecode and ABI
1.	Create a folder on your preferred location. From this point onwards, we will refer to this as your workspace.
2.	Implement a simple storage contract:
 
Install solc if you don’t have it, yet. Don’t forget to run the command as an administrator.
npm install -g solc@0.6.4
Compile the contract. This will generate the bytecode and ABI files on your workspace.
solcjs SimpleStorage.sol --bin --abi

 
You will need the bytecode later to deploy the contract and the ABI to interact with it.
2.	Run Qtum regtest
1.	Download Qtum 0.19.0.1 from this github repository:
https://github.com/qtumproject/qtum/releases/tag/mainnet-ignition-v0.19.0
It’s more convenient to download the zip file for your platform.
 	 
2.	Extract the archive on your workspace and open up a new terminal on that location.
Go to the bin folder and run the qtum daemon on regtest mode with username, password and port.
If you want, you can set your data directory to point at your desired location.

Remember not to close this terminal for the rest of the activity.
qtumd.exe --regtest --datadir=. --rpcuser=username --rpcpassword=password --rpcport=13889
 

3.	The Qtum regtest mode provides the option to generate blocks in order to speed up the process using PoW during testing. To generate an account, launch a new terminal on the same location and interact with the daemon using qtum-cli with the following command:
qtum-cli.exe --regtest --rpcuser=username --rpcpassword=password --rpcport=13889 getnewaddress
 

4.	Get test QTUMs. The command is: generatetoaddress 600 your_generated_address
This will mine 600 blocks and the block reward will go to the specified address. 

Note: This command may take some time as qtum-core mines new blocks.
If you examine the qtumd.exe terminal, you’ll see the mining process happening.
qtum-cli.exe --regtest --rpcuser=username --rpcpassword=password --rpcport=13889 generatetoaddress 600 qN1ipWSFoEhKbigPUcirHxpTbehkpWiiM6
 

5.	To check the wallet's address and current balance, type getwalletinfo
qtum-cli.exe --regtest --rpcuser=username --rpcpassword=password --rpcport=13889 getwalletinfo
 

3.	Deploy Contract
1.	To deploy the contract, call createcontract with the bytecode found in your workspace folder named: SimpleStorage_sol_SimpleStorage.bin
qtum-cli.exe --regtest --rpcuser=username --rpcpassword=password --rpcport=13889 createcontract 6080604052348015610011576000600...
The result of this command is a JSON, storing the transaction hash, sender address, hash160 and the address of the contract
 
At this point, save the following as we will use them later:
•	tx_id		- The transaction ID
•	sender		- The contract creator
•	address 	- The contract address

2.	Mine one block:
qtum-cli.exe --regtest --rpcuser=username --rpcpassword=password --rpcport=13889 generatetoaddress 1 qN1ipWSFoEhKbigPUcirHxpTbehkpWiiM6
	
 
3.	Check whether the transaction is confirmed using gettransaction:
qtum-cli.exe --regtest --rpcuser=username --rpcpassword=password --rpcport=13889 gettransaction INSERT_TRANSACTION_ID

 
4.	Check what is behind the address of the contract using getaccountinfo
qtum-cli.exe --regtest --rpcuser=username --rpcpassword=password --rpcport=13889 getaccountinfo INSERT_CONTRACT_ADDRESS

 
 
4.	Interact with the contract
1.	On your workspace, initialize a new NPM project. Then, install qweb3.js
npm init –y
npm install qweb3@1.2.2

2.	Create a file named client.js and start implementing the client. First, import the necessary dependencies:
 
3.	Create the contract instance using the contract address, abi and rpc. Copy the ABI generated from solc.
 
4.	Set the variables in the transaction object and send it.
 
5.	Run the client. Open a terminal on the workspace and run:
node client.js

  

This returns a transaction receipt of the transaction.

6.	Get the value of the contract. Let’s reuse client.js but comment out the set implementation.
 
7.	 Run client.js.
 

The result is successfully retrieved.

If the result is still not reflected, you have to mine a new block which can be accomplished by the generatetoaddress qtum-cli command earlier.
 
What to Submit?
Create a zip file (e.g. username-deploy-smart-contract-qtum.zip) holding the following:
•	The client.js file.
•	A screenshot showing your client setting a contract value.
•	A screenshot showing your client retrieving the contract value.

Submit your zip file as homework at the course platform.

NOTES:

The following information is in the doc/build-osx.md file.

0. brew install cmake automake berkeley-db4 libtool boost miniupnpc openssl pkg-config protobuf python qt libevent qrencode gmp
    no flags for boost
1. brew install autoconf automake libtool
2. git clone --recursive https://github.com/qtumproject/qtum.git
3. cd qtum
3.1 ./contrib/install_db4.sh .  -- I am not sure this is needed.
4. ./autogen.sh
5. ./configure --without-gui
6. make
7. make check

I was not able to get the deploy to work, but the qtumd executable is now in
$HOME/git/qtumd/src



