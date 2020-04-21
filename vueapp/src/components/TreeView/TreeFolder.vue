<template>
<div class="treeFolder">
  <v-card
    class="mx-auto"
  >
    <v-list-item>
      <v-list-item-avatar color="grey"></v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="headline">{{this.message.user}}</v-list-item-title>
        <v-list-item-subtitle>{{this.message.date}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-card-text>
      {{this.message.content}}
    </v-card-text>

    <v-card-actions>
      <v-btn
        text
        color="deep-purple accent-4"
      >
        Responder
      </v-btn>
      <v-btn
        text
        color="deep-purple accent-4"
      >
        Editar
      </v-btn>
    </v-card-actions>
  </v-card>
  <treeFolderContent :children="message.children"></treeFolderContent>
</div>
</template>

<script>
//import treeFolderContent from './TreeFolderContent'
export default {
    name:"treeFolder",
    data(){
        return{

        }
    },
    props:[
        'message'
    ],
    components:{
        treeFolderContent :() => import('./TreeFolderContent.vue')
    }
}
</script>

<style>
.treeFolder{
    width: 100%;
    margin-top: 18px;
    
}
</style>