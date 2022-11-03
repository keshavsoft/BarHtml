let CommonJsonFileName = "Sales.json";
let CommonDataPath = `./KData/JSON/1008/Data/Transactions/${CommonJsonFileName}`;
let CommonItemName = "Sales";

let ShowFunc = async () => {
    let LocalCustomersData = await Neutralino.filesystem.readFile(CommonDataPath);
    let LocalCustomersDataAsJson = JSON.parse(LocalCustomersData);

    return await LocalCustomersDataAsJson[CommonItemName];
};

let DateFuncs = {
    ddMMyyyy: ({ inDate }) => {
        let date = new Date(inDate);

        let dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
        let MM = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
        let yyyy = date.getFullYear();

        return `${dd}-${MM}-${yyyy}`;
    },
    yyyyMMdd: ({ inDate }) => {
        let date = new Date(inDate);

        let dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
        let MM = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
        let yyyy = date.getFullYear();

        return `${yyyy}-${MM}-${dd}`;
    }
};

let MaxDate = async () => {
    try {
        let LocalFolderName = "Transactions";
        let LocalFileName = "Sales.json";
        let LocalItemName = "Sales";
        let LocalDateArray;
        let LocalMaxDate;
        let LocalReturnData;

        let data = await Neutralino.filesystem.readFile(`./KData/JSON/1008/Data/${LocalFolderName}/${LocalFileName}`);

        LocalDateArray = Object.values(JSON.parse(data)[LocalItemName]).map(element => {
            return new Date(element.Date);
        });

        if (LocalDateArray.length > 0) {
            LocalMaxDate = new Date(Math.max.apply(null, LocalDateArray));
            LocalReturnData = DateFuncs.yyyyMMdd({ inDate: LocalMaxDate })
        } else {
            LocalReturnData = undefined;
        }

        return await LocalReturnData;
    } catch (error) {
        console.log("error : ", error);
    };
};

export { ShowFunc, MaxDate };
