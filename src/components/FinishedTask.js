import React from 'react'
import PropTypes from "prop-types";
import { Row, Col, Button, Card } from "react-bootstrap";
import "../styles/finishedTask.css"

export const FinishedTask = ({ tasks, handleFilterTask }) => {

  return (
    <>
      <Card className="card-finished">
        <Card.Body className="card-body-counter">
          <Row>
            <Col className="text-center" md={12}>
              <strong>Tareas finalizadas</strong>
            </Col>
          </Row>
          <Row>
            <Col className="text-center" md={12}>
              <span className="span-number">
                {tasks.filter((item) => item.done).length}
              </span>
            </Col>
          </Row>
          <Row>
            <Button
              onClick={() => handleFilterTask("done", true)}
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

FinishedTask.propTypes = {
  tasks: PropTypes.array.isRequired,
  handleFilterTask: PropTypes.func.isRequired,
};
