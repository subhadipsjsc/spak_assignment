<template>
  <div class="comTasks">
    <div class="heading">Completed Tasks</div>
    <div class="tasks">
      <div class="singleTask" v-for="list in lists" :key="list.position">
        <div class="singleTaskDetails">{{ list.task }}</div>
        <div class="markCompleted">
          <DeleteIcon @click="deleteTask(list._id)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import DeleteIcon from "@/components/icons/DeleteIcon.vue";

export default {
  name: "CompledTasks",
  components: {
    DeleteIcon,
  },
  computed: {
    ...mapState({
      lists: (state) => state.list.finishedTasks,
    }),
  },
  methods: {
    deleteTask(id) {
      this.deleteTaskAction(id);
    },
    ...mapActions({
      deleteTaskAction: "list/deleteTaskAction",
    }),
  },
};
</script>

<style scoped>
.comTasks {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px;
  margin-top: 20px;
  border: 1px solid white;
  background-color: #adb9b4;
}
.heading {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 30px;
  border-bottom: 1px solid white;
  font-size: 20px;
  font-weight: 600;
  color: white;
  background-color: #799a8b;
}
.tasks {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 10px;
}
.singleTask {
  display: flex;
  flex-direction: row;
  min-height: 30px;
  width: 95%;
  margin: 8px;
  border: 1px solid rgb(71, 68, 68);
  color: white;
  background-color: #5e7353;
}
.singleTaskDetails {
  display: flex;
  align-items: center;
  flex-grow: 2;
}

.markCompleted {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
}
</style>
