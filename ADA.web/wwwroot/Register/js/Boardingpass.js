var ApiUrl = $("#baseApiUrl").val();
var LiveWebUrl = $("#LiveWebUrl").val();
var IfArabic = window.localStorage.language == 'ar';
var UserId = JSON.parse(window.localStorage.getItem('userData')).id
var memberType = JSON.parse(localStorage.getItem('userData')).registerType
var PNR;
var RsvnID;

$(document).ready(function () {
    PNR = window.location.search.slice(1).split('&')[0].split('PNR=')[1];
    RsvnID = window.location.search.slice(1).split('&')[1].split('RsvnID=')[1];

    

   
    if (PNR.length) {
       
        GetBoardingPass();
    }
    else {
        swal({
            title: IfArabic ? "خطأ" : "Error",
            text: IfArabic ? "هناك خطأ ما!":"Something went wrong",
            icon: "error",
            dangerMode: true,
            buttons: [null, IfArabic ? "موافق" : "OK"],
        })
    }
        
        
   

});


function generateBarcode() {
    var settings = {
        barWidth: 2,
        barHeight: 50,
        moduleSize: 5,
        showHRI: true,
        addQuietZone: true,
        marginHRI: 5,
        bgColor: "#FFFFFF",
        color: "#000000",
        fontSize: 10,
        output: "css",
        posX: 0,
        posY: 0
    };
    JsBarcode("#barcode", PNR, {
        format: "CODE128",
        lineColor: "#000",
        width: 2,
        height: 40,
        displayValue: false
    });
}
function GetBoardingPass() {
    $('#preloader').show();
    postRequest($("#baseApiUrl").val() + "Reservation/GetBordingPassDetails/" + RsvnID, null, function (res) {
        debugger
        if (res.status == 200) {
            $('#preloader').hide();
           
            $("#boardingPassContainer").html('');

            if (IfArabic) {
               
                $("#boardingPassContainer").append(`
              <div class="col-md-12">
                  <div class="containerr">

                    <div class="item">
                      <div class="item-right">
                        
                        <h2 class="num mb-1">${moment(res.data[0].fltDateTime).format('DD')}</h2>
                        <p class="day">${moment(res.data[0].fltDateTime).format('MMM-YYYY')}</p>
                        
                          <div class="place-label" style="display:flex;align-items: flex-end;justify-content: center;">ETD: <span class="place-value">${moment(res.data[0].fltDateTime).format('HH:MM')}</span>
                          </div>
                        
                        <span class="up-border"></span>
                        <span class="down-border"></span>
                      </div>
                      <!-- end item-right -->
                      <div class="item-left">
                        <div class="row mb-4">
                          <div class="col-md-6 d-flex justify-content-between align-items-center">
                            <h6 class="place-label m-0">راكب: </h6>
                            <span class="">${res.data[0].paxname}</span>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-5 col-sm-5">
                            <h4>${res.data[0].destShort}</h4>
                            <p class="event">${res.data[0].destNameArabic}</p>
                          </div>
                          <div class="col-md-2 col-sm-2">
                            <i class="fa fa-plane fa-flip-horizontal destIcon" aria-hidden="true" style="font-size: 24px;color: #372e2c;margin-bottom: 20px"></i>
                          </div>
                          <div class="col-md-5 col-sm-5">
                           <h4>${res.data[0].baseShort}</h4>
                           <p class="event">${res.data[0].baseArabic}</p>
                          </div>

                        </div>
                        <div class="row pt-2">
                          <div class="col-md-4 col-sm-4">
                            <div class="place-block">
                              <div class="place-label">PNR: </br><span class="place-value">${res.data[0].rsvnPNR}</span>
                              </div>
                            </div>
                          </div>
                          <div class="col-md-4 col-sm-4">
                            <div class="place-block">
                              <div class="place-label">مقعد: </br><span class="place-value">${res.data[0].seatNum}</span>
                              </div>
                            </div>
                          </div>
                          <div class="col-md-4 col-sm-4">
                            <div class="place-block">
                              <div class="place-label">بوابة: </br><span class="place-value">${res.data[0].gateNum}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="fix"></div>


                            <div class="qr">
                             <svg id="barcode"></svg>
                            </div>



                        <button class="tickets d-none">Save</button>
                      </div>
                      <!-- end item-right -->
                    </div>
                    <!-- end item -->
                  </div>
                </div>

                   
                

            `);


            }
            else {
                var FltDate = moment(res.data[0].fltDateTime).locale('en').format('DD')
                var FltTime = moment(res.data[0].fltDateTime).locale('en').format('MMM-YYYY')
                var etdTime = moment(res.data[0].fltDateTime).locale('en').format('HH:mm')
            $("#boardingPassContainer").append(`

              <div class="col-md-12">
                  <div class="containerr">
                    
                    <div class="item">
                      <div class="item-right">
                            
                        <h2 class="num mb-1">${FltDate}</h2>
                        <p class="day">${FltTime}</p>
                        
                          <div class="place-label" style="display:flex;align-items: flex-end;justify-content: center;">ETD: <span class="place-value etdTime">${etdTime}</span>
                          </div>
                        
                        <span class="up-border"></span>
                        <span class="down-border"></span>
                      </div>
                      <!-- end item-right -->
                      <div class="item-left">
                        <div class="row mb-4">
                          <div class="col-md-6 d-flex justify-content-between align-items-center">
                            <h6 class="place-label m-0">Passenger:</h6>
                            <span class="">${res.data[0].paxname}</span>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-5 col-sm-5">
                            <h4>${res.data[0].baseShort}</h4>
                            <p class="event">${res.data[0].base}</p>
                          </div>
                          <div class="col-md-2 col-sm-2">
                            <i class="fa fa-plane destIcon" aria-hidden="true" style="font-size: 24px;color: #372e2c;margin-bottom: 20px"></i>
                          </div>
                          <div class="col-md-5 col-sm-5">
                            <h4>${res.data[0].destShort}</h4>
                            <p class="event">${res.data[0].destName}</p>
                          </div>
                        </div>
                        <div class="row pt-2">
                          <div class="col-md-4 col-sm-4">
                            <div class="place-block">
                              <div class="place-label">PNR: </br><span class="place-value">${res.data[0].rsvnPNR}</span>
                              </div>
                            </div>
                          </div>
                          <div class="col-md-4 col-sm-4">
                            <div class="place-block">
                              <div class="place-label">SEAT: </br><span class="place-value">${res.data[0].seatNum}</span>
                              </div>
                            </div>
                          </div>
                          <div class="col-md-4 col-sm-4">
                            <div class="place-block">
                              <div class="place-label">GATE: </br><span class="place-value">${res.data[0].gateNum}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="fix"></div>
                       
                         
                            <div class="qr">
                            <svg id="barcode"></svg>
                            </div>
                       
                       

                        <button class="tickets d-none">Save</button>
                      </div>
                      <!-- end item-right -->
                    </div>
                    <!-- end item -->
                  </div>
                </div>
        

            `);
             
            }

            generateBarcode();
          

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
                title: "Error",
                text: res.responseMsg,
                icon: "error",
                dangerMode: true,
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
                text: IfArabic ? "هناك خطأ ما!": res.responseMsg,
                icon: "error",
                dangerMode: true,
                buttons: [null, IfArabic ? "موافق" : "OK"],
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
                text: IfArabic ? "هناك خطأ ما!" : "Ooops! Something went wrong.!",
                icon: "error",
                dangerMode: true,
                buttons: [null, IfArabic ? "موافق" : "OK"],
            })
        }
    });
}