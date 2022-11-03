import { FirstRowSaved } from "./HtmlFuns/FromHbs.js";
import { ShowFunc as SalesShowFunc } from "../../Dal/Sales/Show.js";
import { ShowFunc as SalesItemsShowFunc } from "../../Dal/SalesItems/Show.js";
import { ToShowBillId as AddListenersToShowBillId } from "./AddListeners.js";

let ToShowBillId = async ({ inPk }) => {
    let jVarLocalPresentPk = inPk;
    let jVarLocalTemplate = await FirstRowSaved();
    let jVarLocalDataToShow = await LocalShowByPk({ inPk: jVarLocalPresentPk });

    document.getElementById("ShowBillId").innerHTML = Handlebars.compile(jVarLocalTemplate)(jVarLocalDataToShow);
    AddListenersToShowBillId();
};

let LocalShowByPk = async ({ inPk }) => {
    let jVarLocalSalesData = await SalesShowFunc();
    let jVarLocalSalesItemsData;
    let jVarLocalReturnObject = { InvGrid: {} };
    let jVarLocalReturnObjectWithFooter;
    let jVarLocalObject = {};

    if (inPk in jVarLocalSalesData) {
        jVarLocalSalesItemsData = await SalesItemsShowFunc();
        jVarLocalReturnObject.Head = jVarLocalSalesData[inPk];
        Object.entries(jVarLocalSalesItemsData).forEach(
            ([key, value]) => {
                if (value.FK === inPk) {
                    jVarLocalObject = {};
                    value.Amount = value.Price * value.Qty;
                    jVarLocalObject[key] = value;
                    jVarLocalReturnObject.InvGrid = { ...jVarLocalReturnObject.InvGrid, ...jVarLocalObject };
                }
            }
        );

        jVarLocalReturnObjectWithFooter = LocalCalculateFooter({ inObject: jVarLocalReturnObject });
    };

    return await jVarLocalReturnObjectWithFooter;
};

let LocalCalculateFooter = ({ inObject }) => {
    let jVarLocalReturnObject = JSON.parse(JSON.stringify(inObject));
    let jVarLocalTotalAmount = Object.values(inObject.InvGrid).map(LoopItem => LoopItem.Amount).reduce((a, b) => a + b, 0);
    let jVarLocalTotalQty = Object.values(inObject.InvGrid).map(LoopItem => LoopItem.Qty).reduce((a, b) => a + b, 0);

    jVarLocalReturnObject.InvGridFooter = {
        TotalAmount: jVarLocalTotalAmount,
        TotalQty: jVarLocalTotalQty
    };

    return jVarLocalReturnObject;
};

export { ToShowBillId };