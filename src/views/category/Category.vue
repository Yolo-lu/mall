<template>
  <div>
    <div class="head">
      <span class="productlist">商品分类</span>
    </div>
    <div class="manu">
      <div class="left">
        <div
          v-for="(item, index) in categories"
          :key="index"
          class="row"
          @click="chooseID(index)"
          :class="{ bg: ID === index }"
        >
          <div>{{ item.mallCategoryName }}</div>
        </div>
      </div>
      <div class="right">
        <van-tabs v-model="active" @click="chooseid" class="one" v-if="categories[0]">
          <van-tab
            v-for="(item, index) in this.categories[ID].bxMallSubDto"
            :key="index"
            :title="item.mallSubName"
            :name="index"
          >
          </van-tab>
        </van-tabs>
        <div ref="wrapper" class="container">
          <div class="all">
            <div
              class="content"
              v-for="(item, index) in data"
              :key="index"
              @click="buy(index)"
            >
              <div class="box">
                <div class="img"><img :src="item.image" alt="" /></div>
                <div class="text">
                  <div class="name">{{ item.name }}</div>
                  <div class="price">
                    <span class="n--price">￥{{ item.present_price }}</span>
                    <s class="o-price">{{ item.orl_price }}</s>
                  </div>
                </div>
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
  name: "Category",
  components: {},
  props: {},
  data() {
    return {
      id: 0, //小类的id
      ID: 0, //大类的id
      data: [], //分类的具体数据
      active: 0
      // categories: {}
    };
  },
  methods: {
    async category(id) {
      try {
        let res = await this.$api.category(id);
        this.data = res.dataList;
        // console.log(this.data);
        // console.log(this.data,2);
      } catch (e) {
        console.log(e);
      }
    },
    chooseid(name) {
      //点击左侧大类
      this.id = name;
      this.category(this.categories[this.ID].bxMallSubDto[this.id].mallSubId);
    },
    chooseID(index) {
      //点击顶部大类
      this.ID = index;
      this.category(this.categories[this.ID].bxMallSubDto[this.id].mallSubId);
    },
    buy(val) {
      //跳转详情页
      this.$router.push({ name: "detail", query: { id: this.data[val].id } });
    }
  },

  mounted() {
    // console.log(this.$store.state.category);
    this.ID = this.$route.query.categoryID;
    // console.log(this.ID);
    if (!this.$route.query.categoryID) this.ID = 0
    let id = this.categories[0].bxMallSubDto[0].mallSubId;
    this.category(id); //获取数据中传入参数
    this.$nextTick(() => {
      //平滑滚动
      new BScroll(this.$refs.wrapper, {
        scrollY: true,
        click: true,
        startY: 0
      });
    });
  },
  created() {},
  filters: {},
  computed: {
    categories() {
      return this.$store.state.category; //将vuex中分类的数据取到
    },
  },
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.bg {
  background: white !important;
}
.head {
  background: white;
  height: 40px;
  line-height: 40px;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 99;
  .productlist {
    padding-left: 140px;
  }
}
.manu {
  display: flex;
  justify-content: space-between;
  .left {
    width: 20%;
    position: fixed;
    top: 40px;
    left: 0;
    /*z-index: 99;*/
    .row {
      background: #f1f8ff;
      height: 43px;
      line-height: 43px;
      text-align: center;
    }
  }
  .right {
    width: 80%;
    position: fixed;
    top: 40px;
    left: 20%;
    z-index: -99;
    .one {
      z-index: 1;
    }
    .all {
      .box {
        display: flex;
        justify-content: space-between;
        margin: 10px;
        .img {
          width: 40%;
          border: 1px solid #9e9e9e;
        }
        .text {
          width: 60%;
          margin-left: 10px;
          .name,
          .n--price {
            color: #ff6f60;
            margin-bottom: 20px;
          }
          .o-price {
            margin-left: 10px;
            color: #434343;
          }
        }
      }
    }
  }
  .container {
    height: 560px;
    margin-bottom: 100px;
  }
}
</style>
