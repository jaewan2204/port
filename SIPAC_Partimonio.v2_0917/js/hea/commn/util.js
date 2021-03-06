function PopupCenter(url, title, w, h) {
 
    // Fixes dual-screen position Most browsers      Firefox
    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
    var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;
 
    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
 
    var left = ((width / 2) - (w / 2)) + dualScreenLeft;
    var top = ((height / 2) - (h / 2)) + dualScreenTop;
    var newWindow = window.open(url, title, 'scrollbars=yes, resizable=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
 
    // Puts focus on the newWindow
    if (window.focus) {
        newWindow.focus();
    }
    
    return newWindow;
}

$(".noEnter").keydown( function(e) { 
	if(e.keyCode == 13) {
		event.preventDefault();
		return false;
	}
});

$(document).ready(function(){
	// .inputUnderBar {border-bottom:2px solid #FF0000; background-color:#F8FEE7} 
	$("input, textarea, select").focus(function(){
		$(this).addClass("inputUnderBar");
	}); 

	$("input, textarea, select").blur(function(){ 
		$(this).removeClass("inputUnderBar");
	});
	
});	