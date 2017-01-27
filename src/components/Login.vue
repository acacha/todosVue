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
import todosVue from '../todosVue'
import auth from '../services/auth'
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
    login: function () {
      query = {
        client_id: todosVue.OAUTH_CLIENT_ID,
        redirect_uri: todosVue.OAUTH_REDIRECT_URI,
        response_type: 'token',
        scope: ''
      }
      var query = window.querystring.stringify(query)
      window.location.replace(todosVue.OAUTH_SERVER_URL + query)
    },
    initLogout: function () {
      this.openDialog('sureToLogout')
    },
    openDialog: function (ref) {
      this.$refs[ref].open()
    },
    logout: function () {
      window.localStorage.removeItem(todosVue.STORAGE_TOKEN_KEY)
      this.authorized = false
    },
    onCloseSureToLogout: function (type) {
      if (type === 'ok') this.logout()
    }
  },
  created () {
    if (document.location.hash) var token = this.extractToken(document.location.hash)
    if (token) auth.saveToken(token)
    if (this.token == null) this.token = auth.getToken()
    if (this.token) {
      this.authorized = true
      this.$http.defaults.headers.common['Authorization'] = auth.getAuthHeader()
    } else {
      this.authorized = false
      this.$http.defaults.headers.common['Authorization'] = ''
    }
  }
}
</script>