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
    // var searchedCity = 'Los Angeles';
    var searchedCity;
    //----------------------------------------
    var temperature;
    // function handleData(data) {
    // //   temperature = responseData;
    // //   console.log('temperature = ' + temperature);
    //  var temp = Math.round(data.main.temp) +
    //         '&#176; in ' + data.name + ', by the way.';
    //       $('.degree').html(temp);
    // }
      function getWeather(city) {
        console.log('city = ' + city);
        var cities = [];
      $.ajax({url: 'http://api.openweathermap.org/data/2.5/weather?q=' +
        city +
        '&units=metric&id=524901&APPID=34b222875f6018c8fdd6442a6aac5056',
        dataType: 'json',
        success: function(data){
          // handleData(data);
          // var city = data.name;
          // var city = searchedCity;

          var temp = Math.round(data.main.temp) +
            '&#176; in ' + city + ', by the way.';
          $('.degree').html(temp);

          // console.log('city = ' + city);
          // var cities = settings.defaultCities;
        },
        error: function() {
          console.log('Error with Ajax!');
        }
      });// END OF $.ajax
    }// END OF getWeather()

    // Appending temperature to li containing city
    var mentionedCities = settings.defaultCities;
    var matchedCities = [];
    // var temperature = '11';
    mentionedCities.forEach(function(city, i){
      // var searchedCity = city;
      matchedCities[i] = city;


      // var stringToAppend = '<span class="degree"> ' + temperature +
      // '&#176; in ' + city + ', by the way.</span>';
      var stringToAppend = '<span class="degree" id=' + i + '></span>';
      var liWithCity = '> li:contains(' + matchedCities[i] + ')';
      $(liWithCity, this).append(stringToAppend);
      // console.log('liWithCity = ' + liWithCity);
      getWeather(matchedCities[i]);

    }, this);

    console.log('matchedCities[] = ' + matchedCities);

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
