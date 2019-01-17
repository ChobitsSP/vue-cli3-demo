<template>
  <el-date-picker v-model="daterange"
                  type="daterange"
                  style="max-width:250px;"
                  :clearable="clearable"
                  :picker-options="PickerOptions"
                  placeholder="选择日期范围">
  </el-date-picker>
</template>

<script>
  import moment from 'moment'

  function GetOptions() {
    return {
      shortcuts: [{
        text: '最近一周',
        onClick(picker) {
          const end = new Date();
          const start = moment().add(-7, 'days').toDate()
          picker.$emit('pick', [start, end]);
        }
      },
      {
        text: '最近一个月',
        onClick(picker) {
          const end = new Date();
          const start = moment().add(-1, 'months').toDate()
          picker.$emit('pick', [start, end])
        }
      },
      {
        text: '最近三个月',
        onClick(picker) {
          const end = new Date()
          const start = moment().add(-3, 'months').toDate()
          picker.$emit('pick', [start, end])
        }
      }]
    }
  }

  export default {
    props: {
      PickerOptions: {
        type: Object,
        default: GetOptions
      },
      value: Object,
      field1: {
        type: String,
        default: 'date1',
      },
      field2: {
        type: String,
        default: 'date2',
      },
      clearable: {
        type: Boolean,
        default: false,
      }
    },
    computed: {
      date1: {
        get() {
          return this.value[this.field1]
        },
        set(val) {
          this.value[this.field1] = val
        }
      },
      date2: {
        get() {
          return this.value[this.field2]
        },
        set(val) {
          this.value[this.field2] = val
        }
      },
      daterange: {
        get() {
          const arr = new Array(2)
          arr[0] = moment(this.date1).toDate()
          arr[1] = moment(this.date2).subtract(1, 'days').toDate()
          return arr
        },
        set(arr) {
          this.date1 = moment(arr[0]).format('YYYY-MM-DD')
          this.date2 = moment(arr[1]).add(1, 'days').format('YYYY-MM-DD')
        }
      }
    }
  }
</script>
