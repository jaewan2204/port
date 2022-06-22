var deleteRowCount = 1;

function fnAddUploadImageTableRow() {
	var $tableBody = $('#uploadFileTable').find("tbody");
	$trLastRow = $tableBody.find("tr:last");
    $trClone = $trLastRow.clone();
	$trLastRow.after($trClone);

    $trInput = $trClone.find("input");
    $trInput.each(function(){ 
    	console.log("Id:" + $(this).attr('id') + ", Name:"+$(this).attr('name') +", Value:"+ $(this).val());
    	$(this).val("");
	}); 
	
	$trLastRow.after($trClone);
	
	deleteRowCount++;
}

function fnDeleteUploadImageTableRow(obj) {
	event.preventDefault();
	if(deleteRowCount <= 1) {
		//alert(info_cannot_delete_last_row_msg);
		Common.alert("warning", info_cannot_delete_last_row_msg, "");
		return false;
	}
	
	var trRow = $(obj).parent().parent();
	trRow.remove();
	
	deleteRowCount--;
}

function fnImageFileDownload(seq) {
	var $form = $("#downloadForm");
	$("#reportImgSeq").val(seq);
	var url = '/hea/imageFiledownload.do';
	$form.attr("action", url);
	$form.attr('method', 'GET');

	$form.submit();
}

