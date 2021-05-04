import React from 'react'
import { Row, Col} from "react-bootstrap";

export const About = () => {
    return (
      <>
        <Row className="justify-content-md-center align-content-center">
          <Col className="text-center" md={12} sm={12}>
            Ivan Lozano Sánchez{" "}
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col className="text-center" md={12} sm={12}>
            Prueba técnica - Aplicación de productividad{" "}
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col className="text-center" md={12} sm={12}>
            Desarrollada en la versión de React 17.0.2{" "}
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col className="text-center" md={12} sm={12}>
            Fecha de termino: 03/05/2021{" "}
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col className="text-center" md={12} sm={12}>
            Correo: lozanich598@gmail.com
          </Col>
        </Row>
      </>
    );
}
