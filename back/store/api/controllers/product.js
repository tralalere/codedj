const productService = require("@api_services/product");

var prodSrvc = new productService();

var getProductsList = (req, res) => {

    console.log("In getProductList")
    try {
        values = prodSrvc.getProductsList();

        res.status(200)
            .json({
                "status": true,
                "data": {
                    "products": values
                }
            });
    }
    catch (e) {
        console.log("Erreur: "+e.message)
        return res.status(e.status)
            .json({
                "status": false,
                "message": e.error
            });
    };
}

module.exports = {
    '/': {
        get: {
            action: getProductsList,
            level: 'public'
        }
    }
}
