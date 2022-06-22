// ================================== COMMON ================================== //

//image slider fixed
$(function(){
    if($('.imgSliderFixed').length > 0){
        $('.imgSliderFixed').fixTo('.imgSliderFixArea', {top: 0, useNativeSticky:true});
    }
});

// TITLE TOGGLE
$('.titleWrap').on('click',function(){
    var el = $(this).parent().children('.tableWrap')
    var icon = el.parent().children('.titleWrap').children('i');
    if(el.hasClass('on')){
        el.stop().slideUp(200);
        el.removeClass('on');
        icon.removeClass('xi-angle-up-min');
        icon.addClass('xi-angle-down-min');
    }else{
        el.stop().slideDown(200);
        el.addClass('on');
        icon.removeClass('xi-angle-down-min');
        icon.addClass('xi-angle-up-min');
    }
});
// DATE PICKER
$('.date input').datetimepicker({
    format: 'DD/MM/YYYY',
    widgetPositioning:{horizontal: 'auto', vertical: 'bottom'}
});
$('.dateTop input').datetimepicker({
    format: 'DD/MM/YYYY',
    widgetPositioning:{horizontal: 'auto', vertical: 'top'}
});

$('.dateTYPE2 input').datetimepicker({
    format: 'YYYY-MM-DD',
    widgetPositioning:{horizontal:'auto', vertical:'top'}
});
$('.date .btn, .datepickerBtn').click(function(){
    $(this).prev().focus();
    return false; 
});

$('.mm_datepicker .datepicker_input').datetimepicker({
    format: 'MM',
    widgetPositioning:{horizontal:'auto', vertical:'bottom'}
});
$('.yyyy_datepicker .datepicker_input').datetimepicker({
    format: 'YYYY',
    widgetPositioning:{horizontal:'auto', vertical:'bottom'}
});

// FILE SELECT
$('.imgForm_fileBtn').on('click', function(){
    var $this = $(this)
    $this.closest('.imgUploadArea').find('.imgForm_file').trigger('click');
});
// GET FILE NAME
$(".imgForm_file").on('change', function(){
    var loc = $(this).val().replace('C:\\fakepath\\', '');
    $(this).closest('.imgUploadArea').find('.imgForm_fileName').val(loc);
});


var $Target = $('.dt-scroll'), $Height = 100;
$Target.DataTable({"destroy":true,"lengthChange":false,"paging":false,"autoWidth":false,"bInfo":false,"searching":false,"order":[],
    "columnDefs": [{"targets":'no-sort',"orderable":false}],
    scrollY: $Height, 
    fnDrawCallback: function (oSettings) {
        var $Wrapper = $Target.closest('.dataTables_wrapper'),      
            $SlimScroll = $Wrapper.find('.dataTables_scrollBody'),     
            $HeadInner = $Wrapper.find('.dataTables_scrollHeadInner'),  
            $DTables = $Wrapper.find('.dataTable');                     

        $SlimScroll.slimScroll({height:$Height});
        $HeadInner.css({'padding-right':'0', 'width':'100%'})
        $DTables.css('width', '100%');
    }
});

//------2110630테이블 높이 맞춤 추가 작업-----//
var $Target = $('.dt-scroll_H'), $Height = 184;
$Target.DataTable({"destroy":true,"lengthChange":false,"paging":false,"autoWidth":false,"bInfo":false,"searching":false,"order":[],
    "columnDefs": [{"targets":'no-sort',"orderable":false}],
    scrollY: $Height, 
    fnDrawCallback: function (oSettings) {
        var $Wrapper = $Target.closest('.dataTables_wrapper'),      
            $SlimScroll = $Wrapper.find('.dataTables_scrollBody'),     
            $HeadInner = $Wrapper.find('.dataTables_scrollHeadInner'),  
            $DTables = $Wrapper.find('.dataTable');                     

        $SlimScroll.slimScroll({height:$Height});
        $HeadInner.css({'padding-right':'0', 'width':'100%'})
        $DTables.css('width', '100%');
    }
});
var $Target = $('.dt-scroll_M'), $Height = 130;
$Target.DataTable({"destroy":true,"lengthChange":false,"paging":false,"autoWidth":false,"bInfo":false,"searching":false,"order":[],
    "columnDefs": [{"targets":'no-sort',"orderable":false}],
    scrollY: $Height, 
    fnDrawCallback: function (oSettings) {
        var $Wrapper = $Target.closest('.dataTables_wrapper'),      
            $SlimScroll = $Wrapper.find('.dataTables_scrollBody'),     
            $HeadInner = $Wrapper.find('.dataTables_scrollHeadInner'),  
            $DTables = $Wrapper.find('.dataTable');                     

        $SlimScroll.slimScroll({height:$Height});
        $HeadInner.css({'padding-right':'0', 'width':'100%'})
        $DTables.css('width', '100%');
    }
});



$('.dataTable2').DataTable({"order":[], "paging":false, "info":false, "searching":false, "columnDefs":[{"targets":'no-sort', "orderable":false}]});

$('.editList, .editList3').slimScroll({height:218});

$('.editList2').slimScroll({height:320});

