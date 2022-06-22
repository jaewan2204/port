
 
function comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}

 
function uncomma(str) {
    str = String(str);
    return str.replace(/[^\d]+/g, '');
}
function OpenNewWindow(url) {
    return window.open(url);
}

function ToInt(strNum)
{
    if (strNum == "") return 0;

    strNum = uncomma(strNum);
    //return parseInt(strNum);

    var num = Number(strNum);
    return num
}

function MultiSelect(category,val,target,selectedVal,defaultVal,filterCode, param1, param2, param3, param4, param5, param6, param7){
	var url = "";

	var defaultOpt = "";
	switch(defaultVal){
		case "1":
			defaultOpt = "-- Todas --";
			break;	
		case "2":
			defaultOpt = "== Todas ==";
			break;
		case "3":
			defaultOpt = "== Seleccione ==";
			break;
		case "4":
			defaultOpt = "";
			break;
		case "5":
			defaultOpt = "--Selection--";
			break;
		default :
			defaultOpt ="-- Seleccione --";
	}
	
	switch(category){
 
		case "code":
			url = "/code/CodeDetailDropDown.do";
			break;
 
		case "codeFilter":
			url = "/code/CodeDetailFilterDropDown.do";
			break;
 
		case "companyCodeFilter":
			url = "/company/code/CodeDetailFilterDropDown.do";
			break;
 
		case "product_cat":
			url="/product/category/selectProductCategory.do";
			break;
 
		case "product_detail_cat":
			url="/product/category/selectProductDetailCategory.do";
			break;
		case "product_cat_main":
			url="/product/selectProductCategory.do";
			break;
		defalut :
			url ="";
	}
	if(url !=""){
		$.ajax({
			   type: "POST",
			   url: url,
			   async: false,
			   data: "param1=" + val + "&param2=" + selectedVal + "&param3=" + defaultOpt + "&param4=" + filterCode + "&param5=" + param5 + "&param6=" + param6 + "&param7=" + param1 + "&param8=" + param2 + "&param9=" + param7,
			   success: function(data){
					$("#"+target).empty();
					$("#"+target).html(data);
			   }
		});	
	}
}

 

function MultiCheck(category,val,target,selectedVal,defaultVal,filterCode, param1, param2, param3, param4, param5, param6, inputName){
	var url = "";

	var defaultOpt = "";
	
	switch(category){
 
		case "code":
			url = "/code/CodeDetailCheck.do";
			break;	
 
		case "companycode":
			url = "/company/code/CodeDetailCheck.do";
			break;		
		defalut :
			url ="";
	}
	if(url !=""){
		$.ajax({
			   type: "POST",
			   url: url,
			   async: false,
			   data: "param1=" + val + "&param2=" + selectedVal + "&param3=" + defaultOpt + "&param4=" + filterCode + "&param5=" + param5 + "&param6=" + param6 + "&param7=" + param1 + "&param8=" + param2+"&param9="+inputName,
			   success: function(data){
					$("#"+target).empty();
					$("#"+target).html(data);
			   }
		});	
	}
}



 
function select_ajax(target,code_type)
{
	$.ajax({   
		type: "POST",  
		url: "/Test/TestXml.do",   
		data: "code_type="+code_type,  
		success: function(xml){
			$("#"+target).empty();
			$("#"+target).append("<option value=''>-- Todas --</option>");
			if($(xml).find("selectcontrol").find("item").length > 0) {		
			    $(xml).find("selectcontrol").find("item").each(function() {
					var value = $(this).find("value").text();   
					var name = $(this).find("name").text();   
					$("#"+target).append("<option value='"+value+"'>"+name+"</option>");
				});
			}
		}
	});	
}	

 
function maxlengthLimit(str, maxByte) {

  var strCount = 0;

  var tempStr, writeLimit;

  writeLimit = "";
 

  for (var i = 0; i < str.value.length; i++) { 
      tempStr = str.value.charAt(i);



      if (escape(tempStr).length > 4) {  

          strCount += 2;

      }

      else {  

          strCount += 1;

      }



      if (strCount <= maxByte) { 

          writeLimit += tempStr;

      }

  }

 

  if (strCount > maxByte) {

      alert("Has excedido el texto que puedes ingresar.\nNo más entrada es posible.");

      strCount = 0;



      for (var i = 0; i < str.value.length; i++) {  

          tempStr = str.value.charAt(i);

          if (escape(tempStr).length > 4) {  

              strCount += 2;

          }

          else {  

              strCount += 1;

          }

          if (strCount > maxByte) {  

              if (escape(tempStr).length > 4) { 

                  strCount -= 2;

              }

              else { 

                  strCount -= 1;

              }

              break;

          } 

          str.value = writeLimit;

      }

  }

}

 
function Popup_Window(url, wName, ww, wh, x, y, isScrollbar) {
    var oPop;
    if (isScrollbar == "") isScrollbar = 'no';

    oPop = window.open(url, wName, "left=" + y + ",top=" + x + ",width=" + ww + ",height=" + wh + ",toolbar=no,menubar=no,status=no,scrollbars=" + isScrollbar + ",resizable=no");
    if (oPop == null) {
        alert("Deshabilita el bloqueador de ventanas emergentes.");
        return null;
    } else {
        return oPop;
    }
}
 
