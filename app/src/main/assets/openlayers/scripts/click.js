function mapStart(){

  debugger;
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

    //map merkezi
    var view = new ol.View({
      center: ol.proj.transform([32.8597 ,39.9334], 'EPSG:4326', 'EPSG:3857'),
         zoom: 9,
         maxZoom: 17
    })

    //marker icon
    var iconStyle = new ol.style.Style({
      image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        opacity: 0.75,
        src: '../../mapMarker.png'
      }))
    });
    //marker ankara
    var iconAnkara = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.transform([32.8597,39.9334], 'EPSG:4326','EPSG:3857')),
      name: 'Ankara',
      population: 4000,
      rainfall: 500
    });

    //marker trabzon
    var iconTrabzon = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.transform([39.716763,41.002697], 'EPSG:4326','EPSG:3857')),
      name: 'Trabzon',
      population: 4000,
      rainfall: 500
    });

    iconAnkara.setStyle(iconStyle);
    iconTrabzon.setStyle(iconStyle);
    //marker dizisi kaynağı
    var vectorSource = new ol.source.Vector({
      features: [iconAnkara,iconTrabzon]
    });
    //kaynaktan layere
    var vectorLayer = new ol.layer.Vector({
      source: vectorSource
    });
    //mapOSM
      var layer = new ol.layer.Tile({
            source: new ol.source.OSM()
          });
    //map oluşturma
    var map = new ol.Map({
      layers: [layer, vectorLayer],
      overlays: [overlay],
      target: document.getElementById('map'),
      view: view
      });

//mapOnClick
  map.on('click', function(evt)
  {
    var feature = map.forEachFeatureAtPixel(evt.pixel,function(feature, layer) {
          return feature;
        });
    if (feature) {
      var geometry = feature.getGeometry();
      var coord = geometry.getCoordinates();
      var name = feature.get('name');

          if(name!=null){

            content.innerHTML =
            '<b>Ölçüm Noktası</b>'+'<br>'+
            '<b>-----------------</b>'+'<br>'+
            '<b>Havza &emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;:</b>'+'<br>'+
            '<b>İl &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp&nbsp&nbsp:</b>'+name+'<br>'+
            '<b>Mahalle/Köy &emsp;&emsp;&nbsp;&nbsp;  :</b>'+' <br>'+
            '<b>Kod &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;&nbsp;:</b>'+' <br>'+
            '<b>Gerçek Ölçüm Noktası:  </b>'+' <br>'+
            '-----------------------------------------------------<br>'+
            '<button type="button"style="height:25px;width:70px;" onclick="myFunction()">Detay</button>'+
            '<button align=”right” type="button"style="height:25px;width:70px;float:right;" onclick="myFunction()">Analiz</button><br>'+
            '-----------------------------------------------------<br>'+
            '<button type="button" style="height:25px;width:100%" onclick="myFunction()">Referans Noktası ekle</button>';
            overlay.setPosition(coord);
          }
      }else{
        overlay.setPosition(undefined);
        closer.blur();
      }
  });

    var geolocation = new ol.Geolocation({
      projection: view.getProjection()
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

    geolocation.on('change:position', function() {
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

function myFunction() {
      JsHandler.showToast("hoayda");
      alert("Hello! I am an alert box!");
};