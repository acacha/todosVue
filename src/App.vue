<template>
  <div class="phone-viewport">
      <md-toolbar>
        <md-button class="md-icon-button" @click="toggleLeftSidenav">
          <md-icon>menu</md-icon>
        </md-button>

        <h2 class="md-title">Todos</h2>
      </md-toolbar>

      <md-sidenav class="md-left" ref="leftSidenav" @open="open('Left')" @close="close('Left')" md-swipeable>
        <md-toolbar class="md-large">
          <div class="md-toolbar-container">
            <h3 class="md-title">Todos</h3>
          </div>
        </md-toolbar>

        <md-list>
          <md-list-item @click="toggleLeftSidenav">
            <md-icon>move_to_inbox</md-icon>
            <router-link exact to="/todos">Todos</router-link>
          </md-list-item>

          <md-list-item @click="toggleLeftSidenav">
            <md-icon>send</md-icon>
            <router-link exact  to="/tokens" >Tokens</router-link>
          </md-list-item>

          <md-list-item @click="toggleLeftSidenav">
            <md-icon>profile</md-icon>
            <router-link exact  to="/Profile" >Profile</router-link>
          </md-list-item>

          <md-list-item @click="toggleLeftSidenav">
            <router-link exact  to="/device" >Device</router-link>
          </md-list-item>

          <md-list-item @click="toggleLeftSidenav">
            <router-link exact  to="/Contacts" >Contactes</router-link>
          </md-list-item>

          <md-list-item @click="toggleLeftSidenav">
            <router-link exact  to="/cordova" >Cordova</router-link>
          </md-list-item>

          <md-list-item @click="toggleLeftSidenav">
            <md-icon>profile</md-icon>
            <router-link exact  to="/notifications" >Notifications</router-link>
          </md-list-item>

          <md-list-item @click="toggleLeftSidenav">
            <md-icon>profile</md-icon>
            <router-link exact  to="/login" >Login/Logout</router-link>
          </md-list-item>

          <md-list-item @click="toggleLeftSidenav">
            <md-icon>exit</md-icon>
            <router-link exact  to="/exit" >Exit</router-link>
          </md-list-item>

          <md-list-item @click="toggleLeftSidenav">
            <md-avatar>
              <img src="https://placeimg.com/40/40/people/5" alt="People">
            </md-avatar>

            <span>Contact example</span>

            <md-button class="md-icon-button md-list-action">
              <md-icon class="md-primary">chat_bubble</md-icon>
            </md-button>
          </md-list-item>


        </md-list>

      </md-sidenav>

    <transition name="bounce"
                enter-active-class="animated bounceIn"
                leave-active-class="animated bounceOut">
      <router-view></router-view>
    </transition>


  </div>
</template>

<script>
import notifications from './services/notifications'

export default {
  name: 'app',
  created () {
    console.log(window.location.href)
    document.addEventListener('deviceready', this.onDeviceReady, false)
  },
  methods: {
    onDeviceReady () {
      console.log('Working on platform: ' + window.device.platform)
      notifications.enable()
    },
    toggleLeftSidenav () {
      this.$refs.leftSidenav.toggle()
    },
    open (ref) {
      // console.log('Opened: ' + ref)
    },
    close (ref) {
      // console.log('Closed: ' + ref)
    }
  }
}
</script>

<style>
a {
  color: inherit;
  text-decoration: none;
}
</style>
