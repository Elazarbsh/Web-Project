
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
                if (element.group != "N/A") {
                    const check = document.getElementById(element._id + "box");

                    if (check == null) {
                        const groupDiv = document.getElementById("group" + element.group);
                        groupDiv.appendChild(createNameElement(element, element._id+"box"));
                    }
                }
                return true;
            }

            partDiv.appendChild(createNameElement(element, element._id));
        });
    });
}


function createNameElement(element, id){
    const p = document.createElement("p");
    p.setAttribute('id', id);
    const t = document.createTextNode(element.firstName + " " + element.lastName);
    p.appendChild(t);
    return p;
}