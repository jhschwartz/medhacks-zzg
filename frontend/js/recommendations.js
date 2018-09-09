function fillTxtBoxes(){
    var hours = getHours();
    var quality = getQuality();
    var dTxt = "";
    var rTxt = "";
    switch(hours+quality){
    //these are mock examples!
        case 0:
            dTxt = "Sleep Apnea";
            rTxt = "some txt";
            break;
        case 1:
            dTxt = "Insomnia";
            rTxt = "some txt";
            break;
        case 2:
            dTxt = "Restless Leg Syndrome";
            rTxt = "some txt";
            break;
        case 3:
            dTxt = "Narcolepsy";
            rTxt = "some txt";
            break;
        case 4:
            dTxt = "Sleep Deprivation";
            rTxt = "some txt";
            break;
        default:
            dTxt = "Other"
            rTxt = "some txt";
            break;

    }
    document.getElementById("diagnoses").innerHTML = dTxt;
    document.getElementById("recommendations").innerHTML = rTxt;
}

function getHours(){
    return 0;
}

function getQuality(){
    return 0;
}