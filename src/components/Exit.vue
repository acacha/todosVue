<template></template>
<style>
</style>
<script>
  export default{
    created () {
      document.addEventListener('deviceready', this.onDeviceReady, false)
    },
    methods: {
      onDeviceReady () {
        navigator.notification.confirm(
          'Do you want to quit',
          this.onConfirmQuit,
          'QUIT TITLE',
          'OK,Cancel'
        )
      },
      onConfirmQuit (button) {
        if (button === '1') {
          navigator.app.exitApp()
        }
      }
    }
  }
</script>