/***********************************************************************************************
 ** Global Variable 
 ***********************************************************************************************/

//console.log("js.G_authPM::"+G_authPM);


/***********************************************************************************************
 ** Function Declarations 
 ***********************************************************************************************/

 
function fnGoNoticeDetail(seq) {
	// form create & submit
	var $form = $("<form></form>");
	$form.attr("method", "post");
	$form.attr("action", "/util/utilNotice/noticeDtlPage.do");
	$form.appendTo("body");
	$form.append($("<input type='hidden' name='boardSeq' value='"+seq+"'>"));
	$form.submit();
}

 
function fnGoMyFavorProgramUrl(sysCd, menuCd, menuLvl, menuPath) {
	// form create & submit
	var $form = $("<form></form>");
	$form.attr("method", "post");
	$form.attr("action", "/navi/goMyFavorProgramUrl.do");
	$form.appendTo("body");
	$form.append($("<input type='hidden' name='CURR_SYSTEM' value='"+sysCd+"'>"));
	$form.append($("<input type='hidden' name='CURR_MENU_CD' value='"+menuCd+"'>"));
	$form.append($("<input type='hidden' name='CURR_MENU_LVL' value='"+menuLvl+"'>"));
	$form.append($("<input type='hidden' name='CURR_MENU_PATH' value='"+menuPath+"'>"));
	$form.submit();
	$(".loadingWrap").show();
}

 
function fnMyFavorPopOpen() {
	// popup show
	$(".modal").hide();
    $("#LayerFavoritos").show();
    $("#LayerFavoritos").layerCenter();
}

 
function fnMyFavorPopClose() {
	// form create & submit
	var $form = $("<form></form>");
	$form.attr("method", "post");
	$form.attr("action", "/navi/main.do");
	$form.appendTo("body");
	$form.submit();
}

 
function fnMyFavorSave() {
 
	var menuArr = [];
 
	$("input:checkbox[name='menu1']:checked").each(function() {
		menuArr.push(this.value);
	});
 
	$("input:checkbox[name='menu2']:checked").each(function() {
		menuArr.push(this.value);
	});
 
	$("input:checkbox[name='menu4']:checked").each(function() {
		menuArr.push(this.value);
	});
 
	$("input:checkbox[name='menu5']:checked").each(function() {
		menuArr.push(this.value);
	});
 
	$("input:checkbox[name='menu6']:checked").each(function() {
		menuArr.push(this.value);
	});
		
	//console.log("menuArr::"+menuArr);
	//console.log("menuArr.length::"+menuArr.length);
	if(menuArr.length > 6) {
 
		Common.alert("warning",G_favoriteMax,"");
		return false;
	}
	//return false;
	$("#menuArray").val(menuArr);
	// form submit
	$("#MAIN_FORM").attr("method", "post");
	//$("#MAIN_FORM").attr("action", "/sys/sysMngAuth/saveGroupAuth.do");
	$("#MAIN_FORM").attr("action", "/util/utilMyPage/regUserFavorite.do");
    $("#MAIN_FORM").submit(); 

}

 
function fnMyFavorDel(menuSeq, menuCd, obj) {
 
	
	if(confirm(G_conDelMsg)) {
		var url = "/util/utilMyPage/delUserFavorite.ajax";
		var jsonData = {
				"menuSeq" : menuSeq
			};
		Ajax.request(url, jsonData, function(data) {
					if(data.RESULT == "OK") {
						Common.alert("success", data.MSG, "");  
						var liTag = $(obj).parent().parent(); 
						liTag.remove();  
						$("input:checkbox[id="+menuCd+"]").prop("checked", false);  
					}
				}, "");
	}
}

 
function fnMainMyPage() {
	// form create & submit
	var $form = $("<form></form>");
	$form.attr("method", "post");
	$form.attr("action", "/navi/util/myPage.do");
	$form.appendTo("body");
	$form.submit();
}

/***********************************************************************************************
 ** $(document).ready()
 ***********************************************************************************************/
$(document).ready(function(){
	
 
	if(G_authPM=="PM") {
		$("#aTagPM").addClass("active");
		$("#tab-con01").addClass("show active");
	} else if(G_authPIH=="PIH") {
		$("#aTagPIH").addClass("active");
		$("#tab-con02").addClass("show active");
	} else if(G_authHEP=="HEP") {
		$("#aTagHEP").addClass("active");
		$("#tab-con04").addClass("show active");
	} else if(G_authHEA=="HEA") {
		$("#aTagHEA").addClass("active");
		$("#tab-con05").addClass("show active");
	} else if(G_authSYS=="SYS") {
		$("#aTagSYS").addClass("active");
		$("#tab-con06").addClass("show active");	
	}
	
	
	
});


