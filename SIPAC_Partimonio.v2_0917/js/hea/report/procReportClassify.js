function selectMvbGen(hreGenSeq, hreArray ){
	console.log("["+hreGenSeq+"]" + hreArray);
	
	var hreName = hreArray[4];
	var hreRegNo = hreArray[6];
	var hrePreNo = hreArray[7];
	var hreRegNo = hreArray[6];
	var hreClass = hreArray[2] + "-" + hreArray[3];
	
	var title = "";
	if(hreRegNo != "")
		title += "[" + hreRegNo + "] ";
		
	if(hreName != "")
		title += hreName;
	
	if(hreClass != "")
		title += "      [" + hreClass + "]";

	if(hrePreNo != "")
		title += "(" + hreClass + ")";
	
	$("#historicoNm").text(title);
}

function fnHisSearch() {
	var seq = $("#reportSeq").val()
	var url = '/hea/search/getHistoricoList.do?reportSeq='+seq;
	PopupCenter(url, 'hisSearch', 1000, 850);
}

function fnArqSearch() {
	var seq = $("#reportSeq").val()
	var url = '/hea/search/getArqueologicoList.do?reportSeq='+seq;
	PopupCenter(url, 'arqSearch', 1000, 850);
}

// save
function doSave() {
	if($("#bienTpCode").val() == '') {
		//alert(info_report_bien_type_field_required);
		Common.alert("warning", info_report_bien_type_field_required, "");
		$("#bienTpCode").focus();
		return false;
	} 
	
	if(confirm(confirm_regist_msg)) {
		
	    if($("#bienTpCode").val() == "") {
			$("#classCode").val("");
			$("#classDetailCode").val("");
		} else if($("#bienTpCode").val() == "HEA002001") {
			$("#classDetailCode").val("");
		} else if($("#bienTpCode").val() == "HEA002002") {
			
		} else
			;	
	    
		var url = "/hea/updateReportClassify.ajax";
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

function resetCascadeSelectBox() {
    if($("#bienTpCode").val() == "") {

		$("#classCode").val("");
		$("#classCode").find('option').not(':first').remove();
		$("#classCode").hide();
		
		$("#classDetailCode").val("");
		$("#classDetailCode").find('option').not(':first').remove();
		$("#classDetailCode").hide();
		
		$("#arqLayer").hide();
		$("#hisLayer").hide();
		$("#tpLayer").hide();
		
	} else if($("#bienTpCode").val() == "HEA002001") {
		$("#classDetailCode").val("");
		$("#classDetailCode").find('option').not(':first').remove();
		$("#classDetailCode").hide();
		
		$("#tpLayer").hide();
		$("#arqLayer").hide();
		$("#hisLayer").hide();
		
	} else if($("#bienTpCode").val() == "HEA002002") {
		$("#tpLayer").show();
		$("#arqLayer").hide();
		$("#hisLayer").show();
		
	} else
		;
	
	if($("#classCode").val() == "") {
		$("#classDetailCode").val("");
		$("#classDetailCode").find('option').not(':first').remove();
		$("#classDetailCode").hide();
	}	
}

function changeClassCodeComboBoxList(url, code, comboBox, depth){

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
		
		if(depth == 1) {
			$("#classDetailCode").val("");
			$("#classDetailCode").find('option').not(':first').remove();
		}
		
		if($("#bienTpCode").val() == "HEA002001") {
			// if bienTpCode == ARQUEOLOGICO
			$("#classDetailCode").hide();
		} else {
			// if bienTpCode == HISTORICO
			$("#classDetailCode").show();
		}
	};  
	
	Ajax.request(url, jsonData, success, "");
}

$(document).ready(function(){
	resetCascadeSelectBox();
	
	$("#bienTpCode").on('change', function() {
		event.preventDefault();
		resetCascadeSelectBox();
		
		if($("#bienTpCode").val() != "") {
			var url = "/hea/code/getClassCodeList.ajax" ; 
			var code =$("#bienTpCode").val();
			var depth = 1;
			
			changeClassCodeComboBoxList(url, code, $("#classCode"), depth);
		}

	});	

	$("#classCode").on('change', function() {
		event.preventDefault();
		if($("#classCode").val() == "") {
			$("#classDetailCode").val("");
			$("#classDetailCode").find('option').not(':first').remove();
			$("#classDetailCode").hide();
			$("#classDetailCode").prop("disabled", true);
		} else {
			var url = "/hea/code/getClassDetailCodeList.ajax" ; 
			var code = $("#classCode").val();
			var depth = 2;
			
			changeClassCodeComboBoxList(url, code, $("#classDetailCode"), depth);
		}
	});	
	
	$("#btnHisSearch").click(function() {
		event.preventDefault();
		fnHisSearch();
	});
	
	$("#btnArqSearch").click(function() {
		event.preventDefault();
		fnArqSearch();
	});
	
	// Save, 
	$("#save").click(function() {
		event.preventDefault();
		doSave();
		return false;
	});
	
	// back, 
	$("#exit").click(function() {
		exit();
		return false;
	});
});





