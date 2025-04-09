var UserId = JSON.parse(window.localStorage.getItem('userData')).id;
var IfArabic = window.localStorage.language == 'ar';
var ApiUrl = '';
let LiveWebUrl = $("#LiveWebUrl").val();
var resrvnID = window.location.search.slice(1).split('&')[0].split('rsvnId=')[1];
let IndvPNR;
let IndvRsvnID;
let memberType = JSON.parse(localStorage.getItem("userData")).registerType

$(document).ready(function () {
    ApiUrl = $("#baseApiUrl").val();
    $('#preloader').show();

    GetAllDropDown()

    $("#Members").change(function (e) {

        debugger;
        $('#SeatNumberRow').show();
        var Id = $(this).val();
        resrvnID = Id;
        $("#SeatNumber").val("");
        GetuserDatabyRsvnId(Id);

    });

});


$(document).on("change", "input[type=checkbox]", function () {
   
    var ageMonths = Number($('#Members').find('option:selected').attr("age-months"));
    if (ageMonths<=6) {
        swal( {
            title: IfArabic ? "لا يسمح للرضيع بأختيار مقعد" : "Infant is not allowed to select a seat.",
            text: IfArabic ? 'رقم \n سيكون مقعد الرضيع هو نفسة مع الشخص البالغ المرافق. ' : "Infant seat will be the same as with the accompanying adult. \n \n Please click CONFIRM to check-in the infant.",
            icon: "info",
            dangerMode: false,
            buttons: [null, IfArabic ? "موافق" : "OK"],
        });
        $(this).prop('checked', false);
        $('#SeatNumberRow').hide();
    }


    $('input[type="checkbox"]').not(this).prop('checked', false);

    var SeatNo = $(this).next().text();

    $("#SeatNumber").val(SeatNo);

});

function GetAllDropDown() {



    postRequest(ApiUrl + "Flight/GetAllDropdowns", null, function (res) {
        $('#preloader').show();
        if (res.status == 200) {

            debugger
            if (res.data && res.data != null) {
                if (IfArabic) {
                    fillData(res.data.country, "#temp_NationalityAR", "#Nationality", true);
                    fillData(res.data.destination, "#temp_DestinationAr", "#Destination", true);
                    
                    $('.filter-option').removeClass('pull-left')
                    $('.filter-option').addClass('text-right')
                }
                else {
                    fillData(res.data.country, "#temp_Nationality", "#Nationality", true);
                    fillData(res.data.destination, "#temp_Destination", "#Destination", true);
                    //$('#Honorifics').parent().find('.filter-option').children().text('Title').css({ "text-align": "left" })
                    //$('#Nationality').parent().find('.filter-option').children().text('Nationality').css({ "text-align": "left" })
                    //$('#DocumentType').parent().find('.filter-option').children().text('Document Type').css({ "text-align": "left" })
                } 
                   
              GetCheckIn()
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
                buttons: [null, IfArabic ? "موافق" : "OK"]
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
                buttons: [null, IfArabic ? "موافق" : "OK"]
            })
        }

    });


}



function GetCheckIn() {

    $('#preloader').show();

    postRequest(ApiUrl + "CheckIn/GetMobileCheckin/" + resrvnID, null, function (res) {
        debugger
        if (res.status == 200) {
            $('#preloader').show();
            $("#AiraCraftSeats").html('');
          

            if (res.data.userChekinDetails.length == 1)
            {
               IndvPNR = res.data.userChekinDetails[0].rsvnPNR
               IndvRsvnID = res.data.userChekinDetails[0].rsvnID

                $("#HDM").hide();
                $('#RSVHDID').val(res.data.userChekinDetails[0].rsvnID).prop("disable", "disabled").css({ "cursor": "not-allowed" });
                $('#FullName').val(res.data.userChekinDetails[0].paxName).prop("disable", "disabled").css({ "cursor": "not-allowed" });
                $("#Nationality").val(res.data.userChekinDetails[0].paxNationality).selectpicker("refresh").prop("disable", "disabled").css({ "cursor": "not-allowed" });
                $('#DOB').val(moment(res.data.userChekinDetails[0].paxBDay).format('YYYY-MM-DD')).prop("disable", "disabled").css({ "cursor": "not-allowed" });
                $("#Destination").val(res.data.userChekinDetails[0].paxDestination).selectpicker("refresh").prop("disable", "disabled").css({ "cursor": "not-allowed" });
                $('#SeatNumber').val(res.data.userChekinDetails[0].seatNum).css({ "cursor": "not-allowed" });
                $('#RsvnStatus').val(res.data.userChekinDetails[0].rsvnStatus).prop("disable", "disabled").css({ "cursor": "not-allowed" });
                $('#preloader').hide();
               
            }
            else {

                $("#HDM").show();
                
                fillData(res.data.userChekinDetails, "#temp_Members", "#Members", true);

                $('#Members').val(resrvnID).change();
            }

             AirCraftSeats(res.data.checkIn, res.data.aircraft);
        }
        
        if (res.status == 401) {
            $('#preloader').hide();
            alert('Unauthorized')
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
                title: IfArabic ?"خطأ":"Error",
                text: IfArabic ?"الحجز الخاص بك معلق":res.responseMsg,
                icon: "error",
                buttons: [null, IfArabic ? "موافق" : "OK"],
                dangerMode: true,
            })
        }

    });
}

