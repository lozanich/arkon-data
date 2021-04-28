import React, { useReducer, useState } from "react";
import "../styles/listTask.css";
import { Row, Col, Button } from "react-bootstrap";
import { taskReducer } from "../hooks/taskReducer";
import { buildFakeTask } from "../util/buildFakeTask";
import { BsPlusCircle, BsFillAlarmFill } from "react-icons/bs";
import { ModalAdd } from "../components/ModalAdd";
import { TaskTable } from "../components/TaskTable";

const init = () => {
  return JSON.parse(localStorage.getItem("tasks")) || [];
};

export const ListTasks = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    console.log("Agregando nueva tarea");
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const handleAddTask = (task) => {
    console.log("Agregando nueva tarea");
  };

  const [tasks, dispatch] = useReducer(taskReducer, [], init);
  console.log(tasks);

  const handleRandomTasks = () => {
    dispatch({
      type: "restart",
    });
    const localTasks = [];
    for (let index = 0; index < 50; index++) {
      const task = buildFakeTask();
      localTasks.push(task);
      dispatch({
        type: "add",
        payload: task,
      });
    }
    localStorage.setItem("tasks", JSON.stringify(localTasks));
  };

  const handleDelete = (item) => {
    const actionDelete = {
      type: "delete",
      payload: item,
    };
    dispatch(actionDelete);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  return (
    <>
      <Row className="justify-content-md-center">
        <Col className="text-center">
          <h3>Mis tareas</h3>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col className="text-left" sm={6}>
          <Button onClick={handleShow} variant="success" className="my-1">
            Agregar nueva <BsPlusCircle />
          </Button>
        </Col>
        <Col className="text-right" sm={6}>
          <Button onClick={handleRandomTasks} className="my-1">
            Generar tareas <BsFillAlarmFill />
          </Button>
        </Col>
      </Row>
      <hr />
      <Row className="justify-content-md-center">
        <Col className="text-right" sm={10}>
          <TaskTable tasks={tasks} handleDelete={handleDelete} />
        </Col>

        <Col className="text-right" sm={2}>
          Grafica
        </Col>
      </Row>

      <ModalAdd
        show={show}
        handleClose={handleClose}
        handleAddTask={handleAddTask}
      />
    </>
  );
};
