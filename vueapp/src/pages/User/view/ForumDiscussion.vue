<template>
  <div class="forumDiscussionContent">
    <div class="forum">
      <v-card class="mx-auto" outlined>
        <v-card-title>
          <v-icon large left>mdi-twitter</v-icon>
          <span class="title font-weight-light">{{forum.title}}</span>
        </v-card-title>

        <v-card-subtitle class="pb-0">
          <span>Creado por : {{forum.user}} - {{forum.date}}</span>
        </v-card-subtitle>

        <v-card-text class="text--primary">Descripción: {{forum.description}}</v-card-text>
        <v-card-actions>
          <v-btn color="purple" text @click="dialog = true">Responder</v-btn>
        </v-card-actions>
      </v-card>

      <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="600px">
          <v-card>
            <v-card-title>
              <span class="headline">{{forum.title}}</span>
            </v-card-title>
            <v-card-subtitle>En respuesta a : {{forum.user}} - {{forum.date}}</v-card-subtitle>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-textarea
                      outlined
                      name="input-7-4"
                      label="Descripción"
                      v-model="item.content"
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
    </div>

    <div class="forumDiscussion">
      <TreeView :messages="messagesOfForum" />
    </div>
  </div>
</template>

<script>
const config = require("../../../../config/firebase");

import TreeView from "../../../components/TreeView/TreeView";
export default {
  name: "forumDiscussion",
  data() {
    return {
      dialog: false,
      messagesOfForum: [],
      parentMessages: [],

      item: {
        id: "",
        content: "",
        forum: "",
        date: "",
        parentMessages: "",
        user: "",
        children: []
      }
    };
  },

  props: ["forum"],
  components: {
    TreeView
  },
  mounted() {
    this.getUserOfForum();
    this.getMessages();
  },
  created() {
   // this.getUserOfForum();
    //this.getMessages();
  },
  computed: {},
  methods: {
    async getUserOfForum() {
      let forum = this.forum;

      await config.db
        .collection("usuarios")
        .doc(forum.user)
        .get()
        .then(query => {
          let user = query.data();
          this.forum.user = user.nombre + " " + user.apellido;
        });
    },
    async getMessages() {
      let message = {
        id: "",
        content: "",
        date: "",
        forum: "",
        parent_message: "",
        user: "",
        children: []
      };

      await config.db
        .collection("mensajes")
        .where("foro", "==", this.forum.id + "")
        .get()
        .then(query => {
          query.forEach(u => {
            let data = u.data();
            message = {
              content: data.contenido,
              date: data.fecha,
              forum: data.foro,
              parent_message: data.mensaje_padre,
              user: data.usuario,
              id: u.id,
              children: data.children
            };
            this.messagesOfForum.push(message);
          });
        });
      this.getParentsMessages();
    },

    async getParentsMessages() {
      for (var i = 0; i < this.messagesOfForum.length; i++) {
        let message = this.messagesOfForum[i];
        let childrenOfMessage = [];
        childrenOfMessage = message.children;
        for (var j = 0; j < childrenOfMessage.length; j++) {
          let child = childrenOfMessage[j];
          let messageChild = this.messagesOfForum.find(
            element => element.id == child
          );
          message.children[j] = messageChild;
        }
      }
    },
    async save() {
      console.log("usuario");
      console.log("usuario" + this.$store.state.person.id);
      let newMessage = {
        contenido: this.item.content,
        fecha: new Date(),
        foro: this.forum.id,
        mensaje_padre: "",
        usuario: this.$store.state.person.id,
        children: []
      };

      await config.db
        .collection("mensajes")
        .add(newMessage)
        .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });

      this.close();
      this.$router.push({name:"generalForum"});
    },

    close() {
      this.item.content = "";
      this.dialog = false;
      this.getMessages();
    }
  }
};
</script>

<style>
.forumDiscussionContent {
  width: 100%;
}
.forum {
  margin-top: 15px;
  margin-left: 10px;
  width: 98%;
  height: 30%;
}
.forumDiscussion {
  margin-top: 15px;
  margin-left: 80px;
  width: 90%;
}
</style>