var ApiUrl = '';
var LiveWebUrl = $("#LiveWebUrl").val();
var IfArabic = window.localStorage.language == 'ar';
var FlightNumber;
let ArabicMonth = '';

$(document).ready(function () {

    ApiUrl = $("#baseApiUrl").val();
})

$(document).on('click', '#FlightStatusSearch', function () {
    validateLangauge()
    if ($("#flightStatusForm").valid()) {
        FlightNumber = $('#FlightStatusNumber').val();
        GetAllFlightStatusByFlightNumber(FlightNumber)
    }

   
})


function validateLangauge() {

    $("#flightStatusForm").validate({

        rules: {
            FlightStatus: {
                required: true,

            },
        },
        messages: {
            FlightStatus: IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",

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
function GetAllFlightStatusByFlightNumber(FlightNumber) {
    $('#preloader').show()
    postRequest(ApiUrl+"Flight/GetFlightStatusByFlightId/" + FlightNumber, null, function (res) {
        debugger
        $('#preloader').show();
        if (res.status == 200) {
            

            if (res.data == null || res.data.length == 0) {
                swal({
                    title: IfArabic ? "الرحلة غير موجودة" : "Flight doesn't exist.",
                    icon: "warning",
                    buttons: [null, IfArabic ? "موافق" : "OK"],
                }).then(function (isConfirm) {
                    window.location.reload()
                });
            }

            $("#FlightStatusFillAppend").html('');
            
            for (var i = 0; i < res.data.length; i++) {
                

                if (IfArabic) {
                    var status = res.data[i].fltStatus == "O" ? "فتح" : res.data[i].fltStatus == "CKN" ? "'اتمام إجراءات السفر إلكترونيا'" : res.data[i].fltStatus == "I" ? "'اتمام إجراءات السفر إلكترونيا'" : res.data[i].fltStatus == "B" ? "يتأكد" : "انتظار";
                    $("#FlightStatusFillAppend").append(`

                    <div class="col-md-5">

                     <div class="card mb-3" style="width:100%; border-radius: 20px; box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;">
                         <div class="card-body p-4">
                              <div style="display: flex; justify-content: space-between;">
                                 <p style="color: #b68150;">تاريخ الرحلة:&nbsp;<b  style="color: #67686b;">${moment(res.data[i].fltDateTime).format('DD-MMM-yyyy').toLocaleUpperCase()}</b></p>
                                 <p style="color: #b68150;">ETD:&nbsp;<b  style="color: #67686b;">${moment(res.data[i].fltDateTime).format('HH:mm').toLocaleUpperCase()}</b></p>
                             </div>

                             <div style="display: flex; justify-content: space-between;">
                                 <p style="color: #b68150;">رقم الرحلة الجوية:&nbsp;<b style="color: #67686b;">${res.data[i].fltNumber.toLocaleUpperCase()}</b></p>
                                 <p style="color: #b68150;">لون الرحلة:&nbsp;<b style="color: #67686b;">${res.data[i].fltColor.toLocaleUpperCase()}</b></p>
                             </div>
                            <div style="display: flex; justify-content: space-between;">
                                 <p style="color: #b68150;">حالة الرحلة:&nbsp;<b style="color: #67686b;">${status}</b></p>
                             </div>
                             

                         </div>

                     </div>

                     <!-- End -->
                 </div>`); 
                    
                    ArabicMonth = moment(res.data[i].fltDateTime).format('DD-MMM-YYYY')
                    debugger
                    
                        if (moment(res.data[i].fltDateTime).format('DD-MMM-YYYY').includes('Jan')) {
                            $("#FlightStatusFillAppend").find(`#arabicDate${i}`).text(ArabicMonth.replace('Jan', 'كانون الثاني').replace('\t', ''))
                        }
                        if (moment(res.data[i].fltDateTime).format('DD-MMM-YYYY').includes('Feb')) {
                            $("#FlightStatusFillAppend").find(`#arabicDate${i}`).text(ArabicMonth.replace('Feb', 'شباط').replace('\t', ''))
                        }
                        if (moment(res.data[i].fltDateTime).format('DD-MMM-YYYY').includes('Mar')) {
                            $("#FlightStatusFillAppend").find(`#arabicDate${i}`).text(ArabicMonth.replace('Mar', 'آذار').replace('\t', ''))
                        }
                        if (moment(res.data[i].fltDateTime).format('DD-MMM-YYYY').includes('Apr')) {
                            $("#FlightStatusFillAppend").find(`#arabicDate${i}`).text(ArabicMonth.replace('Apr', 'نيسان').replace('\t', ''))
                        }
                        if (moment(res.data[i].fltDateTime).format('DD-MMM-YYYY').includes('May')) {
                            $("#FlightStatusFillAppend").find(`#arabicDate${i}`).text(ArabicMonth.replace('May', 'أيار').replace('\t', ''))
                        }
                        if (moment(res.data[i].fltDateTime).format('DD-MMM-YYYY').includes('Jun')) {
                            $("#FlightStatusFillAppend").find(`#arabicDate${i}`).text(ArabicMonth.replace('Jun', 'حزيران').replace('\t', ''))
                        }
                        if (moment(res.data[i].fltDateTime).format('DD-MMM-YYYY').includes('Jul')) {
                            $("#FlightStatusFillAppend").find(`#arabicDate${i}`).text(ArabicMonth.replace('Jul', 'تموز').replace('\t', ''))
                        }
                        if (moment(res.data[i].fltDateTime).format('DD-MMM-YYYY').includes('Aug')) {
                            $("#FlightStatusFillAppend").find(`#arabicDate${i}`).text(ArabicMonth.replace('Aug', 'آب').replace('\t', ''))
                        }
                        if (moment(res.data[i].fltDateTime).format('DD-MMM-YYYY').includes('Sep')) {
                            $("#FlightStatusFillAppend").find(`#arabicDate${i}`).text(ArabicMonth.replace('Sep', 'أيلول').replace('\t', ''))
                        }
                        if (moment(res.data[i].fltDateTime).format('DD-MMM-YYYY').includes('Oct')) {
                            $("#FlightStatusFillAppend").find(`#arabicDate${i}`).text(ArabicMonth.replace('Oct', 'تشرين الأول').replace('\t', ''));
                        }
                        if (moment(res.data[i].fltDateTime).format('DD-MMM-YYYY').includes('Nov')) {
                            $("#FlightStatusFillAppend").find(`#arabicDate${i}`).text(ArabicMonth.replace('Nov', 'تشرين الثاني').replace('\t', ''));
                        }
                        if (moment(res.data[i].fltDateTime).format('DD-MMM-YYYY').includes('Dec')) {
                            $("#FlightStatusFillAppend").find(`#arabicDate${i}`).text(ArabicMonth.replace('Dec', 'كانون الأول').replace('\t', ''));
                        }
                    
                }
                else {
                    var FltDate = moment(res.data[i].fltDateTime).locale('en').format('DD-MMM-YYYY')
                    var FltTime = moment(res.data[i].fltDateTime).locale('en').format('HH:mm')
                    
                    $("#FlightStatusFillAppend").append(`

                    <div class="col-md-6">

                     <div class="card mb-3" style="width:100%; border-radius: 20px; box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;">
                         <div class="card-body p-4">

                             <div style="display: flex; justify-content: space-between;">
                                 <p style="color: #b68150;">Flight Date:&nbsp;<b  style="color: #67686b;">${FltDate}</b></p>
                                 <p style="color: #b68150;">ETD:&nbsp;<b  style="color: #67686b;">${FltTime}</b></p>
                             </div>

                             <div style="display: flex; justify-content: space-between;">
                                 <p style="color: #b68150;">Flight no:&nbsp;<b style="color: #67686b;">${res.data[i].fltNumber.toLocaleUpperCase()}</b></p>
                                 <p style="color: #b68150;">Flight Color:&nbsp;<b style="color: #67686b;">${res.data[i].fltColor.toLocaleUpperCase()}</b></p>
                             </div>
                            <div style="display: flex; justify-content: space-between;">
                                 <p style="color: #b68150;">Flight Status:&nbsp;<b style="color: #67686b;">${res.data[i].fltStatus.toLocaleUpperCase()}</b></p>
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
                    title: "Succes",
                    title: IfArabic ? "النجاح" : "Succes",
                    text: IfArabic ? "النجاح" : "Succes",
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
                text: IfArabic ? "هناك خطأ ما!" : "Something Went Wrong!",
                icon: "error",
                dangerMode: true,
                buttons: [null, IfArabic ? "موافق" : "OK"],
            })
        }
    });
}