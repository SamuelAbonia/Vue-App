<template>
  <div class="div-top">
    <v-app-bar color="#0FB066" dense dark>
      

      <v-toolbar-title>Foros web</v-toolbar-title>

      <v-spacer></v-spacer>

      <div class ="userInfo">
      <p class="name">{{name}}</p>
      <v-menu bottom left>
        <template v-slot:activator="{ on }">
          <v-btn class="logo" icon color="yellow" v-on="on">
            <v-list-item-avatar>
              <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
            </v-list-item-avatar>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
           v-for="(item, i) in items" 
           :key="i"
           link
            :to="{name:item.link}"
           >
           <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
           <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
           </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data: () => ({
    name: "Samuel Abonia",
  }),
  props:[
    'items'
  ]

};
</script>

<style>
.name {
  font-weight: bold;
  margin-top: 15px;
  width: 80%;
}

.div-top {
  margin-top: 0px;
  background-color: black;
}
.userInfo{
   width: 15%;
   display:flex;
}
</style>