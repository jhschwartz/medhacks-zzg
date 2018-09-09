function fillTxtBoxes(){
    var hours = getHours();
    var dTxt = "";
    var rTxt = "";
    var result = parseInt(time_elapsed.split(':')[0]);
    for(var i = 0; i < 5; i++){
        result+=hours[i];
    }
    if(result > 7){
        dTxt = "Sleep Apnea";
        rTxt = "Lose weight, stop smoking, take allergy meds, sleep on your side or abdomen, use continuous positive airway pressure (CPAP), wear an oral appliance.";
    }
    else if(result > 5){
        dTxt = "Narcolepsy";
        rTxt = "Avoid caffeine, stop smoking, stop drinking, exercise, reduce exposure to infectious diseases, take medication.";
    }
    else{
        dTxt = "Insomnia";
        rTxt = "Avoid caffeine, do not smoke or drink before bed, avoid napping, eat lightly before bed.";
    }
    document.getElementById("diagnoses").innerHTML = dTxt;
    document.getElementById("recommendations").innerHTML = rTxt;
}

// Get sleep duration times for the five stages of sleep
function getHours(){
    return [0,0,0,0,0];
}

function getQuality(){
    return 0;
}