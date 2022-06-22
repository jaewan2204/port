
function makeCombo(id, grp_cd, u_code, type, selVal) {

    var data = getCodeData(grp_cd,u_code);
    makeComboWithJson(id,data,type,selVal);
}

function makeComboAsync(id, grp_cd, u_code, type, callback) {

    getCodeDataAsync(grp_cd,u_code,makeComboWithJson(id,data,type,callback));
}

function getCodeData(grp_cd,u_code) {
    var result;
    $.ajax({
        type: "post",
        url: "/common/getCodeList.ajax?GRP_CD="+grp_cd+"&U_CODE="+u_code,
        dataType: "json",
        async :false,
        error: function () {
            alert('Fallo de comunicación!!getCodeData');
        },
        success: function (data) {
            result = data.LIST;
        }
    });
    return result;
}
function getCodeDataAsync(grp_cd,u_code,callback) {
    if(u_code = "") {
        var result;
        $.ajax({
            type: "post",
            url: "/common/getCodeList.ajax?GRP_CD=" + grp_cd + "&U_CODE=" + u_code,
            dataType: "json",
            async: true,
            error: function () {
                alert('Fallo de comunicación!!getCodeDataAsync');
            },
            success: function (data) {
                result = data.LIST;
                callback();
            }
        });
    } else {
        callback();
    }

}
function getDataByUrl(url) {
    var result;
    $.ajax({
        type: "post",
        url: url,
        dataType: "json",
        async :false,
        error: function () {
            alert('Fallo de comunicación!!getDataByUrl');
        },
        success: function (data) {
            result = data.LIST;
        }
    });
    return result;
}

function makeComboWithJson(id,jsonData,type,val,idx) {
    if(type == undefined || (type != 'Entero' && type != 'Seleccione' && type != '')) {
        type = 'Entero';
    }
    if(jsonData == undefined) {
        console.log('No hay datos para completar el cuadro combinado:id='+id+",type="+type+",val="+val);
        return;
    }
    var length = jsonData.length;
    var obj = document.getElementById(id);
    if(obj == undefined) {
        return;
    }
    var options = obj.options;
    options.length = length+1;
    var option;
    option = options[0];
    option.value = '';
    option.text  = type;
    option.selected = true;
    for(var i = 0;i<length;i++) {
        option= obj.options[i+1];
        option.value = jsonData[i].DET_CD;
        option.text  = jsonData[i].CD_NM;
        if(val != undefined && val!='' && jsonData[i].DET_CD == val) {
            option.selected = true;
        }
        if(idx != undefined && idx!='' && i == idx) {
            option.selected = true;
        }
    }
}

function makeComboWithJsonCallback(id,jsonData,type,callback) {
    if(type == undefined || (type != 'Entero' && type != 'Seleccione' && type != '')) {
        type = 'Entero';
    }
    var length = jsonData.length;
    var obj = document.getElementById(id);
    if(obj == undefined) {
        alert('Ningún objeto.:id'+id);
        return;
    }
    var options = obj.options;
    options.length = length+1;
    var option;
    option = options[0];
    option.value = '';
    option.text  = type;
    for(var i = 0;i<length;i++) {
        option= obj.options[i+1];
        option.value = jsonData[i].DET_CD;
        option.text  = jsonData[i].CD_NM;
    }
}
function popUp(src_id){
    $.magnificPopup.open({
        items: {
            src: '#'+src_id
        },
        type: 'inline',
        callbacks: {
            open: function(i) {

                $('#Analyst_list label').on('click', function() {
                    var $parent = $(this).closest('td'),
                        $checkbox = $parent.find('input:checkbox');

                    $checkbox.trigger('click');
                });

                function close_popup() {
                    $('.mfp-close').trigger('click');
                }

                $('#Analyst_list .submit').click(function() {
                    console.log('popup close');
                    close_popup();
                })

                $('#Analyst_list .popup-close').click(function() {
                    console.log('popup close');
                    close_popup();
                });
            }
        }
    });

}

