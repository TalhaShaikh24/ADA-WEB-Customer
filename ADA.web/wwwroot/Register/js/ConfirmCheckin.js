var ApiUrl = '';
var LiveWebUrl = $("#LiveWebUrl").val();
var IfArabic = window.localStorage.language == 'ar';
var UserId = JSON.parse(window.localStorage.getItem('userData')).id
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
    GetCheckinCardDetails()
})


function replaceMultipleDate(textDate, ArToEngChar) {
    for (const [i, each] of ArToEngChar.entries()) {
        const previousChar = Object.keys(each);
        const newChar = Object.values(each);

        textDate = textDate.replaceAll(previousChar, newChar);
    }

    return textDate;
}

function replaceMultipleTime(textTime, ArToEngChar) {
    for (const [j, each] of ArToEngChar.entries()) {
        const previousChar = Object.keys(each);
        const newChar = Object.values(each);

        textTime = textTime.replaceAll(previousChar, newChar);
    }

    return textTime;
}

function GetCheckinCardDetails() {
    debugger

    postRequest(ApiUrl + "CheckIn/GetCheckinCardDetails/" + UserId, null, function (res) {

        $('#preloader').show();
        if (res.status == 200) {

            if (res.data.length == 0 || res.data.length == null) {
                debugger;
                swal({
                    title: IfArabic ?"معلومة":"Information",
                    text: IfArabic ? "يسمح بتسجيل الوصول قبل ساعتين على الأقل من المغادرة أو ان الرحلة غير متوفرة" : "Check-in is allowed at least 2 hours before departure or there are no active flights to check-in.",
                    icon: "info",
                    buttons: [null, IfArabic ?"موافق":"OK"],
                }).then(function () {
                    history.back()
                });
                
            }
            else {
                $("#CancelbookingRowAppend").html('');
               
                $.each(res.data, function (i, v) {

                    var BoardingPassURL = LiveWebUrl + `/Home/Boardingpass?PNR=${v.bookingPNR}&RsvnID=${v.rsvnID}`;
                    if (IfArabic) {

                        const textDate = moment(v.fltDateTime).format('DD-MMM-YY');
                        const resultDate = replaceMultipleDate(textDate, ArToEngChar);
                        const textTime = moment(v.fltDateTime).format('HH:mm');
                        const resultTime = replaceMultipleTime(textTime, ArToEngChar);
                        $("#ResultData").text(`عرض ${res.data.length} النتائج`)

                        if (v.rsvnStatus == "B" || v.rsvnStatus == "W") {
                            $("#ConfirmCheckin").append(`
                            <div class="col-md-6">

                                <div class="card mb-3" style="width:100%; border-radius: 20px; box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;">
                                    <div class="card-body p-4 mx-3">
                                        <div class=" row" style="display: flex; justify-content: space-between;">
                                            <p style="color: #b68150;">راكب: &nbsp;<b style="color: #67686b;">${v.name}</b></p>
                                        </div>
                                        <div class=" row" style="display: flex; justify-content: space-between;">
                                            

                                            <P style="color: #b68150;">تاريخ المغادرة:&nbsp;<b style="color: #67686b;">${resultDate}</b></P>
                                            <P style="color: #b68150;">Etd:&nbsp;<b style="color: #67686b;">${resultTime}</b></P>

                                        </div>

                                        <div class=" row" style="display: flex; justify-content: space-between;">

                                            <P style="color: #b68150;">رقم الرحلة الجوية:&nbsp;<b style="color: #67686b;">${v.fltNumber.toLocaleUpperCase()}</b></P>
                                            <P style="color: #b68150;">PNR:&nbsp;<b style="color: #67686b;">${v.bookingPNR.toLocaleUpperCase()}</b></P>

                                        </div>



                                        <div class=" row" style="display: flex; justify-content: space-between;">
                                            <div class="col-md-5 col-sm-12 px-0 destColumn">
                                                <p class="destFont" style="color: #b68150;font-size:14px">${IfArabic ? v.fromDestinationArabic:v.fromDestination.toLocaleUpperCase()} &nbsp;</p >
                                            </div>
                                            <div class="col-md-2 col-sm-12 destColumn">
                                                <i class="fa fa-plane fa-flip-horizontal destIcon" aria-hidden="true" style="font-size: 24px;color: #372e2c;margin-bottom: 20px"></i>&nbsp;
                                            </div>
                                            <div class="col-md-5 col-sm-12 px-0 destColumn">
                                              <p class="destFont " style="color: #67686b;font-size:14px">${IfArabic? v.toDestinationArabic:v.toDestination.toLocaleUpperCase()}</p>
                                            </div>
                                        </div>
                                        <div style="display:flex;justify-content:space-between;align-items: baseline;" class=" row action Checkin ">
                                            <p >هل تريد أن تحقق في هذه الرحلة؟</p>
                                            <button key="onclick" class="btn-first btn-submit " id="CheckinBooking" onclick="GotoCheckin(${v.rsvnID})" type="button" style=" border-radius: 25px;">اتمام إجراءات السفر إلكترونيا</button>
                                        </div>

                                    </div>

                                </div>

                                <!-- End -->
                            </div>`);
                        }
                        else {
                            $("#ConfirmCheckin").append(`

        

                            <div class="col-md-6">

                                <div class="card mb-3" style="width:100%; border-radius: 20px; box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;">
                                    <div class="card-body p-4 mx-3">
                                        <div class=" row" style="display: flex; justify-content: space-between;">
                                            <p style="color: #b68150;">راكب: &nbsp;<b style="color: #67686b;">${v.name}</b></p>
                                        </div>
                                        <div class=" row" style="display: flex; justify-content: space-between;">
                                            

                                            <P style="color: #b68150;">تاريخ الرحلة:&nbsp;<b style="color: #67686b;">${resultDate}</b></P>
                                            <P style="color: #b68150;">رحلة Etd:&nbsp;<b style="color: #67686b;">${resultTime}</b></P>

                                        </div>

                                        <div class=" row" style="display: flex; justify-content: space-between;">

                                            <P style="color: #b68150;">رقم الرحلة الجوية:&nbsp;<b style="color: #67686b;">${v.fltNumber.toLocaleUpperCase()}</b></P>
                                            <P style="color: #b68150;">PNR:&nbsp;<b style="color: #67686b;">${v.bookingPNR.toLocaleUpperCase()}</b></P>

                                        </div>



                                        <div class=" row" style="display: flex; justify-content: space-between;">
                                            <div class="col-md-5 col-sm-12 px-0 destColumn">
                                                <p class="destFont" style="color: #b68150;font-size:14px">${IfArabic ? v.fromDestinationArabic:v.fromDestination.toLocaleUpperCase()} &nbsp;</p>
                                            </div>
                                            <div class="col-md-2 col-sm-12 destColumn">
                                                <i class="fa fa-plane fa-flip-horizontal destIcon" aria-hidden="true" style="font-size: 24px;color: #372e2c;margin-bottom: 20px"></i>&nbsp;
                                            </div>
                                            <div class="col-md-5 col-sm-12 px-0 destColumn">
                                              <p class="destFont " style="color: #67686b;font-size:14px">${IfArabic ? v.toDestinationArabic :v.toDestination.toLocaleUpperCase()}</p>
                                            </div>
                                        </div>
                                        <div class=" row" style="display: flex; justify-content: space-between;">
                                            <div class="col-md-12">
                                                <button class="col-md-12 btn-first btn-submit"  id="viewBoardingPasss" onclick="window.location.href='`+ BoardingPassURL +`'" type="button" style=" border-radius: 25px;">View Boardind Pass</button>
                                            </div>
                                         </div>
                                       
                                    </div>

                                </div>

                                <!-- End -->
                            </div>`);
                        }


                       
                    }

                    else {
                        $("#ResultData").text(`Showing ${res.data.length} Results`)
                        var depaturDate = moment(v.fltDateTime).locale('en').format('DD-MMM-YYYY')
                        var depaturTime = moment(v.fltDateTime).locale('en').format('HH:mm')
                        if (v.rsvnStatus == "B" || v.rsvnStatus == "W") {

                            $("#ResultData").text(`Showing ${res.data.length} Results`)
                            $("#ConfirmCheckin").append(`

        

                        <div class="col-md-6">

                            <div class="card mb-3" style="width:100%; border-radius: 20px; box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;">
                                <div class="card-body p-4 mx-3">

                                    <div class=" row" style="display: flex; justify-content: space-between;">
                                        <p style="color: #b68150;">Passenger:&nbsp;<b style="color: #67686b;">${v.name}</b></p>
                                    </div>
                                    <div class=" row" style="display: flex; justify-content: space-between;">
                                        

                                        <P style="color: #b68150;">Departure Date:&nbsp;<b style="color: #67686b;">${depaturDate}</b></P>
                                        <P style="color: #b68150;">ETD:&nbsp;<b style="color: #67686b;">${depaturTime}</b></P>

                                    </div>

                                    <div class=" row" style="display: flex; justify-content: space-between;">
                                        
                                        <P style="color: #b68150;">Flight Number:&nbsp;<b style="color: #67686b;">${v.fltNumber.toLocaleUpperCase()}</b></P>
                                        <P style="color: #b68150;">Booking PNR:&nbsp;<b style="color: #67686b;">${v.bookingPNR.toLocaleUpperCase()}</b></P>

                                    </div>



                                    <div class=" row" style="display: flex; justify-content: space-between;">
                                        <div class="col-md-5 col-sm-12 px-0 destColumn">
                                            <p class="destFont" style="color: #b68150;font-size:14px">${v.fromDestination.toLocaleUpperCase()} &nbsp;</p>
                                        </div>
                                        <div class="col-md-2 col-sm-12 destColumn">
                                            <i class="fa fa-plane destIcon" aria-hidden="true" style="font-size: 24px;color: #372e2c;margin-bottom: 20px"></i>&nbsp;
                                        </div>
                                        <div class="col-md-5 col-sm-12 px-0 destColumn">
                                          <p class="destFont " style="color: #67686b;font-size:14px">${v.toDestination.toLocaleUpperCase()}</p> 
                                        </div>
                                    </div>
                                    <div id="checkInRow${i}" style="display:flex;justify-content:space-between;align-items: baseline;" class=" row action Checkin ">
                                        <p >Do You Want to check in this flight?</p>
                                        <button key="onclick" class="btn-first btn-submit " id="CheckinBooking" onclick="GotoCheckin(${v.rsvnID})" type="button" style=" border-radius: 25px;">Check in</button>
                                    </div>

                                </div>

                            </div>

                            <!-- End -->
                        </div>`);

                        }
                        else {
                            $("#ConfirmCheckin").append(`

        

                        <div class="col-md-6">

                            <div class="card mb-3" style="width:100%; border-radius: 20px; box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;">
                                <div class="card-body p-4 mx-3">
                                    <div class=" row" style="display: flex; justify-content: space-between;">
                                        <p style="color: #b68150;">Passenger:&nbsp;<b style="color: #67686b;">${v.name}</b></p>
                                    </div>
                                    <div class=" row" style="display: flex; justify-content: space-between;">
                                        

                                        <P style="color: #b68150;">Departure Date:&nbsp;<b style="color: #67686b;">${depaturDate}</b></P>
                                        <P style="color: #b68150;">Flight ETD:&nbsp;<b style="color: #67686b;">${depaturTime}</b></P>

                                    </div>

                                    <div class=" row" style="display: flex; justify-content: space-between;">

                                        <P style="color: #b68150;">Flight Number:&nbsp;<b style="color: #67686b;">${v.fltNumber.toLocaleUpperCase()}</b></P>
                                        <P style="color: #b68150;">Booking PNR:&nbsp;<b style="color: #67686b;">${v.bookingPNR.toLocaleUpperCase()}</b></P>
                                    </div>

                                    <div class=" row" style="display: flex; justify-content: space-between;">
                                        <div class="col-md-5 col-sm-12 px-0 destColumn">
                                            <p class="destFont" style="color: #b68150;font-size:14px">${v.fromDestination.toLocaleUpperCase()} &nbsp;</p>
                                        </div>
                                        <div class="col-md-2 col-sm-12 destColumn">
                                            <i class="fa fa-plane destIcon" aria-hidden="true" style="font-size: 24px;color: #372e2c;margin-bottom: 20px"></i>&nbsp;
                                        </div>
                                        <div class="col-md-5 col-sm-12 px-0 destColumn">
                                          <p class="destFont " style="color: #67686b;font-size:14px">${v.toDestination.toLocaleUpperCase()}</p>
                                        </div>
                                    </div>
                                    <div class=" row" style="display: flex; justify-content: space-between;">
                                        <div class="col-md-12">
                                            <button class="col-md-12 btn-first btn-submit " id="viewBoardingPasss" onclick="window.location.href='`+ BoardingPassURL +`'" type="button" style=" border-radius: 25px;">View Boardind Pass</button>
                                        </div>
                                     </div>
                                        
                                    </div>

                            <!-- End -->
                        </div>`);
                        }


                        
                       
                    }

                   

                });
                $('#preloader').hide();


                if (res.data && res.data != null) {
                    swal(res.responseMsg, {
                        title: "Succes",
                        text: IfArabic ? "نجاح" : res.responseMsg,
                        icon : "Succes",
                        buttons: [null, IfArabic ? "موافق" : "OK"],
                    });


                }

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
                dangerMode: false,
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
                title: IfArabic? "معلومة": "Information",
                text: IfArabic ? "حالة الحجز الخاصة بك معلقة ، يرجى الانتظار للتأكيد." : res.responseMsg,
                icon: "info",
                dangerMode: false,
                buttons: [null, IfArabic ? "موافق" : "OK"],
            }).then(function () {
                history.back()
            });
        }

    });

}


function GotoCheckin(RsvnID) {
    debugger
    window.location = $("#LiveWebUrl").val() + `/Home/Checkin?rsvnId=${RsvnID}`;

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
                text: IfArabic ? "هناك خطأ ما!" : "Something went wrong",
                icon: "error",
                dangerMode: true,
                buttons: [null, IfArabic ? "موافق" : "OK"],
            })
        }
    });
}