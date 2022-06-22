
// save
function doSave() {
    if($("#bienTpCode").val() == "") {
    	$("#sanctConductCode").val("");
    	$("#sanctClassCode").val("");
    	$("#sanctHechoCode").val("");
		
	} else if($("#bienTpCode").val() == "HEA002001") {
    	$("#sanctConductCode").val($("#sanctConductCode1").val());
    	$("#sanctHechoCode").val($("#sanctHechoCode1").val());
		
	} else if($("#bienTpCode").val() == "HEA002002") {
    	$("#sanctConductCode").val($("#sanctConductCode2").val());
    	$("#sanctClassCode").val("");
    	$("#sanctHechoCode").val($("#sanctHechoCode2").val());
		
	} else
		;
    
	if(confirm(confirm_regist_msg)) {
		
	    if($("#bienTpCode").val() == "") {
			$("#classCode").val("");
			$("#classDetailCode").val("");
		} else if($("#bienTpCode").val() == "HEA002001") {
			$("#classDetailCode").val("");
		} else if($("#bienTpCode").val() == "HEA002002") {
			
		} else
			;	
	    
		var url = "/hea/updateReportAnalysis.ajax";
		var form = Common.serialize($("#reportForm"));

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
		
		Ajax.request(url, form, success, "");
	}	
}

function exit() {
	var $form = $("#reportListForm");
	
	$form.attr("action", '/hea/getReportList.do');
	$form.attr('method', 'POST');

	$form.submit();
}

function changeHechoCodeComboBoxList(url, code, comboBox){

	var jsonData = { "code" : code };

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
					var code = item.code;
					var name = item.codeNm; 
							
					var tag = '<option value="' + code + '" >' + name + ' </option>';
					var option = $(tag) ;
					selectComboBox.append(option) ;
				} 
				
				selectComboBox.focus() ;  
			}
		}
		selectComboBox.show();

	};  
	
	Ajax.request(url, jsonData, success, "");
}

$(document).ready(function(){
	
    if($("#bienTpCode").val() == "") {
    	$("#arqLayer").hide();
    	$("#hisLayer").hide();
    	$("#analysisTitle").hide();
		
	} else if($("#bienTpCode").val() == "HEA002001") {
    	$("#arqLayer").show();
    	$("#hisLayer").hide();
		
	} else if($("#bienTpCode").val() == "HEA002002") {
    	$("#arqLayer").hide();
    	$("#hisLayer").show();
		
	} else
		;
    
	if($("#sanctHechoCode1").val() == "HEA006001006" || $("#sanctHechoCode1").val() == "HEA006002004" || $("#sanctHechoCode1").val() == "HEA006003003"
		|| $("#sanctHechoCode1").val() == "HEA006004003" || $("#sanctHechoCode1").val() == "HEA006005012"
		|| $("#sanctHechoCode2").val() == "HEA008029")
		$("#otro").show();
	else
		$("#otro").hide();		
		
    // Arq
	$("#sanctConductCode1").on('change', function() {
		event.preventDefault();

		if($("#sanctConductCode1").val() == "") {
			$("#sanctClassCode").find('option:eq(0)').prop('selected', true);
			$("#sanctClassCode").attr('disabled','disabled');
			
			$("#sanctHechoCode1").find('option:eq(0)').prop('selected', true);
			$("#sanctHechoCode1").attr('disabled','disabled');
		} else {
			$("#sanctClassCode").removeAttr('disabled');
			$("#sanctHechoCode1").removeAttr('disabled')
		}
			
	});
	
	// HIstorico
	$("#sanctConductCode2").on('change', function() {
		event.preventDefault();

		if($("#sanctConductCode2").val() == "") {
			
			$("#sanctHechoCode2").find('option:eq(0)').prop('selected', true);
			$("#sanctHechoCode2").attr('disabled','disabled');
		} else {
			$("#sanctHechoCode2").removeAttr('disabled');
		}
			
	});	
	
	$("#sanctClassCode").on('change', function() {
		event.preventDefault();
		var url = "/hea/code/getHechoCodeList.ajax"; 
		var code = $("#sanctClassCode").val();
			
		changeHechoCodeComboBoxList(url, code, $("#sanctHechoCode1"));
	});		
	
	$("#sanctHechoCode2").on('change', function() {
		event.preventDefault();
		if($("#sanctHechoCode2").val() == "HEA008029")
			$("#otro").show();
		else
			$("#otro").hide();
	});		
	
	$("#sanctHechoCode1").on('change', function() {
		event.preventDefault();
		if($("#sanctHechoCode1").val() == "HEA006001006" || $("#sanctHechoCode1").val() == "HEA006002004" || $("#sanctHechoCode1").val() == "HEA006003003"
			|| $("#sanctHechoCode1").val() == "HEA006004003" || $("#sanctHechoCode1").val() == "HEA006005012") {
			$("#otro").show();
		} else {
			$("#otro").hide();
		}
	});			
	
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





