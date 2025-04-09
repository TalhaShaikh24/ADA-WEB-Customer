
var buttonAdd = $("#add-button");
var buttonRemove = $("#remove-button");
var className = ".dynamic-field";
var count = 0;
var field = "";
var maxFields = 5;
var NationalityArr = [];
var LiveWebUrl = $("#LiveWebUrl").val();
var Birthdate;



$(document).ready(function () {

    GetAllDropDown();
 

    function totalFields() {

        return $(className).length;
    }
    function addNewField() {
        count = totalFields() + 1;
        if (count >= 6) {
            swal({
                icon: "info",
                title: IfArabic ? "تم تجاوز الحد الأقصى للمرافقين من الأعضاء" : "Allowed members or dependents exceeded.",

                text: IfArabic ? "تستطيع اضافة اقصى عدد 5 من الأعضاء" : "You can add a maximum 5 members",

                buttons: [null, "OK"],
            });
        }
        else {
            AppendRows(count);
        }
    }

    function removeLastField() {
        if (totalFields() > 1) {
            $(className + ":last").remove();
        }
    }
    buttonAdd.click(function () {
        addNewField();
    });

    buttonRemove.click(function () {
        removeLastField();
    });


    $("#OtherMembersNationalityDocumentType").on('change', function () {

       
        if ($("#OtherMembersNationalityDocumentType").selectpicker("val").some(x => x == "U")) {
                $("#FlieUAE").css({ "display": "block" });

            } else {

            $("#FlieUAE").css({ "display": "none" });
            $("#InputfileUAE0").val(null).next().remove();
            }

        if ($("#OtherMembersNationalityDocumentType").selectpicker("val").some(x => x == "P")) {
                $("#FliePasport").css({ "display": "block" });

            } else {

             $("#FliePasport").css({ "display": "none" });
            $("#InputfilePassport0").val(null).next().remove();
            }
        if ($("#OtherMembersNationalityDocumentType").selectpicker("val").some(x => x == "T")) {
                $("#FlieTravelID").css({ "display": "block" });

            } else {

            $("#FlieTravelID").css({ "display": "none" });
            $("#InputfileTravel0").val(null).next().remove();
            }


        if ($("#OtherMembersNationalityDocumentType").selectpicker("val").some(x => x == "S")) {
                $("#FlieSecurityID").css({ "display": "block" });

            } else {

            $("#FlieSecurityID").css({ "display": "none" });
            $("#InputfileSecurity0").val(null).next().remove();
            }

        if ($("#OtherMembersNationalityDocumentType").selectpicker("val").some(x => x == "C")) {
                $("#FlieCompanyID").css({ "display": "block" });

            } else {

            $("#FlieCompanyID").css({ "display": "none" });
            $("#InputfileCompany0").val(null).next().remove();
            }

        if ($("#OtherMembersNationalityDocumentType").selectpicker("val").some(x => x == "B")) {
            $("#FlieBirthCertificate").css({ "display": "block" });

        } else {

            $("#FlieBirthCertificate").css({ "display": "none" });
            $("#InputfileBirthdate0").val(null).next().remove();
        }

    });

    $('#OtherMembersNationalityBirthdate').datepicker({

        onSelect: function () {


          moment($("#OtherMembersNationalityBirthdate").val(), "DD-MMM-YYYY").locale("en").format("YYYY-MM-DD");
          

        },
        dateFormat: 'dd-M-yyyy',
        maxDate: new Date(),

        minDate:false

    })
   

});

