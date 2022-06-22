function doSave() {
	if($("#taskSpnNm").val() == '') {
		alert(info_headmin_task_nm_field_required);
		//Common.alert("warning", info_headmin_task_nm_field_required, "");
		$("#taskSpnNm").focus();
		return false;
	}

	if(confirm(confirm_regist_msg)) {
		var url = "/hea/updateAdminTask.ajax";
		var form = Common.serialize($("#taskForm"));
		
		var success = function(jsonResult) {
			if(jsonResult.result > 0) {
				alert(info_success_transaction_msg);
				//Common.alert("success", info_success_transaction_msg, "");
				opener.location.reload();
				window.open('', '_self', '');
				window.close();
			}
			else {
				alert(fail_common_msg);
				//Common.alert("warning", fail_common_msg, "");
			}
		};  
		
		Ajax.request(url, form, success, "");
	}
}

$(document).ready(function(){
	
	// Save
	$("#btnSave").click(function() {
		event.preventDefault();
		doSave();
	});
	
});





