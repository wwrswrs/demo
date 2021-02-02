<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      title="分类"
      left-text="返回"
      right-text="其他"
      left-arrow
      @click-left="$router.back()"
    />
    <van-list v-if="goodsList.length > 0">
      <van-card
        v-for="item in goodsList"
        :key="item.id"
        :price="item.price.toFixed(2)"
        desc="描述信息"
        :title="item.goodsname"
        :thumb="
          item.img ? $imgUrl + item.img : 'https://img.yzcdn.cn/vant/ipad.jpeg'
        "
      />
    </van-list>
    <van-list v-else>
        <!-- 无商品列表 -->
    <van-empty  description="暂无商品" />
    </van-list>
  
  </div>
</template>

<script>
import { getGoods } from "../util/axios";
export default {
  data() {
    return {
      goodsList: [],
    };
  },
  mounted() {
    getGoods({
      fid: this.$route.query.id,
    }).then((res) => {
      console.log(res, "响应");
      if (res.code == 200) {
        this.goodsList = res.list ? res.list:[];
      }
    });
  },
};
</script>

<style lang="" scoped>
</style>
