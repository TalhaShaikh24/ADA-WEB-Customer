var IfArabic = window.localStorage.language == 'ar';
var LiveWebUrl = $("#LiveWebUrl").val();
var ApiUrl = $("#baseApiUrl").val();
var Language = window.localStorage.language;
var Birthdate;
var dob;




$(document).ready(function () {

    /*Fonts*/
    //debugger
    //IfArabic ?
    //    [
    //        $('label').removeClass('fs-14 text-custom-black fw-500'),
    //        $('input').removeClass('fs-14 text-custom-black fw-500'),
    //        $('label').addClass('labelArabic'),
    //        $('input').addClass('inputArabic'),
            
    //    ]
       

    //    :
    //    [
    //        $('input').addClass('inputEnglish'),

    //    ]


    /*EndFonts*/



     validateLangauge()
   $('#preloader').show()
   //$('#Mobile').mask('(+971)-XXXXXXXXX', {
   //    placeholder: "(+971)-XXXXXXXXX",
   //    autoclear: false
   //});
      
    $(".Nationality").change(function () {

        $(this).valid();

    });


     $('#Birthdate').datepicker({
         
         onSelect: function () {
             debugger
            if (IfArabic) {
                //CalenderBirthdate()
                //dob = moment(Birthdate).format('YYYY-MM-DD');
                $("#Birthdate").val(moment($("#Birthdate").val(), "DD-MMM-YYYY").locale("ar").format("DD-MMM-YYYY"));

                dob = moment($("#Birthdate").val(), "DD-MMM-YYYY").locale("en").format("YYYY-MM-DD");

             }
            else {
                dob = moment($('#Birthdate').val()).format('YYYY-MM-DD');
            }
           
            
           
            if (dob != '') {
               
                var agemonths = moment().diff(moment(dob, 'YYYY-MM-DD'), 'month');

                if (agemonths <= 6) {
                    swal({
                        icon: "info",
                        title: IfArabic ? "أنت رضيع" : "You are an infant",
                        buttons:[null,IfArabic==true ? "موافق" : "OK"],
                        text: IfArabic ? "غير مسموح بالتسجيل" : "Registration not allowed.",
                    });
                    
                    $('#registerUser').hide();
                }
                else {
                    $('#registerUser').show();
                }
               

            }

        },
        
         maxDate: new Date(),
        dateFormat: 'dd-M-yyyy'
    })
     GetAllDropDown();
 });

