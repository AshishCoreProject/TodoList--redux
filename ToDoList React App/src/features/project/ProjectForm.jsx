/* eslint-disable react/prop-types */
import { Button, Card, CardActions, CardContent, Input } from "@mui/material";
import Priority from "../../components/Priority";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useState } from "react";
import { fetchDate } from "../../services/fetchDate";
import { handleAddProject, handleEditProjectTodo } from "../../slices/projectListSlice";
import { useDispatch } from "react-redux";


function ProjectForm({
  isAddTask,
  setIsAddTask,
  Id,
  myId,
  myTitle,
  myDescription,
  myPriority,
  myDueDate,
  myDueMonth,
  setOpenForm,
  projectId,
}) {
  const dispatch = useDispatch();
  console.log(Id, myId, projectId);
  const [title, setTitle] = useState(myTitle || "");
  const [description, setDescription] = useState(myDescription || "");
  const [priority, setPriority] = useState("P4");

  function handleSubmit(e) {
    e.preventDefault();
    const { thisDate, monthNum, year, month } = fetchDate();
    const id = Date.now().toString().slice(8, 12);

    const dueDate = `${year}/${monthNum}/${thisDate}`;
    const dueMonth = `${month}`;

    //Adding to ProjectList
    const todo = { id, title, description, priority, dueDate, dueMonth };
    console.log(todo, id,"todoid");
    dispatch(handleAddProject({projectDetails:todo, TakeLogic:Id}));
    setPriority("P4");
    setTitle("");
    setDescription("");

    //Editing the ProjectList
    if (myId) {
      myTitle = title;
      myDescription = description;
      myPriority = priority;
      myDueDate = dueDate;
      myDueMonth = dueMonth;

      dispatch(handleEditProjectTodo({
        projectId,
        myId,
        myTitle,
        myDescription,
        myPriority,
        myDueDate,
        myDueMonth
      }));

      setOpenForm((value) => !value);
      setTitle("");
      setDescription("");
    }
  }

  return (
    <>
      <Card
        sx={{
          width: "600px",
          height: "150px",
          bgcolor: "#fbffdc",
          borderWidth: "0px",
        }}
      >
        <form onSubmit={handleSubmit}>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Input
              type="text"
              placeholder="Task name"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              color="success"
              autoFocus={true}
            />

            <Input
              type="text"
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              color="success"
            />
          </CardContent>
          <CardActions
            sx={{
              display: "flex",
              justifyContent: "end",
            }}
          >
            <Priority priority={priority} setPriority={setPriority} />

            <Button
              sx={{
                bgcolor: "#ACFFAD",
                color: "green",
                borderRadius: "10px",
                "&:hover": {
                  color: "white",
                  bgcolor: "#360982",
                  opacity: "80%",
                },
              }}
              onClick={() => {
                // logic of if we edit the form it should be closed
                if (!myId) {
                  setIsAddTask(!isAddTask);
                } else {
                  setOpenForm((value) => !value);
                }
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              sx={{
                bgcolor: "#3e978b",
                borderRadius: "10px",
                "&:hover": {
                  bgcolor: "#360982",
                  color: "white",
                },
              }}
              variant="contained"
              type="submit"
              disabled={!(title && description)}
            >
              {myId ? "Edit" : <AddOutlinedIcon />}
            </Button>
          </CardActions>
        </form>
      </Card>
    </>
  );
}

export default ProjectForm;
