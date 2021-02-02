<template>
  <div>
    <el-table :data="getRoleList" border style="width: 100%">
      <el-table-column prop="id" label="角色编号" width="180">
      </el-table-column>
      <el-table-column prop="rolename" label="角色名称" width="180">
      </el-table-column>
      <el-table-column prop="status" label="状态"> </el-table-column>
      <el-table-column prop="address" label="操作">
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
    </el-table>
  </div>
</template>

<script>
//引入接口模块
import { deleteRole } from "../../util/axios";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  mounted() {
    //组件加载触发这个获取角色列表的行动
    this.getRoleListAction();
  },
  methods: {
    //封装编辑事件，传递id给role父组件
    edit(id) {
      this.$emit("edit", id);
    },
    ...mapActions({
      getRoleListAction: "role/getRoleListAction",
    }),
    //封装一个删除事件
    del(id) {
      this.$confirm("你确定要删除这条数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //调取删除接口
          deleteRole({
            id,
          }).then((res) => {
            console.log(res, "删除角色");
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //删除以后重新调取列表
              this.getRoleListAction()
              this
            }else{
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
  },
  computed: {
    //模块添加了命名空间所以要修改名字
    ...mapGetters({
      getRoleList: "role/getRoleList",
    }),
  },
};
</script>

<style lang="" scoped>
</style>
