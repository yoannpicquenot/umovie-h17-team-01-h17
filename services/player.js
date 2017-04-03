// Upon loading, the Google APIs JS client automatically invokes this callback.
googleApiClientReady = function() {
  loadAPIClientInterfaces();
}

// Load the client interfaces for the YouTube Analytics and Data APIs, which
// are required to use the Google APIs JS client. More info is available at
// https://developers.google.com/api-client-library/javascript/dev/dev_jscript#loading-the-client-library-and-the-api
function loadAPIClientInterfaces() {
  gapi.client.setApiKey('AIzaSyASeZopJsx4EfzBZDZRQR6FWWXkwF9lyys');
  gapi.client.load('youtube', 'v3', function() {
    $('body').trigger('apiYouTubeLoaded');
    // console.log("youtube api loaded");
  });
}

// Search for a specified string.
function search(toSearch) {
  var q = toSearch + ' trailer';
  var request = gapi.client.youtube.search.list({
    q: q,
    part: 'snippet'
  });

  request.execute(function(response) {
    console.log(response.items);
    for (var i = 0; i < response.items.length; i++) {
      if (response.items[i].id.kind == 'youtube#video') {
        $('#trailer').html('<iframe width="560" height="315" id="trailer" src="https://www.youtube.com/embed/'+ response.items[i].id.videoId + '" frameborder="0" allowfullscreen></iframe>');
        break;
      }
    }
  });
}
