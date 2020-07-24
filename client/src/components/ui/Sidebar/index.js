import React from "react";
import { Nav } from "react-bootstrap";
import { withRouter } from "react-router";
import { NavLink } from 'react-router-dom'

const Side = props => {


    return (
        <div class="left-sidebar" contenteditable>
            <Nav className=" d-none d-md-block bg-light sidebar"
                activeKey="/home"
                onSelect={selectedKey => alert(`selected ${selectedKey}`)}>

                <Nav.Item>
                    <NavLink to="/messages">Mensajes</NavLink>
                </Nav.Item>
                <Nav.Item>
                    <NavLink to="/events">Eventos</NavLink>
                </Nav.Item>
                <Nav.Item>
                    <NavLink to="/profile">Perfil</NavLink>
                </Nav.Item>
                <Nav.Item>
                    <NavLink to="/courses">Cursos</NavLink>
                </Nav.Item>
            </Nav>
        </div>
            
    );
};
const Sidebar = withRouter(Side);
export default Sidebar