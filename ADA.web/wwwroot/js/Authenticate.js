var target = $('#language').val();
var LiveWebUrl = $('#LiveWebUrl').val();
var ApiUrl = $('#baseApiUrl').val();
var IfArabic = window.localStorage.language == 'ar';


$(document).ready(function () {






    window.localStorage.userData ? window.location.href = LiveWebUrl+"Home/Index" : false;

    BaseUrl = $("#baseUrlForMVCAction").val();
    if (BaseUrl == "null")
    BaseUrl = "";
    baseApiUrl = $("#baseApiUrl").val();
    LiveWebUrl = $("#LiveWebUrl").val();

    /*Fonts*/
    debugger
    IfArabic ?
        [
            
            $('label').removeClass('fs-14 text-custom-black fw-500'),
            $('input').removeClass('fs-14 text-custom-black fw-500'),
            $('label').addClass('labelArabic'),
            $('input').addClass('inputArabic'),
            $('h3>b , h1, p').addClass('headingArabic')

        ]


        :
        [
            $('input').addClass('inputEnglish'),

        ]


    /*EndFonts*/



    //Remember Me

    var remember = $.cookie('remember');
    if (remember == 'true') {
        var username = $.cookie('username');
        var password = $.cookie('password');
        // autofill the fields
        $('#UsernameLogin').attr("value", username);
        $('#PasswordLogin').attr("value", password);
        $('#remember').prop('checked', true)

    }
    

    

});

$("#loginUser").click(function () {

    validateLangauge()

    if ($("#FormLogin").valid()) {

        if ($('#remember').prop('checked')) {
            var username = $('#UsernameLogin').val();
            var password = $('#PasswordLogin').val();
            // set cookies to expire in 14 days
            $.cookie('username', username, { expires: 14 });
            $.cookie('password', password, { expires: 14 });
            $.cookie('remember', true, { expires: 14 });
        } else {
            // reset cookies
            $.cookie('username', null);
            $.cookie('password', null);
            $.cookie('remember', null);
        }
        Login();

    }
});



function validateLangauge() {
    if ($('body#ar').length == 1) {
        debugger
        $("#FormLogin").validate({

            rules: {
                UsernameLogin: {
                    required: true,


                },
                PasswordLogin: {
                    required: true,

                },
            },
            messages: {
                UsernameLogin: "هذا الحقل مطلوب.",
                PasswordLogin: "هذا الحقل مطلوب."

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
    }
    else {
        $("#FormLogin").validate({

            rules: {
                UsernameLogin: {
                    required: true,


                },
                PasswordLogin: {
                    required: true,

                },
            },
            messages: {
                UsernameLogin: "This field is required.",
                PasswordLogin: "This field is required.",

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
    }
}









function Login() {

    $('#preloader').show();
        let data = {
            Username: $("#UsernameLogin").val(),
            Password: $("#PasswordLogin").val()
          
    }
    debugger
    postRequest(ApiUrl +"Authentication/Authenticate", data, function (res) {
        debugger
            if (res.status == 200) {
                debugger

                // Save token in cookie
                Cookies.set('AuthToken', res.token, { expires: 2, path: '/' }); // Expires in 2 day

                localStorage.setItem("userData", JSON.stringify(res.data.dataObj));
                $('#preloader').hide();
                swal.fire({
                    title: IfArabic ? "نجاح" : "success",
                    text: IfArabic ? 'تسجيل الدخول بنجاح': res.responseMsg,
                    icon: "success",
                    dangerMode: false,
                    confirmButtonText: IfArabic ? "موافق" : "OK",
                });
                window.location.href = LiveWebUrl+"/Home/Index";
            }
            if (res.Status == 304) {
                Cookies.remove('AuthToken', { path: '/' });

                localStorage.removeItem("userData");

                $('#preloader').hide()
                swal.fire({
                    title: IfArabic ? "خطأ" : "Error",
                    text: IfArabic ? "هناك خطأ ما!" :res.responseMsg,
                    icon: "error",
                    dangerMode: true,
                    confirmButtonText: IfArabic ? "موافق" : "OK",
                })
            }
            if (res.Status == 305) {
                $('#preloader').hide();
                localStorage.setItem('RedirectionId', res.Data)
                window.location.href = LiveWebUrl + "Account/ExpiredPasswordChanged";
            }
            if (res.Status == 401) {
                $('#preloader').hide();
                Cookies.remove('AuthToken', { path: '/' });

                localStorage.removeItem("userData");
                swal.fire({
                    title: IfArabic ? "خطأ" : "Error",
                    text: IfArabic ? "هناك خطأ ما!" : res.responseMsg,
                    icon: "error",
                    dangerMode: true,
                    confirmButtonText: IfArabic ? "موافق" : "OK",
                })
            }
            if (res.Status == 403) {
                $('#preloader').hide();
                swal.fire(res.responseMsg, {
                    icon: "error",
                    title: IfArabic ? "خطأ" : "Error",
                    confirmButtonText: IfArabic ? "موافق" : "OK",
                });
            }
            if (res.status == 320) {
                $('#preloader').hide()
                $('#lblMessage').addClass('text-danger');
                $('#lblMessage').html('').html(IfArabic ?"المستخدم ببيانات الاعتماد هذه غير موجود.": res.responseMsg)

                swal.fire({
                    title: IfArabic ? "خطأ" : "Error",
                    text: IfArabic ? 'المستخدم ببيانات الاعتماد هذه غير موجود.' : res.responseMsg,
                    icon: "error",
                    dangerMode: true,
                    confirmButtonText: IfArabic ? "موافق" : "OK",
                })
            }
            if (res.Status == 500) {
                $('#preloader').hide();
                swal.fire({
                    title: IfArabic ? "خطأ" : "Error",
                    text: res.responseMsg,
                    icon: "error",
                    dangerMode: true,
                    confirmButtonText: IfArabic ? "موافق" : "OK",
                })
            }
        if (res.status == 600) {
                
                $('#preloader').hide()
                    swal.fire({
                        title: IfArabic ? "خطأ" : "Error",
                        text: IfArabic ?"يرجى انتظار موافقة الوكيل" :res.responseMsg,
                        icon: "error",
                        dangerMode: true,
                        confirmButtonText: IfArabic ? "موافق" : "OK",
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
            "Authorization": GetAuthorizationHeader()
        },
        data: JSON.stringify(requestData),
        success: function (data, textStatus, xhr) {
            handledata(data);




        },
        error: function (xhr, textStatus, errorThrown) {
            swal.fire({
                title: IfArabic ? "خطأ" : "Error",
                text: IfArabic ? 'عفواً! هنالك خطأ ما' : "Ooops! Something went wrong.!",
                icon: "error",
                dangerMode: true,
                confirmButtonText: IfArabic ? "موافق" : "OK",
            })
        }
    });
}

function GetAuthorizationHeader() {
    let token = localStorage.getItem('authorization');
    if (isNullOrUndefined(token)) {
        token = "";
    }
    return token = "Bearer " + token;
}

function isNullOrUndefined(value) {
    if (value == null || value == undefined || value == "undefined")
        return true;
    else
        return false;
}