<template>
  <div>
    <div class="title">
      <div class="close" @click="back">
        <van-icon name="arrow-left" color="#58A9FB" size="35px" />
      </div>
      <div class="info">地址列表</div>
    </div>
    <div v-if="list.length === 0" class="list">暂无收货地址
      <van-address-list
          v-model="chosenAddressId"
          :list="list"
          @add="onAdd"
          @edit="onEdit"
      />
    </div>
    <div class="list1" v-else>
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        @add="onAdd"
        @edit="onEdit"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "AdressList",
  components: {},
  props: {},
  data() {
    return {
      chosenAddressId: "1",
      list: [],
      id:'',
      user:'',//用户登录信息
    };
  },
  methods: {
    back() {
      this.$router.back();
    },
    onAdd() {
      this.$router.push("/adressedit")
      if(!this.user){
        this.$router.push("/login");
      }
    },
    onEdit(item) {
      // console.log(item);
      this.$router.push({name:'adressedit',query:{infos:item}})
    },
    async getAddress() {
      if (this.user) {
        //是否是登录状态
        //获取地址的接口
        try {
          let res = await this.$api.getAddress();
          this.list = res.address
          this.list.map((item, index) => {
            if(item.isDefault){
              this.chosenAddressId=index
            }
            item.id = index
          })
        } catch (e) {
          console.log(e);
        }
      }
    },
    async getDefaultAddress() {
      if (this.user) {
        //是否是登录状态
        //获取默认地址的接口
        try {
          let res = await this.$api.getDefaultAddress();
          if (res.code === 200) {
            // this.chosenAddressId = res.defaultAdd.id;
            this.list.map((item, index) => {
              if (item.isDefault) {
                let obj = this.list.splice(index, 1);
                this.list.unshift(obj[0]);
                this.chosenAddressId = item.id
              }
            })
          }
        } catch (e) {
          console.log(e);
        }
      }
  },
},

  mounted() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.getAddress();
    this.getDefaultAddress()
  },
  created() {},
  filters: {},
  computed: {

  },
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.title {
  display: flex;
  height: 45px;
  border-bottom: #f2f2f2 1px solid;
  .close {
    position: absolute;
    top: 10px;
    left: 10px;
  }
  .info {
    text-align: center;
    height: 40px;
    line-height: 40px;
    margin: auto;
  }
}
  .list{
    text-align: center;
    margin-top: 80px;
    color: #C4C4C4;
  }
  .list1{
    margin-top: 20px;
  }
</style>
