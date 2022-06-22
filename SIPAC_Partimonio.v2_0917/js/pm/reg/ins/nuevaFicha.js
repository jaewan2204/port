/**
 *  (Clasificación específica) 
 */
function changeEspecifica(){
    /**
     *  Prehispánico, Histórico-Artístico, Entográfico, Industrial Event
     * Class Name :  pheiGrp
     */
    if($('#classSpecCd').val() == '00500002' || $('#classSpecCd').val() == '00500003' || $('#classSpecCd').val() == '00500004' || $('#classSpecCd').val() == '00500005' || $('#classSpecCd').val() == '00500006' || $('#classSpecCd').val() == '00500007' || $('#classSpecCd').val() == '00500008' || $('#classSpecCd').val() == '00500009' || $('#classSpecCd').val() == '00500010' || $('#classSpecCd').val() == '00500011'){
        $('.pheiGrp').removeClass('hide');
        //detailTpGoodsCd  
        var detailTpGoodCd = '';
        if($('#detailTpGoodsCd').val() != ''){
            detailTpGoodCd = $('#detailTpGoodsCd').val();
        }
        //Tipo de bien  
        Code.stdCodeList('Y', 'MVB', '006', $('#classSpecCd').val(), '', '',function(result){
        var _html = '<option value=\"\" >-- Seleccione --</option>';
            result.forEach(function(v, i){
                if(detailTpGoodCd == v.stdCd){
                    _html += '<option value=\"'+v.stdCd+'\" selected>'+v.cdSpnNm+'</option>';
                }else{
                    _html += '<option value=\"'+v.stdCd+'\">'+v.cdSpnNm+'</option>';
                }

            });
            $('#tpGoodsCd').html(_html);
        });
        if($('[name=tpNoGoodsCd]:checked').val() == 'U'){
            $('#bienesTd').text('Un solo bien');
        }else if($('[name=tpNoGoodsCd]:checked').val() == 'C'){
            $('#bienesTd').text('Conjunto - ' + $('#setPieceQnt').val());
        }
    }else{
        $('#tpGoodsCd').html('');
        $('.pheiGrp').addClass('hide');
    }

    /**
     *  Histórico-Artístico, Entográfico, Industrial Event
     * Class Name :  heiGrp
     */
    if($('#classSpecCd').val() == '00500003' || $('#classSpecCd').val() == '00500004' || $('#classSpecCd').val() == '00500005' || $('#classSpecCd').val() == '00500006' || $('#classSpecCd').val() == '00500007' || $('#classSpecCd').val() == '00500008' || $('#classSpecCd').val() == '00500009' || $('#classSpecCd').val() == '00500010' || $('#classSpecCd').val() == '00500011'){
        $('.heiGrp').removeClass('hide');
        //detailProdPlcCd  
        var detailProdPlcCd = '';
        if($('#detailProdPlcCd').val() != ''){
            detailProdPlcCd = $('#detailProdPlcCd').val();
        }
        //Lugar de manufactura  
        if($('#classSpecCd').val() == '00500004' || $('#classSpecCd').val() == '00500008' || $('#classSpecCd').val() == '00500010'){
        	if($('#detailEthnCd').val() != "" && $('#detailEthnRef1Cd').val() != ""){
        		Code.stdEthnCodeList('Y', 'MVB', $('#detailEthnCd').val(), $('#classSpecCd').val(), '', '', function(result){
    	            var _html = '<option value=\"\" >-- Seleccione --</option>';
    	            result.forEach(function(v, i){
    	                if($('#detailEthnRef1Cd').val() == v.stdCd){
    	                    _html += '<option value=\"'+v.stdCd+'\" selected>'+v.cdSpnNm+'</option>';
    	                }else{
    	                    _html += '<option value=\"'+v.stdCd+'\">'+v.cdSpnNm+'</option>';
    	                }
    	
    	            });
    	            $('#prodPlcCd').html(_html);
    	        });
        	}else{
        		Code.stdCodeList('Y', 'MVB', '013', $('#classSpecCd').val(), '', '', function(result){
    	            var _html = '<option value=\"\" >-- Seleccione --</option>';
    	            result.forEach(function(v, i){
    	                if(detailProdPlcCd == v.stdCd){
    	                    _html += '<option value=\"'+v.stdCd+'\" selected>'+v.cdSpnNm+'</option>';
    	                }else{
    	                    _html += '<option value=\"'+v.stdCd+'\">'+v.cdSpnNm+'</option>';
    	                }
    	
    	            });
    	            $('#prodPlcCd').html(_html);
    	        });
        	}
        }else{
	        Code.stdCodeList('Y', 'MVB', '013', $('#classSpecCd').val(), '', '', function(result){
	            var _html = '<option value=\"\" >-- Seleccione --</option>';
	            result.forEach(function(v, i){
	                if(detailProdPlcCd == v.stdCd){
	                    _html += '<option value=\"'+v.stdCd+'\" selected>'+v.cdSpnNm+'</option>';
	                }else{
	                    _html += '<option value=\"'+v.stdCd+'\">'+v.cdSpnNm+'</option>';
	                }
	
	            });
	            $('#prodPlcCd').html(_html);
	        });
        }
    }else{
        $('#prodPlcCd').html('');
        $('.heiGrp').addClass('hide');
        $('#titleSpnNm').val('');
    }
    /**
     *  Histórico-Artístico, Entográfico Event
     * Class Name :  heGrp
     */
    if($('#classSpecCd').val() == '00500003' || $('#classSpecCd').val() == '00500004' || $('#classSpecCd').val() == '00500006' || $('#classSpecCd').val() == '00500007' || $('#classSpecCd').val() == '00500008' || $('#classSpecCd').val() == '00500010'){
        var classSpecCd = $('#classSpecCd').val();
        $('.heGrp').removeClass('hide');
        //Autoría  
        Code.stdCodeList('Y', 'MVB', '015', '', '2', '', function(result){
            var _html = '<option value=\"\" >-- Seleccione --</option>';
            result.forEach(function(v, i){
                if(classSpecCd == '00500003' || classSpecCd == '00500006' || classSpecCd == '00500007') {
                    /** Histórico - artístico (00500003, 00500006, 00500007) -- Autor, Taller, Fabricante     */
                    _html += '<option value=\"' + v.stdCd + '\">' + v.cdSpnNm + '</option>';
                }else if(classSpecCd == '00500004' || classSpecCd == '00500008' || classSpecCd == '00500010') {
                    /** Etnográfico (00500004, 00500008, 00500010)  -- Autor, Taller      */
                    if(v.stdCd != '01500003'){
                        _html += '<option value=\"' + v.stdCd + '\">' + v.cdSpnNm + '</option>';
                    }

                }
            });
            $('#tpAuthCd').html(_html);
        });
        if($('#authDataLength').val() > 0){
            $('#authCd1').removeClass('hide');
            $('.showTpAuthCd').removeClass('hide');
            $('.autoriaTable').removeClass('hide');
        }
    }else{
        $('.heGrp').addClass('hide');
    }


    /**
     *  Prehispánico, Histórico-Artístico
     * Class Name :  phGrp
     */
    if($('#classSpecCd').val() == '00500002' || $('#classSpecCd').val() == '00500003' || $('#classSpecCd').val() == '00500006' || $('#classSpecCd').val() == '00500007'){
        $('.phGrp').removeClass('hide');
        //Prehispánico  
        Code.stdCodeList('Y', 'MVB', '021', $('#classSpecCd').val(), '', '', function(result){
            var _html = '<option value=\"\" >-- Seleccione --</option>';
            result.forEach(function(v, i){
                _html += '<option value=\"'+v.stdCd+'\">'+v.cdSpnNm+'</option>';
            });
            $('#styleCd').html(_html);
            if($('#detailStyleCd').val() != ''){
                $('#styleCd').val($('#detailStyleCd').val());
            }
        });
    }else{
        $('.phGrp').addClass('hide');
    }


    /**
     *  Etnográfico
     * Class Name :  etnograficoGrp
     */
    if($('#classSpecCd').val() == '00500004' || $('#classSpecCd').val() == '00500008' || $('#classSpecCd').val() == '00500010'){
        $('.etnograficoGrp').removeClass('hide');
        //Etnográfico  
        Code.stdCodeList('Y', 'MVB', '018', $('#classSpecCd').val(), '2', '', function(result){
            var _html = '<option value=\"\" >-- Seleccione --</option>';
            result.forEach(function(v, i){
                _html += '<option value=\"'+v.stdCd+'\">'+v.cdSpnNm+'</option>';
            });
            $('#ethnCd').html(_html);
            if($('#detailEthnCd').val() != ''){
                $('#ethnCd').val($('#detailEthnCd').val());
                
                if($('#detailProdPlcCd').val() != ''){
                	changeLugar($('#classSpecCd').val(), $('#detailEthnCd').val());
                }
            }
        });
        
        $("#enStar").addClass('hide');//Autoria not required
    }else{
        $('.etnograficoGrp').addClass('hide');
        $("#enStar").removeClass('hide');
    }


    /**
     *  Prehispánico
     * Class Name :  prehispanicoGrp
     */
    if($('#classSpecCd').val() == '00500002'){
        $('.prehispanicoGrp').removeClass('hide');
        //Prehispánico  
        Code.stdCodeList('Y', 'MVB', '019', '', '2', '', function(result){
            var _html = '<option value=\"\" >-- Seleccione --</option>';
            result.forEach(function(v, i){
                _html += '<option value=\"'+v.stdCd+'\">'+v.cdSpnNm+'</option>';
            });
            $('#culCd').html(_html);
            if($('#detailCulCd').val() != ''){
                $('#culCd').val($('#detailCulCd').val());
            }
        });
        //Period  
        Code.stdCodeList('Y', 'MVB', '024', '', '2', '', function(result){
            var _html = '<option value=\"\" >-- Seleccione --</option>';
            result.forEach(function(v, i){
                _html += '<option value=\"'+v.stdCd+'\">'+v.cdSpnNm+'</option>';
            });
            $('#periodCd').html(_html);
            if($('#detailPeriodCd').val() != ''){
                $('#periodCd').val($('#detailPeriodCd').val());
            }
        });
    }else{
        $('.prehispanicoGrp').addClass('hide');
    }


    /**
     *  Industrial
     * Class Name :  industrialGrp
     */
    if($('#classSpecCd').val() == '00500005' || $('#classSpecCd').val() == '00500009' || $('#classSpecCd').val() == '00500011'){
        $('.industrialGrp').removeClass('hide');
        //Fabricante / Taller  
        Code.authCodeList('017', '', 'Y', function (result) {
            var _html = '<option value=\"\" >-- Seleccione --</option>';
            result.forEach(function(v, i){
                _html += '<option value=\"' + v.authCd + '\" data-tp-auth-yn="' + v.tpAuthYn + '">' + v.cdSpnNm + '</option>';
            });
            $('#makerCd').html(_html);
            if($('#detailMakerCd').val() != ''){
                $('#makerCd').val($('#detailMakerCd').val());
            }
        });
    }else{
        $('.industrialGrp').addClass('hide');
    }


    /**
     *  Paleontológico Event
     * Class Name : paleontologicoGrp
     */
    if($('#classSpecCd').val() == '00500001'){
        $('.paleontologicoGrp').removeClass('hide');
        //txnmKdCd  
        Code.stdCodeList('Y', 'MVB', '007', '', '2', '', function(result){
            var _html = '<option value=\"\" >-- Seleccione --</option>';
            result.forEach(function(v, i){
                _html += '<option value=\"'+v.stdCd+'\">'+v.cdSpnNm+'</option>';
            });
            $('#txnmKdCd').html(_html);
            if($('#detailTxnmKdCd').val() != ''){
                $('#txnmKdCd').val($('#detailTxnmKdCd').val());
                
                changeReino($('#txnmKdCd').val());
            }
            
            _html = '<option value=\"\" >-- Seleccione --</option>';
            $('#txnmPhCd').html(_html);
        });
        //Tipo de muestra  
        Code.stdCodeList('Y', 'MVB', '112', '', '2', '', function(result){
            var _html = '<option value=\"\" >-- Seleccione --</option>';
            result.forEach(function(v, i){
                _html += '<option value=\"'+v.stdCd+'\">'+v.cdSpnNm+'</option>';
            });
            $('#tpSmplCd').html(_html);
            //
            if($('#detailTpSmplCd').val() != ''){
                $('#tpSmplCd').val($('#detailTpSmplCd').val());
            }
        });
        //Cronología(Era geológica)  
        Code.stdCodeList('Y', 'MVB', '022', '', '2', '', function(result){
            var _html = '<option value=\"\" >-- Seleccione --</option>';
            result.forEach(function(v, i){
                _html += '<option value=\"'+v.stdCd+'\">'+v.cdSpnNm+'</option>';
            });
            $('#chronoGeoCd').html(_html);
            if($('#detailChronoGeoCd').val() != ''){
                $('#chronoGeoCd').val($('#detailChronoGeoCd').val());
                //Periodo selectBox  
                Code.stdCodeList('Y', 'MVB', '023', $('#detailChronoGeoCd').val(), '', '', function(result){
                    var _html = '<option value=\"\" >-- Seleccione --</option>';
                    result.forEach(function(v, i){
                        _html += '<option value=\"'+v.stdCd+'\">'+v.cdSpnNm+'</option>';
                    });
                    $('#chronoPeriodCd').html(_html);
                    if($('#detailChronoPeriodCd').val() != ''){
                        $('#chronoPeriodCd').val($('#detailChronoPeriodCd').val());
                    }
                });
            }
        });
    }else{
        $('#txnmSpnNm').val('');
        $('#txnmKdCd').html('');
        $('#tpSmplCd').html('');
        $('.paleontologicoGrp').addClass('hide');
    }

    if($('[name=datingCd]:checked').val() == '15200002'){
        changeDatacion();
    }
}

