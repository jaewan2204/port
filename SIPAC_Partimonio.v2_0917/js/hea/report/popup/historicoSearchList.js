function doSearch(curPage) {
	var $form = $("#searchListForm");
	$("#page").val(curPage) ;
	
	$form.attr("action", '/hea/search/getHistoricoList.do');
	$form.attr('method', 'POST');
	$form.attr('target', '_self');

	$form.submit();
}

function doSave() {
	var hreGenSeq = 0;
	var tdArray = new Array();

	$("input[name=checkItem]:checked").each(function(index) { 
			var $itemRow = $(this).closest(".itemRow");
			hreGenSeq = $itemRow.data('seq');
			$("#hreGenSeq").val(hreGenSeq) ;
			
			var td = $itemRow.children();
			td.each(function(i) {
				tdArray.push(td.eq(i).text());
			});
		}
	);
		
	if(tdArray.length == 0) {
		alert("info_select_nodata_msg");
		//Common.alert("warning", info_select_nodata_msg, "");
		return false;
	}
	
	if(confirm(confirm_regist_msg)) {
		
		var url = "/hea/updateReportHreGenSeq.ajax";
		var form = Common.serialize($("#searchListForm"));

		var success = function(jsonResult) {
			if(jsonResult.result > 0) {
				alert(info_success_transaction_msg);
				//Common.alert("success", info_success_transaction_msg, "");
				if(typeof(opener.selectMvbGen) == "function") {
					console.log(tdArray);
					window.opener.selectMvbGen(hreGenSeq, tdArray);
					window.close();
				} 
			}
			else {
				alert(fail_common_msg);
				//Common.alert("warning", fail_common_msg, "");
			}
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
			//Common.alert("warning", fail_common_msg, "");
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
			//Common.alert("warning", fail_common_msg, "");
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
		var url = "/hea/search/getHistoricoCodeList.ajax"; 
		var code = "005";
		var parentCode = $("#classCode").val();
		
		var jsonData = { "code" : code, "parentCode" : parentCode };
		changeCommonCodeComboBoxList(url, jsonData, $("#classSpecCode"));
	});	
	
	
});





