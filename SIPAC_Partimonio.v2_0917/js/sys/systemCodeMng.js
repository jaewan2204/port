/***********************************************************************************************
 ** Global Variable 
 ***********************************************************************************************/
 
fnGetCodeList("","1","");

/***********************************************************************************************
 ** Function Declarations 
 ***********************************************************************************************/
 
function fnGoToPage(pageNum) {
	//console.log("pageNum::"+pageNum);
	$("#pageIndex").val(pageNum);
	fnGetMainList();
}

 
function fnGetCodeList(stdCd, lvl, pCd) {
	var url = "/sys/sysMngCode/getSysCodeList.ajax";
	var jsonData = {
			"STD_CD" : stdCd,
			"LVL" : lvl,
			"P_CD" : pCd
		};
	Ajax.request(url, jsonData, fnMakeList, "");
};

  
function fnGetChildCodeList() {
	var url = "/sys/sysMngCode/getSysCodeList.ajax";
	// jsonData set
	var lvl = Number($("#CURR_LVL").val())+1;
	var jsonData = {
			"STD_CD" : "",
			"LVL" : lvl,
			"P_CD" : $("#CURR_STD_CD").val()
		};
	// ajax
	Ajax.request(url, jsonData, fnMakeList, "");
}

 
function fnGetMainList() {
	var url = "/sys/sysMngCode/getSysCodeMainList.ajax";
 
	$("#pageListSize").val($("#PAGE_SIZE").val());
	// jsonData set
	var lvl = Number($("#CURR_LVL").val())+1;
	var jsonData = {
			"pageListSize" : $("#pageListSize").val(),
			"pageIndex" : $("#pageIndex").val(),
			"STD_CD" : "",
			"LVL" : lvl,
			"P_CD" : $("#CURR_STD_CD").val()
		};
	Ajax.request(url, jsonData, fnMakeMainList, "");
};

// make a list
function fnMakeList(data) {
	var data_list = data.LIST;
	var totalCnt = data.TOTAL_CNT;	 
    var length = data_list.length;	 
    var currLvl = "";
    var html = "";
    if(length > 0) {
 
    	currLvl = data_list[0].LVL;
    	for(var i = 0; i < length; i++) {
    		var row = data_list[i];
    		html += "<li onclick=\"javascript:fnSelectedRow('"+row.STD_CD+"','"+row.LVL+"','"+row.P_CD+"','"+row.CD_SPN_NM+"', this);\" value=\""+row.SEQ+"\">"+row.CD_SPN_NM+"</li>";
    	}
    } else {
    	html += "";
    }
    $("#CODE_LEVEL"+currLvl).html(html);
}

// make a main list
function fnMakeMainList(data) {
	var data_list = data.LIST;
	var totalCnt = data.TOTAL_CNT;	 
    var currPage = data.pageIndex;	 
    var html = "";
    
    var length = data_list.length;	 
    if(length > 0) {
    	for(var i = 0; i < length; i++) {
    		
    		var row = data_list[i];
    		html += "<tr>";
    		html += "	<td>"+row.ROW_NUM+"</td>";
    		html += "	<td>"+row.STD_CD+"</td>";
    		html += "	<td>"+row.CD_SPN_NM+"</td>";
    		html += "	<td>"+row.CD_ENG_NM+"</td>";
    		html += "	<td>"+row.ACTIVE_YN_NM+"</td>";
    		html += "	<td>"+row.MODIFY_DATE+"</td>";
    		html += "	<td>"+row.USER_NM+"</td>";
    		html += "	<td>";
    		html += "		<div class=\"dt-list-control\">";
    		html += "			<span class=\"dt-list-edit\" onclick=\"fnGoModify('"+row.SEQ+"','"+row.CD_SPN_NM+"','"+row.CD_ENG_NM+"','"+row.ACTIVE_YN+"')\"><i class=\"xi-search\"></i></span>";
    		html += "			<span class=\"dt-list-edit\" onclick=\"fnGoDelete('"+row.SEQ+"','"+row.STD_CD+"')\"><i class=\"xi-trash\"></i></span>";
    		html += "		</div>";
    		html += "	</td>";
    		html += "</tr>";
    	}
    	
    } else {
    	html += "<tr><td colspan='8'><div class='dataNone2'><i>" + infoNoDataMsg + "</i></div></td></tr>";
    }
    
    $("#tbodyList").html(html);
    $("#pageIndex").val(currPage);
 
    Common.pageMaker("PAGING", totalCnt);
}

 
function fnSelectedRow(currCd, currLvl, currPcd, currNm, obj) {
 
	$("#CURR_STD_CD").val(currCd);
	$("#CURR_LVL").val(currLvl);
	$("#CURR_P_CD").val(currPcd);
	
 
	var lvl = Number($("#CURR_LVL").val())+1;
	for(var i = lvl; i <= 6; i++) {
		$("#CODE_LEVEL"+[i]).html("");		
	}
 
	if($("#CODE_LEVEL"+currLvl).find("li").hasClass("active")) {
		$("#CODE_LEVEL"+currLvl).find("li").removeClass("active");
	}
 
	$(obj).addClass("active");
	
 
	fnGetChildCodeList();
 
	$("#pageIndex").val("1");
	fnGetMainList();
 
	fnGetCodeNamePath(currCd, currLvl);
	
};

