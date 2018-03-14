var url = 'http://masisa.ctha.cl:80/geoserver/masisa/wms';  
var predios= L.tileLayer.betterWms(url, {
    layers: 'masisa:predios',
    transparent: true,
    format: 'image/png'
});

var estaciones= L.tileLayer.betterWms(url, {
    layers: 'masisa:estacion',
    transparent: true,
    format: 'image/png'
});  

var mbAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
'Imagery © <a href="http://mapbox.com">Mapbox</a>',
mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw';

var grayscale   = L.tileLayer(mbUrl, {id: 'mapbox.light', attribution: mbAttr}),
streets  = L.tileLayer(mbUrl, {id: 'mapbox.streets',   attribution: mbAttr});

var OpenTopoMap = L.tileLayer('http://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});
var Stamen_Toner = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.{ext}', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: 'abcd',
    minZoom: 0,
    maxZoom: 20,
    ext: 'png'
});


var HERE_hybridDay = L.tileLayer('http://{s}.{base}.maps.cit.api.here.com/maptile/2.1/{type}/{mapID}/hybrid.day/{z}/{x}/{y}/{size}/{format}?app_id={app_id}&app_code={app_code}&lg={language}', {
    attribution: 'Map &copy; 1987-2014 <a href="http://developer.here.com">HERE</a>',
    subdomains: '1234',
    mapID: 'newest',
    app_id: 'oenPwMCqbQkUSqj1WhRx',
    app_code: 'kBxLcdTofTHUlsT7tl2X5w',
    base: 'aerial',
    maxZoom: 20,
    type: 'maptile',
    language: 'eng',
    format: 'png8',
    size: '256'
});

var map = L.map('map', {
    fullscreenControl: true,
    fullscreenControlOptions: {
        position: 'topleft'
    },
    center: [-37.2859, -72.2418],
    zoom: 7,
    layers: [OpenTopoMap, predios]
});    

var baseLayers = {
    "Mapa": OpenTopoMap,
    "Calles": streets,
    "Híbrido": HERE_hybridDay,
    "Escala de gris": grayscale,
    "Blanco Negro":Stamen_Toner
};

var overlays = {
    "Predios": predios,
    "Estaciones IDF": estaciones
};

L.control.layers(baseLayers, overlays).addTo(map);
L.control.mousePosition().addTo(map);

var marker=null;
function onMapClick(e) {        

    $('.nav-tabs a[href="#tab1"]').tab('show');
    if(marker==null){
        marker = L.marker(e.latlng).addTo(map);
    }
    else{
        var marker2=marker;
        marker = L.marker(e.latlng).addTo(map);       
        map.removeLayer(marker2); 
    }
}
map.on('click', onMapClick);