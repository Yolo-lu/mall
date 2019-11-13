<template>
  <div>
   <div class="row">
     <div class="item">
     <div><van-icon name="pending-payment" size="30px" /> </div>
     <div>待付款</div>
   </div>
     <div class="item">
       <div><van-icon name="send-gift-o" size="25px"/></div>
       <div>待发货</div>
     </div>
     <div class="item">
       <div><van-icon name="logistics" size="25px"/></div>
       <div>待收货</div>
     </div>
     <div class="item" @click="evaluation">
       <div>
         <van-icon name="comment-o" size="25px" :info="data.length" v-if="data.length"/>
         <van-icon name="comment-o" size="25px" v-else />
       </div>
       <div>评价</div>
     </div>
     <div class="item" @click="compeleted">
       <div><van-icon name="completed" size="25px"/></div>
       <div>已完成</div>
     </div>
   </div>
    <div class="container">
      <div class="list" @click="compeleted">
        <div><span><van-icon name="records" size="25px"/></span><span class="text">全部订单</span></div>
        <div> <van-icon name="arrow" size="20px"/></div>
      </div>
      <div class="list" @click="collection">
        <div><span><van-icon name="star-o" size="25px"/></span><span class="text">收藏管理</span></div>
        <div><van-icon name="arrow" size="20px"/></div>
      </div>
      <div class="list" @click="address">
        <div><span><van-icon name="points" size="25px"/></span ><span class="text" >地址管理</span></div>
        <div><van-icon name="arrow" size="20px"/></div>
      </div>
      <div class="list" @click="watched">
        <div><span><van-icon name="eye-o" size="25px"/></span><span class="text">最近浏览</span></div>
        <div><van-icon name="arrow" size="20px"/></div>
      </div>
    </div>
  </div>
  
</template>

<script>
  export default {
    name: "vipCenter",
    components: {},
    props: {},
    data() {
      return {
        active:0,
        data:{}
      }
    },
    methods: {
      address(){
        this.$router.push("/adresslist")
      },
      collection(){
        this.$router.push("/collection")
      },
      compeleted(){
        this.$router.push("/completed")
      },
      evaluation(){
        this.$router.push("/evaluationcentre")
      },
      watched(){
        this.$router.push("/watch")
      },
      async tobeEvaluated() {
        //查看待评价的接口
        try {
          let res = await this.$api.tobeEvaluated();
          this.data=res.data.list
        } catch (e) {
          console.log(e);
        }
      },
    },

    mounted() {
    this.tobeEvaluated()
    },
    created() {

    },
    filters: {},
    computed: {},
    watch: {},
    directives: {}
  }
</script>

<style scoped lang="scss">
.row{
  display: flex;
 padding: 10px 0;
  background: white;
  .item{
    flex: 1;
    text-align: center;

  }
}
  .container{
    background: white;
    padding-top: 10px;
    .list{
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #f4f5f7;
      margin: 0 10px;

      .text{
        display: inline-block;
        position: relative;
        top: -6px;
        font-size: 16px;
      }
    }
  }
</style>