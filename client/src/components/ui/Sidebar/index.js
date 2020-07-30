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

    
    return (
      <div className="left-sidebar">
        <Nav as="ul"
          className="  d-md-block sidebar"
          activeKey="/home"
          onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
        >
          
          <Nav.Item as="li">
            <NavLink to="/profile">
              <span className="hide"> Perfil </span>
              <span className="myIcon">
                <FontAwesomeIcon icon={faUser} fixedWidth />
              </span>
            </NavLink>
          </Nav.Item>

          
          <Nav.Item as="li">
            <NavLink to="/messages">
              <span className="hide"> Mensajes </span>
              <span className="myIcon">
                <FontAwesomeIcon icon={faEnvelope} fixedWidth />
              </span>
            </NavLink>
          </Nav.Item>

          <Nav.Item as="li">
            <NavLink to="/events">
              <span className="hide"> Eventos </span>
              <span className="myIcon">
                <FontAwesomeIcon icon={faCalendarWeek} fixedWidth />
              </span>
            </NavLink>
          </Nav.Item>

          

          {this.props.loggedInUser !== null &&
            this.props.loggedInUser.type === "DIRECTOR" ? (
              <>

                <Nav.Item as="li">
                  <NavLink to="/courses">
                    <span className="hide"> Cursos </span>
                    <span className="myIcon">
                      <FontAwesomeIcon icon={faChalkboard} fixedWidth />
                    </span>
                  </NavLink>
                </Nav.Item>

                <Nav.Item as="li">
                  <NavLink to="/subjects">
                    <span className="hide"> Asignaturas </span>
                    <span className="myIcon">
                      <FontAwesomeIcon icon={faBook} fixedWidth />
                    </span>
                  </NavLink>
                </Nav.Item>
              </>
            ) : null}
          {this.props.loggedInUser !== null &&
            this.props.loggedInUser.type === "TEACHER" ? (
              <>

                <Nav.Item as="li">
                  <NavLink to="/subjects">
                    <span className="hide"> Asignaturas </span>
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
                <Nav.Item as="li">
                  <NavLink to="/users">
                    <span className="hide"> Estudiantes </span>
                    <span className="myIcon">
                      <FontAwesomeIcon className="myIcon" icon={faUserGraduate} fixedWidth />
                    </span>
                  </NavLink>
                </Nav.Item>

                <Nav.Item as="li">
                  <NavLink to="/teachers">
                    <span className="hide"> Profesores </span>
                    <span className="myIcon">
                      <FontAwesomeIcon className="myIcon" icon={faChalkboardTeacher} fixedWidth />
                    </span>
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
