<template>
  <div>
    <div class="top">
      <div class="title">购物车</div>
      <div class="box" v-if="shopList.length === 0">
        <div class="img">
          <div style="margin: 0 auto;width: 80px;height: 80px">
            <img src="../../assets/shop.png" alt="" />
          </div>
        </div>
        <div class="text">你的购物车空空如也~~</div>
      </div>
      <div class="list" v-else>
        <div class="listHead">
          <div class="left">
            <div class="chooseAll">
              <van-checkbox
                v-model="checked"
                shape="square"
                checked-color="red"
                @click="checkAll"
              ></van-checkbox>
            </div>
            <div class="text">全选</div>
          </div>
          <div class="right">
            <div class="count">
              合计: <span>￥{{ total }}</span>
            </div>
            <div class="confirm">确认订单</div>
          </div>
        </div>
        <div class="button" v-if="checked">
          <div class="del">
            <van-button type="danger" @click="del">删除</van-button>
          </div>
          <div>
            <van-button type="danger" @click="order">去结算</van-button>
          </div>
        </div>
      </div>
    </div>
    <div ref="wrapper" class="container" :class="{height:checked}">
      <div>
        <div class="box1" v-for="(item, index) in shopList" :key="index">
          <div class="chooseAll">
            <van-checkbox
              v-model="item.check"
              shape="square"
              checked-color="red"
              @click="check(item)"
            >
            </van-checkbox>
          </div>
          <div class="img"><img :src="item.image_path" alt="" /></div>
          <div class="info">
            <div class="name">{{ item.name }}</div>
            <div class="bottom">
              <div class="price">￥{{ item.present_price }}</div>
              <div class="count">
                <van-stepper
                  v-model="item.count"
                  @change="edit(item.count, item.cid, item.present_price)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "ShoppingCar",
  components: {},
  props: {},
  data() {
    return {
      shopList: [],
      checked: false /*控制全选*/,
      num: 0 /*控制单选*/,
      id: "",
      list: [] /*打勾的*/
    };
  },
  methods: {
    async getCard() {
      try {
        //查看购物车
        let res = await this.$api.getCard();
        this.shopList = res.shopList;
        console.log(this.shopList, 1);
      } catch (e) {
        console.log(e);
      }
    },
    checkAll() {
      //全选
      this.checked = !this.checked;
      if (this.checked) {
        this.shopList.map(item => {
          item.check = true;
        });
      }
      if (!this.checked) {
        this.shopList.map(item => {
          item.check = false;
        });
      }
    },
    check(items) {
      //单选
      this.num = 0;
      items.check = !items.check;
      this.shopList.map(item => {
        if (item.check) {
          this.num++;
        }
      });
      if (this.num === this.shopList.length) {
        this.checked = true;
      } else {
        this.checked = false;
      }
    },
    async edit(count, id, mallPrice) {
      try {
        //编辑购物车加减
        let res = await this.$api.editCart(count, id, mallPrice);
        this.$toast(res.msg);
      } catch (e) {
        console.log(e);
      }
    },
    async del() {
      try {
        //删除购物车
        let list = [];
        this.shopList.map(item => {
          this.id = item.cid;
          list.push(this.id);
        });
        let res = await this.$api.deleteShop(list);
        console.log(res);
        this.$dialog
          .confirm({
            message: "你确认删除本商品"
          })
          .then(() => {
            if (res.code === 200) {
              this.shopList = this.shopList.filter(item => {
                return item.check === false;
              });
            }
          })
          .catch(() => {
            // on cancel
          });
      } catch (e) {
        console.log(e);
      }
    },
    order() {
      //跳转结算页面
      this.shopList.map(item => {
        if ((item.check = true)) {
          this.list.push(item);
        }
      });
      this.$store.state.list = this.list;
      this.$store.state.total = this.total;
      this.$router.push("/order");
    }
  },

  mounted() {
    this.getCard();
    this.$nextTick(() => {
      //平滑滚动
      this.scroll = new BScroll(this.$refs.wrapper, {
        scrollY: true,
        click: true,
        startY: 0
      });
    });
  },
  created() {},
  filters: {},
  computed: {
    total() {
      let sum = 0;
      this.shopList.map(item => {
        if (item.check === true) {
          sum += item.present_price * item.count;
        }
      });
      return sum;
    }
  },
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.top {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 99;
  .title {
    height: 50px;
    border-bottom: #f4f5f7 1px solid;
    text-align: center;
    line-height: 50px;
    margin: auto;
    background: white;
  }
  .box {
    margin-top: 120px;
    .img {
      width: 100%;
      img {
        width: 80px;
        height: 80px;
        display: block;
      }
    }
    .text {
      margin-top: 20px;
      text-align: center;
      color: #999;
    }
  }
  .list {
    .listHead {
      display: flex;
      border-bottom: #f4f5f7 1px solid;
      background: white;
      .left {
        padding: 10px;
        height: 50px;
        line-height: 50px;
        display: flex;
        .chooseAll {
          position: relative;
          top: 13px;
          border: 1px solid #f4f5f7;
          height: 20px;
        }
        .text {
          line-height: 50px;
          margin-left: 10px;
        }
      }
      .right {
        padding: 10px;
        margin-left: 150px;
        margin-top: 10px;
        .count {
          padding-bottom: 10px;
          span {
            color: red;
            font-size: 16px;
            font-weight: bold;
          }
        }
      }
    }
    .button {
      display: flex;
      justify-content: flex-end;
      background: white;
      padding: 10px;
      .del {
        margin-right: 10px;
      }
    }
  }
}
.container {
  height: 540px;
  margin-top: 120px;
  .box1 {
    background: white;
    display: flex;
    justify-content: flex-start;
    padding: 10px 0;
    .chooseAll {
      margin: 30px 20px 30px 10px;
      border: 1px solid #f4f5f7;
      height: 20px;
    }
    .img {
      width: 80px;
      height: 80px;
      margin-right: 30px;
      img {
        display: block;
        border: 1px solid #e2e2e2;
      }
    }
    .info {
      color: red;
      width: 60%;
      position: relative;
      .name {
        margin: 10px 0;
      }
      .bottom {
        margin: 10px 0;
        display: flex;

        .count {
          position: absolute;
          right: 20px;
        }
      }
    }
  }
}
.height{
  height: 480px;
  margin-top: 184px;
}
</style>
