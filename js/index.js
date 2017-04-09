// location
if ("geolocation" in navigator) {
    $('#weather').show();
} else {
    $('#weather').hide();
    $('body').html("<p>I don't know where you are :(</p>");
}

//load weather using your lat/lng coordinates
$(document).ready(function() {
    navigator.geolocation.getCurrentPosition(function(position) {
        loadWeather(position.coords.latitude + ',' + position.coords.longitude);
    });
});

// wheather api
function loadWeather(location, woeid) {
    $.simpleWeather({
        location: location,
        woeid: woeid,
        unit: 'c',
        success: function(weather) {

            // var html = "<div id='icon'><img src='"+weather.image+"'></div>";

            // setting up background image
            $('.container').css({
                backgroundImage: "url('images/" + weather.code + ".jpg')"
            });

            // text inside box
            let html = '<div id="temp"> <h1>' + weather.temp + '&deg;' + weather.units.temp + '</h1><h1 style="display: none">' + weather.alt.temp + '&deg;' + weather.alt.unit + '</h1></div>';
            html += '<div id="current"><h4>' + weather.currently + '</h4></div>';
            html += '<div id="location"><p>' + weather.city + ', ' + weather.country + '</p></div>';
            html += '<div id="full"><a href="' + weather.link + '">full forecast on Yahoo!</a></div>';

            $("#weather").html(html);
            $("#temp").click(function() {
                $('h1').slideToggle('fast');
            });
        },
        error: function(error) {
            $("#weather").html('<p>' + error + '</p>');
        }
    });
};
