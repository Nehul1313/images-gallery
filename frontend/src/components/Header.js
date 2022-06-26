import React from 'react';
import { Navbar } from 'react-bootstrap';

//Navbar
const Header = (props) => {
    return (<Navbar bg="light" variant="light">
        <Navbar.Brand href="/">{props.title}</Navbar.Brand>
    </Navbar>
    )
}

export default Header;