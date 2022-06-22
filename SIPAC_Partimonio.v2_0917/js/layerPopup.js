/***********************************************************************************************
 ** Global Variable 
 ***********************************************************************************************/

var infoNoDataMsg = "No hay datos";


/***********************************************************************************************
 ** Function Declarations 
 ***********************************************************************************************/
//layer popup selectBox change event
function LayerSelBoxChange(index, val, targetArr) {
	// selectBox reset
	LayerSBoxReset(targetArr);
		
	if(index == "UBIGEO_LV2") { //Provincia search
		Common.codeMaker(targetArr[0], "", {SQL_ID : "UBIGEO_LV2", LVL : "2", UBIGEO_NO : val});
	} else if(index == "UBIGEO_LV3") { //Distrito search
		Common.codeMaker(targetArr[0], "", {SQL_ID : "UBIGEO_LV3", LVL : "3", UBIGEO_NO : val});
	} else if(index == "ORGA_LV2") {
		Common.codeMaker(targetArr[0], "", {SQL_ID : "ORGA_LV2", LVL : "2", P_SEQ : val});
	} else if(index=="t1classCd" && val != "") {
		var stdCd = $("#t1classCd").data("stdCd");
		//console.log("stdCd::"+stdCd);
		//Clasificación específica
		Common.codeMaker(targetArr[0], "", {SQL_ID : "STD_SUB_CODE_MAP", TP_CD : "MVB", STD_CD : stdCd, CLASS_CD : "005", P_CLASS_CD : val});
	}
	
}

