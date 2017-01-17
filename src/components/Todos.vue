<template>
    <div>
        <ul>
            <li v-for="(todo, index) in todos"> {{ todo.name }}</li>
        </ul>
    </div>
</template>
<style>
</style>
<script>
export default{
  data () {
    return {
      todos: []
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData: function () {
      return this.fetchPage(1)
    },
    fetchPage: function (page) {
      this.$http.get('http://todos.dev:8080/api/v1/task?page=' + page).then((response) => {
        console.log(response.data)
        this.todos = response.data.data
      }, (response) => {
        console.log(response.data)
      })
    }
  }
}
</script>