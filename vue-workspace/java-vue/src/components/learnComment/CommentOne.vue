<template>
  <div>
    <div>
  <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
    <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
    <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
    <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
  </el-tabs>
    </div>

    <div>
      <el-radio-group v-model="radio">
        <el-radio :label="3">备选项</el-radio>
        <el-radio :label="6">备选项</el-radio>
        <el-radio :label="9">备选项</el-radio>
      </el-radio-group>
    </div>
    <div>
      <el-radio v-model="radio1" label="1">备选项</el-radio>
      <el-radio v-model="radio1" label="2">备选项</el-radio>

    </div>
<div>
<ul>
           <li v-for="item in sortItems" >
                {{item}}
           </li>
       </ul>
</div>


  </div>

</template>

<script>
    export default {
        name: "CommentOne",
      data() {
        return {
          activeName: 'first',
          radio: 3,
          radio1:'2',
          items:[20,,18,65,32,19,54,56,41]
        };
      },
      methods: {
        handleClick(tab, event) {
          console.log(tab, event);
        },
        sortNumber(a,b){
            return a-b
        }
      },
      computed:{
    sortItems:function(){
          return this.items.sort(); 
          //return this.Items.sort(sortNumber);
    }
    }
    }
</script>

<style scoped>

</style>