var serializeObject = function (form) {
    var obj = null;
    try {
        var arr = form.serializeArray();
        if (arr) {
            obj = {};
            jQuery.each(arr, function () {
                obj[this.name] = this.value;
            });
            $(':disabled[name]', form).each(function () {
                obj[this.name] = $(this).val();
            });
        }
    } catch (e) {
        alert(e.message);
    } finally {
    }
    return obj;
};

function $id(id) {
    return document.getElementById(id);
}
function $setVal(id,val){
    val = (val != undefined) ? val : "";
    var obj = $id(id);
    obj.value = val;
}

/**
 * The FreeBSD Copyright
 *
 * Copyright 1992-2012 The FreeBSD Project. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this
 * list of conditions and the following disclaimer. Redistributions in binary
 * form must reproduce the above copyright notice, this list of conditions and
 * the following disclaimer in the documentation and/or other materials provided
 * with the distribution. THIS SOFTWARE IS PROVIDED BY THE FREEBSD PROJECT ``AS
 * IS'' AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
 * THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE FREEBSD PROJECT OR CONTRIBUTORS
 * BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 *
 * The views and conclusions contained in the software and documentation are
 * those of the authors and should not be interpreted as representing official
 * policies, either expressed or implied, of the FreeBSD Project.
 *
 * @author kipyung.sung
 */

function Map() {
    var map = {};
    map.value = {};
    map.getKey = function(id) {
        return "k_"+id;
    };
    map.put = function(id, value) {
        var key = map.getKey(id);
        map.value[key] = value;
    };
    map.contains = function(id) {
        var key = map.getKey(id);
        if(map.value[key]) {
            return true;
        } else {
            return false;
        }
    };
    map.get = function(id) {
        var key = map.getKey(id);
        if(map.value[key]) {
            return map.value[key];
        }
        return null;
    };
    map.remove = function(id) {
        var key = map.getKey(id);
        if(map.contains(id)){
            map.value[key] = undefined;
        }
    };

    return map;
}

function jsonListToGridData(listJson) {
    var oneJson;
    var oneGrid;
    var listGrid = [];
    var length = listJson.length;
    var key;
    for(var i=0;i<length;i++) {
        oneJson = listJson[i];
        oneGrid = [];
        listGrid[listGrid.length]=oneGrid;
        for(key in oneJson) {
            oneGrid[key] = oneJson[key];
        }
    }
    return listGrid;
}

function loginCheck(data) {
    var isHave = false;
    for(var key in data) {
        isHave = true;
        break;
    }
    if(isHave == false) {
        alert("Has sido desconectado. Por favor inicie sesión de nuevo.");
        location.href = "/logIn/logInPage.do";
        return false;
    }
    return true;
}

function makePageing(total_count,selectedTab) {
	if(selectedTab == undefined) {
		selectedTab = "";
	}
    var perPage = $("#PAGING_LIMIT"+selectedTab).val();
    var curPage = $("#PAGE_INDEX"+selectedTab).val();	
    var prePage = parseInt(curPage)-1;					
    var nextPage = parseInt(curPage)+1;					

    perPage = parseInt(perPage);
    curPage = parseInt(curPage);
    prePage = parseInt(prePage);
    nextPage = parseInt(nextPage);

    var totalPage = total_count / perPage;				
    var lastPage = Math.ceil(totalPage);				

    if(prePage <= 1) prePage = 1;
    if(nextPage >= lastPage) nextPage = lastPage;

    var pageBlock = 10;
    var curBlock = Math.ceil(curPage/pageBlock);
    var lastBlock = totalPage/pageBlock;
    var sNum = (curBlock-1)*pageBlock+1;
    var eNum = sNum+pageBlock-1;

    var html = ""+
    	"<ul class=\"pagination highlight-color\">\n" +
        "	<li><a href=\"#\" onClick=\"goPage(1,'"+selectedTab+"')\"><i class=\"xi-arrow-left\"></i></a></li>\n" +
        "   <li><a href=\"#\" onClick=\"goPage("+prePage+",'"+selectedTab+"')\"><i class=\"xi-angle-left\"></i></a></li>";

	    for(var i=sNum;i<=eNum;i++) {
	    	if(i>lastPage) break;

	    	if(i==curPage) {
	    		html += "<li class=\"active\"><a href=\"#\">"+i+"</a></li>";
	    	} else {
	    		html += "<li><a href=\"javascript:goPage("+i+",'"+selectedTab+"')\">"+i+"</a></li>";
	    	}
	    }

	    if(total_count == 0) {
	        html += "<li class=\"active\"><a href=\"#\">1</a></li>";
	    }

    html += ""+
    	"	<li><a href=\"javascript:goPage("+nextPage+",'"+selectedTab+"')\"><i class=\"xi-angle-right\"></i></a></li>\n" +
        "   <li><a href=\"javascript:goPage("+lastPage+",'"+selectedTab+"')\"><i class=\"xi-arrow-right\"></i></a></li>\n" +
        "</ul>\n";

    $("#paging"+selectedTab).html(html);
}


