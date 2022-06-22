$(document).ready(function(){
	
	$("input:text[numberOnly]").on("keyup", function() {
	    $(this).val($(this).val().replace(/[^0-9]/g,""));
	});
	
	$("#checkAll").click(function() {
		if($('#checkAll').is(':checked')){
			$("input[name=checkHreGenSeq]:checkbox").each(function() {
				if(!$(this).attr('disabled')){
					$(this).prop("checked", true);
				}
			});	
		}else{
			$("input[name=checkHreGenSeq]:checkbox").each(function() {
				$(this).prop("checked", false);
			});
		}
	});
	
	$("#fileName_regCd").text("No hay archivo seleccionado");
	$("#fileName_preCd").text("No hay archivo seleccionado");
	
	$('#btn-upload_regCd, #btn-upload_preCd').click(function(e){
		e.preventDefault();
		if($(this).attr('id') == 'btn-upload_regCd'){
			$("input:file[name=excelFile_regCd]").click();    
		} else if ($(this).attr('id') == 'btn-upload_preCd'){
			$("input:file[name=excelFile_preCd]").click(); 
		} else {
			return false;
		}
	});
	
	
	$('.searchDetail').on('click', function(){
		//location.href='/pih/pihRegInsFicha/generalPage.do?mvbGenSeq='+$(this).data('genSeq');
		//alert($(this).data('genSeq'));
		
		var genSeq = $(this).data('genSeq');
		$.ajax({
	        type: "POST",
	        url: '/pm/pmSrchAdvance/createSearchData.ajax',
	        dataType: "json",
	        data: {'hrtgSeq': genSeq, 'tpCd': 'HRE'},
	        error: function (request, status, error) {
	            alert("La comunicación del servidor falló." + error);
	        },
	        success: function (data) {
	            if (data.result > 0) {
	            	
	            	var arrHreGenSeq = [];
	            	$('.checkHreGenSeq').each(function(){
	            		arrHreGenSeq.push($(this).val());
	            	});
	            	
	            	var viewPageUrl = '/pih/pihRegInsFicha/popupGeneralPage.do';
	            	var popupId = 'generalViewPopup';
	            	var popupOps = 'toolbar=no,directories=no,scrollbars=no,resizable=no,status=no,menubar=no,width=1000,height=800,resizable=no,scrollbars=no';
	            	
	            	var gsWin = window.open('about:blank', popupId, popupOps);
	                var frm = document.forms.frmDetailView;
	                frm.action = viewPageUrl;
	                frm.target = popupId;
	                frm.method = "post";
	                
	                frm.elements.hreGenSeq.value = genSeq;
	                frm.elements.searchHreGenSeq.value = arrHreGenSeq.join(',');
	                
	                frm.submit();
	                /*
						var url    ='/pih/pihRegInsFicha/generalViewPage.do?hreGenSeq='+genSeq
						var title  = "GeneralPage";
						var status = "toolbar=no,directories=no,scrollbars=no,resizable=no,status=no,menubar=no,width=1000, height=800, resizable = no, scrollbars = no";
						 
						window.open(url, title, status); 
	                 * 
	                 * 
	                 * */
	            	
	            	
	            	
	            	//$('.checkHreGenSeq').serialize()
	            	
					//location.href='/pih/pihRegInsFicha/generalViewPage.do?hreGenSeq='+genSeq;
	            	
					//alert('view Page ::: '+seq)
	            }
	        }
	    });
	});
	
	
    $('.searchDelete').on('click', function(){
    	var searchSeq = $(this).data('searchSeq');
    	var _this = $(this);
		$.ajax({
            type: "POST",
            url: '/pih/pihSrchAdvance/deleteSearchData.ajax',
            dataType: "json",
            data: {'seq': searchSeq},
            error: function (request, status, error) {
                alert("La comunicación del servidor falló." + error);
            },
            success: function (data) {
                if (data.result > 0) {
					$(_this).closest('.textDelete').remove();
                }
            }
        });
    });
    
    $(document).on('click', '.excluirChk', function(){
		if($(this).is(':checked')){
			$(this).closest('tr').find('[name^=arrCheck]').val('Y');
		}else{
			$(this).closest('tr').find('[name^=arrCheck]').val('N');
		}
	});
	
    
	$(document).on('click', '.deleteCondition', function(i, v){
		$('#'+$(this).data('setName')).val('');
		$(this).closest('tr').remove();
		if($(this).data('setName') == 'srchClasficacion'){
			fn_callClassSpecCdAjax('');
		}
		if($(this).data('setName') == 'srchClasficacionEspecifica'){
			fnChangeEspecifica('');
		}
		
		$('[name=tbodyIdx]').each(function(i, v){
            v.textContent=i+1;
        });
	});
	
	
	$('#copySet').on('click', function(){
		
		var copyNum = $('#copyNumber').val();
		if(copyNum == ''){
			Common.alert("warning", GLB_MSG7);
			return false;
		}
		for(var i = 0; i < copyNum; i++){
			var genSeq = $('#iHreGenSeq').val();
			var url = "/pih/pihRegInsFicha/copyHreGenSeq.ajax";
			var reqData = {
				"I_HRE_GEN_SEQ" : genSeq
			};
			$('#layerPopup1').hide();
			Ajax.request(url, reqData, Common.alert("success", GLB_MSG3), '');
		}
	});
	
	
	$('.deleteBtn').on('click', function(){
		var _this = $(this);
		if(confirm(GLB_MSG4)){
			var genSeq = $(this).data('genSeq')		;
			//var genSeq = seq;
			var url = "/pih/pihRegInsFicha/delHreGenSeq.ajax";
			var reqData = {
					"HRE_GEN_SEQ" : genSeq
				};
			Ajax.request(url, reqData, function(data){
	            if(data.RESULT == "OK"){
	            	$(_this).closest('tr').remove();
	                Common.alert("success", data.MSG);
	                location.reload();
	            }else{
	            	Common.alert("warning", data.errorMessage);
	                return false;
	            }
	        }, '');
		}
	});
	
	/**
	 * verImage Click Event
	 */
	
	/**
	 * verImage Click Event
	 */
	$('#verImage').on('click', function(){
		if($('#verImage').is(':checked')){
			$('#imagenChk').val('Y')
			$('.verImages').removeClass('hide');
		}else{
			$('#imagenChk').val('N');
			$('.verImages').addClass('hide');
		}
	});

	//has value param block active
	$('.tabConWrap .tableWrap')
	.find(':input, select')
	.filter(function(){
		return $(this).is(':checkbox') ? $(this).prop('checked') : $(this).val() != '';
	})
	.each(function(){
		$(this).closest('div').prev().trigger('click');
	});
	
	$('.report_close').on('click', function(){
    	$(".loadingCloseType").addClass("hide");
	});
	
	if($("#detailSrchClasficacionEspecifica").val() != ""){
		fn_callClassSpecCdAjax($("#srchClasficacion").val())
	}
});


