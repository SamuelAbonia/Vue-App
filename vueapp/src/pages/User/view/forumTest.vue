<template>
  <div class="GeneralForumContent">
      <div class="serchForums">
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
      </div>
      <div class="forums">
          <v-row>
              <v-col v-for="forum in forums" :key="forum.title" >
                  <div class ="forum">
                        <v-card
                        class="mx-auto"
                        color="#0F4176"
                        dark
                        outlined
                        max-width="400"
                        
                    >
                        <v-card-title>
                        <span class="title font-weight-light">{{forum.title}}</span>
                        </v-card-title>

                        <v-card-text class="headline font-weight-bold">
                        {{forum.description}}
                        </v-card-text>

                        <v-card-actions>
                        <v-list-item class="grow">
                            <v-row
                            align="center"
                            justify="center"
                            >
                            <v-btn class="goForum" color="#0FB066">Ir al foro</v-btn>
                            </v-row>
                        </v-list-item>
                        </v-card-actions>
                    </v-card>
                  </div>
              </v-col>
          </v-row>
      </div>
  </div>
</template>

<script>
const config = require("../../../../config/firebase");

export default {
  data() {
    return {
      forums: [],
      topics: [],
      loading: false,
      search: null,
      select: null,
    };
  },
  mounted() {
    this.maxCharDescription();
    this.getTopics();
  },
  watch: {
      search (val) {
        val && val !== this.select && this.querySelections(val)
      },
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
    querySelections (v) {
        this.loading = true
        // Simulated ajax query
        setTimeout(() => {
          this.topics = this.topics.filter(e => {
            console.log(e);
            return (e.title+"" || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
          })
          this.loading = false
        }, 500)
    },
    getTopics() {
      config.db
        .collection("temas")
        .get()
        .then(query => {
          query.forEach(u => {
            let data = u.data();
            let topic = {
              description: data.descripcion+"",
              title: data.titulo+"",
            };
            this.topics.push(topic);
          });
        });
    },
  }
};

</script>

<style>
.GeneralForumContent {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.serchForums{
  width: 100%;
  margin-top: 15px;
}
.forums{
  width: 100%;
  margin-top: 15px;
}
.forum{
    height: 100px;
    text-align: center;
}

</style>