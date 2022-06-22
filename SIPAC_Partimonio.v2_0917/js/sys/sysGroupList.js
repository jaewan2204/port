/***********************************************************************************************
 ** Global Variable 
 ***********************************************************************************************/
var GLO_PAGE_URL = "/sys/sysMngGroup/getGroupList.ajax";

// list search default
fnGetGroupList();

/***********************************************************************************************
 ** Function Declarations 
 ***********************************************************************************************/


function fnGoToPage(pageNum) {
	//console.log("my function!! goTo::"+pageNum);
	var url = GLO_PAGE_URL;
	$("#pageIndex").val(pageNum);
	var form = Common.serialize($("#SRCH_FORM"));
	Ajax.request(url, form, fnMakeList, "");
}


function fnGetGroupList() {
	var pageSize = $("#PAGE_SIZE").val();
	$("#pageListSize").val(pageSize);
	console.log("pageSize::"+pageSize);
	var url = GLO_PAGE_URL;
	var form = Common.serialize($("#SRCH_FORM"));
	Ajax.request(url, form, fnMakeList, "");
}

// make a list
function fnMakeList(data) {
	var data_list = data.LIST;
	var totalCnt = data.totalCnt;
    var currPage = data.pageIndex;
    var totalPage = 0;				
    var html = "";
    
    var length = data_list.length;	
    if(length > 0) {
    	for(var i = 0; i < length; i++) {
    		
    		var currRow = data_list[i];
    		html += "<tr>";
    		html += "	<td>"+currRow.ROW_NUM+"</td>";
    		html += "	<td>"+currRow.GRP_NM+"</td>";
    		html += "	<td class=\"left\">"+currRow.DSCPT+"</td>";
    		html += "	<td>";
    		html += "		<div class=\"dt-list-control\">";
    		html += "			<span class=\"dt-list-edit\" onclick=\"fnGoDetail('"+currRow.GRP_SEQ+"')\"><i class=\"xi-search\"></i></span>";
    		html += "			<span class=\"dt-list-edit\" onclick=\"fnGoModify('"+currRow.GRP_SEQ+"')\"><i class=\"xi-pen\"></i></span>";
    		html += "			<span class=\"dt-list-edit\" onclick=\"fnGoDelete('"+currRow.GRP_SEQ+"')\"><i class=\"xi-trash\"></i></span>";
    		html += "		</div>";
    		html += "	</td>";
    		html += "</tr>";
    	}
    	
    } else {
    	html += "<tr><td colspan=\"5\">not found data</td></tr>";
    }
    
    $("#tbodyList").html(html);
    $("#pageIndex").val(currPage);
    

    Common.pageMaker("PAGING", totalCnt);
    
}


function fnGoDetail(grpSeq) {
	$("#GRP_SEQ").val(grpSeq);

	$("#SRCH_FORM").attr("method", "post");
	$("#SRCH_FORM").attr("action", "/sys/sysMngGroup/groupDetail.do");
	$("#SRCH_FORM").submit();
}


function fnGoModify(grpSeq) {
	$("#GRP_SEQ").val(grpSeq);

	$("#SRCH_FORM").attr("method", "post");
	$("#SRCH_FORM").attr("action", "/sys/sysMngGroup/groupModify.do");
	$("#SRCH_FORM").submit();
}


function fnGoDelete(grpSeq) {
	var msg = "¿Quieres borrarlo?";
	if(confirm(msg)) {
		var url = "/sys/sysMngGroup/groupDelete.ajax";
		var jsonData = {
			"GRP_SEQ" : grpSeq
			};
		Ajax.request(url, jsonData, fnDelCallback, "");	
	}
}

// delete callback
function fnDelCallback(data) {
	// alert msg
	Common.alert("success", "Su solicitud ha sido completada.");
	// list refresh
	fnGetGroupList();
}


/***********************************************************************************************
 ** $(document).ready()
 ***********************************************************************************************/
$(document).ready(function(){
	// keydown event
	$(document).keydown(function(event){
		if(event.keyCode == 13) {
			var objId = event.target.id;

			if(objId == "SRCH_VAL") {
				$("#SRCH_GROUP").click();
			} else {
				event.preventDefault();
				return false;	
			}
		}
	});


	$("#SRCH_GROUP").click(function() {
		var srchVal = $("#SRCH_VAL").val();

			$("#pageIndex").val("1");
			fnGetGroupList();			

	});
	

	$("#REG_GROUP").click(function() {

		document.location.href = "/sys/sysMngGroup/regGroupPage.do";
	});
	
});