$('.editList4').slimScroll({height:30*15}); 

$('.editList5').slimScroll({height:298});

$('.editList6').slimScroll({height:148});

$('.ovf-modal').slimScroll({height:600});


$('.ist_scrollRow5').slimScroll({height:30*5})
$('.ist_scrollRow10').slimScroll({height:30*10});
$('.ist_scrollRow15').slimScroll({height:30*15});

$(document).on('click', '.editList tr, .editList3 tr',function(){
    $(this).toggleClass('on');
});

/* tab2 ------------------------------------------------------------------------- */
//tabbed content
$(".tab2_content:first").show();

$('.tabMenuWrap li').on('click', function(){
    var $this = $(this);
    $('.tab2 ul li').removeClass('active');
    $('.tabMenu_content').stop().fadeOut(300);
    $this.addClass('active');
    $('#'+$this.attr('rel')).stop().delay(300).fadeIn();
});


/* Extra class "tab_last"
   to add border to right side
   of last tab */
   $('.tab2 ul li').last().addClass("tab_last");

   /* popup */
   function openPopup(id){
    $(".modal").hide();
    $("#"+id).show();
    $("#"+id).layerCenter();
}

$(".popClose").click(function(){
    $(".modal").hide();
});


/* popup drag */
$(".modal").draggable({
    handle:'.modal-header',
    containment:'html',
    scroll:false,
    drag: function(){
        var $this = $(this);
        var chkSize = $this.outerHeight()/2; 
        var modalHeight = $this.position().top; 
        if(chkSize >= modalHeight){
            var overSizeReset = chkSize - modalHeight + 1;
            $this.css({top:modalHeight+overSizeReset});
            return false;
        }
    }
});


jQuery.fn.layerCenter = function (){
    var $this = $(this);
    var $window = $(window);
    this.css("position","fixed");
    this.css("margin-Top", "-" + ($this.outerHeight() / 2) + "px");
    this.css("top", 50 + "%");
    this.css("left", Math.max(0, (($window.width() - $this.outerWidth()) / 2) + $window.scrollLeft()) + "px");
    return this;
}


$('.layerTooltipBtn').on('click', function(){
    var tooltip = $('.' + $(this).data('layer-tool-tip'));
    if(tooltip.hasClass('nHide')){
        tooltip.fadeIn(200).delay(250).removeClass('nHide');
    }
});

$('.layerTooltip .btn_close').on('click', function(){
    var layer = $(this).closest('.layerTooltip');
    layer.fadeOut(200);
    layer.delay(250).addClass('nHide');
});

$('.layerTooltip').on('mouseenter', '.layerTooltip_hover', function(){
    $(this).addClass('active');
});
$('.layerTooltip').on('mouseleave', '.layerTooltip_hover', function(){
    $(this).removeClass('active');
});

$('div.favorit li a').hover(function(){
    $(this).addClass('active');
}, function(){
    $(this).removeClass('active');
});

/* tooltip */
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
});



/* footer lang */
$(".lang").click(function(event){
    event.stopPropagation();
    if($('.lang').hasClass("active")){
        $('.lang').removeClass("active");
    }else{
        $('.lang').addClass("active");
    }
});

$(function (event){
    $('body').click(function(){
        if($('.lang').hasClass("active")){
            $('.lang').removeClass("active");
        }
    });
});


$(window).scroll(function() {
    if ($(window).scrollTop() == $(document).height() - $(window).height()) {
        $('.alertWrap').addClass("bot")
    }else{
        $('.alertWrap').removeClass("bot");
    }
});





/* ========================================================================= */
/* IMAGE SLIDER | 20190410 LHR */
/* ========================================================================= */
$(document).ready(function(){
    if($('.imgSliderViewSlide').length > 0){
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
        
        
        $(document).on('click', '.originalImgPop', function(e){
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
        	
        	
        	var $sliderWrap = $(this).parent();
        	var $slider = $sliderWrap.find('.slick-slider');
        	var activeSlideIndex = $slider.slick('slickCurrentSlide');
        	
        	var arrSlideImg = [];
        	$slider.find('.slick-slide').each(function(slideIdx, slideEl){
        		var $img = $(slideEl).find('img');
        		var imgData = $img.data();
        		if(imgData.hasOwnProperty('imgPath') && imgData.hasOwnProperty('imgChgNm')){
        			var imgSrc = imgData.imgPath + '/' + imgData.imgChgNm;
            		arrSlideImg.push({
            			src: imgSrc.replace(/\/+/g, '/'),
            			dataSlickIndex: slideIdx
            		});	
        		}
        	});
            
            var url = '/pm/pmRegInsFicha/getImageViewer.do';
            var title = 'ImageViewer';
            var position = Common.setWindowCenter(1300, 800);
            var status = 'toolbar=no,directories=no,scrollbars=no,resizable=no,status=no,menubar=no, left='+position.setWidth+', top='+position.setHeight+', width=1300, height=800, resizable=no, scrollbars=no';
            window.open('', title, status);
            
            var form = document.getElementById('imgViewFrm');
        	form.action = url;
        	form.method = 'POST';
        	form.target = 'ImageViewer';
        	form.elements.activeImage.value = arrSlideImg[activeSlideIndex].src;
        	form.elements.activeImageIndex.value = activeSlideIndex;
        	form.elements.imageAtachCnt.value = arrSlideImg.length;
        	form.elements.imageAtachObject.value = JSON.stringify(arrSlideImg);
        	form.submit();
        	
        	e.preventDefault();
    		return false;
        });
        
    }
});




