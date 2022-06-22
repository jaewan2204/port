
function doSearch(curPage) {
	var $form = $("#programListForm");
	$("#page").val(curPage);
	
	$form.attr("action", '/hea/getAdminProgramUserList.do');
	$form.attr('method', 'POST');
	$form.attr('target', '_self');

	$form.submit();
}

function fnModify(programSeq) {
	$("#programSeq").val(programSeq);
	
	var $form = $("#programListForm");
	$("#page").val(currentPage) ;
	
	$form.attr("action", '/hea/getAdminUserList.do');
	$form.attr('method', 'POST');
	$form.attr('target', '_self');

	$form.submit();
}

$(document).ready(function(){
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

	// Search
	$("#btnSearch").click(function() {
		event.preventDefault();
		doSearch(1);
	});
	
	$("[name='modify']").click(function() {
		event.preventDefault();
		var str = $(this).data('seq');
		fnModify(str);
	});	

});





