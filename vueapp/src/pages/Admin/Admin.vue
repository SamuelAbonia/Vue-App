<template>
  <div class="adminContent"> 
    <navBar :items="items"></navBar>
      <router-view></router-view>

  </div>
</template>

<script>
import navBar from './../../components/NavBar/navBar';

export default {
    name: 'Admin',
  data(){
    return{

      items:[
                {title: "Gestión usuarios", icon: "mdi-account-multiple", link:'userManagement'},
                {title:"Gestión de temas", icon:"mdi-file-document", link:'topicManagement'},
                
            ]
     
    }
  },  
  components: {
    navBar,
  },
}
</script>


<style>
  .adminContent {
  width: 100%;
  height: 100%;
}
</style>