//layer popup call data setting
function LayerPopupCall(param) {
    // show
	$(".modal").hide();
    $("#"+param.popupId).show();
    $("#"+param.popupId).layerCenter();
    
    if(param.popupId=="layerPopup1") {
    	
    } else if(param.popupId=="LAYER_POP2") {
		
	} else if(param.popupId=="LAYER_POP3") {
		
	} else if(param.popupId=="LAYER_POP4") {

	} else if(param.popupId=="LayerPmCodeSearch") { // PM SEARCH
		/** data reset **/
		$("input:checkbox[id='lpcsVerImagen']").prop("checked", false);
		$("#lpcsSubTitle").text("");
		$("#lpcsCodeNm").val("");
		$("#lpcsCodeVal").val("");
		$("#lpcsImgShow").val("");
		$("#lpcsList").html(""); // list page
		$("#paging_LayerPmCodeSearch").html(""); // page bar
		$("select[id='lpcsListSize'] option").remove(); // selectBox 
		
		//page selectBox
		Common.pageSize("lpcsListSize", "10");
		// search data set
		$("#lpcsSubTitle").text(param.subTitle);
		$("#lpcsCodeNm").val(param.codeNm);
		$("#lpcsCodeVal").val(param.codeVal);
		$("#lpcsImgShow").val(param.imgShow);
		var url = "/pm/pmMtnnTerms/getMvbCodeSearch.ajax";
		var form = Common.serialize($("#LPCS_FORM"));
		Ajax.request(url, form, LayerPmCodeSearchCallback, "", true);
		 
	} else if(param.popupId=="LayerPihCodeSearch") { // PIH SEARCH
		/** data reset **/
		$("input:checkbox[id='lpcsPihVerImagen']").prop("checked", false);
		$("#lpcsPihSubTitle").text("");
		$("#lpcsPihCodeNm").val("");
		$("#lpcsPihCodeVal").val("");
		$("#lpcsPihImgShow").val("");
		$("#lpcsPihList").html(""); // list page
		$("#paging_LayerPihCodeSearch").html(""); // page bar
		
		//page selectBox
		Common.pageSize("lpcsPihListSize", "10");
		// search data set
		$("#lpcsPihSubTitle").text(param.subTitle);
		$("#lpcsPihCodeNm").val(param.codeNm);
		$("#lpcsPihCodeVal").val(param.codeVal);
		$("#lpcsPihImgShow").val(param.imgShow);
		var url = "/pih/pihMtnnTerms/getHreCodeSearch.ajax";
		var form = Common.serialize($("#LPCS_PIH_FORM"));
		Ajax.request(url, form, LayerPihCodeSearchCallback, "");
		 
	} else if(param.popupId=="layerPopup7") {
		/** data reset **/
		$("#pageIndex_layerPopup7").val("");
		/** data set **/
		
		param.tpCd = param.tpCd || 'pm';
		$('#srchTpCd_layer7').val(param.tpCd);
		if(param.tpCd == 'pih'){
			var url = "/pih/pihRegInsFicha/getRegUserHistoryList.ajax";
			var jsonData = {
					"srchHreGenSeq" : param.srchHreGenSeq
				};
			$('#srchMvbGenSeq_layer7').val($('#mvbGenSeq').val());
			Ajax.request(url, jsonData, LayerPop7Callback, "");
		}else{
			var url = "/pm/pmRegInsFicha/getRegUserHistoryList.ajax";
			var jsonData = {
					"srchMvbGenSeq" : param.srchMvbGenSeq
				};
			$('#srchHreGenSeq_layer7').val($('#hreGenSeq').val());
			Ajax.request(url, jsonData, LayerPop7Callback, "");
		}
		
	} else if(param.popupId=="layerTemplate1") { //layerTemplate1
		/** data reset **/
		$("#t1modeId, #t1seq, #t1tpCd, #t1preCd, #t1lvl, #t1cdSpnNm, #t1defCt, #t1refBiblCt, #t1obsvtCt").val("");
		$("#t1title, #t1pNm, #t1stdNm, #t1apprDt").text("");
		$("input:radio[name='activeYn']").prop("checked", false);
		LayerSBoxReset(['t1classCd','t1classSpecCd','t1pCd','t1apctCd']);
		/** <tr> visible set **/
		if(param.TrClassCd=="hide") $("#T1TrClassCd").hide();
		if(param.TrClassSpecCd=="hide") $("#T1TrClassSpecCd").hide();
		if(param.TrPcd=="hide") $("#T1TrPcd").hide();
		if(param.TrCodeNm=="hide") $("#T1TrCodeNm").hide();
		if(param.TrDef=="hide") $("#T1TrDef").hide();
		if(param.TrRef=="hide") $("#T1TrRef").hide();
		if(param.TrObs=="hide") $("#T1TrObs").hide();
		if(param.TrEstado=="hide") $("#T1TrEstado").hide();
		if(param.TrSol=="hide") $("#T1TrSol").hide();
		if(param.TrFdv=="hide") $("#T1TrFdv").hide();
		/** data set **/
		$("#t1title").text(param.title);
		$("#t1pNm").text(param.pNm);
		$("#t1stdNm").text(param.stdNm);
		$("#t1modeId").val(param.modeId);
		$("#t1tpCd").val(param.tpCd);
		$("#t1preCd").val(param.stdCd);
		$("#t1lvl").val(param.lvl); 
		/** <tag> data-columns, data-stdCd set **/
		$("#t1classCd").data("stdCd", param.preClcd);
		$("#t1pCd").data("columns", param.pNm);
		$("#t1cdSpnNm").data("columns", param.stdNm);
		
		if(param.modeId == "reg") {
			$("#t1activeY").prop("checked", true);	// default Y select
			Common.codeMaker("t1apctCd", "", {SQL_ID : "SYS_USER"}); //Solicitante
			if(Common.isNotEmpty(param.pCd)) {
				Common.codeMaker("t1pCd", "", {SQL_ID : "STD_CODE_MAP", TP_CD : "MVB", LVL : "2", STD_CD : param.pCd}); // pCd	
			}
			if(Common.isNotEmpty(param.preClcd)) {
				Common.codeMaker("t1classCd", "", {SQL_ID : "STD_SUB_CODE_MAP", TP_CD : "MVB", STD_CD : param.preClcd, CLASS_CD : "004"}); //Clasificación
			}
		} else if(param.modeId == "mod") {
			// ajax call
			var url = "/pm/pmMtnnTerms/getStdCodeDetail.ajax";
			var jsonData = {
					"seq" : param.seq
				};
			Ajax.request(url, jsonData, function(result) {
				// ajax result
				$("#t1seq").val(result.seq);			//seq
				$("#t1cdSpnNm").val(result.cdSpnNm);	//cdSpnNm
				$("#t1defCt").val(result.defCt);		//Definición
				$("#t1refBiblCt").val(result.refBiblCt);//Referencia bibliográfica
				$("#t1obsvtCt").val(result.obsvtCt);	//Observación
				$("#t1apprDt").text(result.apprDt);		//Fecha de validación
				if(result.activeYn == "Y") $("#t1activeY").prop("checked", true); //Estado
				else $("#t1activeN").prop("checked", true);
				
				Common.codeMaker("t1apctCd", result.apctCd, {SQL_ID : "SYS_USER"}); //Solicitante
				if(Common.isNotEmpty(result.pCd)) {
					Common.codeMaker("t1pCd", result.pCd, {SQL_ID : "STD_CODE_MAP", TP_CD : "MVB", LVL : "2", STD_CD : param.pCd}); //pCd	
				}
				if(Common.isNotEmpty(result.classCd)) {
					Common.codeMaker("t1classCd", result.classCd, {SQL_ID : "STD_SUB_CODE_MAP", TP_CD : "MVB", STD_CD : param.preClcd, CLASS_CD : result.classCd}); //Clasificación
				}
				if(Common.isNotEmpty(result.classSpecCd)) {
					Common.codeMaker("t1classSpecCd", result.classSpecCd, {SQL_ID : "STD_SUB_CODE_MAP", TP_CD : "MVB", STD_CD : param.preClcd, CLASS_CD : result.classSpecCd, P_CLASS_CD : result.classCd}); //Clasificación específica
				}
				}, "");
			// selectBox disabled : true
			$("select[id='t1pCd']").prop("disabled", true); //pCd
			$("select[id='t1classCd']").prop("disabled", true); //Clasificación
			$("select[id='t1classSpecCd']").prop("disabled", true); //Clasificación específica
			
		}
		
	} else if(param.popupId=="LayerPersonaNatural") { //LayerPersonaNatural
		/** data reset **/
		
		/** data set **/
		//Common.codeMaker("LPNtpDocCd", "", {SQL_ID : "STD_CODE_MAP", TP_CD : "MVB", LVL : "2", STD_CD : "150"}); //Tipo Documento
	}
	
}

