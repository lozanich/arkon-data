import React, { useReducer, useState } from "react";
import "../styles/listTask.css";
import { Row, Col, Button } from "react-bootstrap";
import { taskReducer } from "../hooks/taskReducer";
import { buildFakeTask } from "../util/buildFakeTask";
import {
  BsPlusCircle,
  BsFillAlarmFill,
  BsCollectionPlay,
} from "react-icons/bs";
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
  const handleCloseModal = () => {
    setEditTask("")
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

  const [editTask, setEditTask] = useState("")
  const handleEdit = (task) => {
    setShow(true)
    setEditTask(task)
  }

  const handleEditTask = (task) => {
    // dispatch edit task
    dispatch({
      type: "edit",
      payload: task,
    });
  }

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

  // init timer in 0
  const [timer, setTimer] = useState(0)
  const [runningTask, setRunningTask] = useState("")


  // action button start last task
  const handleStartTasks = () => {
    console.log('start task')
    const lastTask = tasks.find(item => item.done === false);
    setRunningTask(lastTask)
    setTimer(lastTask.duration - lastTask.advance);
  }

  const handlePauseTask = (task) => {
    console.log("Pausando la tarea", task)
  }

  const handleStopTask = (task) => {
    console.log("Deteniendo la tarea", task);
  }

  const handleRestartTask = (task) => {
    console.log("Reiniciando la tarea", task);
  };

  return (
    <>
      <Row className="justify-content-md-center">
        <Col className="text-center">
          <h3>Mis tareas</h3>
        </Col>
      </Row>
      <Row>
        <Col className="text-center" sm={12} md={{ span: 6, offset: 6 }}>
          <Timer
            runningTask={runningTask}
            timeFirstTask={timer}
            handlePauseTask={handlePauseTask}
            handleStopTask={handleStopTask}
            handleRestartTask={handleRestartTask}
          />
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col className="text-left" md={3} sm={12}>
          <Button onClick={handleShow} variant="success" className="my-1" block>
            Agregar nueva <BsPlusCircle />
          </Button>
        </Col>
        <Col className="text-center" md={6} sm={12}>
          <Button onClick={handleStartTasks} className="my-1" block>
            Comenzar tareas <BsCollectionPlay />
          </Button>
        </Col>
        <Col className="text-right" md={3} sm={12}>
          <Button onClick={handleRandomTasks} className="my-1" block>
            Generar tareas <BsFillAlarmFill />
          </Button>
        </Col>
      </Row>
      <hr />
      <Row className="justify-content-md-center">
        <Col className="text-right" md={8} sm={12}>
          <TaskTable
            tasks={tasks}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        </Col>

        <Col className="text-right" md={4} sm={12}>
          Grafica
        </Col>
      </Row>

      <ModalAdd
        show={show}
        handleCloseModal={handleCloseModal}
        handleAddTask={handleAddTask}
        editTask={editTask}
        handleEditTask={handleEditTask}
      />
    </>
  );
};
