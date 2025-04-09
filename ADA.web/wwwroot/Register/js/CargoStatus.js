var ApiUrl = '';
var LiveWebUrl = $("#LiveWebUrl").val();
var IfArabic = window.localStorage.language == 'ar';
var Barcode;
let ArabicMonth;
let ArToEngChar = [
    {
        "٠": "0"
    },
    {
        "١": "1"
    },
    {
        "٢": "2"
    },
    {
        "٣": "3"
    },
    {
        "٤": "4"
    },
    {
        "٥": "5"
    },
    {
        "٦": "6"
    },
    {
        "٧": "7"
    },
    {
        "٨": "8"
    },
    {
        "٩": "9"
    },
];
$(document).ready(function () {

    ApiUrl = $("#baseApiUrl").val();
    if (IfArabic) {
        $('#Barcode').prop('placeholder', 'أدخل الرمز الشريطي / الرقم المرجعي للشاحن')
    }
    
})

$(document).on('click', '#CargoStatusSearch', function () {
    validateLangauge()
    if ($("#cargoForm").valid()) {
        Barcode = $('#Barcode').val();
        GetAllCargoStatusByBarcode(Barcode)
    }
    
    
   
})

function replaceMultipleETD(textDate, ArToEngChar) {
    for (const [i, each] of ArToEngChar.entries()) {
        const previousChar = Object.keys(each);
        const newChar = Object.values(each);

        textDate = textDate.replaceAll(previousChar, newChar);
    }

    return textDate;
}

function replaceMultipleCargoDate(textTime, ArToEngChar) {
    for (const [j, each] of ArToEngChar.entries()) {
        const previousChar = Object.keys(each);
        const newChar = Object.values(each);

        textTime = textTime.replaceAll(previousChar, newChar);
    }

    return textTime;
}

