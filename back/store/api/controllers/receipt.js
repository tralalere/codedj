const assert = require("assert");
const ApiException = require("@api_utils/api_exception.js");
const ReceiptUtil = require("@api_utils/receipt_util.js");
const ReceiptValidator = require("@api_services/receipt");

var validatePurchase = async (req, res) => {

    console.log("In validate Purchase");

    try {

        var datas = ReceiptUtil.retrieveDatas(req);
        var response = await ReceiptValidator.validate(datas.prd_id, datas.store_type, datas.appStoreReceipt);
        res.status(200).json({
                                                        "status": true,
                "data": response
                                    });
    }
    catch (e) {
        res.status(500)
            .json({
                "status": false,
                "message": e.error ? e.error : "validation fail"
            });
    };
}

module.exports = {
    '/': {
        post: {
            action: validatePurchase,
            level: 'public'
        }
    }
}
