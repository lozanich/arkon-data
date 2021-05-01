/* eslint-disable no-self-assign */
import React from "react";
import { Table } from "react-bootstrap";
import { TaskTableItem } from "../components/TaskTableItem";

export const TaskTable = ({ tasks, handleDelete, handleEdit, filterTask }) => {
  // console.log(filterTask);
  
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
      ?((tasks = tasks.filter((item) => {
            return item.duration > 3600;
          }))
        ) : tasks = tasks
  }

  // console.log(tasks);

  return (
    <>
      <Table responsive striped bordered hover variant="dark">
        <thead>
          <tr>
            {/* <th>#</th> */}
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Duracion total</th>
            <th>Avance</th>
            <th>Porcentaje Avance</th>
            <th>Estatus</th>
            <th>Fecha creación</th>
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
                handleEdit={handleEdit}
              />
            );
          })}
        </tbody>
      </Table>
    </>
  );
};
