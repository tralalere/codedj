const assert        = require('assert');
/**
* @documentation https://www.npmjs.com/package/node-cache
**/
const NodeCache     = require('node-cache');
/**
* @documentation https://www.npmjs.com/package/cron
**/
const Cron          = require('cron');
/**
* @documentation https://www.npmjs.com/package/youtube-sdk
**/
const Youtube       = require('youtube-sdk');
/**
* The node cache instance holding scraped data
*
* @property cacheInstance
* @type require('node-cache')
**/
const cacheInstance = new NodeCache();
/**
* Youtube Http client instance
*
* @property YT
* @type require('youtube-sdk')
**/
const YT            = new Youtube();
/**
* The API KEY used to authenticate CodeDj within Youtube API
* Can overwritten by environment process.env.YT_API_KEY for production
*
* @property _YT_API_KEY
* @type String
**/
var _YT_API_KEY     = '';
/**
* Cron expression
*
* Example :
*   - *\/1 00 * * * * : every second
*   - 00 *\/1 * * * * : every minute
*   - 00 00 *\/1 * * * : every hour
*   - etc
*
* @documentation https://www.npmjs.com/package/cron
* @property _CRON_TIME
* @type String
* @default 00 00 *\/1 * * * every hour
**/
var _CRON_TIME      = '00 00 */1 * * *';
/**
* Timezone of cron
*
* @documentation https://www.npmjs.com/package/cron
* @property _CRON_TIME
* @type String
* @default Europe/Paris
**/
var _TIME_ZONE      = 'Europe/Paris';
/**
* Youtube seach query string
* A sha256 of "Code DJ est jeu d'initiation au code à travers la création musicale (par Tralalere)" is added to query to be more precise when fetch results
*
* @documentation https://developers.google.com/youtube/v3/docs/videos/list
* @property _QUERY
* @type String
* @default codedj+tralalere+78c2632450692db3e34b196f54b3988fa41727e0b20b6389000f38be90666d70
* @readonly
**/
var _QUERY         = 'codedj+tralalere+78c2632450692db3e34b196f54b3988fa41727e0b20b6389000f38be90666d70';
/**
* Max resultat fetched by scrape service
*
* @property _MAX_RESULT_SIZE
* @type number
* @default 100
**/
var _MAX_RESULT_SIZE  = 5;
/**
* Cron job instance
*
* @documentation https://www.npmjs.com/package/cron
* @property _CRON_JOB
* @type require('cron').CronJob
* @internal
**/
var _CRON_JOB         = undefined;
/**
* Flag that enable (or not) cron job
*
* @property _ENABLE_CRON_JOB
* @type require('cron').CronJob
* @default true
**/
var _ENABLE_CRON_JOB     = true;
/**
* Counter of cron run
*
* @property _CRON_RUN_COUNTER
* @default true
**/
var _CRON_RUN_COUNTER     = 0;
/**
* Youtube seach params
*
* @documentation https://developers.google.com/youtube/v3/docs/search/list#parameters
* @property params
* @type object
**/
var params         = {
  part          : 'snippet',
  maxResults    : (_MAX_RESULT_SIZE > 50) ? '50' : ('' + _MAX_RESULT_SIZE),
  order         : 'viewCount',
  type          : 'video',
  q             : _QUERY
};
/**
 * constructor of the service
 * @constructor
 */
function constructor()
{
  // overwrite _YT_API_KEY from environment
  if(process.env.YT_API_KEY)
  {
    _YT_API_KEY = process.env.YT_API_KEY;
  }
  // assert _YT_API_KEY is provided
  assert(typeof _YT_API_KEY === 'string', 'Missing Youtube API KEY');
  YT.use(_YT_API_KEY);
  doScrapeYoutube(undefined, undefined, function(err, success) {
    if(err)
    {
      console.error('scrape_service :: scraping fail');
    }
    else
    {
      console.log('scrape_service :: scraping sucess');
    }
  });
  createOrRecreateCron();
}
/**
 * set TIME_ZONE
 * @setter
 */
function setCronTimeZone(TIME_ZONE)
{
  _TIME_ZONE = TIME_ZONE;
  createOrRecreateCron();
};
/**
 * set CRON_TIME
 * @setter
 */
function setCronExpression(CRON_TIME)
{
  _CRON_TIME = CRON_TIME;
  createOrRecreateCron();
};
/**
 * set API_KEY
 * @setter
 */
