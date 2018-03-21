const cacheManager = require('@api_utils/token_cache');
const ReceiptUtil = require("@api_utils/receipt_util.js");
const ReceiptValidator = require("@api_services/receipt");
const jwt = require('jsonwebtoken');
const btoa = require('btoa');

var authorize = async (req, res) => {

    console.log("In getToken");

    try {

        let datas = ReceiptUtil.retrieveDatas(req);
        let response = await ReceiptValidator.validate(datas.prd_id, datas.store_type, datas.appStoreReceipt);

        let token = jwt.sign({id: req.body.id}, "codedjsignkey");
        await cacheManager.set(token, token);

        res.status(200)
            .json({
                "status": true,
                "data": token
            });

    }
    catch (err) {
        console.error("getToken fail " ,err);
        res.status(err.status ? err.status : 500)
            .json({
                "status": false,
                "message": err.error ? err.error : e
            });
    };
}

module.exports = {
    '/': {
        post: {
            action: authorize,
            level: 'public'
        }
    }
}