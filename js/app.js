//Add slides from array

  var templateItem = document.getElementById('template_item').innerHTML;

  Mustache.parse(templateItem);

  var listItems = '';

  for(var i = 0; i < slideList.length; i++){
    listItems += Mustache.render(templateItem, slideList[i]);
  }

  var results = document.querySelector('.main-carousel');
  results.insertAdjacentHTML('beforeend', listItems);

//Carousel options

var elem = document.querySelector('.main-carousel');
var flkty = new Flickity( elem, {
  cellAlign: 'left',
  contain: true,
  hash: true
});

//Progress Bar

var progressBar = document.querySelector('.progress-bar')

flkty.on( 'scroll', function( progress ) {
  progress = Math.max( 0, Math.min( 1, progress ) );
  progressBar.style.width = progress * 100 + '%';
});

//Reset Button

var buttonGroup = document.querySelector('.button-group');
var buttons = buttonGroup.querySelectorAll('.button');
buttons = fizzyUIUtils.makeArray(buttons);

buttonGroup.addEventListener('click', function (event) {

    if (!matchesSelector(event.target, '.button')) {
        return;
    }
    var index = buttons.indexOf(event.target);
    flkty.select(index);
});

//Google Maps

window.initMap = function () {

    var markers = [];
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 34.052368, lng: -118.247412 },
        zoom: 6
    });

    for (var i = 0; i < slideList.length; i++) {
            markers[i] = new google.maps.Marker({
            position: slideList[i].coords,
            map: map,
            id: i
        });
        markers[i].addListener('click', function(){
          flkty.select(this.id);
        });
    }

    flkty.on('change', function(index) {
      smoothPanAndZoom(map, 4, slideList[index].coords)
    });

}
// function for smooth moving of the map

function smoothPanAndZoom (map, zoom, coords) {
    
    var jumpZoom = zoom - Math.abs(map.getZoom() - zoom);
    jumpZoom = Math.min(jumpZoom, zoom -1);
    jumpZoom = Math.max(jumpZoom, 3);

    smoothZoom(map, jumpZoom, function(){
        smoothPan(map, coords, function(){
            smoothZoom(map, zoom); 
        });
    });
};

function smoothZoom (map, zoom, callback) {
    var startingZoom = map.getZoom();
    var steps = Math.abs(startingZoom - zoom);

    if(!steps) {
        if(callback) {
            callback();
        }
        return;
    }

    var stepChange = - (startingZoom - zoom) / steps;

    var i = 0;
    var timer = window.setInterval(function(){
        if(++i >= steps) {
            window.clearInterval(timer);
            if(callback) {
                callback();
            }
        }
        map.setZoom(Math.round(startingZoom + stepChange * i));
    }, 80);
};

function smoothPan (map, coords, callback) {
    var mapCenter = map.getCenter();
    coords = new google.maps.LatLng(coords);

    var steps = 12;
    var panStep = {lat: (coords.lat() - mapCenter.lat()) / steps, lng: (coords.lng() - mapCenter.lng()) / steps};

    var i = 0;
    var timer = window.setInterval(function(){
        if(++i >= steps) {
            window.clearInterval(timer);
            if(callback) callback();
        }
        map.panTo({lat: mapCenter.lat() + panStep.lat * i, lng: mapCenter.lng() + panStep.lng * i});
    }, 1000/30);
}; 
