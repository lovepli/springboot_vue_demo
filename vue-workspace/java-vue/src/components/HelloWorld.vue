<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <span v-bind:title="message">
    鼠标悬停几秒钟查看此处动态绑定的提示信息！
  </span>
    <p v-if="seen">现在你看到我了</p>
    <hr>
    <ol>
      <li v-for="todo in todos">
        {{ todo.text }}
      </li>
    </ol>
    <h1>{{ msg2 }}</h1>
    <button v-on:click="reverseMessage">逆转消息</button>
    <input v-model="msg2">

    <router-link to="FatherComment"><h1>{{ msg3 }}</h1></router-link>
    <router-link to="ChildComment"><h1>{{ msg4 }}</h1></router-link>
    <router-link to="ChildComment2"><h1>{{ msg5 }}</h1></router-link>
    <router-link to="DateComment"><h1>{{ msg6 }}</h1></router-link>
    <router-link to="CheckboxComment"><h1>{{ msg7 }}</h1></router-link>
  </div>
</template>

<script>
export default {


  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js ',
      message:'页面加载于 ' + new Date().toLocaleString(),
      seen:true,
      todos: [
        { text: '学习 JavaScript' },
        { text: '学习 Vue' },
        { text: '整个牛项目' }
      ],
      msg2:'好好学习，work hard！',
      msg3:'父子组件传值问题',
      msg4:'子组件1页面',
      msg5:'子组件2页面',
      msg6:'日期组件的使用',
      msg7:'单选框CheckBox的使用'

    }
  },
  methods: {
    reverseMessage: function () {
      this.msg2 = this.msg2.split('').reverse().join('')
    }
  }
}
</script>


<style >

</style>
