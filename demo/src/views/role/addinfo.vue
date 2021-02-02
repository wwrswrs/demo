<template>
  <div>
    <el-dialog
      :before-close="cancel"
      :title="addInfo.isAdd ? '添加角色' : '编辑角色'"
      :visible.sync="addInfo.isShow"
      center
    >
      <el-form :model="roleForm" :rules="rules" ref="ruleForm">
        <el-form-item
          label="角色名称"
          :label-width="formLabelWidth"
          prop="rolename"
        >
          <el-input v-model="roleForm.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" :label-width="formLabelWidth">
          <!-- 角色权限的结构应该获取的是我们菜单列表的 -->
          <el-tree
            :data="getMenuList"
            show-checkbox
            node-key="id"
            default-expand-all
            :props="{
              children: 'children', //树形层级
              label: 'title', //展示的内容
            }"
            ref="tree"
            check-strictly
          >
          </el-tree>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="roleForm.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" v-if="addInfo.isAdd" @click="add('ruleForm')"
          >确 定</el-button
        >
        <el-button type="primary" v-else @click="update('ruleForm')"
          >编辑</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
//引入封装好的接口模块
import { addRole, roleInfo, editRole } from "../../util/axios";

export default {
  data() {
    return {
      roleForm: {
        rolename: "", //角色名称
        menu: "",
        status: 1, //1是正常2是禁用
      },
      formLabelWidth: "120px",
      rules: {
        rolename: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
      },
      formLabelWidth: "120px",
      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },
  props: ["addInfo"],
  mounted() {
    //角色列表一触发就调用菜单列表
    this.getMenuListAction();
  },
  methods: {
    //封装取消事件
    cancel() {
      this.$emit("cancel", {
        isShow: false,
        isAdd: this.addInfo.isAdd,
      });
      this.reset();
    },
    ...mapActions({
      getMenuListAction: "menu/getMenuListAction",
      getRoleListAction: "role/getRoleListAction",
    }),
    //封装一个重置事件
    reset() {
      this.roleForm = {
        rolename: "",
        menu: "",
        status: 1,
      };
      //重置角色权限数据结构
      this.$refs.tree.setCheckedKeys([]);
    },
    //封装一个添加事件
    add(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //调取添加接口
          this.roleForm.menus = this.$refs.tree.getCheckedKeys().join(",");
          //添加接口
          addRole(this.roleForm).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //关闭弹框并重置 并重新获取列表
              this.cancel();
              this.getRoleListAction();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      console.log(this.roleForm, "角色表单对象");
    },
    //封装一个查询一条数据时间
    lookInfo(id) {
      //调取查询接口
      roleInfo({ id }).then((res) => {
        console.log(res, "查询角色一条数据结果");
        if (res.data.code === 200) {
          this.roleForm = res.data.list;
          //把menu的返回值设置给角色权限
          this.$refs.tree.setCheckedKeys(this.roleForm.menus.split(","));
          this.roleForm.id = id;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //封装一个修改事件
    update(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //调取修改接口
          this.roleForm.menus = this.$refs.tree.getCheckedKeys().join(",");
          //添加接口
          editRole(this.roleForm).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //关闭弹框并重置 并重新获取列表
              this.cancel();
              this.getRoleListAction();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      console.log(this.roleForm, "角色表单对象");
    },
  },
  computed: {
    //菜单列表的数组
    ...mapGetters({
      getMenuList: "menu/getMenuList",
    }),
  },
};
</script>

<style lang="" scoped>
</style>
