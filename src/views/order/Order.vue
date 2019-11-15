<template>
  <div>
    <div class="head">
      <div class="title">
        <div class="close" @click="back">
          <van-icon name="arrow-left" color="#58A9FB" size="35px" />
        </div>
        <div class="info">订单结算</div>
      </div>
      <div class="null" v-if="defaultAddress===null" @click="addAddress">点击添加收货地址</div>
      <div class="have" v-else>
        <div class="top">
          <div class="name">收货人：{{ defaultAddress.name }}</div>
          <div class="tel">{{ defaultAddress.tel }}</div>
        </div>
        <div class="bottom">
          <div class="icon"><van-icon name="location-o" size="25px" /></div>
          <div class="address">
            <div class="planA">收货地址：{{ defaultAddress.address }}</div>
            <div class="planB">(收货不变时，可选择免费待收货服务)</div>
          </div>
          <div class="right" @click="change"><van-icon name="arrow" /></div>
        </div>
      </div>
      <div class="gap"><img src="../../assets/caitiao.jpg" alt="" /></div>
    </div>
    <div class="box" ref="wrapper">
      <div>
        <div class="info" v-for="(item, index) in list" :key="index">
          <div class="img"><img :src="item.image_path" alt="" /></div>
          <div class="text">
            <div class="name">{{ item.name }}</div>
            <div class="price">￥{{ item.present_price }}</div>
          </div>
          <div class="count"><div class="icon"><van-icon name="cross" size="12px"/></div>{{ item.count }}</div>
        </div>
      </div>
    </div>
    <div class="footer">
      <van-submit-bar
          :price=total*100
          button-text="提交订单"
          @submit="onSubmit"
      />
    </div>
  </div>
</template>

<script>
  import BScroll from "better-scroll";
export default {
  name: "Order",
  components: {},
  props: {},
  data() {
    return {
      defaultAddress: {}, //默认地址信息
      info:{    //订单信息
        address:'',
        tel:'',
        orderId:[],
        totalPrice:0,
        count:0
      },
    };
  },
  methods: {
    back() {
      this.$router.back();
    },
    addAddress(){
      this.$router.push("/adressedit");
    },
    change() {
      this.$router.push("/adresslist");
    },
    async getDefaultAddress() {
      //获取默认地址的接口
      try {
        let res = await this.$api.getDefaultAddress();
        this.defaultAddress = res.defaultAdd;
      } catch (e) {
        console.log(e);
      }
    },
    async onSubmit(){
      //提交订单
      //购物车提交的信息
      this.info.address=this.defaultAddress.address;
      this.info.tel=this.defaultAddress.tel;
      this.list.map(item=>{
        this.info.orderId.push(item.cid);
        this.info.count=item.count
      });
      this.info.totalPrice=this.total;
      if (this.list[0].idDirect) {
        this.info.idDirect=true;
        console.log(this.info);
      }
      try {
        let res = await this.$api.placeOrder(this.info);
        if(res.code===200){
          this.$toast(res.msg)
        }
      } catch (e) {
        console.log(e);
      };



    }
  },

  mounted() {
    this.getDefaultAddress();
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
    list() {
      return this.$store.state.list;
    },
    total() {
      return this.$store.state.total;
    }
  },
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.head {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 99;
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
    margin: auto;
  }
}
.null {
  width: 100%;
  height: 60px;
  text-align: center;
  padding-top: 25px;
  background: white;
}
.gap {
  background: white;
  padding-top: 5px;
  img {
    height: 5px;
    display: block;
  }
}
.have {
  background: white;
  .top {
    padding: 15px 0;
    display: flex;
    .name {
      margin-left: 60px;
    }
    .tel {
      margin-left: 90px;
    }
  }
  .bottom {
    display: flex;
    margin-left: 20px;
    .address {
      font-size: 14px;
      margin-left: 16px;
      .planB {
        margin-top: 10px;
        color: #fbddbd;
      }
    }
    .right {
      margin-left: 50px;
    }
  }
}
.box {
  position: fixed;
  top: 140px;
  bottom: 50px;
  background: white;
}
.info {
  display: flex;
  background: white;
  padding: 10px;
  position: relative;
  margin-top: 10px;
  .img {
    border: 1px solid #f4f5f7;

    img {
      display: block;
      width: 80px;
      height: 80px;
    }
  }
  .text {
    margin: 5px 30px;
    color: red;
    .price {
      margin: 10px 0;
    }
  }
  .count{
    position: relative;
    top: 30px;
    display: flex;

  }
}

</style>
