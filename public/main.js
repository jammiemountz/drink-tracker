$( document ).ready(function() {

  function makeModels(data) {
    $.map(data, function(item) {
      drinkTracker.model.create(item);
    });
    drinkTracker.view.renderLog(drinkTracker.storage._items);
    deleteOnClicks();
  }

  function deleteOnClicks() {
    $.each($('.deleteIcon'), function(index, deleteIcon) {
      $(deleteIcon).on('click', function(e) {
        var body = JSON.stringify({
          id: e.target.dataset.id,
        })
        drinkTracker.storage.delete(
          body,
          drinkTracker.view.renderLog.bind(drinkTracker.view)
        );
      })
    })
  }

  function DrinkTracker() {
  	this.storage = new app.Store();
  	this.model = new app.Model(this.storage);
  	// this.template = new app.Template();
  	this.view = new app.View();
  	// this.controller = new app.Controller(this.model, this.view);
  }


    // var deleteAll = document.getElementById('js-delete-all')
  	var drinkTracker = new DrinkTracker();
    window.drinkTracker = drinkTracker;
    drinkTracker.view.renderHomeSelections();
    function getStuff() {
      drinkTracker.storage.removeAll();
      return drinkTracker.storage.findAll('all', makeModels);
    }
    drinkTracker.storage.findAll('all', makeModels)
    // deleteAll.addEventListener('click', drinkTracker.storage.deleteAll.bind(drinkTracker.storage, deleteAllCheck, emptyLog))

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
