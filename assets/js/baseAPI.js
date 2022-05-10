$.ajaxPrefilter(function(options){
  options.url = 'http://www.liulongbin.top:3007'+ options.url
})
//每次我们调用ajax post get 请求时候 
// 会先调用ajaxprefilter这个函数在这个函数中 我们可以拿到ajax提供的配置对象 在ajax发起请求之前 同意拼接请求的根路径