//layerPopup7 list
function LayerPop7Callback(data) {
	var data_list = data.LIST;
	var totalCnt = data.totalCnt;	// ALL COUNT
    var currPage = data.pageIndex;	// CUR PAGE
    var totalPage = 0;				// ALL PAGE
    var html = "";
    
    var length = data_list.length;	// LIST COUNT
    if(length > 0) {
    	for(var i = 0; i < length; i++) {
    		var row = data_list[i];
    		html += "<tr>";
    		html += "	<td>"+row.ROW_NUM+"</td>";
    		html += "	<td class=\"left\">"+(row.USER_NM==null?'':row.USER_NM)+"</td>";
    		html += "	<td class=\"w_120\">"+row.CREATE_DATE+"</td>";
    		html += "</tr>";
    	}
    } else {
    	html += "<tr id='noDataTR'><td colspan=\"3\"><div class='dataNone'><i>" + infoNoDataMsg + "</i></div></td></tr>";
    }
    
    $("#tbodyListGeneralHistorial").html(html);
    $("#pageIndex_layerPopup7").val(currPage);
    // layer popup paging
    Common.pageMaker4Popup("layerPopup7", totalCnt);
}

// PM CODE SEARCH LIST
function LayerPmCodeSearchCallback(data) {
	var data_list = data.LIST;
	var totalCnt = data.totalCnt;	// ALL COUNT
    var currPage = data.pageIndex;	// CUR PAGE
    var perPage = $("#lpcsListSize").val();	// Per Page COUNT
    var html = "";
    
	$("input:checkbox[id='lpcsAllChk']").prop("checked", false);
    $("#lpcsTotalCnt").text(totalCnt); // Resultado de búsqueda
    var imgShow = $("#lpcsImgShow").val();
    if(imgShow == "Y") {
		$("#lpcsImage1,#lpcsImage2").show();
	} else {
		$("#lpcsImage1,#lpcsImage2").hide();
	}
    
    var length = data_list.length;	// LIST COUNT
    if(length > 0) {
    	for(var i = 0; i < length; i++) {
    		var row = data_list[i];
    		var preRegNoTxt = row.PRE_REG_NO;
    		if(Common.isNull(preRegNoTxt) == false){
        		preRegNoTxt = Common.lpad(preRegNoTxt, 10, '0');
    		}
        	
    		var ntnlRegCdNoTxt = row.NTNL_REG_CD_NO;
        	if(Common.isNull(ntnlRegCdNoTxt) == false){
    			ntnlRegCdNoTxt = 'BC-INHIS-' + Common.lpad(ntnlRegCdNoTxt, 10, '0');
    		}
        	
        	var listTitle = "";
        	if(Common.isNull(row.DENOMI) == false && Common.isNull(row.TITLE) == false){
        		listTitle = row.TITLE + " / " + row.DENOMI;
        	}else if(Common.isNull(row.DENOMI) == true && Common.isNull(row.TITLE) == false){
        		listTitle = row.TITLE;
        	}else if(Common.isNull(row.DENOMI) == false && Common.isNull(row.TITLE) == true){
        		listTitle = row.DENOMI;
        	}
        	
    		html += "<tr>";
    		html += "	<td class=\"w_30\"><input type=\"checkbox\" name='lpcsChk' value='"+row.MVB_GEN_SEQ+"'></td>";
    		html += "	<td class=\"w_50\">"+row.ROW_NUM+"</td>";
    		if(imgShow == "Y") {
    			if(row.THUB1_PATH != "" && row.IMG_CHG_NM != "") {
    				var filePath = global.docBase+row.THUB1_PATH+"/"+row.IMG_CHG_NM;
    				html += "	<td class=\"w_112\">";
            		html += "		<b class=\"imgThum2\">";
            		html += "			<i><img src="+filePath+" width=\"70\" height=\"70\" border=\"0\" /></i>";
            		html += "		</b>";
            		html += "	</td>";
    			} else {
    				html += "	<td class=\"w_112\">";
            		html += "		<b class=\"imgThum2\">";
            		html += "			<i><img src='../../images/no_image.png' width=\"70\" height=\"70\" border=\"0\"></i>";
            		html += "		</b>";
            		html += "	</td>";	
    			}    			
    		}
    		html += "	<td class=\"w_100\">"+preRegNoTxt+"</td>";
    		html += "	<td class=\"w_100\">"+ntnlRegCdNoTxt+"</td>";
    		html += "	<td class=\"w_120\">"+row.CLASS_NM+"</td>";
    		html += "	<td class=\"w_120\">"+row.CLASS_SPEC_NM+"</td>";
    		html += "	<td class=\"w_170\">"+row.TP_GOODS_NM+"</td>";
    		html += "	<td>"+listTitle+"</td>";
    		html += "	<td class=\"w_100\">"+row.MATERIAL+"</td>";
    		html += "	<td class=\"w_80\">"+row.ESTADO+"</td>";
    		html += "	<td class=\"w_80\">";
    		html += "		<div class=\"dt-list-control\">";
    		
    		if(row.STATE_CD == "PMB010001") { // Borrador
    			html += "			<span onclick=\"LayerMvbSeqGeneral('"+row.MVB_GEN_SEQ+"');\" data-toggle='tooltip' data-placement='top' title='" + Layer_tooltipDetail + "'><i class=\"xi-search\"></i></span>";
    			html += "			<span onclick=\"LayerMvbSeqModify('"+row.MVB_GEN_SEQ+"');\" data-toggle='tooltip' data-placement='top' title='" + Layer_tooltipEdit + "'><i class=\"xi-pen\" ></i></span>";
    			html += "			<span onclick=\"LayerMvbSeqCopy('"+row.MVB_GEN_SEQ+"');\" data-toggle='tooltip' data-placement='top' title='" + Layer_tooltipCopy + "'><i class=\"xi-documents-o\" ></i></span>";
    			html += "			<span onclick=\"LayerMvbSeqDelete('"+row.MVB_GEN_SEQ+"');\" data-toggle='tooltip' data-placement='top' title='" + Layer_tooltipDelete + "'><i class=\"xi-trash\" ></i></span>";
    		} else if(row.STATE_CD == "PMB010002") { // Ingresado
    			html += "			<span onclick=\"LayerMvbSeqGeneral('"+row.MVB_GEN_SEQ+"');\" data-toggle='tooltip' data-placement='top' title='" + Layer_tooltipDetail + "'><i class=\"xi-search\"></i></span>";
        		html += "			<span onclick=\"LayerMvbSeqModify('"+row.MVB_GEN_SEQ+"');\" data-toggle='tooltip' data-placement='top' title='" + Layer_tooltipEdit + "'><i class=\"xi-pen\"></i></span>";
    		} else if(row.STATE_CD == "PMB010003") { // Modificado
    			html += "			<span onclick=\"LayerMvbSeqGeneral('"+row.MVB_GEN_SEQ+"');\" data-toggle='tooltip' data-placement='top' title='" + Layer_tooltipDetail + "'><i class=\"xi-search\"></i></span>";
        		html += "			<span onclick=\"LayerMvbSeqModify('"+row.MVB_GEN_SEQ+"');\" data-toggle='tooltip' data-placement='top' title='" + Layer_tooltipEdit + "'><i class=\"xi-pen\"></i></span>";
    		} else if(row.STATE_CD == "PMB010004") { // Observado
    			html += "			<span onclick=\"LayerMvbSeqGeneral('"+row.MVB_GEN_SEQ+"');\" data-toggle='tooltip' data-placement='top' title='" + Layer_tooltipDetail + "'><i class=\"xi-search\"></i></span>";
        		html += "			<span onclick=\"LayerMvbSeqModify('"+row.MVB_GEN_SEQ+"');\" data-toggle='tooltip' data-placement='top' title='" + Layer_tooltipEdit + "'><i class=\"xi-pen\"></i></span>";
        		html += "			<span onclick=\"LayerMvbSeqDelete('"+row.MVB_GEN_SEQ+"');\" data-toggle='tooltip' data-placement='top' title='" + Layer_tooltipDelete + "'><i class=\"xi-trash\"></i></span>";
    		} else if(row.STATE_CD == "PMB010005") { // Pre-ingresado
    			html += "			<span onclick=\"LayerMvbSeqGeneral('"+row.MVB_GEN_SEQ+"');\" data-toggle='tooltip' data-placement='top' title='" + Layer_tooltipDetail + "'><i class=\"xi-search\"></i></span>";
    		} else if(row.STATE_CD == "PMB010006") { // Registrado preliminar
    			html += "			<span onclick=\"LayerMvbSeqGeneral('"+row.MVB_GEN_SEQ+"');\" data-toggle='tooltip' data-placement='top' title='" + Layer_tooltipDetail + "'><i class=\"xi-search\"></i></span>";
    		} else if(row.STATE_CD == "PMB010007") { // Registrado
    			html += "			<span onclick=\"LayerMvbSeqGeneral('"+row.MVB_GEN_SEQ+"');\" data-toggle='tooltip' data-placement='top' title='" + Layer_tooltipDetail + "'><i class=\"xi-search\"></i></span>";
    		} else if(row.STATE_CD == "PMB010008") { // Desbloqueado
    			html += "			<span onclick=\"LayerMvbSeqGeneral('"+row.MVB_GEN_SEQ+"');\" data-toggle='tooltip' data-placement='top' title='" + Layer_tooltipDetail + "'><i class=\"xi-search\"></i></span>";
        		html += "			<span onclick=\"LayerMvbSeqModify('"+row.MVB_GEN_SEQ+"');\" data-toggle='tooltip' data-placement='top' title='" + Layer_tooltipEdit + "'><i class=\"xi-pen\"></i></span>";
    		} else if(row.STATE_CD == "PMB010010") { // Anulado
    			html += "			<span onclick=\"LayerMvbSeqGeneral('"+row.MVB_GEN_SEQ+"');\" data-toggle='tooltip' data-placement='top' title='" + Layer_tooltipDetail + "'><i class=\"xi-search\"></i></span>";
    		} else {
    			html += "			<span onclick=\"LayerMvbSeqGeneral('"+row.MVB_GEN_SEQ+"');\" data-toggle='tooltip' data-placement='top' title='" + Layer_tooltipDetail + "'><i class=\"xi-search\"></i></span>";
    		}
    		html += "		</div>";
    		html += "	</td>";
    		html += "</tr>";
    	}
    } else {
    	html += "<tr id='noDataTR' class='none_data_center none_data_center320'><td colspan=\"11\"><div class='dataNone2 h_320'><i>" + infoNoDataMsg + "</i></div></td></tr>";  
    }
    
    $("#lpcsList").html(html);
    $("#pageIndex_LayerPmCodeSearch").val(currPage);

    Common.pageMaker4Popup("LayerPmCodeSearch", totalCnt, perPage);
    
    $('[data-toggle="tooltip"]').tooltip();
}

