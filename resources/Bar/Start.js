import { StartFunc as FromHbsStartFunc } from "./Bills/Js/HtmlFuns/FromHbs.js";
import { ShowFunc } from "./Dal/Items/Show.js";
import { StartFunc as AddListenersStartFunc } from "./Bills/Js/AddListeners.js";

let StartFunc = async () => {
 
    let jVarLocalDataFromServer = await ShowFunc();
    let jVarLocalRawTemplate = await FromHbsStartFunc();
    //let jVarLocalDataFromServer = {};
    //PresentDateInddMMyyyy
    document.getElementById("KCont1").innerHTML = Handlebars.compile(jVarLocalRawTemplate)(jVarLocalDataFromServer);
    //  document.getElementById("ShowBillId").innerHTML = `<p class="fs-1">${this.DateFuncs.PresentDateInddMMyyyy()}</p>`;
    //  this.JsFuncs.CommonFuncs.DefaultFocus();
    AddListenersStartFunc();

};

StartFunc();