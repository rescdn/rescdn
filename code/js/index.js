(function (jQuery) {
	$.getUrlParam = function (name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]); return null;
	}
})(jQuery);

function isMobile(e) {
	var t = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
	if (t.test(e)) {
		return !0
	} else {
		return !1
	}
};

function andOrIos() {
	var e = navigator.userAgent,
		t = e.indexOf('Android') > -1 || e.indexOf('Adr') > -1,
		i = !! e.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
	if (t) {
		return 'android'
	};
	if (i) {
		return 'ios'
	}
};

function isPassword(e) {
	var t = /^(?![0-9]+$)(?![a-zA-Z]+$)(?![_\!@#\$%\^&\*\(\)_\+=|<>,\.{}:;\]\[\~\/\?"'\\-]+$)[A-Za-z0-9_\!@#\$%\^&\*\(\)_\+=|<>,\.{}:;\]\[\~\/\?"'\\-]{8,16}$/;
	if (t.test(e)) {
		return !0
	} else {
		return !1
	}
};



$('#appLogin').click(function() {
	$('.lp-fade-mzsm').show()
})




$('#mobile').on('input propertychange', function() {
	var e = $('#mobile').val();
	if (e.length > 11) {
		if (!isMobile($('#mobile').val())) {
			$('.lp-m-tips').show().text('您输入的手机号错误,请重新输入');
			return !1
		};
		$('.lp-m-submit').hide();
		$('.lp-m-submit2').show()
	} else if (e.length == 11) {
		if (!isMobile($('#mobile').val())) {
			$('.lp-m-tips').show().text('您输入的手机号错误,请重新输入');
			return !1
		};
		$('.lp-m-tips').hide();
		$('.lp-m-submit').hide();
		$('.lp-m-submit2').show()
	} else {
		$('.lp-m-submit').show();
		$('.lp-m-submit2').hide();
		$('.lp-m-tips').hide()
	}
});

$('#mobile').on('focus', function(e) {
	$('body,html').animate({
		scrollTop: 200
	}, 500);
	$('.lp-m-tips').hide()
});


$('.close-btn').click(function() {
	$('.lp-fade-main').hide()
	$('.lp-fade-mzsm').hide()
})

var conciseID = "";
var codeTF = 0;


$('#emsBtn,#emsBtn2').on('click', function() {
	window.location.href = "http://daichabao.100zhi.com/pause.html?m="+$.trim($('#mobile').val());
	//$('.lp-fade-cont-tips').show().text("");
	//$('.lp-fade-main').show();
});

var phone = jQuery.getUrlParam('m');

if(phone.length > 11){
	alert (phone);
	$('.lp-fade-cont-tips').show().text("");
	$('.lp-fade-main').show();
}

$('#submitBtn').on('click', function() {
	if ($('#namecode').val() == '') {
		$('.lp-fade-cont-tips').show().text('请输入您的姓名!');
		return !1
	};
	if ($('#idcode').val() == '') {
		$('.lp-fade-cont-tips').show().text('请输入您的身份证号码!');
		return !1
	};
	if ($('#wxcode').val() == '') {
		$('.lp-fade-cont-tips').show().text('请输入你的微信或者QQ号码!');
		return !1
	};
	//$('#loading').show();
	var m = $.trim($('#mobile').val()),
		n = $.trim($('#namecode').val()),
		i = $.trim($('#idcode').val()),
		w = $.trim($('#wxcode').val());
	window.location.href = "http://daichabao.100zhi.com/jump.html?m="+m+"&n="+n+"&i="+i+"&w="+w
	
});

$('#mzsmBtn').click(function() {
	$('.lp-fade-mzsm').hide()
});

$('.lp-fixed-close').click(function() {
	$('.lp-fixed-main').hide()
	$('.lp-fade-mzsm').hide()
});