function Popup_WindowNoScroll(url, wName, ww, wh) {
    var oPop;
    isScrollbar = 'no';

    oPop = window.open(url, wName, "width=" + ww + ",height=" + wh + ",toolbar=no,menubar=no,status=no,scrollbars=" + isScrollbar + ",resizable=no");
    if (oPop == null) {
        alert("Deshabilita el bloqueador de ventanas emergentes.");
        return null;
    } else {
        return oPop;
    }
}

 
function Popup_CenterWindow(url, wName, ww, wh,isScrollbar) {
	var oPop;
	var sw = screen.availWidth;
	var sh = screen.availHeight;
	if(isScrollbar == "") isScrollbar = 'no';
	sw = (sw - ww) / 2;
	sh = (sh - wh) / 2;
	
	oPop =  window.open(url, wName, "left=" + sw + ",top=" + sh + ",width=" + ww + ",height=" + wh + ",toolbar=no,menubar=no,status=no,scrollbars="+isScrollbar+",resizable=no");
	if(oPop == null) {
		alert("Deshabilita el bloqueador de ventanas emergentes.");
		return null;
	} else {
		return oPop;
	}
}

function Popup_SearchExecuteOrg() {
    Popup_CenterWindow("/popup/SearchExecuteOrg.aspx", "SearchExecuteOrg", 1000, 800, 0);
}
function Popup_SearchBudget(id) {
    Popup_CenterWindow("/popup/SearchBudget.aspx?seq=" + id, "SearchBudget", 1000, 800, 0);
}
function Popup_SearchDisapproval(id) {
    Popup_CenterWindow("/popup/SearchDisapproval.aspx", "Popup_SearchDisapproval", 1050, 800, 0);
}


 
function Popup_CenterWindowScroll(url, wName, ww, wh) {
	var oPop;
	var sw = screen.availWidth;
	var sh = screen.availHeight;

	sw = (sw - ww) / 2;
	sh = (sh - wh) / 2;
	
	oPop =  window.open(url, wName, "left=" + sw + ",top=" + sh + ",width=" + ww + ",height=" + wh + ",toolbar=no,menubar=no,status=no,scrollbars=yes,resizable=no");
	if(oPop == null) {
		alert("Deshabilita el bloqueador de ventanas emergentes.");
		return null;
	} else {
		return oPop;
	}
}

 
Number.prototype.formatComma = function(){
	if(this==0) return 0;

    var reg = /(^[+-]?\d+)(\d{3})/;
    var n = (this + '');
 
    while (reg.test(n)) n = n.replace(reg, '$1' + ',' + '$2');
 
    return n;
};
 
 
String.prototype.formatComma = function(){
	var str = this.replace(/,/g,"");
    var num = parseFloat(str);
    if( isNaN(num) ) return "";
 
    return num.formatComma();
};

 
String.prototype.removeComma = function(){
	var str = this.replace(/,/g,"");
    return str;
};

