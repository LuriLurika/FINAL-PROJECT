import React, { Component } from 'react'

import { withRouter } from 'react-router'
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faCalendarWeek } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faChalkboardTeacher } from "@fortawesome/free-solid-svg-icons";
import { faUserGraduate } from "@fortawesome/free-solid-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { faChalkboard } from "@fortawesome/free-solid-svg-icons";

import AuthService from "./../../../service/AuthService"
import "./index.css";


class Side extends Component {

  constructor(props) {

    super(props)
    this.state = {}

    this.AuthService = new AuthService()

  }


  render() {


    if (window.location.pathname.match(/login/)) {
      return null
    }

    // console.log(this.props.loggedInUser, 'abajo')
    return (
      <div className="left-sidebar">
        <Nav
          className=" d-none d-md-block bg-light sidebar"
          activeKey="/home"
          onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
        >
          <Nav.Item>
            <NavLink to="/messages">
              Mensajes
               <span className="myIcon">
              <FontAwesomeIcon icon={faEnvelope} fixedWidth />
              </span>
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink to="/events">
              Eventos
               <span className="myIcon">
                <FontAwesomeIcon icon={faCalendarWeek} fixedWidth />
              </span>
            </NavLink>
          </Nav.Item>

          <Nav.Item>
            <NavLink to="/profile">
              Perfil
                 <span className="myIcon">
                <FontAwesomeIcon icon={faUser} fixedWidth />
              </span>
            </NavLink>
          </Nav.Item>

          {this.props.loggedInUser !== null &&
            this.props.loggedInUser.type === "DIRECTOR" ? (
              <>

                <Nav.Item>
                  <NavLink to="/courses">
                    Cursos
                       <span className="myIcon">
                  <FontAwesomeIcon  icon={faChalkboard} fixedWidth />
                    </span>
                  </NavLink>
                </Nav.Item>
                <Nav.Item>
                  <NavLink to="/subjects">
                    Asignaturas
                       <span className="myIcon">
                  <FontAwesomeIcon  icon={faBook} fixedWidth />
                    </span>
                  </NavLink>
                </Nav.Item>
              </>
            ) : null}
          {this.props.loggedInUser !== null &&
            this.props.loggedInUser.type === "TEACHER" ? (
              <>

                <Nav.Item>
                  <NavLink to="/courses">
                    Cursos
                    <span className="myIcon">
                      <FontAwesomeIcon icon={faChalkboard} fixedWidth />
                    </span>
                  </NavLink>
                </Nav.Item>
                <Nav.Item>
                  <NavLink to="/subjects">
                    Asignaturas
                    <span className="myIcon">
                      <FontAwesomeIcon icon={faBook} fixedWidth />
                    </span>
                  </NavLink>
                </Nav.Item>
              </>
            ) : null}

          {this.props.loggedInUser !== null &&
            this.props.loggedInUser.type === "DIRECTOR" ? (
              <>
                <Nav.Item>
                  <NavLink to="/users">
                    Estudiantes
                  <FontAwesomeIcon className="myIcon" icon={faUserGraduate} fixedWidth />
                  </NavLink>
                </Nav.Item>
                <Nav.Item>
                  <NavLink to="/teachers">
                    Profesores
                  <FontAwesomeIcon className="myIcon" icon={faChalkboardTeacher} fixedWidth />
                  </NavLink>
                </Nav.Item>
              </>
            ) : null}
        </Nav>
      </div>
    );
  }
}

const Sidebar = withRouter(Side)
export default Sidebar
