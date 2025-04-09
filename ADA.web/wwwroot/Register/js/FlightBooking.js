var ApiUrl = $("#baseApiUrl").val();
var LiveWebUrl = $("#LiveWebUrl").val();
var FlightId = window.location.search.slice(1).split('&')[0].split('FlightId=')[1];
var GroupMemberIds = window.localStorage.getItem('GroupMemberIds');
var UserId = JSON.parse(window.localStorage.getItem('userData')).id;
var IfArabic = window.localStorage.language == 'ar';
var lang = window.localStorage.language ;
var memberCardBirthdate;
var memberCardBirthdateArabic;

$(document).ready(function () {
    
    $('#preloader').show()
    if (JSON.parse(localStorage.userData).registerType == 'Individual') {
        $('.slideArrow').hide()
    }


    if (localStorage.getItem("userData") === null) {
        window.location.href = LiveWebUrl+"/Register/Register";
    }


    $("#Expiry").bind('change keyup', function () {
        var TodayDate = new Date();
        var endDate = new Date(Date.parse($("#Expiry").val()));
        
        if (endDate > TodayDate) {

            $('#Status').addClass('successtext');
            $('#Status').val('Valid')
        }
        else {
            $('#Status').removeClass('successtext');
        }
        if (endDate < TodayDate) {

            $('#Status').addClass('errortext');
            $('#Status').val('Invalid')
        }
        else {
            $('#Status').removeClass('errortext');
        }
    });

    if (GroupMemberIds != null) {

        GetFlightAndMembersDetails();
    }
    else {

        GetSingleFlightAndMembersDetails();
    }


});



function GetFlightAndMembersDetails() {

    $('#preloader').show()

    var obj = {

        "fltId": Number(FlightId),
        "membersIds": GroupMemberIds.split(',').map(x => Number(x)),
        "RegisterType": JSON.parse(window.localStorage.getItem('userData')).registerType
    }

    postRequest(ApiUrl + "Flight/GetFlightAndMembersDetails", obj, function (res) {

        if (res.status == 200) {
            if (res.data && res.data != null) {
                if (res.data.length == 1) {
                    $('.slideArrow').hide()
                }
                MembersCardsAppend(res.data);
                
                if ($(IfArabic)) {
                    $('.filter-option').attr('Language', language);
                   
                    $('ul').attr('Language', language);
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
                icon: "error",
                title: IfArabic ? "خطأ" : "Error",
                text: res.responseMsg,
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
                text: IfArabic ? "هناك خطأ ما!" :res.responseMsg,
                icon: "error",
                dangerMode: true,
                buttons: [null, IfArabic ? "موافق" : "OK"],
            })
        }

    });

}


