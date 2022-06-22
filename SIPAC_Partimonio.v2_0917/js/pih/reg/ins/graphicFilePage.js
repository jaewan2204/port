/**
 * init event and event bind
 */
$(function () {
	// Regist table uniqueId getter
	Grid.createUniqueId('tblImgData');
	
	// Init event
	imgDataReorder();
	
	/**
     * Tipo de Imagen change event binding
     */
    $(document).on('change', '#imgTpCd', changeImgTpCd);
	
    /**
     * ARCHIVO GRÁFICO add button click event binding
     */
	$(document).on('click', '#btnImgDataAdd', onClickBtnImgDataAdd);	
    /**
     * ARCHIVO GRÁFICO file upload action event binding
     */
	$(document).on('click', '#btnUploadImg', function(e){
		var hreGenSeq = $('#hreGenSeq').val();
		var imgTpCd = $('#imgTpCd').val();
		var shortCd = $('#imgTpCd option:selected').data('shortCd');
		
		if(imgTpCd == '' || shortCd == ''){
			Common.alert('warning', errImgTpCd);
			e.preventDefault();
			return false;
		}
		
		var fileSavePath = '/hip/pih/img/' + hreGenSeq
		var thumbPath1 = '/hip/pih/thumb1/' + hreGenSeq
		var thumbPath2 = '/hip/pih/thumb2/' + hreGenSeq
		var preFileName = hreGenSeq + '_' + shortCd + '_';
        Upload.imagePopOpen({
            "maxTotalFileCount" : '1',	 
            "filePath" : fileSavePath,   
            "thumbPath1" : thumbPath1,           
            "thumbPath2" : thumbPath2,           
            "preFileName" : preFileName, 
            "customValue" : '',                      
            "uploadId" : ''                
        });
        
        e.preventDefault();
        return false;
	});	
	/**
     * ARCHIVO GRÁFICO file download action event binding
     */
    $(document).on('click', '#tblImgDataForm .file-item-link', onClickBtnImgDownload);    
    /**
     * ARCHIVO GRÁFICO file remove action event binding
     */
    $(document).on('click', '#tblImgDataForm .file-item-remove-link', onClickBtnImgDownload);
    /**
     * ARCHIVO GRÁFICO row download action event binding
     */
	$(document).on('click', '#tblImgData .file-item-link', onClickBtnImgDownload);
	/**
     * ARCHIVO GRÁFICO row image view action event binding
     */
	$(document).on('click', '#tblImgData .btn-img-view', onClickBtnImgDataView);
	/**
     * ARCHIVO GRÁFICO row modify action event binding
     */
	//$(document).on('click', '#tblImgData .btn-modify', onClickBtnImgDataModify);
	/**
     * ARCHIVO GRÁFICO row delete action event binding
     */
	$(document).on('click', '#tblImgData .btn-delete', onClickBtnImgDataDelete);
	
	
	/**
     * Orden de impresión set order popup button click event binding
     */
	$(document).on('click', '#btnImgReorderPopup', onClickBtnImgReorderPopup);
	/**
     * Orden de impresión set order popup data row click event binding
     */
	$(document).on('click', '#tblImgOrderData tr',function(){
		$('#tblImgOrderData tr').not($(this)).removeClass('on');
	});
	/**
     * Orden de impresión set order popup data row move action event binding
     */
    $(document).on('click', '.arrowBtn', function(){
        var $tr = $('#tblImgOrderData').children('tr.on');
        if($tr.length == 0){
            Common.alert("warning", errNotFountItem);
            return false;
        }else if($tr.length > 1){
            Common.alert("warning", errNotFountItem);
            return false;
        }
        if($(this).data('type') == 'up'){
            $tr.prev().before($tr);
        }
        if($(this).data('type') == 'down'){
            $tr.next().after($tr);
        }
        if($(this).data('type') == 'top') {
            $firstTr = $('#tblImgOrderData').children('tr').first();
            $($tr).insertBefore($firstTr);
        }else if($(this).data('type') == 'foot'){
            $firstTr = $('#tblImgOrderData').children('tr').last();
            $($tr).insertAfter($firstTr);
        }
    });
    /**
     * Orden de impresión set order popup apply button click event binding
     */
    $(document).on('click', '#btnImgOrderApply',function(e){
    	var $arrImg = [];
    	
    	$('#tblImgOrderData tr').each(function(rowIdx, rowEl){
    		var refId = $(rowEl).data('refId');
    		var $refEl = $('#' + refId);
    		$refEl.find(':hidden[data-orin-name=sortNo]').val(rowIdx);
    		$arrImg.push($('#' + refId).clone(true));
    	})
    	
    	$('#tblImgData').html('').append($arrImg);
    	
    	imgDataReorder();
    	
    	onSubmit(e);
	});
    
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
 * Tipo de Imagen change event binding
 */
function changeImgTpCd(){
	$('#imgTpNm').val('');
	var val = $(this).val();
	//Entrada directa
	if(val == '10900005'){
		$('#imgTpNm').prop('disabled', false);
		$('#imgTpTr').show();
	}else{
		$('#imgTpNm').prop('disabled', true);
		$('#imgTpTr').hide();
	}
}

/**
 * ARCHIVO GRÁFICO add button click Event Handler
 */
function onClickBtnImgDataAdd(e){
	var data = {};
	data.id = Grid.getUniqueId('tblImgData');
	data.index = $('#tblImgData>tr').not('.tr-data-none').length;
	data.rownum = $('#tblImgData>tr').length;
	data.hreGenSeq = $('#hreGenSeq').val();
	data.sortNo = data.id-1;
	
	// collect form data
	$('#tblImgDataForm :input').each(function(){
		var key = $(this).data('name');
		var value = $(this).val();
		data[key] = value;
		
		if($(this).is('select')){
			var nameKey = 'str' + key.charAt(0).toUpperCase() + key.substr(1);
			var nameValue = $(this).find('option:selected').text();
			data[nameKey] = nameValue;
		}
	});
	
	if(data.imgTpCd == '10900005'){
		data.strImgTpCd = data.imgTpNm; 
	}
	
	// validation
	if(data.imgTpCd == ''){
		Common.alert('warning', errImgTpCd);
		return false;
	}
	if(data.imgChgNm == ''){
        Common.alert('warning', errImgFile);
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
            url : '/pih/pihRegInsFicha/modifyImgData.ajax',
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
	var tpl = $('#tblImgDataTpl').html();
	var renderData = tpl.replace(/%(\w+)%/g, function(matched, matchKey){
		return data[matchKey] || '';
	});
	
	$('#tblImgData tr.tr-data-none').addClass('hide');
	
	if(!!data.targetId){
		// Modify
		var innerHtml = $(renderData).html();
		$('#tblImgData #'+data.targetId).html(innerHtml);
	}else{
		// Add
		$('#tblImgData').append(renderData);
	}
	
	// tooltip reset
	$('[data-toggle="tooltip"]').tooltip();
	
	// reset form data
	$('#tblImgDataForm :input').each(function(){
		$(this).val('').trigger('change');
	});
	// file link remove
	$('#tblImgDataForm .file-item-link').remove();
	
	imgDataReorder();
	
	$('#lastSortNo').val(data.sortNo);
	
	// image viewer item append
    data.docBase = global.docBase;
    var imgSliderViewSlideTpl = '<div class="imgSliderView_img"><i><img src="%docBase%/%thub2Path%/%imgChgNm%" alt="%strImgTpCd%" data-img-path="%imgPath%" data-img-chg-nm="%imgChgNm%"></i><p class="imgSliderView_title">%strImgTpCd%</p></div>';
	var imgSliderViewSlideEl = imgSliderViewSlideTpl.replace(/%(\w+)%/g, function(matched, matchKey){
		return data[matchKey] || '';
	});
	$('.imgSliderViewSlide').slick('slickAdd', imgSliderViewSlideEl);
	
	var imgSliderNavSlideTpl = '<div class="imgSliderNav_img"><i><img src="%docBase%/%thub1Path%/%imgChgNm%" alt="%strImgTpCd%" data-img-path="%imgPath%" data-img-chg-nm="%imgChgNm%"></i></div>';
	var imgSliderNavSlideEl = imgSliderNavSlideTpl.replace(/%(\w+)%/g, function(matched, matchKey){
		return data[matchKey] || '';
	});
	$('.imgSliderNavSlide').slick('slickAdd', imgSliderNavSlideEl);
	
	e.preventDefault();
	return false;
}
/**
 * ARCHIVO GRÁFICO file download action event handler
 */
function onClickBtnImgDownload(e){
	var data = $(this).data();
    if(data.imgOrgNm != '' || data.imgChgNm != '' || data.imgPath != '' || data.fileSize != ''){
        var jsonData = {
            "fileOrgName" : data.imgOrgNm,
            "fileChgName" : data.imgChgNm,
            "filePath" : data.imgPath,
            "fileSize" : data.fileSize
        }
        Download.singlePopOpen(jsonData);	 
    }
    e.preventDefault();
    return false;
}

/**
 * ARCHIVO GRÁFICO row image view action event Handler
 */
function onClickBtnImgDataView(e){
	var $targetRow = $(this).closest('tr');

	var arrImg = [];
	var activeSlideIndex = $targetRow.data('slideNo');
	
	$('.imgSliderViewSlide').slick('slickGoTo', activeSlideIndex, false);
	e.preventDefault();
	return false;
	/* Open popup - ImageViewer
	var $rows = $('#tblImgData>tr').not('.tr-data-none');
	$rows.each(function(rowIdx, row){
		var data = {};
		$(this).find(':input').each(function(){
			var key = $(this).data('orinName');
			data[key] = $(this).val();
		});
		
		arrImg.push({
			src: global.docBase + '/' + data.imgPath + '/' + data.imgChgNm,
			dataSlickIndex: $(this).data('slideNo')
		});
	});
	
    var url = '/pm/pmRegInsFicha/getImageViewer.do';
    var title = 'ImageViewer';
    var position = Common.setWindowCenter(1300, 800);
    var status = 'toolbar=no,directories=no,scrollbars=no,resizable=no,status=no,menubar=no, left='+position.setWidth+', top='+position.setHeight+', width=1300, height=800, resizable=no, scrollbars=no';
    window.open('', title, status);
    
    var form = document.getElementById('imgViewFrm');
    form.action = url;
	form.method = 'POST';
	form.target = 'ImageViewer';
	form.elements.activeImage.value = arrImg[activeSlideIndex].src;
	form.elements.activeImageIndex.value = activeSlideIndex;
	form.elements.imageAtachCnt.value = arrImg.length;
	form.elements.imageAtachObject.value = JSON.stringify(arrImg);
	form.submit();
    
	e.preventDefault();
    return false;
    */
}
/**
 * ARCHIVO GRÁFICO modify button click Event Handler
 */
function onClickBtnImgDataModify(e){
	/*
	var $row = $(this).closest('tr');
	var data = {};
	data.targetId = $row.attr('id');
	
	// collect row data
	$row.find(':hidden').each(function(){
		var key = $(this).data('orinName');
		var value = $(this).val();
		data[key] = value;
	});
	
	$('#tblImgDataForm :input').each(function(){
		var key = $(this).data('name');
		$(this).val(data[key]);
	});
	
	var $td = $('#btnUploadImg').closest('td');
	$td.find('.file-item-link').remove();
	var $link = $('<a href="#" class="btn_link textDel file-item-link">' + data.imgOrgNm + '<i class="file-item-remove-link"></i></a>');
    $link.data(data);
    $link.appendTo($td);
	*/
	e.preventDefault();
	return false;
}
/**
 * ARCHIVO GRÁFICO delete button click Event Handler
 */
function onClickBtnImgDataDelete(e){
	if(confirm('¿Está seguro de eliminar la imagen?')){
		//ajax
		var $row = $(this).closest('tr');
		var data = {};
		data.targetId = $row.attr('id');
		data.hreGenSeq = $('#hreGenSeq').val();
		data.slideNo = $row.data('slideNo');
		
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
	            url : '/pih/pihRegInsFicha/modifyImgData.ajax',
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
		imgDataReorder();
		$('.bs-tooltip-top').remove(); // tooltip reset
		
		// image viewer remove
		$('.imgSliderViewSlide').slick('slickRemove', data.slideNo);
		$('.imgSliderNavSlide').slick('slickRemove', data.slideNo);
		
		
		e.preventDefault();
	}else{
		
	}
	return false;
	
}
/**
 * ARCHIVO GRÁFICO data grid force renderering
 */
function imgDataReorder(){
	var arrImgTpCd = [];
	
	var $rows = $('#tblImgData>tr').not('.tr-data-none');
	$rows.each(function(rowIdx, row){
		// Create Row Id
		if($(this).attr('id') == ''){
			$(this).attr('id', 'trImgData' + Grid.getUniqueId('tblImgData'));
		}
		// Row Number
		$(this).find('td').eq(0).text(rowIdx + 1);
		$(this).data('slideNo', rowIdx);
		// Name Index
		$(this).find(':input').each(function(){
			var orinName = $(this).data('orinName');
			var name = $(this).attr('name');
			$(this).attr('name', name.replace(/^(.+\[)(\d+)?(\].+)$/g, '$1' + rowIdx + '$3'));
		});
		
		arrImgTpCd.push('' + $(this).data('imgTpCd'));
	});
	
	$('#imgTpCd option').each(function(){
		var imgTpCd = $(this).val();
		var disabled = imgTpCd != '10900005' && arrImgTpCd.indexOf($(this).val()) > -1;
		$(this).prop('disabled', disabled);
	});
	
	if($rows.length == 0){
		$('#tblImgData tr.tr-data-none').removeClass('hide');
	}
	
	//tooltip reset
	$('.bs-tooltip-top').remove();
	$('[data-toggle="tooltip"]').tooltip();
}
/**
 * Orden de impresión set order popup button click event handler
 */
function onClickBtnImgReorderPopup(e){
	var $rows = $('#tblImgData>tr').not('.tr-data-none');
	$rows.each(function(rowIdx, row){
		var data = {};
		data.refId = $(this).attr('id');
		
		$(this).find(':input').each(function(){
			var key = $(this).data('orinName');
			data[key] = $(this).val();
		});
		
		var tpl = $('#tblImgOrderDataTpl').html();
		var renderData = tpl.replace(/%(\w+)%/g, function(matched, matchKey){
			return data[matchKey] || '';
		});
		
		$('#tblImgOrderData').append(renderData);
	});
	openPopup('graphicOrderChange');
	
	e.preventDefault();
	return false;
}

/**
 * file upload callback
 */
function fnSingleUploadCallback(uploadList) {
    Upload.singlePopClose();
    var $btnFileUpload = $('#btnUploadImg');
    var uploadItem = uploadList[0];
    
    var data = {
		seq: 0, 
		imgPath: uploadList.filePath,
		thub1Path: uploadList.thumbPath1,
		thub2Path: uploadList.thumbPath2,
	    imgOrgNm: uploadItem.originalName,
	    imgChgNm: uploadItem.uploadName,
	    fileSize: uploadItem.size
    };
    
    // bind upload file info
    $('#tblImgDataForm :hidden.file-item-info').each(function(){
		var key = $(this).data('name');
		$(this).val(data[key]);
	});
    
    // remove exist file link
    var $td = $btnFileUpload.closest('td');
    $td.find('.file-item-link').remove();
    
    // create file link
    var $link = $('<a href="#" class="btn_link textDel file-item-link">' + data.imgOrgNm + '<i class="file-item-remove-link"></i></a>');
    $link.data(data);
    $link.appendTo($td);
}


/**
 * Guardar button click Event Handler
 */
function onSubmit(e){
    Ajax.request('/pih/pihRegInsFicha/saveGraphicFile.ajax', $('#major').serializeArray(), function(data){
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