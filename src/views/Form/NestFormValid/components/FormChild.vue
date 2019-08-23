<template>
  <div>
    <el-form :model="item"
             :rules="rules">
      <el-form-item label="name"
                    prop="name">
        <el-input v-model="item.name"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  const rules = {
    name: [
      { required: true, message: '请输入活动名称', trigger: 'blur' },
    ]
  };

  export default {
    props: {
      item: Object
    },
    data() {
      return {
        rules: rules
      }
    },
    created() {

    }
  }
</script>

<style>
</style>