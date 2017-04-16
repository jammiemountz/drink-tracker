$( document ).ready(function() {
  var checkDrinks = false;

  function appendToLog(data) {
    $('#js-log').empty();
    data.map(function(item, index) {
      if (data[index-1] && !data[index-1].date.isSame(item.date, 'day')) {
        var newDay = document.createElement('p');
        newDay.innerHTML = data[index-1].date.format("ddd, MMM Do, h:mm a");
        $('#js-log').prepend(newDay)
      }
      var container = $('<div class="itemContainer"></div>').attr("data-id", item.id)
      var type = document.createElement('p')
      type.innerHTML = item.type
      container.append(type)
      var date = document.createElement('p')
      date.innerHTML = item.date.fromNow()
      container.append(date)
      var deleteIcon = $('<div class="deleteIcon"></div>');
      deleteIcon.on('click', function() {
        var body = JSON.stringify({
          id: item.id,
        })
        drinkTracker.storage.delete(body, emptyOne.bind(null, item.id))
      })
      container.append(deleteIcon)
      $('#js-log').prepend(container)
    })
  }

  function deleteAllCheck() {
    document.getElementById('js-delete-all').innerHTML = 'Are you sure?'
  }

  function emptyLog() {
    document.getElementById('js-delete-all').innerHTML = 'Delete All'
    $('#js-log').empty()
  };

  function emptyOne(id) {
    var removedItem = $('.itemContainer').filter(function(index, item) {
      return ($(item).attr('data-id') === id);
    })
    removedItem.remove();
  };

  function makeModels(data) {
    $.map(data, function(item) {
      drinkTracker.model.create(item);
    });
    appendToLog(drinkTracker.storage._items)
    appendToPage(drinkTracker.storage.getTodayDrinks())
  }

  function appendToPage(today) {
    var drink = 'drink';
    var amount = 'no';
    if (today.length === 0 || today.length > 1) {
      drink += 's';
    }
    if (today.length !== 0) {
      amount = today.length;
    }
    $('#js-amount-span').html(amount + ' ' + drink)
  }

  /*global app, $on */
  // (function () {
  	// 'use strict';

  	/**
  	 * Sets up a brand new Todo list.
  	 *
  	 * @param {string} name The name of your new to do list.
  	 */
  	function DrinkTracker() {
  		this.storage = new app.Store();
  		this.model = new app.Model(this.storage);
  		// this.template = new app.Template();
  		// this.view = new app.View(this.template);
  		// this.controller = new app.Controller(this.model, this.view);
  	}

    var deleteAll = document.getElementById('js-delete-all')
  	var drinkTracker = new DrinkTracker();
    function getStuff() {
      drinkTracker.storage.removeAll();
      return drinkTracker.storage.findAll('all', makeModels);
    }
    drinkTracker.storage.findAll('all', makeModels)
    deleteAll.addEventListener('click', drinkTracker.storage.deleteAll.bind(drinkTracker.storage, deleteAllCheck, emptyLog))

    function eventListener(e) {
      var body = JSON.stringify({
        'type': e.target.dataset.type,
        'date': new Date(),
      })
      drinkTracker.storage.save(body, getStuff)
    }

    function scrollUp() {
      var app = $('#app');
      if (app.hasClass('scrollUp')) {
        app.removeClass('scrollUp')
      } else {
        $('#app').addClass('scrollUp');
      }
    }

    var wine = document.getElementById('js-log-wine');
    var beer = document.getElementById('js-log-beer');
    var mixed = document.getElementById('js-log-mixed');
    var feels = document.getElementById('js-log-feels');
    var log = document.getElementById('js-log');
    var amountSection = document.getElementById('js-amountSection');

    beer.addEventListener('click', eventListener.bind('beer'));
    wine.addEventListener('click', eventListener.bind('wine'));
    mixed.addEventListener('click', eventListener.bind('mixed'));
    feels.addEventListener('click', eventListener.bind('feels'));
    amountSection.addEventListener('click', scrollUp);
})