function setDatePicker(targetID)
{
	//$(".datePicker").datepicker({ 
	$("#"+targetID).datepicker({ 		
	    dateFormat: 'yy-mm-dd',
	    monthNamesShort: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Setiembre','Octubre','Noviembre','Diciembre'],
	    dayNamesMin: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
	    weekHeader: 'Wk',
	    changeMonth: true,  
	    changeYear: true,  
	    yearRange:'1910:+10',  
	    showMonthAfterYear: true,  
	    buttonImageOnly: false,  
	    buttonText: 'Por favor seleccione una fecha', 
	    autoSize: false,  
	    buttonImage: '',
	    showOn: "focus" 
	 });
};

 
function isSumValue(obj,target,ty,targetTy,dan){
	
	var measure = "";
	var tmpVal = obj.split(',');
	var totalValue = 0;
	var vl = "";
	switch(dan){

	case "0" : 
		measure ="";
		break;
	case "1" : 
		measure ="won";
		break;
	case "2" : 
		measure ="thound won";
		break;
	
	default : 
		measure ="";
}

	
	for(var i=0;i<tmpVal.length;i++)
	{		
		if(ty == "1"){
			 vl = $("#"+tmpVal[i]).val().removeComma();
		}else{
			 vl = $("#"+tmpVal[i]).text().removeComma();
		}
		
		if(vl == "" || vl == "undefined"){
			totalValue=parseInt(totalValue);
		}else{
			totalValue=parseInt(totalValue) + parseInt(vl);
			
		}
		
	}
	totalValue = totalValue.formatComma();
	if(targetTy =="1"){
		$("#"+target).val(totalValue+measure);
	}else{
		$("#"+target).text(totalValue+measure);
	}
}

 
function isNumber(obj, maxNum) {
	var num = obj.value;
	for(inx = 0; inx<num.length; inx++) {
 	if(num.charAt(inx) < '0' || num.charAt(inx) > '9') {
         alert("Por favor ingrese solo los números.");
         obj.value = "";
         obj.focus();
     	return;	
 	}
	}
	
	if(maxNum){
		if(num > maxNum){
	        alert("Valor de entrada máximo excedido. Por favor ingréselo nuevamente.");
	        obj.value = "";
	        obj.focus();
	     	return;	
		}
	}
}
 
function isCommonTime(value)
{
	time_check = true;
	time_s=value.replace(/[^\d/]/gi,"");

	if(time_s.length < 8)
	{
		time_check = false;
	}

	time_s_one = time_s.substring(0,4);
	time_s_two = time_s.substring(4,8);

	if(time_s_one > time_s_two){
		time_check = false;
	}

	var pattern = /(0[0-9]{1}|1[0-9]{1}|2[0-3]{1})([0-5]{1}[0-9]{1})/;
	if(!pattern.test(time_s_one)){
		time_check = false;
	}
	if(!pattern.test(time_s_two)){
		time_check = false;
	}

	if(!time_check)
	{
		alert("Por favor, introduzca una hora válida\nPor favor ingrese 00:00 ~ 23:59");
	}
	return time_check;
}
 
