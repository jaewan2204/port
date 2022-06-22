/**
 * init event and event bind
 */
$(function () {
	// Regist table uniqueId getter
	
	Grid.createUniqueId('tblAsctData');
	Grid.createUniqueId('tblMnZoneData');
	Grid.createUniqueId('tblMnEnvData');
	
	// Init event
	asctDataReorder();
	mnZoneDataReorder();
	mnEnvDataReorder();
	
	
	
	
	/***********************************************************************************************************************
     * Patrimonio inmueble asociado	Historico search layer popup open button click event binding
     */
	$(document).on('click', '#btnHistoricoSearch', onClickHistoricoSearchLayerOpen);
	/**
	 *  Historico layer popup row selector change event binding
	 */
	$(document).on('change', '#historicoSearchLayer .layer-paging-row-selector', onChangeHistoricoLayerRows);
	/**
	 *  Historico layer popup search button click event binding
	 */
	$(document).on('click', '#historicoSearchLayer .layer-form-submit', onSrchHistoricoSearchManual);
	/**
	 *  Historico layer popup pager search button click event binding
	 */
	$(document).on('click', '#historicoSearchLayer .layer-grid-pager a', onSrchHistoricoPagerSearch);
	/**
	 *  Historico layer popup search condition reset button click event binding
	 */	
	$(document).on('click', '#historicoSearchLayer .layer-form-reset-btn', onSrchHistoricoReset);
	/**
	*  Historico layer popup check all selector change event binding
	*/
	$(document).on('change', '#historicoSearchLayer .layer-data-check-all', onChangeHistoricoLayerDataCheckAll);
	/**
	 *  Historico layer popup select button click event binding
	 */	
	$(document).on('click', '#historicoSearchLayer #btnHistoricoSelect', onSrchHistoricoApply);
	/**
     * Patrimonio inmueble asociado row delete action event binding
     */
	$(document).on('click', '#tblAsctData .btn-delete', onClickBtnAsctDataDelete);	
	/**
     * Historico layer popup Ubicación Politica change event binding
     */
    $(document).on('change', '#historicoSearchLayer #classCd', onChangeClassCd);
	/**
     * Historico layer popup Ubicación Politica change event binding
     */
    $(document).on('change', '#historicoSearchLayer .pol-loc-group', onChangePolLocCd);
	
	
	/***********************************************************************************************************************
     * ZONA MONUMENTAL legal search layer popup open button click event binding
     */
	$(document).on('click', '#btnMnZoneLegalSearch', onClickLegalSearchLayerOpen);
	/**
     * ZONA MONUMENTAL radio change event binding
     */
	$(document).on('change', '.mn-zone-group', onChangeMnZone);
	/**
	 * ZONA MONUMENTAL row file download action event binding
	 */
	$(document).on('click', '#tblMnZoneData .btn-download', onClickBtnMnZoneDataDownload);
	/**
     * ZONA MONUMENTAL row delete action event binding
     */
	$(document).on('click', '#tblMnZoneData .btn-delete', onClickBtnMnZoneDataDelete);
	
	
	/***********************************************************************************************************************
     * AMBIENTE URBANO MONUMENTAL legal search layer popup open button click event binding
     */
	$(document).on('click', '#btnMnEnvLegalSearch', onClickLegalSearchLayerOpen);
	/**
     * AMBIENTE URBANO MONUMENTAL radio change event binding
     */
	$(document).on('change', '.mn-env-group', onChangeMnEnv);
	/**
	 * AMBIENTE URBANO MONUMENTAL row file download action event binding
	 */
	$(document).on('click', '#tblMnEnvData .btn-download', onClickBtnMnEnvDataDownload);
	/**
     * AMBIENTE URBANO MONUMENTAL row delete action event binding
     */
	$(document).on('click', '#tblMnEnvData .btn-delete', onClickBtnMnEnvDataDelete);
	
	
	/***********************************************************************************************************************
     *  legal search layer popup row selector change event binding
     */
	$(document).on('change', '#legalInfoLayer .layer-paging-row-selector', onChangeLegalInfoLayerRows);
	/**
     *  legal search layer popup search button click event binding
     */
	$(document).on('click', '#legalInfoLayer .layer-form-submit', onSrchLegalInfoSearch);
	/**
     *  legal search layer popup pager search button click event binding
     */
	$(document).on('click', '#legalInfoLayer .layer-grid-pager a', onSrchLegalInfoPagerSearch);
	/**
     *  legal search layer popup search condition reset button click event binding
     */	
	$(document).on('click', '#legalInfoLayer .layer-form-reset-btn', onSrchLegalInfoReset);
	/**
	 *  legal search layer popup check all selector change event binding
	 */
	$(document).on('change', '#legalInfoLayer .layer-data-check-all', onChangeLegalInfoLayerDataCheckAll);
	/**
     *  legal search layer popup select button click event binding
     */	
	$(document).on('click', '#legalInfoLayer #btnLegalInfoSelect', onSrchLegalInfoApply);
	
	
	
	
	
	
	/***********************************************************************************************************************
	 * Guardar button click event binding
	 */
	$(document).on('click', '#btnSubmit', onSubmit);
	$(document).on('click', '#btnList', function(){
		$(".loadingWrap").show();  
		location.href = '/pih/pihSrchAdvance/historicoSrchList.do';	
	});
});





