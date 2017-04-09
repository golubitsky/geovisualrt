var feed;

function readRSSFeed(){
  var url = 'https://landsat.usgs.gov/landsat/rss/Landsat_L1T.rss'
  return feednami.load(url)
}

var imageCounter = 0;
function displayOneImage(entries){
  if (entries[imageCounter] == undefined){
    // loop around to 0
    imageCounter = 0
  }

  var entry = entries[imageCounter];
  var landsatImage = createImageElement(entry["guid"])

  var content = document.getElementById('landsat-display')
  content.innerHTML = '';
  content.innerHTML += `<a href=${entry["guid"]}>${entry["title"]}</a><br>`
  content.innerHTML += `Location: ${entry["geo:lat"]["#"]}, ${entry["geo:long"]["#"]}`

  content.appendChild(landsatImage);

  imageCounter++;
}

function commenceLoopImages(entries){
  var interval = setInterval(function(){displayOneImage(entries)}, 6000);
}

function createImageElement(sourceUrl){
  var imgElement = document.createElement('img');
  imgElement.src = sourceUrl;

  return imgElement;
}

function commenceOperationLandsat(){
  readRSSFeed()
    .then(feed => {
      commenceLoopImages(feed.entries)
    });
}
