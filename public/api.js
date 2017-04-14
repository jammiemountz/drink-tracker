function getDrinks() {
  var request = new XMLHttpRequest();
  // request.setRequestHeader("Content-type", "application/json");
  var uri = '/drinks';
  request.open('GET', uri, true);
  request.onload = function(data) {
    if (request.status >= 200 && request.status < 400) {
      var parseData = JSON.parse(request.responseText);
      appendToLog(parseData)
    }
  };
  // request.onerror = function() {
  //   handleError();
  // };
  request.send();
}

function deleteDrinks() {
  var request = new XMLHttpRequest();
  // request.setRequestHeader("Content-type", "application/json");
  var uri = '/deleteAll';
  request.open('DELETE', uri, true);
  request.onload = function(data) {
    document.getElementById('js-delete-all').innerHTML = 'Delete All'
    $('#js-log').empty()
  };
  // request.onerror = function() {
  //   handleError();
  // };
  request.send();
}

function eventListener(e) {
  var request = new XMLHttpRequest();
  var body = JSON.stringify({
    'type': e.target.dataset.type,
    'date': new Date(),
  })
  var json_upload = "json_name=" + body;
  var uri = '/drinks';
  request.open('POST', uri, true);
  request.setRequestHeader("Content-type", "application/json");
  request.onload = function(data) {
    var parseData = JSON.parse(request.responseText);
    appendToLog(parseData)
  };
  // request.onerror = function() {
  //   handleError();
  // };
  request.send(body);
}
