/**
 * init event and event bind
 */
$(function () {
	// Regist table uniqueId getter
	Grid.createUniqueId('tblAddressData');
	Grid.createUniqueId('tblLocMapData');
	
	// Init event
	changeEspecifica();
	addressDataReorder();
	locMapDataReorder();
	
	/**
     * Clasificación específica change event binding
     */
    $(document).on('change', '#classSpecCd', changeEspecifica);
    
    /**
     * Ubicación Politica change event binding
     */
    $(document).on('change', '.pol-loc-group', onChangePolLocCd);
    
    
    /**
     * Dirección add button click event binding
     */
	$(document).on('click', '#btnAddressAdd', onClickBtnAddressAdd);	
	/**
     * Dirección row modify action event binding
     */
	$(document).on('click', '#tblAddressData .btn-modify', onClickBtnAddressModify);	
	/**
     * Dirección row delete action event binding
     */
	$(document).on('click', '#tblAddressData .btn-delete', onClickBtnAddressDelete);
	
	
	/**
     * Tipo de arquitectura	change event binding
     */
    $(document).on('change', '#tpArctCd', onChangeTipo);
    
    /**
     * Plano de ubicación add button click event binding
     */
	$(document).on('click', '#btnLocMapAdd', onClickBtnLocMapAdd);	
    /**
     * Plano de ubicación file upload action event binding
     */
	$(document).on('click', '#btnUploadLocMap', function(e){
        Upload.singlePopOpen({
            "maxTotalFileCount" : '1',			 
            "filePath" : '/hip/pih/temp/locMap', 
            "thumbPath1" : '',                   
            "thumbPath2" : '',                   
            "preFileName" : '',                  
            "customValue" : '',                  
            "uploadId" : ''                     
        });
        e.preventDefault();
        return false;
	});	
	/**
     * Plano de ubicación file download action event binding
     */
	$(document).on('click', '#tblLocMapForm .file-item-link', onClickBtnLocMapDownload);
    /**
     * Plano de ubicación file remove action event binding
     */
    $(document).on('click', '#tblLocMapForm .file-item-remove-link', function(e){
    	$('#tblLocMapForm :hidden.file-item-info').each(function(){
    		$(this).val('');
    	});
    	
    	var $link = $(this).parent();
    	$link.remove();
    	
    	e.preventDefault();
        return false;
    });
    /**
     * Plano de ubicación row download action event binding
     */
	$(document).on('click', '#tblLocMapData .file-item-link', onClickBtnLocMapDownload);
    /**
     * Plano de ubicación row modify action event binding
     */
	$(document).on('click', '#tblLocMapData .btn-modify', onClickBtnLocMapModify);	
	/**
     * Plano de ubicación row delete action event binding
     */
	$(document).on('click', '#tblLocMapData .btn-delete', onClickBtnLocMapDelete);
	
	
	/**
	 * Guardar button click event binding
	 */
	$(document).on('click', '#btnSubmit', onSubmit);
	$(document).on('click', '#btnList', function(){
		$(".loadingWrap").show();  
		location.href = '/pih/pihSrchAdvance/historicoSrchList.do';	
	});
});
/**
 * Clasificación específica change Event Handler
 */
function changeEspecifica(){
	var classSpecCd = $('#classSpecCd').val();
	var forma = $('#classSpecCd option:selected').data('forma');
	$('#forma').val(forma);
	
	if(classSpecCd == ''){
		$('.forma1_area, .forma2_area').addClass('hide');
	}else{
		$('.forma1_area').removeClass('hide');
		
		if(forma === 2){
			$('.forma2_area').removeClass('hide');
		}else{
			$('.forma2_area').addClass('hide').find(':input').each(function(){
				if($(this).is('select')){
					$(this).children().eq(0).prop('selected', true).trigger('change');
				}else{
					$(this).val('').trigger('change');
				}
			});
		}
	}
}
/**
 * Ubicación Politica change Event Handler
 */