//PIH CODE SEARCH POPUP LIST
function LayerPihCodeSearchCallback(data) {
	var data_list = data.LIST;
	var totalCnt = data.totalCnt;	// ALL COUNT
    var currPage = data.pageIndex;	// CUR PAGE
    var perPage = $("#lpcsPihListSize").val();	// Per Page COUNT
    var html = "";
    
	$("input:checkbox[id='lpcsPihAllChk']").prop("checked", false);
    $("#lpcsPihTotalCnt").text(totalCnt); // Resultado de búsqueda
    var imgShow = $("#lpcsPihImgShow").val();
    if(imgShow == "Y") {
		$("#lpcsPihImage1,#lpcsPihImage2").show();
	} else {
		$("#lpcsPihImage1,#lpcsPihImage2").hide();
	}
    
    var length = data_list.length;	// LIST COUNT
    if(length > 0) {
    	for(var i = 0; i < length; i++) {
    		var row = data_list[i];
    		var preRegNoTxt = row.PRE_REG_NO;
    		if(Common.isNull(preRegNoTxt) == false){
        		preRegNoTxt = Common.lpad(preRegNoTxt, 10, '0');
    		}
        	
    		var ntnlRegCdNoTxt = row.NTNL_REG_CD_NO;
        	if(Common.isNull(ntnlRegCdNoTxt) == false){
    			ntnlRegCdNoTxt = 'BC-INHIS-' + Common.lpad(ntnlRegCdNoTxt, 10, '0');
    		}
        	
    		html += "<tr>";
    		html += "	<td class=\"w_30\"><input type=\"checkbox\" name='lpcsPihChk' value='"+row.HRE_GEN_SEQ+"'></td>";
    		html += "	<td class=\"w_50\">"+row.ROW_NUM+"</td>";
    		if(imgShow == "Y") {
    			if(row.THUB1_PATH != "" && row.IMG_CHG_NM != "") {
    				var filePath = global.docBase+row.THUB1_PATH+"/"+row.IMG_CHG_NM;
    				html += "	<td class=\"w_112\">";
            		html += "		<b class=\"imgThum2\">";
            		html += "			<i><img src="+filePath+" width=\"70\" height=\"70\" border=\"0\" /></i>";
            		html += "		</b>";
            		html += "	</td>";
    			} else {
    				html += "	<td class=\"w_112\">";
            		html += "		<b class=\"imgThum2\">";
            		//html += "			<u><i class=\"xi-image-o\"></i>No image</u>";
            		html += "			<i><img src='../../images/no_image.png' width=\"70\" height=\"70\" border=\"0\"></i>";
            		html += "		</b>";
            		html += "	</td>";	
    			}    			
    		}
    		html += "	<td class=\"w_100\">"+preRegNoTxt+"</td>";
    		html += "	<td class=\"w_100\">"+ntnlRegCdNoTxt+"</td>";
    		html += "	<td class=\"w_120\">"+row.CLASS_NM+"</td>";
    		html += "	<td class=\"w_120\">"+row.CLASS_SPEC_NM+"</td>";
    		html += "	<td class=\"w_120\">"+row.NAME_SPN_NM+"</td>";
    		html += "	<td class=\"w_150\">"+row.UBIGEO_NM+"</td>";
    		html += "	<td>"+Common.convertPer(row.STR_ARR_ADDR_NM)+"</td>";
    		html += "	<td class=\"w_80\">"+row.ESTADO+"</td>";
    		html += "	<td class=\"w_80\">";
    		html += "		<div class=\"dt-list-control\">";
    		
    		if(row.STATE_CD == "PIH010001") { // Borrador
    			html += "			<span onclick=\"LayerHreSeqGeneral('"+row.HRE_GEN_SEQ+"');\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"" + Layer_tooltipDetail + "\"><i class=\"xi-search\"></i></span>";
    			html += "			<span onclick=\"LayerHreSeqModify('"+row.HRE_GEN_SEQ+"');\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"" + Layer_tooltipEdit + "\"><i class=\"xi-pen\" ></i></span>";
    			html += "			<span onclick=\"LayerHreSeqCopy('"+row.HRE_GEN_SEQ+"');\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"" + Layer_tooltipCopy + "\"><i class=\"xi-documents-o\" ></i></span>";
    			html += "			<span onclick=\"LayerHreSeqDelete('"+row.HRE_GEN_SEQ+"');\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"" + Layer_tooltipDelete + "\"><i class=\"xi-trash\" ></i></span>";
    		} else if(row.STATE_CD == "PIH010002") { // Ingresado
    			html += "			<span onclick=\"LayerHreSeqGeneral('"+row.HRE_GEN_SEQ+"');\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"" + Layer_tooltipDetail + "\"><i class=\"xi-search\"></i></span>";
        		html += "			<span onclick=\"LayerHreSeqModify('"+row.HRE_GEN_SEQ+"');\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"" + Layer_tooltipEdit + "\"><i class=\"xi-pen\"></i></span>";
    		} else if(row.STATE_CD == "PIH010003") { // Modificado
    			html += "			<span onclick=\"LayerHreSeqGeneral('"+row.HRE_GEN_SEQ+"');\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"" + Layer_tooltipDetail + "\"><i class=\"xi-search\"></i></span>";
        		html += "			<span onclick=\"LayerHreSeqModify('"+row.HRE_GEN_SEQ+"');\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"" + Layer_tooltipEdit + "\"><i class=\"xi-pen\"></i></span>";
    		} else if(row.STATE_CD == "PIH010004") { // Observado
    			html += "			<span onclick=\"LayerHreSeqGeneral('"+row.HRE_GEN_SEQ+"');\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"" + Layer_tooltipDetail + "\"><i class=\"xi-search\"></i></span>";
        		html += "			<span onclick=\"LayerHreSeqModify('"+row.HRE_GEN_SEQ+"');\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"" + Layer_tooltipEdit + "\"><i class=\"xi-pen\"></i></span>";
        		html += "			<span onclick=\"LayerHreSeqDelete('"+row.HRE_GEN_SEQ+"');\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"" + Layer_tooltipDelete + "\"><i class=\"xi-trash\"></i></span>";
    		} else if(row.STATE_CD == "PIH010005") { // Pre-ingresado
    			html += "			<span onclick=\"LayerHreSeqGeneral('"+row.HRE_GEN_SEQ+"');\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"" + Layer_tooltipDetail + "\"><i class=\"xi-search\"></i></span>";
    		} else if(row.STATE_CD == "PIH010006") { // Registrado preliminar
    			html += "			<span onclick=\"LayerHreSeqGeneral('"+row.HRE_GEN_SEQ+"');\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"" + Layer_tooltipDetail + "\"><i class=\"xi-search\"></i></span>";
    		} else if(row.STATE_CD == "PIH010007") { // Registrado
    			html += "			<span onclick=\"LayerHreSeqGeneral('"+row.HRE_GEN_SEQ+"');\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"" + Layer_tooltipDetail + "\"><i class=\"xi-search\"></i></span>";
    		} else if(row.STATE_CD == "PIH010008") { // Desbloqueado
    			html += "			<span onclick=\"LayerHreSeqGeneral('"+row.HRE_GEN_SEQ+"');\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"" + Layer_tooltipDetail + "\"><i class=\"xi-search\"></i></span>";
        		html += "			<span onclick=\"LayerHreSeqModify('"+row.HRE_GEN_SEQ+"');\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"" + Layer_tooltipEdit + "\"><i class=\"xi-pen\"></i></span>";
    		} else if(row.STATE_CD == "PIH010010") { // Anulado
    			html += "			<span onclick=\"LayerHreSeqGeneral('"+row.HRE_GEN_SEQ+"');\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"" + Layer_tooltipDetail + "\"><i class=\"xi-search\"></i></span>";
    		} else {
    			html += "			<span onclick=\"LayerHreSeqGeneral('"+row.HRE_GEN_SEQ+"');\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"" + Layer_tooltipDetail + "\"><i class=\"xi-search\"></i></span>";
    		}
    		html += "		</div>";
    		html += "	</td>";
    		html += "</tr>";
    	}
    } else {
    	html += "<tr id='noDataTR' class='none_data_center none_data_center320'><td colspan=\"11\"><div class='dataNone2 h_320'><i>" + infoNoDataMsg + "</i></div></td></tr>";  
    }
    
    $("#lpcsPihList").html(html);
    $("#pageIndex_LayerPihCodeSearch").val(currPage);
    
    Common.pageMaker4Popup("LayerPihCodeSearch", totalCnt, perPage);
}


