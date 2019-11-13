<template>
  <div>
    <div class="all">
      <div class="title">
        <div class="close" @click="back">
          <van-icon name="arrow-left" color="#58A9FB" size="35px" />
        </div>
        <div class="info">评价中心</div>
      </div>
      <div class="user">
        <div class="avatar" v-if="!data.anonymous"><img :src="this.user.avatar" alt=""></div>
        <div class="avatar" v-else><img src="../../assets/head.jpg" alt=""></div>
        <div class="info">
          <div class="name">{{user.nickname}}</div>
          <div class="rate">
            <van-rate
                v-model="data.rate"
                :size="16"
                color="#ee0a24"
                void-icon="star"
                void-color="#eee"
            />
          </div>
        </div>
        <div class="time">{{data.comment_time}}</div>
      </div>
      <div class="content">评价内容：{{data.content}}</div>
      <div class="box1" v-for="(item,index) in data.goods" :key="index">
        <div class="img"><img :src="item.image_path" alt=""></div>
        <div class="name">{{item.name}}</div>
        <div class="shoppingCar" @click="add(data.cid)">
          <div class="icon"><van-icon name="cart-o" /></div>
        </div>
      </div>
      <div class="sub" @click="back">
        <van-button type="primary" size="large">返回</van-button>
      </div>
    </div>

  </div>
  
</template>

<script>
  export default {
    name: "EvaluationDetail",
    components: {},
    props: {},
    data() {
      return {
        data:{},  //评价详情信息
        user:{}
      }
    },
    methods: {
      back() {
        this.$router.back();
      },
      async add(id){
        try {
          //加入购物车
          let res = await this.$api.addShop(id);
          console.log(res);
          if (res.code === 200) {
            this.$toast(res.msg);
            this.num += 1;
          }
        } catch (e) {
          console.log(e);
        }
      }
    },

    mounted() {
      this.data = this.$route.query.data;
      console.log(this.data);
     this.user=JSON.parse(localStorage.getItem("user"))
    },
    created() {

    },
    filters: {},
    computed: {

    },
    watch: {},
    directives: {}
  }
</script>

<style scoped lang="scss">
  .all{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: white;
  }
  .title {
    display: flex;
    height: 45px;
    border-bottom: #f2f2f2 1px solid;
    background: white;
    .close {
      position: absolute;
      top: 10px;
      left: 10px;
    }
    .info {
      text-align: center;
      height: 40px;
      line-height: 40px;
      margin: auto;
    }
  }
  .user{
    display: flex;
    justify-content: space-around;
    padding: 15px;
    background: white;
    .avatar{
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: 1px solid #e2e2e2;
      img{
        display: block;
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
    }
    .info{
      margin: 5px 10px;
      .rate{
        margin-top: 10px;
      }
    }
    .time{
      font-size: 14px;
      margin-top: 10px;
    }
  }
  .content{
    background: white;
    padding: 10px 20px;
    border-bottom: #f2f2f2 1px solid;
  }
  .box1{
    display: flex;
    padding: 10px;
    .img{
      width: 80px;
      height: 80px;
      margin: 0 10px;
      img{
        display: block;
      }
    }
    .name{
      font-size: 14px;
      line-height: 20px;
      color: #333;
      margin: 10px 0;
    }
    .shoppingCar{
      width: 40px;
      height: 40px;
      background: #FFE6E2;
      border-radius: 50%;
      margin: 20px 30px;
      .icon{
        color: red;
       position: relative;
        top: 6px;
        left: 6px;
        font-size: 25px;
      }
    }
  }
  .sub {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
</style>