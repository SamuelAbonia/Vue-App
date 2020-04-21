<template>
  <div class="topicManagementContent">
    <v-data-table
      no-data-text="No hay temas por el momento"
      :headers="headers"
      :items="topics"
      sort-by="title"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Temas</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on">Nuevo tema</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.title"
                        :rules="titleRules"
                        label="Titulo"
                        outlined
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.description"
                        :rules="descriptionRules"
                        label="Descripcion"
                        outlined
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" text @click="close">Cancelar</v-btn>
                <v-btn color="blue darken-1" text @click="save">Guardar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
const config = require("../../../../config/firebase");
export default {
  name: "topicsManagement",
  data() {
    return {
      COLLECTION: "temas",
      dialog: false,
      topics: [],
      headers: [
        { text: "Titulo", align: "left", sortable: false, value: "title" },
        { text: "Descripción", value: "description" },
        { text: "Acciones", value: "action" }
      ],
      editedIndex: -1,
      editedItem: {
        id: "",
        title: "",
        description: ""
      },
      defaultItem: {
        id: "",
        title: "",
        description: ""
      },
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 8 || "Min 8 characters"
      },
      titleRules: [
        title => !!title || "El titulo es requerido",
        title =>
          title.length > 2 || "El titulo debe ser más largo a 3 caracteres"
      ],
      descriptionRules: [
        description => !!description || "El apellido es requerido",
        description =>
          description.length > 3 ||
          "El apellido debe ser más largo a 3 caracteres"
      ]
    };
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo tema" : "Editar tema";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {},

  mounted() {
    this.getTopics();
  },

  methods: {
    getTopics() {
      config.db
        .collection("temas")
        .get()
        .then(query => {
          query.forEach(u => {
            let data = u.data();
            let topic = {
              id: u.id,
              description: data.descripcion + "",
              title: data.titulo + ""
            };
            this.topics.push(topic);
          });
        });
    },
    editItem(item) {
      this.editedIndex = this.topics.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      config.db
        .collection(this.COLLECTION)
        .doc(item.id)
        .delete()
        .then(function() {
          console.log("Document successfully deleted!");
        })
        .catch(function(error) {
          console.error("Error removing document: ", error);
        });
``

    },
    close() {
      this.dialog = false;
      this.showPassword = false;
      this.showPassword = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.topics[this.editedIndex], this.editedItem);
        this.updateTopic(this.editedItem);
      } else {  
        this.saveTopic(this.editedItem);
        this.topics.push(this.editedItem);
      }
      this.close();
    },
    updateTopic(item) {
    console.log(item.id);
      var edited = config.db.collection(this.COLLECTION).doc(item.id);
      return edited
        .update({
          titulo: item.title,
          descripcion: item.description
        })
        .then(function() {
          console.log("Document successfully updated!");
        })
        .catch(function(error) {
          console.error("Error updating document: ", error);
        });
    },
    saveTopic(item) {
      config.db.collection(this.COLLECTION)
        .add({
          titulo: item.title,
          descripcion: item.description
        })
        .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    }
  }
};
</script>

<style>
.topicManagementContent {
  width: 100%;
  /* margin: 2px 15px; */
  margin-top: 15px;
  margin-left: 10px;
  margin-right: 10px;
}
</style>