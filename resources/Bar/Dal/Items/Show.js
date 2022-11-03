let ShowFunc = async () => {
    let LocalCustomersData = await Neutralino.filesystem.readFile('./KData/JSON/1008/Data/Masters/Items.json');
    let LocalCustomersDataAsJson = JSON.parse(LocalCustomersData);

    return await LocalCustomersDataAsJson.Products;
};

export { ShowFunc };
