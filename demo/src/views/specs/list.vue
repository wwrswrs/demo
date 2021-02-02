<template>
  <div>
    <el-table :data="getSpecsList" border style="width: 100%">
      <el-table-column prop="id" label="规格编号" width="180">
      </el-table-column>
      <el-table-column prop="specsname" label="规格名称" width="180">
      </el-table-column>
      <el-table-column  label="规格属性" width="180">
        <template slot-scope="item">
          <div>
            <el-tag v-for="attr in item.row.attrs" :key="attr" type="info">{{attr}}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="item">
          <div>
            <el-tag type="success" v-if="item.row.status == 1">启用</el-tag>
            <el-tag type="danger" v-else>禁用</el-tag>
          </div>
        </template>
      </el-table-column>
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
    <!-- 分页器 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="getCountNum"
      :page-size="getSpecsSize"
      @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>

<script>
//引入接口模块
import { getSpecsDelete } from "../../util/axios";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  mounted() {
    //组件加载触发这个获取规格列表的行动
    this.getSpecsListAction();
    this.getCountAction();
  },
  methods: {
    //封装编辑事件，传递id给role父组件
    edit(id) {
      this.$emit("edit", id);
    },
    //切换页码触发的事件
    changePage(n) {
      console.log(n, "当前页码数");
      this.changePageAction(n)
    },
    ...mapActions({
      getSpecsListAction: "specs/getSpecsListAction",
      getCountAction: "specs/getCountAction",
      changePageAction:'specs/changePageAction',
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
          getSpecsDelete({
            id,
          }).then((res) => {
            console.log(res, "删除角色");
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //删除以后重新调取列表
              this.getSpecsListAction();
              //重新调取总条数
              this.getCountAction()
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
  },
  computed: {
    //模块添加了命名空间所以要修改名字
    ...mapGetters({
      getSpecsList: "specs/getSpecsList",
      getSpecsSize: "specs/getSpecsSize",
      getCountNum: "specs/getCountNum",
    }),
  },
};
</script>

<style lang="" scoped>
</style>
