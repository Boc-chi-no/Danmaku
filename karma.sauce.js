const customLaunchers = {
  'SL-iOS-Safari-11': {
    base: 'SauceLabs',
    browserName: 'iphone',
    deviceOrientation: 'landscape',
    version: '11.0',
  },
  'SL-Android-7': {
    base: 'SauceLabs',
    deviceName: 'Android GoogleAPI Emulator',
    platformName: 'Android',
    platformVersion: '7.1',
    browserName: 'Chrome',
    appiumVersion: '1.6.5',
    deviceOrientation: 'landscape',
  },
  'SL-Android-4': {
    base: 'SauceLabs',
    browserName: 'android',
    deviceOrientation: 'landscape',
    version: '4.4',
  },
  'SL-Chrome': {
    base: 'SauceLabs',
    browserName: 'chrome',
    platform: 'Windows 10',
  },
  'SL-Firefox': {
    base: 'SauceLabs',
    browserName: 'firefox',
  },
  'SL-Safari': {
    base: 'SauceLabs',
    browserName: 'safari',
  },
  'SL-Edge': {
    base: 'SauceLabs',
    browserName: 'MicrosoftEdge',
    platform: 'Windows 10',
  },
  'SL-IE-11': {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    platform: 'Windows 8.1',
    version: '11',
  },
  'SL-IE-10': {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    platform: 'Windows 8',
    version: '10',
  },
  'SL-IE-9': {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    platform: 'Windows 7',
    version: '9',
  },
};

module.exports = function(config) {
  config.set({
    singleRun: true,
    concurrency: 1,
    captureTimeout: 300000,
    browserNoActivityTimeout: 120000,
    frameworks: ['mocha', 'chai'],
    browsers: Object.keys(customLaunchers),
    customLaunchers,
    files: [
      'test/test.js'
    ],
    preprocessors: {
      'test/test.js': ['rollup']
    },
    rollupPreprocessor: {
      output: {
        format: 'iife',
      },
      plugins: [
        require('rollup-plugin-istanbul')({
          exclude: ['test/**/*.js']
        })
      ]
    },
    reporters: ['dots', 'saucelabs'],
    sauceLabs: {
      testName: 'Danmaku test',
      recordScreenshots: false
    },
  });
};
