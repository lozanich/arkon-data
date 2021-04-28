import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

export const AddTask = () => {
  return (
    <>
      <Row className="justify-content-md-center">
        <Col>
          <Form>
            <Form.Group as={Row} controlId="formHorizontalEmail">
              <Form.Label column sm={2}>
                Nombre de la tarea:
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="text" placeholder="Mi tarea" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalDescription">
              <Form.Label column sm={2}>
                Descripción:
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="text" placeholder="Mover el carro" />
              </Col>
            </Form.Group>

            <fieldset>
              <Form.Group as={Row}>
                <Form.Label as="legend" column sm={2}>
                  Radios
                </Form.Label>
                <Col sm={4}>
                  <Form.Check
                    type="radio"
                    label="first radio"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios1"
                  />
                  <Form.Check
                    type="radio"
                    label="second radio"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios2"
                  />
                  <Form.Check
                    type="radio"
                    label="third radio"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios3"
                  />
                </Col>
                <Col sm={6}>
                  <Form.Label>Otra:</Form.Label>
                  <Form.Control type="text" placeholder="Mover el carro" />
                </Col>
              </Form.Group>
            </fieldset>

            <Button type="submit" className="my-1">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};
