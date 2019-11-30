<template>
  <div>
    <p>{{msg1}}</p>
  <p v-if="seen">v-if="seen"你可以看到我！</p>
    <p v-bind:title="msg2"> 鼠标悬停几秒钟，查看此处绑定的提示信息</p>
    <p>v-bind:title="msg2"该指令的意思是：“将这个元素节点的 title 特性和 Vue 实例的 message 属性保持一致”。</p>
    <div>
    <ol>
      <li v-for="todo in todos">
        {{ todo.text }}
      </li>
    </ol>
    </div>
    <div>
      <p>
        这个将不会改变: {{ msg3 }}
      </p>
      <!--怎么v-html没有变化？？？-->
      <p>Using mustaches: {{ rawHtml }}</p>
      <p>Using v-html directive: <span v-html="rawHtml" style="color:red">This should be red</span></p>
    </div>

    <div>
      <p>Original message: "{{ msg4 }}"</p>
      <p>Computed reversed message: "{{ reversedMessage }}"</p>
    </div>
    <div>
      <p>Original message: "{{ msg5 }}"</p>
      <p>Reversed message: "{{ reversedMessage1() }}"</p>
    </div>
    <div>
      <p>
        Ask a yes/no question:
        <input v-model="question">
      </p>
      <p>{{ answer }}</p>
    </div>

    <div>
      <div v-if="Math.random() > 0.5">
        Now you see me v-if的使用方法！
      </div>
      <div v-else>
        Now you don't
      </div>
    </div>

    <div>
      <template v-if="loginType === 'username'">
        <label>Username</label>
        <input placeholder="Enter your username" key="username-input">
      </template>
      <template v-else>
        <label>Email</label>
        <input placeholder="Enter your email address" key="email-input">
      </template>
    </div>

  </div>
</template>

<!-- 因为 AJAX 库和通用工具的生态已经相当丰富，Vue 核心代码没有重复 -->
<!-- 提供这些功能以保持精简。这也可以让你自由选择自己更熟悉的工具。 -->
<script src="https://cdn.jsdelivr.net/npm/axios@0.12.0/dist/axios.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/lodash@4.13.1/lodash.min.js"></script>
<script>
    export default {
      name: "NewComment",
      data() {
        return {
          seen:true,
          msg1:'Hello World !',
          msg2:'页面加载于'+new Date().toLocaleDateString(),
          todos: [
            { text: '学习 JavaScript' },
            { text: '学习 Vue' },
            { text: '整个牛项目' }
          ],
          msg3:'哈哈哈！！',
          msg4:'你好啊！',
          msg5:'hahahh',
          question: '',
         answer: 'I cannot give you an answer until you ask a question!'
        };
      },
      created:function () { //created 钩子可以用来在一个实例被创建之后执行代码：
        console.log("msg1 is "+this.msg1)
      },
      computed: {
        // 计算属性的 getter
        reversedMessage: function () {
          // `this` 指向 vm 实例
          return this.msg4.split('').reverse().join('')
        }
      },
      methods: {
        reversedMessage1: function () {
          return this.msg4.split('').reverse().join('')
        },
        //监听函数的get方法
        getAnswer: function () {
          if (this.question.indexOf('?') === -1) { //如果输入的question字符串中没含有？符号标志
          this.answer = 'Questions usually contain a question mark. ;-)'
            return
          }
          this.answer = 'Thinking...'
          var vm = this
          axios.get('https://yesno.wtf/api')
            .then(function (response) {
              vm.answer = _.capitalize(response.data.answer)
            })
            .catch(function (error) {
              vm.answer = 'Error! Could not reach the API. ' + error
            })
        }
      },
      watch: {
        // 如果 `question` 发生改变，这个函数就会运行
        question: function (newQuestion, oldQuestion) {
          this.answer = 'Waiting for you to stop typing...'
          this.debouncedGetAnswer()
        }
      },
      created: function () {
        // `_.debounce` 是一个通过 Lodash 限制操作频率的函数。
        // 在这个例子中，我们希望限制访问 yesno.wtf/api 的频率
        // AJAX 请求直到用户输入完毕才会发出。想要了解更多关于
        // `_.debounce` 函数 (及其近亲 `_.throttle`) 的知识，
        // 请参考：https://lodash.com/docs#debounce
        this.debouncedGetAnswer = _.debounce(this.getAnswer, 500)
      },
    }
</script>

<style scoped>

</style>
