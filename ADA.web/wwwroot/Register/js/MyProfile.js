﻿
var ApiUrl ='';
var baseWebUrl = $("#baseWebUrl").val();
var LoginMember = JSON.parse(window.localStorage.getItem('userData'));
var btnEdit = ".editbtn";
var UserId = JSON.parse(window.localStorage.getItem('userData')).id;
var MembersTable = "#membersTable"
var otherMembers = [];
var SingleMemberId;
var IfArabic = window.localStorage.language == 'ar';
var MemberType = JSON.parse(window.localStorage.getItem('userData')).registerType;
var Language = window.localStorage.language;
var ArabicDOB;
var AddMemberBirthdate;
var GLobalDocumentFile = [];


$(document).ready(function () {



    ApiUrl = $("#baseApiUrl").val();
    LoginMember.registerType == 'Corporate' ? $('.GGovermentEntity').css({ "display": "block" }) : $('.GGovermentEntity').css({ "display": "none" });
    GetAllDropDown();

    $(document).on('change', '.NewMemberDocumentType', function () {

        debugger

        if ($('.NewMemberDocumentType').selectpicker("val").some(x => x == "U")) {
            $("#NewFlieUAE").show();

        }
        else {

            $("#NewFlieUAE").css({ "display": "none" });
            $('#NewMemberfiles1').val(null);
            $('#NewMemberfiles1-error').hide();

        }

        if ($('.NewMemberDocumentType').selectpicker("val").some(x => x == "P")) {

            $("#NewFliePasport").show();

        }
        else {

            $("#NewFliePasport").css({ "display": "none" });
            $('#NewMemberfiles2').val(null);
            $('#NewMemberfiles2-error').hide();
        }
        if ($('.NewMemberDocumentType').selectpicker("val").some(x => x == "T")) {
            $("#NewFlieTravelID").show();

        }
        else {

            $("#NewFlieTravelID").hide();
            $('#NewMemberfiles3').val(null);
            $('#NewMemberfiles3-error').hide();

        }
        if ($('.NewMemberDocumentType').selectpicker("val").some(x => x == "S")) {
            $("#NewFlieSecurityID").show();

        }
        else {

            $("#NewFlieSecurityID").hide();
            $('#NewMemberfiles4').val(null);
            $('#NewMemberfiles4-error').hide();
        }

        if ($('.NewMemberDocumentType').selectpicker("val").some(x => x == "C")) {
            $("#NewFlieCompanyID").show();

        } else {

            $("#NewFlieCompanyID").hide();
            $('#NewMemberfiles5').val(null);
            $('#NewMemberfiles5-error').hide();
        }

        if ($('.NewMemberDocumentType').selectpicker("val").some(x => x == "B")) {

            $("#NewFlieBirthCertificate").show();

        } else {

            $("#NewFlieBirthCertificate").hide();
            $('#NewMemberfiles6').val(null);
            $('#NewMemberfiles6-error').hide();
        }



    });

   

    $(".Nationality").change(function () {

        $(this).valid();

    });

    $('#Birthdate').datepicker({
        onSelect: function () {
            debugger
            if ($('#Birthdate').val() == '') {

                $('#Birthdate').val("");
            }
            else {
                if (IfArabic) {
                    //CalenderBirthdate()
                    $("#Birthdate").val(moment($("#Birthdate").val(), "DD-MMM-YYYY").locale("ar").format("DD-MMM-YYYY"));

                    dob = moment($("#Birthdate").val(), "DD-MMM-YYYY").locale("en").format("YYYY-MM-DD");
                }
                else {

                    dob =$("#Birthdate").val();
                }


                if (dob != '') {

                    var agemonths = moment().diff(dob, 'month')


                    if (agemonths <= 6) {
                        swal({
                            icon: "info",
                            title: IfArabic ? "أنت رضيع" : "You are an infant",
                            text: IfArabic ? "غير مسموح بالتسجيل" : "Registration not allowed.",
                            buttons: [null, IfArabic ? "موافق" : "OK"],
                        });

                        $('#UpdateUser').hide();
                    }
                    else {
                        $('#UpdateUser').show();
                    }


                }

            }
         },
        closeText: 'Clear',
        Default: true,
        timepicker: false,
        minDate: false,
        maxDate: new Date(),
        dateFormat: 'dd-M-yyyy'
    });
    
    $('#NewMemberBirthdate').datepicker({
        onSelect: function () {

            if (MemberType == 'Corporate') {

                if ($('#NewMemberBirthdate').val() == '') {

                    $('#NewMemberBirthdate').val("");
                }
                else {

                    if (IfArabic) {

                        $("#NewMemberBirthdate").val(moment($("#NewMemberBirthdate").val(), "DD-MMM-YYYY").locale("ar").format("DD-MMM-YYYY"));

                        dob = moment($("#NewMemberBirthdate").val(), "DD-MMM-YYYY").locale("en").format("YYYY-MM-DD");
                    }
                    else {
                        dob = moment($('#NewMemberBirthdate').val()).format('YYYY-MM-DD');
                    }

                    debugger
                    if (dob != '') {

                        var agemonths = moment().diff(moment(dob, 'YYYY-MM-DD'), 'month');

                        if (agemonths <= 6) {

                            swal({
                                icon: "warning",
                                title: IfArabic ? "انت رضيع!" : "You are an infant!",
                                buttons: [null, IfArabic ? "موافق" : "OK"],
                                text: IfArabic ? "غير مسموح تسجيل الرضيع من قبل الهيئات" : "Infant registration is not allowed for Corporate users.",
                            });

                            $("#RegisterOther").hide();



                        }
                        else {

                            $("#RegisterOther").show();

                        }


                    }

                }

            }

              else if (MemberType == 'Group') {

                if ($('#NewMemberBirthdate').val() == '') {

                    $('#NewMemberBirthdate').val("");
                }
                else {

                    if (IfArabic) {

                        $("#NewMemberBirthdate").val(moment($("#NewMemberBirthdate").val(), "DD-MMM-YYYY").locale("ar").format("DD-MMM-YYYY"));

                        dob = moment($("#NewMemberBirthdate").val(), "DD-MMM-YYYY").locale("en").format("YYYY-MM-DD");
                    }
                    else {
                        dob = moment($('#NewMemberBirthdate').val()).format('YYYY-MM-DD');
                    }

                    debugger
                    if (dob != '') {

                        var agemonths = moment().diff(moment(dob, 'YYYY-MM-DD'), 'month');

                        if (agemonths <= 6) {

                            swal({
                                icon: "info",
                                title: IfArabic ? "مسجل بنجاح" : "You select an infant",
                                buttons: [null, IfArabic ? "موافق" : "OK"],

                                text: IfArabic ? "يرجى تحميل صورة عن شهادة الميلاد" : "Please upload Birth Certificate.",
                            });

                            $("#NewMemberDocumentType").val("B").change().selectpicker('refresh');
                            $('#NewMemberDocumentType').prev().children().find("[data-original-index=5]").addClass("disabled")
                        }
                        else {

                            $("#NewMemberDocumentType").val("0").change().selectpicker('refresh');
                            $('#NewMemberDocumentType').prev().children().find("[data-original-index=5]").removeClass("disabled")
                        }


                    }

                }
            }
         },
        closeText: 'Clear',
        Default: true,
        timepicker: false,
        minDate: false,
        maxDate: new Date(),
        dateFormat: 'dd-M-yyyy'
    });

    $('#modalOtherMembersNationalityBirthdate').datepicker({
        onSelect: function () {
            debugger

            if ($('#modalOtherMembersNationalityBirthdate').val() == '') {

                $('#modalOtherMembersNationalityBirthdate').val("");
            }

            else {

                if (IfArabic) {

                    $("#modalOtherMembersNationalityBirthdate").val(moment($("#modalOtherMembersNationalityBirthdate").val(), "DD-MMM-YYYY").locale("ar").format("DD-MMM-YYYY"));
                    dob = moment($("#modalOtherMembersNationalityBirthdate").val(), "DD-MMM-YYYY").locale("en").format("YYYY-MM-DD");
                }
                else {
                    dob = moment($('#modalOtherMembersNationalityBirthdate').val()).locale('en').format('YYYY-MM-DD');

                }

                debugger
                if (dob != '') {

                    var agemonths = moment().diff(moment(dob, 'YYYY-MM-DD'), 'month');

                    if (agemonths <= 6) {
                        if ($(".modalIsHead").prop("checked")) {
                            swal({
                                icon: "info",
                                title: IfArabic ? "أنت رضيع" : "You are an infant",
                                buttons: [null, IfArabic ? "موافق" : "OK"],

                                text: IfArabic ? "لا يسمح بتسجيل الرضع على المجموعة أو الهيئات" : "Infant registration for Group or Corporate profile is not allowed.",
                            });

                            $("#GroupUpdateButton").hide();
                        }
                        else {
                            swal({
                                icon: "info",
                                title: IfArabic ? "مسجل بنجاح" : "You select an infant",
                                buttons: [null, IfArabic ? "موافق" : "OK"],
                                text: IfArabic ? "يرجى تحميل صورة عن شهادة الميلاد" : "Please upload Birth Certificate.",
                            });
                           
                            if ($('#modalOtherMembersNationalityDocumentType').prev().children().find("[data-original-index=5]").hasClass("selected")) {
                                debugger
                                $('#modalOtherMembersNationalityDocumentType').prev().children().find("[data-original-index=5]").addClass("disabled");
                                $("#GroupUpdateButton").show();
                            }
                            else {
                                $('#modalOtherMembersNationalityDocumentType').prev().children().find("[data-original-index=5]").click();
                                $('#modalOtherMembersNationalityDocumentType').prev().children().find("[data-original-index=5]").addClass("disabled");
                            }
                            

                        }
                    }
                    else {
                        if ($(".modalIsHead").prop("checked") != true) {

                            if (moment().diff(dob, 'month') <= 6) {

                                $('#modalOtherMembersNationalityDocumentType').prev().children().find("[data-original-index=5]").click();
                                $('#modalOtherMembersNationalityDocumentType').prev().children().find("[data-original-index=5]").addClass("disabled");
                            }
                            else {

                                if ($('#modalOtherMembersNationalityDocumentType').prev().children().find("[data-original-index=5]").hasClass("selected"))
                                {
                                    $('#modalOtherMembersNationalityDocumentType').prev().children().find("[data-original-index=5]").removeClass("disabled");
                                    //$('#modalOtherMembersNationalityDocumentType').prev().children().find("[data-original-index=5]").click();
                                    
                                }
                            }
                        }

                        //$("#GroupUpdateButton").show();

                        //$('#modalOtherMembersNationalityBirthdate').next().parent().parent().parent().next().next().next().children().find("select").val("0").change().selectpicker('refresh');

                        //$('#modalOtherMembersNationalityDocumentType').prev().children().find("[data-original-index=5]").removeClass("disabled")


                    }


                }


           

               
            }
        },
        closeText: 'Clear',
        Default: true,
        timepicker: false,
        minDate: false,
        maxDate: new Date(),
        dateFormat: 'dd-M-yyyy'
    });


    $('#CorporatemodalOtherMembersNationalityBirthdate').datepicker({
        onSelect: function () {
            debugger

            if ($('#CorporatemodalOtherMembersNationalityBirthdate').val() == '') {

                $('#CorporatemodalOtherMembersNationalityBirthdate').val("");
            }
            else 
            {

            if (IfArabic) {


                $("#CorporatemodalOtherMembersNationalityBirthdate").val(moment($("#CorporatemodalOtherMembersNationalityBirthdate").val(), "DD-MMM-YYYY").locale("ar").format("DD-MMM-YYYY"));

                dob = moment($("#CorporatemodalOtherMembersNationalityBirthdate").val(), "DD-MMM-YYYY").locale("en").format("YYYY-MM-DD");


            }
            else {

                dob = moment($('#CorporatemodalOtherMembersNationalityBirthdate').val()).format('YYYY-MM-DD');
            }

            debugger
            if (dob != '') {

                var agemonths = moment().diff(moment(dob, 'YYYY-MM-DD'), 'month');

                if (agemonths <= 6) {
                    swal({
                        icon: "warning",
                        title: IfArabic ? "انت رضيع!" : "You are an infant!",
                        buttons: [null, IfArabic ? "موافق" : "OK"],
                        text: IfArabic ? "غير مسموح تسجيل الرضيع من قبل الهيئات" : "Infant registration is not allowed for Corporate users.",
                    });

                    $("#CorporateUpdateButton").hide();
                    // $('#modalOtherMembersNationalityBirthdate').next().parent().parent().parent().next().next().children().children().children().children().next().next().val("B").change().selectpicker('refresh');


                }
                else {

                    $("#CorporateUpdateButton").show();
                    //$('#modalOtherMembersNationalityBirthdate').next().parent().parent().parent().next().next().children().children().children().children().next().next().val("0").change().selectpicker('refresh');



                }


            }

        }
        },
        closeText: 'Clear',
        Default: true,
        timepicker: false,
        minDate: false,
        maxDate: new Date(),
        dateFormat: 'dd-M-yyyy'
    });



    $(document).on("click", "#SeeDocuments", function () {

        let Id = Number($(this).attr("data-id"));

        if (Id > 0) {

            GetDocumentIndividualByUserId(Id);
        }

    });




    $(".DocumentType").on('change', function () {

        var dataarr = [];


        dataarr = $(".DocumentType");


        if (dataarr == undefined) {

            dataarr = [""];

        }

        if ($('.DocumentType').selectpicker("val").some(x => x == "U")) {
            debugger
            $("#FlieUAE").css({ "display": "block" });
            if ($('#fileLabel').text().length > 15) {
                $("#files1").rules('remove', 'required');
            }
            else {
                $("#files1").rules('add', 'required');

            }
        }
        else {

            $("#FlieUAE").css({ "display": "none" });
            $("#FlieUAE").children().children().find("img").attr("src", "").prev().prev().text('Choose file')
            $("#files1").val(null);
            $('#files1-error').hide();
            
        }

        if ($('.DocumentType').selectpicker("val").some(x => x == "P")) {
            $("#FliePasport").css({ "display": "block" });
            if ($('#fileLabel2').text().length > 15) {
                $("#files2").rules('remove', 'required');
            }
            else {
                $("#files2").rules('add', 'required');

            }

        }
        else {

            $("#FliePasport").css({ "display": "none" });
            $("#FliePasport").children().children().find("img").attr("src", "").prev().prev().text('Choose file')
            $("#files2").val(null);
            $('#files2-error').hide();
        }


        if ($('.DocumentType').selectpicker("val").some(x => x == "T")) {
            $("#FlieTravelID").css({ "display": "block" });
            if ($('#fileLabel3').text().length > 15) {
                $("#files3").rules('remove', 'required');
            }
            else {
                $("#files3").rules('add', 'required');

            }

        }
        else {

            $("#FlieTravelID").css({ "display": "none" });
            $("#FlieTravelID").children().children().find("img").attr("src", "").prev().prev().text('Choose file')
            $("#files3").val(null);
            $('#files3-error').hide();
        }


        if ($('.DocumentType').selectpicker("val").some(x => x == "S")) {
            $("#FlieSecurityID").css({ "display": "block" })
            if ($('#fileLabel4').text().length > 15) {
                $("#files4").rules('remove', 'required');
            }
            else {
                $("#files4").rules('add', 'required');

            }
        }
        else {

            $("#FlieSecurityID").css({ "display": "none" });
            $("#FlieSecurityID").children().children().find("img").attr("src", "").prev().prev().text('Choose file')
            $("#files4").val(null);
            $('#files4-error').hide();
        }

        if ($('.DocumentType').selectpicker("val").some(x => x == "C")) {
            $("#FlieCompanyID").css({ "display": "block" })
            if ($('#fileLabel5').text().length > 15) {
                $("#files5").rules('remove', 'required');
            }
            else {
                $("#files5").rules('add', 'required');

            }
        }
        else {

            $("#FlieCompanyID").css({ "display": "none" });
            $("#FlieCompanyID").children().children().find("img").attr("src", "").prev().prev().text('Choose file')
            $("#files5").val(null);
            $('#files5-error').hide();
        }

        if ($('.DocumentType').selectpicker("val").some(x => x == "B")) {
            $("#FlieBirthCertificate").css({ "display": "block" })
            if ($('#fileLabel6').text().length > 15) {
                $("#files6").rules('remove', 'required');
            }
            else {
                $("#files6").rules('add', 'required');

            }
        }
        else {

            $("#FlieBirthCertificate").css({ "display": "none" });
            $("#FlieBirthCertificate").children().children().find("img").attr("src", "").prev().prev().text('Choose file')
            $("#files6").val(null);
            $('#files6-error').hide();
        }


        SetIndividualUserDocumenteByEditOnSelectPicker(dataarr)

    });

    $("#files1").change(function () {
        var a = document.getElementById('files1');
        if (a.value == "") {
            fileLabel.innerHTML = "Choose file";
        }
        else {
            var theSplit = a.value.split('\\');
            fileLabel.innerHTML = theSplit[theSplit.length - 1];
        }
    });

    $("#files2").change(function () {
        var a = document.getElementById('files2');
        if (a.value == "") {
            fileLabel2.innerHTML = "Choose file";
        }
        else {
            var theSplit = a.value.split('\\');
            fileLabel2.innerHTML = theSplit[theSplit.length - 1];
        }
    });

    $("#files3").change(function () {
        var a = document.getElementById('files3');
        if (a.value == "") {
            fileLabel3.innerHTML = "Choose file";
        }
        else {
            var theSplit = a.value.split('\\');
            fileLabel3.innerHTML = theSplit[theSplit.length - 1];
        }
    });

    $("#files4").change(function () {
        var a = document.getElementById('files4');
        if (a.value == "") {
            fileLabel4.innerHTML = "Choose file";
        }
        else {
            var theSplit = a.value.split('\\');
            fileLabel4.innerHTML = theSplit[theSplit.length - 1];
        }
    });

    $("#files5").change(function () {
        var a = document.getElementById('files5');
        if (a.value == "") {
            fileLabel5.innerHTML = "Choose file";
        }
        else {
            var theSplit = a.value.split('\\');
            fileLabel5.innerHTML = theSplit[theSplit.length - 1];
        }
    });

    $("#files6").change(function () {
        var a = document.getElementById('files6');
        if (a.value == "") {
            fileLabel6.innerHTML = "Choose file";
        }
        else {
            var theSplit = a.value.split('\\');
            fileLabel6.innerHTML = theSplit[theSplit.length - 1];
        }
    });



    $(document).on('change', '.modalOtherMembersNationalityBirthdate', function () {
        var dob = $(this).val();
        if (dob != '') {

            var agemonths = moment().diff(moment(dob, 'YYYY-MM-DD'), 'month');

            if (agemonths <= 6) {


                swal({
                    icon: "info",
                    title: IfArabic ? "مسجل بنجاح" : "You select an infant",
                    text: IfArabic ? "يرجى تحميل صورة عن شهادة الميلاد" : "Please upload Birth Certificate.",
                    buttons: [null, IfArabic ? "موافق" : "OK"],
                });
                debugger
                $(this).parent().parent().parent().next().find('.modalOtherMembersNationalityDocumentType:eq(1)').val("B").change();
                



            }
            else {
                $(this).parent().parent().parent().next().find('.modalOtherMembersNationalityDocumentType:eq(1)').val("0").change();
              

            }

        }
    });

    $("#modalOtherMembersNationalityDocumentType").on('change', function () {
        debugger
        var dataarr = [];


        dataarr = $(this).val();


        if (dataarr == undefined) {

            dataarr = [""];

        }
        if (dataarr.some(x => x == "U")) {
            $("#ModalGroupFlieUAE").css({ "display": "block" });
            if ($('#ModalGroupfileLabel').text().length > 15) {
                $("#ModalGroupfiles1").rules('remove', 'required');
            }
            else {
                $("#ModalGroupfiles1").rules('add', 'required');

            }

        }
        else {

            $("#ModalGroupFlieUAE").css({ "display": "none" });
            $("#ModalGroupFlieUAE").children().children().find("img").attr("src", "").prev().prev().text('Choose file')
            $("#ModalGroupfiles1").val(null);
            $('#ModalGroupfiles1-error').hide()

        }

        if (dataarr.some(x => x == "P")) {
            $("#ModalGroupFliePasport").css({ "display": "block" });
            if ($('#ModalGroupfileLabel2').text().length > 15) {
                $("#ModalGroupfiles2").rules('remove', 'required');
            }
            else {
                $("#ModalGroupfiles2").rules('add', 'required');

            }

        }
        else {

            $("#ModalGroupFliePasport").css({ "display": "none" });
            $("#ModalGroupFliePasport").children().children().find("img").attr("src", "").prev().prev().text('Choose file')
            $("#ModalGroupfiles2").val(null);
            $('#ModalGroupfiles2-error').hide()

        }


        if (dataarr.some(x => x == "T")) {
            $("#ModalGroupFlieTravelID").css({ "display": "block" })
            if ($('#ModalGroupfileLabel3').text().length > 15) {
                $("#ModalGroupfiles3").rules('remove', 'required');
            }
            else {
                $("#ModalGroupfiles3").rules('add', 'required');

            }
        }
        else {

            $("#ModalGroupFlieTravelID").css({ "display": "none" });
            $("#ModalGroupFlieTravelID").children().children().find("img").attr("src", "").prev().prev().text('Choose file')
            $("#ModalGroupfiles3").val(null);
            $('#ModalGroupfiles3-error').hide()

        }


        if (dataarr.some(x => x == "S")) {
            $("#ModalGroupFlieSecurityID").css({ "display": "block" });
            if ($('#ModalGroupfileLabel4').text().length > 15) {
                $("#ModalGroupfiles4").rules('remove', 'required');
            }
            else {
                $("#ModalGroupfiles4").rules('add', 'required');

            }

        }
        else {

            $("#ModalGroupFlieSecurityID").css({ "display": "none" });
            $("#ModalGroupFlieSecurityID").children().children().find("img").attr("src", "").prev().prev().text('Choose file')
            $("#ModalGroupfiles4").val(null);
            $('#ModalGroupfiles4-error').hide()

        }

        if (dataarr.some(x => x == "C")) {
            $("#ModalGroupFlieCompanyID").css({ "display": "block" });
            if ($('#ModalGroupfileLabel5').text().length > 15) {
                $("#ModalGroupfiles5").rules('remove', 'required');
            }
            else {
                $("#ModalGroupfiles5").rules('add', 'required');

            }

        }
        else {

            $("#ModalGroupFlieCompanyID").css({ "display": "none" });
            $("#ModalGroupFlieCompanyID").children().children().find("img").attr("src", "").prev().prev().text('Choose file')
            $("#ModalGroupfiles5").val(null);
            $('#ModalGroupfiles5-error').hide()

        }

        if (dataarr.some(x => x == "B")) {
            $("#ModalGroupFlieBirthCertificate").css({ "display": "block" });
            if ($('#ModalGroupfileLabel6').text().length > 15) {
                $("#ModalGroupfiles6").rules('remove', 'required');
            }
            else {
                $("#ModalGroupfiles6").rules('add', 'required');

            }

        }
        else {

            $("#ModalGroupFlieBirthCertificate").css({ "display": "none" });
            $("#ModalGroupFlieBirthCertificate").children().children().find("img").attr("src", "").prev().prev().text('Choose file')
            $("#ModalGroupfiles6").val(null);
            $('#ModalGroupfiles6-error').hide()

        }

        SetUserDocumenteByEditOnSelectPicker(dataarr);
    });


    $("#ModalGroupfiles1").change(function () {
        var a = document.getElementById('ModalGroupfiles1');
        if (a.value == "") {
            ModalGroupfileLabel.innerHTML = "Choose file";
        }
        else {
            var theSplit = a.value.split('\\');
            ModalGroupfileLabel.innerHTML = theSplit[theSplit.length - 1];
        }
    });

    $("#ModalGroupfiles2").change(function () {
        var a = document.getElementById('ModalGroupfiles2');
        if (a.value == "") {
            ModalGroupfileLabel2.innerHTML = "Choose file";
        }
        else {
            var theSplit = a.value.split('\\');
            ModalGroupfileLabel2.innerHTML = theSplit[theSplit.length - 1];
        }
    });

    $("#ModalGroupfiles3").change(function () {
        var a = document.getElementById('ModalGroupfiles3');
        if (a.value == "") {
            ModalGroupfileLabel3.innerHTML = "Choose file";
        }
        else {
            var theSplit = a.value.split('\\');
            ModalGroupfileLabel3.innerHTML = theSplit[theSplit.length - 1];
        }
    });

    $("#ModalGroupfiles4").change(function () {
        var a = document.getElementById('ModalGroupfiles4');
        if (a.value == "") {
            ModalGroupfileLabel4.innerHTML = "Choose file";
        }
        else {
            var theSplit = a.value.split('\\');
            ModalGroupfileLabel4.innerHTML = theSplit[theSplit.length - 1];
        }
    });

    $("#ModalGroupfiles5").change(function () {
        debugger
        var a = document.getElementById('ModalGroupfiles5');
        if (a.value == "") {
            ModalGroupfileLabel5.innerHTML = "Choose file";
        }
        else {
            var theSplit = a.value.split('\\');
            ModalGroupfileLabel5.innerHTML = theSplit[theSplit.length - 1];
        }
    });

    $("#ModalGroupfiles6").change(function () {
        var a = document.getElementById('ModalGroupfiles6');
        if (a.value == "") {
            ModalGroupfileLabel6.innerHTML = "Choose file";
        }
        else {
            var theSplit = a.value.split('\\');
            ModalGroupfileLabel6.innerHTML = theSplit[theSplit.length - 1];
        }
    });





    $("#CorporatemodalOtherMembersNationalityDocumentType").on('change', function () {

        var dataarr = $(this).val();


        if (dataarr == undefined) {

            dataarr = [""];

        }
        if (dataarr.some(x => x == "U")) {
            $("#CorporateModalGroupFlieUAE").css({ "display": "block" });
            if ($('#CorporateModalGroupfileLabel').text().length > 15) {
                $("#CorporateModalGroupfiles1").rules('remove', 'required');
            }
            else {
                $("#CorporateModalGroupfiles1").rules('add', 'required');

            }


        }
        else {

            $("#CorporateModalGroupFlieUAE").css({ "display": "none" });
            $("#CorporateModalGroupFlieUAE").children().children().find("img").attr("src", "").prev().prev().text('Choose file')
            $("#CorporateModalGroupfiles1").val(null);
            $('#CorporateModalGroupfiles1-error').hide();
        }

        if (dataarr.some(x => x == "P")) {
            $("#CorporateModalGroupFliePasport").css({ "display": "block" });
            if ($('#CorporateModalGroupfileLabel2').text().length > 15) {
                $("#CorporateModalGroupfiles2").rules('remove', 'required');
            }
            else {
                $("#CorporateModalGroupfiles2").rules('add', 'required');

            }

        }
        else {

            $("#CorporateModalGroupFliePasport").css({ "display": "none" });
            $("#CorporateModalGroupFliePasport").children().children().find("img").attr("src", "").prev().prev().text('Choose file')
            $("#CorporateModalGroupfiles2").val(null);
            $('#CorporateModalGroupfiles2-error').hide();
        }

        if (dataarr.some(x => x == "T")) {
            $("#CorporateModalGroupFlieTravelID").css({ "display": "block" });
            if ($('#CorporateModalGroupfileLabel3').text().length > 15) {
                $("#CorporateModalGroupfiles3").rules('remove', 'required');
            }
            else {
                $("#CorporateModalGroupfiles3").rules('add', 'required');

            }

        }
        else {

            $("#CorporateModalGroupFlieTravelID").css({ "display": "none" });
            $("#CorporateModalGroupFlieTravelID").children().children().find("img").attr("src", "").prev().prev().text('Choose file')
            $("#CorporateModalGroupfiles3").val(null);
            $('#CorporateModalGroupfiles3-error').hide();
        }

        if (dataarr.some(x => x == "S")) {
            $("#CorporateModalGroupFlieSecurityID").css({ "display": "block" });
            if ($('#CorporateModalGroupfileLabel4').text().length > 15) {
                $("#CorporateModalGroupfiles4").rules('remove', 'required');
            }
            else {
                $("#CorporateModalGroupfiles4").rules('add', 'required');

            }

        }
        else {

            $("#CorporateModalGroupFlieSecurityID").css({ "display": "none" });
            $("#CorporateModalGroupFlieSecurityID").children().children().find("img").attr("src", "").prev().prev().text('Choose file')
            $("#CorporateModalGroupfiles4").val(null);
            $('#CorporateModalGroupfiles4-error').hide();
        }

        if (dataarr.some(x => x == "C")) {
            $("#CorporateModalGroupFlieCompanyID").css({ "display": "block" });
            if ($('#CorporateModalGroupfileLabel5').text().length > 15) {
                $("#CorporateModalGroupfiles5").rules('remove', 'required');
            }
            else {
                $("#CorporateModalGroupfiles5").rules('add', 'required');

            }

        }
        else {

            $("#CorporateModalGroupFlieCompanyID").css({ "display": "none" });
            $("#CorporateModalGroupFlieCompanyID").children().children().find("img").attr("src", "").prev().prev().text('Choose file')
            $("#CorporateModalGroupfiles5").val(null);
            $('#CorporateModalGroupfiles5-error').hide();
        }

        if (dataarr.some(x => x == "B")) {
            $("#CorporateModalGroupFlieBirthCertificate").css({ "display": "block" });
            if ($('#CorporateModalGroupfileLabel6').text().length > 15) {
                $("#CorporateModalGroupfiles6").rules('remove', 'required');
            }
            else {
                $("#CorporateModalGroupfiles6").rules('add', 'required');

            }

        }
        else {

            $("#CorporateModalGroupFlieBirthCertificate").css({ "display": "none" });
            $("#CorporateModalGroupFlieBirthCertificate").children().children().find("img").attr("src", "").prev().prev().text('Choose file')
            $("#CorporateModalGroupfiles6").val(null);
            $('#CorporateModalGroupfiles6-error').hide();
        }
        SetCorporateUserDocumenteByEditOnSelectPicker(dataarr);
    });


    $("#CorporateModalGroupfiles1").change(function () {
        var a = document.getElementById('CorporateModalGroupfiles1');
        if (a.value == "") {
            CorporateModalGroupfileLabel.innerHTML = "Choose file";
        }
        else {
            var theSplit = a.value.split('\\');
            CorporateModalGroupfileLabel.innerHTML = theSplit[theSplit.length - 1];
        }
    });

    $("#CorporateModalGroupfiles2").change(function () {
        var a = document.getElementById('CorporateModalGroupfiles2');
        if (a.value == "") {
            CorporateModalGroupfileLabel2.innerHTML = "Choose file";
        }
        else {
            var theSplit = a.value.split('\\');
            CorporateModalGroupfileLabel2.innerHTML = theSplit[theSplit.length - 1];
        }
    });

    $("#CorporateModalGroupfiles3").change(function () {
        var a = document.getElementById('CorporateModalGroupfiles3');
        if (a.value == "") {
            CorporateModalGroupfileLabel3.innerHTML = "Choose file";
        }
        else {
            var theSplit = a.value.split('\\');
            CorporateModalGroupfileLabel3.innerHTML = theSplit[theSplit.length - 1];
        }
    });

    $("#CorporateModalGroupfiles4").change(function () {
        var a = document.getElementById('CorporateModalGroupfiles4');
        if (a.value == "") {
            CorporateModalGroupfileLabel4.innerHTML = "Choose file";
        }
        else {
            var theSplit = a.value.split('\\');
            CorporateModalGroupfileLabel4.innerHTML = theSplit[theSplit.length - 1];
        }
    });

    $("#CorporateModalGroupfiles5").change(function () {
        var a = document.getElementById('CorporateModalGroupfiles5');
        if (a.value == "") {
            CorporateModalGroupfileLabel5.innerHTML = "Choose file";
        }
        else {
            var theSplit = a.value.split('\\');
            CorporateModalGroupfileLabel5.innerHTML = theSplit[theSplit.length - 1];
        }
    });

    $("#CorporateModalGroupfiles6").change(function () {
        var a = document.getElementById('CorporateModalGroupfiles6');
        if (a.value == "") {
            CorporateModalGroupfileLabel6.innerHTML = "Choose file";
        }
        else {
            var theSplit = a.value.split('\\');
            CorporateModalGroupfileLabel6.innerHTML = theSplit[theSplit.length - 1];
        }
    });

    $("#btnAddMember").click(function () {

        $("#RegisterOther").show();

        if (IfArabic) {
            $(".filter-option").attr("style", "text-align:right");
            $(".dropdown-menu").attr("style", "text-align:right");
            $(".check-mark").attr("style", "left: 25px;text-align: left;");
        }
    });
});

