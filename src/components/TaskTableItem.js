import React from "react";
import { BsTrash, BsPencil } from "react-icons/bs";
import { Button, ButtonGroup } from "react-bootstrap";
import {formatData} from "../util/formatData"

export const TaskTableItem = ({ item, id, handleDelete, handleEdit }) => {
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
        </td>
      </tr>
    </>
  );
};
