<template>
  <v-app>
      <router-view></router-view>
    </v-app>
   
    
</template>

<script>

const config = require('../config/firebase');
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
html {
  scroll-behavior: smooth;
}
*{
   margin:0;
   padding:0;

}
</style>
