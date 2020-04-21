<template>
    <div class="userContent"> 
       <navBar :items="items"></navBar>
      <router-view></router-view>

  </div>
</template>
<script>
import navBar from './../../components/NavBar/navBar';

export default {
    name: 'user',
  data(){
    return{
      items:[
                {title: "Foros", icon: "mdi-message-text-outline", link:'generalForum'},
            ]
     
    }
  },  
  components: {
    navBar,
  },
}
</script>
<style>
 .userContent {
  width: 100%;
  height: 100%;
}

</style>