function fnImageFileDelete(obj, seq) {
	if(confirm(confirm_delete_msg)) {
		
		var url = "/hea/deleteImageFile.ajax";
		var jsonData = { "reportImgSeq" : seq };
		
		var success = function(jsonResult) {
			if(jsonResult.result > 0) {
				//alert(info_success_transaction_msg);
				Common.alert("success", info_success_transaction_msg, "");
				
				var trRow = $(obj).parent().parent();
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

// save
function doSave() {
	if($("#mediaTpCode").val() == '') {
		//alert(info_report_media_type_field_required);
		Common.alert("warning", info_report_media_type_field_required, "");
		$("#mediaTpCode").focus();
		return false;
	} 
	
	if($("#bienTpCode").val() == '') {
		//alert(info_report_bien_type_field_required);
		Common.alert("warning", info_report_bien_type_field_required, "");
		$("#bienTpCode").focus();
		return false;
	} else {
		if($("#bienTpCode").val() == 'HEA002001') {
			// Arqueologico
			if($("#preHispanicoNm").val() == '') {
				//alert(info_report_prehispanico_nm_field_required);
				Common.alert("warning", info_report_prehispanico_nm_field_required, "");
				$("#preHispanicoNm").focus();
				return false;
			}
		} else {
			// Historico
			if($("#historicoNm").val() == '') {
				//alert(info_report_historico_nm_field_required);
				Common.alert("warning", info_report_historico_nm_field_required, "");
				$("#historicoNm").focus();
				return false;
			}
		}
	} 	
	
	// mail Validation Check
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	var aplcntEmail = $("#aplcntEmail").val()
	if(aplcntEmail != '') {
		if(!re.test(aplcntEmail)) {
			//alert(info_error_mail_check);
			Common.alert("warning", info_error_mail_check, "");
			$("#aplcntEmail").focus();
			return false;
		}		
	}
	
	if(confirm(confirm_regist_msg)) {
		if($("#exprt1UserSeq").val() != 0)
			$("#exprt1UserNm").val($("#exprt1UserSeq option:selected").text());
		else 
			$("#exprt1UserNm").val("");
		
		if($("#exprt2UserSeq").val() != 0)
			$("#exprt2UserNm").val($("#exprt2UserSeq option:selected").text());
		else
			$("#exprt2UserNm").val("");
		
	    if($("#bienTpCode").val() == "") {
			$("#preHispanicoNm").val("");
			$("#historicoNm").val("");
			$("#accAddrViaCode").val("");
			$("#accAddrViaNm").val("");
			$("#accAddrViaNo").val("");
			
		} else if($("#bienTpCode").val() == "HEA002001") {
			$("#historicoNm").val("");
			$("#accAddrViaCode").val("");
			$("#accAddrViaNm").val("");
			$("#accAddrViaNo").val("");
			
		} else if($("#bienTpCode").val() == "HEA002002") {
			$("#preHispanicoNm").val("");
			
		} else
			;	
	    
		if($("#mediaTpCode").val() != 'HEA001005') {
			$("#ingresoDocCode").val("");
			$("#dcsIngresoDocNo").val("");
		}
		
		if($("#dcsTpDenunciaOriginCode").val() == 'HEA013001' || $("#dcsTpDenunciaOriginCode").val() == '') {
			$("#dcsDocNo").val("");
		}
		
		var url = "/hea/updateReportReceipt.ajax";
		var form = new FormData($("#reportForm")[0]);

		// Value to distinguish between registered and updates
		var reportTempSeq = $('#reportSeq').val();
		
		var success = function(jsonResult) {
			if(jsonResult.result > 0) {
				// Save reportSeq when first registered.
				$('#reportSeq').val(jsonResult.result);
				
				//alert(info_success_transaction_msg);
				Common.alert("success", info_success_transaction_msg, "");
				
				var $form = $("#reportListForm");
				$("input[name=reportSeq]").val(jsonResult.result);
				
				$form.attr("action", '/hea/getReport.do');
				$form.attr('method', 'POST');
				$form.attr('target', '_self');

				$form.submit();
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

function resetCascadeSelectBox() {
    if($("#bienTpCode").val() == "") {
		$("#arqLayer").hide();
		$("#hisLayer").hide();
		
	} else if($("#bienTpCode").val() == "HEA002001") {
		$("#arqLayer").show();
		$("#hisLayer").hide();
		
	} else if($("#bienTpCode").val() == "HEA002002") {
		$("#arqLayer").hide();
		$("#hisLayer").show();
		
	} else
		;	
}

function changeUbigeoComboBoxList(url, code, comboBox, depth){

	var jsonData = { "ubigeoCode" : code };

	var success = function(data) {
		var errorMessage = null ;  
		if( data.result < 1 ) {
			//alert(fail_common_msg);
			Common.alert("warning", fail_common_msg, "");
		} else if( data.result > 0 ) {
			var list = data.list ; 
			var listLen = null == list ? 0 : list.length ; 
			var selectComboBox = comboBox ; 
			
			selectComboBox.val("");
			selectComboBox.find('option').not(':first').remove();
			
			if(0 < listLen) {
				for(var i = 0, iLen = list.length; i < iLen; i ++ ) {
					var item = list[i];
					var code = item.ubigeoCode;
					var name = depth == 1 ? item.provNm : item.distNm; 
							
					var tag = '<option value="' + code + '" >' + name + ' </option>';
					var option = $(tag) ;
					selectComboBox.append(option) ;
				} 
				
				selectComboBox.focus() ;  
			}
		}
		
		if(depth == 1) {
			$("#distCode").val("000000");
			$("#distCode").find('option').not(':first').remove();
		}
	};  
	
	Ajax.request(url, jsonData, success, "");
}

$(document).ready(function(){
	
	resetCascadeSelectBox();

	if($("#dcsTpCaseOriginCode").val() == 'HEA012002') {
		$("#dcsTpCaseOriginNo").show();
	} else {
		$("#dcsTpCaseOriginNo").hide();
	}	
	
	var size = $("#dcsDocNo").val().length; 
	size = size.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	$("#dcsDocNoCount").html('('+ size + '/1,000)');
	
	size = $("#dcsActualizeMotive").val().length; 
	size = size.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	$("#dcsActualizeMotiveCount").html('('+ size + '/300)');
	
	size = $("#dcsRegNo").val().length; 
	size = size.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	$("#dcsRegNoCount").html('('+ size + '/300)');
	
	size = $("#dcsCaseNo").val().length; 
	size = size.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	$("#dcsCaseNoCount").html('('+ size + '/300)');
	
	size = $("#dcsIngresoDocNo").val().length; 
	size = size.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	$("#dcsIngresoDocNoCount").html('('+ size + '/300)');
	
	size = $("#occurCont").val().length; 
	size = size.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	$("#occurContCount").html('('+ size + '/4,000)');

	size = $("#aplcntDescription").val().length; 
	size = size.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	$("#aplcntDescriptionCount").html('('+ size + '/4,000)');

	size = $("#reportCont").val().length; 
	size = size.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	$("#reportContCount").html('('+ size + '/4,000)');
	
	size = $("#ofndrDescription").val().length; 
	size = size.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	$("#ofndrDescriptionCount").html('('+ size + '/4,000)');

	size = $("#obsvtCont").val().length; 
	size = size.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	$("#obsvtContCount").html('('+ size + '/4,000)');

	if($("#authMode").val() == "WRITE") {
		
		if($("#dcsTpDenunciaOriginCode").val() == 'HEA013001' || $("#dcsTpDenunciaOriginCode").val() == '') {
			$("#dcsDocNo").prop("disabled", true);
			$('#dcsDocNo').css('background-color', '#e9eef2').css('color', '#000000');
		} else {
			$("#dcsDocNo").prop("disabled", false);
			$('#dcsDocNo').css('background-color', '#FFFFFF').css('color', '#000000');
		}
		
		if($("#mediaTpCode").val() == 'HEA001005') {
			$("#ingresoDocTypeLayer").show();
			
		} else {
			$("#ingresoDocTypeLayer").hide();
		}
	}
	
	$('#exprt1UserNm').css('background-color', '#e9eef2').css('color', '#000000');
	$('#exprt2UserNm').css('background-color', '#e9eef2').css('color', '#000000');

	$("#deptCode").on('change', function() {
		event.preventDefault();
		var url = "/hea/code/getUbigeoProvCodeList.ajax" ; 
		var code = $("#deptCode").val();
		var depth = 1;
		
		changeUbigeoComboBoxList(url, code, $("#provCode"), depth);
	});	
	
	$("#provCode").on('change', function() {
		event.preventDefault();
		var url = "/hea/code/getUbigeoDistCodeList.ajax" ; 
		var code = $("#provCode").val();
		var depth = 2;
		
		changeUbigeoComboBoxList(url, code, $("#distCode"), depth);
	});	
	
	$("#distCode").on('change', function() {
		;
	});
	
	$("#dcsTpCaseOriginCode").on('change', function() {
		event.preventDefault();
		if($("#dcsTpCaseOriginCode").val() == 'HEA012002') {
			$("#dcsTpCaseOriginNo").show();
		} else {
			$("#dcsTpCaseOriginNo").hide();
		}
	});
	
	$("#dcsTpDenunciaOriginCode").on('change', function() {
		event.preventDefault();
		if($("#dcsTpDenunciaOriginCode").val() == 'HEA013001' || $("#dcsTpDenunciaOriginCode").val() == '') {
			$("#dcsDocNo").prop("disabled", true);
			$('#dcsDocNo').css('background-color', '#e9eef2').css('color', '#000000');
		} else {
			$("#dcsDocNo").prop("disabled", false);
			$('#dcsDocNo').css('background-color', '#FFFFFF').css('color', '#000000');
		}
	});
	
	$("#mediaTpCode").on('change', function() {
		event.preventDefault();
		if($("#mediaTpCode").val() == 'HEA001005') {
			$("#ingresoDocTypeLayer").show();
			
		} else {
			$("#ingresoDocTypeLayer").hide();
		}
	});
	
	$("#bienTpCode").on('change', function() {
		event.preventDefault();
		resetCascadeSelectBox();
	});	
	
	$("#dcsActualizeMotive").on('keyup', function() {
		event.preventDefault();
		var size = $("#dcsActualizeMotive").val().length; 
		size = size.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		
		$("#dcsActualizeMotiveCount").html('('+ size + '/300)');
	});	
	
	$("#dcsRegNo").on('keyup', function() {
		event.preventDefault();
		var size = $("#dcsRegNo").val().length; 
		size = size.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		
		$("#dcsRegNoCount").html('('+ size + '/300)');
	});	
	
	$("#dcsCaseNo").on('keyup', function() {
		event.preventDefault();
		var size = $("#dcsCaseNo").val().length; 
		size = size.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		
		$("#dcsCaseNoCount").html('('+ size + '/300)');
	});	
	

	$("#dcsIngresoDocNo").on('keyup', function() {
		event.preventDefault();
		var size = $("#dcsIngresoDocNo").val().length; 
		size = size.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		
		$("#dcsIngresoDocNoCount").html('('+ size + '/300)');
	});	
	
	$("#dcsDocNo").on('keyup', function() {
		event.preventDefault();
		var size = $("#dcsDocNo").val().length; 
		size = size.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		
		$("#dcsDocNoCount").html('('+ size + '/1,000)');
	});	
	
	$("#occurCont").on('keyup', function() {
		event.preventDefault();
		var size = $("#occurCont").val().length; 
		size = size.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		
		$("#occurContCount").html('('+ size + '/4,000)');
	});	
	
	$("#aplcntDescription").on('keyup', function() {
		event.preventDefault();
		var size = $("#aplcntDescription").val().length; 
		size = size.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		
		$("#aplcntDescriptionCount").html('('+ size + '/4,000)');
	});	
	
	$("#reportCont").on('keyup', function() {
		event.preventDefault();
		var size = $("#reportCont").val().length; 
		size = size.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		
		$("#reportContCount").html('('+ size + '/4,000)');
	});	
	
	$("#ofndrDescription").on('keyup', function() {
		event.preventDefault();
		var size = $("#ofndrDescription").val().length; 
		size = size.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		
		$("#ofndrDescriptionCount").html('('+ size + '/4,000)');
	});	
	
	$("#obsvtCont").on('keyup', function() {
		event.preventDefault();
		var size = $("#obsvtCont").val().length; 
		size = size.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		
		$("#obsvtContCount").html('('+ size + '/4,000)');
	});	

    $('#SavedImageFile tbody tr').hover(function() { 
    	event.preventDefault();
        $(this).css('background-color','#e9eef2'); 
       }, function() { 
        $(this).css('background-color','#FFFFFF'); 
   	});      
       
	$("#btnAddImage").on('click', function() {
		event.preventDefault();
		fnAddUploadImageTableRow();
		return false;
	});

	// Delete image file
	$(".imageFileDelete").on('click', function() {
		event.preventDefault();
		var seq = $(this).data('seq');
		console.log(seq);
		fnImageFileDelete($(this), seq);
	});	
	
	// Download
	$(".imageFiledownload").on('click', function() {
		event.preventDefault();
		var seq = $(this).data('seq');
		fnImageFileDownload(seq);
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