function fnFavorito() {
	var arrHrtgNo = new Array();
	$('[name=checkHreGenSeq]:checked').each(function(i,v){
		arrHrtgNo.push($(v).val());
    });
	var arrHrtgNoJson = JSON.stringify(arrHrtgNo);
	$.ajax({
        type: 'POST',
        url: '/pih/pihSrchAdvance/createFavorito.ajax',
        dataType: "json",
        data: {'tpCd': 'HRE', 'arrHrtgNo' : arrHrtgNoJson},
        error: function (request, status, error) {
            alert("La comunicación del servidor falló." + error);
        },
        success: function (data) {
        	if(data.result > 0){
        		Common.alert("success", data.successMessage);
            }else{
        		Common.alert("warning", GLB_MSG);
            }
        }
    });
}

function fnChangeFileName(val, gbn) {

	var agent = navigator.userAgent.toLowerCase();

	if(gbn == 'regCd'){
		if (!/\.(xls|xlsx)$/i.test(val)) {
			Common.alert('warning', errCantFileType);
	
			if ((navigator.appName == 'Netscape' && navigator.userAgent
					.search('Trident') != -1)
					|| (agent.indexOf("msie") != -1)) {
				
				$("#excelFile_regCd").replaceWith($('#excelFile_regCd').clone(true));
				$("#fileName_regCd").text('No hay archivo seleccionado');
				$('#excelFile_regCdChk').val('N');
			} else {
				
				$("#excelFile_regCd").val('');
				$("#fileName_regCd").text('No hay archivo seleccionado');
				$('#excelFile_regCdChk').val('N');
			}
			$('#fDelBtn_regCd').addClass('hide');
			return false;
		}
		
		$('#fDelBtn_regCd').removeClass('hide');
		var fileValue = val.split("\\");
		var fileName = fileValue[fileValue.length - 1];
		$('#fileName_regCd').text(fileName);
		$('#excelFile_regCdChk').val('Y');
	} else if('preCd'){
		if (!/\.(xls|xlsx)$/i.test(val)) {
			Common.alert('warning', errCantFileType);
	
			if ((navigator.appName == 'Netscape' && navigator.userAgent
					.search('Trident') != -1)
					|| (agent.indexOf("msie") != -1)) {
				
				$("#excelFile_preCd").replaceWith($('#excelFile_preCd').clone(true));
				$("#fileName_preCd").text('No hay archivo seleccionado');
				$('#excelFile_preCdChk').val('N');
			} else {
				
				$("#excelFile_preCd").val('');
				$("#fileName_preCd").text('No hay archivo seleccionado');
				$('#excelFile_preCdChk').val('N');
			}
			$('#fDelBtn_preCd').addClass('hide');
			return false;
		}
		
		$('#fDelBtn_preCd').removeClass('hide');
		var fileValue = val.split("\\");
		var fileName = fileValue[fileValue.length - 1];
		$('#fileName_preCd').text(fileName);
		$('#excelFile_preCdChk').val('Y');
	} else {
		return false;
	}
}

