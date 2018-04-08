function ready(fn) {
  if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

function fetch_config() {
    var request = new XMLHttpRequest();
    request.open('GET', 'config.json', true);

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        // Success!
        var config = JSON.parse(request.responseText);
        init_map(config);
      } else {
        // We reached our target server, but it returned an error
      }
    };

    request.onerror = function() {
      // There was a connection error of some sort
    };

    request.send();
}

function init_map(config) {
    var map = L.map('map'),
        base = {},
        overlay = {};

    if (config.base) {
        config.base.forEach(function(layer) {
            base[layer.name] = L.tileLayer(layer.url, layer.options);
        });

        base[config.base[0].name].addTo(map);
    }

    if (config.overlay) {
        config.overlay.forEach(function(layer) {
            overlay[layer.name] = L.tileLayer(layer.url, layer.options);
        });
    }

    if (config.view) {
        map.setView(config.view.center, config.view.zoom);
    }

    L.control.layers(base, overlay, { collapsed: false }).addTo(map);
}

ready(function() {
    fetch_config();
});
