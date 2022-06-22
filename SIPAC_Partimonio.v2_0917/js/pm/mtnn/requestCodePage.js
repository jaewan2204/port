/***********************************************************************************************
 ** Global Variable 
 ***********************************************************************************************/
 var G_reqPCd = "";  

/***********************************************************************************************
 ** Function Declarations 
 ***********************************************************************************************/
 
//   Buscar : search
function fnSearch() {
	$("#pageListSize").val($("#sbListSize").val());
	$("#pageIndex").val("1");
	// form submit
	$("#SRCH_FORM").attr("method", "post");
	$("#SRCH_FORM").attr("action", GLO_PAGE_URL);
	$("#SRCH_FORM").submit();
}


function fnRegCode() {
 	/** data reset **/
	fnPopupDataReset();
	// popup show
	$(".modal").hide();
	$("#LayerRequestCode").show();
	$("#LayerRequestCode").layerCenter();
	/** data set **/
	$("#popupTitle").text("SOLICITUD DE TÉRMINOS"); // Title
	$("#LmodeId").val("reg"); // mode : reg or mod
	Common.codeMaker("LreqPCd", "", {SQL_ID : "PM_REQ_CODE"}); // Términos

}

 
function fnGoModify(seq,reqPCd) {
	/** data reset **/
	fnPopupDataReset();
	// popup show
	$(".modal").hide();
    $("#LayerRequestCode").show();
    $("#LayerRequestCode").layerCenter();
    /** data set **/
    $("#popupTitle").text("Modificar término solicitado");	// Title
	$("#LmodeId").val("mod"); // mode : reg or mod
	Common.codeMaker("LreqPCd", reqPCd, {SQL_ID : "PM_REQ_CODE"}); // Términos
	$("select[id='LreqPCd']").prop("disabled", true); // selectBox disabled : Términos
 
	G_reqPCd = reqPCd;
	// ajax call
	var url = "/pm/pmMtnnRequest/getCodeReqDetail.ajax";
	var jsonData = {
			"seq" : seq
		};
	Ajax.request(url, jsonData, fnPopupShow, "");
}

