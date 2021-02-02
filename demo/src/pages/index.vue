<template>
  <div>
    <el-container>
      <el-header> 小U商城后台管理系统 </el-header>
      <el-container>
        <el-aside>
         <v-nav></v-nav>
        </el-aside>
        <el-main> 
          <!-- 二级路由的出口 -->
          <router-view></router-view>
           </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import vNav from "../components/vNav"
import VNav from '../components/vNav.vue';
export default {
  data() {
    return {
    
    };
  },
  components:{
    vNav
  }
};
</script>

<style lang="stylus" scoped>
@import '../stylus/index.styl';

.el-header {
  background-color: $secondBgColor;
}

.el-aside {
  width: 220px !important;
}
.el-header
  line-height 65px
  color white
</style>
