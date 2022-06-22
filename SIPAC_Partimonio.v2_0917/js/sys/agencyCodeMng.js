/***********************************************************************************************
 ** Global Variable 
 ***********************************************************************************************/
 
fnGetCodeList("1","");

/***********************************************************************************************
 ** Function Declarations 
 ***********************************************************************************************/
 
function fnGetCodeList(lvl, pSeq) {
	var url = "/sys/sysMngCode/getOrgCodeList.ajax";
	var jsonData = {
			"LVL" : lvl,
			"P_SEQ" : pSeq
		};
	Ajax.request(url, jsonData, fnMakeList, "");
};

 
function fnGetChildCodeList(lvl, seq) {
	var url = "/sys/sysMngCode/getOrgCodeList.ajax";
	var newLvl = Number(lvl) + 1;
	var jsonData = {
			"LVL" : newLvl,
			"P_SEQ" : seq
		};
	Ajax.request(url, jsonData, fnMakeList, "");
};

// fnMakeList
function fnMakeList(data) {
	var data_list = data.LIST;
	var totalCnt = data.TOTAL_CNT;	 
    var length = data_list.length;	 
    var currLvl = data.PARAM.LVL;	 
    var html = "";
    if(length > 0) {
    	for(var i = 0; i < length; i++) {
    		var row = data_list[i];
    		html += "<tr>";
    		html += "	<td>"+row.ROW_NUM+"</td>";
    		if(row.LVL == "1") {  
    			html += "	<td>"+row.TP_ORGA_CD_NM+"</td>";	
    		}
    		if(row.ACTIVE_YN == "N") {
        		html += "	<td onclick=\"javascript:fnSelectedRow('"+row.LVL+"','"+row.ORGA_SEQ+"');\" class=\"font_red\">"+row.ORGA_NM+"</td>";    			
    		} else {
        		html += "	<td onclick=\"javascript:fnSelectedRow('"+row.LVL+"','"+row.ORGA_SEQ+"');\">"+row.ORGA_NM+"</td>";
    		}
    		html += "	<td>";
    		html += "		<div class=\"dt-list-control\">";
    		html += "			<span class=\"dt-list-edit\" onclick=\"fnGoModify('"+row.ORGA_SEQ+"')\" data-toggle='tooltip' data-placement='top' title='" + tooltipEdit + "'><i class=\"xi-pen\"></i></span>";
    		if(row.ACTIVE_YN == "N") {
    			html += "			<span class=\"dt-list-edit\" onclick=\"fnGoActive('"+row.ORGA_SEQ+"','"+row.LVL+"','"+row.P_SEQ+"')\" data-toggle='tooltip' data-placement='top' title='" + tooltipActive + "'><i class=\"xi-check-circle font_green\"></i></span>";	
    		} else {
    			html += "			<span class=\"dt-list-edit\" onclick=\"fnGoDelete('"+row.ORGA_SEQ+"','"+row.LVL+"','"+row.P_SEQ+"')\" data-toggle='tooltip' data-placement='top' title='" + tooltipDisable + "'><i class=\"xi-check-circle font_red\"></i></span>";	
    		}
    		html += "		</div>";
    		html += "	</td>";
    		html += "</tr>";
 
    	}
    } else {
    	if(currLvl == "1") {
    		html += "<tr id='noDataTR' class='h_601'><td colspan=\"4\"><div class='dataNone'><i>" + infoNoDataMsg + "</i></div></td></tr>";
    	} else {
    		html += "<tr id='noDataTR' class='h_601'><td colspan=\"3\"><div class='dataNone'><i>" + infoNoDataMsg + "</i></div></td></tr>";
    	}
    }
    $("#CODE_LEVEL"+currLvl).html(html);
 
    $('[data-toggle="tooltip"]').tooltip();
}

