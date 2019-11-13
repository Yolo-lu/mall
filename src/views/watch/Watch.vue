<template>
  <div>
    <div class="title">
      <div class="close" @click="back">
        <van-icon name="arrow-left" color="#58A9FB" size="35px" />
      </div>
      <div class="info">最近浏览</div>
    </div>
    <div class="box" ref="wrapper">
      <div>
        <div class="info" v-for="(item, index) in data" :key="index">
          <div class="img"><img :src="item.image_path" alt="" /></div>
          <div class="text">
            <div class="name">{{ item.name }}</div>
            <div class="price">￥{{ item.present_price }}</div>
          </div>
          <div class="del" @click="clear(item.cid,index)">
            <div class="icon">
              <van-icon name="cross" color="#999" size="12px" />
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
    name: "Watch",
    components: {},
    props: {},
    data() {
      return {
        data:[], //详情页存的数据
      }
    },
    methods: {
      back() {
        this.$router.back();
      },
    },

    mounted() {
      this.data=JSON.parse(localStorage.getItem("data"))
      this.$nextTick(() => {
        //平滑滚动
        this.scroll = new BScroll(this.$refs.wrapper, {
          scrollY: true,
          click: true,
          startY: 0
        });
      });
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
    margin-top: 46px;
    height: 620px;
  }
  .info {
    display: flex;
    background: white;
    padding: 10px;
    position: relative;
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
      .price {
        margin: 10px 0;
        color: red;
      }
    }
    .del {
      width: 15px;
      height: 15px;
      border-radius: 50%;
      border: 1px solid #999;
      position: absolute;
      right: 10px;
      bottom: 20px;
      .icon {
        text-align: center;
      }
    }
  }
</style>