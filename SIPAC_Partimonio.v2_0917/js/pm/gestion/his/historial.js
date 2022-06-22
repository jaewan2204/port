$(function () {
    Common.pageMaker('pageMaker', rowTotalCnt);
    Common.pageSize('sbListSize', pageListSize);

 
    $('#sbListSize').change(function () {
        $('#pageListSize').val($(this).val());
        $('#SRCH_FORM').attr('method', 'post');
        $('#SRCH_FORM').attr('action', GLO_PAGE_URL);
        $('#SRCH_FORM').submit();
    });


 
    $('.openPopup').on('click', function () {
        $('#preRegNo').text($(this).data('preRegNo'));
        $('#ntnlRegCdNo').text($(this).data('ntnlRegCdNo'));
        $('#createUserNm').text($(this).data('createUserNm'));
        $('#createDate').text($(this).data('createDate'));
        $('#denominacion').text($(this).data('denominacion'));
        $('#displayColumnNm').text($(this).data('displayColumnNm'));
        $('#beforeCct').text($(this).data('beforeCct'));
        $('#afterCct').text($(this).data('afterCct'));
        $('.modal').hide();
        $('#layerpopup01').show();
        $('#layerpopup01').layerCenter();
    });

 
    $('#searchBtn').on('click', function () {
        $("#pageListSize").val($("#sbListSize").val());
        $("#pageIndex").val("1");
        // form submit
        $("#SRCH_FORM").attr("method", "post");
        $("#SRCH_FORM").attr("action", GLO_PAGE_URL);
        $("#SRCH_FORM").submit();

    });


 
    $('#reSetBtn').on('click', function () {
        $('[name=ntnlRegCdNo]').val('');
        $('[name=preRegNo]').val('');
        $('[name=crudVal]').val('');
        $('[name=startDate]').val('');
        $('[name=endDate]').val('');
        $('[name=createUserSeq]').val('');
    });


 
    $('#excelDownLoad').on('click', function () {
 
        var strCols = 'Nº, Nº Pre-Inscripción, Código de Registro Nacional, Clasificación específica, Tipo de bien, Título / Denominación, Material, ITEM Cambiado, Acción realizada, Usuario, Fecha de Cambio, antes del cambio, después del cambio';
        $('#strCols').val(strCols);
        $('#SRCH_FORM').attr('method', 'post');
        $('#SRCH_FORM').attr('action', '/pm/pmHistorial/historialExcel.do');
        $('#SRCH_FORM').submit();
    });
});

//Detail
function openDetail(seq) {
	// popup show
	$(".modal").hide();
    $("#layerpopup01").show();
    $("#layerpopup01").layerCenter();
    $('#preRegNo').text("");
    $('#ntnlRegCdNo').text("");
    $('#createUserNm').text("");
    $('#createDate').text("");
    $('#denominacion').text("");
    $('#displayColumnNm').text("");
    $('#beforeCct').html("");
    $('#afterCct').html("");
    /** data set **/
    // ajax call
	var url = "/pm/pmHistorial/mvbHistOpenDetail.ajax";
	var jsonData = {
			"seq" : seq
		};
	Ajax.request(url, jsonData, function(result) {
		$('#preRegNo').text(Common.isNull(result.PREREGNO)?"":result.PREREGNO);
        $('#ntnlRegCdNo').text(Common.isNull(result.NTNLREGCDNO)?"":result.NTNLREGCDNO);
        $('#createUserNm').text(Common.isNull(result.CREATEUSERNM)?"":result.CREATEUSERNM);
        $('#createDate').text(Common.isNull(result.CREATEDATE)?"":result.CREATEDATE);
        $('#denominacion').text(Common.isNull(result.DENOMINACION)?"":result.DENOMINACION);
        $('#displayColumnNm').text(Common.isNull(result.DISPLAYCOLUMNNM)?"":result.DISPLAYCOLUMNNM);
        $('#beforeCct').html(Common.isNull(result.BEFORECCTNM)?"":result.BEFORECCTNM);
        $('#afterCct').html(Common.isNull(result.AFTERCCTNM)?"":result.AFTERCCTNM);
	}, "");
}