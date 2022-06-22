function fnSingleUploadCallback(arrayNew) {
 
    $('#archOrgNm').val(arrayNew[0].originalName);      
    $('#archChgNm').val(arrayNew[0].uploadName);        
    $('#fileSize').val(arrayNew[0].size);               
    $('#archPath').val(arrayNew.filePath);               
    
    $('#uploadFileNm').text(arrayNew[0].originalName); 
    $("#uploadFileDel").removeClass('hide');

    Upload.singlePopClose();  
}


function detailUbigeoNo2(){
    var ubigeoNo = $('#ubigeoNo').val().substring(0,2);
    var ubigeoNo2 = $('#ubigeoNo').val().substring(0,4)+'00';
    $('#ubigeoNo1').val(ubigeoNo+'0000');
    Code.ubigeoCodeList('2', 'Y', ubigeoNo, function(result){
        var _html = '<option value=\"\" >-- Seleccione --</option>';
        result.forEach(function(v, i){
            if(ubigeoNo2 == v.ubigeoNo){
                _html += '<option value=\"'+v.ubigeoNo+'\" selected>'+v.provinceNm+'</option>';
            }else{
                _html += '<option value=\"'+v.ubigeoNo+'\">'+v.provinceNm+'</option>';
            }
        });
        $('#ubigeoNo2').html(_html);
    });
}

function detailUbigeoNo3(){
    var ubigeoNo2 = $('#ubigeoNo').val().substring(0,4);
    Code.ubigeoCodeList('3', 'Y', ubigeoNo2, function(result){
        var _html = '<option value=\"\" >-- Seleccione --</option>';
        result.forEach(function(v, i){
            if($('#ubigeoNo').val() == v.ubigeoNo){
                _html += '<option value=\"'+v.ubigeoNo+'\" selected>'+v.districtNm+'</option>';
            }else{
                _html += '<option value=\"'+v.ubigeoNo+'\">'+v.districtNm+'</option>';
            }
        });
        $('#ubigeoNo3').html(_html);
    });
}
/*
function changeDnmntLctOrgn1Cd(){
    $('#deptNm2').text('');
    $('#provinceNm2').text('');
    $('#districtNm2').text('');
    if($('#tpProvCd').val() == '06800002'){
        Code.stdCodeList('Y', 'MVB', '070', $('#classProvCd').val(), '', $('#dnmntLctOrgn1Cd').val(), function (result) {
            var _html = '<option value=\"\" >-- Seleccione --</option>';
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
*/

function changeDnmntLctOrgn2Cd(){
    var ref2Cd = $('#dnmntLctOrgn2Cd').find('option:selected').data('ref2Cd');
    Code.ubigeoCodeList('3', 'Y', ref2Cd, function(result){
        if(result.length > 0 && ref2Cd != null){
            $('#deptNm2').text(result[0].deptNm);
            $('#provinceNm2').text(result[0].provinceNm);
            $('#districtNm2').text(result[0].districtNm);
        }
    });
}

function changeExcvYn(){
    if($('[name=excvtYn]:checked').val() == 'Y'){
        Code.stdCodeList('Y', 'MVB', '074', '', '2', '',function(result){
            var _html = '<option value=\"\" >-- Seleccione --</option>';
            result.forEach(function(v, i){
                _html += '<option value=\"'+v.stdCd+'\" data-etc-nm=\"'+v.etcNm+'\">'+v.cdSpnNm+'</option>';
            });
            $('#archTpCd').html(_html);
        });
        $('.excvtIsY').removeClass('hide');
    }else{
        $('#archTpCd').html('<option value="" >-- Seleccione --</option>)');
        $('.excvtIsY').addClass('hide');
        $('#fechaText').text('');
    }
}

