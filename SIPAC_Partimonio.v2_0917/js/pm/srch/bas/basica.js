 
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
    	
    	if($(_this).data('setName') == "exhOrgSeq"){
    		setValue = $('#'+$(_this).data('setName')+' option:selected').data('setData');
    	}else{
    		setValue = $('#'+$(_this).data('setName')+' option:selected').text();
    	}
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
    
    //setValue.replace(/\"/gi, "");

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

/**
 * Denominación Option Event
 * @param pCd
 */
function appendDenominacion(pCd) {
    var dnmnt1Cd = $('#detaildnmnt1Cd').val();
    if(pCd == ''){
    	var _html = '<option value=\"\" >--Seleccione--</option>';
    	$('#dnmnt1Cd').html(_html);
    }else{
	    Code.stdCodeList('Y', 'MVB', '009', pCd, '', '', function (result) {
	        var _html = '<option value=\"\" >--Seleccione--</option>';
	        result.forEach(function (v, i) {
	            if (dnmnt1Cd == v.stdCd) {
	                _html += '<option value=\"' + v.stdCd + '\" selected '+'data-set-data='+v.cdSpnNm+'>' + v.cdSpnNm + '</option>';
	            } else {
	                _html += '<option value=\"' + v.stdCd + '\" '+'data-set-data='+v.cdSpnNm+'>' + v.cdSpnNm + '</option>';
	            }
	        });
	        $('#dnmnt1Cd').html(_html);
	    });
    }
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

/**
 *  Clasificación específica 
 */
function changeEspecifica(){
	 /**
     *  Prehispánico, Histórico-Artístico, Entográfico, Industrial Event
     * Class Name :  pheiGrp
     */
    if($('#classSpecCd').val() == '00500002' || $('#classSpecCd').val() == '00500003' || $('#classSpecCd').val() == '00500004' || $('#classSpecCd').val() == '00500005' || $('#classSpecCd').val() == '00500006' || $('#classSpecCd').val() == '00500007' || $('#classSpecCd').val() == '00500008' || $('#classSpecCd').val() == '00500009' || $('#classSpecCd').val() == '00500010' || $('#classSpecCd').val() == '00500011'){
    	$('.pheiGrp').removeClass('hide');
    	$('.dirGrp').removeClass('hide');

    	var detailTpGoodCd = '';
        if($('#detailTipoDeBien').val() != ''){
            detailTpGoodCd = $('#detailTipoDeBien').val();
        }
    	//Tipo de bien  
	    if($('#classSpecCd').val() == ''){
	    	var _html = '<option value=\"\" >--Seleccione--</option>';
	    	$('#tipoDeBien').html(_html);
	    }else{
	    	Code.stdCodeList('Y', 'MVB', '006', $('#classSpecCd').val(), '', '',function(result){
		    var _html = '<option value=\"\" >--Seleccione--</option>';
		        result.forEach(function(v, i){
		            if(detailTpGoodCd == v.stdCd){
		                _html += '<option value=\"'+v.stdCd+'\" selected '+'data-set-data='+v.cdSpnNm+'>'+v.cdSpnNm+'</option>';
		            }else{
		                _html += '<option value=\"'+v.stdCd+'\" '+'data-set-data='+v.cdSpnNm+'>'+v.cdSpnNm+'</option>';
		            }
		        });
		        $('#tipoDeBien').html(_html);
		    });
	    }
	    
	  //Material principal  
	    if($('#classSpecCd').val() == ''){
	    	var _html = '<option value=\"\" >--Material--</option>';
	    	$('#mtrlCd').html(_html);
	    }else{
	        Code.stdCodeList('Y', 'MVB', '027', $('#classSpecCd').val(), '', '',function(result){
		    var _html = '<option value=\"\" >--Material--</option>';
		        result.forEach(function(v, i){
		            if($('#detailMtrlCd').val() == v.stdCd){
		                _html += '<option value=\"'+v.stdCd+'\" selected '+'data-set-data='+v.cdSpnNm+'>'+v.cdSpnNm+'</option>';
		            }else{
		                _html += '<option value=\"'+v.stdCd+'\" '+'data-set-data='+v.cdSpnNm+'>'+v.cdSpnNm+'</option>';
		            }
		        });
		        $('#mtrlCd').html(_html);
		        if($('#detailTpMtrlCd').val() != ''){
					changeMtrlCd();
				}
		    });
        }

         //Material secundario 
	    if($('#classSpecCd').val() == ''){
	    	var _html = '<option value=\"\" >--Material--</option>';
	    	$('#subMtrlCd').html(_html);
	    }else{
	        Code.stdCodeList('Y', 'MVB', '027', $('#classSpecCd').val(), '', '',function(result){
		    var _html = '<option value=\"\" >--Material--</option>';
		        result.forEach(function(v, i){
		            if($('#detailSubMtrlCd').val() == v.stdCd){
		                _html += '<option value=\"'+v.stdCd+'\" selected '+'data-set-data='+v.cdSpnNm+'>'+v.cdSpnNm+'</option>';
		            }else{
		                _html += '<option value=\"'+v.stdCd+'\" '+'data-set-data='+v.cdSpnNm+'>'+v.cdSpnNm+'</option>';
		            }
		        });
		        $('#subMtrlCd').html(_html);
		        if($('#detailSubTpMtrlCd').val() != ''){
					changeSubMtrlCd();
		        }
		    });
        }

        //Técnicas  
        if($('#detailTechCd').val() != ''){
	        changeTecnicasCd();
	    }
    }else{
    	$('.pheiGrp').addClass('hide');
    }

	/**
	 * Paleontológico
	 */
	if($('#classSpecCd').val() == '00500001') {
		if($('#chronoGeoCd').val() != ''){
			changeChronoGeoCd();
		}
		if($('#txnmPhCd').val() != ''){
			changeReino();
		}
        appendDenominacion($('#classSpecCd').val());
        $('.palGrp').removeClass('hide');
        $('.dirGrp').removeClass('hide');
    }else{
    	$('.palGrp').addClass('hide');
    }

	/**
	 * Histórico-Artístico, Entográfico, Industrial
	 */
    if($('#classSpecCd').val() == '00500003' || $('#classSpecCd').val() == '00500004' || $('#classSpecCd').val() == '00500005' || $('#classSpecCd').val() == '00500006' || $('#classSpecCd').val() == '00500007' || $('#classSpecCd').val() == '00500008' || $('#classSpecCd').val() == '00500009' || $('#classSpecCd').val() == '00500010' || $('#classSpecCd').val() == '00500011'){
		$('.heiGrp').removeClass('hide');
    }else{
    	$('.heiGrp').addClass('hide');
    }

    /**
	 * Histórico-Artístico, Entográfico
	 */
    if($('#classSpecCd').val() == '00500003' || $('#classSpecCd').val() == '00500004' || $('#classSpecCd').val() == '00500006' || $('#classSpecCd').val() == '00500007' || $('#classSpecCd').val() == '00500008' || $('#classSpecCd').val() == '00500010'){
		$('.heGrp').removeClass('hide');
		if($('#detailTpAuthCd').val() != ''){
			changeAutoria();
		}
    }else{
    	$('.heGrp').addClass('hide');
    }
    
    /**
	 * Prehispánico, Histórico - artístico
	 */
	if($('#classSpecCd').val() == '00500002' || $('#classSpecCd').val() == '00500003' || $('#classSpecCd').val() == '00500006' || $('#classSpecCd').val() == '00500007'){
		$('.phGrp').removeClass('hide');
		if($('#classSpecCd').val() == ''){
			var _html = '<option value=\"\" >--Seleccione--</option>';
			$('#styleCd').html(_html);
		}else{
			Code.stdCodeList('Y', 'MVB', '021', $('#classSpecCd').val(), '', '', function(result){
	            var _html = '<option value=\"\" >--Seleccione--</option>';
	            result.forEach(function(v, i){
	                _html += '<option value=\"'+v.stdCd+'\">'+v.cdSpnNm+'</option>';
	            });
	            $('#styleCd').html(_html);
	            if($('#detailStyleCd').val() != ''){
	                $('#styleCd').val($('#detailStyleCd').val());
	            }
	        });
		}
	}else{
		$('#styleCd').html('<option value=\"\" >--Seleccione--</option>');
		$('.phGrp').addClass('hide');
	}

	/**
	 * Industrial
	 */
	if($('#classSpecCd').val() == '00500005' || $('#classSpecCd').val() == '00500009' || $('#classSpecCd').val() == '00500011'){
		$('.induGrp').removeClass('hide');
    }else{
    	$('.induGrp').addClass('hide');
    }

	/**
	 * Etnográfico
	 */
	if($('#classSpecCd').val() == '00500004' || $('#classSpecCd').val() == '00500008' || $('#classSpecCd').val() == '00500010'){
		$('.etnGrp').removeClass('hide');
    }else{
    	$('.etnGrp').addClass('hide');
    }


	/**
	 * Prehispánico
	 */
	if($('#classSpecCd').val() == '00500002'){
		$('.preGrp').removeClass('hide');
	}else{
		$('.preGrp').addClass('hide');
	}

	/**
	 *  Paleontológica, Prehispánico, Histórico-Artístico, industrial
	 */
	if($('#classSpecCd').val() == '00500001' || $('#classSpecCd').val() == '00500002' || $('#classSpecCd').val() == '00500003' || $('#classSpecCd').val() == '00500006' || $('#classSpecCd').val() == '00500007' || $('#classSpecCd').val() == '00500005' || $('#classSpecCd').val() == '00500009' || $('#classSpecCd').val() == '00500011'){
		$('.pphiGrp').removeClass('hide');
	}else{
		$('.pphiGrp').addClass('hide');
	}

	if($('#classSpecCd').val() == ''){
		$('.changeHide').removeClass('hide');
	}
}



 
function resetSearchForm(){
	deleteArrName('tipoDeBienYn');
	deleteArrName('dnmnt1CdYn');
	deleteArrName('cientificoYn');
	deleteArrName('tpAuthCdYn');
	deleteArrName('authCdYn');
	deleteArrName('cultureYn');
	deleteArrName('styleCdYn');
	deleteArrName('ethnCdYn');
	deleteArrName('chronoGeoCdYn');
	deleteArrName('datingCdYn');
	deleteArrName('periodoYn');
	deleteArrName('txnmKdCdYn');
	deleteArrName('txnmPhCdYn');
	deleteArrName('othSpnNmYn');
	deleteArrName('prodPlcCdYn');
	deleteArrName('titleSpnNmYn');
	deleteArrName('mtrlCdYn');
	deleteArrName('subMtrlCdYn');
	deleteArrName('techCdYn');
	deleteArrName('tpFossilCdYn');
	deleteArrName('cnsvtCdYn');
	deleteArrName('intgCdYn');
	deleteArrName('geogrpAreaCdYn');
	deleteArrName('geogrpRefSpnNmYn');
	deleteArrName('tpProvCdYn');
	deleteArrName('classProvCdYn');
	deleteArrName('dnmntLctOrgn1CdYn');
	deleteArrName('dnmntLctOrgn2CdYn');
	deleteArrName('excvtIsYn');
	deleteArrName('archTpCdYn');
	deleteArrName('archRelDtYn');
	deleteArrName('ownCdYn');
	deleteArrName('tpOwnCdYn');
	deleteArrName('fmAcqCdYn');
	deleteArrName('custoCdYn');
	deleteArrName('nmLctCdYn');
	deleteArrName('ubigeoNo1Yn');
	deleteArrName('ubigeoNo2Yn');
	deleteArrName('ubigeoNo3Yn');
	deleteArrName('situationCdYn');
	deleteArrName('prevRegCdMincuNoYn');
	deleteArrName('ownCdSpnNmYn');
	deleteArrName('incCdSpnNmYn');
	deleteArrName('invtyCdSpnNmYn');
	deleteArrName('othCdSpnNmYn');
	deleteArrName('declNormDtYn');
	deleteArrName('acrhProyectoYn');
	deleteArrName('bibliographyCdYn');
	deleteArrName('fieldFileCdYn');
	deleteArrName('fieldRecDtYn');
	deleteArrName('photoCdYn');
	deleteArrName('photoTakeDtYn');
	deleteArrName('createUserSeqYn');
	deleteArrName('createDateYn');
	deleteArrName('modifyUserSeqYn');
	deleteArrName('modifyDateYn');
	deleteArrName('apprUserIdYn');
	deleteArrName('apprDtYn');
	deleteArrName('tpDocCdChk');
	deleteArrName('docNoYn');
	deleteArrName('docDtYn');
	deleteArrName('exhOrgSeqYn');
	deleteArrName('ntnlRegCdNoYn');
	deleteArrName('preRegNoYn');


	$('#tipoDeBien').val('');
	$('#dnmnt1Cd').val('');
	$('#cientifico').val('');
	$('#authCd').val('');
	$('#tpAuthCd').val('');
	$('#txnmKdCd').val('');
	$('#txnmPhCd').val('');
	$('#culture').val('');
	$('#styleCd').val('');
	$('#ethnCd').val('');
	$('#chronoGeoCd').val('');
	$('#cronoPeriodo').val('');
	$('#periodo').val('');
	$('#othSpnNm').val('');
	$('#prodPlcCd').val('');
	$('#titleSpnNm').val('');
	$('#mtrlCd').val('');
	$('#tpMtrlCd').val('');
	$('#subMtrlCd').val('');
	$('#subTpMtrlCd').val('');
	$('#tecnicasCd').val('');
	$('#techCd').val('');
	$('#tpFossilCd').val('');
	$('#cnsvtCd').val('');
	$('#intgCd').val('');
	$('#geogrpAreaCd').val('');
	$('#geogrpRefSpnNm').val('');
	$('#tpProvCd').val('');
	$('#classProvCd').val('');
	$('#dnmntLctOrgn1Cd').val('');
	$('#dnmntLctOrgn2Cd').val('');
	$('#archTpCd').val('');
	$('#archRelDt').val('');
	$('#ownCd').val('');
	$('#tpOwnCd').val('');
	$('#fmAcqCd').val('');
	$('#custoCd').val('');
	$('#localizacion').val('');
	$('#nmLctCd').val('');
	$('#ubigeoNo1').val('');
	$('#ubigeoNo2').val('');
	$('#ubigeoNo3').val('');
	$('#prevRegCdMincuNo').val('');
	$('#ownCdSpnNm').val('');
	$('#incCdSpnNm').val('');
	$('#invtyCdSpnNm').val('');
	$('#othCdSpnNm').val('');
	$('#strDeclNormDt').val('');
	$('#endDeclNormDt').val('');
	$('#acrhProyecto').val('');
	$('#bibliographyCd').val('');
	$('#fieldFileCd').val('');
	$('#strFieldRecDt').val('');
	$('#endFieldRecDt').val('');
	$('#photoCd').val('');
	$('#strPhotoTakeDt').val('');
	$('#endPhotoTakeDt').val('');
	$('#createUserSeq').val('');
	$('#strCreateDate').val('');
	$('#endCreateDate').val('');
	$('#modifyUserSeq').val('');
	$('#strModifyDate').val('');
	$('#endModifyDate').val('');
	$('#apprUserId').val('');
	$('#strApprDt').val('');
	$('#endApprDt').val('');
	$('#tpDocCd').val('');
	$('#docNo').val('');
	$('#strDocDt').val('');
	$('#endDocDt').val('');
	$('#exhOrgSeq').val('');
	$('#strNtnlRegCdNo').val('');
	$('#endNtnlRegCdNo').val('');
	$('#strPreRegNo').val('');
	$('#endPreRegNo').val('');


	$('[name=cientificoChk]').attr('checked', false);
	$('[name=tpAuthCdChk]').attr('checked', false);
	$('[name=cultureChk]').attr('checked', false);
	$('[name=txnmKdCdChk]').attr('checked', false);
	$('[name=txnmPhCdChk]').attr('checked', false);
	$('[name=styleCdChk]').attr('checked', false);
	$('[name=ethnCdChk]').attr('checked', false);
	$('[name=chronoGeoCdChk]').attr('checked', false);
	$('[name=datingCdChk]').attr('checked', false);
	$('[name=datingCd]').attr('checked', false);
	$('[name=periodoChk]').attr('checked', false);
	$('[name=othSpnNmChk]').attr('checked', false);
	$('[name=prodPlcCdChk]').attr('checked', false);
	$('[name=mtrlCdChk]').attr('checked', false);
	$('[name=subMtrlCdChk]').attr('checked', false);
	$('[name=techCdChk]').attr('checked', false);
	$('[name=tpFossilCdChk]').attr('checked', false);
	$('[name=dimensionesChk]').attr('checked', false);
	$('[name=adicionalChk]').attr('checked', false);
	$('[name=intgCdChk]').attr('checked', false);
	$('[name=cnsvtCdChk]').attr('checked', false);
	$('[name=geogrpAreaCdChk]').attr('checked', false);
	$('[name=geogrpRefSpnNmChk]').attr('checked', false);
	$('[name=tpProvCdChk]').attr('checked', false);
	$('[name=classProvCdChk]').attr('checked', false);
    $('[name=dnmntLctOrgnCdChk]').attr('checked', false);
    $('[name=excvtYnChk]').attr('checked', false);
    $('[name=excvtYn]').attr('checked', false);
    $('[name=archTpCdChk]').attr('checked', false);
    $('[name=archRelDtChk]').attr('checked', false);
    $('[name=ownCdChk]').attr('checked', false);
    $('[name=tpOwnCdChk]').attr('checked', false);
    $('[name=fmAcqCdChk]').attr('checked', false);
    $('[name=custoCdChk]').attr('checked', false);
    $('[name=nmLctCdChk]').attr('checked', false);
    $('[name=direccionChk]').attr('checked', false);
    $('[name=specLctSpnNmChk]').attr('checked', false);
    $('[name=ubigeoNoChk]').attr('checked', false);
    $('[name=situationCdChk]').attr('checked', false);
    $('[name=situationCd]').attr('checked', false);
    $('[name=prevRegCdMincuNoChk]').attr('checked', false);
    $('[name=ownCdSpnNmChk]').attr('checked', false);
    $('[name=incCdSpnNmChk]').attr('checked', false);
    $('[name=invtyCdSpnNmChk]').attr('checked', false);
    $('[name=othCdSpnNmChk]').attr('checked', false);
    $('[name=declPtrmValSpnNmChk]').attr('checked', false);
    $('[name=declPtrmCulSpnNmChk]').attr('checked', false);
    $('[name=declNormDtChk]').attr('checked', false);
    $('[name=preRegNoChk]').attr('checked', false);
    $('[name=acrhProyectoChk]').attr('checked', false);
    $('[name=bibliographyCdChk]').attr('checked', false);
    $('[name=fieldFileCdChk]').attr('checked', false);
    $('[name=fieldRecDtChk]').attr('checked', false);
    $('[name=photoCdChk]').attr('checked', false);
    $('[name=photoTakeDtChk]').attr('checked', false);
    $('[name=createUserSeqChk]').attr('checked', false);
    $('[name=createDateChk]').attr('checked', false);
    $('[name=modifyUserSeqChk]').attr('checked', false);
    $('[name=modifyDateChk]').attr('checked', false);
    $('[name=apprUserIdChk]').attr('checked', false);
    $('[name=apprDtChk]').attr('checked', false);
    $('[name=tpDocCdChk]').attr('checked', false);
    $('[name=docNoChk]').attr('checked', false);
    $('[name=docDtChk]').attr('checked', false);
    $('[name=exhOrgSeqChk]').attr('checked', false);
}

function resetSearchForm1(){
	deleteArrName('tipoDeBienYn');
	deleteArrName('dnmnt1CdYn');
	deleteArrName('titleSpnNmYn');
	deleteArrName('othSpnNmYn');
	deleteArrName('cientificoYn');
	deleteArrName('txnmKdCdYn');
	deleteArrName('txnmPhCdYn');
	deleteArrName('prodPlcCdYn');
	deleteArrName('tpAuthCdYn');
	deleteArrName('authCdYn');
	deleteArrName('makerCdYn');
	deleteArrName('cultureYn');
	deleteArrName('styleCdYn');
	deleteArrName('ethnCdYn');
	deleteArrName('chronoGeoCdYn');
	deleteArrName('cronoPeriodoYn');
	deleteArrName('datingCdYn');
	deleteArrName('periodoYn');
	deleteArrName('mtrlCdYn');
	deleteArrName('tpMtrlCdYn');
	deleteArrName('subMtrlCdYn');
	deleteArrName('subTpMtrlCdYn');
	deleteArrName('techCdYn');
	deleteArrName('tpFossilCdYn');

	$('#tipoDeBien').val('');
	$('#dnmnt1Cd').val('');
	$('#titleSpnNm').val('');
	$('#othSpnNm').val('');
	$('#cientifico').val('');
	$('#txnmKdCd').val('');
	$('#txnmPhCd').val('');
	$('#tpAuthCd').val('');
	$('#authCd').val('');
	$('#makerCd').val('');
	$('#prodPlcCd').val('');
	$('#culture').val('');
	$('#styleCd').val('');
	$('#ethnCd').val('');
	$('#chronoGeoCd').val('');
	$('#cronoPeriodo').val('');
	$('#datingCd').val('');
	$('#periodo').val('');
	$('#mtrlCd').val('');
	$('#tpMtrlCd').val('');
	$('#subMtrlCd').val('');
	$('#subTpMtrlCd').val('');
	$('#tecnicasCd').val('');
	$('#techCd').val('');
	$('#tpFossilCd').val('');

	$('[name=othSpnNmChk]').attr('checked', false);
	$('[name=cientificoChk]').attr('checked', false);
	$('[name=txnmKdCdChk]').attr('checked', false);
	$('[name=txnmPhCdChk]').attr('checked', false);
	$('[name=tpAuthCdChk]').attr('checked', false);
	$('[name=makerCdChk]').attr('checked', false);
	$('[name=prodPlcCdChk]').attr('checked', false);
	$('[name=cultureChk]').attr('checked', false);
	$('[name=styleCdChk]').attr('checked', false);
	$('[name=ethnCdChk]').attr('checked', false);
	$('[name=chronoGeoCdChk]').attr('checked', false);
	$('[name=datingCdChk]').attr('checked', false);
	$('[name=periodoChk]').attr('checked', false);
	$('[name=mtrlCdChk]').attr('checked', false);
	$('[name=subMtrlCdChk]').attr('checked', false);
	$('[name=techCdChk]').attr('checked', false);
	$('[name=tpFossilCdChk]').attr('checked', false);
	$('[name=dimensionesChk]').attr('checked', false);
}

/**
 * Clasificación Específica Option Add
 */
function addClassSpecCd(){
	 $('#dnmnt1Cd').html('<option value=\"\" >--Seleccione--</option>');
	if($('#classCd').val() == ''){
		var _html = '<option value=\"\" >--Seleccione--</option>';
		$('#classSpecCd').html(_html);
	}else{
		Code.stdCodeOrderList('Y', 'MVB', '005', $('#classCd').val(), '', '', 'ORDER BY STD_CD ASC',function(result){
	        var _html = '<option value=\"\" >--Seleccione--</option>';
	        result.forEach(function(v, i){
	            if($('#detailClassSpecCd').val() == v.stdCd){
	                _html += '<option value=\"'+v.stdCd+'\" selected '+'data-set-data='+v.cdSpnNm+'>'+v.cdSpnNm+'</option>';
	            }else{
	                _html += '<option value=\"'+v.stdCd+'\" '+'data-set-data='+v.cdSpnNm+'>'+v.cdSpnNm+'</option>';
	            }
	        });
	        $('#classSpecCd').html(_html);
	        if($('#detailClassSpecCd').val() != '' && $('#detailClassSpecCd').val() != null) {
		        changeEspecifica();
		        //$('.pheiGrp').addClass('hide');
	        }
        });
	}
}

/**
 *  (Autoría)
 */
function changeAutoria(){
	if($('#tpAuthCd').val() == ''){
		var _html = '<option value=\"\" >--Seleccione--</option>';
		$('#authCd').html(_html);
	}else{
		Code.authCodeList('016', $('#tpAuthCd').val(), 'Y', function (result) {
	        var _html = '<option value=\"\" >--Seleccione--</option>';
	        result.forEach(function(v, i){
	            if($('#detailAuthCd').val() ==  v.authCd){
	                _html += '<option value="' + v.authCd + '" '+'data-set-data='+v.cdSpnNm+' selected>' + v.cdSpnNm + '</option>';
		        }else{
	                _html += '<option value="' + v.authCd + '" '+'data-set-data='+v.cdSpnNm+'>' + v.cdSpnNm + '</option>';
		        }
	        });
	        $('#authCd').html(_html);
	    });
	}
}


/**
 * Tipo de Procedencia Change Event
 */
function  changeTpProvCd(){
    $('#dnmntLctOrgn1Cd').html('<option value="" >--Seleccione--</option>)');
    $('#dnmntLctOrgn2Cd').html('<option value="" >--Seleccione--</option>)');
    $('#classProvCd').val('');

    if($('#tpProvCd').val() == '06800001'){
        $('.historico').addClass('hide');
    }else if($('#tpProvCd').val() == '06800002' || $('#tpProvCd').val() == '06800003' || $('#tpProvCd').val() == '06800004'){
        $('.historico').removeClass('hide');
        Code.stdCodeList('Y', 'MVB', '069', $('#tpProvCd').val(), '', '', function(result){
            var _html = '<option value=\"\" >--Seleccione--</option>';
            result.forEach(function(v, i){
                _html += '<option value=\"'+v.stdCd+'\">'+v.cdSpnNm+'</option>';
            });
            $('#classProvCd').html(_html);
            if($('#detailClassProvCd').val() != ''){
                $('#classProvCd').val($('#detailClassProvCd').val());
                $('#detailClassProvCd').val('');
            }
        });
    }else if($('#tpProvCd').val() == ''){
    	var _html = '<option value=\"\" >--Seleccione--</option>';
    	$('#classProvCd').html(_html);
    }else{
        $('.historico').addClass('hide');
    }

    if($('#tpProvCd').val() == '06800002'){
        $('#dnmntLctOrgn1Cd').removeClass('hide');
    }else{
        $('#dnmntLctOrgn1Cd').addClass('hide');
    }
}


/**
 * Clasificación Change Event
 */
function changeClassProvCd(){
    var stdCd = '';
    $('#dnmntLctOrgn1Cd').html('<option value="" >--Seleccione--</option>)');
    $('#dnmntLctOrgn2Cd').html('<option value="" >--Seleccione--</option>)');
    if($('#tpProvCd').val() == '06800002'){
        Code.stdCodeList('Y', 'MVB', '137', '', '2', '',function(result){
            var _html = '<option value=\"\" >--Seleccione--</option>';
            result.forEach(function(v, i){
                _html += '<option value=\"'+v.stdCd+'\">'+v.cdSpnNm+'</option>';
            });
            $('#dnmntLctOrgn1Cd').html(_html);
            if($('#detailDnmntLctOrgn1Cd').val() != ''){
                $('#dnmntLctOrgn1Cd').val($('#detailDnmntLctOrgn1Cd').val());
                $('#detailDnmntLctOrgn1Cd').val('');
            }
        });
    }else if($('#tpProvCd').val() == '06800003'){
        stdCd = '071';
    }else if($('#tpProvCd').val() == '06800004'){
        stdCd = '072';
    }
    if($('#tpProvCd').val() != '06800002'){
    	if($('#classProvCd').val() == ''){
    		var _html = '<option value=\"\" >--Seleccione--</option>';
    		$('#dnmntLctOrgn2Cd').html(_html);
	    }else{
	    	if(stdCd != ""){
		        Code.stdCodeList('Y', 'MVB', stdCd, $('#classProvCd').val(), '', '',function(result){
		            var _html = '<option value=\"\" >--Seleccione--</option>';
		            result.forEach(function(v, i){
		                _html += '<option value=\"'+v.stdCd+'\" data-ref2-cd=\"'+v.ref2Cd+'\">'+v.cdSpnNm+'</option>';
		            });
		            $('#dnmntLctOrgn2Cd').html(_html);
		            if($('#detailDnmntLctOrgn2Cd').val() != ''){
		                $('#dnmntLctOrgn2Cd').val($('#detailDnmntLctOrgn2Cd').val());
		                $('#detailDnmntLctOrgn2Cd').val('');
		            }
		        });
	    	}
        }
    }
}

/**
 * Denominación del Inmueble 1Depth Change
 */
function changeDnmntLctOrgn1Cd(){
    if($('#tpProvCd').val() == '06800002'){
    	if($('#classProvCd').val() == '' || $('#dnmntLctOrgn1Cd').val() == ''){
    		var _html = '<option value=\"\" >--Seleccione--</option>';
    		$('#dnmntLctOrgn2Cd').html(_html);
	    }else{
    		Code.stdCodeList('Y', 'MVB', '070', $('#classProvCd').val(), '', $('#dnmntLctOrgn1Cd').val(), function (result) {
	            var _html = '<option value=\"\" >--Seleccione--</option>';
	            result.forEach(function(v, i){
	                _html += '<option value=\"'+v.stdCd+'\" data-ref2-cd=\"'+v.ref2Cd+'\">'+v.cdSpnNm+'</option>';
	            });
	            $('#dnmntLctOrgn2Cd').html(_html);
	            if($('#detailDnmntLctOrgn2Cd').val() != ''){
	                $('#dnmntLctOrgn2Cd').val($('#detailDnmntLctOrgn2Cd').val());
	                $('#detailDnmntLctOrgn2Cd').val('');
	            }
	        });
	    }


    }
}


/**
 * Denominación del Inmueble 2Depth Change
 */
function changeDnmntLctOrgn2Cd(){
    var ref2Cd = $('#dnmntLctOrgn2Cd').find('option:selected').data('ref2Cd');
    Code.ubigeoCodeList('3', 'Y', ref2Cd, function(result){
        if(result.length > 0){
            $('#deptNm2').text(result[0].deptNm);
            $('#provinceNm2').text(result[0].provinceNm);
            $('#districtNm2').text(result[0].districtNm);
        }
    });
}

/**
 * //txnmPhCd  
 * Reino  
 */
function changeReino(){
	pCd = $("#txnmKdCd").val();
	if(pCd != ""){
		Code.stdCodeList('Y', 'MVB', '008', pCd, '', '', function(result){
	        var _html = '<option value=\"\" >-- Seleccione --</option>';
	        result.forEach(function(v, i){
	            _html += '<option value=\"'+v.stdCd+'\">'+v.cdSpnNm+'</option>';
	        });
	        $('#txnmPhCd').html(_html);
	        if($('#detailTxnmPhCd').val() != ''){
	            $('#txnmPhCd').val($('#detailTxnmPhCd').val());
	        }
	    });
	}else{
		var _html = '<option value=\"\" >-- Seleccione --</option>';
        $('#txnmPhCd').html(_html);
	}
}

/**
 * chronoGeoCd  
 */
function changeChronoGeoCd(){
	if($('#chronoGeoCd').val() == ''){
		var _html = '<option value=\"\" >--Seleccione--</option>';
		$('#cronoPeriodo').html(_html);
	}else{
		Code.stdCodeList('Y', 'MVB', '023', $('#chronoGeoCd').val(), '', '',function(result){
	    var _html = '<option value=\"\" >--Seleccione--</option>';
	        result.forEach(function(v, i){
	            if($('#detailCronoPeriodo').val() == v.stdCd){
	                _html += '<option value=\"'+v.stdCd+'\" selected '+'data-set-data='+v.cdSpnNm+'>'+v.cdSpnNm+'</option>';
	            }else{
	                _html += '<option value=\"'+v.stdCd+'\" '+'data-set-data='+v.cdSpnNm+'>'+v.cdSpnNm+'</option>';
	            }
	        });
	        $('#cronoPeriodo').html(_html);
	    });
	}
}


/**
 * Material principal  
 */
function changeMtrlCd(){
	if($('#mtrlCd').val() == ''){
		var _html = '<option value=\"\" >--Tipo de Material--</option>';
		$('#tpMtrlCd').html(_html);
	}else{
		Code.stdCodeList('Y', 'MVB', '028', $('#mtrlCd').val(), '', '',function(result){
	    var _html = '<option value=\"\" >--Tipo de Material--</option>';
	        result.forEach(function(v, i){
	            if($('#detailTpMtrlCd').val() == v.stdCd){
	                _html += '<option value=\"'+v.stdCd+'\" selected '+'data-set-data='+v.cdSpnNm+'>'+v.cdSpnNm+'</option>';
	            }else{
	                _html += '<option value=\"'+v.stdCd+'\" '+'data-set-data='+v.cdSpnNm+'>'+v.cdSpnNm+'</option>';
	            }
	        });
	        $('#tpMtrlCd').html(_html);
	    });
	}
}

function changeSubMtrlCd(){
	if($('#subMtrlCd').val() == ''){
		var _html = '<option value=\"\" >--Tipo de Material--</option>';
		$('#subTpMtrlCd').html(_html);
	}else{
		Code.stdCodeList('Y', 'MVB', '028', $('#subMtrlCd').val(), '', '',function(result){
	    var _html = '<option value=\"\" >--Tipo de Material--</option>';
	        result.forEach(function(v, i){
	            if($('#detailSubTpMtrlCd').val() == v.stdCd){
	                _html += '<option value=\"'+v.stdCd+'\" selected '+'data-set-data='+v.cdSpnNm+'>'+v.cdSpnNm+'</option>';
	            }else{
	                _html += '<option value=\"'+v.stdCd+'\" '+'data-set-data='+v.cdSpnNm+'>'+v.cdSpnNm+'</option>';
	            }
	        });
	        $('#subTpMtrlCd').html(_html);
	    });
	}
}


function changeTecnicasCd(){
	if($('#tecnicasCd').val() == '' || $('#classCd').val() == '' || $('#classSpecCd').val() == ''){
		var _html = '<option value=\"\" >--Técnicas--</option>';
		$('#techCd').html(_html);
	}else{
		var mtrlPcd = "";
		if($("#mtrlCd").val() != ""){
			mtrlPcd = $("#mtrlCd").val();
		}
		if($("#subMtrlCd").val() != ""){
			if(mtrlPcd != ""){
				mtrlPcd += "','"+$("#subMtrlCd").val();
			}else{
				mtrlPcd = $("#subMtrlCd").val();
			}
		}
		Code.stdSearchCodeList('Y', 'MVB', '031', mtrlPcd, '', $('#tecnicasCd').val(), $('#classCd').val(), $('#classSpecCd').val(), function(result){
			var _html = '<option value=\"\" >--Técnicas--</option>';
	        result.forEach(function(v, i){
	            if($('#detailTechCd').val() == v.stdCd){
	                _html += '<option value=\"'+v.stdCd+'\" selected '+'data-set-data='+v.cdSpnNm+'>'+v.cdSpnNm+'</option>';
	            }else{
	                _html += '<option value=\"'+v.stdCd+'\" '+'data-set-data='+v.cdSpnNm+'>'+v.cdSpnNm+'</option>';
	            }
	        });
	        $('#techCd').html(_html);
	    });
	}
}


/**
 * Tipo de propietario change Event
 */
function changeTpOwnCd(){
	if($('#tpOwnCd').val() == ''){
		var _html = '<option value=\"\" >--Seleccione--</option>';
		$('#ownCd').html(_html);
	}else{
		Code.ownInfoCodeList($('#tpOwnCd').val(), function(result){
	        var _html = '<option value=\"\" >--Seleccione--</option>';
	        result.forEach(function(v, i){
	            if($('#detailOwnCd').val() == v.ownNo){
	                _html += '<option value=\"'+v.ownNo+'\" selected '+'data-set-data='+v.ownNmCd+'>'+v.ownNmCd+'</option>';
	            }else{
	                _html += '<option value=\"'+v.ownNo+'\" '+'data-set-data='+v.ownNmCd+'>'+v.ownNmCd+'</option>';
	            }
            });
	        $('#ownCd').html(_html);
	    });
	}
}



/**
 * localizacion  
 */
function changeLocalizacion(){
    var tpLctCd = $('#localizacion').val();
    if(tpLctCd == ''){
    	var _html = '<option value=\"\" >-- Nombre --</option>';
    	$('#nmLctCd').html(_html);
    }else{
        Code.lctInfoCodeList(tpLctCd,function(result){
        var _html = '<option value=\"\" >-- Nombre --</option>';
        result.forEach(function(v, i){
            if($('#detailNmLctCd').val() == v.lctSeq){
                _html += '<option value="'+v.lctSeq+'"  selected '+'data-set-data='+v.lctNm+'>'+v.lctNm+'</option>';
            }else{
                _html += '<option value="'+v.lctSeq+'"'+'data-set-data='+v.lctNm+'>'+v.lctNm+'</option>';
            }
        });
        $('#nmLctCd').html(_html);
    });
    }
}


/**
 * Departamento Change Event
 */
function changeUbigeoNo1(){
    var ubigeoNo = $('#ubigeoNo1').val().substring(0,2);
    if(ubigeoNo == ''){
    	var _html = '<option value=\"\" >--Seleccione--</option>';
    	$('#ubigeoNo2').html(_html);
    }else{
    	Code.ubigeoCodeList('2', 'Y', ubigeoNo, function(result){
	        var _html = '<option value=\"\" >--Seleccione--</option>';
	        result.forEach(function(v, i){
	            _html += '<option value=\"'+v.ubigeoNo+'\">'+v.provinceNm+'</option>';
	        });
	        $('#ubigeoNo2').html(_html);
	    });
    }

    $('#ubigeoNo3').html('<option value="" >--Seleccione--</option>');
}

/**
 * Provincia Change Event
 */
function changeUbigeoNo2(){
    var ubigeoNo = $('#ubigeoNo2').val().substring(0,4);
    if(ubigeoNo == ''){
    	var _html = '<option value=\"\" >--Seleccione--</option>';
    	$('#ubigeoNo3').html(_html);
    }else{
        Code.ubigeoCodeList('3', 'Y', ubigeoNo, function(result){
	        var _html = '<option value=\"\" >--Seleccione--</option>';
	        result.forEach(function(v, i){
	            _html += '<option value=\"'+v.ubigeoNo+'\">'+v.districtNm+'</option>';
	        });
	        $('#ubigeoNo3').html(_html);
	    });
    }

}

/**
 * Código de Registro Nacional File Upload
 * @param val
 * @returns {boolean}
 */
function fnChangenNcionalFileName(val){

	var agent = navigator.userAgent.toLowerCase();

	if(!/\.(xls|xlsx)$/i.test(val)){
		Common.alert('warning', errCantFileType);

		if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ){
			// ie   input[type=file] init.
			$("#nacionalExcelFile").replaceWith( $('#nacionalExcelFile').clone(true) );
			$("#ncFileName").text('');
			$('#nacionalFileChk').val('N');
		} else {
			//other browser   input[type=file] init.
			$("#nacionalExcelFile").val('');
			$("#ncFileName").text('');
			$('#nacionalFileChk').val('N');
		}
		$('#ncfDelBtn').addClass('hide');
		return false;
	}

	$('#ncfDelBtn').removeClass('hide');
	var fileValue = val.split("\\");
	var fileName = fileValue[fileValue.length-1];
	$('#ncFileName').text(fileName);
	$('#nacionalFileChk').val('Y');

}

