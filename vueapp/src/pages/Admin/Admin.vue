<template>
  <div class="adminContent"> 
      <router-view></router-view>

  </div>
</template>

<script>
export default {
    name:'Admin', 
    data: function(){
        return{

        }
    },
    components:{

    },

}
</script>

<style>
  .adminContent {
  width: 100%;
  height: 100%;
  display: flex;
}
</style>