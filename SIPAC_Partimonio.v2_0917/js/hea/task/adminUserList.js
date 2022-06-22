
function doSearch(curPage) {
	var $form = $("#adminUserListForm");
	$("#page").val(curPage);
	
	$form.attr("action", '/hea/getAdminUserList.do');
	$form.attr('method', 'POST');
	$form.attr('target', '_self');

	$form.submit();
}

// regist
function fnRegist() {
	var url = '/hea/getUserList.do';
	PopupCenter(url, 'userList', 850, 700);
}

// delete
function fnDelete() {
	var arrayUserSeq = new Array();
	
	$("input[name=checkItem]:checked").each(function(index) { 
			var $itemRow = $(this).closest(".itemRow");
			arrayUserSeq[index] = $itemRow.data('seq');
		}
	);
		
	if(arrayUserSeq.length <= 0)	{
		//alert(info_select_nodata_msg);
		Common.alert("warning", info_select_nodata_msg, "");
		return;
	}
	
	if(confirm(confirm_delete_msg)) {
		$("#arrayUserSeq").val(arrayUserSeq);
		
		var url = "/hea/deleteAdminProgramUser.ajax";
		var form = new FormData($("#adminUserListForm")[0]);
		
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
	var $form = $("#adminUserListForm");
	
	$form.attr("action", '/hea/getAdminProgramUserList.do');
	$form.attr('method', 'POST');

	$form.submit();
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
    
   	$("#pageListSize").on('change', function() {
   		event.preventDefault();
		doSearch(currentPage);
	});	 

	// Registrar, 
	$("#btnRegist").click(function() {
		event.preventDefault();
		fnRegist();
	});
	
	// Delete
	$("#btnDelete").click(function() {
		event.preventDefault();
		fnDelete();
	});		
	
	// back, 
	$("#exit").click(function() {
		event.preventDefault();
		exit();
		false;
	});
});





