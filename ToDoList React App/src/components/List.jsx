/* eslint-disable react/prop-types */
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Box } from "@mui/material";
import ListElement from "./ListElement";
import DayTime from "./DayTime";
import EmptyList from "./EmptyList";
import { useSelector } from "react-redux";
import { tasks } from "../slices/postTodoSlice";
import { handleSortingList } from "../slices/postTodoSlice";
import { useDispatch } from "react-redux";
import { searchString } from "../slices/postTodoSlice";

function List() {
  const SearchString = useSelector(searchString);
  const dispatch = useDispatch();
  const Tasks = useSelector(tasks);

  const droppables = Date.now().toString().slice(8, 12);

  const filteredTasks = Tasks.filter((el) => {
    const filterTitle = el.title?.toLowerCase().includes(SearchString);
    const filterDescription = el.description?.toLowerCase().includes(SearchString);

    const filteredList = filterTitle || filterDescription;

    if (SearchString === "") {
      return el;
    } else {
      return filteredList;
    }
  });
  console.log(filteredTasks);

  function handleOnDragEnd(result) {
    const items = Array.from(Tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    console.log(items, "items");
    // setTasks(items);
    dispatch(handleSortingList({items}))
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId={droppables}>
        {(provided) => (
          <Box ref={provided.innerRef}>
            <DayTime />
            {/* //////////////////////////////////////////// */}
            {filteredTasks[0] ? (
              filteredTasks.map((task, index) => (
                <ListElement
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  description={task.description}
                  index={index}
                  priority={task.priority}
                  dueDate={task.dueDate}
                  dueMonth={task.dueMonth}
                />
              ))
            ) : SearchString ? (
              <EmptyList />
            ) : (
              ""
            )}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default List;
