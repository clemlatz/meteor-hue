HueBridge = function(server, username) {
  this.server = server;
  this.username = username;
}

HueBridge.prototype = {

  _apiCall: function(method, path, data, callback) {
    HTTP.call(method, "http://" + this.server + "/api/" + this.username + path, { data: data },
      function(error, result) {
        if (error) {
          console.log(error);
        } else if (result.data && result.data[0] && result.data[0].error) {
          let error = result.data[0].error;
          throw new Meteor.Error(error.type, error.description);
        } else if (typeof callback === "function") {
          callback(result.data);
        }
      }
    );
  },

  getLights: function(callback) {
    var bridge = this;
    this._apiCall("GET", "/lights/", {}, function(results) {
      let lights = [];
      for (id in results) {
        lights.push(new HueLight(bridge, id, results[id]))
      }
      callback(lights);
    });
  },

  getLight: function(id, callback) {
    var bridge = this;
    this._apiCall("GET", `/lights/${id}`, {}, function(result) {
      let light = new HueLight(bridge, id, result);
      callback(light);
    });
  }
}
