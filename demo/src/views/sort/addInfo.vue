<template>
  <!-- visible	是否显示 Dialog，支持 .sync 修饰符aaaa -->
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加分类' : '编辑分类'"
      :visible.sync="addInfo.isShow"
      :before-close="cancel"
      center
    >
      <el-form :model="cateForm" :rules="rules" ref="ruleForm">
        <el-form-item label="上级分类" :label-width="formLabelWidth" prop="pid">
          <el-select v-model="cateForm.pid" placeholder="请选择">
            <el-option label="顶级分类" :value="0"></el-option>
            <el-option
              v-for="item in getCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="分类名称"
          :label-width="formLabelWidth"
          prop="catename"
        >
          <el-input v-model="cateForm.catename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="图片"
          :label-width="formLabelWidth"
          v-if="cateForm.pid != 0"
        >
          <!-- 上传视图 -->
          <el-upload
            action="#"
            :auto-upload="false"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-change="onChange"
            :file-list="fileList"
            :limit="1"
            :on-exceed="handleExceed"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <!-- 预览展示 -->
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>
        <el-form-item label="状态：" :label-width="formLabelWidth">
          <el-switch
            v-model="cateForm.status"
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
        <el-button type="primary" @click="add('ruleForm')" v-if="addInfo.isAdd"
          >确 定</el-button
        >
        <el-button type="primary" @click="update('ruleForm')" v-else
          >编辑</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
//引入接口文档
import { getCateAdd, getCateInfo, getCateEdit } from "../../util/axios";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      //菜单添加表单
      cateForm: {
        pid: 0, //上级分类编号
        catename: "", //商品分类名称
        img: "", //图标
        status: "", //状态1 正常2禁用
      },
      rules: {
        catename: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8个字符", trigger: "blur" },
        ],
        pid: [{ required: true, message: "请选择上级菜单", trigger: "change" }],
      },
      formLabelWidth: "120px", //lable宽度
      dialogImageUrl: "", //预览的图片地址
      dialogVisible: false, //预览弹框默认是false
      imgUrl: "", //图片的配置对象
      fileList: [], //文件列表
    };
  },
  computed: {
    ...mapGetters({
      getCateList: "cate/getCateList",
    }),
  },
  methods: {
    //文件上传的限制  限制个数
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    //当文件改变时触发的函数方法
    onChange(file) {
      console.log(file, "家用电器");
      this.imgUrl = file.raw;
    },
    //控制预览时候删除
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    ...mapActions({
      getCateListAction: "cate/getCateListAction",
    }),
    //取消改变父组件的数据
    cancel() {
      //关闭弹框
      this.$emit("cancel", {
        isShow: false,
        isAdd: this.addInfo.isAdd,
      });
      this.reset();
    },
    //封装重置函数
    reset() {
      this.cateForm = {
        pid: 0, //上级分类编号
        catename: "", //商品分类名称
        img: "", //图标
        status: "", //状态1 正常2禁用
      };
    },
    lookUp(id) {
      // console.log(id,"每条数据id")  查看一条数据接口
      getCateInfo({
        id,
      }).then((res) => {
        //  console.log(res,"查看一条数据")
        if (res.data.code == 200) {
          this.cateForm = res.data.list;
          this.cateForm.id = id;
          //当查询数据的时候调取接口的时候赋值
          this.fileList = this.cateForm.img
            ? [{ url: this.$imgUrl + this.cateForm.img }]
            : "";
        }
      });
    },
    add(formName) {
      console.log(this.cateForm, "表单体");
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.cateForm.img = this.imgUrl;
          let file = new FormData();
          //循环添加对象转化成formdata格式
          for (let i in (this, this.cateForm)) {
            file.append(i, this.cateForm[i]);
          }
          getCateAdd(file).then((res) => {
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              //当成功之后关闭弹窗以及重置
              this.cancel();
              //重新调取接口列表
              this.getCateListAction();
            } else {
              this.$message.error(res.data.msg);
            }
            console.log(res, "添加成功");
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //封装修改菜单事件
    update(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //针对图片进行下一步判断
          this.cateForm.img = this.imgUrl ? this.imgUrl : this.cateForm.img;
          //对于有上传文件的数据我们要用构造函数formdata去转换
          let file = new FormData();
          //循环添加对象转化成formdata格式
          for (let i in (this, this.cateForm)) {
            file.append(i, this.cateForm[i]);
          }
          editCateEdit(file).then((res) => {
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              //当成功之后关闭弹窗以及重置
              this.cancel();
              //重新调取接口列表
              this.getCateListAction();
            } else {
              this.$message.error(res.data.msg);
            }
            console.log(res, "添加成功");
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  props: ["addInfo"],
};
</script>

<style lang="" scoped>
</style>