//popup show
function fnPopupShow(data) {
	//console.log(data);
	// data set
	$("#Lseq").val(data.seq); // seq
	$("#Ltitle").val(data.title); // title
	$("#Ldscpt").val(data.dscpt); // dscpt
	var title = $("#LreqPCd").children("option:selected").text();
 
	if(G_reqPCd=="006") { // Tipo de bien : STD
		$("#stdDiv1").show();
		$("#sf1_myCdNm").text(title); // my code
		$("#sf1_cdSpnNm").data("columns",title); // my code
		Common.codeMaker("sf1_classCd", data.classCd, {SQL_ID : "STD_SUB_CODE_MAP", TP_CD : "MVB", STD_CD : G_reqPCd, CLASS_CD : "004", ACTIVE_YN : "Y"}); //Clasificación
		Common.codeMaker("sf1_classSpecCd", data.classSpecCd, {SQL_ID : 'STD_SUB_CODE_MAP', TP_CD : "MVB", STD_CD : G_reqPCd, CLASS_CD : "005", P_CLASS_CD : data.classCd, ACTIVE_YN : "Y"}); //Clasificación específica
		$("#sf1_cdSpnNm").val(data.cdSpnNm);
		$("#sf1_defCt").val(data.defCt);
		$("#sf1_refBiblCt").val(data.refBiblCt);
		$("#sf1_obsvtCt").val(data.obsvtCt);
		
	} else if(G_reqPCd=="007") { // Reino : STD
		$("#stdDiv2").show();
		$("#sf2_myCdNm").text(title); // my code
		$("#sf2_cdSpnNm").data("columns",title); // my code
		$("#sf2_cdSpnNm").val(data.cdSpnNm);
		$("#sf2_defCt").val(data.defCt);
		$("#sf2_refBiblCt").val(data.refBiblCt);
		$("#sf2_obsvtCt").val(data.obsvtCt);
		
	} else if(G_reqPCd=="008") { // Phylum : STD
		$("#stdDiv3").show();
		$("#sf3_pCdNm").text("Reino"); // p code
		$("#sf3_pCd").data("columns","Reino"); // p code
		$("#sf3_myCdNm").text(title); // my code
		$("#sf3_cdSpnNm").data("columns",title); // my code
		Common.codeMaker("sf3_pCd", data.pCd, {SQL_ID : "STD_CODE_MAP", TP_CD : "MVB", LVL : "2", STD_CD : "007", ACTIVE_YN : "Y"}); // pCd : Reino
		$("#sf3_cdSpnNm").val(data.cdSpnNm);
		$("#sf3_defCt").val(data.defCt);
		$("#sf3_refBiblCt").val(data.refBiblCt);
		$("#sf3_obsvtCt").val(data.obsvtCt);
		
	} else if(G_reqPCd=="009") { // Denominación : STD
		$("#stdDiv4").show();
		$("#sf4_pCdNm").text("Tipo de bien"); // p code
		$("#sf4_pCd").data("columns","Tipo de bien"); // p code
		$("#sf4_myCdNm").text(title); // my code
		$("#sf4_cdSpnNm").data("columns",title); // my code
		Common.codeMaker("sf4_classCd", data.classCd, {SQL_ID : "STD_SUB_CODE_MAP", TP_CD : "MVB", STD_CD : G_reqPCd, CLASS_CD : "004", ACTIVE_YN : "Y"}); //Clasificación
		Common.codeMaker("sf4_classSpecCd", data.classSpecCd, {SQL_ID : 'STD_SUB_CODE_MAP', TP_CD : "MVB", STD_CD : G_reqPCd, CLASS_CD : "005", P_CLASS_CD : data.classCd, ACTIVE_YN : "Y"}); //Clasificación específica
		if(data.classSpecCd == "00500001") { // Paleontológico
			$("#sf4_pCd").val("");
			$("#tr_sf4_pCd").hide();
		} else {
			$("#tr_sf4_pCd").show();
			Common.codeMaker("sf4_pCd", data.pCd, {SQL_ID : "STD_CODE_MAP", TP_CD : "MVB", LVL : "2", STD_CD : "006", CLASS_SPEC_CD : data.classSpecCd, ACTIVE_YN : "Y"}); // pCd : Tipo de bien	
		}
		$("#sf4_cdSpnNm").val(data.cdSpnNm);
		$("#sf4_defCt").val(data.defCt);
		$("#sf4_refBiblCt").val(data.refBiblCt);
		$("#sf4_obsvtCt").val(data.obsvtCt);
		
	} else if(G_reqPCd=="013") { // Lugar de elaboración(manufactura) : STD
		$("#stdDiv5").show();
		$("#tr_sf5_defCt,#tr_sf5_refBiblCt").hide();
		$("#sf5_myCdNm").text(title); // my code
		$("#sf5_cdSpnNm").data("columns",title); // my code
		Common.codeMaker("sf5_classCd", data.classCd, {SQL_ID : "STD_SUB_CODE_MAP", TP_CD : "MVB", STD_CD : G_reqPCd, CLASS_CD : "004", ACTIVE_YN : "Y"}); //Clasificación
		Common.codeMaker("sf5_classSpecCd", data.classSpecCd, {SQL_ID : 'STD_SUB_CODE_MAP', TP_CD : "MVB", STD_CD : G_reqPCd, CLASS_CD : "005", P_CLASS_CD : data.classCd, ACTIVE_YN : "Y"}); //Clasificación específica
		$("#sf5_cdSpnNm").val(data.cdSpnNm);
		$("#sf5_obsvtCt").val(data.obsvtCt);
		
	} else if(G_reqPCd=="016" || G_reqPCd=="017") { // Autoría, Fabricante / Taller : AUTH
		$("#authDiv1").show();
		if(G_reqPCd=="016") {
			$("#tr_af1_authPCd").show();
			Common.codeMaker("af1_authPCd", data.authPCd, {SQL_ID : "STD_CODE_MAP", TP_CD : "MVB", LVL : "2", STD_CD : "015", ACTIVE_YN : "Y"}); // pCd : Autoría
		} else {
			$("#af1_authPCd").val("");
			$("#tr_af1_authPCd").hide();
		}
		$("#af1_authCdSpnNm").val(data.authCdSpnNm); // Nombre
		if(data.authTpAuthYn == "Y") $("#af1_check").prop("checked", true); //checkbox
		else $("#af1_check").prop("checked", false);
		$("#af1_authBriefRefCt").val(data.authBriefRefCt); // Breve referencia
		$("#af1_authBiblioRefCt").val(data.authBiblioRefCt); // Referencia bibliografica
		$("#af1_authObsvtCt").val(data.authObsvtCt); // Observación
		// image1
		if(Common.isNotEmpty(data.authImg1OrgNm)) {
			$("#uploadfileDel1").show();
			$("#uploadfileNm1").text(data.authImg1OrgNm);		//file data
			$("#img1Path").val(data.authImg1Path);				//file data
			$("#img1OrgNm").val(data.authImg1OrgNm);			//file data
			$("#img1ChgNm").val(data.authImg1ChgNm);			//file data
			$("#thub1Path").val(data.authThub1Path);			//file data
			$("#file1Size").val(data.authFile1Size);			//file data
		} 
		// image2
		if(Common.isNotEmpty(data.authImg2OrgNm)) {
			$("#uploadfileDel2").show();
			$("#uploadfileNm2").text(data.authImg2OrgNm);		//file data
			$("#img2Path").val(data.authImg2Path);				//file data
			$("#img2OrgNm").val(data.authImg2OrgNm);			//file data
			$("#img2ChgNm").val(data.authImg2ChgNm);			//file data
			$("#thub2Path").val(data.authThub2Path);			//file data
			$("#file2Size").val(data.authFile2Size);			//file data
		}
		
	} else if(G_reqPCd=="018") { // Etnia : STD
		$("#stdDiv10").show();
		//$("#tr_sf2_refBiblCt").hide();
		$("#sf10_myCdNm").text(title); // my code
		$("#sf10_cdSpnNm").data("columns",title); // my code
		Common.codeMaker("sf10_classCd", data.classCd, {SQL_ID : "STD_SUB_CODE_MAP", TP_CD : "MVB", STD_CD : G_reqPCd, CLASS_CD : "004", ACTIVE_YN : "Y"}); //Clasificación
		Common.codeMaker("sf10_classSpecCd", data.classSpecCd, {SQL_ID : 'STD_SUB_CODE_MAP', TP_CD : "MVB", STD_CD : G_reqPCd, CLASS_CD : "005", P_CLASS_CD : data.classCd, ACTIVE_YN : "Y"}); //Clasificación específica
		Common.codeMaker("sf10_ref1Cd", data.ref1Cd, {SQL_ID : "STD_CODE_MAP", TP_CD : "MVB", LVL : "2", STD_CD : "013", CLASS_SPEC_CD : data.classSpecCd, ACTIVE_YN : "Y"}); // refCd : Lugar de elaboración(manufactura)
		$("#sf10_cdSpnNm").val(data.cdSpnNm);
		$("#sf10_defCt").val(data.defCt);
		$("#sf10_obsvtCt").val(data.obsvtCt);
		
	} else if(G_reqPCd=="019") { // Cultura : STD
		$("#stdDiv2").show();
		$("#sf2_myCdNm").text(title); // my code
		$("#sf2_cdSpnNm").data("columns",title); // my code
		$("#sf2_cdSpnNm").val(data.cdSpnNm);
		$("#sf2_defCt").val(data.defCt);
		$("#sf2_refBiblCt").val(data.refBiblCt);
		$("#sf2_obsvtCt").val(data.obsvtCt);
		
	} else if(G_reqPCd=="021") { // Estilo : STD
		$("#stdDiv5").show();
		$("#sf5_myCdNm").text(title); // my code
		$("#sf5_cdSpnNm").data("columns",title); // my code
		Common.codeMaker("sf5_classCd", data.classCd, {SQL_ID : "STD_SUB_CODE_MAP", TP_CD : "MVB", STD_CD : G_reqPCd, CLASS_CD : "004", ACTIVE_YN : "Y"}); //Clasificación
		Common.codeMaker("sf5_classSpecCd", data.classSpecCd, {SQL_ID : 'STD_SUB_CODE_MAP', TP_CD : "MVB", STD_CD : G_reqPCd, CLASS_CD : "005", P_CLASS_CD : data.classCd, ACTIVE_YN : "Y"}); //Clasificación específica
		$("#sf5_cdSpnNm").val(data.cdSpnNm);
		$("#sf5_defCt").val(data.defCt);
		$("#sf5_refBiblCt").val(data.refBiblCt);
		$("#sf5_obsvtCt").val(data.obsvtCt);
		
	} else if(G_reqPCd=="022") { // Cronología(Era geológica) : STD
		$("#stdDiv2").show();
		$("#sf2_myCdNm").text(title); // my code
		$("#sf2_cdSpnNm").data("columns",title); // my code
		$("#sf2_cdSpnNm").val(data.cdSpnNm);
		$("#sf2_defCt").val(data.defCt);
		$("#sf2_refBiblCt").val(data.refBiblCt);
		$("#sf2_obsvtCt").val(data.obsvtCt);
		
	} else if(G_reqPCd=="023") { // Cronología(Periodo) : STD
		$("#stdDiv3").show();
		$("#sf3_pCdNm").text("Era geológica"); // p code
		$("#sf3_pCd").data("columns","Era geológica"); // p code
		$("#sf3_myCdNm").text(title); // my code
		$("#sf3_cdSpnNm").data("columns",title); // my code
		Common.codeMaker("sf3_pCd", data.pCd, {SQL_ID : "STD_CODE_MAP", TP_CD : "MVB", LVL : "2", STD_CD : "022", ACTIVE_YN : "Y"}); // pCd : Era geológica
		$("#sf3_cdSpnNm").val(data.cdSpnNm);
		$("#sf3_defCt").val(data.defCt);
		$("#sf3_refBiblCt").val(data.refBiblCt);
		$("#sf3_obsvtCt").val(data.obsvtCt);
		
	} else if(G_reqPCd=="024") { // Periodo : STD
		$("#stdDiv2").show();
		$("#sf2_myCdNm").text(title); // my code
		$("#sf2_cdSpnNm").data("columns",title); // my code
		$("#sf2_cdSpnNm").val(data.cdSpnNm);
		$("#sf2_defCt").val(data.defCt);
		$("#sf2_refBiblCt").val(data.refBiblCt);
		$("#sf2_obsvtCt").val(data.obsvtCt);
		
	} else if(G_reqPCd=="027") { // Material (s) : STD
		$("#stdDiv5").show();
		$("#sf5_myCdNm").text(title); // my code
		$("#sf5_cdSpnNm").data("columns",title); // my code
		Common.codeMaker("sf5_classCd", data.classCd, {SQL_ID : "STD_SUB_CODE_MAP", TP_CD : "MVB", STD_CD : G_reqPCd, CLASS_CD : "004", ACTIVE_YN : "Y"}); //Clasificación
		Common.codeMaker("sf5_classSpecCd", data.classSpecCd, {SQL_ID : 'STD_SUB_CODE_MAP', TP_CD : "MVB", STD_CD : G_reqPCd, CLASS_CD : "005", P_CLASS_CD : data.classCd, ACTIVE_YN : "Y"}); //Clasificación específica
		$("#sf5_cdSpnNm").val(data.cdSpnNm);
		$("#sf5_defCt").val(data.defCt);
		$("#sf5_refBiblCt").val(data.refBiblCt);
		$("#sf5_obsvtCt").val(data.obsvtCt);
		
	} else if(G_reqPCd=="028") { // Tipo de material : STD
		$("#stdDiv3").show();
		$("#tr_sf3_classCd").show();
		$("#tr_sf3_classCd").show();
		Common.codeMaker("sf3_classCd", data.classCd, {SQL_ID : "STD_SUB_CODE_MAP", TP_CD : "MVB", STD_CD : G_reqPCd, CLASS_CD : "004", ACTIVE_YN : "Y"}); //Clasificación
		Common.codeMaker("sf3_classSpecCd", data.classSpecCd, {SQL_ID : 'STD_SUB_CODE_MAP', TP_CD : "MVB", STD_CD : G_reqPCd, CLASS_CD : "005", P_CLASS_CD : data.classCd, ACTIVE_YN : "Y"}); //Clasificación específica
		$("#sf3_pCdNm").text("Material"); // p code
		$("#sf3_pCd").data("columns","Material"); // p code
		$("#sf3_myCdNm").text(title); // my code
		$("#sf3_cdSpnNm").data("columns",title); // my code
		Common.codeMaker("sf3_pCd", data.pCd, {SQL_ID : "STD_CODE_MAP", TP_CD : "MVB", LVL : "2", STD_CD : "027", ACTIVE_YN : "Y"}); // pCd : Material
		$("#sf3_cdSpnNm").val(data.cdSpnNm);
		$("#sf3_defCt").val(data.defCt);
		$("#sf3_refBiblCt").val(data.refBiblCt);
		$("#sf3_obsvtCt").val(data.obsvtCt);
		
	} else if(G_reqPCd=="031") { // Técnicas : STD
		$("#stdDiv6").show(); 
		Common.codeMaker("sf6_classCd", data.classCd, {SQL_ID : "STD_SUB_CODE_MAP", TP_CD : "MVB", STD_CD : G_reqPCd, CLASS_CD : "004", ACTIVE_YN : "Y"}); //Clasificación
		Common.codeMaker("sf6_classSpecCd", data.classSpecCd, {SQL_ID : 'STD_SUB_CODE_MAP', TP_CD : "MVB", STD_CD : G_reqPCd, CLASS_CD : "005", P_CLASS_CD : data.classCd, ACTIVE_YN : "Y"}); //Clasificación específica
		Common.codeMaker("sf6_pCd", data.pCd, {SQL_ID : "STD_CODE_MAP", TP_CD : "MVB", LVL : "2", STD_CD : "027", CLASS_SPEC_CD : data.classSpecCd, ACTIVE_YN : "Y"}); // pCd : Material
		Common.codeMaker("sf6_ref1Cd", data.ref1Cd, {SQL_ID : "STD_CODE_MAP", TP_CD : "MVB", LVL : "2", STD_CD : "029", ACTIVE_YN : "Y"}); // refCd : Tipo de técnicas
		$("#sf6_cdSpnNm").val(data.cdSpnNm);
		$("#sf6_defCt").val(data.defCt);
		$("#sf6_refBiblCt").val(data.refBiblCt);
		$("#sf6_obsvtCt").val(data.obsvtCt);
		
	} else if(G_reqPCd=="032") { // Tipo de fosilización : STD
		$("#stdDiv2").show();
		$("#sf2_myCdNm").text(title); // my code
		$("#sf2_cdSpnNm").data("columns",title); // my code
		$("#sf2_cdSpnNm").val(data.cdSpnNm);
		$("#sf2_defCt").val(data.defCt);
		$("#sf2_refBiblCt").val(data.refBiblCt);
		$("#sf2_obsvtCt").val(data.obsvtCt);
		
	} else if(G_reqPCd=="043") { // Patrimonio inmaterial asociado : STD
		$("#stdDiv9").show(); 
		$("#sf9_cdSpnNm").val(data.cdSpnNm);
		$("#sf9_defCt").val(data.defCt);
		$("#sf9_obsvtCt").val(data.obsvtCt);
		
	} else if(G_reqPCd=="061") { // Integridad : STD
		$("#stdDiv2").show();
		$("#sf2_myCdNm").text(title); // my code
		$("#sf2_cdSpnNm").data("columns",title); // my code
		$("#sf2_cdSpnNm").val(data.cdSpnNm);
		$("#sf2_defCt").val(data.defCt);
		$("#sf2_refBiblCt").val(data.refBiblCt);
		$("#sf2_obsvtCt").val(data.obsvtCt);
		
	} else if(G_reqPCd=="062") { // Conservación : STD
		$("#stdDiv2").show();
		$("#sf2_myCdNm").text(title); // my code
		$("#sf2_cdSpnNm").data("columns",title); // my code
		$("#sf2_cdSpnNm").val(data.cdSpnNm);
		$("#sf2_defCt").val(data.defCt);
		$("#sf2_refBiblCt").val(data.refBiblCt);
		$("#sf2_obsvtCt").val(data.obsvtCt);
		
	} else if(G_reqPCd=="069") { // Clasificación de procedencia : STD
		$("#stdDiv3").show();
		$("#sf3_pCdNm").text("Tipo de Procedencia"); // p code
		$("#sf3_pCd").data("columns","Tipo de Procedencia"); // p code
		$("#sf3_myCdNm").text(title); // my code
		$("#sf3_cdSpnNm").data("columns",title); // my code
		Common.codeMaker("sf3_pCd", data.pCd, {SQL_ID : "STD_CODE_MAP", TP_CD : "MVB", LVL : "2", STD_CD : "068", ACTIVE_YN : "Y"}); // pCd : Tipo de Procedencia
		$("#sf3_cdSpnNm").val(data.cdSpnNm);
		$("#sf3_defCt").val(data.defCt);
		$("#sf3_refBiblCt").val(data.refBiblCt);
		$("#sf3_obsvtCt").val(data.obsvtCt);
		
	} else if(G_reqPCd=="070") { // Inmueble Paleontológico : STD
		$("#stdDiv7").show(); 
		$("#sf7_gpCd").val("06800002");
		Common.codeMaker("sf7_pCd", data.pCd, {SQL_ID : "STD_CODE_MAP", TP_CD : "MVB", LVL : "2", STD_CD : "069", P_CD : "06800002", ACTIVE_YN : "Y"}); // pCd : Clasificación
		Common.codeMaker("sf7_ref1Cd", data.ref1Cd, {SQL_ID : "STD_CODE_MAP", TP_CD : "MVB", LVL : "2", STD_CD : "137", ACTIVE_YN : "Y"}); // refCd : Tipo de Denominación
		var ubigeoLv3 = data.ref2Cd;
		var ubigeoLv1 = ubigeoLv3.substring(0,2)+"0000";
		var ubigeoLv2 = ubigeoLv3.substring(0,4)+"00";
	    Common.codeMaker("sf7_ubigeoLv1", ubigeoLv1, {SQL_ID : "UBIGEO_LV1", LVL : "1", ACTIVE_YN : "Y"}); // Departamento
	    Common.codeMaker("sf7_ubigeoLv2", ubigeoLv2, {SQL_ID : "UBIGEO_LV2", LVL : "2", UBIGEO_NO : ubigeoLv1, ACTIVE_YN : "Y"}); // Provincia
	    Common.codeMaker("sf7_ubigeoLv3", ubigeoLv3, {SQL_ID : "UBIGEO_LV3", LVL : "3", UBIGEO_NO : ubigeoLv2, ACTIVE_YN : "Y"}); // Distrito
	    $("#sf7_cdSpnNm").val(data.cdSpnNm);
		$("#sf7_obsvtCt").val(data.obsvtCt);
		
	} else if(G_reqPCd=="071") { // Inmueble Prehispánico : STD
		$("#stdDiv7").show(); 
		$("#sf7_gpCd").val("06800003");
		$("#tr_sf7_ref1Cd").hide();
		Common.codeMaker("sf7_pCd", data.pCd, {SQL_ID : "STD_CODE_MAP", TP_CD : "MVB", LVL : "2", STD_CD : "069", P_CD : "06800003", ACTIVE_YN : "Y"}); // pCd : Clasificación
		var ubigeoLv3 = data.ref2Cd;
		var ubigeoLv1 = ubigeoLv3.substring(0,2)+"0000";
		var ubigeoLv2 = ubigeoLv3.substring(0,4)+"00";
	    Common.codeMaker("sf7_ubigeoLv1", ubigeoLv1, {SQL_ID : "UBIGEO_LV1", LVL : "1", ACTIVE_YN : "Y"}); // Departamento
	    Common.codeMaker("sf7_ubigeoLv2", ubigeoLv2, {SQL_ID : "UBIGEO_LV2", LVL : "2", UBIGEO_NO : ubigeoLv1, ACTIVE_YN : "Y"}); // Provincia
	    Common.codeMaker("sf7_ubigeoLv3", ubigeoLv3, {SQL_ID : "UBIGEO_LV3", LVL : "3", UBIGEO_NO : ubigeoLv2, ACTIVE_YN : "Y"}); // Distrito
	    $("#sf7_cdSpnNm").val(data.cdSpnNm);
		$("#sf7_obsvtCt").val(data.obsvtCt);

	} else if(G_reqPCd=="072") { // Otros Inmuebles : STD
		$("#stdDiv7").show(); 
		$("#sf7_gpCd").val("06800004");
		$("#tr_sf7_ref1Cd").hide();
		Common.codeMaker("sf7_pCd", data.pCd, {SQL_ID : "STD_CODE_MAP", TP_CD : "MVB", LVL : "2", STD_CD : "069", P_CD : "06800004", ACTIVE_YN : "Y"}); // pCd : Clasificación
		var ubigeoLv3 = data.ref2Cd;
		var ubigeoLv1 = ubigeoLv3.substring(0,2)+"0000";
		var ubigeoLv2 = ubigeoLv3.substring(0,4)+"00";
	    Common.codeMaker("sf7_ubigeoLv1", ubigeoLv1, {SQL_ID : "UBIGEO_LV1", LVL : "1", ACTIVE_YN : "Y"}); // Departamento
	    Common.codeMaker("sf7_ubigeoLv2", ubigeoLv2, {SQL_ID : "UBIGEO_LV2", LVL : "2", UBIGEO_NO : ubigeoLv1, ACTIVE_YN : "Y"}); // Provincia
	    Common.codeMaker("sf7_ubigeoLv3", ubigeoLv3, {SQL_ID : "UBIGEO_LV3", LVL : "3", UBIGEO_NO : ubigeoLv2, ACTIVE_YN : "Y"}); // Distrito
	    $("#sf7_cdSpnNm").val(data.cdSpnNm);
		$("#sf7_obsvtCt").val(data.obsvtCt);
		
	} else if(G_reqPCd=="073") { // Área geográfica : STD
		$("#stdDiv2").show();
		$("#sf2_myCdNm").text(title); // my code
		$("#sf2_cdSpnNm").data("columns",title); // my code
		$("#sf2_cdSpnNm").val(data.cdSpnNm);
		$("#sf2_defCt").val(data.defCt);
		$("#sf2_refBiblCt").val(data.refBiblCt);
		$("#sf2_obsvtCt").val(data.obsvtCt);
		
	} else if(G_reqPCd=="074") { // Proyecto arqueológico : STD
		$("#stdDiv8").show(); 
		$("#sf8_cdSpnNm").val(data.cdSpnNm);
		$("#sf8_etcNm").val(data.etcNm);
		$("#sf8_defCt").val(data.defCt);
		$("#sf8_obsvtCt").val(data.obsvtCt);
		
	} else if(G_reqPCd=="077") { // Tipo de Localización : STD
		$("#stdDiv2").show();
		$("#tr_sf2_defCt,#tr_sf2_refBiblCt").hide();
		$("#sf2_myCdNm").text(title); // my code
		$("#sf2_cdSpnNm").data("columns",title); // my code
		$("#sf2_cdSpnNm").val(data.cdSpnNm);
		$("#sf2_obsvtCt").val(data.obsvtCt);
		
	} else if(G_reqPCd=="087") { // Forma de adquisición : STD
		$("#stdDiv2").show();
		$("#sf2_myCdNm").text(title); // my code
		$("#sf2_cdSpnNm").data("columns",title); // my code
		$("#sf2_cdSpnNm").val(data.cdSpnNm);
		$("#sf2_defCt").val(data.defCt);
		$("#sf2_refBiblCt").val(data.refBiblCt);
		$("#sf2_obsvtCt").val(data.obsvtCt);
		
	} else if(G_reqPCd=="136") { // Tipo de documento : STD
		$("#stdDiv2").show();
		$("#tr_sf2_defCt,#tr_sf2_refBiblCt").hide();
		$("#sf2_myCdNm").text(title); // my code
		$("#sf2_cdSpnNm").data("columns",title); // my code
		$("#sf2_cdSpnNm").val(data.cdSpnNm);
		$("#sf2_obsvtCt").val(data.obsvtCt);
		
	} else if(G_reqPCd=="08500001") { // Persona natural : OWN
		$("#ownDiv1").show(); 
		Common.codeMaker("of1_ownTpDocCd", data.ownTpDocCd, {SQL_ID : "STD_CODE_MAP", TP_CD : "MVB", LVL : "2", STD_CD : "150", ACTIVE_YN : "Y"}); // Tipo Documento
		$("#of1_ownTpDocCd").val(data.ownTpDocCd);
		$("#of1_ownDocNo").val(data.ownDocNo);
		$("#of1_ownPLastNm").val(data.ownPLastNm);
		$("#of1_ownMLastNm").val(data.ownMLastNm);
		$("#of1_ownName").val(data.ownName);
		$("#of1_ownGender").val(data.ownGender);
		$("#of1_ownBirthDt").val(data.ownBirthDt);
		
	} else if(G_reqPCd=="08500002") { // Persona jurídica : OWN
		$("#ownDiv2").show(); 
		Common.codeMaker("of2_ownTpDocCd", data.ownTpDocCd, {SQL_ID : "STD_CODE_MAP", TP_CD : "MVB", LVL : "2", STD_CD : "151", ACTIVE_YN : "Y"}); // Tipo Documento
		$("#of2_ownTpDocCd").val(data.ownTpDocCd);
		$("#of2_ownDocNo").val(data.ownDocNo);
		$("#of2_ownLegalNm").val(data.ownLegalNm);
		
	} else if(G_reqPCd=="1001") { // Custodio : CUSTO
		$("#custoDiv1").show(); 
		$("#cf1_custoCustoNm").val(data.custoCustoNm);
		
	} else if(G_reqPCd=="1002") { // Localización : LCT
		$("#lctDiv1").show(); 
		Common.codeMaker("lf1_lctTpLctCd", data.lctTpLctCd, {SQL_ID : "STD_CODE_MAP", TP_CD : "MVB", LVL : "2", STD_CD : "077", ACTIVE_YN : "Y"}); // Tipo de Localización
		Common.codeMaker("lf1_lctTpAdminCd", data.lctTpAdminCd, {SQL_ID : "STD_CODE_MAP", TP_CD : "MVB", LVL : "2", STD_CD : "154", ACTIVE_YN : "Y"}); // Tipo de administración
		var ubigeoLv3 = data.lctUbigeoNo;
		var ubigeoLv1 = ubigeoLv3.substring(0,2)+"0000";
		var ubigeoLv2 = ubigeoLv3.substring(0,4)+"00";
	    Common.codeMaker("lf1_ubigeoLv1", ubigeoLv1, {SQL_ID : "UBIGEO_LV1", LVL : "1", ACTIVE_YN : "Y"}); // Departamento
	    Common.codeMaker("lf1_ubigeoLv2", ubigeoLv2, {SQL_ID : "UBIGEO_LV2", LVL : "2", UBIGEO_NO : ubigeoLv1, ACTIVE_YN : "Y"}); // Provincia
	    Common.codeMaker("lf1_ubigeoLv3", ubigeoLv3, {SQL_ID : "UBIGEO_LV3", LVL : "3", UBIGEO_NO : ubigeoLv2, ACTIVE_YN : "Y"}); // Distrito
	    $("#lf1_lctLctNm").val(data.lctLctNm);
	    $("#lf1_lctDetailAddrNm").val(data.lctDetailAddrNm);
	    $("#lf1_lctHreSeqCt").val(data.lctHreSeqCt);
	    $("#lf1_lctLngtd").val(data.lctLngtd);
	    $("#lf1_lctLttd").val(data.lctLttd);
	    $("#lf1_lctHistRevCt").val(data.lctHistRevCt);
	    $("#lf1_lctObsvtCt").val(data.lctObsvtCt);
	    if(data.lctHreYn == "Y") { //radio
	    	$("#radioHreY").prop("checked", true);
	    	$("input:text[id='lf1_lctLngtd']").prop("disabled", true);	// Longitud
			$("input:text[id='lf1_lctLttd']").prop("disabled", true);	// Latitud
	    } else {
	    	$("#radioHreN").prop("checked", true);
	    	$("input:text[id='lf1_lctLngtd']").prop("disabled", false);	// Longitud
			$("input:text[id='lf1_lctLttd']").prop("disabled", false);	// Latitud
	    }
	    
	} else {
		return false;
	}
	
	$("#LayerRequestCode").layerCenter(); // popup center
}

 
function fnGoDetail(seq,reqPCd) {
	// popup show
	$(".modal").hide();
    $("#LayerRequestCodeDetail").show();
    $("#LayerRequestCode").layerCenter();
    /** data set **/
 
	G_reqPCd = reqPCd;
	// ajax call
	var url = "/pm/pmMtnnRequest/getCodeReqDetail.ajax";
	var jsonData = {
			"seq" : seq
		};
	Ajax.request(url, jsonData, fnDetailPopupShow, "");
}

