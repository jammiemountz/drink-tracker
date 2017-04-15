(function (window) {
	'use strict';

	function Store() {
    this._tables = {
      drinks: '/drinks',
      feels: '/feels',
      all: '/all'
    }
		this._checkDeleteAll = false;
		this._items = [];
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
    var request = new XMLHttpRequest();
    var uri = '/deleteOne';
    request.open('DELETE', uri, true);
    request.setRequestHeader("Content-type", "application/json");
    request.onload = function(data) {
      callback();
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
		this._items.push(item);
	}

	Store.prototype.removeAll = function(item) {
		this._items = [];
	}

	Store.prototype.removeOne = function(id) {
		this._items.filter(function(index, item) {
			return item.id !== id;
		});
	}

	// Export to window
	window.app = window.app || {};
	window.app.Store = Store;
})(window);
