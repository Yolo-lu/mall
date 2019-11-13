<template>
  <div>
    <div class="title">
      <div class="close" @click="back">
        <van-icon name="arrow-left" color="#58A9FB" size="35px" />
      </div>
      <div class="info">评价中心</div>
    </div>
    <div class="container">
      <div class="box1">
        <div class="img"><img :src="data.image_path" alt="" /></div>
        <div class="text">
          <div class="name">商品评分</div>
          <div class="content">
            <van-rate
              v-model="rate"
              :size="25"
              color="#ee0a24"
              void-icon="star"
              void-color="#eee"
            />
          </div>
        </div>
      </div>
      <div class="text">
        <textarea
          v-model="content"
          placeholder="说说你的购买感受吧~~"
        ></textarea>
      </div>
      <div class="content">
        <div class="null" @click="anonymoused">
          <van-icon name="success" v-if="anonymous" />
        </div>
        <div class="name">匿名评价</div>
      </div>
      <div class="sub" @click="sub">
        <van-button type="primary" size="large">提交</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Evaluation",
  components: {},
  props: {},
  data() {
    return {
      data: [], //待评价商品信息
      rate: 3, //评分
      anonymous: false ,//控制匿名与否
      content: "", // 评论框的内容
      id:'',
      order_id:'',
      _id:'',


    };
  },
  methods: {
    back() {
      this.$router.back();
    },
    async sub() {
      //评价的接口
      let conment={}
      conment.anonymous=this.anonymous;
      conment.rate=this.rate;
      conment.id=this.data.cid;
      conment.content=this.content;
      conment.order_id=this.data.order_id;
      conment.image=[];
      conment._id=this.data._id;
      console.log(conment);
      try {
        let res = await this.$api.comment(conment);
        if(res.code===200){
          this.$toast(res.msg)
        }
      } catch (e) {
        console.log(e);
      }
    },
    anonymoused() {
      this.anonymous = !this.anonymous;
    }
  },

  mounted() {
    this.data = this.$route.query.data;
    // console.log(this.data);
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
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
.container {
  position: fixed;
  margin-bottom: 80px;
  height: 620px;
  width: 100%;
  background: white;
  .box1 {
    display: flex;
    padding: 10px;
    background: white;
    .img {
      width: 80px;
      height: 80px;
      margin: 0 20px;
      img {
        display: block;
      }
    }
    .name {
      color: #333;
    }
    .content {
      margin-top: 20px;
    }
  }
  .text {
    button,
    input,
    textarea {
      color: inherit;
      font: inherit;
      width: 96%;
      border: 0;
      background: #f2f2f2;
      height: 150px;
      padding: 2%;
    }
  }
  .content {
    display: flex;
    margin: 10px 20px;
    .null {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: 1px solid #666;
      margin: 0 10px 20px 0;
    }
  }
  .sub {
    margin: 0 20px;
  }
}
</style>
