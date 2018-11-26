//Slides - generator

  var templateItem = document.getElementById('template_item').innerHTML;

  Mustache.parse(templateItem);

  var listItems = '';

  for(var i = 0; i < slideList.length; i++){
    listItems += Mustache.render(templateItem, slideList[i]);
  }

  var results = document.querySelector('.main-carousel');
  results.insertAdjacentHTML('beforeend', listItems);

//Options

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

//Reset button

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
