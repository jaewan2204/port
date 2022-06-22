
// save
function doSave() {
	
	if($("#statusCode").val() != 'HEA010004') {	// PENDIENTE
		Common.alert("success", info_report_survey_date_field_required, "");
		return false;
	}
	
	if(confirm(confirm_regist_msg)) {
		if($("#exprt1UserSeq").val() != 0)
			$("#expr1UserNm").val($("#exprt1UserSeq option:selected").text());
		else 
			$("#expr1UserNm").val("");
		
		if($("#exprt2UserSeq").val() != 0)
			$("#exprt2UserNm").val($("#exprt2UserSeq option:selected").text());
		else
			$("#exprt2UserNm").val("");
		
		var url = "/hea/updateReportSurvey.ajax";
		var form = Common.serialize($("#reportForm"));

		var success = function(jsonResult) {
			if(jsonResult.result > 0) {
				//alert(info_success_transaction_msg);
				Common.alert("success", info_success_transaction_msg, "");
				location.reload();
			}
			else
				alert(fail_common_msg);
		};
		
		Ajax.request(url, form, success, "");
	}	
}

function exit() {
	var $form = $("#reportListForm");
	
	$form.attr("action", '/hea/getReportList.do');
	$form.attr('method', 'POST');

	$form.submit();
}

$(document).ready(function(){
	var size = $("#exprtObsvtCont").val().length; 
	size = size.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	$("#exprtObsvtContCount").html('('+ size + '/1,000)');
	
	$("#exprtObsvtCont").on('keyup', function() {
		var size = $("#exprtObsvtCont").val().length; 
		size = size.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		
		$("#exprtObsvtContCount").html('('+ size + '/1,000)');
	});	

	$('#exprt1UserSeq').css('background-color', '#e9eef2').css('color', '#000000');
	$('#exprt2UserSeq').css('background-color', '#e9eef2').css('color', '#000000');
	$('#exprt1UserNm').css('background-color', '#e9eef2').css('color', '#000000');
	$('#exprt2UserNm').css('background-color', '#e9eef2').css('color', '#000000');

	// Save, 
	$("#save").click(function() {
		event.preventDefault();
		doSave();
		return false;
	});
	
	// back, 
	$("#exit").click(function() {
		event.preventDefault();
		exit();
		return false;
	});
});





