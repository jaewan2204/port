/**
 * init event and event bind
 */
$(function () {
	// Regist table uniqueId getter
	Grid.createUniqueId('tblVrFileData');
	Grid.createUniqueId('tblCmplMapData');
	Grid.createUniqueId('tblInvsPrjtData');
	Grid.createUniqueId('tblBbgpData');
	Grid.createUniqueId('tblDocAnnData');
	Grid.createUniqueId('tblPhotoData');
	Grid.createUniqueId('tblOtherRefData');
	
	// Init event
	vrFileDataReorder();
	cmplMapDataReorder();
	invsPrjtDataReorder();
	bbgpDataReorder();
	docAnnDataReorder();
	photoDataReorder();
	otherRefDataReorder();
	
	/***********************************************************************************************************************
     * Archivo virtual add button click event binding
     */
	$(document).on('click', '#btnVrFileAdd', onClickBtnVrFileAdd);	
    /**
     * Archivo virtual file upload button click event binding
     */
	$(document).on('click', '#btnVrFileUpload', function(e){
		var archTpCd = $(this).data('archTpCd');
		var fileSavePath = '/hip/pih/arch/' + $('#hreGenSeq').val() + '/' + archTpCd;
		
        Upload.single3DPopOpen({
            "maxTotalFileCount" : '1',	 
            "filePath" : fileSavePath,	 
            "thumbPath1" : '',           
            "thumbPath2" : '',           
            "preFileName" : '',          
            "customValue" : '',          
            "uploadId" : 'VrFile' 
        });
        e.preventDefault();
        return false;
	});	
	/**
     * Archivo virtual file download action event binding
     */
	$(document).on('click', '#tblVrFileForm .file-item-link', onClickBtnVrFileDownload);
    /**
     * Archivo virtual file remove action event binding
     */
    $(document).on('click', '#tblVrFileForm .file-item-remove-link', function(e){
    	$('#tblVrFileForm :hidden.file-item-info').each(function(){
    		$(this).val('');
    	});
    	
    	var $link = $(this).parent();
    	$link.remove();
    	
    	e.preventDefault();
        return false;
    });
    /**
     * Archivo virtual row download action event binding
     */
	$(document).on('click', '#tblVrFileData .file-item-link', onClickBtnVrFileDownload);
    /**
     * Archivo virtual row modify action event binding
     */
	$(document).on('click', '#tblVrFileData .btn-modify', onClickBtnVrFileModify);	
	/**
     * Archivo virtual row delete action event binding
     */
	$(document).on('click', '#tblVrFileData .btn-delete', onClickBtnVrFileDelete);
	
	
	/***********************************************************************************************************************
     * Planos complementarios add button click event binding
     */
	$(document).on('click', '#btnCmplMapAdd', onClickBtnCmplMapAdd);	
    /**
     * Planos complementarios file upload button click event binding
     */
	$(document).on('click', '#btnCmplMapUpload', function(e){
		var archTpCd = $(this).data('archTpCd');
		var fileSavePath = '/hip/pih/arch/' + $('#hreGenSeq').val() + '/' + archTpCd;
		
        Upload.singlePopOpen({
            "maxTotalFileCount" : '1',	 
            "filePath" : fileSavePath,	 
            "thumbPath1" : '',           
            "thumbPath2" : '',           
            "preFileName" : '',          
            "customValue" : '',                   
            "uploadId" : 'CmplMap'  
        });
        e.preventDefault();
        return false;
	});	
	/**
     * Planos complementarios file download action event binding
     */
	$(document).on('click', '#tblCmplMapForm .file-item-link', onClickBtnCmplMapDownload);
    /**
     * Planos complementarios file remove action event binding
     */
    $(document).on('click', '#tblCmplMapForm .file-item-remove-link', function(e){
    	$('#tblCmplMapForm :hidden.file-item-info').each(function(){
    		$(this).val('');
    	});
    	
    	var $link = $(this).parent();
    	$link.remove();
    	
    	e.preventDefault();
        return false;
    });
    /**
     * Planos complementarios row download action event binding
     */
	$(document).on('click', '#tblCmplMapData .file-item-link', onClickBtnCmplMapDownload);
    /**
     * Planos complementarios row modify action event binding
     */
	$(document).on('click', '#tblCmplMapData .btn-modify', onClickBtnCmplMapModify);	
	/**
     * Planos complementarios row delete action event binding
     */
	$(document).on('click', '#tblCmplMapData .btn-delete', onClickBtnCmplMapDelete);
	
	
	/***********************************************************************************************************************
     * Proyecto de Investigación add button click event binding
     */
	$(document).on('click', '#btnInvsPrjtAdd', onClickBtnInvsPrjtAdd);	
    /**
     * Proyecto de Investigación file upload button click event binding
     */
	$(document).on('click', '#btnInvsPrjtUpload', function(e){
		var archTpCd = $(this).data('archTpCd');
		var fileSavePath = '/hip/pih/arch/' + $('#hreGenSeq').val() + '/' + archTpCd;
		
        Upload.singlePopOpen({
            "maxTotalFileCount" : '1',	 
            "filePath" : fileSavePath,	 
            "thumbPath1" : '',           
            "thumbPath2" : '',           
            "preFileName" : '',          
            "customValue" : '',                   
            "uploadId" : 'InvsPrjt'      
        });
        e.preventDefault();
        return false;
	});	
	/**
     * Proyecto de Investigación file download action event binding
     */
	$(document).on('click', '#tblInvsPrjtForm .file-item-link', onClickBtnInvsPrjtDownload);
    /**
     * Proyecto de Investigación file remove action event binding
     */
    $(document).on('click', '#tblInvsPrjtForm .file-item-remove-link', function(e){
    	$('#tblInvsPrjtForm :hidden.file-item-info').each(function(){
    		$(this).val('');
    	});
    	
    	var $link = $(this).parent();
    	$link.remove();
    	
    	e.preventDefault();
        return false;
    });
    /**
     * Proyecto de Investigación row download action event binding
     */
	$(document).on('click', '#tblInvsPrjtData .file-item-link', onClickBtnInvsPrjtDownload);
    /**
     * Proyecto de Investigación row modify action event binding
     */
	$(document).on('click', '#tblInvsPrjtData .btn-modify', onClickBtnInvsPrjtModify);	
	/**
     * Proyecto de Investigación row delete action event binding
     */
	$(document).on('click', '#tblInvsPrjtData .btn-delete', onClickBtnInvsPrjtDelete);
	
	
	/***********************************************************************************************************************
     * Bibliografía radio change event binding
     */
	$(document).on('change', '.biblio-group', onChangeBiblio);
	/**
     * Tipo de bibliografía select change event binding
     */
	$(document).on('change', '#tpBbgpCd', onChangeTpBbgpCd);
	/**
     * Tipo de bibliografía add button click event binding
     */
	$(document).on('click', '#btnBbgpDataAdd', onClickBtnBbgpDataAdd);	
	/**
     * Tipo de bibliografía row modify action event binding
     */
	$(document).on('click', '#tblBbgpData .btn-modify', onClickBtnBbgpDataModify);	
	/**
     * Tipo de bibliografía row delete action event binding
     */
	$(document).on('click', '#tblBbgpData .btn-delete', onClickBtnBbgpDataDelete);
	
	
	/***********************************************************************************************************************
     * Nombre de anexo add button click event binding
     */
	$(document).on('click', '#btnDocAnnAdd', onClickBtnDocAnnAdd);	
    /**
     * Nombre de anexo file upload button click event binding
     */
	$(document).on('click', '#btnDocAnnUpload', function(e){
		var archTpCd = $(this).data('archTpCd');
		var fileSavePath = '/hip/pih/arch/' + $('#hreGenSeq').val() + '/' + archTpCd;
		
        Upload.singlePopOpen({
            "maxTotalFileCount" : '1',	 
            "filePath" : fileSavePath,	 
            "thumbPath1" : '',               
            "thumbPath2" : '',           
            "preFileName" : '',          
            "customValue" : '',                
            "uploadId" : 'DocAnn' 
        });
        e.preventDefault();
        return false;
	});	
	/**
     * Nombre de anexo file download action event binding
     */
	$(document).on('click', '#tblDocAnnForm .file-item-link', onClickBtnDocAnnDownload);
    /**
     * Nombre de anexo file remove action event binding
     */
    $(document).on('click', '#tblDocAnnForm .file-item-remove-link', function(e){
    	$('#tblDocAnnForm :hidden.file-item-info').each(function(){
    		$(this).val('');
    	});
    	
    	var $link = $(this).parent();
    	$link.remove();
    	
    	e.preventDefault();
        return false;
    });
    /**
     * Nombre de anexo row download action event binding
     */
	$(document).on('click', '#tblDocAnnData .file-item-link', onClickBtnDocAnnDownload);
    /**
     * Nombre de anexo row modify action event binding
     */
	$(document).on('click', '#tblDocAnnData .btn-modify', onClickBtnDocAnnModify);	
	/**
     * Nombre de anexo row delete action event binding
     */
	$(document).on('click', '#tblDocAnnData .btn-delete', onClickBtnDocAnnDelete);
	
	
	/***********************************************************************************************************************
     * Ficha de campo file upload button click event binding
     */
	$(document).on('click', '#btnFieldFileUpload', function(e){
		var archTpCd = $(this).data('archTpCd');
		var fileSavePath = '/hip/pih/arch/' + $('#hreGenSeq').val() + '/' + archTpCd;
		
		Upload.singlePopOpen({
            "maxTotalFileCount" : '1',	 
            "filePath" : fileSavePath,	 
            "thumbPath1" : '',           
            "thumbPath2" : '',           
            "preFileName" : '',          
            "customValue" : '',          
            "uploadId" : 'FieldFile'    
        });
        e.preventDefault();
        return false;
	});
	/**
     * Ficha de campo file download action event binding
     */
	$(document).on('click', '#tblFieldFileForm .file-item-link', onClickBtnFieldFileDownload);
	
	
	/***********************************************************************************************************************
     * Fotografía add button click event binding
     */
	$(document).on('click', '#btnPhotoAdd', onClickBtnPhotoAdd);	
    /**
     * Fotografía file upload button click event binding
     */
	$(document).on('click', '#btnPhotoUpload', function(e){
		var archTpCd = $(this).data('archTpCd');
		var fileSavePath = '/hip/pih/arch/' + $('#hreGenSeq').val() + '/' + archTpCd;
		
        Upload.singlePopOpen({
            "maxTotalFileCount" : '1',	 
            "filePath" : fileSavePath,	 
            "thumbPath1" : '',           
            "thumbPath2" : '',           
            "preFileName" : '',          
            "customValue" : '',          
            "uploadId" : 'Photo' 
        });
        e.preventDefault();
        return false;
	});	
	/**
     * Fotografía file download action event binding
     */
	$(document).on('click', '#tblPhotoForm .file-item-link', onClickBtnPhotoDownload);
    /**
     * Fotografía file remove action event binding
     */
    $(document).on('click', '#tblPhotoForm .file-item-remove-link', function(e){
    	$('#tblPhotoForm :hidden.file-item-info').each(function(){
    		$(this).val('');
    	});
    	
    	var $link = $(this).parent();
    	$link.remove();
    	
    	e.preventDefault();
        return false;
    });
    /**
     * Fotografía row download action event binding
     */
	$(document).on('click', '#tblPhotoData .file-item-link', onClickBtnPhotoDownload);
    /**
     * Fotografía row modify action event binding
     */
	$(document).on('click', '#tblPhotoData .btn-modify', onClickBtnPhotoModify);	
	/**
     * Fotografía row delete action event binding
     */
	$(document).on('click', '#tblPhotoData .btn-delete', onClickBtnPhotoDelete);
	
	
	/***********************************************************************************************************************
     * Otras referencias add button click event binding
     */
	$(document).on('click', '#btnOtherRefAdd', onClickBtnOtherRefAdd);	
    /**
     * Otras referencias file upload button click event binding
     */
	$(document).on('click', '#btnOtherRefUpload', function(e){
		var archTpCd = $(this).data('archTpCd');
		var fileSavePath = '/hip/pih/arch/' + $('#hreGenSeq').val() + '/' + archTpCd;
		
        Upload.singlePopOpen({
            "maxTotalFileCount" : '1',	 
            "filePath" : fileSavePath,	 
            "thumbPath1" : '',            
            "thumbPath2" : '',           
            "preFileName" : '',          
            "customValue" : '',          
            "uploadId" : 'OtherRef' 
        });
        e.preventDefault();
        return false;
	});	
	/**
     * Otras referencias file download action event binding
     */
	$(document).on('click', '#tblOtherRefForm .file-item-link', onClickBtnOtherRefDownload);
    /**
     * Otras referencias file remove action event binding
     */
    $(document).on('click', '#tblOtherRefForm .file-item-remove-link', function(e){
    	$('#tblOtherRefForm :hidden.file-item-info').each(function(){
    		$(this).val('');
    	});
    	
    	var $link = $(this).parent();
    	$link.remove();
    	
    	e.preventDefault();
        return false;
    });
    /**
     * Otras referencias row download action event binding
     */
	$(document).on('click', '#tblOtherRefData .file-item-link', onClickBtnOtherRefDownload);
    /**
     * Otras referencias row modify action event binding
     */
	$(document).on('click', '#tblOtherRefData .btn-modify', onClickBtnOtherRefModify);	
	/**
     * Otras referencias row delete action event binding
     */
	$(document).on('click', '#tblOtherRefData .btn-delete', onClickBtnOtherRefDelete);
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	/***********************************************************************************************************************
	 * Guardar button click event binding
	 */
	$(document).on('click', '#btnSubmit', onSubmit);
	$(document).on('click', '#btnList', function(){
		$(".loadingWrap").show(); 
		location.href = '/pih/pihSrchAdvance/historicoSrchList.do';	
	});
	
	/***********************************************************************************************************************
	 * Editor set init
	 */
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
        	var textAreaId = ed.id;
            ed.addButton('cSpellCheck', {
               title: 'Verificar Ortografía',
               image: '/images/spellCheckIcon2.gif',
               onclick: function() {
            	   $('#'+textAreaId).val(tinyMCE.get(textAreaId).getContent({format : 'text'}));
	           		var url    ="/pm/pmRegInsFicha/getSpellCheck.do?textAreaId="+textAreaId;
	           		var title  = "spell Check";
	           		var status = "toolbar=no,directories=no,scrollbars=no,resizable=no,status=no,menubar=no,width=600, height=550, resizable = no, scrollbars = no";
	           		window.open(url, title, status); 
               }
            });
         }
	});
});

