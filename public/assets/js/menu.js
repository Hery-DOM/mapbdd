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
---------------------------------------------------------------test 2 mapbox HERY*/
/*let actor={}
let count= $('#count').data ('count')

for (var i=0; i<count; i++){
    let latitude = $('.position'+i).data ('latitude')
    let longitude = $ ('.position'+i).data ('longitude')
    actor['position'+i] = [latitude,longitude]
}
/!*console.log(count)
console.log(actor)*!/


let $map = document.querySelector('#map')

class LeafletMap {

    constructor() {
        this.map = null
        this.bounds = []

    }


    async load (element){
        return new Promise((resolve, reject) => {

            $script('https://unpkg.com/leaflet@1.6.0/dist/leaflet.js', () =>{

                this.map = L.map(element, {scrollWheelZoom: false})

                L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                    maxZoom: 18,
                    id: 'mapbox/streets-v11',
                    accessToken: 'pk.eyJ1IjoiYWxleGFuZHJhLWRpYXMtZGEtcm9jaGEiLCJhIjoiY2thNzdlMzV6MDBjaDJ6bWs0MjZnN3UzcCJ9.kQDDU5mD4ec75jMVoNPmGQ',

                }).addTo(this.map);
                resolve()
            })
        })
    }

    addMarker (lat, lng, text){
        let point = [lat, lng]
        this.bounds.push(point)
        return new LeafletMarker(point, text, this.map)
    }

    center (){
        this.map.fitBounds(this.bounds)
    }

}

class LeafletMarker {
    constructor (point, text, map) {
        this.text = text()
        this.popup = L.popup({
            autoClose: false,
            closeOnEscapeKey: false,
            closeOnClick: false,
            closeButton: false,
            className: 'marker',
            maxWidth: 400
        })

            .setLatLng([point])
            .setContent (text)
            .openOn(map)
    }

    setActive (){
        this.popup.getElement().classList.add('is-active')
    }

    unsetActive (){
        this.popup.getElement().classList.remove('is-active')
    }

    addEventListener (event, cb){
        this.popup.addEventListener('add', () => {
            this.popup.getElement().addEventListener(event,cb)
        })
    }

    setContent (text){
        this.popup.setContent(text)
        this.popup.getElement().classList.add('is-expanded')
        this.popup.update()
    }

    resetContent (){
        this.popup.setContent(this.text)
        this.popup.getElement().classList.remove('is-expanded')
        this.popup.update()
    }
}

const initMap = async function () {
    let map = new LeafletMap()
    let hoverMarker = null
    let activeMarker = null
    await map.load($map)

    for (var [key,value] of Object.entries(actor)){
        console.log(value)
        let marker = map.addMarker(value[0], value[1], 'text')
        item.addEventListener('mouseover',function (){
            if (hoverMarker !== null){
                hoverMarker.unsetActive()
            }
            marker.setActive()
            hoverMarker = marker
        })

        item.addEventListener('mouseleave', function () {
            if (hoverMarker !== null){
                hoverMarker.unsetActive()
            }
        })
        marker.addEventListener('click', function () {
            if (activeMarker !== null){
                activeMarker.resetContent()
            }
            marker.setContent(item.innerHTML)
            activeMarker = marker
        })
    }

    map.center()
}

if ($map !== null){
    initMap()
}*/
/*
---------------------------------------------------------------test 2 mapbox END*/

/*
---------------------------------------------------------------test 2 mapbox set view*/
let actor={}
let count= $('#count').data ('count')

var latitudeM= $('#mapCenter').data('latitude')
var longitudeM= $('#mapCenter').data('longitude')
var zoom=15
if (latitudeM == '' && longitudeM == ''){
    latitudeM=46
    longitudeM=2
    zoom=6.5
}
/*
---------------------------------------------------------------let hery*/
/*let city = document.getElementById('city')

let latitude = city.dataset.latitude
let longitude = city.dataset.longitude

let latitude2 = parseFloat(latitude) + 0.1
let longitude2 = parseFloat(longitude)+0.1

let latitudeM = (parseFloat(latitude)+parseFloat(latitude2))/2
let longitudeM = (parseFloat(longitude)+parseFloat(longitude2))/2*/
/*
---------------------------------------------------------------let hery*/

