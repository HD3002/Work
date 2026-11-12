const findings = [];

const tableHeader =
document.getElementById("tableHeader");

const tableBody =
document.getElementById("tableBody");

const activeColumns = [
    "platform",
    "environment",
    "browser",
    "screenshot",
    "siteSection",
    "comments"
];

document
.getElementById("addFindingBtn")
.addEventListener("click", addFinding);

document
.querySelectorAll(".column-toggle")
.forEach(cb=>{
    cb.addEventListener(
        "change",
        updateColumns
    );
});

renderTable();

function updateColumns(){

    activeColumns.length = 0;

    document
    .querySelectorAll(".column-toggle:checked")
    .forEach(cb=>{
        activeColumns.push(cb.value);
    });

    renderTable();
}

function addFinding(){

    const file =
    document.getElementById(
        "screenshot"
    ).files[0];

    if(!file){
        alert("Screenshot required");
        return;
    }

    const reader =
    new FileReader();

    reader.onload = function(e){

        findings.push({

            platform:
            document.getElementById(
                "platform"
            ).value,

            environment:
            document.getElementById(
                "environment"
            ).value,

            browser:
            document.getElementById(
                "browser"
            ).value,

            siteSection:
            document.getElementById(
                "siteSection"
            ).value,

            comments:
            document.getElementById(
                "comments"
            ).value,

            screenshot:
            e.target.result

        });

        saveData();
        renderTable();

    };

    reader.readAsDataURL(file);
}

function renderTable(){

    tableHeader.innerHTML = "";
    tableBody.innerHTML = "";

    activeColumns.forEach(col=>{

        const th =
        document.createElement("th");

        th.textContent = col;

        tableHeader.appendChild(th);
    });

    const actionTh =
    document.createElement("th");

    actionTh.textContent =
    "Actions";

    tableHeader.appendChild(
        actionTh
    );

    findings.forEach((f,index)=>{

        const tr =
        document.createElement("tr");

        activeColumns.forEach(col=>{

            const td =
            document.createElement("td");

            if(col==="screenshot"){

                td.innerHTML=
                `<img src="${f.screenshot}"
                 class="preview-image">`;

            }
            else{
                td.textContent =
                f[col];
            }

            tr.appendChild(td);
        });

        const deleteTd =
        document.createElement("td");

        deleteTd.innerHTML = `
            <button
                class="delete-btn"
                onclick="removeFinding(${index})">
                Delete
            </button>
        `;

        tr.appendChild(deleteTd);

        tableBody.appendChild(tr);

    });

}