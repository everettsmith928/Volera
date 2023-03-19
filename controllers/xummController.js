require('dotenv').config();
const { XummSdk } = require('xumm-sdk');
const { TxData } = require('xrpl-txdata')
const Sdk = new XummSdk(process.env.XUMM_API_KEY, process.env.XUMM_API_SECRET);
const Verify = new TxData();

const main = async () => {
  const appInfo = await Sdk.ping()
  console.log('Xumm connected: ' + appInfo.application.name)
}

//Sign in
const signin = async (req, res) => {
  auth.authorize().then(authorized => {
    const { sdk, me } = authorized
    console.log('User info', me)
    sdk.ping().then(pong => console.log({ pong }))
  })
}

//Get User Token
const getUserToken = async (req, res) => {
  console.log(req.body);
  //req.body.wallet = req.body.destination_wallet;
  const request = {
    "TransactionType": "Signin",
    "Destination": "rQsJbEddw6moWWdcsv8xMBPVFR5UB7NDxK",
    "Amount": "10",
    "Memos": [
      {
        "Memo": {
          "MemoData": "TESTING"
          //"MemoData": "F09F988E20596F7520726F636B21"
        }
      }
    ]
  }

  const subscription = await Sdk.payload.createAndSubscribe(request, event => {
    console.log('New payload event:', event.data)

    if (event.data.signed === true) {
      // No need to console.log here, we'll do that below
      return event.data
    }

    if (event.data.signed === false) {
      // No need to console.log here, we'll do that below
      return false
    }
  })

  console.log(subscription.created)

  /**
   * Now let's wait until the subscription resolved (by returning something)
   * in the callback function.
   */
  const resolveData = await subscription.resolved

  if (resolveData.signed === false) {
    console.log('The sign request was rejected :(')
  }

  if (resolveData.signed === true) {
    console.log('Woohoo! The sign request was signed :)')

    /**
     * Let's fetch the full payload end result, and get the issued
     * user token, we can use to send our next payload per Push notification
     */
    const result = await Sdk.payload.get(resolveData.payload_uuidv4)
    console.log('User token:', result.application.issued_user_token)
  }
}

//Send Transaction
const sendTransaction = async (req, res) => {
  console.log(req.body);
  //req.body.wallet = req.body.destination_wallet;

  const request = {
    "txjson": {
      "TransactionType": "Payment",
      "Destination": "rMdG3ju8pgyVh29ELPWaDuA74CpWW6Fxns",
      "DestinationTag": 1700585980,
      "Amount": "10"
    },
    "user_token": "6133be9c-d605-40f9-b506-78205ef5d9d8"
  }

  const subscription = await Sdk.payload.createAndSubscribe(request, event => {
    console.log('New payload event:', event.data)

    // The event data contains a property 'signed' (true or false), return :)
    if (Object.keys(event.data).indexOf('signed') > -1) {
      return event.data
    }
  })

  console.log('New payload created, URL:', subscription.created.next.always)
  console.log('  > Pushed:', subscription.created.pushed ? 'yes' : 'no')

  const resolveData = await subscription.resolved

  if (resolveData.signed === false) {
    console.log('The sign request was rejected :(')
  } else {
    console.log('Woohoo! The sign request was signed :)')
    /**
     * Let's fetch the full payload end result and check for
     * a transaction hash, to verify the transaction on ledger later.
     */
    const result = await Sdk.payload.get(resolveData.payload_uuidv4)
    const verifiedResult = await Verify.getOne(result.response.txid)
    console.log('On ledger balance changes:', verifiedResult.balanceChanges)
  }
}

main()

module.exports = {
  signin,
  getUserToken,
  sendTransaction
}