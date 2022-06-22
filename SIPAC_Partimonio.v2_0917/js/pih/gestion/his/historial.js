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
 
        var strCols = 'Nº, Nº Pre-Inscripción, Código de Registro Nacional, Clasificación, Clasificación específica, Nombre, ITEM Cambiado, Acción realizada, Usuario, Fecha de Cambio, antes del cambio, después del cambio';
        $('#strCols').val(strCols);
        $('#SRCH_FORM').attr('method', 'post');
        $('#SRCH_FORM').attr('action', '/pih/pihHistorial/historialExcel.do');
        $('#SRCH_FORM').submit();
    });
});

function lpad(str, padLen, padStr) {
    if (padStr.length > padLen) {
        return str;
    }
    str += "";  
    padStr += "";  
    while (str.length < padLen)
        str = padStr + str;
    str = str.length >= padLen ? str.substring(0, padLen) : str;
    return str;
}

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
    $('#nameSpnNm').text("");
    $('#displayColumnNm').text("");
    $('#beforeCct').html("");
    $('#afterCct').html("");
    /** data set **/
    // ajax call
	var url = "/pih/pihHistorial/pihHistOpenDetail.ajax";
	var jsonData = {
			"seq" : seq
		};
	Ajax.request(url, jsonData, function(result) {
		$('#preRegNo').text(Common.isNull(result.PREREGNO)?"":lpad(result.PREREGNO, 10, "0"));
        $('#ntnlRegCdNo').text(Common.isNull(result.NTNLREGCDNO)?"":"BC-M-" + lpad(result.NTNLREGCDNO, 10, "0"));
        $('#createUserNm').text(Common.isNull(result.CREATEUSERNM)?"":result.CREATEUSERNM);
        $('#createDate').text(Common.isNull(result.CREATEDATE)?"":result.CREATEDATE);
        $('#nameSpnNm').text(Common.isNull(result.NAMESPNNM)?"":result.NAMESPNNM);
        $('#displayColumnNm').text(Common.isNull(result.DISPLAYCOLUMNNM)?"":result.DISPLAYCOLUMNNM);
        $('#beforeCct').html(Common.isNull(result.BEFORECCTNM)?"":result.BEFORECCTNM);
        $('#afterCct').html(Common.isNull(result.AFTERCCTNM)?"":result.AFTERCCTNM);
	}, "");
}