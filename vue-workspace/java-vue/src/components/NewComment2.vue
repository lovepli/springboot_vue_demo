<template>
  <div>
  <div>
    <!-- 事件处理
    我们在此处定义当我们点击时触发handler方法，
       相应的，在methods中存放handler的方法即可
       如果handler事件中需要传递参数，那么要加括号，如handler(data)
       参数可以为常规值或事件对象$event
        -->
    <button @click="handler">点击按钮</button>
    <!--
    也可以写成
    <button v-on:click="handler">点击按钮</button>
     -->
    <p>{{msg}}</p>
  </div>


      </div>
</template>

<script>
    export default {
        name: "NewComment2",
      data:{
        msg:'hello world!',
        msg2:'computed计算属性的使用总结！'
      },
      //实例初始化之后（刚刚创建了实例，还没初始化data,methods,computed...）
      beforeCreate(){
        //console.log(this);//在事件钩子中，this代表当前对象实例
        console.log(this.$data);//undefined
        //此时有vue中的值但未被初始化，{{msg}}未被解析
        alert('beforeCreate');//alert可以阻塞当前代码的运行
      },
      //创建了实例，初始化了data,methods,，computed...，并且启动了数据监听
      created(){
        console.log(this.$data);//[object Object]: {msg: "hello lifecycle"}
        //此时{{msg}}还未被解析，我们可以手动添加msg的值
        this.msg = 'hello world';
        console.log(this.$data);//[object Object]: {msg: "hello world"}
        alert('created');
      },
      //在数据挂载之前，可以对数据做最后一次修改
      beforeMount(){
        this.msg = 'last change';
        console.log(this.$data);//[object Object]: {msg: "last change"}
        alert('beforeMount');
      },
      //数据挂载(渲染)之后，即model中的数据显示到了view中
      mounted(){
        //此时在页面中打印出hello world
        alert('mounted');
      },
      //以上四个阶段在一次渲染之后就不会再执行了

      //模型发生改变，数据渲染之前执行
      beforeUpdate(){
        alert('update');//未执行，因为值没改变
        //想要改变的话可以在上面代码中加入    <input type="text" v-model="msg">
        //一旦发生改变，beforeUpate就会被反复执行
      },
      //模型发生改变，并且数据渲染之后执行
      updated(){
        alert('updated');//每次改变都会被激发
      },
      //vue实例销毁之后（一般我们等不到它销毁）
      beforeDestroy(){
        alert('beforeDestroy');
      },
      //vue实例销毁之后
      destroyed(){
        alert('destroyed');
      },
      //监听数据的变化
      watch:{
        //这里我们监听msg的变化
        msg:{
          handler(now,old){
            console.log(now,old);//打印当前值和之前的值 last change hello lifecycle
          }
        }
      },
      //存放所有定义的方法或事件处理机制
      methods:{
        handler(){
          alert("你点击了按钮~~");
        }
        /*
        handler(){},是es6的写法
        es5的写法是这样的：
        handler:function(){
            alert("你点击了按钮~~");
        }
        箭头函数的写法是这样的：
        handler:()=>{
            alert("你点击了按钮~~");
        }
        */
      }
    }
</script>

<style scoped>

</style>
