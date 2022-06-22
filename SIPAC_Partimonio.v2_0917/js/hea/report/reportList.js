
function doSearch(curPage) {
	if($("#searchKeyword").val() != "") {
		if($("#searchCondition").val() == "") {
			//alert(info_report_search_condition_field_required);
			Common.alert("warning", info_report_search_condition_field_required, "");
			$("#searchCondition").focus();
			return false;
		}
	}
	
	var $form = $("#reportListForm");
	$("#page").val(curPage) ;
	
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
	
	$form.attr("action", '/hea/getReportList.do');
	$form.attr('method', 'POST');
	$form.attr('target', '_self');
	$(".loadingWrap").show();
	$form.submit();
}

function doClear() {

	// Ubigeo
	$("#deptCode").find('option:eq(0)').prop('selected', true);
	$("#provCode").find('option:eq(0)').prop('selected', true);
	$("#distCode").find('option:eq(0)').prop('selected', true);
	
	// Status
	$("#statusCode").find('option:eq(0)').prop('selected', true);
	$("#fStatusCode").find('option:eq(0)').prop('selected', true);
	
	// Media Type
	$("#mediaTpCode").find('option:eq(0)').prop('selected', true);
	
	// Tipo de Bien
	$("#bienTpCode").find('option:eq(0)').prop('selected', true);
	$("#classCode").find('option:eq(0)').prop('selected', true);
	$("#classDetailCode").find('option:eq(0)').prop('selected', true);
	$("#classCode").hide();
	$("#classDetailCode").hide();
	
	$("#sanctConductCode1").find('option:eq(0)').prop('selected', true);
	$("#sanctClassCode").find('option:eq(0)').prop('selected', true);
	$("#sanctHechoCode1").find('option:eq(0)').prop('selected', true);
	$("#sanctConductCode2").find('option:eq(0)').prop('selected', true);
	$("#sanctHechoCode2").find('option:eq(0)').prop('selected', true);

	$("#searchFromDate").find('option:eq(0)').prop('selected', true);
	$("#searchToDate").find('option:eq(0)').prop('selected', true);
	
	$("#searchCondition").find('option:eq(0)').prop('selected', true);
	$("#searchKeyword").val("");
	
	$("#provCode, #distCode, #classCode, #classDetailCode").find("option").each(function() {
	    if(!(this.value == "" || this.value == "000000"))
	    	$(this).remove();
	});
	
	resetCascadeSelectBox();
}

function doExcelDownload() {
	var $form = $("#reportListForm");
	var url = '/hea/getExcelReportList.do';
	$form.attr("action", url);
	$form.attr('method', 'GET');

	$(".loadingWrap").show();
	$form.submit();
	$(".loadingWrap").hide();
}

// Regist
function fnReportRegist() {
	var $form = $("#reportListForm");
	$("#reportSeq").val(0);
	$("#page").val(1);
	
	$form.attr("action", '/hea/getReport.do');
	$form.attr('method', 'POST');

	$form.submit();
}

// Modify
function fnReportModify(reportSeq) {
	var $form = $("#reportListForm");
	$("#reportSeq").val(reportSeq);
	$("#page").val(currentPage);
	
	$form.attr("action", '/hea/getReport.do');
	$form.attr('method', 'POST');
	$form.attr('target', '_self');

	$form.submit();
}

// Delete
function fnReportDelete(reportSeq) {
	if(confirm(confirm_delete_msg)) {
		var url = "/hea/deleteReport.ajax";
		var jsonData = { "reportSeq" : reportSeq };
		
		var success = function(jsonResult) {
			if(jsonResult.result > 0) {
				//alert(info_success_transaction_msg);
				Common.alert("success", info_success_transaction_msg, "");
				doSearch(currentPage);
			}
			else {
				//alert(fail_common_msg);
				Common.alert("warning", fail_common_msg, "");
			}
		};  
				
		Ajax.request(url, jsonData, success, "");
	}
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
		
	} else if($("#bienTpCode").val() == "HEA002001") {
		$("#classDetailCode").val("");
		$("#classDetailCode").find('option').not(':first').remove();
		$("#classDetailCode").hide();
		
		$("#arqLayer").show();
		$("#hisLayer").hide();
		
	} else if($("#bienTpCode").val() == "HEA002002") {
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
	
    if(currentPage == 0) currentPage = 1;

    var pager = paging("reportPaging", totalRows, pageListSize, 10, maxPaginationSize, currentPage, "doSearch"); 
	
    resetCascadeSelectBox();
	
	// Select All Toggle
	$("#checkToggle").click(function(){

        if($("#checkToggle").prop("checked")){
            $("input[name=checkItem]").prop("checked",true);
            $(".itemRow").addClass("bg-warning");
            
        }else{
            $("input[name=checkItem]").prop("checked",false);
            $(".itemRow").removeClass("bg-warning");
        }
    })
    
	// keydown event
	$(document).keydown(function(event){
		if(event.keyCode == 13) {
			event.preventDefault();
			doSearch(1);
		}
	});

  
	$("#pageListSize").on('change', function() {
		event.preventDefault();
		doSearch(currentPage);
	});	
	
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
	
	$("#sanctClassCode").on('change', function() {
		event.preventDefault();
		var url = "/hea/code/getHechoCodeList.ajax"; 
		var code = $("#sanctClassCode").val();
			
		changeHechoCodeComboBoxList(url, code, $("#sanctHechoCode1"));
	});		
    
	// Search
	$("#btnSearch").click(function() {
		event.preventDefault();
		doSearch(1);
	});
	
	$("#btnClear").click(function() {
		event.preventDefault();
		doClear();
	});	
	
	// Registrar
	$("#btnRegist").click(function() {
		event.preventDefault();
		fnReportRegist();
	});
	
	$("#btnExcel").click(function() {
		event.preventDefault();
		doExcelDownload();
	});
	
	// Modify
	$("[name='modify']").click(function() {
		event.preventDefault();
		var str = $(this).data('seq');
		fnReportModify(str);
	});	
	
	// Delete
	$("[name='delete']").click(function() {
		event.preventDefault();
		var str = $(this).data('seq');
		fnReportDelete(str);
	});	

});