/**
 * Código de Registro Nacional File Upload
 */
function fnAtchNcionalCancel(){
	$('#ncfDelBtn').addClass('hide');
	var agent = navigator.userAgent.toLowerCase();

	if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ){
		// ie   input[type=file] init.
		$("#nacionalExcelFile").replaceWith( $("#nacionalExcelFile").clone(true) );
		$("#ncFileName").text("");
		$('#nacionalFileChk').val('N');
	} else {
		//other browser   input[type=file] init.
		$("#nacionalExcelFile").val("");
		$("#ncFileName").text("");
		$('#nacionalFileChk').val('N');
	}
}



/**
 * Nº Pre-inscripción File Upload
 * @param val
 * @returns {boolean}
 */
function fnChangenInscripcionFileName(val){

	var agent = navigator.userAgent.toLowerCase();

	if(!/\.(xls|xlsx)$/i.test(val)){
		Common.alert('warning', errCantFileType);

		if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ){
			// ie   input[type=file] init.
			$("#inscripcionExcelFile").replaceWith( $('#inscripcionExcelFile').clone(true) );
			$("#inFileName").text('');
			$('#inscripcionFileChk').val('N');
		} else {
			//other browser   input[type=file] init.
			$("#inscripcionExcelFile").val('');
			$("#inFileName").text('');
			$('#inscripcionFileChk').val('N');
		}
		$('#infDelBtn').addClass('hide');
		return false;
	}

	$('#infDelBtn').removeClass('hide');
	var fileValue = val.split("\\");
	var fileName = fileValue[fileValue.length-1];
	$('#inFileName').text(fileName);
	$('#inscripcionFileChk').val('Y');

}

