var IfArabic = window.localStorage.language == 'ar';
var LiveWebUrl = $("#LiveWebUrl").val();
var ApiUrl = $("#baseApiUrl").val();
var Language = window.localStorage.language;
var Action = "";




$(document).ready(function () {

    $('#preloader').show()
    $('#ForgotForm').validate({
        ignore: "",
        rules: {
            Email: {
                required: true
            },
            Mobile: {
                required: true
            }
        }
    });
});



$("#forgotSubmit").click(function () {



    var activeTab = $(".nav-tabs .active").attr("href");
    Action = activeTab;


    if (activeTab === "#ViaEmail") {
        validateLanguageEmail();
    }
    else if (activeTab === "#ViaSMS"){
        validateLanguageMobile();
    }




    

  

    if ($("#ForgotForm").valid()) {
        alert("Click Ok to continue");
    } else {
        alert("Click Ok to continue");
    }

    if ($("#ForgotForm").valid()) {
        $('#preloader').show();
        var formData = new FormData();

        

       
        formData.append("Email", $("#Email").val().toLowerCase())
        formData.append("Mobile", $("#Mobile").val().toLowerCase())
        formData.append("Action", Action)
       

        postRequestWithoutStringfy(ApiUrl + "Register/ForgotPassword", formData, function (res) {

            if (res.status == 200) {
                {
                    localStorage.removeItem('Action')
                    localStorage.setItem('Action', Action);
                    localStorage.setItem('Email', res.data.email);
                    localStorage.setItem('Mobile', res.data.mobile);
                    debugger
                    $('#preloader').hide();

                    swal({
                        icon: "success",
                        title: IfArabic ? "أرسل البريد الإلكتروني بنجاح" : "Email Send",
                        buttons: [null, IfArabic ? "موافق" : "OK"],
                        dangerMode: false,
                        text: IfArabic ? "تم إرسال إعادة تعيين كلمة المرور إلى البريد الإلكتروني المحدد":"A reset password has been send to given email ",
                    }).then(function () {
                        window.location.href = LiveWebUrl + "/Register/ResetPassword";
                    });

                    

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
                    buttons: [null, IfArabic ? "موافق" : "OK"],
                    dangerMode: true,
                    text: IfArabic ? "عفواً! هنالك خطأ ما" : "Ooops! Something went wrong.",
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
                    text: IfArabic ? "لم يتم العثور على حساب بعنوان البريد الإلكتروني المقدم. يرجى التحقق من بريدك الإلكتروني أو التسجيل للحصول على حساب جديد." : res.responseMsg,
                    icon: "error",
                    dangerMode: true,
                    buttons: [null, IfArabic ? "موافق" : "OK"],
                })
            }
            if (res.status == 700) {
                $('#preloader').hide();
                swal({
                    title: IfArabic ? "Ooops" : "Ooops",
                    text: IfArabic ? "البريد الإلكتروني الذي أدخلته غير صالح. الرجاء إدخال بريد إلكتروني صالح أو استخدام الرسائل القصيرة للتحقق بدلاً من ذلك." : res.responseMsg,
                    icon: "info",
                    dangerMode: false,
                    buttons: [null, IfArabic ? "موافق" : "OK"],
                })
            }

        });


    }
});



function validateLanguageEmail() {


    $('#ForgotForm').validate();
    $('#Mobile').rules('remove');
    $('#Email').rules('add', { required: true , email:true});


   
}


function validateLanguageMobile() {

    $('#ForgotForm').validate();
    $('#Email').rules('remove');
    $('#Mobile').rules('add', { required: true });

}





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



