<template>
  <el-form inline>
    <el-form-item label="日期范围">
      <DateRange :value="model"
                 field1="date1"
                 field2="date2"
                 :offset="1"></DateRange>
    </el-form-item>
    <el-form-item>
      <slot></slot>
    </el-form-item>
  </el-form>
</template>

<script>
  import DateRange from '@/components/DateRange.vue'
  import { Filter } from '../models/Index.ts'

  export default {
    components: {
      DateRange,
    },
    props: {
      model: Filter
    }
  }
</script>
