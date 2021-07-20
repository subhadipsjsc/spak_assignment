<template>
  <div class="app">
    <Navbar />
    <AddTask />
    <IncompletedTask />
    <CompletedTask />
  </div>
</template>

<script>
// @ is an alias to /src
import CompletedTask from "@/components/CompledTasks.vue";
import IncompletedTask from "@/components/IncompledTasks.vue";
import AddTask from "@/components/AddTask.vue";
import Navbar from "@/components/Navbar.vue";

import { mapActions } from "vuex";

export default {
  name: "Home",
  components: {
    AddTask,
    CompletedTask,
    IncompletedTask,
    Navbar,
  },
  methods: {
    ...mapActions({
      loadAllTask: "list/getAllTasks",
    }),
  },
  mounted: function () {
    this.loadAllTask();
  },
};
</script>
<style scoped>
.app {
  background-color: #a9aaab;
  min-height: 600px;
}
</style>
