const fs            = require('fs');
/**
*
**/
const exec          = require('child_process').exec;
/**
 * main export method
 *
 * @arg inputAudio    : mp3 audio path/ReadStream
 * @arg targetVideo   : path to put the video
 * @arg callback      : function(err, success)
**/
function doExport(inputAudio, targetVideo, callback)
{
  exec('ffmpeg -i ' +  inputAudio + ' -loop 1 -r 1 -i ' + __dirname + '/assets/background_img_yt.jpg -vcodec libx264 -preset ultrafast -crf 20 -threads 0 -acodec copy -shortest -r 2 ' + targetVideo, function (err) {
    if (err)
    {
      console.log('an error happened: ' + err);
      callback(err, undefined);
    }
    else
    {
      console.log('file has been converted successfully');
      callback(undefined, 'OK');
    }
  });
};

module.exports = {
  doExport  : doExport
};
