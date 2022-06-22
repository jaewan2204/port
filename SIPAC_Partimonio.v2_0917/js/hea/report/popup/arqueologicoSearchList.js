function doSearch(curPage) {
	var $form = $("#userListForm");
	$("#page").val(curPage) ;
	
	$form.attr("action", '/hea/getUserList.do');
	$form.attr('method', 'POST');
	$form.attr('target', '_self');

	$form.submit();
}

function doSave() {
	var arrayUserSeq = new Array();
	
	$("input[name=checkItem]:checked").each(function(index) { 
			var $itemRow = $(this).closest(".itemRow");
			arrayUserSeq[index] = $itemRow.data('seq');
		}
	);
		
	if(arrayUserSeq.length <= 0)	{
		alert(info_select_nodata_msg);
		return;
	}
	
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

$( ".itemRow" ).click( itemRow_Listener ) ; 
function itemRow_Listener( e ) {
	var iType = $(this).find('td:first-child :checkbox');
	
	if( iType.prop("checked") ) {
		iType.prop("checked", false);
		iType.closest("tr").removeClass("bg-warning");
	} else {
		iType.prop("checked", true);
		iType.closest("tr").addClass("bg-warning");
	}	
}

$(document).ready(function(){
    
    $("#taskSeq").val($("#taskSeq", opener.document).val());
    $("#programSeq").val($("#programSeq", opener.document).val());
    
	if(currentPage == 0) currentPage = 1;

    var pager = paging("userPaging", totalRows, pageListSize, 10, maxPaginationSize, currentPage, "doSearch"); 
    
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
});





