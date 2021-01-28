import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';
import './TopNavbar.css';

function TopNavbar() {
  return (
    <Navbar bg='dark' variant='dark'>
      <Container className="navbar-container">
        <LinkContainer to="/home">
          <Navbar.Brand>田祐行</Navbar.Brand>
	</LinkContainer>

	<Navbar.Toggle aria-controls='main-navbar' />
	<Navbar.Collapse id='main-navbar'>
	  <Nav className="mr-auto">
            <LinkContainer to="/home">
	      <Nav.Link>主頁</Nav.Link>
	    </LinkContainer>

            <LinkContainer to="/blog">
	      <Nav.Link>部落格</Nav.Link>
	    </LinkContainer>

            <LinkContainer to="/chat">
	      <Nav.Link>留言版</Nav.Link>
	    </LinkContainer>
	  </Nav>
	</Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TopNavbar;
