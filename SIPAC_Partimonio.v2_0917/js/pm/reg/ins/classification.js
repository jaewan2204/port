function nextPage(alt){
    var forms = document.forms.major;
    $('#classCd').val(alt);
    $(forms).submit();
}

$(function () {
    if(errMsg != null && errMsg != ''){
        Common.alert("warning", errMsg);
    }
});