# express-mongodb
<pre>在这个示例里我实现了简单的注册登录以及对个人通讯录的增删改查；
首先这个小示例是基于node的express框架的ejs模板来实现的，数据库采用mongodb的一个对象模型mongoose来进行实现。
在这里我采用jquery的验证框架在前端进行验证。下面是一段示例验证代码：
		jQuery.validator.addMethod("stringCheck", function(value, element) {          
		    return this.optional(element) || /^[a-zA-Z0-9_]+$/.test(value);          
		}, "只能包括英文字母、数字和下划线"); <br>
		$("#form").validate({
			rules: {
				account: {
					required: true,
					stringCheck:true,
					minlength: 2,
					maxlength:10
				},<br>
				password: {
					required: true,
					minlength: 5,
					maxlength:16
				}<br>
			},<br>
			messages: {
				account: {
					required: "Please enter a username",
					stringCheck: "用户名只能包括英文字母、数字和下划线",
					minlength: "Your username must consist of at least 2 characters",
					maxlength: "Your username must consist of at most 10 characters"
				},
				password: {
					required: "Please provide a password",
					minlength: "Your password must be at least 5 characters long",
					maxlength: "Your password must be at most 16 characters long"
				}
			},
			focusInvalid: false
		}
app.js是项目的入口文件，里面加载所有需要依赖的模块，以及进行一些初始化设置，比如这是对路由的设置的一段代码：
app.use('/', routes);
app.use('/users', users);
app.use('/index', routes);
app.use('/index/directory', routes);
app.use('/register', routes);
app.use('/login', routes);
app.use('/loginout', routes);
接着是发起ajax请求：
submitHandler:function(){
		var acc = $('#account').val();
		var psd = $('#password').val();
		var data = {'account':acc,'password':psd};

		$.ajax({
			url:'/login',
			type:'post',
			data:data,
			success:function(data,status){
				if(status == 'success'){
					if(data.code == 404){
						alert(data.message)
					}
					else{
						location.href = 'index';
					}
				}
			},
			error:function(data,status){
				alert($.parseJSON(data.responseText).message);
			}
		});
}
![](https://raw.githubusercontent.com/LiHongyan11/express-mongodb/master/myHome/images/add.png)</pre>
