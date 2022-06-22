function fn_openSpellCheck(textAreaId){
    $('#'+textAreaId).val(tinyMCE.activeEditor.getContent({format : 'text'}));
    //$('#'+textAreaId).val(tinyMCE.get(textAreaId).getContent().replace(/(<p>)*/gi, '').replace(/<(\/)?p[^>]*>/gi, ''));
    //tinyMCE.triggerSave();
    var url    ="/pm/pmRegInsFicha/getSpellCheck.do?textAreaId="+textAreaId;
    var title  = "spell Check";
    var status = "toolbar=no,directories=no,scrollbars=no,resizable=no,status=no,menubar=no,width=600,height=550";

    window.open(url, title, status);
}

function fn_setTextValue(textAreaId){
    tinymce.get(textAreaId).setContent($('#'+textAreaId).val());
}


function changeMtrlCd(){
    Code.stdCodeList('Y', 'MVB', '028', $('#mtrlCd').val(), '', '', function(result){
        var _html = '<option value=\"\" >-- Seleccione --</option>';
        result.forEach(function(v, i){
            _html += '<option value=\"'+v.stdCd+'\">'+v.cdSpnNm+'</option>';
        });
        $('#tpMtrlCd').html(_html);
        if($('#detailTpMtrlCd').val() != ''){
            $('#tpMtrlCd').val($('#detailTpMtrlCd').val());
        }
    });
    
    var restoType = $("[name=mtrlCd] option:selected").data('refCd');
    
    //Material Principal - Resto humano or Resto animal
    if(restoType == 'H'){
        //Material Principal - Resto humano
        if ($('#restDataIsCheck').val() != 'notNull') {
            $('.informacionResto').val('');
            $('.informacionRestoYn').val(''); 
            $('.informacionRestoCheck').attr('checked', false);
        } else {
            $('#restDataIsCheck').val('');
        }
        $('.restoAnimal').addClass('hide');
        $('.showResto').removeClass('hide');
        $('.restoHumano').removeClass('hide');
    }else if(restoType == 'A'){
        //Material Principal - Resto animal
        if ($('#restDataIsCheck').val() != 'notNull') {
            $('.informacionResto').val(''); 
            $('.informacionRestoYn').val('');
            $('.informacionRestoCheck').attr('checked', false); 
        } else {
            $('#restDataIsCheck').val('');
        }
        $('.restoHumano').addClass('hide');
        $('.showResto').removeClass('hide');
        $('.restoAnimal').removeClass('hide');
    }else{
        if ($('#restDataIsCheck').val() != 'notNull') {
            $('.informacionResto').val(''); 
            $('.informacionRestoYn').val('');
            $('.informacionRestoCheck').attr('checked', false);
        } else {
            $('#restDataIsCheck').val('');
        }
        $('.showResto').addClass('hide');
        $('.restoAnimal').addClass('hide');
        $('.restoHumano').addClass('hide');
    }
    
    if(restoType != ''){
    	var restoTypeTitle = {
			A: 'Información complementaria resto animal',
			H: 'Información complementaria resto humano'
    	};
    	
    	$('#restoTitle').text(restoTypeTitle[restoType]);
    }
}

