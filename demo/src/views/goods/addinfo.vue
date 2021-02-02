<template>
  <div>
    <el-dialog
      :before-close="cancel"
      :title="addInfo.isAdd ? '添加商品' : '编辑商品'"
      :visible.sync="addInfo.isShow"
      center
      @opened="createEditor"
    >
      <el-form :model="goodsForm" :rules="rules" ref="ruleForm">
        <el-form-item
          label="一级分类"
          :label-width="formLabelWidth"
          prop="first_cateid"
        >
          <el-select
            v-model="goodsForm.first_cateid"
            placeholder="请选择"
            @change="changeCate"
          >
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
          label="二级分类"
          :label-width="formLabelWidth"
          prop="second_cateid"
        >
          <el-select v-model="goodsForm.second_cateid" placeholder="请选择">
            <el-option
              v-for="item in secondCate"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="商品规格"
          :label-width="formLabelWidth"
          prop=" specsid"
        >
          <el-select
            v-model="goodsForm.specsid"
            placeholder="请选择"
            @change="changeSpecs"
          >
            <el-option
              v-for="item in getSpecsList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="规格属性"
          :label-width="formLabelWidth"
          prop="specsattr"
        >
          <el-select
            multiple
            v-model="goodsForm.specsattr"
            placeholder="请选择"
          >
            <el-option
              v-for="item in specsArr"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="商品名称"
          :label-width="formLabelWidth"
          prop="goodsname"
        >
          <el-input v-model="goodsForm.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" :label-width="formLabelWidth">
          <el-input v-model="goodsForm.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" :label-width="formLabelWidth">
          <el-input
            v-model="goodsForm.market_price"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="specsname"
          label="图片:"
          :label-width="formLabelWidth"
        >
          <el-upload
            action="#"
            list-type="picture-card"
            :auto-upload="false"
            :on-change="onChange"
            :file-list="fileList"
            :limit="1"
            :on-exceed="onExceed"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="goodsForm.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>

        <el-form-item label="商品描述" :label-width="formLabelWidth">
          <div id="editor"></div>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" v-if="addInfo.isAdd" @click="add"
          >确 定</el-button
        >
        <el-button type="primary" v-else @click="update">编辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import E from "wangeditor";
import { mapGetters, mapActions } from "vuex";
//引入封装好的接口模块
import { getGoodsAdd, getGoodsEdit, getGoodsInfo } from "../../util/axios";

export default {
  data() {
    return {
      goodsForm: {
        roleid: "", //角色编号
        first_cateid: "", //一级分类编号
        second_cateid: "", //二级份分类编号
        goodsname: "", //商品名称
        price: "", //商品价格
        market_price: "", //市场价格
        img: "", //商品图片
        description: "", //商品描述
        specsid: "", //商品规格编号
        specsattr: "", //商铺内规格属性
        isnew: "", //是否新品
        ishot: "", //是否是热品
        status: 1, //1是正常2是禁用
      },
      formLabelWidth: "120px",
      rules: {
        first_cateid: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 2, max: 15, message: "长度在 2 到 15个字符", trigger: "blur" },
        ],
        second_cateid: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 2, max: 15, message: "长度在 2 到 15个字符", trigger: "blur" },
        ],
        price: [
          { required: true, message: "请输入商品价格", trigger: "blur" },
          { type: "number", message: "商品价格必须为数字" },
        ],
        goodsname: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
        specsid: [
          { required: true, message: "请选择商品规格", trigger: "blur" },
        ],
        specsattr: [
          { required: true, message: "请选择规格属性", trigger: "blur" },
        ],
      },
      formLabelWidth: "120px",
      secondCate: [], //二级分类的空数组  因为二级没有接口 所以需要联动 获取一级的索引
      specsArr: [], //规格属性数组
      editor: null,
    };
  },
  props: ["addInfo"],
  mounted() {
    //角色列表一触发就调用角色列表
    this.getGoodsListAction();
    this.getCateListAction();
    this.getSpecsListAction();
  },
  methods: {
    //封装一个创建富文本编辑器的事件
    createEditor() {
      //实例化编辑器的构造函数
      this.editor = new E("#editor");
      this.editor.create();
      //清空多次创建
      this.editor.txt.html("");
    },

    //封装以及分来切换事件
    changeCate() {
      //获取一级分类的id和列表
      let index = this.getCateList.findIndex((item) => {
        //当条件匹配  返回出当前条件匹配的索引
        return this.goodsForm.first_cateid == item.id;
      });
      this.secondCate = this.getCateList[index].children;
    },

    //封装规格属性列表事件
    changeSpecs() {
      let index = this.getSpecsList.findIndex(
        (item) => this.goodsForm.specsid == item.id
      );
      this.specsArr = this.getSpecsList[index].attrs;
      //当用户切换规格的时候 把双向数据绑定清空
      this.goodsForm.specsattr = "";
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
      getCateListAction: "cate/getCateListAction",
      getGoodsListAction: "goods/getGoodsListAction",
      getCountAction: "goods/getCountAction",
      getSpecsListAction: "specs/getSpecsListAction",
    }),
    //封装一个重置事件
    reset() {
      this.goodsForm = {
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
      console.log(this.editor.txt.html(), "你是谁");
      //取出富文本编辑器的内容
      this.goodsForm.description = this.editor.txt.html();
      this.goodsForm.specsattr = this.goodsForm.specsattr
        ? this.goodsForm.specsattr.join(",")
        : "";
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //添加接口
          getGoodsAdd(this.goodsForm).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //关闭弹框并重置 并重新获取列表
              this.cancel();
              this.getGoodsListAction();
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
    //封装一个查询一条数据时间
    lookInfo(id) {
      //调取查询接口
      getGoodsInfo({ uid: id }).then((res) => {
        console.log(res, "查询角色一条数据结果");
        if (res.data.code === 200) {
          this.goodsForm = res.data.list;
          this.goodsForm.uid = id;
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
          getGoodsEdit(this.goodsForm).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //关闭弹框并重置 并重新获取列表
              this.cancel();
              this.getGoodsListAction();
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
  computed: {
    //菜单列表的数组
    ...mapGetters({
      getCateList: "cate/getCateList", //分类列表
      getSpecsList: "specs/getSpecsList", //规格列表
    }),
  },
};
</script>

<style lang="" scoped>
</style>
