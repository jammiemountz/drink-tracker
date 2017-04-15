function Model(storage) {
	this.storage = storage;
}

Model.prototype.create = function (item) {
  var newItem = {
    type: item.type,
    date: moment(item.date),
    id: item._id
  };
	this.storage.store(newItem);
};

window.app = window.app || {};
window.app.Model = Model;
