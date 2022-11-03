let StartFunc = async () => {
    let jVarLocalFetchUrl = "/Bar/Bills/Html/Hbs/FirstRow.html";
    let response = await fetch(jVarLocalFetchUrl);
    let data = await response.text();
    return await data;
};

let SweetAlert2FirstRow = async () => {
    let jVarLocalFetchUrl = "/Bar/Bills/Html/Hbs/SweetAlert2FirstRow.html";
    let response = await fetch(jVarLocalFetchUrl);
    let data = await response.text();
    return await data;
};

let FirstRowSaved = async () => {
    let jVarLocalFetchUrl = "/Bar/Bills/Html/Hbs/FirstRowSaved.html";
    let response = await fetch(jVarLocalFetchUrl);
    let data = await response.text();
    return await data;
};

export { StartFunc, SweetAlert2FirstRow, FirstRowSaved }