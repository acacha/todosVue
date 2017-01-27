<template>
    <md-card>
        <md-card-header>
            <div class="md-title">Login</div>
        </md-card-header>
        <md-card-content>
            <md-button class="md-raised md-primary" @click="login" v-show="!authorized">Login</md-button>
            <md-button class="md-raised md-primary" @click="initLogout" v-show="authorized">Logout</md-button>
        </md-card-content>

        <md-dialog-confirm
                md-title="Logout"
                md-content="Are you sure you want to logout?"
                md-ok-text="Ok"
                md-cancel-text="Cancel"
                @close="onCloseSureToLogout"
                ref="sureToLogout">
        </md-dialog-confirm>
    </md-card>
</template>
<style>
</style>
<script>
var STORAGE_KEY = 'todosvue_token'
var AUTH_CLIENT_ID = 5
var AUTH_REDIRECT_URI = 'http://localhost:8095/login'
var OAUTH_SERVER_URL = 'http://todos.dev:8080/oauth/authorize?'

export default{
  data () {
    return {
      authorized: false
    }
  },
  methods: {
    extractToken: function (hash) {
      return hash.match(/#(?:access_token)=([\S\s]*?)&/)[1]
    },
    saveToken: function (token) {
      window.localStorage.setItem(STORAGE_KEY, token)
    },
    fetchToken: function () {
      return window.localStorage.getItem(STORAGE_KEY)
    },
    login: function () {
      query = {
        client_id: AUTH_CLIENT_ID,
        redirect_uri: AUTH_REDIRECT_URI,
        response_type: 'token',
        scope: ''
      }
      var query = window.querystring.stringify(query)
      window.location.replace(OAUTH_SERVER_URL + query)
    },
    initLogout: function () {
      this.openDialog('sureToLogout')
    },
    openDialog: function (ref) {
      this.$refs[ref].open()
    },
    logout: function () {
      window.localStorage.removeItem(STORAGE_KEY)
      this.authorized = false
    },
    onCloseSureToLogout: function (type) {
      if (type === 'ok') this.logout()
    }
  },
  created () {
    if (document.location.hash) var token = this.extractToken(document.location.hash)
    if (token) this.saveToken(token)
    if (this.token == null) this.token = this.fetchToken()
    if (this.token) {
      this.authorized = true
    } else {
      this.authorized = false
    }
  }
}
</script>