function fnDetailPopupReset() {
	$("#stdDtl1,#stdDtl2,#stdDtl3,#stdDtl4,#stdDtl5,#stdDtl6,#stdDtl7,#stdDtl8,#stdDtl9,#authDtl1,#ownDtl1,#ownDtl2,#custoDtl1,#lctDtl1").hide();
	
}

//popup show
function fnDetailPopupShow(data) {
	// reset
	fnDetailPopupReset();
	// data set
	$("#DreqPNm").html(data.reqPNm); // Términos
	$("#Dtitle").html(data.title); // Nombre
	$("#Ddscpt").html(Common.convert(data.dscpt)); // Motivo
	$("#DapctNm").html(data.apctNm); // Solicitante
	$("#DinputDt").html(data.inputDt); // Fecha de validación
	
	var title = data.reqPNm;

	if(G_reqPCd=="006") { // Tipo de bien : STD
		$("#stdDtl1").show();
		$("#sd1_myCdNm").html(title); // my code
		$("#sd1_cdSpnNm").html(data.cdSpnNm);
		$("#sd1_classCd").html(data.classCdNm);
		$("#sd1_classSpecCd").html(data.classSpecCdNm);
		$("#sd1_defCt").html(Common.convert(data.defCt));
		$("#sd1_refBiblCt").html(Common.convert(data.refBiblCt));
		$("#sd1_obsvtCt").html(Common.convert(data.obsvtCt));
		
	} else if(G_reqPCd=="007") { // Reino : STD
		$("#stdDtl2").show();
		$("#sd2_myCdNm").html(title); // my code
		$("#sd2_cdSpnNm").html(data.cdSpnNm);
		$("#sd2_defCt").html(Common.convert(data.defCt));
		$("#sd2_refBiblCt").html(Common.convert(data.refBiblCt));
		$("#sd2_obsvtCt").html(Common.convert(data.obsvtCt));
		
	} else if(G_reqPCd=="008") { // Phylum : STD
		$("#stdDtl3").show();
		$("#sd3_pCdNm").html("Reino"); // p code
		$("#sd3_pCd").html(data.pCdNm); // p code
		$("#sd3_myCdNm").html(title); // my code
		$("#sd3_cdSpnNm").html(data.cdSpnNm); // my code
		$("#sd3_defCt").html(Common.convert(data.defCt));
		$("#sd3_refBiblCt").html(Common.convert(data.refBiblCt));
		$("#sd3_obsvtCt").html(Common.convert(data.obsvtCt));
		
	} else if(G_reqPCd=="009") { // Denominación : STD
		$("#stdDtl4").show();
		$("#sd4_classCd").html(data.classCdNm);
		$("#sd4_classSpecCd").html(data.classSpecCdNm);
		$("#sd4_pCdNm").html("Tipo de bien"); // p code
		if(data.classSpecCd == "00500001") { // Paleontológico
			$("#tr_sd4_pCd").hide();
			$("#sd4_pCd").html("");
		} else {
			$("#tr_sd4_pCd").show();
			$("#sd4_pCd").html(data.pCdNm);	
		}
		$("#sd4_myCdNm").html(title); // my code
		$("#sd4_cdSpnNm").html(data.cdSpnNm);
		$("#sd4_defCt").html(Common.convert(data.defCt));
		$("#sd4_refBiblCt").html(Common.convert(data.refBiblCt));
		$("#sd4_obsvtCt").html(Common.convert(data.obsvtCt));
		
	} else if(G_reqPCd=="013") { // Lugar de elaboración(manufactura) : STD
		$("#stdDtl5").show();
		$("#tr_sd5_defCt,#tr_sd5_refBiblCt").hide();
		$("#sd5_myCdNm").html(title); // my code
		$("#sd5_classCd").html(data.classCdNm);
		$("#sd5_classSpecCd").html(data.classSpecCdNm);
		$("#sd5_cdSpnNm").html(data.cdSpnNm);
		$("#sd5_defCt").html(Common.convert(data.defCt));
		$("#sd5_refBiblCt").html(Common.convert(data.refBiblCt));
		$("#sd5_obsvtCt").html(Common.convert(data.obsvtCt));
		
	} else if(G_reqPCd=="016" || G_reqPCd=="017") { // Autoría, Fabricante / Taller : AUTH
		$("#authDtl1").show();
		if(G_reqPCd=="016") {
			$("#tr_ad1_authPCd").show();
			$("#ad1_authPCd").html(data.authPCdNm);
		} else {
			$("#tr_ad1_authPCd").hide();
			$("#ad1_authPCd").html("");
		}
		$("#ad1_authCdSpnNm").html(data.authCdSpnNm); // Nombre
		if(data.authTpAuthYn == "Y") $("#ad1_check").prop("checked", true); //checkbox
		else $("#ad1_check").prop("checked", false);
		$("#ad1_authBriefRefCt").html(Common.convert(data.authBriefRefCt)); // Breve referencia
		$("#ad1_authBiblioRefCt").html(Common.convert(data.authBiblioRefCt)); // Referencia bibliografica
		$("#ad1_authObsvtCt").html(Common.convert(data.authObsvtCt)); // Observación
		// image1
		if(Common.isNotEmpty(data.authImg1OrgNm)) {
			$("#ad1_uploadfileNm1").text(data.authImg1OrgNm);		//file data
			$("#ad1_img1Path").val(data.authImg1Path);				//file data
			$("#ad1_img1OrgNm").val(data.authImg1OrgNm);			//file data
			$("#ad1_img1ChgNm").val(data.authImg1ChgNm);			//file data
			$("#ad1_thub1Path").val(data.authThub1Path);			//file data
			$("#ad1_file1Size").val(data.authFile1Size);			//file data
		} 
		// image2
		if(Common.isNotEmpty(data.authImg2OrgNm)) {
			$("#ad1_uploadfileNm2").text(data.authImg2OrgNm);		//file data
			$("#ad1_img2Path").val(data.authImg2Path);				//file data
			$("#ad1_img2OrgNm").val(data.authImg2OrgNm);			//file data
			$("#ad1_img2ChgNm").val(data.authImg2ChgNm);			//file data
			$("#ad1_thub2Path").val(data.authThub2Path);			//file data
			$("#ad1_file2Size").val(data.authFile2Size);			//file data
		}
		
	} else if(G_reqPCd=="018") { // Etnia : STD
		$("#stdDtl10").show();
		//$("#tr_sd2_refBiblCt").hide();
		$("#sd10_classCd").html(data.classCdNm);
		$("#sd10_classSpecCd").html(data.classSpecCdNm);
		$("#sd10_myCdNm").html(title); // my code
		$("#sd10_cdSpnNm").html(data.cdSpnNm);
		$("#sd10_ref1Cd").html(data.ref1CdNm);
		$("#sd10_defCt").html(Common.convert(data.defCt));
		$("#sd10_refBiblCt").html(Common.convert(data.refBiblCt));
		$("#sd10_obsvtCt").html(Common.convert(data.obsvtCt));
		
	} else if(G_reqPCd=="019") { // Cultura : STD
		$("#stdDtl2").show();
		$("#sd2_myCdNm").html(title); // my code
		$("#sd2_cdSpnNm").html(data.cdSpnNm);
		$("#sd2_defCt").html(Common.convert(data.defCt));
		$("#sd2_refBiblCt").html(Common.convert(data.refBiblCt));
		$("#sd2_obsvtCt").html(Common.convert(data.obsvtCt));
		
	} else if(G_reqPCd=="021") { // Estilo : STD		
		$("#stdDtl5").show();
		$("#sd5_myCdNm").html(title); // my code
		$("#sd5_classCd").html(data.classCdNm);
		$("#sd5_classSpecCd").html(data.classSpecCdNm);
		$("#sd5_cdSpnNm").html(data.cdSpnNm);
		$("#sd5_defCt").html(Common.convert(data.defCt));
		$("#sd5_refBiblCt").html(Common.convert(data.refBiblCt));
		$("#sd5_obsvtCt").html(Common.convert(data.obsvtCt));
		
	} else if(G_reqPCd=="022") { // Cronología(Era geológica) : STD
		$("#stdDtl2").show();
		$("#sd2_myCdNm").html(title); // my code
		$("#sd2_cdSpnNm").html(data.cdSpnNm);
		$("#sd2_defCt").html(Common.convert(data.defCt));
		$("#sd2_refBiblCt").html(Common.convert(data.refBiblCt));
		$("#sd2_obsvtCt").html(Common.convert(data.obsvtCt));
		
	} else if(G_reqPCd=="023") { // Cronología(Periodo) : STD		
		$("#stdDtl3").show();
		$("#sd3_pCdNm").html("Era geológica"); // p code
		$("#sd3_pCd").html(data.pCdNm); // p code
		$("#sd3_myCdNm").html(title); // my code
		$("#sd3_cdSpnNm").html(data.cdSpnNm); // my code
		$("#sd3_defCt").html(Common.convert(data.defCt));
		$("#sd3_refBiblCt").html(Common.convert(data.refBiblCt));
		$("#sd3_obsvtCt").html(Common.convert(data.obsvtCt));
		
	} else if(G_reqPCd=="024") { // Periodo : STD
		$("#stdDtl2").show();
		$("#sd2_myCdNm").html(title); // my code
		$("#sd2_cdSpnNm").html(data.cdSpnNm);
		$("#sd2_defCt").html(Common.convert(data.defCt));
		$("#sd2_refBiblCt").html(Common.convert(data.refBiblCt));
		$("#sd2_obsvtCt").html(Common.convert(data.obsvtCt));
		
	} else if(G_reqPCd=="027") { // Material (s) : STD
		$("#stdDtl5").show();
		$("#sd5_myCdNm").html(title); // my code
		$("#sd5_classCd").html(data.classCdNm);
		$("#sd5_classSpecCd").html(data.classSpecCdNm);
		$("#sd5_cdSpnNm").html(data.cdSpnNm);
		$("#sd5_defCt").html(Common.convert(data.defCt));
		$("#sd5_refBiblCt").html(Common.convert(data.refBiblCt));
		$("#sd5_obsvtCt").html(Common.convert(data.obsvtCt));
				
	} else if(G_reqPCd=="028") { // Tipo de material : STD
		$("#stdDtl3").show();
		$("#tr_sd3_classCd").show();
		$("#tr_sd3_classSpecCd").show();
		$("#sd3_classCd").html(data.classCdNm);
		$("#sd3_classSpecCd").html(data.classSpecCdNm);
		$("#sd3_pCdNm").html("Material"); // p code
		$("#sd3_pCd").html(data.pCdNm); // p code
		$("#sd3_myCdNm").html(title); // my code
		$("#sd3_cdSpnNm").html(data.cdSpnNm); // my code
		$("#sd3_defCt").html(Common.convert(data.defCt));
		$("#sd3_refBiblCt").html(Common.convert(data.refBiblCt));
		$("#sd3_obsvtCt").html(Common.convert(data.obsvtCt));
		
	} else if(G_reqPCd=="031") { // Técnicas : STD
		$("#stdDtl6").show(); 
		$("#sd6_classCd").html(data.classCdNm);
		$("#sd6_classSpecCd").html(data.classSpecCdNm);
		$("#sd6_pCd").html(data.pCdNm); // p code
		$("#sd6_ref1Cd").html(data.ref1CdNm); // ref code
		$("#sd6_cdSpnNm").html(data.cdSpnNm);
		$("#sd6_defCt").html(Common.convert(data.defCt));
		$("#sd6_refBiblCt").html(Common.convert(data.refBiblCt));
		$("#sd6_obsvtCt").html(Common.convert(data.obsvtCt));
		
	} else if(G_reqPCd=="032") { // Tipo de fosilización : STD
		$("#stdDtl2").show();
		$("#sd2_myCdNm").html(title); // my code
		$("#sd2_cdSpnNm").html(data.cdSpnNm);
		$("#sd2_defCt").html(Common.convert(data.defCt));
		$("#sd2_refBiblCt").html(Common.convert(data.refBiblCt));
		$("#sd2_obsvtCt").html(Common.convert(data.obsvtCt));
		
	} else if(G_reqPCd=="043") { // Patrimonio inmaterial asociado : STD
		$("#stdDtl9").show(); 
		$("#sd9_cdSpnNm").html(data.cdSpnNm);
		$("#sd9_defCt").html(Common.convert(data.defCt));
		$("#sd9_obsvtCt").html(Common.convert(data.obsvtCt));
		
	} else if(G_reqPCd=="061") { // Integridad : STD
		$("#stdDtl2").show();
		$("#sd2_myCdNm").html(title); // my code
		$("#sd2_cdSpnNm").html(data.cdSpnNm);
		$("#sd2_defCt").html(Common.convert(data.defCt));
		$("#sd2_refBiblCt").html(Common.convert(data.refBiblCt));
		$("#sd2_obsvtCt").html(Common.convert(data.obsvtCt));
		
	} else if(G_reqPCd=="062") { // Conservación : STD
		$("#stdDtl2").show();
		$("#sd2_myCdNm").html(title); // my code
		$("#sd2_cdSpnNm").html(data.cdSpnNm);
		$("#sd2_defCt").html(Common.convert(data.defCt));
		$("#sd2_refBiblCt").html(Common.convert(data.refBiblCt));
		$("#sd2_obsvtCt").html(Common.convert(data.obsvtCt));
		
	} else if(G_reqPCd=="069") { // Clasificación de procedencia : STD
		$("#stdDtl3").show();
		$("#sd3_pCdNm").html("Tipo de Procedencia"); // p code
		$("#sd3_pCd").html(data.pCdNm); // p code
		$("#sd3_myCdNm").html(title); // my code
		$("#sd3_cdSpnNm").html(data.cdSpnNm); // my code
		$("#sd3_defCt").html(Common.convert(data.defCt));
		$("#sd3_refBiblCt").html(Common.convert(data.refBiblCt));
		$("#sd3_obsvtCt").html(Common.convert(data.obsvtCt));
				
	} else if(G_reqPCd=="070") { // Inmueble Paleontológico : STD
		$("#stdDtl7").show(); 
		$("#sd7_pCd").html(data.pCdNm); // p code
		$("#sd7_ref1Cd").html(data.ref1CdNm); // ref1 code
		$("#sd7_ubigeoLv1").html(data.ref2CdNm); // ref2 code
	    $("#sd7_cdSpnNm").html(data.cdSpnNm); // my code
	    $("#sd7_obsvtCt").html(Common.convert(data.obsvtCt));
		
	} else if(G_reqPCd=="071") { // Inmueble Prehispánico : STD
		$("#stdDtl7").show(); 
		$("#tr_sd7_ref1Cd").hide();
		$("#sd7_pCd").html(data.pCdNm); // p code
		$("#sd7_ref1Cd").html(data.ref1CdNm); // ref1 code
		$("#sd7_ubigeoLv1").html(data.ref2CdNm); // ref2 code
	    $("#sd7_cdSpnNm").html(data.cdSpnNm); // my code
	    $("#sd7_obsvtCt").html(Common.convert(data.obsvtCt));

	} else if(G_reqPCd=="072") { // Otros Inmuebles : STD
		$("#stdDtl7").show(); 
		$("#tr_sd7_ref1Cd").hide();
		$("#sd7_pCd").html(data.pCdNm); // p code
		$("#sd7_ref1Cd").html(data.ref1CdNm); // ref1 code
		$("#sd7_ubigeoLv1").html(data.ref2CdNm); // ref2 code
	    $("#sd7_cdSpnNm").html(data.cdSpnNm); // my code
	    $("#sd7_obsvtCt").html(Common.convert(data.obsvtCt));
		
	} else if(G_reqPCd=="073") { // Área geográfica : STD
		$("#stdDtl2").show();
		$("#sd2_myCdNm").html(title); // my code
		$("#sd2_cdSpnNm").html(data.cdSpnNm);
		$("#sd2_defCt").html(Common.convert(data.defCt));
		$("#sd2_refBiblCt").html(Common.convert(data.refBiblCt));
		$("#sd2_obsvtCt").html(Common.convert(data.obsvtCt));
		
	} else if(G_reqPCd=="074") { // Proyecto arqueológico : STD
		$("#stdDtl8").show(); 
		$("#sd8_cdSpnNm").html(data.cdSpnNm);
		$("#sd8_etcNm").html(Common.convert(data.etcNm));
		$("#sd8_defCt").html(Common.convert(data.defCt));
		$("#sd8_obsvtCt").html(Common.convert(data.obsvtCt));
		
	} else if(G_reqPCd=="077") { // Tipo de Localización : STD
		$("#stdDtl2").show();
		$("#tr_sd2_defCt,#tr_sd2_refBiblCt").hide();
		$("#sd2_myCdNm").html(title); // my code
		$("#sd2_cdSpnNm").html(data.cdSpnNm);
		$("#sd2_defCt").html(Common.convert(data.defCt));
		$("#sd2_refBiblCt").html(Common.convert(data.refBiblCt));
		$("#sd2_obsvtCt").html(Common.convert(data.obsvtCt));
		
	} else if(G_reqPCd=="087") { // Forma de adquisición : STD
		$("#stdDtl2").show();
		$("#sd2_myCdNm").html(title); // my code
		$("#sd2_cdSpnNm").html(data.cdSpnNm);
		$("#sd2_defCt").html(Common.convert(data.defCt));
		$("#sd2_refBiblCt").html(Common.convert(data.refBiblCt));
		$("#sd2_obsvtCt").html(Common.convert(data.obsvtCt));
		
	} else if(G_reqPCd=="136") { // Tipo de documento : STD
		$("#stdDtl2").show();
		$("#tr_sd2_defCt,#tr_sd2_refBiblCt").hide();
		$("#sd2_myCdNm").html(title); // my code
		$("#sd2_cdSpnNm").html(data.cdSpnNm);
		$("#sd2_defCt").html(Common.convert(data.defCt));
		$("#sd2_refBiblCt").html(Common.convert(data.refBiblCt));
		$("#sd2_obsvtCt").html(Common.convert(data.obsvtCt));
				
	} else if(G_reqPCd=="08500001") { // Persona natural : OWN
		$("#ownDtl1").show(); 
		$("#od1_ownTpDocCd").html(data.ownTpDocCdNm);
		$("#od1_ownDocNo").html(data.ownDocNo);
		$("#od1_ownPLastNm").html(data.ownPLastNm);
		$("#od1_ownMLastNm").html(data.ownMLastNm);
		$("#od1_ownName").html(data.ownName);
		$("#od1_ownGenderNm").html(data.ownGenderNm);
		$("#od1_ownBirthDt").html(data.ownBirthDt);
		
	} else if(G_reqPCd=="08500002") { // Persona jurídica : OWN
		$("#ownDtl2").show(); 
		$("#od2_ownTpDocCd").html(data.ownTpDocCdNm);
		$("#od2_ownDocNo").html(data.ownDocNo);
		$("#od2_ownLegalNm").html(data.ownLegalNm);
		
	} else if(G_reqPCd=="1001") { // Custodio : CUSTO
		$("#custoDtl1").show(); 
		$("#cd1_custoCustoNm").html(data.custoCustoNm);
		
	} else if(G_reqPCd=="1002") { // Localización : LCT
		$("#lctDtl1").show(); 
		$("#ld1_lctTpLctCd").html(data.lctTpLctCdNm);
		$("#ld1_lctTpAdminCd").html(data.lctTpAdminCdNm);
		$("#ld1_lctLctNm").html(data.lctLctNm);
		$("#ld1_lctDetailAddrNm").html(data.lctDetailAddrNm);
		$("#ld1_ubigeoLv1").html(data.lctUbigeoNoNm);
		$("#ld1_lctHreYn").html(data.lctHreYnNm);
	    $("#ld1_lctHreSeqCt").html(Common.convert(data.lctHreSeqCt));
	    $("#ld1_lctLngtd").html(data.lctLngtd);
	    $("#ld1_lctLttd").html(data.lctLttd);
	    $("#ld1_lctHistRevCt").html(Common.convert(data.lctHistRevCt));
	    $("#ld1_lctObsvtCt").html(Common.convert(data.lctObsvtCt));  
	    
	} else {
		return false;
	}
	
	$("#LayerRequestCodeDetail").layerCenter(); // popup center
}

 
function fnGoDelete(seq) {
	if(confirm(G_conDelMsg)) {
		var url = "/pm/pmMtnnRequest/delCodeReq.ajax"
		var jsonData = {
				"seq" : seq
			};
		Ajax.request(url, jsonData, fnPopupSaveCallback, "");
	}
}