function onChangePolLocCd(){
	var targetLevel = $(this).data('level');
	
	var arrPolLocCd = [];
	arrPolLocCd.push($('#deptCd').val());    // level1
	arrPolLocCd.push($('#provinceCd').val());// level2
	arrPolLocCd.push($('#districtCd').val());// level3
	/*
	var ubigeoNo = arrPolLocCd[2] || arrPolLocCd[1] || arrPolLocCd[0]; // last exist data
	
	if($(this).val() == '' && targetLevel == 1){
		$('#ubigeoNo').val('');
	}
	else if($(this).val() != '' && targetLevel > 1){
		$('#ubigeoNo').val(ubigeoNo);
	}
	*/
	$('#ubigeoNo').val(arrPolLocCd[2]);
	
	// Distrito changed
	if(targetLevel == 3) return;
	
	// Next code bind
	var parentCode = arrPolLocCd[targetLevel-1];
	var parentSubCode = parentCode.substr(0, 2*targetLevel);
	//if(parentSubCode == '') return;
	
	if(targetLevel == 1){
		// Departamento changed
		if(parentSubCode == ''){
			var _html = '<option value=\"\" >-- Seleccione --</option>';
			$('#provinceCd').html(_html).trigger('change');
		}else{
			Code.ubigeoCodeList(targetLevel+1, 'Y', parentSubCode, function(result){
				var _html = '<option value=\"\" >-- Seleccione --</option>';
		        result.forEach(function(v, i){
		            _html += '<option value=\"'+v.ubigeoNo+'\">'+v.provinceNm+'</option>';
		        });
		        $('#provinceCd').html(_html).trigger('change');
			});
		}
	} else if(targetLevel == 2){
		// Provincia changed
		if(parentSubCode == ''){
			var _html = '<option value=\"\" >-- Seleccione --</option>';
			$('#districtCd').html(_html);
		}else{
			Code.ubigeoCodeList(targetLevel+1, 'Y', parentSubCode, function(result){
				var _html = '<option value=\"\" >-- Seleccione --</option>';
		        result.forEach(function(v, i){
		            _html += '<option value=\"'+v.ubigeoNo+'\">'+v.districtNm+'</option>';
		        });
		        $('#districtCd').html(_html);
			});
		}
	}
}
/**
 * Tipo de arquitectura	 change Event Handler
 */
function onChangeTipo(){
	Code.stdCodeSortList('Y', 'HRE', '007', $('#tpArctCd').val(), '', '', 'STD_CD ASC', function(result){
        var _html = '<option value=\"\" >-- Seleccione --</option>';
        result.forEach(function(v, i){
            _html += '<option value=\"'+v.stdCd+'\">'+v.cdSpnNm+'</option>';
        });
        $('#tpSubArctCd').html(_html);
    });
}
/**
 * Dirección add button click Event Handler
 */
function onClickBtnAddressAdd(e){
	var data = {};
	data.id = Grid.getUniqueId('tblAddressData');
	data.index = $('#tblAddressData>tr').not('.tr-data-none').length;
	data.rownum = $('#tblAddressData>tr').length;
	data.hreGenSeq = $('#hreGenSeq').val();
	
	// collect form data
	$('#tblAddressForm :input').each(function(){
		var key = $(this).data('name');
		var value = $(this).val();
		data[key] = value;
		
		if($(this).is('select')){
			var nameKey = 'str' + key.charAt(0).toUpperCase() + key.substr(1);
			var nameValue = $(this).find('option:selected').text();
			if(nameValue == "-- Seleccione --"){
				nameValue = "";
			}
			data[nameKey] = nameValue;
		}
	});
	
	// validation
	/*
	if(data.accAddrViaCd == ''){
        Common.alert('warning', errAccAddrViaCd);
        return false;
    }
    */
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
            url : '/pih/pihRegInsFicha/modifyAddrData.ajax',
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
	var tpl = $('#tblAddressDataTpl').html();
	var renderData = tpl.replace(/%(\w+)%/g, function(matched, matchKey){
		return data[matchKey] || '';
	});
	
	$('#tblAddressData tr.tr-data-none').addClass('hide');
	
	if(!!data.targetId){
		// Modify
		var innerHtml = $(renderData).html();
		$('#tblAddressData #'+data.targetId).html(innerHtml);
	}else{
		// Add
		$('#tblAddressData').append(renderData);
	}
	
	// reset form data
	$('#tblAddressForm :input').each(function(){
		$(this).val('');
	});
	
	addressDataReorder();
	
	e.preventDefault();
	return false;
}
/**
 * Dirección modify button click Event Handler
 */
function onClickBtnAddressModify(e){
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
	
	$('#tblAddressForm :input').each(function(){
		var key = $(this).data('name');
		$(this).val(data[key]);
	});
	
	e.preventDefault();
	return false;
}
/**
 * Dirección delete button click Event Handler
 */
