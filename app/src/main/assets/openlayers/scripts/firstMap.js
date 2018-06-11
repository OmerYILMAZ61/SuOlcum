var mpbcu = mpbcu || {};
var olMapControl = null;
var layersSave = null;
var sourceFirst=null;
var vectorFirst=null;
var vectorSource=null;
var pointGpsSource=null;
var layersXYZ=null;

function mapStart(){
var attribution = new ol.Attribution({
  html: 'Tiles &copy; <a href="http://maps.nls.uk/townplans/glasgow_1.html">' +
      'National Library of Scotland</a>'
});

layersSave= new ol.layer.Tile({
      source: new ol.source.OSM({
        attributions: [
          new ol.Attribution({
            html: 'Tiles &copy; <a href="http://www.opencyclemap.org/">' +
                'OpenCycleMap</a>'
          }),
          ol.source.OSM.ATTRIBUTION
        ],
        url: '../../../storage/emulated/0/TILES/{z}/{x}/{y}.png',
		crossOrigin: null
      })
    });
	
	bingMapsLayer= new ol.layer.Tile({
                                     source: new ol.source.BingMaps({
                                                                    key: 'AkGbxXx6tDWf1swIhPJyoAVp06H0s0gDTYslNWWHZ6RoPqMpB9ld5FY1WutX8UoF',
                                                                    imagerySet: 'AerialWithLabels'
                                                                    })
                                     });
									 
	//url: '../storage/emulated/0/TILES/{z}/{x}/{y}.png',
 sourceFirst = new ol.source.Vector();

 vectorFirst = new ol.layer.Vector({
  source: sourceFirst,
  style: new ol.style.Style({
    fill: new ol.style.Fill({
      color: 'rgba(255, 255, 255, 0.5)'
    }),
    stroke: new ol.style.Stroke({
      color: '#ff0000',
      width: 2
    }),
    image: new ol.style.Circle({
      radius: 7,
      fill: new ol.style.Fill({
        color: '#ff7700'
      })
    })
  })
});

 var container = document.getElementById('popup');
    content = document.getElementById('popup-content');
    var closer = document.getElementById('popup-closer');
    
    
    /**
     * Create an overlay to anchor the popup to the map.
     */
    overlay = new ol.Overlay(/** @type {olx.OverlayOptions} */ ({
                                                                element: container,
                                                                autoPan: true,
                                                                autoPanAnimation: {
                                                                duration: 250
                                                                }
                                                                }));
    
    
    /**
     * Add a click handler to hide the popup.
     * @return {boolean} Don't follow the href.
     */
    closer.onclick = function() {
        overlay.setPosition(undefined);
        closer.blur();
        return false;
    };
var map = new ol.Map({
  target: 'map',
  controls: ol.control.defaults({
    attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
      collapsible: false
    })
  }),
  layers: [bingMapsLayer,layersSave,vectorFirst],
                     overlays: [overlay],
  view: new ol.View({
	  center: ol.proj.transform([32.8597 ,39.9334], 'EPSG:4326', 'EPSG:3857'),
    zoom: 9,
                    maxZoom: 13
  })
});

map.once('postrender', function(){
 JsHandler.jsFnCallAddVector();
});

vectorSource = new ol.source.Vector({
                    //create empty vector
                });
                var iconStyle = new ol.style.Style({
                    image: new ol.style.Icon(({
                        anchor: [0.5, 46],
                        anchorXUnits: 'fraction',
                        anchorYUnits: 'pixels',
                        opacity: 0.9,
                        src: '../../mapMarker.png'
                    }))
                });

                var vectorLayer = new ol.layer.Vector({
                    source: vectorSource,
                    style: iconStyle
                });
                map.addLayer(vectorLayer);
				
				
pointGpsSource = new ol.source.Vector({
                    //create empty vector
                });
                var iconGpsStyle = new ol.style.Style({
                    image: new ol.style.Icon(({
                        anchor: [1, 5],
                        anchorXUnits: 'fraction',
                        anchorYUnits: 'pixels',
                        opacity: 0.9,
                        src: '../../gpsMarker.png'
                    }))
                });

                var vectorGpsLayer = new ol.layer.Vector({
                    source: pointGpsSource,
                    style: iconGpsStyle
                });
                map.addLayer(vectorGpsLayer);				

olMapControl=map;
}