function LayerGoToPage(pageNum, popupId) {
	//console.log("pageNum::"+pageNum+" | popupId::"+popupId);
	if(popupId == "layerPopup7") {
		$("#pageIndex_"+popupId).val(pageNum);
		
		var srchTpCd = $('#srchTpCd_layer7').val();
		
		var url = "";
		
		if(srchTpCd == 'pih'){
			url = "/pih/pihRegInsFicha/getRegUserHistoryList.ajax";
			$('#srchHreGenSeq_layer7').val($('#hreGenSeq').val());
		}else{
			url = "/pm/pmRegInsFicha/getRegUserHistoryList.ajax";
			$('#srchMvbGenSeq_layer7').val($('#mvbGenSeq').val());
		}
		
		var form = Common.serialize($("#lp7form"));
		Ajax.request(url, form, LayerPop7Callback, "");	
		
	} else if(popupId == "agregarPopup") {
		var url = '/pm/pmRegInsFicha/getHreGenList.ajax';
		$('#pageIndex_'+popupId).val(pageNum);
		var reqData = {
			'nameSpnNm' : $('#nameSpnNm').val(),
			'pageIndex' : pageNum
		};
		Ajax.request(url, reqData, searchAgregar, "");
		
	} else if(popupId == "LayerHistorico") {
		var url = '/pm/pmRegInsFicha/getHreGenList.ajax';
		$('#pageIndex_'+popupId).val(pageNum);
		var reqData = {
			'nameSpnNm' : $('#nameSpnNm').val(),
			'pageIndex' : pageNum
		};
		Ajax.request(url, reqData, fnLayerHistoricoList, "");
		
	} else if(popupId == "LayerMigHistorial") {
		var url = "/pm/pmRegMigration/getExcelHis.ajax";
		$("#pageIndex_"+popupId).val(pageNum);
		var form = Common.serialize($("#POPUP_FORM"));
		Ajax.request(url, form, fnLayerMigHistorialList, "");
		
	} else if(popupId == "LayerPmCodeSearch") {
		$("#pageIndex_"+popupId).val(pageNum);
		var url = "/pm/pmMtnnTerms/getMvbCodeSearch.ajax";
		var form = Common.serialize($("#LPCS_FORM"));
		Ajax.request(url, form, LayerPmCodeSearchCallback, "");
	
	} else if(popupId == "LayerPihCodeSearch") {
		$("#pageIndex_"+popupId).val(pageNum);
		var url = "/pih/pihMtnnTerms/getHreCodeSearch.ajax";
		var form = Common.serialize($("#LPCS_PIH_FORM"));
		Ajax.request(url, form, LayerPihCodeSearchCallback, "");
	
	} else if(popupId == "srchHistoricalPropertylayer") {
		$("#pageIndex_"+popupId).val(pageNum);
		fnChangeLayerList('srchHistoricalPropertylayer', $('#LAYER1_sbListSize').val(), pageNum);
	
	} else if(popupId == "srchLegalInfolayer") {
		$("#pageIndex_"+popupId).val(pageNum);
		fnChangeLayerList('srchLegalInfolayer', $('#LAYER2_sbListSize').val(), pageNum);
		
	} else if(popupId == "LayerExcelImage") {
		fnImagePopupShow(pageNum);
	}
	
}

