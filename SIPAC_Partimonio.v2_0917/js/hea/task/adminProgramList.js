
function doSearch(curPage) {

	var $form = $("#programListForm");
	$("#page").val(curPage);
	
	$form.attr("action", '/hea/getAdminProgramList.do');
	$form.attr('method', 'POST');
	$form.attr('target', '_self');

	$form.submit();
}

// regist
function fnRegist() {	
	var url = '/hea/getAdminProgram.do?adminTask.taskSeq=' + $("#taskSeq").val();
	PopupCenter(url, 'adminProgram', 650, 250);
}

// modify
function fnModify(programSeq) {
	var url = '/hea/getAdminProgram.do?adminTask.taskSeq=' + $("#taskSeq").val() + '&programSeq='+programSeq;
	PopupCenter(url, 'adminProgram', 650, 250);
}

// delete
function fnDelete(programSeq) {
	if(confirm(confirm_delete_msg)) { 
		var url = "/hea/deleteAdminProgram.ajax";
		var jsonData = { "programSeq" : programSeq, "adminTask.taskSeq" : $("#taskSeq").val() };
		
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

function moveItemUpDown($itemRow , upDownDir) {

	var dbg = true ;
	var valid = true ;

	if(undefined == upDownDir) {
		upDownDir = -1;  // up
	}

	if(0 > upDownDir) {
		// move item upward
		if(1 > $itemRow.prev().length) {
			console.log("Current item is first child. It has been skipped to move upward.");
		} else {
			var $prev = $itemRow.prev();

			var prevItemNo = $prev.find(".orderNo").html();
			var currItemNo = $itemRow.find(".orderNo").html();

			$itemRow.insertBefore($prev);

			$prev.find(".orderNo").html("" + currItemNo);
			$itemRow.find(".orderNo").html("" + prevItemNo);

			$("#btnOrder").css("display","");
			console.log("moved upward.");
		}
	} else if(0 < upDownDir) {
		// move item downward
		if(1 > $itemRow.next().length) {
			console.log("Current item is last child. It has been skipped to move downward.");
		} else {

			var $next = $itemRow.next();

			var nextItemNo = $next.find(".orderNo").html();
			var currItemNo = $itemRow.find(".orderNo").html();

			$itemRow.insertAfter( $next );

			$next.find(".orderNo").html("" + currItemNo) ;
			$itemRow.find(".orderNo").html("" + nextItemNo);

			$("#btnOrder").css("display","");
			console.log("moved downward");
		}
	}
}

$(document).ready(function(){
	$("#btnOrder").css("display","none");
    if(currentPage == 0) currentPage = 1;

    var pager = paging("programPaging", totalRows, pageListSize, 10, maxPaginationSize, currentPage, "doSearch"); 
    
    if($("#taskSeq").val() == 0) {
    	$("#taskSeq option:eq(1)").attr("selected", "selected");
    }
    
	$("#taskSeq").on('change', function() {
		event.preventDefault();
		doSearch(1);
	});
	
	$("#useYn").on('change', function() {
		event.preventDefault();
		doSearch(1);
	});	

	$("#pageListSize").on('change', function() {
		event.preventDefault();
		doSearch(currentPage);
	});	
	
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

	// Search
	$("#btnSearch").click(function() {
		event.preventDefault();
		doSearch(1);
	});
	
	// Registrar, 
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
	
	// Up
	$("#btnUp").click(function() {
		event.preventDefault();
		var $selList = $("input[name=checkItem]:checked");
		var itemRowCount = $selList.length;
		
		$selList.each(
			function(index) {
				var $itemRow = $(this).closest(".itemRow");
				//console.log($itemRow);
				moveItemUpDown($itemRow, -1);
			}
		);
	});
	
	// Down
	$("#btnDown").click(function() {
		event.preventDefault();
		var $selList = $("input[name=checkItem]:checked");
		var itemRowCount = $selList.length;
	
		$($selList.get().reverse()).each(
			function(index) {
				var $itemRow = $(this).closest(".itemRow");
				//console.log($itemRow);
				moveItemUpDown($itemRow, +1);
			}
		);
	});
	
	// Save Order
	$("#btnOrder").click(function() {
		event.preventDefault();
		var $selList = $("input[name=checkItem]");
		var itemRowCount = $selList.length;
		
		var arrayProgramSeq = new Array();
		var arrayCurOrder = new Array();
		
		$selList.each(
			function(index) {
				var $itemRow = $(this).closest(".itemRow");

				arrayProgramSeq[index] = $itemRow.data('seq');
				arrayCurOrder[index] = $itemRow.find(".orderNo").html();
				
				console.log("SEQ:"+arrayProgramSeq[index]+", CUR:"+arrayCurOrder[index]);
			}
		);
		
		var $form = $("#programListForm");

		$("#arrayProgramSeq").val(arrayProgramSeq);
		$("#arrayCurOrder").val(arrayCurOrder);
		
		$form.attr("action", '/hea/setAdminProgramOrder.do');
		$form.attr('method', 'POST');
		$form.attr('target', '_self');

		$form.submit();		
	});	
});





