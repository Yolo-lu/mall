<template>
  <div>
    <div class="box ">
      <div class="head">
        <van-icon name="arrow-left" @click="back" />
        <span class="citylist">城市列表</span>
      </div>
      <div class="search v__top">
        <van-search
          placeholder="请输入城市关键词"
          v-model="value"
          background="#f2f2f2"
          class="input"
        />
      </div>
    </div>
    <div v-if="data1.length === 0">
      <div class="citynow top">当前城市</div>
      <div class="hotcity">
        <div class="city citys">{{ city }}</div>
      </div>
      <div class="citynow">热门城市</div>
      <div class="hotcitys">
        <div
          class="hotcity"
          v-for="(item, index) in data.hotCities"
          :key="index"
        >
          <div class="city" @click="choose(item.name)">{{ item.name }}</div>
        </div>
      </div>
      <!--    索引栏-->

      <van-index-bar class="letter__t">
        <div v-for="(item1, index1) in arr" :key="index1">
          <van-index-anchor :index="item1" class="letter" />
          <div v-for="(item2, index2) in data.cities[item1]" :key="index2">
            <van-cell :title="item2.name" @click="choose(item2.name)" />
          </div>
        </div>
      </van-index-bar>
    </div>
    <div v-else>
      <div class="new">
        <div v-for="(item, index) in data1" :key="index" class="row">
          <div v-for="(item1, index1) in item" :key="index1" class="list">
            <div @click="choose(item1.name)">{{ item1.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import citylist from "../../../public/city";
export default {
  name: "Location",
  components: {},
  props: {},
  data() {
    return {
      value: "",
      data: {},
      arr: [], //data.cities的键
      arr1: [], //data.cities的值
      data1: [] //过滤后的数组
    };
  },
  methods: {
    back() {
      this.$router.push("/home");
    },
    choose(item) {
      this.$store.state.city = item;
      this.$router.push("/home");
    }
  },

  mounted() {
    this.data = citylist.data;
    // console.log(this.data);
    // this.data1=this.data;
    this.arr = Object.keys(this.data.cities); //取data.cities得所有键
    this.arr1 = Object.values(this.data.cities); //取data.cities得所有值
  },
  created() {},
  filters: {},
  computed: {
    city() {
      return this.$store.state.city;
    }
  },
  watch: {
    value(value) {
      if (value.trim() !== "") {
        this.arr1.map(item => {
          this.data1.push(
            item.filter(item => {
              return JSON.stringify(item).includes(value);
            })
          );
        });
      } else {
        this.data1 = [];
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
.box {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 99;
}
.head {
  background: white;
  height: 40px;
  line-height: 40px;
  width: 100%;
  .citylist {
    padding-left: 140px;
  }
}
.search {
  padding-top: 5px;

  .input {
    height: 40px;
  }
}
.citynow {
  margin: 8px;
}
.top {
  margin-top: 100px;
}
.hotcitys {
  display: flex;
  flex-wrap: wrap;
}
.hotcity {
  flex: 0 0 33%;
  background: white;
  height: 45px;
  padding-top: 15px;
  .citys {
    width: 26% !important;
    margin-left: 1% !important;
  }
  .city {
    border: 1px solid #666;
    width: 80%;
    height: 25px;
    margin-left: 3%;
    line-height: 25px;
    text-align: center;
  }
  letter {
  }
}
.new {
  margin: 100px 10px 0 10px;
  .row {
    background: white;
    .list {
      height: 35px;
      line-height: 35px;
      border-bottom: #eee 1px solid;
      padding-left: 10px;
    }
  }
}
</style>
