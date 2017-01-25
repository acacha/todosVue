<template>
    <div>
        <div v-show="!authorized">
            <md-button class="md-raised md-primary" @click="connect">Connect</md-button>
        </div>
        <div v-show="authorized">
            <md-button class="md-raised md-primary" @click="initLogout">Logout</md-button>
        </div>
        <ul v-show="authorized">
            <li v-for="(todo, index) in todos">
                {{ todo.name }}
            </li>
        </ul>

        <md-snackbar md-position="bottom center" ref="connectionError" md-duration="4000">
            <span>Connection error. Please reconnect using connect button!.</span>
        </md-snackbar>

        <md-dialog-confirm
                md-title="Logout"
                md-content="Are you sure you want to logout?"
                md-ok-text="Ok"
                md-cancel-text="Cancel"
                @close="onCloseSureToLogout"
                ref="sureToLogout">
        </md-dialog-confirm>
    </div>
</template>
<style>
</style>
<script>
var STORAGE_KEY = 'todosvue_token'
var AUTH_CLIENT_ID = 5
var AUTH_REDIRECT_URI = 'http://localhost:8095/todos'
var API_URL = 'http://todos.dev:8080/api/v1/task'
var OAUTH_SERVER_URL = 'http://todos.dev:8080/oauth/authorize?'

export default{
  data () {
    return {
      todos: [],
      authorized: false,
      token: null
    }
  },
  created () {
    if (document.location.hash) var token = this.extractToken(document.location.hash)
    if (token) this.saveToken(token)
    if (this.token == null) this.token = this.fetchToken()
    if (this.token) {
      this.authorized = true
      this.fetchData()
    } else {
      this.authorized = false
    }
  },
  methods: {
    fetchData: function () {
      return this.fetchPage(1)
    },
    fetchPage: function (page) {
      this.$http.defaults.headers.common['Authorization'] = 'Bearer ' + this.token
      // TODO: https://laracasts.com/discuss/channels/laravel/laravel-53-passport-cross-domain-error
      // https://medium.com/@mshanak/solved-laravel-5-3-passport-with-cors-2c6667ef058b#.dbc3c9mcq

      this.$http.get(API_URL + '?page=' + page).then((response) => {
        this.todos = response.data.data
      }, (response) => {
        console.log('ERROR DATA: ' + response.data)
        this.showConnectionError()
        this.authorized = false
      })
    },
    extractToken: function (hash) {
      return hash.match(/#(?:access_token)=([\S\s]*?)&/)[1]
    },
    showConnectionError () {
      this.$refs.connectionError.open()
    },
    initLogout: function () {
      this.openDialog('sureToLogout')
    },
    logout: function () {
      window.localStorage.removeItem(STORAGE_KEY)
      this.authorized = false
    },
    openDialog: function (ref) {
      this.$refs[ref].open()
    },
    onCloseSureToLogout: function (type) {
      console.log(typeof type)
      if (type === 'ok') this.logout()
    },
    connect: function () {
      query = {
        client_id: AUTH_CLIENT_ID,
        redirect_uri: AUTH_REDIRECT_URI,
        response_type: 'token',
        scope: ''
      }
      var query = window.querystring.stringify(query)
      window.location.replace(OAUTH_SERVER_URL + query)
    },
    fetchToken: function () {
      return window.localStorage.getItem(STORAGE_KEY)
    },
    saveToken: function (token) {
      window.localStorage.setItem(STORAGE_KEY, token)
    }
  }
}
</script>