function goPage(page, selectedTab) {
	selectAllUnChecked();
	if(selectedTab == undefined) {
		selectedTab = "";
	}
    if(pageUrl == undefined) {
        alert("No hay una variable de URL de búsqueda.pageUrl");
        return;
    }
    //document.getElementById('PAGE_INDEX'+selectedTab).value = page;
    $("#PAGE_INDEX").val(page);
    var form = document.forms["srchFrm"];//$("#srchFrm"+selectedTab);
    //var formObj = serializeObject(form);
    
    //$.post(_CONTEXT_PATH + pageUrl, $("#srchFrm").serialize(), function(result) {
    	//makeList(result);
    //}, "json");
    form.method = "post";
    form.action = _CONTEXT_PATH + pageUrl;
    form.submit();
}


function selectAllUnChecked() {
	$("#selectAll").prop("checked", false);
}


function getUserInDept(value) {
    var jsonData = getDataByUrl("/user/getUserByDeptCd.ajax?DEPT_CD="+value);
    return jsonData;
}
function getUserInDeptM(value, SEQ) {
    var jsonData = getDataByUrl("/user/getUserByDeptCd.ajax?DEPT_CD="+value+"&SEQ="+SEQ);
    return jsonData;
}
function isImg(filename) {
    var is = false;

    var ext;
    var extTemp;
    var idxPoint;
    idxPoint = filename.lastIndexOf(".");
    ext = filename.substr(idxPoint+1);
    for(var j=0,lengthext = imgExt.length;j<lengthext;j++) {
        extTemp = imgExt[j];
        if (ext == extTemp) {
            is = true;
            break;
        }
    }
    return is;
}

function calcWidth(list) {
    var length = list.length;
    var width = pageWidth / length;
    width = parseInt(width);
    var oneRow;
    for(var i=0;i<length;i++) {
        oneRow = list[i];
        calcHeightByHeight(oneRow,width);
    }
}

function calcHeightByHeight(oneRow,width) {
    if(oneRow.REAL_IMG_WIDTH > width) {
        oneRow.IMG_WIDTH    = width;
    } else {
        oneRow.IMG_WIDTH    = oneRow.REAL_IMG_WIDTH;
        width = oneRow.IMG_WIDTH;
    }
    var REAL_IMG_WIDTH  = oneRow.REAL_IMG_WIDTH ;
    var REAL_IMG_HEIGHT = oneRow.REAL_IMG_HEIGHT;
    var height = REAL_IMG_HEIGHT * width / REAL_IMG_WIDTH ;
    height = parseInt(height);
    oneRow.IMG_HEIGHT = height;
}

function removeArr(arr, inx) {
    for(var i=inx,length = arr.length;i<length-1;i++) {
        arr[i]=arr[i+1];
    }
    arr.length = arr.length -1;
}