/***********************************************************************************************************************
 *  Historico search layer popup open button click event handler
 */
function onClickHistoricoSearchLayerOpen(e){
	//form data clear
	var form = document.getElementById('tblHistoricoLayerForm');
	form.reset();
	form.elements.fromIndex.value = 1;
	form.elements.toIndex.value = 10;
	form.elements.pageIndex.value = 1;
	form.elements.rows.value = 10;
		
	// grid data clear
	onSrchHistoricoDataClear();
	
	//popup open
	openPopup('historicoSearchLayer');
	//ResizingLayer();
	$('#historicoSearchLayer .layer-form-submit').trigger('click');
	
	e.preventDefault();
    return false;
}

 
function ResizingLayer() {
 
    if($("#historicoSearchLayer").css("display") == "block") {
 
        var maskHeight = $(document).height();
        var maskWidth = $(window).width();
 
 
        $("#historicoSearchLayer").css({'width':maskWidth,'height':maskHeight});  
 
        $(".modal").each(function () {
            var left = ( $(window).scrollLeft() + ($(window).width() - $(this).width()) / 2 );
            var top = ( $(window).scrollTop() + ($(window).height() - $(this).height()) / 2 );
 
            if(top<0) top = 0;
            if(left<0) left = 0;
 
            $(this).css({"left":left, "top":top});
        });
    }
}

/**
 *  Historico search layer popup row selector change event handler
 */
function onChangeHistoricoLayerRows(e){
	var form = document.getElementById('tblHistoricoLayerForm');
	form.elements.pageIndex.value = 1;
	onSrchHistoricoSearch(e);
}
/**
 *  Historico search layer popup search button click event handler
 */
function onSrchHistoricoSearchManual(e){
	var form = document.getElementById('tblHistoricoLayerForm');
	form.elements.fromIndex.value = 1;
	form.elements.toIndex.value = 10;
	form.elements.pageIndex.value = 1;
	
	// grid data clear
	onSrchHistoricoDataClear();
	onSrchHistoricoSearch(e);
}
/**
 *  Historico search layer popup search event handler
 */
function onSrchHistoricoSearch(e){
	var form = document.getElementById('tblHistoricoLayerForm');
	var rows = parseInt(form.elements.rows.value);
	var curPage = parseInt(form.elements.pageIndex.value);
	var fromIndex = (curPage-1) * rows + 1;
	var toIndex = (fromIndex - 1) + rows;
	form.elements.pageIndex.value = curPage;
	form.elements.fromIndex.value = fromIndex;
	form.elements.toIndex.value = toIndex;
	
	$.ajax({
        type : 'GET',
        url : '/pih/pihRegInsFicha/getAsctDataSearchList.ajax',
        async: true,
        dataType : 'json',
        data : $('#tblHistoricoLayerForm').serialize(),
        error : function(request, status, error) {
            alert('La comunicación del servidor falló.' + error);
        },
        success : onSrchHistoricoDataRender
	});
	
	e.preventDefault();
    return false;
}
/**
 *  Historico search layer popup search result renderer
 */
