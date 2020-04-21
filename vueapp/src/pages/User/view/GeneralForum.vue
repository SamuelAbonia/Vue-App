
<template>
<div class="generalForum">
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
      <v-col v-for="forum in forums" :key="forum.title" cols="6" md="2" xl="2" sm="2" lg="2">
        <v-card
         class="mx-auto"
         max-width="344"
         max-height="230px"
        color="#0F4176"
          dark
         
        >
          <v-card-title>
            <span class="title font-weight-light">{{forum.title}}</span>
          </v-card-title>

          <v-card-text class="headline font-weight-bold" >{{forum.description}}</v-card-text>

         
          <v-card-actions>
            <v-list-item class="grow">
              <v-btn class="goForum" color="#0FB066">Ir al foro</v-btn>
            </v-list-item>
          </v-card-actions>

        </v-card>
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
              title: data.titulo,
              id: u.id
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
.headline {
  text-align: center;
  padding: 16px;
  padding-bottom: 3px;
}

.generalForum{
  margin-left: 20px;
  margin-right: 20px;
}
.title {
  font-size: 3px;
  text-align: center;
  line-height: 3px;
  overflow-wrap: unset;
}
.v-card__subtitle,
.v-card__text,
.v-card__title {
  padding: 16px;
  padding-bottom: 3px;
}

.goForum {
  font-size: 2px;
}

</style>