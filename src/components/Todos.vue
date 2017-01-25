<template>
    <div>
        <div v-show="!authorized">
            <md-button class="md-raised md-primary" @click="connect">Connect</md-button>
        </div>
        <div v-show="authorized">
            <md-button class="md-raised md-primary" @click="initLogout">Logout</md-button>
        </div>
        <md-table-card>
            <md-toolbar>
                <h1 class="md-title">Todos</h1>
                <md-button class="md-icon-button">
                    <md-icon>filter_list</md-icon>
                </md-button>

                <md-button class="md-icon-button">
                    <md-icon>search</md-icon>
                </md-button>
            </md-toolbar>

            <md-table md-sort="name" md-sort-type="desc">
                <md-table-header>
                    <md-table-row>
                        <md-table-head md-sort-by="name">Name</md-table-head>
                        <md-table-head md-sort-by="calories" md-numeric md-tooltip="The total amount of food energy and the given serving size">Priority</md-table-head>
                        <md-table-head md-sort-by="fat" md-numeric>Done</md-table-head>
                    </md-table-row>
                </md-table-header>

                <md-spinner :md-size="150" md-indeterminate  class="md-accent" v-show="connecting" ></md-spinner>

                <md-table-body>
                    <md-table-row v-for="(todo, index) in todos" md-auto-select md-selection>
                        <md-table-cell>{{ index +1 }} {{ todo.name }}</md-table-cell>
                        <md-table-cell>{{ todo.priority }}</md-table-cell>
                        <md-table-cell>{{ todo.done }}</md-table-cell>
                    </md-table-row>
                </md-table-body>

            </md-table>

            <md-table-pagination
                    :md-size=perPage
                    :md-total=total
                    :md-page=page
                    md-label="Rows"
                    md-separator="of"
                    :md-page-options="[5, 15, 25, 50]"
                    @pagination="onPagination"></md-table-pagination>

        </md-table-card>

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
      token: null,
      connecting: false,
      total: 0,
      perPage: 0,
      page: 0
    }
  },
  created () {
    if (document.location.hash) var token = this.extractToken(document.location.hash)
    if (token) this.saveToken(token)
    if (this.token == null) this.token = this.fetchToken()
    if (this.token) {
      this.authorized = true
      this.connecting = true
      var that = this
      setTimeout(function () {
        that.fetchData()
        that.connecting = false
      }, 500)
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
        console.log(response.data)
        console.log(typeof response.data.total)
        this.total = response.data.total
        this.perPage = response.data.per_page
        this.page = response.data.current_page
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
    },
    onPagination: function () {
      console.log('pagination todo!')
    }
  }
}
</script>