// popup data clean & set
function fnPopupDataSet(param) {
	// data reset
	$("#LP1_SPN_NM").val("");
	$("#LP1_ENG_NM").val("");
	$("#LP1_STD_CD").val("");
	$("#LP1_LVL").val("");
	$("#LP1_SEQ").val("");
	$("#LP1_MODE").val("");
	$("input:radio[name='LP1_RADIO']").prop("checked", false);
	
 
	$("#LP1_STD_CD").val($("#CURR_STD_CD").val());
	$("#LP1_LVL").val($("#CURR_LVL").val());
	$("#LP1_SEQ").val(param.seq);
	$("#LP1_MODE").val(param.mode);
	$("#LP1_SPN_NM").val(param.spnNm);
	$("#LP1_ENG_NM").val(param.engNm);
	if(param.activeYn == "Y") $("#LP1_RADIO_Y").prop("checked", true);
	else $("#LP1_RADIO_N").prop("checked", true);
	
}

 
function fnGetCodeNamePath(currCd, currLvl) {
	var codes = "";
	for(var i = 0; i < currLvl; i++) {
		var index = 3+(i*3);
		var str = currCd.substring(0, index);
		if(codes.length > 0) codes += ",";
		codes += str;
	}
	var url = "/sys/sysMngCode/getCodeNamePath.ajax";
	var jsonData = {
			"CODES" : codes,
			"STD_CD" : currCd,
			"LVL" : currLvl
		};
	Ajax.request(url, jsonData, fnCodeNameSet, "");
}

 
function fnCodeNameSet(data) {
	$("#CODE_STD").val(data.STD_CD);
	$("#CODE_PATH").val(data.CD_PATH);
}

 
function fnGoDelete(seq, stdCd) {
	if(confirm(GLB_MSG)) {
		var url = "/sys/sysMngCode/delSysCode.ajax";
		var jsonData = {
				"SEQ" : seq,
				"STD_CD" : stdCd
			};
		Ajax.request(url, jsonData, fnDelCallback, "");	
	}
}

//del callback
function fnDelCallback(data) {
 
	fnGetMainList();
}

 
function fnGoModify(seq, spnNm, engNm, activeYn) {
 
	var arg = {"popupId" : "layerPopup1"}
	Common.layerPopup(arg);
	
	var param = {
		"mode" : "modify",
		"seq" : seq,
		"spnNm" : spnNm,
		"engNm" : engNm,
		"activeYn" : activeYn
	}
	fnPopupDataSet(param);
}

 
function fnRegCode() {
 
	var url = "/sys/sysMngCode/regSysCode.ajax";
	var activeYn = $(":input:radio[name=LP1_RADIO]:checked").val();
	var lvl = Number($("#LP1_LVL").val())+1;
	var jsonData = {
			"P_CD" : $("#LP1_STD_CD").val(),
			"LVL" : lvl,
			"CD_SPN_NM" : $("#LP1_SPN_NM").val(),
			"CD_ENG_NM" : $("#LP1_ENG_NM").val(),
			"ACTIVE_YN" : activeYn
		};
	Ajax.request(url, jsonData, fnSaveCallback, "");
}

 
function fnModCode() {
	var url = "/sys/sysMngCode/modSysCode.ajax";
	var activeYn = $(":input:radio[name=LP1_RADIO]:checked").val();
	var lvl = Number($("#LP1_LVL").val())+1;
	var jsonData = {
			"SEQ" : $("#LP1_SEQ").val(),
			"P_CD" : $("#LP1_STD_CD").val(),
			"LVL" : lvl,
			"CD_SPN_NM" : $("#LP1_SPN_NM").val(),
			"CD_ENG_NM" : $("#LP1_ENG_NM").val(),
			"ACTIVE_YN" : activeYn
		};
	Ajax.request(url, jsonData, fnSaveCallback, "");
}

//save callback
function fnSaveCallback(data) {
	$("#LP1_CANCEL").click();
 
	fnGetCodeList("", data.LVL, data.P_CD);
 
	fnGetMainList();
}

/***********************************************************************************************
 ** $(document).ready()
 ***********************************************************************************************/
$(document).ready(function(){
 
	Common.pageSize("PAGE_SIZE", "10");
	
 
	$("#LP1_SAVE").click(function() {
		var mode = $("#LP1_MODE").val();
		if(mode == "regist") {
			fnRegCode();
		} else {
			fnModCode();
		}
	});
	
 
	$("#REG_CODE").click(function() {
 
		var arg = {"popupId" : "layerPopup1"}
		Common.layerPopup(arg);
		
		var param = {
			"mode" : "regist",
			"seq" : "",
			"activeYn" : "Y"
		}
		fnPopupDataSet(param);
	});
	
});


