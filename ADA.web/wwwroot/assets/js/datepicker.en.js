;(function ($) { $.fn.datepicker.language['en'] = {
    days: window.localStorage.language == 'ar' ? ['الأحد', 'الاثنين ', 'الثلاثاء', 'الأربعاء ', 'الخميس', 'الجمعة', 'السبت'] : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] ,
    daysShort: window.localStorage.language == 'ar' ? ['الأحد', 'الاثنين ', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'] :['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    daysMin: window.localStorage.language == 'ar' ? ['الأحد', 'الاثنين ', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'] : ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    months: window.localStorage.language == 'ar' ? ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'] : ['January','February','March','April','May','June', 'July','August','September','October','November','December'],
    monthsShort: window.localStorage.language == 'ar' ? ['يناير	', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'] : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    today: window.localStorage.language == 'ar' ? 'اليوم' :'Today',
    clear: window.localStorage.language == 'ar' ? 'صافي' : 'Clear',
    dateFormat: window.localStorage.language == 'ar' ? 'مم/دد/سسسس' : 'mm/dd/yyyy',
    timeFormat: 'hh:ii aa',
    firstDay: 0
}; })(jQuery);