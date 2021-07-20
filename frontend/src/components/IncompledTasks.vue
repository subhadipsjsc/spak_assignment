<template>
  <div class="incomTasks">
    <div class="heading">Incompleted Tasks</div>
    <div class="tasks">
      <draggable
        class="draggable"
        :list="lists"
        :options="{ animation: 300 }"
        @change="update"
      >
        <div
          class="singleTask"
          v-for="element in lists"
          :key="element.position"
        >
          <div class="singleTaskDetails">{{ element.task }}</div>
          <div class="markCompleted">
            <MarkCompletedIcon @click="markCompleted(element._id)" />
          </div>
        </div>
      </draggable>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import MarkCompletedIcon from "@/components/icons/MarkCompletedIcon.vue";
import { VueDraggableNext } from "vue-draggable-next";
export default {
  name: "IncompledTasks",
  components: {
    MarkCompletedIcon,
    draggable: VueDraggableNext,
  },
  computed: {
    ...mapState({
      lists: (state) => state.list.unfinishedTasks,
    }),
  },
  methods: {
    update() {
      this.lists.map((v, index) => {
        v.position = index + 1;
      });
      const id_position = this.lists.map((v) => {
        return {
          position: v.position,
          taskId: v._id,
        };
      });
      this.editPositionTask(id_position);
    },
    markCompleted(id) {
      this.markCompletedTask(id);
    },
    ...mapActions({
      editPositionTask: "list/editPositionTask",
      markCompletedTask: "list/markCompletedTask",
    }),
  },
};
</script>

<style scoped>
.incomTasks {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px;
  border: 1px solid white;
  background-color: #909ba9;
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
  background-color: #86898b;
}
.tasks {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 10px;
}
.draggable {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.singleTask {
  display: flex;
  flex-direction: row;
  min-height: 30px;
  width: 95%;
  margin: 8px;
  border: 1px solid rgb(71, 68, 68);
  color: white;
  background-color: #565656;
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
