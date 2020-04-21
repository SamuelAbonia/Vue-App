<template>
  <div class="GeneralForumContent">
    <div class="serchForums">
      <v-row>
        <v-col xs="11" xl="11" sm="11" lg="11" md="11">
          <v-autocomplete
            v-model="select"
            :loading="loading"
            :items="topics.title"
            :search-input.sync="search"
            cache-items
            class="mx-4"
            flat
            hide-no-data
            hide-details
            label="Busca un tema"
            solo-inverted
          ></v-autocomplete>
        </v-col>
        <v-col>
          <v-btn class="mx-2 add" fab dark color="#0FB066" @click="dialog=true">
            <v-icon dark>mdi-plus</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </div>

    <div class="forums">
      <v-row>
        <v-col v-for="forum in forums" :key="forum.title" md="3" lg="3" sm="3" xl="3" xs="3">
          <div class="forum">
            <v-card class="mx-auto" color="#0F4176" dark outlined max-width="400">
              <v-card-title>
                <span class="title font-weight-light">{{forum.title}}</span>
              </v-card-title>
               <v-card-text class="headline font-weight-bold" >{{forum.description}}</v-card-text>
                        <v-card-actions>
                        <v-list-item class="grow">
                            <v-row
                            align="center"
                            justify="center"
                            >
                            <v-btn class="goForum" color="#0FB066"
                            :to="{name:'forumDiscussion', params:{
                            forum:forum,
                            }}"
                            >
                              Ir al foro</v-btn>
                            </v-row>
                        </v-list-item>
                        </v-card-actions>
                    </v-card>
                  </div>
        </v-col>
      </v-row>
    </div>
    
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Añadir Foro</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-text-field v-model="forum.title" label="Titulo" outlined required></v-text-field>
              </v-col>
              <v-col>
                <v-combobox
                  v-model="forum.topic"
                  :items="topics"
                  item-text="title"
                  item-value="topic.id"
                  label="Tema"
                  chips
                ></v-combobox>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-textarea
                  outlined
                  name="input-7-4"
                  label="Descripción"
                  v-model="forum.description"
                ></v-textarea>
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
  </div>
</template>

<script>
const config = require("../../../../config/firebase");

export default {
  data() {
    return {
      forum: { topic: "", title: "", description: "" },
      forums: [],
      topics: [],
      loading: false,
      search: null,
      select: null,
      dialog: false,
      topicSelected: []
    };
  },
  mounted() {
    this.maxCharDescription();
    this.getTopics();
  },
  watch: {
    search(val) {
      val && val !== this.select && this.querySelections(val);
    }
  },
  methods: {
    getForums() {
      config.db
        .collection("foros")
        .get()
        .then(query => {
          query.forEach(u => {
            let data = u.data();

            let forum = {
              id: u.id,
              user: data.usuario,
              description: data.descripcion,
              topic: data.tema,
              date: data.fecha,
              title: data.titulo
            };
            const descripcion = forum.description + "";
            forum.description = descripcion.substring(0, 100) + " ...";
            this.forums.push(forum);
          });
        });
    },
    maxCharDescription() {
      this.getForums();
    },
    querySelections(v) {
      this.loading = true;
      // Simulated ajax query
      setTimeout(() => {
        this.topics = this.topics.filter(e => {
          console.log(e);
          return (
            (e.title + "" || "")
              .toLowerCase()
              .indexOf((v || "").toLowerCase()) > -1
          );
        });
        this.loading = false;
      }, 500);
    },
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
    save() {
      this.forum.topic = this.forum.topic.id;
      config.db
        .collection("foros")
        .add({
          titulo: this.forum.title,
          descripcion: this.forum.description,
          tema: this.forum.topic,
          usuario: this.$store.state.person.id,
          fecha: new Date
        
        })
        .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
        this.close();
    },

    close(){
      this.forum.title = "";
      this.forum.topic= "";
      this.forum.description= "";
      this.dialog = false;
    }

  }
};
</script>

<style>
.title {
  font-size: 1px;
}

.headline {
  font-size: 14px;
}

.GeneralForumContent {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.serchForums {
  width: 100%;
  margin-top: 15px;
}
.forums {
  width: 100%;
  margin-top: 15px;
}
.forum {
  height: 100px;
  text-align: center;
}
.add {
  display: scroll;
  position: fixed;
  z-index: 100;
  right: 0px;
}
</style>