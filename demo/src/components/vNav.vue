<template>
  <div>
    <el-row class="tac">
      <el-col>
        <!-- 属性 -->
        <!-- index就是选上谁  谁就亮起来 因为前期没有跳转都不是唯一的所有就都亮起来了 -->
        <el-menu
          :default-active="defaultActive"
          background-color="#606266"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
          router
        >
          <!-- 加上router才能点击跳转渲染这样菜单栏就只渲染一个 -->
          <el-menu-item index="/home">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu :index="item.id.toString()" v-for="item in navList" :key="item.id">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.title}}</span>
            </template>
            <el-menu-item :index="list.url" v-for="list in item.children" :key="list.id"> {{list.title}}</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      defaultActive:"/home",
      navList:[]
    };
  },
  mounted(){
    this.defaultActive=this.$route.path
    if(sessionStorage.getItem("loginInfo")){
   this.navList = JSON.parse(sessionStorage.getItem('loginInfo')).menus
    }
  },
};
</script>

<style lang="stylus" scoped>
@import '../stylus/index.styl';

.el-menu {
  height: 90vh;
}
</style>
