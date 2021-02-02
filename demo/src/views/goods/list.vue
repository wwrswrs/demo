<template>
  <div>
    <el-table :data="getGoodsList" border style="width: 100%">
      <el-table-column prop="id" label="商品编号" width="180">
      </el-table-column>
      <el-table-column prop="goodsname" label="商品名称" width="180">
      </el-table-column>
      <el-table-column prop="price" label="商品价格" width="180">
      </el-table-column>
      <el-table-column prop="market_price" label="市场价格" width="180">
      </el-table-column>
      <el-table-column  label="图片" width="180">
        <template>
          <div slot-scope="item">
            <img src="" alt="">
          </div>
        </template>
      </el-table-column>
      <el-table-column label="是否新品">
        <template slot-scope="item">
          <div>
            <el-tag type="success" v-if="item.row.isnew == 1">是</el-tag>
            <el-tag type="danger" v-else>否</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="是否热卖">
        <template slot-scope="item">
          <div>
            <el-tag type="success" v-if="item.row.ishot == 1">是</el-tag>
            <el-tag type="danger" v-else>否</el-tag>
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
            <el-button type="primary" size="small" @click="edit(item.row.uid)"
              >编辑</el-button
            >
            <el-button type="danger" size="small" @click="del(item.row.uid)"
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
      :page-size="getGoodsSize"
      @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>

<script>
//引入接口模块
import { getGoodsDelete } from "../../util/axios";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  mounted() {
    //组件加载触发这个获取用户列表的行动
    this.getGoodsListAction();
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
      this.changePageAction(n);
    },
    ...mapActions({
      getGoodsListAction: "goods/getGoodsListAction",
      getCountAction: "goods/getCountAction",
      changePageAction: "goods/changePageAction",
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
          getGoodsDelete({
            id: id,
          }).then((res) => {
            console.log(res, "删除角色");
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //删除以后重新调取列表
              this.getGoodsListAction();
              //重新调取总条数
              this.getCountAction();
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
      getGoodsList: "goods/getGoodsList",
      getGoodsSize: "goods/getGoodsSize",
      getCountNum: "goods/getCountNum",
    }),
  },
};
</script>

<style lang="" scoped>
</style>
