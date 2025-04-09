var ApiUrl = $("#baseApiUrl").val();
let LiveWebUrl = $("#LiveWebUrl").val();
var IfArabic = window.localStorage.language == 'ar';


$(document).ready(function () {
    debugger
    /*Fonts*/
    debugger
    if (IfArabic) {
        $('#fromOneWayDate').prop('placeholder', 'من تاريخ'),
        $('#toOneWayDate').prop('placeholder', 'إلى تاريخ')
    }
    //IfArabic ?
    //    [
          
    //        $('label').removeClass('fs-14 text-custom-black fw-900'),
    //        $('input').removeClass('fs-14 text-custom-black fw-900'),
    //        $('label').addClass('labelArabic'),
    //        $('input').addClass('inputArabic'),
    //        $('h3>b , h1,h2,h3,h4,h5,h6, p,div').addClass('headingArabic'),
    //        $('#fromOneWayDate').prop('placeholder', 'من تاريخ'),
    //        $('#toOneWayDate').prop('placeholder', 'إلى تاريخ'),
    //        $('a,button').addClass('a_buttonArabic')



    //    ]


    //    :
    //    [
    //        $('input').addClass('inputEnglish'),

    //    ]


    /*EndFonts*/
    $('#preloader').show();
    
    GetAllDropDown();
    $('#Arabic , #English').on('click', function () {

        window.location.reload()
    })

});

$('#Checkin').on('click', function () {
    debugger
    if (localStorage.userData == undefined) {
        swal( {
            title: IfArabic ?  "معلومة":"Information",
            text: IfArabic ? "الرجاء تسجيل الدخول حتى تستطيع الحجز" : "Please login to check-in to your flight.",
            icon: "warning",
            buttons: [null, IfArabic ? "موافق" : "OK"],
        });
    }
    else {
        window.location.href = $("#LiveWebUrl").val() + "/Home/ConfirmCheckin";


    }
})
$('#manageBooking').on('click', function () {
    debugger
    if (localStorage.userData == undefined) {
        swal({
            title: IfArabic ?"معلومة": "Information",
            text: IfArabic ? "الرجاء تسجيل الدخول حتى تستطيع ادارة الحجوزات" : "Please login to manage your flights.",
            icon: "warning",
            buttons: [null, IfArabic ? "موافق" : "OK"],
        });
    }
    else {
        window.location.href = $("#LiveWebUrl").val() + "/Home/bookinghistory";


    }
})
$('#FlightStatus').on('click', function () {
    
    
        window.location.href = $("#LiveWebUrl").val() + "/Home/FlightStatus";


    
    
    
})
$('#Cargo').on('click', function () {


    window.location.href = $("#LiveWebUrl").val() + "/Home/CargoStatus";





})
$('#Baggage').on('click', function () {
    
   
        swal({
            title: IfArabic ?"قريبا": "Coming Soon",
            text: IfArabic ?"هذه الصفحة قيد الإنشاء": "This page is in under construction ",
            icon: "warning",
            buttons: [null, IfArabic ? "موافق" : "OK"],
        });
    
    
})