// selectBox reset
function LayerSBoxReset(targetArr) {
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


function LayerPopupStdCodeSave(modeId, formId) {
	if(modeId == "reg") {
		var url = "/pm/pmMtnnTerms/regStdCode.ajax";
		var form = Common.serialize($("#"+formId));
		Ajax.request(url, form, fnPopupSaveCallback, "");
	} else if(modeId == "mod") {
		var url = "/pm/pmMtnnTerms/modStdCode.ajax"; 
		var form = Common.serialize($("#"+formId));
		Ajax.request(url, form, fnPopupSaveCallback, "");
	}
}


function LayerMvbSeqGeneral(mvbGenSeq) {
	var url    ="/pm/pmRegInsFicha/popupGeneralPage.do?mvbGenSeq="+mvbGenSeq;
	var title  = "GeneralPage";
	var status = "toolbar=no,directories=no,scrollbars=yes,resizable=no,status=no,menubar=no,width=1000, height=800";
	window.open(url, title, status);
}


function LayerMvbSeqModify(mvbGenSeq) {
	//console.log("LayerMvbSeqModify::"+mvbGenSeq);
	window.open('/pm/pmRegInsFicha/nuevaFicha.do?mvbGenSeq='+mvbGenSeq+'&srchMode=basic', '_blank');
}


function LayerMvbSeqCopy(mvbGenSeq) {
	if(confirm(Layer_copyMsg)) {
		var url = "/pm/pmRegInsFicha/copyMvbGenSeq.ajax";
		var reqData = {
				"I_MVB_GEN_SEQ" : mvbGenSeq
			};
		Ajax.request(url, reqData, LayerPmCodeSearchRefresh, "");	
	}
}


function LayerMvbSeqDelete(mvbGenSeq) {
	if(confirm(Layer_delMsg)) {
		var url = "/pm/pmRegInsFicha/delMvbGenSeq.ajax";
		var reqData = {
				"MVB_GEN_SEQ" : mvbGenSeq
			};
		Ajax.request(url, reqData, LayerPmCodeSearchRefresh, "");	
	}
}


function LayerPmCodeSearchRefresh(data) {
	if(data.RESULT=="OK") {
		Common.alert("success",data.MSG,"");
		$("#lpcsPageNum").val("");
		$("#pageIndex_LayerPmCodeSearch").val("1");
		var url = "/pm/pmMtnnTerms/getMvbCodeSearch.ajax";
		var form = Common.serialize($("#LPCS_FORM"));
		Ajax.request(url, form, LayerPmCodeSearchCallback, "");
	} else {
		Common.alert("warning",data.MSG,"");
	}
}


function LayerHreSeqGeneral(hreGenSeq) {
	var url    ="/pih/pihRegInsFicha/popupGeneralPage.do?hreGenSeq="+hreGenSeq;
	var title  = "GeneralPage";
	var status = "toolbar=no,directories=no,scrollbars=yes,resizable=no,status=no,menubar=no,width=1000, height=800";
	window.open(url, title, status);
}


function LayerHreSeqModify(hreGenSeq) {
	//console.log("LayerHreSeqModify::"+hreGenSeq);
	window.open('/pih/pihRegInsFicha/nuevaFicha.do?hreGenSeq='+hreGenSeq+'&srchMode=basic', '_blank');
}


function LayerHreSeqCopy(hreGenSeq) {
	if(confirm(Layer_copyMsg)) {
		var url = "/pih/pihRegInsFicha/copyHreGenSeq.ajax";
		var reqData = {
				"I_HRE_GEN_SEQ" : hreGenSeq
			};
		Ajax.request(url, reqData, LayerPihCodeSearchRefresh, "");	
	}
}


function LayerHreSeqDelete(hreGenSeq) {
	if(confirm(Layer_delMsg)) {
		var url = "/pih/pihRegInsFicha/delHreGenSeq.ajax";
		var reqData = {
				"HRE_GEN_SEQ" : hreGenSeq
			};
		Ajax.request(url, reqData, LayerPihCodeSearchRefresh, "");	
	}
}


function LayerPihCodeSearchRefresh(data) {
	if(data.RESULT=="OK") {
		Common.alert("success",data.MSG,"");
		$("#lpcsPihPageNum").val("");  
		$("#pageIndex_LayerPihCodeSearch").val("1");  
		var url = "/pih/pihMtnnTerms/getHreCodeSearch.ajax";
		var form = Common.serialize($("#LPCS_PIH_FORM"));
		Ajax.request(url, form, LayerPihCodeSearchCallback, "");
	} else {
		Common.alert("warning",data.MSG,"");
	}
}

/***********************************************************************************************
 ** $(document).ready()
 ***********************************************************************************************/
$(document).ready(function(){

	$(".popClose").click(function() {
		//console.log(this);
		$(".modal").hide();
	});
	

	$(document).keydown(function(event){
		if(event.keyCode == 13) { // enter key
			var objId = event.target.id;
			if(objId=="lpcsPageNum") {
				$("#lpcsMovePage").click();
			}
		}
	});
	
	/* layerTemplate1 save button click */
	$("#t1Save").click(function() {

		var valArr = ['t1classCd','t1classSpecCd','t1pCd','t1cdSpnNm','t1defCt','t1refBiblCt'];
		if(Valid.arrRequire(valArr)) {
			LayerPopupStdCodeSave($("#t1modeId").val(), "t1form");
		}	
	});
	

	$("#lpcsListSize").change(function() {
		$("#pageListSize_LayerPmCodeSearch").val($(this).val());
		$("#lpcsPageNum").val(""); 
		$("#pageIndex_LayerPmCodeSearch").val("1");
		var url = "/pm/pmMtnnTerms/getMvbCodeSearch.ajax";
		var form = Common.serialize($("#LPCS_FORM"));
		Ajax.request(url, form, LayerPmCodeSearchCallback, "");
	});
	

	$("#lpcsMovePage").click(function() {
		var pageNum = $("#lpcsPageNum").val();
		$("#pageIndex_LayerPmCodeSearch").val(pageNum);
		var url = "/pm/pmMtnnTerms/getMvbCodeSearch.ajax";
		var form = Common.serialize($("#LPCS_FORM"));
		Ajax.request(url, form, LayerPmCodeSearchCallback, "");
	});
	

	$("#lpcsVerImagen").click(function() {
		var isCheck = $("input:checkbox[id='lpcsVerImagen']").is(":checked");
		if(isCheck) {
			$("#lpcsImgShow").val("Y");
		} else {
			$("#lpcsImgShow").val("N");
		}
		var url = "/pm/pmMtnnTerms/getMvbCodeSearch.ajax";
		var form = Common.serialize($("#LPCS_FORM"));
		Ajax.request(url, form, LayerPmCodeSearchCallback, "");
	});
	

	$("#lpcsAllChk").click(function() {
		Common.checkAll("lpcsAllChk","lpcsChk");
	});
		

	$("#lpcsPDF").click(function() {
		/*
		alert("Property Code Search Popup PDF Downloader");
		var chkArr = [];
		$("input:checkbox[name='lpcsChk']:checked").each(function() {
			chkArr.push(this.value);
		});
		console.log(chkArr);
		*/
		Report1.request($("#layReportUrl").val(), "lpcsChk", "MVB", "FICHA", "N", $("#mvbFichaAdmYn").val());
	});
	

	$("#lpcsExcel").click(function() {

		var lpcsCols = "Nº,N° Pre-Inscripción,Código de Registro Nacional,Clasificación,Clasificación específica,Tipo de bien,Título / Denominación,Material,Estado";
		$("#lpcsCols").val(lpcsCols);
		$("#LPCS_FORM").attr("method", "post");
		$("#LPCS_FORM").attr("action", "/pm/pmMtnnTerms/getMvbCodeSearchExcel.do");
		$("#LPCS_FORM").submit();
	});
	

	$("#lpcsPihListSize").change(function() {
		$("#pageListSize_LayerPihCodeSearch").val($(this).val());
		$("#lpcsPihPageNum").val("");
		$("#pageIndex_LayerPihCodeSearch").val("1"); 
		var url = "/pih/pihMtnnTerms/getHreCodeSearch.ajax";
		var form = Common.serialize($("#LPCS_PIH_FORM"));
		Ajax.request(url, form, LayerPihCodeSearchCallback, "");
	});
	

	$("#lpcsPihMovePage").click(function() {
		var pageNum = $("#lpcsPihPageNum").val();
		$("#pageIndex_LayerPihCodeSearch").val(pageNum);
		var url = "/pih/pihMtnnTerms/getHreCodeSearch.ajax";
		var form = Common.serialize($("#LPCS_PIH_FORM"));
		Ajax.request(url, form, LayerPihCodeSearchCallback, "");
	});
	

	$("#lpcsPihVerImagen").click(function() {
		var isCheck = $("input:checkbox[id='lpcsPihVerImagen']").is(":checked");
		if(isCheck) {
			$("#lpcsPihImgShow").val("Y");
		} else {
			$("#lpcsPihImgShow").val("N");
		}
		var url = "/pih/pihMtnnTerms/getHreCodeSearch.ajax";
		var form = Common.serialize($("#LPCS_PIH_FORM"));
		Ajax.request(url, form, LayerPihCodeSearchCallback, "");
	});
	

	$("#lpcsPihAllChk").click(function() {
		Common.checkAll("lpcsPihAllChk","lpcsPihChk");
	});
		

	$("#lpcsPihPDF").click(function() {
		/*
		var chkArr = [];
		$("input:checkbox[name='lpcsPihChk']:checked").each(function() {
			chkArr.push(this.value);
		});
		*/
		Report1.request($("#layReportUrl").val(), "lpcsPihChk", "HRE", "FICHA", "N", "");
	});
	

	$("#lpcsPihExcel").click(function() {

		var lpcsPihCols = "Nº,N° Pre-Inscripción,Código de Registro Nacional,Clasificación,Clasificación específica,Nombre,Ubicación Politica,Direccion,Estado";
		$("#lpcsPihCols").val(lpcsPihCols);
		$("#LPCS_PIH_FORM").attr("method", "post");
		$("#LPCS_PIH_FORM").attr("action", "/pih/pihMtnnTerms/getHreCodeSearchExcel.do");
		$("#LPCS_PIH_FORM").submit();		
	});
});
