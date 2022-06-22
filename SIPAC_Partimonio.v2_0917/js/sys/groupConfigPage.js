/***********************************************************************************************
 ** Global Variable 
 ***********************************************************************************************/


/***********************************************************************************************
 ** Function Declarations 
 ***********************************************************************************************/
function fnSaveAuth() {
 
	var menuArr = [];
 
	$("input:checkbox[name='sysAuth']:checked").each(function() {
		menuArr.push(this.value);
	});
 
	$("input:checkbox[name='menu1']:checked").each(function() {
		menuArr.push(this.value);
 
		if(this.value.length == 11) {
			//console.log("parentsCd::"+this.value.substring(0,5)+" || parentsCd2::"+this.value.substring(0,8));
			// PM005 001 006
			var parentsCd = this.value.substring(0,5);
			var parentsCd2 = this.value.substring(0,8);
			menuArr.push(parentsCd);
			menuArr.push(parentsCd2);
		} else if(this.value.length == 8) {
			//console.log("parentsCd::"+this.value.substring(0,5));
			var parentsCd = this.value.substring(0,5);
			menuArr.push(parentsCd);
		}
	});
 
	$("input:checkbox[name='menu2']:checked").each(function() {
		menuArr.push(this.value);
 
		if(this.value.length == 12) {
			// PIH 001 001 001
			var parentsCd = this.value.substring(0,6); // PIH001
			var parentsCd2 = this.value.substring(0,9); // PIH001001
			menuArr.push(parentsCd);
			menuArr.push(parentsCd2);
		} else if(this.value.length == 9) {
			var parentsCd = this.value.substring(0,6); // PIH001
			menuArr.push(parentsCd);
		}
	});		
 
	/***********고고학유산 추가********************/
	$("input:checkbox[name='pa_menu2']:checked").each(function() {
		menuArr.push(this.value);
 
		if(this.value.length == 11) {
			// PIH 001 001 001
			var parentsCd = this.value.substring(0,5); // PA001
			var parentsCd2 = this.value.substring(0,8); // PA001001
			menuArr.push(parentsCd);
			menuArr.push(parentsCd2);
		} else if(this.value.length == 8) {
			var parentsCd = this.value.substring(0,5); // PA001
			menuArr.push(parentsCd);
		}
	});
	
	$("input:checkbox[name='menu3']:checked").each(function() {
		menuArr.push(this.value);
	});
 
	$("input:checkbox[name='menu4']:checked").each(function() {
		menuArr.push(this.value);
 
		if(this.value.length == 9) {
			// HEP 001 001
			var parentsCd = this.value.substring(0,6);
			menuArr.push(parentsCd);
		}
	});
 
	$("input:checkbox[name='menu5']:checked").each(function() {
		menuArr.push(this.value);
 
		if(this.value.length == 9) {
			// HEA 001 001
			var parentsCd = this.value.substring(0,6);
			menuArr.push(parentsCd);
		}
	});
 
	$("input:checkbox[name='menu6']:checked").each(function() {
		menuArr.push(this.value);
 
		if(this.value.length == 9) {
			// SYS 001 001
			var parentsCd = this.value.substring(0,6);
			menuArr.push(parentsCd);
		}
	});
		
	//console.log("menuArr::"+menuArr);
	$("#menuArray").val(menuArr);
	// form submit
	$("#MAIN_FORM").attr("method", "post");
	$("#MAIN_FORM").attr("action", "/sys/sysMngAuth/saveGroupAuth.do");
    $("#MAIN_FORM").submit();
	
}

 
function fnGoUrl() {
	location.href = "/sys/sysMngAuth/authPage.do";
}

/***********************************************************************************************
 ** $(document).ready()
 ***********************************************************************************************/
