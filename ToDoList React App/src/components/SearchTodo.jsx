import { useState } from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import Input from "@mui/joy/Input";
import CloseIcon from "@mui/icons-material/Close";
import { handleSearchString } from "../slices/postTodoSlice";
import { useDispatch } from "react-redux";

const searchStyle = {
  width: "500px",
  marginBottom: "10px",
  paddingBottom: "10px 0 10px 0",
  boxShadow: "#B2A4FF 0px 2px 5px 0px, #fff 0px 1px 1px 0px",
  "&::before": {
    display: "none",
  },
  "&:focus-within": {
    outline: "2px solid gray",
    outlineOffset: "1px",
  },
};

function SearchTodo() {
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState("");

  function inputHandler(e) {
    const lowercase = e.target.value.toLowerCase();
    setSearchQuery(lowercase);
    setTimeout(() => {
      dispatch(handleSearchString(lowercase));
    }, 2500);
  }

  function handleClearSearch() {
    dispatch(handleSearchString(""));
    setSearchQuery("");
  }

  return (
    <>
      <Input
        size="sm"
        startDecorator={<SearchRoundedIcon />}
        endDecorator={
          searchQuery && (
            <CloseIcon sx={{ fontSize: "16px" }} onClick={handleClearSearch} />
          )
        }
        sx={searchStyle}
        value={searchQuery}
        name="Outlined"
        onChange={inputHandler}
        placeholder={"Search your todo here..."}
        variant="outlined"
      />
    </>
  );
}

export default SearchTodo;
