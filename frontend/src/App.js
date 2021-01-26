import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function App() {
  return (
    <>
      <Navbar bg='dark' variant='dark'>
        <Navbar.Brand href='/'>田祐行</Navbar.Brand>
	<Navbar.Toggle aria0controls='main-navbar' />
	<Navbar.Collapse id='main-navbar'>
	  <Nav className="mr-auto">
	    <Nav.Link href='#'>Home</Nav.Link>
	    <Nav.Link href='#'>Blog</Nav.Link>
	    <Nav.Link href='#'>Comments</Nav.Link>
	  </Nav>
	</Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default App;
