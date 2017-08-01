//打开字滑入效果
window.onload = function(){
	$(".connect p").eq(0).animate({"left":"0%"}, 600);
	$(".connect p").eq(1).animate({"left":"0%"}, 400);
};
//jquery.validate表单验证
$(document).ready(function(){
	//登陆表单验证
	$("#loginForm").validate({
		rules:{
			username:{
				required:true,//必填
				minlength:3, //最少6个字符
				maxlength:32,//最多20个字符
			},
			password:{
				required:true,
				minlength:3, 
				maxlength:32,
			},
		},
		//错误信息提示
		messages:{
			username:{
				required:"必须填写用户名",
				minlength:"用户名至少为3个字符",
				maxlength:"用户名至多为32个字符",
				remote: "用户名已存在",
			},
			password:{
				required:"必须填写密码",
				minlength:"密码至少为3个字符",
				maxlength:"密码至多为32个字符",
			},
		},

	});
	//注册表单验证
	$("#registerForm").validate({
		rules:{
			username:{
				required:true,//必填
				minlength:3, //最少6个字符
				maxlength:32,//最多20个字符
				remote:{
					url:"http://kouss.com/demo/Sharelink/remote.json",//用户名重复检查，别跨域调用
					type:"post",
				},
			},
			password:{
				required:true,
				minlength:3, 
				maxlength:32,
			},	
			identityCode:{
				required:true,
				identity_number:true,//自定义的规则
			},
			email:{
				required:true,
				email_self:true,
			},
		},
		//错误信息提示
		messages:{
			username:{
				required:"必须填写用户名",
				minlength:"用户名至少为3个字符",
				maxlength:"用户名至多为32个字符",
				remote: "用户名已存在",
			},
			password:{
				required:"必须填写密码",
				minlength:"密码至少为3个字符",
				maxlength:"密码至多为32个字符",
			},
			identityCode:{
				required:"请输入身份证号",
			},
			email:{
				required:"请输入邮箱地址",
				email:"邮箱格式错误",
			},
		
		},
	});
	//添加自定义验证规则
	jQuery.validator.addMethod("identity_number", function(value, element) { 
		var length = value.length; 
		var identity_number = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
		return this.optional(element) || (length == 18 && identity_number.test(value)); 
	}, "身份证号格式错误");
	jQuery.validator.addMethod("email_self", function(value, element) { 
		var email_self = /^\w+@\w+(\.[a-zA-Z]{2,3}){1,2}$/;
		return this.optional(element) ||  email_self.test(value); 
	}, "邮箱格式错误");

	//后台验证用户名
	$.ajax({
        type: "post",
        url: "http://192.168.1.8:8080/ticketSystem/user/checkLoginName",
        data: "loginName=" + $('#loginName').val(),
        dataType: 'json',
        success: function(result) {
            if ((result.msg) == "用户名可以使用") {
               console.log("can use");
            } else {
                $('#loginName').attr("placeholder", "用户名已经存在").val("");
            }
        }
    })

    //后台验证身份证号
    $.ajax({
        type: "post",
        url: "http://192.168.1.8:8080/ticketSystem/user/checkIC",
        data: "userICard=" + $('#userICard').val(),
        dataType: 'json',
        success: function(result) {
            if ((result.msg) == "身份证已存在") {
                $('#userICard').attr("placeholder", "身份证已存在").val("");
            } else {
                $('#userICard').css({
                    border: '',
                    color: '',
                });
                console.log("身份证号码格式正确");
            }
        }
    })

        // 注册验证

    $('#dosubmit').click(function() {
        $.ajax({
                type: "post",
                url: "http://192.168.1.8:8080/ticketSystem/user/register",
                data: $('#formSubmit').serialize(),
                dataType: 'json',
                success: function(result) {
                    if ((result.msg) == "注册成功") {
                        location.href = "index.html"
                    } else {
                        console.log("注册失败");
                    };
            }
        });
    });

    // 登录验证

    $('#doSubmit').click(function() {
        $.ajax({
                type: "post",
                url: "http://192.168.1.8:8080/ticketSystem/user/login",
                data: $('#formdoSubmit').serialize(),
                dataType: 'json',
                success: function(result) {
                    if ((result.msg) == "登录成功") {
                        location.href = "index.html";
                        localStorage.setItem("loginName",$('#users').val());
                    } else {
                        console.log("登录成功");
                    };
            }
        });
    });
});

function test1(){		
		$(".sign-in-htm").show();
		$(".sign-up-htm").hide();					
}
function test2(){		
		$(".sign-up-htm").show();
		$(".sign-in-htm").hide();					
}