function addArray(arr,inx,val) {
    arr.length = arr.length+1;
    for(var i=arr.length-1;i>-1;i--) {
        if(i==inx) {
            arr[i] = val;
            break;
        } else {
            arr[i] = arr[i-1];
        }
    }
}
String.prototype.replaceAll = function(org, dest) {
    return this.split(org).join(dest);
}
function tooptipMake(){
    $('.tooltip ').remove();
    $('[data-toggle="tooltip"]').tooltip({
        container: 'body'
    });
}


function inputNumber(event){
	event = event || window.event;
	var keyID = (event.which) ? event.which : event.keyCode;
	if ( (keyID >= 48 && keyID <= 57) || (keyID >= 96 && keyID <= 105) || keyID == 8 || keyID == 46 || keyID == 37 || keyID == 39 || keyID == 9 || keyID == 13 )
		return;
	else
		return false;
}


function removeChar(event) {
	event = event || window.event;
	var keyID = (event.which) ? event.which : event.keyCode;
	if ( keyID == 8 || keyID == 46 || keyID == 37 || keyID == 39 )
		return;
	else
		event.target.value = event.target.value.replace(/[^0-9]/g, "");
}


function removeChar2(event) {
	event = event || window.event;
	var keyID = (event.which) ? event.which : event.keyCode;
	if ( keyID == 8 || keyID == 46 || keyID == 37 || keyID == 39 )
		return;
	else
		event.target.value = event.target.value.replace(/[^a-z0-9]/g, "");
}


function isUndefined(data){
	if(typeof data == "undefined" || data == "" || data == null || data == "undefined"){
		data = "";
    }
	return data;
}

/**
 * Get Cookie
 */
function getCookie(name) {
    var nameOfCookie = name + "=";
    var x = 0;
    while (x <= document.cookie.length) {
        var y = (x+nameOfCookie.length);
        if (document.cookie.substring(x, y)== nameOfCookie) {
            if ((endOfCookie=document.cookie.indexOf(";", y))== -1)
                endOfCookie = document.cookie.length;
            return unescape(document.cookie.substring(y, endOfCookie));
        }
        x = document.cookie.indexOf(" ", x)+ 1;
        if (x == 0)
            break;
    }
    return "";
}


function setCookie(name, value, expiredays) {
    var todayDate = new Date();
    todayDate.setDate(todayDate.getDate()+ expiredays);
    document.cookie = name + "=" + escape(value)+ "; path=/; expires=" + todayDate.toGMTString()+ ";"
}


function clearCookie(name) {
    var expire_date = new Date();

    expire_date.setDate(expire_date.getDate() - 1)
    document.cookie = name + "= " + "; expires=" + expire_date.toGMTString() + "; path=/"
}


function progressbarOpen() {
	var zidx = 0;
	if ($(".modal").length > 0) {
		zidx = Number($(".modal:last").css("z-index"))+10;
	}

	if ($("#modLoading").length <= 0) {
		var zidxTxt = "";
		if (zidx > 0) {
			zidxTxt = "z-index:" + zidx + ";";
		}

		var modalTxt = '<div class="modal fade" id="modLoading" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="width:100%;padding:100px;'+zidxTxt+'">';
		modalTxt += '<div class="modal-dialog" role="document" style="width:400px;">';
		modalTxt += '<div class="modal-content">';
		modalTxt += '<div class="modal-body" style="color:#000;">';
		modalTxt += '<i class="xi-spinner-1"></i>&nbsp;&nbsp;&nbsp;&nbsp;<strong>Loading...</strong>';
		modalTxt += '</div></div></div></div>';

		$("body:first").append(modalTxt);
	} else {
		$("body:first").append($("#modLoading").detach());
		if (zidx > 0) {
			$("#modLoading").css("z-index", zidx);
		}
	}

	$("#modLoading").modal({
        keyboard: false,
        backdrop: false
    });
}


function progressbarClose() {
	$('#modLoading').modal('hide');
}



