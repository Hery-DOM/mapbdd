/*var map = L.map('map').setView([51.505, -0.09], 13);*/

/*L.tileLayer('//{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    maxZoom: 18,
    /!*tileSize: 512,
    zoomOffset: -1,*!/

}).addTo(mymap);*/

/*map.addLayer(new L.StamenTileLayer('toner',{
    detectRetina: true,

}))*/

/*map.addLayer(new L.CartoTileLayer('positron',{
    detectRetina: true,

}))*/

/*
$('#position').data('latitude').data('longitude')*/

/*
---------------------------------------------------------------test 2 mapbox*/

$('#position').data('latitude').data('longitude')




let $map = document.querySelector('#map')

class LeafletMap {

    constructor() {
        this.map = null
        this.bounds =[]

    }


    async load(element){
        return new Promise((resolve, reject) =>{
            $script('https://unpkg.com/leaflet@1.6.0/dist/leaflet.js', () =>{

                this.map = L.map(element)

                L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                    maxZoom: 18,
                    id: 'mapbox/streets-v11',
                    /*tileSize: 512,
                    zoomOffset: -1,*/
                    accessToken: 'pk.eyJ1IjoiYWxleGFuZHJhLWRpYXMtZGEtcm9jaGEiLCJhIjoiY2thNzdlMzV6MDBjaDJ6bWs0MjZnN3UzcCJ9.kQDDU5mD4ec75jMVoNPmGQ',

                }).addTo(this.map);
                resolve()
            })
        })
    }

    addMarker (lat, lng, text){
        let point = [lat, lng]
        this.bounds.push(point)
        L.popup({
            autoClose: false,
            closeOnEscapeKey: false,
            closeOnClick: false,
            closeButton: false,
            classNmae: 'marker',
            maxWidth: 400
        })

            .setLatLng([point])
            .setContent (text)
            .openOn(this.map)
    }

    center (){
        this.map.fitBounds(this.bounds)
    }

}

const initMap = async function () {
    let map = new LeafletMap()
    await map.load('#map')
    Array.from(document.querySelectorAll('.js-marker')).forEach((item) =>{
        map.addMarker(item.dataset.lat, item.dataset.lng, item.dataset.price + '€')
    })
    map.center()
}

if ($map !== null){
    initMap()
}


/*
var map = L.map('map').setView([44.502, -0.344], 13);


L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    /!*tileSize: 512,
    zoomOffset: -1,*!/
    accessToken: 'pk.eyJ1IjoiYWxleGFuZHJhLWRpYXMtZGEtcm9jaGEiLCJhIjoiY2thNzdlMzV6MDBjaDJ6bWs0MjZnN3UzcCJ9.kQDDU5mD4ec75jMVoNPmGQ',

}).addTo(map);

L.popup()
    .setLatLng([44.502, -0.344])
    .setContent('<p>Hello world!<br />This is a nice popup.</p>')
    .openOn(map);*/
