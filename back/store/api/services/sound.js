const ApiException      = require("@api_utils/api_exception.js");
const ProductService    = require("@api_services/product.js");
const fs = require("fs");
const conf              = require("@api_utils/conf") || {};

class Sounds {

    constructor() {
        this.productService = new ProductService();
    }

    getSoundBySKU(sku, preview) {

        var products = this.productService.getProductsList();

        var prd = [];

        prd = products.filter(element => { return element === sku });

        if (prd.length == 0) {
            throw new ApiException({
                "status": 404,
                "error": "Ressource " + sku + " not found"
            })
        }

        if (prd.length > 1) {
            throw new ApiException({
                "status": 500,
                "error": "Ambigous resource " + sku
            })
        }

        return this.getFullPath(prd[0], (preview) ? "preview.mp3" : "pack.zip");
    }

    getFullPath(sku, fileName) {

        var fp = __dirname + "/../../products/" + sku + "/" + fileName;

        if(fs.existsSync(fp)){
            return {sku: sku, sound_path: fp};
        }
        else{
            throw new ApiException({
                "status": 404,
                "error": "Sound " + sku + " not found"
            })
        }
    }
};

module.exports = Sounds
