import React, {useEffect, useState} from 'react'
import { Row, Col, Button, Card } from "react-bootstrap";
import {formatData} from "../util/formatData"

export const Timer = React.memo(({ timeFirstTask }) => {
    const [counter, setCounter] = useState(parseInt(timeFirstTask));
    
    // renders counter new calculate
    useEffect(() => {
      const timer =
        counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
      return () => clearInterval(timer);
    }, [counter]);

    // restart counter new value task
    useEffect(() => { 
        setCounter(parseInt(timeFirstTask));
    }, [timeFirstTask])

    return (
      <>
        <Card>
          <Card.Body>
            This is some text within timer. {formatData(counter, "minutes")}
          </Card.Body>
        </Card>
      </>
    );
});