function fnAtchCancel(gbn) {
	
	if(gbn == 'regCd'){
		$('#fDelBtn_regCd').addClass('hide');
		var agent = navigator.userAgent.toLowerCase();

		if ((navigator.appName == 'Netscape' && navigator.userAgent
				.search('Trident') != -1)
				|| (agent.indexOf("msie") != -1)) {
			
			$("#excelFile_regCd").replaceWith($("#excelFile_regCd").clone(true));
			$("#fileName_regCd").text("No hay archivo seleccionado");
		} else {
			
			$("#excelFile_regCd").val("");
			$("#fileName_regCd").text("No hay archivo seleccionado");
		}
		$('#excelFile_regCdChk').val('N');
	} else if('preCd'){
		$('#fDelBtn_preCd').addClass('hide');
		var agent = navigator.userAgent.toLowerCase();

		if ((navigator.appName == 'Netscape' && navigator.userAgent
				.search('Trident') != -1)
				|| (agent.indexOf("msie") != -1)) {
			
			$("#excelFile_preCd").replaceWith($("#excelFile_preCd").clone(true));
			$("#fileName_preCd").text("No hay archivo seleccionado");
		} else {
			
			$("#excelFile_preCd").val("");
			$("#fileName_preCd").text("No hay archivo seleccionado");
		}
		$('#excelFile_preCdChk').val('N');
	} else {
		return false;
	}
}


function fn_callClassSpecCdAjax(selCd){
	if(selCd == ''){
		$('#srchClasficacionEspecifica').val('');
		$("select#srchClasficacionEspecifica option[value!='']").remove();
	}else{
		$("select#srchClasficacionEspecifica option[value!='']").remove();
		Common.codeMaker("srchClasficacionEspecifica", $("#detailSrchClasficacionEspecifica").val(), {"SQL_ID" : "HIP_STD_CODE_HRE_CLASS_SPEC", "P_CD" : selCd});
	}
}

function fn_callUbigeoDepth2Ajax(selCd){
	if(selCd ==''){
		$('#srchUbigeoDepth2').val('');
		$("select#srchUbigeoDepth2 option[value!='']").remove();
	}else{
		$("select#srchUbigeoDepth2 option[value!='']").remove();
		Common.codeMaker("srchUbigeoDepth2", $("#detailSrchUbigeoDepth2").val(), {"SQL_ID" : "CMM_UBIGEO_INFO_2DEPTH", "srchUbigeoDepth1" : selCd});
	}
}

function fn_callUbigeoDepth3Ajax(selCd){
	if(selCd ==''){
		$('#srchUbigeoDepth3').val('');
		$("select#srchUbigeoDepth3 option[value!='']").remove();
	}else{
		$("select#srchUbigeoDepth3 option[value!='']").remove();
		Common.codeMaker("srchUbigeoDepth3", $("#detailSrchUbigeoDepth3").val(), {"SQL_ID" : "CMM_UBIGEO_INFO_3DEPTH", "srchUbigeoDepth2" : selCd});
	}
}

