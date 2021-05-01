import React, { useReducer, useState } from "react";
import "../styles/listTask.css";
import { Row, Col, Button, Dropdown } from "react-bootstrap";
import { taskReducer } from "../hooks/taskReducer";
import { buildFakeTask } from "../util/buildFakeTask";
import {
  BsPlusCircle,
  BsFillAlarmFill,
  BsCollectionPlay,
} from "react-icons/bs";
import { ModalAdd } from "../components/ModalAdd";
import { TaskTable } from "../components/TaskTable";
import { Timer } from "../components/Timer"
import { FinishedTask } from "../components/FinishedTask"
import { PendingTask } from "../components/PendingTask"
import {GraphicTask} from "../components/GraphicTask"

const init = () => {
  return JSON.parse(localStorage.getItem("tasks")) || [];
};

export const ListTasks = () => {
  // var set state show/hide modal
  const [show, setShow] = useState(false);

  // var set state close modal
  const handleCloseModal = () => {
    setEditTask("");
    setShow(false);
  };

  // var set state open modal
  const handleShow = () => setShow(true);

  // Function to add new task
  const handleAddTask = (task) => {
    dispatch({
      type: "add",
      payload: task,
    });
  };

  // init values task
  const [tasks, dispatch] = useReducer(taskReducer, [], init);
  console.log(tasks);

  const [filterTask, setFilterTask] = useState({typeFilter: "", value: ""})

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
    setFilterTask({ typeFilter: "", value: "" });
    localStorage.setItem("tasks", JSON.stringify(localTasks));
  };

  const [editTask, setEditTask] = useState("");
  const handleEdit = (task) => {
    setShow(true);
    setEditTask(task);
  };

  const handleEditTask = (task) => {
    // dispatch edit task
    dispatch({
      type: "edit",
      payload: task,
    });
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

  // init timer in 0
  const [timeFirstTask, setTimeFirstTask] = useState(0);
  // state to set actual task running
  const [runningTask, setRunningTask] = useState("");
  // state to set status actual task
  const [statusTask, setStatusTask] = useState("stop")

  // action button start last task
  const handleStartTasks = () => {
    console.log("start task");
    const lastTask = tasks.find((item) => item.done === false);
    setRunningTask(lastTask);
    setTimeFirstTask(lastTask.duration - lastTask.advance);
    setStatusTask("start")
  };

  // function pause countdown
  const handlePauseTask = (task, counter) => {
    console.log("Pausando la tarea", task, counter);
    setStatusTask("pause");
    task.advance = task.duration - counter;
    task.percentAdvance = (100 * task.advance) / task.duration;
    dispatch({
      type: "edit",
      payload: task,
    });
  };

  // function stop countdown
  const handleStopTask = (task, counter) => {
    console.log("Deteniendo la tarea", task, counter);
    setStatusTask("stop");
    task.advance = task.duration - counter;
    task.percentAdvance = (100 * task.advance) / task.duration;
    dispatch({
      type: "edit",
      payload: task,
    });
    setTimeFirstTask(0);
  };

  // function restart countdown
  const handleRestartTask = (task, counter) => {
    console.log("Reiniciando la tarea", task, counter);
    setStatusTask("restart");
    task.advance = 0;
    task.percentAdvance = 0;
    dispatch({
      type: "edit",
      payload: task,
    });
    setTimeFirstTask(0);
    // setTimeFirstTask(task.duration);    
  };

  // function to mark finish task
  const handleFinishTask = (task, counter) => { 
    console.log("Reiniciando la tarea", task, counter);

    setStatusTask("stop");
    task.advance = task.duration - counter;
    task.percentAdvance = (100 * task.advance) / task.duration;
    task.done = true
    task.finishedAt = new Date();
     dispatch({
       type: "edit",
       payload: task,
     });
    setTimeFirstTask(0);
  }

  // function to manage tasks filter
  const handleFilterTask = (filter, value) => {
    setFilterTask({typeFilter: filter, value})
  }

  return (
    <>
      <Row className="justify-content-md-center">
        <Col className="text-center">
          <h3>Mis tareas</h3>
        </Col>
      </Row>
      <Row>
        <Col style={{ paddingTop: "10px" }} sm={12} md={12} lg={3} xs={12}>
          <FinishedTask tasks={tasks} handleFilterTask={handleFilterTask} />
        </Col>
        <Col style={{ paddingTop: "10px" }} sm={12} md={12} lg={3} xs={12}>
          <PendingTask tasks={tasks} handleFilterTask={handleFilterTask} />
        </Col>
        <Col
          style={{ paddingTop: "10px" }}
          className="text-center"
          sm={12}
          md={12}
          lg={6}
          xs={12}
        >
          <Timer
            statusTask={statusTask}
            runningTask={runningTask}
            timeFirstTask={timeFirstTask}
            handlePauseTask={handlePauseTask}
            handleStopTask={handleStopTask}
            handleRestartTask={handleRestartTask}
            handleStartTasks={handleStartTasks}
            handleFinishTask={handleFinishTask}
          />
        </Col>
      </Row>
      <Row style={{ paddingTop: "10px" }} className="justify-content-md-center">
        <Col className="text-left" md={3} sm={12}>
          <Dropdown>
            <Dropdown.Toggle
              variant="success"
              id="dropdown-basic"
              className="my-1"
              block
            >
              Filtar por duración
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleFilterTask("duration30", 1800)}>
                30 minutos o menos
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleFilterTask("duration60", 3600)}>
                30 minutos a 60 minutos
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleFilterTask("duration120", 7200)}>
                Más de 60 minutos
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col className="text-left" md={3} sm={12}>
          <Button onClick={handleShow} variant="success" className="my-1" block>
            Agregar nueva <BsPlusCircle />
          </Button>
        </Col>
        <Col className="text-center" md={3} sm={12}>
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
        <Col className="text-right" md={6} sm={12}>
          <TaskTable
            tasks={tasks}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            filterTask={filterTask}
          />
        </Col>

        <Col className="text-right" md={6} sm={12}>
          <GraphicTask tasks={ tasks }/>
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
