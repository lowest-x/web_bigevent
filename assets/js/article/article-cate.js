$(function(){
  var layer = layui.layer
  var form =  layui.form
 initArticleList()

 //获取文章分类的列表
function initArticleList(res) {
  $.ajax({
    method:'GET',
    url:'/my/article/cates',
    success:function(res) {
      // console.log(res);
     var htmlstr = template('tpl-table',res)
     $('tbody').html(htmlstr)
    }
  })
}

//为添加类别按钮绑定点击事件\
var indexAdd = null
$('#btnAddCate').on('click',function(){
  indexAdd = layer.open({
    type:1,
    area:['500px','350px'],
    title: '添加文章分类'
    ,content: $('#dialog-add').html()
  });   
})

//通过代理的形式 为form-add表单绑定submit事件
$('body').on('submit','#form-add',function(e){
  e.preventDefault()
  // console.log('ok');
  $.ajax({
    method:'POST',
    url:'/my/article/addcates',
    data:$(this).serialize(),
    success:function(res) {
      if (res.status !== 0) {
        return layer.msg('新增分类失败！')
      }
      // console.log('ok');
      initArticleList()
      layer.msg('新增分类成功！')
      // 根据索引关闭对应的弹出层
      layer.close(indexAdd)
    }
  })
})

//通过代理的形式 为btn-edit绑定点击事件
var indexEdit = null
$('tbody').on('click','.btn-edit',function(){
  // console.log('ok');
  //弹出一个修改文章信息分类的层
  indexEdit = layer.open({
    type:1,
    area:['500px','350px'],
    title: '修改文章分类'
    ,content: $('#dialog-edit').html()
  });   

  var id = $(this).attr('data-Id')
  // console.log(id);
  //发起请求获取对应的数据
  $.ajax({
    method:'GET',
    url:'/my/article/cates/' + id ,
    success:function(res) {
      // console.log(res);
      form.val('form-edit',res.data)

    }
  })
})

//通过代理的形式，为修改分类的表单绑定submit事件
$('body').on('submit','#form-edit',function(e){
  e.preventDefault()
  $.ajax({
    method:'POST',
    url:'/my/article/updatecate',
    data:$(this).serialize(),
    success:function(res) {
      if(res.status!==0) {
        return layer.msg('更新数据失败')
      }
      layer.msg('更新数据成功')
      layer.close(indexEdit)
      initArticleList()
    }
  })

})

//通过代理的形式，为删除按钮绑定点击事件
$('tbody').on('click','.btn-delete',function(){
  console.log('ok');
  var id =$(this).attr('data-id')
  // 提示用户是否要删除
  layer.confirm('确认删除', {icon: 3, title:'提示'}, function(index){
    //do something
  $.ajax({
    method:'GET',
    url:'/my/article/deletecate/'+ id,
    success:function(res){
      if(res.status !== 0) {
        return layer.msg('删除分类失败！')
      }
      layer.msg('删除分类成功!')    
      layer.close(index);
      initArticleList()
    }
  })
  });
})
})
