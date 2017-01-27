<template>
    <md-card md-with-hover>
        <md-card-header>
            <md-avatar>
                <img :src="avatar" alt="Sergi Tur badenas">
            </md-avatar>

            <div class="md-title">{{ id }} {{ name }}</div>
            <div class="md-subhead">{{ email}}</div>
        </md-card-header>

        <md-card-content>
            <md-spinner :md-size="150" md-indeterminate  class="md-accent" v-show="connecting" ></md-spinner>
            <form novalidate @submit.stop.prevent="submit">
                <md-input-container>
                    <label>Name</label>
                    <md-input v-model="name" placeholder="Put your name here"></md-input>
                </md-input-container>

                <md-input-container>
                    <label>Email</label>
                    <md-input v-model="email" placeholder="Put your email here"></md-input>
                </md-input-container>

                <md-input-container>
                    <label>Created at</label>
                    <md-input v-model="createdAt" placeholder="Date here"></md-input>
                </md-input-container>

                <md-input-container>
                    <label>Updated at</label>
                    <md-input v-model="updatedAt" placeholder="Date here"></md-input>
                </md-input-container>
            </form>
        </md-card-content>

        <md-card-actions>
            <md-button>Edit</md-button>
            <md-button>Delete</md-button>
        </md-card-actions>
        <md-snackbar md-position="bottom center" ref="connectionError" md-duration="4000">
            <span>Connection error. Please reconnect using connect button!.</span>
        </md-snackbar>
    </md-card>
</template>
<style>
</style>
<script>
var API_PROFILE_URL = 'http://todos.dev:8080/api/v1/user'
var STORAGE_KEY = 'todosvue_token'

export default{
  data () {
    return {
      avatar: 'https://s.gravatar.com/avatar/046889f49471fd40d105eb76b9d83bf6?s=80',
      id: null,
      name: null,
      email: null,
      createdAt: null,
      updatedAt: null,
      connecting: true
    }
  },
  computed: {
    avatarHash: function () {
      return '046889f49471fd40d105eb76b9d83bf6'
    }
  },
  created () {
    console.log('Component profile created')
    this.fetchUserProfile()
  },
  methods: {
    fetchUserProfile: function () {
      this.$http.defaults.headers.common['Authorization'] = 'Bearer ' + window.localStorage.getItem(STORAGE_KEY)
      this.$http.get(API_PROFILE_URL).then((response) => {
        this.connecting = false
        console.log(response.data)
        this.id = response.data.id
        this.name = response.data.name
        this.email = response.data.email
        this.createdAt = response.data.created_at
        this.updatedAt = response.data.updated_at
      }, (response) => {
        this.connecting = false
        this.showConnectionError()
      })
    },
    showConnectionError () {
      this.$refs.connectionError.open()
    }
  }
}

</script>