// SelectedRow
function fnSelectedRow(lvl, seq) {
	if(Number(lvl) < 3) {
 
		var start = Number(lvl)+1;
		for(var i = start; i <= 3; i++) {
			$("#CODE_LEVEL"+[i]).html("");		
		}
 
		fnGetChildCodeList(lvl, seq);
	}
};

 
function fnPopupDataSet(param) {
	if(param.LVL=="1") {  
		// layer popup open
		$(".modal").hide();
	    $("#LAYER_POP2").show();
	    $("#LAYER_POP2").layerCenter();
		// data reset
		$("#LP2_MODE_ID, #LP2_ORGA_NM, #LP2_ORGA_SEQ").val("");
		$("input:radio[name='LP2_TP_RADIO']").prop("checked", false);
		$("input:radio[name='LP2_RADIO']").prop("checked", false);
		// data setting
		$("#LP2_MODE_ID").val(param.MODE_ID);
		$("#LP2_ORGA_NM").val(Common.convert(param.ORGA_NM));
		$("#LP2_ORGA_SEQ").val(param.ORGA_SEQ);
		
		if(param.TP_ORGA_CD == "P") $("#LP2_TP_RADIO_P").prop("checked", true);
		else if(param.TP_ORGA_CD == "R") $("#LP2_TP_RADIO_R").prop("checked", true);
		
		if(param.ACTIVE_YN == "Y") $("#LP2_RADIO_Y").prop("checked", true);
		else $("#LP2_RADIO_N").prop("checked", true);
		
	} else if(param.LVL=="2") {  
		// layer popup open
		//var arg = {"popupId" : "LAYER_POP3"}
		//Common.layerPopup(arg);
		$(".modal").hide();
	    $("#LAYER_POP3").show();
	    $("#LAYER_POP3").layerCenter();
		// data reset
		$("#LP3_MODE_ID, #LP3_ORGA_SEQ, #LP3_ORGA_NM, #LP3_DETAIL_ADDR_NM, #LP3_RSPN_NM").val("");
		$("#LP3_TEL_NO1, #LP3_TEL_NO2, #LP3_EMAIL, #LP3_WEB_URL, #LP3_ADMIN_NM").val("");
		$("#LP3_OBSVT_CT, #LP3_LTTD, #LP3_LNGTD").val("");
		$("input:radio[name='LP3_RADIO']").prop("checked", false);
		// selectBox reset
		var targetArr = ['LP3_ORGA_LV1','LP3_UBIGEO_LV1','LP3_UBIGEO_LV2','LP3_UBIGEO_LV3'];
		fnSBoxReset(targetArr);
		// disabled:false
		$("select[id='LP3_ORGA_LV1']").prop("disabled", false);
		
		// data setting
		if(param.MODE_ID == "reg") {  
			$("#LP3_MODE_ID").val(param.MODE_ID);
 
			Common.codeMaker("LP3_ORGA_LV1", "", {"SQL_ID" : "ORGA_LV1", "LVL" : "1"});
			Common.codeMaker("LP3_UBIGEO_LV1", "", {"SQL_ID" : "UBIGEO_LV1", "LVL" : "1"});
			// radio
			if(param.ACTIVE_YN == "Y") $("#LP3_RADIO_Y").prop("checked", true);
			else $("#LP3_RADIO_N").prop("checked", true);	
		} else if(param.MODE_ID == "mod") {  
			// input:text
			$("#LP3_MODE_ID").val(param.MODE_ID);
			$("#LP3_ORGA_SEQ").val(param.ORGA_SEQ);
			$("#LP3_ORGA_NM").val(param.ORGA_NM);
			$("#LP3_DETAIL_ADDR_NM").val(param.DETAIL_ADDR_NM);
			$("#LP3_RSPN_NM").val(param.RSPN_NM);
			$("#LP3_TEL_NO1").val(param.TEL_NO1);
			$("#LP3_TEL_NO2").val(param.TEL_NO2);
			$("#LP3_EMAIL").val(param.EMAIL);
			$("#LP3_WEB_URL").val(param.WEB_URL);
			$("#LP3_ADMIN_NM").val(param.ADMIN_NM);
			$("#LP3_OBSVT_CT").val(param.OBSVT_CT);
			$("#LP3_LTTD").val(param.LTTD);
			$("#LP3_LNGTD").val(param.LNGTD);
			// input:radio
			if(param.ACTIVE_YN == "Y") $("#LP3_RADIO_Y").prop("checked", true);
			else $("#LP3_RADIO_N").prop("checked", true);
			// selectBox
			Common.codeMaker("LP3_ORGA_LV1", param.P_SEQ+"", {"SQL_ID" : "ORGA_LV1", "LVL" : "1"});
			Common.codeMaker("LP3_UBIGEO_LV1", param.UBIGEO_LV1+"", {"SQL_ID" : "UBIGEO_LV1", "LVL" : "1"});
			Common.codeMaker("LP3_UBIGEO_LV2", param.UBIGEO_LV2+"", {"SQL_ID" : "UBIGEO_LV2", "LVL" : "2", "UBIGEO_NO" : param.UBIGEO_NO});
			Common.codeMaker("LP3_UBIGEO_LV3", param.UBIGEO_NO+"", {"SQL_ID" : "UBIGEO_LV3", "LVL" : "3", "UBIGEO_NO" : param.UBIGEO_NO});
			// disabled
			$("select[id='LP3_ORGA_LV1']").prop("disabled", true);
		}
	} else if(param.LVL=="3") {	 
		// layer popup open
		//var arg = {"popupId" : "LAYER_POP4"}
		//Common.layerPopup(arg);
		$(".modal").hide();
	    $("#LAYER_POP4").show();
	    $("#LAYER_POP4").layerCenter();
		// data reset 
		$("#LP4_MODE_ID, #LP4_ORGA_SEQ, #LP4_ORGA_NM, #LP4_DETAIL_ADDR_NM, #LP4_RSPN_NM, #LP4_TEL_NO1, #LP4_TEL_NO2").val("");
		$("#LP4_EMAIL, #LP4_WEB_URL, #LP4_ADMIN_NM, #LP4_OBSVT_CT, #LP4_LTTD, #LP4_LNGTD").val("");
		$("input:radio[name='LP4_RADIO']").prop("checked", false);
		// selectBox reset
		var targetArr = ['LP4_ORGA_LV1','LP4_ORGA_LV2','LP4_UBIGEO_LV1','LP4_UBIGEO_LV2','LP4_UBIGEO_LV3'];
		fnSBoxReset(targetArr);		
		// disabled:false
		$("select[id='LP4_ORGA_LV1']").prop("disabled", false);
		$("select[id='LP4_ORGA_LV2']").prop("disabled", false);
		
		// data setting
		if(param.MODE_ID == "reg") {  
			$("#LP4_MODE_ID").val(param.MODE_ID);
 
			Common.codeMaker("LP4_ORGA_LV1", "", {"SQL_ID" : "ORGA_LV1", "LVL" : "1"});
			Common.codeMaker("LP4_UBIGEO_LV1", "", {"SQL_ID" : "UBIGEO_LV1", "LVL" : "1"});
			// radio
			if(param.ACTIVE_YN == "Y") $("#LP4_RADIO_Y").prop("checked", true);
			else $("#LP4_RADIO_N").prop("checked", true);	
		} else if(param.MODE_ID == "mod") {  
			// input:text
			$("#LP4_MODE_ID").val(param.MODE_ID);
			$("#LP4_ORGA_SEQ").val(param.ORGA_SEQ);
			$("#LP4_ORGA_NM").val(param.ORGA_NM);
			$("#LP4_DETAIL_ADDR_NM").val(param.DETAIL_ADDR_NM);
			$("#LP4_RSPN_NM").val(param.RSPN_NM);
			$("#LP4_TEL_NO1").val(param.TEL_NO1);
			$("#LP4_TEL_NO2").val(param.TEL_NO2);
			$("#LP4_EMAIL").val(param.EMAIL);
			$("#LP4_WEB_URL").val(param.WEB_URL);
			$("#LP4_ADMIN_NM").val(param.ADMIN_NM);
			$("#LP4_OBSVT_CT").val(param.OBSVT_CT);
			$("#LP4_LTTD").val(param.LTTD);
			$("#LP4_LNGTD").val(param.LNGTD);
			// input:radio
			if(param.ACTIVE_YN == "Y") $("#LP4_RADIO_Y").prop("checked", true);
			else $("#LP4_RADIO_N").prop("checked", true);
			// selectBox
			Common.codeMaker("LP4_ORGA_LV1", param.G_SEQ+"", {"SQL_ID" : "ORGA_LV1", "LVL" : "1"});
			Common.codeMaker("LP4_ORGA_LV2", param.P_SEQ+"", {"SQL_ID" : "ORGA_LV2", "LVL" : "2", "P_SEQ" : param.G_SEQ});
			Common.codeMaker("LP4_UBIGEO_LV1", param.UBIGEO_LV1+"", {"SQL_ID" : "UBIGEO_LV1", "LVL" : "1"});
			Common.codeMaker("LP4_UBIGEO_LV2", param.UBIGEO_LV2+"", {"SQL_ID" : "UBIGEO_LV2", "LVL" : "2", "UBIGEO_NO" : param.UBIGEO_NO});
			Common.codeMaker("LP4_UBIGEO_LV3", param.UBIGEO_NO+"", {"SQL_ID" : "UBIGEO_LV3", "LVL" : "3", "UBIGEO_NO" : param.UBIGEO_NO});
			// disabled
			$("select[id='LP4_ORGA_LV1']").prop("disabled", true);
			$("select[id='LP4_ORGA_LV2']").prop("disabled", true); 
		}
	}
}

 
function fnGoDelete(seq, lvl, pSeq) {
	if(confirm(G_delMsg)) {
		var url = "/sys/sysMngCode/delOrgCode.ajax";
		var jsonData = {
				"ORGA_SEQ" : seq,
				"LVL" : lvl,
				"P_SEQ" : pSeq,
				"ACTIVE_YN" : "N"
			};
		Ajax.request(url, jsonData, fnDelCallback, "");	
	}
}

 
function fnGoActive(seq, lvl, pSeq) {
	if(confirm(G_actMsg)) {
		var url = "/sys/sysMngCode/delOrgCode.ajax";
		var jsonData = {
				"ORGA_SEQ" : seq,
				"LVL" : lvl,
				"P_SEQ" : pSeq,
				"ACTIVE_YN" : "Y"
			};
		Ajax.request(url, jsonData, fnDelCallback, "");	
	}
}

