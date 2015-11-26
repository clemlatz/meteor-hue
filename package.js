Package.describe({
  name: 'iwazaru:hue',
  version: '0.1.0',
  summary: 'Control Philips Hue lights with Meteor',
  git: 'https://github.com/iwazaru/meteor-hue.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('ecmascript');
  api.addFiles('bridge.js');
  api.addFiles('light.js');
  api.export('HueBridge', ['client', 'server']);
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('iwazaru:hue');
  api.addFiles('hue-tests.js');
});
