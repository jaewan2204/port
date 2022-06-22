$(function () {
    
    $('.header').hover(function(){
        if($('.header').hasClass('header_hover')){
            $('.header').removeClass('header_hover');
            $('.header .header_bot .gnb ul ul').hide();
        } else {
            $('.header').addClass('header_hover');
            $('.header .header_bot .gnb ul ul').stop().slideDown('fast');
        }
    });
    
    $('.menu').click(function(){
        $('.menu_wrap').addClass('active');
        $('.menu_wrap .dim').show();
    });
    
    $('.menu_btn .close').click(function(){
        $('.menu_wrap').removeClass('active');
        $('.menu_content > ul > li').removeClass('active');
    });
    
    $('.menu_content > ul > li > button').click(function(){
        $(this).parent().toggleClass('active');
    });
    
    //탭  
    $('.tab_list > ul > li').each(function(index){
        $(this).click(function(){
            $(this).addClass('active').siblings().removeClass('active');
            $('.tab_contents > div > div').eq(index).fadeIn().siblings().stop().css('display','none')
            $('.tab_contents > div > div').eq(index).fadeIn().siblings().stop().css('display','none')
        })
    });
    
    //페이징 클릭
    $('.paging > ul > li.num').click(function(){
        $(this).addClass('active').siblings().removeClass('active')
    });
    
    
    
    var windowWidth = $(window).width();

    function initWidth() {

        if(windowWidth < 1025) {
            if (document.currentScript === undefined) {
                // IE 에서만
                $('.table_scroll_type1').slimScroll({
                    //height: '407px'
                });
                $('.table_scroll_type2').slimScroll({
                    //height: '207px'
                });
            } else {
                // IE 제외
                $('.table_scroll_type1').slimScroll({
                    //height: '400px'
                });
                $('.table_scroll_type2').slimScroll({
                    //height: '200px'
                });
            }
            
            if($(this).hasClass('on')){
                $(this).removeClass('on');
                $('.accordion_area').stop().animate({height:'85px'}, 200, 'swing');
            } else {
                $(this).addClass('on');
                $('.accordion_area').stop().animate({height:'100%'});
            }
            
            var swiper = new Swiper(".img_wrap", {
                slidesPerView: 4,
                spaceBetween: 10,
                loop: true,
                loopedSlides: 5,
                centeredSlides: true,
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
            });
            
            var swiper2 = new Swiper(".img_area", {
                slidesPerView: 1,
                spaceBetween: 25,
                centeredSlides: true,
                loop: true,
                loopedSlides: 5,
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
                thumbs: {
                    swiper: swiper,
                },
            });
            
            var wrapW = $('.img_wrap').innerWidth() + 2 - 40
            var slideW = $('.img_list .slide').outerWidth()/2
            var center = wrapW/2 - slideW
            $('.img_wrap .img_list').css('margin-left',-center)
            
            
            
        } else if(windowWidth > 1025) {
            if (document.currentScript === undefined) {
                // IE 에서만
                $('.table_scroll_type1').slimScroll({
                    //height: '607px'
                });
            } else {
                // IE 제외
                $('.table_scroll_type1').slimScroll({
                    //height: '600px'
                });
            }
            
            if($(this).hasClass('on')){
                $(this).removeClass('on');
                $('.accordion_area').stop().animate({height:'58px'}, 200, 'swing');
            } else {
                $(this).addClass('on');
                $('.accordion_area').stop().animate({height:'100%'});
            }
            
            var swiper = new Swiper(".img_wrap", {
                slidesPerView: 5,
                spaceBetween: 20,
                loop: true,
                loopedSlides: 5,
                centeredSlides: true,
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
            });
            
            var swiper2 = new Swiper(".img_area", {
                slidesPerView: 1,
                spaceBetween: 25,
                centeredSlides: true,
                loop: true,
                loopedSlides: 5,
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
                thumbs: {
                    swiper: swiper,
                },
            });
            
            var wrapW = $('.img_wrap').innerWidth() + 2 - 60
            var slideW = $('.img_list .slide').outerWidth()/2
            var center = wrapW/2 - slideW
            $('.img_wrap .img_list').css('margin-left',-center)
        }
    }
    initWidth();

    $(window).on('resize', function () {
        windowWidth = $(window).width();
        initWidth();
    });
    
    
    
    $('.popup_closer').click(function(){
        $(this).parent().parent().parent().hide();
        $('.layer_popup').each(function(){
            if($(this).css('display') === "block"){
                $('.dim').show();
                return false;
            }else {
                $('.dim').hide();
            }
        });
        $('.img_pop').css({"visibility":"hidden","display":"block"});
        
    });
    
    //datepicker
    $('.cal_chk input').datepicker({
        format: 'yyyy-mm-dd',
        date: 'null',
    });
    
    $('.popopen').click(function(){
        var POP = $(this).attr('data-pop');
        $('.dim').show();
        $('#' + POP).css({"display":"block"});
    });
    
    $('.opener').click(function(){
        $('.dim').show();
        $('.img_pop').css({"visibility":"visible"});
    });
    
    
    
    $('.overlapping_btn').click(function(){
        $(this).parent().parent().next().toggleClass("on");
        $(this).toggleClass("on");
    });
    
    $('.search_type').on('click',function(){
        if(windowWidth < 1025) {
            if($(this).hasClass('on')){
                $(this).removeClass('on');
                $('.accordion_area').stop().animate({height:'85px'}, 200, 'swing');
            } else {
                $(this).addClass('on');
                $('.accordion_area').stop().animate({height:'100%'});
            }
        } else if(windowWidth > 1026) {
            if($(this).hasClass('on')){
                $(this).removeClass('on');
                $('.accordion_area').stop().animate({height:'58px'}, 200, 'swing');
            } else {
                $(this).addClass('on');
                $('.accordion_area').stop().animate({height:'100%'});
            }
        }
    });
    
    $(".float_btn").draggable({
        containment: 'document',
        start: function(event, ui) {
            $(this).addClass('noclick');
        }
        
    });

    $('.float_btn').click(function(){
        if ($(this).hasClass('noclick')) {
            $(this).removeClass('noclick');
            $(this).toggleClass("active");
        } else {
            $(this).toggleClass("active");
        }
    });
    
    if($('.ma11').css('display') === "block"){
         $('.main_box.w100p').addClass('margin_type1');
    } else if($('.ma12').css('display') === "block"){
         $('.main_box.w100p').addClass('margin_type2');
    }
    
//    
//    var swiper = new Swiper(".img_wrap",{
//        slidesPerView: 5,
//        spaceBetween: 10,
//        freeMode: true,
//        watchSlidesProgress: true,
//        watchSlidesVisibility: true,
//        navigation: {
//            nextEl: ".swiper-button-next",
//            prevEl: ".swiper-button-prev",
//        },
//    });
//
//    var swiper2 = new Swiper(".img_area", {
//        spaceBetween: 10,
//        thumbs: {
//            swiper: swiper,
//        },
//        navigation: {
//            nextEl: ".swiper-button-next",
//            prevEl: ".swiper-button-prev",
//        },
//    });

      var swiper3 = new Swiper(".main_area", {
          slidesPerView: 1,
          spaceBetween: 25,
          pagination: {
              el: ".swiper-pagination",
          },
      });
    
    
    
    $('input[type=range]').on('input', function () {
        var val = $(this).val();
        $(this).css('background', 'linear-gradient(to right, #186785 0%, #186785 ' + val + '%, #DBDBDB ' + val + '%, #DBDBDB 100%)');
    });

    
});