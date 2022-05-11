$.ajaxPrefilter(function(options){
  options.url = 'http://www.liulongbin.top:3007'+ options.url


  //统一为有权限的接口,配置headers请求头
  if(options.url.indexOf('/my/') !== -1) {
    options.headers = {
      Authorization:localStorage.getItem('token')|| ''
    }
  }
// 全局统一挂载complete函数
  options.complete = function(res) {
    // 在complete函数中 可以使用res.responsejson拿到服务器想赢回来的数据
    if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
      //强制清空token
      localStorage.removeItem('token')
      //强制跳转到登录页面
      location.href = './login.html'
    }
  }
})
//每次我们调用ajax post get 请求时候 
// 会先调用ajaxprefilter这个函数在这个函数中 我们可以拿到ajax提供的配置对象 在ajax发起请求之前 同意拼接请求的根路径