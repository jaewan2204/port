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
	Grid.createUniqueId('tblNtnlRgltLgBsCdData');
	Grid.createUniqueId('tblOwnData');
	Grid.createUniqueId('tblCulConRegData');
	Grid.createUniqueId('tblInvtConData');
	Grid.createUniqueId('tblInvtSinData');
	Grid.createUniqueId('tblSetValTpData');
	
	// Init event
	ntnlRgltLgBsCdDataReorder();
	ownDataReorder();
	culConRegDataReorder();
	invtConDataReorder();
	invtSinDataReorder();
	setValTpDataReorder();
	
	/***********************************************************************************************************************
     *  Normativa nacional legal popup open button click event binding
     */
	$(document).on('click', '#btnLegalInfoLayerOpen', onClickBtnLegalInfoLayerOpen);
	/**
     *  Normativa nacional legal popup row selector change event binding
     */
	$(document).on('change', '#legalInfoLayer .layer-paging-row-selector', onChangeLegalInfoLayerRows);
	/**
     *  Normativa nacional legal popup search button click event binding
     */
	$(document).on('click', '#legalInfoLayer .layer-form-submit', onSrchLegalInfoSearch);
	/**
     *  Normativa nacional legal popup pager search button click event binding
     */
	$(document).on('click', '#legalInfoLayer .layer-grid-pager a', onSrchLegalInfoPagerSearch);
	/**
     *  Normativa nacional legal popup search condition reset button click event binding
     */	
	$(document).on('click', '#legalInfoLayer .layer-form-reset-btn', onSrchLegalInforReset);
	/**
	*  Normativa nacional legal popup check all selector change event binding
	*/
	$(document).on('change', '#legalInfoLayer .layer-data-check-all', onChangeLegalInfoLayerDataCheckAll);
	/**
     *  Normativa nacional legal popup select button click event binding
     */	
	$(document).on('click', '#legalInfoLayer #btnLegalInfoSelect', onClickBtnNtnlRgltLgBsCdDataAdd);
	/**
	 * Normativa nacional row file download action event binding
	 */
	$(document).on('click', '#tblNtnlRgltLgBsCdData .btn-download', onClickBtnNtnlRgltLgBsCdDataDownload);
	/**
     * Normativa nacional row delete action event binding
     */
	$(document).on('click', '#tblNtnlRgltLgBsCdData .btn-delete', onClickBtnNtnlRgltLgBsCdDataDelete);
	
	
	/***********************************************************************************************************************
     * Normativa internacional file upload button click event binding
     */
	$(document).on('click', '#btnInterntnlRgltUpload', function(e){
		var archTpCd = $(this).data('archTpCd');
		var fileSavePath = '/hip/pih/arch/' + $('#hreGenSeq').val() + '/' + archTpCd;
		
        Upload.pdfPopOpen({
            "maxTotalFileCount" : '1',	 
            "filePath" : fileSavePath,	 
            "thumbPath1" : '',             
            "thumbPath2" : '',           
            "preFileName" : '',          
            "customValue" : '',          
            "uploadId" : 'InterntnlRglt' 
        });
        e.preventDefault();
        return false;
	});
	/**
     * Normativa internaciona file download action event binding
     */
	$(document).on('click', '#tblInterntnlRgltForm .file-item-link', onClickBtnInterntnlRgltDownload);
	
	$(document).on('click', '#tblInterntnlRgltForm .file-item-remove-link', function(e){
    	$('#tblInterntnlRgltForm :hidden.file-item-info').each(function(){
    		$(this).val('');
    	});
    	
    	var $link = $(this).parent();
    	$link.remove();
    	
    	e.preventDefault();
        return false;
    });
	
	$(document).on('click', '#btnInterntnlRgltDel', onClickBtnInteArchDel);	
	
	
	/***********************************************************************************************************************
     * Propietario add button click event binding
     */
	$(document).on('click', '#btnOwnAdd', onClickBtnOwnAdd);	
	/**
     * Propietario row modify action event binding
     */
	$(document).on('click', '#tblOwnData .btn-modify', onClickBtnOwnModify);	
	/**
     * Propietario row delete action event binding
     */
	$(document).on('click', '#tblOwnData .btn-delete', onClickBtnOwnDelete);
	
	
	/***********************************************************************************************************************
     * Inscripción de condición cultural Inscrito radio change event binding
     */
	$(document).on('change', '#tblCulConRegForm .cul-con-reg-group', onChangeInscrito);
    /**
     * Inscripción de condición cultural add button click event binding
     */
	$(document).on('click', '#btnCulConRegAdd', onClickBtnCulConRegAdd);	
    /**
     * Inscripción de condición cultural file upload button click event binding
     */
	$(document).on('click', '#btnCulConRegUpload', function(e){
		var archTpCd = $(this).data('archTpCd');
		var fileSavePath = '/hip/pih/arch/' + $('#hreGenSeq').val() + '/' + archTpCd;
		
        Upload.singlePopOpen({
            "maxTotalFileCount" : '1',	 
            "filePath" : fileSavePath,	 
            "thumbPath1" : '',           
            "thumbPath2" : '',           
            "preFileName" : '',          
            "customValue" : '',                  
            "uploadId" : 'CulConReg'     
        });
        e.preventDefault();
        return false;
	});	
	/**
     * Inscripción de condición cultural file download action event binding
     */
	$(document).on('click', '#tblCulConRegForm .file-item-link', onClickBtnCulConRegDownload);
    /**
     * Inscripción de condición cultural file remove action event binding
     */
    $(document).on('click', '#tblCulConRegForm .file-item-remove-link', function(e){
    	$('#tblCulConRegForm :hidden.file-item-info').each(function(){
    		$(this).val('');
    	});
    	
    	var $link = $(this).parent();
    	$link.remove();
    	
    	e.preventDefault();
        return false;
    });
    /**
     * Inscripción de condición cultural row download action event binding
     */
	$(document).on('click', '#tblCulConRegData .file-item-link', onClickBtnCulConRegDownload);
    /**
     * Inscripción de condición cultural row modify action event binding
     */
	$(document).on('click', '#tblCulConRegData .btn-modify', onClickBtnCulConRegModify);	
	/**
     * Inscripción de condición cultural row delete action event binding
     */
	$(document).on('click', '#tblCulConRegData .btn-delete', onClickBtnCulConRegDelete);

	
	/***********************************************************************************************************************
     * Inscripción de condición cultural Inscrito radio change event binding
     */
	$(document).on('change', '#invtCd', onChangeinvtCd);
	/**
     * Intervenciones Con Autorización add button click event binding
     */
	$(document).on('click', '#btnInvtConAdd', onClickBtnInvtConAdd);	
    /**
     * Intervenciones Con Autorización file upload button click event binding
     */
	$(document).on('click', '#btnInvtConUpload', function(e){
		var archTpCd = $(this).data('archTpCd');
		var fileSavePath = '/hip/pih/arch/' + $('#hreGenSeq').val() + '/' + archTpCd;
		
        Upload.singlePopOpen({
            "maxTotalFileCount" : '1',	 
            "filePath" : fileSavePath,	 
            "thumbPath1" : '',           
            "thumbPath2" : '',           
            "preFileName" : '',          
            "customValue" : '',          
            "uploadId" : 'InvtCon' 
        });
        e.preventDefault();
        return false;
	});	
	/**
     * Intervenciones Con Autorización file download action event binding
     */
	$(document).on('click', '#tblInvtConForm .file-item-link', onClickBtnInvtConDownload);
    /**
     * Intervenciones Con Autorización file remove action event binding
     */
    $(document).on('click', '#tblInvtConForm .file-item-remove-link', function(e){
    	$('#tblInvtConForm :hidden.file-item-info').each(function(){
    		$(this).val('');
    	});
    	
    	var $link = $(this).parent();
    	$link.remove();
    	
    	e.preventDefault();
        return false;
    });
    
    /**
     * Intervenciones Con Autorización row download action event binding
     */
	$(document).on('click', '#tblInvtConData .file-item-link', onClickBtnInvtConDownload);
    /**
     * Intervenciones Con Autorización row modify action event binding
     */
	$(document).on('click', '#tblInvtConData .btn-modify', onClickBtnInvtConModify);	
	/**
     * Intervenciones Con Autorización row delete action event binding
     */
	$(document).on('click', '#tblInvtConData .btn-delete', onClickBtnInvtConDelete);
	
	
	/***********************************************************************************************************************
     * Intervenciones Sin add button click event binding
     */
	$(document).on('click', '#btnInvtSinAdd', onClickBtnInvtSinAdd);	
    /**
     * Intervenciones Sin file upload button click event binding
     */
	$(document).on('click', '#btnInvtSinUpload', function(e){
		var archTpCd = $(this).data('archTpCd');
		var fileSavePath = '/hip/pih/arch/' + $('#hreGenSeq').val() + '/' + archTpCd;
		
        Upload.singlePopOpen({
            "maxTotalFileCount" : '1',	 
            "filePath" : fileSavePath,	 
            "thumbPath1" : '',          
            "thumbPath2" : '',          
            "preFileName" : '',         
            "customValue" : '',          
            "uploadId" : 'InvtSin' 
        });
        e.preventDefault();
        return false;
	});	
	/**
     * Intervenciones Sin file download action event binding
     */
	$(document).on('click', '#tblInvtSinForm .file-item-link', onClickBtnInvtSinDownload);
    /**
     * Intervenciones Sin file remove action event binding
     */
    $(document).on('click', '#tblInvtSinForm .file-item-remove-link', function(e){
    	$('#tblInvtSinForm :hidden.file-item-info').each(function(){
    		$(this).val('');
    	});
    	
    	var $link = $(this).parent();
    	$link.remove();
    	
    	e.preventDefault();
        return false;
    });
    /**
     * Intervenciones Sin row download action event binding
     */
	$(document).on('click', '#tblInvtSinData .file-item-link', onClickBtnInvtSinDownload);
    /**
     * Intervenciones Sin row modify action event binding
     */
	$(document).on('click', '#tblInvtSinData .btn-modify', onClickBtnInvtSinModify);	
	/**
     * Intervenciones Sin row delete action event binding
     */
	$(document).on('click', '#tblInvtSinData .btn-delete', onClickBtnInvtSinDelete);
	
	
	/***********************************************************************************************************************
     * Afectaciones row download action event binding
     */
	$(document).on('click', '#tblReportDocData .file-item-link', onClickBtnReportDocDownload);
	
	
	/***********************************************************************************************************************
     * Puesta en Valor add button click event binding
     */
	$(document).on('click', '#btnSetValTpAdd', onClickBtnSetValTpAdd);	
    /**
     * Puesta en Valor file upload button click event binding
     */
	$(document).on('click', '#btnSetValTpUpload', function(e){
		var archTpCd = $(this).data('archTpCd');
		var fileSavePath = '/hip/pih/arch/' + $('#hreGenSeq').val() + '/' + archTpCd;
		
        Upload.singlePopOpen({
            "maxTotalFileCount" : '1',	 
            "filePath" : fileSavePath,	 
            "thumbPath1" : '',          
            "thumbPath2" : '',           
            "preFileName" : '',         
            "customValue" : '',         
            "uploadId" : 'SetValTp' 
        });
        e.preventDefault();
        return false;
	});	
	/**
     * Puesta en Valor file download action event binding
     */
	$(document).on('click', '#tblSetValTpForm .file-item-link', onClickBtnSetValTpDownload);
    /**
     * Puesta en Valor file remove action event binding
     */
    $(document).on('click', '#tblSetValTpForm .file-item-remove-link', function(e){
    	$('#tblSetValTpForm :hidden.file-item-info').each(function(){
    		$(this).val('');
    	});
    	
    	var $link = $(this).parent();
    	$link.remove();
    	
    	e.preventDefault();
        return false;
    });
    /**
     * Puesta en Valor row download action event binding
     */
	$(document).on('click', '#tblSetValTpData .file-item-link', onClickBtnSetValTpDownload);
    /**
     * Puesta en Valor row modify action event binding
     */
	$(document).on('click', '#tblSetValTpData .btn-modify', onClickBtnSetValTpModify);	
	/**
     * Puesta en Valor row delete action event binding
     */
	$(document).on('click', '#tblSetValTpData .btn-delete', onClickBtnSetValTpDelete);
	
	
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
 *  Normativa nacional legal popup open button click event handler
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
 *  Normativa nacional legal popup row selector change event handler
 */