function isCommonDate(obj)
{
	date_check = true;
	obj=obj.replace(/[^\d/]/gi,"");

	if(obj.length < 8)
	{
		date_check = false;
	}

	var pattern = /(19[0-9]{2}|20[0-9]{2})(0[1-9]{1}|1[0-2]{1})(0[1-9]{1}|[1-2]{1}[0-9]{1}|3[0-1]{1})/

	if(!pattern.test(obj)){
		date_check = false;
	}

	if(!date_check)
	{
		alert("Por favor ingrese el año correctamente");
	}
	return date_check;
}

 
function chkTime(name){
	var rtnValue = true;
	
	if($("input[name=" + name + "]").val().length > 3){
		var data1 = $("input[name=" + name + "]").val().substr(0,2);
		var data2 = $("input[name=" + name + "]").val().substr(3,2);

		if(data1.length > 0 && data1 != ''){
			var hour = data1;
 
			if($.isNumeric(hour)){
 
				if(parseInt(hour) > 24 || parseInt(hour) < 0){
					alert("El tiempo no puede exceder las 24 horas.");
					$("input[name=" + name + "]").focus();
					rtnValue = false;
				}
			}
		}
		
		if(data2.length > 1 && data2 != '' && rtnValue){
			var min = data2;
 
			if($.isNumeric(min)){
  
				if(parseInt(min) > 60 || parseInt(min) < 0){
					alert("Los minutos no pueden exceder los 60 minutos.");
					$("input[name=" + name + "]").focus();
					rtnValue = false;
				}
 
				else if(data1 == "24" &&  parseInt(min) > 0){
					alert("Un día no puede exceder las 24 horas.");
					$("input[name=" + name + "]").focus();
					rtnValue = false;
				}
			}
		}
	}
	else{
		alert("Por favor verifique la hora.");
 
		$("input[name=" + name + "]").focus();
		rtnValue = false;
	}

	return rtnValue;
}

 
function chkTime2(id){
	var rtnValue = true;
	var data = $("#" + id).val().split("~");
	var data1 = data[0].split(':');
	var data2 = data[1].split(':');
	
	if(data1[0].length > 0 && data1[0] != ''){
		var hour = data1[0];
 
		if($.isNumeric(hour)){
 
			if(parseInt(hour) > 24 || parseInt(hour) < 0){
				alert("El tiempo no puede exceder las 24 horas.");
				$("#" + id).focus();
				rtnValue = false;
			}
		}
	}
	
	if(data1[1].length > 1 && data1[1] != '' && rtnValue){
		var min = data1[1];
 
		if($.isNumeric(min)){
  
			if(parseInt(min) > 60 || parseInt(min) < 0){
				alert("Los minutos no pueden exceder los 60 minutos.");
				$("#" + id).focus();
				rtnValue = false;
			}
 
			else if(data1[0] == "24" &&  parseInt(min) > 0){
				alert("Un día no puede exceder las 24 horas.");
				$("#" + id).focus();
				rtnValue = false;
			}
		}
	}
	
	if(data2[0].length > 0 && data2[0] != '' && rtnValue){
		var hour = data2[0];
 
		if($.isNumeric(hour)){
 
			if(parseInt(hour) > 24 || parseInt(hour) < 0){
				alert("Un día no puede exceder las 24 horas.");
				$("#" + id).focus();
				rtnValue = false;
			}
		}
	}
	
	if(data2[1].length > 1 && data2[1] != '' && rtnValue){
		var min = data2[1];
 
		if($.isNumeric(min)){
   
			if(parseInt(min) > 60 || parseInt(min) < 0){
				alert("Los minutos no pueden exceder los 60 minutos.");
				$("#" + id).focus();
				rtnValue = false;
			}
 
			else if(data2[0] == "24" &&  parseInt(min) > 0){
				alert("Un día no puede exceder las 24 horas.");
				$("#" + id).focus();
				rtnValue = false;
			}
		}
	}

	return rtnValue;
}

 
function isDisabled(id, isDisable){
	if(isDisable){
		$("#" + id).find("input").attr("disabled","disabled");
		$("#" + id).find("select").attr("disabled","disabled");
	}
	else{
		$("#" + id).find("input").removeAttr("disabled");
		$("#" + id).find("select").removeAttr("disabled");
	}
} 
$(document).ready(function () {


    $('input[name=check_idx]').click(function () {
        if ($(this).attr('checked')) {
            $(this).closest('tr').addClass('checked');
        } else {
            $(this).closest('tr').removeClass('checked');
        };
    });
     
});
 
 
function isDateFormat(d) {
 var df = /[0-9]{4}-[0-9]{2}-[0-9]{2}/;
 return d.match(df);
}

 
function isLeaf(year) {
 var leaf = false;

 if(year % 4 == 0) {
 leaf = true;

 if(year % 100 == 0) {
 leaf = false;
 }

 if(year % 400 == 0) {
 leaf = true;
 }
 }

 return leaf;
}

 
function isValidDate(d) {
 
	if(!isDateFormat(d)) {
		return false;
	 }
	
	 var month_day = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	
	 var dateToken = d.split('-');
	 var year = Number(dateToken[0]);
	 var month = Number(dateToken[1]);
	 var day = Number(dateToken[2]);
	
	 
	 if(day == 0) {
		 return false;
	 }
	
	 var isValid = false;
	
	 
	if(isLeaf(year)) {
		if(month == 2) {
			if(day <= month_day[month-1] + 1) {
				isValid = true;
			}
		} else {
			if(day <= month_day[month-1]) {
				isValid = true;
			}
		}
	 } else {
		 if(day <= month_day[month-1]) {
			 isValid = true;
		 }
	 }
	
	 return isValid;
}
 