// selectBox change : Clasificación 
function fnSelBoxChange(index, val, targetArr) {
	for(var i in targetArr) {
		//console.log(targetArr[i]);
		$("select[id="+targetArr[i]+"] option").remove();
		$("select[id="+targetArr[i]+"]").append("<option value=''>-- Seleccione --</option>");
	}
	
	if(index=="sf1_classCd") {
		if(val != "") {
			Common.codeMaker(targetArr[0], "", {SQL_ID : 'STD_SUB_CODE_MAP', TP_CD : "MVB", STD_CD : G_reqPCd, CLASS_CD : "005", P_CLASS_CD : val, ACTIVE_YN : "Y"}); //Clasificación específica	
		}
	} else if(index=="sf4_classCd") {
		$("#tr_sf4_pCd").show();
		if(val != "") {
			Common.codeMaker(targetArr[0], "", {SQL_ID : 'STD_SUB_CODE_MAP', TP_CD : "MVB", STD_CD : G_reqPCd, CLASS_CD : "005", P_CLASS_CD : val, ACTIVE_YN : "Y"}); //Clasificación específica	
		}
	} else if(index=="sf3_classCd") {
		if(val != "") {
			Common.codeMaker(targetArr[0], "", {SQL_ID : 'STD_SUB_CODE_MAP', TP_CD : "MVB", STD_CD : G_reqPCd, CLASS_CD : "005", P_CLASS_CD : val, ACTIVE_YN : "Y"}); //Clasificación específica	
		}
	} else if(index=="sf5_classCd") {
		if(val != "") {
			Common.codeMaker(targetArr[0], "", {SQL_ID : 'STD_SUB_CODE_MAP', TP_CD : "MVB", STD_CD : G_reqPCd, CLASS_CD : "005", P_CLASS_CD : val, ACTIVE_YN : "Y"}); //Clasificación específica	
		}
	} else if(index=="sf6_classCd") {
		if(val != "") {
			Common.codeMaker(targetArr[0], "", {SQL_ID : 'STD_SUB_CODE_MAP', TP_CD : "MVB", STD_CD : G_reqPCd, CLASS_CD : "005", P_CLASS_CD : val, ACTIVE_YN : "Y"}); //Clasificación específica	
		}
	} else if(index=="sf10_classCd") {
		if(val != "") {
			Common.codeMaker(targetArr[0], "", {SQL_ID : 'STD_SUB_CODE_MAP', TP_CD : "MVB", STD_CD : G_reqPCd, CLASS_CD : "005", P_CLASS_CD : val, ACTIVE_YN : "Y"}); //Clasificación específica	
		}
	}
}

