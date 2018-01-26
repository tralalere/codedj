const ApiException = require("@api_utils/api_exception.js"),
    fs = require('fs'),
    stream = require('stream');

var stream_sound = function (sound_path, res) {
    try {

        console.log("=== streaming: "+sound_path);
        var stat = fs.statSync(sound_path);

        res.writeHead(200, {
            'Content-Type': 'audio/mpeg',
            'Content-Length': stat.size
        });

        fs.createReadStream(sound_path)
            .pipe(res);
    }
    catch (e) {
        throw new ApiException({
            "status": 500,
            "error": "Fail to stream " + sound_path + ". Error: " + e.message
        })
    }
}

var send_sound = function(sound_path, res){

    try{
        console.log("=== uploading: "+sound_path);
        var stat = fs.statSync(sound_path);
        fs.readFile(sound_path, 'binary', function(err, data) {
          if(data) {
            res.setHeader('Content-Length', stat.size);
            res.setHeader('Content-Type', 'application/zip');
            res.setHeader('Content-Disposition', 'attachment; filename=pack.zip');
            res.write(data, 'binary');
            res.end();
          } else {
            res.status(500).end();
          }
        });
    }
    catch(e){
        throw new ApiException({
            "status":500,
            "error": "Fail to send "+sound_path+". Error: "+e.messae
        })
    }
}

var get_path = function(sound_name){

    var lI = sound_name.lastIndexOf(".");

    if(lI <1){
        throw new ApiException({
            "status":400,
            "error": "Bad resource"
        })
    }

    var _name = sound_name.substring(0,lI);
    var _v = sound_name.substring(lI+1);
    var full_path = __dirname + "/../../produits/"+_name+"/"+_v+"/"+_name;

    if(fs.existsSync(full_path)){
        return full_path;
    }
    else{
        throw new ApiException({
            "status":404,
            "error": "File "+_name+" dosent exist"
        })
    }
}

module.exports = {
    stream_sound,
    send_sound,
    get_path
}