/**
 * Nº Pre-inscripción File Upload
 */
function fnAtchInscripcionCancel(){
	$('#infDelBtn').addClass('hide');
	var agent = navigator.userAgent.toLowerCase();

	if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ){
		// ie   input[type=file] init.
		$("#inscripcionExcelFile").replaceWith( $("#inscripcionExcelFile").clone(true) );
		$("#inFileName").text("");
		$('#inscripcionFileChk').val('N');
	} else {
		//other browser   input[type=file] init.
		$("#inscripcionExcelFile").val("");
		$("#inFileName").text("");
		$('#inscripcionFileChk').val('N');
	}
}


function defaultConditionSet(){
	$(".palGrp").addClass('hide');
	$(".pheiGrp").addClass('hide');
	$(".heiGrp").addClass('hide');
	$(".preGrp").addClass('hide');
	$(".etnGrp").addClass('hide');
	$(".induGrp").addClass('hide');
	$(".heGrp").addClass('hide');
	$(".pphiGrp").addClass('hide');
	$(".phGrp").addClass('hide');
	
	
	$(".pheiGrp").removeClass('hide');
	$(".heiGrp").removeClass('hide');
	$(".heGrp").removeClass('hide');
	$(".notDef").addClass('hide');
}

function fn_callPdfFile(){
	/**
	 * Report  
	 */
    $('.reportBtn').on('click', function(){
    	Report.request($("#reportUrl").val(), "modifyState", "MVB", "FICHA", $("#mvbFichaAdmYn").val());
    });
}


