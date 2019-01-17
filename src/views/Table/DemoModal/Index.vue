<template>
  <el-dialog :title="item.IsNew ? '新增' : '编辑'"
             :visible.sync="dialogVisible"
             width="60%">
    <el-form :model="item"
             :rules="rules"
             ref="form"
             label-width="120px">
    </el-form>
    <span slot="footer"
          class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary"
                 :loading="loading"
                 @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import { FormModel } from './models/Index.ts'
  import FormMixins from '@/mixins/FormMixins'

  export default {
    mixins: [FormMixins],
    computed: {
      rules() {
        return this.item.GetRules(this)
      }
    },
    data() {
      return {
        dialogVisible: false,
        item: new FormModel(),
        loading: false,
      }
    },
    created() {
      this.$rx_on('ShowEditModal', this.open)
    },
    methods: {
      open(item) {
        this.resetForm()

        if (item != null) {
          this.item = Object.assign(new FormModel(), item)
        }
        else {
          this.item = new FormModel()
        }

        this.dialogVisible = true
      },
      async submit() {
        await this.submitForm()

        this.loading = true

        const rsp = await this.item.Submit()

        if (rsp.code === 0) {
          this.$rx_emit('refresh')
          this.dialogVisible = false
        }
        else {
          this.$message.error(rsp.msg)
        }

        this.loading = false
      }
    }
  }
</script>
