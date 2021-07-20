export const incomplete_height_position = (state) => {
  if (state.unfinishedTasks.length == 0) {
    return 0;
  } else {
    const last_item = state.unfinishedTasks[state.unfinishedTasks.length - 1];
    return last_item.position;
  }
};

export const incomplete_tasks = (state) => {
  return [...state.unfinishedTasks];
};
