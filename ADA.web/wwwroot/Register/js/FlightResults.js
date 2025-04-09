var ApiUrl = $("#baseApiUrl").val();
var LiveWebUrl = $("#LiveWebUrl").val();
var IfArabic = window.localStorage.language == 'ar';
var Base = [];
var From = window.location.search.slice(1).split('&')[0].split('from=')[1];
var To = window.location.search.slice(1).split('&')[1].split('to=')[1];
var FromDate = window.location.search.slice(1).split('&')[2].split('fromDate=')[1];
var ToDate = window.location.search.slice(1).split('&')[3].split('to')[1];
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

    

    //GetAllSearchResult(From, To, FromDate, ToDate);
    GetAllDropDown()
    $(document).on("click", "#bookingnow", function (e) {

        if (localStorage.getItem("userData") === null) {
            window.location.href = LiveWebUrl+"/Login/Authenticate";
        }
        else {

            var FlightId = $(this).attr("data-id");

            GetUserGroupMemberCheck(FlightId);
        }

  

    });


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

function GetAllSearchResult(From, To, FromDate, ToDate) {
  
   
    debugger
    
   
        var data = {
        "from": From,
        "to": To,
        "fromDate": moment(FromDate).locale('en').format('YYYY-MM-DD'),
        "toDate": moment(ToDate).locale('en').format('YYYY-MM-DD'),
        };

    postRequest($("#baseApiUrl").val()+"Flight/SearchFlight", data, function (res) {

        if (res.status == 200) {
            debugger
            if (res.data.length == 0 || res.data.length == "") {
                if (IfArabic) {
                    $("#ResultData").text(`عرض ${res.data.length} نتائج`)
                    $("#SearchResultFillAppend").html(`
                          <div class="col-md-12">
                               <div id="notfound">
                                   <div class="notfound">
                                       <div class="notfound-404"></div>
                                       <h1 style="color: #d51c29">404</h1>
                                       <h2>أُووبس! لا ، تم العثور على أي رحلةنأسف لا يوجد رحلة أو رحلات.</h2>
                                       <p>معذرة ليس لدينا اي خط سير رحلة الأن</p>
                                       <a href="`+ $('#LiveWebUrl').val() + '#bannerTabs' + `" style="color: #d51c29!important">إحجز رحلة طيران</a>
                                   </div>
                               </div>
                          </div>
                    `)
                }
                else {
                    $("#ResultData").text(`Showing ${res.data.length} Results`)
                    $("#SearchResultFillAppend").html(`
                          <div class="col-md-12">
                               <div id="notfound">
                                   <div class="notfound">
                                       <div class="notfound-404"></div>
                                       <h1 style="color: #d51c29">404</h1>
                                       <h2>Sorry, no flight(s) found.</h2>
                                       <p>Sorry, you don't have any flight itinerary right now. </p>
                                       <a href="`+ $('#LiveWebUrl').val() + '#bannerTabs' + `" style="color: #d51c29!important">Book a Flight</a>
                                   </div>
                               </div>
                          </div>
                    `);
                }
                
            }
           

            if (res.data.length>0 && res.data.length != 0) {
                if (IfArabic) {
                    $.each(res.data, function (i, v) {

                        const textDate = moment(v.etd).format('DD-MMM-YY');
                        const resultDate = replaceMultipleDate(textDate, ArToEngChar);
                        const textTime = moment(v.etd).format('HH:mm');
                        const resultTime = replaceMultipleTime(textTime, ArToEngChar);

                        $("#ResultData").text(`عرض ${res.data.length} نتائج`)
                        $("#SearchResultFillAppend").append(`
                         <div class="col-md-6">

                            <div class="card mb-3" style="width:100%; border-radius: 20px; box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;">
                                <div class="card-body p-4 mx-3">


                                    <div class="row" style="display: flex; justify-content: space-between;">

                                        <P style="color: #b68150;">تاريخ المغادرة:&nbsp;<b  id="sss" style="color: #67686b;">${resultDate}</b></P>
                                        <P style="color: #b68150; ">ETD: &nbsp;<b style="color: #67686b;">${resultTime}</b></P>

                                    </div>

                                    <div class="row toFrom" style="justify-content: space-between;">

                                        <P style="color: #000;">تحلق من: &nbsp;<b style="color: #67686b;"></b></P>
                                        <P style="color: #b68150;">تحلق إلى: &nbsp;<b style="color: #67686b;"></b></P>

                                    </div>



                                    <div class="row" style="display: flex; justify-content: space-between;">

                                        <div class="col-md-5 col-sm-12 px-0 destColumn">

                                            <p class="destFont" style="color: #b68150;">${v.baseFullnameArabic} &nbsp;</p>
                                        </div>
                                        <div class="col-md-2 col-sm-12 destColumn">
                                            <i class="fa fa-plane destIcon" aria-hidden="true" style="font-size: 24px;color: #372e2c;margin-bottom: 20px"></i>&nbsp;
                                        </div>
                                        <div class="col-md-5 col-sm-12 px-0 destColumn">
                                            <p class="destFont " style="color: #67686b;">${v.destinationArabic}</p>
                                        </div>
                                    </div>
                                    <div style="display:flex;justify-content:space-between;align-items: baseline;" class="row action FlightResultLang">

                                        <p style="color: #b68150;">رقم الرحلة: &nbsp;<b style="color: #67686b;">${v.fltNumber}</b></p>
                                        <button key="Book" class="btn-first btn-submit bookingnow" id="bookingnow" type="button" data-id="${v.fltID}" tabindex="-1" style="padding-top: 7px; padding-bottom: 8px; padding-left: 25px; padding-right: 25px; border-radius: 25px;">حجز</button>
                                    </div>
                                </div>

                            </div>

                            <!-- End -->
                        </div>
                    `);

                        //fillData(res.data, "#temp_SearchResultFillAr", "#SearchResultFillAppend", true);
                        $('.bookingnow').text('الحجز')
                        $('.date').text('عرض')
                        $('small[key=From]').text('من')
                    })
                }
                else {
                    
                  
                    debugger
                    $("#ResultData").text(`Showing ${res.data.length} Results`)
                    fillData(res.data, "#temp_SearchResultFill", "#SearchResultFillAppend", true);
                   

                }
                $('#preloader').hide();

                
            }

        }
        if (res.status == 401) {

            localStorage.removeItem("Menu");
            localStorage.removeItem("userData");
            window.location.href = baseWebUrl + "Dashboard";
        }
        if (res.status == 403) {


            swal( {
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

                
function GetUserGroupMemberCheck(FlightId) {

    var Id = JSON.parse(window.localStorage.getItem('userData')).id;

    if (Id > 0 && Id != null) {

        postRequest(ApiUrl + "Register/GetAllGroupUsersByID?Id=" + Id, null, function (res) {
            $('#preloader').show();

            if (res.status == 200) {
                if (res.data && res.data != null) {

                    if (res.data.length >= 1) {

                        debugger;
                        window.location.href = LiveWebUrl + '/Home/FlightMembers?FlightId=' + FlightId + '&GroupId=' + Id + '';

                    } else {

                        window.location.href = LiveWebUrl + '/Home/FlightBooking?FlightId=' + FlightId + '';

                    }


                    debugger;

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


}

function GetAllDropDown() {

    $('#preloader').show()

    postRequest(ApiUrl + "Flight/GetAllDropdowns", null, function (res) {

        if (res.status == 200) {
            if (res.data && res.data != null) {
                debugger

                
                Base = res.data.destination;
                
                   
                
                GetAllSearchResult(From, To, FromDate, ToDate)
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
            swal({
                title: IfArabic ? "خطأ" : "Error",
                text: IfArabic ? "هناك خطأ ما!" : res.responseMsg,
                icon: "error",
                dangerMode: true,
                confirmButtonText: IfArabic ? "موافق" : "OK",
            });
        }
        if (res.status == 500) {
            $('#preloader').hide();
            swal({
                title: IfArabic ? "خطأ" : "Error",
                text: IfArabic ? "هناك خطأ ما!" : res.responseMsg,
                icon: "error",
                dangerMode: true,
                confirmButtonText: IfArabic ? "موافق" : "OK",
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
                confirmButtonText: IfArabic ? "موافق" : "OK",
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





Handlebars.registerHelper("FlightDate", function (datetime, format) {
    if (IfArabic) {
        return moment(datetime).format(format);
    }
    else {
      return  moment(datetime).locale('en').format('DD-MMM-YYYY')
        
    }
    
});


Handlebars.registerHelper("Time", function (datetime, format) {
    
    if (IfArabic) {
        return moment(datetime).format(format);
    }
    else {
        return moment(datetime).locale('en').format('HH:mm')
    }
    
});








