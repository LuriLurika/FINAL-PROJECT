import React from "react";
import { Nav } from "react-bootstrap";
import { withRouter } from "react-router";


const Side = props => {


    return (
        <>

            <Nav className="col-md-12 d-none d-md-block bg-light sidebar"
                activeKey="/home"
                onSelect={selectedKey => alert(`selected ${selectedKey}`)}
            >
                <div className="sidebar-sticky"></div>
                <Nav.Item>
                    <Nav.Link href="Mensajes">Active</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="Eventos">Link</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="Tu perfil">Link</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="Cursos" disabled>
                        Disabled
                </Nav.Link>
                </Nav.Item>
            </Nav>

        </>
    );
};
const Sidebar = withRouter(Side);
export default Sidebar