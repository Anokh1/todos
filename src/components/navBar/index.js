import React from "react";

import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink } from "./elements";

const Navbar = () => {
    return (
        <>
        <Nav>
            <Bars />
            <NavMenu>
                <NavLink to="/about">
                    About
                </NavLink>
            </NavMenu>
        </Nav>
        </>
    );
};

export default Navbar; 