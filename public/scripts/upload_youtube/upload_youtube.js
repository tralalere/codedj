define([
    'jquery',
    'upload_youtube/MediaUploader',
    'toxilibs/event_bus_queued'
], function ($, MediaUploader, globalEventBus)
{
    
    function shareVideoToYoutube(data, onErrorCallback, onCompleteCallback)
    {
        getVideoToShare(data.notes, function(downloadError, blob){
            if(blob)
            {
                var metadata = {
                    snippet: {
                        title:  data.title,
                        description:  data.description,
                        tags: data.tags.toString(),
                        categoryId: 27,
                    },
                    status: {
                        privacyStatus: data.privacy,
                        embeddable:true,
                        license:'creativeCommon',
                        publicStatsViewable: true
                    }
                }
                var _params = {'part': 'snippet,status'};

                var uploader = new MediaUploader({
                    baseUrl: 'https://www.googleapis.com/upload/youtube/v3/videos',
                    file: blob,
                    token: data.token,
                    metadata: metadata,
                    params: _params,
                    onError: function(data) {
                        console.error('Error from MediaUploader ',data);
                        onErrorCallback(data);
                    }.bind(this),
                    onProgress: function(data) {
                        /*var percentComplete = (data.loaded / data.total)*100;
                        console.log("Téléchargement de la vidéo vers Youtube : %d%%", percentComplete);*/

                        var currentTime = Date.now();
                        var bytesUploaded = data.loaded;
                        var totalBytes = data.total;


                        $('#upload-progress').attr({
                            value: bytesUploaded,
                            max: totalBytes
                        });

                        $('.wrap-btn').fadeOut();
                        $('.during-upload').fadeIn();

                        if(totalBytes == bytesUploaded){
                            $('.during-upload').fadeOut();
                            $('.post-upload').fadeIn();
                        }
                    }.bind(this),
                    onComplete: function(data) {
                        onCompleteCallback(data);
                    }.bind(this)
                });
                this.uploadStartTime = Date.now();
                uploader.upload();
            }
            else
            {
                onErrorCallback(downloadError);
            }
        });
    };

    function getVideoToShare(notes, callback)
    {
        console.log(window.location.origin)
        var uri = encodeURI(window.location.origin+'/video?notes=' + JSON.stringify(notes));
        //var uri = encodeURI('http://192.168.10.229:8000/video?notes=' + JSON.stringify(notes));
        //var uri = './assets/sounds/export/video.mp4';
        var xhr = new XMLHttpRequest();
        xhr.open('GET', uri, true);
        xhr.responseType = 'blob';

        xhr.onload = function(e) {
            if (this.status == 200) {
                var blob = new Blob([this.response], {type: 'video/mp4'});
                callback(undefined, blob);
            } else {
                console.error(this);
                callback('Backend_Download_Fail', undefined);
            }
        };

        xhr.onerror = function (event) {
            console.error("Une erreur " + event.target.status + " s'est produite au cours de la réception du document.");
        };

        xhr.onprogress = function (event) {
            var percentComplete = (event.loaded / event.total)*100;
            console.log("Téléchargement de la vidéo à partir du backend : %d%%", percentComplete);
        };

        xhr.onloadend = function (event) {
            console.log("Le transfert vers Youtube est terminé.");
        };

        xhr.send();
    };

    return {
        getVideoToShare         : getVideoToShare,
        shareVideoToYoutube     : shareVideoToYoutube
    };

});