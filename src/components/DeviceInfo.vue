<template>
    <div>
        <form novalidate>
            <md-input-container>
                <label>Cordova</label>
                <md-input v-model="cordova"></md-input>
            </md-input-container>

            <md-input-container>
                <label>Model</label>
                <md-input v-model="model"></md-input>
            </md-input-container>

            <md-input-container>
                <label>Platform</label>
                <md-input v-model="platform"></md-input>
            </md-input-container>

            <md-input-container>
                <label>Uuid</label>
                <md-input v-model="uuid"></md-input>
            </md-input-container>

            <md-input-container>
                <label>Version</label>
                <md-input v-model="version"></md-input>
            </md-input-container>

            <md-input-container>
                <label>isVirtual</label>
                <md-input v-model="isVirtual"></md-input>
            </md-input-container>

            <md-input-container>
                <label>serial</label>
                <md-input v-model="serial"></md-input>
            </md-input-container>
        </form>
    </div>
</template>
<style>
</style>
<script>
  export default{
    data () {
      return {
        cordova: '',
        model: '',
        platform: '',
        uuid: '',
        version: '',
        manufacturer: '',
        isVirtual: '',
        serial: ''
      }
    },
    created () {
      document.addEventListener('deviceready', this.onDeviceReady, false)
    },
    beforeDestroy () {
      document.removeEventListener('deviceready', this.onBeforeDestroy, false)
    },
    methods: {
      onDeviceReady () {
        console.log('onDeviceReady')
        console.log(window.device)
        console.log('Cordova: ' + window.device.cordova)
        console.log('Model: ' + window.device.model)
        console.log('Platform: ' + window.device.platform)
        console.log('Uuid: ' + window.device.uuid)
        console.log('Version: ' + window.device.version)
        console.log('Manufacturer: ' + window.device.manufacturer)
        console.log('IsVirtual: ' + window.device.isVirtual)
        console.log('Serial: ' + window.device.serial)
        this.cordova = window.device.cordova
        this.model = window.device.model
        this.platform = window.device.platform
        this.uuid = window.device.uuid
        this.version = window.device.version
        this.manufacturer = window.device.manufacturer
        this.isVirtual = window.device.isVirtual
        this.serial = window.device.serial
      },
      onBeforeDestroy () {
        console.log('Device onBeforeDestroy!')
      }
    }
  }
</script>