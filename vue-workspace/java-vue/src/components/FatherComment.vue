<template>
  <div>
    父组件：<p>点击次数: {{count}}</p>
    <hr>
    <!-- 引入子组件1 -->
    <child-comment :btnName="btnName" @update:count="changeCount"></child-comment>
    <hr>
    <!-- 引入子组件2 -->
    <child-comment2 :count="count"></child-comment2>
  </div>
</template>

<script>
  import childComment from '@/components/ChildComment.vue'
  import childComment2 from '@/components/ChildComment2.vue'

    export default {
        name: "FatherComment",
      components:{childComment,childComment2},
      data(){
          return{
            btnName: ' 我是一个button',
            count: 0
          }
      },
      methods: {
        changeCount () {
          ++this.count
        }
      }

    }

</script>


<style scoped>

</style>
