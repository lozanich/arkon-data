import React from 'react'
import { Card, Row, Col, ButtonGroup, Button } from "react-bootstrap";
import { BsTrash, BsPencil } from "react-icons/bs";
import Moment from "react-moment";

export const CardItem = ({ tasks, handleDelete, handleEdit, filterTask }) => {
    console.log(tasks)
  return (
      
    <>
      {tasks.map((item, id) => {
        return (
          //   <Card
          //     bg="dark"
          //     // key={idx}
          //     text="dark"
          //     style={{ width: "18rem" }}
          //     className="mb-2"
          //     key={item.id}
          //   >
          //     <Card.Header>Header</Card.Header>
          //     <Card.Body>
          //       <Card.Title>Dark Card Title </Card.Title>
          //       <Card.Text>
          //         Some quick example text to build on the card title and make up
          //         the bulk of the card's content.
          //       </Card.Text>
          //       <ButtonGroup aria-label="Basic example">
          //         <Button
          //           onClick={() => handleEdit(item)}
          //           value={`${id + "edit"}`}
          //           variant="primary"
          //         >
          //           <BsPencil value={`${id + "edit"}`} />
          //         </Button>
          //         <Button
          //           onClick={() => handleDelete(item)}
          //           value={`${id + "delete"}`}
          //           className="button-pointer"
          //           variant="danger"
          //         >
          //           <BsTrash value={`${id + "delete"}`} />
          //         </Button>
          //       </ButtonGroup>
          //     </Card.Body>
          //   </Card>
          <Card
            bg="dark"
            key={id}
            text="white"
            style={{ width: "18rem" }}
            className="mb-2"
          >
            <Card.Header>
              <Moment format="DD/MM/YYYY">{item.createdAt}</Moment>{" "}
            </Card.Header>
            <Card.Body>
              <Card.Title> {item.name} </Card.Title>
              <Card.Text>
                {item.description}
              </Card.Text>
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