//fnDelCallback
function fnDelCallback(data) {
	if(data.MSG != "") {  
		Common.alert("success", data.MSG, "");
	}
 
	var start = Number(data.PARAM.LVL)+1;
	for(var i = start; i <= 3; i++) {
		$("#CODE_LEVEL"+[i]).html("");		
	}
 
	fnGetCodeList(data.PARAM.LVL, data.PARAM.P_SEQ);
}

 
function fnGoModify(seq) {
	var url = "/sys/sysMngCode/getOrgCodeDetail.ajax";
	var jsonData = {
			"ORGA_SEQ" : seq
		};
	Ajax.request(url, jsonData, fnDetailCallback, "");
}

//fnDetailCallback
function fnDetailCallback(data) {
	fnPopupDataSet(data);
}

 
function fnLp2Save(modeId) {
	var orgaNm = $("#LP2_ORGA_NM").val();
	var activeYn = $("input:radio[name=LP2_RADIO]:checked").val();
	var tpOrgaCd = $("input:radio[name=LP2_TP_RADIO]:checked").val();
 
	if(Common.isNull(orgaNm)) {
		Common.alert("warning", G_MSG1);
		return false;
	} else if(Common.isNull(activeYn)) {
		Common.alert("warning", G_MSG2);
		return false;
	}
	
	if(modeId == "reg") {
		var url = "/sys/sysMngCode/regOrgCode.ajax";
		//var form = Common.serialize($("#LP2_FORM"));
		var jsonData = {
				"ORGA_NM" : orgaNm,
				"LVL" : "1",
				"TP_ORGA_CD" : tpOrgaCd,
				"ACTIVE_YN" : activeYn
			};
	} else if(modeId == "mod") {
		var url = "/sys/sysMngCode/modOrgCode.ajax";
		var jsonData = {
				"ORGA_SEQ" : $("#LP2_ORGA_SEQ").val(),
				"ORGA_NM" : orgaNm,
				"LVL" : "1",
				"TP_ORGA_CD" : tpOrgaCd,
				"ACTIVE_YN" : activeYn
			};
	}
	Ajax.request(url, jsonData, fnSaveCallback, "");
}

 
function fnLp3Save(modeId) {
	//validation check
	var pSeq = $("#LP3_ORGA_LV1").val();
	var orgaNm = $("#LP3_ORGA_NM").val();
	var activeYn = $(":input:radio[name=LP3_RADIO]:checked").val();
	var ubigeoNo = $("#LP3_UBIGEO_LV3").val();
	if(Common.isNull(pSeq)) {
		Common.alert("warning", G_MSG1);
		return false;
	} else if(Common.isNull(orgaNm)) {
		//alert(G_MSG);
		Common.alert("warning", G_MSG4);
		return false;
	} else if(Common.isNull(ubigeoNo)) {
		//alert(G_MSG);
		Common.alert("warning", G_MSG5);
		return false;
	} else if(Common.isNull(activeYn)) {
		//alert(G_MSG);
		Common.alert("warning", G_MSG2);
		return false;
	}else if($("#LP3_EMAIL").val() != "") {
		var rtn = Valid.email($("#LP3_EMAIL").val());
		if(rtn==false) return false;
	}
	
	if(modeId == "reg") {
		var url = "/sys/sysMngCode/regOrgCode.ajax";
		var jsonData = {
				"ORGA_NM" : orgaNm,
				"LVL" : "2",
				"P_SEQ" : pSeq,
				"ACTIVE_YN" : activeYn,
				"UBIGEO_NO" : ubigeoNo,
				"DETAIL_ADDR_NM" : $("#LP3_DETAIL_ADDR_NM").val(),
				"RSPN_NM" : $("#LP3_RSPN_NM").val(),
				"TEL_NO1" : $("#LP3_TEL_NO1").val(),
				"TEL_NO2" : $("#LP3_TEL_NO2").val(),
				"EMAIL" : $("#LP3_EMAIL").val(),
				"WEB_URL" : $("#LP3_WEB_URL").val(),
				"ADMIN_NM" : $("#LP3_ADMIN_NM").val(),
				"OBSVT_CT" : $("#LP3_OBSVT_CT").val(),
				"LTTD" : $("#LP3_LTTD").val(),
				"LNGTD" : $("#LP3_LNGTD").val()
			};
	} else if(modeId == "mod") {
		var url = "/sys/sysMngCode/modOrgCode.ajax";
		var jsonData = {
				"ORGA_SEQ" : $("#LP3_ORGA_SEQ").val(),
				"ORGA_NM" : orgaNm,
				"LVL" : "2",
				"P_SEQ" : pSeq,
				"ACTIVE_YN" : activeYn,
				"UBIGEO_NO" : ubigeoNo,
				"DETAIL_ADDR_NM" : $("#LP3_DETAIL_ADDR_NM").val(),
				"RSPN_NM" : $("#LP3_RSPN_NM").val(),
				"TEL_NO1" : $("#LP3_TEL_NO1").val(),
				"TEL_NO2" : $("#LP3_TEL_NO2").val(),
				"EMAIL" : $("#LP3_EMAIL").val(),
				"WEB_URL" : $("#LP3_WEB_URL").val(),
				"ADMIN_NM" : $("#LP3_ADMIN_NM").val(),
				"OBSVT_CT" : $("#LP3_OBSVT_CT").val(),
				"LTTD" : $("#LP3_LTTD").val(),
				"LNGTD" : $("#LP3_LNGTD").val()
			};
	}
	
	Ajax.request(url, jsonData, fnSaveCallback, "");
	
}

 
function fnLp4Save(modeId) {
	//validation check
	var pSeq = $("#LP4_ORGA_LV2").val();
	var orgaNm = $("#LP4_ORGA_NM").val();
	var activeYn = $(":input:radio[name=LP4_RADIO]:checked").val();
	var ubigeoNo = $("#LP4_UBIGEO_LV3").val();
	if(Common.isNull(pSeq)) {
		Common.alert("warning", G_MSG7);
		return false;
	} else if(Common.isNull(orgaNm)) {
		//alert(G_MSG);
		Common.alert("warning", G_MSG6);
		return false;
	} else if(Common.isNull(ubigeoNo)) {
		//alert(G_MSG);
		Common.alert("warning", G_MSG5);
		return false;
	} else if(Common.isNull(activeYn)) {
		//alert(G_MSG);
		Common.alert("warning", G_MSG2);
		return false;
	}else if($("#LP4_EMAIL").val() != "") {
		var rtn = Valid.email($("#LP4_EMAIL").val());
		if(rtn==false) return false;
	}
	
	if(modeId == "reg") {
		var url = "/sys/sysMngCode/regOrgCode.ajax";
		var jsonData = {
				"ORGA_NM" : orgaNm,
				"LVL" : "3",
				"P_SEQ" : pSeq,
				"ACTIVE_YN" : activeYn,
				"UBIGEO_NO" : ubigeoNo,
				"DETAIL_ADDR_NM" : $("#LP4_DETAIL_ADDR_NM").val(),
				"RSPN_NM" : $("#LP4_RSPN_NM").val(),
				"TEL_NO1" : $("#LP4_TEL_NO1").val(),
				"TEL_NO2" : $("#LP4_TEL_NO2").val(),
				"EMAIL" : $("#LP4_EMAIL").val(),
				"WEB_URL" : $("#LP4_WEB_URL").val(),
				"ADMIN_NM" : $("#LP4_ADMIN_NM").val(),
				"OBSVT_CT" : $("#LP4_OBSVT_CT").val(),
				"LTTD" : $("#LP4_LTTD").val(),
				"LNGTD" : $("#LP4_LNGTD").val()
			};
	} else if(modeId == "mod") {
		var url = "/sys/sysMngCode/modOrgCode.ajax";
		var jsonData = {
				"ORGA_SEQ" : $("#LP4_ORGA_SEQ").val(),
				"ORGA_NM" : orgaNm,
				"LVL" : "3",
				"P_SEQ" : pSeq,
				"ACTIVE_YN" : activeYn,
				"UBIGEO_NO" : ubigeoNo,
				"DETAIL_ADDR_NM" : $("#LP4_DETAIL_ADDR_NM").val(),
				"RSPN_NM" : $("#LP4_RSPN_NM").val(),
				"TEL_NO1" : $("#LP4_TEL_NO1").val(),
				"TEL_NO2" : $("#LP4_TEL_NO2").val(),
				"EMAIL" : $("#LP4_EMAIL").val(),
				"WEB_URL" : $("#LP4_WEB_URL").val(),
				"ADMIN_NM" : $("#LP4_ADMIN_NM").val(),
				"OBSVT_CT" : $("#LP4_OBSVT_CT").val(),
				"LTTD" : $("#LP4_LTTD").val(),
				"LNGTD" : $("#LP4_LNGTD").val()
			};
	}
	
	Ajax.request(url, jsonData, fnSaveCallback, "");
	
}

