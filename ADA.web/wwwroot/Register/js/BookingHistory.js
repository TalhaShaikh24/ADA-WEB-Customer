var ApiUrl = $("#baseApiUrl").val();
var LiveWebUrl = $("#LiveWebUrl").val();
var IfArabic = window.localStorage.language == 'ar';
var UserId = JSON.parse(window.localStorage.getItem('userData')).id
var ResponseLength;
var ResponseLengthCancelled;
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
     
    if (localStorage.getItem("userData") === null) {
        window.location.href = LiveWebUrl + "/Register/Register";
    }
    GetOpenStatusFlights()
    GetCancelBookingDetailsByUserId(UserId)

});



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


function GetOpenStatusFlights() {
    debugger
    //postRequest(ApiUrl+"Reservation/GetCancelBookingDetailsByUserId/" + UserId, null, function (res) {
    postRequest(ApiUrl + "Reservation/GetMyBookingDetailsByID/" + UserId, null, function (res) {
        ResponseLength = res.data.length;
        debugger
        
        
            if (res.status == 200) {
                debugger
                if (ResponseLength < 1) {
                    debugger
                    if (IfArabic) {
                        $("#myBookingCount").text(`ألحجوزات (${ResponseLength}) `)
                        $("#bookingRowAppend").html(`
                          <div class="col-md-12">
                               <div id="notfound">
                                   <div class="notfound">
                                       <div class="notfound-404"></div>
                                       <h1 style="color: #d51c29">404</h1>
                                       <h2>نأسف لا يوجد رحلة أو رحلات..</h2>
                                       <p>معذرة ليس لدينا اي خط سير رحلة الأن</p>
                                       <a href="`+ $('#LiveWebUrl').val() + '#clickme' +`" style="color: #d51c29!important">إحجز رحلة طيران</a>
                                   </div>
                               </div>
                          </div>
                    `);
                    }
                    else {
                        $("#myBookingCount").text(`My Bookings (${ResponseLength}) `)
                        $("#bookingRowAppend").html(`
                          <div class="col-md-12">
                               <div id="notfound">
                                   <div class="notfound">
                                       <div class="notfound-404"></div>
                                       <h1 style="color: #d51c29">404</h1>
                                       <h2>Sorry, no flight(s) found.</h2>
                                       <p>Sorry, you don't have any flight itinerary right now. </p>
                                       <a href="`+ $('#LiveWebUrl').val() +'#clickme'+`" style="color: #d51c29!important">Book a Flight</a>
                                   </div>
                               </div>
                          </div>
                    `);
                    }

                }

                else {
                    $("#bookingRowAppend").html('');

                    $.each(res.data, function (i, v) {
                        debugger
                        if (IfArabic) {
                            //var status = v.rsvnStatus == "O" ? "فتح" : v.rsvnStatus == "CKN" ? "'اتمام إجراءات السفر إلكترونيا'" : v.rsvnStatus == "I" ? "'اتمام إجراءات السفر إلكترونيا'" : v.rsvnStatus == "B" ? "يتأكد" : "انتظار";
							var status = v.rsvnStatus == "O" ? "فتح" 
										: v.rsvnStatus == "CKN" ? "'اتمام إجراءات السفر إلكترونيا'" 
										: v.rsvnStatus == "I" ? "'اتمام إجراءات السفر إلكترونيا'" 
										: v.rsvnStatus == "B" ? "يتأكد" 
										: v.rsvnStatus == "C" ? "'اتمام إجراءات السفر إلكترونيا'" 
										: v.rsvnStatus == "D" ? "'تجاهل'" 
                                        : "انتظار";

                            
                            const textDate = moment(v.fltDateTime).format('DD-MMM-YY');
                            const resultDate = replaceMultipleDate(textDate, ArToEngChar);
                            const textTime = moment(v.fltDateTime).format('HH:mm');
                            const resultTime = replaceMultipleTime(textTime, ArToEngChar);
										
                            $("#myBookingCount").text(`ألحجوزات (${ResponseLength}) `)
                            $("#bookingRowAppend").append(`

        

                            <div class="col-md-6">

                                <div class="card mb-3" style="width:100%; border-radius: 20px; box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;">
                                    <div class="card-body p-4 mx-3">
                                         <div class="row" style="display: flex;justify-content: space-between;">
                                                    <p style="color: #b68150;">راكب:&nbsp;<b style="color: #67686b;">${v.name}</b></p>
                                                    <P style="color: #b68150;">حالة الرحلة:&nbsp;<b style="color: #67686b;">${status}</b></P>
                                           </div>
                                        
                                        <div class="row" style="display: flex; justify-content: space-between;">
                                           
                                            <P style="color: #b68150;">تاريخ المغادرة:&nbsp;<b style="color: #67686b;">${resultDate}</b></P>
                                            <P style="color: #b68150;">ETD: &nbsp;<b style="color: #67686b;">${resultTime}</b></P>

                                        </div>

                                        <div class="row" style="display: flex; justify-content: space-between;">

                                            <P style="color: #b68150;">رقم الرحلة الجوية:&nbsp;<b style="color: #67686b;">${v.fltNumber.toLocaleUpperCase()}</b></P>
                                            <P style="color: #b68150;"> PNR حجز رقم : &nbsp;<b style="color: #67686b;">${v.bookingPNR.toLocaleUpperCase()}</b></P>

                                        </div>



                                        <div class="row" style="display: flex; justify-content: space-between;">
                                            <div class="col-md-5 col-sm-12 px-0 destColumn">
                                                <p class="destFont" style="color: #b68150;">${v.baseArabic.toLocaleUpperCase()} &nbsp;</p>
                                            </div>
                                            <div class="col-md-2 col-sm-12 destColumn d-flex">
                                                <i class="fa fa-plane fa-flip-horizontal destIcon" aria-hidden="true" style="font-size: 24px;color: #372e2c;margin-bottom: 20px"></i>&nbsp;
                                            </div>
                                            <div class="col-md-5 col-sm-12 px-0 destColumn">
                                              <p class="destFont " style="color: #67686b;">${v.bookingDestinationAR.toLocaleUpperCase()}</p>
                                            </div>
                                            
                                        </div>
                                        <div id="cancleRow${i}" style="display:none;justify-content:space-between;align-items: baseline;" class="row action FlightResultLang">
                                            <p >هل تريد إلغاء هذه الرحلة؟</p>
                                            <button key="Cancle" class="btn-first btn-submit " id="CancleBooking" onclick="CancleFlight(${v.rsvnID})" type="button" style=" border-radius: 25px;">إلغاء</button>
                                        </div>
                                    </div>

                                </div>

                                <!-- End -->
                            </div>`);
                            if (v.rsvnStatus == "W" || v.rsvnStatus == "B") {
                                $("#bookingRowAppend").find(`#cancleRow${i}`).show()

                            }

                        }

                        else {
                            //var status = v.rsvnStatus == "O" ? "Open" : v.rsvnStatus == "CKN" ? "Check in" : v.rsvnStatus == "I" ? "Check in" : v.rsvnStatus == "B" ? "Confirm" : "Waiting";
							var status = v.rsvnStatus == "O" ? "Open" 
											: v.rsvnStatus == "CKN" ? "Check in" 
											: v.rsvnStatus == "I" ? "Check in" 
											: v.rsvnStatus == "B" ? "Confirm" 
											: v.rsvnStatus == "C" ? "Check in" 
											: v.rsvnStatus == "D" ? "Discard" 
											: v.rsvnStatus == "N" ? "Not Show"
											: "Waiting";
                            var depaturDate = moment(v.fltDateTime).locale('en').format('DD-MMM-YYYY')
                            var depaturTime = moment(v.fltDateTime).locale('en').format('HH:mm')

                            $("#myBookingCount").text(`My Bookings (${ResponseLength}) `)



                            $("#bookingRowAppend").append(`

        

                                <div class="col-md-6">
                                
                                    <div class="card mb-3" style="width:100%; border-radius: 20px; box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;">
                                        <div class="card-body p-4 mx-3">
                                            <div class="row" style="display: flex;justify-content: space-between;">
                                                <p style="color: #b68150;">Passenger:&nbsp;<b style="color: #67686b;">${v.name}</b></p>
                                                <P style="color: #b68150;">Booking Status:&nbsp;<b style="color: #67686b;">${status}</b></P>
                                            </div>
                                            <div class="row" style="display: flex; justify-content: space-between;">
                                                
                                
                                
                                                <P style="color: #b68150;">Departure Date:&nbsp;<b style="color: #67686b;">${depaturDate}</b></P>
                                                <P style="color: #b68150;">ETD:&nbsp;<b style="color: #67686b;">${depaturTime}</b></P>
                                
                                            </div>
                                          
                                            <div class="row" style="display: flex; justify-content: space-between;">
                                
                                                <P style="color: #b68150;">Flight Number:&nbsp;<b style="color: #67686b;">${v.fltNumber.toLocaleUpperCase()}</b></P>
                                                <P style="color: #b68150;">Booking PNR:&nbsp;<b style="color: #67686b;">${v.bookingPNR.toLocaleUpperCase()}</b></P>
                                
                                            </div>
                                
                                
                                
                                            <div class="row" style="display: flex; justify-content: space-between;">
                                                <div class="col-md-5 col-sm-12 px-0 destColumn">
                                                    <p class="destFont" style="color: #b68150;">${v.base.toLocaleUpperCase()} &nbsp;</p>
                                                </div>
                                                <div class="col-md-2 col-sm-12 destColumn d-flex">
                                                    <i class="fa fa-plane destIcon" aria-hidden="true" style="font-size: 24px;color: #372e2c;margin-bottom: 20px"></i>&nbsp;
                                                </div>
                                                <div class="col-md-5 col-sm-12 px-0 destColumn">
                                                  <p class="destFont " style="color: #67686b;">${v.bookingDestination.toLocaleUpperCase()}</p>
                                                </div>
                                            </div>
                                            <div id="cancleRow${i}" style="display:none;justify-content:space-between;align-items: baseline;" class="row action FlightResultLang">
                                                <p >Do You Want to cancel this flight?</p>
                                                <button key="Cancle" class="btn-first btn-submit " id="CancleBooking" onclick="CancleFlight(${v.rsvnID})" type="button" style=" border-radius: 25px; ">Cancel</button>
                                            </div>
                                
                                        </div>
                                
                                    </div>
                                
                                    <!-- End -->
                            </div>`


                            );
                            if (v.rsvnStatus == "W" || v.rsvnStatus == "B") {
                                $("#bookingRowAppend").find(`#cancleRow${i}`).show()

                            }
                        }


                    });
                }
                $('#preloader').hide();

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

function GetCancelBookingDetailsByUserId(UserId) {
    debugger
    //postRequest(ApiUrl+"Reservation/GetCancelBookingDetailsByUserId/" + UserId, null, function (res) {
    postRequest(ApiUrl + "Reservation/GetCancelBookingDetailsByUserId/" + UserId, null, function (res) {
        ResponseLengthCancelled = res.data.length;
        debugger
        
        
            if (res.status == 200) {

                if (ResponseLengthCancelled < 1) {
                    if (IfArabic) {
                        $("#cancelledbookingCount").text(`إلغاء الحجوزات (${ResponseLengthCancelled}) `)
                        $("#CancelbookingRowAppend").html(`
                          <div class="col-md-12">
                               <div id="notfound">
                                   <div class="notfound">
                                       <div class="notfound-404"></div>
                                       <h1 style="color: #d51c29">404</h1>
                                       <h2>أُووبس! لا ، تم العثور على أي رحلة</h2>
                                       <p>ليس لديك أي رحلة ملغاة في الوقت الحالي. إذا كنت ترغب في إلغاء الرحلة ، انقر فوق الزر "إلغاء".</p>
                                       <a href="`+ $('#LiveWebUrl').val() + '#clickme' +`" style="color: #d51c29!important">إحجز رحلة طيران</a>
                                   </div>
                               </div>
                          </div>
                    `);
                    }
                    else {
                        $("#cancelledbookingCount").text(`Cancelled Bookings (${ResponseLengthCancelled}) `)
                        $("#CancelbookingRowAppend").html(`
                          <div class="col-md-12">
                               <div id="notfound">
                                   <div class="notfound">
                                       <div class="notfound-404"></div>
                                       <h1 style="color: #d51c29">404</h1>
                                       <h2>Sorry, no flight(s) found.</h2>
                                       <p>You don't have any canceled Flight right now. If you want to cancel the flight click on the "CANCEL" button.</p>
                                       <a href="`+ $('#LiveWebUrl').val() + '#clickme' +`" style="color: #d51c29!important">Back a Flight</a>
                                   </div>
                               </div>
                          </div>
                    `);
                    }

                }
                else {
                    $("#CancelbookingRowAppend").html('');

                    $.each(res.data, function (i, v) {
                        debugger
                        if (IfArabic) {

                            const textDate = moment(v.fltDateTime).format('DD-MMM-YY');
                            const resultDate = replaceMultipleDate(textDate, ArToEngChar);
                            const textTime = moment(v.fltDateTime).format('HH:mm');
                            const resultTime = replaceMultipleTime(textTime, ArToEngChar);

                            $("#cancelledbookingCount").text(`إلغاء الحجوزات (${ResponseLengthCancelled}) `)
                            $("#CancelbookingRowAppend").append(`

        

                        <div class="col-md-6">
                        
                            <div class="card mb-3" style="width:100%; border-radius: 20px; box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;">
                                <div class="card-body p-4 mx-3">
                                    <div class="row" style="display: flex;justify-content: space-between;">
                                        <p style="color: #b68150;">راكب:&nbsp;<b style="color: #67686b;">${v.name}</b></p>
                                        <p style="color: #b68150;">حالة الرحلة:&nbsp;<b style="color: #67686b;">ألغيت</b></p>
                                    </div>
                                    <div class="row" style="display: flex; justify-content: space-between;">
                                       <P style="color: #b68150;">تاريخ المغادرة:&nbsp;<b style="color: #67686b;">${resultDate}</b></P>
                                       <P style="color: #b68150;">ETD:&nbsp;<b style="color: #67686b;">${resultTime}</b></P>
                        
                                    </div>
                        
                                    <div class="row" style="display: flex; justify-content: space-between;">
                        
                                        <P style="color: #b68150;">رقم الرحلة الجوية:&nbsp;<b style="color: #67686b;">${v.fltNumber.toLocaleUpperCase()}</b></P>
                                        <P style="color: #b68150;"> PNR حجز رقم : &nbsp;<b style="color: #67686b;">${v.bookingPNR.toLocaleUpperCase()}</b></P>
                                    </div>
                        
                        
                        
                                    <div class="row" style="display: flex; justify-content: space-between;">
                                        <div class="col-md-5 col-sm-12 px-0 destColumn">
                                            <p class="destFont" style="color: #b68150;">${v.baseArabic.toLocaleUpperCase()} &nbsp;</p>
                                        </div>
                                        <div class="col-md-2 col-sm-12 destColumn d-flex">
                                            <i class="fa fa-plane fa-flip-horizontal destIcon" aria-hidden="true" style="font-size: 24px;color: #372e2c;margin-bottom: 20px"></i>&nbsp;
                                        </div>
                                        <div class="col-md-5 col-sm-12 px-0 destColumn">
                                          <p class="destFont " style="color: #67686b;">${v.bookingDestinationAR.toLocaleUpperCase()}</p>
                                        </div>
                                    </div>
                                    <div style="display:flex;justify-content:space-between;align-items: baseline;" class="row action FlightResultLang">
                                      <p >هل تريد إعادة حجز هذه الرحلة؟</p>
                                      <button key="ReBook" class="btn-first btn-submit " id="ReBooking" onclick="RebookFlight(${v.rsvnID})" type="button" style=" border-radius: 25px;">ريبوك</button>
                                    </div>
                                </div>
                             </div>

                        <!-- End -->
                    </div>`);
                            /*Fonts*/
                            //debugger
                            //IfArabic ?
                            //    [

                            //        $('label').removeClass('fs-14 text-custom-black fw-500'),
                            //        $('input').removeClass('fs-14 text-custom-black fw-500'),
                            //        $('label').addClass('labelArabic'),
                            //        $('input').addClass('inputArabic'),
                            //        $('h3, h1,h2,h3,h4,h5,h6, p').addClass('headingArabic'),
                            //        $('b').addClass('boldEnglish'),
                            //        $('a,button').addClass('a_buttonArabic')



                            //    ]


                            //    :
                            //    [
                            //        $('input').addClass('inputEnglish'),

                            //    ]


                            /*EndFonts*/
                        }
                        else {
                            var depaturDate = moment(v.fltDateTime).locale('en').format('DD-MMM-YYYY')
                            var depaturTime = moment(v.fltDateTime).locale('en').format('HH:mm')
                            debugger


                            $("#cancelledbookingCount").text(`Cancelled Bookings (${ResponseLengthCancelled}) `)

                            $("#CancelbookingRowAppend").append(`

        

                 <div class="col-md-6">

                     <div class="card mb-3" style="width:100%; border-radius: 20px; box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;">
                         <div class="card-body p-4 mx-3">
                            <div class="row" style="display: flex; justify-content: space-between;">
                            <p style="color: #b68150;">Passenger:&nbsp;<b style="color: #67686b;">${v.name}</b></p>
                            <p style="color: #b68150;">Booking Status:&nbsp;<b style="color: #67686b;">Canceled</b></p>

                        </div>
                             <div class="row" style="display: flex; justify-content: space-between;">
                                 <P style="color: #b68150;">Departure Date:&nbsp;<b style="color: #67686b;">${depaturDate}</b></P>
                                 <P style="color: #b68150;">ETD:&nbsp;<b style="color: #67686b;">${depaturTime}</b></P>

                             </div>

                             <div class="row" style="display: flex; justify-content: space-between;">

                                 <P style="color: #b68150;">Flight Number:&nbsp;<b style="color: #67686b;">${v.fltNumber.toLocaleUpperCase()}</b></P>
                                 <P style="color: #b68150;">Booking PNR:&nbsp;<b style="color: #67686b;">${v.bookingPNR.toLocaleUpperCase()}</b></P>

                             </div>



                             <div class="row" style="display: flex; justify-content: space-between;">
                                 <div class="col-md-5 col-sm-12 px-0 destColumn">
                                     <p class="destFont" style="color: #b68150;">${v.base.toLocaleUpperCase()} &nbsp;</p>
                                 </div>
                                 <div class="col-md-2 col-sm-12 destColumn d-flex">
                                     <i class="fa fa-plane destIcon" aria-hidden="true" style="font-size: 24px;color: #372e2c;margin-bottom: 20px"></i>&nbsp;
                                 </div>
                                 <div class="col-md-5 col-sm-12 px-0 destColumn">
                                   <p class="destFont " style="color: #67686b;">${v.bookingDestination.toLocaleUpperCase()}</p>
                                 </div>
                              
                             </div>
                             <div style="display:flex;justify-content:space-between;align-items: baseline;" class="row action FlightResultLang">
                                <p >Are You Want to Rebook this flight?</p>
                                <button key="ReBook" class="btn-first btn-submit " id="ReBooking" onclick="RebookFlight(${v.rsvnID})" type="button" style=" border-radius: 25px;">Rebook</button>
                             </div>

                         </div>

                     </div>

                     <!-- End -->
                 </div>`);
                        }


                    });
                    $('#preloader').hide();


                    if (res.data && res.data != null) {
                        swal(res.responseMsg, {
                            title: "Succes",
                            text: "Succes",
                            icon: "Succes",
                            buttons: [null, IfArabic ? "موافق" : "OK"],

                        });


                    }
                }
                $('#preloader').hide();

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

function GetBookingHistoryByUserId(UserId) {
    debugger
    //postRequest(ApiUrl+"Reservation/GetCancelBookingDetailsByUserId/" + UserId, null, function (res) {
    postRequest(ApiUrl + "Reservation/GetBookingHistoryByUserId/" + UserId, null, function (res) {

        $('#preloader').show();
        if (res.status == 200) {

            $("#CancelbookingRowAppend").html('');

            $.each(res.data, function (i, v) {
                debugger
                if (IfArabic) {

                    const textDate = moment(v.fltDateTime).format('DD-MMM-YY');
                    const resultDate = replaceMultipleDate(textDate, ArToEngChar);
                    const textTime = moment(v.fltDateTime).format('HH:mm');
                    const resultTime = replaceMultipleTime(textTime, ArToEngChar);

                    $("#CancelbookingRowAppend").append(`

        

                        <div class="col-md-6">
                        
                            <div class="card mb-3" style="width:100%; border-radius: 20px; box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;">
                                <div class="card-body p-4 mx-3">
                        <div class="row" style="display: flex;justify-content: center;">
                            <p style="color: #b68150;">حالة الرحلة:&nbsp;<b style="color: #67686b;">ألغيت</b></p>
                        </div>
                                    <div class="row" style="display: flex; justify-content: space-between;">
                                       <P style="color: #b68150;">تاريخ الحجز:&nbsp;<b style="color: #67686b;">${resultDate}</b></P>
                                       <P style="color: #b68150;">ETD:&nbsp;<b style="color: #67686b;">${resultTime}</b></P>
                        
                                    </div>
                        
                                    <div class="row" style="display: flex; justify-content: space-between;">
                        
                                        <P style="color: #b68150;">رقم الرحلة الجوية:&nbsp;<b style="color: #67686b;">${v.fltNumber.toLocaleUpperCase()}</b></P>
                                        <P style="color: #b68150;"> PNR حجز رقم : &nbsp;<b style="color: #67686b;">${v.bookingPNR.toLocaleUpperCase()}</b></P>
                                    </div>
                        
                        
                        
                                    <div class="row" style="display: flex; justify-content: space-between;">
                                        <div class="col-md-5 col-sm-12 px-0 destColumn">
                                            <p class="destFont" style="color: #b68150">${v.baseArabic.toLocaleUpperCase()} &nbsp;</p>
                                        </div>
                                        <div class="col-md-2 col-sm-12 destColumn d-flex">
                                            <i class="fa fa-plane fa-flip-horizontal destIcon" aria-hidden="true" style="font-size: 24px;color: #372e2c;margin-bottom: 20px"></i>&nbsp;
                                        </div>
                                        <div class="col-md-5 col-sm-12 px-0 destColumn">
                                          <p class="destFont " style="color: #67686b;">${v.bookingDestinationAR.toLocaleUpperCase()}</p>
                                        </div>
                                       
                                    </div>
                                    <div style="display:flex;justify-content:space-between;align-items: baseline;" class="row action FlightResultLang">
                                      <p >هل تريد إعادة حجز هذه الرحلة؟</p>
                                      <button key="ReBook" class="btn-first btn-submit " id="ReBooking" onclick="RebookFlight(${v.rsvnID})" type="button" style=" border-radius: 25px;">ريبوك</button>
                                    </div>
                                </div>
                             </div>

                        <!-- End -->
                    </div>`);
                }
                else {


                    $("#CancelbookingRowAppend").append(`

                 <div class="col-md-6">

                     <div class="card mb-3" style="width:100%; border-radius: 20px; box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;">
                         <div class="card-body p-4 mx-3">
                            <div class="row" style="display: flex;justify-content: center;">
                            <p style="color: #b68150;">Booking Status:&nbsp;<b style="color: #67686b;">Canceled</b></p>
                            </div>
                             <div class="row" style="display: flex; justify-content: space-between;">
                                 <P style="color: #b68150;">Booking Date:&nbsp;<b style="color: #67686b;">${moment(v.fltDateTime).format('DD-MMM-YY')}</b></P>
                                 <P style="color: #b68150;">ETD:&nbsp;<b style="color: #67686b;">${moment(v.fltDateTime).format('HH:mm')}</b></P>

                             </div>

                             <div class="row" style="display: flex; justify-content: space-between;">

                                 <P style="color: #b68150;">Flight Number:&nbsp;<b style="color: #67686b;">${v.fltNumber.toLocaleUpperCase()}</b></P>
                                 <P style="color: #b68150;">Booking PNR:&nbsp;<b style="color: #67686b;">${v.bookingPNR.toLocaleUpperCase()}</b></P>

                             </div>



                             <div class="row" style="display: flex; justify-content: space-between;">
                                 <div class="col-md-5 col-sm-12 px-0 destColumn">
                                     <p class="destFont" style="color: #b68150;">${v.base.toLocaleUpperCase()} &nbsp;</p>
                                 </div>
                                 <div class="col-md-2 col-sm-12 destColumn d-flex">
                                     <i class="fa fa-plane  destIcon" aria-hidden="true" style="font-size: 24px;color: #372e2c;margin-bottom: 20px"></i>&nbsp;
                                 </div>
                                 <div class="col-md-5 col-sm-12 px-0 destColumn">
                                   <p class="destFont " style="color: #67686b;">${v.bookingDestination.toLocaleUpperCase()}</p>
                                 </div>
                             </div>
                             <div style="display:flex;justify-content:space-between;align-items: baseline;" class=" row action FlightResultLang">
                                <p >Are You Want to Rebook this flight?</p>
                                <button key="ReBook" class="btn-first btn-submit " id="ReBooking" onclick="RebookFlight(${v.rsvnID})" type="button" style=" border-radius: 25px;">Rebook</button>
                             </div>

                         </div>

                     </div>

                     <!-- End -->
                 </div>`);
                }


            });
            $('#preloader').hide();


            if (res.data && res.data != null) {
                swal(res.responseMsg, {
                    title: IfArabic ? "نجاح":"Succes",
                    text: IfArabic ? "نجاح" : "Succes",
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




function CancleFlight(RvsnID) {
    debugger

    var obj = {
        RsvnID: RvsnID,
        Lang: window.localStorage.language,
        UpdatedBy: JSON.parse(localStorage.getItem('userData')).id,
        UpdatedActionSource:'CustomerWeb'
    }

    swal({
        title: IfArabic ? "هل انت متأكد؟": "Are you sure?",
        text: IfArabic ? "سيتم إلغاء حجوزات الرضع تلقائيًا أيضًا" : "Are you want to cancel this booking! \n Infant bookings will also cancelled automatically",
        icon: "warning",
        buttons: [
            IfArabic ? 'رقم!' : 'No!' ,
            IfArabic ? 'نعم ' : 'Yes' 
        ],
        dangerMode: true,
    }).then(function (isConfirm) {
        if (isConfirm) {


            postRequest(ApiUrl + "Reservation/CancelBookingByRsvnId", obj, function (res) {
                $('#preloader').show();

                if (res.status == 200) {
                    swal({
                        title: IfArabic ? "تم إلغاء الحجز!" : "Flight Canceled!",
                        text: IfArabic ? "تم إلغاء حجزك بنجاح" : "Your booking has been canceled successfuly",
                        icon: "success",
                        buttons: [null, IfArabic ? "موافق" : "OK"],

                    });
                    GetOpenStatusFlights()
                    GetCancelBookingDetailsByUserId(UserId)
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
                        text: res.responseMsg,
                        icon: "error",
                        dangerMode: true,
                        buttons: [null, IfArabic ? "موافق" : "OK"],

                    })
                }

            });
        }
    })


   
     

      

  

}

function RebookFlight(RvsnID) {
    debugger
    var obj = {
        RsvnID: RvsnID,
        Lang: window.localStorage.language,
        UpdatedBy: JSON.parse(localStorage.getItem('userData')).id,
        UpdatedActionSource: 'CustomerWeb'
    }
    swal({
        title: IfArabic ? "هل انت متأكد؟" : "Are you sure?",

        text: IfArabic ? "هل تريد إلغاء هذا الحجز!" : "Are you want to Rebook this booking!",
        icon: "warning",
        buttons: [
            IfArabic ? 'رقم!' : 'No!',
            IfArabic ? 'نعم ' : 'Yes'
        ],
        dangerMode: true,
    }).then(function (isConfirm) {
        if (isConfirm) {
            postRequest(ApiUrl + "Reservation/ReBookingByRsvnId", obj, function (res) {
                $('#preloader').show();

                if (res.status == 200) {
                    
                    swal({
                        title: IfArabic ? "إعادة حجز الرحلة!" : "Flight Rebooking!",
                        text: IfArabic ? "تمت إعادة حجز الرحلة بنجاح" : "Flight rebooked successfuly",
                        icon: "success",
                        buttons: [null, IfArabic ? "موافق" : "OK"],

                    });
                    GetOpenStatusFlights()
                    GetCancelBookingDetailsByUserId(UserId)
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
                        text:  res.responseMsg,
                        icon: "error",
                        dangerMode: true,
                        buttons: [null, IfArabic ? "موافق" : "OK"],

                    })
                }

            });
        }
    })









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




function CheckPaxType(type) {





    if (type == "U") {

        return "UAE ID"

    }
    else if (type == "P") {
        return "Passport"

    }
    else if (type == "T") {
        return "Travel ID"

    }
    else if (type == "S") {
        return "Security ID"

    }

    else if (type == "C") {
        return "Company ID"

    }

    else if (type == "B") {
        return "Birth Certificate"

    }

}
