let StartFunc = async () => {
    let jVarLocalFetchUrl = "/Bar/Products/Html/Producthbs.html";
    let response = await fetch(jVarLocalFetchUrl);
    let data = await response.text();
    return await data;
};

export { StartFunc };