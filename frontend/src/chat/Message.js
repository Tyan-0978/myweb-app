import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './message.css';

function Message(props) {
  return (
    <Row
      className="message-item"
      style={{ background: props.theme === "light" ? "#eee" : "#484848" }}
    >
      <Col xs={3} className="message-name">{ props.name }</Col>
      <Col xs={6} className="message-body">{ props.body }</Col>
      <Col xs={3} className="message-time">{ props.time }</Col>
    </Row>
  );
}

export default Message;
