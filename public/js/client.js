$(function(){
  // ask the server for songs, and then draw them
  getSongs();

  // listen for submit events and send new songs to the server
  $('form').on('submit', function(event){
    event.preventDefault();
    var formData = $(this).serialize();
    $.ajax({
      type: 'POST',
      url: '/songs',
      data: formData,
      success: getSongs,
      statusCode: {
        400: function () {
          alert("Sorry that song is already on the list, try spelling it wrong if you want duplicates");
        },
        401: function () {
          alert("You need to actually type something in order to perform this submission, try again.")
        }
      }
    });

    $(this).find('input[type=text]').val('');
  });
});

function getSongs() {
  $.ajax({
    type: 'GET',
    url: '/songs',
    success: function(songs){
      $('#songs').empty();
      songs.forEach(function(song){
        var $li = $('<li></li>');
        $li.append('<p>'+ song.title + '</p>');
        $li.append('<p>by: '+ song.artist + '</p>');
        $li.append('<p>Date added: ' + song.dateAdded + '</p>');
        $('#songs').append($li);
      });
    },
  });
}
