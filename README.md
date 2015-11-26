meteor-hue
==========

This Meteor package lets you controls your Philips Hue lights with Javascript in a Meteor app.

## Installation

    meteor add iwazaru:hue

## Usage

To use this package, you will need to know your Hue bridge IP address and your username. If you don't know how to do that, please read the [Philips Hue API Getting started](Philips hue API) page.

Initialize Hue

    let hue = new HueBridge(HUE_BRIDGE_IP, HUE_BRIDE_USERNAME);

## Examples

Turn all lights on

    hue.getLights(function(lights) {
      for (let i = 0, c = lights.length; i < c; i++) {
        lights[i].setOn();
      }
    });

Turn one light on (knowing it's id)

    hue.getLight(1, function(light) {
      light.setOn();
    });

Set a light's brightness (knowing it's id)

    hue.getLight(1, function(light) {
      light.setBrightness(150);
    });

## Todo

* Set light color