function GetAllDropDown() {


    postRequest(ApiUrl+"Flight/GetAllDropdowns", null, function (res) {

        if (res.status == 200) {
            if (res.data && res.data != null) {

                NationalityArr = res.data.country;
                debugger
                if (IfArabic) {
                    $('#NewMemberTitle').html('')
                    $('#NewMemberTitle').prop('title', 'اللقب')
                    $('#NewMemberTitle').append('<option value="Mr" disabled >اللقب</option> <option value="Mr"  >السيد</option><option value="Ms"  >آنسة</option><option value="Mrs"  >السيدة</option>').selectpicker("refresh");
                    $('#NewMemberName').prop('placeholder', 'الاسم')
                    $('#NewMemberEmail').prop('placeholder', 'البريد الإلكتروني')
                    $('#NewMemberMobile').prop('placeholder', 'الهاتف المحمول')
                    $('#NewMemberDocuments').prop('placeholder', 'رقم الهوية')
                    $('#NewMemberDocumentType').prop('title', 'نوع الوثيقة')
                    $('#NewMemberDocumentType').html('')
                    $('#NewMemberDocumentType').prop('title', 'اختر نوع المستند')
                    $('#NewMemberDocumentType').append('<option value="-1" disabled >اختر نوع المستند</option><option value="U">الهوية الإماراتية</option><option value="P">جواز السفر</option><option value="T">هوية السفر</option><option value="S">هوية الأمن</option><option value="C">هوية الشركة</option><option value="B">شهادة الميلاد</option>').selectpicker("refresh");



                    fillData(res.data.country, "#temp_NationalityAR", "#Nationality", true);
                    fillData(res.data.country, "#temp_NationalityAR", "#PNationality", true);
                    fillData(res.data.country, "#temp_NationalityAR", "#OtherMembersNationality", true);
                    fillData(res.data.country, "#temp_NationalityAR", "#modalOtherMembersNationality", true);
                    debugger
                    fillData(res.data.country, "#temp_NationalityAR", "#CorporatemodalOtherMembersNationality", true);
                    fillData(res.data.country, "#temp_NationalityAR", "#CorporateOtherMembersNationality", true);
                    fillData(res.data.country, "#temp_NationalityAR", "#NewMemberNationality", true);
                    
                }
                else {
                    fillData(res.data.country, "#temp_Nationality", "#Nationality", true);
                    fillData(res.data.country, "#temp_Nationality", "#PNationality", true);
                    fillData(res.data.country, "#temp_Nationality", "#OtherMembersNationality", true);
                    fillData(res.data.country, "#temp_Nationality", "#modalOtherMembersNationality", true);
                    debugger
                    fillData(res.data.country, "#temp_Nationality", "#CorporatemodalOtherMembersNationality", true);
                    fillData(res.data.country, "#temp_Nationality", "#CorporateOtherMembersNationality", true);
                    fillData(res.data.country, "#temp_Nationality", "#NewMemberNationality", true);
                }
                

                if (MemberType == "Group" || MemberType == "Corporate") {

                    $("#GroupMembers").show();

                    if (UserId > 0 && UserId != null) {

                        MyProfileMembersById(UserId)
                    }

                }
                else {

                    $(".IndividualProFileBlock").show();

                    GetEditDetailsByUserId(UserId);

                }
               
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
                text: IfArabic ? "هناك خطأ ماعفواً! هنالك خطأ ما" : "Ooops! Something went wrong.",
                buttons: [null, IfArabic ? "موافق" : "OK"],
            });
        }
        if (res.status == 500) {
            $('#preloader').hide();
            swal({
                icon: "error",
                title: IfArabic ? "خطأ" : "Error",
                dangerMode: true,
                text: IfArabic ? "عفواً! هنالك خطأ ما" : "Ooops! Something went wrong.",
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
                icon: "error",
                title: IfArabic ? "خطأ" : "Error",
                dangerMode: true,
                text: IfArabic ? "عفواً! هنالك خطأ ما" : "Ooops! Something went wrong.",
                buttons: [null, IfArabic ? "موافق" : "OK"],
            })
        }

    });

}