function fnSearch() {
	$("#pageListSize").val($("#sbListSize").val());
	$("#pageIndex").val("1");
	// form submit
	$("#SRCH_FORM").attr("method", "post");
	
	if($('#excelFile_regCdChk').val() == 'Y' || $('#excelFile_preCdChk').val() == 'Y'){
		$("#SRCH_FORM").attr("enctype", 'multipart/form-data');
	} else {
		$("#SRCH_FORM").attr("enctype", '');
	}
	$("#SRCH_FORM").attr("action", GLO_PAGE_URL);
	$(".loadingWrap").show();
	$("#SRCH_FORM").submit();
}

function fnReset() {
	resetSearchForm();
	$('#conditionBody').html('');
}


function fnCheckPage(){
	var maxCnt = Math.ceil(rowTotalCnt / $('#sbListSize').val());
	if(maxCnt < $('#txtSrchPage').val()){
		Common.alert('warning', errMaxPage+maxCnt);
		$('#txtSrchPage').val($('#pageIndex').val());
		return false;	
	} else {
		fnGoToPage($('#txtSrchPage').val());	
	}
}


function fnExcelDown() {
	var strCols = "";
	var arrList = $('#excelTitleTextDiv').find('th');
	var arrLength = arrList.length;
	$.each(arrList, function(index, item){
		
		if(arrLength != index){
			strCols += $(item).text()+', ';	
		} else if (arrLength == index){
			strCols += $(item).text();
		}
	});
	
	$("#strCols").val(strCols);
	$("#SRCH_FORM").attr("method", "post");
	$("#SRCH_FORM").attr("action", "/pih/pihSrchAdvance/getHistoricoSrchXlsList.do?"+$("meta[name='_csrf_parameter']").attr("content")+'='+$('meta[name="_csrf"]').attr('content'));
	$("#SRCH_FORM").submit();
}

function fn_callPdfFile(){
	Report.request($("#reportUrl").val(), "checkHreGenSeq", "HRE", "FICHA");
}


function fn_callSubTipoAjax(selCd){
	if(selCd == ''){
		$('#srchSubtipo').val('');
		$("select#srchSubtipo option[value!='']").remove();
	}else{
		$("select#srchSubtipo option[value!='']").remove();
		Common.codeMaker("srchSubtipo", "", {"SQL_ID" : "HIP_STD_CODE_SUB_TIPO_HRE", "P_CD" : selCd});
	}
}

//Material(es) principal > Componente2 
function fn_callPrincipalCompDepth2Ajax(selCd){
	if(selCd == ''){
		$('#srchPrincipalComponente2').val('');
		$("select#srchPrincipalComponente2 option[value!='']").remove();
	}else{
		$("select#srchPrincipalComponente2 option[value!='']").remove();
		alert(selCd)
		Common.codeMaker("srchPrincipalComponente2", "", {"SQL_ID" : "HIP_STD_CODE_PRINCIPAL2_HRE", "P_CD" : selCd});
	}
}

//Material(es) principal > componente3, Material 
function fn_callPrincipalCompDepth3Ajax(selCd){
	if(selCd == ''){
		$('#srchPrincipalComponente3').val('');
		$('#srchPrincipalMaterial').val('');
		$("select#srchPrincipalComponente3 option[value!='']").remove();
		$("select#srchPrincipalMaterial option[value!='']").remove();
	}else{
		$("select#srchPrincipalComponente3 option[value!='']").remove();
		$("select#srchPrincipalMaterial option[value!='']").remove();


		if($('#srchPrincipalComponente2 option[value="'+ selCd +'"]').attr('data-ref') == 'Y'){
			Common.codeMaker("srchPrincipalComponente3", "", {"SQL_ID" : "HIP_STD_CODE_PRINCIPAL3_HRE", "P_CD" : selCd});
		}		
		Common.codeMaker("srchPrincipalMaterial", "", {"SQL_ID" : "HIP_STD_CODE_PRINCIPAL_MATERIAL_HRE", "P_CD" : selCd});
	}
}


