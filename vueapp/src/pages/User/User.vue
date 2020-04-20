<template>
    <div class="userContent"> 
       <navBar></navBar>
      <router-view></router-view>

  </div>
</template>
<script>
import navBar from './../../components/NavBar/navBar';

export default {
    name: 'user',
  data(){
    return{
     
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