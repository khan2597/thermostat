$(document).ready(function() {
    var thermostat = new Thermostat();
    updateTemp()

    $('#temp-up').on('click', function() {
        thermostat.up();
        updateTemp()
    });

    $('#temp-down').on('click', function() {
        thermostat.down();
        updateTemp()
    });
    
    $('#temp-reset').on('click', function() {
        thermostat.resetTemperature();
        updateTemp()
    });

    $('#PSM-on').click(function() {
        thermostat.switchPowerSavingModeOn();
        $('#power-saving-status').text('on');
        updateTemp();
    });

    $('#PSM-off').click(function() {
        thermostat.switchPowerSavingModeOff();
        $('#power-saving-status').text('off');
        updateTemp();
    });

    $.get('http://api.openweathermap.org/data/2.5/weather?q=London&appid=a3d9eb01d4de82b9b8d0849ef604dbed&units=metric', function(data) {
        $('#current-temperature').text(data.main.temp);
    });

    $('#current-city').change(function() {
        var city = $('#current-city').val();
        $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=a3d9eb01d4de82b9b8d0849ef604dbed&units=metric', function(data) {
          $('#current-temperature').text(data.main.temp)
        });
    });

    function updateTemp() {
        $('#temperature').text(thermostat.temperature);
        $('#temp-container').attr('class', thermostat.energyUsage());
    };
});