(function(tinymce){
	if(!!!tinymce) return false;
	var einit = tinymce.init;
	tinymce.init = function(config){
		var fnSetUp = config.setup || function() {};
		var sizer = null;
		
		var fnMakeSizer = function(editor) {
			var fnSizerUpdate = function(e){
				var $body = editor.$('.mce-content-body');
				var content = editor.getContent({format: 'text'});
	        	if(content == '\n') content = '';
		        
		        sizer.text(content.length + ' / ' + editor.maxLength);
		        
		        if (content.length > editor.maxLength) {
		        	$body.addClass("sizer-length-over");
		        	sizer.addClass("sizer-length-over");
		        	Common.alert('warning', 'can not be greater than ' + editor.maxLength + ' characters.');

		        } else {
		        	$body.removeClass("sizer-length-over");
		        	sizer.removeClass("sizer-length-over");
		        }
	        }
			
	        var statusbar = editor.theme.panel && editor.theme.panel.find('#statusbar')[0];
	        if (statusbar) {
	        	statusbar.insert({
	                type: 'label',
	                classes: 'wordcount' //this puts it on the right
	            }, 0);

	            //cache the newly created element
	            sizer = statusbar.find('.wordcount')
	        }
	        
	        fnSizerUpdate();
	        
	        editor.on('keyup change', fnSizerUpdate);
	        
	        var allowedKeys = [8, 13, 16, 17, 18, 20, 33, 34, 35, 36, 37, 38, 39, 40, 46];
            editor.on('keydown', function(e) {
                if (allowedKeys.indexOf(e.keyCode) != -1) return true;
                
                var content = editor.getContent({format: 'text'});
	        	if(content == '\n') content = '';
	        	
                if (content.length >= editor.maxLength) {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }
                return true;
            });
	    }
		config.setup = function (editor){
	    	var textAreaId = editor.id;
	        var maxLength = document.getElementById(textAreaId).getAttribute('maxlength') || 0;
	        if(maxLength > 0){
	        	editor.maxLength = maxLength;
	        	editor.settings.statusbar = true;
	        	editor.settings.elementpath = false;
	        	editor.settings.branding = false;
	        	editor.settings.resize = false;
	        	editor.settings.content_style = '.sizer-length-over {color: #d53337 !important;}';
	        	editor.settings.init_instance_callback = fnMakeSizer;
	        	
	        	arguments[0] = editor;
	        }

			fnSetUp.apply(this, arguments);
		};
		
		arguments[0] = config;
		einit.apply(this, arguments);
	}
})(window.tinymce);

var scrollBtnObj = {
    scrollChk : false,
    pageScrollUpBtn : $('.pageScrollUpBtn'),
    pageScrollDownBtn : $('.pageScrollDownBtn'),
    scrollVal : $(this).scrollTop(),
    html : $('html')
};
$(window).scroll(function(event){
    scrollBtnObj.scrollChk = true;
});
$(document).ready(function(){
    hasScrolledLoad();
});

$('.pageScrollDownBtn').on('click', function(){
    scrollBtnObj.html.animate({scrollTop:$(document).height()},250);
});

$('.pageScrollUpBtn').on('click', function(){
    scrollBtnObj.html.animate({scrollTop:0},250);
});

setInterval(function(){
    if(scrollBtnObj.scrollChk){
        hasScrolled();
        scrollBtnObj.scrollChk = false;
    }
},250);

function hasScrolled(){
    var scrollVal = $(this).scrollTop();
    if(scrollVal > 0){
        scrollBtnObj.pageScrollUpBtn.fadeIn(250);
    }else{
        scrollBtnObj.pageScrollUpBtn.fadeOut(250);
    }

    if($(window).scrollTop() + $(window).height() == $(document).height()){
        scrollBtnObj.pageScrollDownBtn.fadeOut(250);
    }else{
        scrollBtnObj.pageScrollDownBtn.fadeIn(250);
    }
}

function hasScrolledLoad(){
    if(scrollBtnObj.scrollVal > 0){
        scrollBtnObj.pageScrollUpBtn.show();
    }else{
        scrollBtnObj.pageScrollUpBtn.hide();
    }

    if($(window).scrollTop() + $(window).height() == $(document).height()){
        scrollBtnObj.pageScrollDownBtn.hide();
    }else{
        scrollBtnObj.pageScrollDownBtn.show();
    }
}

$(document).ajaxStart(function() {
	$(".loadingWrap").show();
});
$(document).ajaxComplete(function() {
	$(".loadingWrap").hide();
});


// TOOLTIP NOT HIDE BUG FIX
$(document).on('click', '[data-toggle="tooltip"]', function() {
	$('.bs-tooltip-top').remove(); //tooltip reset
});