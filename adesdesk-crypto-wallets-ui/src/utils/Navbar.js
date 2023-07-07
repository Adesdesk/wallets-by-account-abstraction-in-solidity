import React from 'react';
import {
    classnames,
    Container,
    Nav,
    NavItem,
    NavLink,
    Link,
} from 'tailwindcss/react';

const Navbar = () => {
    return (
        <Container>
            <Nav>
                <NavItem>
                    <NavLink to="/">Home</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/wallet-user-dashboard">Visit Dashboard</NavLink>
                </NavItem>
            </Nav>
        </Container>
    );
};

export default Navbar;
