let CommonJsonFileName = "Sales.json";
let CommonDataPath = `./KData/JSON/1008/Data/Transactions/${CommonJsonFileName}`;
let CommonItemName = "Sales";

const toNumbers = arr => arr.map(Number);

let LocalForDaySeries = ({ inDataWithItemName, inDate }) => {
    let LocalReturnNumer;
    let LocalFilteredData = Object.values(inDataWithItemName).filter(element => {
        return element.Date === inDate;
    });
    let LocalDayNumberArray;

    if (LocalFilteredData.length === 0) {
        LocalReturnNumer = 1;
    } else {
        LocalDayNumberArray = LocalFilteredData.map(element => "DayNumber" in element ? element.DayNumber : 0);

        LocalReturnNumer = Math.max(...LocalDayNumberArray) + 1
    }

    return LocalReturnNumer;
};

let PushDataWithDayNumber = async ({ inDataToInsert }) => {
    try {
        let LocalReturnObject;
        //let LocalNewDataToInsert = this.Api.Transactions.Sales.CommonFuncs.GenerateBillNumber.ForDaySeries({ inDataWithItemName, inDate });
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

        let LocalDayNumber = LocalForDaySeries({
            inDataWithItemName: LocalDataWithItemName,
            inDate: inDataToInsert.Date
        });

        if (LocalDayNumber > 0) {
            inDataToInsert.DayNumber = LocalDayNumber
        };

        inDataToInsert.PK = max;
        LocalDataWithItemName[max] = inDataToInsert;

        LocalReturnObject = await Neutralino.filesystem.writeFile(CommonDataPath, JSON.stringify(LocalDataAsJson));
        LocalReturnObject.KResult = inDataToInsert;

        return await LocalReturnObject;
    } catch (error) {
        console.log("error : ", error);
    };
};

export { PushDataWithDayNumber };