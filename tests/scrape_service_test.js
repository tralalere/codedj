// npm install --global mocha
// npm install
// mocha .\tests\scrape_service_test.js

// TODO set process.env.YT_API_KEY before test

const assert           = require('assert');
const expect           = require('chai').expect;
const scrape_service   = require('../back/scrape_service');


describe('Search on Youtube', function () {

  scrape_service.stopCron();

  it('Should return 100 results when MaxResultSize=100', function (done) {

    scrape_service.setQueryString('FC Barcelone');
    scrape_service.setMaxResultSize(100);
    scrape_service.doScrapeYoutube(undefined, undefined, function(err, success) {
      if(err)
      {
        console.error('scrape_service :: scraping fail', err);
        assert.fail(err);
      }
      else
      {
        console.log('scrape_service :: scraping success');
        expect(scrape_service.getData()).to.have.length(100);
      }
      done();
    });

  });


  it('Should return 20 results when MaxResultSize=20', function (done) {

    scrape_service.setQueryString('FC Barcelone');
    scrape_service.setMaxResultSize(20);
    scrape_service.doScrapeYoutube(undefined, undefined, function(err, success) {
      if(err)
      {
        console.error('scrape_service :: scraping fail', err);
        assert.fail(err);
      }
      else
      {
        console.log('scrape_service :: scraping success');
        expect(scrape_service.getData()).to.have.length(20);
      }
      done();
    });

  });

});

describe('Cache data', function () {

  scrape_service.stopCron();

  it('Data must updated when new search request performed', function (done) {

      scrape_service.setQueryString('FC Barcelone');
      scrape_service.setMaxResultSize(1);
      scrape_service.doScrapeYoutube(undefined, undefined, function(err, success) {
        if(err)
        {
          console.error('scrape_service :: scraping fail', err);
          assert.fail(err);
          done();
        }
        else
        {
          var dataInCacheFristMaj = scrape_service.getData()[0];
          scrape_service.setQueryString('Real Madrid');
          scrape_service.setMaxResultSize(1);
          scrape_service.doScrapeYoutube(undefined, undefined, function(_err, _success) {
            if(_err)
            {
              console.error('scrape_service :: scraping fail', _err);
              assert.fail(_err);
            }
            else
            {
              console.log('scrape_service :: scraping success');
              expect(scrape_service.getData()[0]).to.not.equal(dataInCacheFristMaj);
            }
            done();
          });
        }
      });

    });

  });


describe('Cron', function () {

  this.timeout(10000);

  it('Run 6 times when CronExpression="*/1 * * * * *" (request every second) and wait duration is 7 seconds', function (done) {

    scrape_service.setQueryString('FC Barcelone');
    scrape_service.setMaxResultSize(1);
    scrape_service.setCronExpression('*/1 * * * * *');
    setTimeout(function () {
      console.log('##############>' + scrape_service.getCronCounter());
      expect(scrape_service.getCronCounter()).to.be.equal(6);
      scrape_service.stopCron();
      done();
    }, 7000);
  });

});