/***********************************************************************************************************************
 * Archivo virtual add button click Event Handler
 */
function onClickBtnVrFileAdd(e){
	var data = {};
	data.id = Grid.getUniqueId('tblVrFileData');
	data.index = $('#tblVrFileData>tr').not('.tr-data-none').length;
	data.rownum = $('#tblVrFileData>tr').length;
	data.hreGenSeq = $('#hreGenSeq').val();
	
	// collect form data
	$('#tblVrFileForm :input').each(function(){
		var key = $(this).data('name');
		var value = $(this).val();
		data[key] = value;
		
		if($(this).is('select')){
			var nameKey = 'str' + key.charAt(0).toUpperCase() + key.substr(1);
			var nameValue = $(this).find('option:selected').text();
			data[nameKey] = nameValue;
		}
	});
	
	// validation
    if(data.archTitle == ''){
        Common.alert('warning', errArchTitle);
        return false;
    }
	if(data.archChgNm == ''){
        Common.alert('warning', errArchFile);
        return false;
    }
	
	data.dispFileSize = Common.toFileSizeString(data.fileSize);
	
	// has general key
	var ajaxError = false;
	var newSeq = 0;
	if(data.hreGenSeq != ''){
		ajaxError = true;
		
		$.ajax({
            type : 'POST',
            url : '/pih/pihRegInsFicha/modifyArch.ajax',
            async: false,
            dataType : 'json',
            data : data,
            error : function(request, status, error) {
                alert('La comunicación del servidor falló.' + error);
            },
            success : function(data) {
                if(data.result > 0){
                	ajaxError = false;
                	newSeq = data.result;
                }
                if(data.errorCode == '-1'){
                    Common.alert("warning", data.errorMessage);
                }
            }
		});
	}
	if(ajaxError){
		e.preventDefault();
		return false;
	}
	
	data.seq = newSeq;
	
	// template render
	var tpl = $('#tblVrFileDataTpl').html();
	var renderData = tpl.replace(/%(\w+)%/g, function(matched, matchKey){
		return data[matchKey] || '';
	});
	
	$('#tblVrFileData tr.tr-data-none').addClass('hide');
	
	if(!!data.targetId){
		// Modify
		var innerHtml = $(renderData).html();
		$('#tblVrFileData #'+data.targetId).html(innerHtml);
	}else{
		// Add
		$('#tblVrFileData').append(renderData);
	}
	
	// reset form data
	$('#tblVrFileForm :input').each(function(){
		$(this).val('');
	});
	// file link remove
	$('#tblVrFileForm .file-item-link').remove();
	
	vrFileDataReorder();
	
	e.preventDefault();
	return false;
}
/**
 * Archivo virtual file download action event handler
 */
