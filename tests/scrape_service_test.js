// npm install --global mocha
// npm install
// mocha .\tests\scrape_service_test.js

// TODO set process.env.YT_API_KEY before test
require('module-alias/register')

const assert           = require('assert');
const expect           = require('chai').expect;
const scrape_service   = require('@back/scrape_service');


describe('Search on Youtube', function () {

  this.timeout(15000);

  scrape_service.stopCron();

  it('Should return 100 results when MaxResultSize=100', function (done) {

    scrape_service.setQueryString('FC Barcelone');
    scrape_service.setMaxResultSize(100);
    scrape_service.doScrapeYoutube(undefined, undefined)
    .then(
      () => {
        console.log('scrape_service :: scraping success');
        console.log('====================> ' + scrape_service.getData().length);
        expect(scrape_service.getData()).to.have.length(100);
      done();
      },
      (err) => {
        console.error('scrape_service :: scraping fail', err);
        assert.fail(err);
        done();
      })

  });


  it('Should return 20 results when MaxResultSize=20', function (done) {

    scrape_service.setQueryString('FC Barcelone');
    scrape_service.setMaxResultSize(20);
    scrape_service.doScrapeYoutube(undefined, undefined)
    .then(
      () => {
        console.log('scrape_service :: scraping success');
        expect(scrape_service.getData()).to.have.length(20);
      done();
      },
      (err) => {
        console.error('scrape_service :: scraping fail', err);
        assert.fail(err);
        done();
      }
    );
  });

});

describe('Cache data', function () {

  this.timeout(15000);

  scrape_service.stopCron();

  it('Data must updated when new search request performed', function (done) {

      scrape_service.setQueryString('FC Barcelone');
      scrape_service.setMaxResultSize(1);
      scrape_service.doScrapeYoutube(undefined, undefined)
      .then(
        () => {
          console.log('scrape_service :: scraping success');
          var dataInCacheFristMaj = scrape_service.getData()[0];
          scrape_service.setQueryString('Real Madrid');
          scrape_service.setMaxResultSize(1);
          scrape_service.doScrapeYoutube(undefined, undefined)
          .then(
            () => {
              console.log('scrape_service :: scraping success');
              expect(scrape_service.getData()[0]).to.not.equal(dataInCacheFristMaj);
            done();
            },
            (err) => {
              console.error('scrape_service :: scraping fail', err);
              assert.fail(err);
              done();
        }
          );
        },
        (err) => {
          console.error('scrape_service :: scraping fail', err);
          assert.fail(err);
          done();
        }
      )

    });

  });


describe('Cron', function () {

  this.timeout(10000);

  it('Run 6 times when CronExpression="*\/1 * * * * *" (request every second) and wait duration is 7 seconds', function (done) {

    scrape_service.setQueryString('FC Barcelone');
    scrape_service.setMaxResultSize(1);
    scrape_service.setCronExpression('*/1 * * * * *');
    setTimeout(function () {
      console.log('##############>' + scrape_service.getCronCounter());
      expect(scrape_service.getCronCounter()).to.be.equal(7);
      scrape_service.stopCron();
      done();
    }, 7000);
  });

});
