<template>
  <div class="div-top">
    <v-app-bar color="#0FB066" dense dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Foros web</v-toolbar-title>

      <v-spacer></v-spacer>

      <p class="name">{{name}}</p>

      <v-menu bottom left>
        <template v-slot:activator="{ on }">
          <v-btn icon color="yellow" v-on="on">
            <v-list-item-avatar>
              <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
            </v-list-item-avatar>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="(item, i) in items" :key="i">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data: () => ({
    name: "Samuel Abonia",
    items: [
      { title: "Click Me" },
      { title: "Click Me" },
      { title: "Click Me" },
      { title: "Click Me 2" }
    ]
  })
};
</script>

<style>
.name {
  font-weight: bold;
  margin-right: 4px;
}
.div-top {
  margin-top: 0px;
  background-color: black;
}
</style>