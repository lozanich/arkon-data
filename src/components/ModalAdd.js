import React, { useState } from "react";
import { Modal, Button, Container, Row, Col, Form } from "react-bootstrap";
import { useForm } from "../hooks/useForm";

export const ModalAdd = ({ show, handleClose, handleAddTask }) => {
 
  const { values, handleInputChange } = useForm({
    name: "",
    description: ""
  });

  const { name, description } = values;
  const [validated, setValidated] = useState(false);
  const [duration, setDuration] = useState({ visibleOther: false, value: "" });
  const [otherDuration, setOtherDuration] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    console.log(name, description, duration, otherDuration);
    setValidated(true);
    console.log("saviiing task");
  };

  const handleRadioChange = ({ target }) => {
    if (target.value === 'other') {
      setDuration({ visibleOther: true, value: "" });
    } else {
      setDuration({ visibleOther: false, value: target.value });
    }
  }

  const handleOtherChange = ({ target }) => {
    console.log(target.value);
    setOtherDuration(target.value);
    // const convertSeconds =
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        animation={true}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Agregar nueva tarea</Modal.Title>
          </Modal.Header>
          <Modal.Body className="show-grid">
            <Container>
              <Row className="justify-content-md-center">
                <Col>
                  <Form.Group as={Row} controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>
                      Nombre de la tarea:
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        required
                        autoComplete="off"
                        type="text"
                        placeholder="Mi tarea"
                        name="name"
                        value={name}
                        onChange={handleInputChange}
                      />
                      <Form.Control.Feedback>Correcto</Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">
                        Por favor escribe el nombre de la tarea
                      </Form.Control.Feedback>
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="formHorizontalDescription">
                    <Form.Label column sm={2}>
                      Descripción:
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        required
                        autoComplete="off"
                        type="text"
                        placeholder="Mover el carro"
                        name="description"
                        value={description}
                        onChange={handleInputChange}
                      />
                      <Form.Control.Feedback>Correcto</Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">
                        Por favor escribe la descripción de la tarea
                      </Form.Control.Feedback>
                    </Col>
                  </Form.Group>

                  <fieldset>
                    <Form.Group as={Row}>
                      <Form.Label as="legend" column sm={2}>
                        Radios
                      </Form.Label>
                      <Col sm={10}>
                        <Form.Check
                          type="radio"
                          label="30 Minutos"
                          name="duration"
                          id="formHorizontalRadios1"
                          value="30"
                          onChange={handleRadioChange}
                        />
                        <Form.Check
                          type="radio"
                          label="45 minutos"
                          name="duration"
                          id="formHorizontalRadios2"
                          value="45"
                          onChange={handleRadioChange}
                        />
                        <Form.Check
                          type="radio"
                          label="60 Minutos"
                          name="duration"
                          id="formHorizontalRadios3"
                          value="60"
                          onChange={handleRadioChange}
                        />
                        <Form.Check
                          type="radio"
                          label="Personalizado"
                          name="duration"
                          id="formHorizontalRadios3"
                          value="other"
                          onChange={handleRadioChange}
                        />
                       
                        {duration.visibleOther && (
                          <>
                            <Form.Label>
                          Escribe la hora en minutos y segundos:
                            </Form.Label>
                        
                            <Form.Control
                              type="text"
                              name="otherDuration"
                              value={otherDuration}
                              onChange={handleOtherChange}
                              placeholder="00:00"
                              pattern="[0-6][0-9]:[0-6][0-9]"
                              title="El formato de hora es 00:00"
                            />
                          </>
                        )}
                      </Col>
                    </Form.Group>
                  </fieldset>
                </Col>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};
