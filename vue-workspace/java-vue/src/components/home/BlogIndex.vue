<template>
  <div>
    <blog-header></blog-header>
    <hr/>
    <div>
    <div v-if="isLogin">你好：欢迎jamens李！</div>
        <div v-else>请登录后操作</div>
      <!-- 这里router-link to="newcontact"会把路由导航到http://localhost:8080/#/newcontact   -->
      <router-link to="newcontact"><h1>{{ msg }}</h1></router-link>
      <router-link to="newhelloworld"><h1>{{ msg2 }}</h1></router-link>
      <router-link to="helloworld"><h1>{{ msg3 }}</h1></router-link>
    </div>
    <hr/>
    <blog-footer></blog-footer>
  </div>
</template>

<script>
  import blogHeader from '@/components/common/BlogHeader.vue'   //引入头部组件
  import blogFooter from '@/components/common/BlogFooter.vue'   //引入尾部组件
    export default {
        name: "BlogIndex",
      // blogHeader/blogFooter组件给申明到components里面然后在template里面使用
      components: { blogHeader, blogFooter },
      data () {    //由于是组件，data必须是个函数，这是ES6写法，data后面加括号相当于data: function () {}
        return {   //记得return不然接收不到数据
          msg: 'Welcome to index！',//上面的 msg 就是这里输出的
          msg2:'vue实现增删改查！',
          msg3:'开始探索vue框架之旅！',
          isLogin:true
        }
      }
    }
</script>

<style >
  h1 {
    font-weight: normal;
  }
  a {
    color: #42b983;
  }
</style>
