import React from 'react'
import PropTypes from "prop-types";
import { Card, Row, Col, ButtonGroup, Button } from "react-bootstrap";
import { BsTrash, BsPencil } from "react-icons/bs";
import { formatData } from "../util/formatData";

export const CardItem = ({
  tasks,
  handleDelete,
  handleEdit,
  filterTask,
  handleDrag,
  handleDrop,
}) => {
    if (filterTask) {
      const { typeFilter, value } = filterTask;
      typeFilter === "done"
        ? (tasks = tasks.filter((item) => {
            return item[typeFilter] === value;
          }))
        : typeFilter === "duration30"
        ? (tasks = tasks.filter((item) => {
            return item.duration <= 1800;
          }))
        : typeFilter === "duration60"
        ? (tasks = tasks.filter((item) => {
            return item.duration > 1800 && item.duration <= 3600;
          }))
        : typeFilter === "duration120"
        ? (tasks = tasks.filter((item) => {
            return item.duration > 3600;
          }))
        : (tasks = tasks);
    }
    
  return (
    <>
    {tasks.sort((a, b) => a.order - b.order).map((item, id) => {
        return (
          <Card
            draggable={true}
            id={item.id}
            bg="dark"
            key={id}
            text="white"
            style={{ width: "18rem" }}
            className="mb-2"
            onDragOver={(ev) => ev.preventDefault()}
            onDragStart={handleDrag}
            onDrop={handleDrop}
          >
            <Card.Header>
              {item.order} - {item.name}{" "}
            </Card.Header>
            <Card.Body>
              <Card.Title style={{ fontSize: "2.25rem" }}>
                {item.percentAdvance.toFixed(1)} %
              </Card.Title>
              <Row>
                <Col className="text-center" md={6} sm={12}>
                  Duración total
                </Col>
                <Col className="text-center" md={6} sm={12}>
                  {formatData(item.duration, "minutes")}
                </Col>
              </Row>
              <Row>
                <Col className="text-center" md={6} sm={12}>
                  Avance
                </Col>
                <Col className="text-center" md={6} sm={12}>
                  {formatData(item.advance, "minutes")}
                </Col>
              </Row>
              <Card.Text style={{ color: "#DCDCDC" }}>
                <strong>{item.done ? "Finalizada" : ""}</strong>
              </Card.Text>
              <Card.Text>{item.description}</Card.Text>
              <ButtonGroup aria-label="Basic example">
                <Button
                  onClick={() => handleEdit(item)}
                  value={`${id + "edit"}`}
                  variant="primary"
                >
                  <BsPencil value={`${id + "edit"}`} />
                </Button>
                <Button
                  onClick={() => handleDelete(item)}
                  value={`${id + "delete"}`}
                  className="button-pointer"
                  variant="danger"
                >
                  <BsTrash value={`${id + "delete"}`} />
                </Button>
              </ButtonGroup>
            </Card.Body>
          </Card>
        );
      })}
    </>
  );
};

CardItem.propTypes = {
  tasks: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  filterTask: PropTypes.object.isRequired,
  handleDrag:PropTypes.func.isRequired,
  handleDrop:PropTypes.func.isRequired,
};
