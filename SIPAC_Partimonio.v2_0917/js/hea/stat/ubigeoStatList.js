
function doSearch(curPage) {
	var $form = $("#statListForm");
	$("#page").val(curPage) ;
	
	$form.attr("action", '/hea/getUbigeoStatList.do');
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
	
	// Tipo de Bien
	$("#bienTpCode").find('option:eq(0)').prop('selected', true);
	$("#classCode").find('option:eq(0)').prop('selected', true);
	$("#classDetailCode").find('option:eq(0)').prop('selected', true);
	$("#classCode").hide();
	$("#classDetailCode").hide();
	
	$("#searchFromDate").val("");
	$("#searchToDate").val("");
	
	$("#provCode, #distCode, #classCode, #classDetailCode").find("option").each(function() {
	    if(!(this.value == "" || this.value == "000000"))
	    	$(this).remove();
	});
}

function doExcelDownload() {
	var $form = $("#statListForm");
	var url = '/hea/getExcelUbigeoStatList.do';
	$form.attr("action", url);
	$form.attr('method', 'GET');

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
	
	} else if($("#bienTpCode").val() == "HEA002001") {
		$("#classDetailCode").val("");
		$("#classDetailCode").find('option').not(':first').remove();
		$("#classDetailCode").hide();
		
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

$(document).ready(function(){
	
    if(currentPage == 0) currentPage = 1;

    var pager = paging("reportPaging", totalRows, pageListSize, 10, maxPaginationSize, currentPage, "doSearch"); 
    
    resetCascadeSelectBox();
	
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
	
	// Search
	$("#btnSearch").click(function() {
		event.preventDefault();
		doSearch(1);
	});
	
	$("#btnClear").click(function() {
		event.preventDefault();
		doClear();
	});	
	
	$("#btnExcel").click(function() {
		event.preventDefault();
		doExcelDownload();
	});


});






