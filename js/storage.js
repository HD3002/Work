function saveData(){

    localStorage.setItem(
        "evidenceData",
        JSON.stringify(findings)
    );

}