function onClickBtnVrFileDownload(e){
	var data = $(this).data();
    if(data.archOrgNm != '' || data.archChgNm != '' || data.archPath != '' || data.fileSize != ''){
        var jsonData = {
            "fileOrgName" : data.archOrgNm,
            "fileChgName" : data.archChgNm,
            "filePath" : data.archPath,
            "fileSize" : data.fileSize
        }
        Download.singlePopOpen(jsonData);	
    }
    e.preventDefault();
    return false;
}
/**
 * Archivo virtual row modify button click Event Handler
 */
function onClickBtnVrFileModify(e){
	var $row = $(this).closest('tr');
	var data = {};
	data.targetId = $row.attr('id');
	
	// collect row data
	$row.find(':hidden').each(function(){
		var key = $(this).data('orinName');
		var value = $(this).val();
		data[key] = value;
	});
	
	$('#tblVrFileForm :input').each(function(){
		var key = $(this).data('name');
		$(this).val(data[key]);
	});
	
	var $td = $('#btnVrFileUpload').closest('td');
	$td.find('.file-item-link').remove();
	var $link = $('<a href="#" class="btn_link textDel file-item-link">' + data.archOrgNm + '<i class="file-item-remove-link"></i></a>');
    $link.data(data);
    $link.appendTo($td);
	
	e.preventDefault();
	return false;
}
/**
 * Archivo virtual row delete button click Event Handler
 */
function onClickBtnVrFileDelete(e){
	//ajax
	var $row = $(this).closest('tr');
	var data = {};
	data.targetId = $row.attr('id');
	data.hreGenSeq = $('#hreGenSeq').val();
	
	// collect row data
	$row.find(':hidden').each(function(){
		var key = $(this).data('orinName');
		var value = $(this).val();
		data[key] = value;
	});
	
	// has general key
	var ajaxError = false;
	if(data.hreGenSeq != ''){
		ajaxError = true;
		data.activeYn = 'N';
		
		$.ajax({
            type : 'POST',
            url : '/pih/pihRegInsFicha/modifyArch.ajax',
            async: false,
            dataType : 'json',
            data : data,
            error : function(request, status, error) {
                alert('La comunicación del servidor falló.' + error);
            },
            success : function(data) {
                if(data.result > 0){
                	ajaxError = false;
                }
                if(data.errorCode == '-1'){
                    Common.alert("warning", data.errorMessage);
                }
            }
		});
	}
	if(ajaxError){
		e.preventDefault();
		return false;
	}
	
	$row.remove();
	vrFileDataReorder();
	
	e.preventDefault();
	return false;
	
}
/**
 * Archivo virtual data grid force renderering
 */
function vrFileDataReorder(){
	var $rows = $('#tblVrFileData>tr').not('.tr-data-none');
	$rows.each(function(rowIdx, row){
		// Create Row Id
		if($(this).attr('id') == ''){
			$(this).attr('id', 'trVrFileData' + Grid.getUniqueId('tblVrFileData'));
		}
		// Row Number
		$(this).find('td').eq(0).text(rowIdx + 1);
		// Name Index
		$(this).find(':input').each(function(){
			var orinName = $(this).data('orinName');
			var name = $(this).attr('name');
			$(this).attr('name', name.replace(/^(.+\[)(\d+)?(\].+)$/g, '$1' + rowIdx + '$3'));
		});
	});
	
	if($rows.length == 0){
		$('#tblVrFileData tr.tr-data-none').removeClass('hide');
	}
	
	//tooltip reset
	$('.bs-tooltip-top').remove();
	$('[data-toggle="tooltip"]').tooltip();
}


/***********************************************************************************************************************
 * Planos complementarios add button click Event Handler
 */
function onClickBtnCmplMapAdd(e){
	var data = {};
	data.id = Grid.getUniqueId('tblCmplMapData');
	data.index = $('#tblCmplMapData>tr').not('.tr-data-none').length;
	data.rownum = $('#tblCmplMapData>tr').length;
	data.hreGenSeq = $('#hreGenSeq').val();
	
	// collect form data
	$('#tblCmplMapForm :input').each(function(){
		var key = $(this).data('name');
		var value = $(this).val();
		data[key] = value;
		
		if($(this).is('select')){
			var nameKey = 'str' + key.charAt(0).toUpperCase() + key.substr(1);
			var nameValue = $(this).find('option:selected').text();
			data[nameKey] = nameValue;
		}
	});
	
	// validation
    if(data.archTitle == ''){
        Common.alert('warning', errArchTitle);
        return false;
    }
	if(data.archChgNm == ''){
        Common.alert('warning', errArchFile);
        return false;
    }
	
	data.dispFileSize = Common.toFileSizeString(data.fileSize);
	
	// has general key
	var ajaxError = false;
	var newSeq = 0;
	if(data.hreGenSeq != ''){
		ajaxError = true;
		
		$.ajax({
            type : 'POST',
            url : '/pih/pihRegInsFicha/modifyArch.ajax',
            async: false,
            dataType : 'json',
            data : data,
            error : function(request, status, error) {
                alert('La comunicación del servidor falló.' + error);
            },
            success : function(data) {
                if(data.result > 0){
                	ajaxError = false;
                	newSeq = data.result;
                }
                if(data.errorCode == '-1'){
                    Common.alert("warning", data.errorMessage);
                }
            }
		});
	}
	if(ajaxError){
		e.preventDefault();
		return false;
	}
	
	data.seq = newSeq;
	
	// template render
	var tpl = $('#tblCmplMapDataTpl').html();
	var renderData = tpl.replace(/%(\w+)%/g, function(matched, matchKey){
		return data[matchKey] || '';
	});
	
	$('#tblCmplMapData tr.tr-data-none').addClass('hide');
	
	if(!!data.targetId){
		// Modify
		var innerHtml = $(renderData).html();
		$('#tblCmplMapData #'+data.targetId).html(innerHtml);
	}else{
		// Add
		$('#tblCmplMapData').append(renderData);
	}
	
	// reset form data
	$('#tblCmplMapForm :input').each(function(){
		$(this).val('');
	});
	// file link remove
	$('#tblCmplMapForm .file-item-link').remove();
	
	cmplMapDataReorder();
	
	e.preventDefault();
	return false;
}
/**
 * Planos complementarios file download action event handler
 */
