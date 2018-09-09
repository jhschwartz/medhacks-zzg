// DATA: eeg data and pow data are already included via import from data_center.js
var alpha_waves = []
var theta_waves = []
var gamma_waves = []

//Function for transposing 2D arrays.
function transpose(array) {
    return array.reduce((prev, next) => next.map((item, i) =>
        (prev[i] || []).concat(next[i])
    ), []);
}

// Format EEG Data to be analyzed. Return an array of arrays (signal values for channel x time).
function format_eegdata(eeg_data){
  var eeg_data_formatted = [];
  for (i=0;i<eeg_data.length;i++){
    eeg_dic = eeg_data[i];
    eeg_channels = eeg_dic["eeg"]
    eeg_channels = eeg_channels.slice(3,eeg_channels.length-2);
    eeg_data_formatted[i] = eeg_channels;
  }
  eeg_data_formatted = transpose(eeg_data_formatted);
  return eeg_data_formatted
}

// Format Power Data to be analyzed. Return an array of arrays (band power values for each channel x time).
function format_powerdata(power_data){
  var power_data_formatted = [];
  for (i=0;i<power_data.length;i++){
    power_dic = power_data[i];
    power_channels = power_dic["pow"]
    power_data_formatted[i] = power_channels;
  }
  power_data_formatted = transpose(power_data_formatted);
  return power_data_formatted
}

// Load Formatted Data
var eeg_data_formatted = format_eegdata(eeg_data);
var power_data_formatted = format_powerdata(power_data);

//Get time interval windows for a signal channel
function get_time_intervals(data_row,window_size){
  var intervals = [];
  var interval = [];
  for (i=0; i<data_row.length;i++){
    //if ((i+1)<window_size){
      //for (j=0;j<(window_size-i);j++){
        //interval.push(data_row[0]);
        //interval.concat(data_row.slice(0,i));
      //}
    //} else {
    if ((i+1)>window_size){
      interval = data_row.slice(i-window_size,i);
      intervals.push(interval);
    }
  }
  return intervals
}

//SLEEP QUALITY
// x is the time window of 350 datapoints(IED channels from EEG data).
// Returns one datapoint representing entropy.

function entropy(x){
  var tot = 0.0;
  var ent = 0.0;
  for (i=0;i < x.length; i++){
    tot = tot + Math.pow(x[i], 2);
  }
  for (i=0;i < x.length; i++){
    quo = Math.pow(x[i], 2) / tot;
    ent = ent + (quo * log10(quo));
  }
  var y = -ent;
  return y
}

var entropy_matrix = [];
//Calculate entropy for each data point. i for each row of channel.
for (i=0;i < eeg_data_formatted.length; i++){
  windows_values = get_intervals(eeg_data_formatted[i],350);
  for (w=0;i<windows_values.length;w++){
    entropy_matrix[i][w] = entropy(windows_values[w])
  }
}

var column_avg = col => {
	var sum = 0.0
	col.map(e => sum += e)
	return sum / col.length
}

//Use this to create chart
entropy_data = entropy_matrix.map(e => column_avg(e));

//Sums arrays
function sumArray(a, b) {
  var c = [];
  for (var i = 0; i < Math.max(a.length, b.length); i++) {
    c.push((a[i] || 0) + (b[i] || 0));
  }
  return c;
}

//Divide arrays
function divideArray(array, divisor) {
  var i = array.length, a, k;
  while (i) { // loop over each item in array
      a = array[--i];
      for (k in a) { // loop over each key in object
          if (a.hasOwnProperty(k)) { // ignore inherited keys
              a[k] = a[k] / divisor; // calculate
          }
      }
  }
  return array;
}

// WAVES DATA

// average theta_waves data usnig the sumArray of every fifth 
// power_data_formatted element, starting at 0 and ending at 65
for (var i = 0; i <= 65; i += 5) {
  theta_waves = sumArray(theta_waves,power_data_formatted[i]);
}

// average alpha_waves data usnig the sumArray of every fifth 
// power_data_formatted element, starting at 1 and ending at 66
for (var i = 1; i <= 66; i += 5) {
  alpha_waves = sumArray(alpha_waves,power_data_formatted[i]);
}

// average gamma_waves data usnig the sumArray of every fifth 
// power_data_formatted element, starting at 4 and ending at 69
for (var i = 4; i <= 69; i += 5) {
  gamma_waves = sumArray(gamma_waves,power_data_formatted[i]);
}

theta_waves = divideArray(theta_waves,14)
alpha_waves = divideArray(alpha_waves,14)
gamma_waves = divideArray(gamma_waves,14)
