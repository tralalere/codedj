const ApiException = require("@api_utils/api_exception.js");
const assert = require("assert");
const ReceiptUtil = require("@api_utils/receipt_util.js");
const receiptService = require("@api_services/receipt");

var rcptSrvc = new receiptService();

function permissions(level) {

    return function (req, res, next) {

        try {
            //Si ressource protégée
            if (level === "member") {

                // check header or url parameters or post parameters for bearer
                let bearer          = __retrieveBearer(req);
                let validationData  = {body : JSON.parse(new Buffer(bearer, 'base64').toString())};
                let datas           = ReceiptUtil.retrieveDatas(validationData);

                //__validateBearer(bearer);
                rcptSrvc.iapValidationPlugin(datas.prd_id, datas.store_type, datas.appStoreReceipt,
                function(error, status){
                    return res.status(401).end();
                },
                function(response){
                  if(req.params.sku === datas.prd_id){
                    return next();
                  } else {
                    return res.status(401).end();
                  }
                });
            } else {
              return next();
            }
        }
        catch (e) {
          return res.status(401).end();
        }
    }
}

function __validateBearer(bearer) {

    if (false) {
        throw new ApiException({
            "status": 400,
            "error": "Recieved an empty Bearer"
        })
    }

}

function __retrieveBearer(req) {

    var bearer = req.headers.authorization;

    try {
        //Authorization header trouvé et valeur commence par "Bearer "
        assert(bearer != undefined && bearer != null && bearer.match(/^Bearer(\s)/), "Authorization Token is expected")

        bearer = bearer.replace("Bearer ", "");

        //Valeur du Bearer n'est pas vide
        assert(bearer !== "" && !bearer.match(/^(\s)+$/), "Recieved an empty Bearer");

        return bearer.replace(/(\s)/g, "");
    }
    catch (e) {
        throw new ApiException({
            "status": 401,
            "error": e.message
        });
    }
}

module.exports = permissions;
