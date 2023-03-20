const { INTEGER } = require("sequelize");
const xrpl = require("xrpl")

const PUBLIC_SERVER = "wss://xrplcluster.com/"
const client = new xrpl.Client(PUBLIC_SERVER)
client.connect()
console.log('Success!');

const getUserWallet = async (req, res) => {
    console.log(req.body);
    //req.body.wallet = req.body.destination_wallet;
    const response = await client.request({
        "command": "account_info",
        "account": req.body.wallet,
        "ledger_index": "validated"
    })

    console.log(response);

    userMessage = JSON.stringify(response.result.account_data.Balance).replace('"', '');

    if (userMessage.length >= 7) {
        userMessage = "Balance: " + userMessage.substring(0, userMessage.length - 7) + " XRP";
    } else {
        userMessage = "Balance " + userMessage + " XRP Drops";
    }

    console.log(userMessage)
    res.render('./development/wallet', { userMessage: userMessage });
}

const getUserTxHistory = async (req, res) => {
    console.log(req.body);
    //req.body.wallet = req.body.destination_wallet;
    const response = await client.request({
        "command": "account_tx",
        "account": req.body.wallet,
        "ledger_index": "validated",
        "ledger_index_max": 78529622,
        "ledger_index_min": 0,
        "limit": 2
    })

    console.log(response);
    userMessage = JSON.stringify(response)
    console.log(userMessage)
    res.render('./development/txhistory', { userMessage: userMessage });
}


module.exports = {
    getUserTxHistory,
    getUserWallet
}