$(document).focusout('#Email', function () {
    $("#RegisterForm").validate({

        rules: {

            Email: {
               
                email: true

            },
        },
        messages: {
            Email: {
                
                email:IfArabic? "هذه الخانة مطلوبهعنوان بريد إلكتروني غير صالح": "Invalid email format",

            },
        }
    });
});


 $(document).on('change','.DocumentType', function () {

     if (IfArabic) {
         $('span.check-mark').css({ "right": "80%" });
     }

    if ($(this).val().some(x => x == "U")) {
        $("#FlieUAE").css({ "display": "block" });

    }

    else {

        $("#FlieUAE").css({ "display": "none" });
        $("#files1").val(null);
        $("#files1-error").hide();

    }

    if ($(this).val().some(x => x == "P")) {

        $("#FliePasport").css({ "display": "block" });

    }
    else {

        $("#FliePasport").css({ "display": "none" });
        $("#files2").val(null);
        $("#files2-error").hide();

    }
    if ($(this).val().some(x => x == "T")) {
        $("#FlieTravelID").css({ "display": "block" });


    }
    else {

        $("#FlieTravelID").css({ "display": "none" });
        $("#files3").val(null);
        $("#files3-error").hide();

    }


    if ($(this).val().some(x => x == "S")) {
        $("#FlieSecurityID").css({ "display": "block" });
      


    }
    else {

        $("#FlieSecurityID").css({ "display": "none" });
        $("#files4").val(null);
        $("#files4-error").hide();

    }

    if ($(this).val().some(x => x == "C")) {
        $("#FlieCompanyID").css({ "display": "block" });

    } else {

        $("#FlieCompanyID").css({ "display": "none" });
        $("#files5").val(null);
        $("#files5-error").hide();

    }

    if ($(this).val().some(x => x == "B")) {
        $("#FlieBirthCertificate").css({ "display": "block" });

    } else {

        $("#FlieBirthCertificate").css({ "display": "none" });
        $("#files6").val(null);
        $("#files6-error").hide();

    }
    $(this).valid();

});
 
 
 function GetAllDropDown() {
 
     
 
     postRequest(ApiUrl+"Flight/GetAllDropdowns", null, function (res) {

        if (res.status == 200) {

            debugger
            if (res.data && res.data != null) {

                if (IfArabic) {
                   
                   
                    
                    
                    debugger

                    $('#Birthdate').attr('placeholder', "مم/دد/سسسس")


                    $('#Honorifics').html('')
                    $('#Honorifics').prop('title', 'اللقب')
                    $('#Honorifics').append('<option value="Mr" selected disabled >اللقب</option> <option value="Mr"  >السيد</option><option value="Ms"  >آنسة</option><option value="Mrs"  >السيدة</option>').selectpicker("refresh");

                   
                   
                    //$('#DocumentType').parent().find('.filter-option').children().css({ "text-align": "right" }).text('نوع الوثيقة')


                    $('#DocumentType').html('')
                    $('#DocumentType').prop('title', 'اختر نوع المستند')
                    $('#DocumentType').append('<option value="-1" disabled >اختر نوع المستند</option><option value="U">الهوية الإماراتية</option><option value="P">جواز السفر</option><option value="T">هوية السفر</option><option value="S">هوية الأمن</option><option value="C">هوية الشركة</option><option value="B">شهادة الميلاد</option>').selectpicker("refresh");
                    fillData(res.data.country, "#temp_NationalityAR", "#Nationality", true);
                    $('[data-id=Nationality]').children().text('اختر الجنسية').css({"text-align":"right"})
                    $('.bs-caret').css({"display":"none"})
                   
                    $('.filter-option').removeClass('pull-left').addClass('text-right')
                    $('.dropdown-menu.inner').removeClass('pull-left').addClass('text-right')
                    $('.requiredStar').after('<span class="required"> * </span>');
                    


                    //$('.filter-option').addClass('filter-optionArabic')
                    //$('.dropdown-item-inner>.text').addClass('optionsArabic')

                        
                   
                }
                else {
                
                    $('#Nationality').prop('title', 'Select Nationality');
                   
                    fillData(res.data.country, "#temp_Nationality", "#Nationality", true);


                   
                }

                
                
                $('#preloader').hide();
            }
            $('#preloader').hide();
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

function CalenderBirthdate() {

    
    if ($("#Birthdate").val().includes('كانون الثاني')) {
        Birthdate = $("#Birthdate").val().replace('كانون الثاني', 'Jan').replace('\t', '')
    }
    else if ($("#Birthdate").val().includes('شباط')) {
        Birthdate = $("#Birthdate").val().replace('شباط', 'Feb').replace('\t', '');
    }
    else if ($("#Birthdate").val().includes('آذار')) {
        Birthdate = $("#Birthdate").val().replace('آذار', 'Mar').replace('\t', '');
    }
    else if ($("#Birthdate").val().includes('نيسان')) {
        Birthdate = $("#Birthdate").val().replace('نيسان', 'Apr').replace('\t', '');
    }
    else if ($("#Birthdate").val().includes('أيار')) {
        Birthdate = $("#Birthdate").val().replace('أيار', 'May').replace('\t', '');
    }
    else if ($("#Birthdate").val().includes('حزيران')) {
        Birthdate = $("#Birthdate").val().replace('حزيران', 'Jun').replace('\t', '');
    }
    else if ($("#Birthdate").val().includes('تموز')) {
        Birthdate = $("#Birthdate").val().replace('تموز', 'Jul').replace('\t', '');
    }
    else if ($("#Birthdate").val().includes('آب')) {
        Birthdate = $("#Birthdate").val().replace('آب', 'Aug').replace('\t', '');
    }
    else if ($("#Birthdate").val().includes('أيلول')) {
        Birthdate = $("#Birthdate").val().replace('أيلول', 'Sep').replace('\t', '');
    }
    else if ($("#Birthdate").val().includes('تشرين الأول')) {
        Birthdate = $("#Birthdate").val().replace('تشرين الأول', 'Oct').replace('\t', '');
    }
    else if ($("#Birthdate").val().includes('تشرين الثاني')) {
        Birthdate = $("#Birthdate").val().replace('تشرين الثاني', 'Nov').replace('\t', '');
    }
    else if ($("#Birthdate").val().includes('كانون الأول')) {
        Birthdate = $("#Birthdate").val().replace('كانون الأول', 'Dec').replace('\t', '');
    }

}





$("#registerUser").click(function () {
    validateLangauge()
    if ($("#RegisterForm").valid()) {
        $('#preloader').show();
        var formData = new FormData();

        var FileData = [];

        var RowLength = $(".wrapper_Block").children().length;

        debugger;

        for (var i = 1; i <= RowLength; i++) {


                var files = $(".wrapper_Block").find(`#files${i}`).get(0).files;

                if (files.length != 0) {


                    FileData.push(files[0]);

                }
  
            }
        for (var i = 0; i < FileData.length; i++) {


                formData.append("fileInput",FileData[i]);

        }
        debugger
        formData.append("Language", Language),
        formData.append("Honorifics", $('.Honorifics').selectpicker("val"))
        formData.append("Name", $("#Name").val())
        formData.append("Email", $("#Email").val().toLowerCase())
        formData.append("Nationality", $("#Nationality").val())
        formData.append("Username", $("#Username").val())
        formData.append("Password", $("#Password").val())
        IfArabic ? formData.append("Birthdate", moment($("#Birthdate").val(), "DD-MMM-YYYY").locale("en").format("DD-MMM-YYYY")) : formData.append("Birthdate", moment($("#Birthdate").val()).locale('en').format("DD-MMM-YYYY"))
        formData.append("Mobile", $('#Mobile').val())
        formData.append("Documents", $("#Documents").val())
        formData.append("DocumentType", $("#DocumentType").val())
        formData.append("IsDelmaIsland", $('#ActiveDelmaIsland').is(":checked"))
        formData.append("IsUAEId", $('#ActiveUAEID').is(":checked"))
           debugger
        postRequestWithoutStringfy(ApiUrl+"Register/Add", formData, function (res) {
            
            if (res.status == 200) {{

                    $('#preloader').hide();

                    swal( {
                        icon: "success",
                        title: IfArabic ? "مسجل بنجاح" : "Registered Successfully",
                        dangerMode: false,
                        text: IfArabic ? "يمكنك الآن تسجيل الدخول" : "You can now Login",
                        buttons: [null, IfArabic ? "موافق" : "OK"],
                    });
                    
                    window.location.href = LiveWebUrl+"/Login/Authenticate";
                   
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
                    icon: "error",
                    title: IfArabic ? "خطأ" : "Error",
                    dangerMode: true,
                    text: IfArabic ? "عفواً! هنالك خطأ ما" : "Ooops! Something went wrong.",
                    buttons: [null, IfArabic ? "موافق" : "OK"],
                });
            }
            if (res.status == 500) {
                $('#preloader').hide();
                swal({
                    title: IfArabic ? "خطأ" : "Error",
                    text: IfArabic ? "هناك خطأ ما!" :res.responseMsg,
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
                    title: IfArabic ? "معلومات" : "info",
                    text: IfArabic ? 'خطأ: الرمز التحقق الذي أدخلته لا يتطابق مع الرمز الذي تم إرساله. يرجى المحاولة مرة أخرى بإدخال الرمز الصحيح أو طلب رمز تحقق جديد.': res.responseMsg,
                    icon: "info",
                    dangerMode: false,
                    buttons: [null, IfArabic ? "موافق" : "OK"],
                })
            }

        });


    }
});




function validateLangauge() {

    $("#RegisterForm").validate({

                rules: {
                    Honorifics: {
                        required: true,

                    },
                    Name: {
                        required: true,
                        englishLetters: true

                    },
                    Username: {
                        required: true,
                        englishLetters: true,
                        noSpaces:true

                    },
                    Password: {
                        required: true,
                        strongPassword: true

                    }, 
                    Email: {
                       
                        email: true,
                      
                    },
                    Nationality: {
                        required: true,

                    },
                    DocumentType: {
                        required: true,

                    },
                    Birthdate: {
                        required: true,

                    },
                    Documents: {
                        required: true,
                        onlyDigits: true,
                    },
                    Mobile: {
                        required: true,
                        minlength: 9,
                        maxlength: 9
                    },

                    files1: {
                        required: true,
                        extension: "png|jpeg|jpg|doc|docx|pdf",
                        filesize: 2000000

                    },
                    files2: {
                        required: true,
                        extension: "png|jpeg|jpg|doc|docx|pdf",
                        filesize: 2000000
                    },
                    files3: {
                        required: true,
                        extension: "png|jpeg|jpg|doc|docx|pdf",
                        filesize: 2000000
                        },
                    files4: {
                        required: true,
                        extension: "png|jpeg|jpg|doc|docx|pdf",
                        filesize: 2000000
                        },
                    files5: {
                        required: true,
                        extension: "png|jpeg|jpg|doc|docx|pdf",
                        filesize: 2000000
                        },
                    files6: {
                        required: true,
                        extension: "png|jpeg|jpg|doc|docx|pdf",
                        filesize: 2000000
                        },
                },
                messages: {
                    Honorifics: IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
                    Name: {
                        required: IfArabic? "هذه الخانة مطلوبه:": "This field is required.",
                    } ,
                    Username: {
                        required: IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
                    },
                    Password: {
                       
                       required: IfArabic? "هذه الخانة مطلوبه:": "This field is required.",
                    },
                    Email: {
                        required: IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
                        email: IfArabic ? "هذه الخانة مطلوبهعنوان بريد إلكتروني غير صالح" : "Invalid email format",
                    },
                    Nationality: IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
                    DocumentType: IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
                    Birthdate: IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
                    Documents: {
                        required: IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
                        onlyDigits: IfArabic ? "الرجاء إدخال أرقام فقط.:" : "Please enter only digits.",
                    },
                    Mobile: {
                        required: IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
                        minlength: IfArabic ? "يجب أن يكون طول الجوال 9 أرقام" : "The length of mobile must be 9 digits",
                        maxlength: IfArabic ? "يجب أن يكون طول الجوال 9 أرقام" : "The length of mobile must be 9 digits"

                    } ,
                    files1:
                    {
                        required: IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
                        extension: IfArabic ? "الرجاء تحميل وتنسيق ملف صالح" : "Please upload a valid file format."


                    },
                    files2:
                    {
                        required: IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
                        extension: IfArabic ? "الرجاء تحميل وتنسيق ملف صالح" : "Please upload a valid file format."


                    },
                    files3:
                    {
                        required: IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
                        extension: IfArabic ? "الرجاء تحميل وتنسيق ملف صالح" : "Please upload a valid file format."


                    },
                    files4:
                    {
                        required: IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
                        extension: IfArabic ? "الرجاء تحميل وتنسيق ملف صالح" : "Please upload a valid file format."


                    },
                    files5:
                    {
                        required: IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
                        extension: IfArabic ? "الرجاء تحميل وتنسيق ملف صالح" : "Please upload a valid file format."


                    },
                    files6:
                    {
                        required: IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
                        extension: IfArabic ? "الرجاء تحميل وتنسيق ملف صالح" : "Please upload a valid file format."


                    },

                  

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



$(document).on('change', 'select', function () {
    $(this).valid();
})

function postRequestWithoutStringfy(url, requestData, handledata) {
    console.log(requestData);
    $.ajax({
        type: 'POST',
        url: url,
        contentType: false, // Not to set any content header  
        processData: false, // Not to process data  
        data: requestData,
        success: function (data, textStatus, xhr) {
            console.log(data);
            handledata(data);
        },
        error: function (xhr, textStatus, errorThrown) {
            //swal({
            //    title: "Error",
            //    text: "Something Went Wrong!",
            //    icon: "error",
            //    dangerMode: true,
            //})
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




