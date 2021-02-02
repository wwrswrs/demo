<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar title="分类" left-text="返回" right-text="其他" left-arrow />
    <!-- 搜索框 -->
    <van-cell-group>
      <van-field left-icon="search" placeholder="请随意搜索"
    /></van-cell-group>
    <div class="cate">
      <!-- 侧边栏 -->
      <van-sidebar v-model="activeKey" @change="onChange">
        <van-sidebar-item
          v-for="item in cateList"
          :key="item.id"
          :title="item.catename"
        />
      </van-sidebar>
      <!-- 宫格 -->
      <van-grid :border="false" :gutter="10" :column-num="3">
        <van-grid-item v-for="item in secondList" :key="item.id" :to="'/list?id='+item.id">
          <van-image :src="item.img?$imgUrl+item.img:'https://img.yzcdn.cn/vant/apple-1.jpg'" />
          <p>{{item.catename}}</p>
        </van-grid-item>
       
      </van-grid>
    </div>
  </div>
</template>

<script>
import { getCateList } from "../util/axios";
export default {
  data() {
    return {
      activeKey: 0,
      cateList: [],
      secondList: [],
    };
  },
  mounted() {
    //页面一加载就触发
    this.getCateInfo();
  },
  methods: {
    //封装一个左侧侧边栏事件
    onChange() {
      this.secondList = this.cateList[this.activeKey].children;
    },
    //封装一个获取分类列表的接口
    getCateInfo() {
      getCateList().then((res) => {
        console.log(res, "分类列表");
        // 一级分类
        if (res.code === 200) {
          this.cateList = res.list;
          // 二级分类
          this.secondList = res.list[0].children;
        }
      });
    },
  },
};
</script>

<style lang="" scoped>
.cate {
  display: flex;
}
.van-grid {
  flex: 1;
}
</style>
