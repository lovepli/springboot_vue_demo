<template>
  <div>
    子组件1：<button @click="clickHandle" > {{btnName}}</button>
  </div>
</template>

<script>
    export default {
        name: "ChildComment",
      // 接受父组件的值
     /* props: {
        btnName:'btnName'
      },*/
      props:['btnName'],
      //在子组件向父组件传值时需要使用 vue 中的 $on 和 $emit ，使用$emit 可以触发 $on 中监听的事件，现在我们来实现一个可以统计按钮点击次数的功能
      methods: {
        clickHandle () {
          this.$emit('update:count')
        }
      }
    }
</script>

<style >
  button{
    padding:25px 50px;
    margin:2px;
    background-color:#fff;
    border-radius: 5px;
  }
</style>
