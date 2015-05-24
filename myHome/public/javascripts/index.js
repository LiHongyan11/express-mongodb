
/*(function($){
    $.fn.extend({
    	getVal:function(id1,id2,id3){//计算器
					var first = parseInt($(id1).val());
					var second = parseInt($(id2).val());
					var type = $(id3).val();
					if(isNaN(first) || isNaN(second)){
						alert('请输入数字');
						return false;
					}
					switch(type){
						case '+':
							return first + second;
							break;
						case '-':
							return first - second;
							break;
						case '*':
							return first * second;
							break;
						case '/':
							if(second == 0){
								alert('第二个数不能为0');
								return false;
							}
							else{
								return first / second;
							}
					}
				}
    })
})(jQuery);*/
