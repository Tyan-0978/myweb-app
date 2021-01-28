import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

import './home.css';

function Home() {
  return (
    <Container className="home-container">
      <Row>
        <Col sm={4}>
          <Image
	    src="https://i.imgur.com/TwElKk7.jpg?2"
	    alt="picture" rounded fluid
	  />
        </Col>
        <Col sm={8} className="home-description-col">
	  <h1>田祐行</h1>
	  <p>寫了一個網站但不知道內文要打什麼的人</p>
	</Col>
      </Row>

      <div className="home-status-div">
        <h4>近況</h4>
        <Accordion>
          <Card>
	    <Accordion.Toggle as={Card.Header} eventKey="0">
	      學校
	    </Accordion.Toggle>
	    <Accordion.Collapse eventKey="0">
	      <Card.Body>期末project爆炸，心態也爆炸之後放寒假中</Card.Body>
	    </Accordion.Collapse>
	  </Card>

          <Card>
	    <Accordion.Toggle as={Card.Header} eventKey="1">
	      日常生活
	    </Accordion.Toggle>
	    <Accordion.Collapse eventKey="1">
	      <Card.Body>寫網站、寫kshoot譜、玩遊戲</Card.Body>
	    </Accordion.Collapse>
	  </Card>

          <Card>
	    <Accordion.Toggle as={Card.Header} eventKey="2">
	      朋友
	    </Accordion.Toggle>
	    <Accordion.Collapse eventKey="2">
	      <Card.Body>有點少QQ</Card.Body>
	    </Accordion.Collapse>
	  </Card>

          <Card>
	    <Accordion.Toggle as={Card.Header} eventKey="3">
	      其他
	    </Accordion.Toggle>
	    <Accordion.Collapse eventKey="3">
	      <Card.Body>大二下終於有通識了555</Card.Body>
	    </Accordion.Collapse>
	  </Card>
        </Accordion>
      </div>
    </Container>
  );
}

export default Home;
