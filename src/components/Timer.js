import React, {useEffect, useState} from 'react'
import { Row, Col, Button, Card } from "react-bootstrap";
import PropTypes from "prop-types";
import { formatData } from "../util/formatData"
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
    handleEditTask,
  }) => {
    // init values task
    const [counter, setCounter] = useState(parseInt(timeFirstTask));
    // restart counter new value task
    useEffect(() => {
      setCounter(parseInt(timeFirstTask));
    }, [timeFirstTask]);
    console.log(runningTask);

    // renders counter new calculate
    useEffect(() => {
      if (statusTask === "start") {
        const timer =
          counter > 0 && setInterval(() => setCounter(counter - 1), 1000);

        // save in local storage actual counter
        localStorage.setItem("activeCounterTask", JSON.stringify(counter));
        runningTask.advance = runningTask.duration - counter;
        runningTask.percentAdvance =
          (100 * runningTask.advance) / runningTask.duration;
        handleEditTask(runningTask);

        // // finish task if time is complete
        if (counter === 0 && runningTask) {
          console.log("finish counter ");
          handleFinishTask(runningTask, counter);
        }
        return () => clearInterval(timer);
      } else {
        return counter;
      }
    }, [counter, statusTask, handleFinishTask, runningTask, handleEditTask]);

    return (
      <>
        <Card>
          <Card.Body>
            <Row>
              <Col className="text-center" md={12}>
                {counter && counter !== -1
                  ? formatData(counter, "minutes")
                  : "Inicia una tarea"}
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
                    disabled={runningTask === ""}
                  >
                    Pausar <BsFillPauseFill />
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleStartTasks()}
                    variant="outline-success"
                    className="my-1"
                    block
                    disabled={runningTask === ""}
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
                  disabled={runningTask === ""}
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
                  disabled={runningTask === ""}
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
                  disabled={runningTask === ""}
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


Timer.propTypes = {
  statusTask: PropTypes.string.isRequired,
  
  
  handlePauseTask: PropTypes.func.isRequired,
  handleStopTask: PropTypes.func.isRequired,
  handleRestartTask: PropTypes.func.isRequired,
  handleStartTasks: PropTypes.func.isRequired,
  handleFinishTask: PropTypes.func.isRequired,
  handleEditTask: PropTypes.func.isRequired,
};