function onClickBtnAddressDelete(e){
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
            url : '/pih/pihRegInsFicha/modifyAddrData.ajax',
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
	addressDataReorder();
	
	e.preventDefault();
	return false;
}
/**
 * Dirección data grid force renderering
 */
function addressDataReorder(){
	var $rows = $('#tblAddressData>tr').not('.tr-data-none');
	$rows.each(function(rowIdx, row){
		// Create Row Id
		if($(this).attr('id') == ''){
			$(this).attr('id', 'trAddressData' + Grid.getUniqueId('tblAddressData'));
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
		$('#tblAddressData tr.tr-data-none').removeClass('hide');
	}
	
	//tooltip reset
	$('.bs-tooltip-top').remove();
	$('[data-toggle="tooltip"]').tooltip();
}


/**
 * Plano de ubicación add button click Event Handler
 */
function onClickBtnLocMapAdd(e){
	var data = {};
	data.id = Grid.getUniqueId('tblLocMapData');
	data.index = $('#tblLocMapData>tr').not('.tr-data-none').length;
	data.rownum = $('#tblLocMapData>tr').length;
	data.hreGenSeq = $('#hreGenSeq').val();
	
	// collect form data
	$('#tblLocMapForm :input').each(function(){
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
	var tpl = $('#tblLocMapTpl').html();
	var renderData = tpl.replace(/%(\w+)%/g, function(matched, matchKey){
		return data[matchKey] || '';
	});
	
	$('#tblLocMapData tr.tr-data-none').addClass('hide');
	
	if(!!data.targetId){
		// Modify
		var innerHtml = $(renderData).html();
		$('#tblLocMapData #'+data.targetId).html(innerHtml);
	}else{
		// Add
		$('#tblLocMapData').append(renderData);
	}
	
	// reset form data
	$('#tblLocMapForm :input').each(function(){
		$(this).val('');
	});
	// file link remove
	$('#tblLocMapForm .file-item-link').remove();
	
	locMapDataReorder();
	
	e.preventDefault();
	return false;
}
/**
 * Plano de ubicación file download action event handler
 */
function onClickBtnLocMapDownload(e){
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
 * Plano de ubicación modify button click Event Handler
 */
function onClickBtnLocMapModify(e){
	var $row = $(this).closest('tr');
	var data = {};
	data.targetId = $row.attr('id');
	
	// collect row data
	$row.find(':hidden').each(function(){
		var key = $(this).data('orinName');
		var value = $(this).val();
		data[key] = value;
	});
	
	$('#tblLocMapForm :input').each(function(){
		var key = $(this).data('name');
		$(this).val(data[key]);
	});
	
	var $td = $('#btnUploadLocMap').closest('td');
	$td.find('.file-item-link').remove();
	var $link = $('<a href="#" class="btn_link textDel file-item-link">' + data.archOrgNm + '<i class="file-item-remove-link"></i></a>');
    $link.data(data);
    $link.appendTo($td);
	
	e.preventDefault();
	return false;
}
/**
 * Plano de ubicación delete button click Event Handler
 */
function onClickBtnLocMapDelete(e){
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
	locMapDataReorder();
	
	e.preventDefault();
	return false;
	
}
/**
 * Plano de ubicación data grid force renderering
 */
function locMapDataReorder(){
	var $rows = $('#tblLocMapData>tr').not('.tr-data-none');
	$rows.each(function(rowIdx, row){
		// Create Row Id
		if($(this).attr('id') == ''){
			$(this).attr('id', 'trLocMapData' + Grid.getUniqueId('tblLocMapData'));
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
		$('#tblLocMapData tr.tr-data-none').removeClass('hide');
	}
	
	//tooltip reset
	$('.bs-tooltip-top').remove();
	$('[data-toggle="tooltip"]').tooltip();
}
/**
 * file upload callback
 */
function fnSingleUploadCallback(uploadList) {
    Upload.singlePopClose();
    var $btnFileUpload = $('#btnUploadLocMap');
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
    $('#tblLocMapForm :hidden.file-item-info').each(function(){
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
	var dirrection = $('#tblAddressData>tr').not('.tr-data-none');
	if(dirrection.length == 0){
		Common.alert("warning", "Dirección es una entrada requerida.");
		return false;
	}
	
    Ajax.request('/pih/pihRegInsFicha/createFicha.ajax', $('#major').serializeArray(), function(data){
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