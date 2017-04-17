// (function(window) {
'use strict';

function View() {
  this.selections = ['wine', 'beer', 'mixed', 'shot', 'feels'];
}

View.prototype.renderHomeSelections = function() {
  var items = ['wine', 'beer', 'mixed', 'shot', 'feels'];
  var view = this;
  $.map(this.selections, function(item) {
    view.renderHomeSelection(item);
  });
};

View.prototype.renderHomeSelection = function(selection) {
  var itemContainer = $('<div class="item"></div>');
  itemContainer.attr({
    id: 'js-log-' + selection,
    'data-type': selection,
  });
  itemContainer.addClass(selection);

  var circle = $('<div class="circle"></div>');
  circle.addClass(selection + '-background');
  itemContainer.append(circle);

  var image = $('<div class="image"></div>');
  image.addClass(selection + '-image');
  itemContainer.append(image);

  var itemLabel = $('<h3 class="itemLabel"></h3>');
  itemLabel.html(selection);
  itemContainer.append(itemLabel);

  $('#js-list').append(itemContainer);
};

View.prototype.renderLog = function(days) {
  var view = this;
  var drink = 'drink';
  var amount = 'no';
  var today = days[moment().format('L')];
  if (today && (today.length === 0 || today.length > 1)) {
    drink += 's';
  }
  if (today && today.length !== 0) {
    amount = today.length;
  }
  $('#js-log').empty();
  $('#js-amount-span').html(amount + ' ' + drink);
  $.map(days, function(day, key) {
    view.renderLogDayCard(day, key);
  });
};

View.prototype.renderLogDayCard = function(day, key, container) {
  var view = this;
  var dateCard = $('<div class="dateCard"></div>');
  var date = $('<p class="dayCardDate"></p>').html(moment(key).format('ddd MMM Do'));
  if (!day || day.length === 0) {
    date.addClass('date-empty');
    return;
  }
  var drinks = day.filter(function(item) { return item.type !== 'feels'; }).length;
  if (drinks === 0) {
    date.addClass('date-light');
  } else if (drinks < 4) {
    date.addClass('date-moderate');
  } else {
    date.addClass('date-heavy');
  }
  dateCard.append(date);

  $.map(day, function(item) {
    return view.renderLogDayItem(item, dateCard);
  });
  $('#js-log').prepend(dateCard);
};

View.prototype.renderLogDayItem = function(item, card) {
  var itemContainer = $('<div class="itemContainer"></div>');
  var itemContainerLeft = $('<div class="itemContainerLeft"></div>');
  var itemContainerRight = $('<div class="itemContainerRight"></div>');

  var itemDecoration = $('<div class="itemDecoration"></div>');
  itemDecoration.addClass(item.type + '-background');
  itemContainerLeft.append(itemDecoration);

  var itemLabel = $('<p class="itemLabel"></p>').html(item.type);
  itemContainerLeft.append(itemLabel);

  var timeAgo = $('<p class="itemLabelTime"></p>').html(item.date.fromNow());
  itemContainerRight.append(timeAgo);

  var deleteIcon = $('<div class="deleteIcon"></div>');
  deleteIcon.attr({ 'data-id': item.id });
  itemContainerRight.append(deleteIcon);

  itemContainer.append(itemContainerLeft)
  itemContainer.append(itemContainerRight)

  return card.append(itemContainer);
};

window.app = window.app || {};
window.app.View = View;
// })(window);