$("#GroupMembersRegistration").click(function (e) {

   
    if ($("#RegistrationGroupForms").valid()) {

        var BirthDateLength = $(".OtherMembersNationalityBirthdate ").length;
     
        for (var i = 0; i < BirthDateLength; i++) {

            var DOB = $(".OtherMembersNationalityBirthdate:eq('" + i + "')").val();
            
            var Corporateaddob = DOB;

            if (Corporateaddob != '') {
                debugger
                var Corporateadagemonths = moment().diff(Corporateaddob, 'month');

                if (Corporateadagemonths <= 6) {

                    swal({
                        icon: "warning",
                        title:"You are an infant!",
                        buttons: [null, "OK"],
                        text: IfArabic ? "غير مسموح تسجيل الرضيع من قبل الهيئات" : "Infant registration is not allowed for Corporate users.",
                    });

                    return false;
                }
            }

        }


        $('#preloader').show();
        var formData = new FormData();


        var DataArr = [];

        for (var i = 1; i <= $(className).length; i++) {
            debugger
            var obj = {
                Language: "en",
                Honorifics: $(`#dynamic-field-${i}`).find(".OtherMembersGender").selectpicker('val'),
                Name: $(`#dynamic-field-${i}`).find(".OtherMembersName").val(),
                Email: $(`#dynamic-field-${i}`).find(".OtherMembersEmail").val().toLowerCase(),
                Nationality: String($(`#dynamic-field-${i}`).find(".OtherMembersNationality").selectpicker("val")),
                Birthdate: $(`#dynamic-field-${i}`).find(".OtherMembersNationalityBirthdate").val(),
                Documents: $(`#dynamic-field-${i}`).find(".OtherMembersNationalityDocuments").val(),
                DocumentType: $(`#dynamic-field-${i}`).find(`.OtherMembersNationalityDocumentType:eq(1)`).val(),
                Mobile: $(`#dynamic-field-${i}`).find(".OtherMembersNationalityMobile").val(),
                IsDelmaIsland: $(`#dynamic-field-${i}`).find(".RGActiveDelmaIsland").is(":checked"),
                IsUAEId: $(`#dynamic-field-${i}`).find(".RGActiveUAEID").is(":checked"),
                GovEntity: $(`#dynamic-field-${i}`).find(".GovEntity").is(":checked"),
                IsHead: $(`#dynamic-field-${i}`).find(".IsHead").is(":checked"),
            }

            DataArr.push(obj);
        }

            formData.append("Language", "en"),
            formData.append("Username", $("#PUsername").val()),
            formData.append("Password", $("#PPassword").val()),
            formData.append("IsDelmaIsland", $('#ActiveDelmaIsland').is(":checked"))
            formData.append("IsUAEId", $('#ActiveUAEID').is(":checked"))
            formData.append("GovEntity", $('#GovEntity').is(":checked"))

        var imgCount = 0;

        for (var j = 1; j <= $(className).length; j++) {

            for (var i = 0; i < 6; i++) {

                var files = $(`#dynamic-field-${j}`).find(`.DocFile:eq(${i})`).get(0).files;

                if (files.length != 0) {



                    formData.append("Group" + (j) + "Image" + (imgCount + 1), files[0])

                    imgCount++;
                }

            }
        }


          formData.append("Group", JSON.stringify(DataArr))

        postRequestWithoutStringfy("https://hajzapi.ada.ae/api/Register/AddCorporate", formData, function (res) {

        if (res.status == 200) {
            if (res.data && res.data != null) {

                swal(res.responseMsg, {
                    icon: "success",
                    title: "Registered Successfully",
                    buttons: [null, "OK"],
                    dangerMode: false,
                    text: "You can now Login",
                });

                $(document).find("input").val('');
                $(document).find("select").val('').selectpicker("refresh");
               
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
            swal( {
                icon: "error",
                title:"Error",
                buttons: [null, "OK"],
                dangerMode: true,
                text: IfArabic ? "عفواً! هنالك خطأ ما." : "Ooops! Something went wrong.",
            });
        }
        if (res.status == 500) {
            $('#preloader').hide();
            swal({
                icon: "error",
                title:"Error",
                buttons: [null,"OK"],
                dangerMode: true,
                text: IfArabic ? "عفواً! هنالك خطأ ما":"Something Went Wrong!",
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
                icon: "info",
                title: "info",
                buttons: [null, "OK"],
                dangerMode: false,
                text:res.responseMsg,
            })
        }
        $('#preloader').hide();
    });

   }
    
});


 $("#RegistrationGroupForms").validate({

        rules: {
            PGender: {
                required: true,


            },
            PName: {
                required: true,

            },
            PEmail: {
                required: false,
                email: true

            },

            Nationality: {
                required: true,

            },
            PUsername: {
                required: true,

            },
            PPassword: {
                required: true,
                strongPassword: true
            },
            PBirthdate: {
                required: true,

            },

            PMobile: {
                required: true,
                phoneUS: true
            },

            PDocument: {
                required: true,

            },
            PDocumentType: {
                required: true,

            },

            OtherMembersGender: {
                required: true,

            },
            OtherMembersName: {
                required: true,

            },

            OtherMembersEmail: {
                required: false,
                email: true
            },
            OtherMembersNationality: {
                required: true,

            },
            OtherMembersNationalityUsername: {
                required: true,

            },
            OtherMembersNationalityPassword: {
                required: true,

            },
            OtherMembersNationalityBirthdate: {
                required: true,

            },
            OtherMembersNationalityMobile: {
                required: true,
                minlength: 9,
                maxlength: 9
            },
            OtherMembersNationalityDocument: {
                required: true,
                onlyDigits: true,

            },

            OtherMembersNationalityDocumentType: {
                required: true,

            },
            UDoc: {
                required: true,
                extension: "png|jpeg|jpg|doc|docx|pdf",
                filesize: 2000000
            },

            PDoc: {
                required: true,
                extension: "png|jpeg|jpg|doc|docx|pdf",
                filesize: 2000000
            },

            SDoc: {
                required: true,
                extension: "png|jpeg|jpg|doc|docx|pdf",
                filesize: 2000000
            },
            TDoc: {
                required: true,
                extension: "png|jpeg|jpg|doc|docx|pdf",
                filesize: 2000000
            },
            BCDoc: {
                required: true,
                extension: "png|jpeg|jpg|doc|docx|pdf",
                filesize: 2000000
            },

            CDoc: {
                required: true,
                extension: "png|jpeg|jpg|doc|docx|pdf",
                filesize: 2000000
            },
            IsHead: {
                required: true,

            },


        },
     messages: {
         PGender: "This field is required.",
         PName: "This field is required.",
         PEmail: {
             required: "This field is required.",
             email: "Invalid email format"
         },
            Nationality: "This field is required.",
            PUsername: "This field is required.",
            PPassword: {
                required: "This field is required.",
            },
            PMobile: {
                required: "This field is required.",
                minlength: "The length of mobile must be 9 digits",
                maxlength: "The length of mobile must be 9 digits",
            },
            PDocument: "This field is required.",
            PDocumentType: "This field is required.",
            OtherMembersGender: "This field is required.",
            OtherMembersName: "This field is required.",
            OtherMembersNationality: "This field is required.",
            OtherMembersNationalityUsername: "This field is required.",
            OtherMembersNationalityPassword: "This field is required.",
            OtherMembersNationalityBirthdate: "This field is required.",
            OtherMembersNationalityDocument: {
                required: "This field is required.",
                onlyDigits: "Please enter only digits.",
            },
            OtherMembersNationalityDocumentType: "This field is required.",
            UDoc: {
                required: "This field is required.",
                extension: IfArabic ? "الرجاء تحميل وتنسيق ملف صالح" : "Please upload a valid file format."
},
            PDoc: {
                required: "This field is required.",
                extension: IfArabic ? "الرجاء تحميل وتنسيق ملف صالح" : "Please upload a valid file format."

                },
            TDoc: {
                required: "This field is required.",
                extension: IfArabic ? "الرجاء تحميل وتنسيق ملف صالح" : "Please upload a valid file format."

                },
            CDoc: {
                required: "This field is required.",
                extension: IfArabic ? "الرجاء تحميل وتنسيق ملف صالح" : "Please upload a valid file format."

                },
            BCDoc: {
                required: "This field is required.",
                extension: IfArabic ? "الرجاء تحميل وتنسيق ملف صالح" : "Please upload a valid file format."

                },
            SDoc: {
                required: "This field is required.",
                extension: IfArabic ? "الرجاء تحميل وتنسيق ملف صالح" : "Please upload a valid file format."

                },
            IsHead: {

                }
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


function GetAllDropDown() {

    $('#preloader').show()

    postRequest("https://hajzapi.ada.ae/api/Flight/GetAllDropdowns", null, function (res) {

        if (res.status == 200) {
            if (res.data && res.data != null) {

              NationalityArr = res.data.country;
              fillData(res.data.country, "#temp_Nationality", "#OtherMembersNationality", true);
                
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
            swal(res.responseMsg, {
                icon: "error",
                title: "Error",
                dangerMode: true,
                text: IfArabic ? "عفواً! هنالك خطأ ما" : "Ooops! Something went wrong.",
                buttons: [null,"OK"],
            });
        }
        if (res.status == 500) {
            $('#preloader').hide();
            swal({
                icon: "error",
                title:"Error",
                dangerMode: true,
                text: IfArabic ? "عفواً! هنالك خطأ ما" : "Ooops! Something went wrong.",
                buttons: [null,"OK"],
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
                icon: "error",
                title:"Error",
                dangerMode: true,
                text: IfArabic ? "عفواً! هنالك خطأ ما.": "Ooops! Something went wrong.",
                buttons: [null, "OK"],
            })
        }

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
            swal({
                title: "Error",
                text: IfArabic ? " عفواً! هنالك خطأ ما" : "Ooops! Something went wrong.",
                icon: "error",
                dangerMode: true,
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
                icon: "error",
                title:"Error",
                dangerMode: true,
                text: IfArabic ? "عفواً! هنالك خطأ ما" : "Ooops! Something went wrong.",
                buttons: [null, "OK"],
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

function AppendRows(count) {

  
    $(className + ":last").after(`<div id="dynamic-field-${count}" class="form-group dynamic-field pb-2">
                                   <div class="border-top my-3"></div>

                                    <div class="row">
                                    <div class="col-md-3">
                                        <div class="form-group">
                                        <label class="fs-14 text-custom-black fw-500">Title</label><span class="required"> *</span>
                                        <select id="OtherMembersGender${count}" class="form-control selectpicker OtherMembersGender" name="OtherMembersGender${count}" title="Select Title">
                                            <option selected disabled>Select one</option>
                                            <option value="Mr" name="Mr">Mr</option>
                                            <option value="Mrs" name="Mrs">Mrs</option>
                                            <option value="MS" name="Ms">Ms</option>
                                        </select>
                                    </div>
                                    </div>

                                    <div class="col-md-3">
                                    <div class="form-group">
                                        <label  class="fs-14 text-custom-black fw-500">Name</label><span class="required"> *</span>
                                        <input maxlength="50" type="text" id="OtherMembersName${count}" class="form-control form-control-custom OtherMembersName" name="OtherMembersName${count} " placeholder="Name">
                                    </div></div>

                                    <div class="col-md-3">
                                        <div class="form-group">
                                        <label  class="fs-14 text-custom-black fw-500">Email</label><span class="text-secondary"> (Optional)</span>
                                        <input maxlength="60"  type="email" id="OtherMembersEmail${count}" class="form-control form-control-custom OtherMembersEmail" name="OtherMembersEmail${count}"placeholder="Email">
                                    </div></div>

                                    <div class="col-md-3">
                                         <div class="form-group">
                                        <label   class="fs-14 text-custom-black fw-500">Nationality</label><span class="required"> *</span>
                                        <select id="OtherMembersNationality${count}" name="OtherMembersNationality${count}" class="form-control OtherMembersNationality selectpicker" data-live-search="true" data-size="5" data-show-subtext="true" multiple data-max-options="1" title="Select Nationality">
                                        </select>
                                    </div></div>

                                </div>
                                <div class="row">

                                     <div class="col-md-3 form-group ">
                                         <label  class="fs-14 text-custom-black fw-500">Birthdate <span class="required">*</span> </label>
                                         <div class="input-group group-form"  style="position:relative">
                                             <input style="z-index: auto;" type="text"  readonly="readonly" name="OtherMembersNationalityBirthdate${count}" id="OtherMembersNationalityBirthdate${count}" class="form-control form-control-custom OtherMembersNationalityBirthdate OtherMembersBirthdateValidation" placeholder="dd-mmm-yyyy" autocomplete="off" />
                                             <span class="input-group-append">
                                                 <i class="far fa-calendar"  style="position: absolute; right: 10px; top: 12px;"></i>
                                             </span>
                                         </div>
                                    </div>
                                

                                    <div class="col-md-3">
                                         <div class="form-group">
                                        <label  class="fs-14 text-custom-black fw-500">Mobile</label><span class="required"> *</span>
                                            <div class="input-group group-form" style="position:relative">
                                                <input style="z-index:auto;padding-left: 64px; padding-right: 65px;"  type="tel" onkeypress="return isNumberKey(event)" id="OtherMembersNationalityMobile${count}" maxlength="9"   class="form-control form-control-custom OtherMembersNationalityMobile" name="OtherMembersNationalityMobile${count}"placeholder="XXXXXXXXX">
                                                <span class="input-group-mask" style=" position: absolute; top: 6px; left: 6px;">(+971) -</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-3">
                                         <div class="form-group">
                                        <label  class="fs-14 text-custom-black fw-500">ID</label><span class="required"> *</span>
                                        <input  type="text" id="OtherMembersNationalityDocument${count}" maxlength="18" class="form-control form-control-custom OtherMembersNationalityDocuments" name="OtherMembersNationalityDocuments${count}" placeholder="ID">
                                    </div>
                                    </div>

                                    <div class="col-md-3">
                                         <div class="form-group">
                                        <label  class="fs-14 text-custom-black fw-500">Document Type</label><span class="required"> *</span>
                                        <select id="OtherMembersNationalityDocumentType${count}" class="form-control selectpicker OtherMembersNationalityDocumentType" name="OtherMembersNationalityDocumentType${count}" data-show-subtext="true" multiple data-live-search="true" title="Select DocumentType">
                                         <option value="U">UAE ID</option>
                                         <option value="P">Passport</option>
                                         <option value="T">Travel ID</option>
                                         <option value="S">Security ID</option>
                                         <option value="C">Company ID</option>
                                         <option value="B">Birth Certificate</option>

                                     </select>

                             </div>
                             </div>

                               <div class="col-md-6">
                                    <div class="form-check mr-3">
                                       
                                        <label class="custom-checkbox ">

                                            <input class="form-check-input RGActiveDelmaIsland" type="checkbox" value="">
                                            <span class="checkmark" ></span>
                                            <p class=" mb-0">Are You Delma Resident?</p>
                                        </label>
                                    </div>

                                 

                                   
                                </div>

                            </div>

                               <div class="row">

                                

                                    <div class="col-md-4" id="FlieUAE${count}" style="display:none;">
                                        <div class="form-group">
                                            <label  class="fs-14 text-custom-black fw-500">UAE ID</label> <span class="required">*</span>  <span class="extensionDoc"> (doc, docx, jpeg, jpg, png, pdf)</span>
                                            <input id="InputfileUAE${count}" style=" padding-top: 5px!important;" type="file"  class="form-control form-control-custom DocFile " name="Udoc${count}" />
                                        </div>
                                    </div>


                                    <div class="col-md-4" id="FliePasport${count}" style="display:none;">
                                        <div class="form-group">
                                            <label  class="fs-14 text-custom-black fw-500">Passport</label> <span class="required">*</span>  <span class="extensionDoc"> (doc, docx, jpeg, jpg, png, pdf)</span>
                                            <input id="InputfilePassport${count}" style=" padding-top: 5px!important;" type="file"  class="form-control DocFile form-control-sm" name="Pdoc${count}" />
                                        </div>
                                    </div>


                                    <div class="col-md-4" id="FlieTravelID${count}" style="display:none;">
                                        <div class="form-group">
                                            <label  class="fs-14 text-custom-black fw-500">Travel ID</label> <span class="required">*</span>  <span class="extensionDoc"> (doc, docx, jpeg, jpg, png, pdf)</span>
                                            <input id="InputfileTravel${count}" style=" padding-top: 5px!important;" type="file" class="form-control form-control-custom DocFile " name="Tdoc${count}" />
                                        </div>
                                    </div>


                                    <div class="col-md-4" id="FlieSecurityID${count}" style="display:none;">
                                        <div class="form-group">
                                            <label  class="fs-14 text-custom-black fw-500">Upload Security ID</label>
                                            <input id="InputfileSecurity${count}" style=" padding-top: 5px!important;" type="file"  class="form-control form-control-custom DocFile " name="Sdoc${count}" />
                                        </div>
                                    </div>

                                    <div class="col-md-4" id="FlieCompanyID${count}" style="display:none;">
                                        <div class="form-group">
                                            <label  class="fs-14 text-custom-black fw-500">Company ID</label> <span class="required">*</span>  <span class="extensionDoc"> (doc, docx, jpeg, jpg, png, pdf)</span>
                                            <input id="InputfileCompany${count}" style=" padding-top: 5px!important;" type="file"  class="form-control form-control-custom  DocFile " name="Cdoc${count}"/>
                                        </div>
                                    </div>

                                    <div class="col-md-4" id="FlieBirthCertificate${count}" style="display:none;">
                                        <div class="form-group">
                                            <label  class="fs-14 text-custom-black fw-500"> Birth Certificate</label> <span class="required">*</span>  <span class="extensionDoc"> (doc, docx, jpeg, jpg, png, pdf)</span>
                                            <input id="InputfileBirthdate${count}" style=" padding-top: 5px!important;" type="file"  class="form-control form-control-custom DocFile " name="BCdoc${count}" />
                                        </div>
                                    </div>


                                
                      </div>

        </div>`);
    



    var talha = '';
    $(document).on("click", ".OtherMembersBirthdateValidation", function () {
        talha = $(this);
        
    });

    $(`#OtherMembersNationalityBirthdate${count}`).datepicker({
        
        onSelect: function (date, datepicker) {

          moment($(`#OtherMembersNationalityBirthdate${count}`).val(), "DD-MMM-YYYY").locale("en").format("YYYY-MM-DD");
            
        },
        maxDate: new Date(),
        minDate:false,
        dateFormat: 'dd-M-yyyy'
    });

       
   fillData(NationalityArr, "#temp_Nationality", `#OtherMembersNationality${count}`, true);
   $(".OtherMembersNationality").selectpicker("refresh");
   $(".selectpicker").selectpicker("render");

    ValidationRuntime();

   $(`#OtherMembersNationalityDocumentType${count}`).on('change', function () {
      
        
        if ($(`#OtherMembersNationalityDocumentType${count}`).selectpicker("val").some(x => x == "U")) {
                $(`#FlieUAE${count}`).css({ "display": "block" });

            } else {

                $(`#FlieUAE${count}`).css({ "display": "none" });
                $(`#InputfileUAE${count}`).val(null).next().remove();

            }

        if ($(`#OtherMembersNationalityDocumentType${count}`).selectpicker("val").some(x => x == "P")) {
                $(`#FliePasport${count}`).css({ "display": "block" });

            } else {

                $(`#FliePasport${count}`).css({ "display": "none" });
            $(`#InputfilePassport${count}`).val(null).next().remove();
        }

        if ($(`#OtherMembersNationalityDocumentType${count}`).selectpicker("val").some(x => x == "T")) {
                $(`#FlieTravelID${count}`).css({ "display": "block" });

            } else {

                $(`#FlieTravelID${count}`).css({ "display": "none" });
            $(`#InputfileTravel${count}`).val(null).next().remove();
            }


        if ($(`#OtherMembersNationalityDocumentType${count}`).selectpicker("val").some(x => x == "S")) {
                $(`#FlieSecurityID${count}`).css({ "display": "block" });

            } else {

                $(`#FlieSecurityID${count}`).css({ "display": "none" });
            $(`#InputfileSecurity${count}`).val(null).next().remove();
            }

        if ($(`#OtherMembersNationalityDocumentType${count}`).selectpicker("val").some(x => x == "C")) {
                $(`#FlieCompanyID${count}`).css({ "display": "block" });

            } else {

                $(`#FlieCompanyID${count}`).css({ "display": "none" });
            $(`#InputfileCompany${count}`).val(null).next().remove();
            }

        if ($(`#OtherMembersNationalityDocumentType${count}`).selectpicker("val").some(x => x == "B")) {
                $(`#FlieBirthCertificate${count}`).css({ "display": "block" });

            } else {

                $(`#FlieBirthCertificate${count}`).css({ "display": "none" });
            $(`#InputfileBirthdate${count}`).val(null).next().remove();
       }

       $(this).valid();
   });

    $(document).on("change", `#OtherMembersNationality${count}`, function () {

        $(this).valid();

    })

    $(document).on("change", `#OtherMembersGender${count}`, function () {

        $(this).valid();

    });


    $(document).on("change", `#InputfileUAE${count}`, function () {

        $(this).valid();

    })

    $(document).on("change", `#InputfilePassport${count}`, function () {

        $(this).valid();

    })

    $(document).on("change", `#InputfileTravel${count}`, function () {

        $(this).valid();

    })

    $(document).on("change", `#InputfileSecurity${count}`, function () {

        $(this).valid();

    })

    $(document).on("change", `#InputfileCompany${count}`, function () {

        $(this).valid();

    })

    $(document).on("change", `#InputfileBirthdate${count}`, function () {

        $(this).valid();

    })
}

function ValidationRuntime() {

        $('.OtherMembersName').each(function () {
            $(this).rules("add",
                {
                    required: true,
                    messages: {
                        required: "This field is required.",
                    }
                });
        });

        $('.OtherMembersGender').each(function () {
            $(this).rules("add",
                {
                    required: true,
                    messages: {
                        required: "This field is required.",
                    }
                });
        });

        $('.OtherMembersEmail').each(function () {
            $(this).rules("add",
                {
                    required: false,
                    email: true
                });
        });

        $('.OtherMembersNationality').each(function () {
            $(this).rules("add",
                {
                    required: true,
                    messages: {
                        required: "This field is required.",
                    }
                });
        });

        $('.OtherMembersNationalityBirthdate').each(function () {
            $(this).rules("add",
                {
                    required: true,
                    messages: {
                        required: "This field is required.",
                    }
                });
        });

        $('.OtherMembersNationalityMobile').each(function () {
            $(this).rules("add",
                {
                    required: true,
                    minlength: 9,
                    maxlength: 9

                });
        });

        $('.OtherMembersNationalityDocuments').each(function () {
            $(this).rules("add",
                {
                    required: true,
                    onlyDigits: true,
                    messages: {
                        required: "This field is required.",
                        onlyDigits: "Please enter only digits.",
                    }
                });
        });

        $('.OtherMembersNationalityDocumentType').each(function () {
            $(this).rules("add",
                {
                    required: true,
                    messages: {
                        required: "This field is required.",
                    }
                });
        });

        $('.DocFile').each(function () {
            $(this).rules("add",
                {
                    required: true,
                    extension: "png|jpeg|jpg|doc|docx|pdf",
                    filesize: 2000000,
                    messages: {
                        required: "This field is required.",
                        extension: IfArabic ? "الرجاء تحميل وتنسيق ملف صالح" : "Please upload a valid file format."

                    }
                });
        });
    }

  
$(document).on("change", "#OtherMembersNationality", function () {
    
    $(this).valid();

})

$(document).on("change", "#OtherMembersGender", function () {

    $(this).valid();

});

$(document).on("change", "#OtherMembersNationalityDocumentType", function () {

    $(this).valid();

});

$(document).on("change", "#InputfileUAE0", function () {

    $(this).valid();

})

$(document).on("change", "#InputfilePassport0", function () {

    $(this).valid();

})

$(document).on("change", "#InputfileTravel0", function () {

    $(this).valid();

})

$(document).on("change", "#InputfileSecurity0", function () {

    $(this).valid();

})

$(document).on("change", "#InputfileCompany0", function () {

    $(this).valid();

})

$(document).on("change", "#InputfileBirthdate0", function () {

    $(this).valid();

})