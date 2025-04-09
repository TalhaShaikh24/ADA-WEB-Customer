




// Language JSON File Location
var language = localStorage.getItem('language');
// Default Language
var default_lang = 'en';

// Set Selected Language
function setLanguage(lang) {
    localStorage.setItem('language', lang);
    language = localStorage.getItem('language');
    // Run Multi Language Plugin
    getLanguage()


    alignmentAr()

}

// Run Multi Language Plugin
function getLanguage() {
    // Language on user preference
    (language == null) ? setLanguage(default_lang) : false;
    // Load data of selected language
    $.ajax({
        url: '/Register/js/' + language + '.json',
        dataType: 'json', async: true
    }).done(function (lang) {

        console.log(lang)
        // add selected language class to the body tag
        $('body').attr('id', language);
        //$('.filter-option').attr('Language', language);
        //$('ul').attr('Language', language);


        // Loop through message in data
        $.each(lang, function (index, val) {
            (index === 'head') ? $(document).attr("title", val['title']) : false;
            $(index).children().each(function () {
                $(this).text(val[$(this).attr('key')])
                $(this).attr('placeholder', val[$(this).attr('Inputkey')])
                $(this).attr('title', val[$(this).attr('Titlekey')])

            })
        })


    })


}
function alignmentAr() {

    location.reload();
}






// Auto Loader
$(document).ready(function () {
    if (language != null && language !== default_lang)
        getLanguage(language);

});
