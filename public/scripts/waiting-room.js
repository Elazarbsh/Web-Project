console.log("hello");

const counter = 0;

async function getStudents() {
    const response = await fetch('/api/students');
    const students = await response.json();
    return students;
}

showParticipants();
window.setInterval(showParticipants, 1000);

function showParticipants(){
    getStudents().then(function (result) {
        const partDiv = document.querySelector("#participants");
        result.forEach(element => {
            const check = document.getElementById(element._id);
            if (check != null) {
                return true;
            }
            const p = document.createElement("p");
            p.setAttribute('id', element._id);
            const t = document.createTextNode(element.firstName + " " + element.lastName);
            p.appendChild(t);
            partDiv.appendChild(p);
        });
    });
}