//Material(es) secundario(s) > Componente2 
function fn_callSecundarioCompDepth2Ajax(selCd){
	if(selCd == ''){
		$('#srchSecundarioComponente2').val('');
		$("select#srchSecundarioComponente2 option[value!='']").remove();
	}else{
		$("select#srchSecundarioComponente2 option[value!='']").remove();
		Common.codeMaker("srchSecundarioComponente2", "", {"SQL_ID" : "HIP_STD_CODE_SECUNDARIO2_HRE", "P_CD" : selCd});
	}
}

//Material(es) secundario(s) > Material 
function fn_callSecundarioMaterialAjax(selCd){
	if(selCd == ''){
		$('#srchSecundarioMaterial').val('');
		$("select#srchSecundarioMaterial option[value!='']").remove();
	}else{
		$("select#srchSecundarioMaterial option[value!='']").remove();
		Common.codeMaker("srchSecundarioMaterial", "", {"SQL_ID" : "HIP_STD_CODE_SECUNDARIO_MATERIAL_HRE", "P_CD" : selCd});
	}
}


function fnGoFichaDetailView(seq) {
	var genSeq = seq;
	$.ajax({
        type: "POST",
        url: '/pm/pmSrchAdvance/createSearchData.ajax',
        dataType: "json",
        data: {'hrtgSeq': genSeq, 'tpCd': 'HRE'},
        error: function (request, status, error) {
            alert("La comunicación del servidor falló." + error);
        },
        success: function (data) {
            if (data.result > 0) {
            	
            	var arrHreGenSeq = [];
            	$('.checkHreGenSeq').each(function(){
            		arrHreGenSeq.push($(this).val());
            	});
            	
            	var viewPageUrl = '/pih/pihRegInsFicha/popupGeneralPage.do';
            	var popupId = 'generalViewPopup';
            	var popupOps = 'toolbar=no,directories=no,scrollbars=no,resizable=no,status=no,menubar=no,width=1000,height=800,resizable=no,scrollbars=no';
            	
            	var gsWin = window.open('about:blank', popupId, popupOps);
                var frm = document.forms.frmDetailView;
                frm.action = viewPageUrl;
                frm.target = popupId;
                frm.method = "post";
                
                frm.elements.hreGenSeq.value = genSeq;
                frm.elements.searchHreGenSeq.value = arrHreGenSeq.join(',');
                
                frm.submit();
                /*
					var url    ='/pih/pihRegInsFicha/generalViewPage.do?hreGenSeq='+genSeq
					var title  = "GeneralPage";
					var status = "toolbar=no,directories=no,scrollbars=no,resizable=no,status=no,menubar=no,width=1000, height=800, resizable = no, scrollbars = no";
					 
					window.open(url, title, status); 
                 * 
                 * 
                 * */
            	
            	
            	
            	//$('.checkHreGenSeq').serialize()
            	
				//location.href='/pih/pihRegInsFicha/generalViewPage.do?hreGenSeq='+genSeq;
            	
				//alert('view Page ::: '+seq)
            }
        }
    });
}


function fnGoFichaModPage(seq) {
	var genSeq = seq;
	location.href='/pih/pihRegInsFicha/nuevaFicha.do?hreGenSeq='+genSeq;
}


function fnGoFichaCopy(seq) {
	openPopup('layerPopup1');
	//$('#iHreGenSeq').val($(this).data('genSeq'));
	$('#iHreGenSeq').val(seq);
}


function fnGoFichaDelete(seq) {
	var _this = $(this);
	if(confirm(GLB_MSG4)){
		var genSeq = seq;
		var url = "/pih/pihRegInsFicha/delHreGenSeq.ajax";
		var reqData = {
				"HRE_GEN_SEQ" : genSeq
			};
		$('#layerPopup1').hide();
		Ajax.request(url, reqData, _this.closest('tr').remove(), "");
	}
}


$(document).on('dp.change', 'input.setCondition', function() {
	setDatePicker(this);
});


$(document).on('change', '.setCondition', function(){
	setDatePicker(this);
});


