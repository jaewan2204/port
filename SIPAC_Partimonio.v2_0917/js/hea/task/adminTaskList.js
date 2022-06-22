
function doSearch(curPage) {
	
	var $form = $("#taskListForm");
	$("#page").val(curPage) ;
	
	$form.attr("action", '/hea/getAdminTaskList.do');
	$form.attr('method', 'POST');
	$form.attr('target', '_self');

	$form.submit();
}

// Regist
function fnRegist() {
	var url = '/hea/getAdminTask.do?taskSeq=0';
	PopupCenter(url, 'adminTask', 650, 250);
}

// Modify
function fnModify(taskSeq) {
	var url = '/hea/getAdminTask.do?taskSeq='+taskSeq;
	PopupCenter(url, 'adminTask', 650, 250);
}

// Delete
function fnDelete(taskSeq) {
	if(confirm(confirm_delete_msg)) {
		var url = "/hea/deleteAdminTask.ajax";
		var jsonData = { "taskSeq" : taskSeq };
		
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
		
		Ajax.request(url, jsonData, success, "");
	}
}

$(document).ready(function(){
	
    if(currentPage == 0) currentPage = 1;

    var pager = paging("taskPaging", totalRows, pageListSize, 10, maxPaginationSize, currentPage, "doSearch"); 
    
	// keydown event
	$(document).keydown(function(event){
		if(event.keyCode == 13) {
			doSearch(1);
		}
	});

	$("#useYn").on('change', function() {
		event.preventDefault();
		doSearch(1);
	});		
   
	$("#pageListSize").on('change', function() {
		event.preventDefault();
		doSearch(currentPage);
	});	
	
	// Search
	$("#btnSearch").click(function() {
		event.preventDefault();
		doSearch(1);
	});
	
	// Registrar
	$("#btnRegist").click(function() {
		event.preventDefault();
		fnRegist();
	});
	
	// Modify
	$("[name='modify']").click(function() {
		event.preventDefault();
		var str = $(this).data('seq');
		fnModify(str);
	});	
	
	// Delete
	$("[name='delete']").click(function() {
		event.preventDefault();
		var str = $(this).data('seq');
		fnDelete(str);
	});		
});





