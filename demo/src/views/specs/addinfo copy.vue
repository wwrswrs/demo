<template>
  <div>
    <el-dialog
      :before-close="cancel"
      :title="addInfo.isAdd ? '添加规格' : '编辑规格'"
      :visible.sync="addInfo.isShow"
      center
    >
      <el-form :model="specsForm" :rules="rules" ref="ruleForm">
        <el-form-item
          label="规格名称"
          :label-width="formLabelWidth"
          prop="username"
        >
          <el-input
            v-model="specsForm.specsname"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        
        <el-form-item  label="商品描述"
          :label-width="formLabelWidth">
           <div id="editor"></div>
        </el-form-item>
        
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="specsForm.status"
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
//引入富文本编辑器插件
import e from "wangeditor"
import { mapActions } from "vuex";
//引入封装好的接口模块
import { getSpecsAdd, getSpecsInfo } from "../../util/axios";

export default {
  data() {
    return {
       //editor初始值
       editor:null,

      //动态表单项
      attrArr: [
        {
          value: "",
        },
      ],
      specsForm: {
        specsname: "", //规格名称
        attrs: "", //规格属性值
        status: 1, //1是正常2是禁用
      },
      formLabelWidth: "120px",
      rules: {
        specsname: [
          { required: true, message: "请输入规格名称", trigger: "blur" },
          { min: 2, max: 15, message: "长度在 2 到 15个字符", trigger: "blur" },
        ],
      },
      formLabelWidth: "120px",
    };
  },
  props: ["addInfo"],
  mounted() {},
  methods: {
    //封装一个动态添加表单项
    addAttr() {
      //动态添加数据
      //最多只能添加6次
      if (this.attrArr.length <= 6) {
        this.attrArr.push({
          value: "",
        });
      } else {
        this.$message.warning("最多只能添加6哥输入框");
      }
    },
    //删除动态表单事件
    delAttr(item) {
      var index = this.attrArr.indexOf(item);
      if (index !== -1) {
        this.attrArr.splice(index, 1);
      }
    },
    //封装取消事件
    cancel() {
      this.$emit("cancel", {
        isShow: false,
        isAdd: this.addInfo.isAdd,
      });
      this.reset();
    },
    ...mapActions({
      getSpecsListAction: "specs/getSpecsListAction",
      getCountAction: "specs/getCountAction",
    }),
    //封装一个重置事件
    reset() {
      this.specsForm = {
        specsname: "", //规格名称
        attrs: "", //规格属性值
        status: 1, //1是正常2是禁用
      };
      //重置规则验证
      this.$refs["ruleForm"].resetFields();
      this.attrArr=[
        {
          value:""
        }
      ]
    },
    //封装一个添加事件
   add(formName) {
      //添加方法执行，触发validate验证器
      this.$refs[formName].validate(valid => {
        if (valid) {
          //调取添加接口
          /* 
          attrArr = [{value:'111'},{value:'222'},{value:'333'}]
          先生成新数组，然后转化成字符串
          attrs = '11,222,333'
          */
            this.specsForm.attrs = this.attrArr.map(item => item.value).join(",");
          console.log(this.specsForm, "规则对象");
          getSpecsAdd(this.specsForm).then(res => {
            console.log(res);
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //关闭弹框并重置
              this.cancel();
              //重新获取列表
              this.getSpecsListAction();
              //重新调取下总数（当你添加成功，分页也要跟着变化，只有总数变化之后，分页才能跟着变化）
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
    },
    //封装一个查询一条数据时间
    lookInfo(id) {
      //调取查询接口
      getSpecsInfo({ id}).then((res) => {
        
        if (res.data.code === 200) {
          this.specsForm = res.data.list[0];
          this.specsForm.id = id;
          //循环数组取出数据设置到input框种
          this.specsForm.attrs.map((item,index)=>{
            console.log(item,"数组种的每一项")
            if(index==0){
              this.attrArr[0].value=item
            }else{
              this.attrArr.push({value:item})
            }
          })
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
          editManger(this.specsForm).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //关闭弹框并重置 并重新获取列表
              this.cancel();
              this.getSpecsListAction();
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
    },
  },
};
</script>

<style lang="" scoped>
.inp {
  width: 75%;
}
</style>
