<template>
    <div>
      CORDOVA Template
    </div>
</template>
<style>
</style>
<script>
  export default{
    created () {
      document.addEventListener('deviceready', this.onDeviceReady, false)
    },
    beforeDestroy () {
      document.removeEventListener('deviceready', this.onDeviceReady, false)
    },
    methods: {
      onDeviceReady () {
        console.log('XIVATO device Ready!')
      }
    }
  }
</script>