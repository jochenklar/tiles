tiles
=====

A minimal leaflet map.

Setup
-----

Create a `config.json` of the form:

```json
{
  "view": {
    "center": [
      52.51,
      13.37628
    ],
    "zoom": 14
  },
  "base": [
    {
      "name": "OSM",
      "url": "http://tile.openstreetmap.org/{z}/{x}/{y}.png",
      "options": {
        "attribution": "Map data © 2012 OpenStreetMap contributors",
        "maxZoom": 20,
        "minZoom": 6
      }
    }
  ],
  "overlay": [
    {
      "name": "thunderforest.com/landscape",
      "url": "http://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png",
      "options": {
        "attribution": "Maps © <a href=\"https://www.thunderforest.com\">Thunderforest</a>, Data © <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap contributors</a>",
        "maxZoom": 20,
        "minZoom": 6
      }
    },
    {
      "name": "thunderforest.com/outdoors",
      "url": "http://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png",
      "options": {
        "attribution": "Maps © <a href=\"https://www.thunderforest.com\">Thunderforest</a>, Data © <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap contributors</a>",
        "maxZoom": 20,
        "minZoom": 6
      }
    }
  ]
}
```