function GetAllDropDown() {

    $('#preloader').show()

    postRequest(ApiUrl+"Flight/GetAllDropdowns", null, function (res) {




        if (res.status == 200) {

            $("#fromOneWayDropDown").change(function () {
                debugger
                $("#toOneWay option").removeAttr('disabled', 'disabled');

                var BaseId = $(this).find(':selected').attr('data-id');
                $("#toOneWay option[value=" + BaseId + "]").attr('disabled', 'disabled')

                $("#toOneWay").selectpicker("refresh");
            });



            if (res.data && res.data != null) {
                debugger
                if (IfArabic) {
                    fillData(res.data.destination, "#temp_FromDestinationAR", "#fromOneWayDropDown", true);
                    fillData(res.data.destination, "#temp_DestinationAR", "#toOneWay", true);
                    //fillData(res.data.destination, "#temp_FromDestination", "#fromOneWayDropDown", true);
                    //fillData(res.data.destination, "#temp_Destination", "#toOneWay", true);
                    $('.dropdown-menu, .filter-option').removeClass('pull-left').addClass('text-right')
                    $('span.dropdown-item-inner').addClass('text-right').css({"display":"flex","justify-content":"space-between"})
                    $('span.check-mark').css({"position":"relative"})
                    
                }
                else {
                    fillData(res.data.destination, "#temp_FromDestination", "#fromOneWayDropDown", true);
                    fillData(res.data.destination, "#temp_Destination", "#toOneWay", true);
                   
                }
                $('#preloader').hide();
                
            }
        }
        if (res.status == 401) {
            $('#preloader').hide();
            localStorage.removeItem("Menu");
            localStorage.removeItem("userData");
            window.location.href = baseWebUrl + "Dashboard";
        }
        if (res.status == 403) {

            $('#preloader').hide();
            swal( {
                title: IfArabic ? "خطأ" : "Error",
                text: IfArabic ? "هناك خطأ ما!" : res.responseMsg,
                icon: "error",
                dangerMode: true,
                buttons: [null, IfArabic ? "موافق" : "OK"],
            });
        }
        if (res.status == 500) {
            $('#preloader').hide();
            swal({
                title: IfArabic ? "خطأ" : "Error",
                text: IfArabic ? "هناك خطأ ما!" : res.responseMsg,
                icon: "error",
                dangerMode: true,
                buttons: [null, IfArabic ? "موافق" : "OK"],
            })
        }

        if (res.status == 420) {
            $('#preloader').hide();
            localStorage.removeItem("Menu");
            localStorage.removeItem("userData");
            window.location.href = baseWebUrl + "Dashboard";
        }

        if (res.status == 600) {
            $('#preloader').hide();
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





$("#searchFlight").click(function () {

    validateLangauge()
    
   


    if ($("#fromOneWay").valid()) {
      
        if (IfArabic) {
            var FromDate = moment($("#fromOneWayDate").val(), "DD-MMM-YYYY").locale("en").format("DD-MMM-YYYY");

            var ToDate = moment($("#toOneWayDate").val(), "DD-MMM-YYYY").locale("en").format("DD-MMM-YYYY");

            window.location = LiveWebUrl + `/Home/FlightResults?from=${$('#fromOneWayDropDown').val()}&to=${$("#toOneWay").val()}&fromDate=${FromDate}&to${ToDate}`;
        }
        else {
            debugger
            window.location = LiveWebUrl + `/Home/FlightResults?from=${$('#fromOneWayDropDown').val()}&to=${$("#toOneWay").val()}&fromDate=${$("#fromOneWayDate").val()}&to${$("#toOneWayDate").val()}`;
        }

        

    }
});


function validateLangauge() {
   
        $("#fromOneWay").validate({

            rules: {
                fromOneWayDropDown: {
                    required: true,

                },
                toOneWay: {
                    required: true,
                },
                fromOneWayDatevalid: {
                    required: true,
                   

                },
                toOneWayDatevalid: {
                    required: true,
                   

                }


            },
            messages: {
                
                fromOneWayDropDown: IfArabic ? "هذه الخانة مطلوبه.": "This field is required.",
                toOneWay: IfArabic ? "هذه الخانة مطلوبه.": "This field is required.",
                fromOneWayDatevalid: IfArabic ? "هذه الخانة مطلوبه." : "This field is required.",
                toOneWayDatevalid: IfArabic ? "هذه الخانة مطلوبه.": "This field is required.",
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
                text: IfArabic ? "هناك خطأ ما!" : res.responseMsg,
                icon: "error",
                dangerMode: true,
                buttons: [null, IfArabic ? "موافق" : "OK"],
            })
        }
    });
}


function fillData(res, tempContainerId, fillContainerId, IsRefresh) {
    if (res) {
        $(fillContainerId).html('');
        let template = $(tempContainerId).html()
        var templateScript = Handlebars.compile(template);
        $(fillContainerId).html(templateScript(res));
        if (IsRefresh)
            $(fillContainerId).selectpicker('refresh');
    }
}


$("#toOneWay").change(function () {
    $('#toOneWay-error').remove();
});
$("#fromOneWayDropDown").change(function () {
    $('#fromOneWayDropDown-error').remove();
});




$('#fromOneWayDate').datepicker({

    onSelect: function () {
        debugger
        if (IfArabic) {

            $("#fromOneWayDate").val(moment($("#fromOneWayDate").val(), "DD-MMM-YYYY").locale("ar").format("DD-MMM-YYYY"));

        }

    },

    dateFormat: 'dd-M-yyyy'
})

$('#toOneWayDate').datepicker({

    onSelect: function () {
        debugger
        if (IfArabic) {

            $("#toOneWayDate").val(moment($("#toOneWayDate").val(), "DD-MMM-YYYY").locale("ar").format("DD-MMM-YYYY"));

        }

    },

    dateFormat: 'dd-M-yyyy'
})