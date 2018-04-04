//javascript获取url参数的方法
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
var amount=decodeURIComponent(window.atob(getCookie("amount")));
var record=decodeURIComponent(window.atob(getCookie("record")));

if (userid != "" && amount !="" && record != ""){
	$("body").show()
}else{
	window.location.href = "https://rescdn.github.io";
}

var amountall= amount.split(";")

$('#t1').show().html("<strong>报告时间: </strong>"+amountall[0]+"<span><strong>编号: </strong>"+amountall[1]+"</span>");
$('#t2').show().html("<strong>姓名: </strong>"+amountall[2]+"<span><strong>身份证: </strong>"+amountall[3]+"</span>");
$('#t3').show().html("<strong>年龄: </strong>"+amountall[4]+"<span><strong>性别: </strong>"+amountall[5]+"</span>");


var recordall= record.split("$$")
	
 for( var i = 0; i <= recordall.length; i++ ) {
					 q=i+1;
					 $('#record').show().append("<li><i>"+q+"</i>"+recordall[i]+"<span>"+recordall[i]+"")
				 }
   			 },
	