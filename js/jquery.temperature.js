;(function($){
  $.fn.temperature = function(options) {
    // Default settings
    var settings = $.extend({
      'searchedCities' : ['Saint Petersburg', 'Moscow', 'Paris', 'London', 'Berlin',
      'Barcelona', 'New York', 'Ottawa', 'Canberra', 'Wellington', 'Norilsk'],
      'move': 'up'
    }, options);

    return this.each(function() {
    // Getting the temperature via AJAX
    function getWeather(city, id) {
      var ajaxCall = $.ajax({url: 'http://api.openweathermap.org/data/2.5/weather?q=' +
        city + '&units=metric&id=524901&APPID=34b222875f6018c8fdd6442a6aac5056',
        dataType: 'json',
        error: function(jqXHR, exception) {
          console.log($('.citiesList'));
          $('.error').remove();
          $('<p class="error">').appendTo('.citiesList');
          $('.error').html('Error: ' + jqXHR.status + '. ' + jqXHR.responseJSON.message);
        }
      });// END OF $.ajax

      ajaxCall.done(function(data) {
        var temp = ' ' + Math.round(data.main.temp) +
        '&deg; in ' + data.name + ', by the way.';
        $('#' + id).html(temp);
      });
    }// END OF getWeather()

    // Appending temperature to li containing city
    var mentionedCities = settings.searchedCities;
    mentionedCities.forEach(function(city, i){
      var stringToAppend = '<span class="degree" id=' + i + '></span>';
      var liWithCity = '> li:contains(' + city + ')';
      $(liWithCity, this).append(stringToAppend);
      getWeather(city, i);
    }, this);

    // Moving li by click
    var error = '<div class="error"> Error! Please enter "{\'move\': \'up\'}" or "{\'move\': \'down\'}" as second parameter to define direction of moving "li" when clicked!</div>';
    function move(direction) {
      return function() {
        if (direction === 'up') {
          $(this).hide().prependTo($(this).parent()).slideDown(1000);
        } else if (direction === 'down') {
          $(this).hide().appendTo($(this).parent()).slideDown(1000);
        } else {
          $('.error').remove();
          $(error).appendTo($(this).parent());
        }
      };
    }
    $('> li', this).on('click', move(settings.move));

  });// END OF return this.each(function()
};// END OF $.fn.temperature = function(options)
})(jQuery);
