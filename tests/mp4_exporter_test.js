// npm install --global mocha
// npm install
// mocha .\tests\scrape_service_test.js
const fs               = require('fs');
const os               = require('os');
const assert           = require('assert');
const expect           = require('chai').expect;
const mp4_exporter     = require('../back/mp4_exporter');


describe('convert mp3 + jpg to video by passing path of audio', function () {

  it('Should run success', function (done) {

    var mp3_path = '../public/assets/sounds/export/output.wav';
    var img_path = './assets/background_img_yt.png';
    var mp4_path = os.tmpdir() + Date.now() + '.mp4';

    mp4_exporter.doExportPath(mp3_path, img_path, mp4_path, function(err, success) {
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
        expect(stats.size).to.equal(10000);
      }
      done();
    });

  });

});
