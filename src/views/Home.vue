<template>
  <div>
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
          @focus="lock=false"
        />
      </div>
      <div class="text">搜索</div>
    </div>

    <div class="package" v-if="lock">
      <!--    轮播图-->
      <div class="banner">
        <van-swipe :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="(item, index) in data.slides" :key="index"
          ><img :src="item.image" alt=""
          /></van-swipe-item>
        </van-swipe>
      </div>
      <!--    商品分类-->
      <div class="category">
        <div v-for="(item, index) in data.category" :key="index" class="list">
          <div>
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
        <span class="name" v-if="data.floorName">{{ data.floorName.floor1 }}</span>
      </div>
      <floor :data="data.floor1"></floor>
      <div class="title">
        <span class="num">2F</span>
        <span class="name" v-if="data.floorName">{{ data.floorName.floor2 }}</span>
      </div>
      <floor :data="data.floor2"></floor>
      <div class="title">
        <span class="num">3F</span>
        <span class="name" v-if="data.floorName">{{ data.floorName.floor3 }}</span>
      </div>
      <floor :data="data.floor3"></floor>
      <!--    热销商品-->
      <div class="title">
        <span class="name">热销商品</span>
      </div>
      <hot :data="data.hotGoods"></hot>
    </div>
    <div v-if="!lock">
      <div class="no" v-if="!value" >暂无搜索历史</div>
      <div class="searchlist" v-else>123</div>
    </div>

  </div>
</template>

<script>
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
      value: "",
      data: {},
      lock:true
    };
  },
  methods: {
    skip() {
      this.$store.state.city=this.city, // 将city存入vuex
      this.$router.push("/location");
    },
    // 调接口
    async recommend() {
      try {
        let res = await this.$api.recommend();
        this.data = res.data;
        console.log(this.data);
      } catch (e) {
        console.log(e);
      }
    },
  },

  mounted() {
    this.recommend();
    let _this = this;
    this.city = this.$store.city
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
  computed: {

  },
  watch: {
    async value(value) {
      try {
        let res = await this.$api.search(value);
        // this.data = res.data;
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    }
  },
  directives: {}
};
</script>

<style scoped lang="scss">
* {
  color: #4e4e4e;
}
.head {
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
  img{
    width: 16px;
    height: 16px;
  }
  .city{
    line-height: 40px;
  }
  .text {
    line-height: 40px;
  }
  .input {
    height: 40px;
  }
}
.no{
  text-align: center;
  margin-top: 50px;
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
  margin-bottom: 30px;
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
.title{
    text-align: center;
    margin: 20px 0;
    .num{
      display: inline-block;
      text-align: center;
      line-height: 25px;
      width: 25px;
      height: 25px;
      border-radius: 50%;
      color: white;
      background:#E2534D ;
    }
    .name{
      color: #E2534D;
      padding-left: 10px;
    }
  }
</style>