//fnSaveCallback
function fnSaveCallback(data) {
	if(data.MSG != "") {  
		Common.alert("success", data.MSG, "");
	}
	$("#LP2_CANCEL").click();
 
	fnGetCodeList(data.PARAM.LVL, data.PARAM.P_SEQ);
}

// selectBox reset
function fnSBoxReset(targetArr) {
	//console.log("target::"+targetArr.length);
	if(targetArr.length > 0) {
		for(var i in targetArr) {
			//console.log(targetArr[i]);
			$("select[id="+targetArr[i]+"] option").remove();
			$("select[id="+targetArr[i]+"]").append("<option value=''>-- Seleccione --</option>");
			// selectBox disabled : false
			$("select[id="+targetArr[i]+"]").prop("disabled", false);
		}	
	}
}

// selectBox change event
function fnSelBoxChange(index, val, targetArr) {
	// selectBox reset
	fnSBoxReset(targetArr);	
	if(index == "UBIGEO_LV2") { //Provincia search
		Common.codeMaker(targetArr[0], "", {SQL_ID : "UBIGEO_LV2", LVL : "2", UBIGEO_NO : val});
	} else if(index == "UBIGEO_LV3") { //Distrito search
		Common.codeMaker(targetArr[0], "", {SQL_ID : "UBIGEO_LV3", LVL : "3", UBIGEO_NO : val});
	} else if(index == "ORGA_LV2") {
		Common.codeMaker(targetArr[0], "", {SQL_ID : "ORGA_LV2", LVL : "2", P_SEQ : val});
	}
}

