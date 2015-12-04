HueLight = function(bridge, id, params) {
  this.bridge = bridge;
  this.id = id;
  this.params = params;
}

HueLight.prototype = {

  updateState: function(key, val) {
    let state = {};
    state[key] = val;
    this.params.state[key] = val;
    this.bridge._apiCall("PUT", `/lights/${this.id}/state`, state);
  },

  /**
   * Turns on the light
   */
  setOn: function() {
    this.updateState("on", true);
  },

  /**
   * Turns off the light
   */
  setOff: function() {
    this.updateState("on", false);
  },

  /**
   * Set the light's brightness
   * @param  {int} value : the light's brightness from 1 to 254
   */
  setBrightness: function(value) {
    if (value < 1 || value > 254 || value !== parseInt(value, 10)) {
      throw new Meteor.Error(500, value + ` is not a valid brightness value. Should be an integer between 1 and 254.`);
    }
    this.updateState("bri", value);
  },

  /**
   * Set the light's hue (0: red, 25500: green, 46920: blue)
   * @param  {int} value : the light's hue from 0 to 65535
   */
  setHue: function(value) {
    if (value < 0 || value > 65535 || value !== parseInt(value, 10)) {
      throw new Meteor.Error(500, value + " is not a valid hue value. Should be an integer between 0 and 65535.");
    }
    this.updateState("hue", value);
  },

  /**
   * Set the light's saturation
   * @param  {int} value : the light's saturation from 0 (white) to 254 (colored)
   */
  setSaturation: function(value) {
    if (value < 0 || value > 254 || value !== parseInt(value, 10)) {
      throw new Meteor.Error(500, value + " is not a valid hue value. Should be an integer between 0 and 254.");
    }
    this.updateState("sat", value);
  },

  /**
   * Enter color loop mode
   */
  startColorloop: function() {
    this.updateState("effect", "colorloop");
  },

  /**
   * Quit color loop mode
   */
  stopColorloop: function() {
    this.updateState("effect", "none");
  },

  /**
   * Make the light blinks
   * @param  {[int} iterations: the number of times the light should go on and off
   * @param  {[type]} interval: the time between each iteration
   */
  blink: function(iterations, interval) {

    // Default values
    iterations = iterations || 1;
    interval = interval || 1000;

    // Do the blink effect
    this.updateState("alert", "select");
    iterations -= 1;

    // If this is not the last iteration, call blink() again
    if (iterations > 0) {
      setTimeout(Meteor.bindEnvironment(function() {
        this.blink(iterations, interval);
      }.bind(this)), interval);
    }
  }
}