function onSrchHistoricoDataRender(data){
	var resultList = data.LIST || [];
	// grid data clear
	onSrchHistoricoDataClear();
	
	if(resultList.length > 0){
		$('#tblHistoricoLayerData .tr-data-none').addClass('hide');
		$.each(resultList, function(idx, row){
			// template render
			var tpl = $('#tblHistoricoLayerDataTpl').html();
			var renderData = tpl.replace(/%(\w+)%/g, function(matched, matchKey){
				return row[matchKey] || '';
			});
			delete row.pageInfo;
			row.hreGenAsctSeq = row.hreGenSeq;
			var $renderEl = $(renderData).data(row);
			$('#tblHistoricoLayerData').append($renderEl);
		});
		
		//pager info
		var form = document.getElementById('tblHistoricoLayerForm');
		var curPage = form.elements.pageIndex.value;
		var pagerInfo = srchHistoricoDataCalcPager(data.getRowTotalCnt, curPage);
		
		//pager info render
		$('#historicoSearchLayer .layer-grid-record-info').text('Total ' + pagerInfo.totalCnt + ' (' + pagerInfo.curPage + ' / ' + pagerInfo.totalPage + ' Page)')
		
		//pager render
		var $pager = $('#historicoSearchLayer .layer-grid-pager');
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
		$('#tblHistoricoLayerData .tr-data-none').removeClass('hide');
	}
	
	$("#historicoSearchLayer").layerCenter();
}
/**
 *  Historico search layer popup search result pager prop calc
 */
