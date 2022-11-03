let CommonJsonFileName = "Sales.json";
let CommonDataPath = `./KData/JSON/1008/Data/Transactions/${CommonJsonFileName}`;
let CommonItemName = "Sales";

let Update = async ({ inDataToUpdate, inPk }) => {
    try {
        let LocalReturnObject;
        let LocalDataToUpdate;
        let LocalItemName = CommonItemName;

        let LocalData = await Neutralino.filesystem.readFile(CommonDataPath);
        let LocalDataAsJson = JSON.parse(LocalData);
        let LocalDataWithItemName = LocalDataAsJson[LocalItemName];

        LocalDataToUpdate = { ...LocalDataWithItemName[inPk], ...inDataToUpdate };

        LocalDataWithItemName[inPk] = LocalDataToUpdate;

        LocalReturnObject = await Neutralino.filesystem.writeFile(CommonDataPath, JSON.stringify(LocalDataAsJson));

        return await LocalReturnObject;
    } catch (error) {
        console.log("error : ", error);
    };
};

export { Update };