function GetSingleFlightAndMembersDetails() {

    $('#preloader').show()

    var obj = {
        "fltId": Number(FlightId),
        "membersIds":[Number(JSON.parse(window.localStorage.getItem('userData')).id)],
        "RegisterType": JSON.parse(window.localStorage.getItem('userData')).registerType
    }

    postRequest(ApiUrl + "Flight/GetFlightAndMembersDetails", obj, function (res) {

        if (res.status == 200) {
            if (res.data && res.data != null) {
                
                MembersCardsAppend(res.data);
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
            swal(res.responseMsg, {
                title: IfArabic ? "خطأ" : "Error",
                text: IfArabic ? "هناك خطأ ما!" : "Something went wrong",
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
                text: res.responseMsg,
                icon: "error",
                dangerMode: true,
                buttons: [null, IfArabic ? "موافق" : "OK"],
            })
        }

    });

}



$("#ConfirmBooking").click(function () {

   

        $('#preloader').show();
    
        var DataArr = [];
        
    for (var i = 0; i < $(".Memberbox").length; i++) {
            var arToengBirthdate = moment($(`#MembersCard${i}`).find("#DOB").val(), 'DD-MMM-YYYY').locale('en').format('YYYY-MM-DD')
            var obj = {
                PaxName: $(`#MembersCard${i}`).find("#Name").val(),
                PaxIDNum: $(`#MembersCard${i}`).find("#Passport").val(),
                PaxIDType: $(`#MembersCard${i}`).find("#documentType").val(),
                PaxIDExpiry: IfArabic ? arToengBirthdate : moment($(`#MembersCard${i}`).find("#DOB").val()).locale("en").format("YYYY-MM-DD"),
                PaxBDay: IfArabic ? arToengBirthdate : moment($(`#MembersCard${i}`).find("#DOB").val()).locale("en").format("YYYY-MM-DD"),
                PaxNationality: $(`#MembersCard${i}`).find("#Nationality").attr("data-id"),
                PaxDestination: Number($(`#MembersCard${i}`).find("#ddlDestination").attr("data-id")),
                PaxMobNum: $(`#MembersCard${i}`).find("#Phone").val(),
                PaxGender: $(`#MembersCard${i}`).find("#Gender").val()[0],
                RsvEMail: $(`#MembersCard${i}`).find("#Email").val(),
                GlobalFKId: $(`#MembersCard${i}`).find("#HdUserId").val(),
                FltID: Number(FlightId),
                UserId: Number(UserId),
                lang: lang,
                CreatedBy: JSON.parse(localStorage.getItem('userData')).id,
                ActionSource: 'CustomerWeb'
            }

            DataArr.push(obj);
        }

    var Data = {
            Lang: lang,
            Groupreservation: DataArr,
            

        }

    postRequest(ApiUrl + "Reservation/Add", Data, function (res) {

            if (res.status == 200) {
                if (res.data && res.data != null) {

                    swal( {
                        icon: "success",
                        title: IfArabic ? "النجاح": "success",
                        text: IfArabic ? "تم الحجز للرحلة بنجاح" : "Flight reservation successful.",
                        buttons: [null, IfArabic ? "موافق" : "OK"],
                        closeOnClickOutside: false
                    }).then(function (isConfirm) {


                        window.location.href = LiveWebUrl+"/Home/BookingHistory?Id=" + UserId;
                    });
                }
                $('#preloader').hide();
            }
            if (res.status == 400) {
               
                $('#preloader').hide();
                localStorage.removeItem("Menu");
                localStorage.removeItem("userData");
                window.location.href = baseWebUrl + "Dashboard";
            }
            if (res.status == 401) {
               
                $('#preloader').hide();
                localStorage.removeItem("Menu");
                localStorage.removeItem("userData");
                window.location.href = baseWebUrl + "Dashboard";
            }
            if (res.status == 403) {

                $('#preloader').hide();
                swal(res.responseMsg, {
                    icon: "error",
                    title: "Error",
                });
            }
            if (res.status == 500) {
                $('#preloader').hide();
                swal({
                    title: IfArabic ?"خطأ": "Error",
                    text: IfArabic ?"تحتاج إلى اختيار شخص بالغ أولاً أثناء الحجز ، لا يستطيع الرضيع السفر بمفرده.": res.responseMsg,
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
                    text: res.responseMsg,
                    icon: "error",
                    buttons: [null, IfArabic ? "موافق" : "OK"],
                    dangerMode: true,
                })
            }

        });


   // }

});


$("#FormReservation").validate({

    rules: {
        Name: {
            required: true,


        },
        Name: {
            required: true,

        },
        Email: {
            required: true,

        },
        Password: {
            required: true,

        }, Email: {
            required: true,

        },
        DOB: {
            required: true,

        },
        documentType: {
            required: true,

        },
        Passport: {
            required: true,

        },
        Expiry: {
            required: true,

        },
        //Status: {
        //    required: true,

        //},
        Nationality: {
            required: true,

        },
        ddlDestination: {
            required: true,

        },

        Phone: {
            required: true,

        },
        Gender: {
            required: true,

        },
    },
    messages: {
        Name: "This field is required.",
        Email: "This field is required.",
        DOB: "This field is required.",
        documentType: "This field is required.",
        Passport: "This field is required.",
        Expiry: "This field is required.",
      /*  Status: "This field is required.",*/
        Nationality: "This field is required.",
        ddlDestination: "This field is required.",
        Phone: "This field is required.",
        Gender: "This field is required.",

    },
    highlight: function (element) {
        $(element).parent().addClass('has-error');
    },
    unhighlight: function (element) {
        $(element).parent().removeClass('has-error');
    },
    errorElement: 'span',
    errorClass: 'validation-error-message bold mt-2 text-left',
    errorPlacement: function (error, element) {
        error.appendTo(element.parent());
    },


});

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
                title: "Error",
                text: IfArabic ? "عفواً! هنالك خطأ ما": "Ooops! Something went wrong.",
                icon: "error",
                dangerMode: true,
            })
        }
    });
}

function sendSMS(url, requestData, handledata) {
    $.ajax({
        type: 'GET',
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
                title: "Error",
                text: IfArabic ? "عفواً! هنالك خطأ ما" : "Ooops! Something went wrong.",
                icon: "error",
                dangerMode: true,
            })
        }
    });
}





