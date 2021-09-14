console.log("hello");

const counter = 0;

async function getStudents() {
    const response = await fetch('/api/students');
    const students = await response.json();
    return students;
}

showParticipants();
window.setInterval(showParticipants, 1000);

function showParticipants() {
    getStudents().then(function (result) {
        const partDiv = document.querySelector("#participants");
        result.forEach(element => {
            const elem = document.getElementById(element._id);
            if (elem != null) {
                return true;
            }
            partDiv.appendChild(createNameElement(element, element._id));
            fillBoxes(element);
        });
    });
}

function fillBoxes(element) {
    if (element.group != "N/A") {
        const elem = document.getElementById(element._id + "box");
        if (elem == null) {
            const groupDiv = document.getElementById("group" + element.group);
            groupDiv.appendChild(createNameElement(element, element._id + "box"));
        }
    }
}

function createNameElement(element, id) {
    const p = document.createElement("p");
    p.setAttribute('id', id);
    const t = document.createTextNode(element.firstName + " " + element.lastName);
    p.appendChild(t);
    return p;
}