for (var i=0; i<count; i++){
    let latitude = $('.position'+i).data ('latitude')
    let longitude = $ ('.position'+i).data ('longitude')
    actor['position'+i] = [latitude,longitude]
}


let $map = document.querySelector('#map')

class LeafletMap {

    constructor() {
        this.map = null
        this.bounds = []

    }


    async load (element){
        return new Promise((resolve, reject) => {

            $script('https://unpkg.com/leaflet@1.6.0/dist/leaflet.js', () =>{

                this.map = L.map(element, {scrollWheelZoom: false}) .setView([latitudeM, longitudeM], zoom)

                L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                    maxZoom: 20,
                    id: 'mapbox/streets-v11',
                    accessToken: 'pk.eyJ1IjoiYWxleGFuZHJhLWRpYXMtZGEtcm9jaGEiLCJhIjoiY2thNzdlMzV6MDBjaDJ6bWs0MjZnN3UzcCJ9.kQDDU5mD4ec75jMVoNPmGQ',

                }).addTo(this.map);
                resolve()
            })
        })
    }

    addMarker (lat, lng, text){
        let point = [lat, lng]
        this.bounds.push(point)
        return new LeafletMarker(point, text, this.map)
    }

    center (){
        this.map.fitBounds(this.bounds)
    }

}

class LeafletMarker {
    constructor (point, text, map) {
        this.text = text()
        this.popup = L.popup({
            autoClose: false,
            closeOnEscapeKey: false,
            closeOnClick: false,
            closeButton: false,
            className: 'marker',
            maxWidth: 400
        })

            .setLatLng([point])
            .setContent (text)
            .openOn(map)
    }

    setActive (){
        this.popup.getElement().classList.add('is-active')
    }

    unsetActive (){
        this.popup.getElement().classList.remove('is-active')
    }

    addEventListener (event, cb){
        this.popup.addEventListener('add', () => {
            this.popup.getElement().addEventListener(event,cb)
        })
    }

    setContent (text){
        this.popup.setContent(text)
        this.popup.getElement().classList.add('is-expanded')
        this.popup.update()
    }

    resetContent (){
        this.popup.setContent(this.text)
        this.popup.getElement().classList.remove('is-expanded')
        this.popup.update()
    }
}

const initMap = async function () {
    let map = new LeafletMap()
    let hoverMarker = null
    let activeMarker = null
    await map.load($map)

    /*Array.from(document.querySelectorAll('.js-marker')).forEach((item) =>{
        let marker = map.addMarker(item.dataset.lat, item.dataset.lng, item.dataset.price + '€')
    })*/

    for (var [key,value] of Object.entries(actor)){
        console.log(value)
        let marker = map.addMarker(value[0], value[1], 'text')
        marker.addEventListener('mouseover',function (){
            if (hoverMarker !== null){
                hoverMarker.unsetActive()
            }
            marker.setActive()
            hoverMarker = marker
        })

        marker.addEventListener('mouseleave', function () {
            if (hoverMarker !== null){
                hoverMarker.unsetActive()
            }
        })
        marker.addEventListener('click', function () {
            if (activeMarker !== null){
                activeMarker.resetContent()
            }
            marker.setContent(item.innerHTML)
            activeMarker = marker
        })
    }

   /* map.center()*/
}

if ($map !== null){
    initMap()
}
/*
---------------------------------------------------------------test 2 mapbox END*/

/*Array.from(document.querySelectorAll('.js-marker')).forEach((item) =>{
       let marker = map.addMarker(item.dataset.lat, item.dataset.lng, item.dataset.price + '€')
   })*/


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
