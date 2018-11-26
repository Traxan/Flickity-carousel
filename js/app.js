//Add slides from array

  var templateItem = document.getElementById('template_item').innerHTML;

  Mustache.parse(templateItem);

  var listItems = '';

  for(var i = 0; i < slideList.length; i++){
    listItems += Mustache.render(templateItem, slideList[i]);
  }

  var fullSlidesList = Mustache.render(templateItem, {slides: listItems});

  var results = document.querySelector('.main-carousel');
  results.insertAdjacentHTML('beforeend', fullSlidesList);

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

        console.log(markers);
        markers[i].addListener('click', function(){
          flkty.select(this.id);
        });
    }
}
