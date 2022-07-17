import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Home from "./components/home"
import PageHeader from "./components/commons/PageHeader";
import Container from '@mui/material/Container';
import Todo from "./components/example/todo";

function App() {
  return (
    <>
      <Router>
        <PageHeader />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/todo" element={<Todo />} />
          </Routes>
        </Container>
      </Router>
    </>
  );
}

export default App;
