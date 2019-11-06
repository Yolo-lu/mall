import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Structrue from "../views/structrue/Structrue"; /*引入公共结构*/
Vue.use(VueRouter);

/*配路由*/
const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  // 首页
  {
    path: "/home",
    component: Structrue,
    children: [
      {
        path: "",
        name: "home",
        component: Home
      }
    ]
  },
  // 分类
  {
    path: "/category",
    component: Structrue,
    children: [
      {
        path: "",
        name: "category",
        component: () => import("../views/category/Category")
      }
    ]
  },
  // 购物车
  {
    path: "/shoppingCar",
    component: Structrue,
    children: [
      {
        path: "",
        name: "shoppingCar",
        component: () => import("../views/shoppingCar/ShoppingCar")
      }
    ]
  },
  // 我的
  {
    path: "/mine",
    component: Structrue,
    children: [
      {
        path: "",
        name: "mine",
        component: () => import("../views/mine/Mine")
      }
    ]
  },
  // 登录
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login/Login")
  },
  // 定位
  {
    path: "/location",
    name: "location",
    component: () => import("../views/location/Location")
  },

  // 地址列表
  {
    path: "/adresslist",
    name: "adresslist",
    component: () => import("../views/adresslist/AdressList")
  },
  // 地址编辑
  {
    path: "/adressedit",
    name: "adressedit",
    component: () => import("../views/adressedit/Adressedit")
  },
  // 订单结算
  {
    path: "/order",
    name: "order",
    component: () => import("../views/order/Order")
  },
  // 商品详情
  {
    path: "/detail",
    name: "detail",
    component: () => import("../views/detail/Detail")
  },
  // 评价中心
  {
    path: "/evaluationcentre",
    name: "evaluationcentre",
    component: () => import("../views/evaluationcentre/EvaluationCentre")
  },
  // 评价详情
  {
    path: "/evaluationdetail",
    name: "evaluationdetail",
    component: () => import("../views/evaluationdetail/EvaluationDetail")
  },
  // 评价页面
  {
    path: "/evaluation",
    name: "evaluation",
    component: () => import("../views/evaluation/Evaluation")
  },
  // 已完成
  {
    path: "/completed",
    name: "completed",
    component: () => import("../views/completed/Completed")
  },
  // 我的订单
  {
    path: "/myorder",
    name: "myorder",
    component: () => import("../views/myorder/MyOrder")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