// selectBox change : UBIGEO
function fnUbiSBoxChange(sqlId, val, targetArr) {
	for(var i in targetArr) {
		//console.log(targetArr[i]);
		$("select[id="+targetArr[i]+"] option").remove();
		$("select[id="+targetArr[i]+"]").append("<option value=''>-- Seleccione --</option>");
	}
	
	if(val != "") {
		if(sqlId=="UBIGEO_LV2") {
			Common.codeMaker(targetArr[0], "", {SQL_ID : sqlId, LVL : "2", UBIGEO_NO : val, ACTIVE_YN : "Y"});	
		} else if(sqlId=="UBIGEO_LV3") {
			Common.codeMaker(targetArr[0], "", {SQL_ID : sqlId, LVL : "3", UBIGEO_NO : val, ACTIVE_YN : "Y"});
		}	
	}	
}

// selectBox change : own Tipo Documento
function fnOwnSBoxChange(val) {
	if(val=="15000003") { // when selected DNI
		$("#aTagVer").show();
		$("#of1_ownPLastNm, #of1_ownMLastNm, #of1_ownName").val("");
		$("#of1_ownPLastNm, #of1_ownMLastNm, #of1_ownName").prop("readonly", true);
		$("#of1_ownPLastNm, #of1_ownMLastNm, #of1_ownName").prop("placeholder", "");
		
	} else {
		$("#aTagVer").hide();
		$("#of1_ownPLastNm, #of1_ownMLastNm, #of1_ownName").prop("readonly", false);
		$("#of1_ownPLastNm, #of1_ownMLastNm, #of1_ownName").prop("placeholder", "Textual");
	}
}

// selectBox change : Clasificación específica 
$("#sf4_classSpecCd").change(function() {
	var val = $(this).val();
	var title = $(this).children("option:selected").text();
	LayerSBoxReset(['sf4_pCd']); // sbox reset
	$("#tr_sf4_pCd").show();
	
	if(val == "00500001") { // Paleontológico
		$("#sf4_pCd").val("");
		$("#tr_sf4_pCd").hide();
	} else if(val != "") {
 
		Common.codeMaker("sf4_pCd", "", {SQL_ID : "STD_CODE_MAP", TP_CD : "MVB", LVL : "2", STD_CD : "006", CLASS_SPEC_CD : val, ACTIVE_YN : "Y"}); // pCd : Tipo de bien
	}
});

//selectBox change : Clasificación específica 
$("#sf3_classSpecCd").change(function() {
	var val = $(this).val();
	var title = $(this).children("option:selected").text();
	LayerSBoxReset(['sf3_pCd']); // sbox reset
	if(val != "") {
		Common.codeMaker("sf3_pCd", "", {SQL_ID : "STD_CODE_MAP", TP_CD : "MVB", LVL : "2", STD_CD : "027", ACTIVE_YN : "Y", CLASS_SPEC_CD : val}); // pCd : Tipo de Material
	}
});

