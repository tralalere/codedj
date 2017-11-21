/**
* @documentation https://nodejs.org/dist/latest-v8.x/docs/api/fs.html
**/
const exec          = require('child_process').exec;
/**
 * Export a stilling image and mp3 sound to mp4 video
 *
 * @param {string} inputAudio   mp3 audio path/ReadStream
 * @param {string} targetVideo  path to put the video
 * @param {string} lang  language FR or EN
 * @param {function} callback   function(err, success)
**/
function doExport(inputAudio, targetVideo, lang, callback)
{
  exec('ffmpeg -i ' +  inputAudio + ' -loop 1 -r 1 -i ' + __dirname + '/assets/YT_' + ((lang === 'FR') ? 'FR':'EN') + '.jpg -vcodec libx264 -preset ultrafast -crf 20 -threads 0 -acodec copy -shortest -r 2 ' + targetVideo + '.mp4', function (err) {
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
