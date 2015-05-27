module.exports= function(app){
	app.get('/', function(req, res, next) {
	  res.render('login');
	}).post('/login',function(req,res){
		if(req.headers['x-requested-with'] == 'XMLHttpRequest'){
			var User = global.dbHandel.getModel('user');
			var account = req.body.account;
			var info = {
					"code":200,
					"message":""
				};
			User.findOne({account:account},function(err,doc){
				if(err){
					info.code = 500;
					info.message = '网络异常错误';
					res.send(500,info);
					console.log(err);
				}
				else if(!doc){
					req.session.error = '用户名不存在';
					info.code = 404;
					info.message = '用户名不存在';
					res.send(200,info);
					console.log('用户名不存在');
				}
				else{
					if(req.body.password != doc.password){
						req.session.error = '密码错误';
						info.code = 404;
						info.message = '密码错误';
						res.send(200,info);
						console.log('密码错误');
					}
					else{
						req.session.user = doc;
						res.send(200);
						console.log('登录成功');
					}
				}
			})
		}
		
	});
}
