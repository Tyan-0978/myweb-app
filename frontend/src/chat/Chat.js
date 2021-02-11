import React, { useRef } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './chat.css';
import useSize from './useSize.js';

function Chat(props) {
  const inputRef = useRef(null);
  const [width, height] = useSize();

  const isNarrow = width < 576; // bootstrap sm
  const bodyHeight = isNarrow ? (height - 150) : (height - 100);
  const senderHeight = isNarrow ? 90 : 50;

  const handleSubmit = () => {
    console.log("send message");
  };

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
	  <ul className="chat-messages" style={{ height: bodyHeight - senderHeight }}>
	    <li>one</li>
	    <li>two</li>
	  </ul>
	  <div className="chat-sender">
	    <Form onSubmit={ e => e.preventDefault() }>
	      <Form.Row>
	        <Col sm={4} xs={6} className="chat-columns">
		  <InputGroup>
		    <InputGroup.Prepend>
		      <InputGroup.Text>暱稱</InputGroup.Text>
		    </InputGroup.Prepend>
		    <Form.Control
		      type="text" placeholder=""
		      onKeyUp={(e) => {
			if (e.key === "Enter") {
		          e.preventDefault();
			  inputRef.current.focus();
			}
		      }}
		    />
		  </InputGroup>
		</Col>

		<Col sm={6} xs={10} className="chat-columns">
		  <InputGroup>
		    <InputGroup.Prepend>
		      <InputGroup.Text>訊息</InputGroup.Text>
		    </InputGroup.Prepend>
		    <Form.Control
		      as="textarea" rows={1} ref={ inputRef }
		      className="chat-message-input"
		      onKeyDown={(e) => {
		        if (e.keyCode === 13 && !e.shiftKey) {
		          e.preventDefault();
			  handleSubmit();
			}
		      }}
		    />
		  </InputGroup>
		</Col>

		<Col sm={2} xs={2} className="chat-columns">
		  <Button variant={ props.theme } onClick={ handleSubmit }>
		    <FontAwesomeIcon icon="paper-plane" />
		  </Button>
		</Col>
	      </Form.Row>
	    </Form>
	  </div>
	</Col>
      </Row>
    </Container>
  );
}

export default Chat;
