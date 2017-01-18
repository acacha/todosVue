<template>
    <div>
        <div v-show="!authorized">
            <md-button class="md-raised md-primary" @click="connect">Connect</md-button>
        </div>
        <div v-show="authorized">
            <md-button class="md-raised md-primary" @click="logout">Logout</md-button>
        </div>
        <ul v-show="authorized">
            <li v-for="(todo, index) in todos">
                {{ todo.name }}
            </li>
        </ul>
    </div>

</template>
<style>
</style>
<script>
var STORAGE_KEY = 'todosvue_token'
var AUTH_CLIENT_ID = 5
var AUTH_REDIRECT_URI = 'http://localhost:8095/todos'

export default{
  data () {
    return {
      todos: [],
      authorized: false
    }
  },
  created () {
    var token = this.extractToken(document.location.hash)
    if (token) this.saveToken(token)
    if (this.fetchToken()) {
      this.authorized = true
    } else {
      this.authorized = false
    }
    this.fetchData()
  },
  methods: {
    fetchData: function () {
      return this.fetchPage(1)
    },
    fetchPage: function (page) {
      var token = this.fetchToken()
      console.log('TOKEN: ' + token)
      if (token != null) {
        this.$http.defaults.headers.common['Authorization'] = 'Bearer ' + token
        console.log('HEY TOKEN: ' + token)
      }
      this.$http.get('http://todos.dev:8080/api/v1/task?page=' + page).then((response) => {
        console.log(response.data)
        this.todos = response.data.data
      }, (response) => {
        console.log(response.data)
      })
    },
    extractToken: function (hash) {
      var match = hash.match(/access_token=(\w+)/)
      return !!match && match[1]
    },
    logout: function () {
      window.localStorage.removeItem(STORAGE_KEY)
      this.authorized = false
    },
    connect: function () {
      query = {
        client_id: AUTH_CLIENT_ID,
        redirect_uri: AUTH_REDIRECT_URI,
        response_type: 'token',
        scope: ''
      }
      var query = window.querystring.stringify(query)
      window.location.replace('http://todos.dev:8080/oauth/authorize?' + query)
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