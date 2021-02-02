<template>
  <!-- 用于列表渲染  default-expand-all自动展开树形结构  :tree-props="{children:'children'渲染嵌套的配置属性-->
  <div>
    <el-table
      :data="menuList"
      border
      style="width: 100%"
      row-key="id"
      :tree-props="{ children: 'children' }"
      default-expand-all
    >
      <el-table-column prop="id" label="菜单编号" width="150">
      </el-table-column>
      <el-table-column prop="title" label="菜单名称" width="150">
      </el-table-column>
      <el-table-column prop="pid" label="上级菜单"> </el-table-column>
      <el-table-column prop="icon" label="菜单图标"> </el-table-column>
      <el-table-column prop="url" label="菜单地址"> </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="item">
          <div>
            <el-tag type="success" v-if="item.row.status == 1">启用</el-tag>
            <el-tag type="danger" v-else>禁用</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="item">
          <div>
            <el-button type="primary" size="small" @click="edit(item.row.id)"
              >编辑</el-button
            >
            <el-button type="danger" size="small" @click="del(item.row.id)"
              >删除</el-button
            >
          </div>
        </template>
      </el-table-column>
      <!-- prop对着下面数据里面的属性是不可以随意乱改的要与下面的key值一致 -->
    </el-table>
  </div>
</template>

<script>
//调用辅助性函数
import { mapActions, mapGetters } from "vuex";
//引入删除接口文档
import { deleteMenu } from "../../util/axios";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      menuList: "menu/getMenuList",
    }),
  },
  mounted() {
    //当列表渲染触发行动
    this.getMenuList();
    console.log(this.$store); //当页面一加载的时候就触发行动名称
  },
  methods: {
    ...mapActions({
      getMenuList: "menu/getMenuListAction", //调取的是行动名称
    }),
    //封装删除事件
    del(id) {
      this.$confirm("你确定要删除吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //调取删除接口
          deleteMenu({
            id,
          }).then((res) => {
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              this.getMenuList();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //封装编辑事件
    edit(id) {
      //告诉父组件 我要打开编辑弹框  然后传一个id
      this.$emit("edit", id);
    },
  },
};
</script>

<style lang="" scoped>
</style>
