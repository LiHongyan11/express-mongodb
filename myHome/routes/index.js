var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
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

router.get('/register', function(req, res, next) {
  res.render('register');
}).post('/register', function(req,res){
	if(req.headers['x-requested-with'] == 'XMLHttpRequest'){
		var User = global.dbHandel.getModel('user');
		var account = req.body.account;
		var password = req.body.password;
		var info = {
				"code":200,
				"message":""
			};
		User.findOne({account:account},function(err,doc){		
			if(err){
				info.code = 500;
				info.message = '网络异常错误';
				res.send(500,info);
				req.session.error = '网络异常错误';
				console.log(err);
			}
			else if(doc){
				req.session.error = '用户名已存在';
				info.code = 500;
				info.message = '用户名已存在';
				res.send(200,info);
				console.log('用户名已存在');
			}
			else{
				User.create({
					account:account,
					password:password
				},function(err,doc){
					if(err){
						info.code = 500;
						info.message = '创建失败';
						res.send(500,info);
						console.log(err);
					}
					else{
						req.session.error = '用户名创建成功';
						res.send(200,'用户名创建成功');
						console.log('用户名创建成功');
					}
				});
			}
		})
	}
	
});

router.get('/index', function(req, res, next) {
	if(!req.session.user){
		var info = {
			"code":500,
			"message":"请先登录"

		};			
		req.session.error = '请先登录';
		res.redirect('/login');
		res.send(200,info);
		console.log('请先登录');
	}
	else{
		res.render('index');
	}    
});


router.get('/directory', function(req, res, next) {
	var info = {
			"code":500,
			"message":"请先登录"

		};
	if(!req.session.user){		
		req.session.error = '请先登录';
		info.code = 500;
		info.message = '请先登录';
		res.send(200,info);
		res.redirect('/login');
		console.log('请先登录');
		return false;
	}
	else{
		var Info = global.dbHandel.getModel('info');
		Info.find({userId:req.session.user._id},function(err,doc){
			res.render('directory',{data:doc});
		})
	}
	
}).post('/directory',function(req,res){
	if(req.headers['x-requested-with'] == 'XMLHttpRequest'){
		var info = {
			"code":500,
			"message":"请先登录"

		};
		if(!req.session.user){		
			req.session.error = '请先登录';
			info.code = 500;
			info.message = '请先登录';
			res.send(200,info);
			res.redirect('/login');
			console.log('请先登录');
			return false;
		}
		var Info = global.dbHandel.getModel('info');
		var name = req.body.name;
		var phone = req.body.phone;
		Info.findOne({name:name,userId:req.session.user._id},function(err,doc){
			
			if(err){
				req.session.error = '请先登录';
				info.code = 500;
				info.message = '网络异常';
				res.send(500,info);
				console.log('网络异常');
			}
			else if(doc){
				info.code = 500;
				info.message = '该联系人已存在';
				res.send(200,info);
				console.log('该联系人已存在');
			}
			else{
				Info.create({
					name:name,
					phone:phone,
					userId:req.session.user._id
				},function(err,doc){
					if(err){
						info.code = 500;
						info.message = '创建失败';
						res.send(500,info);
						console.log('创建失败');
					}
					else{
						res.send(200);
					}
				})
			}
		})
	}
	
});

router.post('/delete', function(req, res, next) {
	if(req.headers['x-requested-with'] == 'XMLHttpRequest'){
		var info = {
			"code":500,
			"message":"请先登录"

		};
		if(!req.session.user){	
			info.code = 500;
			info.message = '请先登录';
			res.send(200,info);	
			req.session.error = '请先登录';
			res.redirect('/login');
			console.log('请先登录');
			return false;
		}
		var Info = global.dbHandel.getModel('info');
		var name = req.body.name;
		Info.findOne({name:name,userId:req.session.user._id},function(err,doc){
			if(err){
				info.code = 500;
				info.message = '网络异常';
				res.send(500,info);	
				console.log('网络异常');
			}
			else if(!doc){
				info.code = 404;
				info.message = '该联系人不存在';
				res.send(200,info);	
				console.log('该联系人不存在');
			}
			else{
				Info.remove({
					name:name
				},function(err,doc){
					if(err){
						info.code = 500;
						info.message = '删除失败';
						res.send(500,info);	
						console.log('删除失败');
					}
					else{
						res.send(200);
						console.log('删除成功');
					}
				})
			}
		})
	}
	
});

router.post('/update',function(req,res){
	if(req.headers['x-requested-with'] == 'XMLHttpRequest'){
		var info = {
			"code":500,
			"message":"请先登录"

		};	
		if(!req.session.user){		
			info.code = 500;
			info.message = '请先登录';
			res.send(200,info);
			req.session.error = '请先登录';
			res.redirect('/login');
			console.log('请先登录');
			return false;
		}
		var Info = global.dbHandel.getModel('info');
		var name = req.body.name;
		var phone = req.body.phone;
		var name2 = req.body.name2;
		Info.findOne({name:name2,userId:req.session.user._id},function(err,doc){

			if(err){
				info.code = 500;
				info.message = '网络异常';
				res.send(500,info);
				console.log('网络异常');
			}
			else if(!doc){
				info.code = 404;
				info.message = '该联系人不存在';
				res.send(200,info);
				console.log('该联系人不存在');
			}
			else{
				Info.update({name:name2,userId:req.session.user._id},{
					name:name,
					phone:phone
				},function(err,doc){
					if(err){
						info.code = 500;
						info.message = '修改失败';
						res.send(500,info);
						console.log('修改失败');
					}
					else{
						res.send(200);
						console.log('修改成功');
					}
				})
			}
		})
	}
	
});

router.post('/search',function(req,res){
	if(req.headers['x-requested-with'] == 'XMLHttpRequest'){
		var info = {
			"code":500,
			"message":"请先登录"

		};
		if(!req.session.user){		
			info.code = 500;
			info.message = '请先登录';
			res.send(200,info);	
			req.session.error = '请先登录';
			res.redirect('/login');
			console.log('请先登录');
			return false;
		}
		var Info = global.dbHandel.getModel('info');
		var name = req.body.txt;
		Info.find({name:new RegExp(name),userId:req.session.user._id},function(err,doc){
			console.log(name);
			if(err){
				info.code = 500;
				info.message = '网络异常';
				res.send(500,info);	
				console.log('网络异常');
			}
			else{
				res.json(doc);
				
			}
		})
	}
	
});

router.get('/loginout', function(req, res, next) {
	if(req.headers['x-requested-with'] == 'XMLHttpRequest'){
		if(!req.session.user){
			var info = {
				"code":500,
				"message":"请先登录"

				};
				res.send(200,info);
				req.session.error = '请先登录';
				console.log('请先登录');
				return false;
		}
		var info = {
			"code":200,
			"message":"退出成功"

		};
		res.json(info);	
		req.session.destroy();
	}	
});

module.exports = router;
