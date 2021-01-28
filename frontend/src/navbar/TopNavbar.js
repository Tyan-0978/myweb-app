import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';
import './topNavbar.css';

function TopNavbar() {
  return (
    <Navbar bg='dark' variant='dark' expand="sm">
      <Container className="navbar-container">
        <Navbar.Brand className="navbar-title">田祐行的個人網站</Navbar.Brand>

	<Navbar.Toggle aria-controls="top-navbar" />
	<Navbar.Collapse id="top-navbar">
	  <Nav className="ml-auto">
            <LinkContainer exact to="/">
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
