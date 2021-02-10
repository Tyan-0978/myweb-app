import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';

import './chat.css';
import useWidth from './useWidth.js';

function Chat(props) {
  const width = useWidth();

  return (
    <Container className="chat-container">
      <Row>
        <Col sm={3}>
	  <ListGroup horizontal={ width < 576 }>
	    <ListGroup.Item
	      action variant={ props.theme }
	      className="chat-sidebar-item"
	    >
	      一般
	    </ListGroup.Item>
	    <ListGroup.Item
	      action variant={ props.theme }
	      className="chat-sidebar-item"
	    >
	      學校
	    </ListGroup.Item>
	    <ListGroup.Item
	      action variant={ props.theme }
	      className="chat-sidebar-item"
	    >
	      食物
	    </ListGroup.Item>
	    <ListGroup.Item
	      action variant={ props.theme }
	      className="chat-sidebar-item"
	    >
	      音G
	    </ListGroup.Item>
	  </ListGroup>
	</Col>
	<Col sm={9}>
	  chat
	</Col>
      </Row>
    </Container>
  );
}

export default Chat;
