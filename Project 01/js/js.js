document.getElementById("addBtn").addEventListener("click", addNote);
document.getElementById("clearBtn").addEventListener("click", clearNote);
var notesDiv = document.getElementsByClassName("row");
var noteInput = document.getElementById("noteArea");
var noteDate = document.getElementById("dateInput");
var noteTime = document.getElementById("timeInput");
var tmpNote = "";
var noteInfo;
var noteAry = JSON.parse(getFromStorage()) || [];
var myJson;
showNote(noteAry);
window.onload = function () {
    console.log(getFromStorage())
};

// --------------------------------------------------------------------------------------------------------------

function addNote() {
    notesDiv.innerHTML = "";

    if (noteInput.value != "") {
        noteInfo = {};
        noteInfo.note = noteInput.value;
        noteInfo.date = getFullDate();
        noteInfo.time = getFullTime();

        noteAry.push(noteInfo);
        parseToJson(noteAry);
        showOneNote(JSON.parse(getFromStorage()));
        noteInput.value = "";

    } else {
        alert("Please Enter Note First");
    } //End Main IF -->

} //End addNote() -->

function parseToJson(ary) {
    myJson = JSON.stringify(ary);
    console.log("myJson : " + myJson);
    saveToStorage(myJson);
} //End parseToJson() -->

function saveToStorage(JsonString) {
    window.localStorage.setItem("myJ", JsonString);
} //End saveToStorage() -->

function getFromStorage() {
    var storedJson = window.localStorage.getItem("myJ");
    return storedJson;
} // End getFromStorage() -->

function clearNote() {

    if (noteAry.length > 0) {
        if (confirm("Are you sure that you want to delete all notes ?")) {
            window.localStorage.clear();
            location.reload();
        }
    } else {
        alert("There Is No Notes To Delete!!!")
    }

} //End clearNote() -->

function showNote(JsonAry) {
    tmpNote = ""
    for (i = 0; i < JsonAry.length; i++) {
        tmpNote += "<div onmouseover='showDelBtn(" + i + ")' onmouseout='hideDelBtn(" + i + ")' class='col-sm-4 animated'><button class='delNote' onclick='delNote(" + i + ")'><i class='far fa-trash-alt' style='font-size: 20px;'></i></button><div class='noteTxtDiv'>" + JsonAry[i].note + "</div><div class='noteTimeDiv'>" + JsonAry[i].time + "</div><div class='noteTimeDiv'>" + JsonAry[i].date + "</div></div>"
    } //End For Loop

    notesDiv[0].innerHTML = tmpNote;
} //End showNote() --> 

function showOneNote(JsonAry) {
    tmpNote = ""

    console.log("One Note : " + JsonAry[(JsonAry.length - 1)].note);
    tmpNote += "<div onmouseover='showDelBtn(" + ((JsonAry.length) - 1) + ")' onmouseout='hideDelBtn(" + ((JsonAry.length) - 1) + ")' class='col-sm-4 animated'><button class='delNote' onclick='delNote(" + (JsonAry.length - 1) + ")'><i class='far fa-trash-alt' style='font-size: 20px;'></i></button><div class='noteTxtDiv'>" + JsonAry[(JsonAry.length - 1)].note + "</div><div class='noteTimeDiv'>" + JsonAry[(JsonAry.length - 1)].time + "</div><div class='noteTimeDiv'>" + JsonAry[(JsonAry.length - 1)].date + "</div></div>"

    notesDiv[0].innerHTML += tmpNote;
    animated();
} //End addOneNote() -->

function delNote(notePosition) {
    if (confirm("Are you sure that you want to delete this note ?")) {
        var animDiv = document.getElementsByClassName("animated");
        animDiv[notePosition].style.opacity = "0";
        animDiv[notePosition].style.transition = "1s linear";
        setTimeout(function () {
            noteAry.splice(notePosition, 1);
            showNote(noteAry);
            parseToJson(noteAry);
        }, 1000);

    } //Yes Choise;
} //End delNote() -- > 

// --------------------------------------------------------------------------------------------------------------

function getFullDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    today = dd + '/' + mm + '/' + yyyy;
    return today;
} //End getFullDate() -->

function getFullTime() {
    var crTime = new Date();
    var hh = crTime.getHours();
    var mm = crTime.getMinutes();

    if (hh < 10) {
        hh = '0' + hh;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }
    crTime = hh + ":" + mm;
    return crTime;
} //End getFullTime() -->

function animated() {

    var animDiv = document.getElementsByClassName("animated");
    animDiv[(noteAry.length) - 1].style.opacity = "0";
    animDiv[(noteAry.length) - 1].style.transition = "1s linear";

    setTimeout(function () {
        var animDiv = document.getElementsByClassName("animated");
        animDiv[(noteAry.length) - 1].style.opacity = "1";
        animDiv[(noteAry.length) - 1].style.transition = "1s linear";
    }, 200);

} //End animated()-->

function showDelBtn(i) {
    
    document.getElementsByClassName("delNote")[i].style.display = "block";
    
} //End showDelBtn() -->

function hideDelBtn(i) {

    document.getElementsByClassName("delNote")[i].style.display = "none";

} //End hideDelBtn -->
