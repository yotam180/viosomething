import { Paper, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const goHome = () => {
    navigate("/");
  };

  return (
    <Container>
      <NotFoundPaper elevation={12}>
        <Typography variant="h3">404 Not Found</Typography>
        <br />
        <Typography variant="body1">
          You might want to{" "}
          <a href="#" onClick={goBack}>
            go back
          </a>{" "}
          or{" "}
          <a href="#" onClick={goHome}>
            go home
          </a>
        </Typography>
      </NotFoundPaper>
    </Container>
  );
};

const Container = styled.div`
  flex-grow: 1;
  background-color: whitesmoke;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const NotFoundPaper = styled(Paper)`
  padding: 80px;
  text-align: center;
`;

export default NotFoundPage;
