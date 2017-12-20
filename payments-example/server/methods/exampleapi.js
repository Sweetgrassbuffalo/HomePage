import { ValidatedMethod } from "meteor/mdg:validated-method";
import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { Random } from "meteor/random";

////////////////////////////////////////////////////////change - 1///////////////////////////////////////////////////////////////
console.log("made it to ExampleApi")
const req = require('request');
const exec = require('child_process').execSync;
////////////////////////////////////////////////////////change - 1//////////////////////////////////////////////////////////////

const ThirdPartyAPI = {
  authorize: function (transactionType, cardData, paymentData) {
    if (transactionType === "authorize") {
      //////////////////////////////////////////////////////////change - 2////////////////////////////////////////////////////////////
      let postResultsCA = {
        Seed: Math.floor(Math.random() * 100000000000000),
        CardNumber: cardData.number,
        Amount: paymentData.total,
        //Version: 2.5,
        Mode: "1",
        MerchantId: "124878",
        TerminalId: "0001",
        PaymentMethod: "1",
        ExpMonth: cardData.expireMonth,
        ExpYear: cardData.expireYear.slice(2),
        CardVerificationValue: cardData.cvv2,
        Signature: ""
      };
      /*console.log(exec('pwd').toString('utf-8'));
      process.chdir('../../../../../imports/plugins/custom/payments-example/server/methods');
      postResultsCA.Signature = exec('php hmacmd5_inc.php' + " " + postResultsCA.MerchantId + " " + postResultsCA.TerminalId + " " + postResultsCA.Seed + " " + postResultsCA.Amount).toString('utf-8');
      console.log(exec('pwd').toString('utf-8'));
      console.log(exec('ls').toString('utf-8'));
      process.chdir('../../../../../../.meteor/local/build/programs/server');
      console.log(exec('pwd').toString('utf-8'));*/
      console.log(exec('pwd').toString('utf-8'));
      postResultsCA.Signature = exec('php hmacmd5_inc.php' + " " + postResultsCA.MerchantId + " " + postResultsCA.TerminalId + " " + postResultsCA.Seed + " " + postResultsCA.Amount).toString('utf-8');
      if(postResultsCA.ExpMonth < 10){
        postResultsCA.ExpMonth = "0" + postResultsCA.ExpMonth;
      }

      var results;
      function postChargeAnywhere(){
        return new Promise(function(resolve, reject){
          req.post("https://www.chargeanywhere.com/ChargeAnywhereManager/PaymentForm/PaymentForm.asp", function optionalCallback(err, httpResponse, body){
            if(err){
              reject(err)
              return console.error('upload failed:', err);
            }
            resolve(body);
          }).form(postResultsCA)
        });
      }

      return new Promise(function(resolve, reject){
        results = postChargeAnywhere().then(function(goodResponse, badResponse) {
          if(goodResponse){
            console.log(goodResponse);
          }
          else{
            console.log(badResponse)
          }
          results = {
            success: true,
            id: postResultsCA.Seed.toString(),
            cardNumber: cardData.number.slice(-4),
            amount: paymentData.total,
            currency: "USD"
          };
          return results;
        });
        if (results != undefined){
          resolve(results);
        }
      });
      //////////////////////////////////////////////////////////change - 2////////////////////////////////////////////////////////////
    }
    return {
      success: false
    };
  },
  capture: function (authorizationId, amount) {
    ////////////////////////////////////////////////////////////change - 3//////////////////////////////////////////////////////////
    /*var r = req.post('http://ec2-34-212-133-122.us-west-2.compute.amazonaws.com:3000', function optionalCallback(err, httpResponse, body){
      if(err){
        return console.error('upload failed:', err);
      }
      console.log('Upload successful!  Server responded with:', body);
    }).form({fname:'kenny', lname:'beartusk'});*/
    ////////////////////////////////////////////////////////////change - 3//////////////////////////////////////////////////////////
    return {
      authorizationId: authorizationId,
      amount: amount,
      success: true
    };
  },
  refund: function (transactionId, amount) {
    return {
      sucess: true,
      transactionId: transactionId,
      amount: amount
    };
  },
  listRefunds: function (transactionId) {
    return {
      transactionId: transactionId,
      refunds: [
        {
          type: "refund",
          amount: 3.99,
          created: 1454034562000,
          currency: "usd",
          raw: {}
        }
      ]
    };
  }
};

// This is the "wrapper" functions you should write in order to make your code more
// testable. You can either mirror the API calls or normalize them to the authorize/capture/refund/refunds
// that Reaction is expecting
export const ExampleApi = {};
ExampleApi.methods = {};

export const cardSchema = new SimpleSchema({
  number: { type: String },
  name: { type: String },
  cvv2: { type: String },
  expireMonth: { type: String },
  expireYear: { type: String },
  type: { type: String }
});

export const paymentDataSchema = new SimpleSchema({
  total: { type: String },
  currency: { type: String }
});


ExampleApi.methods.authorize = new ValidatedMethod({
  name: "ExampleApi.methods.authorize",
  validate: new SimpleSchema({
    transactionType: { type: String },
    cardData: { type: cardSchema },
    paymentData: { type: paymentDataSchema }
  }).validator(),
  run({ transactionType, cardData, paymentData }) {
    return ThirdPartyAPI.authorize(transactionType, cardData, paymentData).then(function(results) {
      return results;
    });
  }
});


ExampleApi.methods.capture = new ValidatedMethod({
  name: "ExampleApi.methods.capture",
  validate: new SimpleSchema({
    authorizationId: { type: String },
    amount: { type: Number, decimal: true }
  }).validator(),
  run(args) {
    const transactionId = args.authorizationId;
    const amount = args.amount;
    const results = ThirdPartyAPI.capture(transactionId, amount);
    return results;
  }
});


ExampleApi.methods.refund = new ValidatedMethod({
  name: "ExampleApi.methods.refund",
  validate: new SimpleSchema({
    transactionId: { type: String },
    amount: { type: Number, decimal: true  }
  }).validator(),
  run(args) {
    const transactionId = args.transactionId;
    const amount = args.amount;
    const results = ThirdPartyAPI.refund(transactionId, amount);
    return results;
  }
});


ExampleApi.methods.refunds = new ValidatedMethod({
  name: "ExampleApi.methods.refunds",
  validate: new SimpleSchema({
    transactionId: { type: String }
  }).validator(),
  run(args) {
    const { transactionId } = args;
    const results = ThirdPartyAPI.listRefunds(transactionId);
    return results;
  }
});
