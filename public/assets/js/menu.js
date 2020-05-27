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

for (var i=0; i<count; i++){
    let name=$('.position'+i).data('name')
    let description=$('.position'+i).data('description')
    let latitude = $('.position'+i).data ('latitude')
    let longitude = $ ('.position'+i).data ('longitude')
    actor['position'+i] = [latitude,longitude,name,description]
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
                this.bounds.push([latitudeM,longitudeM])

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
        /*this.bounds.push(point)*/
        return new LeafletMarker(point, text, this.map)
    }



    remove(){
        var group =  document.getElementsByClassName('marker')
        /*console.log(group)*/
        for (var i=0; i<group.length ;i++){

            group[i].remove()
        }
    }

   center (){
        this.map.fitBounds(this.bounds)
        this.map.setZoom(15)
       if (latitudeM == '' && longitudeM == ''){
           this.map.setZoom(6.5)
       } else {
           this.map.setZoom(15)
       }
    }

    click()
    {
        this.map.on('click',function(){
            /*console.log(map.latlng)*/
        })
    }

    selectCategory (map){
        $('.map_checkbox').change(function(){
            var targetName = $(this).data('target')
            var target = $('.'+targetName)


            for (let item of target){
                var check = $(this).prop('checked')
                if (check){
                    item.checked = true
                } else{
                    item.checked = false
                }
            }



            var $checkboxCategory = document.getElementsByClassName('map_checkbox_category')
            var $checkboxSubCategory = document.getElementsByClassName('map_checkbox_subCategory')



            var ajaxCategory = []

            for (let item of $checkboxCategory){

                if (item.checked == true){
                    ajaxCategory.push($(item).data('category'))
                }
            }

            var ajaxSubCategory = []

            for (let item of $checkboxSubCategory){
                if (item.checked == true){
                    ajaxSubCategory.push($(item).data('subcategory'))
                }
            }
            console.log(ajaxSubCategory)

            $.ajax({
                url:$('#url_ajax').data('path'),
                type:'POST',
                data:{
                    ajaxcategory: ajaxCategory,
                    ajaxsubcategory: ajaxSubCategory
                },
                dataType: 'JSON',
                success: function (result) {
                    for(let [key,item] of Object.entries(result)){
                        let text = '<div><h3>'+key+'</h3>'
                        text+='<p class="description">'+item[2]+'</p> </div>'
                        map.addMarker(parseFloat(item[0]), parseFloat(item[1]), text)
                    }
                }
            })
        });
    }

    drag(map){
        this.map.on('dragend', function () {
            var group = document.getElementsByClassName('marker')
            while(group.length > 0){
                for(let item of group){
                    item.remove()
                }
            }

            var center = map.getCenter()

            $.ajax({
                url:$('#url_ajax').data('path'),
                type:'POST',
                data:{
                    center: center
                },
                dataType: 'JSON',
                success: function (result) {
                    for(let [key,item] of Object.entries(result)){
                        let text = '<div><h3>'+key+'</h3>'
                        text+='<p class="description">'+item[2]+'</p> </div>'
                        map.addMarker(parseFloat(item[0]), parseFloat(item[1]), text)
                    }
                }
            })
        })
    }

    getCenter() {
        var result = []
        result.push(this.map.getCenter().lat)
        result.push(this.map.getCenter().lng)
        return result
    }

}

class LeafletMarker {
    constructor (point, text, map) {
        this.text = text
        this.popup = L.popup({
            autoClose: false,
            closeOnEscapeKey: false,
            closeOnClick: false,
            closeButton: false,
            className: 'marker',
            maxWidth: 400
        })

            .setLatLng([parseFloat(point[0]),parseFloat(point[1])])
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

        let text = '<div><h3>'+value[2]+'</h3>'
        text+='<p class="description">'+value[3]+'</p> </div>'
        var marker = map.addMarker(parseFloat(value[0]),parseFloat(value[1]), text, {draggable:true})


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
            marker.setContent(marker.innerHTML)
            activeMarker = marker
        })

        activeMarker = marker

    }
    map.center()
    map.drag(map)
    map.remove()
    map.click()
    map.selectCategory(map)
}



if ($map !== null){
    initMap()
}

/*---------------------------------------- CHECKBOX*/

/*$(document).ready(function(){
    $('.map_checkbox_category').change(function(){
        console.log('test Category')
    });
});

$(document).ready(function(){
    $('.map_checkbox_subCategory').change(function(){
        console.log('test subCategory')
    });
});*/


/*$(document).ready(function(){
    $('.map_checkbox').change(function(){
        var $checkboxCategory = document.getElementsByClassName('map_checkbox_category')
        var $checkboxSubCategory = document.getElementsByClassName('map_checkbox_subCategory')

        var ajaxCategory = []

        for (let item of $checkboxCategory){

            if (item.checked == true){
               ajaxCategory.push($(item).data('category'))
            }
        }

        var ajaxSubCategory = []

        for (let item of $checkboxSubCategory){
            if (item.checked == true){
                ajaxSubCategory.push($(item).data('subcategory'))
            }
        }
        console.log(ajaxSubCategory)
    });
});*/
