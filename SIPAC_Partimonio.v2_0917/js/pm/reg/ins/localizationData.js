/**
 * localizacion  
 */
function changeLocalizacion(){
    var tpLctCd = $('#localizacion').val();
    var userSeq = $('#userInfoUserSeq').val();
    var userPrvt = $('#userInfoUserPrvt').val();
    
    if(tpLctCd != ""){
	    if(userPrvt == "N"){
		    Code.lctInfoCodeList(tpLctCd,function(result){
		        var _html = '<option value=\"\" >-- Seleccione --</option>';
		        result.forEach(function(v, i){
		            if($('#detailNmLctCd').val() == v.lctSeq){
		                _html += '<option value="'+v.lctSeq+'" data-ubigeo-no="'+v.ubigeoNo+'" data-lct-nm="'+v.lctNm+'" data-detail-addr-nm="'+v.detailAddrNm+'" data-hre-yn="'+v.hreYn+'" data-hre-gen-seq="'+v.hreGenSeq+'" data-lng-td="'+v.lngTd+'" data-lt-td="'+v.ltTd+'" selected>'+v.lctNm+'</option>';
		            }else{
		                _html += '<option value="'+v.lctSeq+'" data-ubigeo-no="'+v.ubigeoNo+'" data-lct-nm="'+v.lctNm+'" data-detail-addr-nm="'+v.detailAddrNm+'" data-hre-yn="'+v.hreYn+'" data-hre-gen-seq="'+v.hreGenSeq+'" data-lng-td="'+v.lngTd+'" data-lt-td="'+v.ltTd+'">'+v.lctNm+'</option>';
		            }
		        });
		        $('#nmLctCd').html(_html);
		        if($('#detailNmLctCd').val() != ''){
		            changeNmLctCd();
		        }
		    });
		}else{
			Code.lctInfoUserCodeList('USER_LOC_INFO2', tpLctCd, userSeq,function(result){
		        var _html = '<option value=\"\" >-- Seleccione --</option>';
		        result.forEach(function(v, i){
		        	if($('#detailNmLctCd').val() == v.LCTSEQ){
		        		_html += '<option value="'+v.LCTSEQ+'" data-ubigeo-no="'+v.UBIGEONO+'" data-lct-nm="'+v.LCTNM+'" data-detail-addr-nm="'+v.DETAILADDRNM+'" data-hre-yn="'+v.HREYN+'" data-hre-gen-seq="'+v.HREGENSEQ+'" data-lng-td="'+v.LNGTD+'" data-lt-td="'+v.LTTD+'" selected>'+v.LCTNM+'</option>';
		        	}else{
		        		_html += '<option value="'+v.LCTSEQ+'" data-ubigeo-no="'+v.UBIGEONO+'" data-lct-nm="'+v.LCTNM+'" data-detail-addr-nm="'+v.DETAILADDRNM+'" data-hre-yn="'+v.HREYN+'" data-hre-gen-seq="'+v.HREGENSEQ+'" data-lng-td="'+v.LNGTD+'" data-lt-td="'+v.LTTD+'">'+v.LCTNM+'</option>';
		        	}
		        });
		        $('#nmLctCd').html(_html);
		        if($('#detailNmLctCd').val() != ''){
		            changeNmLctCd();
		        }
		    });
		}
    }else{
    	var _html = '<option value=\"\" >-- Seleccione --</option>';
    	$('#nmLctCd').html(_html);
    	
    	$('.nombre').text("");
        $('.departamento').text("");
        $('.provincia').text("");
        $('.distrito').text("");
        $('.direccion').text("");
        $('.inmueble').text("");
    }
}


/**
 * NmLctCd  
 */