function CalenderBirthdate() {


    if ($("#Birthdate").val().includes('كانون الثاني')) {
        Birthdate = $("#Birthdate").val().replace('كانون الثاني', 'Jan').replace('\t', '')
    }
    else if ($("#Birthdate").val().includes('شباط')) {
        Birthdate = $("#Birthdate").val().replace('شباط', 'Feb').replace('\t', '');
    }
    else if ($("#Birthdate").val().includes('آذار')) {
        Birthdate = $("#Birthdate").val().replace('آذار', 'Mar').replace('\t', '');
    }
    else if ($("#Birthdate").val().includes('نيسان')) {
        Birthdate = $("#Birthdate").val().replace('نيسان', 'Apr').replace('\t', '');
    }
    else if ($("#Birthdate").val().includes('أيار')) {
        Birthdate = $("#Birthdate").val().replace('أيار', 'May').replace('\t', '');
    }
    else if ($("#Birthdate").val().includes('حزيران')) {
        Birthdate = $("#Birthdate").val().replace('حزيران', 'Jun').replace('\t', '');
    }
    else if ($("#Birthdate").val().includes('تموز')) {
        Birthdate = $("#Birthdate").val().replace('تموز', 'Jul').replace('\t', '');
    }
    else if ($("#Birthdate").val().includes('آب')) {
        Birthdate = $("#Birthdate").val().replace('آب', 'Aug').replace('\t', '');
    }
    else if ($("#Birthdate").val().includes('أيلول')) {
        Birthdate = $("#Birthdate").val().replace('أيلول', 'Sep').replace('\t', '');
    }
    else if ($("#Birthdate").val().includes('تشرين الأول')) {
        Birthdate = $("#Birthdate").val().replace('تشرين الأول', 'Oct').replace('\t', '');
    }
    else if ($("#Birthdate").val().includes('تشرين الثاني')) {
        Birthdate = $("#Birthdate").val().replace('تشرين الثاني', 'Nov').replace('\t', '');
    }
    else if ($("#Birthdate").val().includes('كانون الأول')) {
        Birthdate = $("#Birthdate").val().replace('كانون الأول', 'Dec').replace('\t', '');
    }

}

function CalenderBirthdateAddMember() {


    if ($("#NewMemberBirthdate").val().includes('كانون الثاني')) {
        AddMemberBirthdate = $("#NewMemberBirthdate").val().replace('كانون الثاني', 'Jan').replace('\t', '')
    }
    else if ($("#NewMemberBirthdate").val().includes('شباط')) {
        AddMemberBirthdate = $("#NewMemberBirthdate").val().replace('شباط', 'Feb').replace('\t', '');
    }
    else if ($("#NewMemberBirthdate").val().includes('آذار')) {
        AddMemberBirthdate = $("#NewMemberBirthdate").val().replace('آذار', 'Mar').replace('\t', '');
    }
    else if ($("#NewMemberBirthdate").val().includes('نيسان')) {
        AddMemberBirthdate = $("#NewMemberBirthdate").val().replace('نيسان', 'Apr').replace('\t', '');
    }
    else if ($("#NewMemberBirthdate").val().includes('أيار')) {
        AddMemberBirthdate = $("#NewMemberBirthdate").val().replace('أيار', 'May').replace('\t', '');
    }
    else if ($("#NewMemberBirthdate").val().includes('حزيران')) {
        AddMemberBirthdate = $("#NewMemberBirthdate").val().replace('حزيران', 'Jun').replace('\t', '');
    }
    else if ($("#NewMemberBirthdate").val().includes('تموز')) {
        AddMemberBirthdate = $("#NewMemberBirthdate").val().replace('تموز', 'Jul').replace('\t', '');
    }
    else if ($("#NewMemberBirthdate").val().includes('آب')) {
        AddMemberBirthdate = $("#NewMemberBirthdate").val().replace('آب', 'Aug').replace('\t', '');
    }
    else if ($("#NewMemberBirthdate").val().includes('أيلول')) {
        AddMemberBirthdate = $("#NewMemberBirthdate").val().replace('أيلول', 'Sep').replace('\t', '');
    }
    else if ($("#NewMemberBirthdate").val().includes('تشرين الأول')) {
        AddMemberBirthdate = $("#NewMemberBirthdate").val().replace('تشرين الأول', 'Oct').replace('\t', '');
    }
    else if ($("#NewMemberBirthdate").val().includes('تشرين الثاني')) {
        AddMemberBirthdate = $("#NewMemberBirthdate").val().replace('تشرين الثاني', 'Nov').replace('\t', '');
    }
    else if ($("#NewMemberBirthdate").val().includes('كانون الأول')) {
        AddMemberBirthdate = $("#NewMemberBirthdate").val().replace('كانون الأول', 'Dec').replace('\t', '');
    }

}

function GetDocumentIndividualByUserId(Id) {

    postRequest(ApiUrl+"Register/GetDocumentByUserId/" + Id, null, function (res) {

        if (res.status == 200) {

            $("#DocumentFilesAppend").html('');

            $("#IndiviualModal").modal("show");

            var DocType = res.data.documentTypetxt.split(',');

            for (var i = 0; i < DocType.length; i++) {

                var Files = res.data.filePathNametxt.split(',')[i];

                var Extension = res.data.filePathNametxt.split(',')[i].split('.').pop();

                var html = "";
                if (IfArabic) {


                    html += '<div class="col-md-4">';
                    html += '<div class="card border-info mx-sm-1 p-3">';
                    html += '<div class="card border-info shadow text-info p-3 my-card"><a href="' + Files + '" target="blank"><span class="fa fa-eye" aria-hidden="true"></span></a></div>';
                    html += '<div class="text-info text-center mt-4"><h4>' + DocumentFileType(DocType[i].trim()) + '</h4></div>';

                    if (Extension == "jpeg" || Extension == "jpg" || Extension == "png") {

                        html += '<a href="' + Files + '"  download class="btn btn-info btn-xs">تحميل الملف<img src="' + Files + '" style="display:none" alt="W3Schools" width="104" height="142"></a>'
                    }
                    else {

                        html += '<div class="text-info text-center mt-2"><a href="' + Files + '" download class="btn btn-info btn-xs">تحميل الملف</a></div>';
                    }

                    html += '</div>';
                    html += '</div>';
                }
                else {
                    html += '<div class="col-md-4">';
                    html += '<div class="card border-info mx-sm-1 p-3">';
                    html += '<div class="card border-info shadow text-info p-3 my-card"><a href="' + Files + '" target="blank"><span class="fa fa-eye" aria-hidden="true"></span></a></div>';
                    html += '<div class="text-info text-center mt-4"><h4>' + DocumentFileType(DocType[i].trim()) + '</h4></div>';

                    if (Extension == "jpeg" || Extension == "jpg" || Extension == "png") {

                        html += '<a href="' + Files + '"  download class="btn btn-info btn-xs">Download File<img src="' + Files + '" style="display:none" alt="W3Schools" width="104" height="142"></a>'
                    }
                    else {

                        html += '<div class="text-info text-center mt-2"><a href="' + Files + '" download class="btn btn-info btn-xs">Download File</a></div>';
                    }

                    html += '</div>';
                    html += '</div>';
                }


                $("#DocumentFilesAppend").append(html);

            }




            debugger;

        }
        if (res.status == 401) {

            localStorage.removeItem("userData");
            localStorage.removeItem("Menu");
            window.location.href = baseWebUrl;

        }
        if (res.status == 403) {

            swal({
                title: IfArabic ? "خطأ" : "Error",
                text: IfArabic ? "هناك خطأ ما!" : "Something went wrong",
                icon: "error",
                dangerMode: true,
                buttons: [null, IfArabic ? "موافق" : "OK"],
            });
        }
        if (res.status == 500) {

            swal({
                title: IfArabic ? "خطأ" : "Error",
                text: IfArabic ? "هناك خطأ ما!" : "Something went wrong",
                icon: "error",
                dangerMode: true,
                buttons: [null, IfArabic ? "موافق" : "OK"],
            });
        }

        if (res.status == 420) {

            localStorage.removeItem("userData");
            localStorage.removeItem("Menu");
            window.location.href = baseWebUrl;
        }

        if (res.status == 600) {

            swal({
                title: IfArabic ? "خطأ" : "Error",
                text: IfArabic ? "هناك خطأ ما!" : res.responseMsg,
                icon: "error",
                dangerMode: true,
                buttons: [null, IfArabic ? "موافق" : "OK"],
            });
        }

    });
}

function GetEditDetailsByUserId(Id) {

    postRequest(ApiUrl+"Register/GetDocumentByUserId/" + Id, null, function (res) {

        if (res.status == 200) {
            debugger;
            GLobalDocumentFile = [];

            var DocType = res.data.documentTypetxt.split(',').map(x => x.trim());

            var DocFiles = res.data.filePathNametxt.split(",");


            for (var i = 0; i < DocType.length; i++) {

                var obj = {

                    DocType: DocType[i],
                    DocTypeFileName: DocFiles[i]

                }

                GLobalDocumentFile.push(obj);

            }

            $("#registerUser").hide();
            $("#UpdateUser").show();
            $("#SeeDocuments").show();
            $("#SeeDocuments").attr("data-id", Id);
            $("#HdIndId").val(Id);
            $("#Honorifics").val(res.data.honorifics).selectpicker("refresh");
            $("#Name").val(res.data.name);
            $("#Email").val(res.data.email.toLowerCase());
            $("#Username").val(res.data.username);
            if (IfArabic) {
               
                $("#Birthdate").val(moment(res.data.birthdate).locale("ar").format("DD-MMM-YYYY"));
            }
            else {
                $("#Birthdate").val(moment(res.data.birthdate).locale("en").format("DD-MMM-YYYY"));
               
            }
           
           
            $("#Nationality").val(res.data.nationality).selectpicker("refresh");
           
            $("#Mobile").val(res.data.mobile);
           
            $("#Documents").val(res.data.documents);
            var SelectDocType = res.data.documentTypetxt.split(',').map(x => x.trim());
            $("#DocumentType").val(SelectDocType).selectpicker("refresh");
            $("#ActiveDelmaIsland").prop('checked', res.data.isDelmaIsland);
            $(".DocumentType").change();

            $("#files1").rules('remove', 'required');
            $("#files2").rules('remove', 'required');
            $("#files3").rules('remove', 'required');
            $("#files4").rules('remove', 'required');
            $("#files5").rules('remove', 'required');
            $("#files6").rules('remove', 'required');

            if (IfArabic) {
                $(".filter-option").attr("style", "text-align:right");
                $(".dropdown-menu").attr("style", "text-align:right");
                $(".check-mark").attr("style", "left: 25px;text-align: left;");
            }
        }
        if (res.status == 401) {

            localStorage.removeItem("userData");
            localStorage.removeItem("Menu");
            window.location.href = baseWebUrl;

        }
        if (res.status == 403) {

            swal({
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
            });
        }

        if (res.status == 420) {

            localStorage.removeItem("userData");
            localStorage.removeItem("Menu");
            window.location.href = baseWebUrl;
        }

        if (res.status == 600) {

            swal({
                title: IfArabic ? "خطأ" : "Error",
                text: IfArabic ? "هناك خطأ ما!" : res.responseMsg,
                icon: "error",
                dangerMode: true,
                buttons: [null, IfArabic ? "موافق" : "OK"],
            });
        }

    });
}

