import React from 'react'
import { Row, Col, Button, Card } from "react-bootstrap";
import "../styles/finishedTask.css";


export const PendingTask = ({ tasks,handleFilterTask }) => {
  return (
    <>
      <Card className="card-finished">
        <Card.Body className="card-body-counter">
          <Row>
            <Col className="text-center" md={12}>
              <strong>Tareas pendientes</strong>
            </Col>
          </Row>
          <Row>
            <Col className="text-center" md={12}>
              <span className="span-number-orange">
                {tasks.filter((item) => !item.done).length}
              </span>
            </Col>
          </Row>
          <Row>
            <Button
              onClick={() => handleFilterTask("done", false)}
              variant="outline-success"
              className="my-1"
              block
            >
              Mostrar
            </Button>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};