/***********************************************************************************************
 ** $(document).ready()
 ***********************************************************************************************/
$(document).ready(function(){
 
	//Common.pageSize("PAGE_SIZE", "10");
	
 
	$("#LP2_SAVE").click(function() {
		var modeId = $("#LP2_MODE_ID").val();
		fnLp2Save(modeId);
	});
	
 
	$("#LP3_SAVE").click(function() {
		var modeId = $("#LP3_MODE_ID").val();
		fnLp3Save(modeId);
	});
	
 
	$("#LP4_SAVE").click(function() {
		var modeId = $("#LP4_MODE_ID").val();
		fnLp4Save(modeId);
	});
	
 
	$("#NEW_LVL1").click(function() {
		var param = {
			"MODE_ID" : "reg",
			"LVL" : "1",
			"TP_ORGA_CD" : "P",
			"ACTIVE_YN" : "Y"
		}
		fnPopupDataSet(param);
	});
	
 
	$("#NEW_LVL2").click(function() {
		var param = {
			"MODE_ID" : "reg",
			"LVL" : "2",
			"ACTIVE_YN" : "Y"
		}
		fnPopupDataSet(param);
	});
	
 
	$("#NEW_LVL3").click(function() {
		var param = {
			"MODE_ID" : "reg",
			"LVL" : "3",
			"ACTIVE_YN" : "Y"
		}
		fnPopupDataSet(param);
	});
	
});