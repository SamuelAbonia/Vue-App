<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <div v-for="item in usuarios" :key="item.nombre">{{item}}</div>
  </div>
</template>

<script>

import {db} from '../config/firebase';

export default {
  name: 'App',
  firebase: {
    usuarios: db.ref('usuarios')
  },
  components: {
    
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
