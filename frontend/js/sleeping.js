var sleep_socket;
var time_elapsed = 0.0;

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

    $('#analysis_page').show();
    $('#sleeping_page').hide();


    function handle_pow(data_set) {
        var alpha = []
        var low_beta = []
        var high_beta = []
        var theta = []
        var gamma = []
        var times = []

        for (i = 0; i < data_set.length; i++) {
            var obj = data_set[i]
            var the_pow_data = obj.pow

            times.push(obj.time)

            var new_alphas = []
            var new_low_betas = []
            var new_high_betas = []
            var new_thetas = []
            var new_gammas = []

            for (var j = 0; j < the_pow_data.length; j++) {
                
                if (j % 5 == 0) {
                    new_thetas.push(the_pow_data[j])
                } else if (j % 5 == 1) {
                    new_alphas.push(the_pow_data[j])
                } else if (j % 5 == 2) {
                    new_low_betas.push(the_pow_data[j])
                } else if (j % 5 == 3) {
                    new_high_betas.push(the_pow_data[j])
                } else if (j % 5 == 4) {
                    new_gammas.push(the_pow_data[j])
                }
            }

            alphas_sum = alpha.reduce(function(a, b) { return a + b; });
            alphas_avg = alphas_sum / alpha.length;

            low_betas_sum = low_beta.reduce(function(a, b) { return a + b; });
            low_betas_avg = low_betas_sum / low_beta.length;

            high_betas_sum = high_beta.reduce(function(a, b) { return a + b; });
            high_betas_avg = high_betas_sum / high_beta.length;

            thetas_sum = theta.reduce(function(a, b) { return a + b; });
            thetas_avg = thetas_sum / theta.length;

            gammas_sum = gamma.reduce(function(a, b) { return a + b; });
            gammas_avg = gammas_sum / gamma.length;

        }

        var trace1 = {
            x: times,
            y: alpha,
            type: 'scatter',
            name: 'Alpha'
        };

        var trace2 = {
            x: times,
            y: theta,
            type: 'scatter',
            name: 'Theta'
        }

        var data = [trace1, trace2]

        Plotly.newPlot('pow_div', data)
    }

    function handle_met(data_set) {
        var times = []
        var interests = []
        var stresses = []
        var relaxation = []
        var excitement = []
        var engagement = []
        var focus = []
        var index = 0;
        for (var i = 0; i < data_set.length; i++) {
            var obj = data_set[i];
            times[index] = obj.time;
            interests[index] = obj.met[0]
            stresses[index] = obj.met[1]
            relaxation[index] = obj.met[2]
            excitement[index] = obj.met[3]
            engagement[index] = obj.met[4]
            focus[index++] = obj.met[6]
        }

        var trace1 = {
            x: times,
            y: interests,
            type: 'scatter',
            name: 'Interest'
        };

        var trace2 = {
            x: times,
            y: stresses,
            type: 'scatter',
            name: 'Stress'
        }

        var trace3 = {
            x: times,
            y: relaxation,
            type: 'scatter',
            name: 'Relaxation'
        };

        var trace4 = {
            x: times,
            y: excitement,
            type: 'scatter',
            name: 'Excitement'
        }

        var trace5 = {
            x: times,
            y: engagement,
            type: 'scatter',
            name: 'Engagement'
        };

        var trace6 = {
            x: times,
            y: focus,
            type: 'scatter',
            name: 'Focus'
        }

        var data = [trace1, trace2, trace3, trace4, trace5, trace6]

        Plotly.newPlot('met_div', data)
    }
    handle_pow(pow_data)
    handle_met(met_data)

})

$(document).ready(function() {
    $('#end-sleep-btn').hide();
    $('#analysis_page').hide();
});

$('#time').bind('DOMSubtreeModified', function() {
    time_elapsed = $(this).html()
})
