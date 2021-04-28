import React from "react";
import { BsTrash, BsPencil } from "react-icons/bs";
import { Button, ButtonGroup } from "react-bootstrap";

export const TaskTableItem = ({ item, id, handleDelete }) => {
  return (
    <>
      <tr key={item.id}>
        {/* <td>{item.id}</td> */}
        <td>{item.name}</td>
        <td>{item.description}</td>
        <td>{item.duration}</td>
        <td>{item.advance.toFixed(1)}</td>
        <td>{item.percentAdvance.toFixed(1)}</td>
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
