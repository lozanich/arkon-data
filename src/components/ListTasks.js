import React, { useReducer, useState } from "react";
import "../styles/listTask.css";
import { Row, Col, Button } from "react-bootstrap";
import { taskReducer } from "../hooks/taskReducer";
import { buildFakeTask } from "../util/buildFakeTask";
import { BsPlusCircle, BsFillAlarmFill } from "react-icons/bs";
import { ModalAdd } from "../components/ModalAdd";
import { TaskTable } from "../components/TaskTable";
import {Timer} from "../components/Timer"

const init = () => {
  return JSON.parse(localStorage.getItem("tasks")) || [];
};

export const ListTasks = () => {
  // var set state show/hide modal
  const [show, setShow] = useState(false);

  // var set state close modal
  const handleClose = () => {
    setShow(false);
  };


  // var set state open modal
  const handleShow = () => setShow(true);

  const handleAddTask = (task) => {
    console.log(task)
    console.log("Agregando nueva tarea");
    dispatch({
      type: "add",
      payload: task,
    });
  };

  // init values task
  const [tasks, dispatch] = useReducer(taskReducer, [], init)
  console.log(tasks);

  // function generate random tasks
  const handleRandomTasks = () => {
    // restart state array of tasks
    dispatch({
      type: "restart",
    });
    // generate 50 random tasks
    const localTasks = [];
    for (let index = 0; index < 50; index++) {
      const task = buildFakeTask();
      localTasks.push(task);
      // set new task to state
      dispatch({
        type: "add",
        payload: task,
      });
    }
    localStorage.setItem("tasks", JSON.stringify(localTasks));
  };

  // function to delete one task
  const handleDelete = (item) => {
    const actionDelete = {
      type: "delete",
      payload: item,
    };
    // delete task from state
    dispatch(actionDelete);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const [timer, setTimer] = useState(0)

  const handleStartTasks = () => {
    console.log('start task')
    const lastTask = tasks.find(item => item.done === false);
    setTimer(lastTask.duration - lastTask.advance);
  }

  return (
    <>
      <Row className="justify-content-md-center">
        <Col className="text-center">
          <h3>Mis tareas</h3>
        </Col>
      </Row>
      <Row>
        <Col className="text-left" sm={6}>
          <Timer timeFirstTask={ timer } />
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col className="text-left" sm={2}>
          <Button onClick={handleShow} variant="success" className="my-1">
            Agregar nueva <BsPlusCircle />
          </Button>
        </Col>
        <Col className="text-center" sm={8}>
          <Button onClick={handleStartTasks} className="my-1" block>
            Comenzar tareas <BsFillAlarmFill />
          </Button>
        </Col>
        <Col className="text-right" sm={2}>
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
