import React, {useEffect, useState} from 'react'
import { Row, Col, Button, Card } from "react-bootstrap";
import { formatData } from "../util/formatData"
import { BsFillPauseFill, BsFillStopFill, BsArrowRepeat } from "react-icons/bs";

export const Timer = React.memo(
  ({
    runningTask,
    timeFirstTask,
    handlePauseTask,
    handleStopTask,
    handleRestartTask,
  }) => {
    const [counter, setCounter] = useState(parseInt(timeFirstTask));

    // renders counter new calculate
    useEffect(() => {
      const timer =
        counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
      return () => clearInterval(timer);
    }, [counter]);

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
                {formatData(counter, "minutes")}
              </Col>
            </Row>
            <Row>
              <Col
                style={{ "padding-top": "10px" }}
                className="text-center"
                sm={12}
                md={4}
              >
                <Button
                  onClick={() => handlePauseTask(runningTask)}
                  variant="outline-success"
                  className="my-1"
                  block
                >
                  Pausar <BsFillPauseFill />
                </Button>
              </Col>
              <Col
                style={{ "padding-top": "10px" }}
                className="text-center"
                sm={12}
                md={4}
              >
                <Button
                  onClick={() => handleStopTask(runningTask)}
                  variant="outline-warning"
                  className="my-1"
                  block
                >
                  Detener <BsFillStopFill />
                </Button>
              </Col>
              <Col
                style={{ "padding-top": "10px" }}
                className="text-center"
                sm={12}
                md={4}
              >
                <Button
                  onClick={() => handleRestartTask(runningTask)}
                  variant="outline-danger"
                  className="my-1"
                  block
                >
                  Reiniciar <BsArrowRepeat />
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </>
    );
  }
);
