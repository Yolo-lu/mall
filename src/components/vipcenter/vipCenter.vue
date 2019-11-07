<template>
  <div>
   <div class="row">
     <div class="item">
     <div><van-icon name="pending-payment" size="30px" /> </div>
     <div>待付款</div>
   </div>
     <div class="item">
       <div><van-icon name="send-gift-o" size="30px"/></div>
       <div>待发货</div>
     </div>
     <div class="item">
       <div><van-icon name="logistics" size="30px"/></div>
       <div>待收货</div>
     </div>
     <div class="item">
       <div><van-icon name="comment-o" size="30px"/></div>
       <div>评价</div>
     </div>
     <div class="item">
       <div><van-icon name="completed" size="30px"/></div>
       <div>已完成</div>
     </div>
   </div>
    <div class="container">
      <div class="list">
        <div><span><van-icon name="records" size="30px"/></span><span class="text">全部订单</span></div>
        <div> <van-icon name="arrow" size="30px"/></div>
      </div>
      <div class="list">
        <div><span><van-icon name="star-o" size="30px"/></span><span class="text">收藏管理</span></div>
        <div><van-icon name="arrow" size="30px"/></div>
      </div>
      <div class="list">
        <div><span><van-icon name="points" size="30px"/></span ><span class="text">地址管理</span></div>
        <div><van-icon name="arrow" size="30px"/></div>
      </div>
      <div class="list">
        <div><span><van-icon name="eye-o" size="30px"/></span><span class="text">最近浏览</span></div>
        <div><van-icon name="arrow" size="30px"/></div>
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
        active:0
      }
    },
    methods: {},

    mounted() {

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
      .text{
        display: inline-block;
        position: relative;
        top: -6px;
      }
    }
  }
</style>