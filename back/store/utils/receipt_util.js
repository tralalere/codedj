const assert = require("assert");
const ApiException = require("@api_utils/api_exception.js");

var retrieveDatas = function(req){

    try {

        if(typeof req.body.transaction === 'string'){
            req.body.transaction = JSON.parse(req.body.transaction);
        }

        var prd_id = req.body.id || null,
            store_type = req.body.transaction.type || null,
            appStoreReceipt = null;

        if(store_type === "android-playstore") {
            if(req.body.transaction.receipt && req.body.transaction.signature){
                appStoreReceipt = {};
                appStoreReceipt.data = JSON.parse(req.body.transaction.receipt);
                appStoreReceipt.signature = req.body.transaction.signature;
            }
        }
        else if(store_type === "ios-appstore"){
          appStoreReceipt = req.body.transaction.appStoreReceipt || null;
        }

        assert( prd_id != null, "Product Id missing" );
        assert( store_type === "ios-appstore" || store_type === "android-playstore", "Store type missing" );
        assert( appStoreReceipt != null, "Receipt missing" );

        return {
            "store_type": store_type,
            "appStoreReceipt": appStoreReceipt,
            "prd_id": prd_id
        }
    }
    catch(e){
        throw new ApiException({
            "status": 400,
            "error": e.message
        });
    }
};

module.exports = {
    retrieveDatas : retrieveDatas
};
