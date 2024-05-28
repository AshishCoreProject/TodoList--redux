import { createSlice } from "@reduxjs/toolkit";

const projectListSlice = createSlice({
    name:"projectListSlice",
    initialState:{
        projectList: [],
        projectIsAddTask:false,
    },
    reducers:{
        handleAddProject:(state, action) => {
            const {projectDetails, TakeLogic} = action.payload;
            console.log(projectDetails, TakeLogic, "payload");
            const project = state.projectList?.find((element) => element.id === TakeLogic);
            console.log(project,"project");

            // // {id: '481', projectName: 'React.js', projectTodo: Array(0)}  ------getting an object
            if (project) {
            const updatedProject = {
                ...project,
                projectTodo: [...project.projectTodo, projectDetails],
            };
            const updatedProjectList = state.projectList?.map((p) =>
                p.id === TakeLogic ? updatedProject : p
            );
            state.projectList = updatedProjectList;
            console.log("Adding into the sub Array");
            }
            if (TakeLogic === 0){
                state.projectList?.push(projectDetails);
                console.log("Adding into Main Array");
            }
        },
        handleEditProject:(state, action) => {
            const {projectId:id, renameProject:EditProjectName} = action.payload;
            const renamedProject = state.projectList.map((projectItem) => {
                if (projectItem.id === id) {
                  const updatedProject = {
                    ...projectItem,
                    projectName: EditProjectName,
                  };
                  return updatedProject;
                }
                return projectItem;
              });
              console.log(renamedProject, "renamedProject");
              state.projectList = renamedProject;
        },

        handleDeleteproject:(state, action) => {
           state.projectList =  state.projectList.filter((projectItem) => projectItem.id !== action.payload.projectId)
        },

        handleDeleteProjectTodo:(state,action) => {
            const {projectId, id:deleteProjectSubArrayId} = action.payload;
            const project = state.projectList?.find(
                (element) => element.id === projectId
              );
                if (project) {
                  const updatedProject = {
                    ...project,
                    projectTodo: [...project.projectTodo].filter(
                      (item) => item.id !== deleteProjectSubArrayId
                    ),
                  };
                  const updatedProjectList = state.projectList?.map((p) =>
                    p.id === projectId ? updatedProject : p
                  );
                  state.projectList = updatedProjectList;
                }
        }, 

        handleEditProjectTodo: (state, action) => {
          const { projectId,myId,myTitle,myDescription,myPriority,myDueDate,myDueMonth} = action.payload;
          const project = state.projectList?.find((item) => item.id === projectId);

          if (project) {
            const updatedProject = {
              ...project,
              projectTodo: [...project.projectTodo].map((item) => {
                if (item.id === myId) {
                  const updateArray = {
                    ...item,
                    id: myId,
                    title: myTitle,
                    description: myDescription,
                    priority: myPriority,
                    dueDate: myDueDate,
                    dueMonth: myDueMonth,
                  };
                  return updateArray;
                }
                return item;
              }),
            };

            const updatedProjectList = state.projectList?.map((p) =>
              p.id === projectId ? updatedProject : p
            );
            state.projectList = updatedProjectList;
          }
        }
    }
})

export const projectList = (state) => state.projectListSlice.projectList;

export const {handleAddProject, setProjectIsAddTask, handleEditProject, handleDeleteproject, handleDeleteProjectTodo, handleEditProjectTodo} = projectListSlice.actions;

export default projectListSlice.reducer;
