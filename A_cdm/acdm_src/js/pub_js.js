$(function () {
    //로그인 인증버튼에 comple 클래스 추가되면 바뀌는 텍스트
    $(".section .btn.comple span").text("인증 완료");


    // 비밀번호 변경 팝업
    $(".passBtn").click(function () {
        $(".pass_pop").fadeIn();
    });

    $(".close").click(function () {
        $(".pass_pop").fadeOut();
    });

    //날짜선택
    $('.date_btn button').click(function () {
        $(this).addClass('on');
        $(this).siblings('button').removeClass('on')
    })

    //도착 상세 페이지 시간 리스트 열기 닫기
    //.result_list .mb40 > button.up + .time_list ul{height: 209px }
    var open_height = $('.detail .mb40 > button + .time_list ul').outerHeight() + 7
    //alert(open_height)

    $('.detail .mb40 > button').click(function () {
        if ($('.detail .mb40 > button').hasClass('up')) {
            $('.detail .mb40 > button').removeClass('up');
            $('.detail .mb40 .time_list').css({
                height: '87px'
            });
        } else {
            $('.detail .mb40 > button').addClass('up');
            $('.detail .mb40 .time_list').css({
                height: open_height + 'px'
            });
        }
    });


    //팝업 닫기
    $('.popup_close').click(function () {
        $('.popup_wrap').css('visibility', 'hidden');
        $('.slide_pop').css('transform', 'translateY(100%)');
        $('.color_info_pop').css('display', 'none');
        $('.all_menu_wrap').css('transform', 'translateX(100%)');
    });

    //레이어 팝업오픈
    $('.info_open').click(function () {
        $('.popup_wrap').css('visibility', 'visible');
        $('.slide_pop').css('transform', 'translateY(0)');
        $('.slide_pop.reroad_pop').css('transform', 'translateY(-56px)');
        $('.color_info_pop').css('display', 'block');
        $('.all_menu_wrap').css('transform', 'translateX(0)');
    });

    //스크롤 위로 올리는 버튼
    $('.up_btn').click(function () {
        $('html, body').animate({
            scrollTop: '0'
        }, 500);
    })

//    //datepicker
//    $('input.cal_open').datepicker({
//        format: 'yyyy-mm-dd',
//        date: 'null',
//    });
    
    //새로고침 시간 설정
    $('.reroad_btn button').click(function(){
        $(this).addClass('active');
        $(this).siblings('button').removeClass('active');
    })
    
    //즐겨찾기 
    $('.icon_favorite').click(function(){
        $(this).toggleClass('on');
    });
    
    
    //계정신청 셀렉트 박스 선택시 색상 변경
    $('#select_1').change(function(){
        var current = $('#select_1').val();
        if(current != 'null'){
            $('#select_1').css('color','#222222')
        } else{
            $('#select_1').css('color','#999999')
        }
    });

    $('#select_2').change(function(){
        var current = $('#select_2').val();
        if(current != 'null'){
            $('#select_2').css('color','#222222')
        } else{
            $('#select_2').css('color','#999999')
        }
    });
    $('#select_3').change(function(){
        var current = $('#select_3').val();
        if(current != 'null'){
            $('#select_3').css('color','#222222')
        } else{
            $('#select_3').css('color','#999999')
        }
    });

    $('#select_4').change(function(){
        var current = $('#select_4').val();
        if(current != 'null'){
            $('#select_4').css('color','#222222')
        } else{
            $('#select_4').css('color','#999999')
        }
    });

    $('#select_5').change(function(){
        var current = $('#select_5').val();
        if(current != 'null'){
            $('#select_5').css('color','#222222')
        } else{
            $('#select_5').css('color','#999999')
        }
    });

    $('#select_6').change(function(){
        var current = $('#select_6').val();
        if(current != 'null'){
            $('#select_6').css('color','#222222')
        } else{
            $('#select_6').css('color','#999999')
        }
    });

    $('#select_7').change(function(){
        var current = $('#select_7').val();
        if(current != 'null'){
            $('#select_7').css('color','#222222')
        } else{
            $('#select_7').css('color','#999999')
        }
    });
    
    // 계정신청 페이지 조회 목록 
    $('.btn_primary_sh').click(function(){
        $('.loockup_box').addClass("on");

        if($('.loockup_box.on').css('display') == 'block'){
            $('.phone_sh').css('padding-bottom', '249px');
            $('.btn_default_tr').css('color', '#222222');
        }else{
            $('.phone_sh').css('padding-bottom', '433px');
        }
    });
    
});