function fn_confirmLayer(msg, fn_submit, addBtnTxt, fn_addBtnSubmit) {
	if ($("#Alert_confirm").length > 0) {
		$("#Alert_confirm").remove();
	}

	var html =
	'<div id="Alert_confirm" class="box mfp-hide alert-popup">'+
	'	<div class="box-body text-center" style="padding-top:30px;">'+
	//'		<h4>This is Alert sample <small>/ Confirm type</small></h4>'+
	'		<p>'+msg+'</p>'+
	'	</div>'+
	'	<div class="box-footer text-center">'+
	'		<button type="button" class="button button-lg button-dark submit">Submit</button>';

	if (addBtnTxt && addBtnTxt != "") {
		html += '		<button type="button" class="button button-lg button-gray addSubmit">'+addBtnTxt+'</button>';
	}

	html +=
	'		<button type="button" class="button button-lg button-gray popup-close">Cancel</button>'+
	'	</div>'+
	'</div>';
	$("section.contents:eq(0)").append(html);

	$.magnificPopup.open({
		items: {
			src: '#Alert_confirm'
		},
		type: 'inline',
		closeOnBgClick: false,
		enableEscapeKey: true,
		callbacks: {
			open: function() {
				function close_popup() {
					$('.mfp-close').trigger('click');
				}
				$('#Alert_confirm .submit').click(function() {
					fn_submit();
					close_popup();
				});
				$('#Alert_confirm .addSubmit').click(function() {
					fn_addBtnSubmit();
					close_popup();
				});
				$('#Alert_confirm .popup-close').click(function() {
					console.log('popup close');
					close_popup();
				});
			}
		}
	});
}


function textareaBrSet(content){
	content = content.replace(/(\r\n|\n|\n\n)/gi,'<br>');
	content = content.replace(/(\s)/gi,'&nbsp;');
	return content;
}


function setPaddingTopSize(w, h, pw, ph){
    var paddingTop = 0;
    var imgWidth = 0;
    var imgHeight = 0;
    w = isUndefined(w)==""?0:Number(w);
    h = isUndefined(h)==""?0:Number(h);

    if (w > 0 && h > 0) {
    	if (w > pw){
    		imgWidth = pw;
            imgHeight = h * pw / w;
    	} else {
    		imgWidth = w;
    		imgHeight = h;
    	}
    	if (imgHeight > ph){
    		imgWidth = w * ph / h;
            imgHeight = ph;
    	}
        if (imgHeight < ph) {
            paddingTop = Math.floor((ph-imgHeight)/2);
            paddingTop = paddingTop < 0 ? 0 : paddingTop;
        }
    }
    return paddingTop;
}


function setImgPaddingTop(imgObj, w, h, pw, ph){
    var dd = setPaddingTopSize(w, h, pw, ph);
    if (dd > 0) {
        imgObj.parent().css({lineHeight:0, paddingTop:dd+"px"});
    }
}


function setImgPaddingTopArea(obj, w, h, pw, ph){
	$.each(obj.find("img"), function(idx, ref){
		setImgPaddingTop($(ref), w, h, pw, ph);
	});
}

//Escape & Unescape HTML:
(function() {
    var escapeEl = document.createElement('textarea');

    window.escapeHTML = function(html) {
        escapeEl.textContent = html;
        return escapeEl.innerHTML;
    };

    window.unescapeHTML = function(html) {
        escapeEl.innerHTML = html;
        return escapeEl.textContent;
    };
})();


function fn_unescapeHTML(){
	$.each($("textarea, input:text"), function(idx, ref){
		$(ref).val(window.unescapeHTML($(ref).val()));
	});
}


