
$( ".tabSelector" ).click( tabSelector_Listener ) ; 

function tabSelector_Listener( e ) {
	var $form = $("#reportListForm");
	
	$("input[name=tabIndex]").val($(this).data('index'));
	$form.attr("action", '/hea/getReport.do');
	$form.attr('method', 'POST');

	$(".loadingWrap").show();
	$form.submit();
}

$(document).ready(function(){

});





