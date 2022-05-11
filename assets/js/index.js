$(function(){
  // 调用getuserinfo获取用户基本信息
  getUserInfo()
  var layer = layui.layer

  $('#btnLogout').on('click',function(){
    // console.log('ok');
    layer.confirm('确定退出登录?', {icon: 3, title:'提示'}, function(index){
      //do something
      console.log('ok');
      //清空本地的token
      localStorage.removeItem('token')
      //重新跳转到登录页面
      location.href = './login.html'
      
      layer.close(index);
    });
  })
})


//获取用户基本信息
function getUserInfo(){
  $.ajax({
    method:'GET',
    url:'/my/userinfo',
    headers:{
      Authorization:localStorage.getItem('token')|| ''
    },
    success:function(res) {
      console.log(res);
      if(res.status !== 0) {
        return layui.layer.msg('获取用户信息失败!')
      }
      // 调用渲染用户头像
      renderAvater(res.data)
    },
  })
}
 
//渲染用户头像
function renderAvater(user) {
  //获取用户的用户名
  var name = user.nickname || user.username
  //设置欢迎文本
  $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
  //按需渲染用户头像
  if(user.user_pic !== null) {
    //渲染图片头像
    $('.layui-nav-img').attr('src',user.user_pic).show()
    $('.text-avater').hide()
  } else {
    //渲染文字头像
    $('.layui-nav-img').hide()
    var first = name[0].toUpperCase()
    $('.text-avater').html(first).show()
  }
  
}