//selectBox change : Clasificación específica 
$("#sf6_classSpecCd").change(function() {
	var val = $(this).val();
	var title = $(this).children("option:selected").text();
	LayerSBoxReset(['sf6_pCd']); // sbox reset
	if(val != "") {
		Common.codeMaker("sf6_pCd", "", {SQL_ID : "STD_CODE_MAP", TP_CD : "MVB", LVL : "2", STD_CD : "027", CLASS_SPEC_CD : val, ACTIVE_YN : "Y"}); // pCd : Material
	}
});

//selectBox change : Clasificación específica 
$("#sf10_classSpecCd").change(function() {
	var val = $(this).val();
	var title = $(this).children("option:selected").text();
	LayerSBoxReset(['sf10_ref1Cd']); // sbox reset
	if(val != "") {
		Common.codeMaker("sf10_ref1Cd", "", {SQL_ID : "STD_CODE_MAP", TP_CD : "MVB", LVL : "2", STD_CD : "013", CLASS_SPEC_CD : val, ACTIVE_YN : "Y"}); // ref1Cd : Lugar de manufactura
	}
});

//Histórico change event
function fnLctRadioClick(val) {
	if(val=="Y") {
		$("#lf1_lctLngtd").val("");
		$("#lf1_lctLttd").val("");
		$("input:text[id='lf1_lctLngtd']").prop("disabled", true);	// Longitud
		$("input:text[id='lf1_lctLttd']").prop("disabled", true);	// Latitud
	} else {
		$("input:text[id='lf1_lctLngtd']").prop("disabled", false);	// Longitud
		$("input:text[id='lf1_lctLttd']").prop("disabled", false); 	// Latitud
	}
}

// Popup : DataReset
function fnPopupDataReset() {
	LayerSBoxReset(['LreqPCd']); // selectBox
	$("#LmodeId,#Lseq,#Ltitle,#Ldscpt").val(""); // input text
	
	$("#stdDiv1,#stdDiv2,#stdDiv3,#stdDiv4,#stdDiv5,#stdDiv6,#stdDiv7,#stdDiv8,#stdDiv9,#stdDiv10,#authDiv1,#ownDiv1,#ownDiv2,#custoDiv1,#lctDiv1").hide(); // div
	LayerSBoxReset(['sf1_classCd','sf1_classSpecCd','sf3_pCd','sf4_classCd','sf4_classSpecCd','sf4_pCd','sf5_classCd','sf5_classSpecCd','sf10_classCd','sf10_classSpecCd']); // selectBox
	LayerSBoxReset(['sf6_classCd','sf6_classSpecCd','sf6_pCd','sf6_ref1Cd','sf7_pCd','sf7_ref1Cd','sf7_ubigeoLv1','sf7_ubigeoLv2','sf7_ubigeoLv3','sf10_ref1Cd']); // selectBox
	LayerSBoxReset(['af1_authPCd','of1_ownTpDocCd','lf1_lctTpLctCd','lf1_lctTpAdminCd','lf1_ubigeoLv1','lf1_ubigeoLv2','lf1_ubigeoLv3']);
	$(".ipt").val(""); // input text
	$(".txtarea").val(""); // textarea
	$("#uploadfileNm1,#uploadfileNm2").text(""); // image info
	$("#uploadfileDel1,#uploadfileDel2").hide(); // image info

}

// Popup : selectBox chage DataReset
function fnSBoxChgDataReset() {
	$("#stdDiv1,#stdDiv2,#stdDiv3,#stdDiv4,#stdDiv5,#stdDiv6,#stdDiv7,#stdDiv8,#stdDiv9,#stdDiv10,#authDiv1,#ownDiv1,#ownDiv2,#custoDiv1,#lctDiv1").hide(); // div
	LayerSBoxReset(['sf1_classCd','sf1_classSpecCd','sf3_pCd','sf4_classCd','sf4_classSpecCd','sf4_pCd','sf5_classCd','sf5_classSpecCd','sf10_classCd','sf10_classSpecCd']); // selectBox
	LayerSBoxReset(['sf6_classCd','sf6_classSpecCd','sf6_pCd','sf6_ref1Cd','sf7_pCd','sf7_ref1Cd','sf7_ubigeoLv1','sf7_ubigeoLv2','sf7_ubigeoLv3','sf10_ref1Cd']); // selectBox
	LayerSBoxReset(['af1_authPCd','of1_ownTpDocCd','lf1_lctTpLctCd','lf1_lctTpAdminCd','lf1_ubigeoLv1','lf1_ubigeoLv2','lf1_ubigeoLv3']); // selectBox
	$(".ipt").val(""); // input text
	$(".txtarea").val(""); // textarea
	$("#uploadfileNm1,#uploadfileNm2").text(""); // image info
	$("#uploadfileDel1,#uploadfileDel2").hide(); // image info
	//$("input:checkbox[id='check006']").prop("checked", false); // checkBox
}

// Popup : save callback 
function fnPopupSaveCallback(data) {
	$(".popClose").click();
	if(data.MSG != "") {
		Common.alert("success", data.MSG, fnSearch);
	}
}

 
function fnSingleUploadCallback(arrayNew) {
	/* for(var i = 0; i < arrayNew.length; i++) {
 
		console.log("originalName::"+arrayNew[i].originalName);
		console.log("uploadName::"+arrayNew[i].uploadName);
		console.log("isLargeFile::"+arrayNew[i].isLargeFile);
		console.log("size::"+arrayNew[i].size);
		console.log("uploadPath::"+arrayNew[i].uploadPath);
		console.log("logicalPath::"+arrayNew[i].logicalPath);
		console.log("extension::"+arrayNew[i].extension);
		console.log("localPath::"+arrayNew[i].localPath);
		console.log("customValue::"+arrayNew[i].customValue);
		console.log("responseCustomValue::"+arrayNew[i].responseCustomValue);
		console.log("order::"+arrayNew[i].order);
	} */
 
	var uploadId = arrayNew.uploadId;
	var filePath = arrayNew.filePath;
	var thumbPath1 = arrayNew.thumbPath1;
	var thumbPath2 = arrayNew.thumbPath2;
	var preFileName = arrayNew.preFileName;
 
	if(uploadId=="fileUpload1") {
		$("#uploadfileNm1").text(arrayNew[0].originalName);
		$("#uploadfileDel1").show();
		$("#img1Path").val(filePath);
		$("#img1OrgNm").val(arrayNew[0].originalName);
		$("#img1ChgNm").val(arrayNew[0].uploadName);
		$("#thub1Path").val(thumbPath1);
		$("#file1Size").val(arrayNew[0].size);
	} else if(uploadId=="fileUpload2") {
		$("#uploadfileNm2").text(arrayNew[0].originalName);
		$("#uploadfileDel2").show();
		$("#img2Path").val(filePath);
		$("#img2OrgNm").val(arrayNew[0].originalName);
		$("#img2ChgNm").val(arrayNew[0].uploadName);
		$("#thub2Path").val(thumbPath1);
		$("#file2Size").val(arrayNew[0].size);
	}
	Upload.singlePopClose();  
}

 
function fnFileDown1() {
	var jsonData = {
			"fileOrgName" : $("#img1OrgNm").val(),	 
			"fileChgName" : $("#img1ChgNm").val(),	 
			"filePath" : $("#img1Path").val(),		 
			"fileSize" : $("#file1Size").val()		 
		}
	Download.singlePopOpen(jsonData);	 
}

 
function fnFileDown2() {
	var jsonData = {
			"fileOrgName" : $("#img2OrgNm").val(),
			"fileChgName" : $("#img2ChgNm").val(),
			"filePath" : $("#img2Path").val(),
			"fileSize" : $("#file2Size").val()
		}
	Download.singlePopOpen(jsonData);
}

 
function fnDetailFileDown1() {
	var jsonData = {
			"fileOrgName" : $("#ad1_img1OrgNm").val(),	 
			"fileChgName" : $("#ad1_img1ChgNm").val(),	 
			"filePath" : $("#ad1_img1Path").val(),		 
			"fileSize" : $("#ad1_file1Size").val()		 
		}
	Download.singlePopOpen(jsonData);	 
}

 
function fnDetailFileDown2() {
	var jsonData = {
			"fileOrgName" : $("#ad1_img2OrgNm").val(),
			"fileChgName" : $("#ad1_img2ChgNm").val(),
			"filePath" : $("#ad1_img2Path").val(),
			"fileSize" : $("#ad1_file2Size").val()
		}
	Download.singlePopOpen(jsonData);
}

 
function fnUploadfileDel1() {
	if(confirm(G_conDelMsg)) {
		$("#uploadfileNm1").text("");
		$("#img1Path, #img1OrgNm, #img1ChgNm, #thub1Path, #file1Size").val("");
		$("#uploadfileDel1").hide();
	}
}

 
function fnUploadfileDel2() {
	if(confirm(G_conDelMsg)) {
		$("#uploadfileNm2").text("");
		$("#img2Path, #img2OrgNm, #img2ChgNm, #thub2Path, #file2Size").val("");
		$("#uploadfileDel2").hide();
	}
}


/***********************************************************************************************
 ** $(document).ready()
 ***********************************************************************************************/
