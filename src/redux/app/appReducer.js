import { ADD_PROJECT, DELETE_PROJECT, EDIT_PROJECT } from "./appTypes";

const initialState = {
  projects: [
    {
      id: 122345,
      name: "test 1",
      addedDate: new Date("11 april 2021"),
      editedDate: null,
      desc: "Defines the columns and rows of the grid with a space-separated list of values. The values represent the track size, and the space between them represents the grid line.",
      images: [
        "https://images.squarespace-cdn.com/content/v1/55cfb535e4b061baebe310df/1587472623697-IC8B3J3ZIZI0AMIE7U8G/ke17ZwdGBToddI8pDm48kLkXF2pIyv_F2eUT9F60jBl7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0iyqMbMesKd95J-X4EagrgU9L3Sa3U8cogeb0tjXbfawd0urKshkc5MgdBeJmALQKw/sky+photo+for+website+home+page.jpeg?format=2500w",
      ],
    },
    {
      id: 2363476,
      name: "test 2",
      addedDate: new Date("12 april 2021"),
      editedDate: null,
      desc: "That’ll create a grid that’s four columns wide by three rows tall. The entire top row will be composed of the header area. The middle row will be composed of two main areas, one empty cell, and one sidebar area. The last row is all footer.",
      images: [],
    },
    {
      id: 4834763436,
      name: "test 3",
      addedDate: new Date("25 may 2021"),
      editedDate: null,
      desc: "The fr unit allows you to set the size of a track as a fraction of the free space of the grid container. For example, this will set each item to one third the width of the grid container:",
      images: [
        "https://us.123rf.com/450wm/detshana/detshana1602/detshana160200394/53249106-the-vast-blue-sky-and-clouds-sky.jpg?ver=6",
        "https://upload.wikimedia.org/wikipedia/commons/8/85/Sky-3.jpg",
      ],
    },
  ],
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PROJECT:
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };

    case DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter(
          (project) => project.id !== action.payload
        ),
      };

    case EDIT_PROJECT:
      const tempProjects = state.projects.map((project) => {
        if (project.id === action.payload.id) {
          return action.payload;
        } else {
          return project;
        }
      })
      return {
        ...state,
        projects: tempProjects,
      };

    default:
      return state;
  }
};
