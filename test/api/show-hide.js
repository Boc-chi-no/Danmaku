import Danmaku from '../../src/index.js';
import { createVideo, delay } from '../helper.js';

describe('show and hide API', function() {
  var danmaku = null;

  beforeEach(function() {
    var $video = document.createElement('video');
    $video.id = 'test-video';
    document.body.appendChild($video);

    danmaku = new Danmaku({
      container: document.getElementById('test-container'),
      media: $video
    });
  });

  afterEach(function() {
    document.body.removeChild(document.getElementById('test-video'));
    danmaku.destroy();
  });

  it('should be able to show or hide comments', function() {
    assert.equal(true, danmaku.visible);
    danmaku.hide();
    assert.equal(false, danmaku.visible);
    danmaku.show();
    assert.equal(true, danmaku.visible);
  });

  it('should pause when hided and restore when showed', function(done) {
    createVideo(function(err, $video) {
      if (err) {
        console.log(err);
        done();
        return;
      }
      document.body.appendChild($video);
      danmaku = new Danmaku({
        container: document.getElementById('test-container'),
        media: $video
      });
      Promise.resolve()
        .then($video.play.bind($video))
        .then(delay(100))
        .then(function() {
          danmaku.hide();
          assert.equal(true, danmaku.paused);
          danmaku.show();
          assert.equal($video.paused, danmaku.paused);
        })
        .then($video.pause.bind($video))
        .then(function() {
          danmaku.hide();
          assert.equal(true, danmaku.paused);
          danmaku.show();
          assert.equal($video.paused, danmaku.paused);

          danmaku.hide();
        })
        .then($video.play.bind($video))
        .then(delay(100))
        .then(function() {
          assert.equal(true, danmaku.paused);
          done();
        })
        .catch(done);
    });
  });

  it('should just return when called many times', function() {
    var $video = document.getElementById('test-video');
    danmaku.hide();
    assert.equal(true, danmaku.paused);
    assert.equal(false, danmaku.visible);
    danmaku.hide();
    assert.equal(true, danmaku.paused);
    assert.equal(false, danmaku.visible);
    danmaku.show();
    assert.equal($video.paused, danmaku.paused);
    assert.equal(true, danmaku.visible);
    danmaku.show();
    assert.equal($video.paused, danmaku.paused);
    assert.equal(true, danmaku.visible);
  });
});
