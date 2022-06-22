/**
 * init event and event bind
 */
$(function () {
	
	var forma = $('#forma').val();
	if(forma == 2){
		$('.forma2_area').removeClass('hide');
	}else{
		$('.forma2_area').addClass('hide');
	}
	
	// Regist table uniqueId getter
	Grid.createUniqueId('tblAcompDataMainData');
	Grid.createUniqueId('tblAcompDataSubData');
	Grid.createUniqueId('tblDelimLgBsCdData');
	Grid.createUniqueId('tblAdjData');
	Grid.createUniqueId('tblDelimMapData');
	
	// Init event
	acompDataMainDataReorder();
	acompDataSubDataReorder();
	delimLgBsCdDataReorder();
	adjDataReorder();
	delimMapDataReorder();
	
 
    $(document).on('keyup', '.isNumber', function(e){
        $(this).val($(this).val().replace(/[^0-9]/gi, ''));
    });
    
	/**
     * Componentes principales change event binding
     */
    $(document).on('change', '#tblAcompDataMainForm .actt-comp-cd', onChangeActtCompCd);	
    /**
     * Componentes principales add button click event binding
     */
	$(document).on('click', '#tblAcompDataMainForm #btnAcompDataMainAdd', onClickBtnAcompDataMainAdd);	
	/**
     * Componentes principales row delete action event binding
     */
	$(document).on('click', '#tblAcompDataMainData .btn-delete', onClickBtnAcompDataMainDelete);	
	
	
	/**
     * Componentes secundarios add button click event binding
     */
	$(document).on('click', '#tblAcompDataSubForm #btnAcompDataSubAdd', onClickBtnAcompDataSubAdd);
	/**
     * Componentes secundarios row delete action event binding
     */
	$(document).on('click', '#tblAcompDataSubData .btn-delete', onClickBtnAcompDataSubDelete);
	
	
	/**
     *  Delimitación legal popup open button click event binding
     */
	$(document).on('click', '#btnLegalInfoLayerOpen', onClickBtnLegalInfoLayerOpen);
	/**
     *  Delimitación legal popup row selector change event binding
     */
	$(document).on('change', '#legalInfoLayer .layer-paging-row-selector', onChangeLegalInfoLayerRows);
	/**
     *  Delimitación legal popup search button click event binding
     */
	$(document).on('click', '#legalInfoLayer .layer-form-submit', onSrchLegalInfoSearch);
	/**
     *  Delimitación legal popup pager search button click event binding
     */
	$(document).on('click', '#legalInfoLayer .layer-grid-pager a', onSrchLegalInfoPagerSearch);
	/**
     *  Delimitación legal popup search condition reset button click event binding
     */	
	$(document).on('click', '#legalInfoLayer .layer-form-reset-btn', onSrchLegalInforReset);
	/**
	 *  Delimitación legal popup check all selector change event binding
	 */
	$(document).on('change', '#legalInfoLayer .layer-data-check-all', onChangeLegalInfoLayerDataCheckAll);
	/**
     *  Delimitación legal popup select button click event binding
     */	
	$(document).on('click', '#legalInfoLayer #btnLegalInfoSelect', onClickBtnDelimLgBsCdDataAdd);
	/**
     * Delimitación row file download action event binding
     */
	$(document).on('click', '#tblDelimLgBsCdData .btn-download', onClickBtnDelimLgBsCdDataDownload);
	/**
     * Delimitación row delete action event binding
     */
	$(document).on('click', '#tblDelimLgBsCdData .btn-delete', onClickBtnDelimLgBsCdDataDelete);
	
	
	
	/**
     * Colindancias add button click event binding
     */
	$(document).on('click', '#btnAdjDataAdd', onClickBtnAdjDataAdd);
    /**
     * Colindancias row modify action event binding
     */
	$(document).on('click', '#tblAdjData .btn-modify', onClickBtnAdjDataModify);
	/**
     * Colindancias row delete action event binding
     */
	$(document).on('click', '#tblAdjData .btn-delete', onClickBtnAdjDataDelete);
	
	
	/**
     * Plano de delimitación add button click event binding
     */
	$(document).on('click', '#btnDelimMapAdd', onClickBtnDelimMapAdd);
    /**
     * Plano de delimitación file upload action event binding
     */
	$(document).on('click', '#btnUploadDelimMap', function(e){
		var archTpCd = $(this).data('archTpCd');
		var fileSavePath = '/hip/pih/arch/' + $('#hreGenSeq').val() + '/' + archTpCd;
		
        Upload.singlePopOpen({
            "maxTotalFileCount" : '1',	 
            "filePath" : fileSavePath,	 
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
     * Plano de delimitación file download action event binding
     */
    $(document).on('click', '#tblDelimMapForm .file-item-link', function(e){
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
    });
    /**
     * Plano de delimitación file remove action event binding
     */
    $(document).on('click', '#tblDelimMapForm .file-item-remove-link', function(e){
    	$('#tblDelimMapForm :hidden.file-item-info').each(function(){
    		$(this).val('');
    	});
    	
    	var $link = $(this).parent();
    	$link.remove();
    	
    	e.preventDefault();
        return false;
    });
    /**
     * Plano de delimitación row modify action event binding
     */
	$(document).on('click', '#tblDelimMapData .btn-modify', onClickBtnDelimMapModify);
	/**
     * Plano de delimitación row delete action event binding
     */
	$(document).on('click', '#tblDelimMapData .btn-delete', onClickBtnDelimMapDelete);
	
	
	/**
	 * Guardar button click event binding
	 */
	$(document).on('click', '#btnSubmit', onSubmit);
	$(document).on('click', '#btnList', function(){
		$(".loadingWrap").show();  
		location.href = '/pih/pihSrchAdvance/historicoSrchList.do';	
	});
	
	
	/**
	 * Editor set init
	 */
	tinymce.init({
	    selector: 'textarea',
	    height: 150,
	    menubar: false,
	    statusbar: false,
	    contextmenu: false,
	    toolbar: 'italic, cSpellCheck',
	    plugins: 'paste',
	    extended_valid_elements: '*[*]',
	    paste_auto_cleanup_on_paste: true,
	    paste_remove_styles: true,
	    paste_remove_styles_if_webkit: true,
	    paste_strip_class_attributes: true,
	    paste_as_text: true,
	    force_br_newlines: true,
	    force_p_newlines: false,
	    forced_root_block: '',
	    setup: function(editor) {
	    	var textAreaId = editor.id;
	        editor.maxLength = document.getElementById(textAreaId).maxLength || 0;
	        
	        editor.addButton('cSpellCheck', {
	            title: 'Verificar Ortografía',
	            image: '/images/spellCheckIcon2.gif',
	            onclick: function() {
	                $('#' + textAreaId).val(tinyMCE.get(textAreaId).getContent({format: 'text'}));
	                var url = "/pm/pmRegInsFicha/getSpellCheck.do?textAreaId=" + textAreaId;
	                var title = "spell Check";
	                var status = "toolbar=no,directories=no,scrollbars=no,resizable=no,status=no,menubar=no,width=600, height=550, resizable = no, scrollbars = no";
	                window.open(url, title, status);
	            }
	        });
	    }
	});
	
});


/**
 * Componentes principales change Event Handler
 */
function onChangeActtCompCd(){
	var $target = $(this);
	var pCd = $target.val() || 'NONE';
	
	// has next select
	if($target.next().is('select')){
		Code.stdCodeList('Y', 'HRE', '029', pCd, '', '', function(result){
	        var _html = '<option value=\"\" >-- Seleccione --</option>';
	        result.forEach(function(v, i){
	            _html += '<option value=\"'+v.stdCd+'\">'+v.cdSpnNm+'</option>';
	        });
	        $target.next().html(_html);
	    });
	}
}
/**
 * Componentes principales add button click Event Handler
 */
function onClickBtnAcompDataMainAdd(e){
	// collect form data
	var $targetList = $('#tblAcompDataMainForm select').filter(function(){
		return $(this).data('name') == 'acttCompCd' && $(this).val() != '';
	});
	
	$targetList.each(function(targetIdx, targetEl){
		onClickBtnAcompDataMainRender(targetEl);	
	});
	$('[data-toggle="tooltip"]').tooltip(); //tooltip setting
	e.preventDefault();
	return false;
}
/**
 * Componentes principales renderer
 */
function onClickBtnAcompDataMainRender(targetEl){
	var data = {};
	data.id = Grid.getUniqueId('tblAcompDataMainData');
	data.index = $('#tblAcompDataMainData>tr').not('.tr-data-none').length;
	data.rownum = $('#tblAcompDataMainData>tr').length;
	data.hreGenSeq = $('#hreGenSeq').val();
	data.tpActtCd = 'PIH025001';
	
	var $row = $(targetEl).closest('tr');
	
	$row.find(':input').each(function(){
		var key = $(this).data('name');
		var value = $(this).val();
		data[key] = value;
		
		if($(this).is('select')){
			var nameKey = 'str' + key.charAt(0).toUpperCase() + key.substr(1);
			var nameValue = $(this).find('option:selected').text();
			data[nameKey] = nameValue;
		}
	});
	
	var arrStrActtCompCd = [data.strActtCompCd];
	if(data.subActtCompCd) arrStrActtCompCd.push(data.strSubActtCompCd);
	if(data.subActtCompQnt) arrStrActtCompCd.push(data.subActtCompQnt);
	data.strActtCompCd = arrStrActtCompCd.join(' - ');

	// validation
	if(data.tpActtCompCd == ''){
        Common.alert('warning', errTpActtCompCd);
        return false;
    }
	if(data.acttCompCd == ''){
        Common.alert('warning', errActtCompCd);
        return false;
    }
	
	// template render
	var tpl = $('#tblAcompDataMainDataTpl').html();
	var renderData = tpl.replace(/%(\w+)%/g, function(matched, matchKey){
		return data[matchKey] || '';
	});
	/*
	// has general key
	var ajaxError = false;
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
	*/
	$('#tblAcompDataMainData tr.tr-data-none').addClass('hide');
	
	// duplicate group item select
	var $renderEl = $(renderData);
	var hasCls = $renderEl.attr('class');
	var $groupItems = $('#tblAcompDataMainData tr.' + hasCls);
	
	// load material code list
	Code.stdCodeList('Y', 'HRE', '030', data.acttCompCd, '', '', function(result){
        var _html = '<option value=\"\" >-- Seleccione --</option>';
        result.forEach(function(v, i){
            _html += '<option value=\"'+v.stdCd+'\">'+v.cdSpnNm+'</option>';
        });
        
        var $mtrlEl = $('#trAcompDataMainData' + data.id).find('select');
        
        var hasChildren = result.length > 0;
        if(hasChildren == false){
        	$mtrlEl.prop('disabled', true).addClass('hide');
        }else{
        	$mtrlEl.prop('disabled', false).removeClass('hide');
        }
        
        $mtrlEl.html(_html);
    });
	
	// Add
	if($groupItems.length == 0){
		$('#tblAcompDataMainData').append($renderEl);
	}else{
		if($groupItems.find('#acttCompCd_' + data.acttCompCd).length == 0){
			$groupItems.first().find('td').first().attr('rowSpan', $groupItems.length + 1);
			$renderEl.find('td').first().remove();
			$renderEl.insertAfter($groupItems.last());	
		}
	}	
	
	// reset form data
	$row.find(':input').each(function(){
		if($(this).prop('readonly') !== true){
			$(this).val('').trigger('change');
		}
	});
	
	acompDataMainDataReorder();
}
/**
 * Componentes principales delete button click Event Handler
 */
function onClickBtnAcompDataMainDelete(e){
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
            url : '/pih/pihRegInsFicha/modifyAcompData.ajax',
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
	
	// duplicate group item select
	var hasCls = $row.attr('class');
	var $groupItems = $('#tblAcompDataMainData tr.' + hasCls);
	
	// rowspan
	var $firstTd = $row.find('td').first();
	var rowspan = $firstTd.attr('rowspan') || 1;
	if(rowspan == 1){
		var $targetRow = $groupItems.first();
		var $targetTd = $targetRow.find('td').first();
		$targetTd.attr('rowspan', $targetTd.attr('rowspan') - 1);
	}else{
		var $targetRow = $groupItems.not($row).first();
		var $targetTd = $firstTd.clone();
		$targetTd.attr('rowspan', rowspan - 1);
		$targetTd.insertBefore($targetRow.find('td').first());
	}
	
	$row.remove();
	acompDataMainDataReorder();
	$('.bs-tooltip-top').remove(); //tooltip reset
	
	e.preventDefault();
	return false;
}
/**
 * Componentes principales data grid force renderering
 */
function acompDataMainDataReorder(){
	var $rows = $('#tblAcompDataMainData>tr').not('.tr-data-none');
	$rows.each(function(rowIdx, row){
		// Create Row Id
		if($(this).attr('id') == ''){
			$(this).attr('id', 'trAcompDataMainData' + Grid.getUniqueId('tblAcompDataMainData'));
		}
		// Name Index
		$(this).find(':input').each(function(){
			var orinName = $(this).data('orinName');
			var name = $(this).attr('name');
			$(this).attr('name', name.replace(/^(.+\[)(\d+)?(\].+)$/g, '$1' + rowIdx + '$3'));
		});
	});
	
	if($rows.length == 0){
		$('#tblAcompDataMainData tr.tr-data-none').removeClass('hide');
	}
	
	//tooltip reset
	$('.bs-tooltip-top').remove();
	$('[data-toggle="tooltip"]').tooltip();
}


/**
 * Componentes secundarios add button click Event Handler
 */
function onClickBtnAcompDataSubAdd(e){
	// collect form data
	var $targetList = $('#tblAcompDataSubForm select').filter(function(){
		return $(this).data('name') == 'acttCompCd' && $(this).val() != '';
	});
	
	$targetList.each(function(targetIdx, targetEl){
		onClickBtnAcompDataSubRender(targetEl);	
	});
	
	e.preventDefault();
	return false;
}
/**
 * Componentes secundarios renderer
 */
function onClickBtnAcompDataSubRender(targetEl){
	var data = {};
	data.id = Grid.getUniqueId('tblAcompDataSubData');
	data.index = $('#tblAcompDataSubData>tr').not('.tr-data-none').length;
	data.rownum = $('#tblAcompDataSubData>tr').length;
	data.hreGenSeq = $('#hreGenSeq').val();
	data.tpActtCd = 'PIH025002';
	
	var $row = $(targetEl).closest('tr');
	
	$row.find(':input').each(function(){
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
	if(data.tpActtCompCd == ''){
        Common.alert('warning', errTpActtCompCd);
        return false;
    }
	if(data.acttCompCd == ''){
        Common.alert('warning', errActtCompCd);
        return false;
    }
	
	// template render
	var tpl = $('#tblAcompDataSubDataTpl').html();
	var renderData = tpl.replace(/%(\w+)%/g, function(matched, matchKey){
		return data[matchKey] || '';
	});
	/*
	// has general key
	var ajaxError = false;
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
	*/
	$('#tblAcompDataSubData tr.tr-data-none').addClass('hide');
	
	// duplicate group item select
	var $renderEl = $(renderData);
	var hasCls = $renderEl.attr('class');
	var $groupItems = $('#tblAcompDataSubData tr.' + hasCls);
	
	// load material code list
	Code.stdCodeList('Y', 'HRE', '033', data.acttCompCd, '', '', function(result){
        var _html = '<option value=\"\" >-- Seleccione --</option>';
        result.forEach(function(v, i){
            _html += '<option value=\"'+v.stdCd+'\">'+v.cdSpnNm+'</option>';
        });
        
        var $mtrlEl = $('#trAcompDataSubData' + data.id).find('select');
        $mtrlEl.html(_html).prop('disabled', result.length == 0);
    });
	
	// Add
	if($groupItems.length == 0){
		$('#tblAcompDataSubData').append($renderEl);
	}else{
		if($groupItems.find('#acttCompCd_' + data.acttCompCd).length == 0){
			$groupItems.first().find('td').first().attr('rowSpan', $groupItems.length + 1);
			$renderEl.find('td').first().remove();
			$renderEl.insertAfter($groupItems.last());	
		}
	}
	
	// reset form data
	$row.find(':input').each(function(){
		if($(this).prop('readonly') !== true){
			$(this).val('').trigger('change');
		}
	});
	
	acompDataSubDataReorder();
}
/**
 * Componentes secundarios delete button click Event Handler
 */
function onClickBtnAcompDataSubDelete(e){
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
            url : '/pih/pihRegInsFicha/modifyAcompData.ajax',
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
	
	// duplicate group item select
	var hasCls = $row.attr('class');
	var $groupItems = $('#tblAcompDataSubData tr.' + hasCls);
	
	// rowspan
	var $firstTd = $row.find('td').first();
	var rowspan = $firstTd.attr('rowspan') || 1;
	if(rowspan == 1){
		var $targetRow = $groupItems.first();
		var $targetTd = $targetRow.find('td').first();
		$targetTd.attr('rowspan', $targetTd.attr('rowspan') - 1);
	}else{
		var $targetRow = $groupItems.not($row).first();
		var $targetTd = $firstTd.clone();
		$targetTd.attr('rowspan', rowspan - 1);
		$targetTd.insertBefore($targetRow.find('td').first());
	}
	
	$row.remove();
	acompDataSubDataReorder();
	
	e.preventDefault();
	return false;
}
/**
 * Componentes secundarios data grid force renderering
 */
function acompDataSubDataReorder(){
	var $rows = $('#tblAcompDataSubData>tr').not('.tr-data-none');
	$rows.each(function(rowIdx, row){
		// Create Row Id
		if($(this).attr('id') == ''){
			$(this).attr('id', 'trAcompDataSubData' + Grid.getUniqueId('tblAcompDataSubData'));
		}
		// Name Index
		$(this).find(':input').each(function(){
			var orinName = $(this).data('orinName');
			var name = $(this).attr('name');
			$(this).attr('name', name.replace(/^(.+\[)(\d+)?(\].+)$/g, '$1' + rowIdx + '$3'));
		});
	});
	
	if($rows.length == 0){
		$('#tblAcompDataSubData tr.tr-data-none').removeClass('hide');
	}
	
	//tooltip reset
	$('.bs-tooltip-top').remove();
	$('[data-toggle="tooltip"]').tooltip();
}


/**
 *  Delimitación legal popup open button click event handler
 */
function onClickBtnLegalInfoLayerOpen(e){
	//form data clear
	var form = document.getElementById('tblLegalInfoLayerForm');
	form.reset();
	form.elements.fromIndex.value = 1;
	form.elements.toIndex.value = 10;
	form.elements.pageIndex.value = 1;
	form.elements.rows.value = 10;
	//grid data clear
	onSrchLegalInfoDataClear();
	//popup open
	openPopup('legalInfoLayer');
	onSrchLegalInfoSearch(e);
	
	e.preventDefault();
    return false;
}
/**
 *  Delimitación legal popup row selector change event handler
 */
function onChangeLegalInfoLayerRows(e){
	var form = document.getElementById('tblLegalInfoLayerForm');
	form.elements.pageIndex.value = 1;
	onSrchLegalInfoSearch(e);
}
/**
 *  Delimitación legal popup search button click event handler
 */
function onSrchLegalInfoSearch(e){
	var form = document.getElementById('tblLegalInfoLayerForm');
	var rows = parseInt(form.elements.rows.value);
	var curPage = parseInt(form.elements.pageIndex.value);
	var fromIndex = (curPage-1) * rows + 1;
	var toIndex = (fromIndex - 1) + rows;
	form.elements.pageIndex.value = curPage;
	form.elements.fromIndex.value = fromIndex;
	form.elements.toIndex.value = toIndex;
	
	$.ajax({
        type : 'GET',
        url : '/pih/pihRegDeclaration/getHipHreLegalDataList.ajax',
        async: false,
        dataType : 'json',
        data : $('#tblLegalInfoLayerForm').serialize(),
        error : function(request, status, error) {
            alert('La comunicación del servidor falló.' + error);
        },
        success : onSrchLegalInfoDataRender
	});
	
	e.preventDefault();
    return false;
}
/**
 *  Delimitación legal popup search result renderer
 */
function onSrchLegalInfoDataRender(data){
	var resultList = data.LIST || [];
	// grid data clear
	onSrchLegalInfoDataClear();
	
	if(resultList.length > 0){
		$('#tblLegalInfoLayerData .tr-data-none').addClass('hide');
		$.each(resultList, function(idx, row){
			// template render
			var tpl = $('#tblLegalInfoLayerDataTpl').html();
			var renderData = tpl.replace(/%(\w+)%/g, function(matched, matchKey){
				return row[matchKey] || '';
			});
			var $renderEl = $(renderData).data(row);
			$('#tblLegalInfoLayerData').append($renderEl);
		});
		
		//pager info
		var form = document.getElementById('tblLegalInfoLayerForm');
		var curPage = form.elements.pageIndex.value;
		var pagerInfo = calcPager(data.getRowTotalCnt, curPage);
		
		//pager info render
		$('#legalInfoLayer .layer-grid-record-info').text('Total ' + pagerInfo.totalCnt + ' (' + pagerInfo.curPage + ' / ' + pagerInfo.totalPage + ' Page)')
		
		//pager render
		var $pager = $('#legalInfoLayer .layer-grid-pager');
		$('<a>').addClass('direction l2').data('pageIndex', 1).appendTo($pager);
		$('<a>').addClass('direction l1').data('pageIndex', pagerInfo.prevPage).appendTo($pager);
		
		for(var i=pagerInfo.startPage; i<=pagerInfo.endPage; i++){
			var $link = $('<a>', {text: i});
			$link.data('pageIndex', i);
			if(i == curPage)
				$link.addClass('active')
			$link.appendTo($pager);
		}
		
		$('<a>').addClass('direction r1').data('pageIndex', pagerInfo.nextPage).appendTo($pager);
		$('<a>').addClass('direction r2').data('pageIndex', pagerInfo.totalPage).appendTo($pager);
	}else{
		$('#tblLegalInfoLayerData .tr-data-none').removeClass('hide');
	}
	
	$("#legalInfoLayer").layerCenter();
}
/**
 *  Delimitación legal popup search result pager prop calc
 */
function calcPager(totalCnt, curPage){
	var form = document.getElementById('tblLegalInfoLayerForm');
	var data = {
		pagerCnt: 5,
		totalCnt: parseInt(totalCnt),
		curPage: parseInt(curPage),
		rows: parseInt(form.elements.rows.value)
	};
	var tmpPage = data.curPage % data.pagerCnt == 0 ? 5 : data.curPage % data.pagerCnt;
	data.startPage = data.curPage - (tmpPage) + 1;
	data.totalPage = Math.ceil(data.totalCnt / data.rows);
	data.endPage = data.startPage + 4;
	data.endPage = data.endPage >= data.totalPage ? data.totalPage : data.endPage;
	data.fromIndex = (data.curPage-1) * data.rows + 1;
	data.toIndex = (data.fromIndex - 1) + data.rows;
	data.prevPage = data.curPage - 1 > 0 ? data.curPage - 1 : 1;
	data.nextPage = data.curPage + 1 < data.totalPage ? data.curPage + 1 : data.totalPage;
	
	return data;
}
/**
 *  Delimitación legal popup pager search button click event handler
 */
function onSrchLegalInfoPagerSearch(e){
	var targetPage = parseInt($(this).data('pageIndex'));
	var form = document.getElementById('tblLegalInfoLayerForm');
	var curPage = form.elements.pageIndex.value;
	
	if(curPage != targetPage){
		form.elements.pageIndex.value = targetPage;
		onSrchLegalInfoSearch(e);
	}
	
	e.preventDefault();
	return false;
}
/**
 *  Delimitación legal popup search condition reset button click event handler
 */	
function onSrchLegalInforReset(e){
	var form = document.getElementById('tblLegalInfoLayerForm');
	form.reset();
	
	onSrchLegalInfoSearch(e);
	
	e.preventDefault();
    return false;
}
/**
 *  legal search layer popup searched data clear
 */
function onSrchLegalInfoDataClear(){
	// grid data clear
	$('#legalInfoLayer .layer-data-check-all').prop('checked', false);
	$('#legalInfoLayer #tblLegalInfoLayerData tr').not('.tr-data-none').remove();
	// pager clear
	$('#legalInfoLayer .layer-grid-record-info').text('Total 0 (1 / 0 Page)');
	$('#legalInfoLayer .layer-grid-pager').html('');
}
/**
 *  Delimitación legal popup check all selector change event handler
 */
function onChangeLegalInfoLayerDataCheckAll(e){
	$('#tblLegalInfoLayerData :checkbox').prop('checked', $(this).prop('checked'));
}

/**
 * Delimitación renderer
 */
function onDelimLgBsCdDataRender(data){
	data = data || {};
	data.id = Grid.getUniqueId('tblDelimLgBsCdData');
	data.index = $('#tblDelimLgBsCdData>tr').not('.tr-data-none').length;
	data.rownum = $('#tblDelimLgBsCdData>tr').length;
	data.hreGenSeq = $('#hreGenSeq').val();
	
	// has general key
	var ajaxError = false;
	var newSeq = 0;
	if(data.hreGenSeq != ''){
		ajaxError = true;
		
		$.ajax({
            type : 'POST',
            url : '/pih/pihRegInsFicha/modifyDelimLegal.ajax',
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
	
	var tpl = "";
	if(data.archChgNm != null){
		tpl = $('#tblDelimLgBsCdDataTplFile').html();
	}else{
		tpl = $('#tblDelimLgBsCdDataTplNoFile').html();
	}
	var renderData = tpl.replace(/%(\w+)%/g, function(matched, matchKey){
		return data[matchKey] || '';
	});

	$('#tblDelimLgBsCdData tr.tr-data-none').addClass('hide');
	
	$('#tblDelimLgBsCdData').append(renderData);
	
	delimLgBsCdDataReorder();
}
/**
 *  Delimitación legal popup select button click event handler
 */	
function onClickBtnDelimLgBsCdDataAdd(e){
	var hreGenSeq = $('#hreGenSeq').val();
	
	$('#tblLegalInfoLayerData :checked').each(function(){
		var $row = $(this).closest('tr');
		var param = $row.data();
		param.hreGenSeq = hreGenSeq;
		onDelimLgBsCdDataRender(param);
	});
	
	//popup close
	$(".modal").hide();
	//form data clear
	var form = document.getElementById('tblLegalInfoLayerForm');
	form.reset();
	form.elements.fromIndex.value = 1;
	form.elements.toIndex.value = 10;
	form.elements.pageIndex.value = 1;
	form.elements.rows.value = 10;
	//grid data clear
	onSrchLegalInfoDataClear();

	e.preventDefault();
	return false;
}
/**
 * Delimitación row file download button click Event Handler
 */
function onClickBtnDelimLgBsCdDataDownload(e){
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
 * Delimitación delete button click Event Handler
 */
function onClickBtnDelimLgBsCdDataDelete(e){
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
            url : '/pih/pihRegInsFicha/modifyDelimLegal.ajax',
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
	delimLgBsCdDataReorder();
	$('.bs-tooltip-top').remove(); //tooltip reset
	
	e.preventDefault();
	return false;
	
}
/**
 * Delimitación data grid force renderering
 */
function delimLgBsCdDataReorder(){
	var $rows = $('#tblDelimLgBsCdData>tr').not('.tr-data-none');
	$rows.each(function(rowIdx, row){
		// Create Row Id
		if($(this).attr('id') == ''){
			$(this).attr('id', 'trDelimLgBsCdData' + Grid.getUniqueId('tblDelimLgBsCdData'));
		}
		// Name Index
		$(this).find(':input').each(function(){
			var orinName = $(this).data('orinName');
			var name = $(this).attr('name');
			$(this).attr('name', name.replace(/^(.+\[)(\d+)?(\].+)$/g, '$1' + rowIdx + '$3'));
		});
	});
	
	if($rows.length == 0){
		$('#tblDelimLgBsCdData tr.tr-data-none').removeClass('hide');
	}
	
	//tooltip reset
	$('.bs-tooltip-top').remove();
	$('[data-toggle="tooltip"]').tooltip();
}


/**
 * Colindancias add button click Event Handler
 */
function onClickBtnAdjDataAdd(e){
	var data = {};
	data.id = Grid.getUniqueId('tblAdjData');
	data.index = $('#tblAdjData>tr').not('.tr-data-none').length;
	data.rownum = $('#tblAdjData>tr').length;
	data.hreGenSeq = $('#hreGenSeq').val();
	
	// collect form data
	$('#tblAdjDataForm :input').each(function(){
		var key = $(this).data('name');
		var value = $(this).val();
		data[key] = value;
		
		if($(this).is('select')){
			var nameKey = 'str' + key.charAt(0).toUpperCase() + key.substr(1);
			var nameValue = $(this).find('option:selected').text();
			data[nameKey] = nameValue;
		}
	});
	
	// has general key
	var ajaxError = false;
	var newSeq = 0;
	if(data.hreGenSeq != ''){
		ajaxError = true;
		
		$.ajax({
            type : 'POST',
            url : '/pih/pihRegInsFicha/modifyAdjData.ajax',
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
	var tpl = $('#tblAdjDataTpl').html();
	var renderData = tpl.replace(/%(\w+)%/g, function(matched, matchKey){
		return data[matchKey] || '';
	});
	
	$('#tblAdjData tr.tr-data-none').addClass('hide');
	
	if(!!data.targetId){
		// Modify
		var innerHtml = $(renderData).html();
		$('#tblAdjData #'+data.targetId).html(innerHtml);
	}else{
		// Add
		$('#tblAdjData').append(renderData);
	}
	
	// reset form data
	$('#tblAdjDataForm :input').each(function(){
		$(this).val('');
	});
	
	adjDataReorder();
	$('[data-toggle="tooltip"]').tooltip(); //tooltip setting
	
	e.preventDefault();
	return false;
}
/**
 * Colindancias modify button click Event Handler
 */
function onClickBtnAdjDataModify(e){
	var $row = $(this).closest('tr');
	var data = {};
	data.targetId = $row.attr('id');
	
	// collect row data
	$row.find(':hidden').each(function(){
		var key = $(this).data('orinName');
		var value = $(this).val();
		data[key] = value;
	});
	
	$('#tblAdjDataForm :input').each(function(){
		var key = $(this).data('name');
		$(this).val(data[key]);
	});
	
	e.preventDefault();
	return false;
}
/**
 * Colindancias delete button click Event Handler
 */
function onClickBtnAdjDataDelete(e){
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
            url : '/pih/pihRegInsFicha/modifyAdjData.ajax',
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
	adjDataReorder();
	$('.bs-tooltip-top').remove(); //tooltip reset
	
	e.preventDefault();
	return false;
	
}
/**
 * Colindancias data grid force renderering
 */
function adjDataReorder(){
	var $rows = $('#tblAdjData>tr').not('.tr-data-none');
	$rows.each(function(rowIdx, row){
		// Create Row Id
		if($(this).attr('id') == ''){
			$(this).attr('id', 'trAdjData' + Grid.getUniqueId('tblAdjData'));
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
		$('#tblAdjData tr.tr-data-none').removeClass('hide');
	}
	
	//tooltip reset
	$('.bs-tooltip-top').remove();
	$('[data-toggle="tooltip"]').tooltip();
}


/**
 * Plano de delimitación add button click Event Handler
 */
function onClickBtnDelimMapAdd(e){
	var data = {};
	data.id = Grid.getUniqueId('tblDelimMapData');
	data.index = $('#tblDelimMapData>tr').not('.tr-data-none').length;
	data.rownum = $('#tblDelimMapData>tr').length;
	data.hreGenSeq = $('#hreGenSeq').val();
	
	// collect form data
	$('#tblDelimMapForm :input').each(function(){
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
	var tpl = $('#tblDelimMapTpl').html();
	var renderData = tpl.replace(/%(\w+)%/g, function(matched, matchKey){
		return data[matchKey] || '';
	});
	
	$('#tblDelimMapData tr.tr-data-none').addClass('hide');
	
	if(!!data.targetId){
		// Modify
		var innerHtml = $(renderData).html();
		$('#tblDelimMapData #'+data.targetId).html(innerHtml);
	}else{
		// Add
		$('#tblDelimMapData').append(renderData);
	}
	
	// reset form data
	$('#tblDelimMapForm :input').each(function(){
		$(this).val('');
	});
	// file link remove
	$('#tblDelimMapForm .file-item-link').remove();
	
	delimMapDataReorder();
	$('[data-toggle="tooltip"]').tooltip(); //tooltip setting
	
	e.preventDefault();
	return false;
}
/**
 * Plano de delimitación modify button click Event Handler
 */
function onClickBtnDelimMapModify(e){
	var $row = $(this).closest('tr');
	var data = {};
	data.targetId = $row.attr('id');
	
	// collect row data
	$row.find(':hidden').each(function(){
		var key = $(this).data('orinName');
		var value = $(this).val();
		data[key] = value;
	});
	
	$('#tblDelimMapForm :input').each(function(){
		var key = $(this).data('name');
		$(this).val(data[key]);
	});
	
	var $td = $('#btnUploadDelimMap').closest('td');
	$td.find('.file-item-link').remove();
	var $link = $('<a href="#" class="btn_link textDel file-item-link">' + data.archOrgNm + '<i class="file-item-remove-link"></i></a>');
    $link.data(data);
    $link.appendTo($td);
	
	e.preventDefault();
	return false;
}
/**
 * Plano de delimitación delete button click Event Handler
 */
function onClickBtnDelimMapDelete(e){
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
	delimMapDataReorder();
	$('.bs-tooltip-top').remove(); //tooltip reset
	
	e.preventDefault();
	return false;
	
}
/**
 * Plano de delimitación data grid force renderering
 */
function delimMapDataReorder(){
	var $rows = $('#tblDelimMapData>tr').not('.tr-data-none');
	$rows.each(function(rowIdx, row){
		// Create Row Id
		if($(this).attr('id') == ''){
			$(this).attr('id', 'trDelimMapData' + Grid.getUniqueId('tblDelimMapData'));
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
		$('#tblDelimMapData tr.tr-data-none').removeClass('hide');
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
    var $btnFileUpload = $('#btnUploadDelimMap');
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
    $('#tblDelimMapForm :hidden.file-item-info').each(function(){
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
	tinyMCE.triggerSave();
    Ajax.request('/pih/pihRegInsFicha/saveTechnicalData.ajax', $('#major').serializeArray(), function(data){
    	if(data.result > 0){
            $('.tab2List').data('genSeq', data.result);
            Common.alert("success", data.successMessage);
            location.reload();
        }

        if(data.errorCode == '-1'){
            Common.alert("warning", data.errorMessage);
            return false;
        }
    });
    
	e.preventDefault();
	return false;
}