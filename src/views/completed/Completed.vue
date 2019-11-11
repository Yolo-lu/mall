<template>
  <div>
    <div class="title">
      <div class="close" @click="back">
        <van-icon name="arrow-left" color="#58A9FB" size="35px" />
      </div>
      <div class="info">我的订单</div>
    </div>
    <div class="box" ref="wrapper">
      <div>
        <div class="info" v-for="(item, index) in list" :key="index">
          <div class="head">
            <div class="order">订单编号：{{item.order_id}}</div>
            <div class="right">交易已完成</div>
          </div>
          <div class="detail" v-for="(item1,index1) in item.order_list" :key="index1">
            <div class="img"><img :src="item1.image_path" alt="" /></div>
            <div class="name">{{ item1.name }}</div>
            <div class="right">
              <div class="text">
                <div class="count"><div class="icon"><van-icon name="cross" size="12px"/></div>{{ item1.count }}</div>
                <div class="price">￥{{ item1.present_price }}</div>
              </div>
            </div>

          </div>
          <div class="footer">
            <div class="time">创建时间：{{item.add_time}}</div>
            <div class="address">收货地址：{{item.address}}</div>
            <div class="bottom">
              <div class="count">总共{{item.order_list.length}}件</div>
              <div class="sum">合计：{{item.mallPrice}}</div>
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
  name: "Compeleted",
  components: {},
  props: {},
  data() {
    return {
      list:[]
    };
  },
  methods: {
    back() {
      this.$router.back();
    },
    async getMyOrder() {
      //查询订单的接口
      try {
        let res = await this.$api.getMyOrder();
        this.list=res.list;
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    }
  },

  mounted() {
    this.getMyOrder();
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
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 99;
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
.box {
  position: fixed;
  top: 50px;
  bottom: 0;
}
.info {
  background: white;
  margin: 10px;
  border-radius: 10px;
  color: #383838;
  font-size: 14px;
  .head{
    display: flex;
    justify-content: space-around;
    padding: 10px 0;
    font-size: 14px;
    .right{
      color: #E49D79;
    }
  }
  .detail{
    display: flex;
    padding: 10px;
    .img {
      border: 1px solid #f4f5f7;

      img {
        display: block;
        width: 80px;
        height: 80px;
      }
    }
    .name{
      margin: 5px 10px;
      width: 50%;
    }
    .right{
      width: 20%;
    }
    .text {
      /*margin: 5px 5px;*/
      /*margin-right: 10px;*/
      text-align: right;
      position: relative;
      .price {
        margin-bottom: 10px;
      }
    }
    .count{
      position: absolute;
      display: flex;
      top:25px;
      right: 5px;
      color: #DADADA;
    }
  }
  .footer{
    text-align: right;
    padding: 10px;
    .address{
      margin: 10px 0;
    }
    .bottom{
      display: flex;
     justify-content: flex-end;
      .sum{
        margin-left: 5px;
      }
    }
  }

}
</style>
