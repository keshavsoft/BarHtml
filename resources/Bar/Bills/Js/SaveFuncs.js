import { SweetAlert2FirstRow, FirstRowSaved } from "./HtmlFuns/FromHbs.js";
import { MaxDate } from "../../Dal/Sales/Show.js";
import { PushDataWithDayNumber } from "../../Dal/Sales/Insert.js";
import { FPushData } from "../../Dal/SalesItems/Insert.js";
import { ToShowBillId } from "./ShowInDOM.js";

let CustomersSaveFunc = async (event) => {
    let jVarLocalCurrentTarget = event.currentTarget;
    let jVarLocalItemName = jVarLocalCurrentTarget.dataset.productname;
    let jVarLocalPrice = jVarLocalCurrentTarget.dataset.price;

    let jVarLocalPopUpTemplate = await SweetAlert2FirstRow();
    let jVarLocalPopUpHtml = Handlebars.compile(jVarLocalPopUpTemplate)({
        inItemName: jVarLocalItemName,
        inPrice: jVarLocalPrice,
        inQty: 1
    });

    await Swal.fire({
        title: 'Enter Item Details',
        html: jVarLocalPopUpHtml,
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Insert',
        showLoaderOnConfirm: true,
        didOpen: () => {
            Swal.getHtmlContainer().querySelector('#Qty').focus()
        },
        preConfirm: async (login) => {
            const jVarLocalQty = Swal.getPopup().querySelector('#Qty').value

            return { Qty: parseInt(jVarLocalQty) };
        },
        allowOutsideClick: () => !Swal.isLoading(),
        backdrop: true
    }).then(async (result) => {
        if (result.isConfirmed) {
            await LocalPostSweetAlert({
                inItemName: jVarLocalItemName,
                inPrice: jVarLocalPrice,
                inQty: result.value.Qty
            });
        };
    });
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

let FirstRowSave = async ({ inItemName, inPrice, inQty }) => {
    let LocalDataFromSalesItems;
    let jVarLocalReturnObject = { KTF: false, KResult: "" };

    let LocalDataFromSales = await PushDataWithDayNumber({
        inDataToInsert: {
            Date: DateFuncs.yyyyMMdd({ inDate: new Date() })
        }
    });

    if (LocalDataFromSales.success) {
        LocalDataFromSalesItems = await FPushData({
            inDataToInsert: {
                FK: LocalDataFromSales.KResult.PK,
                ProductName: inItemName,
                Price: inPrice, Qty: inQty
            }
        });
        if (LocalDataFromSalesItems.success) {
            //  jVarLocalFromHtmlForSinleShow = await this.HtmlFuns.Transactions.Sales.ShowFuncs.SingleEntry();

            jVarLocalReturnObject.KTF = true;
            jVarLocalReturnObject.KResult = {
                PK: LocalDataFromSales.KResult.PK,
                Head: LocalDataFromSales.KResult,
                InvGrid: LocalDataFromSalesItems.KResult
            };
        };
    };

    return await jVarLocalReturnObject;
};

let LocalNextRowOnwards = async ({ inPk, inItemName, inPrice, inQty }) => {
    let jVarLocalReturnObject = { KTF: false, KResult: "" };

    let LocalDataFromSalesItems = await FPushData({
        inDataToInsert: {
            FK: inPk,
            ProductName: inItemName,
            Price: inPrice, Qty: inQty
        }
    });

    if (LocalDataFromSalesItems.success) {
        jVarLocalReturnObject.KTF = true;
        jVarLocalReturnObject.KResult = LocalDataFromSalesItems.KResult;
    };

    return await jVarLocalReturnObject;
};

let LocalPostSweetAlert = async ({ inItemName, inPrice, inQty }) => {
    let jVarLocalFromMaxDate = await MaxDate();
    let jVarLocalPresentPkHtml = document.getElementById("PkId");
    let jVarLocalPresentPk;
    let jVarLocalTemplate;
    let jVarLocalDataToShow;
    let jVarLocalDateDiff;
    let jVarLocalSystemDate = DateFuncs.yyyyMMdd({ inDate: new Date() });

    if (jVarLocalSystemDate >= jVarLocalFromMaxDate || jVarLocalFromMaxDate === undefined) {
        if (jVarLocalPresentPkHtml === null) {
            let LocalReturnFromFirstRow = await FirstRowSave({ inItemName, inPrice, inQty });

            if (LocalReturnFromFirstRow.KTF) {
                jVarLocalPresentPk = LocalReturnFromFirstRow.KResult.PK;
            };
        } else {
            jVarLocalPresentPk = parseInt(jVarLocalPresentPkHtml.innerText);

            await LocalNextRowOnwards({
                inPk: jVarLocalPresentPk,
                inItemName, inPrice,
                inQty
            });
        };

        if (jVarLocalPresentPk > 0) {
            await ToShowBillId({ inPk: jVarLocalPresentPk });

            // jVarLocalTemplate = await FirstRowSaved();
            // jVarLocalDataToShow = await LocalShowByPk({ inPk: jVarLocalPresentPk });

            // document.getElementById("ShowBillId").innerHTML = Handlebars.compile(jVarLocalTemplate)(jVarLocalDataToShow);

        };
    } else {
        jVarLocalDateDiff = (new Date(jVarLocalSystemDate) - new Date(jVarLocalFromMaxDate)) / (1000 * 60 * 60 * 24);

        swal.fire(`Change system Date to ${jVarLocalFromMaxDate}`);
    };
};

let LocalCreateNew = async (inHeadPk) => {
    if (inHeadPk > 0) {
        Swal.fire({
            title: 'Member Name',
            html: `<input type="text" id="Member" class="swal2-input" placeholder="Member" list="Masters-Members">`,
            confirmButtonText: 'Save and Print',
            focusConfirm: false,
            preConfirm: () => {
                const Member = Swal.getPopup().querySelector('#Member').value

                return { Member: Member }
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                if (result.value.Member.length > 0) {
                    let jVarLocalMember = result.value.Member;
                    let jVarLocalDataToUpdate = {
                        Member: jVarLocalMember
                    };

                    let jVarLocalFromMember = await this.ApiFuncs.Transactions.Sales.Update({
                        inDataToUpdate: jVarLocalDataToUpdate, inPk: inHeadPk
                    });

                    if (jVarLocalFromMember.success) {
                        BillPrintCommonFuncs.PrintOriginalBillWithDuplicate(inHeadPk);

                        jFCommonFuncsClass.JsFuncs.Transactions.Sales.FirstRow();
                    };
                };
            };
        });
    };
};

export { CustomersSaveFunc };