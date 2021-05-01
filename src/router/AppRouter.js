import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { NavbarBootstrap } from "../components/ui/NavbarBootstrap";
import { ListTasks } from "../components/ListTasks";
import { AddTask } from "../components/AddTask";
import { Container } from "react-bootstrap";

export const AppRouter = () => {
  return (
    <Router>
      <>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}

        <NavbarBootstrap />
        <Container>
          <Switch>
            <Route exact path="/" component={ListTasks}></Route>
            <Route exact path="/add-new" component={AddTask}></Route>
          </Switch>
        </Container>
      </>
    </Router>
  );
};
