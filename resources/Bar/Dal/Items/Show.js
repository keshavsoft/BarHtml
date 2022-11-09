let ShowFunc = async () => {
    console.log("-----------555555555555555");
    let LocalCustomersData = await Neutralino.filesystem.readFile('./KData/JSON/1008/Data/Masters/Items.json');
    console.log("LocalCustomersData",LocalCustomersData);
    let LocalCustomersDataAsJson = JSON.parse(LocalCustomersData);
    console.log("LocalCustomersDataAsJson--",LocalCustomersDataAsJson);

    return await LocalCustomersDataAsJson.Products;
};

export { ShowFunc };
