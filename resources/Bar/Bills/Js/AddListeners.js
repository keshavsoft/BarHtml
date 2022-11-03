import { CustomersSaveFunc } from "./SaveFuncs.js";
import { CreateNew } from "./ButtonClicks.js";

let StartFunc = () => {
    let jVarLocalCustomersSaveButtonId = document.getElementsByClassName("buttoninsertclass");

    for (var i = 0; i < jVarLocalCustomersSaveButtonId.length; i++) {
        jVarLocalCustomersSaveButtonId[i].addEventListener('click', CustomersSaveFunc);
    };
    //jVarLocalCustomersSaveButtonId.addEventListener("click", CustomersSaveFunc);
};

let ToShowBillId = () => {
    let jVarLocalPrintButtonId = document.getElementById("PrintButtonId");
    
    jVarLocalPrintButtonId.addEventListener('click', CreateNew);
};

export { StartFunc, ToShowBillId }