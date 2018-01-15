const ApiException  = require("@api_utils/api_exception.js");
const conf          = require("@api_utils/conf") || {};

class Products {

    constructor() { }

    getProductsList() {

        var products = conf.products;

        if (products === undefined || 
                !(typeof(products) === "object" && Array.isArray(products) && products.length>0)
            ) {
            throw new ApiException({
                "status": 404,
                "error": "Theres is no Product available right now"
            });
        }

        return products;
    }

};

module.exports = Products