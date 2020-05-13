var mymap = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer(('//{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    maxZoom: 18,
    /*tileSize: 512,
    zoomOffset: -1,*/

}).addTo(mymap))