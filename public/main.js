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

// var del = document.getElementById('delete')
var checkDrinks = false;
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

function deleteDrinks() {
  fetch('deleteAll', {
    method: 'delete',
    headers: {'Content-Type': 'application/json'}
  }).then(data => {
    document.getElementById('js-delete-all').innerHTML = 'Delete All'
    while (log.hasChildNodes()) {
      log.removeChild(log.lastChild);
    }
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
    var container = document.createElement('div')
    container.className='itemContainer'
    var type = document.createElement('p')
    type.innerHTML = item.type
    container.append(type)
    var date = document.createElement('p')
    date.innerHTML = timeago(item.date)
    container.append(date)
    log.prepend(container)
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
