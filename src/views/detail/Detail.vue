<template>
  <div>
    <div class="back" @click="goBack"><van-icon name="arrow-left" size="25px" class="left"/></div>
    <slide :data="data.goodsOne" v-if="data.goodsOne"></slide>
    <div class="text">
      <div class="name">{{data.goodsOne.name}}</div>
      <div class="price">￥{{data.goodsOne.present_price}}</div>
      <div class="row">
        <div class="freight">运费：{{data.goodsOne.__v}}</div>
        <div class="surplus">剩余：{{data.goodsOne.amount}}</div>
       <div v-if="lock===true">
         <div class="collect">取消收藏
         <div class="heart" @click="cancelCollection(id)" ><van-icon name="like" color="#FF4847"  /></div>
       </div>
       </div>
        <div v-else>
          <div class="collect">收藏
            <div class="heart" @click="collection(data.goodsOne)"><van-icon name="like-o"/></div>
          </div>
        </div>
      </div>

    </div>
    <van-tabs v-model="active">
      <van-tab title="商品详情">
        <div class="all" ref="wrapper">
          <div><div class="detail" v-html="this.data.goodsOne.detail">{{this.data.goodsOne.detail}}</div></div>
        </div>
      </van-tab>
      <van-tab title="商品评论">暂无评论</van-tab>
    </van-tabs>
    <van-goods-action>
      <van-goods-action-icon icon="wap-home-o" text="首页" @click="onClickIcon('/home')" />
      <van-goods-action-icon icon="cart-o" text="购物车" @click="onClickIcon('/shoppingCar')" />
      <van-goods-action-button type="warning" text="加入购物车" @click="onClickButton" />
      <van-goods-action-button type="danger" text="立即购买" @click="onClickButton" />
    </van-goods-action>
  </div>
</template>

<script>
  import slide from "../../components/slide/Slide";
  import BScroll from "better-scroll";
export default {
  name: "Detail",
  components: {
    slide
  },
  props: {

  },
  data() {
    return {
      id: "",
      data :{},
      active:0,
      lock:false
    };
  },
  methods: {
    async goodOne(id) {
      try {
        let res = await this.$api.goodOne(id);
        this.data=res.goods
        // console.log(this.data);
        this.$nextTick(() => {    //平滑滚动
          this.scroll = new BScroll(this.$refs.wrapper, {
            scrollY: true,
            click: true,
            startY:0
          });
        });
      } catch (e) {
        console.log(e);
      }
    },
    goBack(){
      this.$router.back()
    },
    onClickIcon(index) {
      this.$router.push(index)
    },
    onClickButton() {

    },
    async collection(goodsOne) {
      try {
        let res = await this.$api.collection(goodsOne) ;
        console.log(res);
        if(res.code!==200){
          this.$router.push("./login")
        }
        this.lock=true  //点击收藏后变成取消收藏
      } catch (e) {
        console.log(e);
      }
    },
    async cancelCollection(id) {
      try {
        let res = await this.$api.cancelCollection(id);
        console.log(res);
        this.lock=false  //点击取消收藏后又变回收藏
      } catch (e) {
        console.log(e);
      }
    },
  },

  mounted() {
    this.id = this.$route.query.id; //接收分类页、首页的id
    this.goodOne(this.id)
  },
  created() {},
  filters: {},
  computed: {

  },
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
  *{
  }
  .back{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(91,92,86,0.5);
    text-align: center;
    position: fixed;
    top: 10px;
    left: 10px;
    z-index: 99;
    .left{
      line-height: 40px;
      color: white;
    }
  }
  .text{
    background: white;
    .name{
      padding-left: 10px;
      font-size: 18px;
    }
    .price{
      padding: 10px;
      color: #FF4847;
    }
    .row{
      display: flex;
      padding: 10px;
      font-size: 13px;
      color:#C3B8B3;
      height: 40px;
      line-height: 40px;
      .freight,.surplus{
        margin-right: 60px;
      }
      .collect{
        display: flex;
        .heart{
          margin-left: 5px;
          font-size: 22px;
        }
      }
    }
  }
  .all{
    height: 667px;
  }
</style>
