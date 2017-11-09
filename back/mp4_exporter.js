const fs            = require('fs');
/**
 *@documentation https://www.npmjs.com/package/fluent-ffmpeg
**/
const FFmpeg        = require('fluent-ffmpeg');
/**
 * Video SIZE
 *
 *@property _SIZE
 *@type String
 *@example   _SIZE  = '640x480'
**/
var _SIZE           = '360x120';
/**
 * Video border color
 *
 *@property _COLOR_BORDER
 *@type String
**/
var _COLOR_BORDER   = null;
/**
 * set aspect
 * @setter
**/
function setSize(size)
{
   _SIZE  = size
};
/**
 * set color
 * @setter
**/
function setColor(color)
{
   _COLOR_BORDER   = color
};
/**
 * @arg inputAudio    : mp3 path
 * @arg inputImage    : image file path
 * @arg targetVideo   : path to put the video
 * @arg callback      : function(err, success)
**/
function doExportPath(inputAudio, inputImage, targetVideo, callback)
{
	new FFmpeg()
        .input(inputImage)
	      .inputOptions(['-loop 1'])
	      .input(inputAudio)
        .size(_SIZE)
	      .output(targetVideo)
        .autopad(_COLOR_BORDER)
	      .outputOptions([
	        '-c:v libx264',
	        '-strict experimental',
	        '-shortest'
	      ])
	      .on('error', (err) => {
		        callback(err);
	      })
	      .on('end', () => {
            callback(null, 'OK');
	      })
	      .run();
};
/**
 * streamAudio = stream of audio
 * inputImage = image file path
 * callback = function(err, success, vedioStream)
**/
function doExportStream(streamAudio, inputImage, callback)
{
  new FFmpeg()
	   .input(inputImage)
	   .inputOptions(['-loop 1'])
	   .input(streamAudio)
     .size(_SIZE)
	   .output('targetVideo.mp4')// put the vedio in ./targetVideo.mp4
     .autopad(_COLOR_BORDER)
	   .outputOptions([
		      '-c:v libx264',
		      '-strict experimental',
		      '-shortest',
	    ])
	    .on('error', (err) => {
		      callback(err);
	    })
	    .on('end', () => {
		      callback(null, 'OK', fs.createReadStream('targetVideo.mp4'));
	    })
	    .run();
};

module.exports = {
  setSize         : setSize,
  setColor        : setColor,
  doExportPath    : doExportPath,
  doExportStream  : doExportStream
};
