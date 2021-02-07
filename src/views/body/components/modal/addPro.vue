<template>
  <div>
    <a-modal v-model="visible" :footer="null" :title=" title" :dialog-style="{ top: '20px' }">
      <a-form-model
        :model="formData"
        ref="ruleForm"
        :rules="rules"
        :wrapper-col="wrapperCol"
        :label-col="labelCol"
      >
        <a-form-model-item label="名称" prop="name">
          <a-input v-model="formData.name" placeholder="请输入新增商品名称"></a-input>
        </a-form-model-item>
        <a-form-model-item label="详情" prop="desc">
          <a-input v-model="formData.desc" type="textarea"></a-input>
        </a-form-model-item>
        <a-form-model-item label="价格" prop="price">
          <a-input type="number" v-model="formData.price" placeholder="请输入商品价格"></a-input>
        </a-form-model-item>
        <a-form-model-item type="number" label="库存" prop="count">
          <a-input @keydown="verifyNum" v-model="formData.count" placeholder="请输入库存"></a-input>
        </a-form-model-item>
        <!-- 给按钮添加一个唯一值，这样再次添加时就可以清除缓存了 -->
        <a-form-model-item label="是否推荐" :label-col="{span:5}">
          <a-switch v-model="formData.recommend" />
        </a-form-model-item>
        <a-form-model-item label="类型" prop="type">
          <a-select v-model="formData.type">
            <a-select-option
              v-for="(item,i) in productType"
              :key="i"
              :value="item.type"
            >{{item.type}}</a-select-option>
          </a-select>
        </a-form-model-item>

        <!-- 给图片添加一个唯一值，这样再次添加时就可以清除缓存了 -->
        <a-form-model-item label="图片" :key="Math.random()">
          <a-upload
            action="http://localhost:3000/admin/api/upload"
            list-type="picture"
            :multiple="true"
            @change="uploadImg"
            class="upload-list-inline"
            :default-file-list="defaultFileList"
          >
            <!--   :default-file-list="defaultFileList" -->
            <a-button>
              <a-icon type="upload" />upload
            </a-button>
          </a-upload>
        </a-form-model-item>

        <a-form-model-item :wrapper-col="{span:24}" style="text-align:center;">
          <a-button type="primary" v-if="title=='新增'" @click="handleAdd">新增</a-button>
          <a-button type="primary" v-else @click="handleUpdate">更新</a-button>
          <a-button type="primary" style="margin-left:20px;" @click="handleCancel">取消</a-button>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "",
      defaultFileList: [], //默认已经上传了的列表，用于回显图片
      productType: [], //商品类型
      fileList: [], //服务器返回的上传图片列表，里面有图片在服务器的地址
      imgUrl: [], //注意事项看getImgUrl方法注释，服务器返回的图片地址。
      visible: false,
      wrapperCol: { span: 16 },
      labelCol: { span: 4 },
      rules: {
        name: [{ required: true, trigger: "blur", message: "名称不能为空" }],
        price: [{ required: true, trigger: "blur", message: "价格不能为空" }],
        count: [{ required: true, trigger: "blur", message: "库存不能为空" }],
        type: [{ required: true, trigger: "blur", message: "类型不能为空" }],
        desc: [{ required: true, trigger: "blur", message: "详情不能为空" }]
      },
      formData: {
        recommend: false,
        name: "",
        price: "",
        count: null,
        type: "",
        imgUrl: [],
        desc: ""
      }
    };
  },
  methods: {
    verifyNum(e) {
      if (e.keyCode < 48 || e.keyCode > 57) {
        e.returnValue = false;
      }
      console.log(e);
    },
    uploadImg(res) {
      this.fileList = res.fileList;
    },
    getDate() {
      let date = new Date();
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let minute = date.getMinutes();
      minute = minute < 10 ? "0" + minute : minute;
      return `${y}-${m}-${d}`;
    },
    showModal(record) {
      //如果record存在，则说明点击了编辑，回显信息。否则就是点击了新增
      if (record) {
        this.title = "编辑";
        this.formData = { ...record };
        //回显图片，防止图片重复添加
        if (this.defaultFileList.length == 0) {
          for (let i of record.imgUrl) {
            this.defaultFileList.push(i);
          }
        }
      } else {
        this.title = "新增";
        this.getType();
        //直接变成空对象，而如果你不设置推荐开关时，是没有这个recommend属性的。
        //所以要添加recommend属性，把其他的都清空。其他是必填
        this.formData = { recommend: false };
        this.defaultFileList = []; //清除回显图片
        console.log("open", this.formData);
      }
      this.visible = true;
    },
    // 获取类型
    getType() {
      this.$http.getProductType().then(res => {
        this.productType = res.data;
        // console.log("aa", this.productType);
      });
    },
    handleUpdate() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let params = { ...this.formData, time: this.getDate() };
          this.$http.updateProduct(params).then(res => {
            if (res.status == 200) {
              this.$message.success("更新成功");
              this.$parent.getProductLists();
            }
          });
          this.visible = false;
        }
      });
    },
    //提取fileList中的图片地址(应该不止地址，还有uid、name，因为回显图片要用到)
    getImgUrl() {
      for (let i = 0; i < this.fileList.length; i++) {
        // 不能直接this.formData.imgUrl.push(this.fileList[i].response.url);
        let uid = this.fileList[i].uid;
        this.fileList[i].response.uid = uid; //把外层的uid动态添加到内层
        this.fileList[i].response.name = this.fileList[i].response.originalname;
        this.imgUrl.push(this.fileList[i].response);
        this.formData.imgUrl = this.imgUrl;
      }
    },
    handleAdd() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.getImgUrl();
          let params = { ...this.formData, time: this.getDate() };
          console.log("params", params);
          this.$http.addProduct(params).then(res => {
            if (res.status == 200) {
              this.$message.success("添加成功");
              this.$refs.ruleForm.resetFields(); //清空表单
              this.$parent.getProductLists();
              this.$router.go(0); //不懂为啥，要强制刷新。否则，连续添加两次时。第二次会把第一次的图片也添加上去。
            }
          });
          this.visible = false;
        }
      });
    },
    handleCancel() {
      this.visible = false;
    }
  }
};
</script>
<style scoped>
/* tile uploaded pictures */
.upload-list-inline >>> .ant-upload-list-item {
  float: left;
  width: 200px;
  margin-right: 8px;
}
.upload-list-inline >>> .ant-upload-animate-enter {
  animation-name: uploadAnimateInlineIn;
}
.upload-list-inline >>> .ant-upload-animate-leave {
  animation-name: uploadAnimateInlineOut;
}
</style>
<style lang="scss" scoped>
</style>