$(document).ready(function(){
 
	var pmYn = $("input:checkbox[id='PM']").is(":checked");
	if(!pmYn) {
		$("input:checkbox[name='allChk1']").prop("disabled", true);
		$("input:checkbox[name='menu1']").each(function() {
			this.disabled = true;
		});
	}
 
	var pihYn = $("input:checkbox[id='PIH']").is(":checked");
	if(!pihYn) {
		$("input:checkbox[name='allChk2']").prop("disabled", true);
		$("input:checkbox[name='menu2']").each(function() {
			this.disabled = true;
		});
	}
 
	var sigYn = $("input:checkbox[id='SIG']").is(":checked");
	if(!sigYn) {
		$("input:checkbox[name='allChk3']").prop("disabled", true);
		$("input:checkbox[name='menu3']").each(function() {
			this.disabled = true;
		});
	}
 
	var hepYn = $("input:checkbox[id='HEP']").is(":checked");
	if(!hepYn) {
		$("input:checkbox[name='allChk4']").prop("disabled", true);
		$("input:checkbox[name='menu4']").each(function() {
			this.disabled = true;
		});
	}
 
	var heaYn = $("input:checkbox[id='HEA']").is(":checked");
	if(!heaYn) {
		$("input:checkbox[name='allChk5']").prop("disabled", true);
		$("input:checkbox[name='menu5']").each(function() {
			this.disabled = true;
		});
	}
 
	var sysYn = $("input:checkbox[id='SYS']").is(":checked");
	if(!sysYn) {
		$("input:checkbox[name='allChk6']").prop("disabled", true);
		$("input:checkbox[name='menu6']").each(function() {
			this.disabled = true;
		});
	}
	
	 
	$("#PM").click(function() {
		if(this.checked) {
			$("input:checkbox[name='allChk1']").prop("disabled", false);
			$("input:checkbox[name='menu1']").each(function() {
				this.disabled = false;
			});	
		} else {
			$("input:checkbox[name='allChk1']").prop("disabled", true);
			$("input:checkbox[name='menu1']").each(function() {
				this.disabled = true;
			});
		}
	});
 
	$("#PIH").click(function() {
		if(this.checked) {
			$("input:checkbox[name='allChk2']").prop("disabled", false);
			$("input:checkbox[name='menu2']").each(function() {
				this.disabled = false;
			});	
		} else {
			$("input:checkbox[name='allChk2']").prop("disabled", true);
			$("input:checkbox[name='menu2']").each(function() {
				this.disabled = true;
			});
		}
	});
 
	$("#SIG").click(function() {
		if(this.checked) {
			$("input:checkbox[name='allChk3']").prop("disabled", false);
			$("input:checkbox[name='menu3']").each(function() {
				this.disabled = false;
			});	
		} else {
			$("input:checkbox[name='allChk3']").prop("disabled", true);
			$("input:checkbox[name='menu3']").each(function() {
				this.disabled = true;
			});
		}
	});
 
	$("#HEP").click(function() {
		if(this.checked) {
			$("input:checkbox[name='allChk4']").prop("disabled", false);
			$("input:checkbox[name='menu4']").each(function() {
				this.disabled = false;
			});	
		} else {
			$("input:checkbox[name='allChk4']").prop("disabled", true);
			$("input:checkbox[name='menu4']").each(function() {
				this.disabled = true;
			});
		}
	});
 
	$("#HEA").click(function() {
		if(this.checked) {
			$("input:checkbox[name='allChk5']").prop("disabled", false);
			$("input:checkbox[name='menu5']").each(function() {
				this.disabled = false;
			});	
		} else {
			$("input:checkbox[name='allChk5']").prop("disabled", true);
			$("input:checkbox[name='menu5']").each(function() {
				this.disabled = true;
			});
		}
	});
 
	$("#SYS").click(function() {
		if(this.checked) {
			$("input:checkbox[name='allChk6']").prop("disabled", false);
			$("input:checkbox[name='menu6']").each(function() {
				this.disabled = false;
			});	
		} else {
			$("input:checkbox[name='allChk6']").prop("disabled", true);
			$("input:checkbox[name='menu6']").each(function() {
				this.disabled = true;
			});
		}
	});
	
 
	$("#GUARDAR").click(function() {
		fnSaveAuth();
	});
 
	if(G_SAVE_MSG != "") {
		Common.alert("success", G_SAVE_MSG, fnGoUrl);
	}
 
	$("#SALIR").click(function() {
 
		$("#MAIN_FORM").attr("method", "post");
		//$("#MAIN_FORM").attr("action", "/sys/sysMngAuth/getMainList.do");
		$("#MAIN_FORM").attr("action", "/sys/sysMngAuth/authPage.do");
		$("#MAIN_FORM").submit();
	});
 
	$("#allChk1").click(function() {
 
		Common.checkAll("allChk1", "menu1");
	});
 
	$("#allChk2").click(function() {
 
		Common.checkAll("allChk2", "menu2");
	});
 
	$("#allChk3").click(function() {
 
		Common.checkAll("allChk3", "menu3");
	});
 
	$("#allChk4").click(function() {
 
		Common.checkAll("allChk4", "menu4");
	});
 
	$("#allChk5").click(function() {
 
		Common.checkAll("allChk5", "menu5");
	});
 
	$("#allChk6").click(function() {
 
		Common.checkAll("allChk6", "menu6");
	});
	
	
/************고고학 추가 스크립트*************/
	
	
    
	//상위 메인 탑-체크박스 체크시 diabled 처리
	var pihYn = $("input:checkbox[id='PA']").is(":checked");
	if(!pihYn) {
		$("input:checkbox[name='allChk2-01']").prop("disabled", true);
		$("input:checkbox[name='pa_menu2']").each(function() {
			this.disabled = true;
		});
	}
	//전체 체크 박스
	$("#allChk2-01").click(function() {
		Common.checkAll("allChk2-01", "pa_menu2");
	});
	
	$("#PA").click(function() {
		if(this.checked) {
			$("input:checkbox[name='allChk2-01']").prop("disabled", false);
			$("input:checkbox[name='pa_menu2']").each(function() {
				this.disabled = false;
			});	
		} else {
			$("input:checkbox[name='allChk2-01']").prop("disabled", true);
			$("input:checkbox[name='pa_menu2']").each(function() {
				this.disabled = true;
			});
		}
	});
	
});


