var IfArabic = window.localStorage.language == 'ar';
var LiveWebUrl = $("#LiveWebUrl").val();
var ApiUrl = $("#baseApiUrl").val();
var Language = window.localStorage.language;




$(document).ready(function () {

    $("#ConfirmPassword").keyup(checkPasswordMatch);
    $("#Email").val(localStorage.Email)

});





    function checkPasswordMatch() {
        var password = $("#NewPassword").val();
        var confirmPassword = $("#ConfirmPassword").val();
        if (password != confirmPassword)
            $("#CheckPasswordMatch").html("Passwords does not match!").css({"color":"red"});
        else
            $("#CheckPasswordMatch").html("Passwords match.").css({ "color": "green" });
    }
   


$("#resetPassword").click(function () {
    validateLangauge()
    if ($("#ResetPasswordForm").valid()) {
        $('#preloader').show();
        var formData = new FormData();




        formData.append("VerifyCode", $("#VerificationCode").val());
        formData.append("Password", $("#NewPassword").val());
        formData.append("Email", localStorage.getItem('Email'));
        formData.append("Mobile", localStorage.getItem('Mobile'));
        formData.append("Action", localStorage.getItem('Action'));
        


        postRequestWithoutStringfy(ApiUrl + "Register/ResetPassword", formData, function (res) {

            if (res.status == 200) {
                {
                   
                    localStorage.removeItem('Action')
                    localStorage.removeItem('Email');
                    localStorage.removeItem('Mobile');

                    $('#preloader').hide();

                    swal({
                        icon: "success",
                        title: IfArabic ? "Email Send" : "Email Send",
                        text: IfArabic ? "A reset password has been send to given email " : "Your password has been changed",
                        buttons: [null, IfArabic ? "موافق" : "OK"],
                    }).then(function (isConfirm) {
                        window.location.href = LiveWebUrl + "/Login/Authenticate";
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
                    dangerMode: true,
                    text: IfArabic ? "عفواً! هنالك خطأ ما" : "Ooops! Something went wrong.",
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
});




function validateLangauge() {

    $("#ResetPasswordForm").validate({

        rules: {
            VerificationCode: {
                minlength: 6,
                required: true,
            },
            NewPassword: {
                minlength: 5,
                required: true,
            },
            ConfirmPassword: {
                minlength: 5,
                required: true,
                equalTo: "#NewPassword"
            },

        },
        messages: {

            VerificationCode: {
                minlength: IfArabic ? "Password must be longer then 6 characters" : "Password must be longer then 6 characters",
                required: IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
            },
            NewPassword: {
                minlength: IfArabic ? "Password must be longer then 5 characters" : "Password must be longer then 5 characters",
                required: IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
            },
            ConfirmPassword: {
                minlength: IfArabic ? "Password must be longer then 5 characters" : "Password must be longer then 5 characters",
                required: IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
                equalTo: IfArabic ? "Passwords does not match" : "Passwords does not match"
            }



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



