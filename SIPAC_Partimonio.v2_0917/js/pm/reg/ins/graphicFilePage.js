function sickReset(){
    $('.imgSliderViewSlide').slick({
    	infinite:false,
        slidesToShow:1,
        slidesToScroll:1,
        speed:200,
        fade:true,
        asNavFor: '.imgSliderNavSlide',
        prevArrow:$('.imgSlider_view_arrow_l'),
        nextArrow:$('.imgSlider_view_arrow_r'),
        draggable:false, 
        accessibility:false 
    });
    $('.imgSliderNavSlide').slick({
    	infinite:false,
        slidesToShow:4,
        slidesToScroll:1,
        speed:200,
        centerMode:false,
        focusOnSelect:true,
        arrows:true,
        prevArrow:$('.imgSliderNav-prev-btn'),
        nextArrow:$('.imgSliderNav-next-btn'),
        asNavFor:'.imgSliderViewSlide',
        draggable:false, 
        accessibility:false 
    });
}

function fnSingleUploadCallback(arrayNew) {
    Upload.singlePopClose();
    if($('#uploadType').val() == 'file') {
 
        var archTitle = 'Archivo virtual';                   
        var archOrgNm = arrayNew[0].originalName;            
        var archChgNm = arrayNew[0].uploadName;              
        var fileSize = arrayNew[0].size;                     
        var archPath = arrayNew.filePath;                   
        var mvbGenSeq = $('#mvbGenSeq').val();
        //var _html = $('#virtualBody').html();
        var _html = '';

        var url = '/pm/pmRegInsFicha/regHipMvbArch.ajax';
        var jsonData = {
            'mvbGenSeq': mvbGenSeq,
            'archTpCd': 'PMB015008',
            'archTitle': archTitle,
            'archOrgNm': archOrgNm,
            'archChgNm': archChgNm,
            'fileSize': fileSize,
            'archPath': archPath
        }
        Ajax.request(url, jsonData, function (data) {
            if (data.MSG == 'success') {
            	$('#tr_none2').remove();
            	
            	if(data.resultSeq > 0){
            		_html += '<tr>';
                    _html += '<td name="virtualIndex"></td>';
                    _html += '<td><a href="javascript:void(0);" class="btn_link fileDownload" data-org-name="' + archOrgNm + '" data-chg-name="' + archChgNm + '" data-file-path="' + archPath + '" data-file-size="' + fileSize + '" data-arch-seq="' + data.resultSeq + '">' + archOrgNm + '</a></td>';
                    _html += '<td>' + Common.toFileSizeString(fileSize) + '</td>';
                    _html += '<td>';
                    _html += '<div class="dt-list-control">';
                    _html += '<span><i class="xi-trash virtualDelete" data-arch-seq="' + data.resultSeq + '" data-arch-tp-cd="PMB015008"></i></span>';
                    _html += '</div>';
                    _html += '</td>';
                    _html += '</tr>';
                    
                    var virtualCount = $('#virtualBody tr').length;
                    if(virtualCount == 0){
                    	$('#virtualBody').html(_html);
                    }else{
                    	$('#virtualBody').append(_html);
                    }
                    
                    $('[name=virtualIndex]').each(function (i, v) {
                        v.textContent = i + 1;
                    });
            	} else {
            		_html += "<tr id='tr_none2'><td colspan=\"5\"><div class='dataNone'><i>" + infoNoDataMsg + "</i></div></td></tr>"; 
            		$('#virtualBody').html(_html);
            	}
                
            }
        }, '');
    }else if($('#uploadType').val() == 'img'){
 
        var imgTpCd = $('#imgTpCd').val();                
        var imgOrgNm = arrayNew[0].originalName;          
        var imgChgNm = arrayNew[0].uploadName;            
        var imgPath = arrayNew.filePath;                 
        var fileSize = arrayNew[0].size;                  
        var thub1Path = arrayNew.thumbPath1;              
        var thub2Path = arrayNew.thumbPath2;              
        var refCt = "";                   				   
        if(imgTpCd != "15300008"){
        	if(imgTpCd == "15300001"){
        		refCt = "Vista general";
        	}else if(imgTpCd == "15300002"){
        		refCt = "Vista anterior";
        	}else if(imgTpCd == "15300003"){
        		refCt = "Vista lateral izquierda";
        	}else if(imgTpCd == "15300004"){
        		refCt = "Vista posterior";
        	}else if(imgTpCd == "15300005"){
        		refCt = "Vista lateral derecha";
        	}else if(imgTpCd == "15300006"){
        		refCt = "Vista superior";
        	}else if(imgTpCd == "15300007"){
        		refCt = "Vista inferior";
        	}
        }else{
        	refCt = $('#refCt').val();
        }
        //var imgChgNm = imgChgNm.split(".")[0] + ".jpg";

        var mvbGenSeq = $('#mvbGenSeq').val();

        var url = '/pm/pmRegInsFicha/createMvbImg.ajax';
        var jsonData = {
            'mvbGenSeq': mvbGenSeq,
            'imgTpCd': imgTpCd,
            'imgOrgNm': imgOrgNm,
            'imgChgNm': imgChgNm,
            'imgPath': imgPath,
            'thub1Path': thub1Path,
            'thub2Path': thub2Path,
            'fileSize': fileSize,
            'refCt' : refCt

        }
        var dataSeq = $('#generalThumb').data('imgSeq');
        Ajax.request(url, jsonData, function (data) {
            if (data.result > 0) {
                $('.imgSliderViewSlide').slick('unslick');
                $('.imgSliderNavSlide').slick('unslick');
                if(imgTpCd == '15300001'){
                    //Vista general
                    dataSeq = $('#generalThumb').data('imgSeq');
                    $('#liSlider_'+dataSeq).remove();
                    $('#liNav_'+dataSeq).remove();
                    $('#generalThumb').html('<a href="javascript:void(0);" data-org-name="'+imgOrgNm+'" data-chg-name="'+imgChgNm+'" data-file-path="'+imgPath+'" data-file-size="'+fileSize+'" class="btn_link fileDownload">'+imgOrgNm+'</a>');
                    $('.imgSliderViewSlide').append('<div id="liSlider_' + data.result + '" class="imgSliderView_img"><i><img src="' + global.docBase + '/' + thub2Path+ '/' + imgChgNm + '" alt="' + imgOrgNm + '" data-img-path="' + imgPath + '" data-img-chg-nm="' + imgChgNm + '"></i><p class="imgSliderView_title">Vista general</p></div>');
                    $('.imgSliderNavSlide').append('<div id="liNav_' + data.result + '" class="imgSliderNav_img"><i><img src="' + global.docBase + '/' + thub1Path+ '/' + imgChgNm + '" alt="Vista general"></i></div>');
                    $('.generalDel').attr('data-img-seq', data.result);
                    $('.generalModify').attr('data-img-seq', data.result);
                }else if(imgTpCd == '15300002'){
                    //Vista anterior
                    dataSeq = $('#anteriorThumb').data('imgSeq');
                    $('#liSlider_'+dataSeq).remove();
                    $('#liNav_'+dataSeq).remove();
                    $('#anteriorThumb').html('<a href="javascript:void(0);" data-org-name="'+imgOrgNm+'" data-chg-name="'+imgChgNm+'" data-file-path="'+imgPath+'" data-file-size="'+fileSize+'" class="btn_link  fileDownload">'+imgOrgNm+'</a>');
                    $('.imgSliderViewSlide').append('<div id="liSlider_' + data.result + '" class="imgSliderView_img"><i><img src="' + global.docBase + '/' + thub2Path+ '/' + imgChgNm + '" alt="' + imgOrgNm + '" data-img-path="' + imgPath + '" data-img-chg-nm="' + imgChgNm + '"></i><p class="imgSliderView_title">Vista anterior</p></div>');
                    $('.imgSliderNavSlide').append('<div id="liNav_' + data.result + '" class="imgSliderNav_img"><i><img src="' + global.docBase + '/' + thub1Path+ '/' + imgChgNm + '" alt="Vista anterior"></i></div>');
                    $('.anteriorDel').attr('data-img-seq', data.result);
                    $('.anteriorModify').attr('data-img-seq', data.result);
                }else if(imgTpCd == '15300003'){
                    //Vista lateral izquierda
                    dataSeq = $('#izquierdaThumb').data('imgSeq');
                    $('#liSlider_'+dataSeq).remove();
                    $('#liNav_'+dataSeq).remove();
                    $('#izquierdaThumb').html('<a href="javascript:void(0);" data-org-name="'+imgOrgNm+'" data-chg-name="'+imgChgNm+'" data-file-path="'+imgPath+'" data-file-size="'+fileSize+'" class="btn_link  fileDownload">'+imgOrgNm+'</a>');
                    $('.imgSliderViewSlide').append('<div id="liSlider_' + data.result + '" class="imgSliderView_img"><i><img src="' + global.docBase + '/' + thub2Path+ '/' + imgChgNm + '" alt="' + imgOrgNm + '" data-img-path="' + imgPath + '" data-img-chg-nm="' + imgChgNm + '"></i><p class="imgSliderView_title">Vista lateral izquierda</p></div>');
                    $('.imgSliderNavSlide').append('<div id="liNav_' + data.result + '" class="imgSliderNav_img"><p class="first-img"><i><img src="' + global.docBase + '/' + thub1Path+ '/' + imgChgNm + '" alt="Vista lateral izquierda"></i></div>');
                    $('.izquierdaDel').attr('data-img-seq', data.result);
                    $('.izquierdaModify').attr('data-img-seq', data.result);
                }else if(imgTpCd == '15300004'){
                    //Vista posterior
                    dataSeq = $('#posteriorThumb').data('imgSeq');
                    $('#liSlider_'+dataSeq).remove();
                    $('#liNav_'+dataSeq).remove();
                    $('#posteriorThumb').html('<a href="javascript:void(0);" data-org-name="'+imgOrgNm+'" data-chg-name="'+imgChgNm+'" data-file-path="'+imgPath+'" data-file-size="'+fileSize+'" class="btn_link  fileDownload">'+imgOrgNm+'</a>');
                    $('.imgSliderViewSlide').append('<div id="liSlider_' + data.result + '" class="imgSliderView_img"><i><img src="' + global.docBase + '/' + thub2Path+ '/' + imgChgNm + '" alt="' + imgOrgNm + '" data-img-path="' + imgPath + '" data-img-chg-nm="' + imgChgNm + '"></i><p class="imgSliderView_title">Vista posterior</p></div>');
                    $('.imgSliderNavSlide').append('<div id="liNav_' + data.result + '" class="imgSliderNav_img"><i><img src="' + global.docBase + '/' + thub1Path+ '/' + imgChgNm + '" alt="Vista posterior"></i></div>');
                    $('.posteriorDel').attr('data-img-seq', data.result);
                    $('.posteriorDel').attr('data-img-seq', data.result);
                }else if(imgTpCd == '15300005'){
                    //Vista lateral derecha
                    dataSeq = $('#derechaThumb').data('imgSeq');
                    $('#liSlider_'+dataSeq).remove();
                    $('#liNav_'+dataSeq).remove();
                    $('#derechaThumb').html('<a href="javascript:void(0);" data-org-name="'+imgOrgNm+'" data-chg-name="'+imgChgNm+'" data-file-path="'+imgPath+'" data-file-size="'+fileSize+'" class="btn_link  fileDownload">'+imgOrgNm+'</a>');
                    $('.imgSliderViewSlide').append('<div id="liSlider_' + data.result + '" class="imgSliderView_img"><i><img src="' + global.docBase + '/' + thub2Path+ '/' + imgChgNm + '" alt="' + imgOrgNm + '" data-img-path="' + imgPath + '" data-img-chg-nm="' + imgChgNm + '"></i><p class="imgSliderView_title">Vista lateral derecha</p></div>');
                    $('.imgSliderNavSlide').append('<div id="liNav_' + data.result + '" class="imgSliderNav_img"><i><img src="' + global.docBase + '/' + thub1Path+ '/' + imgChgNm + '" alt="Vista lateral derecha"></i></div>');
                    $('.derechaDel').attr('data-img-seq', data.result);
                    $('.derechaModify').attr('data-img-seq', data.result);
                }else if(imgTpCd == '15300006'){
                    //Vista superior
                    dataSeq = $('#superiorThumb').data('imgSeq');
                    $('#liSlider_'+dataSeq).remove();
                    $('#liNav_'+dataSeq).remove();
                    $('#superiorThumb').html('<a href="javascript:void(0);" data-org-name="'+imgOrgNm+'" data-chg-name="'+imgChgNm+'" data-file-path="'+imgPath+'" data-file-size="'+fileSize+'" class="btn_link  fileDownload">'+imgOrgNm+'</a>');
                    $('.imgSliderViewSlide').append('<div id="liSlider_' + data.result + '" class="imgSliderView_img"><i><img src="' + global.docBase + '/' + thub2Path+ '/' + imgChgNm + '" alt="' + imgOrgNm + '" data-img-path="' + imgPath + '" data-img-chg-nm="' + imgChgNm + '"></i><p class="imgSliderView_title">Vista superior</p></div>');
                    $('.imgSliderNavSlide').append('<div id="liNav_' + data.result + '" class="imgSliderNav_img"><i><img src="' + global.docBase + '/' + thub1Path+ '/' + imgChgNm + '" alt="Vista superior"></i></div>');
                    $('.superiorDel').attr('data-img-seq', data.result);
                    $('.superiorModify').attr('data-img-seq', data.result);
                }else if(imgTpCd == '15300007'){
                    //Vista inferior
                    dataSeq = $('#inferiorThumb').data('imgSeq');
                    $('#liSlider_'+dataSeq).remove();
                    $('#liNav_'+dataSeq).remove();
                    $('#inferiorThumb').html('<a href="javascript:void(0);" data-org-name="'+imgOrgNm+'" data-chg-name="'+imgChgNm+'" data-file-path="'+imgPath+'" data-file-size="'+fileSize+'" class="btn_link  fileDownload">'+imgOrgNm+'</a>');
                    $('.imgSliderViewSlide').append('<div id="liSlider_' + data.result + '" class="imgSliderView_img"><i><img src="' + global.docBase + '/' + thub2Path+ '/' + imgChgNm + '" alt="' + imgOrgNm + '" data-img-path="' + imgPath + '" data-img-chg-nm="' + imgChgNm + '"></i><p class="imgSliderView_title">Vista inferior</p></div>');
                    $('.imgSliderNavSlide').append('<div id="liNav_' + data.result + '" class="imgSliderNav_img"><i><img src="' + global.docBase + '/' + thub1Path+ '/' + imgChgNm + '" alt="Vista inferior"></i></div>');
                    $('.inferiorDel').attr('data-img-seq', data.result);
                    $('.inferiorModify').attr('data-img-seq', data.result);
                }
                sickReset();
            }
        }, '');
    }else if($('#uploadType').val() == 'imgDetail'){
 
        $('#imgOrgNm').val(arrayNew[0].originalName);      
        $('#imgChgNm').val(arrayNew[0].uploadName);         
        $('#imgPath').val(arrayNew.filePath);               
        $('#fileSize').val(arrayNew[0].size);              
        $('#thub1Path').val(arrayNew.thumbPath1);           
        $('#thub2Path').val(arrayNew.thumbPath2);           
        
        
        $('#uploadImgDetailFileNm').text(arrayNew[0].originalName); 
        $("#uploadImgDetailFileDel").removeClass('hide');
    }
}