// datepicker

$(function() {
    fn_default_datepicker();
});
    
function fn_default_datepicker()
{
var start = $( "#datepicker_start" ).datepicker({
    dateFormat: 'yy-mm-dd' //Input Display Format 변경
    ,showOtherMonths: true //빈 공간에 현재월의 앞뒤월의 날짜를 표시
    ,showMonthAfterYear:true //년도 먼저 나오고, 뒤에 월 표시            
    //,showOn: "both" //button:버튼을 표시하고,버튼을 눌러야만 달력 표시 ^ both:버튼을 표시하고,버튼을 누르거나 input을 클릭하면 달력 표시
    //,buttonImage: "http://jqueryui.com/resources/demos/datepicker/images/calendar.gif" //버튼 이미지 경로
    //,buttonImageOnly: true //기본 버튼의 회색 부분을 없애고, 이미지만 보이게 함
    ,buttonText: "선택" //버튼에 마우스 갖다 댔을 때 표시되는 텍스트                
    ,yearSuffix: "년" //달력의 년도 부분 뒤에 붙는 텍스트
    ,monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] //달력의 월 부분 텍스트
    ,monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] //달력의 월 부분 Tooltip 텍스트
    ,dayNamesMin: ['일','월','화','수','목','금','토'] //달력의 요일 부분 텍스트
    ,dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'] //달력의 요일 부분 Tooltip 텍스트               
});
    
var end = $( "#datepicker_end" ).datepicker({
    dateFormat: 'yy-mm-dd' //Input Display Format 변경
    ,showOtherMonths: true //빈 공간에 현재월의 앞뒤월의 날짜를 표시
    ,showMonthAfterYear:true //년도 먼저 나오고, 뒤에 월 표시             
    //,showOn: "both" //button:버튼을 표시하고,버튼을 눌러야만 달력 표시 ^ both:버튼을 표시하고,버튼을 누르거나 input을 클릭하면 달력 표시  
    //,buttonImage: "http://jqueryui.com/resources/demos/datepicker/images/calendar.gif" //버튼 이미지 경로
    //,buttonImageOnly: true //기본 버튼의 회색 부분을 없애고, 이미지만 보이게 함
    ,buttonText: "선택" //버튼에 마우스 갖다 댔을 때 표시되는 텍스트                
    ,yearSuffix: "년" //달력의 년도 부분 뒤에 붙는 텍스트
    ,monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] //달력의 월 부분 텍스트
    ,monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] //달력의 월 부분 Tooltip 텍스트
    ,dayNamesMin: ['일','월','화','수','목','금','토'] //달력의 요일 부분 텍스트
    ,dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'] //달력의 요일 부분 Tooltip 텍스트
  });

//초기값을 오늘 날짜로 설정
$('#datepicker_start').datepicker('setDate', 'today'); //(-1D:하루전, -1M:한달전, -1Y:일년전), (+1D:하루후, -1M:한달후, -1Y:일년후)
$('#datepicker_end').datepicker('setDate', '+1D'); //(-1D:하루전, -1M:한달전, -1Y:일년전), (+1D:하루후, -1M:한달후, -1Y:일년후)
}

function getDate( element ) {
var date;
var dateFormat = "yy-mm-dd";
try {
  date = $.datepicker.parseDate( dateFormat, element.value );
} catch( error ) {
  date = null;
}
return date;
}



$(function(){
    $(".passBtn").click(function(){
        $(".pass_pop").fadeIn();
    });
    
    $(".close").click(function(){
        $(".pass_pop").fadeOut();
    });
});