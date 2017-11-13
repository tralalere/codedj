const fs            = require('fs');
/**
 *@documentation https://www.npmjs.com/package/fluent-ffmpeg
**/
const ffmpeg        = require('fluent-ffmpeg');
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
  exec('ffmpeg -loop 1 -y -i ' + __dirname + '/assets/background_img_yt.jpg -i ' +  inputAudio + ' -acodec copy -vcodec mjpeg -shortest ' + targetVideo + '.avi', function (err) {
    if (err)
    {
          console.log('an error happened: ' + err);
          callback(err, undefined);      }
    else
    {
      exec('ffmpeg -i ' + targetVideo + '.avi' + ' -codec:v libx264 -crf 21 -bf 2 -flags +cgop -pix_fmt yuv420p -codec:a aac -strict -2 -b:a 384k -r:a 48000 -movflags faststart ' + targetVideo + '.mp4', function (err) {
        exec('rm ' + targetVideo + '.avi');
        if (err)
        {
              console.log('an error happened: ' + err);
              callback(err, undefined);
        }
        else
        {
              console.log('file has been converted succesfully');
              callback(undefined, 'OK');
        }
      });
    }
  });
};

module.exports = {
  doExport  : doExport
};