function AirCraftSeats(Data, Aircraft) {


        var ColumeLable = Aircraft[0].columnLabel.split("");

        /*ArirCraft ColumeLable*/

        let html = "";
        html += '<li class="">';
        html += '<ol class="seats" style="position: relative; top: 15px;">';
        html += '<li class="seat"><label style="font-size: 25px; font-weight: 400; background-color: transparent !important; cursor: no-drop !important; box-shadow: none !important;">RF</label></li>';
        html += '<li class="seat"><label style="font-size: 25px; font-weight: 400; background-color: transparent !important; cursor: no-drop !important; box-shadow: none !important;">' + ColumeLable[0] + '</label></li>';
        html += '<li class="seat"><label style="font-size: 25px; font-weight: 400; background-color: transparent !important; cursor: no-drop !important; box-shadow: none !important;">' + ColumeLable[1] + '</label></li>';
        html += '<li class="seat"><label style="font-size: 25px; font-weight: 400; background-color: transparent !important; cursor: no-drop !important; box-shadow: none !important;">' + ColumeLable[2] + '</label></li>';
        html += '<li class="seat"><label style="font-size: 25px; font-weight: 400; background-color: transparent !important; cursor: no-drop !important; box-shadow: none !important;">' + ColumeLable[3] + '</label></li>';
        html += '<li class="seat"> <label style="font-size: 25px; font-weight: 400; background-color: transparent !important; cursor: no-drop !important; box-shadow: none !important;">' + ColumeLable[4] + '</label></li>';
        html += '</ol>';
        html += '</li>';
        html += '<li><hr></li>';




        var Row1 = Aircraft[0].row1.replaceAll(',', '').split("");
        var Row2 = Aircraft[0].row2.replaceAll(',', '').split("");
        var Row3 = Aircraft[0].row3.replaceAll(',', '').split("");
        var Row4 = Aircraft[0].row4.replaceAll(',', '').split("");
        var Row5 = Aircraft[0].row5.replaceAll(',', '').split("");
        var Row6 = Aircraft[0].row6.replaceAll(',', '').split("");
        var Row7 = Aircraft[0].row7.replaceAll(',', '').split("");
        var Row8 = Aircraft[0].row8.replaceAll(',', '').split("");
        var Row9 = Aircraft[0].row9.replaceAll(',', '').split("");
        var Row10 = Aircraft[0].row10.replaceAll(',', '').split("");
        var Row11 = Aircraft[0].row11.replaceAll(',', '').split("");
        var Row12 = Aircraft[0].row12.replaceAll(',', '').split("");
        var Row13 = Aircraft[0].row13.replaceAll(',', '').split("");
        var Row14 = Aircraft[0].row14.replaceAll(',', '').split("");
        var Row15 = Aircraft[0].row15.replaceAll(',', '').split("");
        var Row16 = Aircraft[0].row16.replaceAll(',', '').split("");
        var Row17 = Aircraft[0].row17.replaceAll(',', '').split("");
        var Row18 = Aircraft[0].row18.replaceAll(',', '').split("");
        var Row19 = Aircraft[0].row19.replaceAll(',', '').split("");
        var Row20 = Aircraft[0].row20.replaceAll(',', '').split("");
        var Row21 = Aircraft[0].row21.replaceAll(',', '').split("");
        var Row22 = Aircraft[0].row22.replaceAll(',', '').split("");
        var Row23 = Aircraft[0].row23.replaceAll(',', '').split("");
        var Row24 = Aircraft[0].row24.replaceAll(',', '').split("");
        var Row25 = Aircraft[0].row25.replaceAll(',', '').split("");

        html += '<li class="">';
        html += '<ol class="seats">';




        //***************************************Aricraft-Row1**************************************************

        if (!Aircraft[0].row1.includes('0,00000,')) {

            html += Row1[0] == 1 ? '<li class="seat"><label style="font-size: 25px; font-weight: 400;height: 32px;width: 30px;border-radius:0px!important; background-color:red !important; cursor: no-drop !important; box-shadow:none !important;">1</label></li>' : '<li class="seat"><label style="font-size: 25px;width: 30px;border-radius:0px!important; font-weight: 400; background-color:transparent !important; cursor: no-drop !important; box-shadow:none !important;">1</label></li>';


            if (Row1[1] == 1) {

                html += '<li class="seat"> <input type="checkbox"  value="1' + ColumeLable[0] + '"  id="1' + ColumeLable[0] + '" /><label for="1' + ColumeLable[0] + '">1' + ColumeLable[0] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }


            if (Row1[2] == 1) {

                html += '<li class="seat"><input type="checkbox" value="1' + ColumeLable[1] + '"  id="1' + ColumeLable[1] + '" /><label for="1' + ColumeLable[1] + '">1' + ColumeLable[1] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            if (Row1[3] == 1) {

                html += '<li class="seat"><input type="checkbox" value="1' + ColumeLable[2] + '" id="1' + ColumeLable[2] + '" /><label for="1' + ColumeLable[2] + '">1' + ColumeLable[2] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            if (Row1[4] == 1) {

                html += '<li class="seat"><input type="checkbox" value="1' + ColumeLable[3] + '"  id="1' + ColumeLable[3] + '" /><label for="1' + ColumeLable[3] + '">1' + ColumeLable[3] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            if (Row1[5] == 1) {

                html += '<li class="seat"><input type="checkbox" value="1' + ColumeLable[4] + '" id="1' + ColumeLable[4] + '" /><label for="1' + ColumeLable[4] + '">1' + ColumeLable[4] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            html += '</ol>';
            html += '</li>';

        }

        //***************************************Aricraft-Row2**************************************************
        if (!Aircraft[0].row2.includes('0,00000,')) {

            html += '<li class="">';
            html += '<ol class="seats">';

            html += Row2[0] == 1 ? '<li class="seat"><label style="font-size: 25px; font-weight: 400;height: 32px;width: 30px;border-radius:0px!important; background-color:red !important; cursor: no-drop !important; box-shadow:none !important;">2</label></li>' : '<li class="seat"><label style="font-size: 25px;width: 30px;border-radius:0px!important; font-weight: 400; background-color:transparent !important; cursor: no-drop !important; box-shadow:none !important;">2</label></li>';


            if (Row2[1] == 1) {

                html += '<li class="seat"> <input type="checkbox" value="2' + ColumeLable[0] + '" id="2' + ColumeLable[0] + '" /><label for="2' + ColumeLable[0] + '">2' + ColumeLable[0] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }


            if (Row2[2] == 1) {

                html += '<li class="seat"><input type="checkbox" value="2' + ColumeLable[1] + '" id="2' + ColumeLable[1] + '" /><label for="2' + ColumeLable[1] + '">2' + ColumeLable[1] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            if (Row2[3] == 1) {

                html += '<li class="seat"><input type="checkbox"  value="2' + ColumeLable[2] + '" id="2' + ColumeLable[2] + '" /><label for="2' + ColumeLable[2] + '">2' + ColumeLable[2] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            if (Row2[4] == 1) {

                html += '<li class="seat"><input type="checkbox" value="2' + ColumeLable[3] + '"  id="2' + ColumeLable[3] + '" /><label for="2' + ColumeLable[3] + '">2' + ColumeLable[3] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            if (Row2[5] == 1) {

                html += '<li class="seat"><input type="checkbox"  value="2' + ColumeLable[4] + '" id="2' + ColumeLable[4] + '" /><label for="2' + ColumeLable[4] + '">2' + ColumeLable[4] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            html += '</ol>';
            html += '</li>';

        }

        //***************************************Aricraft-Row3**************************************************


        if (!Aircraft[0].row3.includes('0,00000,')) {

            html += '<li class="">';
            html += '<ol class="seats">';

            html += Row3[0] == 1 ? '<li class="seat"><label style="font-size: 25px; font-weight: 400;height: 32px;width: 30px;border-radius:0px!important; background-color:red !important; cursor: no-drop !important; box-shadow:none !important;">3</label></li>' : '<li class="seat"><label style="font-size: 25px;width: 30px;border-radius:0px!important; font-weight: 400; background-color:transparent !important; cursor: no-drop !important; box-shadow:none !important;">3</label></li>';


            if (Row3[1] == 1) {

                html += '<li class="seat"> <input type="checkbox" value="3' + ColumeLable[0] + '" id="3' + ColumeLable[0] + '" /><label for="3' + ColumeLable[0] + '">3' + ColumeLable[0] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }


            if (Row3[2] == 1) {

                html += '<li class="seat"><input type="checkbox" value="3' + ColumeLable[1] + '"  id="3' + ColumeLable[1] + '" /><label for="3' + ColumeLable[1] + '">3' + ColumeLable[1] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            if (Row3[3] == 1) {

                html += '<li class="seat"><input type="checkbox" value="3' + ColumeLable[2] + '"  id="3' + ColumeLable[2] + '" /><label for="3' + ColumeLable[2] + '">3' + ColumeLable[2] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            if (Row3[4] == 1) {

                html += '<li class="seat"><input type="checkbox" value="3' + ColumeLable[3] + '"  id="3' + ColumeLable[3] + '" /><label for="3' + ColumeLable[3] + '">3' + ColumeLable[3] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            if (Row3[5] == 1) {

                html += '<li class="seat"><input type="checkbox" value="3' + ColumeLable[4] + '"  id="3' + ColumeLable[4] + '" /><label for="3' + ColumeLable[4] + '">3' + ColumeLable[4] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            html += '</ol>';
            html += '</li>';

        }


        //***************************************Aricraft-Row4**************************************************


        if (!Aircraft[0].row4.includes('0,00000,')) {

            html += '<li class="">';
            html += '<ol class="seats">';

            html += Row4[0] == 1 ? '<li class="seat"><label style="font-size: 25px; font-weight: 400;height: 32px;width: 30px;border-radius:0px!important; background-color:red !important; cursor: no-drop !important; box-shadow:none !important;">4</label></li>' : '<li class="seat"><label style="font-size: 25px;width: 30px;border-radius:0px!important; font-weight: 400; background-color:transparent !important; cursor: no-drop !important; box-shadow:none !important;">4</label></li>';


            if (Row4[1] == 1) {

                html += '<li class="seat"> <input type="checkbox" value="4' + ColumeLable[0] + '"  id="4' + ColumeLable[0] + '" /><label for="4' + ColumeLable[0] + '">4' + ColumeLable[0] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }


            if (Row4[2] == 1) {

                html += '<li class="seat"><input type="checkbox" value="4' + ColumeLable[1] + '"   id="4' + ColumeLable[1] + '" /><label for="4' + ColumeLable[1] + '">4' + ColumeLable[1] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            if (Row4[3] == 1) {

                html += '<li class="seat"><input type="checkbox" value="4' + ColumeLable[2] + '"  id="4' + ColumeLable[2] + '" /><label for="4' + ColumeLable[2] + '">4' + ColumeLable[2] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            if (Row4[4] == 1) {

                html += '<li class="seat"><input type="checkbox" value="4' + ColumeLable[3] + '"  id="4' + ColumeLable[3] + '" /><label for="4' + ColumeLable[3] + '">4' + ColumeLable[3] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            if (Row4[5] == 1) {

                html += '<li class="seat"><input type="checkbox" value="4' + ColumeLable[4] + '"   id="4' + ColumeLable[4] + '" /><label for="4' + ColumeLable[4] + '">4' + ColumeLable[4] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            html += '</ol>';
            html += '</li>';


        }


        //***************************************Aricraft-Row5**************************************************

        if (!Aircraft[0].row5.includes('0,00000,')) {

            html += '<li class="">';
            html += '<ol class="seats">';

            html += Row5[0] == 1 ? '<li class="seat"><label style="font-size: 25px; font-weight: 400;height: 32px;width: 30px;border-radius:0px!important; background-color:red !important; cursor: no-drop !important; box-shadow:none !important;">5</label></li>' : '<li class="seat"><label style="font-size: 25px;width: 30px;border-radius:0px!important; font-weight: 400; background-color:transparent !important; cursor: no-drop !important; box-shadow:none !important;">5</label></li>';


            if (Row5[1] == 1) {

                html += '<li class="seat"> <input type="checkbox" value="5' + ColumeLable[0] + '"  id="5' + ColumeLable[0] + '" /><label for="5' + ColumeLable[0] + '">5' + ColumeLable[0] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }


            if (Row5[2] == 1) {

                html += '<li class="seat"><input type="checkbox" value="5' + ColumeLable[1] + '" id="5' + ColumeLable[1] + '" /><label for="5' + ColumeLable[1] + '">5' + ColumeLable[1] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            if (Row5[3] == 1) {

                html += '<li class="seat"><input type="checkbox" value="5' + ColumeLable[2] + '"  id="5' + ColumeLable[2] + '" /><label for="5' + ColumeLable[2] + '">5' + ColumeLable[2] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            if (Row5[4] == 1) {

                html += '<li class="seat"><input type="checkbox" value="5' + ColumeLable[3] + '" id="5' + ColumeLable[3] + '" /><label for="5' + ColumeLable[3] + '">5' + ColumeLable[3] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            if (Row5[5] == 1) {

                html += '<li class="seat"><input type="checkbox" value="5' + ColumeLable[4] + '" id="5' + ColumeLable[4] + '" /><label for="5' + ColumeLable[4] + '">5' + ColumeLable[4] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            html += '</ol>';
            html += '</li>';

        }



        //***************************************Aricraft-Row6**************************************************


        if (!Aircraft[0].row6.includes('0,00000,')) {

            html += '<li class="">';
            html += '<ol class="seats">';

            html += Row6[0] == 1 ? '<li class="seat"><label style="font-size: 25px; font-weight: 400;height: 32px;width: 30px;border-radius:0px!important; background-color:red !important; cursor: no-drop !important; box-shadow:none !important;">6</label></li>' : '<li class="seat"><label style="font-size: 25px;width: 30px;border-radius:0px!important; font-weight: 400; background-color:transparent !important; cursor: no-drop !important; box-shadow:none !important;">6</label></li>';


            if (Row6[1] == 1) {

                html += '<li class="seat"> <input type="checkbox"  value="6' + ColumeLable[0] + '" id="6' + ColumeLable[0] + '" /><label for="6' + ColumeLable[0] + '">6' + ColumeLable[0] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }


            if (Row6[2] == 1) {

                html += '<li class="seat"><input type="checkbox" value="6' + ColumeLable[1] + '"  id="6' + ColumeLable[1] + '" /><label for="6' + ColumeLable[1] + '">6' + ColumeLable[1] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            if (Row6[3] == 1) {

                html += '<li class="seat"><input type="checkbox" value="6' + ColumeLable[2] + '" id="6' + ColumeLable[2] + '" /><label for="6' + ColumeLable[2] + '">6' + ColumeLable[2] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            if (Row6[4] == 1) {

                html += '<li class="seat"><input type="checkbox" value="6' + ColumeLable[3] + '" id="6' + ColumeLable[3] + '" /><label for="6' + ColumeLable[3] + '">6' + ColumeLable[3] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            if (Row6[5] == 1) {

                html += '<li class="seat"><input type="checkbox"  value="6' + ColumeLable[4] + '" id="6' + ColumeLable[4] + '" /><label for="6' + ColumeLable[4] + '">6' + ColumeLable[4] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            html += '</ol>';
            html += '</li>';

        }

        //***************************************Aricraft-Row7**************************************************

        if (!Aircraft[0].row7.includes('0,00000,')) {

            html += '<li class="">';
            html += '<ol class="seats">';

            html += Row7[0] == 1 ? '<li class="seat"><label style="font-size: 25px; font-weight: 400;height: 32px;width: 30px;border-radius:0px!important; background-color:red !important; cursor: no-drop !important; box-shadow:none !important;">7</label></li>' : '<li class="seat"><label style="font-size: 25px;width: 30px;border-radius:0px!important; font-weight: 400; background-color:transparent !important; cursor: no-drop !important; box-shadow:none !important;">7</label></li>';


            if (Row7[1] == 1) {

                html += '<li class="seat"> <input type="checkbox" value="7' + ColumeLable[0] + '" id="7' + ColumeLable[0] + '" /><label for="7' + ColumeLable[0] + '">7' + ColumeLable[0] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }


            if (Row7[2] == 1) {

                html += '<li class="seat"><input type="checkbox"  value="7' + ColumeLable[1] + '" id="7' + ColumeLable[1] + '" /><label for="7' + ColumeLable[1] + '">7' + ColumeLable[1] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            if (Row7[3] == 1) {

                html += '<li class="seat"><input type="checkbox" value="7' + ColumeLable[2] + '"   id="7' + ColumeLable[2] + '" /><label for="7' + ColumeLable[2] + '">7' + ColumeLable[2] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            if (Row7[4] == 1) {

                html += '<li class="seat"><input type="checkbox" value="7' + ColumeLable[3] + '" id="7' + ColumeLable[3] + '" /><label for="7' + ColumeLable[3] + '">7' + ColumeLable[3] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            if (Row7[5] == 1) {

                html += '<li class="seat"><input type="checkbox" value="7' + ColumeLable[4] + '" id="7' + ColumeLable[4] + '" /><label for="7' + ColumeLable[4] + '">7' + ColumeLable[4] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            html += '</ol>';
            html += '</li>';
        }


        //***************************************Aricraft-Row8**************************************************

        if (!Aircraft[0].row8.includes('0,00000,')) {

            html += '<li class="">';
            html += '<ol class="seats">';

            html += Row8[0] == 1 ? '<li class="seat"><label style="font-size: 25px; font-weight: 400;height: 32px;width: 30px;border-radius:0px!important; background-color:red !important; cursor: no-drop !important; box-shadow:none !important;">8</label></li>' : '<li class="seat"><label style="font-size: 25px;width: 30px;border-radius:0px!important; font-weight: 400; background-color:transparent !important; cursor: no-drop !important; box-shadow:none !important;">8</label></li>';


            if (Row8[1] == 1) {

                html += '<li class="seat"> <input type="checkbox" value="8' + ColumeLable[0] + '" id="8' + ColumeLable[0] + '" /><label for="8' + ColumeLable[0] + '">8' + ColumeLable[0] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }


            if (Row8[2] == 1) {

                html += '<li class="seat"><input type="checkbox" value="8' + ColumeLable[1] + '"   id="8' + ColumeLable[1] + '" /><label for="8' + ColumeLable[1] + '">8' + ColumeLable[1] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            if (Row8[3] == 1) {

                html += '<li class="seat"><input type="checkbox" value="8' + ColumeLable[2] + '"  id="8' + ColumeLable[2] + '" /><label for="8' + ColumeLable[2] + '">8' + ColumeLable[2] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            if (Row8[4] == 1) {
                8
                html += '<li class="seat"><input type="checkbox" value="8' + ColumeLable[3] + '"   id="8' + ColumeLable[3] + '" /><label for="8' + ColumeLable[3] + '">8' + ColumeLable[3] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            if (Row8[5] == 1) {

                html += '<li class="seat"><input type="checkbox"  value="8' + ColumeLable[4] + '"  id="8' + ColumeLable[4] + '" /><label for="8' + ColumeLable[4] + '">8' + ColumeLable[4] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            html += '</ol>';
            html += '</li>';

        }


        //***************************************Aricraft-Row9**************************************************


        if (!Aircraft[0].row9.includes('0,00000,')) {

            html += '<li class="">';
            html += '<ol class="seats">';

            html += Row9[0] == 1 ? '<li class="seat"><label style="font-size: 25px; font-weight: 400;height: 32px;width: 30px;border-radius:0px!important; background-color:red !important; cursor: no-drop !important; box-shadow:none !important;">9</label></li>' : '<li class="seat"><label style="font-size: 25px;width: 30px;border-radius:0px!important; font-weight: 400; background-color:transparent !important; cursor: no-drop !important; box-shadow:none !important;">9</label></li>';


            if (Row9[1] == 1) {

                html += '<li class="seat"> <input type="checkbox" value="9' + ColumeLable[0] + '"  id="9' + ColumeLable[0] + '" /><label for="9' + ColumeLable[0] + '">9' + ColumeLable[0] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }


            if (Row9[2] == 1) {

                html += '<li class="seat"><input type="checkbox" value="9' + ColumeLable[1] + '" id="9' + ColumeLable[1] + '" /><label for="9' + ColumeLable[1] + '">9' + ColumeLable[1] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            if (Row9[3] == 1) {

                html += '<li class="seat"><input type="checkbox" value="9' + ColumeLable[2] + '" id="9' + ColumeLable[2] + '" /><label for="9' + ColumeLable[2] + '">9' + ColumeLable[2] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            if (Row9[4] == 1) {

                html += '<li class="seat"><input type="checkbox" value="9' + ColumeLable[3] + '" id="9' + ColumeLable[3] + '" /><label for="9' + ColumeLable[3] + '">9' + ColumeLable[3] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            if (Row9[5] == 1) {

                html += '<li class="seat"><input type="checkbox" value="9' + ColumeLable[4] + '"  id="9' + ColumeLable[4] + '" /><label for="9' + ColumeLable[4] + '">9' + ColumeLable[4] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            html += '</ol>';
            html += '</li>';

        }

        //***************************************Aricraft-Row10**************************************************

        if (!Aircraft[0].row10.includes('0,00000,')) {


            html += '<li class="">';
            html += '<ol class="seats">';

            html += Row10[0] == 1 ? '<li class="seat"><label style="font-size: 25px; font-weight: 400;height: 32px;width: 30px;border-radius:0px!important; background-color:red !important; cursor: no-drop !important; box-shadow:none !important;">10</label></li>' : '<li class="seat"><label style="font-size: 25px;width: 30px;border-radius:0px!important; font-weight: 400; background-color:transparent !important; cursor: no-drop !important; box-shadow:none !important;">10</label></li>';


            if (Row10[1] == 1) {

                html += '<li class="seat"> <input type="checkbox" value="10' + ColumeLable[0] + '" id="10' + ColumeLable[0] + '" /><label for="10' + ColumeLable[0] + '">10' + ColumeLable[0] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }


            if (Row10[2] == 1) {

                html += '<li class="seat"><input type="checkbox" value="10' + ColumeLable[1] + '" id="10' + ColumeLable[1] + '" /><label for="10' + ColumeLable[1] + '">10' + ColumeLable[1] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            if (Row10[3] == 1) {

                html += '<li class="seat"><input type="checkbox" value="10' + ColumeLable[2] + '" id="10' + ColumeLable[2] + '" /><label for="10' + ColumeLable[2] + '">10' + ColumeLable[2] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            if (Row10[4] == 1) {

                html += '<li class="seat"><input type="checkbox" value="10' + ColumeLable[3] + '"  id="10' + ColumeLable[3] + '" /><label for="10' + ColumeLable[3] + '">10' + ColumeLable[3] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            if (Row10[5] == 1) {

                html += '<li class="seat"><input type="checkbox" value="10' + ColumeLable[4] + '" id="10' + ColumeLable[4] + '" /><label for="10' + ColumeLable[4] + '">10' + ColumeLable[4] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            html += '</ol>';
            html += '</li>';

        }


        if (!Aircraft[0].row11.includes('0,00000,')) {

            //***************************************Aricraft-Row11**************************************************

            html += '<li class="">';
            html += '<ol class="seats">';

            html += Row11[0] == 1 ? '<li class="seat"><label style="font-size: 25px; font-weight: 400;height: 32px;width: 30px;border-radius:0px!important; background-color:red !important; cursor: no-drop !important; box-shadow:none !important;">11</label></li>' : '<li class="seat"><label style="font-size: 25px;width: 30px;border-radius:0px!important; font-weight: 400; background-color:transparent !important; cursor: no-drop !important; box-shadow:none !important;">11</label></li>';


            if (Row11[1] == 1) {

                html += '<li class="seat"> <input type="checkbox" value="11' + ColumeLable[0] + '" id="11' + ColumeLable[0] + '" /><label for="11' + ColumeLable[0] + '">11' + ColumeLable[0] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }


            if (Row11[2] == 1) {

                html += '<li class="seat"><input type="checkbox" value="11' + ColumeLable[1] + '" id="11' + ColumeLable[1] + '" /><label for="11' + ColumeLable[1] + '">11' + ColumeLable[1] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            if (Row11[3] == 1) {

                html += '<li class="seat"><input type="checkbox" value="11' + ColumeLable[2] + '" id="11' + ColumeLable[2] + '" /><label for="11' + ColumeLable[2] + '">11' + ColumeLable[2] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            if (Row11[4] == 1) {

                html += '<li class="seat"><input type="checkbox" value="11' + ColumeLable[3] + '" id="11' + ColumeLable[3] + '" /><label for="11' + ColumeLable[3] + '">11' + ColumeLable[3] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            if (Row11[5] == 1) {

                html += '<li class="seat"><input type="checkbox" value="11' + ColumeLable[4] + '" id="11' + ColumeLable[4] + '" /><label for="11' + ColumeLable[4] + '">11' + ColumeLable[4] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            html += '</ol>';
            html += '</li>';

        }


        //***************************************Aricraft-Row12**************************************************


        if (!Aircraft[0].row12.includes('0,00000,')) {

            html += '<li class="">';
            html += '<ol class="seats">';

            html += Row12[0] == 1 ? '<li class="seat"><label style="font-size: 25px; font-weight: 400;height: 32px;width: 30px;border-radius:0px!important; background-color:red !important; cursor: no-drop !important; box-shadow:none !important;">12</label></li>' : '<li class="seat"><label style="font-size: 25px;width: 30px;border-radius:0px!important; font-weight: 400; background-color:transparent !important; cursor: no-drop !important; box-shadow:none !important;">12</label></li>';


            if (Row12[1] == 1) {

                html += '<li class="seat"> <input type="checkbox" value="12' + ColumeLable[0] + '" id="12' + ColumeLable[0] + '" /><label for="12' + ColumeLable[0] + '">12' + ColumeLable[0] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }


            if (Row12[2] == 1) {

                html += '<li class="seat"><input type="checkbox" value="12' + ColumeLable[1] + '"  id="12' + ColumeLable[1] + '" /><label for="12' + ColumeLable[1] + '">12' + ColumeLable[1] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            if (Row12[3] == 1) {

                html += '<li class="seat"><input type="checkbox" value="12' + ColumeLable[2] + '" id="12' + ColumeLable[2] + '" /><label for="12' + ColumeLable[2] + '">12' + ColumeLable[2] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            if (Row12[4] == 1) {

                html += '<li class="seat"><input type="checkbox" value="12' + ColumeLable[3] + '" id="12' + ColumeLable[3] + '" /><label for="12' + ColumeLable[3] + '">12' + ColumeLable[3] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            if (Row12[5] == 1) {

                html += '<li class="seat"><input type="checkbox" value="12' + ColumeLable[4] + '" id="12' + ColumeLable[4] + '" /><label for="12' + ColumeLable[4] + '">12' + ColumeLable[4] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            html += '</ol>';
            html += '</li>';

        }

        //***************************************Aricraft-Row13**************************************************



        if (!Aircraft[0].row13.includes('0,00000,')) {

            html += '<li class="">';
            html += '<ol class="seats">';

            html += Row13[0] == 1 ? '<li class="seat"><label style="font-size: 25px; font-weight: 400;height: 32px;width: 30px;border-radius:0px!important; background-color:red !important; cursor: no-drop !important; box-shadow:none !important;">13</label></li>' : '<li class="seat"><label style="font-size: 25px;width: 30px;border-radius:0px!important; font-weight: 400; background-color:transparent !important; cursor: no-drop !important; box-shadow:none !important;">13</label></li>';


            if (Row13[1] == 1) {

                html += '<li class="seat"> <input type="checkbox" value="13' + ColumeLable[0] + '" id="13' + ColumeLable[0] + '" /><label for="13' + ColumeLable[0] + '">13' + ColumeLable[0] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }


            if (Row13[2] == 1) {

                html += '<li class="seat"><input type="checkbox" value="13' + ColumeLable[1] + '"  id="13' + ColumeLable[1] + '" /><label for="13' + ColumeLable[1] + '">13' + ColumeLable[1] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            if (Row13[3] == 1) {

                html += '<li class="seat"><input type="checkbox" value="13' + ColumeLable[2] + '" id="13' + ColumeLable[2] + '" /><label for="13' + ColumeLable[2] + '">13' + ColumeLable[2] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            if (Row13[4] == 1) {

                html += '<li class="seat"><input type="checkbox" value="13' + ColumeLable[3] + '" id="13' + ColumeLable[3] + '" /><label for="13' + ColumeLable[3] + '">13' + ColumeLable[3] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            if (Row13[5] == 1) {

                html += '<li class="seat"><input type="checkbox" value="13' + ColumeLable[4] + '" id="13' + ColumeLable[4] + '" /><label for="13' + ColumeLable[4] + '">13' + ColumeLable[4] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            html += '</ol>';
            html += '</li>';

        }

        //***************************************Aricraft-Row14**************************************************


        if (!Aircraft[0].row14.includes('0,00000,')) {


            html += '<li class="">';
            html += '<ol class="seats">';

            html += Row14[0] == 1 ? '<li class="seat"><label style="font-size: 25px; font-weight: 400;height: 32px;width: 30px;border-radius:0px!important; background-color:red !important; cursor: no-drop !important; box-shadow:none !important;">14</label></li>' : '<li class="seat"><label style="font-size: 25px;width: 30px;border-radius:0px!important; font-weight: 400; background-color:transparent !important; cursor: no-drop !important; box-shadow:none !important;">14</label></li>';


            if (Row14[1] == 1) {

                html += '<li class="seat"> <input type="checkbox"  value="14' + ColumeLable[0] + '" id="14' + ColumeLable[0] + '" /><label for="14' + ColumeLable[0] + '">14' + ColumeLable[0] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }


            if (Row14[2] == 1) {

                html += '<li class="seat"><input type="checkbox" value="14' + ColumeLable[1] + '"  id="14' + ColumeLable[1] + '" /><label for="14' + ColumeLable[1] + '">14' + ColumeLable[1] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            if (Row14[3] == 1) {

                html += '<li class="seat"><input type="checkbox" value="14' + ColumeLable[2] + '" id="14' + ColumeLable[2] + '" /><label for="14' + ColumeLable[2] + '">14' + ColumeLable[2] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            if (Row14[4] == 1) {

                html += '<li class="seat"><input type="checkbox" value="14' + ColumeLable[3] + '" id="14' + ColumeLable[3] + '" /><label for="14' + ColumeLable[3] + '">14' + ColumeLable[3] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            if (Row14[5] == 1) {

                html += '<li class="seat"><input type="checkbox" value="14' + ColumeLable[4] + '" id="14' + ColumeLable[4] + '" /><label for="14' + ColumeLable[4] + '">14' + ColumeLable[4] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            html += '</ol>';
            html += '</li>';


        }

        //***************************************Aricraft-Row15**************************************************


        if (!Aircraft[0].row15.includes('0,00000,')) {


            html += '<li class="">';
            html += '<ol class="seats">';

            html += Row15[0] == 1 ? '<li class="seat"><label style="font-size: 25px; font-weight: 400;height: 32px;width: 30px;border-radius:0px!important; background-color:red !important; cursor: no-drop !important; box-shadow:none !important;">15</label></li>' : '<li class="seat"><label style="font-size: 25px;width: 30px;border-radius:0px!important; font-weight: 400; background-color:transparent !important; cursor: no-drop !important; box-shadow:none !important;">15</label></li>';


            if (Row15[1] == 1) {

                html += '<li class="seat"> <input type="checkbox" value="15' + ColumeLable[0] + '" id="15' + ColumeLable[0] + '" /><label for="15' + ColumeLable[0] + '">15' + ColumeLable[0] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }


            if (Row15[2] == 1) {

                html += '<li class="seat"><input type="checkbox" value="15' + ColumeLable[1] + '" id="15' + ColumeLable[1] + '" /><label for="15' + ColumeLable[1] + '">15' + ColumeLable[1] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            if (Row15[3] == 1) {

                html += '<li class="seat"><input type="checkbox"  value="15' + ColumeLable[2] + '"  id="15' + ColumeLable[2] + '" /><label for="15' + ColumeLable[2] + '">15' + ColumeLable[2] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            if (Row15[4] == 1) {

                html += '<li class="seat"><input type="checkbox" value="15' + ColumeLable[3] + '" id="15' + ColumeLable[3] + '" /><label for="15' + ColumeLable[3] + '">15' + ColumeLable[3] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            if (Row14[5] == 1) {

                html += '<li class="seat"><input type="checkbox" value="15' + ColumeLable[4] + '" id="15' + ColumeLable[4] + '" /><label for="15' + ColumeLable[4] + '">15' + ColumeLable[4] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            html += '</ol>';
            html += '</li>';

        }

        //***************************************Aricraft-Row16**************************************************


        if (!Aircraft[0].row16.includes('0,00000,')) {

            html += '<li class="">';
            html += '<ol class="seats">';

            html += Row16[0] == 1 ? '<li class="seat"><label style="font-size: 25px; font-weight: 400;height: 32px;width: 30px;border-radius:0px!important; background-color:red !important; cursor: no-drop !important; box-shadow:none !important;">16</label></li>' : '<li class="seat"><label style="font-size: 25px;width: 30px;border-radius:0px!important; font-weight: 400; background-color:transparent !important; cursor: no-drop !important; box-shadow:none !important;">16</label></li>';


            if (Row16[1] == 1) {

                html += '<li class="seat"> <input type="checkbox"   value="16' + ColumeLable[0] + '" id="16' + ColumeLable[0] + '" /><label for="16' + ColumeLable[0] + '">16' + ColumeLable[0] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }


            if (Row16[2] == 1) {

                html += '<li class="seat"><input type="checkbox" value="16' + ColumeLable[1] + '" id="16' + ColumeLable[1] + '" /><label for="16' + ColumeLable[1] + '">16' + ColumeLable[1] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            if (Row16[3] == 1) {

                html += '<li class="seat"><input type="checkbox"  value="16' + ColumeLable[2] + '" id="16' + ColumeLable[2] + '" /><label for="16' + ColumeLable[2] + '">16' + ColumeLable[2] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            if (Row16[4] == 1) {

                html += '<li class="seat"><input type="checkbox" value="16' + ColumeLable[3] + '" id="16' + ColumeLable[3] + '" /><label for="16' + ColumeLable[3] + '">16' + ColumeLable[3] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            if (Row16[5] == 1) {

                html += '<li class="seat"><input type="checkbox" value="16' + ColumeLable[4] + '" id="16' + ColumeLable[4] + '" /><label for="16' + ColumeLable[4] + '">16' + ColumeLable[4] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            html += '</ol>';
            html += '</li>';

        }

        //***************************************Aricraft-Row17**************************************************

        if (!Aircraft[0].row17.includes('0,00000,')) {

            html += '<li class="">';
            html += '<ol class="seats">';

            html += Row17[0] == 1 ? '<li class="seat"><label style="font-size: 25px; font-weight: 400;height: 32px;width: 30px;border-radius:0px!important; background-color:red !important; cursor: no-drop !important; box-shadow:none !important;">17</label></li>' : '<li class="seat"><label style="font-size: 25px;width: 30px;border-radius:0px!important; font-weight: 400; background-color:transparent !important; cursor: no-drop !important; box-shadow:none !important;">17</label></li>';


            if (Row17[1] == 1) {

                html += '<li class="seat"> <input type="checkbox" value="17' + ColumeLable[0] + '" id="17' + ColumeLable[0] + '" /><label for="17' + ColumeLable[0] + '">17' + ColumeLable[0] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }


            if (Row17[2] == 1) {

                html += '<li class="seat"><input type="checkbox" value="17' + ColumeLable[1] + '" id="17' + ColumeLable[1] + '" /><label for="17' + ColumeLable[1] + '">17' + ColumeLable[1] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            if (Row17[3] == 1) {

                html += '<li class="seat"><input type="checkbox" value="17' + ColumeLable[2] + '" id="17' + ColumeLable[2] + '" /><label for="17' + ColumeLable[2] + '">17' + ColumeLable[2] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            if (Row17[4] == 1) {

                html += '<li class="seat"><input type="checkbox" value="17' + ColumeLable[3] + '"  id="17' + ColumeLable[3] + '" /><label for="17' + ColumeLable[3] + '">17' + ColumeLable[3] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            if (Row17[5] == 1) {

                html += '<li class="seat"><input type="checkbox" value="17' + ColumeLable[4] + '"  id="17' + ColumeLable[4] + '" /><label for="17' + ColumeLable[4] + '">17' + ColumeLable[4] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            html += '</ol>';
            html += '</li>';


        }
        //***************************************Aricraft-Row18**************************************************

        if (!Aircraft[0].row18.includes('0,00000,')) {

            html += '<li class="">';
            html += '<ol class="seats">';

            html += Row18[0] == 1 ? '<li class="seat"><label style="font-size: 25px; font-weight: 400;height: 32px;width: 30px;border-radius:0px!important; background-color:red !important; cursor: no-drop !important; box-shadow:none !important;">18</label></li>' : '<li class="seat"><label style="font-size: 25px;width: 30px;border-radius:0px!important; font-weight: 400; background-color:transparent !important; cursor: no-drop !important; box-shadow:none !important;">18</label></li>';


            if (Row18[1] == 1) {

                html += '<li class="seat"> <input type="checkbox"  value="18' + ColumeLable[0] + '" id="18' + ColumeLable[0] + '" /><label for="18' + ColumeLable[0] + '">18' + ColumeLable[0] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }


            if (Row18[2] == 1) {

                html += '<li class="seat"><input type="checkbox" value="18' + ColumeLable[1] + '"  id="18' + ColumeLable[1] + '" /><label for="18' + ColumeLable[1] + '">18' + ColumeLable[1] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            if (Row18[3] == 1) {

                html += '<li class="seat"><input type="checkbox" value="18' + ColumeLable[2] + '" id="18' + ColumeLable[2] + '" /><label for="18' + ColumeLable[2] + '">18' + ColumeLable[2] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            if (Row18[4] == 1) {

                html += '<li class="seat"><input type="checkbox" value="18' + ColumeLable[3] + '" id="18' + ColumeLable[3] + '" /><label for="18' + ColumeLable[3] + '">18' + ColumeLable[3] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            if (Row18[5] == 1) {

                html += '<li class="seat"><input type="checkbox" value="18' + ColumeLable[4] + '" id="18' + ColumeLable[4] + '" /><label for="18' + ColumeLable[4] + '">18' + ColumeLable[4] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            html += '</ol>';
            html += '</li>';


        }

        //***************************************Aricraft-Row19**************************************************

        if (!Aircraft[0].row19.includes('0,00000,')) {

            html += '<li class="">';
            html += '<ol class="seats">';

            html += Row19[0] == 1 ? '<li class="seat"><label style="font-size: 25px; font-weight: 400;height: 32px;width: 30px;border-radius:0px!important; background-color:red !important; cursor: no-drop !important; box-shadow:none !important;">19</label></li>' : '<li class="seat"><label style="font-size: 25px;width: 30px;border-radius:0px!important; font-weight: 400; background-color:transparent !important; cursor: no-drop !important; box-shadow:none !important;">19</label></li>';


            if (Row19[1] == 1) {

                html += '<li class="seat"> <input type="checkbox" value="19' + ColumeLable[0] + '" id="19' + ColumeLable[0] + '" /><label for="19' + ColumeLable[0] + '">19' + ColumeLable[0] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }


            if (Row19[2] == 1) {

                html += '<li class="seat"><input type="checkbox" value="19' + ColumeLable[1] + '" id="19' + ColumeLable[1] + '" /><label for="19' + ColumeLable[1] + '">19' + ColumeLable[1] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            if (Row19[3] == 1) {

                html += '<li class="seat"><input type="checkbox" value="19' + ColumeLable[2] + '" id="19' + ColumeLable[2] + '" /><label for="19' + ColumeLable[2] + '">19' + ColumeLable[2] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            if (Row19[4] == 1) {

                html += '<li class="seat"><input type="checkbox"  value="19' + ColumeLable[3] + '" id="19' + ColumeLable[3] + '" /><label for="19' + ColumeLable[3] + '">19' + ColumeLable[3] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            if (Row19[5] == 1) {

                html += '<li class="seat"><input type="checkbox" value="19' + ColumeLable[4] + '" id="19' + ColumeLable[4] + '" /><label for="19' + ColumeLable[4] + '">19' + ColumeLable[4] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            html += '</ol>';
            html += '</li>';

        }

        //***************************************Aricraft-Row20**************************************************

        if (!Aircraft[0].row20.includes('0,00000,')) {

            html += '<li class="">';
            html += '<ol class="seats">';

            html += Row20[0] == 1 ? '<li class="seat"><label style="font-size: 25px; font-weight: 400;height: 32px;width: 30px;border-radius:0px!important; background-color:red !important; cursor: no-drop !important; box-shadow:none !important;">20</label></li>' : '<li class="seat"><label style="font-size: 25px;width: 30px;border-radius:0px!important; font-weight: 400; background-color:transparent !important; cursor: no-drop !important; box-shadow:none !important;">20</label></li>';


            if (Row20[1] == 1) {

                html += '<li class="seat"> <input type="checkbox" value="20' + ColumeLable[0] + '"  id="20' + ColumeLable[0] + '" /><label for="20' + ColumeLable[0] + '">20' + ColumeLable[0] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }


            if (Row20[2] == 1) {

                html += '<li class="seat"><input type="checkbox" value="20' + ColumeLable[1] + '" id="20' + ColumeLable[1] + '" /><label for="20' + ColumeLable[1] + '">20' + ColumeLable[1] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            if (Row20[3] == 1) {

                html += '<li class="seat"><input type="checkbox" value="20' + ColumeLable[1] + '" id="20' + ColumeLable[2] + '" /><label for="20' + ColumeLable[2] + '">20' + ColumeLable[2] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            if (Row20[4] == 1) {

                html += '<li class="seat"><input type="checkbox" value="20' + ColumeLable[3] + '" id="20' + ColumeLable[3] + '" /><label for="20' + ColumeLable[3] + '">20' + ColumeLable[3] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            if (Row20[5] == 1) {

                html += '<li class="seat"><input type="checkbox" value="20' + ColumeLable[4] + '" id="20' + ColumeLable[4] + '" /><label for="20' + ColumeLable[4] + '">20' + ColumeLable[4] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            html += '</ol>';
            html += '</li>';

        }


        //***************************************Aricraft-Row21**************************************************

        if (!Aircraft[0].row21.includes('0,00000,')) {

            html += '<li class="">';
            html += '<ol class="seats">';

            html += Row21[0] == 1 ? '<li class="seat"><label style="font-size: 25px; font-weight: 400;height: 32px;width: 30px;border-radius:0px!important; background-color:red !important; cursor: no-drop !important; box-shadow:none !important;">21</label></li>' : '<li class="seat"><label style="font-size: 25px;width: 30px;border-radius:0px!important; font-weight: 400; background-color:transparent !important; cursor: no-drop !important; box-shadow:none !important;">21</label></li>';


            if (Row21[1] == 1) {

                html += '<li class="seat"> <input type="checkbox" value="21' + ColumeLable[0] + '"  id="21' + ColumeLable[0] + '" /><label for="21' + ColumeLable[0] + '">21' + ColumeLable[0] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }


            if (Row21[2] == 1) {

                html += '<li class="seat"><input type="checkbox" value="21' + ColumeLable[1] + '" id="21' + ColumeLable[1] + '" /><label for="21' + ColumeLable[1] + '">21' + ColumeLable[1] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            if (Row21[3] == 1) {

                html += '<li class="seat"><input type="checkbox" value="21' + ColumeLable[2] + '" id="21' + ColumeLable[2] + '" /><label for="21' + ColumeLable[2] + '">21' + ColumeLable[2] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            if (Row21[4] == 1) {

                html += '<li class="seat"><input type="checkbox" value="21' + ColumeLable[3] + '" id="21' + ColumeLable[3] + '" /><label for="21' + ColumeLable[3] + '">21' + ColumeLable[3] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            if (Row21[5] == 1) {

                html += '<li class="seat"><input type="checkbox" value="21' + ColumeLable[4] + '" id="21' + ColumeLable[4] + '" /><label for="21' + ColumeLable[4] + '">21' + ColumeLable[4] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            html += '</ol>';
            html += '</li>';
        }

        //***************************************Aricraft-Row22**************************************************

        if (!Aircraft[0].row22.includes('0,00000,')) {

            html += '<li class="">';
            html += '<ol class="seats">';

            html += Row22[0] == 1 ? '<li class="seat"><label style="font-size: 25px; font-weight: 400;height: 32px;width: 30px;border-radius:0px!important; background-color:red !important; cursor: no-drop !important; box-shadow:none !important;">22</label></li>' : '<li class="seat"><label style="font-size: 25px;width: 30px;border-radius:0px!important; font-weight: 400; background-color:transparent !important; cursor: no-drop !important; box-shadow:none !important;">22</label></li>';


            if (Row22[1] == 1) {

                html += '<li class="seat"> <input type="checkbox" value="22' + ColumeLable[0] + '" id="22' + ColumeLable[0] + '" /><label for="22' + ColumeLable[0] + '">22' + ColumeLable[0] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }


            if (Row22[2] == 1) {

                html += '<li class="seat"><input type="checkbox" value="22' + ColumeLable[1] + '" id="22' + ColumeLable[1] + '" /><label for="22' + ColumeLable[1] + '">22' + ColumeLable[1] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            if (Row22[3] == 1) {

                html += '<li class="seat"><input type="checkbox" value="22' + ColumeLable[2] + '" id="22' + ColumeLable[2] + '" /><label for="22' + ColumeLable[2] + '">22' + ColumeLable[2] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            if (Row22[4] == 1) {

                html += '<li class="seat"><input type="checkbox"  value="22' + ColumeLable[3] + '"  id="22' + ColumeLable[3] + '" /><label for="22' + ColumeLable[3] + '">22' + ColumeLable[3] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            if (Row22[5] == 1) {

                html += '<li class="seat"><input type="checkbox" value="22' + ColumeLable[4] + '" id="22' + ColumeLable[4] + '" /><label for="22' + ColumeLable[4] + '">22' + ColumeLable[4] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            html += '</ol>';
            html += '</li>';

        }


        //***************************************Aricraft-Row23**************************************************

        if (!Aircraft[0].row23.includes('0,00000,')) {

            html += '<li class="">';
            html += '<ol class="seats">';

            html += Row23[0] == 1 ? '<li class="seat"><label style="font-size: 25px; font-weight: 400;height: 32px;width: 30px;border-radius:0px!important; background-color:red !important; cursor: no-drop !important; box-shadow:none !important;">23</label></li>' : '<li class="seat"><label style="font-size: 25px;width: 30px;border-radius:0px!important; font-weight: 400; background-color:transparent !important; cursor: no-drop !important; box-shadow:none !important;">23</label></li>';


            if (Row23[1] == 1) {

                html += '<li class="seat"> <input type="checkbox" value="23' + ColumeLable[0] + '" id="23' + ColumeLable[0] + '" /><label for="23' + ColumeLable[0] + '">23' + ColumeLable[0] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }


            if (Row23[2] == 1) {

                html += '<li class="seat"><input type="checkbox" value="23' + ColumeLable[1] + '" id="23' + ColumeLable[1] + '" /><label for="23' + ColumeLable[1] + '">23' + ColumeLable[1] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            if (Row23[3] == 1) {

                html += '<li class="seat"><input type="checkbox" value="23' + ColumeLable[2] + '" id="23' + ColumeLable[2] + '" /><label for="23' + ColumeLable[2] + '">23' + ColumeLable[2] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            if (Row23[4] == 1) {

                html += '<li class="seat"><input type="checkbox" value="23' + ColumeLable[3] + '" id="23' + ColumeLable[3] + '" /><label for="23' + ColumeLable[3] + '">23' + ColumeLable[3] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            if (Row23[5] == 1) {

                html += '<li class="seat"><input type="checkbox" value="23' + ColumeLable[4] + '" id="23' + ColumeLable[4] + '" /><label for="23' + ColumeLable[4] + '">23' + ColumeLable[4] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            html += '</ol>';
            html += '</li>';

        }

        //***************************************Aricraft-Row24**************************************************


        if (!Aircraft[0].row24.includes('0,00000,')) {


            html += '<li class="">';
            html += '<ol class="seats">';

            html += Row24[0] == 1 ? '<li class="seat"><label style="font-size: 25px; font-weight: 400;height: 32px;width: 30px;border-radius:0px!important; background-color:red !important; cursor: no-drop !important; box-shadow:none !important;">24</label></li>' : '<li class="seat"><label style="font-size: 25px;width: 30px;border-radius:0px!important; font-weight: 400; background-color:transparent !important; cursor: no-drop !important; box-shadow:none !important;">24</label></li>';


            if (Row24[1] == 1) {

                html += '<li class="seat"> <input type="checkbox" value="24' + ColumeLable[0] + '" id="24' + ColumeLable[0] + '" /><label for="24' + ColumeLable[0] + '">24' + ColumeLable[0] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }


            if (Row24[2] == 1) {

                html += '<li class="seat"><input type="checkbox" value="24' + ColumeLable[1] + '" id="24' + ColumeLable[1] + '" /><label for="24' + ColumeLable[1] + '">24' + ColumeLable[1] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            if (Row24[3] == 1) {

                html += '<li class="seat"><input type="checkbox" value="24' + ColumeLable[1] + '" id="24' + ColumeLable[2] + '" /><label for="24' + ColumeLable[2] + '">24' + ColumeLable[2] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            if (Row24[4] == 1) {

                html += '<li class="seat"><input type="checkbox" value="24' + ColumeLable[3] + '" id="24' + ColumeLable[3] + '" /><label for="24' + ColumeLable[3] + '">24' + ColumeLable[3] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            if (Row24[5] == 1) {

                html += '<li class="seat"><input type="checkbox" value="24' + ColumeLable[4] + '" id="24' + ColumeLable[4] + '" /><label for="24' + ColumeLable[4] + '">24' + ColumeLable[4] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            html += '</ol>';
            html += '</li>';


        }

        //***************************************Aricraft-Row25**************************************************

        if (!Aircraft[0].row25.includes('0,00000,')) {

            html += '<li class="">';
            html += '<ol class="seats">';

            html += Row25[0] == 1 ? '<li class="seat"><label style="font-size: 25px; font-weight: 400;height: 32px;width: 30px;border-radius:0px!important; background-color:red !important; cursor: no-drop !important; box-shadow:none !important;">25</label></li>' : '<li class="seat"><label style="font-size: 25px;width: 30px;border-radius:0px!important; font-weight: 400; background-color:transparent !important; cursor: no-drop !important; box-shadow:none !important;">25</label></li>';


            if (Row25[1] == 1) {

                html += '<li class="seat"> <input type="checkbox" value="25' + ColumeLable[0] + '" id="25' + ColumeLable[0] + '" /><label for="25' + ColumeLable[0] + '">25' + ColumeLable[0] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }


            if (Row25[2] == 1) {

                html += '<li class="seat"><input type="checkbox" value="25' + ColumeLable[0] + '" id="25' + ColumeLable[1] + '" /><label for="25' + ColumeLable[1] + '">25' + ColumeLable[1] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            if (Row25[3] == 1) {

                html += '<li class="seat"><input type="checkbox" value="25' + ColumeLable[2] + '"  id="25' + ColumeLable[2] + '" /><label for="25' + ColumeLable[2] + '">25' + ColumeLable[2] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            if (Row25[4] == 1) {

                html += '<li class="seat"><input type="checkbox" value="25' + ColumeLable[3] + '" id="25' + ColumeLable[3] + '" /><label for="25' + ColumeLable[3] + '">25' + ColumeLable[3] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            if (Row25[5] == 1) {

                html += '<li class="seat"><input type="checkbox" value="25' + ColumeLable[4] + '" id="25' + ColumeLable[4] + '" /><label for="25' + ColumeLable[4] + '">25' + ColumeLable[4] + '</label></li>';

            } else {

                html += '<li class="seat"></li>';
            }

            html += '</ol>';
            html += '</li>';

        }


        $("#AiraCraftSeats").append(html);


        $.each(Data, function (i, v) {

            $("input[type='checkbox']").filter(function () { return this.value == `${v.seatNum}` }).prop('disabled', true).next().css({ "background-color": "#d2d2d2", "box-shadow": "none", "cursor": "not-allowed" })

        });

        $('#preloader').hide()
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


function GetuserDatabyRsvnId(Id) {


    $('#preloader').show();

    postRequest(ApiUrl + "CheckIn/GetMobileuserDatabyRsvnId/" + Id, null, function (res) {


        if (res.status == 200) {

            if (res.data != null || res.data != "") {

                $('#RSVHDID').val(Id);
                $('#FullName').val(res.data.item1[0].paxName).prop("disable", "disabled").css({ "cursor": "not-allowed" });
                $("#Nationality").val(res.data.item1[0].paxNationality).selectpicker("refresh").prop("disable", "disabled").css({ "cursor": "not-allowed" });
                $('#DOB').val(moment(res.data.item1[0].paxBDay).format('YYYY-MM-DD')).prop("disable", "disabled").css({ "cursor": "not-allowed" });
                $("#Destination").val(res.data.item1[0].paxDestination).selectpicker("refresh").prop("disable", "disabled").css({ "cursor": "not-allowed" });
                $('#RsvnStatus').val(res.data.item1[0].rsvnStatus).prop("disable", "disabled").css({ "cursor": "not-allowed" });
                $("#SeatNumber").val(res.data.item1[0].seatNum);
                $('#preloader').hide();
            }

        }
        if (res.status == 401) {

            localStorage.removeItem("Menu");
            localStorage.removeItem("userData");
            window.location.href = baseWebUrl;


        }
        if (res.status == 403) {


            swal(res.responseMsg, {
                icon: "error",
                title: "Error",
            });
        }
        if (res.status == 420) {

            localStorage.removeItem("Menu");
            localStorage.removeItem("userData");
            window.location.href = baseWebUrl;
        }
        if (res.status == 500) {


            swal({
                title: "Error",
                text: res.responseMsg,
                icon: "error",
                dangerMode: true,
            })
        }
        if (res.status == 600) {

            $('#preloader').hide();
            swal({
                title: "Error",
                text: res.responseMsg,
                icon: "error",
                dangerMode: true,
            })
        }
        $('#preloader').hide();
    });
}



$(document).on('click', '#DisplayBPass', function () {
    debugger
    if (JSON.parse(localStorage.userData).registerType == 'Individual') {
        
        window.location = LiveWebUrl + `/Home/Boardingpass?PNR=${IndvPNR}&RsvnID=${IndvRsvnID}`;
    }
    else {
        if (!$('#Members').val().length) {
            window.location = LiveWebUrl + `/Home/Boardingpass?PNR=${IndvPNR}&RsvnID=${IndvRsvnID}`;
        } else {
        window.location = LiveWebUrl + `/Home/Boardingpass?PNR=${$("#Members option:selected").attr("data-id")}&RsvnID=${$('#Members').val()}`;
        }
        
    }
   
});


$(document).on('click', '#SaveCheckin', function () {
    validateLangauge()
    if ($("#formFlight").valid()) {
        $('#preloader').show();

        let obj = {
            RsvnID: Number($("#RSVHDID").val()),
            SeatNum: $("#SeatNumber").val(),
            CardNum: "",
            BagPcs: 0,
            BagWt: 0,
            PaxWT: 0,
            rsvnStatus: "CKN",
            UpdatedBy: JSON.parse(localStorage.getItem('userData')).id,
            UpdatedActionSource: 'CustomerWeb'
        };


        postRequest(ApiUrl + "CheckIn/ReservedSeatByCustomerInMobile", obj, function (res) {

            debugger
            if (res.status == 200) {
                if (res.data && res.data != null) {
                    swal({
                        title: IfArabic ?"النجاح": "Success",
                        text: IfArabic ?"تم الانتهاء من الحجز الخاص بك بنجاح": res.responseMsg,
                        icon: "success",
                        dangerMode: false,
                        buttons:[null,IfArabic ? "موافق" : "OK"],
                    });
                    GetCheckIn();
                   // GetAroplaneFillData();


                    IndvPNR = res.data.rsvnPNR;
                   
                    $('#preloader').delay(1000).fadeOut('slow', function () {
                        $(this).hide();
                    });
                    if (JSON.parse(localStorage.userData).registerType == 'Individual') {

                        window.location = LiveWebUrl + `/Home/Boardingpass?PNR=${IndvPNR}&RsvnID=${IndvRsvnID}`;
                    }
                    else {
                        if (!$('#Members').val().length) {
                            window.location = LiveWebUrl + `/Home/Boardingpass?PNR=${IndvPNR}&RsvnID=${IndvRsvnID}`;
                        } else {
                            window.location = LiveWebUrl + `/Home/Boardingpass?PNR=${IndvPNR}&RsvnID=${$('#Members').val()}`;
                        }
                        
                    }
                    



                }

            }
            if (res.status == 401) {

                localStorage.removeItem("Menu");
                localStorage.removeItem("userData");
                window.location.href = baseWebUrl;
            }
            if (res.status == 403) {


                swal(res.responseMsg, {
                    icon: "error",
                    title: "Error",
                });
            }
            if (res.status == 500) {

                swal({
                    title: "Error",
                    text: res.responseMsg,
                    icon: "error",
                    dangerMode: true,
                })
            }

            if (res.status == 420) {

                localStorage.removeItem("Menu");
                localStorage.removeItem("userData");
                window.location.href = baseWebUrl;
            }

            if (res.status == 600) {
                $('#preloader').hide();
                if (res.responseMsg.includes('Accompanying adult seat number')) {
                    swal({
                        content: form,
                        title: IfArabic ? "معلومات" : "Info",
                        text: IfArabic ? "يرجى تخصيص مقعد للشخص المرافق البالغ أولاً" : "Please assign a seat for the accompanying adult first.",
                        icon: "info",
                        buttons: [null, IfArabic ? "موافق" : "OK"],
                        dangerMode: false,
                    })
                }
                else {
                    var form = document.createElement("div");
                    form.innerHTML = `<button id="DisplayBPass"class='btn btn-info btn-sm'>View Boarding Pass</button>`;
                    swal({
                        content: form,
                        title: IfArabic ? "معلومات" : "Info",
                        text: IfArabic ? 'رقم مقعدك هو' + '' + res.responseMsg + '' + 'محجوز بالفعل' : 'Your seat number is' + '  ' + res.responseMsg + '  ' + 'already reserved',
                        icon: "info",
                        buttons: [null, IfArabic ? "موافق" : "OK"],
                        dangerMode: true,
                    })
                }

            }

        });
    }


})


function validateLangauge() {

    $("#formFlight").validate({

        rules: {
            Members: {
                required: true,
            },
            FullName: {
                required: true,
            },
            Nationality: {
                required: true,
            },
            DOB: {
                required: true,
            },
            Destination: {
                required: true,
            },
            seatNumber: {
                required: true,
            },
            RsvnStatus: {
                required: true,
            }


        },
        messages: {
            Members: {
                required:IfArabic ? "هذه الخانة مطلوبه." : "This field is required.", 
            },
            FullName: {
                required: IfArabic ? "هذه الخانة مطلوبه." : "This field is required.",
            },
            Nationality: {
                required:IfArabic ? "هذه الخانة مطلوبه." : "This field is required.", 
            },
            DOB: {
                required:IfArabic ? "هذه الخانة مطلوبه." : "This field is required.", 
            },
            Destination: {
                required:IfArabic ? "هذه الخانة مطلوبه." : "This field is required.", 
            },
            seatNumber: {
                required:IfArabic ? "هذه الخانة مطلوبه." : "This field is required.", 
            },
            RsvnStatus: {
                required:IfArabic ? "هذه الخانة مطلوبه." : "This field is required.", 
            }
           
        },
        highlight: function (element) {
            $(element).parent().addClass('has-error');
        },
        unhighlight: function (element) {
            $(element).parent().removeClass('has-error');
        },
        errorElement: 'span',
        errorClass: 'validation-error-message bold mt-2',
        errorPlacement: function (error, element) {
            error.appendTo(element.parent());
        },


    });

}

