import React from "react";
import { Nav } from "react-bootstrap";
import { withRouter } from "react-router";
import { NavLink } from 'react-router-dom'



import './../../App.css'

const Side = props => {

    if (window.location.pathname.match(/login/)) {return null}
  
    return (

        <div className="left-sidebar" >
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
                <Nav.Item>
                    <NavLink to="/users">Estudiantes</NavLink>
                </Nav.Item>
                <Nav.Item>
                    <NavLink to="/subjects">Asignaturas</NavLink>
                </Nav.Item>
                <Nav.Item>
                    <NavLink to="/teachers">Profesores</NavLink>
                </Nav.Item>
            </Nav>
        </div>

    );
};
const Sidebar = withRouter(Side);
export default Sidebar