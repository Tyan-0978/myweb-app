import React, { useState, useRef } from 'react';

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
import Message from './Message.js';

function Chat(props) {
  const [messageName, setMessageName] = useState("");
  const [messageBody, setMessageBody] = useState("");
  const [width, height] = useSize();
  const inputRef = useRef(null);

  // parameters for div height settings
  const isNarrow = width < 576; // bootstrap sm
  const bodyHeight = isNarrow ? (height - 150) : (height - 100);
  const senderHeight = isNarrow ? 90 : 50;

  const handleSubmit = () => {
    console.log(messageName);
    console.log(messageBody);
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
	  <Container style={{ height: bodyHeight - senderHeight }}>
	    <Message name="aaaaaaaaaaaaaaaaa" body="1234" theme={ props.theme } />
	    <Message name="bb" body="5678" theme={ props.theme } />
	  </Container>
	  <div className="chat-sender">
	    <Form onSubmit={ e => e.preventDefault() }>
	      <Form.Row>
	        <Col sm={4} xs={8} className="chat-columns">
		  <InputGroup>
		    <InputGroup.Prepend className={ `chat-input-prepend ${props.theme}` }>
		      <InputGroup.Text
		        className={ `chat-input-prepend ${props.theme}` }
		      >
		        暱稱
		      </InputGroup.Text>
		    </InputGroup.Prepend>
		    <Form.Control
		      type="text" placeholder=""
		      className={ `chat-input-form ${props.theme}` }
		      onChange={ (e) => setMessageName(e.target.value) }
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
		      <InputGroup.Text
		        className={ `chat-input-prepend ${props.theme}` }
		      >
		        訊息
		      </InputGroup.Text>
		    </InputGroup.Prepend>
		    <Form.Control
		      as="textarea" rows={1} ref={ inputRef }
		      className="chat-input-form-body"
		      className={ `chat-input-form ${props.theme}` }
		      onChange={ e => setMessageBody(e.target.value) }
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
		  <Button
		    variant={ props.theme } onClick={ handleSubmit }
                    className={ `chat-submit ${props.theme}` }
		  >
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
