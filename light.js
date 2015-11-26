HueLight = function(bridge, id, params) {
  this.bridge = bridge;
  this.id = id;
  this.params = params;
}

HueLight.prototype = {

  updateState: function(key, val) {
    let state = {};
    state[key] = val;
    this.bridge._apiCall("PUT", `/lights/${this.id}/state`, state);
  },

  setOn: function() {
    this.updateState("on", true);
  },

  setOff: function() {
    this.updateState("on", false);
  },

  setBrightness: function(value) {
    if (value < 0 || value > 255 || value !== parseInt(value, 10)) {
      throw new Meteor.Error(500, value + " is not a valid brightness value. Should be an integer between 0 and 255.");
    }
    this.updateState("bri", value);
  },
}
