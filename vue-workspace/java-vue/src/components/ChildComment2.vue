<template>
  <div>
  子组件2：
  <p>点击次数: {{count}}</p>
  </div>
</template>

<script>
    export default {
        name: "ChildComment2",
        props: ['count'],
/*      data () {
        return {
          count: 0
        }
      },
      created () {
        Event.$on('update:count', () => {
          ++this.count
        })
      }*/

    }
</script>

<style scoped>

</style>
