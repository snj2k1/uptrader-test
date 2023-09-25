export const selectProjects = (state) => state.projects;

export const selectProject = (state, id) => state.projects[id];

export const selectTaskId = (state, id) => state.projects[id]["tasks"].length;
