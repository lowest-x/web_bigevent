$(function(){
  var form = layui.form
  var layer = layui.layer
  form.verify({
    pwd: [
      /^[\S]{6,12}$/
      ,'密码必须6到12位，且不能出现空格'
    ] ,
    same: function(value) {
      if (value === $('[name=oldPwd]').val() ) {
        return '新旧密码不能相同'
      }
    },
    resame: function(value) {
      if (value !== $('[name=newPwd]').val() ) {
        return '两次输入的密码不同'
      }
    }

  })
  
$('.layui-form').submit(function(e){
  e.preventDefault()
  $.ajax({
    method:'POST',
    url:'/my/updatepwd',
    data:$('.layui-form').serialize(),
    success:function(res){
      if(res.status !== 0) {
        console.log(res.status);
        return layer.msg('重置密码失败')
      }
      layer.msg('更新密码失败')
      //重置表单
      $('.layui-form')[0].reset()
    }

  })
})

})