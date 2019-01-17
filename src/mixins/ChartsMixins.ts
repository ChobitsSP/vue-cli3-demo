import echarts from 'echarts'
import { Observable } from 'rxjs'

export default {
  methods: {
    InitCharts() {
      this.$chart = echarts.init(this.$refs.charts)
      const source = Observable.fromEvent(window, 'resize').debounceTime(100)
      this.$subscribeTo(source, e => { this.$chart.resize() })
      return this.$chart
    }
  },
  beforeDestroy() {
    this.$chart && this.$chart.dispose()
  }
}