<template>
  <el-autocomplete v-model="state"
                   :disabled="disabled"
                   popper-class="my-autocomplete"
                   :fetch-suggestions="query"
                   placeholder="输入关键字查询"
                   @select="handleSelect">
    <template slot-scope="props">
      <div class="name">{{ props.item.name }}</div>
      <span class="addr">{{ props.item.name }}</span>
      <span class="addr">{{ props.item.name }}</span>
    </template>
  </el-autocomplete>
</template>

<script>
  // import axios from 'axios'
  import * as Rx from 'rxjs'

  const ALL_ARR = [
    { id: 1, name: 'name1' },
    { id: 2, name: 'name2' },
    { id: 3, name: 'name3' },
  ]

  async function loadData(data) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(ALL_ARR)
      }, 1e3)
    })
  }

  export default {
    props: {
      value: String,
      disabled: {
        type: Boolean,
        default: false,
      }
    },
    data() {
      return {
        state: null
      }
    },
    created() {
      this.$sub = new Rx.Subject()

      const source = this.$sub.debounceTime(1000).distinctUntilChanged()

      source.subscribe(async ({ q, cb }) => {
        const list = await loadData({ q })
        cb(list)
      })
    },
    methods: {
      async query(q, cb) {
        if (!q) {
          cb([])
          this.handleSelect(null)
          return
        }

        this.$sub.next({ q, cb })
      },
      handleSelect(item) {
        this.state = item.name
        this.$emit('input', item.id)
        this.$emit('change', item)
      }
    },
    beforeDestroy() {
      this.$sub.complete()
      this.$sub = null
    }
  }
</script>

<style>

</style>