<template>
  <el-container>
    <el-header :height="height">
      <NavHeader ref="NavHeader"></NavHeader>
    </el-header>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<script>
  import NavHeader from '@/components/NavHeader'
  import { Observable } from 'rxjs'

  export default {
    name: 'Home',
    components: {
      NavHeader
    },
    data() {
      return {
        height: null
      }
    },
    mounted() {
      const source = Observable
        .merge(Observable.fromEvent(window, 'resize'), Observable.interval(100))
        .map(() => this.$refs.NavHeader.$el.clientHeight)
        .distinctUntilChanged()

      this.$subscribeTo(source, this.ready)

      this.$nextTick(() => {
        this.ready(this.$refs.NavHeader.$el.clientHeight)
      })
    },
    methods: {
      ready(h) {
        this.height = h + 'px'
      }
    }
  }
</script>
