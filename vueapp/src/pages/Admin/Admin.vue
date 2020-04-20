<template>
  <div class="adminContent"> 
    <navBar></navBar>
      <router-view></router-view>

  </div>
</template>

<script>
import navBar from './../../components/NavBar/navBar';

export default {
    name: 'Admin',
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
  .adminContent {
  width: 100%;
  height: 100%;
}
</style>