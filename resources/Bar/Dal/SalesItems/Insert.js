let CommonJsonFileName = "SalesItems.json";
let CommonDataPath = `./KData/JSON/1008/Data/Transactions/${CommonJsonFileName}`;
let CommonItemName = "Sales";

const toNumbers = arr => arr.map(Number);

let FPushData = async ({ inDataToInsert }) => {
    try {
        let LocalReturnObject;
        let LocalObjectToInsert = {};

        let LocalItemName = CommonItemName;

        let LocalData = await Neutralino.filesystem.readFile(CommonDataPath);
        let LocalDataAsJson = JSON.parse(LocalData);
        let LocalDataWithItemName = LocalDataAsJson[LocalItemName];
        let LocalKeys = Object.keys(LocalDataWithItemName);
        let max = 1;

        if (LocalKeys.length > 0) {
            let LocalKeysAsNumbers = toNumbers(LocalKeys);

            max = Math.max(...LocalKeysAsNumbers) + 1;
        };

        LocalObjectToInsert[max] = inDataToInsert;
        LocalDataWithItemName = { ...LocalDataWithItemName, ...LocalObjectToInsert };

        LocalDataAsJson[LocalItemName] = LocalDataWithItemName;
        LocalReturnObject = await Neutralino.filesystem.writeFile(CommonDataPath, JSON.stringify(LocalDataAsJson));
        LocalReturnObject.KResult = LocalObjectToInsert;

        return await LocalReturnObject;
    } catch (error) {
        console.log("error : ", error);
    };
};

export { FPushData };