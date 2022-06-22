/**
 * init event and event bind
 */
$(function () {
	// Regist table uniqueId getter
	//Grid.createUniqueId('tblImgData');
	
	// Init event
	//imgDataReorder();
	
	/**
	 * file download action event binding
	 */
	$(document).on('click', '.file-item-link', onClickBtnArchDownload);
	
	
	$(document).on('click', '#hrtgAsctSiteListData .btn-detail', onClickBtnHrtgAsctView);
	
	
	
	
	/**
	 * Guardar button click event binding
	 */
	$(document).on('click', '#btnSubmit', onSubmit);
	$(document).on('click', '#btnList', function(){
		$(".loadingWrap").show(); 
		var frmSearchList = $('<form>', {
			method: 'post',
			action: '/pih/pihSrchAdvance/historicoSrchList.do'
		});
		frmSearchList.append($('<input type="hidden" name="p" value="l" />'));
		frmSearchList.appendTo('body');
		frmSearchList.submit();
		//location.href = '/pih/pihSrchAdvance/historicoSrchList.do';	
	});
	
	$(document).on('click', '#btnObsvtPopup', onClickBtnObsvtPopup);
	$(document).on('click', '#btnUnlockPopup', onClickBtnUnlockPopup);
});

/**
 * file download action event handler
 */
function onClickBtnArchDownload(e){
	var data = $(this).data();
	var fileOrgName = data.archOrgNm || data.imgOrgNm || '';
	var fileChgName = data.archChgNm || data.imgChgNm || '';
	var archPath = data.archPath || data.imgPath || '';
	var fileSize = data.fileSize || 0;
	
    if(data.imgOrgNm != '' || data.imgChgNm != '' || data.imgPath != '' || data.fileSize != ''){
        var jsonData = {
            "fileOrgName" : fileOrgName,
            "fileChgName" : fileChgName,
            "filePath" : archPath,
            "fileSize" : fileSize
        }
        Download.singlePopOpen(jsonData);	 
    }
    e.preventDefault();
    return false;
}

function onClickBtnHrtgAsctView(e){
	var $row = $(this).closest('tr');
	var mvbGenSeq = $row.data('seq');
	
	var url    ='/pm/pmRegInsFicha/popupGeneralPage.do?mvbGenSeq=' + mvbGenSeq;
	var title  = "GeneralPage";
	var status = "toolbar=no,directories=no,scrollbars=no,resizable=no,status=no,menubar=no,width=1000, height=800, resizable = no, scrollbars = no";
	 
	window.open(url, title, status);
	
	e.preventDefault();
    return false;
}

/**
 * Guardar button click Event Handler
 */
function onSubmit(e){
    Ajax.request('/pih/pihRegInsFicha/saveGeneralModifyPage.ajax', $('#major').serializeArray(), function(data){
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

function onClickBtnObsvtPopup(e){
	var hreGenSeq = $('#hreGenSeq').val();
	
	$('#layerObserved #rejtReasonCt').html('');
	$('#layerObserved #rejtReasonUser').html('');
	$('#layerObserved #rejtReasonDate').html('');
	
	openPopup('layerObserved');
	
	var param = {
		"hreGenSeq" : hreGenSeq
	};
	
	$.ajax({
        type : 'GET',
        url : '/pih/pihRegUpd/getObservedDataView.ajax',
        dataType : 'json',
        data : param,
        error : function(request, status, error) {
            alert('La comunicación del servidor falló.' + error);
        },
        success : function(data){
        	$('#layerObserved #rejtReasonCt').html(Common.convert(data.getData.REJT_REASON_CT));
    		$('#layerObserved #rejtReasonUser').html(data.getData.USER_NM);
    		$('#layerObserved #rejtReasonDate').html(data.getData.APPR_DATE);
        }
	});
	
	e.preventDefault();
	return false;
}

function onClickBtnUnlockPopup(e){
	var hreGenSeq = $('#hreGenSeq').val();
	
	$('#layerUnlock #reasonContent').html('');
	$('#layerUnlock #reasonCreateUserNm').html('');
	$("#CHK_PIH002004001").hide();
	$("#CHK_PIH002004002").hide();
	$("#CHK_PIH002004003").hide();
	$("#CHK_PIH002004004").hide();
	
	openPopup('layerUnlock');
	
	var param = {
		"hreGenSeq" : hreGenSeq
	};
	
	$.ajax({
        type : 'GET',
        url : '/pih/pihRegUpd/getUnlockDataView.ajax',
        dataType : 'json',
        data : param,
        error : function(request, status, error) {
            alert('La comunicación del servidor falló.' + error);
        },
        success : function(data){
        	$('#layerUnlock #reasonContent').html(Common.convert(data.getData.REASON_CT));
    		$('#layerUnlock #reasonCreateUserNm').html(data.getData.USER_NM);
    		var reasonCdStr = (data.getData.REASON_CD).split(",");
    		for(var i = 0; i < reasonCdStr.length; i++){
    			$("#layerUnlock #CHK_"+reasonCdStr[i]).show();
    		}
        }
	});
	
	e.preventDefault();
	return false;
}

function fn_usrHisOpenPopup(id){
	var param = {
		"popupId" : "layerPopup7",
		"tpCd": 'pih',
		"srchHreGenSeq" : id
	};
	Common.layerPopup(param);
}

