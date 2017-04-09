function createView(lat, lon, zoom){
  return new ol.View({
    center: ol.proj.fromLonLat([lon, lat]),
    zoom: zoom
  })
}

function setMapCenter(map, lat, lon, zoom){
  if (zoom === undefined){
    zoom = 5;
  }
  var view = createView(lat, lon, zoom)
  map.setView(view)
}

function drawPoint(){
  //http://openlayers.org/en/latest/examples/draw-features.html
  var draw = new ol.interaction.Draw({
    source: source,
    type: /** @type {ol.geom.GeometryType} */ 'Point'
  });

  map.addInteraction(draw);
}
