<template>
  <el-dialog title="编辑" :visible.sync="visable" width="90%">
    <el-form ref="form" :model="item" :rules="rules" label-width="100px">
      <el-form-item label="活动名称" prop="name">
        <el-input v-model="item.name"></el-input>
      </el-form-item>
      <el-form-item label="活动区域" prop="region">
        <el-select v-model="item.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动时间" required>
        <el-col :span="11">
          <el-form-item prop="date1">
            <el-date-picker type="date" placeholder="选择日期" v-model="item.date1" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item prop="date2">
            <el-time-picker type="fixed-time" placeholder="选择时间" v-model="item.date2" style="width: 100%;"></el-time-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="即时配送" prop="delivery">
        <el-switch v-model="item.delivery"></el-switch>
      </el-form-item>
      <el-form-item label="活动性质" prop="type">
        <el-checkbox-group v-model="item.type">
          <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
          <el-checkbox label="地推活动" name="type"></el-checkbox>
          <el-checkbox label="线下主题活动" name="type"></el-checkbox>
          <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="特殊资源" prop="resource">
        <el-radio-group v-model="item.resource">
          <el-radio label="线上品牌商赞助"></el-radio>
          <el-radio label="线下场地免费"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="活动形式" prop="desc">
        <el-input type="textarea" v-model="item.desc"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visable = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import Entity from '../models/Index'
  import GetRules from '../utils/Rules'
  import FormMixins from '@/mixins/FormMixins'

  export default {
    mixins: [FormMixins],
    data() {
      return {
        visable: false,
        item: new Entity(),
        rules: GetRules(this),
      }
    },
    methods: {
      open(item) {
        if (item) {
          this.item = Object.assign(new Entity, item)
        }
        else {
          this.item = new Entity()
        }

        this.reset()
        this.visable = true
      },
      reset() {
        this.item = new Entity()
        this.resetForm()
      },
      async submit() {
        await this.submitForm()
        this.visable = false
        this.$emit('callback', this.item)
      }
    }
  }
</script>
