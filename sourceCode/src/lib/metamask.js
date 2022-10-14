const optionDefinitions = [
    { name: "infuraFileToken", type: String},
    { name: "privateKey", type: String}
]

const commandLineArgs = require("command-line-args");
const options = commandLineArgs(optionDefinitions);

var Web3 = require("web3");
var Tx = require("ethereumjs-tx")
var infura_token = process.env.INFURA_TOKEN;
var private_key = process.env.MM_PRIVATE_KEY;
var node_host = `https://ropsten.infura.io/v3/${infura_token}`;

var web3 = new Web3(node_host); // 소문자 web3

const send_account = "0xC14656C3e35e0f53095021958e74e909D14C413C"; // Account1 account
const receive_account = "0x39b4a18A7435eF1ED5ecbb8bdc28970e62FF524e"; // transactionBody account

//const privateKeyBuffer = Buffer.from(private_key, "hex")

exports.getTC = async (ctx) => {
    var bodyString = '';
    web3.eth.getTransactionCount(send_account, (err, txCount) => { // (1)
        const txObject = {
            nonce: web3.utils.toHex(txCount),
            gasLimit: web3.utils.toHex(1000000),
            gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
            to: receive_account,
            value: "0x2C68AF0BB140000"
        };
        const tx = new Tx(txObject);
        tx.sign(privateKeyBuffer);

        const serializedTx = tx.serialize();
        const raw = "0x" + serializedTx.toString("hex");
        web3.eth
            .sendSignedTransaction(raw) // (2)
            .once("transactionHash", hash => {
                console.info("transactionHash", "https://ropsten.etherscan.io/tx/" + hash);
                // tx가 pending 되는 즉시 etherscan에서 tx 진행상태를 보여주는 링크를 제공해줍니다.
            })
            .once("receipt", receipt => {
                console.info("receipt", receipt); // 터미널에 receipt 출력
            })
            .on("error", console.error);
    });
    ctx.body = bodyString;
};