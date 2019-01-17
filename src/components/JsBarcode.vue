<template>
  <img />
</template>

<script>
  export default {
    props: {
      value: String,
      config: {
        type: Object,
        default() {
          return {
            /*format:"EAN13",*/
            format: "CODE128",
            height: 90,
            displayValue: false,
            /*fontSize: 20,
            fontOptions: "bold"*/
          }
        }
      }
    },
    mounted() {
      this.render()
      this.$watch('value', this.render)
    },
    methods: {
      async render() {
        const JsBarcode = await System.import(/* webpackChunkName: "JsBarcode" */ 'jsbarcode')
        JsBarcode(this.$el, this.value || '', this.config)
      }
    }
  }
</script>

<style scoped>

</style>