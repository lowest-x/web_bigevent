$(function(){
//点击去注册账号链接
$('#link_reg').on('click',function(){
  $('.login-box').hide()
  $('.reg-box').show()
})
//点击去登陆链接
$('#link_login').on('click',function(){
  $('.login-box').show()
  $('.reg-box').hide()
})
//从layui中获取form对象
var form = layui.form
var layer = layui.layer //调用layui的弹出层
//通过form.verify()函数自定义校验规则
form.verify({
  pwd: [
    /^[\S]{6,12}$/
    ,'密码必须6到12位，且不能出现空格'] ,
    repwd:function(value) {
      var pwd = $('.reg-box [name=password]').val()
      if(pwd !== value) {
        return '两次密码不一样' 
      }
    }
})
//监听注册表单的提交事件
$('#form_reg').on('submit',function(e){
  e.preventDefault()
  var data = {
    username: $('#form_reg [name=username]').val(),
    password: $('#form_reg [name=password]').val(),
  }
  $.post('/api/reguser',data,function(res){
    if(res.status !== 0) {
      // return console.log(res.message);
      return layer.msg(res.message);
    }
    // console.log('注册成功');
    layer.msg('注册成功,请登录')
    //注册成功后点击一下去登录那个a链接
    $('#link_login').click()
  })

})
//监听曾路表单的提交事件
$('#form_login').submit(function(e){
  e.preventDefault()
  $.ajax({
    url:'/api/login',
    method:'POST',
    data: $(this).serialize(),
    success: function(res){
      if(res.status!== 0) {
        return layer.msg('登录失败！')
      }
      //将登录成功的token字符串 保存到localstorage中
      localStorage.setItem('token',res.token)
        layer.msg('登陆成功!')
        location.href = '/index.html'
    // console.log(res);
    }
    })
  })







})