function changeNmLctCd(){
    var ubigeoNo = $('[id=nmLctCd] option:selected').data('ubigeoNo');
    var lctNm = $('[id=nmLctCd] option:selected').data('lctNm');
    var addrNm = $('[id=nmLctCd] option:selected').data('detailAddrNm');
    var hreYn = $('[id=nmLctCd] option:selected').data('hreYn');
    var hreGenSeq = $('[id=nmLctCd] option:selected').data('hreGenSeq');
    $('[name=nmLctCd]').val($('[id=nmLctCd] option:selected').val());

 
    var lngTd = $('[id=nmLctCd] option:selected').data('lngTd');
    var ltTd = $('[id=nmLctCd] option:selected').data('ltTd');

    if(lngTd == '' || ltTd == '' || lngTd == 'undefined' || ltTd == 'undefined'){
        $('.mapView').addClass('hide');
    }else{
        $('.mapView').removeClass('hide');
    }
    
    if(hreYn == 'Y'){
        var url = "/pm/pmRegInsFicha/getHreGen.ajax";
        var jsonData = {
            "hreGenSeq" : hreGenSeq
        };

        Ajax.request(url, jsonData, function(data){
            if(data.MSG = 'success'){
                $('.inmueble').text(data.hreGen.nameSpnNm);
            }
        }, '');
    }
    
    $('.nombre').text(lctNm);
    $('.direccion').text(addrNm);
    
    if(ubigeoNo != null){
	    Code.ubigeoCodeList('', 'Y', ubigeoNo, function(result){
	        result.forEach(function(v, i){
	            $('.departamento').text(v.deptNm);
	            $('.provincia').text(v.provinceNm);
	            $('.distrito').text(v.districtNm);
	        });
	    });
	}

}




/**
 * editor
 */
function fn_openSpellCheck(textAreaId){
 
    $('#'+textAreaId).val(tinyMCE.activeEditor.getContent({format : 'text'}));
    //$('#'+textAreaId).val(tinyMCE.get(textAreaId).getContent().replace(/(<p>)*/gi, '').replace(/<(\/)?p[^>]*>/gi, ''));
    //tinyMCE.triggerSave();
    var url    ="/pm/pmRegInsFicha/getSpellCheck.do?textAreaId="+textAreaId;
    var title  = "spell Check";
    var status = "toolbar=no,directories=no,scrollbars=no,resizable=no,status=no,menubar=no,width=600, height=320, resizable = no, scrollbars = no";

    window.open(url, title, status);
}

 
function fn_setTextValue(textAreaId){
    tinymce.get(textAreaId).setContent($('#'+textAreaId).val());
}
/**
 * //editor
 */


/**
 * FileUpload
 * @param arrayNew
 */
function fnSingleUploadCallback(arrayNew) {
 
    var _html = '';
    var archOrgNm = arrayNew[0].originalName;       
    var archChgNm  = arrayNew[0].uploadName;        
    var fileSize = arrayNew[0].size;                
    var archPath = arrayNew.filePath;               



 
    if($('#file').find('a').length > 0){
    
	    if(archOrgNm != '' && archChgNm != '' && fileSize != '' && archPath != ''){
	        var url = "/pm/pmRegInsFicha/delHipMvbArch.ajax";
	        var jsonData = {
	            "mvbGenSeq" : $('#mvbGenSeq').val(),
	            "archTpCd"  : 'PMB015003'
	        };
	
	        Ajax.request(url, jsonData, function(data){
	            if(data.MSG = 'success'){
	                $('#file').html('');
	            }
	        }, '');
	    }
    }

 
    var mvbGenSeq = $('#mvbGenSeq').val();
    var url = '/pm/pmRegInsFicha/regHipMvbArch.ajax';
    var jsonData = {'mvbGenSeq' : mvbGenSeq, 'archTpCd' : 'PMB015003', 'archOrgNm' : archOrgNm, 'archChgNm' : archChgNm,'fileSize' : fileSize, 'archPath' : archPath}
    Ajax.request(url, jsonData, function(data){
        if(data.MSG == 'success'){
            _html += '<a href="javascript:void(0);" id="fileDownload" data-org-name="' + archOrgNm + '" data-chg-name="' + archChgNm + '" data-file-path="' + archPath + '" data-file-size="' + fileSize + '" data-arch-seq="' + data.resultSeq + '">' + archOrgNm + '</a>';
            _html += '<a href="javascript:void(0);" id="fileDelete" data-arch-seq="' + data.resultSeq + '" data-arch-tp-cd="PMB015003"><i class="xi-close-circle font_red ml5"></i></a>';
            $('#file').html(_html);

        }
    }, '');

    Upload.singlePopClose();  
}

