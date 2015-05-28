# express-mongodb
### 在这个示例里我实现了简单的注册登录以及对个人通讯录的增删改查；
##### 首先这个小示例是基于node的express框架的ejs模板来实现的，数据库采用mongodb的一个对象模型mongoose来进行实现。
在这里我采用jquery的验证框架在前端进行验证。  
app.js是项目的入口文件，里面加载所有需要依赖的模块，以及进行一些初始化设置，比如这是对路由的设置的一段代码：  
`app.use('/', routes);`                         
`app.use('/users', users);`                  
`app.use('/index', routes);`         
`app.use('/index/directory', routes);`       
`app.use('/register', routes);`      
`app.use('/login', routes);`         
`app.use('/loginout', routes);`
##### 接着是发起ajax请求：
因为平常做的是前端的工作，所以也比较习惯通过点击事件来提交表单。  
##### 接着是处理ajax的请求：
* 对于控制登录那一块，我采用session来控制，控制时间我取在了30分钟`maxAge:1000*60*30`,登录成功时将登录的信息写入session`req.session.user = doc;`,进入首页以及通讯录页和单击退出时都通过判断session里是否存在登录信息来做出不同的响应；
* 对于数据库查询那一块，我通过设置全局的访问数据库的函数`global.dbHandel = require('./database/dbHandel');global.db = mongoose.connect('mongodb://127.0.0.1:27017/test_db');`，在查询数据库时，直接获取这个全局函数`var User = global.dbHandel.getModel('user');`，从而在数据库里进行查询。
* 对于状态返回那一块，如果将http返回的状态码直接返回的话，在前端获取返回信息会比较麻烦，针对这种情况，我将所有自己能够预测到的错误全部返回200，然后自己定义变量对不同的错误做上标识，以及需要返回的信息，比如：
`var info = {
	"code":404,
	"message":"用户名不存在"
};`然后我通过不同的code值在前端做出不同的响应。

##### 最后上这个小示例也就基本上介绍完了，包含的功能不多，但这是我接触node完成的第一个成型的例子。
##### 下面附上几张示例的截图：
> login.html  
![](https://raw.githubusercontent.com/LiHongyan11/express-mongodb/master/myHome/images/login.png)
> register.html  
![](https://raw.githubusercontent.com/LiHongyan11/express-mongodb/master/myHome/images/register.png)
> index.html  
![](https://raw.githubusercontent.com/LiHongyan11/express-mongodb/master/myHome/images/index.png)
> directory.html  
![](https://raw.githubusercontent.com/LiHongyan11/express-mongodb/master/myHome/images/directory.png)
> add.html  
![](https://raw.githubusercontent.com/LiHongyan11/express-mongodb/master/myHome/images/add.png)

