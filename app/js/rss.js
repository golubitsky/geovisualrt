var feed;

function readRSSFeed(){
  var url = 'https://landsat.usgs.gov/landsat/rss/Landsat_L1T.rss'
  return feednami.load(url)
}

var imageCounter = 0;
function displayOneImage(entries, map){
  if (entries[imageCounter] == undefined){
    // loop around to 0
    imageCounter = 0
  }
  var $content = $('#landsat-display')

  var entry = entries[imageCounter];

  // show the image
  var url = entry["guid"];
  var landsatImage = createImage(url)
  $content.html('')
  $content.append(landsatImage);

  // caption the image
  var latitude = parseFloat(entry["geo:lat"]["#"]);
  var longitude = parseFloat(entry["geo:long"]["#"]);
  var locationText = `Location: ${latitude}, ${longitude}`;
  var locationSpan = $('<span />')
    .attr('id','landsat-location')
    .html(locationText);
  $content.append(locationSpan);

  var titleSpan = $('<span />')
    .attr('id','landsat-caption')
    .html(entry["title"]);
  $content.append(titleSpan);

  // center the map on image location
  var zoomLevel = 4; // 1 => super zoomed out
  setMapCenter(map, latitude, longitude, zoomLevel)

  // next time show next image
  imageCounter++;
}

function commenceLoopImages(entries, map){
  // displayOneImage(entries, map)
  var interval = setInterval(function(){displayOneImage(entries, map)}, 6000);
}

function createImage(sourceUrl){
  var imgElement = document.createElement('img');
  imgElement.src = sourceUrl;
  imgElement.width = 600;
  return imgElement;
}

function commenceOperationLandsat(map){
  readRSSFeed()
    .then(feed => {
      commenceLoopImages(feed.entries, map)
    });
}
