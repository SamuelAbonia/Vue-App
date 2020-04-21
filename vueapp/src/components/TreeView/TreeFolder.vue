<template>
<div class="treeFolder">
  <v-card
    class="mx-auto"
  >
    <v-list-item>
      <v-list-item-avatar color="grey"><v-icon>mdi-face</v-icon></v-list-item-avatar>
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
        @click="dialog = true"
      >
        Responder
      </v-btn>
      <v-btn
        text
        color="deep-purple accent-4"
        @click="edit()"
      >
        Editar
      </v-btn>
      <v-btn
        text
        color="deep-purple accent-4"
        @click="deleteItem()"
      >
        eliminar
      </v-btn>
    </v-card-actions>
  </v-card>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle}}</span>
        </v-card-title>
        <v-card-subtitle>En respuesta a : {{message.user}} - {{message.date}}</v-card-subtitle>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                  <v-textarea
                  outlined
                  name="input-7-4"
                  label="Descripción"
                  required
                  v-model="editItem.content"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="save()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
  <treeFolderContent :children="message.children"></treeFolderContent>
</div>
</template>

<script>
//import treeFolderContent from './TreeFolderContent'
const config = require("../../../config/firebase");
export default {
    name:"treeFolder",
    data(){
        return{
          
            editedIndex: -1,
            dialog:false,
            editItem: {
                id:"",
                content: "",
                forum: "",
                date: "",
                parentMessage: "",
                user:"",
                children:[],
            },
            defaultItem: {
               id:"",
                content: "",
                forum: "",
                date: "",
                parentMessage: "",
                user:"",
                children:[],
            }

        }
    },
    created(){
      this.getUserOfForum();
    },
    computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nueva Respuesta" : "Editar Respuesta";
    }
  },
    props:[
        'message'
    ],
    components:{
        treeFolderContent :() => import('./TreeFolderContent.vue')
    },

    watch: {
    dialog(val) {
      val || this.close();
    }
  },
  methods:{

     async getUserOfForum() {
        let message = this.message

        await config.db
        .collection("usuarios")
        .doc(message.user)
        .get()
        .then(query => {
          let user = query.data();
          this.message.user = user.nombre +" "+user.apellido
     
        });
        
      
    },

    async save() {
      if (this.editedIndex > -1) {
        this.updateMessage(this.editedItem);
      } else {
        this.saveMessage(this.editedItem);
        
      }
      this.close();
      //location.reload();
    },
    async saveMessage(message) {

      let newMessage ={
          contenido: message.content,
          fecha: new Date,
          foro: this.message.forum,
          mensaje_padre:this.parentMessages,
          usuario: this.$store.person.id,
          children:[]
        };
        let idDoc="";
       await config.db.collection("mensajes")
        .add(newMessage)
        .then(function(docRef) {
          idDoc=docRef.id,
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });


        var currentMessage = await config.db
        .collection("mensajes")
        .doc(this.message.id);

        currentMessage.update({
          children: config.db.FieldValue.arrayUnion(idDoc+"")
        })
       
    },

     updateMessage(message) {

      let UpdateMessage = {
          contenido: message.firstName,
          

        };

        config.db.collection("usuarios")
        .doc(message.id)
        .update(UpdateMessage)
        .then(function() {
          console.log("Document successfully updated!");
        })
        .catch(function(error) {
          console.error("Error updating document: ", error);
        });
       
    },

     edit() {
      this.editedIndex = 1;
      this.editedItem = Object.assign({}, this.message);
      this.dialog = true;
    },  

    deleteItem() {
      let messagesRelated = this.message.children.lenght;
      if(messagesRelated==0){
      confirm("¿Esta seguro que desea eliminar esta respuesta?") &&
        this.deleteMessage(this.message)
      }
      else{
        confirm("No es posible eliminar el usuario al tener mensajes relacionados")
      }
      // location.reload();
    },

    async deleteMessage(message) {
      await config.db
        .collection("usuarios")
        .doc(message.id)
        .delete()
        .then(function() {
          alert("Document successfully deleted!");
        })
        .catch(function(error) {
          console.error("Error removing document: ", error);
        });
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },


  }
}
</script>

<style>
.treeFolder{
    width: 100%;
    margin-top: 18px;
    
}
</style>