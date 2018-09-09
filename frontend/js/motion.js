mot_socket = new WebSocket('wss://emotivcortex.com:54321')
streams = ['mot']

$(document).ready(function() {
    run_socket(mot_socket, streams);
});