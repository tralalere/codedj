const assert        = require('assert');
const NodeCache     = require('node-cache');
const Cron          = require('cron');
const Youtube       = require('youtube-sdk');
const CdjError        = require('@back/cdj_error');
/**
*
 */
class ScrapeService {
/**
*
   */
  constructor() {
    var self = this;
    this._QUERY                 = 'Pyramide Studio Life Pass Filter new Pattern() new Instrument( addSample( pattern.play()';
    this._CRON_TIME             = '00 00 */1 * * *';
    this._TIME_ZONE             = 'Europe/Paris';
    this.cacheInstance          = new NodeCache();
    this.YT                     = new Youtube();
    this._YT_API_KEY            = '';
    this.cronJob                = undefined;
    this._MAX_RESULT_SIZE       = 100;
    this._CRON_RUN_COUNTER      = 0;
    this._ENABLEcronJob         = true;
    this.params                 = {
  part          : 'snippet',
      maxResults    : (this._MAX_RESULT_SIZE > 50) ? '50' : ('' + this._MAX_RESULT_SIZE),
  order         : 'date',
  type          : 'video',
      q             : this._QUERY
};

  if(process.env.YT_API_KEY)
  {
      this._YT_API_KEY = process.env.YT_API_KEY;
  }
    assert(typeof this._YT_API_KEY === 'string' && this._YT_API_KEY.length > 0, 'Missing Youtube API KEY. do export YT_API_KEY={Google API Key} before to start.');
    this.YT.use(this._YT_API_KEY);

    this.doScrapeYoutube(undefined, undefined)
      .then(() => {
      console.log('scrape_service :: scraping success');
      })
      .catch((err) => {
        console.error('scrape_service :: scraping fail \n' + err.stack);
  });

    this.createOrRecreateCron();

}
/**
   *
   * @param {*} TIME_ZONE
 */
  setCronTimeZone(TIME_ZONE) {
    this._TIME_ZONE = TIME_ZONE;
    this.createOrRecreateCron();
  }
/**
   *
   * @param {*} CRON_TIME
 */
  setCronExpression(CRON_TIME) {
    this._CRON_TIME = CRON_TIME;
    this.createOrRecreateCron();
  }
/**
   *
   * @param {*} API_KEY
 */
  setYoutubeApiKey(API_KEY) {
    this. _YT_API_KEY = API_KEY;
    this.YT.use(this._YT_API_KEY);
  }
/**
   *
   * @param {*} MAX_RESULT_SIZE
 */
  setMaxResultSize(MAX_RESULT_SIZE) {
    this._MAX_RESULT_SIZE = MAX_RESULT_SIZE;
    this.params = Object.assign(this.params, {maxResults: (this._MAX_RESULT_SIZE > 50) ? '50' : ('' + this._MAX_RESULT_SIZE)});
  }
/**
   *
   * @param {*} ENABLEcronJob
 */
  setEnableCronJob(ENABLEcronJob) {
    this._ENABLEcronJob = ENABLEcronJob;
  }
/**
   *
   * @param {*} QUERY
 */
  setQueryString(QUERY)
{
    this._QUERY = QUERY;
    this.params = Object.assign(this.params, {q: this._QUERY});
  }
  /**
   *
   */
  getData()  {
    console.log('scrape_service :: cache hit');
    return this.cacheInstance.get('scrapedData');
  }
  /**
   *
   */
  getCronCounter(){
    return this._CRON_RUN_COUNTER;
};
/**
   *
   */
  stopCron() {
    if(this.cronJob)
{
      this.cronJob.stop();
      console.log('scrape_service :: cron stopped');
    }
  }
  /**
   *
   * @param {*} params
   */
  searchOnYoutube(params) {
    return new Promise((resolve, reject) => {
      this.YT.get('search', params, function (err, data) {
        if(err && !data) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
  /**
   *
   * @param {*} scrapedData
   * @param {*} nextPageToken
   */
  async doScrapeYoutube(scrapedData, nextPageToken) {
  try
  {
      console.log('scrape_service :: doScrapeYoutube()');

    if(!scrapedData)
    {
      scrapedData = new Array();
    }

      var _params = Object.assign({}, this.params);

    if(nextPageToken)
    {
      _params = Object.assign(_params, {pageToken : nextPageToken});
      console.log('scrape_service :: fetch next page ' + nextPageToken);
    }
    else
    {
      console.log('scrape_service :: searching');
    }

      let response = await this.searchOnYoutube(_params);

      if(response.items && response.items.length > 0) {

        console.log('scrape_service :: fetch ' + response.items.length + ' results');

        for(var i = 0; i < response.items.length ; i++)
          {
            var videoInfos = {
            id: response.items[i].id.videoId,
            title: response.items[i].snippet.title,
            script: await this.retrieveCompleteData(response.items[i]),
              order: scrapedData.length
            };
            scrapedData.push(videoInfos);

          }

        if(scrapedData && scrapedData.length < this._MAX_RESULT_SIZE && response.nextPageToken)
          {
          await this.doScrapeYoutube(scrapedData, response.nextPageToken);
          }
          else
          {
          this.cacheInstance.set('scrapedData', scrapedData);
          return scrapedData;
          }
        }
        else
        {
          if(scrapedData && scrapedData.length > 0)
          {
          this.cacheInstance.set('scrapedData', scrapedData);
          }
        return scrapedData;
        }

  }
  catch(e)
  {
      throw new CdjError(500, 'scrape_service :: exception', e);
  }

  }
/**
   *
   * @param {*} videoId
   */
  retrieveCompleteData(video) {
    var self = this;
  return new Promise(function(resolve, reject) {
    let params = {
        id: video.id.videoId,
      part: 'snippet'
    };

      self.YT.get('videos', params, function (err, data) {
      if (err)
      {
        console.error('scrape_service :: youtube-sdk :: exception : can\'t retrieve complete data', JSON.stringify(err));
          resolve(video.snippet.description);
      }
      else
      {
          console.log('scrape_service :: youtube-sdk :: success to retrieve complete data for videoId=' + video.id.videoId);
          resolve(data.items[0].snippet.description);
      }
    });

  });
  }
/**
   *
   * @param {*} videoId
 */
  getMps3(videoId){
    return this.cacheInstance.get('mp3map')[videoId];
}
/**
   *
   */
  createOrRecreateCron() {
    var self = this;
    this.stopCron();
    this._CRON_RUN_COUNTER = 0;
    this.cronJob = new Cron.CronJob({
      cronTime: self._CRON_TIME,
    onTick: function() {
        if(self._ENABLEcronJob)
      {
          self.doScrapeYoutube(undefined, undefined)
            .then(() => {
            console.log('scrape_service :: scraping success');
        console.log('scrape_service :: cron runned at ' + new Date().toUTCString());
            })
            .catch((error) => {
              console.error(error.stack);
            });

          self._CRON_RUN_COUNTER++;
      }
    },
    start: true,
      timeZone: self._TIME_ZONE
  });
    console.log('scrape_service :: cron started [cronTime:' + self._CRON_TIME + ', timeZone:' + self._TIME_ZONE + ']');
  }
}

module.exports = new ScrapeService();
