<template>
  <div>
    <!-- 引入全局的面包屑 -->
    <el-bread></el-bread>
    <!-- 添加按钮 -->
    <el-button type="primary" plain size="small" @click="toOpen"
      >添加</el-button
    >
    <!-- 数据展示 -->
    <v-table @edit="edit"></v-table>
    <!-- 弹框 -->
    <v-add :addInfo="addInfo" @cancel="cancel" ref="vDialog"> </v-add>
  </div>
</template>

<script>
//引入表格
import vTable from "./list";
//引入弹框
import vAdd from "./addinfo";
export default {
  data() {
    return {
      addInfo: {
        isShow: false, //用于控制子组件弹框的显示的
        iSAdd:true//是否是添加还是关闭
      },
    };
  },
  components: {
    vTable,
    vAdd
  },
  methods: {
    //打来添加弹框事件
    toOpen() {
      this.addInfo.isShow = true;
      this.addInfo.isAdd=true
    },
    //分装一个isShow状态的自定义事件
    cancel(e) {
      this.addInfo = e;
    },
    //封装一个编辑事件
    edit(e){
      //打开编辑弹框
      this.addInfo.isShow=true
      //你是一个编辑的弹框
      this.addInfo.iSAdd=false
      //调取查询方法
     this.$refs.vDialog.lookInfo(e)
    }
  },
};
</script>

<style lang="" scoped>
</style>
