export const SET_UNFINISHED_TASK = (state, tasks) => {
  tasks.sort((a, b) => a.position - b.position);
  state.unfinishedTasks = [...tasks];
};

export const SET_FINISHED_TASK = (state, tasks) => {
  state.finishedTasks = [...tasks];
};

export const ADD_UNFINISHED_TASK = (state, newTask) => {
  const tasks = [...state.unfinishedTasks, newTask];
  tasks.sort((a, b) => a.position - b.position);
  state.unfinishedTasks = [...tasks];
};

export const MARK_COMPLETED_TASK = (state, ID) => {
  const index = state.unfinishedTasks.findIndex((x) => x._id === ID);
  const item = { ...state.unfinishedTasks[index] };
  state.unfinishedTasks.splice(index, 1);
  state.finishedTasks = [...state.finishedTasks, item];
};

export const DELETE_COMPLETED_TASK = (state, ID) => {
  const index = state.finishedTasks.findIndex((x) => x._id === ID);
  state.finishedTasks.splice(index, 1);
};
