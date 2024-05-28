import styled from "styled-components";
import TaskForm from "./TaskForm";
import List from "./List";
import AddTask from "./AddTask";
import { LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { searchString } from "../slices/postTodoSlice";

const ContentStyle = styled.div`
  display: flex;
  height: 800px;
  padding-top: 10px;
  background-color: #fbffdc;
  flex-direction: column-reverse;
  justify-content: flex-end;
  align-items: center;
`;
function MainContent() {
  const SearchString = useSelector(searchString);
  const [isAddTask, setIsAddTask] = useState(false);
  const [progress, setProgress] = useState("");

  useEffect(() => {
    setProgress(SearchString);
    setTimeout(() => {
      setProgress("");
    }, 2000);
  }, [SearchString]);

  return (
    <>
      {progress && <LinearProgress color="success" />}
      <ContentStyle>
        {isAddTask ? (
          <TaskForm isAddTask={isAddTask} setIsAddTask={setIsAddTask}/>
        ) : (
          <AddTask isAddTask={isAddTask} setIsAddTask={setIsAddTask}/>
        )}
        <List />
      </ContentStyle>
    </>
  );
}

export default MainContent;