$("#UpdateUser").click(function () {

    if ($("#RegisterForm").valid()) {

       
        var formData = new FormData();

        var FileData = [];

        var RowLength = $(".wrapper_Block").children().length;

        debugger;

        for (var i = 1; i <= RowLength; i++) {


            var files = $(".wrapper_Block").find(`#files${i}`).get(0).files;

            if (files.length != 0) {

                debugger;
                FileData.push(files[0]);
            }
            else {


                var OldFilePath = $(".wrapper_Block").find(`#files${i}`).parent().find("label").text();


                if (OldFilePath != 'Choose file') {

                    FileData.push(OldFilePath);
                }

            }

        }

        for (var i = 0; i < FileData.length; i++) {


            debugger;

            if (FileData[i].name == undefined) {


                formData.append("fileInput", FileData[i]);


            }

            else {

                formData.append("File", FileData[i]);
                formData.append("fileInput", null);

            }

        }
       
        formData.append("Id", $("#HdIndId").val())
        formData.append("Honorifics", $('.Honorifics').selectpicker("val"))
        formData.append("Name", $("#Name").val())
        formData.append("Email", $("#Email").val().toLowerCase())
        formData.append("Nationality", $("#Nationality").val())
        formData.append("Username", $("#Username").val())
        
        IfArabic ? formData.append("Birthdate", moment($("#Birthdate").val(), "DD-MMM-YYYY").locale("en").format("DD-MMM-YYYY")) : formData.append("Birthdate", moment($("#Birthdate").val()).locale('en').format("DD-MMM-YYYY"))
        formData.append("Mobile", $('#Mobile').val())
        formData.append("Documents", $("#Documents").val())
        formData.append("DocumentType", $("#DocumentType").val())
        formData.append("IsDelmaIsland", $('#ActiveDelmaIsland').is(":checked"))
        formData.append("IsUAEId", $('#ActiveUAEID').is(":checked"))

        postRequestWithoutStringfy(ApiUrl+"Register/Update", formData, function (res) {

            if (res.status == 200) {
                {



                    swal({
                        icon: "success",
                        title: IfArabic?"تم التحديث بنجاح": "Update Successfully",
                        buttons: [null, IfArabic ? "موافق" : "OK"],
                        dangerMode: false,
                        text: IfArabic ? "محدث" : "Updated",
                    });

                   
                    $(document).find("input").val('');
                    $(document).find("select").val('').selectpicker("refresh");
                    GetEditDetailsByUserId(UserId)
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
                    buttons: [null, IfArabic ? "موافق" : "OK"],
                    dangerMode: true,
                    text: IfArabic ? "عفواً! هنالك خطأ ما." : "Ooops! Something went wrong.",
                });
            }
            if (res.status == 500) {
                $('#preloader').hide();
                swal({
                    title: "Error",
                    text: res.responseMsg,
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

function DocumentFileType(type) {


    if (type == "U") {

        return IfArabic ? "الهوية الإماراتية": "UAE ID"

    }
    else if (type == "P") {
        return IfArabic ? "جواز السفر":"Passport"

    }
    else if (type == "T") {
        return IfArabic ? "هوية السفر": "Travel ID"

    }
    else if (type == "S") {
        return IfArabic ? "هوية الأمن": "Security ID"

    }

    else if (type == "C") {
        return IfArabic ? "هوية الشركة": "Company ID"

    }

    else if (type == "B") {
        return IfArabic ? "شهادة الميلاد": "Birth Certificate"

    }
}

/*Group and Individual Data show in Datatable*/
function MyProfileMembersById(UserId) {
    debugger
    $(MembersTable).DataTable().destroy();
    $(MembersTable).DataTable({
        
        "responsive": true,
        "lengthChange": true,
        "processing": true, // for show progress bar
        "serverSide": true, // for process server side
        "filter": true, // this is for disable filter (search box)
        "orderMulti": false, // for disable multiple column at once
        "pageLength": 10,
        "orderClasses": false,
        "oLanguage": {
            "sSearch": IfArabic ? "بحث:" : "search:",
            "sProcessing": IfArabic ? "يعالج......" : "Processing......",
            "sLengthMenu": IfArabic ? "عرض _MENU_ السجلات" : "Display _MENU_ records",
            "info": IfArabic ? "تظهر _START_ إلى _END_ من _TOTAL_ مدخلات" : "Showing _START_ to _END_ of _TOTAL_ entries"

        },
        "language": {
            "paginate": {
                "first": IfArabic ? "أولا" : "First",
                "last": IfArabic ? "الاخير" : "Last",
                "next": IfArabic ? "التالي" : "Next",
                "previous": IfArabic ? "سابق" : "Previous",
            }
        },

        //"aaSorting": [
        //    [0, 'desc']
        //],
        //"initComplete": function (settings, json) {
        //    HideKeys();
        //},

        "ajax": {
            "url": ApiUrl + "Register/MyprofileMembersByID?Id=" + UserId,
            "type": "POST",
            "dataType": "json",

            "dataSrc": function (data) {
                debugger
                otherMembers = data.data;
                ;
                if (data.status == 200) {

                }

                if (data.status == 401) {

                    window.location.href = baseWebUrl + "Home/Index";
                }
                if (data.status == 403) {

                    swal(data.responseMsg, {
                        title: IfArabic ? "خطأ" : "Error",
                        text: IfArabic ? "هناك خطأ ما!" : "Something is wrong!",
                        icon: "error",
                        dangerMode: true,
                        buttons: [null, IfArabic ? "موافق" : "OK"],
                    });
                }

                if (data.status == 420) {

                    localStorage.removeItem("Menu");
                    localStorage.removeItem("userData");
                    window.location.href = baseWebUrl + "Home/Index";
                }

                if (data.status == 500) {

                    swal({
                        title: IfArabic ? "خطأ" : "Error",
                        text: IfArabic ? "هناك خطأ ما!" : res.responseMsg,
                        icon: "error",
                        dangerMode: true,
                        buttons: [null, IfArabic ? "موافق" : "OK"],
                    })
                }

                if (data.status == 600) {

                    swal({
                        title: IfArabic ? "خطأ" : "Error",
                        text: IfArabic ? "هناك خطأ ما!" : res.responseMsg,
                        icon: "error",
                        dangerMode: true,
                        buttons: [null, IfArabic ? "موافق" : "OK"],
                    })
                }
                
                return data.data;
            }

        },

        "columns": [

            {
                "data": "name",
                "name": "name",
                "autoWidth": true
            },

            {
                "data": "email",
                "name": "email",
                "autoWidth": true
            },
            {
                
                "data": IfArabic ? "nationalityArabic" :"nationality",
                "name": "nationality",
                "autoWidth": true,
                
            },
            {
                "data": "mobile",
                "name": "mobile",
                "autoWidth": true,
                "render": function (data, type, full, meta) {

                    


                    return "(+971) - " +full.mobile 

                   

                }
            },
            {
                "data": "isHead",
                "name": "isHead",
                "autoWidth": true,
                "render": function (data) {

                    if (data) {


                        return '<h6><span class="badge badge-info">Group Head</span></h6>'

                    } else {

                        return '<h6><span class="badge badge-info">Group Members</span></h6>'

                    }

                }
            },


            {
                "data": "-",
                "name": "-",
                "autoWidth": true,
                "render": function (data, type, full, meta) {


                    return '<a href="javascript:void;" style="width: 25%;display: flex;justify-content: center;" class="btn btn-info btn-xs" onclick="GetDocumentGlobalByUserId('+full.id +')"><i class="fa fa-eye"></i></a>';

                }
            },

            {
                "data": "Status",
                "name": "Status",
                "autoWidth": true,
                "render": function (data, type, full, meta) {

                    if (full.isApproved==1) {


                        return '<h6><span class="badge badge-success">Approved</span></h6>'

                    } else {

                        return '<h6><span class="badge badge-danger">Not Approved</span></h6>'

                    }

                }
            },



              {
                "render": function (data, type, full, meta) {
                      return '<a href="javascript:void;" class="editbtn" data-toggle="modal"  onclick= "GetGlobalEditDetailsByUserId('+full.id+')"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>'+(full.isHead ? '' :'<a  onclick="DeleteMember(' + full.id + ')"  class="delete " ><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>');
                }
            }
        ]

        ,"drawCallback": function (settings) {
            if ($('#membersTable').find('tr').length - 1 == 10) {

                $('#btnAddMember').attr('href', "#");
            } else {

                $('#btnAddMember').attr('href', "#addEmployeeModal");
            }
        }
    });
    $(document).on('click', '#btnAddMember', function () {
        debugger
        if ($('#membersTable').find('tr').length - 1 == 10) {

            swal({
                icon: "info",
                title: IfArabic ? "تم تجاوز الحد الأقصى للمرافقين من الأعضاء" : "Allowed members or dependents exceeded.",

                buttons: [null, IfArabic ? "موافق" : "OK"],


                text: IfArabic ? "تستطيع اضافة اقصى عدد 10 من الأعضاء" : "You can add a maximum 10 members",

            });
            //$('#btnAddMember').attr('href', "#");
        }


        //else {

        //    $('#btnAddMember').attr('href', "#addEmployeeModal");


        //}

        IfArabic ? $("[data-id=NewMemberNationality]").text('اختر الجنسية') : false
        IfArabic ? $('#NewMemberMobile').prop('placeholder','XXXXXXXX'):false
        IfArabic ? $('#NewMemberBirthdate').css({ "margin-right": "22px" }).prop('placeholder','دد-ممم-سسس'):false
        IfArabic ? $('.validation-error-message').addClass('textAlignRight'):false

    })
    
}

function GetDocumentGlobalByUserId(Id) {

    if (MemberType == "Group") {


        postRequest(ApiUrl+"Register/GetGroupDocumentByUserId/" + Id, null, function (res) {

            if (res.status == 200) {
                var disableBirthdate = moment().diff(res.data.birthdate, 'month');

                $("#GroupDocumentFilesAppend").html('');

                $("#GroupModal").modal("show");

                var DocType = res.data.documentTypetxt.split(',');

                for (var i = 0; i < DocType.length; i++) {

                    var Files = res.data.filePathNametxt.split(',')[i];

                    var Extension = res.data.filePathNametxt.split(',')[i].split('.').pop();

                    var html = "";

                    if (IfArabic) {
                        html += '<div class="col-md-4">';
                        html += '<div class="card border-info mx-sm-1 p-3">';
                        html += '<div class="card border-info shadow text-info p-3 my-card"><a href="' + Files + '" target="blank"><span class="fa fa-eye" aria-hidden="true"></span></a></div>';
                        html += '<div class="text-info text-center mt-4"><h4>' + DocumentFileType(DocType[i].trim()) + '</h4></div>';

                        if (Extension == "jpeg" || Extension == "jpg" || Extension == "png") {

                            html += '<a href="' + Files + '"  download class="btn btn-info btn-xs">تحميل الملف<img src="' + Files + '" style="display:none" alt="W3Schools" width="104" height="142"></a>'
                        }
                        else {

                            html += '<div class="text-info text-center mt-2"><a href="' + Files + '" download class="btn btn-info btn-xs">تحميل الملف</a></div>';
                        }

                        html += '</div>';
                        html += '</div>';
                    }
                    else {
                        html += '<div class="col-md-4">';
                        html += '<div class="card border-info mx-sm-1 p-3">';
                        html += '<div class="card border-info shadow text-info p-3 my-card"><a href="' + Files + '" target="blank"><span class="fa fa-eye" aria-hidden="true"></span></a></div>';
                        html += '<div class="text-info text-center mt-4"><h4>' + DocumentFileType(DocType[i].trim()) + '</h4></div>';

                        if (Extension == "jpeg" || Extension == "jpg" || Extension == "png") {

                            html += '<a href="' + Files + '"  download class="btn btn-info btn-xs">Download File<img src="' + Files + '" style="display:none" alt="W3Schools" width="104" height="142"></a>'
                        }
                        else {

                            html += '<div class="text-info text-center mt-2"><a href="' + Files + '" download class="btn btn-info btn-xs">Download File</a></div>';
                        }

                        html += '</div>';
                        html += '</div>';
                    }
                    


                    $("#GroupDocumentFilesAppend").append(html);

                }




                debugger;

            }
            if (res.status == 401) {

                localStorage.removeItem("userData");
                localStorage.removeItem("Menu");
                window.location.href = baseWebUrl;

            }
            if (res.status == 403) {

                swal({
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
                });
            }

            if (res.status == 420) {

                localStorage.removeItem("userData");
                localStorage.removeItem("Menu");
                window.location.href = baseWebUrl;
            }

            if (res.status == 600) {

                swal({
                    title: IfArabic ? "خطأ" : "Error",
                    text: IfArabic ? "هناك خطأ ما!" : res.responseMsg,
                    icon: "error",
                    dangerMode: true,
                    buttons: [null, IfArabic ? "موافق" : "OK"],
                });
            }

        });

    }

    else if (MemberType == "Corporate") {

        postRequest(ApiUrl+"Register/GetCorporateDocumentByUserId/" + Id, null, function (res) {

            if (res.status == 200) {

                $("#CorporateDocumentFilesAppend").html('');

                $("#CorporateModal").modal("show");

                var DocType = res.data.documentTypetxt.split(',');

                for (var i = 0; i < DocType.length; i++) {

                    var Files = res.data.filePathNametxt.split(',')[i];

                    var Extension = res.data.filePathNametxt.split(',')[i].split('.').pop();

                    var html = "";
                    debugger
                    if (IfArabic) {
                        html += '<div class="col-md-4">';
                        html += '<div class="card border-info mx-sm-1 p-3">';
                        html += '<div class="card border-info shadow text-info p-3 my-card"><a href="' + Files + '" target="blank"><span class="fa fa-eye" aria-hidden="true"></span></a></div>';
                        html += '<div class="text-info text-center mt-4"><h4>' + DocumentFileType(DocType[i].trim()) + '</h4></div>';

                        if (Extension == "jpeg" || Extension == "jpg" || Extension == "png") {

                            html += '<a href="' + Files + '"  download class="btn btn-info btn-xs">تحميل الملف<img src="' + Files + '" style="display:none" alt="W3Schools" width="104" height="142"></a>'
                        }
                        else {

                            html += '<div class="text-info text-center mt-2"><a href="' + Files + '" download class="btn btn-info btn-xs">تحميل الملف</a></div>';
                        }

                        html += '</div>';
                        html += '</div>';
                    }
                    else {
                        html += '<div class="col-md-4">';
                        html += '<div class="card border-info mx-sm-1 p-3">';
                        html += '<div class="card border-info shadow text-info p-3 my-card"><a href="' + Files + '" target="blank"><span class="fa fa-eye" aria-hidden="true"></span></a></div>';
                        html += '<div class="text-info text-center mt-4"><h4>' + DocumentFileType(DocType[i].trim()) + '</h4></div>';

                        if (Extension == "jpeg" || Extension == "jpg" || Extension == "png") {

                            html += '<a href="' + Files + '"  download class="btn btn-info btn-xs">Download File<img src="' + Files + '" style="display:none" alt="W3Schools" width="104" height="142"></a>'
                        }
                        else {

                            html += '<div class="text-info text-center mt-2"><a href="' + Files + '" download class="btn btn-info btn-xs">Download File</a></div>';
                        }

                        html += '</div>';
                        html += '</div>';
                    }


                    


                    $("#CorporateDocumentFilesAppend").append(html);

                }


            }
            if (res.status == 401) {

                localStorage.removeItem("userData");
                localStorage.removeItem("Menu");
                window.location.href = baseWebUrl;

            }
            if (res.status == 403) {

                swal({
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
                });
            }

            if (res.status == 420) {

                localStorage.removeItem("userData");
                localStorage.removeItem("Menu");
                window.location.href = baseWebUrl;
            }

            if (res.status == 600) {

                swal({
                    title: IfArabic ? "خطأ" : "Error",
                    text: IfArabic ? "هناك خطأ ما!" : res.responseMsg,
                    icon: "error",
                    dangerMode: true,
                    buttons: [null, IfArabic ? "موافق" : "OK"],
                });
            }

        });


    }
}

function GetGlobalEditDetailsByUserId(Id) {
    debugger
    
    IfArabic ? $("#CorporatemodalOtherMembersNationalityBirthdate,#modalOtherMembersNationalityBirthdate").css({ "margin-right": "22px" }) : false;

    if (MemberType == "Group") {

        $("#GroupUpdateButton").show();

        $("#UpdateGroupModal").modal("show");
        if (IfArabic) {
         
            $('#modalOtherMembersGenderBlock').html('');
            $('#modalOtherMembersGenderBlock').append('<select id="modalOtherMembersGender" name="modalOtherMembersGender" Titlekey="Title" class="modalOtherMembersGender selectpicker MyProfileLang form-control form-control-custom"><option value="Mr" name="Mr">السيد</option> <option value="Mrs" name="Mrs">آنسة</option> <option value="MS" name="Ms">السيدة</option></select>')
            

            $('#modalOtherMembersNationalityDocumentType').html('');
            $('#modalOtherMembersNationalityDocumentType').append('<option key="UAEID" value="U">الهوية الإماراتية</option> <option key="Passport" value="P">جواز السفر</option>  <option key="TravelID" value="T">هوية السفر</option> <option key="SecurityID" value="S">هوية الأمن</option> <option key="CompanyID" value="C">هوية الشركة</option> <option key="BirthCertificate" value="B">شهادة الميلاد</option>')
        }
        else {
           
            $('#modalOtherMembersGenderBlock').html('');
            $('#modalOtherMembersGenderBlock').append('<select id = "modalOtherMembersGender" name = "modalOtherMembersGender" Titlekey = "Title" class= "modalOtherMembersGender selectpicker MyProfileLang form-control form-control-custom" ><option value="Mr" name="Mr">Mr</option> <option value="Mrs" name="Mrs">Mrs</option> <option value="MS" name="Ms">Ms</option></select>')
            $('#modalOtherMembersNationalityDocumentType').html('');
            $('#modalOtherMembersNationalityDocumentType').append('<option key="UAEID" value="U">UAE ID</option> <option key="Passport" value="P">Passport</option> <option key="TravelID" value="T">Travel ID</option> <option key="SecurityID" value="S">Security ID</option> <option key="CompanyID" value="C">Company ID</option> <option key="BirthCertificate" value="B">Birth Certificate</option>')
        }

        postRequest(ApiUrl+"Register/GetGroupDocumentByUserId/" + Id, null, function (res) {

            if (res.status == 200) {
                debugger;
                var disableBirthdate = moment().diff(res.data.birthdate, 'month');
                GLobalDocumentFile = [];
          
                var DocType = res.data.documentTypetxt.split(',').map(x => x.trim());

                var DocFiles = res.data.filePathNametxt.split(",");


                for (var i = 0; i < DocType.length; i++) {

                    var obj = {

                        DocType:DocType[i],
                        DocTypeFileName: DocFiles[i]

                    }

                    GLobalDocumentFile.push(obj);

                }

                $("#HdUpdateGroupId").val(Id);
                
                $(".modalOtherMembersGender").val(res.data.honorifics).change().selectpicker("refresh");

                if (IfArabic) {

                    $(".filter-option").attr("style", "text-align:right");
                    $(".dropdown-menu").attr("style", "text-align:right");
                   
                }
               

                $("#modalOtherMembersName").val(res.data.name);
                $("#modalOtherMembersEmail").val(res.data.email);
                if (IfArabic) {
                    debugger
                    
                    $("#modalOtherMembersNationalityBirthdate").val(moment(res.data.birthdate).locale('ar').format("DD-MMM-yyyy"));
                }
                else {
                    debugger
                    $("#modalOtherMembersNationalityBirthdate").val(moment(res.data.birthdate).locale('en').format("DD-MMM-yyyy"));

                }
                $("#modalOtherMembersNationality").val(res.data.nationality).selectpicker("refresh");
                $("#modalOtherMembersNationalityMobile").val(res.data.mobile);
                $("#modalOtherMembersNationalityDocument").val(res.data.documents);

                var SelectDocType = res.data.documentTypetxt.split(',').map(x => x.trim());

                $("#modalOtherMembersNationalityDocumentType").val(SelectDocType).selectpicker("refresh").change();

                if (IfArabic) {

                    $(".check-mark").attr("style", "left: 25px;text-align: left;");
                }
               
                
                $(".modalRGActiveDelmaIsland").prop('checked', res.data.isDelmaIsland);
                $(".modalIsHead").prop('checked', res.data.isHead);



                $("#ModalGroupfiles1").rules('remove', 'required');
                $("#ModalGroupfiles2").rules('remove', 'required');
                $("#ModalGroupfiles3").rules('remove', 'required');
                $("#ModalGroupfiles4").rules('remove', 'required');
                $("#ModalGroupfiles5").rules('remove', 'required');
                $("#ModalGroupfiles6").rules('remove', 'required');

                if (disableBirthdate<6) {
                    $('#modalOtherMembersNationalityDocumentType').prev().children().find("[data-original-index=5]").addClass("disabled");

                }

            }
            if (res.status == 401) {

                localStorage.removeItem("userData");
                localStorage.removeItem("Menu");
                window.location.href = baseWebUrl;

            }
            if (res.status == 403) {

                swal({
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
                });
            }

            if (res.status == 420) {

                localStorage.removeItem("userData");
                localStorage.removeItem("Menu");
                window.location.href = baseWebUrl;
            }

            if (res.status == 600) {

                swal({
                    title: IfArabic ? "خطأ" : "Error",
                    text: IfArabic ? "هناك خطأ ما!" : res.responseMsg,
                    icon: "error",
                    dangerMode: true,
                    buttons: [null, IfArabic ? "موافق" : "OK"],
                });
            }

        });

       
    }

    else if (MemberType == "Corporate") {

        $("#UpdateCorporateModal").modal("show");
        if (IfArabic) {
          
            $('#CorporatemodalOtherMembersGenderBlock').html('');
            $('#CorporatemodalOtherMembersGenderBlock').append(' <label class="fs-14 text-custom-black fw-500" key="Title">Title</label><span class="required"> *</span><select Titlekey="SelectTitle" id="CorporatemodalOtherMembersGender" class="form-control form-control-custom selectpicker CorporatemodalOtherMembersGender" name="CorporatemodalOtherMembersGender" title="Select Title"><option value="Mr" name="Mr">السيد</option> <option value="Mrs" name="Mrs">آنسة</option> <option value="MS" name="Ms">السيدة</option></select>')
            $('#CorporatemodalOtherMembersNationalityDocumentType').html('');
            $('#CorporatemodalOtherMembersNationalityDocumentType').append('<option key="UAEID" value="U">الهوية الإماراتية</option> <option key="Passport" value="P">جواز السفر</option>  <option key="TravelID" value="T">هوية السفر</option> <option key="SecurityID" value="S">هوية الأمن</option> <option key="CompanyID" value="C">هوية الشركة</option> <option key="BirthCertificate" value="B">شهادة الميلاد</option>')
        }
        else {
            $('#CorporatemodalOtherMembersGenderBlock').html('');
            $('#CorporatemodalOtherMembersGenderBlock').append(' <label class="fs-14 text-custom-black fw-500" key="Title">Title</label><span class="required"> *</span><select Titlekey="SelectTitle" id="CorporatemodalOtherMembersGender" class="form-control form-control-custom selectpicker CorporatemodalOtherMembersGender" name="CorporatemodalOtherMembersGender" title="Select Title"><option value="Mr" name="Mr">Mr</option> <option value="Mrs" name="Mrs">Mrs</option> <option value="MS" name="Ms">Ms</option></select>')
            $('#CorporatemodalOtherMembersNationalityDocumentType').html('');
            $('#CorporatemodalOtherMembersNationalityDocumentType').append('<option key="UAEID" value="U">UAE ID</option> <option key="Passport" value="P">Passport</option> <option key="TravelID" value="T">Travel ID</option> <option key="SecurityID" value="S">Security ID</option> <option key="CompanyID" value="C">Company ID</option> <option key="BirthCertificate" value="B">Birth Certificate</option>')
        }
        postRequest(ApiUrl+"Register/GetCorporateDocumentByUserId/" + Id, null, function (res) {

            if (res.status == 200) {
                debugger;
                GLobalDocumentFile = [];

                var DocType = res.data.documentTypetxt.split(',').map(x => x.trim());

                var DocFiles = res.data.filePathNametxt.split(",");


                for (var i = 0; i < DocType.length; i++) {

                    var obj = {

                        DocType: DocType[i],
                        DocTypeFileName: DocFiles[i]

                    }

                    GLobalDocumentFile.push(obj);

                }



                $("#CorporatemodalOtherMembersGender").selectpicker("refresh");
                $("#HdUpdateCorporateId").val(Id);
                $("#CorporatemodalOtherMembersGender").val(res.data.honorifics).change();
               
                $("#CorporatemodalOtherMembersName").val(res.data.name);
                $("#CorporatemodalOtherMembersEmail").val(res.data.email);
                if (IfArabic) {
                    
                    $("#CorporatemodalOtherMembersNationalityBirthdate").val(moment(res.data.birthdate).locale("ar").format("DD-MMM-YYYY"));
                }
                
                else {
                   
                    $("#CorporatemodalOtherMembersNationalityBirthdate").val(moment(res.data.birthdate).locale("en").format("DD-MMM-YYYY"));
                }
                
                $("#CorporatemodalOtherMembersNationality").val(res.data.nationality).selectpicker("refresh");
                $("#CorporatemodalOtherMembersNationalityMobile").val(res.data.mobile);
                $("#CorporatemodalOtherMembersNationalityDocument").val(res.data.documents);
                var SelectDocType = res.data.documentTypetxt.split(',').map(x => x.trim());
                $("#CorporatemodalOtherMembersNationalityDocumentType").val(SelectDocType).selectpicker("refresh").change();
                $(".CorporatemodalRGActiveDelmaIsland").prop('checked', res.data.isDelmaIsland);
                $("#CorporateModalGovEntity").prop('checked', res.data.govEntity);
                $(".CorporatemodalIsHead").prop('checked', res.data.isHead);

                if (IfArabic) {

                    $(".filter-option").attr("style", "text-align:right");
                    $(".dropdown-menu").attr("style", "text-align:right");

                }

                $("#CorporateModalGroupfiles1").rules('remove', 'required');
                $("#CorporateModalGroupfiles2").rules('remove', 'required');
                $("#CorporateModalGroupfiles3").rules('remove', 'required');
                $("#CorporateModalGroupfiles4").rules('remove', 'required');
                $("#CorporateModalGroupfiles5").rules('remove', 'required');
                $("#CorporateModalGroupfiles6").rules('remove', 'required');

                if (IfArabic) {

                    $(".check-mark").attr("style", "left: 25px;text-align: left;");
                }
            }
            if (res.status == 401) {

                localStorage.removeItem("userData");
                localStorage.removeItem("Menu");
                window.location.href = baseWebUrl;

            }
            if (res.status == 403) {

                swal({
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
                });
            }

            if (res.status == 420) {

                localStorage.removeItem("userData");
                localStorage.removeItem("Menu");
                window.location.href = baseWebUrl;
            }

            if (res.status == 600) {

                swal({
                    title: IfArabic ? "خطأ" : "Error",
                    text: IfArabic ? "هناك خطأ ما!" : res.responseMsg,
                    icon: "error",
                    dangerMode: true,
                    buttons: [null, IfArabic ? "موافق" : "OK"],
                });
            }

        });
    }
}


/* Edit Individual Members Documents Again */
function SetIndividualUserDocumenteByEditOnSelectPicker(DocumentTypes) {

    debugger;

       if ($('.DocumentType').selectpicker("val").some(x => x == "U")) {

           if (GLobalDocumentFile.filter(x => x.DocType == "U").length > 0)

           {
           
                var DocFiles = GLobalDocumentFile.find(x => x.DocType == "U").DocTypeFileName;

               $("#fileLabel").text(DocFiles.split('https://hajzapi.ada.ae/Documents/')[1]);

                var FileExtension = DocFiles.split('.').pop('.');

                if (FileExtension == 'pdf') {

                    $("#blah1").attr("src", "https://cdn-icons-png.flaticon.com/512/80/80942.png");

                }
                else if (FileExtension == "doc" || FileExtension == "docx") {


                    $("#blah1").attr("src", "data:image/png;base64,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");


                }

                else { $("#blah1").attr("src", DocFiles);}
          }
       }
       else
       {

           $("#fileLabel").text("Choose file");
           $('#blah1').prop("src", "");
        }


        if ($('.DocumentType').selectpicker("val").some(x => x == "P")) {

           if (GLobalDocumentFile.filter(x => x.DocType == "P").length > 0) {

               var DocFiles = GLobalDocumentFile.find(x => x.DocType == "P").DocTypeFileName;

               $("#fileLabel2").text(DocFiles.split('https://hajzapi.ada.ae/Documents/')[1]);

               var FileExtension = DocFiles.split('.').pop('.');

               if (FileExtension == 'pdf') {

                   $("#blah2").attr("src", "https://cdn-icons-png.flaticon.com/512/80/80942.png");

               }
               else if (FileExtension == "doc" || FileExtension == "docx") {
                   $("#blah2").attr("src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAk1BMVEUqVpb////3+PoARI7R1+QkUpQUS5Hl6/MbTpJceaq0vtMMSI+SosEeUJMARo78/P1ngK1Rb6N/k7ilssvb4OovWZebqsbv8/g3YZ3i5+8AQYzr8PZgfazQ2ejK0eA7YZyInsFEaqJzjLadq8elt9TBzuEAOol8l8C3xdtqiLaRp8lPbqN1kLikttO0xNx0i7OHmbwiLw1dAAAJEUlEQVR4nO2d63qqOhCGFQ3iISIVChRRomUreGjv/+o2CAkBQSsLVoNrvl99RELeJpmZJGPoSa+u3uDV1QOBQCAQCAQCgUAgEAgEAoFAIBCoZSEsz+XfrkRLitk+rNXet9cvhogQ7hnGZhN4n7bajzWc/nadmhLCGBmb43jhnddOP9MrEEbtpvSs4+Jtdj64PNwrEEZsco8Eb7vJwR1JRbiOE0a2RDbGp/CwHtpmKVt3CSO2qWIF3kTXbfMeXAcJ4045n5L92TVNSVIfwXWJECHUi7wA2Yb+jSnpOmFsJw2irbbhxX2STXjCyAnIFhlv32af/qgWnMCEERsm2tbbHXz3oSnpGGHUKaeIrLylv65ycN0lRJGdNLT92Y+dQBNsAhHGDm5AgvBgO+YPfUBXCNFVxnH/Wc9Oik4YzQRWp/Of2EnBCdHRb8SUCEw4brn1OEK5ASlIYEJ50oCWKywu4aCRktzxk634NwmbcUGzJxuxg4QKEAJhKwLCJwSEQNiSgPAJASEQtiQgfEIiEzZTlMCESKsjsuwOYbqo96Tk9w4R1pIChEAIhE0Szuvov1l3COe2M6qh4g6YwISv7/H/gagNCH8mIATClgSET+jXCNXkkBjTlPSSLJUX8IeH8LQPjoTIgw+i316OCad6LRWTBFslVB1bt4fD4dr3ixSGjDG6Ji/ifUni4jUundaJSz/+ZlwqXU7BakWsjTEdnAqDKnusXFx2YIS11MrcQvf9w3K5nHkzP/e5OZYxQultecIRt/V8EJ/QI2RjGAZWcJj73LG4B+cJLxkhWYtPGNLq4q/Kak7zAzFkCRI4KOv2ghEeWG0Xuc/P3E975HPu0okRKl6Z26u/1jZtg3CUXbT5z7fcYMOn3C3HLMllVwKYrJcu6mg1aYGwv6FXSc7UWPx9hL9iEnZhU2ZohPP4K9oi1oXHyI0lhb/BZf8TpJWmcIoWtXmsO/Jdzs0Ryryp+TRYedtSDtEIfWpSMB9QnHNFK3zzvmefe6XVEo3QpGcQ4i8uil7lUubQnrvhjTW6cb4pTUTCPu10OedWuFHLrkgLRrgpz6QWjpBmOKJjVmGnkBNIsgrbLCMSHcsT/IUjDGkpVuYuLoW8Tq61fOYs0Kq8WsIRMlODMn8bFgiNzwyeeUoUlpQmIqFNCbmp0KqYm5tZzV1WnF9SWl88j983aaPgGc3kl0iBELGwXPXYQ3HFbDMmxG+1VIyRGiKkDYYDGpmysMVgd9K5vJk5C6viH3+NvHEdzdvZXZNoVIPGNHS5pGQooG1JqKnJkstRcI+wltraPzzQgWgN0088+n0W2rCgdc1MqVJhaAQk1GkxCp2xp1MnvNfn9F4atPosKp2XLLOJSkibRU4H+ijtifJFZUHrd2r+J5mhqQAUkHBER5sSJsaUOnXZ7lOjihfJreo7fSYfyZUQytMaams10aSmBm+TMIzOjyyHTfXpVNA5sXWd8olFSiiva8kuFNXUeukk7YvomFx/TyhQYPYvtJtuEvdus1hALp3fU0KhPH7UK9k0//o/NNN2ijstMzVKEtINmSkdFP/feUKRorbIx9FqJ+ZRp4YmajaTza286xhds2F4rDyIQEBCe5E2YtLzqMtDerz0TedWyeyR+U68r/yxpoCELKpRdnHFJrSVdD7g0eL2ldhUS/6sZBCQsL+jGEHUMOouKRaf4n7IGs2IwwFzS4esMiwvSlDCCf2CJmUOQXmP++GQeodrD3Y0ZpSqIhoxCdm8XYmg9JQisZ42uxQD2xSwfMdCXEKderl51DGHtJWuHnBEL6E4HNBpQIa96kMYBPSHfZVGKnFXTEdeOpeSWJhGIgf4ydYDKv19mrlX7/UxxZZvbg+YGdOQmcvE0ETAzAPqfXVPR6VVtnHIEfbmdd4e02L2JY1E8anvpN1SSZ+2pj5/uu6rrMuOqw2NgHOLSD5dtrD6I/pnui7lHtnMQ5XYks7pztFKQhLa1AvIbD5MN9tG1AWilSQxQ1OsivCEbPlwPvJzhiayQuwplsR2pIziVqb4hHTnWvZTo4O/qF1bUh84V9myDalYKv1DwjZ/UUK3zJSQtiYzawc6+GSfpjWgVeXUiRIadYSLu+YNEvps/TD9braO79IxikM20Xi7Ayikx48CTuoTqCXN+iGLtlHAtiyqFhIzQsGitkiFdXykZVHZN3XzbH6f2/LvCmFQIOSya3Y3BZG7h0wJShgWyuJW0g6bm3LuVktQwnXBxGcbhn39WNyJ2naRUM2/NNHg486b3cTyDAXBCfv5nfvcztmpSHj/rDdRCXNHMuVH2nuhHON+9UUlzJkazCfQcPtNSTHH+9US0+NHGLypyU/hzTxhHv9WMaGyrKXiAl6jhA5vagb56V8+HJDvhd0pYU+po0GrmexSLt8yf22bIxw8OAlUzNlTRMhFNUWXng8HUHkBwhOqHEZxb1Dn61yZoSA6Yd//wEqSbh0vOuXF17kyQ0F4Qud79r3dbseaRoziSOPH6PzR2a6Jpalz2GW7luYq03F0113fHHMaDGRFSX4JhHqPjhwW1Vvcle5P3t+9IAgIIeOfEIro8R9IlaSogR070qOATNSorTkB4RMCQiBsSUD4hIDwNwmbKUpgQjjNrFydOicKCIEQCH+fULSMocYJ55JaS90hfH2P/w9EbUD4MwEhELYkIHxCQAiELQkInxAQAmFLAsInJDJhIyWJ/P7D13+H5W+9h7T8BLlWCH9JBtG24fner0G6TphumPTINvTv/Pis04QpJ1bkgaLtz+7IMRt/CbIIhIni98bLVuBNhrrtvNq71TkhLCvW+BQefPfmsOnXILwq7rY9stq+Lw/u6E/DESEJE0WcyNIWX97uUHbW+gsQXoUQRsbmqC28uq+ZF50wVXyWt2EYq/3lYaZeRwlTRXZo+kECz7dN8+Y8gJcgTISxPO+Ng7P/I7fSRcKrEFKmyjFyn/5QH90LEzpLeBVK3Od2tpz4boX77DZhoqg5sUHGX9+zi3sbx78CYaLYr1hEW0TxkKu+JGGiCDNyKxstskPOaxKmQkiWB/h4+nTVtfz4651V7D5l6/H3QCAQCAQCgUAgEAgEAoFAIBAIBAL9M/of7UsnKTAofvIAAAAASUVORK5CYII=");
               }

               else { $("#blah2").attr("src", DocFiles); }
           }
       }
       else
       {
           $("#fileLabel2").text("Choose file");
           $('#blah2').prop("src", "");
       }


        if ($('.DocumentType').selectpicker("val").some(x => x == "T")) {
           if (GLobalDocumentFile.filter(x => x.DocType == "T").length > 0) {

            var DocFiles = GLobalDocumentFile.find(x => x.DocType == "T").DocTypeFileName;

               $("#fileLabel3").text(DocFiles.split('https://hajzapi.ada.ae/Documents/')[1]);

            var FileExtension = DocFiles.split('.').pop('.');

            if (FileExtension == 'pdf') {

                $("#blah3").attr("src", "https://cdn-icons-png.flaticon.com/512/80/80942.png");

            }
            else if (FileExtension == "doc" || FileExtension == "docx")
            {
                $("#blah3").attr("src", "data:image/png;base64,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");
            }

            else { $("#blah3").attr("src", DocFiles);}
       }
      }
       else
       {

           $("#fileLabel3").text("Choose file");
           $('#blah3').prop("src", "");
       }

        if ($('.DocumentType').selectpicker("val").some(x => x == "S")) {

        if (GLobalDocumentFile.filter(x => x.DocType == "S").length > 0) {

        var DocFiles = GLobalDocumentFile.find(x => x.DocType == "S").DocTypeFileName;

            $("#fileLabel4").text(DocFiles.split('https://hajzapi.ada.ae/Documents/')[1]);

        var FileExtension = DocFiles.split('.').pop('.');

        if (FileExtension == 'pdf') {

            $("#blah4").attr("src", "https://cdn-icons-png.flaticon.com/512/80/80942.png");

        }
        else if (FileExtension == "doc" || FileExtension == "docx")
        {
            $("#blah4").attr("src", "data:image/png;base64,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");

        }

        else { $("#blah4").attr("src", DocFiles);}
      }
    }
       else {

           $("#fileLabel4").text("Choose file");
           $('#blah4').prop("src", "");
    }


        if ($('.DocumentType').selectpicker("val").some(x => x == "C")) {

           if (GLobalDocumentFile.filter(x => x.DocType == "C").length > 0) {

            var DocFiles = GLobalDocumentFile.find(x => x.DocType == "C").DocTypeFileName;

               $("#fileLabel5").text(DocFiles.split('https://hajzapi.ada.ae/Documents/')[1]);

            var FileExtension = DocFiles.split('.').pop('.');

            if (FileExtension == 'pdf') {

                $("#blah5").attr("src", "https://cdn-icons-png.flaticon.com/512/80/80942.png");

            }
            else if (FileExtension == "doc" || FileExtension == "docx") {
                $("#blah5").attr("src", "data:image/png;base64,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");

            }

            else { $("#blah5").attr("src", DocFiles); }
       }
     }
       else
       {

           $("#fileLabel5").text("Choose file");
           $('#blah5').prop("src", "");
       }


        if ($('.DocumentType').selectpicker("val").some(x => x == "B")) {

           if (GLobalDocumentFile.filter(x => x.DocType == "B").length > 0) {

            var DocFiles = GLobalDocumentFile.find(x => x.DocType == "B").DocTypeFileName;

               $("#fileLabel6").text(DocFiles.split('https://hajzapi.ada.ae/Documents/')[1]);

            var FileExtension = DocFiles.split('.').pop('.');

            if (FileExtension == 'pdf') {

                $("#blah6").attr("src", "https://cdn-icons-png.flaticon.com/512/80/80942.png");

            }
            else if (FileExtension == "doc" || FileExtension == "docx") {
                $("#blah6").attr("src", "data:image/png;base64,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");

            }

            else { $("#blah6").attr("src", DocFiles); }
       }
     }
       else
       {

           $("#fileLabel6").text("Choose file");
           $('#blah6').prop("src", "");
       }

   //$('#modalOtherMembersNationalityDocumentType').parent().parent().parent().parent().parent().parent().find('.ModalGroup_wrapper_Block').find("label").next().find("label").css("visibility", "hidden");

}

/* Edit Group Members Documents Again */
function SetUserDocumenteByEditOnSelectPicker(DocumentTypes) {

    debugger;

       if (DocumentTypes.some(x => x == "U")) {

           if (GLobalDocumentFile.filter(x => x.DocType == "U").length > 0)

           {
           
                var DocFiles = GLobalDocumentFile.find(x => x.DocType == "U").DocTypeFileName;

                $("#ModalGroupfileLabel").text(DocFiles.split('https://hajzapi.ada.ae/Documents/')[1]);
                $("#ModalGroupfiles1").rules('remove', 'required');
                var FileExtension = DocFiles.split('.').pop('.');

                if (FileExtension == 'pdf') {

                    $("#ModalGroupblah1").attr("src", "https://cdn-icons-png.flaticon.com/512/80/80942.png");

                }
                else if (FileExtension == "doc" || FileExtension == "docx") {


                    $("#ModalGroupblah1").attr("src", "data:image/png;base64,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");


                }

                else { $("#ModalGroupblah1").attr("src", DocFiles);}
          }
       }
       else
       {

                $("#ModalGroupfileLabel").text("Choose file");
                $('#ModalGroupblah1').prop("src", "");
        }


       if (DocumentTypes.some(x => x == "P")) {

           if (GLobalDocumentFile.filter(x => x.DocType == "P").length > 0) {

               var DocFiles = GLobalDocumentFile.find(x => x.DocType == "P").DocTypeFileName;

               $("#ModalGroupfileLabel2").text(DocFiles.split('https://hajzapi.ada.ae/Documents/')[1]);
               $("#ModalGroupfiles2").rules('remove', 'required');

               var FileExtension = DocFiles.split('.').pop('.');

               if (FileExtension == 'pdf') {

                   $("#ModalGroupblah2").attr("src", "https://cdn-icons-png.flaticon.com/512/80/80942.png");

               }
               else if (FileExtension == "doc" || FileExtension == "docx") {
                   $("#ModalGroupblah2").attr("src", "data:image/png;base64,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");
               }

               else { $("#ModalGroupblah2").attr("src", DocFiles); }
           }
       }
       else
       {
           $("#ModalGroupfileLabel2").text("Choose file");
           $('#ModalGroupblah2').prop("src", "");
       }


       if (DocumentTypes.some(x => x == "T")) {
           if (GLobalDocumentFile.filter(x => x.DocType == "T").length > 0) {

            var DocFiles = GLobalDocumentFile.find(x => x.DocType == "T").DocTypeFileName;

               $("#ModalGroupfileLabel3").text(DocFiles.split('https://hajzapi.ada.ae/Documents/')[1]);
               $("#ModalGroupfiles3").rules('remove', 'required');

            var FileExtension = DocFiles.split('.').pop('.');

            if (FileExtension == 'pdf') {

                $("#ModalGroupblah3").attr("src", "https://cdn-icons-png.flaticon.com/512/80/80942.png");

            }
            else if (FileExtension == "doc" || FileExtension == "docx")
            {
                $("#ModalGroupblah3").attr("src", "data:image/png;base64,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");
            }

            else {$("#ModalGroupblah3").attr("src", DocFiles);}
       }
      }
       else
       {

            $("#ModalGroupfileLabel3").text("Choose file");
            $('#ModalGroupblah3').prop("src", "");
       }

       if (DocumentTypes.some(x => x == "S")) {

        if (GLobalDocumentFile.filter(x => x.DocType == "S").length > 0) {

        var DocFiles = GLobalDocumentFile.find(x => x.DocType == "S").DocTypeFileName;

            $("#ModalGroupfileLabel4").text(DocFiles.split('https://hajzapi.ada.ae/Documents/')[1]);
            $("#ModalGroupfiles4").rules('remove', 'required');

        var FileExtension = DocFiles.split('.').pop('.');

        if (FileExtension == 'pdf') {

            $("#ModalGroupblah4").attr("src", "https://cdn-icons-png.flaticon.com/512/80/80942.png");

        }
        else if (FileExtension == "doc" || FileExtension == "docx")
        {
            $("#ModalGroupblah4").attr("src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAk1BMVEUqVpb////3+PoARI7R1+QkUpQUS5Hl6/MbTpJceaq0vtMMSI+SosEeUJMARo78/P1ngK1Rb6N/k7ilssvb4OovWZebqsbv8/g3YZ3i5+8AQYzr8PZgfazQ2ejK0eA7YZyInsFEaqJzjLadq8elt9TBzuEAOol8l8C3xdtqiLaRp8lPbqN1kLikttO0xNx0i7OHmbwiLw1dAAAJEUlEQVR4nO2d63qqOhCGFQ3iISIVChRRomUreGjv/+o2CAkBQSsLVoNrvl99RELeJpmZJGPoSa+u3uDV1QOBQCAQCAQCgUAgEAgEAoFAIBCoZSEsz+XfrkRLitk+rNXet9cvhogQ7hnGZhN4n7bajzWc/nadmhLCGBmb43jhnddOP9MrEEbtpvSs4+Jtdj64PNwrEEZsco8Eb7vJwR1JRbiOE0a2RDbGp/CwHtpmKVt3CSO2qWIF3kTXbfMeXAcJ4045n5L92TVNSVIfwXWJECHUi7wA2Yb+jSnpOmFsJw2irbbhxX2STXjCyAnIFhlv32af/qgWnMCEERsm2tbbHXz3oSnpGGHUKaeIrLylv65ycN0lRJGdNLT92Y+dQBNsAhHGDm5AgvBgO+YPfUBXCNFVxnH/Wc9Oik4YzQRWp/Of2EnBCdHRb8SUCEw4brn1OEK5ASlIYEJ50oCWKywu4aCRktzxk634NwmbcUGzJxuxg4QKEAJhKwLCJwSEQNiSgPAJASEQtiQgfEIiEzZTlMCESKsjsuwOYbqo96Tk9w4R1pIChEAIhE0Szuvov1l3COe2M6qh4g6YwISv7/H/gagNCH8mIATClgSET+jXCNXkkBjTlPSSLJUX8IeH8LQPjoTIgw+i316OCad6LRWTBFslVB1bt4fD4dr3ixSGjDG6Ji/ifUni4jUundaJSz/+ZlwqXU7BakWsjTEdnAqDKnusXFx2YIS11MrcQvf9w3K5nHkzP/e5OZYxQultecIRt/V8EJ/QI2RjGAZWcJj73LG4B+cJLxkhWYtPGNLq4q/Kak7zAzFkCRI4KOv2ghEeWG0Xuc/P3E975HPu0okRKl6Z26u/1jZtg3CUXbT5z7fcYMOn3C3HLMllVwKYrJcu6mg1aYGwv6FXSc7UWPx9hL9iEnZhU2ZohPP4K9oi1oXHyI0lhb/BZf8TpJWmcIoWtXmsO/Jdzs0Ryryp+TRYedtSDtEIfWpSMB9QnHNFK3zzvmefe6XVEo3QpGcQ4i8uil7lUubQnrvhjTW6cb4pTUTCPu10OedWuFHLrkgLRrgpz6QWjpBmOKJjVmGnkBNIsgrbLCMSHcsT/IUjDGkpVuYuLoW8Tq61fOYs0Kq8WsIRMlODMn8bFgiNzwyeeUoUlpQmIqFNCbmp0KqYm5tZzV1WnF9SWl88j983aaPgGc3kl0iBELGwXPXYQ3HFbDMmxG+1VIyRGiKkDYYDGpmysMVgd9K5vJk5C6viH3+NvHEdzdvZXZNoVIPGNHS5pGQooG1JqKnJkstRcI+wltraPzzQgWgN0088+n0W2rCgdc1MqVJhaAQk1GkxCp2xp1MnvNfn9F4atPosKp2XLLOJSkibRU4H+ijtifJFZUHrd2r+J5mhqQAUkHBER5sSJsaUOnXZ7lOjihfJreo7fSYfyZUQytMaams10aSmBm+TMIzOjyyHTfXpVNA5sXWd8olFSiiva8kuFNXUeukk7YvomFx/TyhQYPYvtJtuEvdus1hALp3fU0KhPH7UK9k0//o/NNN2ijstMzVKEtINmSkdFP/feUKRorbIx9FqJ+ZRp4YmajaTza286xhds2F4rDyIQEBCe5E2YtLzqMtDerz0TedWyeyR+U68r/yxpoCELKpRdnHFJrSVdD7g0eL2ldhUS/6sZBCQsL+jGEHUMOouKRaf4n7IGs2IwwFzS4esMiwvSlDCCf2CJmUOQXmP++GQeodrD3Y0ZpSqIhoxCdm8XYmg9JQisZ42uxQD2xSwfMdCXEKderl51DGHtJWuHnBEL6E4HNBpQIa96kMYBPSHfZVGKnFXTEdeOpeSWJhGIgf4ydYDKv19mrlX7/UxxZZvbg+YGdOQmcvE0ETAzAPqfXVPR6VVtnHIEfbmdd4e02L2JY1E8anvpN1SSZ+2pj5/uu6rrMuOqw2NgHOLSD5dtrD6I/pnui7lHtnMQ5XYks7pztFKQhLa1AvIbD5MN9tG1AWilSQxQ1OsivCEbPlwPvJzhiayQuwplsR2pIziVqb4hHTnWvZTo4O/qF1bUh84V9myDalYKv1DwjZ/UUK3zJSQtiYzawc6+GSfpjWgVeXUiRIadYSLu+YNEvps/TD9braO79IxikM20Xi7Ayikx48CTuoTqCXN+iGLtlHAtiyqFhIzQsGitkiFdXykZVHZN3XzbH6f2/LvCmFQIOSya3Y3BZG7h0wJShgWyuJW0g6bm3LuVktQwnXBxGcbhn39WNyJ2naRUM2/NNHg486b3cTyDAXBCfv5nfvcztmpSHj/rDdRCXNHMuVH2nuhHON+9UUlzJkazCfQcPtNSTHH+9US0+NHGLypyU/hzTxhHv9WMaGyrKXiAl6jhA5vagb56V8+HJDvhd0pYU+po0GrmexSLt8yf22bIxw8OAlUzNlTRMhFNUWXng8HUHkBwhOqHEZxb1Dn61yZoSA6Yd//wEqSbh0vOuXF17kyQ0F4Qud79r3dbseaRoziSOPH6PzR2a6Jpalz2GW7luYq03F0113fHHMaDGRFSX4JhHqPjhwW1Vvcle5P3t+9IAgIIeOfEIro8R9IlaSogR070qOATNSorTkB4RMCQiBsSUD4hIDwNwmbKUpgQjjNrFydOicKCIEQCH+fULSMocYJ55JaS90hfH2P/w9EbUD4MwEhELYkIHxCQAiELQkInxAQAmFLAsInJDJhIyWJ/P7D13+H5W+9h7T8BLlWCH9JBtG24fner0G6TphumPTINvTv/Pis04QpJ1bkgaLtz+7IMRt/CbIIhIni98bLVuBNhrrtvNq71TkhLCvW+BQefPfmsOnXILwq7rY9stq+Lw/u6E/DESEJE0WcyNIWX97uUHbW+gsQXoUQRsbmqC28uq+ZF50wVXyWt2EYq/3lYaZeRwlTRXZo+kECz7dN8+Y8gJcgTISxPO+Ng7P/I7fSRcKrEFKmyjFyn/5QH90LEzpLeBVK3Od2tpz4boX77DZhoqg5sUHGX9+zi3sbx78CYaLYr1hEW0TxkKu+JGGiCDNyKxstskPOaxKmQkiWB/h4+nTVtfz4651V7D5l6/H3QCAQCAQCgUAgEAgEAoFAIBAIBAL9M/of7UsnKTAofvIAAAAASUVORK5CYII=");

        }

        else { $("#ModalGroupblah4").attr("src", DocFiles);}
      }
    }
       else {

        $("#ModalGroupfileLabel4").text("Choose file");
        $('#ModalGroupblah4').prop("src", "");
    }


       if (DocumentTypes.some(x => x == "C")) {

           if (GLobalDocumentFile.filter(x => x.DocType == "C").length > 0) {

            var DocFiles = GLobalDocumentFile.find(x => x.DocType == "C").DocTypeFileName;

            $("#ModalGroupfileLabel5").text(DocFiles.split('https://hajzapi.ada.ae/Documents/')[1]);
            $("#ModalGroupfiles5").rules('remove', 'required');
            var FileExtension = DocFiles.split('.').pop('.');

            if (FileExtension == 'pdf') {

                $("#ModalGroupblah5").attr("src", "https://cdn-icons-png.flaticon.com/512/80/80942.png");

            }
            else if (FileExtension == "doc" || FileExtension == "docx") {
                $("#ModalGroupblah5").attr("src", "data:image/png;base64,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");

            }

            else { $("#ModalGroupblah5").attr("src", DocFiles); }
       }
     }
       else
       {

        $("#ModalGroupfileLabel5").text("Choose file");
        $('#ModalGroupblah5').prop("src", "");
       }


       if (DocumentTypes.some(x => x == "B")) {

           if (GLobalDocumentFile.filter(x => x.DocType == "B").length > 0) {

            var DocFiles = GLobalDocumentFile.find(x => x.DocType == "B").DocTypeFileName;

            $("#ModalGroupfileLabel6").text(DocFiles.split('https://hajzapi.ada.ae/Documents/')[1]);
               $("#ModalGroupfiles6").rules('remove', 'required');
            var FileExtension = DocFiles.split('.').pop('.');

            if (FileExtension == 'pdf') {

                $("#ModalGroupblah6").attr("src", "https://cdn-icons-png.flaticon.com/512/80/80942.png");

            }
            else if (FileExtension == "doc" || FileExtension == "docx") {
                $("#ModalGroupblah6").attr("src", "data:image/png;base64,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");

            }

            else { $("#ModalGroupblah6").attr("src", DocFiles); }
       }
     }
       else
       {

        $("#ModalGroupfileLabel6").text("Choose file");
        $('#ModalGroupblah6').prop("src", "");
       }

   //$('#modalOtherMembersNationalityDocumentType').parent().parent().parent().parent().parent().parent().find('.ModalGroup_wrapper_Block').find("label").next().find("label").css("visibility", "hidden");

}

/* Edit Corporate Members Documents Again */
function SetCorporateUserDocumenteByEditOnSelectPicker(DocumentTypes) {

    debugger;

       if (DocumentTypes.some(x => x == "U")) {

           if (GLobalDocumentFile.filter(x => x.DocType == "U").length > 0)

           {
           
                var DocFiles = GLobalDocumentFile.find(x => x.DocType == "U").DocTypeFileName;

               $("#CorporateModalGroupfileLabel").text(DocFiles.split('https://hajzapi.ada.ae/Documents/')[1]);
               $("#CorporateModalGroupfiles1").rules('remove', 'required');
                var FileExtension = DocFiles.split('.').pop('.');

                if (FileExtension == 'pdf') {

                    $("#CorporateModalGroupblah1").attr("src", "https://cdn-icons-png.flaticon.com/512/80/80942.png");

                }
                else if (FileExtension == "doc" || FileExtension == "docx") {


                    $("#CorporateModalGroupblah1").attr("src", "data:image/png;base64,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");


                }

                else { $("#CorporateModalGroupblah1").attr("src", DocFiles);}
          }
       }
       else
       {

           $("#CorporateModalGroupfileLabel").text("Choose file");
           $('#CorporateModalGroupblah1').prop("src", "");
        }


       if (DocumentTypes.some(x => x == "P")) {

           if (GLobalDocumentFile.filter(x => x.DocType == "P").length > 0) {

               var DocFiles = GLobalDocumentFile.find(x => x.DocType == "P").DocTypeFileName;

               $("#CorporateModalGroupfileLabel2").text(DocFiles.split('https://hajzapi.ada.ae/Documents/')[1]);
               $("#CorporateModalGroupfiles2").rules('remove', 'required');
               var FileExtension = DocFiles.split('.').pop('.');

               if (FileExtension == 'pdf') {

                   $("#CorporateModalGroupblah2").attr("src", "https://cdn-icons-png.flaticon.com/512/80/80942.png");

               }
               else if (FileExtension == "doc" || FileExtension == "docx") {
                   $("#CorporateModalGroupblah2").attr("src", "data:image/png;base64,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");
               }

               else { $("#CorporateModalGroupblah2").attr("src", DocFiles); }
           }
       }
       else
       {
           $("#CorporateModalGroupfileLabel2").text("Choose file");
           $('#CorporateModalGroupblah2').prop("src", "");
       }


       if (DocumentTypes.some(x => x == "T")) {
           if (GLobalDocumentFile.filter(x => x.DocType == "T").length > 0) {

            var DocFiles = GLobalDocumentFile.find(x => x.DocType == "T").DocTypeFileName;

               $("#CorporateModalGroupfileLabel3").text(DocFiles.split('https://hajzapi.ada.ae/Documents/')[1]);
               $("#CorporateModalGroupfiles3").rules('remove', 'required');
            var FileExtension = DocFiles.split('.').pop('.');

            if (FileExtension == 'pdf') {

                $("#CorporateModalGroupblah3").attr("src", "https://cdn-icons-png.flaticon.com/512/80/80942.png");

            }
            else if (FileExtension == "doc" || FileExtension == "docx")
            {
                $("#CorporateModalGroupblah3").attr("src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAk1BMVEUqVpb////3+PoARI7R1+QkUpQUS5Hl6/MbTpJceaq0vtMMSI+SosEeUJMARo78/P1ngK1Rb6N/k7ilssvb4OovWZebqsbv8/g3YZ3i5+8AQYzr8PZgfazQ2ejK0eA7YZyInsFEaqJzjLadq8elt9TBzuEAOol8l8C3xdtqiLaRp8lPbqN1kLikttO0xNx0i7OHmbwiLw1dAAAJEUlEQVR4nO2d63qqOhCGFQ3iISIVChRRomUreGjv/+o2CAkBQSsLVoNrvl99RELeJpmZJGPoSa+u3uDV1QOBQCAQCAQCgUAgEAgEAoFAIBCoZSEsz+XfrkRLitk+rNXet9cvhogQ7hnGZhN4n7bajzWc/nadmhLCGBmb43jhnddOP9MrEEbtpvSs4+Jtdj64PNwrEEZsco8Eb7vJwR1JRbiOE0a2RDbGp/CwHtpmKVt3CSO2qWIF3kTXbfMeXAcJ4045n5L92TVNSVIfwXWJECHUi7wA2Yb+jSnpOmFsJw2irbbhxX2STXjCyAnIFhlv32af/qgWnMCEERsm2tbbHXz3oSnpGGHUKaeIrLylv65ycN0lRJGdNLT92Y+dQBNsAhHGDm5AgvBgO+YPfUBXCNFVxnH/Wc9Oik4YzQRWp/Of2EnBCdHRb8SUCEw4brn1OEK5ASlIYEJ50oCWKywu4aCRktzxk634NwmbcUGzJxuxg4QKEAJhKwLCJwSEQNiSgPAJASEQtiQgfEIiEzZTlMCESKsjsuwOYbqo96Tk9w4R1pIChEAIhE0Szuvov1l3COe2M6qh4g6YwISv7/H/gagNCH8mIATClgSET+jXCNXkkBjTlPSSLJUX8IeH8LQPjoTIgw+i316OCad6LRWTBFslVB1bt4fD4dr3ixSGjDG6Ji/ifUni4jUundaJSz/+ZlwqXU7BakWsjTEdnAqDKnusXFx2YIS11MrcQvf9w3K5nHkzP/e5OZYxQultecIRt/V8EJ/QI2RjGAZWcJj73LG4B+cJLxkhWYtPGNLq4q/Kak7zAzFkCRI4KOv2ghEeWG0Xuc/P3E975HPu0okRKl6Z26u/1jZtg3CUXbT5z7fcYMOn3C3HLMllVwKYrJcu6mg1aYGwv6FXSc7UWPx9hL9iEnZhU2ZohPP4K9oi1oXHyI0lhb/BZf8TpJWmcIoWtXmsO/Jdzs0Ryryp+TRYedtSDtEIfWpSMB9QnHNFK3zzvmefe6XVEo3QpGcQ4i8uil7lUubQnrvhjTW6cb4pTUTCPu10OedWuFHLrkgLRrgpz6QWjpBmOKJjVmGnkBNIsgrbLCMSHcsT/IUjDGkpVuYuLoW8Tq61fOYs0Kq8WsIRMlODMn8bFgiNzwyeeUoUlpQmIqFNCbmp0KqYm5tZzV1WnF9SWl88j983aaPgGc3kl0iBELGwXPXYQ3HFbDMmxG+1VIyRGiKkDYYDGpmysMVgd9K5vJk5C6viH3+NvHEdzdvZXZNoVIPGNHS5pGQooG1JqKnJkstRcI+wltraPzzQgWgN0088+n0W2rCgdc1MqVJhaAQk1GkxCp2xp1MnvNfn9F4atPosKp2XLLOJSkibRU4H+ijtifJFZUHrd2r+J5mhqQAUkHBER5sSJsaUOnXZ7lOjihfJreo7fSYfyZUQytMaams10aSmBm+TMIzOjyyHTfXpVNA5sXWd8olFSiiva8kuFNXUeukk7YvomFx/TyhQYPYvtJtuEvdus1hALp3fU0KhPH7UK9k0//o/NNN2ijstMzVKEtINmSkdFP/feUKRorbIx9FqJ+ZRp4YmajaTza286xhds2F4rDyIQEBCe5E2YtLzqMtDerz0TedWyeyR+U68r/yxpoCELKpRdnHFJrSVdD7g0eL2ldhUS/6sZBCQsL+jGEHUMOouKRaf4n7IGs2IwwFzS4esMiwvSlDCCf2CJmUOQXmP++GQeodrD3Y0ZpSqIhoxCdm8XYmg9JQisZ42uxQD2xSwfMdCXEKderl51DGHtJWuHnBEL6E4HNBpQIa96kMYBPSHfZVGKnFXTEdeOpeSWJhGIgf4ydYDKv19mrlX7/UxxZZvbg+YGdOQmcvE0ETAzAPqfXVPR6VVtnHIEfbmdd4e02L2JY1E8anvpN1SSZ+2pj5/uu6rrMuOqw2NgHOLSD5dtrD6I/pnui7lHtnMQ5XYks7pztFKQhLa1AvIbD5MN9tG1AWilSQxQ1OsivCEbPlwPvJzhiayQuwplsR2pIziVqb4hHTnWvZTo4O/qF1bUh84V9myDalYKv1DwjZ/UUK3zJSQtiYzawc6+GSfpjWgVeXUiRIadYSLu+YNEvps/TD9braO79IxikM20Xi7Ayikx48CTuoTqCXN+iGLtlHAtiyqFhIzQsGitkiFdXykZVHZN3XzbH6f2/LvCmFQIOSya3Y3BZG7h0wJShgWyuJW0g6bm3LuVktQwnXBxGcbhn39WNyJ2naRUM2/NNHg486b3cTyDAXBCfv5nfvcztmpSHj/rDdRCXNHMuVH2nuhHON+9UUlzJkazCfQcPtNSTHH+9US0+NHGLypyU/hzTxhHv9WMaGyrKXiAl6jhA5vagb56V8+HJDvhd0pYU+po0GrmexSLt8yf22bIxw8OAlUzNlTRMhFNUWXng8HUHkBwhOqHEZxb1Dn61yZoSA6Yd//wEqSbh0vOuXF17kyQ0F4Qud79r3dbseaRoziSOPH6PzR2a6Jpalz2GW7luYq03F0113fHHMaDGRFSX4JhHqPjhwW1Vvcle5P3t+9IAgIIeOfEIro8R9IlaSogR070qOATNSorTkB4RMCQiBsSUD4hIDwNwmbKUpgQjjNrFydOicKCIEQCH+fULSMocYJ55JaS90hfH2P/w9EbUD4MwEhELYkIHxCQAiELQkInxAQAmFLAsInJDJhIyWJ/P7D13+H5W+9h7T8BLlWCH9JBtG24fner0G6TphumPTINvTv/Pis04QpJ1bkgaLtz+7IMRt/CbIIhIni98bLVuBNhrrtvNq71TkhLCvW+BQefPfmsOnXILwq7rY9stq+Lw/u6E/DESEJE0WcyNIWX97uUHbW+gsQXoUQRsbmqC28uq+ZF50wVXyWt2EYq/3lYaZeRwlTRXZo+kECz7dN8+Y8gJcgTISxPO+Ng7P/I7fSRcKrEFKmyjFyn/5QH90LEzpLeBVK3Od2tpz4boX77DZhoqg5sUHGX9+zi3sbx78CYaLYr1hEW0TxkKu+JGGiCDNyKxstskPOaxKmQkiWB/h4+nTVtfz4651V7D5l6/H3QCAQCAQCgUAgEAgEAoFAIBAIBAL9M/of7UsnKTAofvIAAAAASUVORK5CYII=");
            }

            else { $("#CorporateModalGroupblah3").attr("src", DocFiles);}
       }
      }
       else
       {

           $("#CorporateModalGroupfileLabel3").text("Choose file");
           $('#CorporateModalGroupblah3').prop("src", "");
       }

       if (DocumentTypes.some(x => x == "S")) {

        if (GLobalDocumentFile.filter(x => x.DocType == "S").length > 0) {

        var DocFiles = GLobalDocumentFile.find(x => x.DocType == "S").DocTypeFileName;

            $("#CorporateModalGroupfileLabel4").text(DocFiles.split('https://hajzapi.ada.ae/Documents/')[1]);
            $("#CorporateModalGroupfiles4").rules('remove', 'required');
        var FileExtension = DocFiles.split('.').pop('.');

        if (FileExtension == 'pdf') {

            $("#CorporateModalGroupblah4").attr("src", "https://cdn-icons-png.flaticon.com/512/80/80942.png");

        }
        else if (FileExtension == "doc" || FileExtension == "docx")
        {
            $("#CorporateModalGroupblah4").attr("src", "data:image/png;base64,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");

        }

        else { $("#CorporateModalGroupblah4").attr("src", DocFiles);}
      }
    }
       else {

        $("#ModalGroupfileLabel4").text("Choose file");
           $('#CorporateModalGroupblah4').prop("src", "");
    }


       if (DocumentTypes.some(x => x == "C")) {

           if (GLobalDocumentFile.filter(x => x.DocType == "C").length > 0) {

            var DocFiles = GLobalDocumentFile.find(x => x.DocType == "C").DocTypeFileName;

               $("#CorporateModalGroupfileLabel5").text(DocFiles.split('https://hajzapi.ada.ae/Documents/')[1]);
               $("#CorporateModalGroupfiles5").rules('remove', 'required');
            var FileExtension = DocFiles.split('.').pop('.');

            if (FileExtension == 'pdf') {

                $("#CorporateModalGroupblah5").attr("src", "https://cdn-icons-png.flaticon.com/512/80/80942.png");

            }
            else if (FileExtension == "doc" || FileExtension == "docx") {
                $("#CorporateModalGroupblah5").attr("src", "data:image/png;base64,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");

            }

            else { $("#CorporateModalGroupblah5").attr("src", DocFiles); }
       }
     }
       else
       {

           $("#CorporateModalGroupfileLabel5").text("Choose file");
           $('#CorporateModalGroupblah5').prop("src", "");
       }


       if (DocumentTypes.some(x => x == "B")) {

           if (GLobalDocumentFile.filter(x => x.DocType == "B").length > 0) {

            var DocFiles = GLobalDocumentFile.find(x => x.DocType == "B").DocTypeFileName;

               $("#CorporateModalGroupfileLabel6").text(DocFiles.split('https://hajzapi.ada.ae/Documents/')[1]);
               $("#CorporateModalGroupfiles6").rules('remove', 'required');
            var FileExtension = DocFiles.split('.').pop('.');

            if (FileExtension == 'pdf') {

                $("#CorporateModalGroupblah6").attr("src", "https://cdn-icons-png.flaticon.com/512/80/80942.png");

            }
            else if (FileExtension == "doc" || FileExtension == "docx") {
                $("#CorporateModalGroupblah6").attr("src", "data:image/png;base64,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");

            }

            else { $("#CorporateModalGroupblah6").attr("src", DocFiles); }
       }
     }
       else
       {

           $("#CorporateModalGroupfileLabel6").text("Choose file");
           $('#CorporateModalGroupblah6').prop("src", "");
       }

   //$('#modalOtherMembersNationalityDocumentType').parent().parent().parent().parent().parent().parent().find('.ModalGroup_wrapper_Block').find("label").next().find("label").css("visibility", "hidden");

}



/* Add Other Member */
$("#RegisterOther").click(function (e) {


    swal({
        title: IfArabic ? "هل انت متأكد؟" : "Are you sure?",

        text: IfArabic ? "الحجز للعضو الجديد سيكون في لائحة الأنتظار للرحلات التى لم تغادر بعد" : "The reservation of the new member will be in the Waiting List for all non-departed flights.",
        icon: "warning",
        buttons: [
            IfArabic ?"لا ، قم بإلغائها!":'No, cancel it!',
            IfArabic ? 'نعم ' : 'Yes'
        ],
        dangerMode: true,
    }).then(function (isConfirm) {
        if (isConfirm) {

            if ($('#AddNewMemberForm').valid()) {


                var formData = new FormData();


                var DataArr = [];


                var obj = {

                    Language: Language,
                    Honorifics: $('#NewMemberTitle').selectpicker('val'),
                    Name: $('#NewMemberName').val(),
                    Email: $('#NewMemberEmail').val(),
                    Nationality: $('#NewMemberNationality').val(),
                    Birthdate: IfArabic ?  moment($("#NewMemberBirthdate").val(), "DD-MMM-YYYY").locale("en").format("DD-MMM-YYYY"): $("#NewMemberBirthdate").val(),
                        
                    Documents: $('#NewMemberDocuments').val(),
                    DocumentType: $('#NewMemberDocumentType').val(),
                    Mobile: $('#NewMemberMobile').val(),
                    IsDelmaIsland: $('#NewMemberActiveDelmaIsland').is(":checked"),
                    IsUAEId: $('#NewMemberActiveUAEID').is(":checked"),
                    IsHead: $('#NewMemberIsHead').is(":checked"),
                    UserId: UserId

                }

                DataArr.push(obj);


                var FileData = [];

                var RowLength = $(".wrapper_Block2").find('.row').children().length;

                debugger;

                for (var i = 1; i <= RowLength; i++) {


                    var file = $(".wrapper_Block2").find(`#NewMemberfiles${i}`).get(0).files;

                    if (file.length != 0) {


                        FileData.push(file[0]);

                    }

                }
                for (var i = 0; i < FileData.length; i++) {


                    formData.append("File", FileData[i]);

                }
                debugger
                formData.append("GroupData", JSON.stringify(DataArr))

                debugger
                if (MemberType == 'Group') {
                    postRequestWithoutStringfy(ApiUrl + "Register/AddOtherGroupMember", formData, function (res) {

                        if (res.status == 200) {
                            if (res.data && res.data != null) {
                                $('#preloader').hide();
                                swal( {
                                    icon: "success",
                                    title: IfArabic ? "مسجل" : "Registered",
                                    buttons: [null, IfArabic ? "موافق" : "OK"],
                                    dangerMode: false,
                                    text: IfArabic ? "تم تسجيل العضو بنجاح ، \n الرجاء الاتصال بالوكيل لمزيد من التفاصيل" : res.responseMsg,
                                });

                                MyProfileMembersById(UserId)
                                $('#addEmployeeModal').modal('hide')

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
                                title: IfArabic ? "خطأ" : "Error",
                                dangerMode: true,
                                text: IfArabic ? "عفواً! هنالك خطأ ما" : "Ooops! Something went wrong.",
                                buttons: [null, IfArabic ? "موافق" : "OK"],
                            });
                        }
                        if (res.status == 500) {
                            $('#preloader').hide();
                            swal({
                                icon: "error",
                                title: IfArabic ? "خطأ" : "Error",
                                dangerMode: true,
                                text: IfArabic ? "عفواً! هنالك خطأ ما" : "Ooops! Something went wrong.",
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
                                icon: "info",
                                title: IfArabic ? "معلومات" : "info",
                                dangerMode: false,
                                text: res.responseMsg,
                                buttons: [null, IfArabic ? "موافق" : "OK"],
                            })
                        }

                    });
                }
                else {
                    postRequestWithoutStringfy(ApiUrl + "Register/AddOtherCorporateMember", formData, function (res) {

                        if (res.status == 200) {
                            if (res.data && res.data != null) {
                                $('#preloader').hide();
                                swal(res.responseMsg, {
                                    icon: "success",
                                    title: IfArabic ? "مسجل" : "Registered",
                                    buttons: [null, IfArabic ? "موافق" : "OK"],
                                    dangerMode: false,
                                    text: IfArabic ? "تم تسجيل العضو بنجاح ، \n الرجاء الاتصال بالوكيل لمزيد من التفاصيل" : res.responseMsg,
                                });
                                $('#addEmployeeModal').modal('hide')
                                MyProfileMembersById(UserId)
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
                                title: IfArabic ? "خطأ" : "Error",
                                buttons: [null, IfArabic ? "موافق" : "OK"],
                                dangerMode: true,
                                text: IfArabic ? "عفواً! هنالك خطأ ما" : "Ooops! Something went wrong.",
                            });
                        }
                        if (res.status == 500) {
                            $('#preloader').hide();
                            swal({
                                icon: "error",
                                title: IfArabic ? "خطأ" : "Error",
                                buttons: [null, IfArabic ? "موافق" : "OK"],
                                dangerMode: true,
                                text: IfArabic ? "عفواً! هنالك خطأ ما" : "Ooops! Something went wrong.",
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
                                title: IfArabic ? "معلومات" : "info",
                                buttons: [null, IfArabic ? "موافق" : "OK"],
                                dangerMode: false,
                                text: res.responseMsg,
                            })
                        }

                    });
                }


            }
        }
    })

    
});

/*Update Other Group Members*/
$("#GroupUpdateButton").click(function () {

    swal({
        title: IfArabic ? "هل انت متأكد؟" : "Are you sure?",

        text: IfArabic ? "هل انت متأكد من تغير معلومات العضو" : "Are you sure to edit this member profile?",

        icon: "warning",
        buttons: [
            IfArabic ? 'رقم!' : 'No!',
            IfArabic ? 'نعم ' : 'Yes'
        ],
        dangerMode: true,
    }).then(function (isConfirm) {
        if (isConfirm) {

            if ($("#ModalGroupUpdateForm").valid()) {

                var formData = new FormData();

                var FileData = [];

                var RowLength = $(".ModalGroup_wrapper_Block").children().length;

                debugger;

                for (var i = 1; i <= RowLength; i++) {


                    var files = $(".ModalGroup_wrapper_Block").find(`#ModalGroupfiles${i}`).get(0).files;

                    if (files.length != 0) {

                        debugger;
                        FileData.push(files[0]);
                    }
                    else {


                        var OldFilePath = $(".ModalGroup_wrapper_Block").find(`#ModalGroupfiles${i}`).parent().find("label").text();


                        if (OldFilePath != 'Choose file') {

                            FileData.push(OldFilePath);
                        }

                    }

                }

                for (var i = 0; i < FileData.length; i++) {


                    debugger;

                    if (FileData[i].name == undefined) {


                        formData.append("fileInput", FileData[i]);


                    }

                    else {

                        formData.append("File", FileData[i]);
                        formData.append("fileInput", null);

                    }

                }

                
                formData.append("Id", $("#HdUpdateGroupId").val());
                formData.append("Honorifics", $('#modalOtherMembersGender').selectpicker("val"));
                formData.append("Name", $("#modalOtherMembersName").val());
                formData.append("Email", $("#modalOtherMembersEmail").val().toLowerCase());
                formData.append("Nationality", $("#modalOtherMembersNationality").selectpicker("val"));
                debugger
                IfArabic ?
                    [
                        formData.append("Birthdate", moment($("#modalOtherMembersNationalityBirthdate").val(), "DD-MMM-YYYY").locale("en").format("DD-MMM-YYYY"))
                    ] :
                    [
                        formData.append("Birthdate", $("#modalOtherMembersNationalityBirthdate").val())
                    ];

                formData.append("Mobile", $('#modalOtherMembersNationalityMobile').val());
                formData.append("Documents", $("#modalOtherMembersNationalityDocument").val());
                formData.append("DocumentType", $("#modalOtherMembersNationalityDocumentType").selectpicker("val"));
                formData.append("IsDelmaIsland", $('.modalRGActiveDelmaIsland').is(":checked"));
                formData.append("IsHead", $('.modalIsHead').is(":checked"));
                formData.append("IsUAEId", false);

                postRequestWithoutStringfy(ApiUrl + "Register/UpdateGroup", formData, function (res) {

                    if (res.status == 200) {
                        {


                            swal({
                                title: IfArabic ? "معلومات":"info",
                                text: IfArabic ? "تم تحميل الملف الشخصي بنجاح" : "Your Profile has been Updated Successfully.",
                                icon: "info",
                                dangerMode: false,
                                buttons: [null, IfArabic ? "موافق" : "OK"],
                            });
                            $("#UpdateGroupModal").modal("hide");
                            MyProfileMembersById(UserId);
                            $(document).find("input").val('');
                            $(document).find("select").val('').selectpicker("refresh");
                        }
                        MyProfileMembersById(UserId)
                    }
                    if (res.status == 401) {

                        localStorage.removeItem("Menu");
                        localStorage.removeItem("userData");
                        window.location.href = baseWebUrl + "Dashboard";
                    }
                    if (res.status == 403) {


                        swal(res.responseMsg, {
                            icon: "error",
                            title: "Error",
                            buttons: [null, IfArabic ? "موافق" : "OK"],
                            dangerMode: true,
                            text: IfArabic ? "عفواً! هنالك خطأ ما" : "Ooops! Something went wrong.",
                        });
                    }
                    if (res.status == 500) {

                        swal({
                            title: "Error",
                            text: res.responseMsg,
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
                        debugger
                        swal({
                            title: "error",
                            text: res.responseMsg,
                            icon: "error",
                            dangerMode: true,
                            buttons: [null, IfArabic ? "موافق" : "OK"],
                        })

                    }

                });


            }
        }
    });

   
});

$("#CorporateUpdateButton").click(function () {

    swal({
        title: IfArabic ? "هل انت متأكد؟" : "Are you sure?",

        text: IfArabic ? "هل انت متأكد من تغير معلومات العضو" : "Are you sure to edit this member profile?",

        icon: "warning",
        buttons: [
            IfArabic ? 'رقم!' : 'No!',
            IfArabic ? 'نعم ' : 'Yes'
        ],
        dangerMode: true,
    }).then(function (isConfirm) {
        if (isConfirm) {
            if ($("#ModalCorporateUpdateForm").valid()) {

                var formData = new FormData();

                var FileData = [];

                var RowLength = $(".CorporateModalGroup_wrapper_Block").children().length;

                debugger;

                for (var i = 1; i <= RowLength; i++) {


                    var files = $(".CorporateModalGroup_wrapper_Block").find(`#CorporateModalGroupfiles${i}`).get(0).files;

                    if (files.length != 0) {

                        debugger;
                        FileData.push(files[0]);
                    }
                    else {


                        var OldFilePath = $(".CorporateModalGroup_wrapper_Block").find(`#CorporateModalGroupfiles${i}`).parent().find("label").text();


                        if (OldFilePath != 'Choose file') {

                            FileData.push(OldFilePath);
                        }

                    }

                }

                for (var i = 0; i < FileData.length; i++) {


                    debugger;

                    if (FileData[i].name == undefined) {


                        formData.append("fileInput", FileData[i]);


                    }

                    else {

                        formData.append("File", FileData[i]);
                        formData.append("fileInput", null);

                    }

                }

                formData.append("Id", $("#HdUpdateCorporateId").val());
                formData.append("Honorifics", $('#CorporatemodalOtherMembersGender').selectpicker("val"));
                formData.append("Name", $("#CorporatemodalOtherMembersName").val());
                formData.append("Email", $("#CorporatemodalOtherMembersEmail").val().toLowerCase());
                debugger
                formData.append("Nationality", $("#CorporatemodalOtherMembersNationality").selectpicker("val"));
                IfArabic ?
                    [
                    formData.append("Birthdate", moment($("#CorporatemodalOtherMembersNationalityBirthdate").val(), "DD-MMM-YYYY").locale("en").format("DD-MMM-YYYY"))
                    ] :
                    [
                        formData.append("Birthdate", $("#CorporatemodalOtherMembersNationalityBirthdate").val())
                    ];
                formData.append("Mobile", $('#CorporatemodalOtherMembersNationalityMobile').val());
                formData.append("Documents", $("#CorporatemodalOtherMembersNationalityDocument").val());
                formData.append("DocumentType", $("#CorporatemodalOtherMembersNationalityDocumentType").selectpicker("val"));
                formData.append("IsDelmaIsland", $('.CorporatemodalRGActiveDelmaIsland').is(":checked"));
                formData.append("GovEntity", $('#CorporateModalGovEntity').is(":checked"));
                formData.append("IsHead", $('.CorporatemodalIsHead').is(":checked"));
                formData.append("IsUAEId", false);
                debugger
                postRequestWithoutStringfy(ApiUrl + "Register/UpdateCorporate", formData, function (res) {

                    if (res.status == 200) {
                        {
                            swal({
                                title: IfArabic ? "معلومات" : "info",
                                text: IfArabic ? "تم تحميل الملف الشخصي بنجاح" : "Your Profile has been Updated Successfully.",

                                icon: "info",
                                dangerMode: false,
                                buttons: [null, IfArabic ? "موافق" : "OK"],
                            });

                            $("#UpdateCorporateModal").modal("hide");
                            MyProfileMembersById(UserId)
                            $(document).find("input").val('');
                            $(document).find("select").val('').selectpicker("refresh");
                           
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
                            text: IfArabic ? "هناك خطأ ما!" : "Something went wrong",
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
    });

    
});

/*Delete Other  Member*/
function DeleteMember(id) {
    swal({
        title: IfArabic ? "هل انت متأكد؟" : "Are you sure?",

        text: IfArabic ? "هل انت متأكد من حذق هذا العضو" : "Are you sure you want to delete this member?",
        icon: "warning",
        buttons: [
            IfArabic ? 'رقم!' : 'No!',
            IfArabic ? 'نعم ' : 'Yes'
        ],
        dangerMode: true,
    }).then(function (isConfirm) {

        if (isConfirm) {

            if (MemberType == "Group") {
                postRequest($("#baseApiUrl").val() + "Register/DeleteGroupMember/" + id, null, function (res) {
                    $('#preloader').show();

                    if (res.status == 200) {
                        $('#preloader').hide();
                        swal({
                            title: IfArabic ? "ملف العضو تم حذفة" : "Member profile deleted.",
                            text: IfArabic ? "ملف العضو تم حذفة" : "Member profile deleted.",
                            icon: "success",
                            buttons: [null, IfArabic ? "موافق" : "OK"],
                        });

                        MyProfileMembersById(UserId)


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
            else {
                postRequest($("#baseApiUrl").val() + "Register/DeleteCorporateMember/" + id, null, function (res) {
                    $('#preloader').show();

                    if (res.status == 200) {
                        $('#preloader').hide();
                        swal({
                            title: IfArabic ? "ملف العضو تم حذفة" : "Member profile deleted.",
                            text: IfArabic ? "ملف العضو تم حذفة" : "Member profile deleted.",
                            icon: "success",
                            buttons: [null, IfArabic ? "موافق" : "OK"],
                        });

                        MyProfileMembersById(UserId)

                        //location.reload();


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
    })

}

$(document).on('change', 'select', function () {
    $(this).valid();
})

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

$("#RegisterForm").validate({

    rules: {
        Honorifics: {
            required: true,


        },
        Name: {
            required: true,

        },
        Username: {
            required: true,

        },
        Email: {
            required: false,
            email: true,
        },
        Nationality: {
            required: true,

        },
        DocumentType: {
            required: true,

        },
        Birthdate: {
            required: true,

        },
        Documents: {
            required: true,

        },
        Mobile: {
            required: true,
            minlength: 9,
            maxlength: 9
        },

        files1: {
            required: true,
            extension: "doc|docx|jpeg|jpg|png|pdf",
            filesize: 2000000,
        },

        files2: {
            required: true,
            extension: "doc|docx|jpeg|jpg|png|pdf",
            filesize: 2000000,
        },
        files3: {
            required: true,
            extension: "doc|docx|jpeg|jpg|png|pdf",
            filesize: 2000000,
        },
        files4: {
            required: true,
            extension: "doc|docx|jpeg|jpg|png|pdf",
            filesize: 2000000,
        },
        files5: {
            required: true,
            extension: "doc|docx|jpeg|jpg|png|pdf",
            filesize: 2000000,
        },
        files6: {
            required: true,
            extension: "doc|docx|jpeg|jpg|png|pdf",
            filesize: 2000000,
        },
    },
    messages: {
        Honorifics: IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
        Name: IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
        Username: IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",       
        Email: {

            email: IfArabic ? "هذه الخانة مطلوبهعنوان بريد إلكتروني غير صالح" : "Invalid email format",
        },
        Nationality: IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
        DocumentType: IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
        Birthdate: IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
        Documents: IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
        Mobile: {
            required: IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
            minlength: IfArabic ? "يجب أن يكون طول الجوال 9 أرقام" : "The length of mobile must be 9 digits",
            maxlength: IfArabic ? "يجب أن يكون طول الجوال 9 أرقام" : "The length of mobile must be 9 digits",
        },
        files1: {
            required: IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
            extension: IfArabic ? "الرجاء تحميل وتنسيق ملف صالح" : "Please upload a valid file format."

        },
        files2: {
            required: IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
            extension: IfArabic ? "الرجاء تحميل وتنسيق ملف صالح" : "Please upload a valid file format."

        },
        files3: {
            required: IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
            extension: IfArabic ? "الرجاء تحميل وتنسيق ملف صالح" : "Please upload a valid file format."

        },
        files4: {
            required: IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
            extension: IfArabic ? "الرجاء تحميل وتنسيق ملف صالح" : "Please upload a valid file format."

        },
        files5: {
            required: IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
            extension: IfArabic ? "الرجاء تحميل وتنسيق ملف صالح" : "Please upload a valid file format."

        },
        files6: {
            required: IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
            extension: IfArabic ? "الرجاء تحميل وتنسيق ملف صالح" : "Please upload a valid file format."
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


 $("#AddNewMemberForm").validate({

        rules: {
            NewMemberTitle: {
                required: true,


            },
            NewMemberName: {
                required: true,

            },
            NewMemberEmail: {
                email: true,
                required: false,

            },

            NewMemberMobile: {
                required: true,
                minlength: 9,
                maxlength: 9
            },
            NewMemberNationality: {
                required: true,

            },
            NewMemberBirthdate: {
                required: true,

            },
            NewMemberDocuments: {
                required: true,

            },
            NewMemberDocumentType: {
                required: true,

            },

            NewMemberfiles1: {
                required: true,
                extension: "png|jpeg|jpg|doc|docx|pdf",
                filesize: 2000000,
            },
            NewMemberfiles2: {
                required: true,
                extension: "png|jpeg|jpg|doc|docx|pdf",
                filesize: 2000000,
            },
            NewMemberfiles3: {
                required: true,
                extension: "png|jpeg|jpg|doc|docx|pdf",
                filesize: 2000000,
            },
            NewMemberfiles4: {
                required: true,
                extension: "png|jpeg|jpg|doc|docx|pdf",
                filesize: 2000000,
            },
            NewMemberfiles5: {
                required: true,
                extension: "png|jpeg|jpg|doc|docx|pdf",
                filesize: 2000000,
            },
            NewMemberfiles6: {
                required: true,
                extension: "png|jpeg|jpg|doc|docx|pdf",
                filesize: 2000000,
            },
        },
        messages: {
            NewMemberTitle: IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
            NewMemberName: IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
            NewMemberEmail:
            {
                required: IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
                email: IfArabic ? "الرجاء ادخال بريد الكتروني فعال" : "Please enter a valid email.",


            },
            NewMemberMobile: {

                required: IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
                minlength: IfArabic ? "يجب أن يكون طول الجوال 9 أرقام" : "The length of mobile must be 9 digits",
                maxlength: IfArabic ? "يجب أن يكون طول الجوال 9 أرقام" : "The length of mobile must be 9 digits",
                
            },
            NewMemberNationality: IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
            NewMemberBirthdate: IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
            NewMemberDocuments: IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
            NewMemberDocumentType: IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
            NewMemberfiles1: {
                required: IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
                extension: IfArabic ? "الرجاء تحميل وتنسيق ملف صالح" : "Please upload a valid file format."

            },
            NewMemberfiles1: {
                required: IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
                extension: IfArabic ? "الرجاء تحميل وتنسيق ملف صالح" : "Please upload a valid file format."

            },
            NewMemberfiles2: {
                required: IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
                extension: IfArabic ? "الرجاء تحميل وتنسيق ملف صالح" : "Please upload a valid file format."

            },
            NewMemberfiles3: {
                required: IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
                extension: IfArabic ? "الرجاء تحميل وتنسيق ملف صالح" : "Please upload a valid file format."

            },
            NewMemberfiles4: {
                required: IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
                extension: IfArabic ? "الرجاء تحميل وتنسيق ملف صالح" : "Please upload a valid file format."

            },
            NewMemberfiles5: {
                required: IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
                extension: IfArabic ? "الرجاء تحميل وتنسيق ملف صالح" : "Please upload a valid file format."

            },
            NewMemberfiles6: {
                required: IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
                extension: IfArabic ? "الرجاء تحميل وتنسيق ملف صالح" : "Please upload a valid file format."

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


$("#ModalGroupUpdateForm").validate({

    rules: {
        modalPGender: {
            required: true,


        },
        modalPName: {
            required: true,

        },
        modalPEmail: {
            email: true,
            required: false,

        },

        modalNationality: {
            required: true,

        },
        modalPUsername: {
            required: true,

        },
       

        modalPBirthdate: {
            required: true,

        },

        modalPMobile: {
            required: true,
            minlength: 9,
            maxlength: 9

        },

        modalPDocument: {
            required: true,

        },
        modalPDocumentType: {
            required: true,

        },

        modalOtherMembersGender: {
            required: true,

        },
        modalOtherMembersName: {
            required: true,

        },

        modalOtherMembersEmail: {
            required: false,
            email: true,
        },
        modalOtherMembersNationality: {
            required: true,

        },
        modalOtherMembersNationalityUsername: {
            required: true,

        },
       
        modalOtherMembersNationalityBirthdate: {
            required: true,

        },
        modalOtherMembersNationalityMobile: {
            required: true,

            minlength: 9,
            maxlength: 9
        },
        modalOtherMembersNationalityDocuments: {
            required: true,

        },

        modalOtherMembersNationalityDocumentType: {
            required: true,

        },

        ModalGroupfiles1: {
            required: true,
            extension: "doc|docx|jpeg|jpg|png|pdf",
            filesize: 2000000,
        },

        ModalGroupfiles2: {
            required: true,
            extension: "doc|docx|jpeg|jpg|png|pdf",
            filesize: 2000000,
        },

        ModalGroupfiles3: {
            required: true,
            extension: "doc|docx|jpeg|jpg|png|pdf",
            filesize: 2000000,
        },
        ModalGroupfiles4: {
            required: true,
            extension: "doc|docx|jpeg|jpg|png|pdf",
            filesize: 2000000,
        },
        ModalGroupfiles5: {
            required: true,
            extension: "doc|docx|jpeg|jpg|png|pdf",
            filesize: 2000000,
        },

        ModalGroupfiles6: {
            required: true,
            extension: "doc|docx|jpeg|jpg|png|pdf",
            filesize: 2000000,
        }

    },

    messages: {
        modalPGender: IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
        modalPName:IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
        modalPEmail: {
            required: IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
            email: IfArabic ? "الرجاء ادخال بريد الكتروني فعال" : "Please enter a valid email.",

        },
        modalNationality:IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
        modalPUsername:IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
       
        modalPMobile: {

            required: IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
            minlength: IfArabic ? "يجب أن يكون طول الجوال 9 أرقام" : "The length of mobile must be 9 digits",
            maxlength: IfArabic ? "يجب أن يكون طول الجوال 9 أرقام" : "The length of mobile must be 9 digits",

        },
        modalPDocument:IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
        modalPDocumentType:IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
        modalOtherMembersGender:IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
        modalOtherMembersName:IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
        modalOtherMembersNationality:IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
        modalOtherMembersNationalityUsername:IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
        
        modalOtherMembersNationalityBirthdate: IfArabic ? "هذه الخانة مطلوبه:" :"This field is required.",
        modalOtherMembersNationalityDocuments:IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
        modalOtherMembersNationalityDocumentType:IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
        ModalGroupfiles1: {
            required: IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
            extension: IfArabic ? "الرجاء تحميل وتنسيق ملف صالح" : "Please upload a valid file format."

        },
        ModalGroupfiles2: {
            required: IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
            extension: IfArabic ? "الرجاء تحميل وتنسيق ملف صالح" : "Please upload a valid file format."

        },
        ModalGroupfiles3: {
            required: IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
            extension: IfArabic ? "الرجاء تحميل وتنسيق ملف صالح" : "Please upload a valid file format."

        },
        ModalGroupfiles4: {
            required: IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
            extension: IfArabic ? "الرجاء تحميل وتنسيق ملف صالح" : "Please upload a valid file format."

        },
        ModalGroupfiles5: {
            required: IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
            extension: IfArabic ? "الرجاء تحميل وتنسيق ملف صالح" : "Please upload a valid file format."

        },
        ModalGroupfiles6: {
            required: IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
            extension: IfArabic ? "الرجاء تحميل وتنسيق ملف صالح" : "Please upload a valid file format."

        },
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


$("#ModalCorporateUpdateForm").validate({


    rules: {
        CorporatemodalGender: {
            required: true,


        },
        CorporatemodalName: {
            required: true,

        },
        CorporatemodalEmail: {
            email: true,
            required: false,
        },

        CorporatemodalNationality: {
            required: true,

        },
       
        CorporatemodalBirthdate: {
            required: true,

        },

        CorporatemodalMobile: {
            required: true,
            minlength: 9,
            maxlength: 9
        },

        CorporatemodalDocument: {
            required: true,

        },
        CorporatemodalDocumentType: {
            required: true,

        },

        CorporatemodalOtherMembersGender: {
            required: true,

        },
        CorporatemodalOtherMembersName: {
            required: true,

        },

        CorporatemodalOtherMembersEmail: {
            required: false,
            email: true
        },
        CorporatemodalOtherMembersNationality: {
            required: true,

        },
        CorporatemodalOtherMembersNationalityUsername: {
            required: true,

        },
       
        CorporatemodalOtherMembersNationalityBirthdate: {
            required: true,

        },
        
        CorporatemodalOtherMembersNationalityMobile: {
            required: true,
            minlength: 9,
            maxlength: 9,
        },
        CorporatemodalOtherMembersNationalityDocuments: {
            required: true,

        },
        CorporatemodalOtherMembersNationalityDocument: {
            required: true,

        },

        CorporatemodalOtherMembersNationalityDocumentType: {
            required: true,

        },
        CorporateModalGroupfiles1: {
            required: true,
            extension: "doc|docx|jpeg|jpg|png|pdf",
            filesize: 2000000,
        },

        CorporateModalGroupfiles2: {
            required: true,
            extension: "doc|docx|jpeg|jpg|png|pdf",
            filesize: 2000000
        },

        CorporateModalGroupfiles3: {
            required: true,
            extension: "doc|docx|jpeg|jpg|png|pdf",
            filesize: 2000000
        },
        CorporateModalGroupfiles4: {
            required: true,
            extension: "doc|docx|jpeg|jpg|png|pdf",
            filesize: 2000000
        },
        CorporateModalGroupfiles5: {
            required: true,
            extension: "doc|docx|jpeg|jpg|png|pdf",
            filesize: 2000000
        },

        CorporateModalGroupfiles6: {
            required: true,
            extension: "doc|docx|jpeg|jpg|png|pdf",
            filesize: 2000000
        }

    },
    messages: {
        CorporatemodalGender: IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
        CorporatemodalName: IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
        CorporatemodalOtherMembersEmail: {
            required: IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
            email: IfArabic ? "الرجاء ادخال بريد الكتروني فعال" : "Please enter a valid email.",

        },
        CorporatemodalNationality: IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
        
        CorporatemodalOtherMembersNationalityMobile: {
            required: IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
            minlength: IfArabic ? "يجب أن يكون طول الجوال 9 أرقام" : "The length of mobile must be 9 digits",
            maxlength: IfArabic ? "يجب أن يكون طول الجوال 9 أرقام" : "The length of mobile must be 9 digits",
        },
        CorporatemodalDocument:IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
        CorporatemodalDocumentType:IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
        CorporatemodalOtherMembersGender:IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
        CorporatemodalOtherMembersName:IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
        CorporatemodalOtherMembersNationality:IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
     
        CorporatemodalOtherMembersNationalityBirthdate:IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
        CorporatemodalOtherMembersNationalityDocuments: IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
        CorporatemodalOtherMembersNationalityDocumentType: IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
        CorporatemodalOtherMembersNationalityDocument: IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
        CorporateModalGroupfiles1: {
            required: IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
            extension: IfArabic ? "الرجاء تحميل وتنسيق ملف صالح" : "Please upload a valid file format."

        },
        CorporateModalGroupfiles2: {
            required: IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
            extension: IfArabic ? "الرجاء تحميل وتنسيق ملف صالح" : "Please upload a valid file format."

        },
        CorporateModalGroupfiles3: {
            required: IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
            extension: IfArabic ? "الرجاء تحميل وتنسيق ملف صالح" : "Please upload a valid file format."

        },
        CorporateModalGroupfiles4: {
            required: IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
            extension: IfArabic ? "الرجاء تحميل وتنسيق ملف صالح" : "Please upload a valid file format."

        },
        CorporateModalGroupfiles5: {
            required: IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
            extension: IfArabic ? "الرجاء تحميل وتنسيق ملف صالح" : "Please upload a valid file format."

        },
        CorporateModalGroupfiles6: {
            required: IfArabic ? "هذه الخانة مطلوبه:" : "This field is required.",
            extension: IfArabic ? "الرجاء تحميل وتنسيق ملف صالح" : "Please upload a valid file format."

        },
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
