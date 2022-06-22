function doSearch(curPage) {
	var $form = $("#searchListForm");
	$("#page").val(curPage) ;
	
	$form.attr("action", '/hea/search/getMovableList.do');
	$form.attr('method', 'POST');
	$form.attr('target', '_self');

	$form.submit();
}

function doSave() {
	var mvbGenSeq = new Array();

	$("input[name=checkItem]:checked").each(function(index) { 
			var $itemRow = $(this).closest(".itemRow");
			mvbGenSeq[index] = $itemRow.data('seq');
		}
	);
		
	if(mvbGenSeq.length <= 0)	{
		alert(info_select_nodata_msg);
		return;
	} else
		alert(mvbGenSeq[0]);
	return false;
	
	if(confirm(confirm_regist_msg)) {
		$("#arrayUserSeq").val(arrayUserSeq);
		
		var url = "/hea/updateAdminProgramUser.ajax";
		var form = Common.serialize($("#userListForm"));
		
		var success = function(jsonResult) {
			if(jsonResult.result > 0) {
				alert(info_success_transaction_msg);
				opener.location.reload();
			}
			else
				alert(fail_common_msg);
		};  
		
		Ajax.request(url, form, success, "");
	}
}

function changeUbigeoComboBoxList(url, code, comboBox, depth){

	var jsonData = { "ubigeoCode" : code };

	var success = function(data) {
		var errorMessage = null ;  
		if( data.result < 1 ) {
			alert(fail_common_msg);
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

function changeCommonCodeComboBoxList(url, jsonData, comboBox){

	var success = function(data) {
		var errorMessage = null ;  
		if( data.result < 1 ) {
			alert(fail_common_msg);
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

	};  
	
	Ajax.request(url, jsonData, success, "");
}

function changeLctInfoComboBoxList(url, jsonData, comboBox){

	var success = function(data) {
		var errorMessage = null ;  
		if( data.result < 1 ) {
			alert(fail_common_msg);
		} else if( data.result > 0 ) {
			var list = data.list ; 
			var listLen = null == list ? 0 : list.length ; 
			var selectComboBox = comboBox ; 
			
			selectComboBox.val("");
			selectComboBox.find('option').not(':first').remove();
			
			if(0 < listLen) {
				for(var i = 0, iLen = list.length; i < iLen; i ++ ) {
					var item = list[i];
					var seq = item.code;
					var name = item.codeNm; 
							
					var tag = '<option value="' + seq + '" >' + name + ' </option>';
					var option = $(tag) ;
					selectComboBox.append(option) ;
				} 
				
				selectComboBox.focus() ;  
			}
		}

	};  
	
	Ajax.request(url, jsonData, success, "");
}

$( ".itemRow" ).click( itemRow_Listener ) ; 
function itemRow_Listener( e ) {
	$('tbody tr').removeClass("bg-warning");
	
	var iType = $(this).find('td:first-child :radio');
	
	iType.prop("checked", true);
	iType.closest("tr").addClass("bg-warning");
}

$(document).ready(function(){
    
	if(currentPage == 0) currentPage = 1;

    var pager = paging("searchPaging", totalRows, pageListSize, 10, maxPaginationSize, currentPage, "doSearch"); 
    
	// Save
	$("#btnRegist").click(function() {
		event.preventDefault();
		doSave();
	});

	$("#btnSearch").click(function() {
		event.preventDefault();
		doSearch(1);
	});	
	
	// Search
	$("#pageListSize").on('change', function() {
		event.preventDefault();
		doSearch(currentPage);
	});	
	
	// keydown event
	$(document).keydown(function(event){
		if(event.keyCode == 13) {
			event.preventDefault();
			doSearch(1);
		}
	});

	// Ubigeo
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
	
	// Classification : 005 
	$("#classCode").on('change', function() {
		event.preventDefault();
		var url = "/hea/search/getMovableCodeList.ajax"; 
		var code = "005";
		var parentCode = $("#classCode").val();
		
		var jsonData = { "code" : code, "parentCode" : parentCode };
		changeCommonCodeComboBoxList(url, jsonData, $("#classSpecCode"));
		
		$("#bienTypeCode").find('option').not(':first').remove();	
	});	
	
	// Bien Type : 006
	$("#classSpecCode").on('change', function() {
		event.preventDefault();
		if($("#classSpecCode").val() == "" || $("#classSpecCode").val() == "00500001") {
			$("#bienTypeCode").find('option').not(':first').remove();	
		} else {
			var url = "/hea/search/getMovableCodeList.ajax"; 
			var code = "006";
			var parentCode = $("#classSpecCode").val();
			
			var jsonData = { "code" : code, "parentCode" : parentCode };
			changeCommonCodeComboBoxList(url, jsonData, $("#bienTypeCode"));
		}
	});	
	
	// periodCode : 023 
	$("#eraCode").on('change', function() {
		
		event.preventDefault();
		var url = "/hea/search/getMovableCodeList.ajax"; 
		var code = "023";
		var parentCode = $("#eraCode").val();
		
		var jsonData = { "code" : code, "parentCode" : parentCode };
		changeCommonCodeComboBoxList(url, jsonData, $("#periodCode"));
	});	
	
	// Tipo de Localizacion : 077 
	$("#locCode").on('change', function() {
		
		event.preventDefault();
		var url = "/hea/search/getLctInfoList.ajax"; 
		var code = $("#locCode").val();
		var parentCode = "";
		
		var jsonData = { "code" : code, "parentCode" : parentCode };
		changeLctInfoComboBoxList(url, jsonData, $("#lctSeq"));
	});		
});





