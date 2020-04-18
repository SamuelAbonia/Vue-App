<template>
  <div id="app">
    <navBar></navBar>
    <img alt="Vue logo" src="./assets/logo.png">
    <ul v-for="usuario in usuarios" :key="usuario.name">
      <li>{{usuario.name}}</li>
    </ul>
    
    <v-btn @click="listUsers">Listar</v-btn>
  </div>
</template>

<script>

const config = require('../config/firebase');
import navBar from './components/navBar';

export default {
  name: 'App',
  data(){
    return{
      usuarios:[],
    }
  },
  created(){
   

  },
  
  components: {
    navBar
  },

  methods:{
    listUsers(){
       let usuario={
      name:"",
      lastName:"",
      email:"",
      password:"",
      active:"",
    }
    config.usuarios.get().then( query => {query.forEach( u => {
      let data = u.data()
      usuario = {
        name:data.nombre,
        lastName:data.apellido,
        email:data.email,
        password:data.contraseña,
        active:data.activo,
      }
      this.usuarios.push(usuario)

    })})

    

    console.log(this.usuarios)  
    }
  }
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
