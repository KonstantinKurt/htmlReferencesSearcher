;
"use strict";
var onloads = [];
var doc = document; // Кэшируем документ;
///////////////////////////
function getText() {
    var element = doc.getElementById('textButton');
    element.onclick = find;
};

function clearText() {
    var element = doc.getElementById('textClear');
    element.onclick = clear;
};

function goBack() {
    var element = doc.getElementById('back');
    element.onclick = back;
};

function back() {
    var table = doc.getElementById('table');
    doc.body.removeChild(table);
    var text = doc.getElementById('text');
    text.style.visibility = 'visible';
    var buttons = doc.getElementsByTagName('button');
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].style.visibility = 'visible';
    }
    var label = doc.getElementById('label');
    label.style.visibility = 'visible';
    this.style.visibility = 'hidden';
}

function clear() {
    var text = doc.getElementById('text');
    if (text.value) {
        text.value = "";
    } else {
        alert("Textarea is empty!!");
    }
};

function find() {
    var text = doc.getElementById('text');
    if (text.value) {
        text.style.visibility = 'hidden';
        var buttons = doc.getElementsByTagName('button');
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].style.visibility = 'hidden';
        }
        var label = doc.getElementById('label');
        label.style.visibility = 'hidden';
        var back = doc.getElementById('back');
        back.style.visibility = 'visible';
        var str = text.value;
        var table = doc.createElement('table');
        doc.body.appendChild(table);
        table.id = 'table';
        table.className = 'table';
        var captionRow = doc.createElement('tr');
        table.appendChild(captionRow);
        var tdRef = doc.createElement('td');
        captionRow.appendChild(tdRef);
        tdRef.innerHTML = 'Reference';
        tdRef.style.color = '#F7A009';
        var tdDiscription = doc.createElement('td');
        captionRow.appendChild(tdDiscription);
        tdDiscription.innerHTML = 'Discription';
        tdDiscription.style.color = 'green';
        var regRef = /href="(.*?)"/g;
        var regDiscription = /<a.*?>(.+?)<\/a>/ig;
        var matchRef;
        var matchDiscription;
        while ((matchRef = regRef.exec(text.value)) && (matchDiscription = regDiscription.exec(text.value))) {
            var newRow = doc.createElement('tr');
            table.appendChild(newRow);
            var tdGetRef = doc.createElement('td');
            var tdGetDiscription = doc.createElement('td');
            newRow.appendChild(tdGetRef);
            newRow.appendChild(tdGetDiscription);
            tdGetRef.innerHTML = matchRef[1];
            tdGetDiscription.innerHTML = matchDiscription[1];
        }
    } else {
        alert("Textarea is empty!!");
    }
};



onloads.push(getText);
onloads.push(clearText);
onloads.push(goBack);
///////////////////////////
window.onload = function() {
    for (var i in onloads) {
        onloads[i]();
    }
}