<template>
  <div class="addItemDiv">
    <form class="addItem">
      <input
        class="text_input"
        type="text"
        v-model="newTask"
        required
        autofocus
      />
      <button class="submit_button" type="submit" @click="handleSubmit">
        Add
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "AddTask",
  data() {
    return {
      newTask: "",
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      if (this.newTask.length > 0) {
        this.addTaskAction(this.newTask);
        this.newTask = "";
      }
    },
    ...mapActions({
      addTaskAction: "list/addTaskAction",
    }),
  },
};
</script>

<style scoped>
.addItemDiv {
  display: flex;
  width: 100%;
  color: white;
  margin-top: 5px;
}
.addItem {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  padding: 10px;
  width: 100%;
}
.text_input {
  width: 50%;
  height: 30px;
  margin: 5px;
}
.submit_button {
  height: 36px;
  width: 60px;
  font-size: 15px;
  font-weight: 400;
  margin: 5px;
}
</style>
