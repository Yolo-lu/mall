<template>
  <div>
    <div class="whole" ref="wrapper">
      <div>
        <div class="back" @click="goBack">
          <van-icon name="arrow-left" size="25px" class="left" />
        </div>
        <slide :data="data.goodsOne" v-if="data.goodsOne"></slide>
        <div class="text" v-if="data.goodsOne">
          <div class="name">{{ data.goodsOne.name }}</div>
          <div class="price">￥{{ data.goodsOne.present_price }}</div>
          <div class="row">
            <div class="freight">运费：{{ data.goodsOne.__v }}</div>
            <div class="surplus">剩余：{{ data.goodsOne.amount }}</div>
            <div v-if="lock">
              <div class="collect">
                取消收藏
                <div class="heart" @click="cancelCollection(id)">
                  <van-icon name="like" color="#FF4847" />
                </div>
              </div>
            </div>
            <div v-else>
              <div class="collect">
                收藏
                <div class="heart" @click="collection(data.goodsOne)">
                  <van-icon name="like-o" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <van-tabs v-model="active">
          <van-tab title="商品详情">
            <div class="all" v-if="data.goodsOne">
              <div>
                <div class="detail" v-html="data.goodsOne.detail">
                  {{ this.data.goodsOne.detail }}
                </div>
              </div>
            </div>
          </van-tab>
          <van-tab title="商品评论" v-if="!data.comment">暂无评论</van-tab>
          <van-tab title="商品评论" v-else>
            <div class="all">
              <div
                class="user"
                v-for="(item, index) in data.comment"
                :key="index"
              >
                <div class="infos">
                  <div class="avatar" v-if="!item.anonymous">
                    <img :src="item.user[0].avatar" alt="" />
                  </div>
                  <div class="avatar" v-else>
                    <img src="../../assets/head.jpg" alt="" />
                  </div>
                  <div class="info">
                    <div class="name" v-if="!item.anonymous">
                      {{ item.user[0].nickname }}
                    </div>
                    <div class="rate">
                      <van-rate
                        v-model="item.rate"
                        :size="16"
                        color="#ee0a24"
                        void-icon="star"
                        void-color="#eee"
                      />
                    </div>
                    <div class="content">评论内容：{{ item.content }}</div>
                  </div>
                  <div class="time">{{ item.comment_time }}</div>
                </div>
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
    <van-goods-action>
      <van-goods-action-icon
        icon="wap-home-o"
        text="首页"
        @click="onClickIcon('/home')"
      />
      <div v-if="num > 0">
        <van-goods-action-icon
          icon="cart-o"
          text="购物车"
          :info="num"
          @click="onClickIcon('/shoppingCar')"
        />
      </div>
      <div v-else>
        <van-goods-action-icon
          icon="cart-o"
          text="购物车"
          @click="onClickIcon('/shoppingCar')"
        />
      </div>
      <van-goods-action-button
        type="warning"
        text="加入购物车"
        @click="onClickCar"
      />
      <van-goods-action-button
        type="danger"
        text="立即购买"
        is-link
        @click="showPopup"
      />
      <van-popup
        v-model="show"
        position="bottom"
        :style="{ height: '35%', width: '100%' }"
        get-container="body"
      >
        <div class="info" v-if="data.goodsOne">
          <div class="img"><img :src="data.goodsOne.image_path" alt="" /></div>
          <div class="text">
            <div class="name">{{ data.goodsOne.name }}</div>
            <div class="price">￥{{ data.goodsOne.present_price }}</div>
          </div>
          <div class="del" @click="clear()">
            <div class="icon">
              <van-icon name="cross" color="#999" size="12px" />
            </div>
          </div>
        </div>
        <div class="sum">
          <div class="left">
            <div class="top">购买数量：</div>
            <div class="bottom" v-if="data.goodsOne">
              <span class="splus">剩余{{ data.goodsOne.amount }}</span>
              <span class="eve">每人限购50件</span>
            </div>
          </div>
          <div class="right">
            <van-stepper v-model="value" />
          </div>
        </div>
        <div class="footer" @click="order">
          <van-button type="danger" size="large">立即购买</van-button>
        </div>
      </van-popup>
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
  props: {},
  data() {
    return {
      id: "",
      data: {},
      active: 0,
      lock: false,
      num: 0, //购物车数量
      show: false, //设置的遮罩层
      value: 1, // 立即购买时默认数量
      user: {}, //用户信息
      ordered: null //进入详情页的顺序
    };
  },

  methods: {
    async goodOne(id) {
      //请求单个商品详情
      try {
        let res = await this.$api.goodOne(id);
        this.data = res.goods;
        if (this.data) {
          this.$nextTick(() => {
            //平滑滚动
            new BScroll(this.$refs.wrapper, {
              scrollY: true,
              click: true,
              startY: 0
            });
          });
        }
        // console.log(this.data);
        if (!localStorage.getItem("data")) {
          //拿到数据
          let arr = [];
          arr.push(this.data.goodsOne); //操作数据
          localStorage.setItem("data", JSON.stringify(arr)); //放回数据
        } else {
          let arr = JSON.parse(localStorage.getItem("data"));
          this.ordered = null;
          arr.map((item, index) => {
            if (item.id === this.data.goodsOne.id) {
              this.ordered = index + 1;
            }
          });
          if (this.ordered) {
            arr.splice(this.ordered - 1, 1);
          }
          arr.unshift(this.data.goodsOne);
          localStorage.setItem("data", JSON.stringify(arr));
        }
      } catch (e) {
        console.log(e);
      }
    },
    goBack() {
      this.$router.back();
    },
    onClickIcon(index) {
      this.$router.push(index);
    },
    async getCard() {
      let user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        //是否是登录状态
        try {
          //查看购物车
          let res = await this.$api.getCard();
          this.shopList = res.shopList;
          this.shopList.map(item => {
            this.num += item.count;
          });
        } catch (e) {
          console.log(e);
        }
      }
    },
    async onClickCar() {
      let user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        //是否是登录状态
        try {
          //加入购物车
          let res = await this.$api.addShop(this.id);
          if (res.code === 200) {
            this.$toast(res.msg);
            this.num += 1;
          }
        } catch (e) {
          console.log(e);
        }
      } else {
        this.$router.push("/login");
      }
    },
    async collection(goodsOne) {
      //收藏
      try {
        let res = await this.$api.collection(goodsOne);
        // console.log(res);
        if (res.code !== 200) {
          this.$router.push("./login");
        }
        this.lock = true; //点击收藏后变成取消收藏
      } catch (e) {
        console.log(e);
      }
    },
    async cancelCollection(id) {
      //取消收藏
      try {
        let res = await this.$api.cancelCollection(id);
        console.log(res);
        this.lock = false; //点击取消收藏后又变回收藏
      } catch (e) {
        console.log(e);
      }
    },
    async isCollection(id) {
      //查询是否收藏
      try {
        let res = await this.$api.isCollection(id);
        if (res.isCollection === 1) {
          this.lock = true;
        }
        // console.log(res);
      } catch (e) {
        console.log(e);
      }
    },
    showPopup() {
      let user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        //是否是登录状态
        //打开遮罩层
        this.show = true;
      } else {
        this.$router.push("/login");
      }
    },
    clear() {
      this.show = false; //关闭遮罩层
    },
    order() {
      //跳转结算页面   需要什么参数挂载什么参数
      this.data.goodsOne.cid = this.data.goodsOne.id;
      this.data.goodsOne.count = this.value;
      this.$store.state.total = this.value * this.data.goodsOne.present_price;
      this.data.goodsOne.idDirect = true;
      let arr = [];
      // console.log(arr);
      arr.push(this.data.goodsOne);
      this.$store.state.list = arr;
      this.$router.push("/order");
    }
  },

  mounted() {
    this.id = this.$route.query.id; //接收分类页、首页的id
    this.goodOne(this.id);

    this.getCard();
    this.isCollection(this.id);
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.whole {
  /*position: relative;*/

  height: 600px;
  background: white;
  margin-bottom: 60px;
  /*position: fixed;*/
}
.back {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(91, 92, 86, 0.5);
  text-align: center;
  .left {
    line-height: 40px;
    color: white;
  }
}
.text {
  background: white;
  .name {
    padding-left: 10px;
    font-size: 18px;
  }
  .price {
    padding: 10px;
    color: #ff4847;
  }
  .row {
    display: flex;
    padding: 10px;
    font-size: 13px;
    color: #c3b8b3;
    height: 40px;
    line-height: 40px;
    .freight,
    .surplus {
      margin-right: 60px;
    }
    .collect {
      display: flex;
      .heart {
        margin-left: 5px;
        font-size: 22px;
      }
    }
  }
}
/*.all {*/
/*  height: 667px;*/
/*}*/
.user .infos {
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 1px solid #e2e2e2;
    img {
      display: block;
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }
  .info {
    margin: 5px 20px;
    .rate {
      margin-top: 10px;
    }
    .content {
      margin-top: 20px;
    }
  }
  .time {
    font-size: 14px;
    margin-top: 10px;
    color: #333;
  }
}

.info {
  .del {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    border: 1px solid #999;
    position: absolute;
    right: 10px;
    top: 10px;
    .icon {
      text-align: center;
    }
  }
  .img {
    width: 80px;
    height: 80px;
    border: 1px solid #e4e4e4;
    background: white;
    z-index: 99;
    img {
      display: block;
    }
  }
  .text {
    font-size: 14px;
    margin: 10px 20px;
    .name {
      font-size: 14px;
    }
  }
}
.sum {
  display: flex;
  padding: 20px;
  border-bottom: 1px solid #e4e4e4;
  font-size: 14px;
  .bottom {
    margin: 10px 0;
    .eve {
      padding-left: 10px;
      color: red;
    }
  }
  .right {
    margin-left: 70px;
  }
}
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
