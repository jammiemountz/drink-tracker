/* globals fetch */
var wine = document.getElementById('js-log-wine')
var beer = document.getElementById('js-log-beer')
var mixed = document.getElementById('js-log-mixed')
var mood = document.getElementById('js-log-mood')
var log = document.getElementById('js-log')

beer.addEventListener('click', eventListener.bind('beer'))
wine.addEventListener('click', eventListener.bind('wine'))
mixed.addEventListener('click', eventListener.bind('mixed'))
mood.addEventListener('click', eventListener.bind('mood'))

// var del = document.getElementById('delete')

getDrinks()

function getDrinks() {
  fetch('drinks', {
    method: 'get',
    headers: {'Content-Type': 'application/json'}
  }).then(response => {
    return response.json();
  })
  .then(data => {
    appendToLog(data)
  })
}

function eventListener(e) {
  fetch('drinks', {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'type': e.target.dataset.type,
      'date': new Date(),
    })
  })
  .then(response => {
    if (response.ok) {
      return response.json()
    }
  })
  .then(data => {
    appendToLog(data)
  })
}

function appendToLog(data) {
  while (log.hasChildNodes()) {
    log.removeChild(log.lastChild);
  }
  data.map(function(item) {
    var p = document.createElement('p')
    p.innerHTML = item.type
    log.prepend(p)
  })
}


// del.addEventListener('click', function () {
//   fetch('quotes', {
//     method: 'delete',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       'name': 'Darth Vader'
//     })
//   }).then(function (response) {
//     window.location.reload()
//   })
// })