function onClickBtnCmplMapDownload(e){
	var data = $(this).data();
    if(data.archOrgNm != '' || data.archChgNm != '' || data.archPath != '' || data.fileSize != ''){
        var jsonData = {
            "fileOrgName" : data.archOrgNm,
            "fileChgName" : data.archChgNm,
            "filePath" : data.archPath,
            "fileSize" : data.fileSize
        }
        Download.singlePopOpen(jsonData);	
    }
    e.preventDefault();
    return false;
}
/**
 * Planos complementarios row modify button click Event Handler
 */
function onClickBtnCmplMapModify(e){
	var $row = $(this).closest('tr');
	var data = {};
	data.targetId = $row.attr('id');
	
	// collect row data
	$row.find(':hidden').each(function(){
		var key = $(this).data('orinName');
		var value = $(this).val();
		data[key] = value;
	});
	
	$('#tblCmplMapForm :input').each(function(){
		var key = $(this).data('name');
		$(this).val(data[key]);
	});
	
	var $td = $('#btnCmplMapUpload').closest('td');
	$td.find('.file-item-link').remove();
	var $link = $('<a href="#" class="btn_link textDel file-item-link">' + data.archOrgNm + '<i class="file-item-remove-link"></i></a>');
    $link.data(data);
    $link.appendTo($td);
	
	e.preventDefault();
	return false;
}
/**
 * Planos complementarios row delete button click Event Handler
 */
function onClickBtnCmplMapDelete(e){
	//ajax
	var $row = $(this).closest('tr');
	var data = {};
	data.targetId = $row.attr('id');
	data.hreGenSeq = $('#hreGenSeq').val();
	
	// collect row data
	$row.find(':hidden').each(function(){
		var key = $(this).data('orinName');
		var value = $(this).val();
		data[key] = value;
	});
	
	// has general key
	var ajaxError = false;
	if(data.hreGenSeq != ''){
		ajaxError = true;
		data.activeYn = 'N';
		
		$.ajax({
            type : 'POST',
            url : '/pih/pihRegInsFicha/modifyArch.ajax',
            async: false,
            dataType : 'json',
            data : data,
            error : function(request, status, error) {
                alert('La comunicación del servidor falló.' + error);
            },
            success : function(data) {
                if(data.result > 0){
                	ajaxError = false;
                }
                if(data.errorCode == '-1'){
                    Common.alert("warning", data.errorMessage);
                }
            }
		});
	}
	if(ajaxError){
		e.preventDefault();
		return false;
	}
	
	$row.remove();
	cmplMapDataReorder();
	
	e.preventDefault();
	return false;
	
}
/**
 * Planos complementarios data grid force renderering
 */
function cmplMapDataReorder(){
	var $rows = $('#tblCmplMapData>tr').not('.tr-data-none');
	$rows.each(function(rowIdx, row){
		// Create Row Id
		if($(this).attr('id') == ''){
			$(this).attr('id', 'trCmplMapData' + Grid.getUniqueId('tblCmplMapData'));
		}
		// Row Number
		$(this).find('td').eq(0).text(rowIdx + 1);
		// Name Index
		$(this).find(':input').each(function(){
			var orinName = $(this).data('orinName');
			var name = $(this).attr('name');
			$(this).attr('name', name.replace(/^(.+\[)(\d+)?(\].+)$/g, '$1' + rowIdx + '$3'));
		});
	});
	
	if($rows.length == 0){
		$('#tblCmplMapData tr.tr-data-none').removeClass('hide');
	}
	
	//tooltip reset
	$('.bs-tooltip-top').remove();
	$('[data-toggle="tooltip"]').tooltip();
}


/***********************************************************************************************************************
 * Proyecto de Investigación add button click Event Handler
 */
function onClickBtnInvsPrjtAdd(e){
	var data = {};
	data.id = Grid.getUniqueId('tblInvsPrjtData');
	data.index = $('#tblInvsPrjtData>tr').not('.tr-data-none').length;
	data.rownum = $('#tblInvsPrjtData>tr').length;
	data.hreGenSeq = $('#hreGenSeq').val();
	
	// collect form data
	$('#tblInvsPrjtForm :input').each(function(){
		var key = $(this).data('name');
		var value = $(this).val();
		data[key] = value;
		
		if($(this).is('select')){
			var nameKey = 'str' + key.charAt(0).toUpperCase() + key.substr(1);
			var nameValue = $(this).find('option:selected').text();
			data[nameKey] = nameValue;
		}
	});
	
	// validation
    if(data.archTitle == ''){
        Common.alert('warning', errArchTitle);
        return false;
    }
	if(data.archChgNm == ''){
        Common.alert('warning', errArchFile);
        return false;
    }
	
	data.dispFileSize = Common.toFileSizeString(data.fileSize);
	
	// has general key
	var ajaxError = false;
	var newSeq = 0;
	if(data.hreGenSeq != ''){
		ajaxError = true;
		
		$.ajax({
            type : 'POST',
            url : '/pih/pihRegInsFicha/modifyArch.ajax',
            async: false,
            dataType : 'json',
            data : data,
            error : function(request, status, error) {
                alert('La comunicación del servidor falló.' + error);
            },
            success : function(data) {
                if(data.result > 0){
                	ajaxError = false;
                	newSeq = data.result;
                }
                if(data.errorCode == '-1'){
                    Common.alert("warning", data.errorMessage);
                }
            }
		});
	}
	if(ajaxError){
		e.preventDefault();
		return false;
	}
	
	data.seq = newSeq;
	
	// template render
	var tpl = $('#tblInvsPrjtDataTpl').html();
	var renderData = tpl.replace(/%(\w+)%/g, function(matched, matchKey){
		return data[matchKey] || '';
	});
	
	$('#tblInvsPrjtData tr.tr-data-none').addClass('hide');
	
	if(!!data.targetId){
		// Modify
		var innerHtml = $(renderData).html();
		$('#tblInvsPrjtData #'+data.targetId).html(innerHtml);
	}else{
		// Add
		$('#tblInvsPrjtData').append(renderData);
	}
	
	// reset form data
	$('#tblInvsPrjtForm :input').each(function(){
		$(this).val('');
	});
	// file link remove
	$('#tblInvsPrjtForm .file-item-link').remove();
	
	invsPrjtDataReorder();
	
	e.preventDefault();
	return false;
}
/**
 * Proyecto de Investigación file download action event handler
 */
function onClickBtnInvsPrjtDownload(e){
	var data = $(this).data();
    if(data.archOrgNm != '' || data.archChgNm != '' || data.archPath != '' || data.fileSize != ''){
        var jsonData = {
            "fileOrgName" : data.archOrgNm,
            "fileChgName" : data.archChgNm,
            "filePath" : data.archPath,
            "fileSize" : data.fileSize
        }
        Download.singlePopOpen(jsonData);	
    }
    e.preventDefault();
    return false;
}
/**
 * Proyecto de Investigación row modify button click Event Handler
 */
function onClickBtnInvsPrjtModify(e){
	var $row = $(this).closest('tr');
	var data = {};
	data.targetId = $row.attr('id');
	
	// collect row data
	$row.find(':hidden').each(function(){
		var key = $(this).data('orinName');
		var value = $(this).val();
		data[key] = value;
	});
	
	$('#tblInvsPrjtForm :input').each(function(){
		var key = $(this).data('name');
		$(this).val(data[key]);
	});
	
	var $td = $('#btnInvsPrjtUpload').closest('td');
	$td.find('.file-item-link').remove();
	var $link = $('<a href="#" class="btn_link textDel file-item-link">' + data.archOrgNm + '<i class="file-item-remove-link"></i></a>');
    $link.data(data);
    $link.appendTo($td);
	
	e.preventDefault();
	return false;
}
/**
 * Proyecto de Investigación row delete button click Event Handler
 */