function onChangeLegalInfoLayerRows(e){
	var form = document.getElementById('tblLegalInfoLayerForm');
	form.elements.pageIndex.value = 1;
	onSrchLegalInfoSearch(e);
}
/**
 *  Normativa nacional legal popup search button click event handler
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
 *  Normativa nacional legal popup search result renderer
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
 *  Normativa nacional legal popup search result pager prop calc
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
 *  Normativa nacional legal popup pager search button click event handler
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
 *  Normativa nacional legal popup search condition reset button click event handler
 */	
function onSrchLegalInforReset(e){
	var form = document.getElementById('tblLegalInfoLayerForm');
	form.reset();
	
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
 *  Normativa nacional legal popup check all selector change event handler
 */
function onChangeLegalInfoLayerDataCheckAll(e){
	$('#tblLegalInfoLayerData :checkbox').prop('checked', $(this).prop('checked'));
}
/**
 * Normativa nacional renderer
 */
function onNtnlRgltLgBsCdDataRender(data){
	data = data || {};
	data.id = Grid.getUniqueId('tblNtnlRgltLgBsCdData');
	data.index = $('#tblNtnlRgltLgBsCdData>tr').not('.tr-data-none').length;
	data.rownum = $('#tblNtnlRgltLgBsCdData>tr').length;
	data.hreGenSeq = $('#hreGenSeq').val();
	
	// has general key
	var ajaxError = false;
	var newSeq = 0;
	if(data.hreGenSeq != ''){
		ajaxError = true;
		
		$.ajax({
            type : 'POST',
            url : '/pih/pihRegInsFicha/modifyNtnlRgltLegal.ajax',
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
		tpl = $('#tblNtnlRgltLgBsCdDataTplFile').html();
	}else{
		tpl = $('#tblNtnlRgltLgBsCdDataTplNoFile').html();
	}
	var renderData = tpl.replace(/%(\w+)%/g, function(matched, matchKey){
		return data[matchKey] || '';
	});

	$('#tblNtnlRgltLgBsCdData tr.tr-data-none').addClass('hide');
	
	$('#tblNtnlRgltLgBsCdData').append(renderData);
	
	ntnlRgltLgBsCdDataReorder();
}
/**
 *  Normativa nacional legal popup select button click event handler
 */	
function onClickBtnNtnlRgltLgBsCdDataAdd(e){
	var hreGenSeq = $('#hreGenSeq').val();
	
	$('#tblLegalInfoLayerData :checked').each(function(){
		var $row = $(this).closest('tr');
		var param = $row.data();
		param.hreGenSeq = hreGenSeq;
		onNtnlRgltLgBsCdDataRender(param);
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
 * Normativa nacional row file download button click Event Handler
 */
function onClickBtnNtnlRgltLgBsCdDataDownload(e){
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
 * Normativa nacional delete button click Event Handler
 */
function onClickBtnNtnlRgltLgBsCdDataDelete(e){
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
            url : '/pih/pihRegInsFicha/modifyNtnlRgltLegal.ajax',
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
	ntnlRgltLgBsCdDataReorder();
	
	e.preventDefault();
	return false;
	
}
/**
 * Normativa nacional data grid force renderering
 */
function ntnlRgltLgBsCdDataReorder(){
	var $rows = $('#tblNtnlRgltLgBsCdData>tr').not('.tr-data-none');
	$rows.each(function(rowIdx, row){
		// Create Row Id
		if($(this).attr('id') == ''){
			$(this).attr('id', 'trNtnlRgltLgBsCdData' + Grid.getUniqueId('tblNtnlRgltLgBsCdData'));
		}
		// Name Index
		$(this).find(':input').each(function(){
			var orinName = $(this).data('orinName');
			var name = $(this).attr('name');
			$(this).attr('name', name.replace(/^(.+\[)(\d+)?(\].+)$/g, '$1' + rowIdx + '$3'));
		});
	});
	
	if($rows.length == 0){
		$('#tblNtnlRgltLgBsCdData tr.tr-data-none').removeClass('hide');
	}
	
	//tooltip reset
	$('.bs-tooltip-top').remove();
	$('[data-toggle="tooltip"]').tooltip();
}


/***********************************************************************************************************************
 * Normativa internaciona file download action event handler
 */
function onClickBtnInterntnlRgltDownload(e){
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
 * Propietario add button click Event Handler
 */
function onClickBtnOwnAdd(e){
	var data = {};
	data.id = Grid.getUniqueId('tblOwnData');
	data.index = $('#tblOwnData>tr').not('.tr-data-none').length;
	data.rownum = $('#tblOwnData>tr').length;
	data.hreGenSeq = $('#hreGenSeq').val();
	
	// collect form data
	$('#tblOwnForm :input').each(function(){
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
            url : '/pih/pihRegInsFicha/modifyOwn.ajax',
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
	var tpl = $('#tblOwnDataTpl').html();
	var renderData = tpl.replace(/%(\w+)%/g, function(matched, matchKey){
		return data[matchKey] || '';
	});
	
	$('#tblOwnData tr.tr-data-none').addClass('hide');
	
	if(!!data.targetId){
		// Modify
		var innerHtml = $(renderData).html();
		$('#tblOwnData #'+data.targetId).html(innerHtml);
	}else{
		// Add
		$('#tblOwnData').append(renderData);
	}
	
	// reset form data
	$('#tblOwnForm :input').each(function(){
		$(this).val('');
	});
	
	ownDataReorder();
	
	e.preventDefault();
	return false;
}
/**
 * Propietario row modify button click Event Handler
 */
function onClickBtnOwnModify(e){
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
	
	$('#tblOwnForm :input').each(function(){
		var key = $(this).data('name');
		$(this).val(data[key]);
	});
	
	e.preventDefault();
	return false;
}
/**
 * Propietario row delete button click Event Handler
 */
function onClickBtnOwnDelete(e){
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
            url : '/pih/pihRegInsFicha/modifyOwn.ajax',
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
	ownDataReorder();
	
	e.preventDefault();
	return false;
}

/**
 * Propietario data grid force renderering
 */
function ownDataReorder(){
	var $rows = $('#tblOwnData>tr').not('.tr-data-none');
	$rows.each(function(rowIdx, row){
		// Create Row Id
		if($(this).attr('id') == ''){
			$(this).attr('id', 'trOwnData' + Grid.getUniqueId('tblOwnData'));
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
		$('#tblOwnData tr.tr-data-none').removeClass('hide');
	}
	
	//tooltip reset
	$('.bs-tooltip-top').remove();
	$('[data-toggle="tooltip"]').tooltip();
}

function onClickBtnInteArchDel(e){
	// has general key
	var ajaxError = false;
	if($('#hreGenSeq').val() != ''){
		ajaxError = true;
		
		$.ajax({
            type : 'POST',
            url : '/pih/pihRegInsFicha/deleteNtnlRgltLegal.ajax',
            async: false,
            dataType : 'json',
            data : {'hreGenSeq' : $('#hreGenSeq').val(), 'archTpCd' : 'PIH015003'},
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
                
                $('#tblInvtConForm :hidden.file-item-info').each(function(){
            		$(this).val('');
            	});
            	
                $("#tblInterntnlRgltForm .file-item-link").remove();
            	
            	$("input[name='interntnlRglt.archTitle']").val('');
            	$("input[name='interntnlRglt.archRelDt']").val('');
            	
            	$("#tblInterntnlRgltForm .int_file_item_del").hide();
            }
		});
	}
	if(ajaxError){
		e.preventDefault();
		return false;
	}
	
	e.preventDefault();
	return false;
}

/***********************************************************************************************************************
 * Inscripción de condición cultural Inscrito radio change event handler
 */
function onChangeInscrito(e){
	var val = $('#tblCulConRegForm .cul-con-reg-group:checked').val();
	if(val == 'Y'){
		$('.cul-con-reg-group-area').removeClass('hide');
	}else{
		$('.cul-con-reg-group-area').addClass('hide');
	}
}
/**
 * Inscripción de condición cultural add button click Event Handler
 */
function onClickBtnCulConRegAdd(e){
	var val = $('#tblCulConRegForm .cul-con-reg-group:checked').val();
	if(val == 'N') {
		e.preventDefault();
		return false;
	}
	
	var data = {};
	data.id = Grid.getUniqueId('tblCulConRegData');
	data.index = $('#tblCulConRegData>tr').not('.tr-data-none').length;
	data.rownum = $('#tblCulConRegData>tr').length;
	data.hreGenSeq = $('#hreGenSeq').val();
	
	// collect form data
	$('#tblCulConRegForm :input').each(function(){
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
        Common.alert('warning', errCulConRegName);
        return false;
    }
	if(data.archChgNm == ''){
        Common.alert('warning', errCulConRegFile);
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
	var tpl = $('#tblCulConRegDataTpl').html();
	var renderData = tpl.replace(/%(\w+)%/g, function(matched, matchKey){
		return data[matchKey] || '';
	});
	
	$('#tblCulConRegData tr.tr-data-none').addClass('hide');
	
	if(!!data.targetId){
		// Modify
		var innerHtml = $(renderData).html();
		$('#tblCulConRegData #'+data.targetId).html(innerHtml);
	}else{
		// Add
		$('#tblCulConRegData').append(renderData);
	}
	
	// reset form data
	$('#tblCulConRegForm :input').not(':radio').each(function(){
		$(this).val('');
	});
	// file link remove
	$('#tblCulConRegForm .file-item-link').remove();
	
	culConRegDataReorder();
	
	e.preventDefault();
	return false;
}
/**
 * Inscripción de condición cultural file download action event handler
 */
function onClickBtnCulConRegDownload(e){
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
 * Inscripción de condición cultural row modify button click Event Handler
 */
function onClickBtnCulConRegModify(e){
	var $row = $(this).closest('tr');
	var data = {};
	data.targetId = $row.attr('id');
	
	// collect row data
	$row.find(':hidden').each(function(){
		var key = $(this).data('orinName');
		var value = $(this).val();
		data[key] = value;
	});
	
	$('#tblCulConRegForm :input').each(function(){
		var key = $(this).data('name');
		$(this).val(data[key]);
	});
	
	var $td = $('#btnCulConRegUpload').closest('td');
	$td.find('.file-item-link').remove();
	var $link = $('<a href="#" class="btn_link textDel file-item-link">' + data.archOrgNm + '<i class="file-item-remove-link"></i></a>');
    $link.data(data);
    $link.appendTo($td);
	
	e.preventDefault();
	return false;
}
/**
 * Inscripción de condición cultural row delete button click Event Handler
 */
function onClickBtnCulConRegDelete(e){
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
	culConRegDataReorder();
	
	e.preventDefault();
	return false;
	
}
/**
 * Inscripción de condición cultural data grid force renderering
 */
function culConRegDataReorder(){
	var $rows = $('#tblCulConRegData>tr').not('.tr-data-none');
	$rows.each(function(rowIdx, row){
		// Create Row Id
		if($(this).attr('id') == ''){
			$(this).attr('id', 'trCulConRegData' + Grid.getUniqueId('tblCulConRegData'));
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
		$('#tblCulConRegData tr.tr-data-none').removeClass('hide');
	}
	
	//tooltip reset
	$('.bs-tooltip-top').remove();
	$('[data-toggle="tooltip"]').tooltip();
	
	onChangeInscrito();
}


/***********************************************************************************************************************
 * Inscripción de condición cultural Inscrito radio change event handler
 */
function onChangeinvtCd(){
	var invtCd = $('#invtCd').val();
	$('.invt-group-area').addClass('hide').each(function(){
		var tpInvtCd = $(this).data('tpInvtCd');
		if(invtCd == tpInvtCd){
			$(this).removeClass('hide');
		}
	});
}


/***********************************************************************************************************************
 * Intervenciones Con Autorización add button click Event Handler
 */
function onClickBtnInvtConAdd(e){
	var data = {};
	data.id = Grid.getUniqueId('tblInvtConData');
	data.index = $('#tblInvtConData>tr').not('.tr-data-none').length;
	data.rownum = $('#tblInvtConData>tr').length;
	data.hreGenSeq = $('#hreGenSeq').val();
	data.rel2Cd = '06400001';
	
	// collect form data
	$('#tblInvtConForm :input').each(function(){
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
    if(data.relCd3 == ''){
        Common.alert('warning', errInvtConRelCd3);
        return false;
    }
	if(data.archChgNm == ''){
        Common.alert('warning', errInvtFile);
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
	var tpl = $('#tblInvtConDataTpl').html();
	var renderData = tpl.replace(/%(\w+)%/g, function(matched, matchKey){
		return data[matchKey] || '';
	});
	
	$('#tblInvtConData tr.tr-data-none').addClass('hide');
	
	if(!!data.targetId){
		// Modify
		var innerHtml = $(renderData).html();
		$('#tblInvtConData #'+data.targetId).html(innerHtml);
	}else{
		// Add
		$('#tblInvtConData').append(renderData);
	}
	
	// reset form data
	$('#tblInvtConForm :input').each(function(){
		$(this).val('');
	});
	// file link remove
	$('#tblInvtConForm .file-item-link').remove();
	
	invtConDataReorder();
	
	e.preventDefault();
	return false;
}
/**
 * Intervenciones Con Autorización file download action event handler
 */
function onClickBtnInvtConDownload(e){
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
 * Intervenciones Con Autorización row modify button click Event Handler
 */
function onClickBtnInvtConModify(e){
	var $row = $(this).closest('tr');
	var data = {};
	data.targetId = $row.attr('id');
	
	// collect row data
	$row.find(':hidden').each(function(){
		var key = $(this).data('orinName');
		var value = $(this).val();
		data[key] = value;
	});
	
	$('#tblInvtConForm :input').each(function(){
		var key = $(this).data('name');
		$(this).val(data[key]);
	});
	
	var $td = $('#btnInvtConUpload').closest('td');
	$td.find('.file-item-link').remove();
	var $link = $('<a href="#" class="btn_link textDel file-item-link">' + data.archOrgNm + '<i class="file-item-remove-link"></i></a>');
    $link.data(data);
    $link.appendTo($td);
	
	e.preventDefault();
	return false;
}
/**
 * Intervenciones Con Autorización row delete button click Event Handler
 */
function onClickBtnInvtConDelete(e){
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
	invtConDataReorder();
	
	e.preventDefault();
	return false;
	
}
/**
 * Intervenciones Con Autorización data grid force renderering
 */
function invtConDataReorder(){
	var $rows = $('#tblInvtConData>tr').not('.tr-data-none');
	$rows.each(function(rowIdx, row){
		// Create Row Id
		if($(this).attr('id') == ''){
			$(this).attr('id', 'trInvtConData' + Grid.getUniqueId('tblInvtConData'));
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
		$('#tblInvtConData tr.tr-data-none').removeClass('hide');
	}
	
	//tooltip reset
	$('.bs-tooltip-top').remove();
	$('[data-toggle="tooltip"]').tooltip();
	
	onChangeinvtCd();
}


/***********************************************************************************************************************
 * Intervenciones Sin add button click Event Handler
 */
function onClickBtnInvtSinAdd(e){
	var data = {};
	data.id = Grid.getUniqueId('tblInvtSinData');
	data.index = $('#tblInvtSinData>tr').not('.tr-data-none').length;
	data.rownum = $('#tblInvtSinData>tr').length;
	data.hreGenSeq = $('#hreGenSeq').val();
	data.rel2Cd = '06400002';
	
	// collect form data
	$('#tblInvtSinForm :input').each(function(){
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
        Common.alert('warning', errInvtConArchTitle);
        return false;
    }
	if(data.archChgNm == ''){
        Common.alert('warning', errInvtFile);
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
	var tpl = $('#tblInvtSinDataTpl').html();
	var renderData = tpl.replace(/%(\w+)%/g, function(matched, matchKey){
		return data[matchKey] || '';
	});
	
	$('#tblInvtSinData tr.tr-data-none').addClass('hide');
	
	if(!!data.targetId){
		// Modify
		var innerHtml = $(renderData).html();
		$('#tblInvtSinData #'+data.targetId).html(innerHtml);
	}else{
		// Add
		$('#tblInvtSinData').append(renderData);
	}
	
	// reset form data
	$('#tblInvtSinForm :input').each(function(){
		$(this).val('');
	});
	// file link remove
	$('#tblInvtSinForm .file-item-link').remove();
	
	invtSinDataReorder();
	
	e.preventDefault();
	return false;
}
/**
 * Intervenciones Sin file download action event handler
 */
function onClickBtnInvtSinDownload(e){
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
 * Intervenciones Sin row modify button click Event Handler
 */
function onClickBtnInvtSinModify(e){
	var $row = $(this).closest('tr');
	var data = {};
	data.targetId = $row.attr('id');
	
	// collect row data
	$row.find(':hidden').each(function(){
		var key = $(this).data('orinName');
		var value = $(this).val();
		data[key] = value;
	});
	
	$('#tblInvtSinForm :input').each(function(){
		var key = $(this).data('name');
		$(this).val(data[key]);
	});
	
	var $td = $('#btnInvtSinUpload').closest('td');
	$td.find('.file-item-link').remove();
	var $link = $('<a href="#" class="btn_link textDel file-item-link">' + data.archOrgNm + '<i class="file-item-remove-link"></i></a>');
    $link.data(data);
    $link.appendTo($td);
	
	e.preventDefault();
	return false;
}
/**
 * Intervenciones Sin row delete button click Event Handler
 */
function onClickBtnInvtSinDelete(e){
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
	invtSinDataReorder();
	
	e.preventDefault();
	return false;
	
}
/**
 * Intervenciones Sin data grid force renderering
 */
function invtSinDataReorder(){
	var $rows = $('#tblInvtSinData>tr').not('.tr-data-none');
	$rows.each(function(rowIdx, row){
		// Create Row Id
		if($(this).attr('id') == ''){
			$(this).attr('id', 'trInvtSinData' + Grid.getUniqueId('tblInvtSinData'));
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
		$('#tblInvtSinData tr.tr-data-none').removeClass('hide');
	}
	
	//tooltip reset
	$('.bs-tooltip-top').remove();
	$('[data-toggle="tooltip"]').tooltip();
	
	onChangeinvtCd();
}


/***********************************************************************************************************************
 * Afectaciones row file download action event handler
 */
function onClickBtnReportDocDownload(e){
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
 * Puesta en Valor add button click Event Handler
 */
function onClickBtnSetValTpAdd(e){
	var data = {};
	data.id = Grid.getUniqueId('tblSetValTpData');
	data.index = $('#tblSetValTpData>tr').not('.tr-data-none').length;
	data.rownum = $('#tblSetValTpData>tr').length;
	data.hreGenSeq = $('#hreGenSeq').val();
	
	// collect form data
	$('#tblSetValTpForm :input').each(function(){
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
	var tpl = $('#tblSetValTpDataTpl').html();
	var renderData = tpl.replace(/%(\w+)%/g, function(matched, matchKey){
		return data[matchKey] || '';
	});
	
	$('#tblSetValTpData tr.tr-data-none').addClass('hide');
	
	if(!!data.targetId){
		// Modify
		var innerHtml = $(renderData).html();
		$('#tblSetValTpData #'+data.targetId).html(innerHtml);
	}else{
		// Add
		$('#tblSetValTpData').append(renderData);
	}
	
	// reset form data
	$('#tblSetValTpForm :input').each(function(){
		$(this).val('');
	});
	// file link remove
	$('#tblSetValTpForm .file-item-link').remove();
	
	setValTpDataReorder();
	
	e.preventDefault();
	return false;
}
/**
 * Puesta en Valor file download action event handler
 */
function onClickBtnSetValTpDownload(e){
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
 * Puesta en Valor row modify button click Event Handler
 */
function onClickBtnSetValTpModify(e){
	var $row = $(this).closest('tr');
	var data = {};
	data.targetId = $row.attr('id');
	
	// collect row data
	$row.find(':hidden').each(function(){
		var key = $(this).data('orinName');
		var value = $(this).val();
		data[key] = value;
	});
	
	$('#tblSetValTpForm :input').each(function(){
		var key = $(this).data('name');
		$(this).val(data[key]);
	});
	
	var $td = $('#btnSetValTpUpload').closest('td');
	$td.find('.file-item-link').remove();
	var $link = $('<a href="#" class="btn_link textDel file-item-link">' + data.archOrgNm + '<i class="file-item-remove-link"></i></a>');
    $link.data(data);
    $link.appendTo($td);
	
	e.preventDefault();
	return false;
}
/**
 * Puesta en Valor row delete button click Event Handler
 */
function onClickBtnSetValTpDelete(e){
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
	setValTpDataReorder();
	
	e.preventDefault();
	return false;
	
}
/**
 * Puesta en Valor data grid force renderering
 */
function setValTpDataReorder(){
	var $rows = $('#tblSetValTpData>tr').not('.tr-data-none');
	$rows.each(function(rowIdx, row){
		// Create Row Id
		if($(this).attr('id') == ''){
			$(this).attr('id', 'trSetValTpData' + Grid.getUniqueId('tblSetValTpData'));
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
		$('#tblSetValTpData tr.tr-data-none').removeClass('hide');
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


/***********************************************************************************************************************
 * Guardar button click Event Handler
 */
function onSubmit(e){
	tinyMCE.triggerSave();
    Ajax.request('/pih/pihRegInsFicha/saveDataLegalPrtctn.ajax', $('#major').serializeArray(), function(data){
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