function srchHistoricoDataCalcPager(totalCnt, curPage){
	var form = document.getElementById('tblHistoricoLayerForm');
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
 *  Historico search layer popup pager search button click event handler
 */
function onSrchHistoricoPagerSearch(e){
	var targetPage = parseInt($(this).data('pageIndex'));
	var form = document.getElementById('tblHistoricoLayerForm');
	var curPage = form.elements.pageIndex.value;
	
	if(curPage != targetPage){
		form.elements.pageIndex.value = targetPage;
		onSrchHistoricoSearch(e);
	}
	
	e.preventDefault();
	return false;
}
/**
 *  Historico search layer popup search condition reset button click event handler
 */	
function onSrchHistoricoReset(e){
	var form = document.getElementById('tblHistoricoLayerForm');
	form.reset();
	
	form.elements.classCd.value = "";
	form.elements.classSpecCd.value = "";
	form.elements.nameSpnNm.value = "";
	form.elements.deptCd.value = "";
	form.elements.provinceCd.value = "";
	form.elements.districtCd.value = "";
	form.elements.accAddrViaCd.value = "";
	form.elements.accAddrViaSpnNm.value = "";
	form.elements.accAddrViaNo.value = "";
	
	form.elements.fromIndex.value = 1;
	form.elements.toIndex.value = 10;
	form.elements.pageIndex.value = 1;
	form.elements.rows.value = 10;
	
	onSrchHistoricoDataClear();
	
	e.preventDefault();
    return false;
}
/**
 *  Historico search layer popup searched data clear
 */
function onSrchHistoricoDataClear(){
	// grid data clear
	$('#historicoSearchLayer .layer-data-check-all').prop('checked', false);
	$('#historicoSearchLayer #tblHistoricoLayerData tr').not('.tr-data-none').remove();
	// pager clear
	$('#historicoSearchLayer .layer-grid-record-info').text('Total 0 (1 / 0 Page)');
	$('#historicoSearchLayer .layer-grid-pager').html('');
}
/**
 *  Historico search layer popup check all selector change event handler
 */
function onChangeHistoricoLayerDataCheckAll(e){
	$('#tblHistoricoLayerData :checkbox').prop('checked', $(this).prop('checked'));
}
/**
 *  Historico search layer popup select button click event handler
 */	
function onSrchHistoricoApply(e){
	var hreGenSeq = $('#hreGenSeq').val();
	var form = document.getElementById('tblHistoricoLayerForm');
	
	$('#tblHistoricoLayerData :checked').each(function(){
		var $row = $(this).closest('tr');
		var param = $row.data();
		param.hreGenSeq = hreGenSeq;
		onAsctDataRender(e, param);
	});
	
	//popup close
	$(".modal").hide();
	//form data clear
	form.reset();
	form.elements.fromIndex.value = 1;
	form.elements.toIndex.value = 10;
	form.elements.pageIndex.value = 1;
	form.elements.rows.value = 10;
	
	//grid data clear
	onSrchHistoricoDataClear();

	e.preventDefault();
	return false;
}
/**
 * Patrimonio inmueble asociado	delete button click Event Handler
 */
function onClickBtnAsctDataDelete (e){
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
            url : '/pih/pihRegInsFicha/modifyAsctData.ajax',
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
	asctDataReorder();
	
	e.preventDefault();
	return false;
	
}
/**
 * Historico layer popup Ubicación Politica change event Handler
 */
function onChangeClassCd(){
	var parentValue = $(this).val();
	
	Code.stdCodeList('Y', 'HRE', '005', parentValue, '', '', function(result){
        var _html = '<option value=\"\" >-- Seleccione --</option>';
        result.forEach(function(v, i){
            _html += '<option value=\"'+v.stdCd+'\">'+v.cdSpnNm+'</option>';
        });
        $('#classSpecCd').html(_html);
    });
}
/**
 * Historico layer popup Ubicación Politica change event Handler
 */
function onChangePolLocCd(){
	var targetLevel = $(this).data('level');
	
	var arrPolLocCd = [];
	arrPolLocCd.push($('#deptCd').val());    // level1
	arrPolLocCd.push($('#provinceCd').val());// level2
	arrPolLocCd.push($('#districtCd').val());// level3
	var ubigeoNo = arrPolLocCd[2] || arrPolLocCd[1] || arrPolLocCd[0]; // last exist data
	
	if($(this).val() == '' && targetLevel == 1){
		$('#ubigeoNo').val('');
	}
	else if($(this).val() != ''){
		$('#ubigeoNo').val(ubigeoNo.substr(0, (2 * targetLevel)));
	}
	
	// Distrito changed
	if(targetLevel == 3) return;
	
	// Next code bind
	var parentCode = arrPolLocCd[targetLevel-1];
	var parentSubCode = parentCode.substr(0, 2*targetLevel);
	
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
/***********************************************************************************************************************
 * Patrimonio inmueble asociado data renderer
 */
function onAsctDataRender(e, data){
	data = data || {};
	data.id = Grid.getUniqueId('tblAsctData');
	data.index = $('#tblAsctData>tr').not('.tr-data-none').length;
	data.rownum = $('#tblAsctData>tr').length;
	data.hreGenSeq = $('#hreGenSeq').val();
	
	// has general key
	var ajaxError = false;
	var newSeq = 0;
	if(data.hreGenSeq != ''){
		ajaxError = true;
		
		$.ajax({
            type : 'POST',
            url : '/pih/pihRegInsFicha/modifyAsctData.ajax',
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
	var tpl = $('#tblAsctDataTpl').html();
	var renderData = tpl.replace(/%(\w+)%/g, function(matched, matchKey){
		return data[matchKey] || '';
	});

	$('#tblAsctData tr.tr-data-none').addClass('hide');
	
	$('#tblAsctData').append(renderData);
	
	asctDataReorder();
}
/**
 * Patrimonio inmueble asociado data grid force renderering
 */
function asctDataReorder(){
	var $rows = $('#tblAsctData>tr').not('.tr-data-none');
	$rows.each(function(rowIdx, row){
		// Create Row Id
		if($(this).attr('id') == ''){
			$(this).attr('id', 'trAsctData' + Grid.getUniqueId('tblAsctData'));
		}
		// Name Index
		$(this).find(':input').each(function(){
			var orinName = $(this).data('orinName');
			var name = $(this).attr('name');
			$(this).attr('name', name.replace(/^(.+\[)(\d+)?(\].+)$/g, '$1' + rowIdx + '$3'));
		});
	});
	
	if($rows.length == 0){
		$('#tblAsctData tr.tr-data-none').removeClass('hide');
	}
	
	//tooltip reset
	$('.bs-tooltip-top').remove();
	$('[data-toggle="tooltip"]').tooltip();
}

































/***********************************************************************************************************************
 * ZONA MONUMENTAL renderer
 */
function onMnZoneDataRender(e, data){
	data = data || {};
	data.id = Grid.getUniqueId('tblMnZoneData');
	data.index = $('#tblMnZoneData>tr').not('.tr-data-none').length;
	data.rownum = $('#tblMnZoneData>tr').length;
	data.hreGenSeq = $('#hreGenSeq').val();
	
	// has general key
	var ajaxError = false;
	var newSeq = 0;
	if(data.hreGenSeq != ''){
		ajaxError = true;
		
		$.ajax({
            type : 'POST',
            url : '/pih/pihRegInsFicha/modifyMnZoneLegal.ajax',
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
		tpl = $('#tblMnZoneDataTplFile').html();
	}else{
		tpl = $('#tblMnZoneDataTplNoFile').html();
	}

	var renderData = tpl.replace(/%(\w+)%/g, function(matched, matchKey){
		return data[matchKey] || '';
	});

	$('#tblMnZoneData tr.tr-data-none').addClass('hide');
	
	$('#tblMnZoneData').append(renderData);
	
	mnZoneDataReorder();
}
/**
 * ZONA MONUMENTAL radio change event handler
 */
function onChangeMnZone(e){
	var val = $('.mn-zone-group:checked').val();
	if(val == 'Y'){
		$('.mn-zone-group-area').removeClass('hide');
	}else{
		$('.mn-zone-group-area').addClass('hide');
	}
}
/**
 * ZONA MONUMENTAL row file download button click Event Handler
 */
function onClickBtnMnZoneDataDownload(e){
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
 * ZONA MONUMENTAL delete button click Event Handler
 */
function onClickBtnMnZoneDataDelete(e){
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
            url : '/pih/pihRegInsFicha/modifyMnZoneLegal.ajax',
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
	mnZoneDataReorder();
	
	e.preventDefault();
	return false;
	
}
/**
 * ZONA MONUMENTAL data grid force renderering
 */
function mnZoneDataReorder(){
	var $rows = $('#tblMnZoneData>tr').not('.tr-data-none');
	$rows.each(function(rowIdx, row){
		// Create Row Id
		if($(this).attr('id') == ''){
			$(this).attr('id', 'trMnZoneData' + Grid.getUniqueId('tblMnZoneData'));
		}
		// Name Index
		$(this).find(':input').each(function(){
			var orinName = $(this).data('orinName');
			var name = $(this).attr('name');
			$(this).attr('name', name.replace(/^(.+\[)(\d+)?(\].+)$/g, '$1' + rowIdx + '$3'));
		});
	});
	
	if($rows.length == 0){
		$('#tblMnZoneData tr.tr-data-none').removeClass('hide');
	}
	
	//tooltip reset
	$('.bs-tooltip-top').remove();
	$('[data-toggle="tooltip"]').tooltip();
	
	onChangeMnZone();
}


/***********************************************************************************************************************
 * AMBIENTE URBANO MONUMENTAL renderer
 */
function onMnEnvDataRender(e, data){
	data = data || {};
	data.id = Grid.getUniqueId('tblMnEnvData');
	data.index = $('#tblMnEnvData>tr').not('.tr-data-none').length;
	data.rownum = $('#tblMnEnvData>tr').length;
	data.hreGenSeq = $('#hreGenSeq').val();
	
	// has general key
	var ajaxError = false;
	var newSeq = 0;
	if(data.hreGenSeq != ''){
		ajaxError = true;
		
		$.ajax({
            type : 'POST',
            url : '/pih/pihRegInsFicha/modifyMnEnvLegal.ajax',
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
		tpl = $('#tblMnEnvDataTplFile').html();
	}else{
		tpl = $('#tblMnEnvDataTplNoFile').html();
	}
	
	var renderData = tpl.replace(/%(\w+)%/g, function(matched, matchKey){
		return data[matchKey] || '';
	});

	$('#tblMnEnvData tr.tr-data-none').addClass('hide');
	
	$('#tblMnEnvData').append(renderData);
	
	mnEnvDataReorder();
}
/**
 * AMBIENTE URBANO MONUMENTAL radio change event handler
 */
function onChangeMnEnv(e){
	var val = $('.mn-env-group:checked').val();
	if(val == 'Y'){
		$('.mn-env-group-area').removeClass('hide');
	}else{
		$('.mn-env-group-area').addClass('hide');
	}
}
/**
 * AMBIENTE URBANO MONUMENTAL row file download button click Event Handler
 */
function onClickBtnMnEnvDataDownload(e){
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
 * AMBIENTE URBANO MONUMENTAL delete button click Event Handler
 */
function onClickBtnMnEnvDataDelete(e){
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
            url : '/pih/pihRegInsFicha/modifyMnEnvLegal.ajax',
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
	mnEnvDataReorder();
	
	e.preventDefault();
	return false;
	
}
/**
 * AMBIENTE URBANO MONUMENTAL data grid force renderering
 */
function mnEnvDataReorder(){
	var $rows = $('#tblMnEnvData>tr').not('.tr-data-none');
	$rows.each(function(rowIdx, row){
		// Create Row Id
		if($(this).attr('id') == ''){
			$(this).attr('id', 'trMnEnvData' + Grid.getUniqueId('tblMnEnvData'));
		}
		// Name Index
		$(this).find(':input').each(function(){
			var orinName = $(this).data('orinName');
			var name = $(this).attr('name');
			$(this).attr('name', name.replace(/^(.+\[)(\d+)?(\].+)$/g, '$1' + rowIdx + '$3'));
		});
	});
	
	if($rows.length == 0){
		$('#tblMnEnvData tr.tr-data-none').removeClass('hide');
	}
	
	//tooltip reset
	$('.bs-tooltip-top').remove();
	$('[data-toggle="tooltip"]').tooltip();
	
	onChangeMnEnv();
}


/***********************************************************************************************************************
 *  legal search layer popup open button click event handler
 */
function onClickLegalSearchLayerOpen(e){
	var legalName = $(this).data('legalName');
	
	//form data clear
	var form = document.getElementById('tblLegalInfoLayerForm');
	form.reset();
	form.elements.fromIndex.value = 1;
	form.elements.toIndex.value = 10;
	form.elements.pageIndex.value = 1;
	form.elements.rows.value = 10;
	form.elements.legalName.value = legalName;
	
	// grid data clear
	onSrchLegalInfoDataClear();
	
	//popup open
	openPopup('legalInfoLayer');
	$('#legalInfoLayer .layer-form-submit').trigger('click');
	
	e.preventDefault();
    return false;
}
/**
 *  legal search layer popup row selector change event handler
 */
function onChangeLegalInfoLayerRows(e){
	var form = document.getElementById('tblLegalInfoLayerForm');
	form.elements.pageIndex.value = 1;
	onSrchLegalInfoSearch(e);
}
/**
 *  legal search layer popup search button click event handler
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
 *  legal search layer popup search result renderer
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
 *  legal search layer popup search result pager prop calc
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
 *  legal search layer popup pager search button click event handler
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
 *  legal search layer popup search condition reset button click event handler
 */	
function onSrchLegalInfoReset(e){
	var form = document.getElementById('tblLegalInfoLayerForm');
	form.reset();
	form.elements.fromIndex.value = 1;
	form.elements.toIndex.value = 10;
	form.elements.pageIndex.value = 1;
	form.elements.rows.value = 10;
	
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
 *  legal search layer popup check all selector change event handler
 */
function onChangeLegalInfoLayerDataCheckAll(e){
	$('#tblLegalInfoLayerData :checkbox').prop('checked', $(this).prop('checked'));
}
/**
 *  legal search layer popup select button click event handler
 */	
function onSrchLegalInfoApply(e){
	var hreGenSeq = $('#hreGenSeq').val();
	var form = document.getElementById('tblLegalInfoLayerForm');
	var legalName = form.elements.legalName.value;
	
	$('#tblLegalInfoLayerData :checked').each(function(){
		var $row = $(this).closest('tr');
		var param = $row.data();
		param.hreGenSeq = hreGenSeq;
		var callbackName = 'on' + legalName + 'DataRender';
		if(window[callbackName] instanceof Function){
			window[callbackName](e, param);
		}
	});
	
	//popup close
	$(".modal").hide();
	//form data clear
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
 * Guardar button click Event Handler
 */
function onSubmit(e){
    Ajax.request('/pih/pihRegInsFicha/saveAsctPtmData.ajax', $('#major').serializeArray(), function(data){
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