function onClickBtnInvsPrjtDelete(e){
	//ajax
	var $row = $(this).closest('tr');
	var data = {};
	data.targetId = $row.attr('id');
	data.hreGenSeq = $('#hreGenSeq').val();
	
	// collect row data
	$row.find(':hidden').each(function(){
		var key = $(this).data('orinName');
		var value = $(this).val();
		data[key] = value;
	});
	
	// has general key
	var ajaxError = false;
	if(data.hreGenSeq != ''){
		ajaxError = true;
		data.activeYn = 'N';
		
		$.ajax({
            type : 'POST',
            url : '/pih/pihRegInsFicha/modifyArch.ajax',
            async: false,
            dataType : 'json',
            data : data,
            error : function(request, status, error) {
                alert('La comunicación del servidor falló.' + error);
            },
            success : function(data) {
                if(data.result > 0){
                	ajaxError = false;
                }
                if(data.errorCode == '-1'){
                    Common.alert("warning", data.errorMessage);
                }
            }
		});
	}
	if(ajaxError){
		e.preventDefault();
		return false;
	}
	
	$row.remove();
	invsPrjtDataReorder();
	
	e.preventDefault();
	return false;
	
}
/**
 * Proyecto de Investigación data grid force renderering
 */
function invsPrjtDataReorder(){
	var $rows = $('#tblInvsPrjtData>tr').not('.tr-data-none');
	$rows.each(function(rowIdx, row){
		// Create Row Id
		if($(this).attr('id') == ''){
			$(this).attr('id', 'trInvsPrjtData' + Grid.getUniqueId('tblInvsPrjtData'));
		}
		// Row Number
		$(this).find('td').eq(0).text(rowIdx + 1);
		// Name Index
		$(this).find(':input').each(function(){
			var orinName = $(this).data('orinName');
			var name = $(this).attr('name');
			$(this).attr('name', name.replace(/^(.+\[)(\d+)?(\].+)$/g, '$1' + rowIdx + '$3'));
		});
	});
	
	if($rows.length == 0){
		$('#tblInvsPrjtData tr.tr-data-none').removeClass('hide');
	}
	
	//tooltip reset
	$('.bs-tooltip-top').remove();
	$('[data-toggle="tooltip"]').tooltip();
}


/***********************************************************************************************************************
 * Bibliografía radio change event handler
 */
function onChangeBiblio(e){
	var val = $('.biblio-group:checked').val();
	if(val == 'Y'){
		$('.biblio-group-area').removeClass('hide');
	}else{
		$('.biblio-group-area').addClass('hide');
	}
}
/**
 * Tipo de bibliografía select change event handler
 */
function onChangeTpBbgpCd(){
	var bbgpCd = $('#tpBbgpCd').val();
	$('.bbgp-group-area').addClass('hide').each(function(){
		var tpBbgpCd = $(this).data('tpBbgpCd');
		if(bbgpCd == tpBbgpCd){
			$(this).removeClass('hide');
			$(this).find(':text').val("");
		}
	});
}
/**
 * Tipo de bibliografía add button click Event Handler
 */
function onClickBtnBbgpDataAdd(e){
	var data = {};
	data.id = Grid.getUniqueId('tblBbgpData');
	data.index = $('#tblBbgpData>tr').not('.tr-data-none').length;
	data.rownum = $('#tblBbgpData>tr').length;
	data.hreGenSeq = $('#hreGenSeq').val();
	data.tpBbgpCd = $('#tpBbgpCd').val();
	data.strTpBbgpCd = $('#tpBbgpCd option:selected').text();
	
	// collect form data
	var $bbgpGroupArea = $('#tblBbgpDataForm .bbgp-group-area').filter(function(){
		return $(this).data('tpBbgpCd') == data.tpBbgpCd;
	});
	
	$bbgpGroupArea.find(':input').each(function(){
		var key = $(this).data('name');
		var value = $(this).val();
		data[key] = value;
		
		if($(this).is('select')){
			var nameKey = 'str' + key.charAt(0).toUpperCase() + key.substr(1);
			var nameValue = $(this).find('option:selected').text();
			data[nameKey] = nameValue;
		}
	});
	
	if(data.tpBbgpCd == '12300001' || data.tpBbgpCd == '12300005'){
		data.bbgpDispTitle = data.bbgpTitle;
	} else if(data.tpBbgpCd == '12300004' || data.tpBbgpCd == '12300007'){
		data.bbgpDispTitle = data.bbgpTitleArticle;
	} else if(data.tpBbgpCd == '12300002' || data.tpBbgpCd == '12300006'){
		data.bbgpDispTitle = data.bbgpTitleChapter;
	} else if(data.tpBbgpCd == '12300003'){
		data.bbgpDispTitle = data.bbgpTitleIssue;
	} else{
		data.bbgpDispTitle = '';
	}
	
	// validation
	if(data.accAddrViaCd == ''){
        Common.alert('warning', errAccAddrViaCd);
        return false;
    }
	if(data.accAddrViaSpnNm == ''){
        Common.alert('warning', errAccAddrViaSpnNm);
        return false;
    }
	if(data.accAddrViaNo == ''){
        Common.alert('warning', errAccAddrViaNo);
        return false;
    }
	
	// has general key
	var ajaxError = false;
	var newSeq = 0;
	if(data.hreGenSeq != ''){
		ajaxError = true;
		
		$.ajax({
            type : 'POST',
            url : '/pih/pihRegInsFicha/modifyBbgpData.ajax',
            async: false,
            dataType : 'json',
            data : data,
            error : function(request, status, error) {
                alert('La comunicación del servidor falló.' + error);
            },
            success : function(data) {
                if(data.result > 0){
                	ajaxError = false;
                	newSeq = data.result;
                }
                if(data.errorCode == '-1'){
                    Common.alert("warning", data.errorMessage);
                }
            }
		});
	}
	if(ajaxError){
		e.preventDefault();
		return false;
	}
	
	data.seq = newSeq;
	
	// template render
	var tpl = $('#tblBbgpDataTpl').html();
	var renderData = tpl.replace(/%(\w+)%/g, function(matched, matchKey){
		return data[matchKey] || '';
	});
	
	$('#tblBbgpData tr.tr-data-none').addClass('hide');
	
	if(!!data.targetId){
		// Modify
		var innerHtml = $(renderData).html();
		$('#tblBbgpData #'+data.targetId).html(innerHtml);
	}else{
		// Add
		$('#tblBbgpData').append(renderData);
	}
	
	// reset form data
	$bbgpGroupArea.find(':input').each(function(){
		$(this).val('');
	});
	
	$('#tpBbgpCd').val('').trigger('change');
	
	bbgpDataReorder();
	
	$("#tpBbgpCd").attr("disabled",false);
	
	e.preventDefault();
	return false;
}
/**
 * Tipo de bibliografía row modify button click Event Handler
 */
function onClickBtnBbgpDataModify(e){
	var $row = $(this).closest('tr');
	var data = {};
	data.targetId = $row.attr('id');
	data.hreGenSeq = $('#hreGenSeq').val();
	
	// collect row data
	$row.find(':hidden').each(function(){
		var key = $(this).data('orinName');
		var value = $(this).val();
		data[key] = value;
	});
	
	$('#tpBbgpCd').val(data['tpBbgpCd']).trigger('change');
	
	$('#tblBbgpDataForm :input').each(function(){
		var key = $(this).data('name');
		$(this).val(data[key]);
	});
	
	$("#tpBbgpCd").attr("disabled",true);
	
	e.preventDefault();
	return false;
}
/**
 * Tipo de bibliografía row delete button click Event Handler
 */
