<template>
  <div>
    <div class="warp">商品推荐</div>
    <div class="all" ref="wrapper">
      <div class="recommend">
        <div class="box" v-for="(item, index) in data" :key="index">
          <img :src="item.image" alt="" />
          <div class="text">{{ item.goodsName }}</div>
          <div class="price">
            ￥{{ item.price }}
            <s>￥{{ item.mallPrice }}</s>
          </div>
          <div class="button">
            <div class="left"><van-icon name="shopping-cart-o" /></div>
            <div class="right">查看详情</div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Recommend",
  components: {},
  props: {
    data: {
      type: Array,
      default: () => [] /**子组件接收数据**/
    }
  },
  data() {
    return {};
  },
  methods: {
    onClickButton() {}
  },

  mounted() {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper, {
        scrollX: true,
        click: true
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
  .warp{
    background: white;
    padding: 10px;
  }
.all {
  width: 100%;
  overflow: hidden;
  background: white;

  display: flex;
}
.recommend {
  flex: 1;
  display: flex;
  .box {
    flex: 1;
    img {
      /*width: 100%;*/
      width: 124px;
    }
    .text {
      width: 124px;
      height: 16px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      margin: 5% 0;
      padding-left: 5px;
    }
    .price {
      padding-left: 6px;
      s {
        color: #b6b6b6;
        font-size: 12px;
      }
    }
  }
  .button {
    width: 85%;
    color: white;
    height: 35px;
    display: flex;
    justify-content: flex-start;

    padding: 8px;
    .left {
      background: #feca3a;
      line-height: 35px;
      border-radius: 8px 0 0 8px;
      padding: 0 7px;
    }
    .right {
      background: #ff4c38;
      border-radius: 0 8px 8px 0;
      line-height: 35px;
      padding: 0 7px;
    }
  }
}
</style>
