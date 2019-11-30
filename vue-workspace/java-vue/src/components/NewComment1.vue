<template>
  <div>

  <div>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      prop="date"
      label="日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址">
    </el-table-column>
  </el-table>
 </div>

    <div>
      <el-form>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <input type="reset" value="重置" ref="ResetForm" />
      </el-form-item>

        </el-form>
    </div>


<!--
    <div>
      <el-button type="primary" icon="el-icon-plu" @click="newInstumentSetup" style="float:right;">添加</el-button>
          </div>-->
    <div>
      <h1>{{title}}</h1>
    </div>

    <div>
      <!--子组件-->
      <editInstrumentSetup :childTableData="childTableData" ref="childComment"  @event="showMsg" ></editInstrumentSetup>
<!-- ref--$refs的使用  @event--$emit的使用方式  -->
    </div>

  </div>
</template>

<script>
  import editInstrumentSetup from '@/components/editInstrumentSetup.vue'

    export default {
        name: "NewComment1",
      components:{editInstrumentSetup},
      data() {
        return {
          tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }],
          title:'',  //标题
          childTableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }],
        }
      },
      methods:{
          onSubmit(){
            console.log("触发重置！");  //点击保存的时候触发重置，控制台打印输出
            this.$refs.ResetForm.click();
          },
        showMsg(title){
            this.title=title;
        }
      },
      mounted:function () {
          console.log(this.$refs.childComment);
          this.$refs.childComment.getMessage('父组件操作ref标记的childComment 组件DOM，调用该组件内部的getMessage方法，传递了这条信息，子組件！')
      }
    }
</script>

<style scoped>

</style>