function setDatePicker(_this){
	var setValue = '';
    //var  index = $('#conditionBody>tr').length;
	var index = eval($('#conditionCount').val()) + 1;
    var activeName = $(_this).data('setActiveName');
    var termName = $(_this).data('termName');
    var termType = $(_this).data('termType');

    $('[name^=arrName]').each(function(i,v){
    	if(activeName == $(v).val()){
    		$(v).closest('tr').remove();
        }
	});

    var _html = $('#conditionBody').html();

    if($(_this).is('select')){
    	if($('#'+$(_this).data('setName')+' option:selected').val() == ''){
    		$('[name=tbodyIdx]').each(function(i, v){
	            v.textContent=i+1;
	        });
    		return false;
        }
    	setValue = $('#'+$(_this).data('setName')+' option:selected').text();
    }

    if($(_this).is('input:text')){
    	if($(_this).val() == ''){
    		$('[name=tbodyIdx]').each(function(i, v){
	            v.textContent=i+1;
	        });
    		return false;
        }
    	setValue = $(_this).val();
    }

    if($(_this).is('input:radio')){
    	if($(_this).val() == ''){
    		$('[name=tbodyIdx]').each(function(i, v){
	            v.textContent=i+1;
	        });
    		return false;
        }
    	setValue = $(_this).data('setValue');
    }

	_html += '<tr>';
    _html +=    '<input type="hidden" name="arrName['+index+']" id="arrName['+index+']" value="'+$(_this).data('setActiveName')+'" />';
    _html +=    '<input type="hidden" name="arrTitle['+index+']" id="arrTitle['+index+']" value="'+$(_this).data('setTitle')+'" />';
    if(termType == 'start'){

        _html +=    '<input type="hidden" name="arrValue['+index+']" id="arrValue['+index+']" value="'+setValue+' ~ '+$('#'+termName).val()+'" />';
    }else if(termType == 'end'){

    	_html +=    '<input type="hidden" name="arrValue['+index+']" id="arrValue['+index+']" value="'+$('#'+termName).val()+' ~ '+setValue+'" />';
    }else{

    	_html +=    '<input type="hidden" name="arrValue['+index+']" id="arrValue['+index+']" value="'+setValue+'" />';
    }
    _html +=    '<input type="hidden" name="arrCheck['+index+']" id="arrCheck['+index+']" value="N" />';
    _html +=    '<input type="hidden" name="arrOptionName['+index+']" id="arrOptionName['+index+']" value="'+$(_this).data('setName')+'" />';
	_html += 	'<td name="tbodyIdx"></td>';
	_html += 	'<td class="left">'+$(_this).data('setTitle')+'</td>';
	if(termType == 'start'){

		_html += 	'<td class="left">'+setValue+' ~ '+$('#'+termName).val()+'</td>';
	}else if(termType == 'end'){

		_html += 	'<td class="left">'+$('#'+termName).val()+' ~ '+setValue+'</td>';
	}else{

		_html += 	'<td class="left">'+setValue+'</td>';
	}
	_html += 	'<td class="left">';
	_html += 		'<label class="selectLabel clf">';
	_html += 			'<input class="excluirChk" type="checkbox" id="'+$(_this).data('setActiveName')+'" name="'+$(_this).data('setActiveName')+'" value="Y" />';
	_html += 			'<span>Excluir búsqueda</span>';
	_html += 		'</label>';
	_html += 	'</td>';
	_html += 	'<td>';
	_html += 		'<div class="dt-list-control">';
	_html += 			'<span class="dt-list-edit deleteCondition" data-set-name="'+$(_this).data('setName')+'"><i class="xi-trash"></i></span>';
	_html += 		'</div>';
	_html += 	'</td>';
	_html += '</tr>';
	$('#conditionBody').html(_html);

	$('[name=tbodyIdx]').each(function(i, v){
        v.textContent=i+1;
    });
	
	$('#conditionCount').val(index);
}


