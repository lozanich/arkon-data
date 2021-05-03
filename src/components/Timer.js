import React, {useEffect, useState, useReducer} from 'react'
import { Row, Col, Button, Card } from "react-bootstrap";
import { formatData } from "../util/formatData"
import {taskReducer} from "../hooks/taskReducer"
import {
  BsFillPauseFill,
  BsFillStopFill,
  BsArrowRepeat,
  BsFillStopwatchFill,
} from "react-icons/bs";

export const Timer = React.memo(
  ({
    statusTask,
    runningTask,
    timeFirstTask,
    handlePauseTask,
    handleStopTask,
    handleRestartTask,
    handleStartTasks,
    handleFinishTask,
  }) => {
    // init values task
    const [counter, setCounter] = useState(parseInt(timeFirstTask));

    // renders counter new calculate
    useEffect(() => {
      if (statusTask === "start") {
        console.log(counter)
        const timer =
          counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        
        // localStorage.setItem("activeCounterTask", JSON.stringify(counter));
        
        // // finish task if time is complete
        if (counter === 0 && runningTask) {
          handleFinishTask(runningTask, counter);
        }
        return () => clearInterval(timer);
      } else {
        return counter;
      }
    }, [counter, statusTask, handleFinishTask, runningTask]);

    // restart counter new value task
    useEffect(() => {
      setCounter(parseInt(timeFirstTask));
    }, [timeFirstTask]);

    return (
      <>
        <Card>
          <Card.Body>
            <Row>
              <Col className="text-center" md={12}>
                {counter ? formatData(counter, "minutes"): 'Inicia una tarea'}
              </Col>
            </Row>
            <Row>
              <Col
                style={{ paddingTop: "10px" }}
                className="text-center"
                sm={12}
                md={3}
              >
                {statusTask === "start" || statusTask === "stop" ? (
                  <Button
                    onClick={() => handlePauseTask(runningTask, counter)}
                    variant="outline-success"
                    className="my-1"
                    block
                  >
                    Pausar <BsFillPauseFill />
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleStartTasks()}
                    variant="outline-success"
                    className="my-1"
                    block
                  >
                    Reanudar <BsFillPauseFill />
                  </Button>
                )}
              </Col>
              <Col
                style={{ paddingTop: "10px" }}
                className="text-center"
                sm={12}
                md={3}
              >
                <Button
                  onClick={() => handleStopTask(runningTask, counter)}
                  variant="outline-warning"
                  className="my-1"
                  block
                >
                  Detener <BsFillStopFill />
                </Button>
              </Col>
              <Col
                style={{ paddingTop: "10px" }}
                className="text-center"
                sm={12}
                md={3}
              >
                <Button
                  onClick={() => handleRestartTask(runningTask, counter)}
                  variant="outline-danger"
                  className="my-1"
                  block
                >
                  Reiniciar <BsArrowRepeat />
                </Button>
              </Col>
              <Col
                style={{ paddingTop: "10px" }}
                className="text-center"
                sm={12}
                md={3}
              >
                <Button
                  onClick={() => handleFinishTask(runningTask, counter)}
                  variant="outline-warning"
                  className="my-1"
                  block
                >
                  Finalizar <BsFillStopwatchFill />
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </>
    );
  }
);
