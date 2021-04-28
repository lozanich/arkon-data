import React from "react";
import { Table } from "react-bootstrap";
import { TaskTableItem } from "../components/TaskTableItem";

export const TaskTable = ({ tasks, handleDelete }) => {
  return (
    <>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            {/* <th>#</th> */}
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Duracion total</th>
            <th>Avance</th>
            <th>Porcentaje Avance</th>
            <th>Estatus</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((item, id) => {
            return (
              <TaskTableItem
                key={item.id}
                item={item}
                id={id}
                handleDelete={handleDelete}
              />
            );
          })}
        </tbody>
      </Table>
    </>
  );
};
