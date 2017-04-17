(function (window) {
	'use strict';

	function Store() {
    this._tables = {
      drinks: '/drinks',
      feels: '/feels',
      all: '/all'
    }
		this._checkDeleteAll = false;
		this._items = {};
	}

	Store.prototype.find = function (query, callback) {
	};

	Store.prototype.findAll = function (type, callback, error) {
    var request = new XMLHttpRequest();
    var uri = this._tables[type];
    request.open('GET', uri, true);
    request.setRequestHeader("Content-type", "application/json");
    request.onload = function(data) {
      if (request.status >= 200 && request.status < 400) {
        var parseData = JSON.parse(request.responseText);
        callback(parseData);
      }
    };
    request.onerror = error || function(){};
    request.send();
	};

	Store.prototype.save = function (updateData, callback, error) {
    var request = new XMLHttpRequest();
    var uri = '/drinks';
    request.open('POST', uri, true);
    request.setRequestHeader("Content-type", "application/json");
    request.onload = function(data) {
      var parseData = JSON.parse(request.responseText);
      callback(parseData)
    };
    request.onerror = error || function(){};
    request.send(updateData);
	};


	Store.prototype.delete = function (updateData, callback, error) {
		console.log('deling')
    var request = new XMLHttpRequest();
    var uri = '/deleteOne';
		var that = this;
    request.open('DELETE', uri, true);
    request.setRequestHeader("Content-type", "application/json");
    request.onload = function(data) {
			that.removeOne(JSON.parse(updateData).id)
      callback(that._items);
			// MOVE TO CONTROLLER
			// solves bug with losing click handlers on delete
			$.each($('.deleteIcon'), function(index, deleteIcon) {
				$(deleteIcon).on('click', function(e) {
					var body = JSON.stringify({
						id: e.target.dataset.id,
					})
					window.drinkTracker.storage.delete(
						body,
						window.drinkTracker.view.renderLog.bind(drinkTracker.view)
					);
				})
			})
    };
    request.onerror = error || function(){};
    request.send(updateData);
	};

	Store.prototype.deleteAll = function (checkAgain, callbackSuccess, error) {
		if (!this._checkDeleteAll) {
			this._checkDeleteAll = true;
			return checkAgain();
		}
    var request = new XMLHttpRequest();
    var uri = '/deleteAll';
    request.open('DELETE', uri, true);
    request.setRequestHeader("Content-type", "application/json");
    request.onload = function(data) {
      callbackSuccess();
    };
    request.onerror = error || function(){};
    request.send();
	};

	Store.prototype.store = function(item) {
		var dayOfItem = item.date.format('L')
		if (this._items[dayOfItem]) {
			this._items[dayOfItem].push(item);
		} else {
			this._items[dayOfItem] = [item]
		}
	}

	Store.prototype.removeAll = function(item) {
		this._items = {};
	}

	Store.prototype.removeOne = function(id) {
		var that = this;
		$.each(Object.keys(this._items), function(index, day) {
			that._items[day] = that._items[day].filter(function(item) {
				return item.id !== id;
			});
		});
	}

	Store.prototype.getTodayDrinks = function() {
		return this._items[moment().format('L')];
	}

	// Export to window
	window.app = window.app || {};
	window.app.Store = Store;
})(window);
