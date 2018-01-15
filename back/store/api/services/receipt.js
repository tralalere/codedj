const iap = require('in-app-purchase');
const ApiException = require("@api_utils/api_exception.js");
const https = require('https')

class Receipt {

    constructor() { }

    iapValidationPlugin(prd_id, store_type, receipt, cb_error, cb_succes) {

        if (store_type === "android-playstore") {
            iap.config({
                test: false,
                verbose: false,
                googlePublicKeyStrLive: process.env.GOOGLE_IAB_PUBLICKEY_LIVE
            });
        }
        else if (store_type === "ios-appstore") {
            iap.config({
                test: false,
                verbose: false
            });
        }
        else {
            cb_error("Miss store type", 400)
        }

        iap.setup(function (error) {

            if (error) {
                cb_error("Erreur start validation: " + JSON.stringify(error),500)
            }

            iap.validate(receipt, function (error, response) {

                if (error) {
                    cb_error("Erreur validation: " + error, 500)
                }
                if (iap.isValidated(response)) {
                    //console.log(" ============ Validation: " + JSON.stringify(response, null, "\t"));
                    cb_succes(response)
                }
            });
        });
    }
};

module.exports = Receipt