function changeClassProvCd(){
    $('#deptNm2').text('');
    $('#provinceNm2').text('');
    $('#districtNm2').text('');
    var stdCd = '';
    $('#dnmntLctOrgn2Cd').html('<option value="" >-- Seleccione --</option>)');
    if($('#tpProvCd').val() == '06800002'){
    	stdCd = '070';
    }else if($('#tpProvCd').val() == '06800003'){
        stdCd = '071';
    }else if($('#tpProvCd').val() == '06800004'){
        stdCd = '072';
    }
 
    Code.stdCodeList('Y', 'MVB', stdCd, $('#classProvCd').val(), '', '',function(result){
        var _html = '<option value=\"\" >-- Seleccione --</option>';
        result.forEach(function(v, i){
            _html += '<option value=\"'+v.stdCd+'\" data-ref2-cd=\"'+v.ref2Cd+'\">'+v.cdSpnNm+'</option>';
        });
        $('#dnmntLctOrgn2Cd').html(_html);
        if($('#detailDnmntLctOrgn2Cd').val() != ''){
            $('#dnmntLctOrgn2Cd').val($('#detailDnmntLctOrgn2Cd').val());
            $('#detailDnmntLctOrgn2Cd').val('');
            
            if($('#dnmntLctOrgn2Cd').val() != ""){
            	changeDnmntLctOrgn2Cd();
        	}
        }
    });
 
}

function  changeTpProvCd(){
    $('#deptNm2').text('');
    $('#provinceNm2').text('');
    $('#districtNm2').text('');
    $('#dnmntLctOrgn1Cd').html('<option value="" >-- Seleccione --</option>)');
    $('#dnmntLctOrgn2Cd').html('<option value="" >-- Seleccione --</option>)');

    if($('#tpProvCd').val() == '06800001'){        
        $('.historico').removeClass('hide');
        $('.notHistorico').addClass('hide');
    }else if($('#tpProvCd').val() == '06800002' || $('#tpProvCd').val() == '06800003' || $('#tpProvCd').val() == '06800004'){
        $('.historico').addClass('hide');
        $('.notHistorico').removeClass('hide');
        Code.stdCodeList('Y', 'MVB', '069', $('#tpProvCd').val(), '', '', function(result){
            var _html = '<option value=\"\" >-- Seleccione --</option>';
            result.forEach(function(v, i){
                _html += '<option value=\"'+v.stdCd+'\">'+v.cdSpnNm+'</option>';
            });
            $('#classProvCd').html(_html);
            if($('#detailClassProvCd').val() != ''){
                $('#classProvCd').val($('#detailClassProvCd').val());
                $('#detailClassProvCd').val('');
            }
        });
    }else{
        $('.historico').addClass('hide');
        $('.notHistorico').addClass('hide');
    }

    $('#dnmntLctOrgn1Cd').addClass('hide');
}

