<template>
  <div>
    <div class="title">
      <div class="close" @click="back">
        <van-icon name="arrow-left" color="#58A9FB" size="35px" />
      </div>
      <div class="info">编辑地址</div>
    </div>
    <div class="edit">
      <van-address-edit
        :area-list="areaList"
        show-delete
        show-set-default
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        :address-info="infos"
        @save="onSave"
        @delete="onDelete(index)"></van-address-edit>
    </div>
  </div>
</template>

<script>
import areaList from "../../../public/area";
export default {
  name: "Adressedit",
  components: {},
  props: {},
  data() {
    return {
      areaList,
      addressInfo: {
        // 收货信息
        address: "",
        addressDetail: "",
        // areaCode: "",
        city: "",
        county: "",
        isDefault: false,
        name: "",
        province: "",
        tel: ""
      },
      // address:[],
      id: "",
      infos: null
    };
  },
  methods: {
    back() {
      this.$router.back();
    },
    async onSave(val) {
      this.addressInfo = val; //编辑地址的详细信息
      console.log(val, 3);
      this.addressInfo.address = val.province + val.city + val.county+val.addressDetail; //拼接地址
      this.addressInfo.id = this.infos ? this.infos._id : undefined;
      //增加收货地址的接口
      try {
        let res = await this.$api.postAddress(this.addressInfo);
        // console.log(res, 4);
        this.$toast(res.msg);
      } catch (e) {
        console.log(e);
      }
      ;
      //设置默认收货地址的接口
      this.id = this.infos._id
      try {
        let res = await this.$api.setDefaultAddress(this.id);
        this.$toast(res.msg);
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    },
    async onDelete(index) {
      this.id = this.infos._id
      try {  //删除收货地址的接口
        let res = await this.$api.deleteAddress(this.id);
        this.$toast(res.msg);
        if(res.code===200){
          this.infos.splice(index,1);
          this.$router.push("/adresslist")
        }
      } catch (e) {
        console.log(e);
      }
    },
  },


  mounted() {
    this.infos = this.$route.query.infos;
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
</style>