function onClickBtnBbgpDataDelete(e){
	//ajax
	var $row = $(this).closest('tr');
	var data = {};
	data.targetId = $row.attr('id');
	data.hreGenSeq = $('#hreGenSeq').val();
	
	// collect row data
	$row.find(':hidden').each(function(){
		var key = $(this).data('orinName');
		var value = $(this).val();
		data[key] = value;
	});
	
	// has general key
	var ajaxError = false;
	if(data.hreGenSeq != ''){
		ajaxError = true;
		data.activeYn = 'N';
		
		$.ajax({
            type : 'POST',
            url : '/pih/pihRegInsFicha/modifyBbgpData.ajax',
            async: false,
            dataType : 'json',
            data : data,
            error : function(request, status, error) {
                alert('La comunicación del servidor falló.' + error);
            },
            success : function(data) {
                if(data.result > 0){
                	ajaxError = false;
                }
                if(data.errorCode == '-1'){
                    Common.alert("warning", data.errorMessage);
                }
            }
		});
	}
	if(ajaxError){
		e.preventDefault();
		return false;
	}
	
	$row.closest('tr').remove();
	bbgpDataReorder();
	
	e.preventDefault();
	return false;
}
/**
 * Tipo de bibliografía data grid force renderering
 */
function bbgpDataReorder(){
	var $rows = $('#tblBbgpData>tr').not('.tr-data-none');
	$rows.each(function(rowIdx, row){
		// Create Row Id
		if($(this).attr('id') == ''){
			$(this).attr('id', 'trBbgpData' + Grid.getUniqueId('tblBbgpData'));
		}
		// Row Number
		$(this).find('td').eq(0).text(rowIdx + 1);
		// Name Index
		$(this).find(':input').each(function(){
			var orinName = $(this).data('orinName');
			var name = $(this).attr('name');
			$(this).attr('name', name.replace(/^(.+\[)(\d+)?(\].+)$/g, '$1' + rowIdx + '$3'));
		});
	});
	
	if($rows.length == 0){
		$('#tblBbgpData tr.tr-data-none').removeClass('hide');
	}
	
	//tooltip reset
	$('.bs-tooltip-top').remove();
	$('[data-toggle="tooltip"]').tooltip();
	
	onChangeBiblio();
	onChangeTpBbgpCd();
}


/***********************************************************************************************************************
 * Nombre de anexo add button click Event Handler
 */
function onClickBtnDocAnnAdd(e){
	var data = {};
	data.id = Grid.getUniqueId('tblDocAnnData');
	data.index = $('#tblDocAnnData>tr').not('.tr-data-none').length;
	data.rownum = $('#tblDocAnnData>tr').length;
	data.hreGenSeq = $('#hreGenSeq').val();
	
	// collect form data
	$('#tblDocAnnForm :input').each(function(){
		var key = $(this).data('name');
		var value = $(this).val();
		data[key] = value;
		
		if($(this).is('select')){
			var nameKey = 'str' + key.charAt(0).toUpperCase() + key.substr(1);
			var nameValue = $(this).find('option:selected').text();
			data[nameKey] = nameValue;
		}
	});
	
	// validation
    if(data.archTitle == ''){
        Common.alert('warning', errArchTitle);
        return false;
    }
	if(data.archChgNm == ''){
        Common.alert('warning', errArchFile);
        return false;
    }
	
	data.dispFileSize = Common.toFileSizeString(data.fileSize);
	
	// has general key
	var ajaxError = false;
	var newSeq = 0;
	if(data.hreGenSeq != ''){
		ajaxError = true;
		
		$.ajax({
            type : 'POST',
            url : '/pih/pihRegInsFicha/modifyArch.ajax',
            async: false,
            dataType : 'json',
            data : data,
            error : function(request, status, error) {
                alert('La comunicación del servidor falló.' + error);
            },
            success : function(data) {
                if(data.result > 0){
                	ajaxError = false;
                	newSeq = data.result;
                }
                if(data.errorCode == '-1'){
                    Common.alert("warning", data.errorMessage);
                }
            }
		});
	}
	if(ajaxError){
		e.preventDefault();
		return false;
	}
	
	data.seq = newSeq;
	
	// template render
	var tpl = $('#tblDocAnnDataTpl').html();
	var renderData = tpl.replace(/%(\w+)%/g, function(matched, matchKey){
		return data[matchKey] || '';
	});
	
	$('#tblDocAnnData tr.tr-data-none').addClass('hide');
	
	if(!!data.targetId){
		// Modify
		var innerHtml = $(renderData).html();
		$('#tblDocAnnData #'+data.targetId).html(innerHtml);
	}else{
		// Add
		$('#tblDocAnnData').append(renderData);
	}
	
	// reset form data
	$('#tblDocAnnForm :input').each(function(){
		$(this).val('');
	});
	// file link remove
	$('#tblDocAnnForm .file-item-link').remove();
	
	docAnnDataReorder();
	
	e.preventDefault();
	return false;
}
/**
 * Nombre de anexo file download action event handler
 */
function onClickBtnDocAnnDownload(e){
	var data = $(this).data();
    if(data.archOrgNm != '' || data.archChgNm != '' || data.archPath != '' || data.fileSize != ''){
        var jsonData = {
            "fileOrgName" : data.archOrgNm,
            "fileChgName" : data.archChgNm,
            "filePath" : data.archPath,
            "fileSize" : data.fileSize
        }
        Download.singlePopOpen(jsonData);	
    }
    e.preventDefault();
    return false;
}
/**
 * Nombre de anexo row modify button click Event Handler
 */
function onClickBtnDocAnnModify(e){
	var $row = $(this).closest('tr');
	var data = {};
	data.targetId = $row.attr('id');
	
	// collect row data
	$row.find(':hidden').each(function(){
		var key = $(this).data('orinName');
		var value = $(this).val();
		data[key] = value;
	});
	
	$('#tblDocAnnForm :input').each(function(){
		var key = $(this).data('name');
		$(this).val(data[key]);
	});
	
	var $td = $('#btnDocAnnUpload').closest('td');
	$td.find('.file-item-link').remove();
	var $link = $('<a href="#" class="btn_link textDel file-item-link">' + data.archOrgNm + '<i class="file-item-remove-link"></i></a>');
    $link.data(data);
    $link.appendTo($td);
	
	e.preventDefault();
	return false;
}
/**
 * Nombre de anexo row delete button click Event Handler
 */
function onClickBtnDocAnnDelete(e){
	//ajax
	var $row = $(this).closest('tr');
	var data = {};
	data.targetId = $row.attr('id');
	data.hreGenSeq = $('#hreGenSeq').val();
	
	// collect row data
	$row.find(':hidden').each(function(){
		var key = $(this).data('orinName');
		var value = $(this).val();
		data[key] = value;
	});
	
	// has general key
	var ajaxError = false;
	if(data.hreGenSeq != ''){
		ajaxError = true;
		data.activeYn = 'N';
		
		$.ajax({
            type : 'POST',
            url : '/pih/pihRegInsFicha/modifyArch.ajax',
            async: false,
            dataType : 'json',
            data : data,
            error : function(request, status, error) {
                alert('La comunicación del servidor falló.' + error);
            },
            success : function(data) {
                if(data.result > 0){
                	ajaxError = false;
                }
                if(data.errorCode == '-1'){
                    Common.alert("warning", data.errorMessage);
                }
            }
		});
	}
	if(ajaxError){
		e.preventDefault();
		return false;
	}
	
	$row.remove();
	docAnnDataReorder();
	
	e.preventDefault();
	return false;
	
}
/**
 * Nombre de anexo data grid force renderering
 */
