var _map, _overlay;

var _moving = 0;

document.addEventListener('DOMContentLoaded', init);

function init() {
    var request = new XMLHttpRequest();
    request.open('GET', 'config.json');
    request.onload = function() {
        if (request.status === 200) {
            var response = JSON.parse(request.responseText);
            display(response);
        }
    };
    request.send();
}

function display(config) {
    _map = L.map('map', {
        inertia: false
    });

    var config_base = {};
    Array.prototype.forEach.call(config.base, function(layer, key){
        config_base[layer.name] = L.tileLayer(layer.url, layer.options);
    });

    config_base[config.base[0].name].addTo(_map);

    _map.setView(config.locations[0].center, config.locations[0].zoom);

    _overlay = L.map('overlay', {
        attributionControl: false,
        zoomControl: false,
        inertia: false
    });

    _overlay.dragging.disable();
    _overlay.touchZoom.disable();
    _overlay.doubleClickZoom.disable();
    _overlay.scrollWheelZoom.disable();
    _overlay.boxZoom.disable();
    _overlay.keyboard.disable();

    var config_overlay = {};
    Array.prototype.forEach.call(config.overlay, function(layer, key){
        config_overlay[layer.name] = L.tileLayer(layer.url, layer.options);
    });

    config_overlay[config.overlay[0].name].addTo(_overlay);

    _overlay.setView(config.locations[0].center, config.locations[0].zoom);

    _map.on('mousemove', function(e) {

        var x = e.originalEvent.clientX - e.originalEvent.movementX,
            y = e.originalEvent.clientY - e.originalEvent.movementY + 50;

        var x = e.containerPoint.x,
            y = e.containerPoint.y + 50;

        var overlay = document.getElementById('overlay');
        overlay.style.left = x + 'px';
        overlay.style.top = y + 'px';

        if (!_moving) {
            sync(x, y);
        }
    });

    _map.on('mousedown', function(e) {
        _moving = 1;
    });

    _map.on('mouseup', function(e) {
        _moving = 0;
    })
}

function sync(x, y) {
    var point = L.point(x, y - 50);
    var latlng = _map.containerPointToLatLng(point);
    var zoom = _map.getZoom();

    _overlay.setView(latlng, zoom, {animate: false});
}