function searchAgregar(data){
    var _html = '';
    if(data.list.length > 0){
        data.list.forEach(function(v, i){
        	var preRegNoTxt = v.preRegNo || '',
        		ntnlRegCdNoTxt = v.ntnlRegCdNo || '';
        	
        	if(Common.isNull(preRegNoTxt) == false){
        		preRegNoTxt = Common.lpad(preRegNoTxt, 10, '0');
    		}
        	
        	if(Common.isNull(ntnlRegCdNoTxt) == false){
    			ntnlRegCdNoTxt = 'BC-INHIS-' + Common.lpad(ntnlRegCdNoTxt, 10, '0');
    		}
        	
            _html += '<tr>';
            if(i == 0){
                _html +=    '<td class="w_50"><input data-district-nm="'+(v.districtNm == null ? '' : v.districtNm)+'" data-province-nm="'+(v.provinceNm == null ? '' : v.provinceNm)+'" data-dept-nm="'+(v.deptNm == null ? '' : v.deptNm)+'" data-name-spn-nm="'+(v.nameSpnNm == null ? '' : v.nameSpnNm)+'" data-class-spec-cd="'+v.classSpecCd+'" data-estado="'+v.stateCd+'" data-condicion-cultural="'+v.culCondCd+'" type="radio" name="agregarSelect" value="'+v.hreGenSeq+'" checked></td>';
            }else{
                _html +=    '<td class="w_50"><input data-district-nm="'+(v.districtNm == null ? '' : v.districtNm)+'" data-province-nm="'+(v.provinceNm == null ? '' : v.provinceNm)+'" data-dept-nm="'+(v.deptNm == null ? '' : v.deptNm)+'" data-name-spn-nm="'+(v.nameSpnNm == null ? '' : v.nameSpnNm)+'" data-class-spec-cd="'+v.classSpecCd+'" data-estado="'+v.stateCd+'" data-condicion-cultural="'+v.culCondCd+'" type="radio" name="agregarSelect" value="'+v.hreGenSeq+'"></td>';
            }
            _html +=    '<td style="width:108px">'+preRegNoTxt+'</td>';
            _html +=    '<td style="width:108px">'+ntnlRegCdNoTxt+'</td>';
            _html +=    '<td style="width:180px">'+(v.nameSpnNm == null ? '' : v.nameSpnNm)+'</td>';
            _html +=    '<td style="width:108px">'+(v.deptNm == null ? '' : v.deptNm)+'</td>';
            _html +=    '<td style="width:108px">'+(v.provinceNm == null ? '' : v.provinceNm)+'</td>';
            _html +=    '<td style="width:108px">'+(v.districtNm == null ? '' : v.districtNm)+'</td>';
            _html += '</tr>';
        });

        $('#popupBody').html(_html);
        $("#pageIndex_agregarPopup").val(data.list[0].pageInfo.page);
        Common.pageMaker4Popup("agregarPopup", data.list[0].pageInfo.totalRows);
    }else{
    	_html += '<tr class="tr-data-none none_data_center150">';
    	_html += 	'<td colspan="7">';
    	_html += 		'<div class="dataNone2 h_150"><i>' + noDataMsg + '</i></div>';
    	_html += 	'</td>';
    	_html += '</tr>';
    	
        $('#popupBody').html(_html);
        $("#pageIndex_agregarPopup").val(1);
        Common.pageMaker4Popup("agregarPopup", 0);
    }
    $('#popupBody').closest('.modal').layerCenter();
}
$(function () {

    if($('#ubigeoNo').val() != ''){
        detailUbigeoNo2();
        detailUbigeoNo3();
    }

    if($('#hreGenSeq').val() != ''){
        var hreGenSeq = $('#hreGenSeq').val();
        var url = "/pm/pmRegInsFicha/getHreGen.ajax";
        var jsonData = {
            "hreGenSeq" : hreGenSeq
        };
        Ajax.request('/pm/pmRegInsFicha/getHreGen.ajax', jsonData, function(data){
            $('#classSpecCdSpan').text(data.hreGen.classSpecCd == null ? '' : data.hreGen.classSpecCd);
            $('#estado').text(data.hreGen.stateCd == null ? '' : data.hreGen.stateCd);
            $('#condicion').text(data.hreGen.culCondCd == null ? '' : data.hreGen.culCondCd);
            $('#nombre').text(data.hreGen.nameSpnNm == null ? '' : data.hreGen.nameSpnNm);
            $('#deptNm').text(data.hreGen.deptNm == null ? '' : data.hreGen.deptNm);
            $('#provinceNm').text(data.hreGen.provinceNm == null ? '' : data.hreGen.provinceNm);
            $('#districtNm').text(data.hreGen.districtNm == null ? '' : data.hreGen.districtNm);
        }, '');
    }

    if($('#detailDnmntLctOrgn1Cd').val() != ''){
        changeDnmntLctOrgn1Cd();
    }

    if($('#detailDnmntLctOrgn2Cd').val() != ''){
        changeDnmntLctOrgn2Cd();
    }

    if($('#detailClassProvCd').val() != ''){
        changeClassProvCd();
    }

    if($('#detailTpProvCd').val() != ''){
        changeTpProvCd();
    }

    if($('#detailExcvtYn') != ''){
        changeExcvYn();
    }

    /**
     * Departamento Change Event
     */
    $(document).on('change', '#ubigeoNo1', function(){
        $('#ubigeoNo').val($(this).val());
        var ubigeoNo = $(this).val().substring(0,2);
        Code.ubigeoCodeList('2', 'Y', ubigeoNo, function(result){
            var _html = '<option value=\"\" >-- Seleccione --</option>';
            result.forEach(function(v, i){
                _html += '<option value=\"'+v.ubigeoNo+'\">'+v.provinceNm+'</option>';
            });
            $('#ubigeoNo2').html(_html);
        });
    });

    /**
     * Provincia Change Event
     */
    $(document).on('change', '#ubigeoNo2', function(){
        $('#ubigeoNo').val($(this).val());
        var ubigeoNo = $(this).val().substring(0,4);
        Code.ubigeoCodeList('3', 'Y', ubigeoNo, function(result){
            var _html = '<option value=\"\" >-- Seleccione --</option>';
            result.forEach(function(v, i){
                _html += '<option value=\"'+v.ubigeoNo+'\">'+v.districtNm+'</option>';
            });
            $('#ubigeoNo3').html(_html);
        });
    });

    /**
     * Distrito Change Event
     */
    $(document).on('change', '#ubigeoNo3', function() {
        $('#ubigeoNo').val($(this).val());
    });

    /**
     *
     Tipo de Procedencia Change Event
     */
    $(document).on('change', '#tpProvCd', function(){
        changeTpProvCd();
    });

    /**
     * classProvCd Change Event
     */
    $(document).on('change', '#classProvCd', function(){
        changeClassProvCd();
    });

    /**
     * dnmntLctOrgn1Cd Change Event
     */
    $(document).on('change', '#dnmntLctOrgn1Cd', function(){
        changeDnmntLctOrgn1Cd();
    });

    $(document).on('change', '#dnmntLctOrgn2Cd', function(){
        changeDnmntLctOrgn2Cd();
    });


    /**
     *  Agregar Inmueble Historico Popup Open
     */
    $(document).on('click', '.agregarBtn', function(){
        openPopup('agregarPopup');
        LayerGoToPage(1, 'agregarPopup');
    })


    /**
     *  Agregar Inmueble Historico  
     */
    $(document).on('click', '.guardarBtn', function(){
    	LayerGoToPage(1, 'agregarPopup');
    });

 
    $(document).on('click', '#guardarSubmitBtn', function(){
        if($('[name=agregarSelect]:checked').val() == null){
            Common.alert("warning", GLB_MSG);
            return false;
        }
        var classSpecCdSpan = $('[name=agregarSelect]:checked').data('classSpecCd') == null ? '' : $('[name=agregarSelect]:checked').data('classSpecCd');
        var estado = $('[name=agregarSelect]:checked').data('estado') == null ? '' : $('[name=agregarSelect]:checked').data('estado');
        var condicion = $('[name=agregarSelect]:checked').data('condicionCultural') == null ? '' : $('[name=agregarSelect]:checked').data('condicionCultural');
        var nombre = $('[name=agregarSelect]:checked').data('nameSpnNm') == null ? '' : $('[name=agregarSelect]:checked').data('nameSpnNm');
        var deptNm = $('[name=agregarSelect]:checked').data('deptNm') == null ? '' : $('[name=agregarSelect]:checked').data('deptNm');
        var provinceNm = $('[name=agregarSelect]:checked').data('provinceNm') == null ? '' : $('[name=agregarSelect]:checked').data('provinceNm');
        var districtNm = $('[name=agregarSelect]:checked').data('districtNm') == null ? '' : $('[name=agregarSelect]:checked').data('districtNm');

        $('#hreGenSeq').val($('[name=agregarSelect]:checked').val());
        $('#classSpecCdSpan').text(classSpecCdSpan);
        $('#estado').text(estado);
        $('#condicion').text(condicion);
        $('#nombre').text(nombre);
        $('#deptNm').text(deptNm);
        $('#provinceNm').text(provinceNm);
        $('#districtNm').text(districtNm);

        $('#agregarPopup').css('display','none');
    });

    /**
     * Tiene referencia Change Event
     */
    $(document).on('change', '[name=excvtRefYn]', function(){
        if($('[name=excvtRefYn]:checked').val() == 'Y'){
            $('.excvtRefIsY').removeClass('hide');
        }else{
            $('.campoText').val('');
            $('.excvtRefIsY').addClass('hide');
        }
    });

    /**
     * Excavación Change Event
     */
    $(document).on('change', '[name=excvtYn]', function(){
        changeExcvYn();
    });

    /**
     * Nombre Change Event
     */
    $(document).on('change', '#archTpCd', function(){
        if($(this).find('option:selected').val() == ''){
            $('#fechaText').text('');
            return false;
        }
        $('#archTitle').val($("#archTpCd option:checked").text());                             //Nombre Text
        $('#archRelDt').val($("#archTpCd option:checked").data('etcNm'));                      //Fecha
        $('#refCt').val($("#archTpCd option:checked").val());
        $('#fechaText').text($("#archTpCd option:checked").data('etcNm'));
    });


    /**
     * regist Click Event
     */
    $(document).on('click', '#submitBtn', function(){
        if($('[name=geogrpAreaCd]').val() == ''){
            Common.alert("warning", GLB_MSG2);
            return false;
        }

        if($('#tpProvCd').val() == '06800001' && $('#hreGenSeq').val() == ''){
            Common.alert("warning", GLB_MSG3);
            return false;
        }
        $('.hide').remove();
        var form = Common.serialize($('#major'));
        Ajax.request('/pm/pmRegInsFicha/modifyProvenance.ajax', form, function(data){
            if(data.result > 0){
                Common.alert("success", data.successMessage);
                location.reload();
                return false;
            }

            if(data.errorCode == '-1'){
                Common.alert("warning", data.errorMessage);
                return false;
            }
        }, '');
    });

 
    $(document).on('click', '#fileUpload', function() {
        var maxTotalFileCount = "1";						 
        var filePath = "/hip/pm/pmRegInsFicha/provenanceData/file";			 
        var thumbPath1 = "";	 
        var thumbPath2 = "";	 
        var preFileName = "";								 
        var customValue = "";								 
        var uploadId = "";						 

        var jsonData = {
            "maxTotalFileCount" : maxTotalFileCount,
            "filePath" : filePath,
            "thumbPath1" : thumbPath1,
            "thumbPath2" : thumbPath2,
            "preFileName" : preFileName,
            "customValue" : customValue,
            "uploadId" : uploadId
        };
        Upload.singlePopOpen(jsonData);		 
    });

    /**
     * Proyecto de arqueológico  
     */
    $('#addAgregarBtn').click(function(){
        var _html = $('#arqueologicoBody').html();
        var archTitle = $('#archTitle').val();
        var archRelDt = $('#archRelDt').val();
        var archOrgNm = $('#archOrgNm').val();
        var archChgNm = $('#archChgNm').val();
        var fileSize = $('#fileSize').val();
        var archPath = $('#archPath').val();
        var mvbGenSeq = $('#mvbGenSeq').val();
        var refCt = $('#refCt').val();

        if(archTitle == '' || archRelDt == ''){
            Common.alert("warning", GLB_MSG4);
            return false;
        }
        if(archOrgNm == '' || archChgNm == '' || fileSize == '' || archPath == ''){
            Common.alert("warning", GLB_MSG5);
            return false;
        }

            var url = '/pm/pmRegInsFicha/regHipMvbArch.ajax';
            var jsonData = {'mvbGenSeq' : mvbGenSeq, 'archTpCd' : 'PMB015001', 'archTitle' : archTitle, 'archRelDt' : archRelDt, 'refCt' : refCt,'archOrgNm' : archOrgNm, 'archChgNm' : archChgNm,'fileSize' : fileSize, 'archPath' : archPath}
            Ajax.request(url, jsonData, function(data){
                if(data.MSG == 'success'){
                    _html += '<tr>';
                    _html +=    '<td name="arqueologicoIndex"></td>';
                    _html +=      '<td>'+ archTitle +'</td>';
                    _html +=      '<td><a href="javascript:void(0);" class="btn_link archivoDownload" data-org-name="'+archOrgNm+'" data-chg-name="'+archChgNm+'" data-file-path="'+archPath+'" data-file-size="'+fileSize+'" data-arch-seq="'+data.resultSeq+'">'+archOrgNm+'</a></td>';
                    _html +=      '<td>'+ archRelDt +'</td>';
                    _html +=      '<td>';
                    _html +=        '<div class="dt-list-control">';
                    _html +=          '<span data-toggle="tooltip" data-placement="top" title="' + tooltipDelete + '"><i class="xi-trash archivoDelete" data-arch-seq="'+data.resultSeq+'" data-arch-tp-cd="PMB015001"></i></span>';
                    _html +=        '</div>';
                    _html +=      '</td>';
                    _html += '</tr>';
                    $('#arqueologicoBody').html(_html);
                    $('[name=arqueologicoIndex]').each(function(i, v){
                        v.textContent=i+1;
                    });

 
                    $('#tr_none').remove();
                    $('#fechaText').text('');
                    $("#archTpCd").val('');
                    $('#archTitle').val('');
                    $('#archRelDt').val('');
                    $('#archOrgNm').val('');
                    $('#archChgNm').val('');
                    $('#fileSize').val('');
                    $('#archPath').val('');
                    $('#refCt').val('');
                    
                    $("#uploadFileNm").text("");
            		$("#uploadFileDel").addClass('hide');
            		
 
            		$('[data-toggle="tooltip"]').tooltip();
                }
            }, '');
    });

    /**
     * File Download Btn Click Event
     */
    $(document).on('click', '.archivoDownload', function(){
        var orgName = $(this).data('orgName');
        var chgName = $(this).data('chgName');
        var filePath = $(this).data('filePath');
        var fileSize = $(this).data('fileSize');

        if(orgName != '' || chgName != '' || filePath != '' || fileSize != ''){
            var jsonData = {
                "fileOrgName" : orgName,	 
                "fileChgName" : chgName,	 
                "filePath" : filePath,		 
                "fileSize" : fileSize		 
            }
            Download.singlePopOpen(jsonData);	 
        }
    });

    /**
     * File Delete Btn Click Event
     */
    $(document).on('click', '.archivoDelete', function(){
        var _this = $(this);
        var mvbGenSeq = $('#mvbGenSeq').val();
        var hipMvbArchSeq = $(this).data('archSeq');
        var archTpCd = $(this).data('archTpCd');
        var url = "/pm/pmRegInsFicha/delHipMvbArch.ajax";
        var jsonData = {
            "mvbGenSeq" : mvbGenSeq,
            "archTpCd"  : archTpCd,
            "hipMvbArchSeq" : hipMvbArchSeq
        };

        Ajax.request(url, jsonData, function(data){
            if(data.MSG = 'success'){
                $(_this).closest('tr').remove();
                $('[name=arqueologicoIndex]').each(function(i, v){
                    v.textContent=i+1;
                });
            }
        }, '');
    });
});

//Vista de detalle - Upload File Remove
function fnUploadFileDel() {
	
	if(confirm(conDelMsg)) {
		$("#uploadFileNm").text("");
		$("#archOrgNm, #archChgNm, #archPath, #fileSize").val("");
		$("#uploadFileDel").addClass('hide');
	}
}

 
function fnUploadFileDown() {
	
	var jsonData = {
			"fileOrgName" : $("#archOrgNm").val(),	 
			"fileChgName" : $("#archChgNm").val(),	 
			"filePath" : $("#archPath").val(),		 
			"fileSize" : $("#fileSize").val()		 
		}
	Download.singlePopOpen(jsonData);	 
}