function docAnnDataReorder(){
	var $rows = $('#tblDocAnnData>tr').not('.tr-data-none');
	$rows.each(function(rowIdx, row){
		// Create Row Id
		if($(this).attr('id') == ''){
			$(this).attr('id', 'trDocAnnData' + Grid.getUniqueId('tblDocAnnData'));
		}
		// Row Number
		$(this).find('td').eq(0).text(rowIdx + 1);
		// Name Index
		$(this).find(':input').each(function(){
			var orinName = $(this).data('orinName');
			var name = $(this).attr('name');
			$(this).attr('name', name.replace(/^(.+\[)(\d+)?(\].+)$/g, '$1' + rowIdx + '$3'));
		});
	});
	
	if($rows.length == 0){
		$('#tblDocAnnData tr.tr-data-none').removeClass('hide');
	}
	
	//tooltip reset
	$('.bs-tooltip-top').remove();
	$('[data-toggle="tooltip"]').tooltip();
}


/***********************************************************************************************************************
 * Ficha de campo file download action event handler
 */
function onClickBtnFieldFileDownload(e){
	var data = $(this).data();
    if(data.archOrgNm != '' || data.archChgNm != '' || data.archPath != '' || data.fileSize != ''){
        var jsonData = {
            "fileOrgName" : data.archOrgNm,
            "fileChgName" : data.archChgNm,
            "filePath" : data.archPath,
            "fileSize" : data.fileSize
        }
        Download.singlePopOpen(jsonData);	
    }
    e.preventDefault();
    return false;
}


/***********************************************************************************************************************
 * Fotografía add button click Event Handler
 */
function onClickBtnPhotoAdd(e){
	var data = {};
	data.id = Grid.getUniqueId('tblPhotoData');
	data.index = $('#tblPhotoData>tr').not('.tr-data-none').length;
	data.rownum = $('#tblPhotoData>tr').length;
	data.hreGenSeq = $('#hreGenSeq').val();
	
	// collect form data
	$('#tblPhotoForm :input').each(function(){
		var key = $(this).data('name');
		var value = $(this).val();
		data[key] = value;
		
		if($(this).is('select')){
			var nameKey = 'str' + key.charAt(0).toUpperCase() + key.substr(1);
			var nameValue = $(this).find('option:selected').text();
			data[nameKey] = nameValue;
		}
	});
	
	// validation
    if(data.archTitle == ''){
        Common.alert('warning', errArchTitle);
        return false;
    }
	if(data.archChgNm == ''){
        Common.alert('warning', errArchFile);
        return false;
    }
	
	data.dispFileSize = Common.toFileSizeString(data.fileSize);
	
	// has general key
	var ajaxError = false;
	var newSeq = 0;
	if(data.hreGenSeq != ''){
		ajaxError = true;
		
		$.ajax({
            type : 'POST',
            url : '/pih/pihRegInsFicha/modifyArch.ajax',
            async: false,
            dataType : 'json',
            data : data,
            error : function(request, status, error) {
                alert('La comunicación del servidor falló.' + error);
            },
            success : function(data) {
                if(data.result > 0){
                	ajaxError = false;
                	newSeq = data.result;
                }
                if(data.errorCode == '-1'){
                    Common.alert("warning", data.errorMessage);
                }
            }
		});
	}
	if(ajaxError){
		e.preventDefault();
		return false;
	}
	
	data.seq = newSeq;
	
	// template render
	var tpl = $('#tblPhotoDataTpl').html();
	var renderData = tpl.replace(/%(\w+)%/g, function(matched, matchKey){
		return data[matchKey] || '';
	});
	
	$('#tblPhotoData tr.tr-data-none').addClass('hide');
	
	if(!!data.targetId){
		// Modify
		var innerHtml = $(renderData).html();
		$('#tblPhotoData #'+data.targetId).html(innerHtml);
	}else{
		// Add
		$('#tblPhotoData').append(renderData);
	}
	
	// reset form data
	$('#tblPhotoForm :input').each(function(){
		$(this).val('');
	});
	// file link remove
	$('#tblPhotoForm .file-item-link').remove();
	
	photoDataReorder();
	
	e.preventDefault();
	return false;
}
/**
 * Fotografía file download action event handler
 */
function onClickBtnPhotoDownload(e){
	var data = $(this).data();
    if(data.archOrgNm != '' || data.archChgNm != '' || data.archPath != '' || data.fileSize != ''){
        var jsonData = {
            "fileOrgName" : data.archOrgNm,
            "fileChgName" : data.archChgNm,
            "filePath" : data.archPath,
            "fileSize" : data.fileSize
        }
        Download.singlePopOpen(jsonData);	
    }
    e.preventDefault();
    return false;
}
/**
 * Fotografía row modify button click Event Handler
 */
function onClickBtnPhotoModify(e){
	var $row = $(this).closest('tr');
	var data = {};
	data.targetId = $row.attr('id');
	
	// collect row data
	$row.find(':hidden').each(function(){
		var key = $(this).data('orinName');
		var value = $(this).val();
		data[key] = value;
	});
	
	$('#tblPhotoForm :input').each(function(){
		var key = $(this).data('name');
		$(this).val(data[key]);
	});
	
	var $td = $('#btnPhotoUpload').closest('td');
	$td.find('.file-item-link').remove();
	var $link = $('<a href="#" class="btn_link textDel file-item-link">' + data.archOrgNm + '<i class="file-item-remove-link"></i></a>');
    $link.data(data);
    $link.appendTo($td);
	
	e.preventDefault();
	return false;
}
/**
 * Fotografía row delete button click Event Handler
 */
function onClickBtnPhotoDelete(e){
	//ajax
	var $row = $(this).closest('tr');
	var data = {};
	data.targetId = $row.attr('id');
	data.hreGenSeq = $('#hreGenSeq').val();
	
	// collect row data
	$row.find(':hidden').each(function(){
		var key = $(this).data('orinName');
		var value = $(this).val();
		data[key] = value;
	});
	
	// has general key
	var ajaxError = false;
	if(data.hreGenSeq != ''){
		ajaxError = true;
		data.activeYn = 'N';
		
		$.ajax({
            type : 'POST',
            url : '/pih/pihRegInsFicha/modifyArch.ajax',
            async: false,
            dataType : 'json',
            data : data,
            error : function(request, status, error) {
                alert('La comunicación del servidor falló.' + error);
            },
            success : function(data) {
                if(data.result > 0){
                	ajaxError = false;
                }
                if(data.errorCode == '-1'){
                    Common.alert("warning", data.errorMessage);
                }
            }
		});
	}
	if(ajaxError){
		e.preventDefault();
		return false;
	}
	
	$row.remove();
	photoDataReorder();
	
	e.preventDefault();
	return false;
	
}
/**
 * Fotografía data grid force renderering
 */
function photoDataReorder(){
	var $rows = $('#tblPhotoData>tr').not('.tr-data-none');
	$rows.each(function(rowIdx, row){
		// Create Row Id
		if($(this).attr('id') == ''){
			$(this).attr('id', 'trPhotoData' + Grid.getUniqueId('tblPhotoData'));
		}
		// Row Number
		$(this).find('td').eq(0).text(rowIdx + 1);
		// Name Index
		$(this).find(':input').each(function(){
			var orinName = $(this).data('orinName');
			var name = $(this).attr('name');
			$(this).attr('name', name.replace(/^(.+\[)(\d+)?(\].+)$/g, '$1' + rowIdx + '$3'));
		});
	});
	
	if($rows.length == 0){
		$('#tblPhotoData tr.tr-data-none').removeClass('hide');
	}
	
	//tooltip reset
	$('.bs-tooltip-top').remove();
	$('[data-toggle="tooltip"]').tooltip();
}


/***********************************************************************************************************************
 * Otras referencias add button click Event Handler
 */
