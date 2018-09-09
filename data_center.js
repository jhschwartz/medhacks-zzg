// ENABLED: all pow is stored here
var pow_data = []

// ENABLED: all met is stored here
var met_data = []

// ENABLED: all eeg is stored here
var eeg_data = []

// ENABLED: this function is triggered everytime new eeg data comes in.
// the function triggers an update of the eeg visualization on the frontend
function update_eeg(new_eeg) {
    // trigger will depend on which page we are currently viewing
    switch (current_page) {
        case 'analysis':
            // do eeg update for analysis page
            break;
        case 'home':
            // do eeg update for home page
            break;
        case 'sleeping':
            // do eeg update for sleeping page
            break;
        case 'recommendations':
            // do eeg update for recommendations page
            break;
        default:
            throw Error('current_page variables not set and caught properly!')
    }
}

// ENABLED: this function is triggered everytime new mot data comes in.
// the function triggers an update of the mot visualization on the frontend
function update_mot(new_mot) {
    // trigger will depend on which page we are currently viewing
    switch (current_page) {
        case 'analysis':
            // do mot update for analysis page
            break;
        case 'home':
            // do mot update for home page
            break;
        case 'sleeping':
            // do mot update for sleeping page
            break;
        case 'recommendations':
            // do mot update for recommendations page
            break;
        default:
            throw Error('current_page variables not set and caught properly!')
    }
}

////////////////////////////////////////////////////////////////////////


// DISABLED: this function exists just in case we want to do something
// later upon arrival of new pow data
function update_pow(new_pow) {} // NO FUNCTION

// DISABLED: this function exists just in case we want to do something
// later upon arrival of new met data
function update_met(new_met) {} // NO FUNCTION