function setYoutubeApiKey(API_KEY)
{
  _YT_API_KEY = API_KEY;
  YT.use(_YT_API_KEY);
};
/**
 * set MAX_RESULT_SIZE
 * @setter
 */
function setMaxResultSize(MAX_RESULT_SIZE)
{
  _MAX_RESULT_SIZE = MAX_RESULT_SIZE;
  params = Object.assign(params, {maxResults: (_MAX_RESULT_SIZE > 50) ? '50' : ('' + _MAX_RESULT_SIZE)});
};
/**
 * set _ENABLE_CRON_JOB
 * @setter
 */
function setEnableCronJob(ENABLE_CRON_JOB)
{
  _ENABLE_CRON_JOB = ENABLE_CRON_JOB;
};
/**
 * set _QUERY
 * @setter
 */
function setQueryString(QUERY)
{
  _QUERY = QUERY;
  params = Object.assign(params, {q: _QUERY});
};
/**
* Scraping method
**/
function doScrapeYoutube(scrapedData, nextPageToken, cb)
{
  try
  {
    if(!scrapedData)
    {
      scrapedData = [];
    }

    var _params = Object.assign({}, params);

    if(nextPageToken)
    {
      _params = Object.assign(_params, {pageToken : nextPageToken});
    }
    else
    {
      console.log('scrape_service :: searching');
    }

    YT.get('search', params, function (err, data) {
      if (err)
      {
        console.error('scrape_service :: youtube-sdk :: exception', err);
        cb(err, undefined);
      }
      else
      {
        if(data.items && data.items.length > 0)
        {

          console.log('scrape_service :: fetch ' + data.items.length + ' results');

          for(var i = 0; i < data.items.length ; i++)
          {
            scrapedData.push(data.items[i].snippet.description);
          }

          if(scrapedData && scrapedData.length < _MAX_RESULT_SIZE)
          {
            doScrapeYoutube(scrapedData, data.nextPageToken, cb);
          }
          else
          {
            cacheInstance.set('scrapedData', scrapedData);
            cb(undefined, scrapedData);
          }
        }
        else
        {
          if(scrapedData && scrapedData.length > 0)
          {
            cacheInstance.set('scrapedData', scrapedData);
          }
          cb(undefined, scrapedData);
        }

      }
    });

  }
  catch(e)
  {
    console.error('scrape_service :: exception', e);
    cb(e, undefined);
  }

};
/**
 * get cached data
 * @getter
 */
function getData()
{
  console.log('scrape_service :: cache hit');
  return cacheInstance.get('scrapedData');
};
/**
 * get cron counter
 * @getter
 */
function getCronCounter()
{
  return _CRON_RUN_COUNTER;
};
/**
* stop Cron
**/
function stopCron()
{
  if(_CRON_JOB)
  {
    _CRON_JOB.stop();
    console.log('scrape_service :: cron stopped');
  }
}
/**
* Create or reacreate Cron
**/
function createOrRecreateCron()
{
  stopCron();
  _CRON_RUN_COUNTER = 0;
  _CRON_JOB = new Cron.CronJob({
    cronTime: _CRON_TIME,
    onTick: function() {
      if(_ENABLE_CRON_JOB)
      {
        doScrapeYoutube(undefined, undefined, function(err, success) {
          if(err)
          {
            console.error('scrape_service :: scraping fail', e);
          }
          else
          {
            console.log('scrape_service :: scraping success');
          }
        });
        _CRON_RUN_COUNTER++;
        console.log('scrape_service :: cron runned at ' + new Date().toUTCString());
      }
    },
    start: true,
    timeZone: _TIME_ZONE
  });
  console.log('scrape_service :: cron started [cronTime:' + _CRON_TIME + ', timeZone:' + _TIME_ZONE + ']');
};

constructor();

module.exports = {
  getData           : getData,
  getCronCounter    : getCronCounter,
  doScrapeYoutube   : doScrapeYoutube,
  setYoutubeApiKey  : setYoutubeApiKey,
  setCronTimeZone   : setCronTimeZone,
  setCronExpression : setCronExpression,
  setMaxResultSize  : setMaxResultSize,
  setEnableCronJob  : setEnableCronJob,
  setQueryString    : setQueryString,
  stopCron          : stopCron
};