$(function () {
	var mvbgenseq = $("#mvbGenSeq").val();
 
    $(document).on('click', '.xi-search', function(){
        var xiImgSeq = $(this).data('imgSeq');
        $('#liNav_' + xiImgSeq).trigger('click');
    });


    /**
     * Vista de detalle Click Event
     */
    $(document).on('click', '.updifyDetail', function(){
        var refCt = $(this).attr('data-ref-ct');
        $('#detailDeleteSeq').val($(this).attr('data-img-seq'));
        $('#refCt').val(refCt);
    });


 
    //Vista general
    $(document).on('click', '.generalDel' , function(){
        var seq = $(this).data('imgSeq');
        var url = '/pm/pmRegInsFicha/modifyMvbImg.ajax';
        var jsonData = {
            'seq': seq,
            'activeYn': 'N',
            'mvbGenSeq':mvbgenseq
        }
 
        if(seq != ""){
	        Ajax.request(url, jsonData, function (data) {
	            if (data.result > 0) {
	                $('.imgSliderViewSlide').slick('unslick');
	                $('.imgSliderNavSlide').slick('unslick');
	                $('#liSlider_'+seq).remove();
	                $('#liNav_'+seq).remove();
	                $('#generalThumb').html('');
	                sickReset();
	            }
	        }, '');
        }
    });
    //Vista anterior
    $(document).on('click', '.anteriorDel' , function(){
        var seq = $(this).data('imgSeq');
        var url = '/pm/pmRegInsFicha/modifyMvbImg.ajax';
        var jsonData = {
            'seq': seq,
            'activeYn': 'N',
            'mvbGenSeq':mvbgenseq
        }
 
        if(seq != ""){
	        Ajax.request(url, jsonData, function (data) {
	            if (data.result > 0) {
	                $('.imgSliderViewSlide').slick('unslick');
	                $('.imgSliderNavSlide').slick('unslick');
	                $('#liSlider_'+seq).remove();
	                $('#liNav_'+seq).remove();
	                $('#anteriorThumb').html('');
	                sickReset();
	            }
	        }, '');
        }
    });
    //Vista lateral izquierda
    $(document).on('click', '.izquierdaDel' , function(){
        var seq = $(this).data('imgSeq');
        var url = '/pm/pmRegInsFicha/modifyMvbImg.ajax';
        var jsonData = {
            'seq': seq,
            'activeYn': 'N',
            'mvbGenSeq':mvbgenseq
        }
 
        if(seq != ""){
	        Ajax.request(url, jsonData, function (data) {
	            if (data.result > 0) {
	                $('.imgSliderViewSlide').slick('unslick');
	                $('.imgSliderNavSlide').slick('unslick');
	                $('#liSlider_'+seq).remove();
	                $('#liNav_'+seq).remove();
	                $('#izquierdaThumb').html('');
	                sickReset();
	            }
	        }, '');
        }
    });

    //Vista posterior
    $(document).on('click', '.posteriorDel' , function(){
        var seq = $(this).data('imgSeq');
        var url = '/pm/pmRegInsFicha/modifyMvbImg.ajax';
        var jsonData = {
            'seq': seq,
            'activeYn': 'N',
            'mvbGenSeq':mvbgenseq
        }
 
        if(seq != ""){
	        Ajax.request(url, jsonData, function (data) {
	            if (data.result > 0) {
	                $('.imgSliderViewSlide').slick('unslick');
	                $('.imgSliderNavSlide').slick('unslick');
	                $('#liSlider_'+seq).remove();
	                $('#liNav_'+seq).remove();
	                $('#posteriorThumb').html('');
	                sickReset();
	            }
	        }, '');
        }
    });

    //Vista lateral derecha
    $(document).on('click', '.derechaDel' , function(){
        var seq = $(this).data('imgSeq');
        var url = '/pm/pmRegInsFicha/modifyMvbImg.ajax';
        var jsonData = {
            'seq': seq,
            'activeYn': 'N',
            'mvbGenSeq':mvbgenseq
        }
 
        if(seq != ""){
	        Ajax.request(url, jsonData, function (data) {
	            if (data.result > 0) {
	                $('.imgSliderViewSlide').slick('unslick');
	                $('.imgSliderNavSlide').slick('unslick');
	                $('#liSlider_'+seq).remove();
	                $('#liNav_'+seq).remove();
	                $('#derechaThumb').html('');
	                sickReset();
	            }
	        }, '');
        }
    });

    //Vista superior
    $(document).on('click', '.superiorDel' , function(){
        var seq = $(this).data('imgSeq');
        var url = '/pm/pmRegInsFicha/modifyMvbImg.ajax';
        var jsonData = {
            'seq': seq,
            'activeYn': 'N',
            'mvbGenSeq':mvbgenseq
        }
 
        if(seq != ""){
	        Ajax.request(url, jsonData, function (data) {
	            if (data.result > 0) {
	                $('.imgSliderViewSlide').slick('unslick');
	                $('.imgSliderNavSlide').slick('unslick');
	                $('#liSlider_'+seq).remove();
	                $('#liNav_'+seq).remove();
	                $('#superiorThumb').html('');
	                sickReset();
	            }
	        }, '');
        }
    });
    //Vista inferior
    $(document).on('click', '.inferiorDel' , function(){
        var seq = $(this).data('imgSeq');
        var url = '/pm/pmRegInsFicha/modifyMvbImg.ajax';
        var jsonData = {
            'seq': seq,
            'activeYn': 'N',
            'mvbGenSeq':mvbgenseq
        }
 
        if(seq != ""){
	        Ajax.request(url, jsonData, function (data) {
	            if (data.result > 0) {
	                $('.imgSliderViewSlide').slick('unslick');
	                $('.imgSliderNavSlide').slick('unslick');
	                $('#liSlider_'+seq).remove();
	                $('#liNav_'+seq).remove();
	                $('#inferiorThumb').html('');
	                sickReset();
	            }
	        }, '');
        }
    });
    //Vista de detalle Delete
    $(document).on('click', '.detailDelete' , function(){
        var seq = $(this).data('imgSeq');
        var url = '/pm/pmRegInsFicha/modifyMvbImg.ajax';
        var _this = $(this);
        var jsonData = {
            'seq': seq,
            'activeYn': 'N',
            'mvbGenSeq':mvbgenseq
        }
 
        if(seq != ""){
	        Ajax.request(url, jsonData, function (data) {
	            if (data.result > 0) {
	                $(_this).closest('tr').remove();
	                $('.imgSliderViewSlide').slick('unslick');
	                $('.imgSliderNavSlide').slick('unslick');
	                $('#liSlider_'+seq).remove();
	                $('#liNav_'+seq).remove();
	                sickReset();
	                
	                var detailBodyCount = $('#detailBody tr').length;
	                if(detailBodyCount == 0){
	                	var _html = '';
	                	_html += "<tr id='tr_none'><td colspan=\"5\"><div class='dataNone'><i>" + infoNoDataMsg + "</i></div></td></tr>"; 
	            		$('#detailBody').html(_html);
	                }
	                
	            }
	
 
	            $('[name=detailIndex]').each(function (i, v) {
	                v.textContent = i + 1;
	            });
	        }, '');
        }
    });


    //Vista de detalle  
    $(document).on('click', '#detailImg', function(){
        var imgTpCd = $('#imgTpCd').val();                  
        var imgOrgNm = $('#imgOrgNm').val();                
        var imgChgNm = $('#imgChgNm').val();                 
        var imgPath = $('#imgPath').val();                   
        var fileSize = $('#fileSize').val();                
        var thub1Path =$('#thub1Path').val();               
        var thub2Path =$('#thub2Path').val();                
        var refCt = $('#refCt').val();                       
        var detailSeq = $('#detailDeleteSeq').val();        
        //var imgThumbName = imgChgNm.split(".")[0] + ".jpg";
        
        $('#tr_none').remove();

        if(detailSeq != ''){

            if(refCt == '') {
                Common.alert("warning", GLB_MSG);
                return false;
            }

 
            if (imgOrgNm != '' && imgChgNm != '' && imgPath != '' && fileSize != '' && thub1Path != '') {
 
                var url = '/pm/pmRegInsFicha/modifyMvbImg.ajax';
                var jsonData = {
                    'seq': detailSeq,
                    'refCt' : refCt,
                    'imgOrgNm' : imgOrgNm,
                    'imgChgNm' : imgChgNm,
                    'imgPath' : imgPath,
                    'fileSize' : fileSize,
                    'thub1Path' : thub1Path,
                    'thub2Path' : thub2Path, 
                    'mvbGenSeq' : mvbgenseq
                }
 
                Ajax.request(url, jsonData, function (data) {
                    if (data.result > 0) {
                        $('.imgSliderViewSlide').slick('unslick');
                        $('.imgSliderNavSlide').slick('unslick');
 
                        $('#liSlider_'+detailSeq).remove();
                        $('#liNav_'+detailSeq).remove();
 
                        $('.imgSliderViewSlide').append('<div id="liSlider_' + detailSeq + '" class="imgSliderView_img"><i><img src="' + global.docBase + '/' + thub2Path+ '/' + imgChgNm + '" alt="' + refCt + '" data-img-path="' + imgPath + '" data-img-chg-nm="' + imgChgNm + '"></i><p class="imgSliderView_title">' + refCt + '</p></div>');
                        $('.imgSliderNavSlide').append('<div id="liNav_' + detailSeq + '" class="imgSliderNav_img"><i><img src="' + global.docBase + '/' + thub1Path+ '/' + imgChgNm + '" alt="' + refCt + '"></i></div>');
                        $('#liSlider_'+detailSeq).find('img').attr('src', global.docBase + '/' + thub2Path+ '/' + imgChgNm);
                        $('#liNav_'+detailSeq).find('img').attr('src', global.docBase + '/' + thub1Path+ '/' + imgChgNm);
                        $('#liSlider_'+detailSeq).find('img').attr('alt', refCt);
                        $('#liNav_'+detailSeq).find('img').attr('alt', refCt);
                        //Detail list  
                        $('#detailRef_'+detailSeq).text(refCt);
                        $('#detailImgAtag_'+detailSeq).html('<a href="javascript:void(0)" data-org-name="'+imgOrgNm+'" data-chg-name="'+imgChgNm+'" data-file-path="'+imgPath+'" data-file-size="'+fileSize+'" class="btn_link  fileDownload">'+imgOrgNm+'</a>');
                        $('#detailData_'+detailSeq).attr('data-ref-ct', refCt);
                        //Sick  
                        sickReset();
                        $('#imgOrgNm').val('');          
                        $('#imgChgNm').val('');          
                        $('#imgPath').val('');           
                        $('#fileSize').val('');          
                        $('#thub1Path').val('');         
                        $('#refCt').val('');             
                        $('#detailDeleteSeq').val('');   
                        
                        $("#uploadImgDetailFileNm").text("");
                		$("#uploadImgDetailFileDel").addClass('hide');
                    }
                }, '');
             
            }else{
 
                var url = '/pm/pmRegInsFicha/modifyMvbImg.ajax';
                var jsonData = {
                    'seq': detailSeq,
                    'refCt' : refCt,
                    'mvbGenSeq' : mvbgenseq
                }
 
                Ajax.request(url, jsonData, function (data) {
                    if (data.result > 0) {
                        $('.imgSliderViewSlide').slick('unslick');
                        $('.imgSliderNavSlide').slick('unslick');
                        $('#liSlider_'+detailSeq).find('img').attr('alt', refCt);
                        $('#liNav_'+detailSeq).find('img').attr('alt', refCt)
                        $('#detailRef_'+detailSeq).text(refCt);
                        $('#detailData_'+detailSeq).attr('data-ref-ct', refCt);
                        sickReset();
                        $('#refCt').val('');             
                        $('#detailDeleteSeq').val('');   
                    }
                }, '');

            }


        } else {
 
            if (imgOrgNm == '' && imgChgNm == '' && imgPath == '' && fileSize == '' && thub1Path == '') {
                Common.alert("warning", GLB_MSG2);
                return false;
            } else if(refCt == '') {
                Common.alert("warning", GLB_MSG);
                return false;
            }

            var mvbGenSeq = $('#mvbGenSeq').val();
            var _html = $('#detailBody').html();

            var url = '/pm/pmRegInsFicha/createMvbImg.ajax';
            var jsonData = {
                'mvbGenSeq': mvbGenSeq,
                'imgTpCd': imgTpCd,
                'imgOrgNm': imgOrgNm,
                'imgChgNm': imgChgNm,
                'imgPath': imgPath,
                'thub1Path': thub1Path,
                'thub2Path': thub2Path,
                'fileSize': fileSize,
                'refCt': refCt

            }
 
            Ajax.request(url, jsonData, function (data) {
                if (data.result > 0) {
                    $('.imgSliderViewSlide').slick('unslick');
                    $('.imgSliderNavSlide').slick('unslick');
                    if (imgTpCd == '15300008') {
                        //Vista de detalle
                        $('.imgSliderViewSlide').append('<div id="liSlider_' + data.result + '" class="imgSliderView_img"><i><img src="' + global.docBase + '/' + thub2Path+ '/' + imgChgNm + '" alt="' + refCt + '" data-img-path="' + imgPath + '" data-img-chg-nm="' + imgChgNm + '"></i><p class="imgSliderView_title">' + refCt + '</p></div>');
                        $('.imgSliderNavSlide').append('<div id="liNav_' + data.result + '" class="imgSliderNav_img"><i><img src="' + global.docBase + '/' + thub1Path+ '/' + imgChgNm + '" alt="' + refCt + '"></i></div>');

                        _html += '<tr>';
                        _html += 	'<td name="detailIndex"></td>';
                        _html += 	'<td>';
                        _html += 		'<a href="javascript:void(0);" data-org-name="' + imgOrgNm + '" data-chg-name="' + imgChgNm + '" data-file-path="' + imgPath + '" data-file-size="' + fileSize + '" class="btn_link  fileDownload">' + imgOrgNm + '</a>';
                        _html += 	'</td>';
                        _html += '<td id="detailRef_'+refCt+'">' + refCt + '</td>';
                        _html += 	'<td>';
                        _html += '<div class="dt-list-control dt-list-control-extend">';
                        _html += 			'<span><i class="xi-search" data-img-seq="' + data.result + '"></i></span>';
                        _html += 			'<span data-toggle="tooltip" data-placement="top" title="' + tooltipEdit + '"><i id="detailData_'+data.result+'" class="xi-pen updifyDetail" data-img-seq="' + data.result + '" data-ref-ct="' + refCt + '"></i></span>';
                        _html += 			'<span data-toggle="tooltip" data-placement="top" title="' + tooltipDelete + '"><i class="xi-trash detailDelete" data-img-seq="' + data.result + '"></i></span>';
                        _html += 		'</div>';
                        _html += 	'</td>';
                        _html += '</tr>';
                    }

                    $('#detailBody').html(_html);
                    $('[name=detailIndex]').each(function (i, v) {
                        v.textContent = i + 1;
                    });
                    //Sick  
                    sickReset();
                    $('#imgOrgNm').val('');          
                    $('#imgChgNm').val('');          
                    $('#imgPath').val('');           
                    $('#fileSize').val('');          
                    $('#thub1Path').val('');         
                    $('#refCt').val('');             
                    
                    $("#uploadImgDetailFileNm").text("");
            		$("#uploadImgDetailFileDel").addClass('hide');
            		
 
            		$('[data-toggle="tooltip"]').tooltip();
                }
            }, '');
        }
    });

    $(document).on('click', '#detailUpload', function(){
    	var mvbgenseq = $('#mvbGenSeq').val();
    	var imgTpCd = $(this).data('imgTpCd');
 
        $('#uploadType').val('imgDetail');
        $('#imgTpCd').val($(this).data('imgTpCd'));

        var maxTotalFileCount = "1";						                 
        var filePath = "/hip/pm/img/"+mvbgenseq;			    			 
        var thumbPath1 = "/hip/pm/thumb1/"+mvbgenseq;	    				 
        var thumbPath2 = "/hip/pm/thumb2/"+mvbgenseq;	                     
        var preFileName = "";								                 
        var customValue = "";								                 
        var uploadId = "";						                             

        var jsonData = {
            "maxTotalFileCount" : maxTotalFileCount,
            "filePath" : filePath,
            "thumbPath1" : thumbPath1,
            "thumbPath2" : thumbPath2,
            "preFileName" : preFileName,
            "customValue" : customValue,
            "uploadId" : uploadId
        };
        Upload.singlePopOpen(jsonData);		 
    });

    /**
     * Imgages Archivo Btn Click
     */
    $(document).on('click', '.imagesUpload', function() {
    	var mvbgenseq = $('#mvbGenSeq').val();
 
        $('#uploadType').val('img');
        $('#imgTpCd').val($(this).data('imgTpCd'));

        var maxTotalFileCount = "1";						                
        var filePath = "/hip/pm/img/"+mvbgenseq;			     
        var thumbPath1 = "/hip/pm/thumb1/"+mvbgenseq;	    
        var thumbPath2 = "/hip/pm/thumb2/"+mvbgenseq;	     
        var preFileName = "";								                 
        var customValue = "";								                
        var uploadId = "";						                            

        var jsonData = {
            "maxTotalFileCount" : maxTotalFileCount,
            "filePath" : filePath,
            "thumbPath1" : thumbPath1,
            "thumbPath2" : thumbPath2,
            "preFileName" : preFileName,
            "customValue" : customValue,
            "uploadId" : uploadId
        };
        Upload.singlePopOpen(jsonData);		 
    });



    /**
     * File Archivo Btn Click
     */
    $(document).on('click', '#fileUpload', function() {
 
        $('#uploadType').val('file');

        var maxTotalFileCount = "1";						 
        var filePath = "/hip/pm/pmRegInsFicha/graphicFile/file";			 
        var thumbPath1 = "";	 
        var thumbPath2 = "";	 
        var preFileName = "";								 
        var customValue = "";								 
        var uploadId = "";						 

        var jsonData = {
            "maxTotalFileCount" : maxTotalFileCount,
            "filePath" : filePath,
            "thumbPath1" : thumbPath1,
            "thumbPath2" : thumbPath2,
            "preFileName" : preFileName,
            "customValue" : customValue,
            "uploadId" : uploadId
        };
        Upload.single3DPopOpen(jsonData);	 
    });



    /**
     * File Download Btn Click Event
     */
    $(document).on('click', '.fileDownload', function(){
        var orgName = $(this).data('orgName');
        var chgName = $(this).data('chgName');
        var filePath = $(this).data('filePath');
        var fileSize = $(this).data('fileSize');

        if(orgName != '' || chgName != '' || filePath != '' || fileSize != ''){
            var jsonData = {
                "fileOrgName" : orgName,	 
                "fileChgName" : chgName,	 
                "filePath" : filePath,		 
                "fileSize" : fileSize		 
            }
            Download.singlePopOpen(jsonData);	 
        }
    });


    /**
     * File Delete Btn Click Event
     */
    $(document).on('click', '.virtualDelete', function(){
        var _this = $(this);
        var mvbGenSeq = $('#mvbGenSeq').val();
        var hipMvbArchSeq = $(this).data('archSeq');
        var archTpCd = $(this).data('archTpCd');
        var url = "/pm/pmRegInsFicha/delHipMvbArch.ajax";
        var jsonData = {
            "mvbGenSeq" : mvbGenSeq,
            "archTpCd"  : archTpCd,
            "hipMvbArchSeq" : hipMvbArchSeq
        };

        Ajax.request(url, jsonData, function(data){
            if(data.MSG = 'success'){
                $(_this).closest('tr').remove();
                $('[name=virtualIndex]').each(function(i, v){
                    v.textContent=i+1;
                });
                
                var virtualCount = $('#virtualBody tr').length;
                if(virtualCount == 0){
                	var _html = '';
                	_html += "<tr id='tr_none'><td colspan=\"5\"><div class='dataNone'><i>" + infoNoDataMsg + "</i></div></td></tr>"; 
            		$('#virtualBody').html(_html);
                }
            }
        }, '');
        
        
        
    });


 
    $(document).on('click', '.openOrderPopup', function(){
        var mvbGenSeq = $('#mvbGenSeq').val();
        var _html = '';
        var jsonData = {
            "mvbGenSeq" : mvbGenSeq
        };
        var url = "/pm/pmRegInsFicha/getImagesList.ajax";
        Ajax.request(url, jsonData, function(data){
            if(data.result == '1'){
                $(data.list).each(function(i, v){
                    _html += '<tr>';
                    _html += '<input type="hidden" name="arrSortNo['+i+']" value="'+v.sortNo+'" />';
                    _html += '<input type="hidden" name="arrSeq['+i+']" value="'+v.seq+'" />';

                    if(v.imgTpCd == '15300001'){
                        _html +=    '<td class="w_120 center">Vista general</td>';
                    }else if(v.imgTpCd == '15300002'){
                        _html +=    '<td class="w_120 center">Vista anterior</td>';
                    }else if(v.imgTpCd == '15300003'){
                        _html +=    '<td class="w_120 center">Vista lateral izquierda</td>';
                    }else if(v.imgTpCd == '15300004'){
                        _html +=    '<td class="w_120 center">Vista posterior</td>';
                    }else if(v.imgTpCd == '15300005'){
                        _html +=    '<td class="w_120 center">Vista lateral derecha</td>';
                    }else if(v.imgTpCd == '15300006'){
                        _html +=    '<td class="w_120 center">Vista superior</td>';
                    }else if(v.imgTpCd == '15300007'){
                        _html +=    '<td class="w_120 center">Vista inferior</td>';
                    }else if(v.imgTpCd == '15300008'){
                    	_html +=    '<td class="w_120 center">' + v.refCt + '</td>';
                    }
                    _html +=    '<td>'+v.imgOrgNm+'</td>';
                    _html += '</tr>';
                });
                $('#orderChangeTab').html(_html);
                openPopup('graphicOrderChange');
            }
        }, '');
    });


    /**
     * Material secundario Up Btn Click Event
     */
    $(document).on('click', '.arrowBtn', function(){
        var $tr = $('#orderChangeTab').children('tr.on');
        if($tr.length == 0){
            Common.alert("warning", errMaxLeng);
            return false;
        }else if($tr.length > 1){
            Common.alert("warning", errMaxLeng);
            return false;
        }
        if($(this).data('type') == 'up'){
            $tr.prev().before($tr);
        }
        if($(this).data('type') == 'down'){
            $tr.next().after($tr);
        }
        if($(this).data('type') == 'top') {
            $firstTr = $('#orderChangeTab').children('tr').first();
            $($tr).insertBefore($firstTr);
        }else if($(this).data('type') == 'foot'){
            $firstTr = $('#orderChangeTab').children('tr').last();
            $($tr).insertAfter($firstTr);
        }
        //
 
        $('#orderChangeTab>tr').each(function(i, v){
            $(v).children('[name^=arrSortNo]').attr('name', 'arrSortNo['+i+']');
            $(v).children('[name^=arrSeq]').attr('name', 'arrSeq['+i+']');
            $(v).children('[name^=arrSortNo]').val(i);
        });
    });
 
    $(document).on('click', '#submitBtn', function(){
        var form = Common.serialize($('#orderForm'));

        Ajax.request('/pm/pmRegInsFicha/modifyMvbImg.ajax', form, function(data){
            if(data.result > 0){
                Common.alert("success", data.successMessage);
            }

            if(data.errorCode == '-1'){
                Common.alert("warning", data.errorMessage);
                return false;
            }
        }, '');
    });


 
    /*
    $('.originalImgPop').on('click', function () {
    	//debugger;
        var activeImage = $('.slick-current').find('img').attr('data-img-path') + "/" + $('.slick-current').find('img').attr('data-img-chg-nm');
        var activeImageIndex = $('.slick-current').attr('data-slick-index');
        $('#activeImage').val(activeImage);
        $('#activeImageIndex').val(activeImageIndex);
        $('#imageAtachCnt').val($('.imgSliderViewSlide > .slick-list > .slick-track > li:not(.slick-cloned)').length);

        var imgJsonArray = new Array();
        $('.imgSliderViewSlide > .slick-list > .slick-track > li:not(.slick-cloned)').each(function () {
            var imgObj = new Object();
            imgObj.src = ($(this).find('img').attr('src'));
            imgObj.dataSlickIndex = ($(this).attr('data-slick-index'));
            imgJsonArray.push(imgObj);
        });

        var finalJsonData = JSON.stringify(imgJsonArray);
        $('#imageAtachObject').val(finalJsonData);
        
 
        var size = Common.setWindowCenter(1300, 800);

        var allIamgeSrc = $('.imgSliderViewSlide').find('img').attr('src');
        var url = '/pm/pmRegInsFicha/getImageViewer.do';
        var title = 'ImageViewer';
        var status = 'toolbar=no,directories=no,scrollbars=no,resizable=no,status=no,menubar=no, left='+size.setWidth+', top='+size.setHeight+', width=1300, height=800, resizable=no, scrollbars=no';
        console.log(status);
        window.open('', title, status);
        $('#imgViewFrm').attr('action', url);
        $('#imgViewFrm').attr('method', 'post');
        $('#imgViewFrm').attr('target', 'ImageViewer');
        $('#imgViewFrm').submit();
    });
    */
});

//Vista de detalle - Upload File Remove
function fnUploadImgDetailFileDel() {
	
	if(confirm(conDelMsg)) {
		$("#uploadImgDetailFileNm").text("");
		$("#imgOrgNm, #imgChgNm, #imgPath, #fileSize, #thub1Path").val("");
		$("#uploadImgDetailFileDel").addClass('hide');
	}
}

 
function fnUploadImgDetailFileDown() {
	
	var jsonData = {
			"fileOrgName" : $("#imgOrgNm").val(),	 
			"fileChgName" : $("#imgChgNm").val(),	 
			"filePath" : $("#imgPath").val(),		 
			"fileSize" : $("#fileSize").val()		 
		}
	Download.singlePopOpen(jsonData);	 
}