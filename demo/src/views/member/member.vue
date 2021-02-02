<template>
  <div>
    <el-bread></el-bread>
    <el-button type="primary" plain size="small" @click="toOpen"
      >添加</el-button
    >
    <v-dialog :addInfo="addInfo" @cancel="cancel" ref="vAdd"></v-dialog>
    <!-- 列表 -->
    <v-table @edit="edit"></v-table>
  </div>
</template>

<script>
import vTable from "./list";
import vDialog from "./addInfo";
export default {
  data() {
    return {
      addInfo: {
        isShow: false,//控制弹框是否显示
        isAdd:true//用于添加或者编辑
      },
    };
  },
  components: {
    vTable,
    vDialog,
  },
  methods: {
    //点击添加按钮出现
    toOpen() {
      //打开弹框
      this.addInfo.isShow = true;
      //告诉弹框你是添加
      this.addInfo.isAdd=true
    },
    cancel(e) {
      this.addInfo= e;//取消弹框用的是共同的事件  
    },
    //封装一个编辑事件
    edit(e){
      // console.log(this.$refs.vAdd,"子组件的实例")
      //打开编辑弹框
      this.addInfo.isShow=true
      //告诉弹框你是编辑
      this.addInfo.isAdd=false
      this.$refs.vAdd.lookUp(e)
    }
  },
};
</script>

<style lang="" scoped>
</style>
