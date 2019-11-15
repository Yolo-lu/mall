<template>
  <div>
   <div class="head">
     <div class="title">
       <div class="close" @click="back">
         <van-icon name="arrow-left" color="#58A9FB" size="35px" />
       </div>
       <div class="info">评价中心</div>
     </div>
     <div class="img"><img src="../../assets/evaluate.jpg" alt="" /></div>
       <van-tabs v-model="active" class="tab" @click="roll">
         <van-tab title="待评价" ></van-tab>
         <van-tab title="已评价"></van-tab>
       </van-tabs>
   </div>
    <div ref="wrapper" class="container">
      <div v-if="active===0">
        <div v-if="data.length>0">
          <div class="box1" v-for="(item, index) in data" :key="index">
            <div class="img"><img :src="item.image_path" alt=""></div>
            <div class="text">
              <div class="name">{{item.name}}</div>
              <div class="content" @click="content(item)"><van-icon name="chat" />评论晒单</div>
            </div>
          </div>
        </div>
        <div class="no" v-else>暂无待评论</div>
      </div>
      <div v-if="active===1">
          <div class="box1" v-for="(item, index) in data1" :key="index">
            <div class="img"><img :src="item.goods[0].image_path" alt=""></div>
            <div class="text">
              <div class="name">{{item.goods[0].name}}</div>
              <div class="content watch" @click="watch(item)"><van-icon name="chat" />评价详情</div>
            </div>
          </div>
      </div>
    </div>

  </div>
</template>

<script>
  import BScroll from "better-scroll";
export default {
  name: "EvaluationCentre",
  components: {},
  props: {},
  data() {
    return {
      active: 0,
      data:[],  //待评价商品信息
      data1:[],  //已评价商品信息
      user:'', //登录的用户信息
    };
  },
  methods: {
    back() {
      this.$router.back();
    },
    async tobeEvaluated(page = 1) {
      if(this.user){  //判断是否为登录状态
        //查看待评价的接口
        try {
          let res = await this.$api.tobeEvaluated(page = 1);
          this.data=res.data.list
          // console.log(this.data);
        } catch (e) {
          console.log(e);
        }
      }
    },
    async alreadyEvaluated(page = 1) {
      if(this.user) {  //判断是否为登录状态
        //查看已评价的接口
        try {
          let res = await this.$api.alreadyEvaluated(page = 1);
          this.data1 = res.data.list;
          // console.log(this.data1);
        } catch (e) {
          console.log(e);
        }
      }
    },
    content(item){ //跳转评价
      this.$router.push({name:"evaluation",query:{data:item}})
    },
    watch(item){  //跳转评价详情
      this.$router.push({name:"evaluationdetail",query:{data:item}})
    },
    roll(){
      this.$nextTick(() => {
        //平滑滚动
        this.scroll = new BScroll(this.$refs.wrapper, {
          scrollY: true,
          click: true,
          startY: 0
        });
      });
    }
  },

  mounted() {
     this.user=JSON.parse(localStorage.getItem("user"))
    this.$nextTick(() => {
      //平滑滚动
      this.scroll = new BScroll(this.$refs.wrapper, {
        scrollY: true,
        click: true,
        startY: 0
      });
    });
    this.tobeEvaluated();
    this.alreadyEvaluated()
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
  .head{
    z-index: 99;
    background: white;
    padding-bottom: 40px;
  }
.title {
  display: flex;
  height: 45px;
  border-bottom: #f2f2f2 1px solid;
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
.img {
  height: 150px;
  img {
    width: 100%;
    display: block;
  }
}
.row{
  background: white;
}
  .tab{
    width: 80%;
    margin: auto;
    box-shadow: 5px 2px 5px rgba(89,89,89,0.58);
    position: relative;
    top: 40px;
  }
  .container{
    position: fixed;
    top: 280px;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    background: white;
    .no{
      text-align: center;
      margin-top: 50px;
    }
    .box1{
      display: flex;
      padding: 10px;
      border-bottom:1px solid #e2e2e2 ;
      .img{
        width: 80px;
        height: 80px;
        margin: 0 20px;
        img{
          display: block;
        }
      }
      .name{
        font-size: 14px;
        color: #333;
      }
      .content{
        color: red;
        border-radius: 15px;
        border: 1px solid red;
        font-size: 14px;
        padding: 2px 5px;
        width: 70px;
        margin: 30px 10px 20px 160px;
      }
      .watch{
        color: #333;
        border: 1px solid #333;
      }
    }
  }
</style>
