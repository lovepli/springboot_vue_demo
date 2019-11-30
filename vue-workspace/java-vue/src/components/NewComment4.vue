<template>
  <div>
    <h4>测试--计算属性的getter方法</h4>
    <div>
      <input type="text" v-model="message" />
      <div>{{changeMessage}}</div>
    </div>
    <h4>测试--计算属性的setter方法</h4>
    <div>
      {{didi}}
      {{family}}
    </div>
    <div>
      {{didiFamily}}
    </div>
    <h4>测试--计算属性的缓存</h4>

    <div>
      <input type="text" v-model="msg" />
      <div>{{now}}</div>
    </div>

    <h4> 常见问题一：计算属性getter不执行的场景</h4>
    <div>
      <button @click="toggleShow">Toggle Show Total Price</button>
      <p v-if="showTotal">Total Price = {{totalPrice}}</p>
    </div>

    <h4> 常见问题二：在v-for中使用计算属性，起到类似"过滤器的作用"</h4>
    <div>
      <ul>
        <li v-for="n in evenNumbers">{{n}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
    export default {
        name: "NewComment4",
      data () {
        return {
          message: 'hello',
          didi: 'didi',
          family: 'family',
          msg:'hello',
          numbers: [ 1, 2, 3, 4, 5 ],
          showTotal: true,
          basePrice: 100

        }
      },
      computed: {
        changeMessage: {
          // 计算属性：依赖message变化而变化  依赖没变化就不会重新渲染；
          get () {
            return this.message + 'world'
          },
          set () {
          }
        },
        didiFamily:{
          //getter
          get:function(){
            return this.didi + ' ' + this.family
          },
          //setter
          set:function(newValue){
            // 这里由于该计算属性被赋值，将被调用
            console.log(newValue)

            this.didi = 123
            this.family = 456
          }
        },
        now:{
          cache: false,
          get:function(){
            return Date.now() + this.msg
          }
        },
        totalPrice () {
          return this.basePrice + 1
        },
        evenNumbers () {
          return this.numbers.filter(function (number) {
            return number % 2 === 0
          })
        }
      },
      mounted () {
        // 赋值，调用setter函数
        this.didiFamily = 'John Doe',
          setInterval(() => {
            // 当缓存开关为false的时候，定时器每次打印的时间都是不一样的
            console.log(this.now)
          }, 500)
      },
      methods: {
        toggleShow () {
          this.showTotal = !this.showTotal
        }
      }

    }
</script>

<style scoped>

</style>
