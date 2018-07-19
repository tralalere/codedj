const FCM = require('fcm-push');
const ApiException = require("@api_utils/api_exception.js");

class AppNotificationUtil {

    constructor(){
        this.serverKey = process.env.FIREBASE_SERVER_KEY;
        this.fcm = new FCM(this.serverKey);
    }

    async sendFreeToken(token, accessCode, productId) {

        try {

            var message = {
                to: token,
                //collapse_key: 'your_collapse_key', 
                data: {
                    access_code: accessCode,
                    id: productId
                },
                notification: {
                    title: 'CodeDJ Notif',
                    body: 'Receive your offered pack'
                }
            };
    
            let response = await this.fcm.send(message);
            return response;

        } catch (err) {
            console.error("receipt validation error ", err);
            throw new ApiException({
                "status": err.status ? err.status : 500,
                "error": err.message ? err.message : err
            });
        }
   
    }
}

module.exports = new AppNotificationUtil();