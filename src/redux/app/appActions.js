import { ADD_PROJECT, DELETE_PROJECT, EDIT_PROJECT} from "./appTypes";

export const addProject = (project) => {
  return {
    type: ADD_PROJECT,
    payload: project
  }
}

export const deleteProject = (projectId) => {
  return {
    type: DELETE_PROJECT,
    payload: projectId
  }
}

export const editProject = (project) => {
  console.log(":(", project)
  return {
    type: EDIT_PROJECT,
    payload: project
  }
}