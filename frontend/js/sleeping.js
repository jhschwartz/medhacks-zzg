var sleep_socket;

$('#start-sleep-btn').click(function() {
    // connect socket
    sleep_socket = new WebSocket('wss://emotivcortex.com:54321')
    streams = ['met', 'pow']
    run_socket(sleep_socket, streams);
});

$('#end-sleep-btn').click(function() {
    sleep_socket.close();
})