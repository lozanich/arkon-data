import React from "react";
import { BsTrash, BsPencil } from "react-icons/bs";
import { Button, ButtonGroup } from "react-bootstrap";

export const TaskTableItem = ({ item, id, handleDelete }) => {
  const formatData = (value, action) => {
    switch (action) {
      case "minutes":
        value = parseInt(value, 10);
        const hours = Math.floor(value / 3600);
        value %= 3600;
        const minutes = Math.floor(value / 60);
        const seconds = value % 60;
        const result =
          String(hours).padStart(2, "0") +
          ":" +
          String(minutes).padStart(2, "0") +
          ":" +
          String(seconds).padStart(2, "0")
        return result
    
      default:
        return value
    }
  } 

  return (
    <>
      <tr key={item.id}>
        {/* <td>{item.id}</td> */}
        <td>{item.name}</td>
        <td>{item.description}</td>
        <td>{formatData(item.duration, "minutes")}</td>
        <td>{formatData(item.advance, "minutes")}</td>
        <td>{item.percentAdvance.toFixed(1)}%</td>
        <td>{item.done === 100 ? "Terminada" : "No terminada"}</td>
        <td>
          <ButtonGroup
            onClick={() => handleDelete(item)}
            aria-label="Basic example"
          >
            <Button value={`${id + "edit"}`} variant="primary">
              <BsPencil value={`${id + "edit"}`} />
            </Button>
            <Button
              value={`${id + "delete"}`}
              className="button-pointer"
              variant="danger"
            >
              <BsTrash value={`${id + "delete"}`} />
            </Button>
          </ButtonGroup>
        </td>
      </tr>
    </>
  );
};
