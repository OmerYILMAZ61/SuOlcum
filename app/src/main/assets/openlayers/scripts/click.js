var name;

function mapStart(){

  debugger;
  //-------------------------------------------
  //popup
  var container = document.getElementById('popup');
  var content = document.getElementById('popup-content');
  var closer = document.getElementById('popup-closer');
  var overlay = new ol.Overlay({
        element: container,
        autoPan: true,
        autoPanAnimation: {
        duration: 250
        }
    });
  closer.onclick = function() {
        overlay.setPosition(undefined);
        closer.blur();
        return false;
  };
  //**popup
//---------------------------------------------
  //map merkezi
  var view = new ol.View({
      center: ol.proj.transform([32.8597 ,39.9334], 'EPSG:4326', 'EPSG:3857'),
         zoom: 9,
         maxZoom: 17
    })
//-------------------------------------
  //marker icon
  var olcumStyle = new ol.style.Style({
    image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
      anchor: [0.5, 46],
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      opacity: 0.75,
      src: '../../mapMarker.png'
    }))
  });

  //marker ankara
  var olcumAnkara = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.transform([32.8597,39.9334], 'EPSG:4326','EPSG:3857')),
    name: 'Ankara',
    title:'olcum',
    });
  //marker trabzon
  var olcumTrabzon = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.transform([39.716763,41.002697], 'EPSG:4326','EPSG:3857')),
    name: 'Trabzon',
    title:'olcum',
   });

  olcumAnkara.setStyle(olcumStyle);
  olcumTrabzon.setStyle(olcumStyle);
//--------------------------------------------------
  //Baskı icon
  var baskiStyle = new ol.style.Style({
      image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        opacity: 0.75,
        src: '../../icon.png'
      }))
  });

    //baski corum
  var baskiCorum = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.transform([34.9537,40.5499], 'EPSG:4326','EPSG:3857')),
      name: 'Çorum',
      title:'baski',
  });

   baskiCorum.setStyle(baskiStyle);

//----------------------------------------------------------

  //marker dizisi kaynağı
  var vectorSource = new ol.source.Vector({
    features: [olcumAnkara,olcumTrabzon,baskiCorum]
  });

  //kaynaktan layere
  var vectorLayer = new ol.layer.Vector({
    source: vectorSource
  });
  //mapOSM

  bingMapsLayer= new ol.layer.Tile({
      source: new ol.source.BingMaps({
            key: 'AnBHrWo3nkELg5E_eUZ7rlL0qhPlsIVVzjPCD6_9PlTurfXSjFc_gXFCwmjLOJDB',
            imagerySet: 'AerialWithLabels'
                                     })
  });
  //map oluşturma
  var map = new ol.Map({
    layers: [bingMapsLayer, vectorLayer],
    overlays: [overlay],
    target: document.getElementById('map'),
    view: view
    });
//------------------------------------------------
  //mapOnClick
  map.on('click', function(evt)
  {
    var feature = map.forEachFeatureAtPixel(evt.pixel,function(feature, layer) {
          return feature;
        });
    if (feature) {
      var geometry = feature.getGeometry();
      var coord = geometry.getCoordinates();
      name = feature.get('name');
      kim = feature.get('title');

          if(name!=null&&kim=='olcum'){
                        content.innerHTML =
                        '<small><b>Ölçüm Noktası</b>'+'</small><br>'+
                        '<small><b>-----------------</b>'+'</small><br>'+
                        '<small><b>Havza &emsp;&emsp;&emsp;:</b>'+'</small><br>'+
                        '<small><b>İl &emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;:</b>'+name+'</small><br>'+
                        '<small><b>Mahalle/Köy  :</b>'+' </small><br>'+
                        '<small><b>Kod &emsp;&emsp;&emsp;&emsp;:</b>'+' </small><br>'+
                        '<small><b>Gerçek Ölçüm Noktası:  </b>'+' </small><br>'+
                        '<small><b>------------------------------------</b></small><br>'+
                        '<button type="button"style="height:25px;width:70px;" onclick="detayGoster()">Detay</button>'+
                        '<button align=”right” type="button"style="height:25px;width:70px;float:right;" onclick="myFunction()">Analiz</button><br>'+
                        '<small><b>------------------------------------</b></small><br>'+
                        '<button type="button" style="height:25px;width:100%" onclick="referansNoktasiEkle(\''+name+'\')">Referans Noktası ekle</button>';
                        overlay.setPosition(coord);
          }
          else if(name!=null&&kim=='baski'){
                        content.innerHTML =
                        '<small><b>Baskı Noktası</b>'+'</small><br>'+
                        '<small><b>-----------------</b>'+'</small><br>'+
                        '<small><b>Baskı Türü &emsp;:</b>'+'</small><br>'+
                        '<small><b>Baskı Adı &emsp;&nbsp;&nbsp;:</b>'+name+'</small><br>'+
                        '<small><b>Ölçü Noktası  :</b>'+' </small><br>'+
                        '<small><b>------------------------------------</b></small><br>'+
                        '<button type="button"style="height:25px;width:100%;float:center;" onclick="detayGosterBaski()">Detay</button>';
                        overlay.setPosition(coord);
          }

      }else{
        overlay.setPosition(undefined);
        closer.blur();
      }
  });
//----------------------------------------

  var geolocation = new ol.Geolocation({
     projection: view.getProjection(),
   });
 geolocation.setTracking(true);


  var accuracyFeature = new ol.Feature();

  geolocation.on('change:accuracyGeometry', function() {
    accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
  });

  var positionFeature = new ol.Feature();

   positionFeature.setStyle(new ol.style.Style({
    image: new ol.style.Circle({
       radius: 6,
       fill: new ol.style.Fill({
         color: '#3399CC'
       }),
       stroke: new ol.style.Stroke({
         color: '#fff',
         width: 2
       })
     })
   }));

   geolocation.on('change:position', function(){
     var coordinates = geolocation.getPosition();
     positionFeature.setGeometry(coordinates ?
       new ol.geom.Point(coordinates) : null);
   });

    new ol.layer.Vector({
      map: map,
      source: new ol.source.Vector({
        features: [accuracyFeature, positionFeature]
      })
    });

}

function referansNoktasiEkle(name) {
     var geri =  JsHandler.showToast(name);
     alert(geri);
};

function myFunction() {
      JsHandler.showToast("Analiz");

};

function detayGoster() {
      JsHandler.detayGoster();

};
function detayGosterBaski() {
      alert('Baski Göster');

};