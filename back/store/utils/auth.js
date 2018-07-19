const jwt = require('jsonwebtoken');
const cacheManager = require('@api_utils/token_cache');

function permissions(level) {

    return function (req, res, next) {

        try {
            if (level === "member") {

                let jwtEncoded = req.headers.authorization;

                let cachedToken = cacheManager.get(jwtEncoded);
                if (!cachedToken) {
                    return res.status(401).end();
                }

                let jwtDecoded = jwt.verify(jwtEncoded, 'codedjsignkey');
                if (jwtDecoded.id == req.params.sku) {
                    next();
                  } else {
                    return res.status(401).end();
                  }
            }
            else
            {
                next();
            }
        }
        catch (e) {
          return res.status(401).end();
        }
    }
}

module.exports = permissions;