/**
 * //txnmPhCd  
 * Reino  
 */
function changeReino(pCd){
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
 *  (Autoría)  
 */
function changeAutoria(pCd){
    //Nombre(s)  
    $('.nombreAtribuido').addClass('hide');
    $('.nombreIdentificado').addClass('hide');
    $('.nombreFirmado').addClass('hide');
    if(pCd != ""){
    	//Autor
	    if(pCd == '01500001'){
	        $('.nombreAtribuido').removeClass('hide');
	        $('.nombreFirmado').removeClass('hide');
	    }
	    //Taller
	    if(pCd == '01500002'){
	        $('.nombreAtribuido').removeClass('hide');
	        $('.nombreIdentificado').removeClass('hide');
	    }
	    //Fabricante
	    if(pCd == '01500003'){
	        $('.nombreAtribuido').removeClass('hide');
	        $('.nombreIdentificado').removeClass('hide');
	    }
	    Code.authCodeList('016', pCd, 'Y', function (result) {
	        var _html = '<option value=\"\" >-- Seleccione --</option>';
	        result.forEach(function(v, i){
	            _html += '<option value=\"' + v.authCd + '\" data-tp-auth-yn="' + v.tpAuthYn + '">' + v.cdSpnNm + '</option>';
	        });
	        $('#authCd1').html(_html);
	    });
    }
}

function changeDatacion(){
    var _this = $('input[name=datingCd]:checked');
    var _html = '<option value=\"\" >-- Seleccione --</option>';
    $('#tpInitCenturyCd').html(_html);
    $('#tpFinCenturyCd').html(_html);
    $('#centuryStCd').html(_html);
    $('#centuryFinCd').html(_html);
    $('.siglos').addClass('hide');
    $('.referencia').addClass('hide');
    $('#yearRef').val('');
    if($(_this).val() == '15200002'){
        $('.siglos').removeClass('hide');

        //Datación(Tipo Siglo)  
        Code.stdCodeList('Y', 'MVB', '025','','2', '', function(result){
            var _html = '<option value=\"\" >-- Seleccione --</option>';
            result.forEach(function(v, i){
                _html += '<option value=\"'+v.stdCd+'\">'+v.cdSpnNm+'</option>';
            });
            $('#tpInitCenturyCd').html(_html);
            $('#tpFinCenturyCd').html(_html);
            if($('#detailTpInitCenturyCd').val() != ''){
                $('#tpInitCenturyCd').val($('#detailTpInitCenturyCd').val());
            }
            if($('#detailTpFinCenturyCd').val() != ''){
                $('#tpFinCenturyCd').val($('#detailTpFinCenturyCd').val());
            }
        });
        //Datación(Siglo)  
        Code.stdCodeOrderList('Y', 'MVB', '026',$('#classSpecCd').val(),'', '', 'ORDER BY STD_CD ASC', function(result){
            var _html = '<option value=\"\" >-- Seleccione --</option>';
            result.forEach(function(v, i){
                _html += '<option value=\"'+v.stdCd+'\">'+v.cdSpnNm+'</option>';
            });
            $('#centuryStCd').html(_html);
            $('#centuryFinCd').html(_html);
            if($('#detailCenturyStCd').val() != ''){
                $('#centuryStCd').val($('#detailCenturyStCd').val());
            }
            if($('#detailCenturyFinCd').val() != ''){
                $('#centuryFinCd').val($('#detailCenturyFinCd').val());
            }
        });
    }else if($(_this).val() == '15200003'){
        $('.referencia').removeClass('hide');
    }
}

/**
 * Denominación Option Event
 * @param pCd
 */
function appendDenominacion(pCd) {
    var dnmnt1Cd = $('#detaildnmnt1Cd').val();
    Code.stdCodeList('Y', 'MVB', '009', pCd, '', '', function (result) {
        var _html = '<option value=\"\" >-- Seleccione --</option>';
        result.forEach(function (v, i) {
            if (dnmnt1Cd == v.stdCd) {
                _html += '<option value=\"' + v.stdCd + '\" selected>' + v.cdSpnNm + '</option>';
            } else {
                _html += '<option value=\"' + v.stdCd + '\">' + v.cdSpnNm + '</option>';
            }

        });
        $('#dnmnt1Cd').html(_html);
    });
}

/**
 * Etnia -> Lugar
 * @param pCd
 */
function changeLugar(classSpecCd, stdCd) {
    var lugarCd = $('#detaildnmnt1Cd').val();
    Code.stdEthnCodeList('Y', 'MVB', stdCd, classSpecCd, '', 'Y', function (result) {
        var _html = '<option value=\"\" >-- Seleccione --</option>';
        
        if(result!= ""){
        	result.forEach(function(v, i){
                if($('#detailEthnRef1Cd').val() == v.stdCd){
                    _html += '<option value=\"'+v.stdCd+'\" selected>'+v.cdSpnNm+'</option>';
                }else{
                    _html += '<option value=\"'+v.stdCd+'\">'+v.cdSpnNm+'</option>';
                }

            });
        }else{
        	Code.stdEthnCodeList('Y', 'MVB', '013', $('#classSpecCd').val(), '', '', function(result){
	            result.forEach(function(v, i){
	                if(detailProdPlcCd == v.stdCd){
	                    _html += '<option value=\"'+v.stdCd+'\" selected>'+v.cdSpnNm+'</option>';
	                }else{
	                    _html += '<option value=\"'+v.stdCd+'\">'+v.cdSpnNm+'</option>';
	                }
	
	            });
	            $('#prodPlcCd').html(_html);
	        });
        }
        $('#prodPlcCd').html(_html);
    });
}


$(function () {

    /**
     * Tipo de bien Change Event
     */
    $(document).on('change', '#tpGoodsCd', function () {
        appendDenominacion($(this).val());
    });
    
    /**
     * Reino Change Event
     */
    $(document).on('change', '#txnmKdCd', function () {
    	changeReino($(this).val());
    });

 
    if($('#mvbGenSeq').val() != ''){
        changeEspecifica();
    }

    //if ($('#detaildnmnt1Cd').val() != '') {
        if ($('#detailClassSpecCd').val() == '00500001') {
            appendDenominacion($('#detailClassSpecCd').val());
        } else {
            appendDenominacion($('#detailTpGoodsCd').val());
        }
    //}

    /**
     * Clasificación específica change Event
     */
    $(document).on('change', '#classSpecCd', function(){
        changeEspecifica();
 
        $('#autoriaBody').html('');
        $('.autoriaTable').addClass('hide');
        //Clasificación específica - Paleontológico  
        if ($(this).val() == '00500001') {
            appendDenominacion($(this).val());
        }
    });
    
    /**
     * Etnia change Event
     */
    $(document).on('change', '#ethnCd', function(){
    	if($('#classSpecCd').val() == '00500004' || $('#classSpecCd').val() == '00500008' || $('#classSpecCd').val() == '00500010'){
            changeLugar($('#classSpecCd').val(), $(this).val());
        }
    });

    /**
     * N°de bienes change Event
     */
    $(document).on('change', '[name=tpNoGoodsCd]', function(){
        if($('[name=tpNoGoodsCd]:checked').val() == 'C'){
            $('#setPieceQnt').val('');
            $('#setPieceQnt').removeClass('hide');
            $('#bienesTd').text('Conjunto');
        }else{
            $('#setPieceQnt').val('1');
            $('#setPieceQnt').addClass('hide');
            $('#bienesTd').text('Un solo bien');
        }
    });


    /**
     * N°de bienes change Event
     */
    $(document).on('change', '[name=setPieceQnt]', function(){
        if($(this).val() > 100){
            $(this).val('');
            Common.alert("warning", GLB_MSG3);
            return false;
        }

        if($('[name=tpNoGoodsCd]:checked').val() == 'C'){
            $('#bienesTd').text('Conjunto - ' + $(this).val());
        }
    });

    /**
     * tpAuthCd change Event
     */
    $(document).on('change', '#tpAuthCd', function(){
    	$('[name=tpAuthConCd1]').prop('disabled', false);
    	        
        if($('#tpAuthCd').val() != ''){
        	$('.showTpAuthCd').removeClass('hide');
            changeAutoria($(this).val());
        }else{
            $('.showTpAuthCd').addClass('hide');
        }
    });


    /**
     * authCd1 change Event
     */
    $(document).on('change', '#authCd1', function(){
        $('#authCd').val($(this).val());
        var selected = $(this).find('option:selected');
        var extra = selected.data('tp-auth-yn'); 
        //if($(this).val() == '01600069' || $(this).val() == '01600949' || $(this).val() == '01602223' || $(this).val() == '01602227' || $(this).val() == '01602267' || $(this).val() == '01602293'){
        if(extra == "Y"){
            $('[name=tpAuthConCd1]').prop('disabled', true).prop('checked', false);;
        }else{
            $('[name=tpAuthConCd1]').prop('disabled', false);
        }
    });

    /**
     * autoriaBtn Click Event
     */
    $(document).on('click', '.autoriaBtn', function(){
        if($('#authCd1').val() == null || $('#authCd1').val() == ''){
            Common.alert("warning", GLB_MSG);
            return false;
        }
        var overlap = 'N';
        $('[name^="arrTpAuthCd"]').each(function(i, v){
            if($(v).val() == $('#tpAuthCd').val()){
                $('[name^="arrAuthCd"]').each(function(ii, vv){
                    //Nombre(s)	 016
                    if($(vv).val() == $('#authCd1').val()){
                        $('[name^="arrTpAuthConCd"]').each(function(iii, vvv) {
                            if($(vvv).val() == $('[name=tpAuthConCd1]:checked').val()){
                                overlap = 'Y';
                                return false;
                            }
                        });
                    }
                });
            }
        });

        if(overlap == 'Y'){
            Common.alert("warning", GLB_MSG2);
            return false;
        }
        var lables = '';
 
        var _html = $('#autoriaBody').html();
        var  index = $('#autoriaBody>tr').length;
        $('.autoriaTable').removeClass('hide');
        $('[name=tpAuthConCd]').val($('[name=tpAuthConCd1]:checked').val());
        
        var tpAuthYn = $("[name=authCd1] option:selected").data('tpAuthYn');
        
        if(tpAuthYn == "N" && $('[name=tpAuthConCd1]:checked').length == 0){
            Common.alert("warning", GLB_MSG5);
            return false;
        }
        
        lables = (tpAuthYn == 'N' && $("[name=tpAuthConCd1]:checked").data("labels")) || '';
        _html += '<tr>';
        _html +=    '<input type="hidden" name="arrAuthSeq['+index+']" id="arrAuthSeq['+index+']" value="" />';
        _html +=    '<input type="hidden" name="arrAuthCd['+index+']" id="arrAuthCd['+index+']" value="'+$('#authCd').val()+'" />';
        _html +=    '<input type="hidden" name="arrTpAuthCd['+index+']" id="arrTpAuthCd['+index+']" value="'+$('#tpAuthCd').val()+'" />';
        _html +=    '<input type="hidden" name="arrTpAuthConCd['+index+']" id="arrTpAuthConCd['+index+']" value="'+$('#tpAuthConCd').val()+'"/>';
        _html += 	'<td name="tbodyIdx"></td>';
        _html += 	'<td>'+$("[name=tpAuthCd] option:selected").text();+'</td>';
        _html += 	'<td>'+$("[name=authCd1] option:selected").text();+'</td>';
        _html += 	'<td>'+lables+'</td>';
        _html += 	'<td>';
        _html += 		'<div class="dt-list-control">';
        _html += 			'<span><i class="xi-trash"></i></span>';
        _html += 		'</div>';
        _html += 	'</td>';
        _html += '</tr>';
        $('#autoriaBody').html(_html);
        $('[name=tbodyIdx]').each(function(i, v){
            v.textContent=i+1;
        });
        $('#tr_none').remove();
        
        $('#authCd1').val("");
        $('[name=tpAuthConCd1]').prop('checked', false);
        $('#tpAuthCd').val("");
    });

    /**
     * ACCIÓN Btn Click Event
     */
    $(document).on('click','.xi-trash', function(){
 
        var btnIdx = $('.xi-trash').index($(this));
        $('#autoriaBody > tr').eq(btnIdx).remove();
 
        $('[name=tbodyIdx]').each(function(i, v){
            v.textContent=i+1;
        });
        $('[name^=arrAuthSeq]').each(function(i, v){
            $(v).attr('id', 'arrAuthSeq['+i+']');
            $(v).attr('name', 'arrAuthSeq['+i+']');
        });
        $('[name^=arrAuthCd]').each(function(i, v){
            $(v).attr('id', 'arrAuthCd['+i+']');
            $(v).attr('name', 'arrAuthCd['+i+']');
        });
        $('[name^=arrTpAuthCd]').each(function(i, v){
            $(v).attr('id', 'arrTpAuthCd['+i+']');
            $(v).attr('name', 'arrTpAuthCd['+i+']');
        });
        $('[name^=arrTpAuthConCd]').each(function(i, v){
            $(v).attr('id', 'arrTpAuthConCd['+i+']');
            $(v).attr('name', 'arrTpAuthConCd['+i+']');
        });
    });

    /**
     * chronoGeoCd Change Event
     */
    $(document).on('change', '#chronoGeoCd', function(){
        //Cronología(Periodo)  
        Code.stdCodeList('Y', 'MVB', '023', $(this).val(), '', '', function(result){
            var _html = '<option value=\"\" >-- Seleccione --</option>';
            result.forEach(function(v, i){
                _html += '<option value=\"'+v.stdCd+'\">'+v.cdSpnNm+'</option>';
            });
            $('#chronoPeriodCd').html(_html);
        });
    });


    /**
     * Datación click Event
     */
    $(document).on('change', 'input[name=datingCd]', function(){
        changeDatacion();
    });


    /**
     * tpAuthConCd2 click
     */
    $(document).on('click', '[name=tpAuthConCd2]', function(){
        $('#tpAuthConCd').val($(this).val());
    });

    /**
     * makerCd Change Event
     */
    $(document).on('change', '[name=makerCd]', function () {
        var tpAuthYn = $(this).find('option:selected').data('tpAuthYn');
        if (tpAuthYn == 'Y') {
            $('[name=tpAuthConCd2]').attr('disabled', true);
        } else {
            $('[name=tpAuthConCd2]').attr('disabled', false);
        }
        
        $('[name="tpAuthConCd2"]').removeAttr('checked');
    });


    /**
     * regist Click Event
     */
    $(document).on('click', '#submitBtn', function(){
        //  Validatior
        if($('#classSpecCd').val() == '00500002' || $('#classSpecCd').val() == '00500003' || $('#classSpecCd').val() == '00500004' || $('#classSpecCd').val() == '00500005' || $('#classSpecCd').val() == '00500006' || $('#classSpecCd').val() == '00500007' || $('#classSpecCd').val() == '00500008' || $('#classSpecCd').val() == '00500009' || $('#classSpecCd').val() == '00500010' || $('#classSpecCd').val() == '00500011'){
            if(!Valid.require('classSpecCd')){
             return false;
            }
        }
        //Paleontológico Validator
        if($('#classSpecCd').val() == '00500001'){
            if(Valid.require('txnmKdCd'));
            if ($('#dnmnt1Cd').val() == '') {
                if (!Valid.require('dnmnt1Cd')) {
                    return false;
                }
            }
        }
        //Prehispánico Validator
        if($('#classSpecCd').val() == '00500002'){
            if(!Valid.require('tpGoodsCd')){
                return false;
            }
            if(!Valid.require('setPieceQnt')){
                return false;
            }
            if ($('#dnmnt1Cd').val() == '') {
                if (!Valid.require('dnmnt1Cd')) {
                    return false;
                }
            }
            if($('#setPieceQnt').val() > 100){
                $('#setPieceQnt').val('');
                Common.alert("warning", GLB_MSG3);
                return false;
            }
            if($('#setSize').val() > 0 && $('#setSize').val() != '' && $('#setSize').val() > $('#setPieceQnt').val()){
                $('#setPieceQnt').val('');
                Common.alert("warning", GLB_MSG4);
                return false;
            }
            if($('#culCd').val() == "" && $('#styleCd').val() == ""){
            	Common.alert("warning", "Se debe ingresar Cultura o Estilo.");
            	return false;
            }
        }
        //Etnográfico Validator
        if($('#classSpecCd').val() == '00500004' || $('#classSpecCd').val() == '00500008' || $('#classSpecCd').val() == '00500010'){
            if(!Valid.require('tpGoodsCd')){
                return false;
            }
            if(!Valid.require('setPieceQnt')){
                return false;
            }
            if($('#setPieceQnt').val() > 100){
                $('#setPieceQnt').val('');
                Common.alert("warning", GLB_MSG3);
                return false;
            }
            if($('#setSize').val() > 0 && $('#setSize').val() != '' && $('#setSize').val() > $('#setPieceQnt').val()){
                $('#setPieceQnt').val('');
                Common.alert("warning", GLB_MSG4);
                return false;
            }
            if($('#titleSpnNm').val() == '' && $('#dnmnt1Cd').val() == ''){
                if(!Valid.require('titleSpnNm')){
                    return false;
                }
                if (!Valid.require('dnmnt1Cd')) {
                    return false;
                }

            }
            if($('#autoriaBody>tr').length < 1 && $('#ethnCd').val() == ""){
            	Common.alert("warning", "Se debe ingresar Autoría o Etnia.");
            	return false;
            }
            if(!Valid.require('prodPlcCd')){
                return false;
            }
        }
        //Histórico - artístico Validator
        if($('#classSpecCd').val() == '00500003' || $('#classSpecCd').val() == '00500006' || $('#classSpecCd').val() == '00500007'){
            if(!Valid.require('tpGoodsCd')){
                return false;
            }
            if(!Valid.require('setPieceQnt')){
                return false;
            }
            if($('#setPieceQnt').val() > 100){
                $('#setPieceQnt').val('');
                Common.alert("warning", GLB_MSG3);
                return false;
            }
            if($('#setSize').val() > 0 && $('#setSize').val() != '' && $('#setSize').val() > $('#setPieceQnt').val()){
                $('#setPieceQnt').val('');
                Common.alert("warning", GLB_MSG4);
                return false;
            }
            if($('#titleSpnNm').val() == '' && $('#dnmnt1Cd').val() == ''){
                if(!Valid.require('titleSpnNm')){
                    return false;
                }
                if (!Valid.require('dnmnt1Cd')) {
                    return false;
                }

            }
            if(!Valid.require('prodPlcCd')){
                return false;
            }
            if(!Valid.require('styleCd')){
                return false;
            }
            if($('#autoriaBody').children('tr').length < 1){
            	Common.alert("warning", "Autoría es una entrada requerida.");
            	return false;
            }
        }
        //Industrial Validator
        if($('#classSpecCd').val() == '00500005' || $('#classSpecCd').val() == '00500009' || $('#classSpecCd').val() == '00500011') {
            $('#tpAuthConCd').val($('[name=tpAuthConCd2]:checked').val());

            if (!Valid.require('tpGoodsCd')){
                return false;
            }
            if(!Valid.require('setPieceQnt')){
                return false;
            }
            if($('#setPieceQnt').val() > 100){
                $('#setPieceQnt').val('');
                Common.alert("warning", GLB_MSG3);
                return false;
            }
            if($('#setSize').val() > 0 && $('#setSize').val() != '' && $('#setSize').val() > $('#setPieceQnt').val()){
                $('#setPieceQnt').val('');
                Common.alert("warning", GLB_MSG4);
                return false;
            }
            if($('#titleSpnNm').val() == '' && $('#dnmnt1Cd').val() == ''){
                if(!Valid.require('titleSpnNm')){
                    return false;
                }
                if (!Valid.require('dnmnt1Cd')) {
                    return false;
                }

            }
            if(!Valid.require('prodPlcCd')){
                return false;
            }
        }

        if($('[name=datingCd]:checked').val() == '15200002'){
            if(!Valid.require('centuryStCd')){
                return false;
            }
            
            if($('#tpFinCenturyCd').val() != ""){
            	if(!Valid.require('centuryFinCd')){
                    return false;
                }
            }
        }
        if($('[name=datingCd]:checked').val() == '15200003'){
            if(!Valid.require('yearRef')){
                return false;
            }
        }
        if($('[name=tpNoGoodsCd]:checked').val() == 'U'){
            $('#setPieceQnt').removeClass('hide');
            $('#setPieceQnt').css('display','none');
        }
        
        if($('#classSpecCd').val() == '00500002'){
    		if (!Valid.require('periodCd')) {
                return false;
            }
        }


        $('.hide').remove();
        var form = Common.serialize($('#major'));
        Ajax.request('/pm/pmRegInsFicha/createFicha.ajax', form, function(data){
            if(data.result > 0){
                $('.tab2List').attr('data-gen-seq', data.result);
                Common.alert("success", data.successMessage);
                if($('#mvbGenSeq').val() == ''){
                    location.href='/pm/pmRegInsFicha/nuevaFicha.do?mvbGenSeq='+data.result;
                }else{
                    location.reload();
                }
            }

            if(data.errorCode == '-1'){
                Common.alert("warning", data.errorMessage);
                return false;
            }
        }, '');
    });

});