import { Update as DalUpdate } from "../../Dal/Sales/Update.js";
import { StartFunc as FirstRowStartFunc } from "./FirstRow.js";

let CreateNew = async (event) => {
    let jVarLocalCurrentTarget = event.currentTarget;
    let jVarLocalHeadPK = jVarLocalCurrentTarget.dataset.pk;

    if (jVarLocalHeadPK > 0) {
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

                    let jVarLocalFromMember = await DalUpdate({
                        inDataToUpdate: jVarLocalDataToUpdate, inPk: jVarLocalHeadPK
                    });

                    if (jVarLocalFromMember.success) {
                        BillPrintCommonFuncs.PrintOriginalBillWithDuplicate(jVarLocalHeadPK);
                        console.log("bbbbbbbbbbb");
                        FirstRowStartFunc();
                        //   jFCommonFuncsClass.JsFuncs.Transactions.Sales.FirstRow();
                    };
                };
            };
        });
    };
};

export { CreateNew }