$( document ).ready(function() {
  var items = ['wine', 'beer', 'mixed', 'shot', 'feels'];
  $.map(items, function(item) {
    var itemContainer = $('<div class="item"></div>');
    itemContainer.attr({
      id: 'js-log-' + item,
      'data-type': item,
    })
    itemContainer.addClass(item);

    var circle = $('<div class="circle"></div>');
    circle.addClass(item + '-background')
    itemContainer.append(circle)

    var image = $('<div class="image"></div>');
    image.addClass(item + '-image')
    itemContainer.append(image)

    var itemLabel = $('<h3 class="itemLabel"></h3>');
    itemLabel.html(item);
    itemContainer.append(itemLabel);

    $('#js-list').append(itemContainer);
  })

});
