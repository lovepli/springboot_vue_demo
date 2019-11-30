<template>
  <div>
  <div class="block">
    <span class="demonstration">默认</span>
    <el-date-picker
      v-model="value4"
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
  </div>
    <br/>
  <br/>
  <div class="block">
    <span class="demonstration">带快捷选项</span>
    <el-date-picker
      v-model="value5"
      type="datetimerange"
      :picker-options="pickerOptions2"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      align="right">
    </el-date-picker>
  </div>
    <br/>
    <br/>
    <div class="block">
      <span class="demonstration">使用 value-format</span>
      <div class="demonstration">值：{{ value11 }}</div>
      <el-date-picker
        v-model="value11"
        type="date"
        placeholder="选择日期"
        format="yyyy 年 MM 月 dd 日"
        value-format="yyyy-MM-dd">
      </el-date-picker>
    </div>
    <br/>
    <br/>
    <div class="block">
      <span class="demonstration">使用 value-format+moment.js</span>
      <div class="demonstration">值：{{ value12 }}</div>
      <el-date-picker
        v-model="value12"
        type="date"
        placeholder="选择日期"
        format="yyyy 年 MM 月 dd 日"
        value-format="yyyy-MM-dd">
      </el-date-picker>
    </div>

    <div>
      <router-link to="ChildComment3"><h1>{{ msg8 }}</h1></router-link>
    </div>
    <div>
      <router-link to="NewComment1"><h1>{{ msg9 }}</h1></router-link>
    </div>
    <div>
      <router-link to="NewComment2"><h1>{{ msg10 }}</h1></router-link>
    </div>
    <div>
      <router-link to="NewComment4"><h1>{{ msg2 }}</h1></router-link>
    </div>
    <div>
      <router-link to="NewComment3"><h1>{{ msg11 }}</h1></router-link>
    </div>
    <div>
      <router-link to="CommentOne"><h1>{{ msg3 }}</h1></router-link>
    </div>

  </div>
</template>

<script>
    export default {
        name: "DateComment",
      data() {
        return {
          pickerOptions2: {
            shortcuts: [
              {
              text: '最近一周',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
              }
            },
              {
              text: '最近一个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
              }
            }
              , {
              text: '最近三个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
              }
            }
            ]
          },
        value4: [new Date(2000, 10, 10, 10, 10), new Date(2019, 12, 11, 10, 10)],
          //value4: [new Date(), new Date()+ 3600 * 1000 * 24 * 30],
          value5: '',
          value11:new Date(), //默认显示当前时间
          value12:this.$util.getCurrentMonth()[1],//默认显示这个月的最后一天this.$util.getCurrentMonth()[1]
          msg8:'vue基础组件的使用',
          msg9:'vue基础组件传值问题详解',
          msg10:'vue组件的生命周期与钩子函数',
          msg11:'Dialog对话框的使用',
          msg2:'组件钩子函数--computed的使用',
          msg3:'element组件的使用①'

        };
      }

    }
</script>

<style scoped>

</style>
