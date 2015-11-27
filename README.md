meteor-hue
==========

This Meteor package lets you controls your Philips Hue lights with Javascript in a Meteor app.

## Installation

    meteor add iwazaru:hue

## Usage

To use this package, you will need to know your Hue bridge IP address and your username. If you don't know how to do that, please read the [Philips Hue API Getting started](Philips hue API) page.

Initialize Hue

    let hue = new HueBridge(HUE_BRIDGE_IP, HUE_BRIDE_USERNAME);

## API

### HueBridge

The `HueBridge` object represents your bridge. After being instanciated with a IP address and a username, it allow your app to send request to the bridge.

#### .getLights(callback)

Passes to the `callback` function an array of `HueLight` objects representing all the lights that the bridge knows of.

```
hue.getLights(function(lights) {
  // do something by iterating the lights array
});
```

#### .getLight(id, callback)

Passes to the `callback` function a unique `HueLight` object representing the light found for this `id`.

```
hue.getLight(1, function(light) {
  light.setOn(); // get the first light and turn it on
});
```

### HueLight

The `HueLight` object represents a light connected to your bridge. It allow you to update a light's state by sending request through the bridge.

#### Properties

* `.id`: the unique id of the light
* `.bridge`: the bridge from which the lights depends on
* `.params`: the lights parameters

#### Methods

* `.setOn()`: turns the light on
* `.setOff()`: turns the light off
* `.setBrightness(value)`: sets the light's brightness (from 1 to 254)
* `.setHue(value)`: sets the light's hue (from 0 to 65535)
* `.setSaturation(value)`: sets the light's saturation (from 0 to 254)
* `startColorloop()`: makes the light loop through all hue values until `stopColorloop()` is called
* `blink(iterations, interval)`: makes the light turn on and off each `interval` milliseconds for `iterations` times


## Examples

Turn all lights on

```
hue.getLights(function(lights) {
  for (let i = 0, c = lights.length; i < c; i++) {
    lights[i].setOn();
  }
});
```

Turn one light on (knowing it's id)

```
hue.getLight(1, function(light) {
  light.setOn();
});
```

Set a light's brightness (knowing it's id)

```
hue.getLight(1, function(light) {
  light.setBrightness(150);
});
```

## Todo

* Allow to use promises instead of callbacks
* Control multiple lights with a `HueLights` object (composite pattern)
* Hue bridge discovery and username creation
* Tests!
