<template>
  <div>
    <a-modal v-model="visible" :footer="null" :title=" title">
      <a-form-model
        :model="formData"
        ref="ruleForm"
        :rules="rules"
        :wrapper-col="wrapperCol"
        :label-col="labelCol"
      >
        <a-form-model-item label="类型名称" prop="type">
          <a-input v-model="formData.type" placeholder="请输入新增类型名称"></a-input>
        </a-form-model-item>
        <a-form-model-item label="备注">
          <a-input v-model="formData.desc" type="textarea"></a-input>
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
      visible: false,
      wrapperCol: { span: 16 },
      labelCol: { span: 4 },
      rules: {
        type: [{ required: true, trigger: "blur", message: "类型不能为空" }]
      },
      formData: {
        type: "",
        desc: ""
      }
    };
  },

  methods: {
    showModal(record) {
      //回显数据
      if (record) {
        this.formData = { ...record };
        // console.log("this.formData", this.formData);
        this.title = "编辑";
      } else {
        this.formData = {};
        this.title = "新增";
      }
      this.visible = true;
    },
    handleAdd() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let params = { ...this.formData };
          this.$http.addProductType(params).then(res => {
            if (res.status == 200) {
              this.$message.success("添加成功");
              // 添加成功后，调用父组件中的方法。重新获取数据
              this.$parent.getProductType();
            }
          });
          this.visible = false;
        }
      });
    },
    handleUpdate() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let params = { ...this.formData };
          this.$http.updateProductType(params).then(res => {
            // console.log("更新", res);
            if (res.status == 200) {
              this.$message.success("更新成功");
              this.$parent.getProductType();
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
