var ApiUrl = $("#baseApiUrl").val();
var LiveWebUrl = $("#LiveWebUrl").val();
var IfArabic = window.localStorage.language == 'ar';

$(document).ready(function () {


    var FlightId = window.location.search.slice(1).split('&')[0].split('FlightId=')[1];

    var GroupId =  Number(window.location.search.slice(1).split('&')[1].split('GroupId=')[1]);


    if (GroupId > 0) {


        GetAllUserGroupMembers(GroupId);
        
    }

    $(document).on("click", "#removeRow", function () {

        var removeMemberRow = $(this);

        swal({
            title: IfArabic ? "هل انت متأكد؟" : "Are you sure?",

            text: IfArabic ? "هل انت متأكد من الغاء هذا العضو على هذة الرحلة؟" : "Are you sure to remove this member from this flight?",
            icon: "warning",
            buttons: [
                IfArabic ? "لا ، قم بإلغائها!" : 'No, cancel it!',
                IfArabic ? 'نعم ' : 'Yes'
            ],
            dangerMode: true,
        }).then(function (isConfirm) {
            if (isConfirm) {

                if ($("#membersTableBody").find('tr').length > 1) {

                    $(removeMemberRow).parent().parent().fadeOut("slow", function () {
                        debugger
                        $(removeMemberRow).parent().parent().remove();

                    });
                }
                else {
                    swal({
                        title: IfArabic ? "لا يمكن الحذف" : "Can't Delete",
                        text: IfArabic ? "يجب حجز عضو واحد على الأقل في هذة الرحلة" : "Must have at least one member booked in this flight.",
                        icon: "warning",
                        buttons: [null, IfArabic ? "موافق" : "OK"],
                        dangerMode: true,
                    })
                }
            }
        });





    });


    $(document).on("click", "#continueMembers", function () {

        var Trl = $("#membersTableBody").find('tr').length;

        var GroupIdsArr = [];

        for (var i = 0; i < Trl; i++) {

            var Ids = $("#membersTableBody").find('tr:eq(' + i + ')').attr("data-id")

            GroupIdsArr.push(Ids);
        }

        if (GroupIdsArr.length > 0 && GroupIdsArr != null) {

            window.localStorage.setItem('GroupMemberIds', GroupIdsArr.toString());

            window.location.href = LiveWebUrl+'/Home/FlightBooking?FlightId=' + FlightId + '';
        }

    });

    

});



function GetAllUserGroupMembers(UserId) {

    
    if (UserId > 0 && UserId != null) {

        postRequest(ApiUrl + "Register/GetAllFlightMembersByUserID?Id=" + UserId, null, function (res) {

            if (res.status == 200) {
                if (res.data.length == 0 || res.data == null) {
                    $('table').hide();
                    $('table').next().hide();
                    if (IfArabic) {
                        $("#appendContent").html(`
                          <div class="col-md-12">
                               <div id="notfound">
                                   <div class="notfound">
                                       <div class="notfound-404"></div>
                                       <h1 style="color: #d51c29">404</h1>
                                       <h2>أُووبس! الأعضاء غير معتمدين </h2>
                                       <p>لم تتم الموافقة على أعضاء ملف التعريف الخاص بك من قبل الوكيل حتى الآن. يرجى الاتصال بالوكيل لمزيد من التفاصيل</p>
                                       <a href="`+ $('#LiveWebUrl').val() + '/Home/MyProfile' + `" style="color: #d51c29!important">اذهب إلى الملف الشخصي</a>
                                   </div>
                               </div>
                          </div>
                        `);
                    }
                    else {
                        $("#appendContent").html(`
                              <div class="col-md-12">
                                   <div id="notfound">
                                       <div class="notfound">
                                           <div class="notfound-404"></div>
                                           <h1 style="color: #d51c29">404</h1>
                                           <h2>Oops! Members not Approved </h2>
                                           <p>Members or dependents for this profile are not yet approved. Please contact Abu Dhabi Aviation for more details.</p>
                                           <a href="`+ $('#LiveWebUrl').val() + '/Home/MyProfile' + `" style="color: #d51c29!important">Go to Profile</a>
                                       </div>
                                   </div>
                              </div>
                        `);
                    }
                }
                if (res.data && res.data != null) {

                  fillData(res.data, "#temp_FlightMembersFill", "#membersTableBody", true);
                }

            }
            if (res.status == 401) {

                localStorage.removeItem("Menu");
                localStorage.removeItem("userData");
                window.location.href = baseWebUrl + "Dashboard";
            }
            if (res.status == 403) {


                swal( {
                    icon: "error",
                    title: IfArabic ? "خطأ" : "Error",
                    text: IfArabic ? "هناك خطأ ما!" : res.responseMsg,
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
                    text: IfArabic ? "هناك خطأ ما!" :res.responseMsg,
                    icon: "error",
                    dangerMode: true,
                    buttons: [null, IfArabic ? "موافق" : "OK"],
                })
            }

        });

    }


}



function postRequest(url, requestData, handledata) {
    $.ajax({
        type: 'POST',
        contentType: 'application/json;charset=utf-8',
        dataType: "json",
        url: url,
        data: JSON.stringify(requestData),
        success: function (data, textstatus, xhr) {
            handledata(data);
        },
        error: function (xhr, textstatus, errorThrown) {
            swal({
                title: IfArabic ? "خطأ" : "Error",
                text: IfArabic ? "هناك خطأ ما!" : "Something went wrong",
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





Handlebars.registerHelper("DOBAge", function (DOB) {

    var DOB = moment(DOB).format('YYYY-MM-DD');
    var dob = new Date(DOB);
    var today = new Date();
    var age = Math.floor((today - dob) / (365.25 * 24 * 60 * 60 * 1000));
    return age;


});




