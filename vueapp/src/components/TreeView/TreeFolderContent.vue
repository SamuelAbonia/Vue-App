<template>
  <div class="treeFolderContent">
    <div v-for="child in children" :key="child.id">
      <treeFolder v-if="child.children" :message="child"></treeFolder>
      <v-card v-else class="mx-auto">
        <v-list-item>
          <v-list-item-avatar color="grey">
            <v-icon>mdi-face</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="headline">{{child.user}}</v-list-item-title>
            <v-list-item-subtitle>{{child.date}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-card-text>
          estoy aqui
          {{child.content}}
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
import treeFolder from "./TreeFolder";
export default {
  name: "treeFolderContent",
  data() {
    return {};
  },
  props: ["children"],
  components: {
    treeFolder
  }
};
</script>

<style>
.treeFolderContent {
  width: 98%;
  margin-top: 10px;
  margin-left: 20px;
}
</style>