<template>
  <div>
  <div>
    <el-table :data="childTableData"  style="width: 100%">

      <el-table-column prop="date" label="日期" width="180"> </el-table-column>

      <el-table-column  prop="name" label="姓名" width="180"> </el-table-column>

      <el-table-column prop="address" label="地址">  </el-table-column>

    </el-table>
  </div>

  <div>
    <h3>{{message}}</h3>  <!--父组件传递过来值-->
  </div>
  </div>
</template>

<script>
    export default {
      name: "editInstrumentSetup",
     props: ['childTableData'],  //父组件传递过来的是一个对象类型
      data(){
        return{
          message:''
        }
      },
      methods:{
        getMessage(m){
          this.message=m;
        }
      },
      mounted:function () {
        this.$emit('event','我是父组件！子组件传递给我的数据，我拿到了哈哈！！')  //子组件调用event事件对应的父组件里面的showMsg方法，传递了一个参数
      }

    }
</script>

<!--1、父组件可以使用 props 把数据传给子组件。-->
<!--2、子组件可以使用 $emit 触发父组件的自定义事件。-->

<!--vm.$emit( event, arg ) //触发当前实例上的事件-->

<!--vm.$on( event, fn );//监听event事件后运行 fn；-->

<style scoped>

</style>
