export default {
	bind: function(el,binding,vnode) {
		function documentHandle (e) {
			//判断是否在元素内部
			if(el.contains(e.target)){
				console.log("fail");
				return false;
			}
			if(binding.expression){
				console.log("ok");
				binding.value(e);
			}
		}
		
		el._vueClickOutside_=documentHandle;
		document.addEventListener('click', documentHandle);
	},
	//移除事件
	unbind: function(el,binding){
		document.removeEventListener('click',el._vueClickOutside_);
		delete el._vueClickOutside_;
		}
};