function resetSearchForm(){
	deleteArrName('srchRegCdYn');
	deleteArrName('srchPreCdYn');
	deleteArrName('srchEstadoYn');
	deleteArrName('srchConditionCulturalYn');
	deleteArrName('srchClasficacionYn');
	deleteArrName('srchClasficacionEspecificaYn');
	deleteArrName('srchNombreYn');
	deleteArrName('srchUbigeoDepth1Yn');
	deleteArrName('srchUbigeoDepth2Yn');
	deleteArrName('srchUbigeoDepth3Yn');
	deleteArrName('srchViaCdYn');
	deleteArrName('srchViaNmYn');
	deleteArrName('srchViaNoYn');
	deleteArrName('srchAutoriaYn');
	deleteArrName('srchCronologiaYn');
	deleteArrName('srchEstiloYn');
	deleteArrName('srchTipoArquitecturaYn');
	deleteArrName('srchSubtipoYn');
	deleteArrName('srchUsoOriginalYn');
	deleteArrName('srchUsoActualYn');
	deleteArrName('srchOtrosNombresYn');
	deleteArrName('srchUbicacionYn');
	deleteArrName('srchTramaUrbanaYn');
	deleteArrName('srchPrincipalComponente1Yn');
	deleteArrName('srchPrincipalComponente2Yn');
	deleteArrName('srchPrincipalComponente3Yn');
	deleteArrName('srchPrincipalMaterialYn');
	deleteArrName('srchSecundarioComponente1Yn');
	deleteArrName('srchSecundarioComponente2Yn');
	deleteArrName('srchSecundarioMaterialYn');
	deleteArrName('srchTecnicasYn');
	deleteArrName('srchDelimitacionObjNormaYn');
	deleteArrName('srchDelimitacionLegalYn');
	deleteArrName('srchDelimitacionNumeroYn');
	deleteArrName('srchDelimitacionFechaStartDtYn');
	deleteArrName('srchDelimitacionFechaEndDtYn');
	deleteArrName('srchDelimitacionPubStartDtYn');
	deleteArrName('srchDelimitacionPubEndDtYn');
	deleteArrName('srchNacionalObjNormaYn');
	deleteArrName('srchNacionalLegalYn');
	deleteArrName('srchNacionalNumeroYn');
	deleteArrName('srchNacionalFechaStartDtYn');
	deleteArrName('srchNacionalFechaEndDtYn');
	deleteArrName('srchNacionalPubStartDtYn');
	deleteArrName('srchNacionalPubEndDtYn');
	deleteArrName('srchInternacionalNombreDocYn');
	deleteArrName('srchInternacionalPubStartDtYn');
	deleteArrName('srchInternacionalPubEndDtYn');
	deleteArrName('srchCulturalIdentificadosYn');
	deleteArrName('srchCulturalDescripcionYn');
	deleteArrName('srchPropiedadPropietarioYn');
	deleteArrName('srchPropiedadNombreYn');
	deleteArrName('srchIntegridadYn');
	deleteArrName('srchConservacionYn');
	deleteArrName('srchRdDeSancionYn');
	deleteArrName('srchInformeYn');
	deleteArrName('srchFechaDePubStartDtYn');
	deleteArrName('srchFechaDePubEndDtYn');
	deleteArrName('srchInvestigacionTituloYn');
	deleteArrName('srchInvestigacionFechaStartDtYn');
	deleteArrName('srchInvestigacionFechaEndDtYn');
	deleteArrName('srchBibliografia1Yn');
	deleteArrName('srchGabineteYn');

	$('input[type=text]').not('#txtSrchPage').val('');
	$('input[type=checkbox]').prop('checked', false);

	$('select').find('option:first').attr('selected', 'selected');

	$('#excelFile_regCdChk').val('N');
	$('#excelFile_preCdChk').val('N');

	fnSearch();
}


function deleteArrName(arrName){
	$('[name^=arrName]').each(function(i,v){
        if(arrName == $(v).val()){
            $(v).closest('tr').remove();
        }
	});

	$('[name=tbodyIdx]').each(function(i, v){
        v.textContent=i+1;
    });
}


