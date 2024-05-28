/* eslint-disable react/prop-types */
import { Box, Button, Typography } from "@mui/material";
import { styled } from "styled-components";
import { useState } from "react";
import { handleAddProject } from "../../slices/projectListSlice";
import { useDispatch } from "react-redux";

const Form = styled.form`
  width: 400px;
  padding: 0;
`;
const Label = styled.label`
  font-family: "Montserrat";
`;

const Input = styled.input`
  width: 100%;
  height: 30px;
  border-radius: 5px;
  border-color: #360982;
  border-width: 1px;
  font-weight: 500;
  border-style: solid;
  font-size: medium;
  font-family: "Montserrat";
`;
function AddProjectSideForm({ handleClose }) {
  const dispatch = useDispatch();
  const [projectName, setProjectName] = useState("");
  const [islengthExceeded, setIsLengthExceeded] = useState(false);

  function handleChangeInput(e) {
    if (e.target.value.length >= 25) {
      setIsLengthExceeded(true);
      setProjectName(projectName.slice(0, 25));
    } else {
      setIsLengthExceeded(false);
      setProjectName(e.target.value);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    const id = Date.now().toString().slice(9, 12);

    if (projectName) {
      const projectDetails = { id, projectName, projectTodo: [] };

      const TakeLogic = 0;
      dispatch(handleAddProject({projectDetails, TakeLogic}));
      setProjectName("");
      handleClose();
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Label>Name</Label>
        <Input
          autoFocus={true}
          placeholder="Write the Project Name"
          type="text"
          value={projectName}
          onChange={handleChangeInput}
          // inputprops={{ maxLength: 12 }}
        />
        {islengthExceeded ? (
          <Typography sx={{ padding: 0, color: "#ED2B2A", fontSize: "14px" }}>
            *Exceeded character limit 25
          </Typography>
        ) : (
          ""
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            paddingTop: "5px",
          }}
        >
          <Button
            variant="outlined"
            onClick={handleClose}
            sx={{
              color: "#360982",
              borderColor: "#360982",
              fontWeight: "700",
              margin: "0 20px 0 0",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="outlined"
            sx={{
              color: "#360982",
              borderColor: "#360982",
              fontWeight: "700",
            }}
          >
            Add
          </Button>
        </Box>
      </Form>
    </>
  );
}

export default AddProjectSideForm;