function imgResize(Maxsize, id)   
{ 
 
	maxsize = Maxsize; 
	var content = document.getElementById(id); 
	var img = content.getElementsByTagName("img"); 
	if(img!=null) {
		for(var i=0; i<img.length; i++) { 
			if ( eval('img[' + i + '].width > maxsize') ) { 
				var heightSize = ( eval('img[' + i + '].height')*maxsize )/eval('img[' + i + '].width') ; 
				eval('img[' + i + '].width = maxsize') ; 
				eval('img[' + i + '].height = heightSize') ; 
			} 
		} 
 	}
} 
 
function editImgResize(Maxsize, id)   
{ 
 	$('#'+id+' img').each(function(){
		$(this).css('width', Maxsize +'px');
	});
}

 
function list_page(pageNo, action){
	var frm = document.viyafm;
	frm.pageIndex.value=pageNo;
	frm.action = action;
	frm.submit();
}
 
function setDefaultText(obj){
 
	var str = $(obj).attr("default");
	if($(obj).val() == ""){
		$(obj).val(str);
	}else{
		if($(obj).val() == str){
			$(obj).val("");
		}
	}
	
}


 
function allChcek(obj,all_obj) {
	if($("input[name='"+all_obj+"']").attr("checked")) {
		$("input[name='"+obj+"']").attr("checked", true);
	}else {
		$("input[name='"+obj+"']").attr("checked", false);
	}
}


function onlyNumeric(str_value){
	return str_value.replace(/[^0-9]/gi, ""); 
}

 
function checkLogin(){
	if(confirm("Se requiere iniciar sesión ¿Quieres iniciar sesión?")){
		location.href="/login.do";
	}else{
		return;
	}
}

 
function numFormatComma(str){
	var reg = /(^[+-]?\d+)(\d{3})/;
    var n = (str + '');
 
    while (reg.test(n)) n = n.replace(reg, '$1' + ',' + '$2');
    return n;
}


 
function changeTextDate (startDateField, endDateField, value) {
	var date = new Date();
	
	var sdate = "";
	var edate = "";
	
 	switch(value){
		case "1":
 
			sdate = toStringYYYYMMDD(date, "-");
			edate = toStringYYYYMMDD(date, "-");
			
			break;
		case "2":
 
			sdate = getCalculatedDate(0, 0, -7, "-");
			edate = toStringYYYYMMDD(date, "-");
			
			break;
		case "3":
 
			sdate = getCalculatedDate(0, 0, -15, "-");
			edate = toStringYYYYMMDD(date, "-");
			
			break;
		case "4":
 
			sdate = getCalculatedDate(0, -1, 0, "-");
			edate = toStringYYYYMMDD(date, "-");
			
			break;
		case "5":
 
			sdate = getCalculatedDate(0, -2, 0, "-");
			edate = toStringYYYYMMDD(date, "-");
			
			break;
		case "6":
 
			sdate = getCalculatedDate(0, -3, 0, "-");
			edate = toStringYYYYMMDD(date, "-");
			
			break;

		case "7":
 
			sdate = getCalculatedDate(0, -6, 0, "-");
			edate = toStringYYYYMMDD(date, "-");
			
			break;
		default:
 
			break;
	}
 	
 	$("#"+startDateField).val(sdate);
 	$("#"+endDateField).val(edate);
}

 
function toStringYYYYMMDD(date, delim) {
	if (delim == undefined) {
		delim = "";
	}

	var year = date.getFullYear().toString();

	var month = date.getMonth() + 1;
	month = (month < 10 ? "0" : "") + month;

	var day = date.getDate();
	day = (day < 10 ? "0" : "") + day;

	return year + delim + month + delim + day;
}



