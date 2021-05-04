import React, { useReducer, useState, useEffect } from "react";
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
import { GraphicTask } from "../components/GraphicTask"
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import {CardItem} from "../components/CardItem"

const init = () => {
  return JSON.parse(localStorage.getItem("tasks")) || [];
};

const initTimer = () => {
  return JSON.parse(localStorage.getItem("activeCounterTask")) || "";
}

export const ListTasks = () => {
  // var set state show/hide modal
  const [show, setShow] = useState(false);
  
  // var set state mode
  const [mode, setMode] = useState("card")

  // var set state close modal
  const handleCloseModal = () => {
    setEditTask("");
    setShow(false);
  };

  // var set state open modal
  const handleShow = () => setShow(true);

  // init values task
  const [tasks, dispatch] = useReducer(taskReducer, [], init);
  console.log(tasks);

  // Function to add new task
  const handleAddTask = (task) => {
    console.log(task)
    const lastTask = tasks[tasks.length - 1]
    console.log(lastTask);
    if (lastTask) {
      task.order = lastTask.order + 1;
    } else {
      task.order = 1;
    }

    dispatch({
      type: "add",
      payload: task,
    });
    tasks.push(task);
    console.log(tasks);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const [filterTask, setFilterTask] = useState({ typeFilter: "", value: "" });

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
      task.order = index + 1;
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
    localStorage.setItem("tasks", JSON.stringify(tasks));
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
  const [timeFirstTask, setTimeFirstTask] = useState(initTimer);
  // state to set actual task running
  const [runningTask, setRunningTask] = useState("");
  // state to set status actual task
  const [statusTask, setStatusTask] = useState("stop");

  // action button start last task
  const handleStartTasks = () => {
    console.log("start task");
    const lastTask = tasks.find((item) => item.done === false);
    console.log(lastTask)
    setRunningTask(lastTask);
    setTimeFirstTask(lastTask.duration - lastTask.advance);
    setStatusTask("start");
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
    console.log("Finalizando la tarea", task, counter);
    // update order task no completed

    setStatusTask("stop");
    task.advance = task.duration - counter;
    task.percentAdvance = (100 * task.advance) / task.duration;
    task.done = true;
    task.finishedAt = new Date();
    task.order = 0;
    
    dispatch({
      type: "edit",
      payload: task,
    });
    setTimeFirstTask(-1);
    setRunningTask("")
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  // function to manage tasks filter
  const handleFilterTask = (filter, value) => {
    setFilterTask({ typeFilter: filter, value });
  };

  const [dragId, setDragId] = useState();

  const handleDrag = (ev) => {
    setDragId(ev.currentTarget.id);
  };

  const handleDrop = (ev) => {
    const dragBox = tasks.find((box) => box.id === dragId);
    const dropBox = tasks.find((box) => box.id === ev.currentTarget.id);
    const dragBoxOrder = dragBox.order;
    const dropBoxOrder = dropBox.order;
    const newTasks = tasks.map((box) => {
      // update order task
      if (box.id === dragId) {
        box.order = dropBoxOrder;
      }
      if (box.id === ev.currentTarget.id) {
        box.order = dragBoxOrder;
      }
      return box;
    });
    localStorage.setItem("tasks", JSON.stringify(newTasks));

    // update state tasks
     dispatch({
       type: "massive",
       payload: newTasks,
     });
  };

  

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
            handleEditTask={handleEditTask}
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
              <Dropdown.Item
                onClick={() => handleFilterTask("duration30", 1800)}
              >
                30 minutos o menos
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => handleFilterTask("duration60", 3600)}
              >
                30 minutos a 60 minutos
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => handleFilterTask("duration120", 7200)}
              >
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
          <Button
            disabled={tasks.filter((item) => item.done === false).length === 0}
            onClick={handleStartTasks}
            className="my-1"
            block
          >
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
      <Row>
        <Col md={2} sm={2}>
          Modo tabla / tarjeta:
        </Col>
        <Col md={2} sm={2}>
          <BootstrapSwitchButton
            onChange={(checked) => {
              console.log(checked);
              console.log("button switch");
              checked ? setMode("table") : setMode("card");
            }}
            checked={true}
            size="xs"
          />
        </Col>
      </Row>
      <hr />
      <Row className="justify-content-md-center">
        <Col className="text-center" md={mode === "table" ? 6 : 3} sm={12}>
          {mode === "table" ? (
            <TaskTable
              tasks={tasks}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              filterTask={filterTask}
            />
          ) : (
            <CardItem
              tasks={tasks}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              filterTask={filterTask}
              handleDrag={handleDrag}
              handleDrop={handleDrop}
            />
          )}
        </Col>

        <Col className="text-right" md={mode === "table" ? 6 : 9} sm={12}>
          <GraphicTask tasks={tasks} />
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
