var sleep_socket;

$('#start-sleep-btn').click(function() {
    // connect socket
    sleep_socket = new WebSocket('wss://emotivcortex.com:54321')
    streams = ['met', 'pow', 'eeg']
    run_socket(sleep_socket, streams);

    $('#start-sleep-btn').hide();
    $('#end-sleep-btn').show();

    $('#time').stopwatch().stopwatch('start');
});

$('#end-sleep-btn').click(function() {
    sleep_socket.close();

    $('#start-sleep-btn').show();
    $('#end-sleep-btn').hide();

    $('#time').stopwatch().stopwatch('stop');
    $('#time').html('00:00:00');

    window.location = $('#end-sleep-btn').attr('target');
})

$(document).ready(function() {
    $('#end-sleep-btn').hide();
});