$(function () {
 
	//Common.pageSize('sbListSize', pageListSize);


	/**
	 * Técnicas  
	 */
	$('#tecnicasCd').on('change', function(){
		changeTecnicasCd();
	});

	/**
	 *  (Autoría) 
	 */
	$('#tpAuthCd').on('change', function(){
		changeAutoria();
	});

	/**
     * Tipo de bien Change Event
     */
    $(document).on('change', '#tipoDeBien', function () {
        appendDenominacion($(this).val());
        deleteArrName('dnmnt1CdYn');
		deleteArrName('cientificoYn');
		$('#dnmnt1Cd').val('');
		$('#cientifico').val('');
		$('[name=cientificoChk]').attr('checked', false);
    });
    
    /**
     * Reino Change Event
     */
    $(document).on('change', '#txnmKdCd', function () {
        deleteArrName('txnmPhCdYn');
		$('#txnmPhCd').val('');
		$('[name=txnmPhCdChk]').attr('checked', false);
		
		changeReino();
    });
    
    if($('#detailTxnmPhCd').val() != ''){
    	changeReino();
    }
    
    if($('#detailTpProvCd').val() != ''){
    	changeTpProvCd();
    }

    if($('#detailClassProvCd').val() != ''){
    	changeClassProvCd();
    }

    if($('#detailDnmntLctOrgn1Cd').val() != ''){
    	changeDnmntLctOrgn1Cd();
    }

    if($('#detailDnmntLctOrgn2Cd').val() != ''){
    	changeDnmntLctOrgn2Cd();
    }


    if($('#detailOwnCd').val() != ''){
		changeTpOwnCd();
    }

    if($('#detailLocalizacion').val() != ''){
		changeLocalizacion();
	}

	/**
	 * Tipo de Procedencia Change Event
	 */
	$('#tpProvCd').on('change', function(){
		changeTpProvCd();
		deleteArrName('classProvCdYn');
		$('[name=classProvCdChk]').attr('checked', false);
		$('#classProvCd').val('');

		deleteArrName('dnmntLctOrgn1CdYn');
	    $('[name=dnmntLctOrgnCdChk]').attr('checked', false);
		$('#dnmntLctOrgn1Cd').val('');
		deleteArrName('dnmntLctOrgn2CdYn');
		$('#dnmntLctOrgn2Cd').val('');
    });

	/**
	 * Tipo de propietario Chagne Event
	 */
	$('#tpOwnCd').on('change', function(){
		changeTpOwnCd();
	});

	/**
	 * Tipo de localización Change Event
	 */
	$('#localizacion').on('change', function(){
		changeLocalizacion();
	});

	/**
     * classProvCd Change Event
     */
    $(document).on('change', '#classProvCd', function(){
        changeClassProvCd();
        deleteArrName('dnmntLctOrgn1CdYn');
	    $('[name=dnmntLctOrgnCdChk]').attr('checked', false);
		$('#dnmntLctOrgn1Cd').val('');
		deleteArrName('dnmntLctOrgn2CdYn');
		$('#dnmntLctOrgn2Cd').val('');
    });

    /**
     * dnmntLctOrgn1Cd Change Event
     */
    $(document).on('change', '#dnmntLctOrgn1Cd', function(){
        changeDnmntLctOrgn1Cd();
	    $('[name=dnmntLctOrgnCdChk]').attr('checked', false);
		deleteArrName('dnmntLctOrgn2CdYn');
		$('#dnmntLctOrgn2Cd').val('');
    });

    $(document).on('change', '#dnmntLctOrgn2Cd', function(){
        changeDnmntLctOrgn2Cd();
    });


	/**
	 * ubigeoNo1  
	 */
	$(document).on('change', '#ubigeoNo1', function(){
    	changeUbigeoNo1();
    });

	/**
	 * ubigeoNo2  
	 */
	$(document).on('change', '#ubigeoNo2', function(){
    	changeUbigeoNo2();
    });


	/**
	 * Código de Registro Nacional File Upload
	 */
	$('#ncional-btn-upload').click(function(e){
		e.preventDefault();
		$("#nacionalExcelFile").click();
	});

	/**
	 * Nº Pre-inscripción File Upload
	 */
	$('#inscripcion-btn-upload').click(function(e){
		e.preventDefault();
		$("#inscripcionExcelFile").click();
	});

 
    $('#sbListSize').change(function () {
        $('#pageListSize').val($(this).val());
        $('#SRCH_FORM').attr('method', 'post');
        if($('#nacionalExcelFile').val() != '' || $('#inscripcionExcelFile').val() != ''){
			//$("#SRCH_FORM").attr("enctype", 'multipart/form-data');
        }
        $('#SRCH_FORM').attr('action', GLO_PAGE_URL);
        $('#SRCH_FORM').submit();
    });

    if($('#detaildnmnt1Cd').val() != ''){
    	if($('#detailClassSpecCd').val() == '00500002' || $('#detailClassSpecCd').val() == '00500003' || $('#detailClassSpecCd').val() == '00500004' || $('#detailClassSpecCd').val() == '00500005' || $('#detailClassSpecCd').val() == '00500006' || $('#detailClassSpecCd').val() == '00500007' || $('#detailClassSpecCd').val() == '00500008' || $('#detailClassSpecCd').val() == '00500009' || $('#detailClassSpecCd').val() == '00500010' || $('#detailClassSpecCd').val() == '00500011'){
    	    appendDenominacion($('#detailTipoDeBien').val());
	    }else{
    		appendDenominacion($('#detailClassSpecCd').val());
	    }
    }

 
    $('.searchDelete').on('click', function(){
    	var searchSeq = $(this).data('searchSeq');
    	var _this = $(this);
		$.ajax({
            type: "POST",
            url: '/pm/pmSrchAdvance/deleteSearchData.ajax',
            dataType: "json",
            data: {'seq': searchSeq},
            error: function (request, status, error) {
                alert("La comunicación del servidor falló." + error);
            },
            success: function (data) {
                if (data.result > 0) {
					$(_this).closest('.textDelete').remove();
					
					$(".loadingWrap").hide();
                }
            }
        });
    });




    /**
	 * ingresado Btn click
	 */
    $('.ingresadoBtn').on('click', function(){
    	var stateCnt = 0;
    	$('[name=modifyState]:checked').each(function(i,v){
    		if($(v).data('stateCd') != 'PMB010001'){
    			stateCnt = 1;
    			Common.alert("warning", GLB_MSG5);
    			return false;
		    }
	    });
		if(stateCnt == 0){
			$('[name=modifyState]:checked').each(function(i,v){
	            if($(v).data('stateCd') == 'PMB010001'){
	                var mvbGenSeq = $(v).val();
	                $.ajax({
			            type: "POST",
			            url: '/pm/pmRegInsFicha/reqApproval.ajax',
			            dataType: "json",
			            data: {'reqStateCd': 'PMB010002', 'mvbGenSeq' : mvbGenSeq},
			            error: function (request, status, error) {
			                alert("La comunicación del servidor falló." + error);
			            },
			            success: function (data) {
							if($('[name=modifyState]:checked').length-1 == i){
								Common.alert("success", data.successMessage);
								location.reload();
							}
			            }
			        });
			    }
		    });
		}
    });


	/**
	 * Favorito Btn Click
	 */
	$('.favoritoBtn').on('click', function(){
		var arrHrtgNo = new Array();
    	$('[name=modifyState]:checked').each(function(i,v){
    		arrHrtgNo.push($(v).val());
	    });
    	var arrHrtgNoJson = JSON.stringify(arrHrtgNo);
    	$.ajax({
            type: 'POST',
            url: '/pm/pmSrchAdvance/createFavorito.ajax',
            dataType: "json",
            data: {'tpCd': 'MVB', 'arrHrtgNo' : arrHrtgNoJson},
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
    });
	
	
    $('.report_close').on('click', function(){
    	$(".loadingCloseType").addClass("hide");
	});


 
	$('.searchDetail').on('click', function(){
		//location.href='/pm/pmRegInsFicha/visualizar.do?mvbGenSeq='+$(this).data('genSeq');
		var genSeq = $(this).data('genSeq');
		
		$.ajax({
            type: "POST",
            url: '/pm/pmSrchAdvance/createSearchData.ajax',
            dataType: "json",
            data: {'hrtgSeq': genSeq, 'tpCd': 'MVB'},
            error: function (request, status, error) {
                alert("La comunicación del servidor falló." + error);
            },
            success: function (data) {
                if (data.result > 0) {
					//location.href='/pm/pmRegInsFicha/visualizar.do?mvbGenSeq='+genSeq;
                	var arrMvbGenSeq = [];
                	$('.checkMvbGenSeq').each(function(){
                		arrMvbGenSeq.push($(this).val());
                	});
                	
                	var viewPageUrl = '/pm/pmRegInsFicha/popupGeneralPage.do';
                	var popupId = 'generalViewPopup';
                	var popupOps = 'toolbar=no,directories=no,scrollbars=no,resizable=no,status=no,menubar=no,width=1000,height=800,resizable=no,scrollbars=no';
                	
                	var gsWin = window.open('about:blank', popupId, popupOps);
                    var frm = document.forms.frmDetailView;
                    frm.action = viewPageUrl;
                    frm.target = popupId;
                    frm.method = "post";
                    
                    frm.elements.mvbGenSeq.value = genSeq;
                    frm.elements.searchMvbGenSeq.value = arrMvbGenSeq.join(',');
                    
                    frm.submit();
                }
            }
        });
	});



 
	$('.detail').on('click', function(){
		var genSeq = $(this).data('genSeq');
		
		$.ajax({
            type: "POST",
            url: '/pm/pmSrchAdvance/createSearchData.ajax',
            dataType: "json",
            data: {'hrtgSeq': genSeq, 'tpCd': 'MVB'},
            error: function (request, status, error) {
                alert("La comunicación del servidor falló." + error);
            },
            success: function (data) {
                if (data.result > 0) {
					//location.href='/pm/pmRegInsFicha/visualizar.do?mvbGenSeq='+genSeq;
                	var arrMvbGenSeq = [];
                	$('.checkMvbGenSeq').each(function(){
                		arrMvbGenSeq.push($(this).val());
                	});
                	
                	var viewPageUrl = '/pm/pmRegInsFicha/popupGeneralPage.do';
                	var popupId = 'generalViewPopup';
                	var popupOps = 'toolbar=no,directories=no,scrollbars=no,resizable=no,status=no,menubar=no,width=1000,height=800,resizable=no,scrollbars=no';
                	
                	var gsWin = window.open('about:blank', popupId, popupOps);
                    var frm = document.forms.frmDetailView;
                    frm.action = viewPageUrl;
                    frm.target = popupId;
                    frm.method = "post";
                    
                    frm.elements.mvbGenSeq.value = genSeq;
                    frm.elements.searchMvbGenSeq.value = arrMvbGenSeq.join(',');
                    
                    frm.submit();
                }
            }
        });
    });


 
	$('.modifyBtn').on('click', function(){
		var genSeq = $(this).data('genSeq');
		
		$.ajax({
            type: "POST",
            url: '/pm/pmSrchAdvance/createSearchData.ajax',
            dataType: "json",
            data: {'hrtgSeq': genSeq, 'tpCd': 'MVB'},
            error: function (request, status, error) {
                alert("La comunicación del servidor falló." + error);
            },
            success: function (data) {
                if (data.result > 0) {
                	//location.href='/pm/pmRegInsFicha/nuevaFicha.do?mvbGenSeq='+genSeq+'&srchMode=basic';
                	window.open('/pm/pmRegInsFicha/nuevaFicha.do?mvbGenSeq='+genSeq+'&srchMode=basic', '_blank');
                }
            }
        });
    });

 
	$('.copyBtn').on('click', function(){
		openPopup('layerPopup1');
		$('#iMvbGenSeq').val($(this).data('genSeq'));
	});
 
	$('#copySet').on('click', function(){
		var copyNum = $('#copyNumber').val();
		if(copyNum == ''){
			Common.alert("warning", GLB_MSG7);
			return false;
		}
		for(var i = 0; i < copyNum; i++){
			var genSeq = $('#iMvbGenSeq').val();
			var url = "/pm/pmRegInsFicha/copyMvbGenSeq.ajax";
			var reqData = {
				"I_MVB_GEN_SEQ" : genSeq
			};
			$('#layerPopup1').hide();
			Ajax.request(url, reqData, Common.alert("success", GLB_MSG3), '');
		}
	});

 
	$('.deleteBtn').on('click', function(){
		var _this = $(this);
		if(confirm(GLB_MSG4)){
			var genSeq = $(this).data('genSeq')		;
			var url = "/pm/pmRegInsFicha/delMvbGenSeq.ajax";
			var reqData = {
					"MVB_GEN_SEQ" : genSeq
				};
			$('#layerPopup1').hide();
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



 
	$('.resetBtn').on('click', function(){
		location.href='/pm/pmSrchBasic/basica.do';
	});


 
	$('#searchPaging').on('click', function () {
    	fnGoToPage($('#pageNumber').val());
    });
	
	/**
	 * chronoGeoCd Change Event
	 */
	$(document).on('change', '#chronoGeoCd', function(){
    	changeChronoGeoCd();
    });


	/**
	 * Clasificación Específica 
	 */
	if($('#detailClassSpecCd').val() != ''){
		addClassSpecCd();

		if($('#detailClassSpecCd').val() == '00500001') {
	        appendDenominacion($('#detailClassSpecCd').val());
	        $('.palGrp').removeClass('hide');
	    }
	}

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

	/**
	 * Clasificación Change Event
	 */
	$('#classCd').on('change', function(){
		addClassSpecCd();
		//$('.changeHide').removeClass('hide');
		defaultConditionSet();
		deleteArrName('classSpecCdYn');
		$('#classSpecCd').val('');
		resetSearchForm1();
    });


	/**
	 * Clasificación Específica Change Event
	 */
	$(document).on('change', '#classSpecCd', function(){
		if($('#classSpecCd').val() == ''){
			$('.changeHide').removeClass('hide');
		}else{
			$('.changeHide').addClass('hide');
		}
		changeEspecifica();
		resetSearchForm1();
    });


	/**
	 * Search Btn Click Event
	 */
	$('.searchBtn').on('click', function(){
		$('#pageIndex').val('1');
        $('#SRCH_FORM').attr('action', '/pm/pmSrchBasic/basica.do?'+$("meta[name='_csrf_parameter']").attr("content")+'='+$('meta[name="_csrf"]').attr('content'));
        $("#SRCH_FORM").attr("enctype", 'multipart/form-data');
       $('[name=SRCH_FORM]').submit();
       $(".loadingWrap").show();
    });


 
	$(document).on('click', '.excluirChk', function(){
		if($(this).is(':checked')){
			$(this).closest('tr').find('[name^=arrCheck]').val('Y');
		}else{
			$(this).closest('tr').find('[name^=arrCheck]').val('N');
		}
	});
	
	/**
	 * Material principal 1Depth  
	 */
	$(document).on('change', '#mtrlCd', function(){
		changeMtrlCd();
	});


	/**
	 * Material secundario 1Depth  
	 */
	$(document).on('change', '#subMtrlCd', function(){
		changeSubMtrlCd();
	});



 
	$(document).on('click', '.deleteCondition', function(i, v){
		$("#firstAccess").val("N");
		$('#'+$(this).data('setName')).val('');
		$(this).closest('tr').remove();
		if($(this).data('setName') == 'classCd'){
			addClassSpecCd();
			changeEspecifica();
		}

		$('[name=tbodyIdx]').each(function(i, v){
            v.textContent=i+1;
        });
	});



 
	$(document).on('dp.change', 'input.setCondition', function() {
		setDatePicker(this);
	});

 
	$(document).on('change', '.setCondition', function(){
		setDatePicker(this);
	});





 
	$('#allCheck').on('click', function(){
		if($(this).is(':checked')){
			$('input:checkbox[name="modifyState"]').each(function() {
				this.checked = true;  
			});
			
			$("#allChk").val("Y");
		}else{
			$('input:checkbox[name="modifyState"]').each(function() {
				this.checked = false;  
			});
			
			$("#allChk").val("N");
		}
	});

	$('input:checkbox[name="modifyState"]').on('click', function(){
		if($('input:checkbox[name="modifyState"]:checked').length == perPage){
			$('input:checkbox[name="allCheck"]').each(function() {
				this.checked = true;  
			});
		}else{
			$('input:checkbox[name="allCheck"]').each(function() {
				this.checked = false;  
			});
		}
		
		$("#allChk").val("N");
	});


 
    $('#excelDownLoad').on('click', function () {
    	/*
    	if($('[name=modifyState]:checked').length <= 0){
	        Common.alert('warning', GLB_MSG6);
	        return false;
	    }
    	var _html='';
    	$('[name=modifyState]:checked').each(function(i,v){
            _html +=  '<input type="hidden" name="arrMvgGenSeq['+i+']" id="arrMvgGenSeq['+i+']" value="'+$(v).val()+'" />';
	    });
	    
    	$('#excelDiv').html(_html);
		*/
        $('#SRCH_FORM').attr('method', 'post');
        $('#SRCH_FORM').attr('action', '/pm/pmSrchAdvance/avanzadaUBExcelList.do?'+$("meta[name='_csrf_parameter']").attr("content")+'='+$('meta[name="_csrf"]').attr('content'));
        $('#SRCH_FORM').submit();
    });
    
    if($("#detailCreateUserSeq").val() == "" && $("#firstAccess").val() == ""){
    	setDatePicker($("#createUserSeq").val($("#sesUserSeq").val()));
    }
});