import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'
import './Home.css';

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
        <Col sm={8} className="description-col">
	  <h1>田祐行</h1>
	  <p>寫了一個網站但不知道內文要打什麼的人</p>
	</Col>
      </Row>
    </Container>
  );
}

export default Home;