$(function () {

    try
    {

        $(".datepicker").datepicker({
            dateFormat: 'yy-mm-dd',
            monthNamesShort: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Setiembre','Octubre','Noviembre','Diciembre'],
            dayNamesMin: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
            weekHeader: 'Wk',
            changeMonth: true,  
            changeYear: true,  
            yearRange: '1910:+10',  
            showMonthAfterYear: true,  
            buttonImageOnly: false,  
            buttonText: 'Por favor seleccione una fecha',
            autoSize: false,  
            buttonImage: '',
            showOn: "focus"  
        });


        $(".datepicker").mask("9999-99-99", { placeholder: "yyyy-mm-dd" });

        $(".monthpicker").datepicker({
            dateFormat: 'yy-mm',
            monthNamesShort: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Setiembre','Octubre','Noviembre','Diciembre'],
            dayNamesMin: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
            weekHeader: 'Wk',
            changeMonth: true,  
            changeYear: true, 
            yearRange: '1910:+10',  
            showMonthAfterYear: true,  
            buttonImageOnly: false, 
            buttonText: 'Por favor seleccione una fecha',
            autoSize: false,  
            buttonImage: '',
            showOn: "focus"  
        });

        $(".monthpicker").mask("9999-99", { placeholder: "yyyy-mm" }); 

        $(".int").css('text-align', 'right');
        $(".number").css('text-align', 'right');
    
        $(".int").each(function () {
            $(this).val(comma($(this).val()));
        });
        $(".number").each(function () {
            $(this).val(comma($(this).val()));
        });
        $(".comma").each(function () {
            $(this).val(comma($(this).val()));
        });

        $(".comma").prop('maxLength', 15);
        $(".number").prop('maxLength', 15);
        $(".int").prop('maxLength', 15);

        $(".int").maskMoney({
            prefix: '', // The symbol to be displayed before the value entered by the user
            allowZero: false, // Prevent users from inputing zero
            allowNegative: true, // Prevent users from inputing negative values
            defaultZero: false, // when the user enters the field, it sets a default mask using zero
            thousands: ',', // The thousands separator
            decimal: '.', // The decimal separator
            precision: 0, // How many decimal places are allowed
            affixesStay: false, // set if the symbol will stay in the field after the user exits the field. 
            symbolPosition: 'left' // use this setting to position the symbol at the left or right side of the value. default 'left'
        }); //
        $(".number").maskMoney({
            prefix: '', // The symbol to be displayed before the value entered by the user
            allowZero: false, // Prevent users from inputing zero
            allowNegative: true, // Prevent users from inputing negative values
            defaultZero: false, // when the user enters the field, it sets a default mask using zero
            thousands: ',', // The thousands separator
            decimal: '.', // The decimal separator
            precision: 0, // How many decimal places are allowed
            affixesStay: false, // set if the symbol will stay in the field after the user exits the field. 
            symbolPosition: 'left' // use this setting to position the symbol at the left or right side of the value. default 'left'
        }); //
        $(".minusday").maskMoney({
            prefix: '', // The symbol to be displayed before the value entered by the user
            allowZero: false, // Prevent users from inputing zero
            allowNegative: true, // Prevent users from inputing negative values
            defaultZero: false, // when the user enters the field, it sets a default mask using zero
            thousands: '', // The thousands separator
            decimal: '', // The decimal separator
            precision: 0, // How many decimal places are allowed
            affixesStay: false, // set if the symbol will stay in the field after the user exits the field. 
            symbolPosition: 'left' // use this setting to position the symbol at the left or right side of the value. default 'left'
        }); //
        $(".plusday").maskMoney({
            prefix: '', // The symbol to be displayed before the value entered by the user
            allowZero: false, // Prevent users from inputing zero
            allowNegative: false, // Prevent users from inputing negative values
            defaultZero: false, // when the user enters the field, it sets a default mask using zero
            thousands: '', // The thousands separator
            decimal: '', // The decimal separator
            precision: 0, // How many decimal places are allowed
            affixesStay: false, // set if the symbol will stay in the field after the user exits the field. 
            symbolPosition: 'left' // use this setting to position the symbol at the left or right side of the value. default 'left'
        }); //

        document.title = $(".top:first h2").text();

        // Catch the keydown for the entire document
        $(document).keydown(function(e) {

            if ($("#btnSearch").length == 1 )
            {
                if (e.which === 13 ) 
				{ 
					// [Enter] key
                    $("#btnSearch").click();
                }
                return;
            }

            // Set self as the current item in focus
            var self = $(':focus'),
                // Set the form by the current item in focus
                form = self.parents('form:eq(0)'),
                focusable;

            // Array of Indexable/Tab-able items
            focusable = form.find('input,select,textarea').filter(':visible').filter(':not([readonly])');
            var focusable_count = focusable.length;
            function enterKey(){
                if (e.which === 13 && !self.is('textarea')) { // [Enter] key

                    var _tindex = self.prop("tabindex");
                    if (parseInt(_tindex) == 0) {
                        // If not a regular hyperlink/button/textarea
                        if ($.inArray(self, focusable) && (!self.is('a')) && (!self.is('button'))) {
                            // Then prevent the default [Enter] key behaviour from submitting the form
                            e.preventDefault();
                        } // Otherwise follow the link/button as by design, or put new line in textarea

                        if (focusable.index(self) == focusable_count - 1) {
                            focusable.eq(0).focus();
                        }
                        else {
                            // Focus on the next item (either previous or next depending on shift)
                            focusable.eq(focusable.index(self) + (e.shiftKey ? -1 : 1)).focus();
                        }
                    }
                    else {
                        var ntabindex = parseInt(_tindex) + 1;
                        var bFound = $("[tabindex=" + ntabindex + "]").length;

                        if (bFound >0) $("[tabindex=" + ntabindex + "]").focus();
                        else {
                            bFound = $("[tabindex=1]").length;
                            if (bFound == 1) $("[tabindex=1]").focus();
                            else focusable.eq(0).focus();
                        }
                    }
                    return false;
                }
            }
            // We need to capture the [Shift] key and check the [Enter] key either way.
            if (e.shiftKey) { enterKey() } else { enterKey() }
        });
    }
    catch (e) {

    }
});


 
function fnAllCheck(check) {
    $(".check_idx").prop("checked", check);
}




/*
 *  Cross Site Request Forgery (CSRF)
 *  protected CSRF for ajax Jquery
 */
(function($) {
    var token = $('meta[name="_csrf"]').attr('content');
    var header = $('meta[name="_csrf_header"]').attr('content');
    var paramName = $("meta[name='_csrf_parameter']").attr("content");

    $.ajaxSetup({
        beforeSend: function(xhr) {
            if (token && header) {
                xhr.setRequestHeader(header, token);
                xhr.setRequestHeader('AJAX', true);
            }
        },
        statusCode: {
            403: function() {
                alert("sorry! session or csrf token invalid ...");
                location.reload();
            }
        }
    });
    
    var fnJquerySubmit = $.fn.submit;
    $.fn.submit = function(){
 
    	if($(this).find('[name="' + paramName + '"]').length == 0){
    		$('<input type="hidden">').attr('name', paramName).val(token).appendTo(this);	
    	}
    	fnJquerySubmit.apply(this, arguments);
    }
})(jQuery);