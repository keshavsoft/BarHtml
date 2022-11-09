import { StartFunc as FromHbsStartFunc } from "./HtmlFuncs/FromHbs.js";
import { ShowFunc } from "../../Dal/Items/Show.js";


let StartFunc = async () => {
    console.log("StartFunc:---");
    let jVarLocalRawTemplate = await FromHbsStartFunc();
    let jVarLocalDataFromServer = await ShowFunc();
    console.log("jVarLocalDataFromServer----------",jVarLocalDataFromServer);
    document.getElementById("KCont1").innerHTML = Handlebars.compile(jVarLocalRawTemplate)(jVarLocalDataFromServer);

};

export { StartFunc };