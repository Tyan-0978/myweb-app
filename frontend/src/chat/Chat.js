import React, { useState, useEffect, useRef } from 'react';

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
import socket from '../socket.js';

function Chat(props) {
  const [messageName, setMessageName] = useState("");
  const [messageBody, setMessageBody] = useState("");
  const [category, setCategory] = useState("casual");
  const [messages, setMessages] = useState([]);
  const [width, height] = useSize();
  const inputRef = useRef(null);

  const categToHeader = {
    casual: '一般',
    school: '學校',
    food: '食物',
    games: '遊戲'
  };

  // parameters for div height settings
  const isNarrow = width < 576; // bootstrap sm
  const bodyHeight = isNarrow ? (height - 150) : (height - 100);
  const senderHeight = isNarrow ? 90 : 50;
  const messagesHeight = bodyHeight - senderHeight - 50; // title height

  const handleSubmit = () => {
    if (messageName && messageBody) { // check if name or message is empty
      socket.emit('send message', {
        name: messageName,
	body: messageBody,
	category: category,
	time: Date().substring(0,24)
      });
      inputRef.current.value = '';
    }
  };

  useEffect(() => {
    // for debug
    socket.onAny((eventName) => {
      console.log(eventName);
    });

    // server sends new messages when category is changed
    socket.on('initial messages', (initMessages) => {
      setMessages(initMessages);
    });

    // updates messages when someone sends a new message
    socket.on('update messages', (newMessage) => {
      //console.log(category);
      //console.log(newMessage.category);
      if (newMessage.category === category) {
        setMessages([...messages, newMessage]);
      }
    });

    // remove socket.io listeners
    return () => {
      socket.offAny();
      socket.off('initial messages');
      socket.off('update messages');
    };
  });

  useEffect(() => {
    console.log(category);
    socket.emit('load messages', category);
  }, [category]);

  return (
    <Container className="chat-container">
      <Row>
        <Col sm={3}>
	  <ListGroup horizontal={ isNarrow }>
	    <ListGroup.Item action onClick={() => setCategory("casual")}
	      className={ `chat-sidebar-item ${props.theme}` }
	    >
	      一般
	    </ListGroup.Item>
	    <ListGroup.Item action onClick={() => setCategory("school")}
	      className={ `chat-sidebar-item ${props.theme}` }
	    >
	      學校
	    </ListGroup.Item>
	    <ListGroup.Item action onClick={() => setCategory("food")}
	      className={ `chat-sidebar-item ${props.theme}` }
	    >
	      食物
	    </ListGroup.Item>
	    <ListGroup.Item action onClick={() => setCategory("games")}
	      className={ `chat-sidebar-item ${props.theme}` }
	    >
	      遊戲
	    </ListGroup.Item>
	  </ListGroup>
	</Col>

	<Col sm={9} style={{ height: bodyHeight }}>
	  <div class="chat-header">{ categToHeader[category] }</div>
	  <Container
	    className='chat-messages'
	    style={{ height: messagesHeight }}
	  >
	    { messages.map((msg) => { return (
	      <Message
	        name={ msg.name }
		body={ msg.body }
		time={ msg.time }
		theme={ props.theme }
	      />
	    )})}
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
		      className={ `chat-input-form-body chat-input-form ${props.theme}` }
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
