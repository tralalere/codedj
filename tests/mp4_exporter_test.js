// npm install --global mocha
// npm install
// mocha .\tests\scrape_service_test.js
require('module-alias/register')

const fs               = require('fs');
const os               = require('os');
const assert           = require('assert');
const expect           = require('chai').expect;
const mp4_exporter     = require('@back/exporter/mp4_exporter');


describe('convert mp3 + jpg to video by passing path of audio', function () {

  this.timeout(20000);

  it('Should run success', function (done) {

    var mp3_path        = fs.createReadStream(__dirname + '/../public/assets/sounds/export/output.mp3');
    var mp4_path        = '/codedj/public/assets/sounds/export/youtube.mp4';

    mp4_exporter.doExport(mp3_path, mp4_path, function(err, success) {
      if(err)
      {
        console.error('mp4_exporter :: export fail', err);
        assert.fail(err);
      }
      else
      {
        console.log('mp4_exporter :: export success : ' +  mp4_path);
        expect(fs.existsSync(mp4_path)).to.be.true;

        var stats = fs.statSync(mp4_path);
        console.log(stats);
        expect(stats.size).to.be.at.least(100);
      }
      done();
    });

  });

});
