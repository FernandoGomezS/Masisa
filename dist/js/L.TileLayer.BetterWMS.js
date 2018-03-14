var var_k;
var var_m;
var var_n;

var nombrePredio;
var empresaPredio;
var codigoPredio;
var area_hecPredio;
var lonPredio;
var latPredio;

var nombreIDF;
var latitudIDF;
var longitudIDF;


L.TileLayer.BetterWMS = L.TileLayer.WMS.extend({
  
  onAdd: function (map) {
    // Triggered when the layer is added to a map.
    //   Register a click listener, then do all the upstream WMS things
    L.TileLayer.WMS.prototype.onAdd.call(this, map);
    map.on('click', this.getFeatureInfo, this);
  },
  
  onRemove: function (map) {
    // Triggered when the layer is removed from a map.
    //   Unregister a click listener, then do all the upstream WMS things
    L.TileLayer.WMS.prototype.onRemove.call(this, map);
    map.off('click', this.getFeatureInfo, this);
  },
  
  getFeatureInfo: function (evt) {
    // Make an AJAX request to the server and hope for the best
    var url = this.getFeatureInfoUrl(evt.latlng),
        showResults = L.Util.bind(this.showGetFeatureInfo, this);
    $.ajax({
      url: url,
      success: function (data, status, xhr) {       

         var length = Object.keys(data.features).length;      

        if(length>0){          
          nombrePredio=data.features[0].properties.nombre;
          empresaPredio=data.features[0].properties.empresa;
          codigoPredio=data.features[0].properties.codigo;
          area_hecPredio=data.features[0].properties.area_hec.toFixed(2);
          latPredio=evt.latlng.lat;
          lonPredio=evt.latlng.lng;

          $.getJSON("predioInfo.php", { latitud :  evt.latlng.lat, longitud : evt.latlng.lng}, success = function(data){

            nombreIDF=data[0].nombre;
            latitudIDF=data[0].latitud;
            longitudIDF=data[0].longitud;

            var distancia=((data[0].distancia)/1000).toFixed(2);
            var_k=data[0].var_k;
            var_m=data[0].var_m;
            var_n=data[0].var_n;
            document.getElementById('predio').innerHTML ="<div class='callout callout-success'> <h4><i class='icon fa fa-map-marker'></i> &nbsp;Predio Selecionado</h4><dl><dt>Nombre </dt><dd>"+nombrePredio+"</dd><dt>Empresa</dt><dd>"+empresaPredio+"</dd><dt>Código</dt><dd>"+codigoPredio+"</dd><dt>Área</dt><dd>"+area_hecPredio+" <b>ha</b></dd><dt>Coordenadas</dt><dd>"+evt.latlng+"</dd></dl><h4><i class='icon fa fa-cloud'></i> &nbsp; Estación IDF maś cercana</h4><dl><dt>Nombre </dt><dd>"+nombreIDF+"</dd><dt>Latitud</dt><dd>"+latitudIDF+"</dd><dt>Longitud</dt><dd>"+longitudIDF+"</dd><dt>Distancia del predio</dt><dd>"+distancia+"<b> &nbsp;Km.</b></dd></dl></div><div class='box-footer'><button type='button' id='btnPaso1' onclick='activaTab(2)'class='btn  btn-primary  pull-right'>Siguiente</button></div>";

          
        }).fail( function(d, textStatus, error) {
            console.error("getJSON failed, status: " + textStatus + ", error: "+error );
        });


        }
        else{
          document.getElementById('predio').innerHTML =  "<div class='callout callout-danger'> <h4><i class='icon fa fa-ban'></i> &nbsp;Alerta!</h4><dl><dt>Selecione un Predio correcto en el mapa </dt></div>";

        }
      },
      error: function (xhr, status, error) {
        showResults(error);  
      }
    });
  },
  
  getFeatureInfoUrl: function (latlng) {
    // Construct a GetFeatureInfo request URL given a point
    var point = this._map.latLngToContainerPoint(latlng, this._map.getZoom()),
        size = this._map.getSize(),
        
        params = {
          request: 'GetFeatureInfo',
          service: 'WMS',
          srs: 'EPSG:4326',
          styles: this.wmsParams.styles,
          transparent: this.wmsParams.transparent,
          version: this.wmsParams.version,      
          format: this.wmsParams.format,
          bbox: this._map.getBounds().toBBoxString(),
          height: size.y,
          width: size.x,
          layers: this.wmsParams.layers,
          query_layers: this.wmsParams.layers,
          info_format: 'application/json'
        };
    
    params[params.version === '1.3.0' ? 'i' : 'x'] = point.x;
    params[params.version === '1.3.0' ? 'j' : 'y'] = point.y;
    
    return this._url + L.Util.getParamString(params, this._url, true);
  },
  
  showGetFeatureInfo: function (err, latlng, content) {
    if (err) { console.log(err); return; } // do nothing if there's an error
    
    // Otherwise show the content in a popup, or something.

  }
});

L.tileLayer.betterWms = function (url, options) {
  return new L.TileLayer.BetterWMS(url, options);  
};