
function mapStart(){

        var iconFeature = new ol.Feature({
          geometry: new ol.geom.Point(ol.proj.transform([32.8597,39.9334], 'EPSG:4326', 'EPSG:3857')),
          name: 'Null Island',
          population: 4000,
          rainfall: 500
        });

        var iconStyle = new ol.style.Style({
          image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
            anchor: [0.5, 46],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            opacity: 0.75,
            src: '../../mapMarker.png'
          }))
        });

        iconFeature.setStyle(iconStyle);

        var vectorSource = new ol.source.Vector({
          features: [iconFeature]
        });

        var vectorLayer = new ol.layer.Vector({
          source: vectorSource
        });



       bingMapLayer = new ol.layer.Tile({

            source: new ol.source.BingMaps({
              key: 'AnBHrWo3nkELg5E_eUZ7rlL0qhPlsIVVzjPCD6_9PlTurfXSjFc_gXFCwmjLOJDB',
              imagerySet: 'AerialWithLabels'
              // use maxZoom 19 to see stretched tiles instead of the BingMaps
              // "no photos at this zoom level" tiles
              // maxZoom: 19
            })
          });

        var map = new ol.Map({
        target: 'map',

          layers: [bingMapLayer,vectorLayer],
          // Improve user experience by loading tiles while dragging/zooming. Will make
          // zooming choppy on mobile or slow devices.
          loadTilesWhileInteracting: true,
          view: new ol.View({
              center: ol.proj.transform([32.8597 ,39.9334], 'EPSG:4326', 'EPSG:3857'),
           zoom: 9,
                    maxZoom: 17
          })
        });
}