<template>
  <canvas></canvas>
</template>

<script>
  export default {
    props: {
      size: Number,
      value: String,
    },
    data() {
      return {
        qrcode: null
      }
    },
    async mounted() {
      const QRious = await System.import(/* webpackChunkName: "QRious" */ 'qrious')

      this.qrcode = new QRious({
        element: this.$el,
        //background: '#000',
        //backgroundAlpha: 0.8,
        //foreground: '#fff',
        //foregroundAlpha: 0.8,
        level: 'H',
        padding: 26,
        size: this.size,
        value: this.value || ''
      })
    },
    methods: {
      toDataURL(type) {
        return this.$el.toDataURL(type || "image/png")
      }
    },
    watch: {
      value(val) {
        if (val && this.qrcode) {
          this.qrcode.value = val
        }
      },
      size(val) {
        if (val > 0) {
          this.qrcode.size = val
        }
      }
    }
  }
</script>
