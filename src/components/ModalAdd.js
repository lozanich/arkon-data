import React, { useState } from "react";
import {
  Modal,
  Button,
  Container,
  Row,
  Col,
  Form,
  Alert,
} from "react-bootstrap";
import { useForm } from "../hooks/useForm";
import faker from "faker";

export const ModalAdd = ({ show, handleClose, handleAddTask }) => {
  // var used to set values fields name and description
  const { values, handleInputChange, reset } = useForm({
    name: "",
    description: "",
  });

  const { name, description } = values;
  // var to validate native html5 fields bootstrap
  const [validated, setValidated] = useState(false);

  // var used to set values radio buttons
  const [duration, setDuration] = useState({ visibleOther: false, value: 0 });

  // var used to set values other value time
  const [otherDuration, setOtherDuration] = useState("60:00");

  // var used to validate max time other value time
  const [validationOther, setValidationOther] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    // check validation and prevent default send form
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    console.log(name, description, duration, otherDuration);
    setValidated(true);

    // validation values fields
    if (name.trim().length <= 1 || description.trim().length <= 1 || duration.value === 0) {
      return;
    }

    const newTask = {
      id: faker.datatype.uuid(),
      name,
      description,
      duration: duration.value,
      advance: 0,
      percentAdvance: 0,
      done: false,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    };

    console.log('sabbing task22')
    
    handleAddTask(newTask)
    setDuration({ visibleOther: false, value: 0 })
    reset()
    handleClose()
      
  };

  // on change radio buttons
  const handleRadioChange = ({ target }) => {
    if (target.value === "other") {
      setDuration({ visibleOther: true, value: 3600 });
    } else {
      const convertSeconds = parseInt(target.value) * 60;
      setDuration({ visibleOther: false, value: convertSeconds });
    }
  };

  // on change other value time
  const handleOtherChange = ({ target }) => {
    setOtherDuration(target.value);
    const splitMinutes = target.value.split(":");
    let convertSeconds;
    if (splitMinutes.length === 2 && splitMinutes[1] !== "") {
      // convert minutes to seconds
      convertSeconds =
        parseInt(splitMinutes[0] * 60) + parseInt(splitMinutes[1]);
    }
    // validate if value is < 2 hr
    if (convertSeconds && convertSeconds <= 7200) {
      setDuration({ visibleOther: true, value: convertSeconds });
      setValidationOther(false);
    } else {
      setValidationOther(true);
    }
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
                          required
                          type="radio"
                          label="30 Minutos"
                          name="duration"
                          id="formHorizontalRadios1"
                          value="30"
                          // checked="true"
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
                              pattern="[0-1]{0,1}[0-9][0-9]:[0-6][0-9]"
                              title="El formato de hora es 00:00"
                            />
                            <Form.Control.Feedback>
                              Correcto
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                              Escribe la hora en el formato correcto. Ejemplo:
                              10:50
                            </Form.Control.Feedback>
                            {validationOther && (
                              <Alert variant="danger">
                                Solo se permiten 2 horas máximo a la tarea
                              </Alert>
                            )}
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