function validateLangauge() {

    $("#cargoForm").validate({

        rules: {
            CargoStatus: {
                required: true,

            },
        },
        messages: {
            CargoStatus: IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
           
        },
        highlight: function (element) {
            $(element).parent().addClass('has-error');
        },
        unhighlight: function (element) {
            $(element).parent().removeClass('has-error');
        },
        errorElement: 'span',
        errorClass: 'validation-error-message bold',
        errorPlacement: function (error, element) {
            error.appendTo(element.parent());
        },


    });


}
function GetAllCargoStatusByBarcode(Barcode) {
    $('#preloader').show()
    postRequest(ApiUrl + "Cargo/GetAllCargoStatusByBarcode/" + Barcode, null, function (res) {
        debugger
        $('#preloader').show();
        if (res.status == 200) {


            if (res.data.length == 0) {
                swal({
                    title: IfArabic ? "سجل اليضائع غير موجود" : "Cargo record doesn't exist.",
                    icon: "warning",
                    buttons: [null, IfArabic ? "موافق" : "OK"],
                }).then(function (isConfirm) {
                    $('#preloader').hide();
                    window.location.reload()
                });
            }

            $("#CargoStatusFillAppend").html('');

            for (var i = 0; i < res.data.length; i++) {

                if (IfArabic) {
                    var Direction = res.data[0].frtDirection == "O" ? "منفتح" : "وارد";
                    var Status = res.data[0].frtStatus == "R" ? "تلقى" : res.data[0].frtStatus == "S" ? "شحنها" : res.data[0].frtStatus == "X" ? "تم الحذف" : "مرفوض";
                    const textCargoDate = moment(res.data[0].dateTimeRcvd).format('DD-MMM-YYYY');
                    const resultCargoDate = replaceMultipleCargoDate(textCargoDate, ArToEngChar);
                    const textETD = moment(res.data[0].flightDateTime).format('DD-MMM-YYYY HH:mm');
                    const resultETD = replaceMultipleETD(textETD, ArToEngChar);

                    $("#CargoStatusFillAppend").append(`

                    <div class="col-md-6">

                     <div class="card mb-3" style="width:100%; border-radius: 20px; box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;">
                         <div class="card-body p-4">
                             <div style="display: flex; justify-content: space-between;">
                                 <P style="color: #b68150;">رقم الرحلة الجوية:&nbsp;<b style="color: #67686b;">${res.data[0].fltNumber}</b></P>
                                 <p style="color: #b68150;">ETD٠:&nbsp;<b style="color: #67686b;">${resultETD}</b></p>

                             </div>
                             <div style="display: flex; justify-content: space-between;">
                                 <P  style="color: #b68150;">تاريخ الشحن&nbsp;<b id="arabicDate${i}" style="color: #67686b;">${resultCargoDate}</b></P>

                                 <P style="color: #b68150;">اتجاه:&nbsp;<b style="color: #67686b;">${Direction}</b></P>

                             </div>

                             <div style="display: flex; justify-content: space-between;">

                                 <P style="color: #b68150;">الحالة:&nbsp;<b style="color: #67686b;">${Status}</b></P>
                                 <P style="color: #b68150;">أسم المورد: &nbsp;<b style="color: #67686b;">${res.data[0].shipperName}</b></P>

                             </div>

                             <div style="display: flex; justify-content: space-between;">

                                 <P style="color: #b68150;">ترجمة شفرة التعرف &nbsp;<b style="color: #67686b;">${res.data[0].barCode}</b></P>
                                 <P style="color: #b68150;">رقم مرجع الشاحن: &nbsp;<b style="color: #67686b;">${res.data[0].shipperRefNum}</b></P>

                             </div>

                         </div>

                     </div>

                     <!-- End -->
                 </div>`);

                   
                   
                }
                else {
                    var Direction = res.data[0].frtDirection == "O" ? "OUTGOING" : "INCOMING";
                    var Status = res.data.frtStatus == "R" ? "RECEIVED" : res.data[0].frtStatus == "S" ? "SHIPPED" : res.data[0].frtStatus == "X" ? "DELETED" : "REJECTED";
                    var CargoDate = moment(res.data[0].dateTimeRcvd).locale('en').format('DD-MMM-YYYY')
                    var FlightTime = moment(res.data[0].flightDateTime).locale('en').format('DD-MMM-YYYY HH:mm')
                    
                    $("#CargoStatusFillAppend").append(`

                    <div class="col-md-6">

                     <div class="card mb-3" style="width:100%; border-radius: 20px; box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;">
                         <div class="card-body p-4">

                             <div style="display: flex; justify-content: space-between;">
                                 <P style="color: #b68150;">Flight Number:&nbsp;<b style="color: #67686b;">${res.data[0].fltNumber}</b></P>

                                 <P style="color: #b68150;">ETD:&nbsp;<b style="color: #67686b;">${FlightTime}</b></P>

                             </div>
                             <div style="display: flex; justify-content: space-between;">
                                 <P style="color: #b68150;">Cargo Date:&nbsp;<b style="color: #67686b;">${CargoDate}</b></P>

                                 <P style="color: #b68150;">Direction:&nbsp;<b style="color: #67686b;">${Direction}</b></P>

                             </div>

                             <div style="display: flex; justify-content: space-between;">

                                 <P style="color: #b68150;">STATUS:&nbsp;<b style="color: #67686b;">${Status}</b></P>
                                 <P style="color: #b68150;">SHIPPER NAME: &nbsp;<b style="color: #67686b;">${res.data[0].shipperName}</b></P>

                             </div>

                             <div style="display: flex; justify-content: space-between;">

                                 <P style="color: #b68150;">BARCODE: &nbsp;<b style="color: #67686b;">${res.data[0].barCode}</b></P>
                                 <P style="color: #b68150;">SHIPPER REF NUMBER: &nbsp;<b style="color: #67686b;">${res.data[0].shipperRefNum}</b></P>

                             </div>

                         </div>

                     </div>

                     <!-- End -->
                 </div>`);
                }
            }

            $('#preloader').delay(100).fadeOut('slow', function () {
                $(this).hide();
            });


            if (res.data != null) {
                swal(res.responseMsg, {
                    title: IfArabic ?"نجاح": "Succes",
                    text: IfArabic ? "نجاح" : "Succes",
                    icon: "Succes",
                    buttons: [null, IfArabic ? "موافق" : "OK"],
                });


            }


        }



        if (res.status == 401) {

            localStorage.removeItem("Menu");
            localStorage.removeItem("userData");
            window.location.href = baseWebUrl + "Dashboard";
        }
        if (res.status == 403) {


            swal(res.responseMsg, {
                title: IfArabic ? "خطأ" : "Error",
                text: IfArabic ? "هناك خطأ ما!" : res.responseMsg,
                icon: "error",
                dangerMode: true,
                buttons: [null, IfArabic ? "موافق" : "OK"],
            });
        }
        if (res.status == 500) {

            swal({
                title: IfArabic ? "خطأ" : "Error",
                text: IfArabic ? "هناك خطأ ما!" : res.responseMsg,
                icon: "error",
                dangerMode: true,
                buttons: [null, IfArabic ? "موافق" : "OK"],
            })
        }

        if (res.status == 420) {

            localStorage.removeItem("Menu");
            localStorage.removeItem("userData");
            window.location.href = baseWebUrl + "Dashboard";
        }

        if (res.status == 600) {

            swal({
                title: IfArabic ? "خطأ" : "Error",
                text: IfArabic ? "هناك خطأ ما!" : res.responseMsg,
                icon: "error",
                dangerMode: true,
                buttons: [null, IfArabic ? "موافق" : "OK"],
            })
        }

    });

}

function postRequest(url, requestData, handledata) {
    $.ajax({
        type: 'POST',
        contentType: 'application/json;charset=utf-8',
        dataType: "json",
        url: url,
        headers: {

        },

        data: JSON.stringify(requestData),
        success: function (data, textstatus, xhr) {
            handledata(data);
        },
        error: function (xhr, textstatus, errorThrown) {
            swal({
                title: IfArabic ? "خطأ" : "Error",
                text: IfArabic ? "عفواً! هنالك خطأ ما" : "Ooops! Something went wrong.",
                icon: "error",
                dangerMode: true,
                buttons: [null, IfArabic ? "موافق" : "OK"],
            })
        }
    });
}