function getBrowserType(){
	var _ua = navigator.userAgent;


	var trident = _ua.match(/Trident\/(\d.\d)/i);
	if( trident != null ){
        if( trident[1] == "7.0" || trident[1] == "6.0" || trident[1] == "5.0" || trident[1] == "4.0") return 'IE';
	}

	if( navigator.appName == 'Microsoft Internet Explorer' ) return 'IE';


	var agt = _ua.toLowerCase();
	if (agt.indexOf("chrome") != -1) return 'Chrome';
	if (agt.indexOf("opera") != -1) return 'Opera';
	if (agt.indexOf("staroffice") != -1) return 'Star Office';
	if (agt.indexOf("webtv") != -1) return 'WebTV';
	if (agt.indexOf("beonex") != -1) return 'Beonex';
	if (agt.indexOf("chimera") != -1) return 'Chimera';
	if (agt.indexOf("netpositive") != -1) return 'NetPositive';
	if (agt.indexOf("phoenix") != -1) return 'Phoenix';
	if (agt.indexOf("firefox") != -1) return 'Firefox';
	if (agt.indexOf("safari") != -1) return 'Safari';
	if (agt.indexOf("skipstone") != -1) return 'SkipStone';
	if (agt.indexOf("netscape") != -1) return 'Netscape';
	if (agt.indexOf("mozilla/5.0") != -1) return 'Mozilla';
}

function Installed(){
    try {
        return (new ActiveXObject("IEPageSetupX.IEPageSetup"));
    } catch (e) { return false; }
}


function fn_printPreview($active_target){
	var frameDoc;
	var ieCheck = false;

	if (getBrowserType() == 'IE'){
		ieCheck = true;
		frameDoc = window.open("", "printWin", "fullscreen=yes");
	} else {
		var $iframe = $("<iframe />");
		$iframe[0].name = "$iframe";
		$iframe.css({position:'absolute', top:'-1000000px'});
		$('body').append($iframe);
		frameDoc = $iframe[0].contentWindow ? $iframe[0].contentWindow : $iframe[0].contentDocument.document ? $iframe[0].contentDocument.document : $iframe[0].contentDocument;
		frameDoc.document.open();
	}

	var COLLCT_NO = "CCMS_" + $('.data-tabs_1-COLLCT_NO', $active_target).eq(0).text() + " " + $.trim($('.article_title', $active_target).eq(0).text());
    frameDoc.document.write('<html><head><title>CCMS :: Conservation Card Management System</title>');
	//frameDoc.document.write('<html><head><title>' + COLLCT_NO + '</title>');
    frameDoc.document.write('<link href="../css/layouts_print_style.css" rel="stylesheet">');
    frameDoc.document.write('<link href="../plugins/bootstrap-3.3.7/css/bootstrap.css" rel="stylesheet" media="print">');
    frameDoc.document.write('</head><body>');
    frameDoc.document.write('<div class="page">');
    frameDoc.document.write($active_target);
    frameDoc.document.write('</div>');
    frameDoc.document.write('</body></html>');
/*
    if (ieCheck == false) {
    	frameDoc.document.close();
    }
*/
    setTimeout(function () {
    	if (ieCheck == true) {
	    	frameDoc.focus();
	    	frameDoc.document.IEPageSetupX.Orientation=1;
	    	frameDoc.document.IEPageSetupX.header=''; 
	    	frameDoc.document.IEPageSetupX.footer='&b &p / &P';
	    	frameDoc.document.IEPageSetupX.leftMargin=10; 
	    	frameDoc.document.IEPageSetupX.rightMargin=10; 
	    	frameDoc.document.IEPageSetupX.topMargin=15;  
	    	frameDoc.document.IEPageSetupX.bottomMargin=15; 
	    	frameDoc.document.IEPageSetupX.PrintBackground=true;
	    	frameDoc.document.IEPageSetupX.PaperSize = 'A4'    
	    	frameDoc.document.IEPageSetupX.Preview();
	    	frameDoc.close();
    	} else {
    		window.frames['$iframe'].print();
    		$iframe.remove();
    	}
    	
    	document.title = "CCMS :: Conservation Card Management System";
    }, 500);
}

function getUUID() {
    function s4() {
        return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
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