$(function () {


    tinymce.init({
        selector: '#spnTechDscpt',
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
        	ed.maxLength = document.getElementById(textAreaId).maxLength || 0;
	        
            ed.addButton('cSpellCheck', {
                title: 'Verificar Ortografía',
                image: '/images/spellCheckIcon2.gif',
                onclick: function() {
                    fn_openSpellCheck(ed.id);
                }
            });
        }

    });
    
    /*
    tinymce.init({
        selector: '#addElmSpnCt',
        height: 10,
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
        	ed.maxLength = document.getElementById(textAreaId).maxLength || 0;
	        
            ed.addButton('cSpellCheck', {
                title: 'Verificar Ortografía',
                image: '/images/spellCheckIcon2.gif',
                onclick: function() {
                    fn_openSpellCheck(ed.id);
                }
            });
        }

    });
    
    tinymce.init({
        selector: '#addMtrlSpnCt',
        height: 10,
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
        	ed.maxLength = document.getElementById(textAreaId).maxLength || 0;
	        
            ed.addButton('cSpellCheck', {
                title: 'Verificar Ortografía',
                image: '/images/spellCheckIcon2.gif',
                onclick: function() {
                    fn_openSpellCheck(ed.id);
                }
            });
        }

    });
    */


    if($('#detailTpMtrlCd').val() != ''){
        changeMtrlCd();
    }

    /**
     * Material Principal(Material) Change Evetn
     */
    $(document).on('change', '#mtrlCd', function(){
    	if($('#mtrlCd').val() != ""){
    		changeMtrlCd();
    	}else{
    		var _html = '<option value=\"\" >-- Seleccione --</option>';
            $('#tpMtrlCd').html(_html);
    	}
    });

    /**
     * Material secundario  Agregar Click Event
     */
    $(document).on('click', '.addMaterial', function(){

        $('#catalogoDeTec').html('');
        $('#addCatalogoDeTec').html('');
        $('#techCd').val('');
        

        //validator Check
        if($('#subMtrlCd').val() == '' || $('#subMtrlCd').val() == null){
            Common.alert("warning", GLB_MSG);
            return false;
        }
        //validator Check
        if($('#subTpMtrlCd').val() == '' || $('#subTpMtrlCd').val() == null){
            Common.alert("warning", GLB_MSG);
            return false;
        }
        
        //add- validator overlap Check .S
        var overlapChk = true;
        $('#autoriaBody > tr').each(function(i){
        	
        	var arrMtrlCd = $(this).find('input[type=hidden]:eq(2)').val();
        	var arrSubMtrlCd = $(this).find('input[type=hidden]:eq(3)').val();
        	
        	if($('#subMtrlCd').val() == arrMtrlCd && $('#subTpMtrlCd').val() == arrSubMtrlCd){
        		overlapChk = false;
        		return false;
        	}
    	});
        if(!overlapChk){
        	Common.alert('warning', errOverlap);
        	return false;
        }
      //add- validator overlap Check .E
        
        $('#auto_none').remove();
        var _html = $('#autoriaBody').html();
        var  index = $('#autoriaBody>tr').length;
        $('.autoriaTable').removeClass('hide');

        _html += '<tr>';
        _html +=    '<input type="hidden" class="resetMtrlSeq" name="arrMtrlSeq['+index+']" id="arrMtrlSeq['+index+']" value="" />';
        _html +=    '<input type="hidden" class="resetSortNo" name="arrSortNo['+index+']" id="arrSortNo['+index+']" value="'+index+'" />';
        _html +=    '<input type="hidden" class="arrMtrlCd resetMtrlCd" name="arrMtrlCd['+index+']" id="arrMtrlCd['+index+']" value="'+$('#subMtrlCd').val()+'" />';
        _html +=    '<input type="hidden" class="resetSubMtrlCd" name="arrSubMtrlCd['+index+']" id="arrSubMtrlCd['+index+']" value="'+$('#subTpMtrlCd').val()+'" />';
        _html += 	'<td name="tbodyIdx"></td>';
        _html += 	'<td>'+$("[name=subMtrlCd] option:selected").text();+'</td>';
        _html += 	'<td>'+$("[name=subTpMtrlCd] option:selected").text();+'</td>';
        _html += 	'<td>';
        _html += 		'<div class="dt-list-control dt-list-control-extend">';
        _html += 			'<a href="javascript:void(0);" class="btn_ico btn_basic downBtn"><i class="xi-angle-down-min"></i></a>';
        _html += 			'<a href="javascript:void(0);" class="btn_ico btn_basic upBtn"><i class="xi-angle-up-min"></i></a>';
        _html += 			'<a href="javascript:void(0);" data-toggle="tooltip" data-placement="top" title="' + tooltipDelete + '" class="btn_ico btn_basic deleteBtn"><i class="xi-trash"></i></a>';
        _html += 		'</div>';
        _html += 	'</td>';
        _html += '</tr>';
        $('#autoriaBody').html(_html);
        $('[name=tbodyIdx]').each(function(i, v){
            v.textContent=i+1;
        });
        
        $("#subTpMtrlCd").val("");
        $("#subMtrlCd").val("");
    });


    /**
     * Material secundario(Material) Change Evetn
     */
    $(document).on('change', '#subMtrlCd', function(){
        Code.stdCodeList('Y', 'MVB', '028', $(this).val(), '', '', function(result){
            var _html = '<option value=\"\" >-- Seleccione --</option>';
            result.forEach(function(v, i){
                _html += '<option value=\"'+v.stdCd+'\">'+v.cdSpnNm+'</option>';
            });
            $('#subTpMtrlCd').html(_html);
        });
    });

    /**
     * Material secundario Down Btn Click Event
     */
    $(document).on('click', '.downBtn', function(){
        var $tr = $(this).closest('tr');
        $tr.next().after($tr);

        $('[name=tbodyIdx]').each(function(i, v){
            v.textContent=i+1;
        });
        $('.resetMtrlSeq').each(function(i, v){
            $(v).attr('name', 'arrMtrlSeq['+i+']');
            $(v).attr('id', 'arrMtrlSe['+i+']');
        });

        $('.resetSortNo').each(function(i, v){
            $(v).attr('name', 'arrSortNo['+i+']');
            $(v).attr('id', 'arrSortNo['+i+']');
            $(v).val(i);
        });

        $('.resetMtrlCd').each(function(i, v){
            $(v).attr('name', 'arrMtrlCd['+i+']');
            $(v).attr('id', 'arrMtrlCd['+i+']');
        });

        $('.resetSubMtrlCd').each(function(i, v){
            $(v).attr('name', 'arrSubMtrlCd['+i+']');
            $(v).attr('id', 'arrSubMtrlCd['+i+']')
        });
    });



    /**
     * Material secundario Up Btn Click Event
     */
    $(document).on('click', '.arrowBtn', function(){
        var $tr = $('#addCatalogoDeTec').children('tr.on');
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
            $firstTr = $('#addCatalogoDeTec').children('tr').first();
            $($tr).insertBefore($firstTr);
        }else if($(this).data('type') == 'foot'){
            $firstTr = $('#addCatalogoDeTec').children('tr').last();
            $($tr).insertAfter($firstTr);
        }

        $('#addCatalogoDeTec>tr').each(function(i, v){
            $(v).children('[id^=arrTechCd]').attr('name', 'arrTechCd['+i+']');
            $(v).children('[id^=arrTechCd]').attr('id', 'arrTechCd['+i+']');
            $(v).children('[id^=arrTechSeq]').attr('name', 'arrTechSeq['+i+']');
            $(v).children('[id^=arrTechSeq]').attr('id', 'arrTechSeq['+i+']');
            $(v).children('[id^=arrTechSortNo]').attr('name', 'arrTechSortNo['+i+']');
            $(v).children('[id^=arrTechSortNo]').attr('id', 'arrTechSortNo['+i+']');
            $(v).children('[id^=arrTechSortNo]').val(i);

        });
    });


    /**
     * Material secundario Up Btn Click Event
     */
    $(document).on('click', '.upBtn', function(){
        var $tr = $(this).closest('tr');
        $tr.prev().before($tr);

        $('[name=tbodyIdx]').each(function(i, v){
            v.textContent=i+1;
        });

        $('.resetMtrlSeq').each(function(i, v){
            $(v).attr('name', 'arrMtrlSeq['+i+']');
            $(v).attr('id', 'arrMtrlSeq['+i+']');
        });

        $('.resetSortNo').each(function(i, v){
            $(v).attr('name', 'arrSortNo['+i+']');
            $(v).attr('id', 'arrSortNo['+i+']');
            $(v).val(i);
        });

        $('.resetMtrlCd').each(function(i, v){
            $(v).attr('name', 'arrMtrlCd['+i+']');
            $(v).attr('id', 'arrMtrlCd['+i+']');
        });

        $('.resetSubMtrlCd').each(function(i, v){
            $(v).attr('name', 'arrSubMtrlCd['+i+']');
            $(v).attr('id', 'arrSubMtrlCd['+i+']');
        });
    });

    /**
     * Material secundario Delete Btn Click Event
     */
    $(document).on('click', '.deleteBtn', function(){
        var btnIdx = $('.deleteBtn').index($(this));
        $('#autoriaBody > tr').eq(btnIdx).remove();

        $('[name=tbodyIdx]').each(function(i, v){
            v.textContent=i+1;
        });

        $('.resetMtrlSeq').each(function(i, v){
            $(v).attr('id', 'arrMtrlSeq['+i+']');
            $(v).attr('name', 'arrMtrlSeq['+i+']');
        });

        $('.resetSortNo').each(function(i, v){
            $(v).attr('name', 'arrSortNo['+i+']');
            $(v).attr('id', 'arrSortNo['+i+']');
            $(v).val(i);
        });

        $('.resetMtrlCd').each(function(i, v){
            $(v).attr('name', 'arrMtrlCd['+i+']');
            $(v).attr('id', 'arrMtrlCd['+i+']');
        });

        $('.resetSubMtrlCd').each(function(i, v){
            $(v).attr('name', 'arrSubMtrlCd['+i+']');
            $(v).attr('id', 'arrSubMtrlCd['+i+']');
        });

        $('#catalogoDeTec').html('');
        $('#addCatalogoDeTec').html('');
        $('#techCd').val('');
    });

    /**
     * techCd Change Event
     */
    var materialIdx = 0;
    $(document).on('change', '#techCd', function(){
        materialIdx = 0;
        $('#catalogoDeTec').html('');
        var _html = '';
        if($('#mtrlCd').val() == '' || $('#mtrlCd').val() == null){
            Common.alert("warning", GLB_MSG2);
            return false;
        }

        /**
         * Material secundario Array
         */
        $('.arrMtrlCd').removeClass('on');
        $('.arrMtrlCd').each(function(i,v){
            var same = 'notSame';
            $('.arrMtrlCd').each(function(ii, vv){
                if($(v).val() == $(vv).val()){
                    if(!$(vv).hasClass('on')){
                        same = 'notSame';
                        $(vv).addClass('on');
                        return false;
                    }else{
                        same = 'same';
                        return false;
                    }
                }else{
                    same = 'notSame';
                    return false;
                }
            });

            if(same == 'notSame'){
                Code.stdSearchCodeList('Y', 'MVB', '031', $(this).val(), '', $('#techCd').val(), $('#classCd').val(), $('#classSpecCd').val(), function(result){
                    result.forEach(function(vv, ii){
                        _html = '';
                        _html += '<tr>';
                        _html +=    '<input type="hidden" id="arrTechCd[]" value="'+vv.stdCd+'" />';
                        _html +=    '<td>'+vv.cdSpnNm+'</td>';
                        _html += '</tr>';
                        $('#catalogoDeTec').append(_html);
                        materialIdx++;
                    });
                });
            }
         });
     });

    /**
     * mtrlBox Change Event
     * Tipo de técnicas, Catalogo de técnicas, Técnicas asignadas  
     */
    $(document).on('change', '.mtrlBox', function(){
        $('#catalogoDeTec').html('');
        $('#addCatalogoDeTec').html('');
        $('#techCd').val('');
    });

    /**
     * addAsignadas click Event
     */
    $(document).on('click', '#addAsignadas', function(){
        if($('#catalogoDeTec>.on').length <= 0){
            Common.alert("warning", GLB_MSG);
            return false;
        }

        $('#catalogoDeTec>.on').each(function(i, v){
            $('#addCatalogoDeTec>tr>[name^="arrTechCd"]').each(function(ii, vv){
                if($(v).children('[id^=arrTechCd]').val() == $(vv).val()){
                    $(v).remove();
                }
            });
            $(v).children('[id^=arrTechCd]').attr('name', 'arrTechCd['+i+']');
            $(v).children('[id^=arrTechCd]').attr('id', 'arrTechCd['+i+']');
        });

        $('#catalogoDeTec>.on').appendTo('#addCatalogoDeTec');
        $('#addCatalogoDeTec>tr').removeClass('on');

        $('#addCatalogoDeTec>tr').each(function(i, v){
            $(v).children('[id^=arrTechCd]').attr('name', 'arrTechCd['+i+']');
            $(v).children('[id^=arrTechCd]').attr('id', 'arrTechCd['+i+']');
            if($(v).children('[name^=arrTechSeq]').length > 0){
                $(v).children('[id^=arrTechSeq]').attr('name', 'arrTechSeq['+i+']');
                $(v).children('[id^=arrTechSeq]').attr('id', 'arrTechSeq['+i+']');
                $(v).children('[id^=arrTechSortNo]').attr('name', 'arrTechSortNo['+i+']');
                $(v).children('[id^=arrTechSortNo]').attr('id', 'arrTechSortNo['+i+']');
                $(v).children('[id^=arrTechSortNo]').val(i);
            }else{
                $(v).append('<input type="hidden" value="" name="arrTechSeq['+i+']" id="arrTechSeq['+i+']" />');
                $(v).append('<input type="hidden" value="'+i+'" name="arrTechSortNo['+i+']" id="arrTechSortNo['+i+']" />');
            }
        });
    });

    /**
     * addAllAsignadas click Event
     */
    $(document).on('click', '#addAllAsignadas', function(){
        if($('#catalogoDeTec>tr').length <= 0){
            Common.alert("warning", GLB_MSG3);
            return false;
        }

        $('#catalogoDeTec>tr').each(function(i, v){
            $('#addCatalogoDeTec>tr>[name^="arrTechCd"]').each(function(ii, vv){
                if($(v).children('[id^=arrTechCd]').val() == $(vv).val()){
                    $(v).remove();
                }
            });
            $(v).children('[id^=arrTechCd]').attr('name', 'arrTechCd['+i+']');
            $(v).children('[id^=arrTechCd]').attr('id', 'arrTechCd['+i+']');
        });
        $('#catalogoDeTec>tr').appendTo('#addCatalogoDeTec');
        $('#addCatalogoDeTec>tr').removeClass('on');

        $('#addCatalogoDeTec>tr').each(function(i, v){
            $(v).children('[id^=arrTechCd]').attr('name', 'arrTechCd['+i+']');
            $(v).children('[id^=arrTechCd]').attr('id', 'arrTechCd['+i+']');
            if($(v).children('[name^=arrTechSeq]').length > 0){
                $(v).children('[id^=arrTechSeq]').attr('name', 'arrTechSeq['+i+']');
                $(v).children('[id^=arrTechSeq]').attr('id', 'arrTechSeq['+i+']');
                $(v).children('[id^=arrTechSortNo]').attr('name', 'arrTechSortNo['+i+']');
                $(v).children('[id^=arrTechSortNo]').attr('id', 'arrTechSortNo['+i+']');
                $(v).children('[id^=arrTechSortNo]').val(i);
            }else{
                $(v).append('<input type="hidden" value="" name="arrTechSeq['+i+']" id="arrTechSeq['+i+']" />');
                $(v).append('<input type="hidden" value="'+i+'" name="arrTechSortNo['+i+']" id="arrTechSortNo['+i+']" />');
            }
        });
    });

    /**
     * outAsignadas click Event
     */
    $(document).on('click', '#outAsignadas', function(){
        if($('#addCatalogoDeTec>.on').length <= 0){
            Common.alert("warning", GLB_MSG);
            return false;
        }

        $('#addCatalogoDeTec>.on').each(function(i, v){
            $('#catalogoDeTec>tr>[id^=arrTechCd]').each(function(ii, vv){
                if($(v).children('[id^=arrTechCd]').val() == $(vv).val()){
                    $(v).remove();
                }
            });
            $(v).children('[id^=arrTechCd]').attr('name', 'arrTechCd['+i+']');
            $(v).children('[id^=arrTechCd]').attr('id', 'arrTechCd['+i+']');
        });
        $('#addCatalogoDeTec>.on').appendTo('#catalogoDeTec');
        $('#catalogoDeTec>tr').removeClass('on');
        $('#catalogoDeTec>tr').each(function(i, v){
            $(v).children('[id^=arrTechCd]').attr('name', '');
            $(v).children('[id^=arrTechCd]').attr('id', 'arrTechCd[]');
            $(v).children('[id^=arrTechSeq]').remove();
            $(v).children('[id^=arrTechSortNo]').remove();
        });


        $('#addCatalogoDeTec>tr').each(function(i, v){
            $(v).children('[id^=arrTechCd]').attr('name', 'arrTechCd['+i+']');
            $(v).children('[id^=arrTechCd]').attr('id', 'arrTechCd['+i+']');
            if($(v).children('[name^=arrTechSeq]').length > 0){
                $(v).children('[id^=arrTechSeq]').attr('name', 'arrTechSeq['+i+']');
                $(v).children('[id^=arrTechSeq]').attr('id', 'arrTechSeq['+i+']');
            }
            if($(v).children('[name^=arrTechSortNo]').length > 0){
                $(v).children('[id^=arrTechSortNo]').attr('name', 'arrTechSortNo['+i+']');
                $(v).children('[id^=arrTechSortNo]').attr('id', 'arrTechSortNo['+i+']');
                $(v).children('[id^=arrTechSortNo]').val(i);
            }
        });
    });

    /**
     * outAllAsignadas click Event
     */
    $(document).on('click', '#outAllAsignadas', function(){
        if($('#addCatalogoDeTec>tr').length <= 0){
            Common.alert("warning", GLB_MSG3);
            return false;
        }

        $('#addCatalogoDeTec>tr').each(function(i, v){
            $('#catalogoDeTec>tr>[id^=arrTechCd]').each(function(ii, vv){
                if($(v).children('[id^=arrTechCd]').val() == $(vv).val()){
                    $(v).remove();
                }
            });
            $(v).children('[id^=arrTechCd]').attr('name', 'arrTechCd['+i+']');
            $(v).children('[id^=arrTechCd]').attr('id', 'arrTechCd['+i+']');
        });
        $('#addCatalogoDeTec>tr').appendTo('#catalogoDeTec');
        $('#catalogoDeTec>tr').removeClass('on');
        $('#catalogoDeTec>tr').each(function(i, v){
            $(v).children('[id^=arrTechCd]').attr('name', '');
            $(v).children('[id^=arrTechCd]').attr('id', 'arrTechCd[]');
            $(v).children('[id^=arrTechSeq]').remove();
            $(v).children('[id^=arrTechSortNo]').remove();
        });

        $('#addCatalogoDeTec>tr').each(function(i, v){
            $(v).children('[id^=arrTechCd]').attr('name', 'arrTechCd['+i+']');
            $(v).children('[id^=arrTechCd]').attr('id', 'arrTechCd['+i+']');
            if($(v).children('[name^=arrTechSeq]').length > 0){
                $(v).children('[id^=arrTechSeq]').attr('name', 'arrTechSeq['+i+']');
                $(v).children('[id^=arrTechSeq]').attr('id', 'arrTechSeq['+i+']');
            }
            if($(v).children('[name^=arrTechSortNo]').length > 0){
                $(v).children('[id^=arrTechSortNo]').attr('name', 'arrTechSortNo['+i+']');
                $(v).children('[id^=arrTechSortNo]').attr('id', 'arrTechSortNo['+i+']');
                $(v).children('[id^=arrTechSortNo]').val(i);
            }
        });
    });


    /**
     * deleteDimensiones Click Event
     */
    $(document).on('click', '.deleteDimensiones', function(){
        var setDataSeq = $(this).data('seq');
        var _this = $(this);
        var type = $(this).data('btnType');
        $.ajax({
            type: "POST",
            url: '/pm/pmRegInsFicha/modifySetData.ajax',
            dataType: "json",
            data: {'seq': setDataSeq, 'mvbGenSeq': $('#mvbGenSeq').val(), 'activeYn': 'N'},
            error: function (request, status, error) {
                alert("La comunicación del servidor falló." + error);
            },
            success: function (data) {
                if (data.result > 0) {
                	var $tbody = $(_this).closest('tbody');
                	
                    $(_this).closest('tr').remove();
                    $('[name=' + type + 'dimTbodyIdx]').each(function (i, v) {
                        v.textContent = i + 1;
                    });
                    
                    if($tbody.find('tr').length == 0){
                    	if(type == 'sub'){
                    		$tbody.append('<tr id="sub_tr_none"><td colspan="10"><div class="dataNone2"><i>' + GLB_MSG3 + '</i></div></td></tr>');
                    	}else{
                    		$tbody.append('<tr id="tr_none"><td colspan="10"><div class="dataNone2"><i>' + GLB_MSG3 + '</i></div></td></tr>');
                    	}
                    }
                }
            }
        });
    });

    /**
     * dimensionesBtn Click Event
     */
    $(document).on('click', '.dimensionesBtn', function(){
        var type = $(this).data('btnType');
        $('.'+type+'dimensionesBtn').html('<i class="xi-plus-square-o"></i> Agregar');
        
        if(type == 'sub'){
        	$('#sub_tr_none').remove();
        }else{
        	$('#tr_none').remove();	
        }
        
        var _html = $('#'+type+'dimensionesTbody').html();
        var index = $('#dimensionesTbody>tr').length+$('#subdimensionesTbody>tr').length;
        var tbodyIdx = $('#'+type+'dimensionesTbody>tr').length;
        var stdCd = '';
        var setDataSeq = $('#'+type+'setDataSeq').val();
        if(type == 'sub'){
            stdCd = 'PMB012002';
        }else{
            if($('#classSpecCd').val() != '00500001'){
                if (setDataSeq == '') {
                    if ($('#dimensionesTbody>tr').length >= $('#setPieceQnt').val()) {
                        Common.alert("warning", overMax);
                        return false;
                    }
                }
            }
            stdCd = 'PMB012001';
        }

        if($('#setPieceQnt').val() > 1){
	        if($('#'+type+'dimNm').val() == '' && $('#'+type+'dimHeight').val() == '' && $('#'+type+'dimWidth').val() == '' && $('#'+type+'dimLength').val() == '' &&
	        		$('#'+type+'dimDepth').val() == '' && $('#'+type+'dimDiameter').val() == '' && $('#'+type+'dimThickness').val() == '' && $('#'+type+'dimWeight').val() == ''){
	            Common.alert("warning", errReferencia);
	            return false;
	        }
        }else{
        	if($('#classSpecCd').val() == '00500001'){
        		if($('#'+type+'dimNm').val() == '' && $('#'+type+'dimHeight').val() == '' && $('#'+type+'dimWidth').val() == '' && $('#'+type+'dimLength').val() == '' &&
    	        		$('#'+type+'dimDepth').val() == '' && $('#'+type+'dimDiameter').val() == '' && $('#'+type+'dimThickness').val() == '' && $('#'+type+'dimWeight').val() == ''){
    	            Common.alert("warning", errReferencia);
    	            return false;
    	        }
        	}else{
	        	if($('#'+type+'dimHeight').val() == '' && $('#'+type+'dimWidth').val() == '' && $('#'+type+'dimLength').val() == '' &&
		        		$('#'+type+'dimDepth').val() == '' && $('#'+type+'dimDiameter').val() == '' && $('#'+type+'dimThickness').val() == '' && $('#'+type+'dimWeight').val() == ''){
		            Common.alert("warning", errReferencia);
		            return false;
		        }
        	}
        }
        /*
        if($('#'+type+'dimHeight').val() == ''){
            Common.alert("warning", errAlto);
            return false;
        }
        if($('#'+type+'dimWidth').val() == ''){
            Common.alert("warning", errAncho);
            return false;
        }
        if($('#'+type+'dimLength').val() == ''){
            Common.alert("warning", errLargo);
            return false;
        }
        if($('#'+type+'dimDepth').val() == ''){
            Common.alert("warning", errFondo);
            return false;
        }
        if($('#'+type+'dimDiameter').val() == ''){
            Common.alert("warning", errDiametro);
            return false;
        }
        if($('#'+type+'dimThickness').val() == ''){
            Common.alert("warning", errEspesor);
            return false;
        }
        if($('#'+type+'dimWeight').val() == ''){
            Common.alert("warning", errPeso);
            return false;
        }
        */
        if($('#'+type+'dimHeight').val() == ''){
        	$('#'+type+'dimHeight').val('0');
        }
        if($('#'+type+'dimWidth').val() == ''){
        	$('#'+type+'dimWidth').val('0');
        }
        if($('#'+type+'dimLength').val() == ''){
        	$('#'+type+'dimLength').val('0');
        }
        if($('#'+type+'dimDepth').val() == ''){
        	$('#'+type+'dimDepth').val('0');
        }
        if($('#'+type+'dimDiameter').val() == ''){
        	$('#'+type+'dimDiameter').val('0');
        }
        if($('#'+type+'dimThickness').val() == ''){
        	$('#'+type+'dimThickness').val('0');
        }
        if($('#'+type+'dimWeight').val() == ''){
        	$('#'+type+'dimWeight').val('0');
        }

        if($('#'+type+'dimHeightDecimal').val() == ''){
            $('#'+type+'dimHeightDecimal').val('00');
        }

        if($('#'+type+'dimWidthDecimal').val() == ''){
            $('#'+type+'dimWidthDecimal').val('00');
        }

        if($('#'+type+'dimLengthDecimal').val() == ''){
            $('#'+type+'dimLengthDecimal').val('00');
        }
        if($('#'+type+'dimDepthDecimal').val() == ''){
            $('#'+type+'dimDepthDecimal').val('00');
        }
        if($('#'+type+'dimDiameterDecimal').val() == ''){
            $('#'+type+'dimDiameterDecimal').val('00');
        }
        if($('#'+type+'dimThicknessDecimal').val() == ''){
            $('#'+type+'dimThicknessDecimal').val('00');
        }
        if($('#'+type+'dimWeightDecimal').val() == ''){
            $('#'+type+'dimWeightDecimal').val('00');
        }

        var bodyLength = $('[name='+type+'dimTbodyIdx]').length
        var mainYn = 'N';
        
        var dimNm = "";
        if($('#setPieceQnt').val() > 1){
        	dimNm = $('#'+type+'dimNm').val();
        }else{
        	if($('#'+type+'dimNm').val() != ""){
        		dimNm = $('#'+type+'dimNm').val();
        	}
        }
        var dimHeight = $('#'+type+'dimHeight').val() + '.' + $('#'+type+'dimHeightDecimal').val();
        var dimWidth = $('#'+type+'dimWidth').val() + '.' + $('#'+type+'dimWidthDecimal').val();
        var dimLength = $('#'+type+'dimLength').val() + '.' + $('#'+type+'dimLengthDecimal').val();
        var dimDepth = $('#'+type+'dimDepth').val() + '.' + $('#'+type+'dimDepthDecimal').val();
        var dimDiameter = $('#'+type+'dimDiameter').val() + '.' + $('#'+type+'dimDiameterDecimal').val();
        var dimThickness = $('#'+type+'dimThickness').val() + '.' + $('#'+type+'dimThicknessDecimal').val();
        var dimWeight = $('#'+type+'dimWeight').val() + '.' + $('#'+type+'dimWeightDecimal').val();
        if(bodyLength == 0){
            mainYn = 'Y';
        }
            $.ajax({
            type : "POST",
            url : '/pm/pmRegInsFicha/modifySetData.ajax',
            dataType : "json",
            data : {'seq' : setDataSeq,'mvbGenSeq' : $('#mvbGenSeq').val(), 'mainYn' : mainYn, 'setTp' : stdCd, 'dimNm' : dimNm, 'dimHeight' : dimHeight, 'dimWidth' : dimWidth, 'dimLength' : dimLength, 'dimDepth' : dimDepth, 'dimDiameter' : dimDiameter, 'dimThickness' : dimThickness, 'dimWeight' : dimWeight},
            error : function(request, status, error) {
                alert("La comunicación del servidor falló."+error);
            },
            success : function(data) {
                if(data.result > 0){
                    var setDataSeq = data.targetSeq;
                    if ($('#' + type + 'modifyIdx').val() != '' && $('#' + type + 'modifyIdx').val() != null) {
                        index = $('#' + type + 'modifyIdx').val();
                        _html = '';
                        _html += '<input type="hidden" name="arrSeq[' + index + ']" id="arrSeq[' + index + ']" value="' + setDataSeq + '" />';
                        _html += '<input type="hidden" name="arrSetTp[' + index + ']" id="arrSetTp[' + index + ']" value="' + stdCd + '" />';
                        _html += '<input type="hidden" name="arrDimNm[' + index + ']" id="arrDimNm[' + index + ']" value="' + $('#' + type + 'dimNm').val() + '" />';
                        _html += '<input type="hidden" name="arrDimHeight[' + index + ']" id="arrDimHeight[' + index + ']" value="' + $('#' + type + 'dimHeight').val() + '.' + $('#' + type + 'dimHeightDecimal').val() + '" />';
                        _html += '<input type="hidden" name="arrDimWidth[' + index + ']" id="arrDimWidth[' + index + ']" value="' + $('#' + type + 'dimWidth').val() + '.' + $('#' + type + 'dimWidthDecimal').val() + '" />';
                        _html += '<input type="hidden" name="arrDimLength[' + index + ']" id="arrDimLength[' + index + ']" value="' + $('#' + type + 'dimLength').val() + '.' + $('#' + type + 'dimLengthDecimal').val() + '" />';
                        _html += '<input type="hidden" name="arrDimDepth[' + index + ']" id="arrDimDepth[' + index + ']" value="' + $('#' + type + 'dimDepth').val() + '.' + $('#' + type + 'dimDepthDecimal').val() + '" />';
                        _html += '<input type="hidden" name="arrDimDiameter[' + index + ']" id="arrDimDiameter[' + index + ']" value="' + $('#' + type + 'dimDiameter').val() + '.' + $('#' + type + 'dimDiameterDecimal').val() + '" />';
                        _html += '<input type="hidden" name="arrDimThickness[' + index + ']" id="arrDimThickness[' + index + ']" value="' + $('#' + type + 'dimThickness').val() + '.' + $('#' + type + 'dimThicknessDecimal').val() + '" />';
                        _html += '<input type="hidden" name="arrDimWeight[' + index + ']" id="arrDimWeight[' + index + ']" value="' + $('#' + type + 'dimWeight').val() + '.' + $('#' + type + 'dimWeightDecimal').val() + '" />';
                        _html += '<td name="' + type + 'dimTbodyIdx"></td>';
                        _html += '<td>' + $('#' + type + 'dimNm').val() + '</td>';
                        _html += '<td>' + $('#' + type + 'dimHeight').val() + '.' + $('#' + type + 'dimHeightDecimal').val() + '</td>';
                        _html += '<td>' + $('#' + type + 'dimWidth').val() + '.' + $('#' + type + 'dimWidthDecimal').val() + '</td>';
                        _html += '<td>' + $('#' + type + 'dimLength').val() + '.' + $('#' + type + 'dimLengthDecimal').val() + '</td>';
                        _html += '<td>' + $('#' + type + 'dimDepth').val() + '.' + $('#' + type + 'dimDepthDecimal').val() + '</td>';
                        _html += '<td>' + $('#' + type + 'dimDiameter').val() + '.' + $('#' + type + 'dimDiameterDecimal').val() + '</td>';
                        _html += '<td>' + $('#' + type + 'dimThickness').val() + '.' + $('#' + type + 'dimThicknessDecimal').val() + '</td>';
                        _html += '<td>' + $('#' + type + 'dimWeight').val() + '.' + $('#' + type + 'dimWeightDecimal').val() + '</td>';
                        _html += '<td>'
                        _html += '<div class="dt-list-control">'
                        _html += '<span class="btn_ico btn_basic" data-toggle="tooltip" data-placement="top" title="' + tooltipEdit + '"><i data-modify-idx="' + index + '" data-btn-type="' + type + '" data-seq="' + setDataSeq + '"  class="xi-pen modifyDimensiones"></i></span>'
                        _html += '<span class="btn_ico btn_basic" data-toggle="tooltip" data-placement="top" title="' + tooltipDelete + '"><i class="xi-trash deleteDimensiones" data-btn-type="' + type + '" data-seq="' + setDataSeq + '"></i></span>'
                        _html += '</div>'
                        _html += '</td>';
                        $('#tr_' + $('#' + type + 'modifyIdx').val()).html(_html);

                        $('#' + type + 'modifyIdx').val('');
                    } else {
                        _html += '<tr id="tr_' + index + '">';
                        _html += '<input type="hidden" name="arrSeq[' + index + ']" id="arrSeq[' + index + ']" value="' + setDataSeq + '" />';
                        _html += '<input type="hidden" name="arrSetTp[' + index + ']" id="arrSetTp[' + index + ']" value="' + stdCd + '" />';
                        _html += '<input type="hidden" name="arrDimNm[' + index + ']" id="arrDimNm[' + index + ']" value="' + $('#' + type + 'dimNm').val() + '" />';
                        _html += '<input type="hidden" name="arrDimHeight[' + index + ']" id="arrDimHeight[' + index + ']" value="' + $('#' + type + 'dimHeight').val() + '.' + $('#' + type + 'dimHeightDecimal').val() + '" />';
                        _html += '<input type="hidden" name="arrDimWidth[' + index + ']" id="arrDimWidth[' + index + ']" value="' + $('#' + type + 'dimWidth').val() + '.' + $('#' + type + 'dimWidthDecimal').val() + '" />';
                        _html += '<input type="hidden" name="arrDimLength[' + index + ']" id="arrDimLength[' + index + ']" value="' + $('#' + type + 'dimLength').val() + '.' + $('#' + type + 'dimLengthDecimal').val() + '" />';
                        _html += '<input type="hidden" name="arrDimDepth[' + index + ']" id="arrDimDepth[' + index + ']" value="' + $('#' + type + 'dimDepth').val() + '.' + $('#' + type + 'dimDepthDecimal').val() + '" />';
                        _html += '<input type="hidden" name="arrDimDiameter[' + index + ']" id="arrDimDiameter[' + index + ']" value="' + $('#' + type + 'dimDiameter').val() + '.' + $('#' + type + 'dimDiameterDecimal').val() + '" />';
                        _html += '<input type="hidden" name="arrDimThickness[' + index + ']" id="arrDimThickness[' + index + ']" value="' + $('#' + type + 'dimThickness').val() + '.' + $('#' + type + 'dimThicknessDecimal').val() + '" />';
                        _html += '<input type="hidden" name="arrDimWeight[' + index + ']" id="arrDimWeight[' + index + ']" value="' + $('#' + type + 'dimWeight').val() + '.' + $('#' + type + 'dimWeightDecimal').val() + '" />';
                        _html += '<td name="' + type + 'dimTbodyIdx"></td>';
                        _html += '<td>' + $('#' + type + 'dimNm').val() + '</td>';
                        _html += '<td>' + $('#' + type + 'dimHeight').val() + '.' + $('#' + type + 'dimHeightDecimal').val() + '</td>';
                        _html += '<td>' + $('#' + type + 'dimWidth').val() + '.' + $('#' + type + 'dimWidthDecimal').val() + '</td>';
                        _html += '<td>' + $('#' + type + 'dimLength').val() + '.' + $('#' + type + 'dimLengthDecimal').val() + '</td>';
                        _html += '<td>' + $('#' + type + 'dimDepth').val() + '.' + $('#' + type + 'dimDepthDecimal').val() + '</td>';
                        _html += '<td>' + $('#' + type + 'dimDiameter').val() + '.' + $('#' + type + 'dimDiameterDecimal').val() + '</td>';
                        _html += '<td>' + $('#' + type + 'dimThickness').val() + '.' + $('#' + type + 'dimThicknessDecimal').val() + '</td>';
                        _html += '<td>' + $('#' + type + 'dimWeight').val() + '.' + $('#' + type + 'dimWeightDecimal').val() + '</td>';
                        _html += '<td>'
                        _html += '<div class="dt-list-control">'
                        _html += '<span class="btn_ico btn_basic" data-toggle="tooltip" data-placement="top" title="' + tooltipEdit + '"><i data-modify-idx="' + index + '" data-btn-type="' + type + '" data-seq="' + setDataSeq + '" class="xi-pen modifyDimensiones"></i></span>'
                        _html += '<span class="btn_ico btn_basic" data-toggle="tooltip" data-placement="top" title="' + tooltipDelete + '"><i class="xi-trash deleteDimensiones" data-btn-type="' + type + '" data-seq="' + setDataSeq + '"></i></span>'
                        _html += '</div>'
                        _html += '</td>';
                        _html += '</tr>';
                        $('#' + type + 'dimensionesTbody').html(_html);
                    }

                    $('[name=' + type + 'dimTbodyIdx]').each(function (i, v) {
                        v.textContent = i + 1;
                    });

                    $('.' + type + 'dimensiones').val('');
                    $('#' + type + 'setDataSeq').val('');
                }

            }
        });
    });
    /**
     * isNumber keyup Event
     */
    $(document).on('keyup', '.isNumber', function(){
        $(this).val($(this).val().replace(/[^0-9]/gi, ''));

    });
    /**
     * isComNumber keyup Event
     */
    $(document).on('keyup', '.isComNumber', function(){
        $(this).val($(this).val().replace(/[^0-9.]/gi, ''));

    });
    /**

     * modifyDimensiones click Event
     */
    $(document).on('click', '.modifyDimensiones', function(){
        var btnType = $(this).data('btnType');
        $('#'+btnType+'modifyIdx').val($(this).data('modifyIdx'));
        var arrDimNm = "";
        if($('#setPieceQnt').val() > 1){
        	arrDimNm = $(this).closest('tr').children('[name^="arrDimNm"]').val();
        }else{
        	if($(this).closest('tr').children('[name^="arrDimNm"]').val() != ""){
        		arrDimNm = $(this).closest('tr').children('[name^="arrDimNm"]').val();
        	}
        }
        
        var arrDimHeight = $(this).closest('tr').children('[name^="arrDimHeight"]').val();
        var arrDimWidth = $(this).closest('tr').children('[name^="arrDimWidth"]').val();
        var arrDimLength = $(this).closest('tr').children('[name^="arrDimLength"]').val();
        var arrDimDepth = $(this).closest('tr').children('[name^="arrDimDepth"]').val();
        var arrDimDiameter = $(this).closest('tr').children('[name^="arrDimDiameter"]').val();
        var arrDimThickness = $(this).closest('tr').children('[name^="arrDimThickness"]').val();
        var arrDimWeight = $(this).closest('tr').children('[name^="arrDimWeight"]').val();
        var dataSeq = $(this).closest('tr').children('[name^="arrSeq"]').val();

        if($('#setPieceQnt').val() > 1){
        	$('#'+btnType+'dimNm').val(arrDimNm);
        }else{
        	if(arrDimNm != ""){
        		$('#'+btnType+'dimNm').val(arrDimNm);
        	}
        }
        $('#'+btnType+'dimHeight').val(arrDimHeight.split('.')[0]);
        $('#'+btnType+'dimHeightDecimal').val(arrDimHeight.split('.')[1]);
        $('#'+btnType+'dimWidth').val(arrDimWidth.split('.')[0]);
        $('#'+btnType+'dimWidthDecimal').val(arrDimWidth.split('.')[1]);
        $('#'+btnType+'dimLength').val(arrDimLength.split('.')[0]);
        $('#'+btnType+'dimLengthDecimal').val(arrDimLength.split('.')[1]);
        $('#'+btnType+'dimDepth').val(arrDimDepth.split('.')[0]);
        $('#'+btnType+'dimDepthDecimal').val(arrDimDepth.split('.')[1]);
        $('#'+btnType+'dimDiameter').val(arrDimDiameter.split('.')[0]);
        $('#'+btnType+'dimDiameterDecimal').val(arrDimDiameter.split('.')[1]);
        $('#'+btnType+'dimThickness').val(arrDimThickness.split('.')[0]);
        $('#'+btnType+'dimThicknessDecimal').val(arrDimThickness.split('.')[1]);
        $('#'+btnType+'dimWeight').val(arrDimWeight.split('.')[0]);
        $('#'+btnType+'dimWeightDecimal').val(arrDimWeight.split('.')[1]);

        $('#'+btnType+'setDataSeq').val(dataSeq);
        $('.'+btnType+'btnType').html('Modificar');
    });

    /**
     * Elementos adicionales click Event
     */
    $(document).on('click', '[name=addElmYn]', function(){
       if($(this).val() == 'Y'){
           $('.elementosAdicionales').removeClass('hide');
       }else{
           $('.elementosAdicionales').addClass('hide');
       }
    });

    /**
     * crnlDfmtYnCheck click Event
     */
    $(document).on('click', '#crnlDfmtYnCheck', function(){
        if($(this).is(':checked')){
            $('#cpCrnlDfmtYn').val('Y');
        }else{
            $('#cpCrnlDfmtYn').val('N');
        }
    });

    /**
     * boneShapeYnCheck click Event
     */
    $(document).on('click', '#boneShapeYnCheck', function(){
        if($(this).is(':checked')){
            $('#ptAbBoneShapeYn').val('Y');
        }else{
            $('#ptAbBoneShapeYn').val('N');
        }
    });

    /**
     * traumaYnCheck click Event
     */
    $(document).on('click', '#traumaYnCheck', function(){
        if($(this).is(':checked')){
            $('#ptTraumaYn').val('Y');
        }else{
            $('#ptTraumaYn').val('N');
        }
    });

    /**
     * porosityYnCheck click Event
     */
    $(document).on('click', '#porosityYnCheck', function(){
        if($(this).is(':checked')){
            $('#ptPorosityYn').val('Y');
        }else{
            $('#ptPorosityYn').val('N');
        }
    });

    /**
     * dentalPlgsYnCheck click Event
     */
    $(document).on('click', '#dentalPlgsYnCheck', function(){
        if($(this).is(':checked')){
            $('#ptDentalPlgsYn').val('Y');
        }else{
            $('#ptDentalPlgsYn').val('N');
        }
    });


    /**
     * regist Click Event
     */
    $(document).on('click', '#submitBtn', function(){

        tinyMCE.triggerSave();
        //Material Principal Validatior
        if($('#classSpecCd').val() == '00500002' || $('#classSpecCd').val() == '00500003' || $('#classSpecCd').val() == '00500004' || $('#classSpecCd').val() == '00500005' || $('#classSpecCd').val() == '00500006' || $('#classSpecCd').val() == '00500007' || $('#classSpecCd').val() == '00500008' || $('#classSpecCd').val() == '00500009' || $('#classSpecCd').val() == '00500010' || $('#classSpecCd').val() == '00500011'){
            if(!Valid.require('mtrlCd'));
            if(!Valid.require('tpMtrlCd'));
            if($('#addCatalogoDeTec>tr').length == 0){
                Common.alert("warning", errTenic);
                return false;
            }
        }

        if($('#dimensionesTbody>tr').length <= 0){
            Common.alert("warning", errDimensiones);
            return false;
        }else{
        	if($('#tr_none').length > 0){
        		Common.alert("warning", errDimensiones);
                return false;
        	}
        }

        if($('#classSpecCd').val() != '00500001'){
	        if ($('#dimensionesTbody>tr').length > $('#setPieceQnt').val()) {
	            Common.alert("warning", overMax);
	            return false;
	        }
        }
        
        if ($('#spnTechDscpt').val() == "") {
            Common.alert("warning", errDscpt);
            return false;
        }


        $('.hide').remove();
        var form = Common.serialize($('#major'));
        Ajax.request('/pm/pmRegInsFicha/modifyDatosTecnicos.ajax', form, function(data){
            if(data.result > 0){
                Common.alert("success", data.successMessage);
                location.reload();
            }

            if(data.errorCode == '-1'){
                Common.alert("warning", data.errorMessage);
                return false;
            }
        }, '');
    });


    $('.originalImgPop').on('click', function () {
 
    	var srcLink = $('.imgSliderViewSlide .slick-current.slick-active img').attr('src');
    	if(srcLink != undefined && srcLink != ''){
    		if(srcLink.indexOf("no_image_big.png") > 0){
        		alert('El archivo no existe y no se puede ver con el visor.');
        		return false;
        	}
    	}else{
    		alert('No hay imagen registrada');
    		return false;
    	}
    	
        var activeImage = $('.slick-current').find('img').attr('src');
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

        var allIamgeSrc = $('.imgSliderViewSlide').find('img').attr('src');
        var url = '/pm/pmRegInsFicha/getImageViewer.do';
        var title = 'ImageViewer';
        var status = 'toolbar=no,directories=no,scrollbars=no,resizable=no,status=no,menubar=no,width=600, height=550, resizable = no, scrollbars = no';

        window.open('', title, status);
        $('#imgViewFrm').attr('action', url);
        $('#imgViewFrm').attr('method', 'post');
        $('#imgViewFrm').attr('target', 'ImageViewer');
        $('#imgViewFrm').submit();
    });


});