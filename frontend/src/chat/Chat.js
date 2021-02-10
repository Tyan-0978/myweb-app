import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';

import './chat.css';
import useSize from './useSize.js';

function Chat(props) {
  const [width, height] = useSize();

  const isNarrow = width < 576; // bootstrap sm
  const bodyHeight = isNarrow ? (height - 150) : (height - 100);

  return (
    <Container className="chat-container">
      <Row>
        <Col sm={3}>
	  <ListGroup horizontal={ isNarrow }>
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
	<Col sm={9} style={{ height: bodyHeight }}>
	  <div className="chat-messages" style={{ height: bodyHeight - 30 }}>
	    messages
	  </div>
	  <div className="chat-sender">
	    chat sender
	  </div>
	</Col>
      </Row>
    </Container>
  );
}

export default Chat;
