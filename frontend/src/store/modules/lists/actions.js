import { auth_POST, auth_GET, auth_PATCH, auth_DELETE } from "@/axiosAPI";
import CONFIG from "@/config.js";
import router from "@/router";

export const getAllTasks = async (context) => {
  try {
    const resData = await auth_GET(`${CONFIG.backendURL}/list`);

    if (
      resData.status == 200 &&
      resData.statusText == "OK" &&
      resData.data.success == 1
    ) {
      const completedTask = resData.data.lists.filter((v) => v.completed);
      context.commit("SET_FINISHED_TASK", completedTask);

      const inCompletedTask = resData.data.lists.filter((v) => !v.completed);
      context.commit("SET_UNFINISHED_TASK", inCompletedTask);
    }
  } catch (err) {
    console.log("error");
  }
};

export const addTaskAction = async (context, newTask) => {
  try {
    const postData = {
      task: newTask,
      position: parseInt(context.getters.incomplete_height_position) + 1,
    };
    const resData = await auth_POST(`${CONFIG.backendURL}/list/add`, postData);
    console.log(resData);
    if (
      resData.status == 200 &&
      resData.statusText == "OK" &&
      resData.data.success == 1
    ) {
      context.commit("ADD_UNFINISHED_TASK", resData.data.list);
    }
  } catch (err) {
    console.log(err.response.data);
    if (
      err.response.data.success == 0 &&
      err.response.data.error == "Unauthorized"
    ) {
      console.log("logout");
      context.commit("auth/SET_USER", null, { root: true });
      context.commit("auth/SET_TOKEN", "", { root: true });
      router.push({ name: "Login" });
    }
  }
};

export const editPositionTask = async (context, newScores) => {
  try {
    const resData = await auth_PATCH(
      `${CONFIG.backendURL}/list/update-position`,
      newScores
    );
    console.log(resData);
  } catch (err) {
    console.log(err.response.data);
    if (
      err.response.data.success == 0 &&
      err.response.data.error == "Unauthorized"
    ) {
      console.log("logout");
      context.commit("auth/SET_USER", null, { root: true });
      context.commit("auth/SET_TOKEN", "", { root: true });
      router.push({ name: "Login" });
    }
  }
};

export const markCompletedTask = async (context, id) => {
  try {
    const resData = await auth_PATCH(
      `${CONFIG.backendURL}/list/mark-completed/${id}`
    );
    console.log(resData);
    if (
      resData.status == 200 &&
      resData.statusText == "OK" &&
      resData.data.success == 1
    ) {
      context.commit("MARK_COMPLETED_TASK", id);
    }
  } catch (err) {
    console.log(err.response.data);
    if (
      err.response.data.success == 0 &&
      err.response.data.error == "Unauthorized"
    ) {
      console.log("logout");
      context.commit("auth/SET_USER", null, { root: true });
      context.commit("auth/SET_TOKEN", "", { root: true });
      router.push({ name: "Login" });
    }
  }
};

export const deleteTaskAction = async (context, id) => {
  try {
    const resData = await auth_DELETE(
      `${CONFIG.backendURL}/list/delete-task/${id}`
    );
    console.log(resData);
    if (
      resData.status == 200 &&
      resData.statusText == "OK" &&
      resData.data.success == 1
    ) {
      context.commit("DELETE_COMPLETED_TASK", id);
    }
  } catch (err) {
    console.log(err.response.data);
    if (
      err.response.data.success == 0 &&
      err.response.data.error == "Unauthorized"
    ) {
      console.log("logout");
      context.commit("auth/SET_USER", null, { root: true });
      context.commit("auth/SET_TOKEN", "", { root: true });
      router.push({ name: "Login" });
    }
  }
};
