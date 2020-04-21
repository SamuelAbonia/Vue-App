<template>
  <div class="treeViewContent">
    <div v-for="message in messages" :key="message.id">
      <treeFolder :message="message" class="tree"></treeFolder>
    </div>
  </div>
</template>

<script>
import treeFolder from "./TreeFolder";
export default {
  name: "TreeView",
  data() {
    return {};
  },
  props: ["messages"],
  components: {
    treeFolder
  }
};
</script>

<style>
</style>