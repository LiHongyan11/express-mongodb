# express-mongodb
<pre>在这个示例里我实现了简单的注册登录以及对个人通讯录的增删改查；
首先这个小示例是基于node的express框架的ejs模板来实现的，数据库采用mongodb的一个对象模型mongoose来进行实现。
在这里我采用jquery的验证框架在前端进行验证。
app.js是项目的入口文件，里面加载所有需要依赖的模块，以及进行一些初始化设置，比如这是对路由的设置的一段代码：
app.use('/', routes);
app.use('/users', users);
app.use('/index', routes);
app.use('/index/directory', routes);
app.use('/register', routes);
app.use('/login', routes);
app.use('/loginout', routes);
接着是发起ajax请求：

![](https://raw.githubusercontent.com/LiHongyan11/express-mongodb/ce2e52dd99cdcbfe6cbe319b47b77c835f76aefd/myHome/images/add.png)
</pre>
