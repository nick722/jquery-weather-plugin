;(function($){
  $.fn.temperature = function(options) {
    // Default settings
    var settings = $.extend({
      'defaultCities' : ['Saint Petersburg', 'Moscow', 'Paris', 'London', 'Berlin',
      'Barcelona', 'New York', 'Ottawa', 'Canberra', 'Wellington'],
      'move': 'up'
    }, options);

    return this.each(function() {
    // Getting the temperature via AJAX
    //--------------------------------------
    var searchedCity = 'Los Angeles';
    //----------------------------------------
    var temperature;
    function handleData(responseData) {
      temperature = responseData;
      console.log('temperature = ' + temperature);
    }
      $.ajax({url: 'http://api.openweathermap.org/data/2.5/weather?q=' +
        searchedCity +
        '&units=metric&id=524901&APPID=34b222875f6018c8fdd6442a6aac5056',
        dataType: 'json',
        success: function(data){
          $('.degree').html(Math.round(data.main.temp));
        },
        error: function() {
          console.log('Error with Ajax!');
        }
      });// END OF $.ajax

    // Appending temperature to li containing city
    var cities = settings.defaultCities;
    // var temperature = '11';
    cities.forEach(function(city){
      var stringToAppend = '<span class="degree"> ' + temperature +
      '&#176; in ' + city + ', by the way.</span>';
      var liWithCity = '> li:contains(' + city + ')';
      $(liWithCity, this).append(stringToAppend);
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
