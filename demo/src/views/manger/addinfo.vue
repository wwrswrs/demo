<template>
  <div>
    <el-dialog
      :before-close="cancel"
      :title="addInfo.isAdd ? '添加用户' : '编辑用户'"
      :visible.sync="addInfo.isShow"
      center
    >
      <el-form :model="mangerForm" :rules="rules" ref="ruleForm">
        <el-form-item
          label="所属角色"
          :label-width="formLabelWidth"
          prop="roleid"
        >
          <el-select v-model="mangerForm.roleid" placeholder="请选择">
            <el-option
              v-for="item in getRoleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="用户名称"
          :label-width="formLabelWidth"
          prop="username"
        >
          <el-input v-model="mangerForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="mangerForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="mangerForm.status"
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
import { addManger, editManger, mangerInfo } from "../../util/axios";

export default {
  data() {
    return {
      mangerForm: {
        roleid: "", //角色编号
        username: "", //管理员名称
        password: "", //密码
        status: 1, //1是正常2是禁用
      },
      formLabelWidth: "120px",
      rules: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          { min: 2, max: 15, message: "长度在 2 到 15个字符", trigger: "blur" },
        ],
        roleid: [
          { required: true, message: "请选择所属角色", trigger: "change" },
        ],
      },
      formLabelWidth: "120px",
    };
  },
  props: ["addInfo"],
  mounted() {
    //角色列表一触发就调用角色列表
    this.getRoleListAction();
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
      getRoleListAction: "role/getRoleListAction",
      getMangerListAction: "manger/getMangerListAction",
      getCountAction: "manger/getCountAction",
    }),
    //封装一个重置事件
    reset() {
      this.mangerForm = {
        roleid: "", //角色编号
        username: "", //管理员名称
        password: "", //密码
        status: 1, //1是正常2是禁用
      };
      //重置规则验证
      this.$refs["ruleForm"].resetFields();
    },
    //封装一个添加事件
    add(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //添加接口
          addManger(this.mangerForm).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //关闭弹框并重置 并重新获取列表
              this.cancel();
              this.getMangerListAction();
              //重新调取总数 （当你添加成功，分页也要跟着变化）
              this.getCountAction();
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
      mangerInfo({ uid: id }).then((res) => {
        console.log(res, "查询角色一条数据结果");
        if (res.data.code === 200) {
          this.mangerForm = res.data.list;
          this.mangerForm.uid = id;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //封装一个修改事件
    update(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //添加接口
          editManger(this.mangerForm).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //关闭弹框并重置 并重新获取列表
              this.cancel();
              this.getMangerListAction();
              //重新调取总数 （当你添加成功，分页也要跟着变化）
              this.getCountAction();
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
      getRoleList: "role/getRoleList",
    }),
  },
};
</script>

<style lang="" scoped>
</style>