$(document).ready(function(){
	
	//Términos : selectBox change  UI 
	$("#LreqPCd").change(function() {
		var val = $(this).val();
		var title = $(this).children("option:selected").text();
		// data reset
		fnSBoxChgDataReset();
		G_reqPCd = val;
 
		if(G_reqPCd=="006") { // Tipo de bien : STD
			$("#stdDiv1").show();
			$("#sf1_myCdNm").text(title); // my code
			$("#sf1_cdSpnNm").data("columns",title); // my code
			Common.codeMaker("sf1_classCd", "", {SQL_ID : "STD_SUB_CODE_MAP", TP_CD : "MVB", STD_CD : G_reqPCd, CLASS_CD : "004", ACTIVE_YN : "Y"}); //Clasificación
			
		} else if(G_reqPCd=="007") { // Reino : STD
			$("#stdDiv2").show();
			$("#sf2_myCdNm").text(title); // my code
			$("#sf2_cdSpnNm").data("columns",title); // my code
			
		} else if(G_reqPCd=="008") { // Phylum : STD
			$("#stdDiv3").show();
			$("#sf3_pCdNm").text("Reino"); // p code
			$("#sf3_pCd").data("columns","Reino"); // p code
			$("#sf3_myCdNm").text(title); // my code
			$("#sf3_cdSpnNm").data("columns",title); // my code
			Common.codeMaker("sf3_pCd", "", {SQL_ID : "STD_CODE_MAP", TP_CD : "MVB", LVL : "2", STD_CD : "007", ACTIVE_YN : "Y"}); // pCd : Reino
			
		} else if(G_reqPCd=="009") { // Denominación : STD
			$("#stdDiv4").show();
			$("#sf4_pCdNm").text("Tipo de bien"); // p code
			$("#sf4_pCd").data("columns","Tipo de bien"); // p code
			$("#sf4_myCdNm").text(title); // my code
			$("#sf4_cdSpnNm").data("columns",title); // my code
			Common.codeMaker("sf4_classCd", "", {SQL_ID : "STD_SUB_CODE_MAP", TP_CD : "MVB", STD_CD : G_reqPCd, CLASS_CD : "004", ACTIVE_YN : "Y"}); //Clasificación
			
		} else if(G_reqPCd=="013") { // Lugar de elaboración(manufactura) : STD
			$("#stdDiv5").show();
			$("#tr_sf5_defCt,#tr_sf5_refBiblCt").hide();
			$("#sf5_myCdNm").text(title); // my code
			$("#sf5_cdSpnNm").data("columns",title); // my code
			Common.codeMaker("sf5_classCd", "", {SQL_ID : "STD_SUB_CODE_MAP", TP_CD : "MVB", STD_CD : G_reqPCd, CLASS_CD : "004", ACTIVE_YN : "Y"}); //Clasificación
			
		} else if(G_reqPCd=="016") { // Autoría : AUTH
			$("#authDiv1").show();
			Common.codeMaker("af1_authPCd", "", {SQL_ID : "STD_CODE_MAP", TP_CD : "MVB", LVL : "2", STD_CD : "015", ACTIVE_YN : "Y"}); // pCd : Autoría
			
		} else if(G_reqPCd=="017") { // Fabricante / Taller : AUTH
			$("#authDiv1").show();
			$("#tr_af1_authPCd").hide();
			
		} else if(G_reqPCd=="018") { // Etnia : STD
			$("#stdDiv10").show();
			$("#sf10_myCdNm").text(title); // my code
			$("#sf10_cdSpnNm").data("columns",title); // my code
			Common.codeMaker("sf10_classCd", "", {SQL_ID : "STD_SUB_CODE_MAP", TP_CD : "MVB", STD_CD : G_reqPCd, CLASS_CD : "004", ACTIVE_YN : "Y"}); //Clasificación
			
		} else if(G_reqPCd=="019") { // Cultura : STD
			$("#stdDiv2").show();
			$("#sf2_myCdNm").text(title); // my code
			$("#sf2_cdSpnNm").data("columns",title); // my code
			
		} else if(G_reqPCd=="021") { // Estilo : STD
			$("#stdDiv5").show();
			$("#sf5_myCdNm").text(title); // my code
			$("#sf5_cdSpnNm").data("columns",title); // my code
			Common.codeMaker("sf5_classCd", "", {SQL_ID : "STD_SUB_CODE_MAP", TP_CD : "MVB", STD_CD : G_reqPCd, CLASS_CD : "004", ACTIVE_YN : "Y"}); //Clasificación
			
		} else if(G_reqPCd=="022") { // Cronología(Era geológica) : STD
			$("#stdDiv2").show();
			$("#sf2_myCdNm").text(title); // my code
			$("#sf2_cdSpnNm").data("columns",title); // my code
			
		} else if(G_reqPCd=="023") { // Cronología(Periodo) : STD
			$("#stdDiv3").show();
			$("#sf3_pCdNm").text("Era geológica"); // p code
			$("#sf3_pCd").data("columns","Era geológica"); // p code
			$("#sf3_myCdNm").text(title); // my code
			$("#sf3_cdSpnNm").data("columns",title); // my code
			Common.codeMaker("sf3_pCd", "", {SQL_ID : "STD_CODE_MAP", TP_CD : "MVB", LVL : "2", STD_CD : "022", ACTIVE_YN : "Y"}); // pCd : Era geológica
			
		} else if(G_reqPCd=="024") { // Periodo : STD
			$("#stdDiv2").show();
			$("#sf2_myCdNm").text(title); // my code
			$("#sf2_cdSpnNm").data("columns",title); // my code
			
		} else if(G_reqPCd=="027") { // Material (s) : STD
			$("#stdDiv5").show();
			$("#sf5_myCdNm").text(title); // my code
			$("#sf5_cdSpnNm").data("columns",title); // my code
			Common.codeMaker("sf5_classCd", "", {SQL_ID : "STD_SUB_CODE_MAP", TP_CD : "MVB", STD_CD : G_reqPCd, CLASS_CD : "004", ACTIVE_YN : "Y"}); //Clasificación
			
		} else if(G_reqPCd=="028") { // Tipo de material : STD
			$("#stdDiv3").show();
			$("#tr_sf3_classCd").show();
			$("#tr_sf3_classSpecCd").show();
			$("#sf3_pCdNm").text("Material"); // p code
			$("#sf3_pCd").data("columns","Material"); // p code
			$("#sf3_myCdNm").text(title); // my code
			$("#sf3_cdSpnNm").data("columns",title); // my code
			Common.codeMaker("sf3_classCd", "", {SQL_ID : "STD_SUB_CODE_MAP", TP_CD : "MVB", STD_CD : G_reqPCd, CLASS_CD : "004", ACTIVE_YN : "Y"}); //Clasificación
			//Common.codeMaker("sf3_pCd", "", {SQL_ID : "STD_CODE_MAP", TP_CD : "MVB", LVL : "2", STD_CD : "027"}); // pCd : Material
			
		} else if(G_reqPCd=="031") { // Técnicas : STD
			$("#stdDiv6").show(); 
			Common.codeMaker("sf6_classCd", "", {SQL_ID : "STD_SUB_CODE_MAP", TP_CD : "MVB", STD_CD : G_reqPCd, CLASS_CD : "004", ACTIVE_YN : "Y"}); //Clasificación
			Common.codeMaker("sf6_ref1Cd", "", {SQL_ID : "STD_CODE_MAP", TP_CD : "MVB", LVL : "2", STD_CD : "029", ACTIVE_YN : "Y"}); // refCd : Tipo de técnicas
			
		} else if(G_reqPCd=="032") { // Tipo de fosilización : STD
			$("#stdDiv2").show();
			$("#sf2_myCdNm").text(title); // my code
			$("#sf2_cdSpnNm").data("columns",title); // my code
			
		} else if(G_reqPCd=="043") { // Patrimonio inmaterial asociado : STD
			$("#stdDiv9").show(); 
			
		} else if(G_reqPCd=="061") { // Integridad : STD
			$("#stdDiv2").show();
			$("#sf2_myCdNm").text(title); // my code
			$("#sf2_cdSpnNm").data("columns",title); // my code
			
		} else if(G_reqPCd=="062") { // Conservación : STD
			$("#stdDiv2").show();
			$("#sf2_myCdNm").text(title); // my code
			$("#sf2_cdSpnNm").data("columns",title); // my code
			
		} else if(G_reqPCd=="069") { // Clasificación de procedencia : STD
			$("#stdDiv3").show();
			$("#sf3_pCdNm").text("Tipo de Procedencia"); // p code
			$("#sf3_pCd").data("columns","Tipo de Procedencia"); // p code
			$("#sf3_myCdNm").text(title); // my code
			$("#sf3_cdSpnNm").data("columns",title); // my code
			Common.codeMaker("sf3_pCd", "", {SQL_ID : "STD_CODE_MAP", TP_CD : "MVB", LVL : "2", STD_CD : "068", ACTIVE_YN : "Y"}); // pCd : Tipo de Procedencia
			
		} else if(G_reqPCd=="070") { // Inmueble Paleontológico : STD
			$("#stdDiv7").show(); 
			$("#sf7_gpCd").val("06800002");
			Common.codeMaker("sf7_pCd", "", {SQL_ID : "STD_CODE_MAP", TP_CD : "MVB", LVL : "2", STD_CD : "069", P_CD : "06800002", ACTIVE_YN : "Y"}); // pCd : Clasificación
			Common.codeMaker("sf7_ref1Cd", "", {SQL_ID : "STD_CODE_MAP", TP_CD : "MVB", LVL : "2", STD_CD : "137", ACTIVE_YN : "Y"}); // refCd : Tipo de Denominación
		    Common.codeMaker("sf7_ubigeoLv1", "", {SQL_ID : "UBIGEO_LV1", LVL : "1", ACTIVE_YN : "Y"}); // Departamento
			
		} else if(G_reqPCd=="071") { // Inmueble Prehispánico : STD
			$("#stdDiv7").show(); 
			$("#sf7_gpCd").val("06800003");
			$("#tr_sf7_ref1Cd").hide();
			Common.codeMaker("sf7_pCd", "", {SQL_ID : "STD_CODE_MAP", TP_CD : "MVB", LVL : "2", STD_CD : "069", P_CD : "06800003", ACTIVE_YN : "Y"}); // pCd : Clasificación
		    Common.codeMaker("sf7_ubigeoLv1", "", {SQL_ID : "UBIGEO_LV1", LVL : "1", ACTIVE_YN : "Y"}); // Departamento
		    
		} else if(G_reqPCd=="072") { // Otros Inmuebles : STD
			$("#stdDiv7").show(); 
			$("#sf7_gpCd").val("06800004");
			$("#tr_sf7_ref1Cd").hide();
			Common.codeMaker("sf7_pCd", "", {SQL_ID : "STD_CODE_MAP", TP_CD : "MVB", LVL : "2", STD_CD : "069", P_CD : "06800004", ACTIVE_YN : "Y"}); // pCd : Clasificación
		    Common.codeMaker("sf7_ubigeoLv1", "", {SQL_ID : "UBIGEO_LV1", LVL : "1", ACTIVE_YN : "Y"}); // Departamento
			
		} else if(G_reqPCd=="073") { // Área geográfica : STD
			$("#stdDiv2").show();
			$("#sf2_myCdNm").text(title); // my code
			$("#sf2_cdSpnNm").data("columns",title); // my code
			
		} else if(G_reqPCd=="074") { // Proyecto arqueológico : STD
			$("#stdDiv8").show(); 
			
		} else if(G_reqPCd=="077") { // Tipo de Localización : STD
			$("#stdDiv2").show();
			$("#tr_sf2_defCt,#tr_sf2_refBiblCt").hide();
			$("#sf2_myCdNm").text(title); // my code
			$("#sf2_cdSpnNm").data("columns",title); // my code
			
		} else if(G_reqPCd=="087") { // Forma de adquisición : STD
			$("#stdDiv2").show();
			$("#sf2_myCdNm").text(title); // my code
			$("#sf2_cdSpnNm").data("columns",title); // my code
			
		} else if(G_reqPCd=="136") { // Tipo de documento : STD
			$("#stdDiv2").show();
			$("#tr_sf2_defCt,#tr_sf2_refBiblCt").hide();
			$("#sf2_myCdNm").text(title); // my code
			$("#sf2_cdSpnNm").data("columns",title); // my code
			
		} else if(G_reqPCd=="08500001") { // Persona natural : OWN
			$("#ownDiv1").show(); 
			Common.codeMaker("of1_ownTpDocCd", "", {SQL_ID : "STD_CODE_MAP", TP_CD : "MVB", LVL : "2", STD_CD : "150", ACTIVE_YN : "Y"}); // Tipo Documento
			
		} else if(G_reqPCd=="08500002") { // Persona jurídica : OWN
			$("#ownDiv2").show(); 
			Common.codeMaker("of2_ownTpDocCd", "", {SQL_ID : "STD_CODE_MAP", TP_CD : "MVB", LVL : "2", STD_CD : "151", ACTIVE_YN : "Y"}); // Tipo Documento
			
		} else if(G_reqPCd=="1001") { // Custodio : CUSTO
			$("#custoDiv1").show(); 
			
		} else if(G_reqPCd=="1002") { // Localización : LCT
			$("#lctDiv1").show(); 
			Common.codeMaker("lf1_lctTpLctCd", "", {SQL_ID : "STD_CODE_MAP", TP_CD : "MVB", LVL : "2", STD_CD : "077", ACTIVE_YN : "Y"}); // Tipo de Localización
			Common.codeMaker("lf1_lctTpAdminCd", "", {SQL_ID : "STD_CODE_MAP", TP_CD : "MVB", LVL : "2", STD_CD : "154", ACTIVE_YN : "Y"}); // Tipo de administración
			Common.codeMaker("lf1_ubigeoLv1", "", {SQL_ID : "UBIGEO_LV1", LVL : "1", ACTIVE_YN : "Y"}); // Departamento
			
		} else {
			return false;
		}
		
		$("#LayerRequestCode").layerCenter();
		
	});
	
	/* Popup save button click */
	$("#Lsave").click(function() {
		var valArr = null;  
		var wForm = null;  
		
		if(G_reqPCd=="006") { // Tipo de bien
			valArr = ['LreqPCd','Ltitle','Ldscpt','sf1_classCd','sf1_classSpecCd','sf1_cdSpnNm','sf1_defCt','sf1_refBiblCt'];
 
			if($("input:checkbox[id='sf1_check']").is(":checked")) {
				$("#sf1_ref1Cd").val("Y");
			} else {
				$("#sf1_ref1Cd").val("N");	
			}
			wForm = Common.serialize($("#stdForm1"));
			
		} else if(G_reqPCd=="007") { // Reino
			valArr = ['LreqPCd','Ltitle','Ldscpt','sf2_cdSpnNm','sf2_defCt','sf2_refBiblCt'];
			wForm = Common.serialize($("#stdForm2"));
			
		} else if(G_reqPCd=="008") { // Phylum
			valArr = ['LreqPCd','Ltitle','Ldscpt','sf3_pCd','sf3_cdSpnNm','sf3_defCt','sf3_refBiblCt'];
			wForm = Common.serialize($("#stdForm3"));
			
		} else if(G_reqPCd=="009") { // Denominación : STD
			valArr = ['LreqPCd','Ltitle','Ldscpt','sf4_classCd','sf4_classSpecCd','sf4_pCd','sf4_cdSpnNm','sf4_defCt','sf4_refBiblCt'];
			wForm = Common.serialize($("#stdForm4"));
			
		} else if(G_reqPCd=="013") { // Lugar de elaboración(manufactura) : STD
			valArr = ['LreqPCd','Ltitle','Ldscpt','sf5_classCd','sf5_classSpecCd','sf5_cdSpnNm'];
			wForm = Common.serialize($("#stdForm5"));
			
		} else if(G_reqPCd=="016" || G_reqPCd=="017") { // Autoría, Fabricante / Taller : AUTH
 
			if($("input:checkbox[id='af1_check']").is(":checked")) {
				$("#af1_authTpAuthYn").val("Y");
			} else {
				$("#af1_authTpAuthYn").val("N");
			}
			valArr = ['LreqPCd','Ltitle','Ldscpt','af1_authPCd','af1_authCdSpnNm','af1_authBriefRefCt','af1_authBiblioRefCt'];
			wForm = Common.serialize($("#authForm1"));
			
		} else if(G_reqPCd=="018") { // Etnia : STD
			valArr = ['LreqPCd','Ltitle','Ldscpt','sf10_classCd','sf10_classSpecCd','sf10_cdSpnNm','sf10_defCt'];
			wForm = Common.serialize($("#stdForm10"));
			
		} else if(G_reqPCd=="019") { // Cultura : STD
			valArr = ['LreqPCd','Ltitle','Ldscpt','sf2_cdSpnNm','sf2_defCt','sf2_refBiblCt'];
			wForm = Common.serialize($("#stdForm2"));
			
		} else if(G_reqPCd=="021") { // Estilo : STD
			valArr = ['LreqPCd','Ltitle','Ldscpt','sf5_classCd','sf5_classSpecCd','sf5_cdSpnNm','sf5_defCt','sf5_refBiblCt'];
			wForm = Common.serialize($("#stdForm5"));
			
		} else if(G_reqPCd=="022") { // Cronología(Era geológica) : STD
			valArr = ['LreqPCd','Ltitle','Ldscpt','sf2_cdSpnNm','sf2_defCt','sf2_refBiblCt'];
			wForm = Common.serialize($("#stdForm2"));
			
		} else if(G_reqPCd=="023") { // Cronología(Periodo) : STD
			valArr = ['LreqPCd','Ltitle','Ldscpt','sf3_pCd','sf3_cdSpnNm','sf3_defCt','sf3_refBiblCt'];
			wForm = Common.serialize($("#stdForm3"));
			
		} else if(G_reqPCd=="024") { // Periodo : STD
			valArr = ['LreqPCd','Ltitle','Ldscpt','sf2_cdSpnNm','sf2_defCt','sf2_refBiblCt'];
			wForm = Common.serialize($("#stdForm2"));
			
		} else if(G_reqPCd=="027") { // Material (s) : STD
			valArr = ['LreqPCd','Ltitle','Ldscpt','sf5_classCd','sf5_classSpecCd','sf5_cdSpnNm','sf5_defCt','sf5_refBiblCt'];
			wForm = Common.serialize($("#stdForm5"));
			
		} else if(G_reqPCd=="028") { // Tipo de material : STD
			valArr = ['LreqPCd','Ltitle','Ldscpt','sf3_classCd','sf3_classSpecCd','sf3_pCd','sf3_cdSpnNm','sf3_defCt','sf3_refBiblCt','sf3_obsvtCt'];
			wForm = Common.serialize($("#stdForm3"));
			
		} else if(G_reqPCd=="031") { // Técnicas : STD
			valArr = ['LreqPCd','Ltitle','Ldscpt','sf6_classCd','sf6_classSpecCd','sf6_pCd','sf6_cdSpnNm','sf6_ref1Cd','sf6_defCt','sf6_refBiblCt'];
			wForm = Common.serialize($("#stdForm6"));
			
		} else if(G_reqPCd=="032") { // Tipo de fosilización : STD
			valArr = ['LreqPCd','Ltitle','Ldscpt','sf2_cdSpnNm','sf2_defCt','sf2_refBiblCt'];
			wForm = Common.serialize($("#stdForm2"));
			
		} else if(G_reqPCd=="043") { // Patrimonio inmaterial asociado : STD
			valArr = ['LreqPCd','Ltitle','Ldscpt','sf9_cdSpnNm'];
			wForm = Common.serialize($("#stdForm9"));
			
		} else if(G_reqPCd=="061") { // Integridad : STD
			valArr = ['LreqPCd','Ltitle','Ldscpt','sf2_cdSpnNm','sf2_defCt','sf2_refBiblCt'];
			wForm = Common.serialize($("#stdForm2"));
			
		} else if(G_reqPCd=="062") { // Conservación : STD
			valArr = ['LreqPCd','Ltitle','Ldscpt','sf2_cdSpnNm','sf2_defCt','sf2_refBiblCt'];
			wForm = Common.serialize($("#stdForm2"));
			
		} else if(G_reqPCd=="069") { // Clasificación de procedencia : STD
			valArr = ['LreqPCd','Ltitle','Ldscpt','sf3_pCd','sf3_cdSpnNm','sf3_defCt','sf3_refBiblCt'];
			wForm = Common.serialize($("#stdForm3"));
			
		} else if(G_reqPCd=="070") { // Inmueble Paleontológico : STD
			valArr = ['LreqPCd','Ltitle','Ldscpt','sf7_pCd','sf7_ref1Cd','sf7_cdSpnNm','sf7_ubigeoLv1','sf7_ubigeoLv2','sf7_ubigeoLv3'];
			wForm = Common.serialize($("#stdForm7"));
			
		} else if(G_reqPCd=="071") { // Inmueble Prehispánico : STD
			valArr = ['LreqPCd','Ltitle','Ldscpt','sf7_pCd','sf7_cdSpnNm','sf7_ubigeoLv1','sf7_ubigeoLv2','sf7_ubigeoLv3'];
			wForm = Common.serialize($("#stdForm7"));
			
		} else if(G_reqPCd=="072") { // Otros Inmuebles : STD
			valArr = ['LreqPCd','Ltitle','Ldscpt','sf7_pCd','sf7_cdSpnNm','sf7_ubigeoLv1','sf7_ubigeoLv2','sf7_ubigeoLv3'];
			wForm = Common.serialize($("#stdForm7"));
			
		} else if(G_reqPCd=="073") { // Área geográfica : STD
			valArr = ['LreqPCd','Ltitle','Ldscpt','sf2_cdSpnNm','sf2_defCt','sf2_refBiblCt'];
			wForm = Common.serialize($("#stdForm2"));
			
		} else if(G_reqPCd=="074") { // Proyecto arqueológico : STD
			valArr = ['LreqPCd','Ltitle','Ldscpt','sf8_cdSpnNm','sf8_etcNm'];
			wForm = Common.serialize($("#stdForm8"));
			
		} else if(G_reqPCd=="077") { // Tipo de Localización : STD
			valArr = ['LreqPCd','Ltitle','Ldscpt','sf2_cdSpnNm'];
			wForm = Common.serialize($("#stdForm2"));
			
		} else if(G_reqPCd=="087") { // Forma de adquisición : STD
			valArr = ['LreqPCd','Ltitle','Ldscpt','sf2_cdSpnNm','sf2_defCt','sf2_refBiblCt'];
			wForm = Common.serialize($("#stdForm2"));
			
		} else if(G_reqPCd=="136") { // Tipo de documento : STD
			valArr = ['LreqPCd','Ltitle','Ldscpt','sf2_cdSpnNm'];
			wForm = Common.serialize($("#stdForm2"));
			
		} else if(G_reqPCd=="08500001") { // Persona natural : OWN
			valArr = ['LreqPCd','Ltitle','Ldscpt','of1_ownTpDocCd','of1_ownDocNo','of1_ownPLastNm','of1_ownName','of1_ownGender','of1_ownBirthDt'];
			wForm = Common.serialize($("#ownForm1"));
			
		} else if(G_reqPCd=="08500002") { // Persona jurídica : OWN
			valArr = ['LreqPCd','Ltitle','Ldscpt','of2_ownTpDocCd','of2_ownDocNo','of2_ownLegalNm'];
			wForm = Common.serialize($("#ownForm2"));
			
		} else if(G_reqPCd=="1001") { // Custodio : CUSTO
			valArr = ['LreqPCd','Ltitle','Ldscpt','cf1_custoCustoNm'];
			wForm = Common.serialize($("#custoForm1"));
			
		} else if(G_reqPCd=="1002") { // Localización : LCT
			valArr = ['LreqPCd','Ltitle','Ldscpt','lf1_lctTpLctCd','lf1_lctLctNm','lf1_lctDetailAddrNm'];
			wForm = Common.serialize($("#lctForm1"));
			
		} else {
			return false;
		}
		
		if(Valid.arrRequire(valArr)) {
			if($("#LmodeId").val()=="reg") {
				var url = "/pm/pmMtnnRequest/regCodeReq.ajax";	
			} else if($("#LmodeId").val()=="mod") {
				var url = "/pm/pmMtnnRequest/modCodeReq.ajax";
			} else {
				return false;
			}
			var addParam = {
					"reqPCd" : $("#LreqPCd").val(),
					"title"  : $("#Ltitle").val(),
					"dscpt"  : $("#Ldscpt").val(),
					"tpCd"   : $("#LtpCd").val(),
					"seq"    : $("#Lseq").val()
			}
			Ajax.request(url, wForm, fnPopupSaveCallback, addParam);
		}	
	});
	
 
	$("#fileUpload1").click(function() {
		var maxTotalFileCount = "1";			 
		var filePath = G_reqImgPath;			 
		var thumbPath1 = G_reqThumb1Path;		 
		var thumbPath2 = "";					 
		var preFileName = "";					 
		var customValue = "";					 
		var uploadId = "fileUpload1";			 
		
		var jsonData = {
				"maxTotalFileCount" : maxTotalFileCount,
				"filePath" : filePath,
				"thumbPath1" : thumbPath1,
				"thumbPath2" : thumbPath2,
				"preFileName" : preFileName,
				"customValue" : customValue,
				"uploadId" : uploadId
			};
		Upload.imagePopOpen(jsonData);		 
	});
	
 
	$("#fileUpload2").click(function() {
		var maxTotalFileCount = "1";			 
		var filePath = G_reqImgPath;			 
		var thumbPath1 = G_reqThumb1Path;		 
		var thumbPath2 = "";					 
		var preFileName = "";					 
		var customValue = "";					 
		var uploadId = "fileUpload2";			 
		
		var jsonData = {
				"maxTotalFileCount" : maxTotalFileCount,
				"filePath" : filePath,
				"thumbPath1" : thumbPath1,
				"thumbPath2" : thumbPath2,
				"preFileName" : preFileName,
				"customValue" : customValue,
				"uploadId" : uploadId
			};
		Upload.imagePopOpen(jsonData);		 
	});
	
});