function onClickBtnOtherRefAdd(e){
	var data = {};
	data.id = Grid.getUniqueId('tblOtherRefData');
	data.index = $('#tblOtherRefData>tr').not('.tr-data-none').length;
	data.rownum = $('#tblOtherRefData>tr').length;
	data.hreGenSeq = $('#hreGenSeq').val();
	
	// collect form data
	$('#tblOtherRefForm :input').each(function(){
		var key = $(this).data('name');
		var value = $(this).val();
		data[key] = value;
		
		if($(this).is('select')){
			var nameKey = 'str' + key.charAt(0).toUpperCase() + key.substr(1);
			var nameValue = $(this).find('option:selected').text();
			data[nameKey] = nameValue;
		}
	});
	
	// validation
    if(data.archTitle == ''){
        Common.alert('warning', errArchTitle);
        return false;
    }
	if(data.archChgNm == ''){
        Common.alert('warning', errArchFile);
        return false;
    }
	
	data.dispFileSize = Common.toFileSizeString(data.fileSize);
	
	// has general key
	var ajaxError = false;
	var newSeq = 0;
	if(data.hreGenSeq != ''){
		ajaxError = true;
		
		$.ajax({
            type : 'POST',
            url : '/pih/pihRegInsFicha/modifyArch.ajax',
            async: false,
            dataType : 'json',
            data : data,
            error : function(request, status, error) {
                alert('La comunicación del servidor falló.' + error);
            },
            success : function(data) {
                if(data.result > 0){
                	ajaxError = false;
                	newSeq = data.result;
                }
                if(data.errorCode == '-1'){
                    Common.alert("warning", data.errorMessage);
                }
            }
		});
	}
	if(ajaxError){
		e.preventDefault();
		return false;
	}
	
	data.seq = newSeq;
	
	// template render
	var tpl = $('#tblOtherRefDataTpl').html();
	var renderData = tpl.replace(/%(\w+)%/g, function(matched, matchKey){
		return data[matchKey] || '';
	});
	
	$('#tblOtherRefData tr.tr-data-none').addClass('hide');
	
	if(!!data.targetId){
		// Modify
		var innerHtml = $(renderData).html();
		$('#tblOtherRefData #'+data.targetId).html(innerHtml);
	}else{
		// Add
		$('#tblOtherRefData').append(renderData);
	}
	
	// reset form data
	$('#tblOtherRefForm :input').each(function(){
		$(this).val('');
	});
	// file link remove
	$('#tblOtherRefForm .file-item-link').remove();
	
	otherRefDataReorder();
	
	e.preventDefault();
	return false;
}
/**
 * Otras referencias file download action event handler
 */
function onClickBtnOtherRefDownload(e){
	var data = $(this).data();
    if(data.archOrgNm != '' || data.archChgNm != '' || data.archPath != '' || data.fileSize != ''){
        var jsonData = {
            "fileOrgName" : data.archOrgNm,
            "fileChgName" : data.archChgNm,
            "filePath" : data.archPath,
            "fileSize" : data.fileSize
        }
        Download.singlePopOpen(jsonData);	
    }
    e.preventDefault();
    return false;
}
/**
 * Otras referencias row modify button click Event Handler
 */
function onClickBtnOtherRefModify(e){
	var $row = $(this).closest('tr');
	var data = {};
	data.targetId = $row.attr('id');
	
	// collect row data
	$row.find(':hidden').each(function(){
		var key = $(this).data('orinName');
		var value = $(this).val();
		data[key] = value;
	});
	
	$('#tblOtherRefForm :input').each(function(){
		var key = $(this).data('name');
		$(this).val(data[key]);
	});
	
	var $td = $('#btnOtherRefUpload').closest('td');
	$td.find('.file-item-link').remove();
	var $link = $('<a href="#" class="btn_link textDel file-item-link">' + data.archOrgNm + '<i class="file-item-remove-link"></i></a>');
    $link.data(data);
    $link.appendTo($td);
	
	e.preventDefault();
	return false;
}
/**
 * Otras referencias row delete button click Event Handler
 */
function onClickBtnOtherRefDelete(e){
	//ajax
	var $row = $(this).closest('tr');
	var data = {};
	data.targetId = $row.attr('id');
	data.hreGenSeq = $('#hreGenSeq').val();
	
	// collect row data
	$row.find(':hidden').each(function(){
		var key = $(this).data('orinName');
		var value = $(this).val();
		data[key] = value;
	});
	
	// has general key
	var ajaxError = false;
	if(data.hreGenSeq != ''){
		ajaxError = true;
		data.activeYn = 'N';
		
		$.ajax({
            type : 'POST',
            url : '/pih/pihRegInsFicha/modifyArch.ajax',
            async: false,
            dataType : 'json',
            data : data,
            error : function(request, status, error) {
                alert('La comunicación del servidor falló.' + error);
            },
            success : function(data) {
                if(data.result > 0){
                	ajaxError = false;
                }
                if(data.errorCode == '-1'){
                    Common.alert("warning", data.errorMessage);
                }
            }
		});
	}
	if(ajaxError){
		e.preventDefault();
		return false;
	}
	
	$row.remove();
	otherRefDataReorder();
	
	e.preventDefault();
	return false;
	
}
/**
 * Otras referencias data grid force renderering
 */
function otherRefDataReorder(){
	var $rows = $('#tblOtherRefData>tr').not('.tr-data-none');
	$rows.each(function(rowIdx, row){
		// Create Row Id
		if($(this).attr('id') == ''){
			$(this).attr('id', 'trOtherRefData' + Grid.getUniqueId('tblOtherRefData'));
		}
		// Row Number
		$(this).find('td').eq(0).text(rowIdx + 1);
		// Name Index
		$(this).find(':input').each(function(){
			var orinName = $(this).data('orinName');
			var name = $(this).attr('name');
			$(this).attr('name', name.replace(/^(.+\[)(\d+)?(\].+)$/g, '$1' + rowIdx + '$3'));
		});
	});
	
	if($rows.length == 0){
		$('#tblOtherRefData tr.tr-data-none').removeClass('hide');
	}
	
	//tooltip reset
	$('.bs-tooltip-top').remove();
	$('[data-toggle="tooltip"]').tooltip();
}






















/***********************************************************************************************************************
 * file upload callback
 */
function fnSingleUploadCallback(uploadList) {
    Upload.singlePopClose();
    var uploadId = uploadList.uploadId;
    
    var $btnFileUpload = $('#btn' + uploadId + 'Upload');
    var archTpCd = $btnFileUpload.data('archTpCd');
    var uploadItem = uploadList[0];
    
    var data = {
		seq: 0,  
		archPath: uploadList.filePath,
	    archTpCd: archTpCd,
	    archOrgNm: uploadItem.originalName,
	    archChgNm: uploadItem.uploadName,
	    fileSize: uploadItem.size
    };
    
    // bind upload file info
    $('#tbl' + uploadId + 'Form :hidden.file-item-info').each(function(){
		var key = $(this).data('name');
		$(this).val(data[key]);
	});
    
    // remove exist file link
    var $td = $btnFileUpload.closest('td');
    $td.find('.file-item-link').remove();
    
    // create file link
    var $link = $('<a href="#" class="btn_link textDel file-item-link">' + data.archOrgNm + '<i class="file-item-remove-link"></i></a>');
    $link.data(data);
    $link.appendTo($td);
}

/**
 * Guardar button click Event Handler
 */
function onSubmit(e){
	if($("#campoTitle").val() != ""){//20190823 ADD
		if($("#campoChgnm").data("archChgNm") == ""){
			Common.alert('warning', errArchFile);
	        return false;
		}
	}
	tinyMCE.triggerSave();
    Ajax.request('/pih/pihRegInsFicha/saveAnnData.ajax', $('#major').serializeArray(), function(data){
    	if(data.result > 0){
            $('.tab2List').data('genSeq', data.result);
            Common.alert("success", data.successMessage);
            if($('#hreGenSeq').val() == ''){
                location.href='/pih/pihRegInsFicha/nuevaFicha.do?hreGenSeq='+data.result;
            }else{
                location.reload();
            }
        }

        if(data.errorCode == '-1'){
            Common.alert("warning", data.errorMessage);
            return false;
        }
    });
    
	e.preventDefault();
	return false;
}