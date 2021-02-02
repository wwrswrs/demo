<template>
  <div>
    <van-nav-bar
      title="小U商城"
      left-text="返回"
      right-text="其他"
      left-arrow
    />
    <!-- 轮播图 -->
    <van-swipe :autoplay="2000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img class="img" :src="image" />
      </van-swipe-item>
    </van-swipe>
    <!-- 宫格子 -->
    <!-- <van-grid :gutter="10">
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
    </van-grid> -->

    <!-- 自定义根据自己需求渲染列数 -->
    <van-grid :border="false" :column-num="5">
      <van-grid-item v-for="item in brandList" :key="item.title">
        <van-image :src="item.brandImg" />
        <p>{{ item.title }}</p>
      </van-grid-item>
      <!-- <van-grid-item>
        <van-image :src="require('../assets/img/top.png')" />
        <p>畅销商品</p>
      </van-grid-item>
      <van-grid-item>
        <van-image :src="require('../assets/img/brand.png')" />
        <p>品质大牌</p>
      </van-grid-item>
      <van-grid-item>
        <van-image :src="require('../assets/img/selfsupport.png')" />
        <p>小U自营</p>
      </van-grid-item>
      <van-grid-item>
        <van-image :src="require('../assets/img/integral.png')" />
        <p>积分商城</p>
      </van-grid-item> -->
    </van-grid>
    <!-- 商品列表切换 -->
    <van-tabs type="card">
      <van-tab title="最新商品">
        <van-card
          num="2"
          price="2.00"
          desc="描述信息"
          title="商品标题"
          thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
        />
      </van-tab>
      <van-tab title="爆款商品">
        <van-card
          v-for="hotGoods in hotList"
          :key="hotGoods.id"
          price="2.00"
          desc="描述信息"
          :title="hotGoods.goodsname"
          :thumb="
            hotGoods.img
              ? $imgUrl + hotGoods.img
              : 'http://img.yzcdn.cn/vant/ipad.jpeg'
          "
        />
      </van-tab>
      <van-tab title="所有商品"
        ><van-card
          num="2"
          price="2.00"
          desc="描述信息"
          title="商品标题"
          thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
      /></van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getIndexGoodsList } from "../util/axios";
export default {
  data() {
    return {
      images: [
        "https://img.yzcdn.cn/vant/apple-1.jpg",
        "https://img.yzcdn.cn/vant/apple-2.jpg",
      ],
      brandList: [
        { title: "限时秒杀", brandImg: require("../assets/img/seckill.png") },
        { title: "畅销商品", brandImg: require("../assets/img/top.png") },
        { title: "品质大牌", brandImg: require("../assets/img/brand.png") },
        {
          title: "小U自营",
          brandImg: require("../assets/img/selfsupport.png"),
        },
        { title: "积分商城", brandImg: require("../assets/img/integral.png") },
      ],
      hotList: [], //热门商品
      newList: [], //最新商品
      goodsList: [], //所有商品
    };
  },
  mounted() {
    this.getGoodsList();
  },
  methods: {
    //分装一个获取商品列表事件
    getGoodsList() {
      getIndexGoodsList().then((res) => {
        this.hotList = res.list[0].content;
        this.newList = res.list[1].content;
        this.goodsList = res.list[2].content;
      });
    },
  },
};
</script>

<style lang="" scoped>
.img {
  width: 100%;
  height: 3.9rem;
}
/* .title{
  font-size: 14px;
} */
</style>