function fnChangeEspecifica(selCd){
	
	if(selCd != ''){
		if($('#srchClasficacionEspecifica option[value="'+ selCd +'"]').attr('data-ref') == '1'){
			$('#autoriaTB').addClass('hide');
			$('#srchAutoria').val('');
			$('#chkAutoria').prop('checked', false);
			deleteArrName('srchAutoriaYn');
			
			$('#cronologiaTB').addClass('hide');
			$('#chkCronologia').prop('checked', false);
			$('#srchCronologia').val('');
			deleteArrName('srchCronologiaYn');
			
			$('#estiloTb').addClass('hide');
			$('#chkEstilo').prop('checked', false);
			$('#srchEstilo').val('');
			deleteArrName('srchEstiloYn');
			
			$('#tipodebienTB').addClass('hide');
			$('#chkTipoDeBien').prop('checked', false);
			$('#srchTipoArquitectura').val('');
			$('#srchSubtipo').val('');
			deleteArrName('srchTipoArquitecturaYn');
			deleteArrName('srchSubtipoYn');
			
			$('#usosTB').addClass('hide');
			$('#chkUsos').prop('checked', false);
			$('#srchUsoOriginal').val('');
			$('#srchUsoActual').val('');
			deleteArrName('srchUsoOriginalYn');
			deleteArrName('srchUsoActualYn');
			
			$('#otrosnombresTB').addClass('hide');
			$('#chkOtrosNombres').prop('checked', false);
			$('#srchOtrosNombres').val('');
			deleteArrName('srchOtrosNombresYn');
			
			
			$('#tramaurbanaTB').addClass('hide');
			$('#chkTramaUrbana').prop('checked', false);
			$('#srchTramaUrbana').val('');
			deleteArrName('srchTramaUrbanaYn');
			
			$('#principalTB').addClass('hide');
			$('#chkMaterialPrincipal').prop('checked', false);
			$('#srchPrincipalComponente1').val('');
			$('#srchPrincipalComponente2').val('');
			$('#srchPrincipalComponente3').val('');
			$('#srchPrincipalMaterial').val('');
			deleteArrName('srchPrincipalComponente1Yn');
			deleteArrName('srchPrincipalComponente2Yn');
			deleteArrName('srchPrincipalComponente3Yn');
			deleteArrName('srchPrincipalMaterialYn');
			
			$('#secundarioTB').addClass('hide');
			$('#chkMaterialSecundario').prop('checked', false);
			$('#srchSecundarioComponente1').val('');
			$('#srchSecundarioComponente2').val('');
			$('#srchSecundarioMaterial').val('');
			deleteArrName('srchSecundarioComponente1Yn');
			deleteArrName('srchSecundarioComponente2Yn');
			deleteArrName('srchSecundarioMaterialYn');
			
			$('#tecnicasTB').addClass('hide');
			$('#chkTecnicas').prop('checked', false);
			$('#srchTecnicas').val('');
			deleteArrName('srchTecnicasYn');
			
			$('#propiedadDIV').addClass('hide');
			$('#chkPropiedadPropietario').prop('checked', false);
			$('#srchPropiedadNombre').prop('checked', false);
			$('#srchPropiedadPropietario').val('');
			$('#srchPropiedadNombre').val('');
			deleteArrName('srchPropiedadPropietarioYn');
			deleteArrName('srchPropiedadNombreYn');
			
		} else {
			$('#autoriaTB').removeClass('hide');
			$('#cronologiaTB').removeClass('hide');
			$('#estiloTb').removeClass('hide');
			$('#tipodebienTB').removeClass('hide');
			$('#usosTB').removeClass('hide');
			$('#otrosnombresTB').removeClass('hide');
			$('#tramaurbanaTB').removeClass('hide');
			$('#principalTB').removeClass('hide');
			$('#secundarioTB').removeClass('hide');
			$('#tecnicasTB').removeClass('hide');
			$('#propiedadDIV').removeClass('hide');
		}	
	} else {
		$('#autoriaTB').removeClass('hide');
		$('#cronologiaTB').removeClass('hide');
		$('#estiloTb').removeClass('hide');
		$('#tipodebienTB').removeClass('hide');
		$('#usosTB').removeClass('hide');
		$('#otrosnombresTB').removeClass('hide');
		$('#tramaurbanaTB').removeClass('hide');
		$('#principalTB').removeClass('hide');
		$('#secundarioTB').removeClass('hide');
		$('#tecnicasTB').removeClass('hide');
		$('#propiedadDIV').removeClass('hide');
	}
		
}

$(window).load(function(){
	if($("#detailSrchUbigeoDepth1").val() != "" && $("#detailSrchUbigeoDepth2").val() != ""){
		fn_callUbigeoDepth2Ajax($("#detailSrchUbigeoDepth1").val());
		
		if($("#detailSrchUbigeoDepth2").val() != "" && $("#detailSrchUbigeoDepth3").val() != ""){
			fn_callUbigeoDepth3Ajax($("#detailSrchUbigeoDepth2").val());
		}
	}
	
	if($("#detailSrchClasficacionEspecifica").val() != ""){
		fnChangeEspecifica($("#detailSrchClasficacionEspecifica").val());
	}
});