var Time ={
	getUnix: function(){
		var  date =new Date();
		return date.getTime();
	},
	getTodayUnix: function(){
		var date = new Date();
		date.setHours(0);
		date.setMinutes(0);
		date.setSeconds(0);
		date.setMilliseconds(0);
		return date.getTime();
	},
	getYearUnix: function(){
		var date=new Date();
		date.setMonth(0);
		date.setDate(1);
		date.setHours(0);
		date.setMinutes(0);
		date.setSeconds(0);
		date.setMilliseconds(0);
		return date.getTime();
	},
	getLastDate: function(time){
		var date= new　Date(time);
		var month =date.getMonth()+1<10?'0'+(date.getMonth()+1):date.getMonth()+1;
		var day =date.getDate()<10?'0'+date.getDate():date.getDate();
		return date.getFullYear()+'-'+month+"-"+day;
	},
	getFormatTime:function(timestamp){
		var now =this.getUnix();
		var today =this.getTodayUnix();
		var year=this.getYearUnix();
		var timer =(now-timestamp)/1000;
		var tip='';
		if(timer<=0){
			tip:'刚刚';
		}else if(Math.floor(timer/60)<=0){
			tip:'刚刚';
		}else if (timer<3600){
			tip=Math.floor(timer/60)+'分钟前';//取小于或者等于指定值的最大整数
		}else if(timer>=3600&&(timestamp-today>=0)){
			tip=Math.floor(timer/3600)+'小时前';
		}else if(timer/86400<=31){
			tip=Math.ceil(timer/86400)+'天前';//取大于或者等于指定值的最小整数
		}

		else{
			tip=this.getLastDate(timestamp);
		
		}
		return tip;
	}
};
	//自定义指令
export default{
	bind: function(el,binding){
		el.innerHTML=Time.getFormatTime(binding.value*1000);
		el._timeout_=setInterval(function(){
			el.innerHTML=Time.getFormatTime(binding.value*1000);
		},60000);
	},
	unbind:function(el){
		clearInterval(el._timeout_);
		delete el._timeout_;
	}
};