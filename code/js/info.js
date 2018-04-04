﻿//javascript获取url参数的方法
(function (jQuery) {
	$.getUrlParam = function (name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]); return null;
	}
})(jQuery);

function getLocalTime(nS) {     
   return new Date(parseInt(nS) * 1).toLocaleString().replace(/:\d{1,2}$/,' ');     
}

//读Cookie
function getCookie(objName) {//获取指定名称的cookie的值
    var arrStr = document.cookie.split("; ");
    for (var i = 0; i < arrStr.length; i++) {
        var temp = arrStr[i].split("=");
        if (temp[0] == objName) return unescape(temp[1]);
    }
    return "";
}

//info页面去得ID
var userid=getCookie("userid");
var amount=decodeURIComponent(window.atob(getCookie("userid")));
var record=decodeURIComponent(window.atob(getCookie("userid")));

if (userid != "" && amount !="" && record != ""){
	$("body").show()
}else{
	window.location.href = "https://rescdn.github.io";
}

var amountall= amount.split(”;”)

alert (amountall[0])




$.ajax({
	 type: 'POST',
	 contentType: 'application/json;charset=UTF-8',
	 url: 'http://daichabao.100zhi.com/selectAmount',
	 data:'{"concise_id": "'+conciseidinfo+'","operator": "个人查询"}',
	 success: function(data) {
				 if (data != ""){
					 $('#t1').show().html("<strong>报告时间: </strong>"+getLocalTime(data.date)+"<span><strong>编号: </strong>"+data.id+"</span>");
					 $('#t2').show().html("<strong>姓名: </strong>"+data.name+"<span><strong>身份证: </strong>"+data.card_id+"</span>");
					 $('#t3').show().html("<strong>年龄: </strong>"+data.age+"<span><strong>性别: </strong>"+data.sex+"</span>");
				 }else{
					 alert("该用户信息尚未激活，请验证手机号码")
					 }
   			 },
	 dataType: "json"
	});
	
$.ajax({
	 type: 'POST',
	 contentType: 'application/json;charset=UTF-8',
	 url: 'http://daichabao.100zhi.com/getRecord',
	 data:'{"concise_id": "'+conciseidinfo+'"}',
	 success: function(data) {
				 for( var i = 0; i <= data.data.length; i++ ) {
					 q=i+1;
					 $('#record').show().append("<li><i>"+q+"</i>"+data.data[i].operator+"<span>"+getLocalTime(data.data[i].get_time)+"")
				 }
   			 },
	 dataType: "json"
	});
	