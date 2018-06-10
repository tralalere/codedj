const iap = require('in-app-purchase');
const ApiException = require("@api_utils/api_exception.js");
const https = require('https')

class Receipt {

    constructor() { }

    async validate(prd_id, store_type, receipt) {

        try {

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
            else
            {
                throw new ApiException({
                    "status": 400,
                    "error": "Uknown store type"
                });
        }

            await iap.setup();
            let res = await iap.validate(receipt);
            console.log("Valid receipt");
            return res;

        } catch (err) {
            console.error("receipt validation error ", err);
            throw new ApiException({
                "status": err.status ? err.status : 500,
                "error": err.message ? err.message : err
            });
            }

    }
};

module.exports = new Receipt();
