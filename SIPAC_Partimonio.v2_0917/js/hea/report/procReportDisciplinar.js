
function fnAddUploadTableRow() {
	event.preventDefault();
	var find = false;
	$(".itemRow").each(function() {
		console.log($(this).attr('id'));
		if($(this).css("display") == "none") {
			$(this).show();
			find = true;
			return false;
	    } 
	});
	
	if(find == false) {
		//alert(info_cannot_add_file_limit_msg);
		Common.alert("warning", info_cannot_add_file_limit_msg, "");
		return false;
	}
}

function fnDeleteUploadTableRow(obj) {
	event.preventDefault();
	var trRow = $(obj).parent().parent();
	trRow.css("display", "none");
}

// save
function doSave() {
	//if($("#relatedDocRegYn").val() == 'Y') {
	if($("[name='relatedDocRegYn']").val() == 'Y') {
		if($("#relatedDocNo").val() == "") {
			//alert(info_doc_no_field_required);
			Common.alert("warning", info_doc_no_field_required, "");
			$("#relatedDocNo").focus();
			return false;
		}
		
	} else {
		$("#relatedDocNo").val("");
	}
		
	// Validation Check for Doc Type
	var exit = false;
	$("#reportForm").find('select[name=docCode]').each( function (index) {
		var trRow = $(this).parent().parent();
		if(trRow.is(':visible')) {
			if($(this).val() == "") {
				exit = true;
				$(this).focus();
				return false;
			}
		}
	});

	if(exit == true) {
		//alert(info_doc_cd_field_required);
		Common.alert("warning", info_doc_cd_field_required, "");
		return false;
	}
	
	exit = false;
	$("#reportForm").find('input[name=docNo]').each( function (index) {
		var trRow = $(this).parent().parent();
		if(trRow.is(':visible')) {
			if($(this).val() == "") {
				exit = true;
				$(this).focus();
				return false;
			}
		}
	});

	if(exit == true) {
		//alert(info_doc_no_field_required);
		Common.alert("warning", info_doc_no_field_required, "");
		return false;
	}
	
	// Make a submit parameter list
    $("#reportForm").find('input[name=reportDocSeq]').each( function (index) {
        $(this).attr("name", "reportDoc[" + index + "].reportDocSeq");
	});
    
	$("#reportForm").find('select[name=docCode]').each( function (index) {
        $(this).attr("name", "reportDoc[" + index + "].docCode");
	});
	
	$("#reportForm").find('select[name=docSubCode]').each( function (index) {
        $(this).attr("name", "reportDoc[" + index + "].docSubCode");
	});

    $("#reportForm").find('input[name=docNo]').each( function (index) {
        $(this).attr("name", "reportDoc[" + index + "].docNo");
	});
    
    $("#reportForm").find('input[name=docIssueDt]').each( function (index) {
        $(this).attr("name", "reportDoc[" + index + "].docIssueDt");
	});
    
    $("#reportForm").find('input[name=docFile]').each( function (index) {
        $(this).attr("name", "reportDoc[" + index + "].docFile");
	});    

	if(confirm(confirm_regist_msg)) {
		
		var url = "/hea/updateReportDoc.ajax";
		var form = new FormData($("#reportForm")[0]);

		var success = function(jsonResult) {
			if(jsonResult.result > 0) {
				//alert(info_success_transaction_msg);
				Common.alert("success", info_success_transaction_msg, "");
				location.reload();
			}
			else {
				//alert(fail_common_msg);
				Common.alert("warning", fail_common_msg, "");
			}
		};
		
		$.ajax({
            type : 'post',
            url : url,
            data : form,
            processData : false,
            contentType : false,
            success : success,
            error : function(error) {
                console.log(error);
                console.log(error.status);
            }
        });
	}	
}

function exit() {
	var $form = $("#reportListForm");
	
	$form.attr("action", '/hea/getReportList.do');
	$form.attr('method', 'POST');

	$form.submit();
}

// Delete
function fnReportDocDelete(reportDocSeq, obj) {
	if(confirm(confirm_delete_msg)) {
		var url = "/hea/deleteReportDocFile.ajax";
		var jsonData = { "reportDocSeq" : reportDocSeq };
		
		var success = function(jsonResult) {
			if(jsonResult.result > 0) {
				//alert(info_success_transaction_msg);
				Common.alert("success", info_success_transaction_msg, "");
				
				// Delete Row 
				var trRow = $(obj).parent().parent().parent();
				// Delete RowSpan
				$(obj).parent().parent().parent().next().remove();
				trRow.remove();
			}
			else {
				//alert(fail_common_msg);
				Common.alert("warning", fail_common_msg, "");
			}
		};  
				
		Ajax.request(url, jsonData, success, "");
	}
}

function fnDocFileDownload(seq) {
	var $form = $("#downloadForm");
	$("#reportDocSeq").val(seq);
	var url = '/hea/docFiledownload.do';
	$form.attr("action", url);
	$form.attr('method', 'GET');

	$form.submit();
}

$(document).ready(function(){
	//alert($("#relatedDocRegYn").val()+":"+$("#relatedDocNo").val());
	
	if($("[name='relatedDocRegYn']").val() == 'Y') {
		$("#relatedDocNo").show();
	} else {
		$("#relatedDocNo").hide();
	}
	
	$("#relatedDocY").on('click', function() {
		$("#relatedDocNo").show();
	});
	
	$("#relatedDocN").on('click', function() {
		$("#relatedDocNo").hide();
	});
	

	$("#btnAddDoc").on('click', function() {
		event.preventDefault();
		fnAddUploadTableRow();
		return false;
	});
	
	// Delete
	$("[name='delete']").on('click', function() {
		event.preventDefault();
		var str = $(this).data('seq');
		fnReportDocDelete(str, $(this));
	});	;
	
	// Download
	$(".docFiledownload").on('click', function() {
		event.preventDefault();
		var seq = $(this).data('seq');
		fnDocFileDownload(seq);
	});	
	
	// Save, 
	$("#save").on('click', function() {
		event.preventDefault();
		doSave();
		return false;
	});
	
	// back, 
	$("#exit").on('click', function() {
		event.preventDefault();
		exit();
		return false;
	});
});





