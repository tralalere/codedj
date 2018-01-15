const soundService = require("@api_services/sound");
const {stream_sound, send_sound} = require("@api_utils/sound_util.js");

var soundSrvc = new soundService();

var getPackBySKU = (req, res) => {
    console.log("in getPackBySKU");
    try {

        var sku = req.params.sku;
        var preview = req.url.endsWith("/preview");
        var sound_info = soundSrvc.getSoundBySKU(sku, preview);

        if(preview) {
          stream_sound(sound_info["sound_path"], res);
        }
        else {
          send_sound(sound_info["sound_path"], res);
        }
    }
    catch (e) {
        return res.status(e.status)
            .json({
                "status": false,
                "message": e.error
            });
    };
}

module.exports = {
    '/:sku/preview': {
        get: {
            action: getPackBySKU,
            level: 'public'
        }
    },
    '/:sku': {
        get: {
            action: getPackBySKU,
            level: 'member'
        }
    }
}
