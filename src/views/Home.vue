<template>
  <div>
    <van-loading
      type="spinner"
      color="#1989fa"
      size="50px"
      v-if="flag"
      class="loading"
    />
    <div v-else>
      <div class="first">
        <div class="head">
          <div class="city">
          <span v-if="city"
          >{{ city }}
            <i><img src="../assets/下三角.svg" alt="" @click="skip"/></i
            ></span>
            <span v-else><van-loading size="24px">定位中...</van-loading></span>
          </div>
          <div class="search">
            <van-search
                placeholder="请输入搜索关键词"
                v-model="value"
                background="#f7f8fa"
                class="input"
                @focus="onfocus"
                @input="onsearch"
            />
          </div>
          <div class="text" v-if="value" @click="del">取消</div>
        </div>
      </div>
      <div class="package" v-if="lock" ref="wrapper">
        <div>
          <!--    轮播图-->
          <div class="banner">
            <van-swipe :autoplay="3000" indicator-color="white">
              <van-swipe-item v-for="(item, index) in data.slides" :key="index"
                ><img :src="item.image" alt="" @click="bannerskip(index)"
              /></van-swipe-item>
            </van-swipe>
          </div>
          <!--    商品分类-->
          <div class="category">
            <div
              v-for="(item, index) in data.category"
              :key="index"
              class="list"
            >
              <div @click="category(index)">
                <img :src="item.image" alt="" />
                <div class="name">{{ item.mallCategoryName }}</div>
              </div>
            </div>
          </div>
          <div class="line" v-if="data.advertesPicture">
            <img :src="data.advertesPicture.PICTURE_ADDRESS" alt="" />
          </div>
          <recommend :data="data.recommend"></recommend>
          <!--    将data.recommend数据传入到子组件-->
          <!--    一个组件用三次-->
          <div class="title">
            <span class="num">1F</span>
            <span class="name" v-if="data.floorName">{{
              data.floorName.floor1
            }}</span>
          </div>
          <floor :data="data.floor1"></floor>
          <div class="title">
            <span class="num">2F</span>
            <span class="name" v-if="data.floorName">{{
              data.floorName.floor2
            }}</span>
          </div>
          <floor :data="data.floor2"></floor>
          <div class="title">
            <span class="num">3F</span>
            <span class="name" v-if="data.floorName">{{
              data.floorName.floor3
            }}</span>
          </div>
          <floor :data="data.floor3"></floor>
          <!--    热销商品-->
          <div class="title">
            <span class="name">热销商品</span>
          </div>
          <hot :data="data.hotGoods"></hot>
        </div>
      </div>
      <div v-if="!lock">
        <div class="searchlist" v-if="value.trim()" ref="wrapper">
          <div>
            <div class="box" v-for="(item, index) in searchData" :key="index">
              <div class="img" @click="skipDetail">
                <img :src="item.image" alt="" />
              </div>
              <div class="text">
                <div class="name" @click="skipDetail" v-html="name">
                  {{ name }}
                </div>
                <div class="price">
                  <span class="n--price">￥{{ item.present_price }}</span>
                  <s class="o-price">{{ item.orl_price }}</s>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="no" v-if="!searchHistory.length">暂无搜索历史</div>
          <div class="have" v-else>
            <div class="top">
              <div>搜索历史</div>
              <div class="clear" @click="clearAll">
                <van-icon name="delete" />
              </div>
            </div>
            <div class="bottom">
              <div
                class="each"
                v-for="(item, index) in searchHistory"
                :key="index"
              >
                <div class="name" @click="onclick(item)">{{ item }}</div>
                <div class="del" @click="ondelete(index)">
                  <van-icon name="cross" />
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
import recommend from "../components/recommend/Recommend";
import floor from "../components/floor/Floor";
import hot from "../components/hot/Hot";
export default {
  name: "Home",
  components: {
    recommend,
    floor,
    hot
  },
  props: {},
  data() {
    return {
      city: "",
      value: "", //搜索框内容
      data: {},
      lock: true, //控制首页内容显示与否
      searchData: [], //搜索列表数据
      id: "", //搜索后商品的id
      name: "", //搜索后商品的name
      searchHistory: [], //搜索历史的数组
      record: "", //单个历史记录
      flag: true //控制加载
    };
  },
  methods: {
    del() {
      this.lock = true;
      this.value = "";
      this.searchData = [];
    },
    skip() {
      (this.$store.state.city = this.city), // 将city存入vuex
        this.$router.push("/location");
    },
    bannerskip(val) {
      //轮播图跳转详情页
      this.$router.push({
        name: "detail",
        query: { id: this.data.slides[val].goodsId }
      });
    },
    // 调接口
    async recommend() {
      try {
        let res = await this.$api.recommend();
        this.data = res.data;
        this.flag = false;
        this.$store.state.category = this.data.category;
        // console.log(this.data);
        this.$nextTick(() => {
          //平滑滚动
          this.scroll = new BScroll(this.$refs.wrapper, {
            scrollY: true,
            click: true,
            startY: 0
          });
        });
        // console.log(this.data);
      } catch (e) {
        console.log(e);
      }
    },
    category(index) {
      this.$router.push({ name: "category", query: { categoryID: index } });
    },
    onfocus() {
      //获取焦点
      this.lock = false;
      this.searchHistory = JSON.parse(localStorage.getItem("values"));
    },
    async onsearch() {
      try {
        //搜索接口
        let res = await this.$api.search(this.value);
        this.searchData = res.data.list;
        this.searchData.map(item => {
          this.id = item.id;
          this.name = item.name;
        });
        // console.log(this.searchData);
        //搜索词高亮
        let findText = this.name.split(this.value); //以查找关键字作为拆分成数组
        this.name = findText.join(
          '<span style="color:red;">' + this.value + "</span> "
        ); //在拆分的数组后加入span并转化成字符串
        this.$nextTick(() => {
          //平滑滚动
          this.scroll = new BScroll(this.$refs.wrapper, {
            scrollY: true,
            click: true,
            startY: 0
          });
        });
      } catch (e) {
        console.log(e);
      }
    },
    skipDetail() {
      this.$router.push({ name: "detail", query: { id: this.id } });
      if (this.searchHistory) {
        let arr = this.searchHistory;
        if (arr.indexOf(this.value) < 0) {
          arr.unshift(this.value);
          localStorage.setItem("values", JSON.stringify(arr));
        }
      } else {
        let arr = [];
        arr.push(this.value);
        localStorage.setItem("values", JSON.stringify(arr));
      }
    },
    onclick(item) {
      //点击搜索历史
      this.value = item;
      this.onsearch();
    },
    ondelete(index) {
      //删除某个搜索记录
      this.$dialog
        .confirm({
          message: "你确认删除搜索历史"
        })
        .then(() => {
          this.searchHistory.splice(index, 1);
          localStorage.setItem("values", JSON.stringify(this.searchHistory));
        })
        .catch(() => {
          // on cancel
        });
    },
    clearAll() {
      //删除所有搜索记录
      this.$dialog
        .confirm({
          message: "你确认清空搜索历史"
        })
        .then(() => {
          this.searchHistory = [];
          localStorage.setItem("values", JSON.stringify(this.searchHistory));
        })
        .catch(() => {
          // on cancel
        });
    }
  },

  mounted() {
    this.recommend();
    let _this = this;
    this.city = this.$store.state.city;
    if (!this.city) {
      AMap.plugin("AMap.Geolocation", function() {
        let geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000,
          // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
          buttonOffset: new AMap.Pixel(10, 20),
          //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          zoomToAccuracy: true,
          //  定位按钮的排放位置,  RB表示右下
          buttonPosition: "RB"
        });

        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", onComplete);
        AMap.event.addListener(geolocation, "error", onError);

        function onComplete(data) {
          // console.log(data);
          _this.city = data.addressComponent.city;
        }

        function onError(data) {
          // 定位出错
          console.log(data);
        }
      });
    }
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
* {
  color: #4e4e4e;
}
.loading {
  position: fixed;
  top: 40%;
  left: 45%;
}
.searchlist {
  position: fixed;
  top: 60px;
  bottom: 50px;
  width: 100%;
  overflow: hidden;
  .box {
    display: flex;
    justify-content: space-between;
    background: white;
    .img {
      width: 30%;
      border: 1px solid #f4f5f7;
    }
    .text {
      width: 60%;
      margin: 10px;
      .name {
        color: #333;
        margin-bottom: 20px;
      }
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
.first{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
  background: #f2f2f2;
}
.head {
  display: flex;
  justify-content: space-around;
  margin: 10px;
  img {
    width: 16px;
    height: 16px;
  }
  .city {
    line-height: 40px;
  }
  .text {
    line-height: 40px;
  }
  .input {
    height: 40px;
  }
}
.no {
  text-align: center;
  margin-top: 50px;
}
.have {
  width: 80%;
  .top {
    display: flex;
    margin: 20px;
    position: relative;
  }
  .bottom {
    display: flex;
    flex-wrap: wrap;
  }
  .clear {
    font-size: 20px;
    position: absolute;
    right: -20%;
  }
  .each {
    margin: 10px;
    border: 1px solid #999;
    border-radius: 8px;
    padding: 5px;
    display: flex;
    .del {
      /*font-size: 14px;*/
      position: relative;
      top: -10px;
      left: 10px;
    }
  }
}
.banner {
  img {
    width: 100%;
  }
}
.category {
  display: flex;
  justify-content: space-around;
  background: white;
  margin: 10px 0;
  border-radius: 14px;
  box-shadow: 2px 2px 10px #d2d2d2;
  .list {
    flex: 1;
    padding: 5px;
    img {
      width: 100%;
      margin-bottom: 8px;
    }
    .name {
      font-size: 15px;
    }
  }
}
.line {
  margin: 10px;
  img {
    width: 100%;
  }
}
.recommend {
  background: white;
  .text {
    padding-left: 10px;
    font-size: 16px;
  }
  .box {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    .list1 {
      width: 33%;
      padding: 5px;
      img {
        width: 100%;
      }
    }
  }
}
.title {
  text-align: center;
  margin: 20px 0;
  .num {
    display: inline-block;
    text-align: center;
    line-height: 25px;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    color: white;
    background: #e2534d;
  }
  .name {
    color: #e2534d;
    padding-left: 10px;
  }
}
.package {
  height: 547px;
  margin-top: 60px;
  margin-bottom: 60px;
}
</style>