$(function () {
    //editor init
    tinymce.init({
        selector: 'textarea',
        height: 150,
        menubar : false,
        statusbar: false,
        contextmenu: false,
        toolbar : 'italic, cSpellCheck',
        plugins: 'paste',
        extended_valid_elements: '*[*]',
        paste_auto_cleanup_on_paste : true,
        paste_remove_styles: true,
        paste_remove_styles_if_webkit: true,
        paste_strip_class_attributes: true,
        paste_as_text: true,
        force_br_newlines : true,
        force_p_newlines : false,
        forced_root_block : '',

        setup: function(ed) {
            ed.addButton('cSpellCheck', {
                title: 'Verificar Ortografía',
                image: '/images/spellCheckIcon2.gif',
                onclick: function() {
                    fn_openSpellCheck(ed.id);
                }
            });
        }

    });

    if ($('#tpInputLctCd').val() == '' || $('#tpInputLctCd').val() == null) {
        Common.alert("warning", GLB_MSG2);
        $('#submitBnt').attr('id', '');
        return false;
    }
});

$(document).ready(function(){
 
    $("#localizacion").change(function(){
       changeLocalizacion();
    });

 
    $("#nmLctCd").change(function(){
        changeNmLctCd();
    });

 
    $("#dataNmLctCd").change(function(){
        $('[name=nmLctCd]').val($('[id=dataNmLctCd] option:selected').val());
        $('.dataDepartamento').text($('[id=dataNmLctCd] option:selected').data('deptNm'));
        $('.dataProvincia').text($('[id=dataNmLctCd] option:selected').data('provinceNm'));
        $('.dataDistrito').text($('[id=dataNmLctCd] option:selected').data('districtNm'));
    });

 
    if($('[name=tpLctCd]').val() != '' && $('[name=tpLctCd]').val() != undefined){
        if ($('#tpInputLctCd').val() == 'L') {
 
            changeLocalizacion();
        }else{
            $('.dataDepartamento').text($('[id=dataNmLctCd] option:selected').data('deptNm'));
            $('.dataProvincia').text($('[id=dataNmLctCd] option:selected').data('provinceNm'));
            $('.dataDistrito').text($('[id=dataNmLctCd] option:selected').data('districtNm'));
        }
    }else{
    	$('.dataDepartamento').text($('[id=dataNmLctCd] option:selected').data('deptNm'));
        $('.dataProvincia').text($('[id=dataNmLctCd] option:selected').data('provinceNm'));
        $('.dataDistrito').text($('[id=dataNmLctCd] option:selected').data('districtNm'));
    }


    /**
     * radio box click Event
     */
    $("input:radio[name=situationCd]").click(function(){
        if($('[name=situationCd]:checked').val() == 'Y'){
            $('.situationDiv').addClass('hide');
        }else{
            $('.situationDiv').removeClass('hide');
        }
    });


    /**
     * File Archivo Btn Click
     */
    $("#fileUpload").click(function() {
 

        var maxTotalFileCount = "1";						                 
        var filePath = "/hip/pm/pmRegInsFicha/localizacion/file";			 
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



 
    $(document).on('click', '#fileDownload', function(){
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
    
 
    $(document).on('click', '#fileDelete', function(){
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
                $('#file').html('');
            }
        }, '');
    });


 
    $(document).on('click', '#submitBnt', function(){
        tinyMCE.triggerSave();

        if($('[name=nmLctCd]').val() == ''){
            Common.alert("warning", GLB_MSG);
            return false;
        }

        $('.hide').remove();
        var form = Common.serialize($('#major'));
        Ajax.request('/pm/pmRegInsFicha/modifyLocalization.ajax', form, function(data){
            if(data.result > 0){
                Common.alert("success", data.successMessage);
                location.reload();
            }

            if(data.errorCode == '-1'){
                Common.alert("warning", data.errorMessage);
                return false;
            }
        }, '');
    });
});

function fnPopupSpatialInfo(usrId, seq){
	var url    = $("#gisUrl").val() + "/main.do?domain=hip&userId="+usrId+"&type=mvb&seq="+seq;
	var title  = "SIG | Ministerio de cultra";
	var status = "toolbar=no,directories=no,scrollbars=no,resizable=no,status=no,menubar=no,width=1000, height=800, resizable = no, scrollbars = no";
	 
	window.open(url, title, status); 
	
}