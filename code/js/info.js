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
var userid=jQuery.getUrlParam('userid');
var amount=decodeURIComponent(window.atob(getCookie("amount")));
var record=decodeURIComponent(window.atob(getCookie("record")));

if (userid != "" && amount !="" && record != ""){
	$("body").show()
}else{
	window.location.href = "https://rescdn.github.io/?sid="+userid;
}

var amountall= amount.split(";")
$('#t1').show().html("<strong>报告时间: </strong>"+amountall[0]+"<span><strong>编号: </strong>"+amountall[1]+"</span>");
$('#t2').show().html("<strong>姓名: </strong>"+amountall[2]+"<span><strong>身份证: </strong>"+amountall[3]+"</span>");
$('#t3').show().html("<strong>年龄: </strong>"+amountall[4]+"<span><strong>性别: </strong>"+amountall[5]+"</span>");

if(amountall[6] > 1){
daidata = "身份证贷;不限;50000$$社保贷;12-36期;60000$$保单贷;12-36期;60000$$公积金贷12-36期;80000$$微粒贷;6-24期;100000$$淘宝贷;6-24期;40000$$京东贷;6-24期;40000$$学历贷;6-24期;60000$$流水贷;6-24期;50000$$生意贷;12-36期;100000$$退休贷;12-36期;70000$$租金贷;6-24期;100000$$卡友贷6-24期;50000$$薪生贷12-36期;80000$$飞机贷6-24期;80000$$美女贷6-24期;60000"
var daidataall= daidata.split("$$")
 for( var i = 0; i < daidataall.length; i++ ) {
					 q=i+1;
					 daidatasplit = daidataall[i].split(";")
					 $('#u1').show().append("<li class=t"+q+">"+daidatasplit[0]+"</li>")
					 $('#u2').show().append("<li class=t"+q+">"+daidatasplit[1]+"</li>")
					 $('#u3').show().append("<li class=t"+q+">"+daidatasplit[2]+"</li>")
				 }
}


var recordall= record.split("$$")
	
 for( var i = 0; i < recordall.length; i++ ) {
					 q=i+1;
					 recordsplit = recordall[i].split(";")
					 $('#record').show().append("<li><i>"+q+"</i>"+recordsplit[0]+"<span>"+recordsplit[1]+"</span></li>")
				 }
	