function CalenderBirthdate() {


    

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



function MembersCardsAppend(objectValue) {
    
    //if ($('body#ar').length) {
    if (IfArabic) {
        
        

        var html = "";

        $("#MembersInformationAppend").html('');
        for (var i = 0; i < objectValue.length; i++) {
            
            memberCardBirthdate = moment(objectValue[i].birthdate, 'YYYY-MM-DD').locale('ar').format("DD-MMM-YYYY")
            

            html += '<div class="carousel-item Memberbox" id="MembersCard' + i + '">';
            html += '<div class="row">';
            html += '<div class="col-lg-12">';
            //if (IfArabic) {
                html += '<h5 class="text-custom-black headingArabic">' + objectValue[i].name + ' معلومة</h5>';
            //}
            //else {
            //    html += '<h5 class="text-custom-black">' + objectValue[i].name + ' Information</h5>';
            //}
            
            
            html += '<div class="row mb-md-80 pb-3">';
            html += '<div class="col-md-6">';
            html += '<div class="form-group">';
            html += '<input type="hidden" id="HdUserId" value="' + objectValue[i].id + '">';
            html += '<label class="fs-14 text-custom-black fw-500">اسم</label>';
            html += '<input type="text" id="Name" class="form-control form-control-custom" disabled value="' + objectValue[i].name + '"  required>';
            html += '</div>';
            html += '</div>';
            html += '<div class="col-md-6">';
            html += '<div class="form-group">';
            html += '<label class="fs-14 text-custom-black fw-500">بريد الالكتروني</label>';
            html += '<input type="email" id="Email" class="form-control form-control-custom" disabled value=' + objectValue[i].email + ' >';
            html += '</div>';
            html += '</div>';
            html += '<div class="col-md-6">';
            html += '<div class="form-group">';
            html += '<label class="fs-14 text-custom-black fw-500">تاريخ الولادة</label>';
            html += '<input type="text" name="DOB" id="DOB" disabled  value=' + memberCardBirthdate + ' class="form-control form-control-custom" placeholder="Date Of Birth">';
               
            html += '</div>';
            html += '</div>';
            html += '<div class="col-md-6">';
            html += '<div class="form-group">';
            html += '<label class="fs-14 text-custom-black fw-500">نوع الوثيقة</label>';
            html += '<div class="group-form">';
            html += '<select id="documentType" class="selectpicker form-control" disabled multiple>';

            for (var j = 0; j < objectValue[i].documentType.length; j++) {
                if (IfArabic) {
                    if (objectValue[i].documentType[j].trim() == "U") {

                        html += '<option value="U" selected >الهوية الإماراتية</option>'
                    }
                    if (objectValue[i].documentType[j].trim() == "P") {

                        html += '<option value="P" selected >جواز السفر</option>'
                    }

                    if (objectValue[i].documentType[j].trim() == "T") {

                        html += '<option value="T" selected >هوية السفر</option>'
                    }


                    if (objectValue[i].documentType[j].trim() == "S") {

                        html += '<option value="S" selected >هوية الأمن</option>'
                    }


                    if (objectValue[i].documentType[j].trim() == "C") {

                        html += '<option value="C" selected >هوية الشركة</option>'
                    }

                    if (objectValue[i].documentType[j].trim() == "B") {

                        html += '<option value="B" selected >شهادة الميلاد</option>'
                    }
                }
                else {
                    if (objectValue[i].documentType[j].trim() == "U") {

                        html += '<option value="U" selected >UAE ID</option>'
                    }
                    if (objectValue[i].documentType[j].trim() == "P") {

                        html += '<option value="P" selected >Passport</option>'
                    }

                    if (objectValue[i].documentType[j].trim() == "T") {

                        html += '<option value="T" selected >Travel ID</option>'
                    }


                    if (objectValue[i].documentType[j].trim() == "S") {

                        html += '<option value="S" selected >Security ID</option>'
                    }


                    if (objectValue[i].documentType[j].trim() == "C") {

                        html += '<option value="C" selected >Company ID</option>'
                    }

                    if (objectValue[i].documentType[j].trim() == "B") {

                        html += '<option value="B" selected >Birth Certificate</option>'
                    }
                }
                


            }
            html += '</select>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
            html += '<div class="col-md-6">';
            html += '<div class="form-group">';
            html += '<label class="fs-14 text-custom-black fw-500">جواز سفر</label>';
            html += '<input name="Passport"  required placeholder="Document ID" id="Passport" disabled  class="form-control form-control-custom"  value=' + objectValue[i].documents + '>';
            html += '</div>';
            html += '</div>';
            html += '<div class="col-md-6">';
            html += '<div class="form-group">';
            html += '<label class="fs-14 text-custom-black fw-500">جنسية</label>';
            html += '<div class="group-form">';
            
            html += '<input id ="Nationality" data-id="' + objectValue[i].nationalityCode + '"  class="form-control form-control-custom" type = "text" name = "Nationality"  value = "' + objectValue[i].nationalityArabic + '"  placeholder = "Nationality" disabled >';
            html += '</div>';
            html += '</div>';
            html += '</div>';
            
            html += '<div class="col-md-6">';
            html += '<div class="form-group">';
            html += '<label class="fs-14 text-custom-black fw-500">الوجهة</label>';
            html += '<div class="group-form">';
            //html += '<input id="ddlDestination"  data-id="' + objectValue[i].destinationId + '" class="form-control form-control-custom" type = "text" name = "ddlDestination"  value = "' + objectValue[i].flightDestinationNameArabic + '"  placeholder = "Destination" disabled >';
            html += '<input id="ddlDestination"  data-id="' + objectValue[i].destinationId + '" class="form-control form-control-custom" type = "text" name = "ddlDestination"  value = "' + objectValue[i].flightDestinationNameArabic + '"  placeholder = "Destination" disabled >';
            html += '</div>';
            html += '</div>';
            html += '</div>';

            html += '<div class="col-md-6">';
            html += '<div class="form-group">';
            html += '<label class="fs-14 text-custom-black fw-500">رقم التليفون</label>';
            html += '<div class="input-group group-form">';
            html += '<input id="Phone" style="padding-right: 64px!important;padding-left: 64px!important;" class="form-control form-control-custom" type = "tel" name="Phone"  value=' + objectValue[i].mobile + '  placeholder="Phone Number" disabled >';
            html += '<span class="input-group-mask">(+971) -';
            html += '</span>';
            html += '</div>';
            html += '</div>';
            html += '</div>';

            html += '<div class="col-md-6">';
            html += '<div class="form-group">';
            html += '<label class="fs-14 text-custom-black fw-500">جنس تذكير</label>';
            html += '<div class="group-form">';
            html += '<select name="Gender" id="Gender" disabled data-live-search="true" class="selectpicker form-control" data-size="5" data-show-subtext="true" multiple data-max-options="1" title="Select Gender">';
            if (objectValue[i].honorifics == "Mr") {

                html += '<option value="Mr" selected >ذكر</option>' 
            } else {

                html += '<option value="Mr" selected >أنثى</option>' 
            }
            html += '   </select>'
            html += '</div>';
            html += '</div>';
            html += '</div>';
            html += '';
            html += '</div>';


            html += '<div class=" row col-md-12">';
            html += '<div class="form-group">';
            html += '<h1 class="fs-14 text-custom-black fw-500" style="font-size: 25px; font-weight: 600;"><i class="fa fa-1x fa-file-alt"></i>&nbsp;ملفات المستندات</h1>';
            html += '<div style="display: flex;">'


            for (var k = 0; k < objectValue[i].fileName.length; k++) {
              

                var Extentions = objectValue[i].fileName[k].split('.').pop('.');


                if (Extentions == "pdf") {
                    html += ' <div>'
                    html += '<a href =' + objectValue[i].fileName[k] + ' target="blank"  download = "Documents">'
                    html += '   <img src="https://cdn-icons-png.flaticon.com/512/80/80942.png" class=" img-thumbnail img-responsive inline-block mr-4" alt="Responsive image" style="width:  50px;" />'
                    html += '</a>'

                    html += '</div>'

                }
                else if (Extentions == "docx" || Extentions == "doc") {
                    html += ' <div>'
                    html += '<a href =' + objectValue[i].fileName[k] + ' target="blank"  download = "Documents">'
                    html += '   <img src="data:image/png;base64,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" class=" img-thumbnail img-responsive inline-block mr-4" alt="Responsive image" style="width:  50px;" />'
                    html += '</a>'

                    html += '</div>'

                }
                else {

                    html += ' <div>'
                    html += '<a href =' + objectValue[i].fileName[k] + ' target="blank"  download = "Documents">'
                    html += '   <img src=' + objectValue[i].fileName[k] + ' class=" img-thumbnail img-responsive inline-block mr-4" alt="Responsive image" style="width:  50px;" />'
                    html += '</a>'

                    html += '</div>'
                }



            }

            html += '</div>'
            html += '</div>';
            html += '</div>';



            html += '</div>';
            html += '</div>';
            html += '</div>';

        }

        

        
    }
    else {
        var html = "";

        $("#MembersInformationAppend").html('');
        for (var i = 0; i < objectValue.length; i++) {
            
            memberCardBirthdate = moment(objectValue[i].birthdate, 'YYYY-MM-DD').locale('en').format("DD-MMM-YYYY")
            html += '<div class="carousel-item Memberbox" id="MembersCard' + i + '">';
            html += '<div class="row">';
            html += '<div class="col-lg-12">';
            html += '<h5 class="text-custom-black">' + objectValue[i].name + ' Information</h5>';
            html += '<div class="row mb-md-80 pb-3">';
            html += '<div class="col-md-6">';
            html += '<div class="form-group">';
            html += '<input type="hidden" id="HdUserId" value="' + objectValue[i].id + '">';
            html += '<label class="fs-14 text-custom-black fw-500">Name</label>';
            html += '<input type="text" id="Name" class="form-control form-control-custom" disabled value="' + objectValue[i].name + '"  required>';
            html += '</div>';
            html += '</div>';
            html += '<div class="col-md-6">';
            html += '<div class="form-group">';
            html += '<label class="fs-14 text-custom-black fw-500">Email</label>';
            html += '<input type="email" id="Email" class="form-control form-control-custom" disabled value=' + objectValue[i].email + ' >';
            html += '</div>';
            html += '</div>';
            html += '<div class="col-md-6">';
            html += '<div class="form-group">';
            html += '<label class="fs-14 text-custom-black fw-500">Date Of Birth</label>';
            html += '<input type="text" name="DOB" id="DOB" disabled  value="' + memberCardBirthdate + '" class="form-control form-control-custom" placeholder="Date Of Birth">';
            html += '</div>';
            html += '</div>';
            html += '<div class="col-md-6">';
            html += '<div class="form-group">';
            html += '<label class="fs-14 text-custom-black fw-500">Document Type</label>';
            html += '<div class="group-form">';
            html += '<select id="documentType" class="selectpicker form-control" disabled multiple>';

            for (var j = 0; j < objectValue[i].documentType.length; j++) {

                if (objectValue[i].documentType[j].trim() == "U") {

                    html += '<option value="U" selected >UAE ID</option>'
                }
                if (objectValue[i].documentType[j].trim() == "P") {

                    html += '<option value="P" selected >Passport</option>'
                }

                if (objectValue[i].documentType[j].trim() == "T") {

                    html += '<option value="T" selected >Travel ID</option>'
                }


                if (objectValue[i].documentType[j].trim() == "S") {

                    html += '<option value="S" selected >Security ID</option>'
                }


                if (objectValue[i].documentType[j].trim() == "C") {

                    html += '<option value="C" selected >Company ID</option>'
                }

                if (objectValue[i].documentType[j].trim() == "B") {

                    html += '<option value="B" selected >Birth Certificate</option>'
                }


            }
            html += '</select>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
            html += '<div class="col-md-6">';
            html += '<div class="form-group">';
            html += '<label class="fs-14 text-custom-black fw-500">Passport</label>';
            html += '<input name="Passport"  required placeholder="Document ID" id="Passport" disabled  class="form-control form-control-custom"  value=' + objectValue[i].documents + '>';
            html += '</div>';
            html += '</div>';
            html += '<div class="col-md-6">';
            html += '<div class="form-group">';
            html += '<label class="fs-14 text-custom-black fw-500">Nationality</label>';
            html += '<div class="group-form">';
            html += '<input id ="Nationality" data-id="' + objectValue[i].nationalityCode + '"  class="form-control form-control-custom" type = "text" name = "Nationality"  value="'+objectValue[i].nationality+'"  placeholder = "Nationality" disabled >';
            html += '</div>';
            html += '</div>';
            html += '</div>';

            html += '<div class="col-md-6">';
            html += '<div class="form-group">';
            html += '<label class="fs-14 text-custom-black fw-500">Destination</label>';
            html += '<div class="group-form">';
            html += '<input id="ddlDestination"  data-id="' + objectValue[i].destinationId + '" class="form-control form-control-custom" type = "text" name = "ddlDestination"  value = "' + objectValue[i].flightDestinationName + ' " placeholder = "Destination" disabled >';
            html += '</div>';
            html += '</div>';
            html += '</div>';

            html += '<div class="col-md-6">';
            html += '<div class="form-group">';
            html += '<label class="fs-14 text-custom-black fw-500">Phone Number</label>';
            html += '<div class="input-group group-form">';
            html += '<input id="Phone" style="padding-left: 64px!important;" class="form-control form-control-custom" type="tel" name="Phone"  value=' + objectValue[i].mobile + '  placeholder="Phone Number" disabled >';
            html += '<span class="input-group-mask">(+971) -';
            html += '</span>';
            html += '</div>';
            html += '</div>';
            html += '</div>';

            html += '<div class="col-md-6">';
            html += '<div class="form-group">';
            html += '<label class="fs-14 text-custom-black fw-500">Gender</label>';
            html += '<div class="group-form">';
            html += '<select name="Gender" id="Gender" disabled data-live-search="true" class="selectpicker form-control" data-size="5" data-show-subtext="true" multiple data-max-options="1" title="Select Gender">';
            if (objectValue[i].honorifics == "Mr") {

                html += '   <option value="Mr" selected >Male</option>'
            } else {

                html += '  <option value="Miss" selected >Female</option>'
            }
            html += '   </select>'
            html += '</div>';
            html += '</div>';
            html += '</div>';
            html += '';
            html += '</div>';


            html += '<div class=" row col-md-12">';
            html += '<div class="form-group">';
            html += '<h1 class="fs-14 text-custom-black fw-500" style="font-size: 25px; font-weight: 600;"><i class="fa fa-1x fa-file-alt"></i>&nbsp;Document Files</h1>';
            html += '<div style="display: flex;">'


            for (var k = 0; k < objectValue[i].fileName.length; k++) {
                

                var Extentions = objectValue[i].fileName[k].split('.').pop('.');


                if (Extentions == "pdf")
                {
                    html += ' <div>'
                    html += '<a href =' + objectValue[i].fileName[k] + ' target="blank"  download = "Documents">'
                    html += '   <img src="https://cdn-icons-png.flaticon.com/512/80/80942.png" class=" img-thumbnail img-responsive inline-block mr-4" alt="Responsive image" style="width:  50px;" />'
                    html += '</a>'

                    html += '</div>'

                }
                else if (Extentions == "docx" || Extentions == "doc")
                {
                    html += ' <div>'
                    html += '<a href =' + objectValue[i].fileName[k] + ' target="blank"  download = "Documents">'
                    html += '   <img src="data:image/png;base64,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" class=" img-thumbnail img-responsive inline-block mr-4" alt="Responsive image" style="width:  50px;" />'
                    html += '</a>'

                    html += '</div>'

                }
                else {

                    html += ' <div>'
                    html += '<a href =' + objectValue[i].fileName[k] + ' target="blank"  download = "Documents">'
                    html += '   <img src=' + objectValue[i].fileName[k] + ' class=" img-thumbnail img-responsive inline-block mr-4" alt="Responsive image" style="width:  50px;" />'
                    html += '</a>'

                    html += '</div>'
                }

              

            }

            html += '</div>'
            html += '</div>';
            html += '</div>';



            html += '</div>';
            html += '</div>';
            html += '</div>';

        }
    }

    

    $("#MembersInformationAppend").append(html);
    $(".selectpicker").selectpicker("render");
    $(".selectpicker").selectpicker("refresh");
    $('#MembersInformationAppend').find('.carousel-item').first().addClass('active');
    IfArabic ? $('.filter-option').removeClass("pull-left") : ""
    IfArabic ? $('.filter-option').addClass("text-right") : ""
    /*Fonts*/    
    IfArabic ?
        [
            $('#OtherMembersNationalityBirthdate').prop('placeholder', 'حدد تاريخ الميلاد'),
            $('label').removeClass('fs-14 text-custom-black fw-500'),
            $('input').removeClass('fs-14 text-custom-black fw-500'),
            $('label').addClass('labelArabic'),
            $('input').addClass('inputArabic'),
            $('h3>b , h1, p').addClass('headingArabic'),
            $('a').addClass('anchorArabic'),
            $('button').addClass('buttonArabic')
        ]
        :
        [
            $('input').addClass('inputEnglish'),]
        /*EndFonts*/
    
}


