const { Qweb3 } = require('qweb3');
const username = "denis.putnam";
const password = "password";
const rpcAddress = `http://${username}:${password}@localhost:13889`;
const qweb = new Qweb3(rpcAddress);

const fs = require("fs");
const contractAddress = "88785e249764a3c752bcc1dacb07e0e78d48eee9";
let ABI = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi").toString();
ABI = JSON.parse(ABI);

const contract = qweb.Contract(contractAddress, ABI);

// let transaction = {
//     methodArgs: [1234567890],
//     gasLimit: 1000000, // Gas limit
//     senderAddress: "qcdtaccTt4sYcReh744wXj1v2pasaHVNdo" // The sender address, also contract owner
// };

// let methodName = "set";

// contract.send(methodName, transaction).then(result => {
//     console.log(result);
// });

transaction = {
    methodArgs: [],
    gasLimit: 1000000, // Gas limit
    senderAddress: "qcdtaccTt4sYcReh744wXj1v2pasaHVNdo" // The sender address, also contract owner
};
methodName = "get";

contract.send(methodName, transaction).then(result => {
    console.log(result.executionResult.formattedOutput[0].toString());
});