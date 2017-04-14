/* globals fetch */
var wine = document.getElementById('js-log-wine')
var beer = document.getElementById('js-log-beer')
var mixed = document.getElementById('js-log-mixed')
var mood = document.getElementById('js-log-mood')
var log = document.getElementById('js-log')
var deleteAll = document.getElementById('js-delete-all')

beer.addEventListener('click', eventListener.bind('beer'))
wine.addEventListener('click', eventListener.bind('wine'))
mixed.addEventListener('click', eventListener.bind('mixed'))
mood.addEventListener('click', eventListener.bind('mood'))
deleteAll.addEventListener('click', deleteAllButton)

var checkDrinks = false;
getDrinks()

function appendToLog(data) {
  $('#js-log').empty();
  data.map(function(item) {
    var container = $('<div class="itemContainer"></div>')
    var type = document.createElement('p')
    type.innerHTML = item.type
    container.append(type)
    var date = document.createElement('p')
    date.innerHTML = timeago(item.date)
    container.append(date)
    $('#js-log').append(container)
  })
}

function deleteAllButton() {
  if (checkDrinks) {
    console.log('deleting')
    deleteDrinks()
  } else {
    console.log('checking')
    checkDrinks = true;
    document.getElementById('js-delete-all').innerHTML = 'Are you sure?'
  }
}
