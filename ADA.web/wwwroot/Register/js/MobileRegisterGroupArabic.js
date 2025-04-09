
var buttonAdd = $("#add-button");
var buttonRemove = $("#remove-button");
var className = ".dynamic-field";
var count = 0;
var field = "";
var maxFields = 5;
var NationalityArr = [];
var MemberCardCount=0;


$(document).ready(function () {
   
    GetAllDropDown();

    function totalFields() {

        return $(className).length;
    }
    function addNewField() {
        count = totalFields() + 1;
        debugger
        if (count >= MemberCardCount.membersCount+1) {
            swal({
                icon: "info",
                title: "تم تجاوز حد الأعضاء",
                text: "يمكنك إضافة الحد الأقصى " + MemberCardCount.membersCount +"  أفراد",
                buttons: [null, "موافق"],
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
            $("#FlieUAE").css({ "display": "block" });} else {

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

            var  dob = moment($("#OtherMembersNationalityBirthdate").val()).format("YYYY-MM-DD");
            
            if (dob != '') {

                var agemonths = moment().diff(moment(dob, 'YYYY-MM-DD'), 'month');
                debugger
                if (agemonths <= 6) {
                    swal({
                        icon: "info",
                        title: "انت رضيع!",
                        buttons: [null, "موافق"],
                        text: "لا يمكنك التسجيل كرئيس \n يجب أن يكون الرأس بالغًا",
                    });
                    $('#GroupMembersRegistration').hide();
                }
                else {
                    $('#GroupMembersRegistration').show();
                }                


            }

        },
        maxDate: new Date(),
        minDate: false,
        dateFormat: 'dd-M-yyyy'
    })


});



$("#GroupMembersRegistration").click(function (e) {


    if ($("#RegistrationGroupForms").valid()) {
        $('#preloader').show();
        var formData = new FormData();


        var DataArr = [];

        for (var i = 1; i <= $(className).length; i++) {
            var obj = {
                Language:"ar",
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
                IsHead: $(`#dynamic-field-${i}`).find(".IsHead").is(":checked"),
            }

            DataArr.push(obj);
        }


            formData.append("Language", "ar"),
            formData.append("Username", $("#PUsername").val()),
            formData.append("Password", $("#PPassword").val()),
            formData.append("IsDelmaIsland", $('#ActiveDelmaIsland').is(":checked"))
            formData.append("IsUAEId", $('#ActiveUAEID').is(":checked"))

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

        postRequestWithoutStringfy("https://hajzapi.ada.ae/api/Register/AddGroup", formData, function (res) {

            if (res.status == 200) {
                if (res.data && res.data != null) {
                    $('#preloader').hide();
                    swal(res.responseMsg, {
                        icon: "success",
                        title: "مسجل بنجاح",
                        buttons: [null, "موافق"],
                        dangerMode: false,
                        text: "يمكنك الآن تسجيل الدخول",
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
                swal(res.responseMsg, {
                    icon: "error",
                    title:"خطأ",
                    buttons: [null, "موافق"],
                    dangerMode: true,
                    text:"هناك خطأ ما!",
                });
            }
            if (res.status == 500) {
                $('#preloader').hide();
                swal({
                    icon: "error",
                    title: "خطأ",
                    buttons: [null, "موافق"],
                    dangerMode: true,
                    text:"هناك خطأ ما!",
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
                    title: "معلومات",
                    buttons: [null, "موافق"],
                    dangerMode: false,
                    text: res.responseMsg,
                })
            }

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
                email:true
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
                minlength: 9,
                maxlength: 9

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
                email: true,
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
                filesize: 2000000,
            },

            PDoc: {
                required: true,
                extension: "png|jpeg|jpg|doc|docx|pdf",
                filesize: 2000000,
            },

            SDoc: {
                required: true,
                extension: "png|jpeg|jpg|doc|docx|pdf",
                filesize: 2000000,
            },
            TDoc: {
                required: true,
                extension: "png|jpeg|jpg|doc|docx|pdf",
                filesize: 2000000,
            },
            BCDoc: {
                required: true,
                extension: "png|jpeg|jpg|doc|docx|pdf",
                filesize: 2000000,
            },

            CDoc: {
                required: true,
                extension: "png|jpeg|jpg|doc|docx|pdf",
                filesize: 2000000,
            },
            IsHead: {
                required: true,

            },


        },
        messages: {
            PGender: "هذه الخانة مطلوبه.",
            PName: "هذه الخانة مطلوبه.",
            OtherMembersEmail: {
                required: "هذه الخانة مطلوبه.",
                email: "رجاء قم بإدخال بريد الكتروني صحيح."
            },
            Nationality: "هذه الخانة مطلوبه.",
            PUsername: "هذه الخانة مطلوبه.",
            PPassword: {
                required: "هذه الخانة مطلوبه.",
                strongPassword: "يجب ألا يقل عدد الأحرف عن 8 إلى 20 حرفًا"
            },
            OtherMembersNationalityMobile: {
                required: "هذه الخانة مطلوبه.",
                minlength: "يجب أن يكون طول الجوال 9 أرقام",
                maxlength: "يجب أن يكون طول الجوال 9 أرقام",
            },
            PDocument: "هذه الخانة مطلوبه.",
            PDocumentType: "هذه الخانة مطلوبه.",
            OtherMembersGender: "هذه الخانة مطلوبه.",
            OtherMembersName: "هذه الخانة مطلوبه.",
            OtherMembersNationality: "هذه الخانة مطلوبه.",
            OtherMembersNationalityUsername: "هذه الخانة مطلوبه.",
            OtherMembersNationalityPassword: "هذه الخانة مطلوبه.",
            OtherMembersNationalityBirthdate: "هذه الخانة مطلوبه.",
            OtherMembersNationalityDocument: {
                required: "هذه الخانة مطلوبه:",
                onlyDigits: "الرجاء إدخال أرقام فقط.",
            },
            OtherMembersNationalityDocumentType: "هذه الخانة مطلوبه.",
            UDoc: {
                required: "هذه الخانة مطلوبه.",
                extension: "يرجى تحميل تنسيق ملف صالح",
                filesize: "الرجاء تحديد حجم الصورة أقل من 2 ميغا بايت"
            },
            PDoc: {
                required: "هذه الخانة مطلوبه.",
                extension: "يرجى تحميل تنسيق ملف صالح",
                filesize: "الرجاء تحديد حجم الصورة أقل من 2 ميغا بايت"
            },
            TDoc: {
                required: "هذه الخانة مطلوبه.",
                extension: "يرجى تحميل تنسيق ملف صالح",
                filesize: "الرجاء تحديد حجم الصورة أقل من 2 ميغا بايت"
            },
            CDoc: {
                required: "هذه الخانة مطلوبه.",
                extension: "يرجى تحميل تنسيق ملف صالح",
                filesize: "الرجاء تحديد حجم الصورة أقل من 2 ميغا بايت"
            },
            BCDoc: {
                required: "هذه الخانة مطلوبه.",
                extension: "يرجى تحميل تنسيق ملف صالح",
                filesize: "الرجاء تحديد حجم الصورة أقل من 2 ميغا بايت"
            },
            SDoc: {
                required: "هذه الخانة مطلوبه.",
                extension: "يرجى تحميل تنسيق ملف صالح",
                filesize: "الرجاء تحديد حجم الصورة أقل من 2 ميغا بايت"
            },
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

                    MemberCardCount = res.data.memberCount;
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
                title: "خطأ",
                dangerMode: true,
                text: "هناك خطأ ما!",
                buttons: [null, "موافق"],
            });
        }
        if (res.status == 500) {
            $('#preloader').hide();
            swal({
                icon: "error",
                title: "خطأ",
                dangerMode: true,
                text:  "هناك خطأ ما!",
                buttons: [null, "موافق"],
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
                title: "خطأ",
                dangerMode: true,
                text: "هناك خطأ ما!",
                buttons: [null, "موافق"],
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
                title: "خطأ",
                text: "هناك خطأ ما!",
                icon: "error",
                dangerMode: true,
                buttons: [null, "موافق"],
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
                title:  "خطأ",
                dangerMode: true,
                text:  "هناك خطأ ما!",
                buttons: [null, "موافق"],
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
                                        <label  class="fs-14 text-custom-black fw-500">عنوان</label><span class="required"> *</span>
                                        <select title="حدد العنوان" id="OtherMembersGender${count}" class="form-control selectpicker OtherMembersGender" name="OtherMembersGender${count}">
                                            
                                            <option value="Mr" name="Mr">السيد</option>
                                            <option value="Mrs" name="Mrs">السّيدة</option>
                                            <option value="MS" name="Ms">آنسة</option>

                                        </select>
                                    </div>
                                    </div>

                                    <div class="col-md-3">
                                    <div class="form-group">
                                        <label  class="fs-14 text-custom-black fw-500">اسم</label><span class="required"> *</span>
                                        <input maxlength="50" type="text" id="OtherMembersName${count}" class="form-control form-control-custom OtherMembersName" name="OtherMembersName${count} " placeholder="اسم">
                                    </div></div>

                                    <div class="col-md-3">
                                        <div class="form-group">
                                        <label  class="fs-14 text-custom-black fw-500">البريد الإلكتروني</label><span class="text-secondary"> (خياري)</span>
                                        <input maxlength="60" type="email" id="OtherMembersEmail${count}" class="form-control form-control-custom OtherMembersEmail" name="OtherMembersEmail${count}"placeholder="البريد الإلكتروني">
                                    </div></div>

                                    <div class="col-md-3">
                                         <div class="form-group">
                                        <label  class="fs-14 text-custom-black fw-500">جنسية</label><span class="required"> *</span>
                                        <select id="OtherMembersNationality${count}" name="OtherMembersNationality${count}" class="form-control OtherMembersNationality selectpicker" data-live-search="true" data-size="5" data-show-subtext="true" multiple data-max-options="1" title="اختر الجنسية">
                                        </select>
                                    </div></div>

                                </div>
                                <div class="row">
                                   
                                   

                                     <div class="col-md-3 form-group ">
                                         <label  class="fs-14 text-custom-black fw-500">تاريخ الميلاد <span class="required">*</span> </label>
                                         <div class="input-group group-form" style="position:relative">
                                             <input type="text" name="OtherMembersNationalityBirthdate${count}"  readonly="readonly" id="OtherMembersNationalityBirthdate${count}" class="form-control form-control-custom OtherMembersNationalityBirthdate OtherMembersBirthdateValidation" placeholder="دد-ممم-سسس" autocomplete="off" />
                                             <span class="input-group-append">
                                                 <i class="far fa-calendar"  style="position: absolute; left: 10px; top: 12px;"></i>
                                             </span>
                                         </div>
                                    </div>
                                

                                    <div class="col-md-3">
                                         <div class="form-group">
                                        <label  class="fs-14 text-custom-black fw-500">التليفون المحمول</label><span class="required"> *</span>
                                            <div class="input-group group-form" style="position:relative">
                                                <input style="padding-left:64px;padding-right:64px;z-index: auto;" type="tel" onkeypress="return isNumberKey(event)" id="OtherMembersNationalityMobile${count}" maxlength="9"   class="inputArabic form-control form-control-custom OtherMembersNationalityMobile" name="OtherMembersNationalityMobile${count}"placeholder="XXXXXXXXX">
                                                <span class="input-group-mask"style="position: absolute; top: 6px; right: 6px;">(+971) -</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-3">
                                         <div class="form-group">
                                        <label  class="fs-14 text-custom-black fw-500">رقم الهوية</label><span class="required"> *</span>
                                        <input  type="text" id="OtherMembersNationalityDocument${count}" maxlength="18" class="form-control form-control-custom OtherMembersNationalityDocuments" name="OtherMembersNationalityDocuments${count}" placeholder="رقم الهوية">
                                    </div>
                                    </div>

                                    <div class="col-md-3">
                                         <div class="form-group">
                                        <label  class="fs-14 text-custom-black fw-500">نوع الوثيقة</label><span class="required"> *</span>
                                        <select id="OtherMembersNationalityDocumentType${count}" class="form-control selectpicker OtherMembersNationalityDocumentType" name="OtherMembersNationalityDocumentType${count}" data-show-subtext="true" multiple data-live-search="true" title="حدد نوع المستند">
                                         <option value="U">الهوية الإماراتية</option>
                                         <option value="P">جواز سفر</option>
                                         <option value="T">معرف السفر</option>
                                         <option value="S">معرف الأمان</option>
                                         <option value="C">هوية الشركة</option>
                                         <option value="B">شهادة الميلاد</option>

                                     </select>

                             </div>
                             </div>

                               <div class="col-md-6 d-flex">
                                    <div class="form-check">
                                       
                                        <label class="custom-checkbox ">

                                            <input class="form-check-input RGActiveDelmaIsland" type="checkbox" value="">
                                            <span class="checkmark" ></span>
                                            <p class=" mb-0 mx-4"> هل أنت مقيم في دلما؟  </p>
                                        </label>
                                    </div>

                                </div>

                            </div>

                               <div class="row">

                                

                                   <div class="col-md-4" id="FlieUAE${count}" style="display:none;">
                                        <div class="form-group">
                                            <label class="fs-14 text-custom-black fw-500">تحميل الهوية الإماراتية</label> <span class="required">*</span>  <span class="extensionDoc"> (doc, docx, jpeg, jpg, png, pdf)</span>
                                            <input id="InputfileUAE${count}" style=" padding-top: 5px!important;" type="file"  class="form-control form-control-custom DocFile " name="Udoc${count}" />
                                        </div>
                                    </div>


                                    <div class="col-md-4" id="FliePasport${count}" style="display:none;">
                                        <div class="form-group">
                                            <label  class="fs-14 text-custom-black fw-500">تحميل جواز السفر</label> <span class="required">*</span>  <span class="extensionDoc"> (doc, docx, jpeg, jpg, png, pdf)</span>
                                            <input id="InputfilePassport${count}" style=" padding-top: 5px!important;" type="file"  class="form-control DocFile form-control-sm" name="Pdoc${count}" />
                                        </div>
                                    </div>


                                    <div class="col-md-4" id="FlieTravelID${count}" style="display:none;">
                                        <div class="form-group">
                                            <label  class="fs-14 text-custom-black fw-500">تحميل معرف السفر</label> <span class="required">*</span>  <span class="extensionDoc"> (doc, docx, jpeg, jpg, png, pdf)</span>
                                            <input id="InputfileTravel${count}" style=" padding-top: 5px!important;" type="file" class="form-control form-control-custom DocFile " name="Tdoc${count}" />
                                        </div>
                                    </div>


                                    <div class="col-md-4" id="FlieSecurityID${count}" style="display:none;">
                                        <div class="form-group">
                                            <label  class="fs-14 text-custom-black fw-500">تحميل معرف الأمان</label>
                                            <input id="InputfileSecurity${count}" style=" padding-top: 5px!important;" type="file"  class="form-control form-control-custom DocFile " name="Sdoc${count}" />
                                        </div>
                                    </div>

                                    <div class="col-md-4" id="FlieCompanyID${count}" style="display:none;">
                                        <div class="form-group">
                                            <label  class="fs-14 text-custom-black fw-500">تحميل معرف الشركة</label> <span class="required">*</span>  <span class="extensionDoc"> (doc, docx, jpeg, jpg, png, pdf)</span>
                                            <input id="InputfileCompany${count}" style=" padding-top: 5px!important;" type="file"  class="form-control form-control-custom  DocFile " name="Cdoc${count}"/>
                                        </div>
                                    </div>

                                    <div class="col-md-4" id="FlieBirthCertificate${count}" style="display:none;">
                                        <div class="form-group">
                                            <label class="fs-14 text-custom-black fw-500">تحميل شهادة الميلاد</label> <span class="required">*</span>  <span class="extensionDoc"> (doc, docx, jpeg, jpg, png, pdf)</span>
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


            var dob = moment($(`#OtherMembersNationalityBirthdate${count}`).val()).format('YYYY-MM-DD');

            if (dob != '') {

                var agemonths = moment().diff(moment(dob, 'YYYY-MM-DD'), 'month');
                debugger
                if (agemonths <= 6) {
                    swal({
                        icon: "info",
                        title: "أنت تختار رضيعًا",
                        text: "تحتاج إلى تحميل شهادة الميلاد",
                        buttons: [null, "موافق"],
                    });

                    talha.parent().parent().parent().next().find('.OtherMembersNationalityDocumentType:eq(1)').val("B").change().selectpicker('refresh');
                    talha.parent().parent().parent().next().find('.OtherMembersNationalityDocumentType:eq(1)').prev().find("[data-original-index=5]").addClass('disabled');
                    
                }
                else {
                    talha.parent().parent().parent().next().find('.OtherMembersNationalityDocumentType:eq(1)').val("0").change().selectpicker('refresh');
                    talha.parent().parent().parent().next().find('.OtherMembersNationalityDocumentType:eq(1)').prev().find("[data-original-index=5]").removeClass('disabled');
                }


            }

        },
        maxDate: new Date(),
        minDate: false,
        dateFormat: 'dd-M-yyyy'
    });

    fillData(NationalityArr, "#temp_Nationality", `#OtherMembersNationality${count}`, true);

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
            debugger
            $(`#FlieBirthCertificate${count}`).css({ "display": "block" });


        } else {

            $(`#FlieBirthCertificate${count}`).css({ "display": "none" });
            $(`#InputfileBirthdate${count}`).val(null).next().remove();

        }

        $(this).valid();
    });

    $(".OtherMembersNationality").selectpicker("refresh");
    $(".selectpicker").selectpicker("render");

    $(document).on("change", `#OtherMembersNationality${count}`, function () {

        $(this).valid();

    });

    $(document).on("change", `#OtherMembersNationality${count}`, function () {

        $(this).valid();

    });

    $(document).on("change", `#OtherMembersGender${count}`, function () {

        $(this).valid();

    });

    ValidationRuntime();

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
                        required: "هذه الخانة مطلوبه.",
                    }
                });
        });

        $('.OtherMembersGender').each(function () {
            $(this).rules("add",
                {
                    required: true,
                    messages: {
                        required: "هذه الخانة مطلوبه.",
                    }
                });
        });

        $('.OtherMembersEmail').each(function () {
            $(this).rules("add",
                {
                    required: true,
                    email: true,
                    messages: {
                        required: "هذه الخانة مطلوبه.",
                        email: "رجاء قم بإدخال بريد الكتروني صحيح."
                    },
                });
        });

        $('.OtherMembersNationality').each(function () {
            $(this).rules("add",
                {
                    required: true,
                    messages: {
                        required: "هذه الخانة مطلوبه.",
                    }
                });
        });

        $('.OtherMembersNationalityBirthdate').each(function () {
            $(this).rules("add",
                {
                    required: true,
                    messages: {
                        required: "هذه الخانة مطلوبه.",
                    }
                });
        });

        $('.OtherMembersNationalityMobile').each(function () {
            $(this).rules("add",
                {
                    required: true,
                    minlength: 9,
                    maxlength: 9,
                    messages: {
                        required: "هذه الخانة مطلوبه.",
                        minlength: "يجب أن يكون طول الجوال 9 أرقام",
                        maxlength: "يجب أن يكون طول الجوال 9 أرقام",
                    },

                });
        });

        $('.OtherMembersNationalityDocuments').each(function () {
            $(this).rules("add",
                {
                    required: true,
                    onlyDigits: true,
                    messages: {
                        required: "هذه الخانة مطلوبه:",
                        onlyDigits: "الرجاء إدخال أرقام فقط.",
                    },
                });
        });

        $('.OtherMembersNationalityDocumentType').each(function () {
            $(this).rules("add",
                {
                    required: true,
                    messages: {
                        required: "هذه الخانة مطلوبه.",
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
                        required: "هذه الخانة مطلوبه.",
                        extension: "يرجى تحميل تنسيق ملف صالح",
                        filesize: "الرجاء تحديد حجم الصورة أقل من 2 ميغا بايت"
                    }
                });
        });
    }


$(document).on("change", "#OtherMembersNationality", function () {

    $(this).valid();

})


$(document).on("change", "#OtherMembersNationalityDocumentType", function () {

    $(this).valid();

})
$(document).on("change", "#OtherMembersNationalityDocumentType", function () {

    $(this).valid();

})

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